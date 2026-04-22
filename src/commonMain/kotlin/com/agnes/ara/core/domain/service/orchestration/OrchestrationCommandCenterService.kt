package com.agnes.ara.core.domain.service.orchestration

import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

@Serializable
data class CommandCenterQueueItem(
    val id: String,
    val kind: String, // "approval" | "incident" | "debt" | "audit"
    val tone: String, // "amber" | "rose" | "cyan" | "violet"
    val title: String,
    val summary: String,
    val source: String,
    val timestamp: String?,
    val emphasis: String? = null,
)

@Serializable
data class CommandCenterQueueSnapshot(
    val count: Int,
    val items: List<CommandCenterQueueItem>,
)

@Serializable
data class CommandCenterSnapshot(
    val attentionCount: Int,
    val approvals: CommandCenterQueueSnapshot,
    val incidents: CommandCenterQueueSnapshot,
    val debt: CommandCenterQueueSnapshot,
    val audit: CommandCenterQueueSnapshot,
)

/**
 * Builds a command center snapshot from runtime data.
 * Pure computation — no I/O dependencies.
 */
object OrchestrationCommandCenterService {

    private val json = Json { ignoreUnknownKeys = true }

    private fun formatFailureEmphasis(failure: JsonObject): String {
        val status = failure["status"]?.jsonPrimitive?.contentOrNull ?: ""
        val errorCode = failure["errorCode"]?.jsonPrimitive?.contentOrNull ?: ""
        val retryCount = failure["retryCount"]?.jsonPrimitive?.intOrNull ?: 0
        val maxRetries = failure["maxRetries"]?.jsonPrimitive?.intOrNull ?: 3

        if (status == "retry_scheduled") return "Retry ${retryCount + 1}/$maxRetries"
        if (status == "escalated") {
            return if (errorCode == "PERMISSION") "Permission incident" else "Escalated"
        }
        return errorCode.replace("_", " ")
    }

    /**
     * Build a command center snapshot.
     * @param actionsJson JSON array of OrchestrationActionRuntimeEntry
     * @param failuresJson JSON array of PersistedExecutionFailureRecord
     * @param silentHistoryJson JSON array of SilentHistoryEntry
     * @param queueLimit Max items per queue (default 3)
     */
    fun buildSnapshot(
        actionsJson: String = "[]",
        failuresJson: String = "[]",
        silentHistoryJson: String = "[]",
        queueLimit: Int = 3,
    ): String {
        val actions = json.parseToJsonElement(actionsJson).jsonArray
        val allFailures = json.parseToJsonElement(failuresJson).jsonArray
            .map { it.jsonObject }
            .filter { it["status"]?.jsonPrimitive?.contentOrNull != "resolved" }
        val silentHistory = json.parseToJsonElement(silentHistoryJson).jsonArray.map { it.jsonObject }

        // Approvals
        val approvalItems = actions
            .map { it.jsonObject }
            .filter { it["dispatchStatus"]?.jsonPrimitive?.contentOrNull == "awaiting_approval" }
            .map { action ->
                val disposition = action["runtime"]?.jsonObject?.get("disposition")?.jsonPrimitive?.contentOrNull
                CommandCenterQueueItem(
                    id = "approval.${action["proposalId"]?.jsonPrimitive?.contentOrNull}",
                    kind = "approval",
                    tone = "amber",
                    title = action["label"]?.jsonPrimitive?.contentOrNull ?: "",
                    summary = action["summary"]?.jsonPrimitive?.contentOrNull ?: "",
                    source = action["source"]?.jsonPrimitive?.contentOrNull ?: "",
                    timestamp = action["executedAt"]?.jsonPrimitive?.contentOrNull,
                    emphasis = if (disposition == "high_risk_review") "High risk" else "Awaiting approval",
                )
            }

        // Incidents (escalated + failed)
        fun failureItems(status: String, kind: String, tone: String) = allFailures
            .filter { it["status"]?.jsonPrimitive?.contentOrNull == status }
            .map { failure ->
                CommandCenterQueueItem(
                    id = "$status.${failure["id"]?.jsonPrimitive?.contentOrNull}",
                    kind = kind,
                    tone = tone,
                    title = (failure["actionType"]?.jsonPrimitive?.contentOrNull ?: "").replace("_", " "),
                    summary = failure["errorMessage"]?.jsonPrimitive?.contentOrNull ?: "",
                    source = failure["moduleId"]?.jsonPrimitive?.contentOrNull ?: "",
                    timestamp = failure["nextRetryAt"]?.jsonPrimitive?.contentOrNull
                        ?: failure["escalatedAt"]?.jsonPrimitive?.contentOrNull
                        ?: failure["failedAt"]?.jsonPrimitive?.contentOrNull,
                    emphasis = formatFailureEmphasis(failure),
                )
            }

        val incidentItems = failureItems("escalated", "incident", "rose") +
                failureItems("failed", "incident", "rose")

        // Debt (retry_scheduled + blocked)
        val blockedDebtItems = actions
            .map { it.jsonObject }
            .filter { action ->
                val dispatch = action["dispatchStatus"]?.jsonPrimitive?.contentOrNull
                val execStatus = action["executionStatus"]?.jsonPrimitive?.contentOrNull
                dispatch == "blocked" && execStatus != "failed" && execStatus != "failed_escalated"
            }
            .map { action ->
                CommandCenterQueueItem(
                    id = "debt.blocked.${action["proposalId"]?.jsonPrimitive?.contentOrNull}",
                    kind = "debt",
                    tone = "violet",
                    title = action["label"]?.jsonPrimitive?.contentOrNull ?: "",
                    summary = action["summary"]?.jsonPrimitive?.contentOrNull ?: "",
                    source = action["source"]?.jsonPrimitive?.contentOrNull ?: "",
                    timestamp = action["executedAt"]?.jsonPrimitive?.contentOrNull,
                    emphasis = "Blocked by policy",
                )
            }

        val debtItems = failureItems("retry_scheduled", "debt", "violet") + blockedDebtItems

        // Audit
        val auditItems = silentHistory
            .sortedByDescending { it["timestamp"]?.jsonPrimitive?.contentOrNull ?: "" }
            .map { entry ->
                val meta = entry["metadata"]?.jsonObject
                val hiddenMessages = meta?.get("hiddenMessages")
                val firstHidden = if (hiddenMessages is JsonArray && hiddenMessages.isNotEmpty())
                    hiddenMessages[0].jsonPrimitive.contentOrNull else null
                CommandCenterQueueItem(
                    id = "audit.${entry["id"]?.jsonPrimitive?.contentOrNull}",
                    kind = "audit",
                    tone = "cyan",
                    title = entry["summary"]?.jsonPrimitive?.contentOrNull ?: "",
                    summary = firstHidden ?: entry["summary"]?.jsonPrimitive?.contentOrNull ?: "",
                    source = entry["source"]?.jsonPrimitive?.contentOrNull ?: "",
                    timestamp = entry["timestamp"]?.jsonPrimitive?.contentOrNull,
                    emphasis = "Silent audit",
                )
            }

        fun takeQueue(items: List<CommandCenterQueueItem>, limit: Int): CommandCenterQueueSnapshot {
            val sorted = items.sortedWith(compareByDescending<CommandCenterQueueItem> { it.timestamp ?: "" }
                .thenBy { it.title })
            return CommandCenterQueueSnapshot(
                count = sorted.size,
                items = sorted.take(limit),
            )
        }

        val approvals = takeQueue(approvalItems, queueLimit)
        val incidents = takeQueue(incidentItems, queueLimit)
        val debt = takeQueue(debtItems, queueLimit)
        val audit = takeQueue(auditItems, queueLimit)

        val snapshot = CommandCenterSnapshot(
            attentionCount = approvals.count + incidents.count + debt.count,
            approvals = approvals,
            incidents = incidents,
            debt = debt,
            audit = audit,
        )

        return Json.encodeToString(snapshot)
    }
}
