package com.agnes.ara.core.domain.models

/**
 * Canonical module identifiers shared across web-parity paths.
 *
 * Web uses "nexus" while mobile historically used "orchestrator" for the same
 * module. During parity migration we accept both and normalize to "nexus".
 */
object ModuleIds {
    const val NEXUS = "nexus"
    const val ORCHESTRATOR_LEGACY = "orchestrator"

    fun normalize(moduleId: String?): String? {
        val next = moduleId?.trim()?.lowercase() ?: return null
        if (next.isBlank()) return null
        return when (next) {
            ORCHESTRATOR_LEGACY -> NEXUS
            else -> next
        }
    }

    fun equivalents(moduleId: String?): Set<String> {
        val normalized = normalize(moduleId) ?: return emptySet()
        return if (normalized == NEXUS) {
            setOf(NEXUS, ORCHESTRATOR_LEGACY)
        } else {
            setOf(normalized)
        }
    }
}

