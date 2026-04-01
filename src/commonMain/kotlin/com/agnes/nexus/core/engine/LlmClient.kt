package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.models.Message
import com.agnes.nexus.core.domain.models.MessageRole
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.emitAll
import kotlinx.coroutines.flow.flow

/**
 * Platform-agnostic LLM client that wires ApiKeyProvider + LlmTransport.
 */
class LlmClient(
    private val apiKeyProvider: ApiKeyProvider,
    private val transport: LlmTransport,
    private val defaultModel: String = DEFAULT_MODEL,
    private val guestModel: String = GUEST_MODEL,
    private val isGuest: Boolean = false
) : LlmProvider {

    override fun stream(
        systemPrompt: String,
        history: List<Message>,
        userMessage: String,
        imageContent: String?
    ): Flow<String> = flow {
        val messages = buildMessages(systemPrompt, history, userMessage, imageContent)
        val resolvedModel = if (isGuest) guestModel else defaultModel
        val request = LlmRequest(
            model = resolvedModel,
            messages = messages,
            stream = true
        )

        val provider = resolveProvider(resolvedModel)
        val finalRequest = if (provider.model != request.model) {
            request.copy(model = provider.model)
        } else request

        emitAll(transport.stream(provider.endpoint, provider.authorization, finalRequest))
    }

    private suspend fun resolveProvider(model: String): ProviderConfig {
        val keys = apiKeyProvider.apiKeys()
        if (!keys.hasAnyKey()) {
            throw IllegalStateException(
                "No API key configured. Add OPENROUTER_API_KEY (or GEMINI_API_KEY / GROK_API_KEY)."
            )
        }

        if (keys.openrouterKey.isNotBlank()) {
            return ProviderConfig(
                endpoint = OPENROUTER_ENDPOINT,
                authorization = keys.openrouterKey,
                model = model
            )
        }

        if (keys.geminiKey.isNotBlank()) {
            val geminiModel = if (model.startsWith("gemini-")) model else "gemini-2.0-flash-001"
            return ProviderConfig(
                endpoint = GEMINI_ENDPOINT,
                authorization = keys.geminiKey,
                model = geminiModel
            )
        }

        return ProviderConfig(
            endpoint = GROK_ENDPOINT,
            authorization = keys.grokKey,
            model = model
        )
    }

    private fun buildMessages(
        systemPrompt: String,
        history: List<Message>,
        userMessage: String,
        imageContent: String?
    ): List<LlmMessage> {
        val messages = mutableListOf<LlmMessage>()

        if (systemPrompt.isNotBlank()) {
            messages.add(
                LlmMessage(
                    role = "system",
                    content = LlmContent.Text(systemPrompt)
                )
            )
        }

        history.forEach { msg ->
            val role = when (msg.role) {
                MessageRole.USER -> "user"
                MessageRole.ASSISTANT -> "assistant"
                MessageRole.SYSTEM -> "system"
                MessageRole.TOOL -> "tool"
            }
            messages.add(LlmMessage(role = role, content = LlmContent.Text(msg.content)))
        }

        if (imageContent != null) {
            val parts = listOf(
                LlmContent.List.Part.Text(userMessage),
                LlmContent.List.Part.Image(imageContent)
            )
            messages.add(
                LlmMessage(
                    role = "user",
                    content = LlmContent.List(parts)
                )
            )
        } else {
            messages.add(
                LlmMessage(
                    role = "user",
                    content = LlmContent.Text(userMessage)
                )
            )
        }
        return messages
    }

    private data class ProviderConfig(
        val endpoint: String,
        val authorization: String,
        val model: String
    )

    private companion object {
        const val OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions"
        const val GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions"
        const val GROK_ENDPOINT = "https://api.x.ai/v1/chat/completions"
        const val DEFAULT_MODEL = "deepseek/deepseek-chat"
        const val GUEST_MODEL = "x-ai/grok-3-mini-beta"
    }
}
