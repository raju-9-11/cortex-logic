package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.actions.ActionHub
import com.agnes.nexus.core.domain.models.ActionCall
import com.agnes.nexus.core.domain.models.EncryptedEnvelope
import com.agnes.nexus.core.domain.models.NeuralStateVector
import com.agnes.nexus.core.domain.services.BatchOperation
import com.agnes.nexus.core.domain.services.BatchOperationType
import com.agnes.nexus.core.domain.services.CascadeRule
import com.agnes.nexus.core.domain.services.NeuralProjectionService
import com.agnes.nexus.core.domain.services.NexusDataLayer
import com.agnes.nexus.core.domain.services.NexusQuery
import com.agnes.nexus.core.domain.services.SpineEvent
import com.agnes.nexus.core.domain.services.SpineEventBus
import com.agnes.nexus.core.domain.services.SpineEventFilter
import com.agnes.nexus.core.domain.services.SpineEventPayload
import com.agnes.nexus.core.domain.services.SpinePriority
import com.agnes.nexus.core.domain.services.VaultBoundary
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.emptyFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlinx.datetime.Clock
import kotlinx.serialization.json.*
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException

/**
 * JS-facing bridge that exposes [ActionHub] to TypeScript callers.
 *
 * All async I/O (Firestore reads/writes, NSV updates, vault encryption) is bridged
 * via plain JS callbacks using the suspendCancellableCoroutine pattern established
 * in [CommandIntelligenceServiceJs].
 *
 * [CryptoKey] never crosses the JSON boundary — vault callbacks close over the key
 * object on the TS side; [ActionCall.encryptionKey] is always null in this bridge.
 *
 * Usage from TypeScript:
 * ```ts
 * const hub = new ActionHubJs(getDoc, setDoc, updateDoc, deleteDoc, batchWrite,
 *                              updateNsv, emitSpineEvent, vaultEncrypt, vaultDecrypt)
 * hub.execute('titan', 'log_sleep', JSON.stringify(payload), userId,
 *   (handled) => console.log('handled:', handled),
 *   (err) => console.error(err))
 * ```
 */
@OptIn(DelicateCoroutinesApi::class)
@Suppress("WRONG_EXPORTED_DECLARATION")
@JsExport
class ActionHubJs(
    private val jsGetDocument: (collection: String, id: String, onComplete: (String?) -> Unit, onError: (String) -> Unit) -> Unit,
    private val jsSetDocument: (collection: String, id: String, dataJson: String, onComplete: () -> Unit, onError: (String) -> Unit) -> Unit,
    private val jsUpdateDocument: (collection: String, id: String, updatesJson: String, onComplete: () -> Unit, onError: (String) -> Unit) -> Unit,
    private val jsDeleteDocument: (collection: String, id: String, onComplete: () -> Unit, onError: (String) -> Unit) -> Unit,
    private val jsBatchWrite: (operationsJson: String, onComplete: () -> Unit, onError: (String) -> Unit) -> Unit,
    private val jsUpdateNsv: (patchJson: String, onComplete: () -> Unit, onError: (String) -> Unit) -> Unit,
    private val jsEmitSpineEvent: (eventJson: String) -> Unit,
    private val jsVaultEncrypt: ((plaintext: String, keyIgnored: String, onComplete: (String) -> Unit, onError: (String) -> Unit) -> Unit)? = null,
    private val jsVaultDecrypt: ((cipherJson: String, keyIgnored: String, onComplete: (String) -> Unit, onError: (String) -> Unit) -> Unit)? = null,
) {
    private val actionHub: ActionHub
    private val json = Json { ignoreUnknownKeys = true; encodeDefaults = true }

    init {
        val vaultBoundary: VaultBoundary? =
            if (jsVaultEncrypt != null && jsVaultDecrypt != null) JsVaultBoundary() else null
        actionHub = ActionHub(
            nsvService = JsNeuralProjectionService(),
            eventBus = JsSpineEventBus(),
            dataLayer = JsNexusDataLayer(),
            vaultBoundary = vaultBoundary,
        )
    }

    /**
     * Execute an action. Calls [onComplete] with `true` if a handler was found and
     * executed, `false` if no handler is registered (TS registry should fall through).
     * Calls [onError] if the handler threw.
     */
    fun execute(
        moduleId: String,
        actionType: String,
        payloadJson: String,
        userId: String?,
        onComplete: (Boolean) -> Unit,
        onError: (String) -> Unit,
    ) {
        GlobalScope.launch {
            try {
                val call = ActionCall(
                    type = actionType,
                    payload = Json.parseToJsonElement(payloadJson).jsonObject,
                    userId = userId,
                    moduleId = moduleId,
                )
                val handled = actionHub.isRegistered(moduleId, actionType)
                if (handled) {
                    actionHub.execute(call)
                }
                onComplete(handled)
            } catch (e: Throwable) {
                onError(e.message ?: "ActionHub execution failed")
            }
        }
    }

    // ── Private JSON helpers ──────────────────────────────────────────────────

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

    private fun mapToJson(map: Map<String, Any?>): String =
        JsonObject(map.mapValues { (_, v) -> anyToJsonElement(v) }).toString()

    // ── Inner bridge: NexusDataLayer ──────────────────────────────────────────

    private inner class JsNexusDataLayer : NexusDataLayer {
        override suspend fun <T> getDocument(collection: String, id: String, serializer: (String) -> T): T? =
            suspendCancellableCoroutine { cont ->
                try {
                    jsGetDocument(collection, id,
                        { jsonStr ->
                            if (jsonStr == null) {
                                cont.resume(null)
                            } else {
                                try { cont.resume(serializer(jsonStr)) }
                                catch (e: Exception) {
                                    console.warn("JsNexusDataLayer.getDocument serializer error: ${e.message}")
                                    cont.resumeWithException(e)
                                }
                            }
                        },
                        { err ->
                            console.warn("JsNexusDataLayer.getDocument callback error: $err")
                            cont.resumeWithException(RuntimeException(err))
                        },
                    )
                } catch (e: Exception) {
                    console.warn("JsNexusDataLayer.getDocument invoke error: ${e.message}")
                    cont.resumeWithException(e)
                }
            }

        override suspend fun listDocuments(collection: String): List<String> = emptyList()

        override suspend fun createDocument(collection: String, data: Map<String, Any?>, id: String?): String {
            val docId = id ?: "kmp-${Clock.System.now().toEpochMilliseconds()}"
            suspendCancellableCoroutine<Unit> { cont ->
                jsSetDocument(collection, docId, mapToJson(data),
                    { cont.resume(Unit) },
                    { err -> cont.resumeWithException(RuntimeException(err)) },
                )
            }
            return docId
        }

        override suspend fun setDocument(collection: String, id: String, data: Map<String, Any?>) {
            suspendCancellableCoroutine<Unit> { cont ->
                try {
                    val json = mapToJson(data)
                    console.log("JsNexusDataLayer.setDocument: collection=$collection, id=$id, data keys=${data.keys.toList()}")
                    jsSetDocument(collection, id, json,
                        {
                            console.log("JsNexusDataLayer.setDocument success: collection=$collection, id=$id")
                            cont.resume(Unit)
                        },
                        { err ->
                            console.error("JsNexusDataLayer.setDocument callback error: $err")
                            cont.resumeWithException(RuntimeException(err))
                        },
                    )
                } catch (e: Exception) {
                    console.error("JsNexusDataLayer.setDocument invoke error: ${e.message}")
                    cont.resumeWithException(e)
                }
            }
        }

        override suspend fun updateDocument(collection: String, id: String, updates: Map<String, Any?>) {
            suspendCancellableCoroutine<Unit> { cont ->
                try {
                    val json = mapToJson(updates)
                    console.log("JsNexusDataLayer.updateDocument: collection=$collection, id=$id, update keys=${updates.keys.toList()}")
                    jsUpdateDocument(collection, id, json,
                        {
                            console.log("JsNexusDataLayer.updateDocument success: collection=$collection, id=$id")
                            cont.resume(Unit)
                        },
                        { err ->
                            console.error("JsNexusDataLayer.updateDocument callback error: $err")
                            cont.resumeWithException(RuntimeException(err))
                        },
                    )
                } catch (e: Exception) {
                    console.error("JsNexusDataLayer.updateDocument invoke error: ${e.message}")
                    cont.resumeWithException(e)
                }
            }
        }

        override suspend fun deleteDocument(collection: String, id: String) {
            suspendCancellableCoroutine<Unit> { cont ->
                jsDeleteDocument(collection, id,
                    { cont.resume(Unit) },
                    { err -> cont.resumeWithException(RuntimeException(err)) },
                )
            }
        }

        override fun <T> subscribeToDocument(
            collection: String, id: String, serializer: (String) -> T, listener: (T?) -> Unit,
        ): () -> Unit = { }

        // query is stubbed — actions that need it (e.g. query_reminders) fall through to TS handlers
        override suspend fun <T> query(query: NexusQuery, serializer: (String) -> T): List<T> = emptyList()

        override fun <T> subscribeToQuery(
            query: NexusQuery, serializer: (String) -> T, listener: (List<T>) -> Unit,
        ): () -> Unit = { }

        override suspend fun batchWrite(operations: List<BatchOperation>) {
            val opsJson = buildJsonArray {
                operations.forEach { op ->
                    add(buildJsonObject {
                        put("type", op.type.name.lowercase())
                        put("collection", op.collection)
                        put("id", op.id)
                        op.data?.let { put("data", anyToJsonElement(it)) }
                    })
                }
            }.toString()
            suspendCancellableCoroutine<Unit> { cont ->
                jsBatchWrite(opsJson,
                    { cont.resume(Unit) },
                    { err -> cont.resumeWithException(RuntimeException(err)) },
                )
            }
        }
    }

    // ── Inner bridge: NeuralProjectionService ─────────────────────────────────

    private inner class JsNeuralProjectionService : NeuralProjectionService {
        override fun observeNsv(): Flow<NeuralStateVector> = emptyFlow()

        override suspend fun updateNsv(patch: Map<String, Any?>) {
            suspendCancellableCoroutine<Unit> { cont ->
                jsUpdateNsv(mapToJson(patch),
                    { cont.resume(Unit) },
                    { err -> cont.resumeWithException(RuntimeException(err)) },
                )
            }
        }

        override suspend fun getCompactedInsights(): List<String> = emptyList()
        override suspend fun addInsight(insight: String) {}
    }

    // ── Inner bridge: SpineEventBus ───────────────────────────────────────────

    private inner class JsSpineEventBus : SpineEventBus {
        override fun on(type: String, minPriority: String?): Flow<SpineEvent> = emptyFlow()

        override suspend fun emit(event: SpineEvent) {
            val priorityStr = when (event.header.priority) {
                SpinePriority.CRITICAL -> "critical"
                SpinePriority.ALERT -> "alert"
                else -> "info"
            }
            // Domain was stored as "_domain" attribute by SpineEventPayload.toSpineEvent()
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

        override suspend fun emit(payload: SpineEventPayload): SpineEvent {
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

        override fun registerCascadeRules(rules: List<CascadeRule>) {}
        override fun getRecentEvents(filter: SpineEventFilter?): List<SpineEvent> = emptyList()
    }

    // ── Inner bridge: VaultBoundary ───────────────────────────────────────────

    private inner class JsVaultBoundary : VaultBoundary {
        override suspend fun encrypt(plaintext: String, secretKey: String): EncryptedEnvelope =
            suspendCancellableCoroutine { cont ->
                jsVaultEncrypt!!(plaintext, secretKey,
                    { envelopeJson ->
                        try {
                            cont.resume(json.decodeFromString(envelopeJson))
                        } catch (e: Exception) {
                            cont.resumeWithException(e)
                        }
                    },
                    { err -> cont.resumeWithException(RuntimeException(err)) },
                )
            }

        override suspend fun decrypt(envelope: EncryptedEnvelope, secretKey: String): String =
            suspendCancellableCoroutine { cont ->
                jsVaultDecrypt!!(json.encodeToString(EncryptedEnvelope.serializer(), envelope), secretKey,
                    { plaintext -> cont.resume(plaintext) },
                    { err -> cont.resumeWithException(RuntimeException(err)) },
                )
            }

        override suspend fun deriveKey(password: String, salt: String): String = ""
    }
}
