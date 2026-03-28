package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.model.GlobalSoul
import com.agnes.nexus.core.domain.models.GlobalProjection
import com.agnes.nexus.core.domain.models.deriveGlobalSoul
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.datetime.Clock

/**
 * Reactive store for the GlobalSoul Neural State Vector.
 *
 * Lives in commonMain — consumed by Android (ViewModel.collectAsState),
 * and Web (JS coroutine collector in a Web Worker).
 *
 * Thread safety: [kotlinx.coroutines.flow.MutableStateFlow.update] is atomic.
 * All sub-apps observe [state] and morph their UI on each emission.
 */
class GlobalSoulStore {
    private val _state = MutableStateFlow(GlobalSoul())
    val state: StateFlow<GlobalSoul> = _state.asStateFlow()

    /**
     * Atomically transform the current [GlobalSoul].
     * Stamps [GlobalSoul.lastUpdated] with the current epoch milliseconds.
     *
     * Usage:
     * ```
     * store.update { it.copy(vitality = 0.3f) }
     * store.update { soul -> mutationApplier.apply(soul, mutations) }
     * ```
     */
    fun update(transform: (GlobalSoul) -> GlobalSoul) {
        _state.update { current ->
            transform(current).copy(
                lastUpdated = Clock.System.now().toEpochMilliseconds()
            )
        }
    }

    /**
     * Replace the in-memory GlobalSoul from the canonical persisted projection path.
     * This keeps spec-facing state derived from the same projection/NSV source used
     * elsewhere in the app instead of drifting into an unwired parallel store.
     */
    fun syncFromProjection(
        projection: GlobalProjection?,
        autopilotLevel: Int = current.autopilot
    ) {
        val now = Clock.System.now().toEpochMilliseconds()
        val projectedSoul = projection?.deriveGlobalSoul(
            autopilotLevel = autopilotLevel,
            now = now
        ) ?: GlobalSoul(
            autopilot = autopilotLevel,
            lastUpdated = now
        )
        val currentSoul = _state.value
        _state.value = if (currentSoul.isSystemDebtActive) {
            projectedSoul.copy(
                recoveryRateMultiplier = currentSoul.recoveryRateMultiplier,
                isSystemDebtActive = true
            )
        } else {
            projectedSoul
        }
    }

    /** Read the current snapshot without subscribing. */
    val current: GlobalSoul get() = _state.value

    /** Reset to defaults — used in test teardown or user logout. */
    fun reset() {
        _state.value = GlobalSoul()
    }
}
