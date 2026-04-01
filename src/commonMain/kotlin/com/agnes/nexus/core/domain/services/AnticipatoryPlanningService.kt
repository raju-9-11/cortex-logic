package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.model.orchestration.AliveEntityRuntimeContext

/**
 * Generates proactive planning proposals from cross-module synthesis alerts.
 *
 * Uses a set of heuristic rules to match synthesis alerts (e.g. PLANNING_COLLAPSE,
 * BURNOUT_TRAJECTORY) to pre-defined proposal templates. Returns one proposal per
 * invocation — the highest-severity matched alert wins.
 *
 * ## Constraints
 * - Only fires when [conversationDepth] == 0 (fresh thread; no proposal into an active session).
 * - Returns null if no rule matches or if [isEnabled] is false.
 *
 * Ported from agnes TypeScript `anticipatory-planning-service.ts`.
 */
object AnticipatoryPlanningService {

    /** Mirror of the TypeScript `SynthesisAlert` shape. */
    data class SynthesisAlert(
        val id: String,
        val severity: Severity,
        val description: String
    )

    enum class Severity { CRITICAL, WARNING }

    data class AnticipatoryPlanningProposal(
        val id: String,
        val title: String,
        val summary: String,
        val prompt: String,
        val confidence: Double,
        val state: String,              // "draft" | "deferred"
        val targetModuleId: String?,
        val sourceSignalIds: List<String>
    )

    private data class HeuristicRule(
        val matchId: String,
        val targetModuleId: String?,
        val title: String,
        val prompt: String
    )

    private val RULES = listOf(
        HeuristicRule(
            matchId = "PLANNING_COLLAPSE",
            targetModuleId = "atlas",
            title = "Draft a workload triage plan",
            prompt = "Build a realistic triage plan for today using my current alive entities, " +
                     "recent workload pressure, and the most urgent deadlines. " +
                     "Prioritize relief first, then execution."
        ),
        HeuristicRule(
            matchId = "BURNOUT_TRAJECTORY",
            targetModuleId = "agnes",
            title = "Prepare a recovery-first plan",
            prompt = "Create a recovery-first plan that reduces overload, protects resilience, " +
                     "and only keeps the minimum viable commitments for today. " +
                     "Reference any relevant alive entities."
        ),
        HeuristicRule(
            matchId = "COMPOUND_STRESS",
            targetModuleId = "agnes",
            title = "Prepare a recovery-first plan",
            prompt = "Create a recovery-first plan that reduces overload, protects resilience, " +
                     "and only keeps the minimum viable commitments for today. " +
                     "Reference any relevant alive entities."
        ),
        HeuristicRule(
            matchId = "FINANCIAL_EMOTIONAL_LOOP",
            targetModuleId = "ledger",
            title = "Prepare a friction-reduction plan",
            prompt = "Draft a friction-reduction plan that stabilizes today's financial stress " +
                     "while protecting emotional bandwidth. Use my current alive entities where relevant."
        )
    )

    /**
     * @param threadId           Unique ID of the current conversation thread.
     * @param alerts             Cross-module synthesis alerts (highest severity evaluated first).
     * @param aliveContext       Alive entity context snapshot; may be null.
     * @param conversationDepth  Number of turns already in the thread. Returns null if > 0.
     * @param isEnabled          Feature flag gate — defaults to true.
     */
    fun buildProposal(
        threadId: String,
        alerts: List<SynthesisAlert>,
        aliveContext: AliveEntityRuntimeContext?,
        conversationDepth: Int,
        isEnabled: Boolean = true
    ): AnticipatoryPlanningProposal? {
        if (!isEnabled) return null
        if (conversationDepth > 0) return null

        val activeAlert = alerts.firstOrNull { it.severity == Severity.CRITICAL }
            ?: alerts.firstOrNull { it.severity == Severity.WARNING }
            ?: return null

        val rule = RULES.firstOrNull { it.matchId == activeAlert.id } ?: return null
        val aliveSummary = buildAliveSummary(aliveContext)

        val sourceSignalIds = buildList {
            add(activeAlert.id)
            aliveContext?.moduleIds?.forEach { add("alive:$it") }
        }

        return AnticipatoryPlanningProposal(
            id = "$threadId.planning.${activeAlert.id.lowercase()}",
            title = rule.title,
            summary = "${activeAlert.description} $aliveSummary",
            prompt = rule.prompt,
            confidence = if (activeAlert.severity == Severity.CRITICAL) 0.78 else 0.72,
            state = "draft",
            targetModuleId = rule.targetModuleId,
            sourceSignalIds = sourceSignalIds
        )
    }

    private fun buildAliveSummary(context: AliveEntityRuntimeContext?): String {
        if (context == null || context.total == 0) {
            return "No alive entities are currently available, so Nexus should work from " +
                   "the detected cross-domain pattern alone."
        }
        val moduleSummary = context.moduleIds
            .take(3)
            .mapNotNull { moduleId ->
                val count = context.byModule[moduleId]?.size ?: 0
                if (count > 0) "$moduleId ($count)" else null
            }
            .joinToString(", ")

        return if (moduleSummary.isNotEmpty()) {
            "Alive inputs are available from $moduleSummary."
        } else {
            "${context.total} alive inputs are available for planning."
        }
    }
}
