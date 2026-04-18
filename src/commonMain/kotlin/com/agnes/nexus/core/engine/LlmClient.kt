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
    private val isGuest: Boolean = false,
    private val preferredProvider: String? = null
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
                "No API key configured. Add OPENROUTER_API_KEY (or GEMINI_API_KEY / GROK_API_KEY / MERCURY_API_KEY)."
            )
        }

        // Provider-first routing: if the caller explicitly chose a provider, honor it
        // verbatim. Model is passed through unchanged — the UI is responsible for pairing
        // (provider, model); any mismatch surfaces as an API-level error rather than being
        // silently coerced here. If the chosen provider's key is blank, we hard-fail with a
        // clear error rather than silently falling back to another provider — silent fallback
        // masks configuration errors (e.g. user picks Mercury, key is absent, requests go to
        // Grok with a Mercury model id → cryptic 404).
        when (preferredProvider?.lowercase()) {
            "openrouter" -> return if (keys.openrouterKey.isNotBlank()) {
                ProviderConfig(OPENROUTER_ENDPOINT, keys.openrouterKey, model)
            } else throw IllegalStateException(
                "Provider 'openrouter' selected but OPENROUTER_API_KEY is missing."
            )
            "google", "gemini" -> return if (keys.geminiKey.isNotBlank()) {
                ProviderConfig(GEMINI_ENDPOINT, keys.geminiKey, model)
            } else throw IllegalStateException(
                "Provider 'google' selected but GEMINI_API_KEY is missing."
            )
            "grok" -> return if (keys.grokKey.isNotBlank()) {
                ProviderConfig(GROK_ENDPOINT, keys.grokKey, model)
            } else throw IllegalStateException(
                "Provider 'grok' selected but GROK_API_KEY is missing."
            )
            "mercury" -> return if (keys.mercuryKey.isNotBlank()) {
                ProviderConfig(MERCURY_ENDPOINT, keys.mercuryKey, model)
            } else throw IllegalStateException(
                "Provider 'mercury' selected but MERCURY_API_KEY is missing."
            )
            else -> Unit  // null / empty / unknown → fall through to key-priority chain.
        }

        // Fallback: static key-priority chain (openrouter > gemini > grok > mercury).
        // Reached only when no preferredProvider was specified.
        if (keys.openrouterKey.isNotBlank()) {
            return ProviderConfig(OPENROUTER_ENDPOINT, keys.openrouterKey, model)
        }
        if (keys.geminiKey.isNotBlank()) {
            return ProviderConfig(GEMINI_ENDPOINT, keys.geminiKey, model)
        }
        if (keys.grokKey.isNotBlank()) {
            return ProviderConfig(GROK_ENDPOINT, keys.grokKey, model)
        }
        return ProviderConfig(MERCURY_ENDPOINT, keys.mercuryKey, model)
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
        const val MERCURY_ENDPOINT = "https://api.inceptionlabs.ai/v1/chat/completions"
        const val DEFAULT_MODEL = "deepseek/deepseek-chat"
        const val GUEST_MODEL = "x-ai/grok-3-mini-beta"
    }
}
