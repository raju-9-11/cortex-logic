package com.agnes.nexus.core.domain.service

import kotlinx.serialization.json.*

/**
 * Pure global projection computations — wellness scoring and NSV update payload builder.
 *
 * Both functions must produce identical results on Android and Agnes TS.
 * All I/O (Firestore reads/writes, crypto.randomUUID, Spine events) stays in Agnes.
 */
object GlobalProjectionService {

    private val json = Json { ignoreUnknownKeys = true }

    private val JsonElement.asObj: JsonObject? get() = this as? JsonObject
    private val JsonElement.asNum: Double? get() = (this as? JsonPrimitive)?.doubleOrNull

    // ─────────────────────────────────────────────────────────────────────────
    // Wellness scoring
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Computes a weighted 0-100 wellness score from NSV domain metrics.
     * Matches Agnes's computeOverallWellness().
     *
     * Weights: biological 30%, emotional 30%, cognitive 20%, resource 20%.
     */
    fun computeOverallWellness(nsvJson: String): Int {
        val nsv = try { json.parseToJsonElement(nsvJson).jsonObject } catch (_: Exception) { return 50 }

        val bio = nsv["biological"]?.asObj
        val emo = nsv["emotional"]?.asObj
        val cog = nsv["cognitive"]?.asObj
        val res = nsv["resource"]?.asObj

        val cnsFatigue = bio?.get("cnsFatigue")?.asNum ?: 5.0
        val emotionalResilience = emo?.get("emotionalResilience")?.asNum ?: 5.0
        val focusScore = cog?.get("focusScore")?.asNum ?: 5.0
        val financialFriction = res?.get("financialFriction")?.asNum ?: 5.0

        val bioScore = 10.0 - cnsFatigue
        val emoScore = emotionalResilience
        val cogScore = focusScore
        val resScore = 10.0 - financialFriction

        val raw = bioScore * 0.3 + emoScore * 0.3 + cogScore * 0.2 + resScore * 0.2
        return (raw * 10).toInt() // scale to 0-100
    }

    // ─────────────────────────────────────────────────────────────────────────
    // NSV update payload builder
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Build a Firestore dot-path update payload for cross-functional NSV state.
     *
     * Each domain field produces:
     *   - `crossFunctionalState.<domain>.<field>` = value
     *   - `crossFunctionalState.lastUpdated.<domain>.<field>` = timestamp
     * Legacy root-level aliases (cnsFatigue, sleepQuality, etc.) are also written.
     *
     * @param patchJson  Serialised NeuralStateVectorPatch.
     * @param timestamp  ISO 8601 timestamp string.
     * @return JSON object whose keys are dot-notation Firestore paths.
     */
    fun buildNSVUpdatePayload(patchJson: String, timestamp: String): String {
        val updates = try { json.parseToJsonElement(patchJson).jsonObject } catch (_: Exception) { return "{}" }

        val result = mutableMapOf<String, JsonElement>()

        fun stamp(key: String, value: JsonElement) {
            result["crossFunctionalState.$key"] = value
            result["crossFunctionalState.lastUpdated.$key"] = JsonPrimitive(timestamp)
        }
        fun alias(key: String, value: JsonElement) {
            result["crossFunctionalState.$key"] = value
        }

        val bio = updates["biological"]?.asObj
        bio?.get("cnsFatigue")?.let { v -> stamp("biological.cnsFatigue", v); alias("cnsFatigue", v) }
        updates["cnsFatigue"]?.let { v -> stamp("biological.cnsFatigue", v); alias("cnsFatigue", v); alias("biological.cnsFatigue", v) }

        bio?.get("sleepQuality")?.let { v -> stamp("biological.sleepQuality", v); alias("sleepQuality", v) }
        updates["sleepQuality"]?.let { v -> stamp("biological.sleepQuality", v); alias("sleepQuality", v); alias("biological.sleepQuality", v) }

        bio?.get("recoveryScore")?.let { v -> stamp("biological.recoveryScore", v) }

        bio?.get("hormonalContext")?.let { v -> stamp("biological.hormonalContext", v); alias("hormonalContext", v) }
        updates["hormonalContext"]?.let { v -> stamp("biological.hormonalContext", v); alias("hormonalContext", v); alias("biological.hormonalContext", v) }

        val emo = updates["emotional"]?.asObj
        emo?.get("emotionalResilience")?.let { v -> stamp("emotional.emotionalResilience", v); alias("emotionalResilience", v) }
        updates["emotionalResilience"]?.let { v -> stamp("emotional.emotionalResilience", v); alias("emotionalResilience", v); alias("emotional.emotionalResilience", v) }

        emo?.get("stressLoad")?.let { v -> stamp("emotional.stressLoad", v) }
        emo?.get("moodTrend")?.let { v -> stamp("emotional.moodTrend", v) }

        emo?.get("traumaMarkers")?.let { v -> stamp("emotional.traumaMarkers", v); alias("traumaMarkers", v) }
        updates["traumaMarkers"]?.let { v -> stamp("emotional.traumaMarkers", v); alias("traumaMarkers", v); alias("emotional.traumaMarkers", v) }

        val cog = updates["cognitive"]?.asObj
        cog?.get("energyBudget")?.let { v -> stamp("cognitive.energyBudget", v) }
        cog?.get("focusScore")?.let { v -> stamp("cognitive.focusScore", v) }
        cog?.get("activeLoad")?.let { v -> stamp("cognitive.activeLoad", v) }
        cog?.get("researchLoad")?.let { v -> stamp("cognitive.researchLoad", v) }
        cog?.get("planningLoad")?.let { v -> stamp("cognitive.planningLoad", v) }
        cog?.get("taskCompletionRate")?.let { v -> stamp("cognitive.taskCompletionRate", v) }
        cog?.get("interestDiversity")?.let { v -> stamp("cognitive.interestDiversity", v) }

        val plan = updates["planning"]?.asObj
        plan?.get("streakHealth")?.let { v -> stamp("planning.streakHealth", v) }
        plan?.get("deadlinePressure")?.let { v -> stamp("planning.deadlinePressure", v) }

        val res = updates["resource"]?.asObj
        res?.get("financialFriction")?.let { v -> stamp("resource.financialFriction", v) }
        res?.get("resonanceROI")?.let { v -> stamp("resource.resonanceROI", v) }

        return JsonObject(result).toString()
    }
}
