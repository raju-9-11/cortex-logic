package com.agnes.nexus.core.domain.service.spine

import com.agnes.nexus.core.platform.generateUuid
import kotlinx.serialization.json.*

/**
 * Pure spine flow contract utilities.
 * Readiness level derivation, event classification, delegation parsing.
 */
object FlowContracts {

    const val FLOW_SCHEMA_VERSION = 1

    private val json = Json { ignoreUnknownKeys = true }

    fun createFlowMeta(source: String, flowId: String? = null): String {
        return buildJsonObject {
            put("flowId", flowId ?: generateUuid())
            put("originId", source)
            put("schemaVersion", FLOW_SCHEMA_VERSION)
        }.toString()
    }

    /**
     * Derive readiness level from a numeric score (0-100).
     * Returns null for invalid/null input.
     */
    fun deriveReadinessLevel(score: Double?): String? {
        if (score == null || !score.isFinite() || score < 0) return null
        return when {
            score < 40 -> "critical"
            score < 60 -> "poor"
            score < 80 -> "fair"
            score < 90 -> "good"
            else -> "optimal"
        }
    }

    /**
     * Extract readiness score from event data JSON, checking "score" then "readinessScore".
     */
    fun resolveReadinessScore(dataJson: String?): Double? {
        if (dataJson == null) return null
        val data = json.parseToJsonElement(dataJson).jsonObject
        data["score"]?.jsonPrimitive?.doubleOrNull?.let { if (it.isFinite()) return it }
        data["readinessScore"]?.jsonPrimitive?.doubleOrNull?.let { if (it.isFinite()) return it }
        return null
    }

    /**
     * Check if the data indicates a critical readiness level.
     */
    fun isCriticalReadiness(dataJson: String?): Boolean {
        if (dataJson == null) return false
        val data = json.parseToJsonElement(dataJson).jsonObject
        val score = resolveReadinessScore(dataJson)
        if (score != null && score < 40) return true
        val level = data["level"]?.jsonPrimitive?.contentOrNull?.lowercase() ?: ""
        return level == "critical" || level == "poor"
    }

    /**
     * Check if an event represents a missed physical commitment.
     * @param domain Event domain
     * @param dataJson Event data JSON
     */
    fun isPhysicalCommitmentMissed(domain: String, dataJson: String?): Boolean {
        if (dataJson != null) {
            val data = json.parseToJsonElement(dataJson).jsonObject
            val impactDomain = data["impactDomain"]?.jsonPrimitive?.contentOrNull?.lowercase()
            if (impactDomain == "physical") return true
            val legacyDomain = data["domain"]?.jsonPrimitive?.contentOrNull?.lowercase()
            if (legacyDomain == "physical") return true
            val affinities = data["moduleAffinity"]?.jsonArray
            if (affinities != null) {
                for (entry in affinities) {
                    val value = entry.jsonPrimitive.contentOrNull
                    if (value == "titan" || value == "physical") return true
                }
            }
        }
        return domain == "B"
    }

    /**
     * Check if an event is a delegation completion signal.
     * @param eventType Event type string
     * @param dataJson Event data JSON
     */
    fun isDelegationCompletionSignal(eventType: String, dataJson: String?): Boolean {
        if (eventType == "VITAL_UPDATED" || eventType == "MODULE_PROFILE_UPDATED" || eventType == "AI_LINK_FAILURE") {
            return true
        }
        if (eventType != "MODULE_DELEGATED") return false
        if (dataJson == null) return false
        val data = json.parseToJsonElement(dataJson).jsonObject
        val reason = data["reason"]?.jsonPrimitive?.contentOrNull ?: ""
        if (reason == "query_result") return true
        val status = data["status"]?.jsonPrimitive?.contentOrNull?.lowercase() ?: ""
        return status == "completed" || status == "failed" || status == "cancelled" || status == "timeout"
    }

    /**
     * Parse the delegation target module from an event.
     * @param eventJson JSON with "target" and/or "data.targetModuleId"
     */
    fun parseDelegationTarget(eventJson: String): String? {
        val event = json.parseToJsonElement(eventJson).jsonObject
        event["target"]?.jsonPrimitive?.contentOrNull?.let { return it }
        event["data"]?.jsonObject?.get("targetModuleId")?.jsonPrimitive?.contentOrNull?.let { return it }
        return null
    }
}
