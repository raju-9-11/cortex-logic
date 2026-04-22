package com.agnes.ara.core.domain.ui

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonElement
import com.agnes.ara.core.domain.models.FieldDefinition

/**
 * Module UI focus target (intentionally platform-agnostic).
 *
 * Web deep-links commonly encode focus as strings like:
 * - "task:<taskId>"
 * - "journal:<journalEntryId>"
 */
@Serializable
data class ModuleFocusTarget(
    val type: String,
    val id: String,
    val raw: String
)

@Serializable
data class ModuleUiTab(
    val id: String,
    val order: Int = 0,
    val allowedViews: List<String> = emptyList()
)

@Serializable
data class ModuleUiFocusMapping(
    /** Case-insensitive prefix match, e.g. "task:" or "journal:" */
    val focusPrefix: String,
    val tabId: String
)

@Serializable
data class ModuleUiState(
    val moduleId: String,
    val activeTabId: String,
    val activeViewId: String? = null,
    val isRightRailOpen: Boolean = false,
    /** When true, UI should show the module's onboarding flow. */
    val showOnboarding: Boolean,
    val onboardingState: ModuleOnboardingState? = null,
    val focusTarget: ModuleFocusTarget? = null
)

@Serializable
data class IntakeStep(
    val key: String,
    val label: String,
    val helperText: String,
    val focusActions: List<String> = emptyList(),
    val inferredKeywords: List<String> = emptyList()
)

@Serializable
data class ModuleOnboardingState(
    val stepIndex: Int = 0,
    val onboardingComplete: Boolean = false,
    val steps: List<IntakeStep> = emptyList(),
    val activeMode: String = "select", // select, express, guided
    val fields: List<FieldDefinition> = emptyList(),
    val sections: List<String> = listOf("General"),
    val schemaLoading: Boolean = false,
    val schemaError: String? = null,
    val values: Map<String, JsonElement> = emptyMap()
)

