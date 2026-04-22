package com.agnes.ara.core.domain.service.orchestration

import kotlinx.serialization.json.*

/**
 * Pure utility functions extracted from OrchestrationPersistenceService.
 * Handles record conversion, sanitization, and collection path generation.
 * No I/O dependencies.
 */
object OrchestrationPersistenceUtils {

    const val ORCHESTRATION_PROPOSAL_SUBCOLLECTION = "orchestration_proposals"
    const val ORCHESTRATION_EXECUTION_SUBCOLLECTION = "orchestration_execution_records"
    const val ORCHESTRATION_EXECUTION_FAILURE_SUBCOLLECTION = "orchestration_execution_failures"
    const val ORCHESTRATION_THREAD_SUBCOLLECTION = "orchestration_threads"

    const val DEFAULT_PROPOSAL_RETENTION = 150
    const val DEFAULT_EXECUTION_RETENTION = 150
    const val DEFAULT_FAILURE_RETENTION = 150
    const val DEFAULT_THREAD_RETENTION = 25

    private val json = Json { ignoreUnknownKeys = true }

    fun getProposalCollectionPath(uid: String): String =
        "users/$uid/$ORCHESTRATION_PROPOSAL_SUBCOLLECTION"

    fun getExecutionCollectionPath(uid: String): String =
        "users/$uid/$ORCHESTRATION_EXECUTION_SUBCOLLECTION"

    fun getExecutionFailureCollectionPath(uid: String): String =
        "users/$uid/$ORCHESTRATION_EXECUTION_FAILURE_SUBCOLLECTION"

    fun getThreadCollectionPath(uid: String): String =
        "users/$uid/$ORCHESTRATION_THREAD_SUBCOLLECTION"

    /**
     * Remove undefined/null values recursively from a JSON structure (Firestore safety).
     */
    fun toFirestoreSafeJson(valueJson: String): String {
        val element = json.parseToJsonElement(valueJson)
        return sanitizeElement(element).toString()
    }

    private fun sanitizeElement(element: JsonElement): JsonElement = when (element) {
        is JsonObject -> buildJsonObject {
            element.forEach { (key, value) ->
                if (value !is JsonNull) {
                    put(key, sanitizeElement(value))
                }
            }
        }
        is JsonArray -> JsonArray(element.map { sanitizeElement(it) })
        else -> element
    }

    /**
     * Filter a runtime summary to exclude GUEST-scoped actions and recompute counts.
     */
    fun sanitizeRuntimeSummary(runtimeSummaryJson: String): String {
        val summary = json.parseToJsonElement(runtimeSummaryJson).jsonObject
        val actions = summary["actions"]?.jsonArray ?: return "null"

        val userActions = actions.filter { action ->
            val scope = action.jsonObject["patientScope"]?.jsonPrimitive?.contentOrNull
            scope != "GUEST"
        }

        fun countWhere(predicate: (JsonObject) -> Boolean): Int =
            userActions.count { predicate(it.jsonObject) }

        val failedCount = countWhere { a ->
            val status = a["executionStatus"]?.jsonPrimitive?.contentOrNull
            status == "failed" || status == "failed_escalated"
        }

        val counts = buildJsonObject {
            put("total", userActions.size)
            put("visibleExecutions", countWhere { a ->
                a["runtime"]?.jsonObject?.get("disposition")?.jsonPrimitive?.contentOrNull == "visible_execution" &&
                        a["executionStatus"]?.jsonPrimitive?.contentOrNull == "executed"
            })
            put("silentExecutions", countWhere { a ->
                a["runtime"]?.jsonObject?.get("disposition")?.jsonPrimitive?.contentOrNull == "silent_execution" &&
                        a["executionStatus"]?.jsonPrimitive?.contentOrNull == "executed"
            })
            put("awaitingApproval", countWhere { a ->
                val disposition = a["runtime"]?.jsonObject?.get("disposition")?.jsonPrimitive?.contentOrNull
                disposition == "manual_review" || disposition == "proposal_review" || disposition == "high_risk_review"
            })
            put("analysisOnly", countWhere { a ->
                val disposition = a["runtime"]?.jsonObject?.get("disposition")?.jsonPrimitive?.contentOrNull
                val status = a["executionStatus"]?.jsonPrimitive?.contentOrNull
                disposition == "analysis_only" && status != "failed" && status != "failed_escalated"
            })
            put("blocked", countWhere { a ->
                val dispatchStatus = a["dispatchStatus"]?.jsonPrimitive?.contentOrNull
                val status = a["executionStatus"]?.jsonPrimitive?.contentOrNull
                dispatchStatus == "blocked" && status != "failed" && status != "failed_escalated"
            })
            put("ephemeral", countWhere { a ->
                a["runtime"]?.jsonObject?.get("disposition")?.jsonPrimitive?.contentOrNull == "ephemeral_preview"
            })
            put("failed", failedCount)
            put("escalated", countWhere { a ->
                val failureStatus = a["failure"]?.jsonObject?.get("status")?.jsonPrimitive?.contentOrNull
                val status = a["executionStatus"]?.jsonPrimitive?.contentOrNull
                failureStatus == "escalated" || status == "failed_escalated"
            })
        }

        val silentExecs = counts["silentExecutions"]?.jsonPrimitive?.intOrNull ?: 0
        val visibleExecs = counts["visibleExecutions"]?.jsonPrimitive?.intOrNull ?: 0
        val awaitingApproval = counts["awaitingApproval"]?.jsonPrimitive?.intOrNull ?: 0
        val analysisOnly = counts["analysisOnly"]?.jsonPrimitive?.intOrNull ?: 0
        val ephemeral = counts["ephemeral"]?.jsonPrimitive?.intOrNull ?: 0
        val failed = counts["failed"]?.jsonPrimitive?.intOrNull ?: 0

        val shouldSuppress = userActions.isNotEmpty() &&
                silentExecs > 0 &&
                visibleExecs == 0 &&
                awaitingApproval == 0 &&
                analysisOnly == 0 &&
                ephemeral == 0 &&
                failed == 0

        return buildJsonObject {
            summary.forEach { (key, value) ->
                if (key != "actions" && key != "counts" && key != "shouldSuppressAssistantMessage") {
                    put(key, value)
                }
            }
            put("actions", JsonArray(userActions))
            put("counts", counts)
            put("shouldSuppressAssistantMessage", shouldSuppress)
        }.toString()
    }

    /**
     * Convert action metadata into a proposal record for persistence.
     */
    fun toProposalRecord(moduleId: String, metadataJson: String, storedAt: String): String {
        val m = json.parseToJsonElement(metadataJson).jsonObject
        return buildJsonObject {
            put("id", m["proposal"]?.jsonObject?.get("id")?.jsonPrimitive?.contentOrNull ?: "")
            put("moduleId", moduleId)
            put("actionType", m["actionType"]?.jsonPrimitive?.contentOrNull ?: "")
            put("threadId", m["activeThreadId"]?.jsonPrimitive?.contentOrNull?.let { JsonPrimitive(it) } ?: JsonNull)
            put("executionId", m["execution"]?.jsonObject?.get("id")?.jsonPrimitive?.contentOrNull ?: "")
            put("dispatchStatus", m["dispatchStatus"]?.jsonPrimitive?.contentOrNull ?: "")
            put("executionMode", m["executionMode"]?.jsonPrimitive?.contentOrNull ?: "")
            put("historyMode", m["historyMode"]?.jsonPrimitive?.contentOrNull ?: "")
            m["approvalRequirement"]?.let { put("approvalRequirement", it) }
            put("patientScope", m["patientScope"]?.jsonPrimitive?.contentOrNull ?: "USER")
            put("mutatesState", m["mutatesState"]?.jsonPrimitive?.booleanOrNull ?: false)
            put("highRisk", m["highRisk"]?.jsonPrimitive?.booleanOrNull ?: false)
            m["proposal"]?.let { put("proposal", it) }
            m["proposalCard"]?.let { put("proposalCard", it) }
            m["runtime"]?.let { put("runtime", it) }
            put("createdAt", m["proposal"]?.jsonObject?.get("createdAt")?.jsonPrimitive?.contentOrNull ?: storedAt)
            put("storedAt", storedAt)
        }.toString()
    }

    /**
     * Convert action metadata into an execution record for persistence.
     */
    fun toExecutionRecord(moduleId: String, metadataJson: String, storedAt: String): String {
        val m = json.parseToJsonElement(metadataJson).jsonObject
        return buildJsonObject {
            put("id", m["execution"]?.jsonObject?.get("id")?.jsonPrimitive?.contentOrNull ?: "")
            put("moduleId", moduleId)
            put("actionType", m["actionType"]?.jsonPrimitive?.contentOrNull ?: "")
            put("threadId", m["activeThreadId"]?.jsonPrimitive?.contentOrNull?.let { JsonPrimitive(it) } ?: JsonNull)
            put("dispatchStatus", m["dispatchStatus"]?.jsonPrimitive?.contentOrNull ?: "")
            m["approvalRequirement"]?.let { put("approvalRequirement", it) }
            m["proposalCard"]?.let { put("proposalCard", it) }
            m["execution"]?.let { put("execution", it) }
            put("executedAt", m["execution"]?.jsonObject?.get("executedAt")?.jsonPrimitive?.contentOrNull ?: storedAt)
            put("storedAt", storedAt)
        }.toString()
    }
}
