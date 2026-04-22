package com.agnes.ara.core.domain.services

import com.agnes.ara.core.domain.models.Message
import com.agnes.ara.core.engine.LlmProvider
import com.agnes.ara.core.engine.MemoryManager
import kotlinx.coroutines.flow.lastOrNull
import kotlinx.datetime.Clock

/**
 * Soul Compaction Service - The system's long-term memory architect.
 * Compresses episodic conversations into durable semantic insights.
 * Ported from Nexus React 19 SPA for parity.
 */
class SoulCompactionService(
    private val llmProvider: LlmProvider,
    private val nsvService: NeuralProjectionService
) {
    companion object {
        const val COMPACTION_THRESHOLD = 80
        const val ACTIVE_SESSION_BUFFER = 20  // Always retain last 20 messages uncompacted
    }

    /**
     * Compact old messages into SemanticTokens when history exceeds threshold.
     * Active session messages (last [ACTIVE_SESSION_BUFFER]) are always retained verbatim.
     * Only triggers compaction when history.size > [COMPACTION_THRESHOLD].
     */
    suspend fun compactIfNeeded(
        moduleId: String,
        history: List<Message>,
        sessionStartedAt: Long? = null
    ): CompactionResult {
        // Only compact when threshold is exceeded
        if (history.size <= COMPACTION_THRESHOLD) {
            return CompactionResult(retainedHistory = history, newTokens = emptyList())
        }

        val messagesToCompact = MemoryManager.getMessagesForConsolidation(history)
            .dropLast(ACTIVE_SESSION_BUFFER.coerceAtMost(history.size))

        if (messagesToCompact.isEmpty()) {
            return CompactionResult(retainedHistory = history, newTokens = emptyList())
        }

        val tokens = mutableListOf<com.agnes.ara.core.domain.model.SemanticToken>()
        try {
            val extractionPrompt = """
                SYSTEM: You are the Soul Compaction Engine.
                Analyze the following conversation fragments from the '$moduleId' module.
                Extract 1-3 durable, high-fidelity facts about the user's state, preferences, or identity.
                Format: one fact per line, starting with a dash (-).
            """.trimIndent()

            val conversationText = messagesToCompact.joinToString("\n") { "${it.role}: ${it.content}" }
            val response = llmProvider.stream(extractionPrompt, emptyList(), conversationText).lastOrNull()

            if (!response.isNullOrBlank()) {
                val facts = response.split("\n")
                    .map { it.trim().removePrefix("-").trim() }
                    .filter { it.isNotBlank() }

                facts.forEach { fact ->
                    val token = com.agnes.ara.core.domain.model.SemanticToken(
                        id = "token_${moduleId}_${kotlinx.datetime.Clock.System.now().toEpochMilliseconds()}",
                        moduleId = moduleId,
                        content = fact,
                        extractedAt = kotlinx.datetime.Clock.System.now().toEpochMilliseconds(),
                        confidence = 0.85f,
                        sourceMessageCount = messagesToCompact.size
                    )
                    tokens.add(token)
                    nsvService.addInsight("[$moduleId] $fact")
                }
            }
        } catch (_: Exception) { /* silent failure — preserve messages */ }

        val retained = history.drop(messagesToCompact.size)
        return CompactionResult(retainedHistory = retained, newTokens = tokens)
    }

    /**
     * Backward-compatible wrapper that returns only the retained history.
     * Prefer the [CompactionResult]-returning overload for new callers.
     */
    suspend fun compactIfNeeded(moduleId: String, history: List<Message>): List<Message> =
        compactIfNeeded(moduleId, history, sessionStartedAt = null).retainedHistory
}

data class CompactionResult(
    val retainedHistory: List<Message>,
    val newTokens: List<com.agnes.ara.core.domain.model.SemanticToken>
)
