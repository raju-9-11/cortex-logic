package com.agnes.ara.core.domain.services

import com.agnes.ara.core.domain.model.AutopilotLevel
import com.agnes.ara.core.domain.services.SpinePatientScope
import com.agnes.ara.core.engine.orchestrator.AutopilotEnforcer
import com.agnes.ara.core.engine.orchestrator.PrecedenceResolver
import kotlinx.coroutines.flow.*
import kotlinx.datetime.Clock
import kotlin.time.Duration.Companion.milliseconds
import kotlin.time.TimeSource

/**
 * Default KMP implementation of the Spine.
 * Uses SharedFlow for reactive cross-module signaling.
 * Ported from Nexus React 19 SPA for parity.
 */
class DefaultSpineEventBus(
    private val dataLayer: AraDataLayer? = null,
    private val userId: String? = null,
    private val logger: ((SpineEvent) -> Unit)? = null
) : AutopilotAwareSpineEventBus {
    private val _events = MutableSharedFlow<SpineEvent>(extraBufferCapacity = 128)
    val allEvents = _events.asSharedFlow()
    private val _autopilotLevel = MutableStateFlow(AutopilotLevel.MANUAL)

    private val lastEmitTimes = mutableMapOf<String, TimeSource.Monotonic.ValueTimeMark>()
    private val debouncePeriod = 500.milliseconds
    private val timeSource = TimeSource.Monotonic
    
    private val recentEvents = mutableListOf<SpineEvent>()
    private val MAX_RECENT = 50
    // Indexed by trigger event type for O(1) lookup — replaces the old O(n) linear scan.
    private val cascadeRuleIndex: MutableMap<String, MutableList<CascadeRule>> = mutableMapOf()
    private val validDomains = setOf("B", "E", "C", "R", "system")
    private val suppressionExpiry = mutableMapOf<String, TimeSource.Monotonic.ValueTimeMark>()
    private val validPriorities = mapOf("info" to 0, "alert" to 1, "critical" to 2)

    // ── Orchestrator engine components ────────────────────────────────────────
    private val precedenceResolver = PrecedenceResolver()
    private val autopilotEnforcer = AutopilotEnforcer()
    override var currentAutopilotLevel: AutopilotLevel
        get() = _autopilotLevel.value
        set(value) {
            _autopilotLevel.value = value
        }
    override val autopilotLevel: Flow<AutopilotLevel> = _autopilotLevel.asStateFlow()

    override fun on(type: String, minPriority: String?): Flow<SpineEvent> {
        return allEvents.filter { event ->
            val typeOk = type == "*" || event.type == type
            val priorityOk = minPriority?.let { validPriorities[event.priority] ?: 0 >= (validPriorities[it] ?: 0) } ?: true
            typeOk && priorityOk
        }
    }

    override suspend fun emit(event: SpineEvent) {
        validateEvent(event)
        emitInternal(event)
    }

    override suspend fun emit(payload: SpineEventPayload): SpineEvent {
        // SpineEventPayload.toSpineEvent() maps the builder fields to the new
        // header/payload/logicGates schema, including priority normalisation and
        // occurredAt/processedAt timestamps. Validation is then run on the typed event.
        val event = payload.toSpineEvent()
        validateEvent(event)
        emitInternal(event)
        return event
    }

    private suspend fun emitInternal(event: SpineEvent) {
        if (isSuppressed(event.type)) return

        val debounceKey = "${event.type}:${event.source}"
        val lastMark = lastEmitTimes[debounceKey]
        if (lastMark != null && lastMark.elapsedNow() < debouncePeriod) {
            return
        }
        lastEmitTimes[debounceKey] = timeSource.markNow()

        // ── Stage 1: Patient Scope Firewall ───────────────────────────────────
        // GUEST scope: zero all soul mutations — analysis-only path, no GlobalSoul writes
        val scopedEvent = if (event.logicGates.patientScope == SpinePatientScope.GUEST) {
            event.copy(payload = event.payload.copy(mutations = emptyList()))
        } else {
            event
        }

        // ── Stage 2: Precedence Resolution ────────────────────────────────────
        // Detect vector-claim collisions; downgrade losing agent to requiresApproval = true
        val resolvedEvent = precedenceResolver.evaluate(scopedEvent)

        // ── Stage 3: Autopilot Enforcement ────────────────────────────────────
        // Apply the current Autopilot level gate (Manual→all gated; Ghost→full auto)
        val enforcementResult = autopilotEnforcer.enforce(resolvedEvent, currentAutopilotLevel)
        val enforcedEvent = enforcementResult.event

        // ── Stage 4: Temporal Suppression ─────────────────────────────────────
        // Historical events (occurredAt < today) are recorded but NOT broadcast to subscribers
        val shouldBroadcast = !enforcedEvent.suppressActiveEmit

        if (shouldBroadcast) {
            _events.emit(enforcedEvent)
            if (enforcedEvent.payload.mutations.isNotEmpty()) {
                enforcedEvent.payload.mutations.forEach { mutation ->
                    emit(
                        SpineEventPayload(
                            type = "SOUL_MUTATION_APPLIED",
                            source = "soul",
                            domain = enforcedEvent.domain,
                            priority = "info",
                            data = mapOf(
                                "vector" to mutation.vector,
                                "delta" to mutation.delta,
                                "originEvent" to enforcedEvent.type,
                                "sourceEventId" to enforcedEvent.id
                            )
                        )
                    )
                }
            }
        }

        // Emit Autopilot side-effects (e.g. UI_SUPPRESSION signal in Ghost mode)
        enforcementResult.sideEffects.forEach { sideEffect ->
            emit(sideEffect.toSpineEvent().copy(cascadeDepth = enforcedEvent.cascadeDepth + 1))
        }

        recentEvents.add(0, enforcedEvent)
        if (recentEvents.size > MAX_RECENT) {
            recentEvents.removeAt(recentEvents.size - 1)
        }

        logger?.invoke(enforcedEvent)

        if (enforcedEvent.cascadeDepth < 3) {
            val matching = (cascadeRuleIndex[enforcedEvent.type] ?: emptyList())
                .filter { it.condition(enforcedEvent) }
            matching.forEach { rule ->
                rule.suppressionGates.forEach { gate -> setSuppression(gate.eventType, gate.durationMs) }
                val cascaded = rule.transform(enforcedEvent).copy(
                    source = "cascade:${enforcedEvent.source}",
                    cascadeDepth = enforcedEvent.cascadeDepth + 1
                )
                emit(cascaded)
            }
        }

        // Skip Firestore write when no subscriber is active and the event isn't audit-required.
        // Avoids writes for system-internal events nobody is watching at the moment.
        val hasListeners = _events.subscriptionCount.value > 0
        val isAuditRequired = SpineGatePolicy.shouldPersistAsAuditEvent(enforcedEvent)
        if (SpineGatePolicy.shouldPersistSilentHistory(enforcedEvent) && (hasListeners || isAuditRequired)) {
            logEvent(enforcedEvent)
        }
    }

    private suspend fun logEvent(event: SpineEvent) {
        if (userId == null) return
        if (dataLayer == null) {
            println("[SpineEventBus] AraDataLayer not injected. Cannot log event.")
            return
        }
        try {
            dataLayer.createDocument("spine_events/$userId/events", event.toMap())
        } catch (e: Exception) {
            // Silently fail logging to avoid breaking the bus
        }
    }

    private fun SpineEvent.toMap(): Map<String, Any?> = mapOf(
        "id"               to header.id,
        "source"           to header.source,
        "intent"           to payload.intent,
        "mutationsJson"    to payload.mutations.joinToString(",") { "${it.vector}:${it.delta}" },
        "confidence"       to logicGates.confidence,
        "requiresApproval" to logicGates.requiresApproval,
        "patientScope"     to logicGates.patientScope.name,
        "occurredAt"       to header.occurredAt,
        "processedAt"      to header.processedAt,
        "suppressActive"   to suppressActiveEmit,
        "cascadeDepth"     to cascadeDepth
    )

    fun getRecentEvents(): List<SpineEvent> = recentEvents.toList()

    override fun getRecentEvents(filter: SpineEventFilter?): List<SpineEvent> = recentEvents.filter { event ->
        val typeMatch = filter?.type?.let { it == event.type } ?: true
        val sourceMatch = filter?.source?.let { it == event.source } ?: true
        typeMatch && sourceMatch
    }

    override fun registerCascadeRules(rules: List<CascadeRule>) {
        rules.forEach { rule ->
            cascadeRuleIndex.getOrPut(rule.trigger) { mutableListOf() }.add(rule)
        }
    }

    override fun setSuppression(eventType: String, durationMs: Long) {
        suppressionExpiry[eventType] = timeSource.markNow() + durationMs.milliseconds
    }

    private fun isSuppressed(eventType: String): Boolean {
        val expiry = suppressionExpiry[eventType] ?: return false
        if (!expiry.elapsedNow().isNegative()) {
            suppressionExpiry.remove(eventType)
            return false
        }
        return true
    }

    private fun validateEvent(event: SpineEvent) {
        require(event.type.isNotBlank()) { "[SpineEventBus] Missing required field: type" }
        require(event.source.isNotBlank()) { "[SpineEventBus] Missing required field: source" }
        require(validDomains.contains(event.domain)) { "[SpineEventBus] Invalid domain ${event.domain}" }
        require(validPriorities.containsKey(event.priority)) { "[SpineEventBus] Invalid priority ${event.priority}" }
        // data can be empty but must be present
    }

    private data class NormalizedPayload(
        val id: String,
        val type: String,
        val source: String,
        val target: String?,
        val domain: String,
        val data: Map<String, Any?>,
        val timestamp: Long,
        val cascadeDepth: Int,
        val priority: String
    )

    private fun validateAndNormalize(payload: SpineEventPayload): NormalizedPayload {
        require(payload.type.isNotBlank()) { "[SpineEventBus] Missing required field: type" }
        require(payload.source.isNotBlank()) { "[SpineEventBus] Missing required field: source" }
        require(validDomains.contains(payload.domain)) { "[SpineEventBus] Invalid domain ${payload.domain}" }
        require(validPriorities.containsKey(payload.priority)) { "[SpineEventBus] Invalid priority ${payload.priority}" }
        // data can be empty but must be present
        return NormalizedPayload(
            id = kotlin.random.Random.nextLong().toString(36),
            type = payload.type,
            source = payload.source,
            target = payload.target,
            domain = payload.domain,
            data = payload.data,  // backward compat — SpineEventPayload.data maps to attributes
            timestamp = Clock.System.now().toEpochMilliseconds(),
            cascadeDepth = payload.cascadeDepth ?: 0,
            priority = payload.priority
        )
    }
}
