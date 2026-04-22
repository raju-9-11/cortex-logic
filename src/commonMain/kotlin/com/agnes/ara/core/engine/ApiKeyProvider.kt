package com.agnes.ara.core.engine

/**
 * Supplies API keys for the supported LLM providers.
 *
 * Platform layers (Firebase Remote Config, Keychain, etc.) implement this
 * interface and hydrate keys at runtime.
 */
interface ApiKeyProvider {
    suspend fun apiKeys(): ApiKeys

    data class ApiKeys(
        val openrouterKey: String = "",
        val geminiKey: String = "",
        val grokKey: String = "",
        val mercuryKey: String = ""
    ) {
        fun hasAnyKey(): Boolean =
            openrouterKey.isNotBlank() ||
                geminiKey.isNotBlank() ||
                grokKey.isNotBlank() ||
                mercuryKey.isNotBlank()
    }
}
