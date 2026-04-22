package com.agnes.ara.core.domain.service.titan

import kotlinx.serialization.Serializable
import kotlin.math.*

// ═══════════════════════════════════════════════════════════════════════════════
// Output Types
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
data class WorkoutNSVPatch(
    val cnsFatigue: Double,
    val recoveryScore: Double,
    val energyBudget: Double,
    val focusScore: Double,
)

@Serializable
data class SleepNSVPatch(
    val sleepQuality: Double,
    val energyBudget: Double,
    val focusScore: Double,
)

// ═══════════════════════════════════════════════════════════════════════════════
// TitanNsvUpdater — pure NSV patch computation for workout & sleep
// ═══════════════════════════════════════════════════════════════════════════════

object TitanNsvUpdater {

    private fun round1dp(v: Double): Double = round(v * 10.0) / 10.0
    private fun clamp010(v: Double): Double = max(0.0, min(10.0, v))

    /**
     * Computes the NSV biological patch after a completed workout session.
     *
     * CNS Fatigue algorithm:
     *  - rawFatigue = RPE × 0.6 + min(4, volumeKg / 5000)  [capped at 10]
     *  - Exponential decay of existing fatigue: halves every 48 h since last session.
     *  - Final value = max(decayedExisting, rawFatigue), rounded to 1 d.p.
     *
     * Recovery Score algorithm:
     *  - Delta: RPE ≥ 8 → −1.5 | RPE ≥ 6 → −0.5 | RPE < 6 → 0
     *  - Clamped to [0, 10], rounded to 1 d.p.
     *
     * @param hoursElapsed hours since last session timestamp (caller computes from Date.now())
     */
    fun computeWorkoutPatch(
        rpe: Double,
        totalVolumeKg: Double,
        hoursElapsed: Double,
        existingCnsFatigue: Double,
        existingRecoveryScore: Double,
    ): WorkoutNSVPatch {
        // CNS Fatigue
        val decayedFatigue = existingCnsFatigue * (0.5).pow(hoursElapsed / 48.0)
        val rawFatigue = min(10.0, rpe * 0.6 + min(4.0, totalVolumeKg / 5000.0))
        val cnsFatigue = round1dp(max(decayedFatigue, rawFatigue))

        // Recovery Score
        val recoveryDelta = when {
            rpe >= 8.0 -> -1.5
            rpe >= 6.0 -> -0.5
            else -> 0.0
        }
        val recoveryScore = round1dp(clamp010(existingRecoveryScore + recoveryDelta))

        // Cognitive (physical contribution only)
        val energyBudget = round1dp(clamp010(10.0 - cnsFatigue * 0.7 - (10.0 - recoveryScore) * 0.3))
        val focusScore = round1dp(clamp010(10.0 - cnsFatigue * 0.5))

        return WorkoutNSVPatch(cnsFatigue, recoveryScore, energyBudget, focusScore)
    }

    /**
     * Computes the composite sleepQuality NSV value.
     *
     * hoursScore algorithm (piecewise):
     *  - If durationHours >= 7.5: score = 10 − |durationHours − 8.25|, clamped to [0, 10].
     *  - If durationHours < 7.5: score = durationHours × (10 / 7.5), clamped to [0, 10].
     *
     * Final quality = average of hoursScore and subjective qualityRating,
     * clamped to [0, 10], rounded to 1 decimal place.
     */
    fun computeSleepPatch(
        durationHours: Double,
        qualityRating: Double,
    ): SleepNSVPatch {
        val hoursScore = if (durationHours >= 7.5) {
            clamp010(10.0 - abs(durationHours - 8.25))
        } else {
            clamp010(durationHours * (10.0 / 7.5))
        }

        val sleepQuality = round1dp(clamp010((hoursScore + qualityRating) / 2.0))

        // Cognitive (physical contribution only)
        val energyBudget = round1dp(clamp010(sleepQuality * 0.9))
        val focusScore = round1dp(clamp010(sleepQuality * 0.8))

        return SleepNSVPatch(sleepQuality, energyBudget, focusScore)
    }
}
