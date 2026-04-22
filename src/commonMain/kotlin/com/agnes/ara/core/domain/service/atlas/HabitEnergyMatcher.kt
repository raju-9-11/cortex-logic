package com.agnes.ara.core.domain.service.atlas

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlin.math.abs
import kotlin.math.floor

// ═══════════════════════════════════════════════════════════════════════════════
// IO Types
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
internal data class HabitSlim(
    val id: String,
    val title: String,
    val energyCost: Double = 5.0,
    val status: String = "active",
)

@Serializable
internal data class EnergySlim(
    val energy: Double,
)

@Serializable
data class HabitEnergySlot(
    val habitId: String,
    val habitTitle: String,
    val suggestedHour: Int,
    val suggestedTimeLabel: String,
    val energyAtSlot: Double,
    val matchReason: String,
)

// ═══════════════════════════════════════════════════════════════════════════════
// HabitEnergyMatcher
// ═══════════════════════════════════════════════════════════════════════════════

object HabitEnergyMatcher {

    private val json = Json { ignoreUnknownKeys = true }

    /**
     * Match habits to optimal energy slots.
     * @param habitsJson JSON array of `[{id, title, energyCost, status}]`
     * @param energyWaveJson JSON array of `[{energy}]`
     * @return JSON array of HabitEnergySlot
     */
    fun matchHabitsToEnergySlots(habitsJson: String, energyWaveJson: String): String {
        val habits = json.decodeFromString<List<HabitSlim>>(habitsJson)
        val energyWave = json.decodeFromString<List<EnergySlim>>(energyWaveJson)

        val activeHabits = habits.filter { it.status == "active" }
        if (activeHabits.isEmpty() || energyWave.isEmpty()) {
            return "[]"
        }

        val totalSlots = energyWave.size
        val usedSlotIndices = mutableSetOf<Int>()
        val results = mutableListOf<HabitEnergySlot>()

        // Sort habits by energyCost descending so high-demand habits claim peaks first
        val sortedHabits = activeHabits.sortedByDescending { it.energyCost }

        for (habit in sortedHabits) {
            val cost = habit.energyCost

            // Determine the target energy band
            val minEnergy: Double
            val maxEnergy: Double
            when {
                cost >= 7.0 -> { minEnergy = 8.0; maxEnergy = 10.0 }
                cost >= 4.0 -> { minEnergy = 6.0; maxEnergy = 8.0 }
                else -> { minEnergy = 4.0; maxEnergy = 6.0 }
            }

            // Find the best slot in the preferred band
            var bestIndex = -1
            var bestEnergy = -1.0

            for (i in 0 until totalSlots) {
                if (i in usedSlotIndices) continue
                val energy = energyWave[i].energy
                if (energy in minEnergy..maxEnergy && energy > bestEnergy) {
                    bestEnergy = energy
                    bestIndex = i
                }
            }

            // Fallback: find the closest match ignoring band constraints
            if (bestIndex == -1) {
                val midTarget = (minEnergy + maxEnergy) / 2.0
                var bestDistance = Double.MAX_VALUE
                for (i in 0 until totalSlots) {
                    if (i in usedSlotIndices) continue
                    val energy = energyWave[i].energy
                    val distance = abs(energy - midTarget)
                    if (distance < bestDistance) {
                        bestDistance = distance
                        bestEnergy = energy
                        bestIndex = i
                    }
                }
            }

            if (bestIndex == -1) continue

            usedSlotIndices.add(bestIndex)
            val hour = slotIndexToHour(bestIndex, totalSlots)

            results.add(
                HabitEnergySlot(
                    habitId = habit.id,
                    habitTitle = habit.title,
                    suggestedHour = hour,
                    suggestedTimeLabel = formatHourLabel(hour),
                    energyAtSlot = energyWave[bestIndex].energy,
                    matchReason = matchReason(cost, energyWave[bestIndex].energy),
                )
            )
        }

        val sorted = results.sortedBy { it.suggestedHour }
        return json.encodeToString(kotlinx.serialization.builtins.ListSerializer(HabitEnergySlot.serializer()), sorted)
    }

    private fun slotIndexToHour(slotIndex: Int, totalSlots: Int): Int =
        floor(slotIndex.toDouble() / totalSlots * 24.0).toInt()

    private fun formatHourLabel(hour: Int): String {
        fun format(h: Int): String {
            val period = if (h < 12) "AM" else "PM"
            val display = when {
                h == 0 -> 12
                h > 12 -> h - 12
                else -> h
            }
            return "$display:00 $period"
        }
        val endHour = (hour + 1) % 24
        return "${format(hour)} - ${format(endHour)}"
    }

    private fun matchReason(energyCost: Double, slotEnergy: Double): String = when {
        energyCost >= 7 && slotEnergy >= 8 ->
            "Matches your energy peak — ideal for high-effort habits"
        energyCost >= 7 ->
            "Best available high-energy slot for this demanding habit"
        energyCost >= 4 && slotEnergy >= 6 ->
            "Good medium-energy slot for this habit"
        energyCost >= 4 ->
            "Moderate energy window — manageable for this habit"
        slotEnergy >= 4 ->
            "Moderate slot suits this low-energy habit"
        else ->
            "Low-energy valley — perfect for a light habit"
    }
}
