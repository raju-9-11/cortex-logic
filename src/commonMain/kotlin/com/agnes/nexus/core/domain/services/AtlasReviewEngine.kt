package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.models.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach

/**
 * Atlas Review Engine - Implementation of Schedule Flattening.
 */
class AtlasReviewEngine(
    private val eventBus: SpineEventBus,
    private val nsvService: NeuralProjectionService,
    private val scope: CoroutineScope
) {
    private val _isFlattened = MutableStateFlow(false)
    val isFlattened: StateFlow<Boolean> = _isFlattened.asStateFlow()

    private val _energyWave = MutableStateFlow<List<Double>>(emptyList())
    val energyWave: StateFlow<List<Double>> = _energyWave.asStateFlow()

    fun start() {
        // Listen for system-wide burnout or fatigue warnings
        eventBus.on("BURNOUT_WARNING").onEach { 
            flattenSchedule(true) 
        }.launchIn(scope)

        eventBus.on("BLOCK_HIGH_INTENSITY").onEach { 
            flattenSchedule(true) 
        }.launchIn(scope)

        // Reset if state improves significantly
        nsvService.observeNsv().onEach { nsv ->
            computeEnergyWave(nsv)
            if ((nsv.emotional.emotionalResilience ?: 0.0) > 7.0 && (nsv.biological.cnsFatigue ?: 0.0) < 4.0) {
                flattenSchedule(false)
            }
        }.launchIn(scope)
    }

    private fun flattenSchedule(active: Boolean) {
        if (_isFlattened.value == active) return
        _isFlattened.value = active
    }

    private fun computeEnergyWave(nsv: NeuralStateVector) {
        // Simple prediction algorithm for the next 6 hours
        val base = nsv.cognitive.energyBudget ?: 5.0
        val stressImpact = (nsv.emotional.stressLoad ?: 0.0) * 0.2
        val fatigueImpact = (nsv.biological.cnsFatigue ?: 0.0) * 0.3
        
        val wave = List(6) { hour ->
            (base - stressImpact - fatigueImpact - (hour * 0.5)).coerceIn(0.0, 10.0)
        }
        _energyWave.value = wave
    }
}
