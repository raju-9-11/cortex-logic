package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.models.Message
import kotlinx.coroutines.flow.Flow

/**
 * LlmProvider - Platform-agnostic interface for LLM streaming.
 */
interface LlmProvider {
    /**
     * Streams an LLM response token-by-token.
     */
    fun stream(systemPrompt: String, history: List<Message>, userMessage: String, imageContent: String? = null): Flow<String>
}
