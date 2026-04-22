package com.agnes.ara.core.domain.services.atlas

import com.agnes.ara.core.domain.models.NeuralStateVector
import com.agnes.ara.core.domain.services.NeuralProjectionService
import com.agnes.ara.core.domain.services.SpineEventBus
import com.agnes.ara.core.domain.services.SpineEventPayload
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.launch
import kotlinx.datetime.Clock

/**
 * Atlas Predictive Service - 4-state machine for cognitive load management.
 * 
 * States: Normal → Compressed → Overloaded → Recovery
 * 
 * Ported from web's AtlasPredictiveService for parity.
 */
class AtlasPredictiveService(
    private val eventBus: SpineEventBus,
    private val nsvService: NeuralProjectionService,
    private val scope: CoroutineScope
) {
    enum class AtlasState {
        Normal,
        Compressed,
        Overloaded,
        Recovery
    }

    data class AtlasStateDisplay(
        val state: AtlasState,
        val label: String,
        val description: String,
        val colorToken: String
    )

    private val _currentState = MutableStateFlow(AtlasState.Normal)
    val currentState: StateFlow<AtlasState> = _currentState.asStateFlow()

    private val _stateDisplay = MutableStateFlow(getDisplayForState(AtlasState.Normal))
    val stateDisplay: StateFlow<AtlasStateDisplay> = _stateDisplay.asStateFlow()

    private val _transitionRisk = MutableStateFlow(0.0)
    val transitionRisk: StateFlow<Double> = _transitionRisk.asStateFlow()

    private var consecutiveCleanEvaluations = 0
    private var lastNsv: NeuralStateVector? = null

    // Velocity tracking for predictive alerts
    private var previousPlanningLoad: Double? = null
    private var previousDeadlinePressure: Double? = null

    fun start() {
        // Subscribe to NSV updates
        nsvService.observeNsv().onEach { nsv ->
            evaluate(nsv)
        }.launchIn(scope)

        // Subscribe to specific Spine events
        eventBus.on("VITAL_UPDATED").onEach { event ->
            lastNsv?.let { evaluate(it) }
        }.launchIn(scope)

        eventBus.on("FLATTEN_ENERGY_WAVE").onEach {
            handleFlattenRequest()
        }.launchIn(scope)

        eventBus.on("PLANNING_OVERLOAD").onEach {
            handlePlanningOverload()
        }.launchIn(scope)

        eventBus.on("CRISIS_MODE").onEach {
            transitionTo(AtlasState.Recovery, "crisis_mode")
        }.launchIn(scope)
    }

    /**
     * Evaluate NSV and transition state machine accordingly.
     */
    fun evaluate(nsv: NeuralStateVector) {
        lastNsv = nsv
        val previous = _currentState.value

        val planningLoad = nsv.cognitive.planningLoad ?: 0.0
        val deadlinePressure = nsv.planning.deadlinePressure ?: 0.0
        val cnsFatigue = nsv.biological.cnsFatigue ?: 0.0
        val emotionalResilience = nsv.emotional.emotionalResilience ?: 10.0
        val financialFriction = nsv.resource.financialFriction ?: 0.0

        // Calculate transition risk based on velocity
        val risk = calculateTransitionRisk(planningLoad, deadlinePressure)
        _transitionRisk.value = risk

        // Check for burnout crisis (can skip straight to Recovery from any state)
        val burnoutIndicators = listOf(
            emotionalResilience <= 3,
            cnsFatigue >= 8,
            financialFriction >= 7
        ).count { it }

        if (burnoutIndicators >= 2) {
            transitionTo(AtlasState.Recovery, "burnout_detected")
            consecutiveCleanEvaluations = 0
            updateVelocityTracking(planningLoad, deadlinePressure)
            return
        }

        // State transitions based on current state
        val newState = when (previous) {
            AtlasState.Normal -> {
                when {
                    planningLoad >= 8 && deadlinePressure >= 6 -> AtlasState.Overloaded
                    planningLoad >= 6 || deadlinePressure >= 6 -> AtlasState.Compressed
                    else -> AtlasState.Normal
                }
            }
            AtlasState.Compressed -> {
                when {
                    planningLoad >= 8 && deadlinePressure >= 6 -> AtlasState.Overloaded
                    planningLoad < 6 && deadlinePressure < 6 -> {
                        consecutiveCleanEvaluations++
                        if (consecutiveCleanEvaluations >= 2) AtlasState.Normal else AtlasState.Compressed
                    }
                    else -> {
                        consecutiveCleanEvaluations = 0
                        AtlasState.Compressed
                    }
                }
            }
            AtlasState.Overloaded -> {
                when {
                    planningLoad < 6 && deadlinePressure < 6 -> {
                        consecutiveCleanEvaluations++
                        if (consecutiveCleanEvaluations >= 2) AtlasState.Compressed else AtlasState.Overloaded
                    }
                    else -> {
                        consecutiveCleanEvaluations = 0
                        AtlasState.Overloaded
                    }
                }
            }
            AtlasState.Recovery -> {
                // Recovery only exits when metrics normalize significantly
                val recoveryExit = emotionalResilience > 7 && cnsFatigue < 4 && planningLoad < 5
                if (recoveryExit) {
                    consecutiveCleanEvaluations++
                    if (consecutiveCleanEvaluations >= 2) AtlasState.Normal else AtlasState.Recovery
                } else {
                    consecutiveCleanEvaluations = 0
                    AtlasState.Recovery
                }
            }
        }

        if (newState != previous) {
            transitionTo(newState, "nsv_evaluation")
        }

        // Emit predictive alert if risk is high
        if (risk >= 0.6 && previous == AtlasState.Normal) {
            scope.launch { emitPredictiveAlert(risk, planningLoad, deadlinePressure) }
        }

        updateVelocityTracking(planningLoad, deadlinePressure)
    }

    /**
     * Calculate transition risk based on metric velocity.
     * Returns 0.0-1.0 probability of state degradation.
     */
    private fun calculateTransitionRisk(planningLoad: Double, deadlinePressure: Double): Double {
        val prevPlanning = previousPlanningLoad ?: planningLoad
        val prevDeadline = previousDeadlinePressure ?: deadlinePressure

        val planningVelocity = planningLoad - prevPlanning
        val deadlineVelocity = deadlinePressure - prevDeadline

        // Risk increases with positive velocity (metrics getting worse)
        val velocityRisk = ((planningVelocity.coerceAtLeast(0.0) + deadlineVelocity.coerceAtLeast(0.0)) / 4.0)
            .coerceIn(0.0, 0.5)

        // Risk increases with absolute values
        val absoluteRisk = ((planningLoad / 10.0) * 0.3 + (deadlinePressure / 10.0) * 0.2)
            .coerceIn(0.0, 0.5)

        return (velocityRisk + absoluteRisk).coerceIn(0.0, 1.0)
    }

    private fun updateVelocityTracking(planningLoad: Double, deadlinePressure: Double) {
        previousPlanningLoad = planningLoad
        previousDeadlinePressure = deadlinePressure
    }

    private fun transitionTo(newState: AtlasState, reason: String) {
        val previous = _currentState.value
        if (previous == newState) return

        _currentState.value = newState
        _stateDisplay.value = getDisplayForState(newState)

        // Emit state changed event
        scope.launch { emitStateChanged(previous, newState, reason) }

        // Emit overload detected if transitioning to Overloaded or Recovery
        if (newState == AtlasState.Overloaded || newState == AtlasState.Recovery) {
            scope.launch { emitOverloadDetected(newState) }
        }
    }

    private fun handleFlattenRequest() {
        val current = _currentState.value
        if (current == AtlasState.Normal) {
            transitionTo(AtlasState.Compressed, "flatten_request")
        }
    }

    private fun handlePlanningOverload() {
        transitionTo(AtlasState.Overloaded, "planning_overload")
    }

    private suspend fun emitStateChanged(previous: AtlasState, current: AtlasState, reason: String) {
        eventBus.emit(SpineEventPayload(
            type = "ATLAS_STATE_CHANGED",
            source = "atlas",
            domain = "C",
            data = mapOf(
                "previous" to previous.name,
                "current" to current.name,
                "reason" to reason,
                "transitionRisk" to _transitionRisk.value,
                "timestamp" to Clock.System.now().toString()
            ),
            priority = if (current == AtlasState.Recovery) "alert" else "info"
        ))
    }

    private suspend fun emitPredictiveAlert(risk: Double, planningLoad: Double, deadlinePressure: Double) {
        eventBus.emit(SpineEventPayload(
            type = "ATLAS_PREDICTIVE_ALERT",
            source = "atlas",
            domain = "C",
            data = mapOf(
                "riskScore" to risk,
                "planningLoad" to planningLoad,
                "deadlinePressure" to deadlinePressure,
                "reason" to "High transition risk detected",
                "timestamp" to Clock.System.now().toString()
            ),
            priority = "alert"
        ))
    }

    private suspend fun emitOverloadDetected(state: AtlasState) {
        eventBus.emit(SpineEventPayload(
            type = "ATLAS_OVERLOAD_DETECTED",
            source = "atlas",
            domain = "C",
            data = mapOf(
                "state" to state.name,
                "timestamp" to Clock.System.now().toString()
            ),
            priority = "alert"
        ))
    }

    /**
     * Compute effective energy budget with modifiers.
     * Ported from web's ENERGY_BUDGET_COMPUTATION logic.
     */
    fun computeEffectiveEnergyBudget(nsv: NeuralStateVector): Double {
        var budget = nsv.cognitive.energyBudget ?: 5.0

        // Sleep modifier: if sleepQuality < 4, reduce by 2
        val sleepQuality = nsv.biological.sleepQuality ?: 5.0
        if (sleepQuality < 4) {
            budget -= 2
        }

        // Fatigue modifier: if cnsFatigue > 7, cap at 4
        val cnsFatigue = nsv.biological.cnsFatigue ?: 0.0
        if (cnsFatigue > 7) {
            budget = budget.coerceAtMost(4.0)
        }

        // Stress modifier: if stressLoad > 7, reduce by 1
        val stressLoad = nsv.emotional.stressLoad ?: 0.0
        if (stressLoad > 7) {
            budget -= 1
        }

        // Financial modifier: if financialFriction > 8, reduce by 1
        val financialFriction = nsv.resource.financialFriction ?: 0.0
        if (financialFriction > 8) {
            budget -= 1
        }

        return budget.coerceIn(0.0, 10.0)
    }

    /**
     * Get safe planning threshold (80% of effective budget).
     */
    fun getSafePlanningThreshold(nsv: NeuralStateVector): Double {
        return computeEffectiveEnergyBudget(nsv) * 0.8
    }

    /**
     * Check if total energy cost exceeds safe threshold.
     */
    fun isOverloaded(totalEnergyCost: Double, nsv: NeuralStateVector): Boolean {
        return totalEnergyCost > getSafePlanningThreshold(nsv)
    }

    companion object {
        fun getDisplayForState(state: AtlasState): AtlasStateDisplay {
            return when (state) {
                AtlasState.Normal -> AtlasStateDisplay(
                    state = state,
                    label = "Normal",
                    description = "Baseline state. No active compression.",
                    colorToken = "sky-500"
                )
                AtlasState.Compressed -> AtlasStateDisplay(
                    state = state,
                    label = "Compressed",
                    description = "Early warning signals. Soft compression active.",
                    colorToken = "amber-400"
                )
                AtlasState.Overloaded -> AtlasStateDisplay(
                    state = state,
                    label = "Overloaded",
                    description = "Energy wave flattened. High-intensity deferred.",
                    colorToken = "orange-500"
                )
                AtlasState.Recovery -> AtlasStateDisplay(
                    state = state,
                    label = "Recovery",
                    description = "Cascade-triggered recovery. No commitments.",
                    colorToken = "rose-600"
                )
            }
        }
    }
}
