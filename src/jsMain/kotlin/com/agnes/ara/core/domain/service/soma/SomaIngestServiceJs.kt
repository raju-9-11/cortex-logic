package com.agnes.ara.core.domain.service.soma

import com.agnes.ara.core.domain.model.PatientScope
import com.agnes.ara.core.domain.services.*
import com.agnes.ara.core.engine.CancellableTask
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import kotlinx.serialization.json.*
import kotlin.coroutines.cancellation.CancellationException

/**
 * JS-facing bridge that exposes [SomaIngestService] to TypeScript callers.
 */
@Suppress("WRONG_EXPORTED_DECLARATION")
@JsExport
class SomaIngestServiceJs(
    private val jsEmitSpineEvent: (String) -> Unit
) {
    private val service: SomaIngestService
    private val scope = CoroutineScope(SupervisorJob())
    private val json = Json { ignoreUnknownKeys = true; encodeDefaults = true }

    init {
        service = SomaIngestService(JsSpineEventBus())
    }

    /**
     * Ingest a clinical report.
     * @param reportJson  The serialized RawReport
     * @param scopeStr    "USER" or "GUEST"
     */
    fun ingestReport(
        reportJson: String,
        scopeStr: String,
        onComplete: () -> Unit,
        onError: (String) -> Unit
    ): CancellableTask {
        val job = scope.launch {
            try {
                val report = json.decodeFromString<RawReport>(reportJson)
                val patientScope = try {
                    PatientScope.valueOf(scopeStr.uppercase())
                } catch (e: Exception) {
                    PatientScope.GUEST
                }
                service.ingestReport(report, patientScope)
                onComplete()
            } catch (_: CancellationException) {
            } catch (e: Throwable) {
                onError(e.message ?: "Ingestion failed")
            }
        }
        return CancellableTask(job)
    }

    // ── Inner bridge: SpineEventBus ───────────────────────────────────────────

    private inner class JsSpineEventBus : SpineEventBus {
        override fun on(type: String, minPriority: String?): kotlinx.coroutines.flow.Flow<SpineEvent> = kotlinx.coroutines.flow.emptyFlow()

        override suspend fun emit(event: SpineEvent) {
            val priorityStr = when (event.header.priority) {
                SpinePriority.CRITICAL -> "critical"
                SpinePriority.ALERT -> "alert"
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
                put("patientScope", event.logicGates.patientScope.name)
            }.toString()
            jsEmitSpineEvent(eventJson)
        }

        override suspend fun emit(payload: SpineEventPayload): SpineEvent {
            val eventJson = buildJsonObject {
                put("type", payload.type)
                put("source", payload.source)
                put("domain", payload.domain)
                payload.target?.let { put("target", it) }
                put("data", anyToJsonElement(payload.data))
                put("priority", payload.priority)
                put("cascadeDepth", payload.cascadeDepth ?: 0)
                put("patientScope", payload.patientScope.name)
            }.toString()
            jsEmitSpineEvent(eventJson)
            return payload.toSpineEvent()
        }

        override fun registerCascadeRules(rules: List<CascadeRule>) {}
        override fun getRecentEvents(filter: SpineEventFilter?): List<SpineEvent> = emptyList()

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
