package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.models.NeuralStateVector
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.emptyFlow
import kotlinx.coroutines.launch
import kotlinx.serialization.json.*

/**
 * JS-facing bridge for NexusSynthesisService.
 *
 * Wraps the KMP [NexusSynthesisService] and exposes it to TypeScript via
 * JSON-serialized parameters and results. Spine events are forwarded to JS
 * via the [onEvent] callback instead of a real SharedFlow bus.
 *
 * @param onEvent  Called on every emitted Spine event: (type, dataJson) → Unit.
 *                 Agnes wires this to `Spine.emit()` on the TypeScript side.
 */
@JsExport
class NexusSynthesisServiceJs(
    private val onEvent: (type: String, dataJson: String) -> Unit
) {

    // Minimal SpineEventBus that forwards emits to the JS callback.
    private val callbackBus = object : SpineEventBus {
        override fun on(type: String, minPriority: String?): Flow<SpineEvent> = emptyFlow()
        override suspend fun emit(event: SpineEvent) {
            val dataJson = Json.encodeToString(
                JsonObject.serializer(),
                buildJsonObject {
                    event.data.forEach { (k, v) ->
                        when (v) {
                            is String  -> put(k, v)
                            is Boolean -> put(k, v)
                            is Number  -> put(k, v.toDouble())
                            is List<*> -> put(k, buildJsonArray {
                                v.forEach { item -> if (item is String) add(item) }
                            })
                            else       -> put(k, v?.toString() ?: "")
                        }
                    }
                }
            )
            onEvent(event.type, dataJson)
        }
        override suspend fun emit(payload: SpineEventPayload): SpineEvent {
            val event = payload.toSpineEvent()
            emit(event)
            return event
        }
        override fun registerCascadeRules(rules: List<CascadeRule>) {}
        override fun getRecentEvents(filter: SpineEventFilter?): List<SpineEvent> = emptyList()
    }

    private val scope = CoroutineScope(SupervisorJob())

    private val inner = NexusSynthesisService(
        eventBus = callbackBus,
        scope = scope
    )

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * Detect active conflicts from the current NSV.
     *
     * @param nsvJson  JSON-serialized NeuralStateVector (same shape as GlobalSoul crossFunctionalState).
     * @return JSON array of [ConflictResultJs] objects.
     */
    fun detectConflicts(nsvJson: String): String {
        val nsv = parseNsvJson(nsvJson)
        val results = inner.detectConflicts(nsv)
        return buildJsonArray {
            results.forEach { c ->
                addJsonObject {
                    put("id", c.id)
                    put("title", c.title)
                    put("severity", if (c.severity == NexusSynthesisService.ConflictSeverity.BLOCK) "block" else "warn")
                    put("suggestedResolution", c.suggestedResolution)
                    put("detectedAt", c.detectedAt)
                    put("affectedModulesJson", buildJsonArray {
                        c.affectedModules.forEach { add(it) }
                    }.toString())
                }
            }
        }.toString()
    }

    /**
     * Whether a conflict should be surfaced to the user right now.
     *
     * @param conflictJson  A single conflict object as returned by [detectConflicts].
     */
    fun shouldSurface(conflictJson: String): Boolean {
        val conflict = parseConflictJson(conflictJson) ?: return false
        return inner.shouldSurface(conflict)
    }

    /**
     * Mark a conflict as surfaced and emit CONFLICT_DETECTED to the JS callback.
     *
     * @param conflictJson  A single conflict object as returned by [detectConflicts].
     */
    fun markSurfaced(conflictJson: String) {
        val conflict = parseConflictJson(conflictJson) ?: return
        scope.launch { inner.markSurfaced(conflict) }
    }

    /**
     * Record the user's resolution choice and emit CONFLICT_RESOLVED (and any
     * reroute cascade) to the JS callback.
     *
     * @param conflictId  Stable conflict ID (e.g. "CONFLICT_THERAPY_FATIGUE").
     * @param resolution  One of "proceed", "defer", or "reroute".
     */
    fun resolveConflict(conflictId: String, resolution: String) {
        val choice = when (resolution) {
            "proceed" -> NexusSynthesisService.ConflictResolutionChoice.PROCEED
            "defer"   -> NexusSynthesisService.ConflictResolutionChoice.DEFER
            "reroute" -> NexusSynthesisService.ConflictResolutionChoice.REROUTE
            else      -> NexusSynthesisService.ConflictResolutionChoice.DEFER
        }
        inner.resolveConflict(conflictId, choice)
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    private fun parseNsvJson(json: String): NeuralStateVector {
        if (json.isBlank() || json == "null") return NeuralStateVector()
        return try {
            kotlinx.serialization.json.Json {
                ignoreUnknownKeys = true
                isLenient = true
            }.decodeFromString(NeuralStateVector.serializer(), json)
        } catch (_: Exception) {
            NeuralStateVector()
        }
    }

    private fun parseConflictJson(json: String): NexusSynthesisService.ConflictResult? {
        return try {
            val obj = Json.parseToJsonElement(json).jsonObject
            val id = obj["id"]?.jsonPrimitive?.contentOrNull ?: return null
            val title = obj["title"]?.jsonPrimitive?.contentOrNull ?: return null
            val severity = if (obj["severity"]?.jsonPrimitive?.contentOrNull == "block")
                NexusSynthesisService.ConflictSeverity.BLOCK
            else
                NexusSynthesisService.ConflictSeverity.WARN
            val suggestedResolution = obj["suggestedResolution"]?.jsonPrimitive?.contentOrNull ?: ""
            val detectedAt = obj["detectedAt"]?.jsonPrimitive?.longOrNull ?: 0L
            val affectedModulesJson = obj["affectedModulesJson"]?.jsonPrimitive?.contentOrNull ?: "[]"
            val affectedModules = try {
                Json.parseToJsonElement(affectedModulesJson).jsonArray
                    .mapNotNull { it.jsonPrimitive.contentOrNull }
            } catch (_: Exception) { emptyList() }
            NexusSynthesisService.ConflictResult(
                id = id,
                title = title,
                affectedModules = affectedModules,
                severity = severity,
                suggestedResolution = suggestedResolution,
                detectedAt = detectedAt
            )
        } catch (_: Exception) {
            null
        }
    }
}
