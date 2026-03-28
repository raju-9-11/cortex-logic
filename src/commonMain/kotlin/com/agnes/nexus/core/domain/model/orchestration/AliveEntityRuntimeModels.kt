package com.agnes.nexus.core.domain.model.orchestration

import com.agnes.nexus.core.domain.model.AliveEntityType
import kotlinx.serialization.Serializable

// ═══════════════════════════════════════════════════════════════════════════════
// Alive Entity Runtime Reference
// Lightweight projection of AliveEntity used for cross-module context panel.
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
data class AliveEntityRuntimeReference(
    val id: String,
    val label: String,
    val type: AliveEntityType,
    val sourceModuleId: String,
    val sourceEntityId: String? = null,
    /** 'native' | 'bootstrap' | 'adapter' */
    val provenance: String,
    /** Up to 4 shown in UI as #tag */
    val semanticTags: List<String> = emptyList(),
    val updatedAt: String
)

// ═══════════════════════════════════════════════════════════════════════════════
// Alive Entity Runtime Context
// Aggregated snapshot across all modules; drives AliveEntityInputPanel.
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
data class AliveEntityRuntimeContext(
    val total: Int,
    /** Ordered list of moduleIds that have at least one alive entity */
    val moduleIds: List<String>,
    /** moduleId → list of references */
    val byModule: Map<String, List<AliveEntityRuntimeReference>>,
    /** Union of all semantic tags across entities */
    val tags: List<String>,
    val lastUpdatedAt: String?
) {
    companion object {
        val Empty = AliveEntityRuntimeContext(
            total = 0,
            moduleIds = emptyList(),
            byModule = emptyMap(),
            tags = emptyList(),
            lastUpdatedAt = null
        )
    }
}
