package com.agnes.nexus.core.domain.services.titan

import kotlin.math.pow

object TitanMathUtils {

    /**
     * Calculate Estimated 1 Rep Max (E1RM) using Brzycki formula.
     * reliable for reps <= 10.
     */
    fun calculateE1RM(weight: Double, reps: Int): Double {
        if (reps == 1) return weight
        if (reps <= 0) return 0.0
        
        // Brzycki: weight / (1.0278 - 0.0278 * reps)
        return weight / (1.0278 - (0.0278 * reps))
    }

    /**
     * Calculate Volume Load (Weight * Reps * Sets).
     */
    fun calculateVolume(weight: Double, reps: Int, sets: Int): Double {
        return weight * reps * sets
    }

    /**
     * Calculate Relative Intensity (RPE based).
     * Maps RPE (1-10) to percentage of 1RM (approximate).
     */
    fun rpeToPercentage(rpe: Double, reps: Int): Double {
        // Simple linear approximation for context
        // RPE 10 @ 1 rep = 100%
        // RPE 9 @ 1 rep = 96%
        // This is a complex topic, simplified for MVP parity
        val base = 1.0 - ((10.0 - rpe) * 0.04) // -4% per RPE point below 10
        val repDrop = (reps - 1) * 0.025 // -2.5% per extra rep
        return (base - repDrop).coerceIn(0.0, 1.0)
    }
}
