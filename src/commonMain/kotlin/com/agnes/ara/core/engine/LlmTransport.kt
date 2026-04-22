package com.agnes.ara.core.engine

import kotlinx.coroutines.flow.Flow

/**
 * Abstract transport for issuing chat completions.
 *
 * Platform-specific layers (Android, iOS, desktop) provide implementations
 * that perform the actual HTTP/SSE work.
 */
interface LlmTransport {
    /**
     * Streams a chat completion response token-by-token.
     */
    fun stream(endpoint: String, authorization: String, request: LlmRequest): Flow<String>
}
