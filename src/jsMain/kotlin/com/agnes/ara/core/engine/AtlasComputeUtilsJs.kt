package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.service.atlas.AtlasComputeUtils
import kotlin.js.JsExport

@JsExport
class AtlasComputeUtilsJs {

    fun parseBoundedScore(value: Double?, fallback: Double = 5.0): Double =
        AtlasComputeUtils.parseBoundedScore(value, fallback)

    fun sanitizeTitle(raw: String?, defaultValue: String, maxLength: Int = 500): String =
        AtlasComputeUtils.sanitizeTitle(raw, defaultValue, maxLength)

    fun calculateActiveLoad(tasksJson: String): Int =
        AtlasComputeUtils.calculateActiveLoad(tasksJson)

    fun calculateDeadlinePressure(tasksJson: String, nowMs: Double): Double =
        AtlasComputeUtils.calculateDeadlinePressure(tasksJson, nowMs.toLong())

    fun deriveNsvTone(
        stressLoad: Double = 0.0,
        cnsFatigue: Double = 0.0,
        emotionalResilience: Double = 5.0,
        moodTrend: Double = 3.0,
        energyBudget: Double = 5.0,
        focusScore: Double = 5.0,
    ): String = AtlasComputeUtils.deriveNsvTone(
        stressLoad, cnsFatigue, emotionalResilience, moodTrend, energyBudget, focusScore,
    )

    fun getJournalPrompt(toneKey: String): String =
        AtlasComputeUtils.getJournalPrompt(toneKey)

    fun getJournalForward(toneKey: String): String =
        AtlasComputeUtils.getJournalForward(toneKey)
}
