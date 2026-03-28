package com.agnes.nexus.core.domain.service.ledger

import com.agnes.nexus.core.domain.models.ResonanceSwipeData
import com.agnes.nexus.core.domain.services.SpineEventBus
import com.agnes.nexus.core.domain.services.SpineEventPayload
import com.agnes.nexus.core.domain.services.SpineSoulMutation

/**
 * Implements Ledger's Resonance Friction Math (Spec §1.1).
 *
 * For each transaction T with Resonance Score R ∈ [−1.0, +1.0]:
 *
 *   F_transaction = |R_negative| × (amount / dailyBurnRate)
 *
 * where R_negative = min(R, 0) — only negative (stress) resonance contributes friction.
 * Neutral or positive transactions contribute zero friction.
 *
 * Session friction (Δfriction) = Σ F_transaction across all swiped transactions.
 * This delta is emitted as a FRICTION GlobalSoul soul mutation.
 *
 * Threshold rule (Spec §1.1): if accumulated GlobalSoul.friction > 0.8,
 * emits FRICTION_THRESHOLD_EXCEEDED to trigger an Atlas Audit Request.
 */
class ResonanceFrictionCalculator(
    private val eventBus: SpineEventBus
) {

    /**
     * Compute the friction contribution of a single transaction.
     *
     * @param resonanceScore  R ∈ [−1.0, +1.0] assigned by Resonance Swipe
     * @param amount          Transaction amount in the user's base currency
     * @param dailyBurnRate   Average daily spend (total monthly burn / 30)
     * @return F_transaction ∈ [0.0, ∞) — zero for neutral/positive resonance
     */
    fun computeTransactionFriction(
        resonanceScore: Float,
        amount: Float,
        dailyBurnRate: Float
    ): Float {
        if (resonanceScore >= 0f || dailyBurnRate <= 0f) return 0f
        val rNegative = -resonanceScore   // |R_negative|
        return rNegative * (amount / dailyBurnRate)
    }

    /**
     * Compute session-level Δfriction = Σ F_transaction across a batch of swiped entries.
     *
     * @param swipes         List of resonance-scored transactions from the Swipe session
     * @param dailyBurnRate  Avg daily spend; if null, falls back to sum(amount)/30 of swipes
     */
    fun computeSessionFrictionDelta(
        swipes: List<ResonanceSwipeData>,
        dailyBurnRate: Float?
    ): Float {
        val burnRate = dailyBurnRate
            ?: (swipes.sumOf { it.amount.toDouble() } / 30.0).toFloat()
        if (burnRate <= 0f) return 0f
        return swipes.sumOf { swipe ->
            computeTransactionFriction(
                resonanceScore = swipe.resonanceScore,
                amount = swipe.amount,
                dailyBurnRate = burnRate
            ).toDouble()
        }.toFloat()
    }

    /**
     * Process a completed Resonance Swipe session:
     * 1. Compute Δfriction for all swiped transactions.
     * 2. Emit RESONANCE_FRICTION_UPDATED with FRICTION soul mutation.
     * 3. If currentFriction + Δfriction > 0.8, emit FRICTION_THRESHOLD_EXCEEDED.
     *
     * @param swipes            Transactions processed in this swipe session
     * @param dailyBurnRate     Caller-supplied burn rate (from LedgerProfile)
     * @param currentFriction   Current GlobalSoul.friction (0.0–1.0)
     */
    suspend fun processSwipeSession(
        swipes: List<ResonanceSwipeData>,
        dailyBurnRate: Float?,
        currentFriction: Float
    ) {
        val delta = computeSessionFrictionDelta(swipes, dailyBurnRate)
        val clamped = delta.coerceIn(0f, 1f)

        val resonantCount = swipes.count { it.resonanceScore > 0f }
        val frictionCount  = swipes.count { it.resonanceScore < 0f }
        val avgResonance   = if (swipes.isEmpty()) 0f else swipes.sumOf { it.resonanceScore.toDouble() }.toFloat() / swipes.size

        eventBus.emit(SpineEventPayload(
            type = "RESONANCE_FRICTION_UPDATED",
            source = "ledger",
            priority = if (clamped > 0.3f) "alert" else "info",
            mutations = listOf(SpineSoulMutation("FRICTION", clamped)),
            data = mapOf(
                "frictionDelta"    to clamped,
                "resonantCount"    to resonantCount,
                "frictionCount"    to frictionCount,
                "avgResonance"     to avgResonance,
                "transactionCount" to swipes.size,
                "dailyBurnRate"    to dailyBurnRate
            )
        ).toSpineEvent())

        // Threshold check — cascade to Atlas audit if friction is critical
        val projectedFriction = (currentFriction + clamped).coerceIn(0f, 1f)
        if (projectedFriction > FRICTION_AUDIT_THRESHOLD) {
            eventBus.emit(SpineEventPayload(
                type = "FRICTION_THRESHOLD_EXCEEDED",
                source = "ledger",
                priority = "critical",
                data = mapOf(
                    "projectedFriction" to projectedFriction,
                    "threshold"         to FRICTION_AUDIT_THRESHOLD,
                    "message"           to "Financial friction exceeds 0.8. Atlas Runway Audit requested."
                )
            ).toSpineEvent())
        }
    }

    /**
     * Compute the Resonance ROI score for the session:
     * sum of positive resonance / total absolute resonance.
     * Returns 0.0 for an all-negative session.
     */
    fun computeResonanceRoi(swipes: List<ResonanceSwipeData>): Float {
        if (swipes.isEmpty()) return 0f
        val positiveSum = swipes.sumOf { if (it.resonanceScore > 0f) it.resonanceScore.toDouble() else 0.0 }
        val totalAbs    = swipes.sumOf { kotlin.math.abs(it.resonanceScore.toDouble()) }
        return if (totalAbs == 0.0) 0f else (positiveSum / totalAbs).toFloat()
    }

    companion object {
        const val FRICTION_AUDIT_THRESHOLD = 0.8f
    }
}
