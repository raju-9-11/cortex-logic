package com.agnes.ara.core.domain.service.orchestration

import kotlinx.serialization.json.*

/**
 * Pure utility functions extracted from OrchestrationHistoryService.
 * Generates autonomy explanations, determines history routing, and builds entries.
 * No I/O dependencies.
 */
object OrchestrationHistoryUtils {

    private val json = Json { ignoreUnknownKeys = true }

    /**
     * Generate a human-readable explanation of the autonomy posture for a given action.
     * @param metadataJson JSON with: autopilotLevel, executionMode, approvalRequirement, dispatchStatus, runtime
     */
    fun generateAutonomyExplanation(metadataJson: String): String {
        val m = json.parseToJsonElement(metadataJson).jsonObject
        val autopilotLevel = m["autopilotLevel"]?.jsonPrimitive?.intOrNull ?: 0
        val executionMode = m["executionMode"]?.jsonPrimitive?.contentOrNull ?: "manual"
        val runtime = m["runtime"]?.jsonObject
        val historyDestination = runtime?.get("historyDestination")?.jsonPrimitive?.contentOrNull ?: "standard"
        val shouldNotifyUser = runtime?.get("shouldNotifyUser")?.jsonPrimitive?.booleanOrNull ?: true
        val approvalRequirement = m["approvalRequirement"]?.jsonObject
        val approvalRequired = approvalRequirement?.get("required")?.jsonPrimitive?.booleanOrNull ?: false
        val approvalReason = approvalRequirement?.get("reason")?.jsonPrimitive?.contentOrNull ?: "none"
        val dispatchStatus = m["dispatchStatus"]?.jsonPrimitive?.contentOrNull ?: "approved"

        val executionLabel = when (executionMode) {
            "ghost" -> "Ghost Mode"
            "autonomous" -> "Autonomous Mode"
            "assisted" -> "Assisted Mode"
            "analysis_only" -> "Analysis-only Mode"
            else -> "Manual Mode"
        }
        val dispositionLabel = when (historyDestination) {
            "silent_audit" -> "routed to the silent audit log"
            "standard" -> "written to standard history"
            else -> "kept out of durable history"
        }
        val notificationLabel = if (shouldNotifyUser)
            "A user-facing notification remained enabled."
        else
            "No user-facing notification was sent."
        val approvalLabel = if (approvalRequired)
            "Approval remained required because ${approvalReason.replace("_", " ")}."
        else
            "No additional approval gate was required."

        return "Executed with $executionLabel at Autopilot L$autopilotLevel; outcome $dispositionLabel. " +
                "Dispatch status was ${dispatchStatus.replace("_", " ")}. $approvalLabel $notificationLabel"
    }

    /**
     * Whether a given action should be routed to silent history.
     */
    fun shouldRouteToSilentHistory(
        historyMode: String,
        executionStatus: String,
        historyDestination: String,
    ): Boolean =
        historyMode == "silent" &&
        executionStatus == "executed" &&
        historyDestination == "silent_audit"

    /**
     * Returns the assistant message channel ("visible" or "silent_history").
     */
    fun getAssistantMessageChannel(
        historyMode: String,
        executionStatus: String,
        historyDestination: String,
    ): String =
        if (shouldRouteToSilentHistory(historyMode, executionStatus, historyDestination))
            "silent_history" else "visible"

    /**
     * Build a silent history entry from action metadata.
     * @param moduleId The module that executed the action
     * @param metadataJson Full ActionOrchestrationMetadata JSON
     * @param suppressedMessages Optional list of messages that were suppressed
     * @return JSON string of the SilentHistoryEntry, or "null" if not applicable
     */
    fun buildSilentHistoryEntry(
        moduleId: String,
        metadataJson: String,
        suppressedMessages: List<String> = emptyList(),
    ): String {
        val m = json.parseToJsonElement(metadataJson).jsonObject
        val patientScope = m["patientScope"]?.jsonPrimitive?.contentOrNull ?: "USER"
        if (patientScope == "GUEST") return "null"

        val historyMode = m["historyMode"]?.jsonPrimitive?.contentOrNull ?: "standard"
        val execution = m["execution"]?.jsonObject
        val executionStatus = execution?.get("status")?.jsonPrimitive?.contentOrNull ?: ""
        val runtime = m["runtime"]?.jsonObject
        val historyDestination = runtime?.get("historyDestination")?.jsonPrimitive?.contentOrNull ?: "standard"

        if (!shouldRouteToSilentHistory(historyMode, executionStatus, historyDestination)) return "null"

        val executionId = execution?.get("id")?.jsonPrimitive?.contentOrNull ?: ""
        val proposalId = m["proposal"]?.jsonObject?.get("id")?.jsonPrimitive?.contentOrNull ?: ""
        val source = execution?.get("source")?.jsonPrimitive?.contentOrNull ?: "nexus"
        val executedAt = execution?.get("executedAt")?.jsonPrimitive?.contentOrNull ?: ""
        val proposalTitle = m["proposalCard"]?.jsonObject?.get("title")?.jsonPrimitive?.contentOrNull ?: "Action"

        val cleaned = suppressedMessages.map { it.trim() }.filter { it.isNotEmpty() }
        val summary = cleaned.firstOrNull() ?: "$proposalTitle executed in Ghost mode."

        return buildJsonObject {
            put("id", "silent.$executionId")
            put("executionId", executionId)
            put("proposalId", proposalId)
            put("summary", summary)
            put("source", source)
            put("timestamp", executedAt)
            put("patientScope", patientScope)
            putJsonObject("metadata") {
                put("moduleId", moduleId)
                put("actionType", m["actionType"]?.jsonPrimitive?.contentOrNull ?: "")
                put("activeThreadId", m["activeThreadId"]?.jsonPrimitive?.contentOrNull ?: JsonNull.toString())
                put("autopilotLevel", m["autopilotLevel"]?.jsonPrimitive?.intOrNull ?: 0)
                put("executionMode", m["executionMode"]?.jsonPrimitive?.contentOrNull ?: "")
                put("historyMode", historyMode)
                put("dispatchStatus", m["dispatchStatus"]?.jsonPrimitive?.contentOrNull ?: "")
                put("highRisk", m["highRisk"]?.jsonPrimitive?.booleanOrNull ?: false)
                put("runtimeAutonomy", runtime?.get("autonomy")?.jsonPrimitive?.contentOrNull ?: "")
                put("runtimeDisposition", runtime?.get("disposition")?.jsonPrimitive?.contentOrNull ?: "")
                put("historyDestination", historyDestination)
                put("willPersistHistory", runtime?.get("willPersistHistory")?.jsonPrimitive?.booleanOrNull ?: true)
                put("shouldNotifyUser", runtime?.get("shouldNotifyUser")?.jsonPrimitive?.booleanOrNull ?: true)
                put("autonomyExplanation", generateAutonomyExplanation(metadataJson))
                putJsonArray("hiddenMessages") { cleaned.forEach { add(it) } }
            }
        }.toString()
    }
}
