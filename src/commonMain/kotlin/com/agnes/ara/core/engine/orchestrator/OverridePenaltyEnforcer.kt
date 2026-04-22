package com.agnes.ara.core.engine.orchestrator

import com.agnes.ara.core.domain.model.AgentSource
import com.agnes.ara.core.domain.model.GlobalSoul
import com.agnes.ara.core.domain.services.SpineEventBus
import com.agnes.ara.core.domain.services.SpineEventPayload
import com.agnes.ara.core.engine.GlobalSoulStore

/**
 * Enforces the "System Debt" penalty when a user overrides a biological-crash veto (Spec §3).
 *
 * Protocol — triggered when [AgentSource.TITAN] session proceeds despite vitality < 0.2:
 *
 *   1. [GlobalSoul.recoveryRateMultiplier] → 0.5f  (healing takes 2× longer)
 *   2. [GlobalSoul.resilience]             → -0.2f (psychological hit for self-harm)
 *   3. [GlobalSoul.isSystemDebtActive]     → true
 *   4. AuditTrail SpineEvent logged: "OVERRIDE_VETO"
 *   5. Cascade → WEEKLY_REVIEW_FLAG so the override surfaces in the Surgical Review
 */
class OverridePenaltyEnforcer(
    private val soulStore: GlobalSoulStore,
    private val eventBus: SpineEventBus
) {
    /**
     * Handle a user-initiated veto override.
     *
     * @param agent       Which agent's veto was overridden
     * @param vetoReason  Human-readable reason for the original veto
     */
    suspend fun handleOverride(agent: AgentSource, vetoReason: String) {
        if (agent != AgentSource.TITAN) return
        val currentVitality = soulStore.current.vitality
        if (currentVitality >= 0.2f) return  // No debt if vitality above crash threshold

        // Apply System Debt penalty
        soulStore.update { current ->
            current.copy(
                recoveryRateMultiplier = 0.5f,
                resilience = (current.resilience - 0.2f).coerceAtLeast(0f),
                isSystemDebtActive = true
            )
        }

        // Emit audit trail event
        eventBus.emit(SpineEventPayload(
            type = "OVERRIDE_VETO",
            source = "soma",
            priority = "critical",
            requiresApproval = false,
            data = mapOf(
                "agent"          to agent.name,
                "vetoReason"     to vetoReason,
                "vitalityAtOverride" to currentVitality,
                "penalty"        to "recoveryRateMultiplier=0.5, resilience-0.2",
                "systemDebt"     to true,
                "auditMessage"   to "OVERRIDE_VETO: User forced physical output despite biological crash. System Debt applied."
            )
        ).toSpineEvent())

        // Flag for Weekly Review
        eventBus.emit(SpineEventPayload(
            type = "WEEKLY_REVIEW_FLAG",
            source = "soma",
            priority = "alert",
            data = mapOf(
                "triggeredBy" to "OVERRIDE_VETO",
                "reason"      to "system_debt_incurred",
                "summary"     to "Override occurred at vitality=${currentVitality}. System Debt active — recovery rate halved.",
                "agent"       to agent.name
            )
        ).toSpineEvent())
    }

    /**
     * Clear System Debt once vitality recovers above the healthy threshold (0.6).
     * Called by Soma on each vitality update; no-op if debt is not active.
     */
    suspend fun clearDebtIfRecovered(): Boolean {
        val soul = soulStore.current
        if (!soul.isSystemDebtActive) return false
        if (soul.vitality < 0.6f) return false

        soulStore.update { current ->
            current.copy(
                recoveryRateMultiplier = 1.0f,
                isSystemDebtActive = false
            )
        }

        eventBus.emit(
            SpineEventPayload(
                type = "SYSTEM_DEBT_CLEARED",
                source = "soma",
                priority = "alert",
                data = mapOf(
                    "vitalityAtRecovery" to soul.vitality,
                    "recoveryRateMultiplier" to 1.0f,
                    "systemDebt" to false,
                    "summary" to "System Debt cleared after vitality recovered above the safe threshold."
                )
            ).toSpineEvent()
        )
        return true
    }
}
