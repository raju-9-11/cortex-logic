package com.agnes.nexus.core.engine

import kotlinx.serialization.json.*

/**
 * OpenAI / OpenRouter compatible chat completion payload.
 */
data class LlmRequest(
    val model: String,
    val messages: List<LlmMessage>,
    val temperature: Double = 0.7,
    val maxTokens: Int = 4096,
    val stream: Boolean = true,
    val topP: Double = 1.0
)

data class LlmMessage(
    val role: String,
    val content: LlmContent
)

sealed interface LlmContent {
    data class Text(val value: String) : LlmContent
    data class List(val parts: kotlin.collections.List<Part>) : LlmContent {
        sealed interface Part {
            data class Text(val text: String) : Part
            data class Image(val imageUrl: String) : Part
        }
    }
}

/**
 * Serialises [LlmRequest] to an OpenAI-compatible [JsonObject] without requiring
 * `@Serializable` on the domain model (which uses a sealed interface for content).
 *
 * Extracted here so that both [KtorLlmTransport] (commonMain/jsMain) and the
 * Android Retrofit transport can share the same wire format without duplicating
 * the request/message model hierarchy.
 *
 * Supports both text-only and multimodal message content:
 *   - [LlmContent.Text]   → `"content": "<string>"`
 *   - [LlmContent.List]   → `"content": [{ "type": "text"|"image_url", ... }]`
 */
fun LlmRequest.toJsonBody(): JsonObject = buildJsonObject {
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
