package com.agnes.ara.core.domain.service.agnes

import com.agnes.ara.core.domain.model.AgnesSessionMode
import com.agnes.ara.core.domain.services.SpineEventBus
import com.agnes.ara.core.domain.services.SpineEventPayload
import com.agnes.ara.core.engine.CancellableTask
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import kotlinx.serialization.json.*
import kotlin.coroutines.cancellation.CancellationException

/**
 * JS-facing bridge that exposes [AgnesSessionLifecycleService] to TypeScript callers.
 *
 * Usage from TypeScript:
 * ```ts
 * const lifecycle = new AgnesSessionLifecycleServiceJs(emitSpineEvent)
 * lifecycle.transitionTo('DEEP', 'session-123', () => {}, (err) => {})
 * ```
 */
@Suppress("WRONG_EXPORTED_DECLARATION")
@JsExport
class AgnesSessionLifecycleServiceJs(
    private val jsEmitSpineEvent: (String) -> Unit
) {
    private val service: AgnesSessionLifecycleService
    private val scope = CoroutineScope(SupervisorJob())

    init {
        service = AgnesSessionLifecycleService(JsSpineEventBus())
    }

    /** Transition to a new session mode. */
    fun transitionTo(
        mode: String,
        sessionId: String,
        onComplete: () -> Unit,
        onError: (String) -> Unit
    ): CancellableTask {
        val job = scope.launch {
            try {
                val sessionMode = try {
                    AgnesSessionMode.valueOf(mode.uppercase())
                } catch (e: Exception) {
                    AgnesSessionMode.CASUAL
                }
                service.transitionTo(sessionMode, sessionId)
                onComplete()
            } catch (_: CancellationException) {
            } catch (e: Throwable) {
                onError(e.message ?: "Transition failed")
            }
        }
        return CancellableTask(job)
    }

    /** Called when an IMPROMPTU session is closed. Registers 2-hour purgatory. */
    fun closeImpromptu(
        sessionId: String,
        onComplete: () -> Unit,
        onError: (String) -> Unit
    ): CancellableTask {
        val job = scope.launch {
            try {
                service.closeImpromptu(sessionId)
                onComplete()
            } catch (_: CancellationException) {
            } catch (e: Throwable) {
                onError(e.message ?: "Closing impromptu failed")
            }
        }
        return CancellableTask(job)
    }

    /** Check if a session is still in purgatory (not yet purged). */
    fun isInPurgatory(sessionId: String): Boolean {
        return service.isInPurgatory(sessionId)
    }

    /** Purge all expired purgatory sessions. Returns list of purged session IDs. */
    fun purgeExpiredSessions(
        onComplete: (Array<String>) -> Unit,
        onError: (String) -> Unit
    ): CancellableTask {
        val job = scope.launch {
            try {
                val expired = service.purgeExpiredSessions()
                onComplete(expired.toTypedArray())
            } catch (_: CancellationException) {
            } catch (e: Throwable) {
                onError(e.message ?: "Purge failed")
            }
        }
        return CancellableTask(job)
    }

    /** Evaluate sentiment gravity and emit session invitation if threshold exceeded. */
    fun evaluateSentimentGravity(
        gravity: Float,
        sessionId: String,
        onComplete: () -> Unit,
        onError: (String) -> Unit
    ): CancellableTask {
        val job = scope.launch {
            try {
                service.evaluateSentimentGravity(gravity, sessionId)
                onComplete()
            } catch (_: CancellationException) {
            } catch (e: Throwable) {
                onError(e.message ?: "Sentiment evaluation failed")
            }
        }
        return CancellableTask(job)
    }

    /** Returns the current session mode as a string. */
    fun currentMode(): String {
        return service.currentMode().name
    }

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
