package com.agnes.nexus.core.engine

import kotlinx.coroutines.suspendCancellableCoroutine
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException

/**
 * JS-facing credential store that resolves API keys through encrypted callbacks
 * provided by the TypeScript host (e.g. Firestore + vault encryption).
 *
 * Unlike [JsApiKeyProvider] which holds keys as plain strings passed at init time,
 * this class fetches keys on demand from the host's encrypted storage. Keys are
 * cached in memory after first resolution and cleared on [clearAll].
 *
 * This class is **not** an [ApiKeyProvider] directly (suspend functions can't be
 * `@JsExport`ed). Use [toApiKeyProvider] internally to bridge to the engine.
 *
 * ## Usage from TypeScript
 * ```ts
 * const store = new CredentialStoreJs(
 *   (key, onComplete, onError) => { /* fetch from encrypted Firestore */ },
 *   (key, value, onComplete, onError) => { /* write to encrypted Firestore */ },
 *   (key, onComplete, onError) => { /* delete from encrypted Firestore */ },
 * );
 * engine.initWithCredentialStore(store);
 * ```
 */
@JsExport
class CredentialStoreJs(
    private val jsGetEncrypted: (
        key: String,
        onComplete: (String?) -> Unit,
        onError: (String) -> Unit
    ) -> Unit,
    private val jsSetEncrypted: (
        key: String,
        value: String,
        onComplete: () -> Unit,
        onError: (String) -> Unit
    ) -> Unit,
    private val jsDeleteKey: (
        key: String,
        onComplete: () -> Unit,
        onError: (String) -> Unit
    ) -> Unit
) {

    // In-memory cache — populated on first resolve, cleared on clearAll/clearCredentials.
    internal var cachedKeys: ApiKeyProvider.ApiKeys? = null

    /**
     * Resolve all API keys. Suspend-based — called internally by the engine.
     */
    internal suspend fun resolveKeys(): ApiKeyProvider.ApiKeys {
        cachedKeys?.let { return it }

        val openrouter = getKey(KEY_OPENROUTER) ?: ""
        val gemini = getKey(KEY_GEMINI) ?: ""
        val grok = getKey(KEY_GROK) ?: ""
        val mercury = getKey(KEY_MERCURY) ?: ""

        val keys = ApiKeyProvider.ApiKeys(
            openrouterKey = openrouter,
            geminiKey = gemini,
            grokKey = grok,
            mercuryKey = mercury
        )
        cachedKeys = keys
        return keys
    }

    /**
     * Creates an [ApiKeyProvider] backed by this credential store.
     * Used internally by [CognitiveEngineJs.initWithCredentialStore].
     */
    internal fun toApiKeyProvider(): ApiKeyProvider = object : ApiKeyProvider {
        override suspend fun apiKeys(): ApiKeyProvider.ApiKeys = resolveKeys()
    }

    /**
     * Store an API key for the given provider.
     *
     * @param provider One of `"openrouter"`, `"gemini"`, `"grok"`, `"mercury"`.
     * @param key      The raw API key string.
     * @param onComplete Called when the key is persisted.
     * @param onError    Called if persistence fails.
     */
    fun storeKey(
        provider: String,
        key: String,
        onComplete: () -> Unit,
        onError: (String) -> Unit
    ) {
        val storageKey = when (provider) {
            "openrouter" -> KEY_OPENROUTER
            "gemini" -> KEY_GEMINI
            "grok" -> KEY_GROK
            "mercury" -> KEY_MERCURY
            else -> {
                onError("Unknown provider: $provider")
                return
            }
        }
        cachedKeys = null
        jsSetEncrypted(storageKey, key, onComplete, onError)
    }

    /**
     * Delete a single provider's key from the encrypted store.
     */
    fun deleteKey(
        provider: String,
        onComplete: () -> Unit,
        onError: (String) -> Unit
    ) {
        val storageKey = when (provider) {
            "openrouter" -> KEY_OPENROUTER
            "gemini" -> KEY_GEMINI
            "grok" -> KEY_GROK
            "mercury" -> KEY_MERCURY
            else -> {
                onError("Unknown provider: $provider")
                return
            }
        }
        cachedKeys = null
        jsDeleteKey(storageKey, onComplete, onError)
    }

    /**
     * Clear all cached credentials from KMP memory.
     * Does NOT delete from the encrypted store.
     */
    fun clearCredentials() {
        cachedKeys = null
    }

    /**
     * Clear all keys from both memory and the encrypted store.
     */
    fun clearAll(
        onComplete: () -> Unit,
        onError: (String) -> Unit
    ) {
        cachedKeys = null
        var remaining = 4
        var firstError: String? = null

        val onOne = {
            remaining--
            if (remaining == 0) {
                if (firstError != null) onError(firstError!!) else onComplete()
            }
        }
        val onOneError = { err: String ->
            if (firstError == null) firstError = err
            remaining--
            if (remaining == 0) onError(firstError!!)
        }

        jsDeleteKey(KEY_OPENROUTER, onOne, onOneError)
        jsDeleteKey(KEY_GEMINI, onOne, onOneError)
        jsDeleteKey(KEY_GROK, onOne, onOneError)
        jsDeleteKey(KEY_MERCURY, onOne, onOneError)
    }

    /**
     * Check whether any key is available without triggering a full resolve.
     */
    fun hasAnyKey(
        onComplete: (Boolean) -> Unit,
        onError: (String) -> Unit
    ) {
        val cached = cachedKeys
        if (cached != null) {
            onComplete(cached.hasAnyKey())
            return
        }
        jsGetEncrypted(KEY_OPENROUTER, { orKey ->
            if (orKey != null && orKey.isNotBlank()) {
                onComplete(true)
                return@jsGetEncrypted
            }
            jsGetEncrypted(KEY_GEMINI, { gKey ->
                if (gKey != null && gKey.isNotBlank()) {
                    onComplete(true)
                    return@jsGetEncrypted
                }
                jsGetEncrypted(KEY_GROK, { xKey ->
                    if (xKey != null && xKey.isNotBlank()) {
                        onComplete(true)
                        return@jsGetEncrypted
                    }
                    jsGetEncrypted(KEY_MERCURY, { mKey ->
                        onComplete(mKey != null && mKey.isNotBlank())
                    }, onError)
                }, onError)
            }, onError)
        }, onError)
    }

    // ── Private ──────────────────────────────────────────────────────────────

    private suspend fun getKey(key: String): String? =
        suspendCancellableCoroutine { cont ->
            jsGetEncrypted(
                key,
                { value -> cont.resume(value) },
                { err -> cont.resumeWithException(RuntimeException(err)) }
            )
        }

    private companion object {
        const val KEY_OPENROUTER = "nexus_credential_openrouter"
        const val KEY_GEMINI = "nexus_credential_gemini"
        const val KEY_GROK = "nexus_credential_grok"
        const val KEY_MERCURY = "nexus_credential_mercury"
    }
}
