package com.agnes.nexus.core.domain.service.agnes

/**
 * Tracks therapeutic move categories within a session to prevent repetition.
 * Matches web personas.ts Move_Log / anti-repetition system.
 */
class TherapeuticMoveTracker {
    enum class MoveCategory(val maxPerSession: Int, val notInFirstN: Int = 0) {
        SOMATIC_CHECKIN(2),
        VALIDATION(3),
        NORMALIZATION(2),
        PATTERN_OBSERVATION(5),
        CLARIFICATION(10),
        GENTLE_CONFRONTATION(2, notInFirstN = 3),
        REFLECTION(10),
        REFRAME(5),
        PSYCHOEDUCATION(3),
        SOMATIC_EXPLORATION(2),
        CONTAINMENT(5),
        SPACE_GIVING(3)
    }

    private val counts = mutableMapOf<MoveCategory, Int>()
    private var totalMoves = 0
    private var lastMove: MoveCategory? = null

    fun canUse(category: MoveCategory): Boolean {
        val count = counts[category] ?: 0
        if (count >= category.maxPerSession) return false
        if (totalMoves < category.notInFirstN) return false
        if (category == lastMove) return false  // No immediate repetition
        return true
    }

    fun record(category: MoveCategory) {
        counts[category] = (counts[category] ?: 0) + 1
        totalMoves++
        lastMove = category
    }

    fun reset() {
        counts.clear()
        totalMoves = 0
        lastMove = null
    }

    fun getSuggestedCategories(): List<MoveCategory> =
        MoveCategory.entries.filter { canUse(it) }
}
