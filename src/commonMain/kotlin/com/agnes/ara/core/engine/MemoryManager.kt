package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.models.Message
import com.agnes.ara.core.domain.models.MessageRole

/**
 * KMP Memory Manager - handles context windowing and token estimation.
 * Ported from Nexus React 19 SPA for parity.
 */
object MemoryManager {
    private const val MAX_TOTAL_TOKENS = 128000
    private const val CONSOLIDATION_RATIO = 0.75
    private const val CONTEXT_WINDOW_SIZE = 15

    /** Verbatim history window used before a session summary is ready. */
    const val FALLBACK_CONTEXT_WINDOW = 40

    fun getFallbackContextWindow(): Int = FALLBACK_CONTEXT_WINDOW

    /**
     * Estimates token count for a given text.
     * Uses 4 characters per token as a heuristic (OpenAI/standard).
     */
    fun estimateTokens(text: String?): Int {
        if (text == null) return 0
        return kotlin.math.ceil(text.length / 4.0).toInt()
    }

    fun getMessageTokens(message: Message): Int {
        return estimateTokens(message.content) + 4 // Overhead for role
    }

    data class CognitiveContext(
        val systemPrompt: String,
        val facts: List<String>,
        val longTermSummary: String,
        val activeMessages: List<Message>,
        val tokenCount: TokenMetrics
    )

    data class TokenMetrics(
        val system: Int,
        val facts: Int,
        val summary: Int,
        val chat: Int,
        val total: Int
    )

    fun buildContext(
        systemPrompt: String,
        memoryContext: List<String>,
        summary: String,
        messages: List<Message>
    ): CognitiveContext {
        val systemTokens = estimateTokens(systemPrompt)
        val contextText = memoryContext.joinToString("\n")
        val contextTokens = estimateTokens(contextText)
        val summaryTokens = estimateTokens(summary)
        
        // Take last consolidation keep count messages
        val activeMessages = messages.takeLast(getConsolidationKeepCount())
        val chatTokens = activeMessages.sumOf { getMessageTokens(it) }

        return CognitiveContext(
            systemPrompt = systemPrompt,
            facts = if (contextText.isNotBlank()) listOf(contextText) else emptyList(),
            longTermSummary = summary,
            activeMessages = activeMessages,
            tokenCount = TokenMetrics(
                system = systemTokens,
                facts = contextTokens,
                summary = summaryTokens,
                chat = chatTokens,
                total = systemTokens + contextTokens + summaryTokens + chatTokens
            )
        )
    }

    fun formatSystemPrompt(ctx: CognitiveContext): String {
        return """
            ${ctx.systemPrompt}

            [MEMORY CONTEXT]
            ${ctx.facts.joinToString("\n").ifBlank { "None yet." }}

            [LONG-TERM SUMMARY]
            ${ctx.longTermSummary.ifBlank { "New conversation." }}
        """.trimIndent()
    }

    fun needsConsolidation(context: CognitiveContext): Boolean {
        return context.tokenCount.total > MAX_TOTAL_TOKENS * CONSOLIDATION_RATIO
    }

    fun getMessagesForConsolidation(messages: List<Message>): List<Message> {
        if (messages.size <= CONTEXT_WINDOW_SIZE) return emptyList()
        return messages.dropLast(CONTEXT_WINDOW_SIZE)
    }

    fun getConsolidationKeepCount(): Int {
        return CONTEXT_WINDOW_SIZE * 2
    }

    fun getConsolidationTokenThreshold(): Int {
        return kotlin.math.floor(MAX_TOTAL_TOKENS * CONSOLIDATION_RATIO).toInt()
    }
}
