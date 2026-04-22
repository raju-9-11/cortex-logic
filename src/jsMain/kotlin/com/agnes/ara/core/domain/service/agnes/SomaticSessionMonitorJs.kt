package com.agnes.ara.core.domain.service.agnes

import com.agnes.ara.core.domain.services.SpineEventBus
import com.agnes.ara.core.domain.services.SpineEventPayload
import com.agnes.ara.core.engine.CancellableTask
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import kotlinx.serialization.json.*
import kotlin.coroutines.cancellation.CancellationException
import kotlin.js.JsExport

/**
 * JS-exported facade for SomaticSessionMonitor.
 * Monitors Soma vitality and processes somatic pings during sessions.
 */
@Suppress("WRONG_EXPORTED_DECLARATION")
@JsExport
class SomaticSessionMonitorJs(
    private val jsEmitSpineEvent: (String) -> Unit
) {
    private val monitor: SomaticSessionMonitor
    private val scope = CoroutineScope(SupervisorJob())

    init {
        monitor = SomaticSessionMonitor(JsSpineEventBus())
    }

    /** Call when a dialogue session starts. */
    fun startSession(currentVitality: Float, topicLabel: String = "") {
        monitor.startSession(currentVitality, topicLabel)
    }

    /** Call on each Soma telemetry update during an active session. */
    fun onVitalityUpdate(
        currentVitality: Float,
        nowMs: Double? = null,
        onComplete: () -> Unit,
        onError: (String) -> Unit
    ): CancellableTask {
        val job = scope.launch {
            try {
                monitor.onVitalityUpdate(currentVitality, nowMs?.toLong() ?: currentTimeMs())
                onComplete()
            } catch (_: CancellationException) {
            } catch (e: Throwable) {
                onError(e.message ?: "Vitality update failed")
            }
        }
        return CancellableTask(job)
    }

    /** Update the current dialogue topic label. */
    fun setCurrentTopic(label: String) {
        monitor.setCurrentTopic(label)
    }

    /** Process a Somatic Ping from the 5×5 grid. */
    fun processSomaticPing(
        gridX: Int,
        gridY: Int,
        pressure: Float,
        nowMs: Double? = null,
        onComplete: () -> Unit,
        onError: (String) -> Unit
    ): CancellableTask {
        val job = scope.launch {
            try {
                monitor.processSomaticPing(gridX, gridY, pressure, nowMs?.toLong() ?: currentTimeMs())
                onComplete()
            } catch (_: CancellationException) {
            } catch (e: Throwable) {
                onError(e.message ?: "Somatic ping processing failed")
            }
        }
        return CancellableTask(job)
    }

    /** True if a somatic ping is due. */
    fun isPingDue(nowMs: Double? = null): Boolean =
        monitor.isPingDue(nowMs?.toLong() ?: currentTimeMs())

    private fun currentTimeMs(): Long = kotlinx.datetime.Clock.System.now().toEpochMilliseconds()

    // ── Inner bridge: SpineEventBus ───────────────────────────────────────────

    private inner class JsSpineEventBus : SpineEventBus {
        override fun on(type: String, minPriority: String?): kotlinx.coroutines.flow.Flow<com.agnes.ara.core.domain.services.SpineEvent> = kotlinx.coroutines.flow.emptyFlow()

        override suspend fun emit(event: com.agnes.ara.core.domain.services.SpineEvent) {
            val priorityStr = when (event.header.priority) {
                com.agnes.ara.core.domain.services.SpinePriority.CRITICAL -> "critical"
                com.agnes.ara.core.domain.services.SpinePriority.ALERT -> "alert"
                else -> "info"
            }
            val domain = event.payload.attributes["_domain"] as? String ?: "system"
            val dataWithoutDomain = event.payload.attributes.filter { it.key != "_domain" }
            val eventJson = buildJsonObject {
                put("type", event.payload.intent)
                put("source", event.header.source)
                put("domain", domain)
                event.target?.let { put("target", it) }
                put("data", anyToJsonElement(dataWithoutDomain))
                put("priority", priorityStr)
                put("cascadeDepth", event.cascadeDepth)
            }.toString()
            jsEmitSpineEvent(eventJson)
        }

        override suspend fun emit(payload: SpineEventPayload): com.agnes.ara.core.domain.services.SpineEvent {
            val eventJson = buildJsonObject {
                put("type", payload.type)
                put("source", payload.source)
                put("domain", payload.domain)
                payload.target?.let { put("target", it) }
                put("data", anyToJsonElement(payload.data))
                put("priority", payload.priority)
                put("cascadeDepth", payload.cascadeDepth ?: 0)
            }.toString()
            jsEmitSpineEvent(eventJson)
            return payload.toSpineEvent()
        }

        override fun registerCascadeRules(rules: List<com.agnes.ara.core.domain.services.CascadeRule>) {}
        override fun getRecentEvents(filter: com.agnes.ara.core.domain.services.SpineEventFilter?): List<com.agnes.ara.core.domain.services.SpineEvent> = emptyList()

        private fun anyToJsonElement(value: Any?): JsonElement = when (value) {
            null -> JsonNull
            is Boolean -> JsonPrimitive(value)
            is Int -> JsonPrimitive(value)
            is Long -> JsonPrimitive(value)
            is Double -> JsonPrimitive(value)
            is Float -> JsonPrimitive(value.toDouble())
            is String -> JsonPrimitive(value)
            is Map<*, *> -> @Suppress("UNCHECKED_CAST")
                JsonObject((value as Map<String, Any?>).mapValues { (_, v) -> anyToJsonElement(v) })
            is List<*> -> JsonArray(value.map { anyToJsonElement(it) })
            is Array<*> -> JsonArray(value.map { anyToJsonElement(it) })
            is JsonElement -> value
            else -> JsonPrimitive(value.toString())
        }
    }
}
