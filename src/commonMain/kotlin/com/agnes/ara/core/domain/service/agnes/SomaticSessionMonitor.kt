package com.agnes.ara.core.domain.service.agnes

import com.agnes.ara.core.domain.services.SpineEventBus
import com.agnes.ara.core.domain.services.SpineEventPayload
import com.agnes.ara.core.domain.services.SpineSoulMutation

/**
 * Monitors Soma vitality during an Agnes dialogue session.
 *
 * Spec: if Soma.vitality drops by > 0.2 during a dialogue,
 * the current topic is flagged as a High-Intensity Trigger and
 * the corresponding BeliefNode gravity is boosted.
 *
 * Somatic Ping: a 5×5 grid input every 5 minutes.
 *   x-axis → Valence  (0.0 = negative, 1.0 = positive)
 *   y-axis → Arousal  (0.0 = calm,     1.0 = activated)
 *   P      → Intensity (pressure/confidence of the ping)
 */
class SomaticSessionMonitor(
    private val eventBus: SpineEventBus
) {
    companion object {
        const val VITALITY_DROP_THRESHOLD = 0.2f
        const val SOMATIC_PING_INTERVAL_MS = 5 * 60 * 1000L   // 5 minutes
    }

    private var baselineVitality: Float? = null
    private var lastPingAt: Long = 0L
    private var currentTopicLabel: String = ""

    /** Call when a dialogue session starts — records vitality baseline. */
    fun startSession(currentVitality: Float, topicLabel: String = "") {
        baselineVitality = currentVitality
        currentTopicLabel = topicLabel
        lastPingAt = 0L
    }

    /** Call on each Soma telemetry update during an active session. */
    suspend fun onVitalityUpdate(currentVitality: Float, nowMs: Long = currentTimeMs()) {
        val baseline = baselineVitality ?: return
        val drop = baseline - currentVitality
        if (drop > VITALITY_DROP_THRESHOLD) {
            flagHighIntensityTrigger(currentTopicLabel, drop, currentVitality)
            // Reset baseline to current so repeated drops don't re-trigger
            baselineVitality = currentVitality
        }
    }

    /** Update the current dialogue topic label (called when conversation topic shifts). */
    fun setCurrentTopic(label: String) {
        currentTopicLabel = label
    }

    /**
     * Process a Somatic Ping from the 5×5 grid.
     *
     * @param gridX    Column index 0-4  → normalised to Valence  0.0-1.0
     * @param gridY    Row index 0-4     → normalised to Arousal  0.0-1.0
     * @param pressure Pressure/intensity 0.0-1.0
     */
    suspend fun processSomaticPing(gridX: Int, gridY: Int, pressure: Float, nowMs: Long = currentTimeMs()) {
        val valence   = (gridX / 4f).coerceIn(0f, 1f)
        val arousal   = (gridY / 4f).coerceIn(0f, 1f)
        val intensity = pressure.coerceIn(0f, 1f)

        lastPingAt = nowMs

        // High arousal + negative valence = emotional activation → apply resilience delta
        val resilienceDelta = when {
            valence < 0.3f && arousal > 0.6f -> -0.05f  // distressed + activated
            valence > 0.6f && arousal < 0.5f ->  0.03f  // positive + calm
            else -> 0f
        }

        eventBus.emit(SpineEventPayload(
            type = "AGNES_SOMATIC_PING",
            source = "agnes",
            priority = "info",
            mutations = if (resilienceDelta != 0f)
                listOf(SpineSoulMutation("RESILIENCE", resilienceDelta))
            else emptyList(),
            data = mapOf(
                "valence"   to valence,
                "arousal"   to arousal,
                "intensity" to intensity,
                "topic"     to currentTopicLabel
            )
        ).toSpineEvent())
    }

    /** True if a somatic ping is due (5-minute interval elapsed). */
    fun isPingDue(nowMs: Long = currentTimeMs()): Boolean =
        lastPingAt == 0L || (nowMs - lastPingAt) >= SOMATIC_PING_INTERVAL_MS

    private suspend fun flagHighIntensityTrigger(topic: String, drop: Float, currentVitality: Float) {
        eventBus.emit(SpineEventPayload(
            type = "AGNES_HIGH_INTENSITY_TRIGGER",
            source = "agnes",
            priority = "alert",
            mutations = listOf(SpineSoulMutation("RESILIENCE", -0.05f)),
            data = mapOf(
                "topic"            to topic,
                "vitalityDrop"     to drop,
                "currentVitality"  to currentVitality,
                "message"          to "Somatic stress response detected. Topic flagged as High-Intensity Trigger."
            )
        ).toSpineEvent())
    }

    private fun currentTimeMs(): Long = kotlinx.datetime.Clock.System.now().toEpochMilliseconds()
}
