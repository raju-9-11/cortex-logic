package com.agnes.nexus.core.engine

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.buildJsonArray
import kotlinx.serialization.json.encodeToJsonElement
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.json.double
import kotlinx.serialization.json.doubleOrNull
import kotlinx.serialization.json.int
import kotlinx.serialization.json.intOrNull
import kotlin.math.max
import kotlin.math.min
import kotlin.js.JsExport

/**
 * JS facade for Atlas Blueprint capacity computation.
 *
 * Capacity formula (matches web blueprint-engine.ts):
 *   vitality         = recoveryScore/10   OR  (10 - cnsFatigue)/10  OR  0.5
 *   resilience       = emotionalResilience/10  (clamped 0–1)         OR  0.5
 *   friction         = financialFriction/10    (clamped 0–1)         OR  0.5
 *   resilienceModifier = 0.8 + resilience * 0.4
 *   capacity           = (vitality * resilienceModifier) − (friction * 0.2)
 *   capacity           = clamp(capacity, 0.1, 1.0)
 *
 * No dependency on KMP SpineEventBus — pure computation only.
 */
@JsExport
class BlueprintEngineJs {

    private val json = Json { ignoreUnknownKeys = true }

    /**
     * Calculate daily capacity (0.1–1.0) from a NeuralStateVector JSON snippet.
     *
     * @param nsvJson Partial NSV JSON:
     *   { biological: { recoveryScore?, cnsFatigue? }, emotional: { emotionalResilience? }, resource: { financialFriction? } }
     */
    fun calculateCapacity(nsvJson: String): Double {
        val root = json.parseToJsonElement(nsvJson).jsonObject

        val biological = root["biological"]?.jsonObject
        val emotional = root["emotional"]?.jsonObject
        val resource = root["resource"]?.jsonObject

        val recoveryScore = biological?.get("recoveryScore")?.jsonPrimitive?.doubleOrNull
        val cnsFatigue = biological?.get("cnsFatigue")?.jsonPrimitive?.doubleOrNull
        val emotionalResilience = emotional?.get("emotionalResilience")?.jsonPrimitive?.doubleOrNull
        val financialFriction = resource?.get("financialFriction")?.jsonPrimitive?.doubleOrNull

        val vitality = when {
            recoveryScore != null -> recoveryScore / 10.0
            cnsFatigue != null -> max(0.0, min(1.0, (10.0 - cnsFatigue) / 10.0))
            else -> 0.5
        }

        val resilience = if (emotionalResilience != null) max(0.0, min(1.0, emotionalResilience / 10.0)) else 0.5
        val friction = if (financialFriction != null) max(0.0, min(1.0, financialFriction / 10.0)) else 0.5

        val resilienceModifier = 0.8 + resilience * 0.4
        val capacity = (vitality * resilienceModifier) - (friction * 0.2)

        return max(0.1, min(1.0, capacity))
    }

    /**
     * Returns true if the total cognitive weight of all active tasks exceeds capacity.
     *
     * @param weightsJson JSON array of doubles (cognitive weights).
     * @param capacity    Daily capacity value from [calculateCapacity].
     */
    fun isOverloaded(weightsJson: String, capacity: Double): Boolean {
        val weights = json.parseToJsonElement(weightsJson).jsonArray
        val totalLoad = weights.sumOf { it.jsonPrimitive.double }
        return totalLoad > capacity
    }

    /**
     * Determine which tasks to defer given current capacity.
     *
     * Tasks are sorted by priority ascending (1 = highest), then by cognitive_weight descending.
     * We keep tasks greedily until capacity is exhausted; deferred tasks are returned.
     *
     * @param tasksJson JSON array of task objects with at minimum { cognitive_weight: Double, priority: Int }.
     * @param capacity  Daily capacity from [calculateCapacity].
     * @return JSON array of the same task objects that should be deferred.
     */
    fun getTasksToDefer(tasksJson: String, capacity: Double): String {
        val tasksArray = json.parseToJsonElement(tasksJson).jsonArray
        val tasks = tasksArray.map { it.jsonObject }

        // Sort: priority ASC (1 = highest priority), then cognitive_weight DESC
        val sorted = tasks.sortedWith(compareBy<JsonObject> {
            it["priority"]?.jsonPrimitive?.intOrNull ?: Int.MAX_VALUE
        }.thenByDescending {
            it["cognitive_weight"]?.jsonPrimitive?.doubleOrNull ?: 0.0
        })

        var currentLoad = 0.0
        val toDefer = mutableListOf<JsonObject>()

        for (task in sorted) {
            val weight = task["cognitive_weight"]?.jsonPrimitive?.doubleOrNull ?: 0.0
            if (currentLoad + weight <= capacity) {
                currentLoad += weight
            } else {
                toDefer.add(task)
            }
        }

        return buildJsonArray {
            for (task in toDefer) add(task)
        }.toString()
    }
}
