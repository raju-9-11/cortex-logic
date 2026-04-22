package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.service.atlas.HabitEnergyMatcher
import kotlin.js.JsExport

@JsExport
class HabitEnergyMatcherJs {

    /**
     * Match habits to optimal energy slots.
     * @param habitsJson JSON array of `[{id, title, energyCost, status}]`
     * @param energyWaveJson JSON array of `[{energy}]`
     * @return JSON array of `[{habitId, habitTitle, suggestedHour, suggestedTimeLabel, energyAtSlot, matchReason}]`
     */
    fun matchHabitsToEnergySlots(habitsJson: String, energyWaveJson: String): String =
        HabitEnergyMatcher.matchHabitsToEnergySlots(habitsJson, energyWaveJson)
}
