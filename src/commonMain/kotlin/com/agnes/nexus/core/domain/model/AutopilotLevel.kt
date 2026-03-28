package com.agnes.nexus.core.domain.model

import kotlinx.serialization.Serializable

/**
 * Autopilot level (0-5) governing how autonomously the Orchestrator acts.
 *
 * Level 0-2: All agent actions require explicit user approval (proposal cards).
 * Level 3-4: Routine/low-friction tasks automated; high-friction events require approval.
 * Level 5 (Ghost): Full autonomous execution. UI may suppress itself for recovery/focus.
 *
 * SECURITY: Ledger is permanently hard-capped at [HYBRID_LOW] regardless of global level.
 */
@Serializable
enum class AutopilotLevel(val level: Int, val label: String) {
    MANUAL(0, "Manual"),
    ADVISORY(1, "Advisory"),
    HYBRID_LOW(2, "Hybrid"),
    HYBRID_HIGH(3, "Hybrid+"),
    HIGH_AUTONOMY(4, "High Autonomy"),
    GHOST(5, "Ghost Mode");

    /** Every action requires explicit user approval at this level. */
    val requiresApprovalForAll: Boolean get() = level <= 2

    /** Routine tasks are automated; high-friction events still need approval. */
    val automatesRoutine: Boolean get() = level in 3..4

    /** Full autonomous mode — UI suppression signal may be emitted. */
    val isGhostMode: Boolean get() = level == 5

    /** Ledger hard cap — financial mutations never exceed this level. */
    val ledgerEffectiveLevel: AutopilotLevel get() = if (level > HYBRID_LOW.level) HYBRID_LOW else this

    companion object {
        const val SETTINGS_KEY: String = "global_autopilot_level"

        fun fromLevel(level: Int): AutopilotLevel =
            entries.firstOrNull { it.level == level } ?: MANUAL

        /** The hard cap applied to all Ledger-sourced mutations. */
        val LEDGER_MAX: AutopilotLevel = HYBRID_LOW
    }
}
