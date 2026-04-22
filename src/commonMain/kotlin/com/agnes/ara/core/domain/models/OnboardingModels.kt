package com.agnes.ara.core.domain.models

import kotlinx.serialization.Serializable

/**
 * A canonical data point that the module needs from the user.
 * The LLM enriches this into a full FieldDefinition during onboarding.
 */
@Serializable
data class OnboardingDataPoint(
    /** Stable canonical ID — used as the key in onComplete(values) */
    val id: String,
    /** Human-readable label — context hint for LLM field generation */
    val label: String,
    /** Type hint for the LLM */
    val type: FieldType,
    val required: Boolean,
    /** Extra hint for the LLM (e.g. "use select with ISO country codes") */
    val hint: String? = null,
    /** Explicit options for SELECT / MULTI_SELECT fields — used in fallback and passed to FieldDefinition */
    val options: List<FieldOption>? = null,
    /** Autocomplete suggestions for TEXT fields — rendered as a datalist */
    val autocomplete: List<String>? = null
)

/**
 * Static configuration for a module's onboarding experience.
 * The spec contains only data — no React hooks or callbacks.
 */
@Serializable
data class ModuleOnboardingSpec(
    val moduleId: String,
    val displayName: String,
    val themeColor: String, // e.g., "indigo", "violet"
    val iconName: String, // lucide icon name reference
    /** One-sentence goal for LLM schema generation */
    val goal: String,
    /** Paragraph of context fed to the LLM to enrich field definitions */
    val context: String,
    val dataPoints: List<OnboardingDataPoint>,
    /** Whether to show the Express / Guided mode selector */
    val fastTrackEnabled: Boolean,
    /** Canonical IDs that must be non-empty for Express submission */
    val fastTrackRequiredIds: List<String>
)
