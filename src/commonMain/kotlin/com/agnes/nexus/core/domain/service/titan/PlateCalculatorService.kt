package com.agnes.nexus.core.domain.service.titan

/**
 * Greedy plate calculator — distributes a target weight across standard barbell plate sets.
 *
 * Supports both kg and lb plate inventories. Returns the achieved weight and whether it
 * is an exact match for the target. Callers should display [PlateResult.achievedWeight]
 * when [PlateResult.isExact] is false.
 */
object PlateCalculatorService {

    enum class Unit { KG, LB }

    data class PlateResult(
        val targetWeight: Double,
        val barWeight: Double,
        val unit: Unit,
        val platesPerSide: Map<Double, Int>,  // plate size → count per side
        val achievedWeight: Double,
        val isExact: Boolean
    )

    private val kgPlates = listOf(25.0, 20.0, 15.0, 10.0, 5.0, 2.5, 1.25)
    private val lbPlates = listOf(45.0, 35.0, 25.0, 10.0, 5.0, 2.5)

    /**
     * @param targetWeight     Desired total weight in the specified unit.
     * @param unit             KG or LB plate set.
     * @param customBarWeight  Override the default bar weight (20 kg / 45 lb).
     */
    fun calculate(targetWeight: Double, unit: Unit = Unit.KG, customBarWeight: Double? = null): PlateResult {
        val barWeight = customBarWeight ?: if (unit == Unit.KG) 20.0 else 45.0
        val plates = if (unit == Unit.KG) kgPlates else lbPlates
        val remaining = ((targetWeight - barWeight) / 2.0).coerceAtLeast(0.0)

        val result = mutableMapOf<Double, Int>()
        var leftover = remaining
        for (plate in plates) {
            val count = (leftover / plate).toInt()
            if (count > 0) {
                result[plate] = count
                leftover -= count * plate
            }
        }

        val achieved = barWeight + result.entries.sumOf { it.key * it.value * 2 }
        return PlateResult(targetWeight, barWeight, unit, result, achieved, achieved == targetWeight)
    }

    /** Returns a standard color code (ARGB Long) for UI plate rendering. */
    fun plateColor(plateSize: Double): Long = when (plateSize) {
        25.0 -> 0xFF3B82F6  // blue
        20.0 -> 0xFFF59E0B  // yellow
        15.0 -> 0xFF10B981  // green
        10.0 -> 0xFFFFFFFF  // white
        5.0  -> 0xFFEF4444  // red
        45.0 -> 0xFF3B82F6  // lb 45 = blue
        35.0 -> 0xFFF59E0B  // lb 35 = yellow
        else -> 0xFF6B7280  // gray
    }
}
