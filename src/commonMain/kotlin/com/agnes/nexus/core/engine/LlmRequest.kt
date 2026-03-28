package com.agnes.nexus.core.engine

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
