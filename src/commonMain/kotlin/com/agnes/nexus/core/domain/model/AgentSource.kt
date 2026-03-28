package com.agnes.nexus.core.domain.model

import kotlinx.serialization.Serializable

/**
 * Enumeration of all agent sources in the Nexus ecosystem.
 * Lower [precedence] value = higher authority in conflict resolution.
 * Agnes (1) > Atlas (2) > Soma (3) > Titan (4) > Ledger (5) > Scout (6) > Forge (7)
 */
@Serializable
enum class AgentSource(val precedence: Int) {
    NEXUS(0),    // Orchestrator — meta-shell
    AGNES(1),    // Psychological — highest authority
    ATLAS(2),    // Executive / Cognitive
    SOMA(3),     // Clinical / Biological
    TITAN(4),    // Physical / Mechanical
    LEDGER(5),   // Material / Financial
    SCOUT(6),    // Research — stateless utility
    FORGE(7);    // Technical — future implementation

    companion object {
        fun fromId(id: String): AgentSource {
            val normalized = id
                .trim()
                .substringAfterLast(':')
                .substringAfterLast('/')
                .substringAfterLast('.')
                .uppercase()

            return when (normalized) {
                "ORCHESTRATOR" -> NEXUS
                else -> entries.firstOrNull { it.name == normalized } ?: NEXUS
            }
        }
    }
}
