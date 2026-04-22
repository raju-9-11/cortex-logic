package com.agnes.ara.core.domain.services

import com.agnes.ara.core.domain.models.Message
import com.agnes.ara.core.domain.models.MessageRole
import com.agnes.ara.core.engine.MemoryManager

/**
 * Platform-agnostic session consolidation engine.
 *
 * Extracted from BaseChatViewModel.maybeConsolidateSession() so that the
 * threshold heuristic, LLM prompt, and response parsing are shared across
 * Android and web — only the storage and LLM call are platform-specific.
 *
 * ## Usage
 * ```kotlin
 * if (SessionConsolidationEngine.shouldConsolidate(messages)) {
 *     val result = SessionConsolidationEngine.consolidate(messages) { prompt ->
 *         // platform-specific LLM call
 *         llmRepository.generateText(prompt)
 *     }
 *     updateMessages(result.compressedMessages)
 *     persistSummary(result.summary, result.keyInsights)
 * }
 * ```
 */
object SessionConsolidationEngine {

    data class ConsolidationResult(
        val summary: String,
        val keyInsights: List<String>,
        val compressedMessages: List<Message>
    )

    /**
     * Returns true if the message list has grown beyond the consolidation threshold.
     * Checks both token budget and window size.
     */
    fun shouldConsolidate(messages: List<Message>): Boolean {
        if (messages.isEmpty()) return false
        val tokenEstimate = messages.sumOf { MemoryManager.getMessageTokens(it) }
        val needsByToken = tokenEstimate >= MemoryManager.getConsolidationTokenThreshold()
        val needsByWindow = messages.size > MemoryManager.getConsolidationKeepCount()
        return needsByToken || needsByWindow
    }

    /**
     * Runs the consolidation: generates a summary via [llmCall], parses the result,
     * and returns a trimmed message list alongside the extracted summary.
     *
     * @param messages  Full message history to consolidate.
     * @param llmCall   Platform-provided suspend function that accepts a user-turn prompt
     *                  and returns the full LLM response as a String.
     *                  Caller is responsible for injecting the system prompt via their LLM client.
     */
    suspend fun consolidate(
        messages: List<Message>,
        llmCall: suspend (userPrompt: String, systemPrompt: String) -> String
    ): ConsolidationResult {
        val toConsolidate = MemoryManager.getMessagesForConsolidation(messages)

        val userPrompt = buildConsolidationPrompt(toConsolidate)
        val systemPrompt = "You are a memory consolidation agent. Be concise and factual."
        val rawResponse = llmCall(userPrompt, systemPrompt).trim()

        val (summary, insights) = parseConsolidationResponse(rawResponse)
        val compressed = messages.takeLast(MemoryManager.getConsolidationKeepCount())

        return ConsolidationResult(
            summary = summary,
            keyInsights = insights,
            compressedMessages = compressed
        )
    }

    // ── Internal helpers ──────────────────────────────────────────────────────

    private fun buildConsolidationPrompt(messages: List<Message>): String {
        val transcript = messages.joinToString("\n") { msg ->
            val role = when (msg.role) {
                MessageRole.USER      -> "User"
                MessageRole.ASSISTANT -> "Assistant"
                MessageRole.SYSTEM    -> "System"
                MessageRole.TOOL      -> "Tool"
            }
            "$role: ${msg.content}"
        }
        return """Summarize the session below. Format EXACTLY:
SUMMARY: <2-3 sentences>
INSIGHTS:
- <insight 1>
- <insight 2>
- <insight 3>

--- SESSION ---
$transcript"""
    }

    /**
     * Parses the structured LLM response.
     * Falls back gracefully if the model deviates from the required format.
     */
    internal fun parseConsolidationResponse(raw: String): Pair<String, List<String>> {
        var summary: String? = null
        val insights = mutableListOf<String>()
        var inInsights = false

        for (line in raw.lines()) {
            val trimmed = line.trim()
            when {
                trimmed.startsWith("SUMMARY:") -> {
                    summary = trimmed.removePrefix("SUMMARY:").trim()
                    inInsights = false
                }
                trimmed.startsWith("INSIGHTS:") -> inInsights = true
                inInsights && trimmed.startsWith("-") -> {
                    val item = trimmed.removePrefix("-").trim()
                    if (item.isNotBlank()) insights += item
                }
            }
        }

        if (summary.isNullOrBlank()) {
            summary = raw.lines().firstOrNull { it.isNotBlank() }?.take(240)?.trim()
        }
        return (summary ?: "Session consolidated.") to insights
    }
}
