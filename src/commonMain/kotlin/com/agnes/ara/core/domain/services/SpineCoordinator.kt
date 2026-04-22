package com.agnes.ara.core.domain.services

import com.agnes.ara.core.domain.model.GlobalSoul
import com.agnes.ara.core.domain.models.NeuralStateVector
import com.agnes.ara.core.domain.services.SpineEventPayload
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach

/**
 * Spine Coordinator - The system's "Subconscious Reflexes".
 * Listens to state changes and automatically emits cross-domain cascade events.
 * Ported from Nexus React 19 SPA for maximum robustness.
 */
class SpineCoordinator(
    private val nsvService: NeuralProjectionService,
    private val eventBus: SpineEventBus,
    private val scope: CoroutineScope
) {
    fun start() {
        // 1. Listen to NSV changes (Primary trigger for deterministic cascades)
        nsvService.observeNsv()
            .onEach { nsv -> evaluateDeterministicRules(nsv) }
            .launchIn(scope)

        // 2. Listen to Event Bus (Primary trigger for event-based cascades)
        eventBus.on("*")
            .onEach { event -> evaluateEventCascades(event) }
            .launchIn(scope)
    }

    private suspend fun evaluateDeterministicRules(nsv: NeuralStateVector) {
        val b = nsv.biological
        val e = nsv.emotional
        val c = nsv.cognitive
        val r = nsv.resource

        val fatigue = b.cnsFatigue ?: 0.0
        val resilience = e.emotionalResilience ?: 10.0
        val stress = e.stressLoad ?: 0.0
        val friction = r.financialFriction ?: 0.0
        val planningLoad = c.planningLoad ?: 0.0
        val streakHealth = c.taskCompletionRate?.times(10.0) ?: 10.0 // Heuristic mapping

        // Rule: Crisis Mode (Compound Stress)
        if (stress >= 8.0 && fatigue >= 7.0 && resilience <= 3.0) {
            emitCascade("CRISIS_MODE", "system", "critical", "orchestrator", 
                mapOf("reason" to "compound_stress_crisis"))
        }

        // Rule: Burnout Warning
        else if (fatigue >= 8.0 && resilience <= 3.0) {
            emitCascade("BURNOUT_WARNING", "system", "critical", "orchestrator", 
                mapOf("reason" to "high_fatigue_low_resilience"))
        }

        // Rule: Physical Overload
        if (fatigue >= 8.0) {
            emitCascade("BLOCK_HIGH_INTENSITY", "B", "alert", "titan", 
                mapOf("reason" to "cns_fatigue_high"))
        }

        // Rule: Financial Stress
        if (friction >= 8.0) {
            emitCascade("FINANCIAL_STRESS", "R", "alert", "orchestrator", 
                mapOf("reason" to "resource_friction_high"))
        }

        // Rule: Planning Overload
        if (planningLoad >= 8.0) {
            emitCascade("PLANNING_OVERLOAD", "C", "alert", "orchestrator", 
                mapOf("reason" to "planning_load_critical"))
        }

        // Rule: Streak Broken / Risk
        if (streakHealth <= 3.0) {
            emitCascade("STREAK_BROKEN", "C", "alert", "agnes", 
                mapOf("reason" to "habit_streak_at_risk"))
        }
    }

    private suspend fun evaluateEventCascades(event: SpineEvent) {
        // Prevent coordinator from reacting to its own direct cascades if they lack original source
        if (event.source.startsWith("cascade:coordinator")) return

        when (event.type) {
            "BURNOUT_WARNING", "BLOCK_HIGH_INTENSITY", "PLANNING_OVERLOAD", "DEADLINE_CRUNCH" -> {
                emitCascade("FLATTEN_ENERGY_WAVE", "C", "alert", "atlas", 
                    mapOf("reason" to event.type.lowercase(), "parent_event" to event.id))
            }
            "CLEARANCE_DENIED" -> {
                emitCascade("BLOCK_HIGH_INTENSITY", "B", "alert", "titan", 
                    mapOf("reason" to "clearance_denied", "activity" to (event.data["activity"] ?: "unknown")))
            }
        }
    }

    private suspend fun emitCascade(
        type: String, 
        domain: String, 
        priority: String, 
        target: String, 
        data: Map<String, Any?>
    ) {
        eventBus.emit(SpineEventPayload(
            type = type,
            source = "coordinator",
            domain = domain,
            priority = priority,
            target = target,
            data = data,
            cascadeDepth = 1 // Basic coordinator cascades are depth 1
        ))
    }

    /**
     * Evaluate deterministic rules against the [GlobalSoul] (0.0-1.0 scale).
     *
     * This is the primary evaluation path post-GlobalSoul migration, replacing the
     * legacy 0-10 [NeuralStateVector] thresholds with normalised float comparisons.
     * All emitted cascades propagate at depth 1, sourced from "coordinator".
     */
    private suspend fun evaluateDeterministicRulesFromSoul(soul: GlobalSoul) {
        // Crisis Mode: compound collapse across 3 vectors simultaneously
        if (soul.resilience < 0.3f && soul.vitality < 0.3f && soul.bandwidth < 0.3f) {
            emitCascade(
                "CRISIS_MODE", "system", "critical", "orchestrator",
                mapOf(
                    "reason" to "compound_state_collapse",
                    "resilience" to soul.resilience,
                    "vitality" to soul.vitality,
                    "bandwidth" to soul.bandwidth
                )
            )
        }

        // Burnout: high output demand with critically depleted vitality
        if (soul.output > 0.7f && soul.vitality < 0.3f) {
            emitCascade(
                "BURNOUT_WARNING", "system", "critical", "orchestrator",
                mapOf("reason" to "high_output_low_vitality")
            )
        }

        // Physical overload: output vector maxed — block further high-intensity tasks
        if (soul.output > 0.8f) {
            emitCascade(
                "BLOCK_HIGH_INTENSITY", "system", "alert", "titan",
                mapOf("reason" to "output_overloaded", "output" to soul.output)
            )
        }

        // Financial stress: friction exceeds critical threshold
        if (soul.friction > 0.8f) {
            emitCascade(
                "FINANCIAL_STRESS", "system", "alert", "orchestrator",
                mapOf("reason" to "friction_critical", "friction" to soul.friction)
            )
        }

        // Cognitive overload: bandwidth fully depleted — planning tasks must be paused
        if (soul.bandwidth < 0.2f) {
            emitCascade(
                "PLANNING_OVERLOAD", "system", "alert", "orchestrator",
                mapOf("reason" to "bandwidth_depleted", "bandwidth" to soul.bandwidth)
            )
        }

        // Resilience floor breach — Agnes takes highest priority to intervene
        if (soul.resilience < 0.2f) {
            emitCascade(
                "RESILIENCE_FLOOR_BREACH", "system", "critical", "agnes",
                mapOf("reason" to "resilience_critical", "resilience" to soul.resilience)
            )
        }

        // Soma stale data warning — biometric readings are unreliable
        if (soul.staleFlag) {
            emitCascade(
                "SOMA_DATA_STALE", "system", "alert", "soma",
                mapOf("reason" to "soma_data_older_than_24h")
            )
        }
    }
}
