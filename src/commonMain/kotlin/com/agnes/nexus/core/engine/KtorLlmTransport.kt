package com.agnes.nexus.core.engine

import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.utils.io.*
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.serialization.json.*

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
 */
class KtorLlmTransport(
    private val httpClient: HttpClient
) : LlmTransport {

    /**
     * Streams an LLM chat completion token-by-token using Server-Sent Events.
     *
     * The [request] is serialized to a standard OpenAI-compatible JSON body.
     * Each `data:` SSE line is parsed as an OpenAI stream chunk and the token
     * content is emitted downstream.
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
        try {
            httpClient.preparePost(endpoint) {
                header(HttpHeaders.Authorization, "Bearer $authorization")
                contentType(ContentType.Application.Json)
                setBody(body.toString())
            }.execute { response ->
                val channel: ByteReadChannel = response.bodyAsChannel()
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
            }
        } catch (e: LlmTransportException) {
            throw e
        } catch (e: Exception) {
            throw LlmTransportException("KtorLlmTransport stream failed: ${e.message}", e)
        }
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    /**
     * Parse a single `data:` SSE payload as an OpenAI stream chunk.
     *
     * Returns the delta content string, or null when the chunk contains no content
     * (e.g. role-only chunks, finish_reason chunks, or unrecognised formats).
     */
    private fun parseStreamToken(data: String): String? = try {
        val json = Json { ignoreUnknownKeys = true }
        val obj = json.parseToJsonElement(data).jsonObject
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

    /**
     * Serialize [LlmRequest] to an OpenAI-compatible [JsonObject] without requiring
     * `@Serializable` on the domain model (which uses a sealed interface for content).
     *
     * Supports both text-only and multimodal message content:
     *   - [LlmContent.Text]              → `"content": "<string>"`
     *   - [LlmContent.List] with parts   → `"content": [{ "type": "text"|"image_url", ... }]`
     */
    private fun LlmRequest.toJsonBody(): JsonObject = buildJsonObject {
        put("model", model)
        put("temperature", temperature)
        put("max_tokens", maxTokens)
        put("stream", stream)
        put("top_p", topP)
        putJsonArray("messages") {
            messages.forEach { msg ->
                addJsonObject {
                    put("role", msg.role)
                    when (val content = msg.content) {
                        is LlmContent.Text -> put("content", content.value)
                        is LlmContent.List -> putJsonArray("content") {
                            content.parts.forEach { part ->
                                addJsonObject {
                                    when (part) {
                                        is LlmContent.List.Part.Text -> {
                                            put("type", "text")
                                            put("text", part.text)
                                        }
                                        is LlmContent.List.Part.Image -> {
                                            put("type", "image_url")
                                            putJsonObject("image_url") {
                                                put("url", part.imageUrl)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

/**
 * Thrown when [KtorLlmTransport] encounters a non-recoverable network or
 * protocol error. Always wraps the original cause for traceability.
 */
class LlmTransportException(message: String, cause: Throwable? = null) : Exception(message, cause)
