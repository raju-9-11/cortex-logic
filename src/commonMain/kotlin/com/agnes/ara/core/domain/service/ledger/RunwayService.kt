package com.agnes.ara.core.domain.service.ledger

import com.agnes.ara.core.domain.models.LedgerProfile
import com.agnes.ara.core.domain.services.SpineEventBus
import com.agnes.ara.core.domain.services.SpineEventPayload
import com.agnes.ara.core.domain.services.SpineSoulMutation

/**
 * Computes "Days of Survival" (runway) — the central Ledger metric.
 *
 * Spec formula:  D = (Total_Liquidity / Avg_Daily_Burn) × Confidence_Interval
 *
 * Confidence_Interval reflects income stability:
 *   1.0 = fully stable (salaried)
 *   0.7 = moderate variability (freelance/contract)
 *   0.5 = high variability (startup equity/commissions)
 *
 * Soul vector behaviour:
 *   runway < 30 days  → FRICTION +0.3  (critical) + NEXUS_AUTOPILOT_LOCK(level=1)
 *   runway < 90 days  → FRICTION +0.1  (warning)
 *   runway >= 90 days → FRICTION -0.1  (healthy, reduce friction)
 *   unknown burn rate → FRICTION -0.05 (mild; infinite runway assumed)
 */
class RunwayService(
    private val eventBus: SpineEventBus
) {
    companion object {
        const val CRITICAL_RUNWAY_DAYS = 30f   // < 30 days = critical → Autopilot locked to 1
        const val WARNING_RUNWAY_DAYS  = 90f   // < 90 days = elevated friction

        // Default confidence intervals by income stability archetype
        const val CONFIDENCE_STABLE    = 1.0f  // salaried / fixed income
        const val CONFIDENCE_MODERATE  = 0.7f  // freelance / contract
        const val CONFIDENCE_VARIABLE  = 0.5f  // commission / equity / startup
    }

    /**
     * Compute runway days per spec formula:
     * D = (totalLiquidity / avgDailyBurn) × confidenceInterval
     *
     * @param totalLiquidity      Actual liquid assets (cash + equivalents)
     * @param avgDailyBurn        Average daily spend (monthly burn / 30)
     * @param confidenceInterval  Income stability multiplier [0.5–1.0]; defaults to 0.7
     * @return Runway days, or null if burn rate is zero (infinite runway)
     */
    fun computeRunwayExact(
        totalLiquidity: Float,
        avgDailyBurn: Float,
        confidenceInterval: Float = CONFIDENCE_MODERATE
    ): Float? {
        if (avgDailyBurn <= 0f) return null
        return (totalLiquidity / avgDailyBurn) * confidenceInterval.coerceIn(0.1f, 1.0f)
    }

    /**
     * Derive runway from a LedgerProfile when explicit liquidity is not provided.
     * Uses 3 × monthly income as a conservative liquid asset proxy.
     *
     * Prefer [computeRunwayExact] when the caller has actual account balances.
     */
    fun computeRunway(profile: LedgerProfile): Float? {
        val monthlyBurn = profile.fixedExpenses.sumOf { it.amount } +
                          profile.variableExpenses.sumOf { it.amount }
        if (monthlyBurn <= 0.0) return null
        val avgDailyBurn = (monthlyBurn / 30.0).toFloat()
        val liquidAssets = (profile.monthlyIncome * 3.0).toFloat()
        return computeRunwayExact(liquidAssets, avgDailyBurn, CONFIDENCE_MODERATE)
    }

    /**
     * Compute and emit a RUNWAY_UPDATED Spine event.
     * Attaches a FRICTION soul mutation and, if critical (< 30 days),
     * emits NEXUS_AUTOPILOT_LOCK(level=1) per Spec §1.2.
     */
    suspend fun updateRunway(profile: LedgerProfile) {
        val runway = computeRunway(profile)
        emitRunwayState(runway)
    }

    /**
     * Compute and emit runway from explicit liquidity figures.
     * Use this when the caller has real account balances from bank sync.
     */
    suspend fun updateRunwayExact(
        totalLiquidity: Float,
        avgDailyBurn: Float,
        confidenceInterval: Float = CONFIDENCE_MODERATE
    ) {
        val runway = computeRunwayExact(totalLiquidity, avgDailyBurn, confidenceInterval)
        emitRunwayState(runway)
    }

    // ── Internal ─────────────────────────────────────────────────────────────────

    private suspend fun emitRunwayState(runway: Float?) {
        val frictionDelta = when {
            runway == null                -> -0.05f
            runway < CRITICAL_RUNWAY_DAYS -> +0.3f
            runway < WARNING_RUNWAY_DAYS  -> +0.1f
            else                          -> -0.1f
        }

        val status = when {
            runway == null                -> "UNKNOWN"
            runway < CRITICAL_RUNWAY_DAYS -> "CRITICAL"
            runway < WARNING_RUNWAY_DAYS  -> "WARNING"
            else                          -> "HEALTHY"
        }

        eventBus.emit(SpineEventPayload(
            type = "RUNWAY_UPDATED",
            source = "ledger",
            priority = if ((runway ?: Float.MAX_VALUE) < CRITICAL_RUNWAY_DAYS) "alert" else "info",
            mutations = listOf(SpineSoulMutation("FRICTION", frictionDelta)),
            data = mapOf(
                "runwayDays"    to runway,
                "frictionDelta" to frictionDelta,
                "status"        to status
            )
        ).toSpineEvent())

        // Spec §1.2: D < 30 → lock Autopilot to Level 1 (manual) for non-essential spend
        if (runway != null && runway < CRITICAL_RUNWAY_DAYS) {
            eventBus.emit(SpineEventPayload(
                type = "NEXUS_AUTOPILOT_LOCK",
                source = "ledger",
                priority = "critical",
                requiresApproval = false,
                data = mapOf(
                    "lockLevel"  to 1,
                    "reason"     to "runway_critical",
                    "runwayDays" to runway,
                    "scope"      to "non_essential_spending",
                    "message"    to "Runway is ${runway.toInt()} days. Autopilot locked to Manual for non-essential spending."
                )
            ).toSpineEvent())
        }
    }
}

