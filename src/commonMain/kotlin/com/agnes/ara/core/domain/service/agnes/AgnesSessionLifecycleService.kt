package com.agnes.ara.core.domain.service.agnes

import com.agnes.ara.core.domain.model.AgnesSessionMode
import com.agnes.ara.core.domain.services.SpineEventBus
import com.agnes.ara.core.domain.services.SpineEventPayload
import kotlinx.datetime.Clock

/**
 * Manages Agnes session mode lifecycle transitions.
 *
 * CASUAL     → standard chat, no restrictions
 * DEEP       → immersive therapy, suppresses non-critical notifications
 * IMPROMPTU  → ephemeral safety valve, 2-hour Vault Purgatory on close
 *
 * The 0.8 Invitation: if sentimentGravity > 0.8, automatically emits AGNES_SESSION_INVITATION.
 */
class AgnesSessionLifecycleService(
    private val eventBus: SpineEventBus
) {
    companion object {
        const val SENTIMENT_GRAVITY_THRESHOLD = 0.8f
        const val PURGATORY_TTL_MS = 2 * 60 * 60 * 1000L  // 2 hours
    }

    private var currentMode: AgnesSessionMode = AgnesSessionMode.CASUAL
    private var impromptuStartedAt: Long? = null
    private val purgatoryRegistry = mutableMapOf<String, Long>() // sessionId → expiry

    /** Transition to a new session mode. */
    suspend fun transitionTo(mode: AgnesSessionMode, sessionId: String) {
        val previous = currentMode
        currentMode = mode

        when (mode) {
            AgnesSessionMode.DEEP -> {
                eventBus.emit(SpineEventPayload(
                    type = "AGNES_SESSION_DEEP_START",
                    source = "agnes",
                    priority = "alert",
                    data = mapOf("sessionId" to sessionId, "previous" to previous.name)
                ).toSpineEvent())
                // Suppress non-critical notifications during deep session
                eventBus.emit(SpineEventPayload(
                    type = "NOTIFICATION_SUPPRESS_NON_CRITICAL",
                    source = "agnes",
                    priority = "alert",
                    data = mapOf("reason" to "deep_therapy_session", "sessionId" to sessionId)
                ).toSpineEvent())
            }
            AgnesSessionMode.IMPROMPTU -> {
                impromptuStartedAt = Clock.System.now().toEpochMilliseconds()
                eventBus.emit(SpineEventPayload(
                    type = "AGNES_SESSION_IMPROMPTU_START",
                    source = "agnes",
                    priority = "info",
                    data = mapOf("sessionId" to sessionId, "purgatory_ttl_ms" to PURGATORY_TTL_MS)
                ).toSpineEvent())
            }
            AgnesSessionMode.CASUAL -> {
                eventBus.emit(SpineEventPayload(
                    type = "AGNES_SESSION_MODE_CASUAL",
                    source = "agnes",
                    priority = "info",
                    data = mapOf("sessionId" to sessionId)
                ).toSpineEvent())
            }
            AgnesSessionMode.SOMATIC -> {
                eventBus.emit(SpineEventPayload(
                    type = "AGNES_SESSION_SOMATIC_START",
                    source = "agnes",
                    priority = "info",
                    data = mapOf("sessionId" to sessionId, "previous" to previous.name)
                ).toSpineEvent())
            }
        }
    }

    /** Called when an IMPROMPTU session is closed. Registers 2-hour purgatory. */
    suspend fun closeImpromptu(sessionId: String) {
        val expiry = Clock.System.now().toEpochMilliseconds() + PURGATORY_TTL_MS
        purgatoryRegistry[sessionId] = expiry
        currentMode = AgnesSessionMode.CASUAL
        eventBus.emit(SpineEventPayload(
            type = "AGNES_IMPROMPTU_PURGATORY_START",
            source = "agnes",
            priority = "info",
            data = mapOf(
                "sessionId" to sessionId,
                "purgeAt" to expiry,
                "message" to "Session data scheduled for purge in 2 hours"
            )
        ).toSpineEvent())
    }

    /** Check if a session is still in purgatory (not yet purged). */
    fun isInPurgatory(sessionId: String): Boolean {
        val expiry = purgatoryRegistry[sessionId] ?: return false
        return Clock.System.now().toEpochMilliseconds() < expiry
    }

    /** Purge all expired purgatory sessions. Returns list of purged session IDs. */
    suspend fun purgeExpiredSessions(): List<String> {
        val now = Clock.System.now().toEpochMilliseconds()
        val expired = purgatoryRegistry.filter { (_, expiry) -> now >= expiry }.keys.toList()
        expired.forEach { sessionId ->
            purgatoryRegistry.remove(sessionId)
            eventBus.emit(SpineEventPayload(
                type = "AGNES_IMPROMPTU_PURGED",
                source = "agnes",
                priority = "info",
                data = mapOf("sessionId" to sessionId)
            ).toSpineEvent())
        }
        return expired
    }

    /** Evaluate sentiment gravity and emit session invitation if threshold exceeded. */
    suspend fun evaluateSentimentGravity(gravity: Float, sessionId: String) {
        if (gravity > SENTIMENT_GRAVITY_THRESHOLD && currentMode == AgnesSessionMode.CASUAL) {
            eventBus.emit(SpineEventPayload(
                type = "AGNES_SESSION_INVITATION",
                source = "agnes",
                priority = "alert",
                data = mapOf(
                    "sentimentGravity" to gravity,
                    "sessionId" to sessionId,
                    "suggestedMode" to "DEEP",
                    "message" to "Your emotional weight suggests a deeper conversation might help."
                )
            ).toSpineEvent())
        }
    }

    fun currentMode(): AgnesSessionMode = currentMode

    /**
     * Observe COMPOUND_STRESS events and propose a somatic exercise in response.
     * Call this from the application layer, launching in a coroutine scope.
     */
    suspend fun onCompoundStress(stressLoad: Double) {
        eventBus.emit(SpineEventPayload(
            type = "SOMATIC_SUPPORT_REQUESTED",
            source = "agnes",
            domain = "E",
            data = mapOf(
                "exerciseType" to "breathwork",
                "trigger" to "COMPOUND_STRESS",
                "stressLoad" to stressLoad,
                "message" to "High stress detected. A grounding exercise may help."
            ),
            priority = "alert"
        ).toSpineEvent())
    }

    /**
     * Observe BURNOUT_WARNING events and surface a breathing exercise suggestion.
     * Call this from the application layer, launching in a coroutine scope.
     */
    suspend fun onBurnoutWarning(cnsFatigue: Double) {
        eventBus.emit(SpineEventPayload(
            type = "SOMATIC_SUPPORT_REQUESTED",
            source = "agnes",
            domain = "E",
            data = mapOf(
                "exerciseType" to "breathing",
                "trigger" to "BURNOUT_WARNING",
                "cnsFatigue" to cnsFatigue,
                "message" to "Burnout risk detected. A breathing exercise can restore regulation."
            ),
            priority = "alert"
        ).toSpineEvent())
    }
}
