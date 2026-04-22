package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.service.titan.TitanNsvUpdater
import kotlin.js.JsExport

@JsExport
class WorkoutNSVPatchJs(
    val cnsFatigue: Double,
    val recoveryScore: Double,
    val energyBudget: Double,
    val focusScore: Double,
)

@JsExport
class SleepNSVPatchJs(
    val sleepQuality: Double,
    val energyBudget: Double,
    val focusScore: Double,
)

@JsExport
class TitanNsvUpdaterJs {

    fun computeWorkoutPatch(
        rpe: Double,
        totalVolumeKg: Double,
        hoursElapsed: Double,
        existingCnsFatigue: Double,
        existingRecoveryScore: Double,
    ): WorkoutNSVPatchJs {
        val p = TitanNsvUpdater.computeWorkoutPatch(
            rpe, totalVolumeKg, hoursElapsed, existingCnsFatigue, existingRecoveryScore,
        )
        return WorkoutNSVPatchJs(p.cnsFatigue, p.recoveryScore, p.energyBudget, p.focusScore)
    }

    fun computeSleepPatch(
        durationHours: Double,
        qualityRating: Double,
    ): SleepNSVPatchJs {
        val p = TitanNsvUpdater.computeSleepPatch(durationHours, qualityRating)
        return SleepNSVPatchJs(p.sleepQuality, p.energyBudget, p.focusScore)
    }
}
