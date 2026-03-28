package com.agnes.nexus.core.domain.model

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.buildJsonObject

/**
 * AliveEntity — the universal semantic primitive for cross-module data.
 *
 * Tag-driven and schema-flexible. The [attributes] open schema holds any
 * domain-specific payload (e.g. {weight: 225, reps: 5} for Titan logs).
 * The [soulImpactPreset] maps GlobalSoul vector names to pre-computed delta floats.
 */
@Serializable
data class AliveEntity(
    val id: String,
    val type: AliveEntityType,
    val label: String,
    val semanticTags: List<String> = emptyList(),  // e.g. ["strength", "tax_deductible"]
    val attributes: JsonObject = buildJsonObject {},
    val soulImpactPreset: Map<String, Float> = emptyMap(), // GlobalSoulVector.name → delta
    val sourceModuleId: String? = null,
    val createdAt: Long = 0L
) {
    /** Resolve soul impact preset to typed SoulMutation list. */
    fun toSoulMutations(): List<SoulMutation> =
        soulImpactPreset.mapNotNull { (key, delta) ->
            GlobalSoulVector.fromName(key)?.let { SoulMutation(it, delta) }
        }
}
