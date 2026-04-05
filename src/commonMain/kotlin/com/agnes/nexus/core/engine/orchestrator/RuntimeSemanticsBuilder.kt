package com.agnes.nexus.core.engine.orchestrator

import com.agnes.nexus.core.domain.model.orchestration.HistoryMode
import com.agnes.nexus.core.domain.model.orchestration.RuntimeAutonomy
import com.agnes.nexus.core.domain.model.orchestration.RuntimeDisposition
import com.agnes.nexus.core.domain.model.orchestration.RuntimeSemantics

/**
 * Builds [RuntimeSemantics] from autopilot level + action dispatch context.
 *
 * This is a richer variant of [RuntimeSemantics.from] that factors in the
 * dispatchStatus, historyMode, and risk profile of a specific action — not
 * just the global autopilot level. Mirrors agnes's OrchestrationRuntimeService.buildRuntimeSemantics().
 *
 * Valid dispatchStatus values: "approved" | "awaiting_approval" | "analysis_only" | "blocked" | "ephemeral"
 */
object RuntimeSemanticsBuilder {

    fun deriveAutonomy(autopilotLevel: Int): RuntimeAutonomy = when (autopilotLevel) {
        0 -> RuntimeAutonomy.MANUAL_LOCK
        1 -> RuntimeAutonomy.PROPOSAL_FIRST
        2 -> RuntimeAutonomy.GUIDED_ASSIST
        3 -> RuntimeAutonomy.CONDITIONAL_AUTONOMY
        4 -> RuntimeAutonomy.SUPERVISED_AUTONOMY
        else -> RuntimeAutonomy.GHOST
    }

    fun build(
        autopilotLevel: Int,
        historyMode: HistoryMode,
        dispatchStatus: String,
        highRisk: Boolean,
    ): RuntimeSemantics {
        val autonomy = deriveAutonomy(autopilotLevel)

        val disposition: RuntimeDisposition = when {
            dispatchStatus == "ephemeral" -> RuntimeDisposition.EPHEMERAL_PREVIEW
            dispatchStatus == "analysis_only" || dispatchStatus == "blocked" -> RuntimeDisposition.ANALYSIS_ONLY
            dispatchStatus == "awaiting_approval" -> when {
                autopilotLevel == 0 -> RuntimeDisposition.MANUAL_REVIEW
                highRisk && autopilotLevel >= 3 -> RuntimeDisposition.HIGH_RISK_REVIEW
                else -> RuntimeDisposition.PROPOSAL_REVIEW
            }
            historyMode == HistoryMode.SILENT || autopilotLevel == 5 -> RuntimeDisposition.SILENT_EXECUTION
            else -> RuntimeDisposition.VISIBLE_EXECUTION
        }

        val historyDestination: String = when (disposition) {
            RuntimeDisposition.EPHEMERAL_PREVIEW -> "none"
            RuntimeDisposition.SILENT_EXECUTION -> "silent_audit"
            else -> "standard"
        }

        return RuntimeSemantics(
            autopilotLevel = autopilotLevel,
            autonomy = autonomy,
            disposition = disposition,
            historyDestination = historyDestination,
            willPersistHistory = historyDestination == "standard",
            shouldNotifyUser = disposition != RuntimeDisposition.SILENT_EXECUTION,
        )
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Action dispatch status helpers
    // ─────────────────────────────────────────────────────────────────────────

    fun deriveExecutionStatus(dispatchStatus: String): String = when (dispatchStatus) {
        "approved" -> "executed"
        "awaiting_approval" -> "deferred"
        "analysis_only", "ephemeral" -> "analysis_only"
        else -> "blocked"
    }

    fun defaultApprovalRequirementJson(dispatchStatus: String): String =
        if (dispatchStatus == "awaiting_approval")
            """{"required":true,"reason":"manual_level"}"""
        else
            """{"required":false,"reason":"none"}"""

    fun getNoticePrefix(disposition: String): String? = when (disposition) {
        "manual_review" -> "Manual review required before execution"
        "proposal_review" -> "Pending approval before execution"
        "high_risk_review" -> "High-risk action requires approval"
        "analysis_only", "ephemeral_preview" -> "Not executed in this session"
        "incident_review" -> "Execution failed and requires incident review"
        else -> null
    }
}
