package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.model.AgentSource
import com.agnes.nexus.core.domain.model.AutopilotLevel
import com.agnes.nexus.core.domain.models.EncryptedEnvelope
import com.agnes.nexus.core.domain.models.NeuralStateVector
import kotlinx.coroutines.flow.Flow
import kotlinx.serialization.json.JsonObject
import kotlinx.datetime.Clock
import kotlinx.datetime.Instant
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime
import kotlin.random.Random

/**
 * The Vault Boundary - handles client-side E2EE.
 * Platforms must implement the actual AES-GCM encryption.
 */
interface VaultBoundary {
    suspend fun encrypt(plaintext: String, secretKey: String): EncryptedEnvelope
    suspend fun decrypt(envelope: EncryptedEnvelope, secretKey: String): String
    suspend fun deriveKey(password: String, salt: String): String
}

/**
 * Neural Projection Service - manages the "Global Soul" state.
 */
interface NeuralProjectionService {
    fun observeNsv(): Flow<NeuralStateVector>
    suspend fun updateNsv(patch: Map<String, Any?>)
    suspend fun getCompactedInsights(): List<String>
    suspend fun addInsight(insight: String)
}

/**
 * Spine Event Bus - cross-module reactive signaling.
 */
interface SpineEventBus {
    fun on(type: String, minPriority: String? = null): Flow<SpineEvent>
    suspend fun emit(event: SpineEvent)
    suspend fun emit(payload: SpineEventPayload): SpineEvent
    fun registerCascadeRules(rules: List<CascadeRule>)
    fun getRecentEvents(filter: SpineEventFilter? = null): List<SpineEvent>
    /** Suppress any incoming event of [eventType] for the next [durationMs] milliseconds. */
    fun setSuppression(eventType: String, durationMs: Long) {}
}

/**
 * Optional extension for Spine buses that expose the active Autopilot level.
 *
 * Android product surfaces can use this to read and update the real runtime gate
 * instead of mirroring a disconnected UI preference.
 */
interface AutopilotAwareSpineEventBus : SpineEventBus {
    var currentAutopilotLevel: AutopilotLevel
    val autopilotLevel: Flow<AutopilotLevel>
}

// ─────────────────────────────────────────────────────────────────────────────
// Spine Event Protocol — spec-compliant schema
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Priority of a Spine event.
 * 1 = Critical / Override (Agnes conflict, crisis mode)
 * 2 = Alert (requires attention, may require approval)
 * 3 = Info (routine update, typically automated)
 */
object SpinePriority {
    const val CRITICAL = 1
    const val ALERT = 2
    const val INFO = 3
}

/**
 * The patient scope for Soma clinical events.
 * USER  → Full pipeline including GlobalSoul mutation.
 * GUEST → Analysis only, zero GlobalSoul mutation.
 */
enum class SpinePatientScope { USER, GUEST }

/** A single GlobalSoul vector mutation carried in a SpineEvent payload. */
data class SpineSoulMutation(
    val vector: String,   // GlobalSoulVector name: RESILIENCE, BANDWIDTH, VITALITY, OUTPUT, FRICTION
    val delta: Float      // e.g. -0.15 reduces vector by 15%
)

/** Spine event header — routing metadata. */
data class SpineHeader(
    val id: String = Random.nextLong().toString(36),
    val source: String,             // AgentSource name (AGNES, ATLAS, etc.)
    val timestamp: Long = Clock.System.now().toEpochMilliseconds(),
    val occurredAt: Long = Clock.System.now().toEpochMilliseconds(),   // When real-world event happened
    val processedAt: Long = Clock.System.now().toEpochMilliseconds(),  // When system processed it
    val priority: Int = SpinePriority.INFO                             // 1=Critical, 2=Alert, 3=Info
)

/** Spine event payload — intent and soul mutations. */
data class SpinePayload(
    val intent: String,                                     // e.g. "MARK_TASK_DONE", "BIO_SYNC"
    val rawBlob: String? = null,                            // Blabber text or raw sensor data
    val mutations: List<SpineSoulMutation> = emptyList(),   // GlobalSoul vector deltas
    val attributes: Map<String, Any?> = emptyMap()          // "Alive" extensible data (Titan reps, Ledger currency, etc.)
)

/** Logic gates — approval and scoping rules. */
data class SpineLogicGates(
    val confidence: Float = 1.0f,                         // LLM extraction certainty (0.0-1.0)
    val requiresApproval: Boolean = false,
    val isGhostAction: Boolean = false,                   // True when executed autonomously at Level 5
    val patientScope: SpinePatientScope = SpinePatientScope.USER
)

/**
 * The Spine Event — normalized cross-agent communication unit.
 * Migrated to spec schema: header / payload / logicGates.
 *
 * Backward-compat: [type], [source], [domain], [data], [priority] legacy fields
 * are preserved as computed properties for existing callers during migration.
 */
data class SpineEvent(
    val header: SpineHeader,
    val payload: SpinePayload,
    val logicGates: SpineLogicGates = SpineLogicGates(),
    val cascadeDepth: Int = 0,
    val target: String? = null
) {
    /** Backward-compat constructor for tests using the old flat API. */
    constructor(
        type: String,
        source: String,
        domain: String = "system",
        data: Map<String, Any?> = emptyMap(),
        priority: String = "info"
    ) : this(
        header = SpineHeader(
            source = source,
            priority = when (priority) {
                "critical" -> SpinePriority.CRITICAL
                "alert"    -> SpinePriority.ALERT
                else       -> SpinePriority.INFO
            }
        ),
        payload = SpinePayload(
            intent = type,
            attributes = data,
            mutations = if (domain != "system") listOf(SpineSoulMutation(vector = domain, delta = 0f)) else emptyList()
        )
    )

    // ── Backward-compat accessors ──────────────────────────────────────────
    val id: String       get() = header.id
    val type: String     get() = payload.intent
    val source: String   get() = header.source
    val agentSource: AgentSource get() = AgentSource.fromId(header.source)
    val domain: String   get() = (payload.attributes["_domain"] as? String)
        ?: payload.mutations.firstOrNull()?.vector?.take(1)
        ?: "system"
    val data: Map<String, Any?> get() = payload.attributes
    val timestamp: Long  get() = header.timestamp
    val priority: String get() = when (header.priority) {
        SpinePriority.CRITICAL -> "critical"
        SpinePriority.ALERT    -> "alert"
        else                   -> "info"
    }

    /** True if this event occurred historically (not today) — should suppress active emit. */
    val suppressActiveEmit: Boolean get() {
        val occurredDate  = Instant.fromEpochMilliseconds(header.occurredAt)
            .toLocalDateTime(TimeZone.currentSystemDefault()).date
        val processedDate = Instant.fromEpochMilliseconds(header.processedAt)
            .toLocalDateTime(TimeZone.currentSystemDefault()).date
        return occurredDate < processedDate
    }

    /**
     * True when the system can treat this as an autonomous agent/system execution
     * worth auditing even if it is not alert/critical priority.
     */
    val isAutonomousExecution: Boolean get() =
        !logicGates.requiresApproval &&
            !suppressActiveEmit &&
            !type.equals("UI_SUPPRESSION", ignoreCase = true) &&
            !header.source.equals("ui", ignoreCase = true)
}

/** Builder for creating SpineEvents without boilerplate. */
data class SpineEventPayload(
    val type: String,                                        // maps to payload.intent
    val source: String,                                      // maps to header.source
    val target: String? = null,
    val domain: String = "system",
    val data: Map<String, Any?> = emptyMap(),
    val priority: String = "info",
    val cascadeDepth: Int? = null,
    val mutations: List<SpineSoulMutation> = emptyList(),
    val confidence: Float = 1.0f,
    val requiresApproval: Boolean = false,
    val patientScope: SpinePatientScope = SpinePatientScope.USER,
    val occurredAt: Long = Clock.System.now().toEpochMilliseconds()
) {
    fun toSpineEvent(): SpineEvent {
        val pri = when (priority) {
            "critical" -> SpinePriority.CRITICAL
            "alert"    -> SpinePriority.ALERT
            else       -> SpinePriority.INFO
        }
        val now = Clock.System.now().toEpochMilliseconds()
        // Preserve the domain field in attributes under "_domain" so that SpineEvent.domain
        // computed property can resolve it correctly (mutations-based resolution is optional).
        val enrichedData = if (domain != "system") data + mapOf("_domain" to domain) else data
        return SpineEvent(
            header = SpineHeader(source = source, timestamp = now, occurredAt = occurredAt, processedAt = now, priority = pri),
            payload = SpinePayload(intent = type, attributes = enrichedData, mutations = mutations),
            logicGates = SpineLogicGates(confidence = confidence, requiresApproval = requiresApproval, patientScope = patientScope),
            cascadeDepth = cascadeDepth ?: 0,
            target = target
        )
    }
}

data class SpineEventFilter(
    val type: String? = null,
    val source: String? = null
)

/**
 * A time-windowed suppression gate attached to a cascade rule.
 * When the rule fires, the bus suppresses any incoming [eventType] for [durationMs] milliseconds.
 */
data class SuppressionGate(val eventType: String, val durationMs: Long)

data class CascadeRule(
    val id: String,
    val trigger: String,
    val condition: (SpineEvent) -> Boolean,
    val transform: (SpineEvent) -> SpineEventPayload,
    val suppressionGates: List<SuppressionGate> = emptyList()
)

/**
 * Nexus Data Layer - KMP abstraction for persistence.
 * Mirrors the web app's NexusDataLayer for platform-agnostic storage.
 */
interface NexusDataLayer {
    suspend fun <T> getDocument(collection: String, id: String, serializer: (String) -> T): T?
    suspend fun listDocuments(collection: String): List<String>
    suspend fun createDocument(collection: String, data: Map<String, Any?>, id: String? = null): String
    suspend fun setDocument(collection: String, id: String, data: Map<String, Any?>)
    suspend fun updateDocument(collection: String, id: String, updates: Map<String, Any?>)
    suspend fun deleteDocument(collection: String, id: String)
    fun <T> subscribeToDocument(collection: String, id: String, serializer: (String) -> T, listener: (T?) -> Unit): () -> Unit
    suspend fun <T> query(query: NexusQuery, serializer: (String) -> T): List<T>
    fun <T> subscribeToQuery(query: NexusQuery, serializer: (String) -> T, listener: (List<T>) -> Unit): () -> Unit
    suspend fun batchWrite(operations: List<BatchOperation>)
}

data class NexusQueryFilter(
    val field: String,
    val op: String,
    val value: Any?
)

data class NexusOrderBy(
    val field: String,
    val direction: String? = "asc"
)

data class NexusQuery(
    val collection: String,
    val where: List<NexusQueryFilter> = emptyList(),
    val orderBy: List<NexusOrderBy> = emptyList(),
    val limit: Int? = null
)

enum class BatchOperationType { SET, UPDATE, DELETE }

data class BatchOperation(
    val type: BatchOperationType,
    val collection: String,
    val id: String,
    val data: Map<String, Any?>? = null
)
