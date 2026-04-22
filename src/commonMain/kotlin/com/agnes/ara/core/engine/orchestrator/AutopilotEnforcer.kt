package com.agnes.ara.core.engine.orchestrator

import com.agnes.ara.core.domain.model.AgentSource
import com.agnes.ara.core.domain.model.AutopilotLevel
import com.agnes.ara.core.domain.services.SpineEvent
import com.agnes.ara.core.domain.services.SpineEventPayload

/**
 * Enforces the Autopilot Law (0-5) on every outbound [SpineEvent].
 *
 * Enforcement matrix:
 *   Level 0-2 (Manual / Advisory / Hybrid-Low): ALL events → requiresApproval = true
 *   Level 3-4 (Hybrid+ / High Autonomy):        Routine events auto-execute;
 *                                                high-friction intents → requiresApproval = true
 *   Level 5   (Ghost):                           Full auto
 *
 * SECURITY INVARIANT: Ledger is permanently hard-capped at [AutopilotLevel.HYBRID_LOW].
 * No financial mutation ever auto-executes without explicit user approval.
 *
 * Complexity: O(f) per call, where f = HIGH_FRICTION_INTENTS set size (constant).
 */
class AutopilotEnforcer {

    /**
     * High-friction intent strings that always require approval, regardless of Autopilot level.
     * Matching is case-insensitive substring — any intent containing one of these tokens is gated.
     */
    private val HIGH_FRICTION_INTENTS = setOf(
        "DELETE_TASK", "DELETE_GOAL", "DELETE_HABIT", "CANCEL_ROUTINE",
        "ARCHIVE_ENTRY", "DEBT_PAYMENT", "BUDGET_TRANSFER", "FINANCIAL_COMMITMENT",
        "REVOKE_CLEARANCE", "PURGE_SESSION"
    )

    /**
     * Enforce Autopilot rules on the event.
     *
     * @param event        The SpineEvent about to be broadcast.
     * @param currentLevel The active global Autopilot level.
     * @return [EnforcementResult] containing the (potentially modified) event.
     */
    fun enforce(event: SpineEvent, currentLevel: AutopilotLevel): EnforcementResult {
        val source = AgentSource.fromId(event.header.source)
        val effectiveLevel = resolveEffectiveLevel(source, currentLevel)
        val isHighFriction = HIGH_FRICTION_INTENTS.any {
            event.payload.intent.contains(it, ignoreCase = true)
        }

        val mutatedEvent = when {
            // Manual / Advisory / Hybrid-Low: every event is downgraded to a proposal
            effectiveLevel.requiresApprovalForAll -> {
                event.copy(logicGates = event.logicGates.copy(requiresApproval = true))
            }
            // Hybrid+ / High Autonomy: only high-friction intents require approval
            effectiveLevel.automatesRoutine && isHighFriction -> {
                event.copy(logicGates = event.logicGates.copy(requiresApproval = true))
            }
            // Ghost: full autonomous execution — no approval gate applied here
            else -> event
        }

        return EnforcementResult(event = mutatedEvent)
    }

    /**
     * Resolve the effective [AutopilotLevel] for a given [AgentSource].
     *
     * The Ledger is permanently capped at [AutopilotLevel.LEDGER_MAX] (HYBRID_LOW),
     * regardless of the global level set by the user.
     */
    private fun resolveEffectiveLevel(source: AgentSource, global: AutopilotLevel): AutopilotLevel =
        if (source == AgentSource.LEDGER) {
            minOf(global, AutopilotLevel.LEDGER_MAX)
        } else {
            global
        }

    /** Selects the lower-authority (more restrictive) of two [AutopilotLevel] values. */
    private fun minOf(a: AutopilotLevel, b: AutopilotLevel): AutopilotLevel =
        if (a.level <= b.level) a else b

    /**
     * Result returned by [enforce].
     *
     * @property event       The enforced SpineEvent (requiresApproval may have been set to true).
     * @property sideEffects Reserved for future orchestrator side-effects.
     */
    data class EnforcementResult(
        val event: SpineEvent,
        val sideEffects: List<SpineEventPayload> = emptyList()
    )
}
