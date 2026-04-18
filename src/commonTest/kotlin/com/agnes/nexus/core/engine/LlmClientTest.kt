package com.agnes.nexus.core.engine

import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.test.runTest
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue

/**
 * Verifies provider resolution in [LlmClient].
 *
 * Routing rules:
 *   1. If [LlmClient.preferredProvider] is set AND that provider's key is non-blank →
 *      route to that provider's native endpoint with the model passed through verbatim.
 *   2. If [LlmClient.preferredProvider] is set but that provider's key is BLANK →
 *      throw [IllegalStateException] (hard-fail; no silent fallback). This surfaces
 *      misconfiguration immediately rather than routing to a mismatched provider.
 *   3. If [LlmClient.preferredProvider] is null/blank/unknown → fall back to the static
 *      key-priority chain: openrouter → gemini → grok → mercury.
 *
 * No model coercion: if the UI pairs an invalid model with a provider, the provider's
 * API returns the error. The UI is the source of truth for (provider, model) pairing.
 */
class LlmClientTest {

    private class CapturingTransport : LlmTransport {
        var lastEndpoint: String? = null
        var lastAuthorization: String? = null
        var lastRequest: LlmRequest? = null

        override fun stream(
            endpoint: String,
            authorization: String,
            request: LlmRequest
        ): Flow<String> {
            lastEndpoint = endpoint
            lastAuthorization = authorization
            lastRequest = request
            return flowOf("ok")
        }
    }

    private class StaticKeys(private val keys: ApiKeyProvider.ApiKeys) : ApiKeyProvider {
        override suspend fun apiKeys(): ApiKeyProvider.ApiKeys = keys
    }

    private suspend fun drive(
        keys: ApiKeyProvider.ApiKeys,
        defaultModel: String = "deepseek/deepseek-chat",
        preferredProvider: String? = null
    ): CapturingTransport {
        val transport = CapturingTransport()
        val client = LlmClient(
            apiKeyProvider = StaticKeys(keys),
            transport = transport,
            defaultModel = defaultModel,
            preferredProvider = preferredProvider
        )
        client.stream("sys", emptyList(), "hi", null).toList()
        return transport
    }

    // ── Error handling ────────────────────────────────────────────────────────

    @Test
    fun noKeys_throws() = runTest {
        val transport = CapturingTransport()
        val client = LlmClient(
            apiKeyProvider = StaticKeys(ApiKeyProvider.ApiKeys()),
            transport = transport
        )
        val ex = assertFailsWith<IllegalStateException> {
            client.stream("sys", emptyList(), "hi", null).first()
        }
        assertTrue(ex.message!!.contains("MERCURY_API_KEY"))
    }

    // ── Fallback: key-priority chain (preferredProvider = null) ───────────────

    @Test
    fun onlyOpenrouter_routesToOpenrouter() = runTest {
        val t = drive(ApiKeyProvider.ApiKeys(openrouterKey = "or-k"))
        assertEquals("https://openrouter.ai/api/v1/chat/completions", t.lastEndpoint)
        assertEquals("or-k", t.lastAuthorization)
        assertEquals("deepseek/deepseek-chat", t.lastRequest?.model)
    }

    @Test
    fun onlyGemini_routesToGemini_modelPassthrough() = runTest {
        // No coercion: whatever model was provided flows through verbatim.
        val t = drive(ApiKeyProvider.ApiKeys(geminiKey = "gk"))
        assertEquals(
            "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
            t.lastEndpoint
        )
        assertEquals("gk", t.lastAuthorization)
        assertEquals("deepseek/deepseek-chat", t.lastRequest?.model)
    }

    @Test
    fun onlyGrok_routesToGrok() = runTest {
        val t = drive(ApiKeyProvider.ApiKeys(grokKey = "xk"))
        assertEquals("https://api.x.ai/v1/chat/completions", t.lastEndpoint)
        assertEquals("xk", t.lastAuthorization)
        assertEquals("deepseek/deepseek-chat", t.lastRequest?.model)
    }

    @Test
    fun onlyMercury_routesToMercury() = runTest {
        // No coercion: model passes through verbatim (was previously coerced to mercury-2).
        val t = drive(ApiKeyProvider.ApiKeys(mercuryKey = "mk"))
        assertEquals("https://api.inceptionlabs.ai/v1/chat/completions", t.lastEndpoint)
        assertEquals("mk", t.lastAuthorization)
        assertEquals("deepseek/deepseek-chat", t.lastRequest?.model)
    }

    @Test
    fun allKeys_prefersOpenrouter() = runTest {
        val t = drive(
            ApiKeyProvider.ApiKeys(
                openrouterKey = "or",
                geminiKey = "g",
                grokKey = "x",
                mercuryKey = "m"
            )
        )
        assertEquals("https://openrouter.ai/api/v1/chat/completions", t.lastEndpoint)
        assertEquals("or", t.lastAuthorization)
    }

    @Test
    fun geminiAndMercury_prefersGemini() = runTest {
        val t = drive(ApiKeyProvider.ApiKeys(geminiKey = "g", mercuryKey = "m"))
        assertEquals(
            "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
            t.lastEndpoint
        )
    }

    @Test
    fun grokAndMercury_prefersGrok() = runTest {
        val t = drive(ApiKeyProvider.ApiKeys(grokKey = "x", mercuryKey = "m"))
        assertEquals("https://api.x.ai/v1/chat/completions", t.lastEndpoint)
    }

    // ── Provider-first routing: preferredProvider honored over priority ───────

    @Test
    fun preferredProvider_mercury_routesToMercury_evenWithOpenrouterKey() = runTest {
        val t = drive(
            keys = ApiKeyProvider.ApiKeys(openrouterKey = "or", mercuryKey = "mk"),
            defaultModel = "mercury-2",
            preferredProvider = "mercury"
        )
        assertEquals("https://api.inceptionlabs.ai/v1/chat/completions", t.lastEndpoint)
        assertEquals("mk", t.lastAuthorization)
        assertEquals("mercury-2", t.lastRequest?.model)
    }

    @Test
    fun preferredProvider_grok_routesToGrok_evenWithOpenrouterKey() = runTest {
        val t = drive(
            keys = ApiKeyProvider.ApiKeys(openrouterKey = "or", grokKey = "xk"),
            defaultModel = "grok-3-mini-beta",
            preferredProvider = "grok"
        )
        assertEquals("https://api.x.ai/v1/chat/completions", t.lastEndpoint)
        assertEquals("xk", t.lastAuthorization)
        assertEquals("grok-3-mini-beta", t.lastRequest?.model)
    }

    @Test
    fun preferredProvider_google_routesToGemini_evenWithOpenrouterKey() = runTest {
        val t = drive(
            keys = ApiKeyProvider.ApiKeys(openrouterKey = "or", geminiKey = "gk"),
            defaultModel = "gemini-2.0-flash-001",
            preferredProvider = "google"
        )
        assertEquals(
            "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
            t.lastEndpoint
        )
        assertEquals("gk", t.lastAuthorization)
        assertEquals("gemini-2.0-flash-001", t.lastRequest?.model)
    }

    @Test
    fun preferredProvider_gemini_alias_acceptedAsGoogle() = runTest {
        val t = drive(
            keys = ApiKeyProvider.ApiKeys(openrouterKey = "or", geminiKey = "gk"),
            defaultModel = "gemini-1.5-pro",
            preferredProvider = "gemini"
        )
        assertEquals(
            "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
            t.lastEndpoint
        )
        assertEquals("gk", t.lastAuthorization)
    }

    @Test
    fun preferredProvider_openrouter_routesToOpenrouter() = runTest {
        val t = drive(
            keys = ApiKeyProvider.ApiKeys(
                openrouterKey = "or",
                geminiKey = "g",
                grokKey = "x",
                mercuryKey = "m"
            ),
            preferredProvider = "openrouter"
        )
        assertEquals("https://openrouter.ai/api/v1/chat/completions", t.lastEndpoint)
        assertEquals("or", t.lastAuthorization)
    }

    // ── Case-insensitive provider name ────────────────────────────────────────

    @Test
    fun preferredProvider_mixedCase_normalized() = runTest {
        val t = drive(
            keys = ApiKeyProvider.ApiKeys(openrouterKey = "or", mercuryKey = "mk"),
            preferredProvider = "MeRcUrY"
        )
        assertEquals("https://api.inceptionlabs.ai/v1/chat/completions", t.lastEndpoint)
    }

    // ── Hard-fail when preferred provider's key is blank ──────────────────────

    private suspend fun expectHardFail(
        keys: ApiKeyProvider.ApiKeys,
        preferredProvider: String,
        expectedKeyName: String
    ) {
        val client = LlmClient(
            apiKeyProvider = StaticKeys(keys),
            transport = CapturingTransport(),
            preferredProvider = preferredProvider
        )
        val ex = assertFailsWith<IllegalStateException> {
            client.stream("sys", emptyList(), "hi", null).first()
        }
        assertTrue(
            ex.message!!.contains(expectedKeyName),
            "Expected error to mention $expectedKeyName, got: ${ex.message}"
        )
    }

    @Test
    fun preferredProvider_mercury_withBlankKey_throws() = runTest {
        expectHardFail(
            keys = ApiKeyProvider.ApiKeys(openrouterKey = "or"),
            preferredProvider = "mercury",
            expectedKeyName = "MERCURY_API_KEY"
        )
    }

    @Test
    fun preferredProvider_grok_withBlankKey_throws() = runTest {
        expectHardFail(
            keys = ApiKeyProvider.ApiKeys(geminiKey = "gk"),
            preferredProvider = "grok",
            expectedKeyName = "GROK_API_KEY"
        )
    }

    @Test
    fun preferredProvider_google_withBlankKey_throws() = runTest {
        expectHardFail(
            keys = ApiKeyProvider.ApiKeys(mercuryKey = "mk"),
            preferredProvider = "google",
            expectedKeyName = "GEMINI_API_KEY"
        )
    }

    @Test
    fun preferredProvider_openrouter_withBlankKey_throws() = runTest {
        expectHardFail(
            keys = ApiKeyProvider.ApiKeys(mercuryKey = "mk"),
            preferredProvider = "openrouter",
            expectedKeyName = "OPENROUTER_API_KEY"
        )
    }

    // ── Unknown provider still falls back (not an error) ──────────────────────

    @Test
    fun preferredProvider_unknown_fallsBackToPriorityChain() = runTest {
        val t = drive(
            keys = ApiKeyProvider.ApiKeys(openrouterKey = "or", mercuryKey = "mk"),
            preferredProvider = "bogus-provider"
        )
        assertEquals("https://openrouter.ai/api/v1/chat/completions", t.lastEndpoint)
    }

    // ── Null preferredProvider preserves legacy behavior ──────────────────────

    @Test
    fun preferredProvider_null_usesPriorityChain() = runTest {
        val t = drive(
            keys = ApiKeyProvider.ApiKeys(openrouterKey = "or", mercuryKey = "mk"),
            preferredProvider = null
        )
        assertEquals("https://openrouter.ai/api/v1/chat/completions", t.lastEndpoint)
    }
}
