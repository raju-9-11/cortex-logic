package com.agnes.ara.core.domain.service.agnes

import kotlin.js.JsExport

/**
 * JS-exported facade for TherapeuticMoveTracker.
 * Tracks therapeutic move categories within a session to prevent repetition.
 */
@JsExport
class TherapeuticMoveTrackerJs {
    private val tracker = TherapeuticMoveTracker()

    /** Check if a category can be used. */
    fun canUse(category: String): Boolean {
        val cat = try {
            TherapeuticMoveTracker.MoveCategory.valueOf(category.uppercase())
        } catch (e: Exception) {
            return false
        }
        return tracker.canUse(cat)
    }

    /** Record a used category. */
    fun record(category: String) {
        val cat = try {
            TherapeuticMoveTracker.MoveCategory.valueOf(category.uppercase())
        } catch (e: Exception) {
            return
        }
        tracker.record(cat)
    }

    /** Reset the tracker. */
    fun reset() {
        tracker.reset()
    }

    /** Get suggested categories that can be used. */
    fun getSuggestedCategories(): Array<String> {
        return tracker.getSuggestedCategories().map { it.name }.toTypedArray()
    }
}
