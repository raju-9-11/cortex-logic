package com.agnes.nexus.core.domain.service.atlas

import com.agnes.nexus.core.domain.model.GlobalSoul
import com.agnes.nexus.core.domain.services.SpineEventBus
import com.agnes.nexus.core.domain.services.SpineEventPayload
import com.agnes.nexus.core.domain.services.SpineSoulMutation

/**
 * Blueprint Capacity Engine — computes the user's Daily Cognitive Capacity (C_day)
 * from the GlobalSoul and enforces the active task weight constraint.
 *
 * Formula: C_day = (GlobalSoul.vitality × resilience_modifier) - GlobalSoul.friction
 *
 * Where resilience_modifier = GlobalSoul.resilience (psychological armor scales vitality).
 *
 * Constraint: Σ(cognitive_weight of active tasks) ≤ C_day
 *
 * If C_day drops below the current load, Atlas emits DEFER_LOW_PRIORITY to move
 * low-priority tasks to the Horizon (backlog).
 *
 * Soma integration: If vitality < 0.5, high-weight (> 0.6) tasks are locked
 * (Blueprint locked — no new high-weight tasks can be added).
 */
class BlueprintCapacityEngine(
    private val eventBus: SpineEventBus
) {
    companion object {
        const val HIGH_WEIGHT_THRESHOLD = 0.6f
        const val VITALITY_LOCK_THRESHOLD = 0.5f
        const val FRICTION_LOCK_THRESHOLD = 0.8f
    }

    /**
     * Compute the Daily Cognitive Capacity from the current GlobalSoul.
     *
     * @return C_day ∈ [0.0, 1.0]
     */
    fun computeCapacity(soul: GlobalSoul): Float {
        val resilienceModifier = soul.resilience.coerceIn(0f, 1f)
        val rawCapacity = (soul.vitality * resilienceModifier) - soul.friction
        return rawCapacity.coerceIn(0f, 1f)
    }

    /**
     * Check whether the active task load violates the capacity constraint.
     * Emits DEFER_LOW_PRIORITY if overloaded.
     *
     * @param soul              Current GlobalSoul.
     * @param activeTaskWeights List of cognitive_weight values for all TODO/DOING tasks.
     * @param lowPriorityTaskIds IDs of low-priority tasks eligible for deferral.
     */
    suspend fun enforceConstraint(
        soul: GlobalSoul,
        activeTaskWeights: List<Pair<String, Float>>,  // (taskId, cognitiveWeight)
        lowPriorityTaskIds: List<String>
    ): CapacityResult {
        val cDay = computeCapacity(soul)
        val totalLoad = activeTaskWeights.sumOf { it.second.toDouble() }.toFloat()
        val overloaded = totalLoad > cDay

        if (overloaded && lowPriorityTaskIds.isNotEmpty()) {
            eventBus.emit(SpineEventPayload(
                type = "DEFER_LOW_PRIORITY",
                source = "atlas",
                priority = "alert",
                mutations = listOf(SpineSoulMutation("BANDWIDTH", -(totalLoad - cDay).coerceIn(0f, 0.3f))),
                data = mapOf(
                    "cDay" to cDay,
                    "totalLoad" to totalLoad,
                    "overflow" to (totalLoad - cDay),
                    "taskIds" to lowPriorityTaskIds,
                    "reason" to "capacity_exceeded"
                )
            ).toSpineEvent())
        }

        return CapacityResult(
            cDay = cDay,
            totalLoad = totalLoad,
            isOverloaded = overloaded,
            isHighWeightLocked = soul.vitality < VITALITY_LOCK_THRESHOLD,
            isBlueprintFrictionLocked = soul.friction > FRICTION_LOCK_THRESHOLD
        )
    }

    /**
     * Check if a new task can be scheduled given current capacity.
     * Emits VITALITY_CRITICAL and rejects high-weight tasks when Soma vitality < 0.5.
     */
    suspend fun canScheduleTask(
        soul: GlobalSoul,
        taskWeight: Float,
        currentTotalLoad: Float
    ): Boolean {
        val cDay = computeCapacity(soul)

        // High-weight lock when Soma reports low vitality
        if (taskWeight > HIGH_WEIGHT_THRESHOLD && soul.vitality < VITALITY_LOCK_THRESHOLD) {
            eventBus.emit(SpineEventPayload(
                type = "VITALITY_CRITICAL",
                source = "soma",
                priority = "alert",
                data = mapOf(
                    "vitality" to soul.vitality,
                    "rejectedTaskWeight" to taskWeight,
                    "message" to "Blueprint locked: vitality too low for high-weight tasks.",
                    "threshold" to VITALITY_LOCK_THRESHOLD
                )
            ).toSpineEvent())
            return false
        }

        return (currentTotalLoad + taskWeight) <= cDay
    }
}

data class CapacityResult(
    val cDay: Float,
    val totalLoad: Float,
    val isOverloaded: Boolean,
    val isHighWeightLocked: Boolean,     // vitality < 0.5 → no new high-weight tasks
    val isBlueprintFrictionLocked: Boolean  // friction > 0.8 → financial stress warning
)
