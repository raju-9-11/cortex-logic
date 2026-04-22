package com.agnes.ara.core.engine

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonArray
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import kotlin.js.JsExport
import kotlin.math.max
import kotlin.math.min

/**
 * JS facade for Titan's Triple-Check Clearance Protocol.
 *
 * Formula: score = vitality × 0.6 + resilience × 0.4
 *   vitality   = recoveryScore/10  OR  (10 − cnsFatigue)/10  OR  0.5
 *   resilience = emotionalResilience/10 clamped [0,1]        OR  0.5
 *
 * Veto checks (in order):
 *   1. vitality < 0.3  → CRITICAL_VITALITY_LOW / FORCE_RECOVERY_MODE
 *   2. vitality ∈ [0.3, 0.5) → HRV warning added
 *   3. resilience < 0.2 → CRITICAL_RESILIENCE_LOW / PROPOSE_REST_OR_LOW_STIFFNESS
 *   4. score < 0.4 (no veto yet) → CLEARANCE_ALGORITHM_FAIL / INITIATE_RECOVERY
 */
@JsExport
class TitanClearanceEngineJs {

    private val json = Json { ignoreUnknownKeys = true }

    @Serializable
    private data class BiologicalState(
        val recoveryScore: Double? = null,
        val cnsFatigue: Double? = null,
    )

    @Serializable
    private data class EmotionalState(
        val emotionalResilience: Double? = null,
    )

    @Serializable
    private data class NsvInput(
        val biological: BiologicalState? = null,
        val emotional: EmotionalState? = null,
    )

    /**
     * Runs the Triple-Check Clearance Protocol against the provided NSV.
     *
     * @param nsvJson NeuralStateVector JSON (only biological and emotional fields used).
     * @return JSON: { score: Double, cleared: Boolean, vetoReason?: String, consequence?: String, warnings: String[] }
     */
    fun evaluate(nsvJson: String): String {
        val nsv = json.decodeFromString<NsvInput>(nsvJson)

        val vitality = when {
            nsv.biological?.recoveryScore != null -> nsv.biological.recoveryScore / 10.0
            nsv.biological?.cnsFatigue != null ->
                max(0.0, min(1.0, (10.0 - nsv.biological.cnsFatigue) / 10.0))
            else -> 0.5
        }

        val resilience = if (nsv.emotional?.emotionalResilience != null)
            max(0.0, min(1.0, nsv.emotional.emotionalResilience / 10.0))
        else
            0.5

        val score = vitality * 0.6 + resilience * 0.4

        val warnings = mutableListOf<String>()
        var cleared = true
        var vetoReason: String? = null
        var consequence: String? = null

        // 1. Soma Readiness Check
        if (vitality < 0.3) {
            cleared = false
            vetoReason = "CRITICAL_VITALITY_LOW"
            consequence = "FORCE_RECOVERY_MODE"
        }

        // 2. Soma HRV Check (proxy via vitality)
        if (vitality < 0.5 && vitality >= 0.3) {
            warnings.add("HRV delta > -20%: Propose 20% volume reduction.")
        }

        // 3. Agnes Resilience Check
        if (resilience < 0.2) {
            cleared = false
            vetoReason = "CRITICAL_RESILIENCE_LOW"
            consequence = "PROPOSE_REST_OR_LOW_STIFFNESS"
        }

        // 4. Final Algorithm Veto
        if (score < 0.4 && cleared) {
            cleared = false
            vetoReason = "CLEARANCE_ALGORITHM_FAIL"
            consequence = "INITIATE_RECOVERY"
        }

        return buildJsonObject {
            put("score", score)
            put("cleared", cleared)
            if (vetoReason != null) put("vetoReason", vetoReason)
            if (consequence != null) put("consequence", consequence)
            put("warnings", buildJsonArray { warnings.forEach { add(JsonPrimitive(it)) } })
        }.toString()
    }
}
