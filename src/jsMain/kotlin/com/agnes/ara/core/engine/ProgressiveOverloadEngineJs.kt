package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.service.titan.ProgressiveOverloadEngine
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlin.js.JsExport

@JsExport
class VolumeLandmarksJs(
    val mev: Int,
    val mav: Int,
    val mrv: Int,
)

@JsExport
class AcwrResultJs(
    val acuteLoad: Double,
    val chronicLoad: Double,
    val ratio: Double,
    /** "SAFE" | "CAUTION_LOW" | "CAUTION_HIGH" | "DANGER" */
    val riskZone: String,
)

@JsExport
class ProgressionRecommendationJs(
    /** "DELOAD" | "MAINTAIN" | "ADD_WEIGHT" | "ADD_REPS" */
    val tier: String,
    val reason: String,
    val suggestedWeight: Double?,
    val suggestedReps: Int?,
    val weightIncrement: Double,
    val currentE1rm: Double?,
)

@JsExport
class ProgressiveOverloadEngineJs {

    private val json = Json { ignoreUnknownKeys = true }

    fun epley(weight: Double, reps: Int): Double =
        ProgressiveOverloadEngine.epley(weight, reps)

    fun brzycki(weight: Double, reps: Int): Double =
        ProgressiveOverloadEngine.brzycki(weight, reps)

    fun landmarksFor(muscleGroup: String): VolumeLandmarksJs {
        val l = ProgressiveOverloadEngine.landmarksFor(muscleGroup)
        return VolumeLandmarksJs(l.mev, l.mav, l.mrv)
    }

    /** Returns JSON object of all volume landmarks: {"chest": {mev, mav, mrv}, ...} */
    fun getAllLandmarks(): String {
        val all = listOf(
            "chest", "back", "shoulders", "biceps", "triceps", "legs",
            "quads", "hamstrings", "glutes", "calves", "core",
            "traps", "lats", "forearms",
        )
        val map = all.associate { mg ->
            val l = ProgressiveOverloadEngine.landmarksFor(mg)
            mg to mapOf("mev" to l.mev, "mav" to l.mav, "mrv" to l.mrv)
        }
        return json.encodeToString(map)
    }

    /**
     * Compute ACWR from session loads (most recent first).
     * @param sessionLoadsJson JSON array of doubles (daily loads)
     */
    fun computeAcwr(sessionLoadsJson: String): AcwrResultJs {
        val loads = json.decodeFromString<List<Double>>(sessionLoadsJson)
        val r = ProgressiveOverloadEngine.computeAcwr(loads)
        return AcwrResultJs(r.acuteLoad, r.chronicLoad, r.ratio, r.riskZone.name)
    }

    /**
     * Generate a progression recommendation for an exercise.
     */
    fun recommend(
        avgRpe: Double,
        e1rmTrendJson: String,
        completedSets: Int,
        targetSets: Int,
        currentWeight: Double,
        currentReps: Int,
        acwr: Double = 1.0,
        unit: String = "kg",
    ): ProgressionRecommendationJs {
        val trend = json.decodeFromString<List<Double>>(e1rmTrendJson)
        val r = ProgressiveOverloadEngine.recommend(
            avgRpe, trend, completedSets, targetSets, currentWeight, currentReps, acwr, unit,
        )
        return ProgressionRecommendationJs(
            r.tier.name, r.reason, r.suggestedWeight, r.suggestedReps, r.weightIncrement, r.currentE1rm,
        )
    }
}
