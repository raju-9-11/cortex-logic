package com.agnes.nexus.core.domain.model

import kotlinx.serialization.Serializable

/**
 * A Ledger Resonance Swipe entry.
 * Resonance score: -1.0 (maximum friction/stress) to +1.0 (maximum value alignment).
 * Replaces manual category tagging with an intuitive drag gesture.
 */
@Serializable
data class ResonanceSwipeEntry(
    val id: String,
    val amount: Float,
    val currency: String = "USD",
    val resonanceScore: Float,     // -1.0 to +1.0
    val category: String? = null,
    val description: String? = null,
    val timestamp: Long = 0L,
    val notes: String? = null
) {
    val isFriction: Boolean get() = resonanceScore < 0f
    val isResonant: Boolean get() = resonanceScore > 0f
    val isNeutral:  Boolean get() = resonanceScore == 0f
}
