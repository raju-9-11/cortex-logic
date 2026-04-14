package com.agnes.nexus.core.engine

import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.utils.io.*
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlin.coroutines.coroutineContext
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

/**
 * KMP-compatible LLM transport using Ktor client.
 *
 * Routes SSE (Server-Sent Events) streaming requests to a given endpoint with an
 * Authorization bearer token. LLM API keys never reside in this client — callers
 * supply the endpoint and token, which may point to a Cloud Function proxy.
 *
 * Platform engines are injected externally:
 *   Android → OkHttp engine
 *   JS/Web  → JS engine
 *
 * Complexity: O(t) per stream call, where t = number of SSE tokens received.
 * Memory:     O(1) — tokens are emitted and discarded; no buffering of full response.
 *
 * @param httpClient Platform-provided Ktor [HttpClient] instance.
 * @param maxRetries Maximum number of retry attempts for transient failures (default 2).
 */
class KtorLlmTransport(
    private val httpClient: HttpClient,
    private val maxRetries: Int = 2
) : LlmTransport {

    companion object {
        /**
         * Backoff delays in ms for retry attempts 1, 2, 3.
         * Default [maxRetries]=2 consumes indices 0 and 1 only; index 2 covers callers that pass maxRetries=3.
         * For maxRetries>3 the last entry (8s) repeats via [getOrElse].
         */
        private val RETRY_BACKOFF_MS = longArrayOf(1_000L, 3_000L, 8_000L)

        /** HTTP status codes that warrant a retry. */
        private val RETRYABLE_STATUS_CODES = setOf(429, 500, 502, 503, 504)

        /** Reused across all [parseStreamToken] calls — never allocate inside the hot SSE loop. */
        private val SSE_JSON = Json { ignoreUnknownKeys = true }
    }

    /**
     * Streams an LLM chat completion token-by-token using Server-Sent Events.
     *
     * The [request] is serialized to a standard OpenAI-compatible JSON body.
     * Each `data:` SSE line is parsed as an OpenAI stream chunk and the token
     * content is emitted downstream.
     *
     * Transient HTTP errors (429, 5xx) are retried up to [maxRetries] times with
     * exponential backoff before propagating as [LlmTransportException].
     *
     * Malformed or skippable SSE lines (keep-alives, unknown fields) are silently
     * ignored — the stream continues until `[DONE]` or the connection closes.
     *
     * @param endpoint      Full URL of the streaming LLM endpoint or proxy.
     * @param authorization Bearer token (do NOT include the "Bearer " prefix).
     * @param request       Chat completion parameters, including model and messages.
     * @throws LlmTransportException if a network or parsing error terminates the stream.
     */
    override fun stream(
        endpoint: String,
        authorization: String,
        request: LlmRequest
    ): Flow<String> = flow {
        val body = request.toJsonBody()
        var lastException: Exception? = null

        for (attempt in 0..maxRetries) {
            if (attempt > 0) {
                val backoff = RETRY_BACKOFF_MS.getOrElse(attempt - 1) { RETRY_BACKOFF_MS.last() }
                delay(backoff)
            }
            try {
                httpClient.preparePost(endpoint) {
                    header(HttpHeaders.Authorization, "Bearer $authorization")
                    contentType(ContentType.Application.Json)
                    setBody(body.toString())
                }.execute { response ->
                    val statusCode = response.status.value
                    if (statusCode in RETRYABLE_STATUS_CODES) {
                        throw RetryableHttpException(statusCode, "HTTP $statusCode from LLM endpoint")
                    }
                    if (statusCode !in 200..299) {
                        throw LlmTransportException("HTTP $statusCode from LLM endpoint (non-retryable)")
                    }

                    val channel: ByteReadChannel = response.bodyAsChannel()
                    try {
                        while (!channel.isClosedForRead) {
                            val line = channel.readUTF8Line() ?: break
                            when {
                                line.startsWith("data: ") -> {
                                    val data = line.removePrefix("data: ").trim()
                                    if (data == "[DONE]") return@execute
                                    val token = parseStreamToken(data)
                                    if (token != null) emit(token)
                                }
                                // Keep-alive / blank lines — continue reading
                                else -> Unit
                            }
                        }
                    } catch (e: CancellationException) {
                        throw e
                    } catch (e: Exception) {
                        // On Kotlin/JS the Ktor fetch engine aborts the underlying browser
                        // ReadableStream via AbortController when this coroutine is cancelled
                        // (e.g. a React effect unmounts while an SSE stream is live). The
                        // resulting DOMException ("BodyStreamBuffer was aborted") surfaces as
                        // a generic Exception rather than CancellationException, causing an
                        // unhandled JS promise rejection. Convert it here so it is handled
                        // cleanly as cooperative cancellation.
                        if (!coroutineContext.isActive) throw CancellationException("SSE stream cancelled", e)
                        throw e
                    }
                }
                // Stream completed successfully — no retry needed.
                return@flow
            } catch (e: RetryableHttpException) {
                lastException = e
            } catch (e: LlmTransportException) {
                throw e
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                // Network errors (timeout, DNS, connection reset) are retryable.
                lastException = e
            }
        }

        throw LlmTransportException(
            "KtorLlmTransport stream failed after ${maxRetries + 1} attempts: ${lastException?.message}",
            lastException
        )
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    /**
     * Parse a single `data:` SSE payload as an OpenAI stream chunk.
     *
     * Returns the delta content string, or null when the chunk contains no content
     * (e.g. role-only chunks, finish_reason chunks, or unrecognised formats).
     */
    private fun parseStreamToken(data: String): String? = try {
        val obj = SSE_JSON.parseToJsonElement(data).jsonObject
        obj["choices"]
            ?.jsonArray
            ?.firstOrNull()
            ?.jsonObject
            ?.get("delta")
            ?.jsonObject
            ?.get("content")
            ?.jsonPrimitive
            ?.contentOrNull
    } catch (_: Exception) {
        // Malformed JSON chunk — skip silently; the stream remains open
        null
    }
}

/** Internal marker for HTTP errors that should trigger a retry. */
private class RetryableHttpException(val statusCode: Int, message: String) : Exception(message)

/**
 * Thrown when [KtorLlmTransport] encounters a non-recoverable network or
 * protocol error. Always wraps the original cause for traceability.
 */
class LlmTransportException(message: String, cause: Throwable? = null) : Exception(message, cause)
