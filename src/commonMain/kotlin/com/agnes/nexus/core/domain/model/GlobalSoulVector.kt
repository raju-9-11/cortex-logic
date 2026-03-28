package com.agnes.nexus.core.domain.model

import kotlinx.serialization.Serializable

/**
 * The five named dimensions of the GlobalSoul Neural State Vector.
 * All values are normalized floats (0.0 = worst, 1.0 = best).
 */
@Serializable
enum class GlobalSoulVector(val label: String, val primaryAgent: AgentSource) {
    RESILIENCE("Emotional Armor", AgentSource.AGNES),
    BANDWIDTH("Cognitive Capacity", AgentSource.ATLAS),
    VITALITY("Biological Readiness", AgentSource.SOMA),
    OUTPUT("Physical/Mechanical Load", AgentSource.TITAN),
    FRICTION("Financial Stress", AgentSource.LEDGER);

    companion object {
        fun fromName(name: String): GlobalSoulVector? =
            entries.firstOrNull { it.name.equals(name, ignoreCase = true) }
    }
}
