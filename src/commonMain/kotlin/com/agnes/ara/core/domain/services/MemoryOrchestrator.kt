package com.agnes.ara.core.domain.services

import com.agnes.ara.core.domain.models.Message
import com.agnes.ara.core.rag.RagMatch
import com.agnes.ara.core.rag.RagService
import com.agnes.ara.core.rag.RagVaultLockedException

/**
 * Memory Orchestrator (KMP) — mirrors the web memory combiner.
 * Builds a lightweight context summary by blending episodic history,
 * semantic facts (NSV/compaction), and optional RAG retrieval results.
 *
 * All dependencies are optional to keep the surface usable in pure KMP
 * modules/tests. Vault gating is handled via the [requiresVault] flag and
 * the [isVaultUnlocked] callback so callers can short-circuit sensitive
 * fetches when the vault is closed.
 */
class MemoryOrchestrator(
    private val episodicMemoryRepository: EpisodicMemoryRepository?,
    private val nsvService: NeuralProjectionService?,
    private val ragService: RagService?,
    private val isVaultUnlocked: () -> Boolean = { true }
) {

    suspend fun buildContextSummary(
        moduleId: String,
        userId: String,
        memoryQuery: String = "",
        cachedThread: List<Message>? = null,
        cachedSemanticFacts: List<String>? = null,
        cachedRagMatches: List<RagMatch>? = null,
        requiresVault: Boolean = false
    ): MemoryOrchestrationResult {
        val notes = mutableListOf<String>()
        val vaultOpen = !requiresVault || isVaultUnlocked()

        val episodic = resolveEpisodicThread(
            moduleId = moduleId,
            userId = userId,
            vaultOpen = vaultOpen,
            requiresVault = requiresVault,
            cachedThread = cachedThread,
            notes = notes
        )

        val semanticFacts = resolveSemanticFacts(
            vaultOpen = vaultOpen,
            requiresVault = requiresVault,
            cachedFacts = cachedSemanticFacts,
            notes = notes
        )

        val ragMatches = resolveRagFacts(
            moduleId = moduleId,
            userId = userId,
            memoryQuery = memoryQuery,
            vaultOpen = vaultOpen,
            requiresVault = requiresVault,
            cachedMatches = cachedRagMatches,
            notes = notes
        )

        val episodicSummary = summarizeThread(episodic)
        val combinedFacts = semanticFacts + ragMatches.map { it.content }
        val contextSummary = buildContextSummaryText(
            episodicSummary = episodicSummary,
            semanticFacts = semanticFacts,
            ragMatches = ragMatches
        )

        val status = resolveStatus(
            requiresVault = requiresVault,
            vaultOpen = vaultOpen,
            hasEpisodic = episodic.isNotEmpty(),
            hasSemantic = semanticFacts.isNotEmpty(),
            hasRag = ragMatches.isNotEmpty() || memoryQuery.isBlank()
        )

        return MemoryOrchestrationResult(
            moduleId = moduleId,
            userId = userId,
            episodicThread = episodic,
            episodicSummary = episodicSummary,
            semanticFacts = semanticFacts,
            ragMatches = ragMatches,
            combinedFacts = combinedFacts,
            contextSummary = contextSummary,
            status = status,
            notes = notes,
            requiresVault = requiresVault
        )
    }

    private suspend fun resolveEpisodicThread(
        moduleId: String,
        userId: String,
        vaultOpen: Boolean,
        requiresVault: Boolean,
        cachedThread: List<Message>?,
        notes: MutableList<String>
    ): List<Message> {
        if (!vaultOpen && requiresVault) {
            if (cachedThread != null) {
                notes += "Vault locked; using cached episodic thread."
                return cachedThread
            }
            notes += "Vault locked; episodic thread unavailable."
            return emptyList()
        }

        val repository = episodicMemoryRepository ?: return cachedThread ?: emptyList()
        return runCatching { repository.getThread(moduleId, userId) }
            .onFailure { notes += "Episodic fetch failed: ${it.message}" }
            .getOrElse { cachedThread ?: emptyList() }
    }

    private suspend fun resolveSemanticFacts(
        vaultOpen: Boolean,
        requiresVault: Boolean,
        cachedFacts: List<String>?,
        notes: MutableList<String>
    ): List<String> {
        if (!vaultOpen && requiresVault) {
            if (cachedFacts != null) {
                notes += "Vault locked; using cached semantic facts."
                return cachedFacts
            }
            notes += "Vault locked; semantic facts unavailable."
            return emptyList()
        }

        val service = nsvService ?: return cachedFacts ?: emptyList()
        return runCatching { service.getCompactedInsights() }
            .onFailure { notes += "Semantic fetch failed: ${it.message}" }
            .getOrElse { cachedFacts ?: emptyList() }
    }

    private suspend fun resolveRagFacts(
        moduleId: String,
        userId: String,
        memoryQuery: String,
        vaultOpen: Boolean,
        requiresVault: Boolean,
        cachedMatches: List<RagMatch>?,
        notes: MutableList<String>
    ): List<RagMatch> {
        if (memoryQuery.isBlank()) return cachedMatches ?: emptyList()

        if (!vaultOpen && requiresVault) {
            if (cachedMatches != null) {
                notes += "Vault locked; using cached RAG matches."
                return cachedMatches
            }
            notes += "Vault locked; RAG retrieval skipped."
            return emptyList()
        }

        val service = ragService ?: return cachedMatches ?: emptyList()
        val filters = if (userId.isNotBlank()) mapOf("uid" to userId) else emptyMap()
        return runCatching { service.retrieve(query = memoryQuery, namespace = moduleId, filters = filters).matches }
            .onFailure { throwable ->
                when (throwable) {
                    is RagVaultLockedException -> notes += "RAG locked by vault policy."
                    else -> notes += "RAG retrieval failed: ${throwable.message}"
                }
            }
            .getOrElse { cachedMatches ?: emptyList() }
    }

    private fun summarizeThread(messages: List<Message>, takeLast: Int = 8, maxChars: Int = 160): String {
        if (messages.isEmpty()) return ""
        return messages.takeLast(takeLast).joinToString("\n") { msg ->
            val sanitized = msg.content.replace("\n", " ").trim()
            val clipped = sanitized.take(maxChars)
            "${msg.role.name.lowercase()}: $clipped"
        }
    }

    private fun buildContextSummaryText(
        episodicSummary: String,
        semanticFacts: List<String>,
        ragMatches: List<RagMatch>
    ): String {
        val blocks = mutableListOf<String>()
        if (episodicSummary.isNotBlank()) {
            blocks += "[EPISODIC]\n$episodicSummary"
        }
        if (semanticFacts.isNotEmpty()) {
            val semanticBlock = semanticFacts.joinToString(separator = "\n") { "- $it" }
            blocks += "[SEMANTIC]\n$semanticBlock"
        }
        if (ragMatches.isNotEmpty()) {
            val ragBlock = ragMatches.joinToString(separator = "\n") { "- ${it.content}" }
            blocks += "[RAG]\n$ragBlock"
        }
        return blocks.joinToString("\n\n").trim()
    }

    private fun resolveStatus(
        requiresVault: Boolean,
        vaultOpen: Boolean,
        hasEpisodic: Boolean,
        hasSemantic: Boolean,
        hasRag: Boolean
    ): MemoryStatus {
        if (requiresVault && !vaultOpen) return MemoryStatus.VAULT_LOCKED

        val loadedCount = listOf(hasEpisodic, hasSemantic, hasRag).count { it }
        return when {
            loadedCount == 0 -> MemoryStatus.EMPTY
            loadedCount in 1..2 -> MemoryStatus.PARTIAL
            else -> MemoryStatus.OK
        }
    }
}

data class MemoryOrchestrationResult(
    val moduleId: String,
    val userId: String,
    val episodicThread: List<Message> = emptyList(),
    val episodicSummary: String = "",
    val semanticFacts: List<String> = emptyList(),
    val ragMatches: List<RagMatch> = emptyList(),
    val combinedFacts: List<String> = emptyList(),
    val contextSummary: String = "",
    val status: MemoryStatus = MemoryStatus.EMPTY,
    val notes: List<String> = emptyList(),
    val requiresVault: Boolean = false
)

enum class MemoryStatus { OK, PARTIAL, VAULT_LOCKED, EMPTY }
