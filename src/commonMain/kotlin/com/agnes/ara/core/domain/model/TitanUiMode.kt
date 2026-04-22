package com.agnes.ara.core.domain.model

import kotlinx.serialization.Serializable

/**
 * Titan UI rendering mode. This is a signal to the UI layer only — not persisted.
 * Computed from [ClearanceStatus] and Soma vitality at render time.
 */
@Serializable
enum class TitanUiMode {
    PERFORMANCE,  // Data-dense charts, 1RM trends, volume tonnage
    RECOVERY      // Soft interface, paused routines, mobility/restorative suggestions
}
