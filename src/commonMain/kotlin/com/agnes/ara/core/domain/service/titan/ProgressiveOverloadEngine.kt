package com.agnes.ara.core.domain.service.titan

import kotlin.math.roundToInt

/**
 * Progressive overload engine.
 *
 * Implements:
 * - E1RM estimation (Epley + Brzycki formulas)
 * - MEV/MAV/MRV volume landmarks per muscle group
 * - ACWR injury risk ratio (Gabbett 2016)
 * - 4-tier progression recommendation (DELOAD / MAINTAIN / ADD_REPS / ADD_WEIGHT)
 */
object ProgressiveOverloadEngine {

    // ── E1RM formulas ─────────────────────────────────────────────────────────────

    fun epley(weight: Double, reps: Int): Double = weight * (1 + reps / 30.0)
    fun brzycki(weight: Double, reps: Int): Double = weight * 36.0 / (37 - reps)

    // ── Volume Landmarks (sets per week per muscle group) ─────────────────────────

    data class VolumeLandmarks(val mev: Int, val mav: Int, val mrv: Int)

    private val volumeLandmarks: Map<String, VolumeLandmarks> = mapOf(
        "chest"      to VolumeLandmarks(8, 16, 22),
        "back"       to VolumeLandmarks(10, 18, 25),
        "shoulders"  to VolumeLandmarks(8, 16, 22),
        "biceps"     to VolumeLandmarks(8, 14, 20),
        "triceps"    to VolumeLandmarks(6, 14, 20),
        "legs"       to VolumeLandmarks(8, 18, 26),
        "quads"      to VolumeLandmarks(8, 16, 20),
        "hamstrings" to VolumeLandmarks(6, 12, 16),
        "glutes"     to VolumeLandmarks(4, 12, 16),
        "calves"     to VolumeLandmarks(8, 16, 20),
        "core"       to VolumeLandmarks(6, 16, 20),
        "traps"      to VolumeLandmarks(4, 12, 16),
        "lats"       to VolumeLandmarks(8, 16, 20),
        "forearms"   to VolumeLandmarks(4, 10, 14),
    )

    fun landmarksFor(muscleGroup: String): VolumeLandmarks =
        volumeLandmarks[muscleGroup.lowercase()] ?: VolumeLandmarks(6, 12, 20)

    // ── ACWR (Gabbett 2016) ───────────────────────────────────────────────────────

    data class AcwrResult(
        val acuteLoad: Double,
        val chronicLoad: Double,
        val ratio: Double,
        val riskZone: RiskZone
    )

    enum class RiskZone { SAFE, CAUTION_LOW, CAUTION_HIGH, DANGER }

    /**
     * @param sessionLoads Recent session loads, most recent first.
     *                     Acute = 7-day avg; Chronic = 28-day avg.
     */
    fun computeAcwr(sessionLoads: List<Double>): AcwrResult {
        val acute = sessionLoads.take(7).average().takeIf { !it.isNaN() } ?: 0.0
        val chronic = sessionLoads.take(28).average().takeIf { !it.isNaN() } ?: 0.0
        val ratio = if (chronic > 0) acute / chronic else 1.0
        val zone = when {
            ratio in 0.8..1.3 -> RiskZone.SAFE
            ratio < 0.8       -> RiskZone.CAUTION_LOW
            ratio in 1.3..1.5 -> RiskZone.CAUTION_HIGH
            else              -> RiskZone.DANGER
        }
        return AcwrResult(acute, chronic, ratio, zone)
    }

    // ── 4-Tier Progression Recommendation ────────────────────────────────────────

    enum class ProgressionTier { DELOAD, MAINTAIN, ADD_WEIGHT, ADD_REPS }

    data class ProgressionRecommendation(
        val tier: ProgressionTier,
        val reason: String,
        val suggestedWeight: Double?,
        val suggestedReps: Int?,
        val weightIncrement: Double = 2.5,
        val currentE1rm: Double?
    )

    /**
     * @param avgRpe         Average RPE over last 2–3 sessions (1–10 scale).
     * @param e1rmTrend      Recent E1RM values; positive trend = strength gain.
     * @param completedSets  Sets completed in last session.
     * @param targetSets     Programmed sets.
     * @param currentWeight  Last session weight.
     * @param currentReps    Last session reps.
     * @param acwr           Optional ACWR injury risk ratio; defaults to 1.0 (safe).
     * @param unit           "kg" or "lb" — determines weight increment.
     */
    fun recommend(
        avgRpe: Double,
        e1rmTrend: List<Double>,
        completedSets: Int,
        targetSets: Int,
        currentWeight: Double,
        currentReps: Int,
        acwr: Double = 1.0,
        unit: String = "kg"
    ): ProgressionRecommendation {
        val increment = if (unit == "lb") 5.0 else 2.5
        val currentE1rm = epley(currentWeight, currentReps)
        val isGaining = e1rmTrend.size >= 2 && e1rmTrend.last() > e1rmTrend.first()

        return when {
            acwr > 1.5 -> ProgressionRecommendation(
                ProgressionTier.DELOAD,
                "ACWR ${(acwr * 100.0).roundToInt() / 100.0} — injury risk high, deload this week",
                currentWeight * 0.6, currentReps, increment, currentE1rm
            )
            avgRpe > 9.5 || completedSets < targetSets * 0.8 -> ProgressionRecommendation(
                ProgressionTier.DELOAD,
                "RPE ≥9.5 or <80% sets completed — recovery week",
                currentWeight * 0.7, currentReps, increment, currentE1rm
            )
            avgRpe in 8.5..9.5 && !isGaining -> ProgressionRecommendation(
                ProgressionTier.MAINTAIN,
                "High RPE, stable E1RM — hold weight",
                currentWeight, currentReps, increment, currentE1rm
            )
            avgRpe < 7.5 && isGaining && currentReps >= 12 -> ProgressionRecommendation(
                ProgressionTier.ADD_WEIGHT,
                "Good RPE, strong trend — increase load",
                ((currentWeight + increment) * 2).roundToInt() / 2.0, 8, increment, currentE1rm
            )
            avgRpe < 8.5 -> ProgressionRecommendation(
                ProgressionTier.ADD_REPS,
                "Manageable RPE — add a rep or set",
                currentWeight, (currentReps + 1).coerceAtMost(15), increment, currentE1rm
            )
            else -> ProgressionRecommendation(
                ProgressionTier.MAINTAIN,
                "Holding steady",
                currentWeight, currentReps, increment, currentE1rm
            )
        }
    }
}
