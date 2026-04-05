package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.service.agents.AgentRegistry
import kotlinx.serialization.json.*

/**
 * Pure planning logic — intent → action plan node construction.
 *
 * This is the KMP equivalent of Agnes's NexusActionPlannerService.buildNode().
 * All I/O stays in the Agnes TS layer; this service handles deterministic
 * plan construction which must be identical on Android.
 */
object NexusActionPlannerService {

    /** Intent types where Scout's KB can meaningfully enrich the response. */
    val KNOWLEDGE_ADJACENT_INTENTS = setOf(
        "create_workout_plan", "create_medical_review", "create_financial_plan_request",
        "create_research_request", "create_general_request",
        "fitness", "medical", "research",
    )

    /** Intent types that produce draft proposals instead of direct actions. */
    val DRAFT_ACTION_TYPES = setOf(
        "create_emotional_support_session", "create_workout_plan",
        "create_medical_review", "create_financial_plan_request",
        "create_research_request", "create_technical_task", "create_general_request",
    )

    private val json = Json { ignoreUnknownKeys = true }

    private fun sentenceCase(input: String): String {
        if (input.isEmpty()) return input
        return input[0].uppercaseChar() + input.substring(1)
    }

    private fun toDateTimeString(dateText: String?, timeText: String?): String? {
        if (dateText == null && timeText == null) return null
        if (dateText != null && timeText != null) return "${dateText}T${timeText}:00"
        if (dateText != null) return dateText
        return null
    }

    private fun summarizeTemporal(entities: JsonObject): String {
        val date = entities["dateText"]?.jsonPrimitive?.contentOrNull
        val time = entities["timeText"]?.jsonPrimitive?.contentOrNull
        return when {
            date != null && time != null -> "$date at $time"
            date != null -> date
            time != null -> time
            else -> "current context"
        }
    }

    private fun buildDraftPayload(intent: JsonObject, targetModuleId: String): JsonObject {
        val intentType = intent["intentType"]?.jsonPrimitive?.contentOrNull ?: ""
        val rawSegment = intent["rawSegment"]?.jsonPrimitive?.contentOrNull ?: ""
        return buildJsonObject {
            put("title", "Draft: ${sentenceCase(intentType.replace("_", " "))}")
            put("summary", rawSegment)
            put("target", targetModuleId)
            put("intentType", intentType)
            put("rawSegment", rawSegment)
            intent["entities"]?.let { put("entities", it) }
            intent["temporal"]?.let { put("temporal", it) }
        }
    }

    /**
     * Build an action plan node from a parsed intent.
     *
     * @param intentJson Serialised ParsedCommandIntent.
     * @param registryActionType Optional mapped action type from FLOW_REGISTRY (null if not found).
     * @param targetModuleId Resolved primary module for this intent.
     * @param supportingModuleIds Resolved supporting modules.
     * @return Serialised NexusActionPlanNode JSON.
     */
    fun buildNode(
        intentJson: String,
        registryActionType: String?,
        targetModuleId: String,
        supportingModuleIdsJson: String,
    ): String {
        val intent = try {
            json.parseToJsonElement(intentJson).jsonObject
        } catch (_: Exception) {
            return "{}"
        }
        val supportingModuleIds = try {
            json.decodeFromString<List<String>>(supportingModuleIdsJson)
        } catch (_: Exception) {
            emptyList()
        }

        val intentId = intent["id"]?.jsonPrimitive?.contentOrNull ?: "unknown"
        val intentType = intent["intentType"]?.jsonPrimitive?.contentOrNull ?: ""
        val rawSegment = intent["rawSegment"]?.jsonPrimitive?.contentOrNull ?: ""
        val mutatesState = intent["mutatesState"]?.jsonPrimitive?.booleanOrNull ?: false
        val dependsOn = intent["dependsOn"]?.jsonArray?.map { it.jsonPrimitive.content } ?: emptyList()
        val entities = intent["entities"]?.jsonObject ?: buildJsonObject {}

        val temporalSummary = summarizeTemporal(entities)
        val mappedActionType = registryActionType

        if (mappedActionType == "propose_draft") {
            return buildJsonObject {
                put("id", "$intentId.node.propose-draft")
                put("intentId", intentId)
                put("intentType", intentType)
                put("label", sentenceCase(rawSegment))
                put("summary", "Draft proposal for $temporalSummary")
                put("targetModuleId", targetModuleId)
                put("supportingModuleIds", buildJsonArray { supportingModuleIds.forEach { add(it) } })
                put("actionType", "propose_draft")
                put("mutatesState", false)
                put("canRunInParallel", false)
                put("dependsOn", buildJsonArray { dependsOn.forEach { add(it) } })
                put("payload", buildDraftPayload(intent, targetModuleId))
            }.toString()
        }

        val dateText = entities["dateText"]?.jsonPrimitive?.contentOrNull
        val timeText = entities["timeText"]?.jsonPrimitive?.contentOrNull
        val titleText = entities["title"]?.jsonPrimitive?.contentOrNull
        val statusText = entities["status"]?.jsonPrimitive?.contentOrNull

        return when (intentType) {
            "plan_day" -> buildJsonObject {
                put("id", "$intentId.node.plan-day")
                put("intentId", intentId)
                put("intentType", intentType)
                put("label", "Plan the day")
                put("summary", "Build or revise the day plan for $temporalSummary")
                put("targetModuleId", targetModuleId)
                put("supportingModuleIds", buildJsonArray { supportingModuleIds.forEach { add(it) } })
                put("actionType", mappedActionType ?: "plan_day")
                put("mutatesState", if (mappedActionType != null) !DRAFT_ACTION_TYPES.contains(mappedActionType) else true)
                put("canRunInParallel", false)
                put("dependsOn", buildJsonArray { dependsOn.forEach { add(it) } })
                put("payload", buildJsonObject {
                    dateText?.let { put("date", it) } ?: put("date", JsonNull)
                    timeText?.let { put("time", it) } ?: put("time", JsonNull)
                    put("sourceSegment", rawSegment)
                })
            }.toString()

            "schedule_item" -> when (mappedActionType) {
                "schedule_block" -> buildJsonObject {
                    put("id", "$intentId.node.schedule-block")
                    put("intentId", intentId)
                    put("intentType", intentType)
                    put("label", "Schedule ${titleText ?: "item"}")
                    put("summary", "Add \"${titleText ?: "item"}\" to the plan for $temporalSummary")
                    put("targetModuleId", targetModuleId)
                    put("supportingModuleIds", buildJsonArray { supportingModuleIds.forEach { add(it) } })
                    put("actionType", "schedule_block")
                    put("mutatesState", true)
                    put("canRunInParallel", false)
                    put("dependsOn", buildJsonArray { dependsOn.forEach { add(it) } })
                    put("payload", buildJsonObject {
                        titleText?.let { put("title", it) } ?: put("title", JsonNull)
                        val scheduledAt = toDateTimeString(dateText, timeText)
                        scheduledAt?.let { put("scheduledAt", it) } ?: put("scheduledAt", JsonNull)
                        put("duration", 60)
                        put("category", "other")
                        put("sourceSegment", rawSegment)
                    })
                }.toString()
                "create_task" -> buildJsonObject {
                    put("id", "$intentId.node.create-task")
                    put("intentId", intentId)
                    put("intentType", intentType)
                    put("label", "Schedule ${titleText ?: "item"}")
                    put("summary", "Add \"${titleText ?: "item"}\" to the plan for $temporalSummary")
                    put("targetModuleId", targetModuleId)
                    put("supportingModuleIds", buildJsonArray { supportingModuleIds.forEach { add(it) } })
                    put("actionType", "create_task")
                    put("mutatesState", true)
                    put("canRunInParallel", false)
                    put("dependsOn", buildJsonArray { dependsOn.forEach { add(it) } })
                    put("payload", buildJsonObject {
                        titleText?.let { put("title", it) } ?: put("title", JsonNull)
                        val deadline = toDateTimeString(dateText, timeText)
                        deadline?.let { put("deadline", it) } ?: put("deadline", JsonNull)
                        put("sourceSegment", rawSegment)
                    })
                }.toString()
                else -> buildJsonObject {
                    put("id", "$intentId.node.schedule-item")
                    put("intentId", intentId)
                    put("intentType", intentType)
                    put("label", "Schedule ${titleText ?: "item"}")
                    put("summary", "Add \"${titleText ?: "item"}\" to the plan for $temporalSummary")
                    put("targetModuleId", targetModuleId)
                    put("supportingModuleIds", buildJsonArray { supportingModuleIds.forEach { add(it) } })
                    put("actionType", mappedActionType ?: "schedule_item")
                    put("mutatesState", true)
                    put("canRunInParallel", false)
                    put("dependsOn", buildJsonArray { dependsOn.forEach { add(it) } })
                    put("payload", buildJsonObject {
                        titleText?.let { put("title", it) } ?: put("title", JsonNull)
                        dateText?.let { put("date", it) } ?: put("date", JsonNull)
                        timeText?.let { put("time", it) } ?: put("time", JsonNull)
                        put("sourceSegment", rawSegment)
                    })
                }.toString()
            }

            "recovery_day" -> when (mappedActionType) {
                "flatten_schedule" -> buildJsonObject {
                    put("id", "$intentId.node.flatten-schedule")
                    put("intentId", intentId)
                    put("intentType", intentType)
                    put("label", "Shift the plan to recovery")
                    put("summary", "Update the schedule to a recovery/rest posture for $temporalSummary")
                    put("targetModuleId", targetModuleId)
                    put("supportingModuleIds", buildJsonArray { supportingModuleIds.forEach { add(it) } })
                    put("actionType", "flatten_schedule")
                    put("mutatesState", true)
                    put("canRunInParallel", false)
                    put("dependsOn", buildJsonArray { dependsOn.forEach { add(it) } })
                    put("payload", buildJsonObject {
                        put("flattenedUntil", toDateTimeString(dateText, timeText) ?: "now")
                        put("reason", statusText ?: "rest")
                        put("sourceSegment", rawSegment)
                    })
                }.toString()
                "create_recovery_window" -> buildJsonObject {
                    put("id", "$intentId.node.recovery-window")
                    put("intentId", intentId)
                    put("intentType", intentType)
                    put("label", "Shift the plan to recovery")
                    put("summary", "Update the schedule to a recovery/rest posture for $temporalSummary")
                    put("targetModuleId", targetModuleId)
                    put("supportingModuleIds", buildJsonArray { supportingModuleIds.forEach { add(it) } })
                    put("actionType", "create_recovery_window")
                    put("mutatesState", true)
                    put("canRunInParallel", false)
                    put("dependsOn", buildJsonArray { dependsOn.forEach { add(it) } })
                    put("payload", buildJsonObject {
                        put("title", "Recovery Window")
                        put("start", toDateTimeString(dateText, timeText) ?: "now")
                        put("end", "now+1h")
                        put("reason", statusText ?: "rest")
                        put("status", "planned")
                        put("sourceSegment", rawSegment)
                    })
                }.toString()
                else -> buildJsonObject {
                    put("id", "$intentId.node.recovery-day")
                    put("intentId", intentId)
                    put("intentType", intentType)
                    put("label", "Shift the plan to recovery")
                    put("summary", "Update the schedule to a recovery/rest posture for $temporalSummary")
                    put("targetModuleId", targetModuleId)
                    put("supportingModuleIds", buildJsonArray { supportingModuleIds.forEach { add(it) } })
                    put("actionType", mappedActionType ?: "recovery_day")
                    put("mutatesState", true)
                    put("canRunInParallel", false)
                    put("dependsOn", buildJsonArray { dependsOn.forEach { add(it) } })
                    put("payload", buildJsonObject {
                        put("status", statusText ?: "rest")
                        dateText?.let { put("date", it) } ?: put("date", JsonNull)
                        timeText?.let { put("time", it) } ?: put("time", JsonNull)
                        put("sourceSegment", rawSegment)
                    })
                }.toString()
            }

            "update_schedule" -> buildJsonObject {
                put("id", "$intentId.node.update-schedule")
                put("intentId", intentId)
                put("intentType", intentType)
                put("label", "Update the schedule")
                put("summary", "Revise the plan for $temporalSummary")
                put("targetModuleId", targetModuleId)
                put("supportingModuleIds", buildJsonArray { supportingModuleIds.forEach { add(it) } })
                put("actionType", mappedActionType ?: "update_schedule")
                put("mutatesState", true)
                put("canRunInParallel", false)
                put("dependsOn", buildJsonArray { dependsOn.forEach { add(it) } })
                put("payload", buildJsonObject {
                    dateText?.let { put("date", it) } ?: put("date", JsonNull)
                    timeText?.let { put("time", it) } ?: put("time", JsonNull)
                    put("sourceSegment", rawSegment)
                })
            }.toString()

            else -> buildJsonObject {
                put("id", "$intentId.node.generic")
                put("intentId", intentId)
                put("intentType", intentType)
                put("label", sentenceCase(rawSegment))
                put("summary", "Handle the request in $temporalSummary")
                put("targetModuleId", targetModuleId)
                put("supportingModuleIds", buildJsonArray { supportingModuleIds.forEach { add(it) } })
                put("actionType", mappedActionType ?: intentType)
                put("mutatesState", if (mappedActionType != null) !DRAFT_ACTION_TYPES.contains(mappedActionType) else mutatesState)
                put("canRunInParallel", false)
                put("dependsOn", buildJsonArray { dependsOn.forEach { add(it) } })
                put("payload", buildJsonObject { put("sourceSegment", rawSegment) })
            }.toString()
        }
    }

    /** Whether Scout should be added as a supporting module for the given intent type. */
    fun shouldEnrichWithScout(intentType: String, targetModuleId: String, currentSupportingJson: String): Boolean {
        if (!KNOWLEDGE_ADJACENT_INTENTS.contains(intentType)) return false
        if (targetModuleId == "scout") return false
        return try {
            !json.decodeFromString<List<String>>(currentSupportingJson).contains("scout")
        } catch (_: Exception) {
            true
        }
    }

    /** Whether this action type should produce a draft instead of executing directly. */
    fun isDraftActionType(actionType: String): Boolean = DRAFT_ACTION_TYPES.contains(actionType)
}
