package com.agnes.nexus.core.engine

/**
 * JS-side implementation of [ApiKeyProvider] using a simple holder pattern.
 *
 * Kotlin/JS compiles `suspend` to Promises, but keys are supplied synchronously at
 * TypeScript initialization time — this holder avoids a full async round-trip for
 * something that is effectively a constant after [CognitiveEngineJs.init] returns.
 *
 * All keys default to empty string; [ApiKeyProvider.ApiKeys.hasAnyKey] will
 * return false if none are provided, causing [LlmClient] to throw a clear
 * IllegalStateException rather than silently misbehaving.
 *
 * @param openrouterKey OpenRouter API key (preferred provider).
 * @param geminiKey     Google Gemini API key.
 * @param grokKey       xAI Grok API key.
 * @param mercuryKey    Inception Labs Mercury API key.
 */
internal class JsApiKeyProvider(
    private val openrouterKey: String = "",
    private val geminiKey: String = "",
    private val grokKey: String = "",
    private val mercuryKey: String = ""
) : ApiKeyProvider {

    override suspend fun apiKeys(): ApiKeyProvider.ApiKeys = ApiKeyProvider.ApiKeys(
        openrouterKey = openrouterKey,
        geminiKey = geminiKey,
        grokKey = grokKey,
        mercuryKey = mercuryKey
    )
}
