package com.agnes.nexus.core.domain.service.orchestration

import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

@Serializable
data class RolloutSnapshot(
    val parseSuccesses: Int = 0,
    val parseClarifications: Int = 0,
    val parsedRouteHits: Int = 0,
    val capabilityRouteHits: Int = 0,
    val keywordRouteHits: Int = 0,
    val defaultRouteHits: Int = 0,
    val planningBuilds: Int = 0,
    val planningSkips: Int = 0,
    val approvalInterruptions: Int = 0,
    val executionFailures: Int = 0,
    val executionFailureByAction: Map<String, Int> = emptyMap(),
)

/**
 * Telemetry counters for orchestration routing/planning/runtime decisions.
 */
object OrchestrationRolloutService {

    private var snapshot = RolloutSnapshot()

    private val json = Json { ignoreUnknownKeys = true }

    fun recordParsedCommand(requiresClarification: Boolean) {
        snapshot = if (requiresClarification) {
            snapshot.copy(parseClarifications = snapshot.parseClarifications + 1)
        } else {
            snapshot.copy(parseSuccesses = snapshot.parseSuccesses + 1)
        }
    }

    fun recordRoutingDecision(reason: String) {
        snapshot = when {
            reason.startsWith("command:") -> snapshot.copy(parsedRouteHits = snapshot.parsedRouteHits + 1)
            reason.startsWith("capability:") -> snapshot.copy(capabilityRouteHits = snapshot.capabilityRouteHits + 1)
            reason.startsWith("matched:") -> snapshot.copy(keywordRouteHits = snapshot.keywordRouteHits + 1)
            else -> snapshot.copy(defaultRouteHits = snapshot.defaultRouteHits + 1)
        }
    }

    fun recordPlanningAttempt(built: Boolean) {
        snapshot = if (built) {
            snapshot.copy(planningBuilds = snapshot.planningBuilds + 1)
        } else {
            snapshot.copy(planningSkips = snapshot.planningSkips + 1)
        }
    }

    /**
     * Record runtime summary counts from a turn.
     * @param runtimeSummaryJson JSON with fields: counts.awaitingApproval, actions[].executionStatus, actions[].actionType
     */
    fun recordRuntimeSummary(runtimeSummaryJson: String) {
        val summary = json.parseToJsonElement(runtimeSummaryJson).jsonObject
        val counts = summary["counts"]?.jsonObject
        val awaitingApproval = counts?.get("awaitingApproval")?.jsonPrimitive?.intOrNull ?: 0

        var failureCount = 0
        val failureByAction = snapshot.executionFailureByAction.toMutableMap()

        val actions = summary["actions"]?.jsonArray ?: JsonArray(emptyList())
        for (action in actions) {
            val actionObj = action.jsonObject
            val status = actionObj["executionStatus"]?.jsonPrimitive?.contentOrNull ?: ""
            if (status != "failed" && status != "failed_escalated") continue
            failureCount += 1
            val actionType = actionObj["actionType"]?.jsonPrimitive?.contentOrNull ?: "unknown"
            failureByAction[actionType] = (failureByAction[actionType] ?: 0) + 1
        }

        snapshot = snapshot.copy(
            approvalInterruptions = snapshot.approvalInterruptions + awaitingApproval,
            executionFailures = snapshot.executionFailures + failureCount,
            executionFailureByAction = failureByAction,
        )
    }

    fun getSnapshot(): RolloutSnapshot = snapshot.copy(
        executionFailureByAction = snapshot.executionFailureByAction.toMap()
    )

    fun getSnapshotJson(): String = Json.encodeToString(getSnapshot())

    fun resetForTests() { snapshot = RolloutSnapshot() }
}
