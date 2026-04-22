package com.agnes.ara.core.domain.ui

import com.agnes.ara.core.domain.models.ActionCall
import com.agnes.ara.core.domain.models.ModuleOnboardingConfigs
import com.agnes.ara.core.domain.services.DynamicSchemaEngine
import com.agnes.ara.core.domain.services.AraSettings
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.flow.update

/**
 * Platform-agnostic UI controller for a single module.
 *
 * Responsibilities:
 * - Persist & restore active tab id
 * - Compute onboarding visibility from onboarding completion
 * - Manage onboarding step progress and mode
 * - Resolve focusId prefixes into a target tab
 * - Generate onboarding schema dynamically
 */
class ModuleUiController(
    private val scope: CoroutineScope,
    private val settings: AraSettings,
    val contract: ModuleUiContract,
    private val schemaEngine: DynamicSchemaEngine? = null
) {
    private val tabKey: String = "module_ui_active_tab_${contract.moduleId}"
    private val viewKey: String = "module_ui_active_view_${contract.moduleId}"
    private val pendingFocusKey: String = "pending_focus_id_${contract.moduleId}"
    private val onboardingModeKey: String = "onboarding_mode_${contract.moduleId}"
    private val onboardingStepKey: String = "onboarding_step_${contract.moduleId}"

    private fun parseFocusTarget(focusId: String): ModuleFocusTarget? {
        val trimmed = focusId.trim()
        val colon = trimmed.indexOf(':')
        if (colon <= 0 || colon >= trimmed.length - 1) return null
        val type = trimmed.substring(0, colon)
        val id = trimmed.substring(colon + 1)
        if (id.isBlank()) return null
        return ModuleFocusTarget(type = type, id = id, raw = trimmed)
    }

    private fun resolveFocusTabId(focusId: String): String? {
        val normalized = focusId.trim()
        val mapping = contract.focusTabMappings.firstOrNull { mapping ->
            normalized.startsWith(mapping.focusPrefix, ignoreCase = true)
        } ?: return null
        return mapping.tabId
    }

    private val initialTabId: String = settings.getString(tabKey, contract.defaultTabId) ?: contract.defaultTabId
    private val initialViewId: String? = settings.getString(viewKey, null)
    private val initialOnboardingMode: String = settings.getString(onboardingModeKey, "select") ?: "select"
    private val initialOnboardingStep: Int = settings.getInt(onboardingStepKey, 0)

    private val _state = MutableStateFlow(
        ModuleUiState(
            moduleId = contract.moduleId,
            activeTabId = initialTabId,
            activeViewId = initialViewId,
            isRightRailOpen = false,
            showOnboarding = true,
            onboardingState = ModuleOnboardingState(
                stepIndex = initialOnboardingStep,
                onboardingComplete = false,
                steps = contract.intakeSteps,
                activeMode = initialOnboardingMode
            ),
            focusTarget = null
        )
    )
    val state: StateFlow<ModuleUiState> = _state.asStateFlow()

    init {
        val pending = settings.getString(pendingFocusKey, null)
        if (!pending.isNullOrBlank()) {
            scope.launch {
                applyFocus(pending)
                settings.remove(pendingFocusKey)
            }
        }

        // Initialize dynamic schema if schema engine is provided
        if (schemaEngine != null) {
            val spec = ModuleOnboardingConfigs.specFor(contract.moduleId)
            if (spec != null) {
                _state.update { current ->
                    current.copy(
                        onboardingState = current.onboardingState?.copy(
                            schemaLoading = true,
                            schemaError = null
                        )
                    )
                }
                scope.launch {
                    try {
                        val (fields, sections) = schemaEngine.generateSchema(spec)
                        _state.update { current ->
                            current.copy(
                                onboardingState = current.onboardingState?.copy(
                                    schemaLoading = false,
                                    fields = fields,
                                    sections = sections
                                )
                            )
                        }
                    } catch (e: Exception) {
                        _state.update { current ->
                            current.copy(
                                onboardingState = current.onboardingState?.copy(
                                    schemaLoading = false,
                                    schemaError = e.message ?: "Failed to generate schema"
                                )
                            )
                        }
                    }
                }
            }
        }
    }

    fun updateOnboardingValue(fieldId: String, value: kotlinx.serialization.json.JsonElement) {
        _state.update { current ->
            val currentState = current.onboardingState ?: return@update current
            val newValues = currentState.values.toMutableMap()
            newValues[fieldId] = value
            current.copy(onboardingState = currentState.copy(values = newValues))
        }
    }

    fun updateOnboardingValues(updates: Map<String, kotlinx.serialization.json.JsonElement>) {
        _state.update { current ->
            val currentState = current.onboardingState ?: return@update current
            val newValues = currentState.values.toMutableMap()
            newValues.putAll(updates)
            current.copy(onboardingState = currentState.copy(values = newValues))
        }
    }

    fun onOnboardingComplete(onboardingComplete: Boolean) {
        _state.update { current ->
            current.copy(
                showOnboarding = !onboardingComplete,
                onboardingState = current.onboardingState?.copy(onboardingComplete = onboardingComplete)
            )
        }
    }

    fun setOnboardingMode(mode: String) {
        _state.update { current ->
            current.copy(onboardingState = current.onboardingState?.copy(activeMode = mode))
        }
        settings.putString(onboardingModeKey, mode)
    }

    fun setOnboardingStep(stepIndex: Int) {
        val safeIdx = stepIndex.coerceIn(0, (contract.intakeSteps.size - 1).coerceAtLeast(0))
        _state.update { current ->
            current.copy(onboardingState = current.onboardingState?.copy(stepIndex = safeIdx))
        }
        settings.putInt(onboardingStepKey, safeIdx)
    }

    fun applyActions(actions: List<ActionCall>) {
        if (_state.value.onboardingState?.onboardingComplete == true) return

        var nextStep = _state.value.onboardingState?.stepIndex ?: 0
        var nextCompleted = _state.value.onboardingState?.onboardingComplete ?: false

        for (action in actions) {
            val type = action.type.trim().lowercase()
            if (contract.completeActionType != null && type == contract.completeActionType.lowercase()) {
                nextCompleted = true
                break
            }
            
            val stepIdx = contract.intakeSteps.indexOfFirst { it.focusActions.map { a -> a.lowercase() }.contains(type) }
            if (stepIdx >= 0) {
                nextStep = stepIdx
            }
        }

        if (nextStep != _state.value.onboardingState?.stepIndex || nextCompleted != _state.value.onboardingState?.onboardingComplete) {
            _state.update { current ->
                current.copy(
                    showOnboarding = !nextCompleted,
                    onboardingState = current.onboardingState?.copy(
                        stepIndex = nextStep,
                        onboardingComplete = nextCompleted
                    )
                )
            }
            settings.putInt(onboardingStepKey, nextStep)
        }
    }

    fun setActiveTab(tabId: String) {
        val isValid = contract.tabs.any { it.id == tabId }
        val nextTabId = if (isValid) tabId else contract.defaultTabId
        
        _state.update { current ->
            current.copy(activeTabId = nextTabId)
        }
        settings.putString(tabKey, nextTabId)
    }

    fun setActiveView(viewId: String?) {
        _state.update { current ->
            current.copy(activeViewId = viewId)
        }
        if (viewId != null) {
            settings.putString(viewKey, viewId)
        } else {
            settings.remove(viewKey)
        }
    }

    fun setRightRailOpen(isOpen: Boolean) {
        _state.update { current ->
            current.copy(isRightRailOpen = isOpen)
        }
    }

    fun applyFocus(focusId: String) {
        val focus = parseFocusTarget(focusId) ?: return
        val resolvedTabId = resolveFocusTabId(focusId) ?: return

        scope.launch {
            _state.update { current ->
                current.copy(
                    focusTarget = focus,
                    activeTabId = resolvedTabId
                )
            }
            settings.putString(tabKey, resolvedTabId)
        }
    }
}
