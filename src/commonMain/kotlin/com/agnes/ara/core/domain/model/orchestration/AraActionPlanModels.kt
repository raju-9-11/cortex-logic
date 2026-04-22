package com.agnes.ara.core.domain.model.orchestration

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.buildJsonObject

// ═══════════════════════════════════════════════════════════════════════════════
// Action Plan Node
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
data class NexusActionPlanNode(
    val id: String,
    val intentId: String,
    /** Matches CommandIntentType strings from CommandIntelligenceService */
    val intentType: String,
    val label: String,
    val summary: String,
    val targetModuleId: String,
    val supportingModuleIds: List<String> = emptyList(),
    val actionType: String,
    val mutatesState: Boolean,
    val canRunInParallel: Boolean,
    val dependsOn: List<String> = emptyList(),
    val payload: JsonObject = buildJsonObject {}
)

// ═══════════════════════════════════════════════════════════════════════════════
// Dispatch Node (execution resolution)
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
enum class DispatchNodeStatus {
    @SerialName("resolved") RESOLVED,
    @SerialName("requires_followup") REQUIRES_FOLLOWUP
}

@Serializable
data class NexusActionPlanDispatchNode(
    val nodeId: String,
    val targetModuleId: String,
    val sourceActionType: String,
    val resolvedActionType: String?,
    val payload: JsonObject = buildJsonObject {},
    val dependsOn: List<String> = emptyList(),
    val status: DispatchNodeStatus,
    val reason: String? = null
)

// ═══════════════════════════════════════════════════════════════════════════════
// Action Plan
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
data class NexusActionPlan(
    val id: String,
    val sourceThreadId: String,
    val title: String,
    val summary: String,
    val primaryTargetModuleId: String,
    val supportingTargetModuleIds: List<String> = emptyList(),
    val requiresApproval: Boolean,
    val nodes: List<NexusActionPlanNode> = emptyList()
)

// ═══════════════════════════════════════════════════════════════════════════════
// Execution Packet (wire format dispatched to modules)
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
data class NexusActionPlanExecutionPacket(
    val type: String = "nexus_action_plan",
    val version: Int = 1,
    val planId: String,
    val retryOfPlanId: String? = null,
    val retryAttempt: Int? = null,
    val sourceThreadId: String,
    val title: String,
    val summary: String,
    val rawInput: String,
    val primaryTargetModuleId: String,
    val supportingTargetModuleIds: List<String> = emptyList(),
    val requiresApproval: Boolean,
    val nodes: List<NexusActionPlanNode> = emptyList(),
    val dispatchPlan: List<NexusActionPlanDispatchNode> = emptyList()
)
