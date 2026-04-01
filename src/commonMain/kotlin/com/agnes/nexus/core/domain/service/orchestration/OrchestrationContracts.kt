package com.agnes.nexus.core.domain.service.orchestration

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*

/**
 * Orchestration contract constants, comparators, and pure helper functions.
 * Mirrors the pure computation surface from agnes lib/contracts/orchestration.ts.
 */
object OrchestrationContracts {

    val PRIMARY_AGENT_PRECEDENCE = listOf("agnes", "atlas", "soma", "titan", "ledger")

    val MASTER_THREAD_AUTHOR_PRECEDENCE = listOf("user", "system", "nexus") + PRIMARY_AGENT_PRECEDENCE

    private val SPEC_SOURCE_MAP = mapOf(
        "nexus" to "NEXUS", "agnes" to "AGNES", "atlas" to "ATLAS",
        "titan" to "TITAN", "ledger" to "LEDGER", "soma" to "SOMA",
        "cascade:nexus" to "NEXUS", "cascade:agnes" to "AGNES",
        "cascade:atlas" to "ATLAS", "cascade:titan" to "TITAN",
        "cascade:ledger" to "LEDGER", "cascade:soma" to "SOMA",
        "spine-cascade:core" to "NEXUS", "spine-cascade:ledger" to "LEDGER",
        "spine-cascade:soma" to "SOMA", "spine-cascade:agnes" to "AGNES",
        "spine-cascade" to "NEXUS",
    )

    fun isAutopilotLevel(value: Int): Boolean = value in 0..5

    fun isPrimaryAgentId(value: String): Boolean =
        PRIMARY_AGENT_PRECEDENCE.contains(value.lowercase())

    fun getAgentPrecedenceRank(source: String): Int {
        val index = PRIMARY_AGENT_PRECEDENCE.indexOf(source.lowercase())
        return if (index == -1) Int.MAX_VALUE else index
    }

    fun compareAgentPrecedence(left: String, right: String): Int =
        getAgentPrecedenceRank(left) - getAgentPrecedenceRank(right)

    fun getMasterThreadAuthorRank(author: String): Int {
        val index = MASTER_THREAD_AUTHOR_PRECEDENCE.indexOf(author.lowercase())
        return if (index == -1) Int.MAX_VALUE else index
    }

    fun compareMasterThreadAuthors(left: String, right: String): Int =
        getMasterThreadAuthorRank(left) - getMasterThreadAuthorRank(right)

    /**
     * Compare two turns by sequence → createdAt → author precedence → id.
     * Accepts JSON objects with fields: sequence (Int), createdAt (String), startedBy (String), id (String).
     */
    fun compareMasterThreadTurns(leftJson: String, rightJson: String): Int {
        val json = Json { ignoreUnknownKeys = true }
        val left = json.parseToJsonElement(leftJson).jsonObject
        val right = json.parseToJsonElement(rightJson).jsonObject

        val sequenceDelta = (left["sequence"]?.jsonPrimitive?.intOrNull ?: 0) -
                (right["sequence"]?.jsonPrimitive?.intOrNull ?: 0)
        if (sequenceDelta != 0) return sequenceDelta

        val createdAtDelta = (left["createdAt"]?.jsonPrimitive?.contentOrNull ?: "")
            .compareTo(right["createdAt"]?.jsonPrimitive?.contentOrNull ?: "")
        if (createdAtDelta != 0) return createdAtDelta

        val authorDelta = compareMasterThreadAuthors(
            left["startedBy"]?.jsonPrimitive?.contentOrNull ?: "",
            right["startedBy"]?.jsonPrimitive?.contentOrNull ?: "",
        )
        if (authorDelta != 0) return authorDelta

        return (left["id"]?.jsonPrimitive?.contentOrNull ?: "")
            .compareTo(right["id"]?.jsonPrimitive?.contentOrNull ?: "")
    }

    /**
     * Compare two messages by turnSequence → createdAt → parent order → author → kind → turnId → id.
     */
    fun compareMasterThreadMessages(leftJson: String, rightJson: String): Int {
        val json = Json { ignoreUnknownKeys = true }
        val left = json.parseToJsonElement(leftJson).jsonObject
        val right = json.parseToJsonElement(rightJson).jsonObject

        val leftTurnSeq = left["turnSequence"]?.jsonPrimitive?.intOrNull ?: Int.MAX_VALUE
        val rightTurnSeq = right["turnSequence"]?.jsonPrimitive?.intOrNull ?: Int.MAX_VALUE
        val turnSeqDelta = leftTurnSeq - rightTurnSeq
        if (turnSeqDelta != 0) return turnSeqDelta

        val createdAtDelta = (left["createdAt"]?.jsonPrimitive?.contentOrNull ?: "")
            .compareTo(right["createdAt"]?.jsonPrimitive?.contentOrNull ?: "")
        if (createdAtDelta != 0) return createdAtDelta

        // Parent message order
        val leftReply = left["replyToMessageId"]?.jsonPrimitive?.contentOrNull
        val rightReply = right["replyToMessageId"]?.jsonPrimitive?.contentOrNull
        val leftId = left["id"]?.jsonPrimitive?.contentOrNull ?: ""
        val rightId = right["id"]?.jsonPrimitive?.contentOrNull ?: ""
        if (leftReply != null && leftReply == rightId) return 1
        if (rightReply != null && rightReply == leftId) return -1

        val authorDelta = compareMasterThreadAuthors(
            left["author"]?.jsonPrimitive?.contentOrNull ?: "",
            right["author"]?.jsonPrimitive?.contentOrNull ?: "",
        )
        if (authorDelta != 0) return authorDelta

        val kindDelta = (left["kind"]?.jsonPrimitive?.contentOrNull ?: "conversation")
            .compareTo(right["kind"]?.jsonPrimitive?.contentOrNull ?: "conversation")
        if (kindDelta != 0) return kindDelta

        val turnIdDelta = (left["turnId"]?.jsonPrimitive?.contentOrNull ?: "")
            .compareTo(right["turnId"]?.jsonPrimitive?.contentOrNull ?: "")
        if (turnIdDelta != 0) return turnIdDelta

        return leftId.compareTo(rightId)
    }

    fun toSpecPriority(priority: String): Int = when (priority) {
        "critical" -> 3
        "alert" -> 2
        else -> 1
    }

    fun normalizeSpecSource(source: String): String {
        val direct = SPEC_SOURCE_MAP[source.lowercase()]
        if (direct != null) return direct
        val segments = source.lowercase().split(":")
        for (i in segments.indices.reversed()) {
            val candidate = SPEC_SOURCE_MAP[segments[i]]
            if (candidate != null) return candidate
        }
        return "NEXUS"
    }

    /**
     * Adapt a SpineEvent JSON into a SpecSpineEvent JSON.
     * @param eventJson SpineEvent with fields: id, source, timestamp, priority, type, data
     * @param optionsJson Optional overrides: intent, mutations, confidence, requiresApproval, patientScope
     */
    fun adaptSpineEventToSpec(eventJson: String, optionsJson: String? = null): String {
        val json = Json { ignoreUnknownKeys = true }
        val event = json.parseToJsonElement(eventJson).jsonObject
        val options = optionsJson?.let { json.parseToJsonElement(it).jsonObject }
        val eventData = event["data"]?.jsonObject ?: buildJsonObject {}

        val intent = options?.get("intent")?.jsonPrimitive?.contentOrNull
            ?: eventData["intent"]?.jsonPrimitive?.contentOrNull?.takeIf { it.isNotBlank() }
            ?: (event["type"]?.jsonPrimitive?.contentOrNull ?: "").lowercase()

        val confidenceInput = options?.get("confidence")?.jsonPrimitive?.doubleOrNull
            ?: eventData["confidence"]?.jsonPrimitive?.doubleOrNull
        val confidence = if (confidenceInput != null && confidenceInput.isFinite())
            confidenceInput.coerceIn(0.0, 1.0) else 0.5

        val requiresApproval = options?.get("requiresApproval")?.jsonPrimitive?.booleanOrNull
            ?: eventData["requiresApproval"]?.jsonPrimitive?.booleanOrNull ?: false

        val patientScopeInput = options?.get("patientScope")?.jsonPrimitive?.contentOrNull
            ?: eventData["patient_scope"]?.jsonPrimitive?.contentOrNull
        val patientScope = if (patientScopeInput == "GUEST") "GUEST" else "USER"

        val mutations = options?.get("mutations")?.jsonObject
            ?: eventData["mutations"]?.jsonObject
            ?: buildJsonObject {}

        val numericMutations = buildJsonObject {
            mutations.forEach { (key, value) ->
                val num = value.jsonPrimitive.doubleOrNull
                if (num != null) put(key, num)
            }
        }

        return buildJsonObject {
            putJsonObject("header") {
                put("id", event["id"]?.jsonPrimitive?.contentOrNull ?: "")
                put("source", normalizeSpecSource(event["source"]?.jsonPrimitive?.contentOrNull ?: ""))
                put("timestamp", event["timestamp"]?.jsonPrimitive?.longOrNull ?: 0L)
                put("priority", toSpecPriority(event["priority"]?.jsonPrimitive?.contentOrNull ?: "info"))
            }
            putJsonObject("payload") {
                put("intent", intent)
                put("mutations", numericMutations)
                put("attributes", eventData)
            }
            putJsonObject("logic_gates") {
                put("confidence", confidence)
                put("requires_approval", requiresApproval)
                put("patient_scope", patientScope)
            }
        }.toString()
    }

    /**
     * Serialize a SpecSpineEvent JSON (converts mutations Map format to plain object).
     * Since we already use JSON objects throughout, this is a passthrough.
     */
    fun serializeSpecSpineEvent(specEventJson: String): String = specEventJson
}
