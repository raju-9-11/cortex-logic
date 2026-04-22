package com.agnes.ara.core.engine

/**
 * Platform-agnostic interface for generating structured JSON from an LLM.
 *
 * Unlike [LlmProvider] (which streams tokens), this interface returns a single
 * complete JSON string — suitable for deterministic extraction tasks such as
 * belief graph deduplication plans.
 *
 * Implementations:
 * - **JS/Web**: Delegates to the TS-side `generateJSON` callback via the
 *   `@JsExport` adapter in jsMain.
 * - **Android**: Can wrap [LlmClient] by collecting the full stream.
 * - **Server** (future): Direct HTTP call to the LLM provider.
 */
interface LlmJsonGenerator {

    /**
     * Send a prompt to the LLM and return the full response as a raw JSON string.
     *
     * @param prompt       The user-facing prompt (e.g. belief node list + merge instructions).
     * @param systemPrompt Instructions for the LLM role (e.g. "strict JSON-only planner").
     * @param temperature  Sampling temperature; lower = more deterministic.
     * @param maxTokens    Maximum tokens in the response.
     * @return Raw JSON string from the LLM.
     * @throws Exception on transport/parse failure — callers should handle gracefully.
     */
    suspend fun generateJson(
        prompt: String,
        systemPrompt: String,
        temperature: Double = 0.1,
        maxTokens: Int = 900
    ): String
}
