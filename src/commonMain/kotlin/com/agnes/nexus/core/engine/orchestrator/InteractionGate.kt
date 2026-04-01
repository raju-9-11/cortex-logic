package com.agnes.nexus.core.engine.orchestrator

import com.agnes.nexus.core.domain.model.orchestration.HistoryMode
import com.agnes.nexus.core.domain.model.orchestration.InteractionCandidate
import com.agnes.nexus.core.domain.model.orchestration.InteractionDecision
import com.agnes.nexus.core.domain.model.orchestration.InteractionDecisionMode
import com.agnes.nexus.core.domain.model.orchestration.InteractionDecisionReason
import com.agnes.nexus.core.domain.model.orchestration.InteractionKind

/**
 * Pure stateless decision gate for interaction dispatch.
 *
 * Given the global autopilot level and an [InteractionCandidate] describing the
 * incoming interaction, returns an [InteractionDecision] that tells the
 * orchestrator how to handle it (auto-execute, propose to user, block, etc.).
 *
 * Mirrors agnes's OrchestrationInteractionGateService exactly.
 *
 * Autopilot law summary:
 *   0–2: All interactions → visible_proposal (manual, advisory, hybrid-low)
 *   3:   Auto if confidence ≥ 0.85, else visible_proposal
 *   4:   Auto if confidence ≥ 0.70, else visible_proposal
 *   5:   Ghost — fully silent
 */
object InteractionGate {

    private val DEFAULT_CONFIDENCE = mapOf(
        InteractionKind.ROUTING to 0.62,
        InteractionKind.PLANNING to 0.72,
        InteractionKind.ROUTINE to 0.72,
    )

    private fun resolveMode(kind: InteractionKind): InteractionDecisionMode =
        if (kind == InteractionKind.ROUTING) InteractionDecisionMode.SILENT_DELEGATE
        else InteractionDecisionMode.SILENT_EXECUTE

    private fun buildDecision(
        candidate: InteractionCandidate,
        confidence: Double,
        mode: InteractionDecisionMode,
        reason: InteractionDecisionReason,
        historyMode: HistoryMode,
    ): InteractionDecision {
        val isVisible = mode == InteractionDecisionMode.VISIBLE_PROPOSAL
        return InteractionDecision(
            kind = candidate.kind,
            mode = mode,
            reason = reason,
            confidence = confidence,
            historyMode = historyMode,
            shouldPersistDraft = isVisible,
            shouldNotifyUser = isVisible || historyMode == HistoryMode.STANDARD,
            shouldRenderHudSignal = isVisible,
        )
    }

    fun evaluate(autopilotLevel: Int, candidate: InteractionCandidate): InteractionDecision {
        val confidence = (candidate.confidence ?: DEFAULT_CONFIDENCE[candidate.kind] ?: 0.72)
            .coerceIn(0.0, 1.0)

        if (candidate.requiresApproval) {
            return buildDecision(candidate, confidence, InteractionDecisionMode.VISIBLE_PROPOSAL, InteractionDecisionReason.EXPLICIT_GATE, HistoryMode.STANDARD)
        }
        if (candidate.hasConflict) {
            return buildDecision(candidate, confidence, InteractionDecisionMode.VISIBLE_PROPOSAL, InteractionDecisionReason.CONFLICT, HistoryMode.STANDARD)
        }
        if (candidate.highRisk) {
            return buildDecision(candidate, confidence, InteractionDecisionMode.VISIBLE_PROPOSAL, InteractionDecisionReason.HIGH_RISK, HistoryMode.STANDARD)
        }
        if (autopilotLevel <= 2) {
            return buildDecision(candidate, confidence, InteractionDecisionMode.VISIBLE_PROPOSAL, InteractionDecisionReason.MANUAL_LEVEL, HistoryMode.STANDARD)
        }
        if (!candidate.canAutoDispatch) {
            return buildDecision(candidate, confidence, InteractionDecisionMode.VISIBLE_PROPOSAL, InteractionDecisionReason.SILENT_UNAVAILABLE, HistoryMode.STANDARD)
        }
        if (autopilotLevel == 3 && confidence < 0.85) {
            return buildDecision(candidate, confidence, InteractionDecisionMode.VISIBLE_PROPOSAL, InteractionDecisionReason.LOW_CONFIDENCE, HistoryMode.STANDARD)
        }
        if (autopilotLevel == 4 && confidence < 0.70) {
            return buildDecision(candidate, confidence, InteractionDecisionMode.VISIBLE_PROPOSAL, InteractionDecisionReason.LOW_CONFIDENCE, HistoryMode.STANDARD)
        }

        val historyMode = if (autopilotLevel >= 5) HistoryMode.SILENT else HistoryMode.STANDARD
        val mode = resolveMode(candidate.kind)
        val reason = when {
            autopilotLevel >= 5 -> InteractionDecisionReason.GHOST_MODE
            candidate.kind == InteractionKind.ROUTING -> InteractionDecisionReason.AUTO_ROUTING
            else -> InteractionDecisionReason.AUTO_EXECUTION
        }
        return buildDecision(candidate, confidence, mode, reason, historyMode)
    }
}
