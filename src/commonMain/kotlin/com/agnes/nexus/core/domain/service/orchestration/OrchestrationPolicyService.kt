package com.agnes.nexus.core.domain.service.orchestration

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*

@Serializable
data class ApprovalRequirement(
    val required: Boolean,
    val reason: String, // "manual_level" | "explicit_gate" | "high_risk" | "conflict" | "guest_scope" | "none"
)

@Serializable
data class ExecutionPolicy(
    val requiresApproval: ApprovalRequirement,
    val executionMode: String, // "manual" | "assisted" | "autonomous" | "ghost" | "analysis_only"
    val historyMode: String,   // "standard" | "silent"
    val canMutateState: Boolean,
)

/**
 * Orchestration policy service — sorts proposals by precedence and resolves execution policies.
 */
object OrchestrationPolicyService {

    private val json = Json { ignoreUnknownKeys = true }

    private fun hasMutations(proposal: JsonObject): Boolean {
        val patch = proposal["patch"]?.jsonObject
        if (patch != null && patch.isNotEmpty()) return true
        val vectorMutations = proposal["vectorMutations"]?.jsonObject
        if (vectorMutations != null && vectorMutations.isNotEmpty()) return true
        val metadata = proposal["metadata"]?.jsonObject
        if (metadata?.get("mutatesState")?.jsonPrimitive?.booleanOrNull == true) return true
        return false
    }

    /**
     * Sort proposals by agent precedence → confidence desc → createdAt asc.
     * @param proposalsJson JSON array of MutationProposal objects
     * @return Sorted JSON array
     */
    fun sortProposals(proposalsJson: String): String {
        val proposals = json.parseToJsonElement(proposalsJson).jsonArray.toMutableList()
        proposals.sortWith(Comparator { left, right ->
            val leftObj = left.jsonObject
            val rightObj = right.jsonObject
            val precedence = OrchestrationContracts.compareAgentPrecedence(
                leftObj["source"]?.jsonPrimitive?.contentOrNull ?: "",
                rightObj["source"]?.jsonPrimitive?.contentOrNull ?: "",
            )
            if (precedence != 0) return@Comparator precedence
            val leftConf = leftObj["confidence"]?.jsonPrimitive?.doubleOrNull ?: 0.0
            val rightConf = rightObj["confidence"]?.jsonPrimitive?.doubleOrNull ?: 0.0
            if (leftConf != rightConf) return@Comparator rightConf.compareTo(leftConf)
            val leftCreated = leftObj["createdAt"]?.jsonPrimitive?.contentOrNull ?: ""
            val rightCreated = rightObj["createdAt"]?.jsonPrimitive?.contentOrNull ?: ""
            leftCreated.compareTo(rightCreated)
        })
        return JsonArray(proposals).toString()
    }

    /**
     * Returns the winning (first after sort) proposal, or null JSON if empty.
     */
    fun resolveWinningProposal(proposalsJson: String): String {
        val proposals = json.parseToJsonElement(proposalsJson).jsonArray
        if (proposals.isEmpty()) return "null"
        val sorted = json.parseToJsonElement(sortProposals(proposalsJson)).jsonArray
        return sorted[0].toString()
    }

    /**
     * Determine execution policy for a proposal at a given autopilot level.
     */
    fun getExecutionPolicy(
        autopilotLevel: Int,
        proposalJson: String,
        hasConflict: Boolean = false,
        highRisk: Boolean = false,
    ): ExecutionPolicy {
        val proposal = json.parseToJsonElement(proposalJson).jsonObject
        val patientScope = proposal["patientScope"]?.jsonPrimitive?.contentOrNull ?: "USER"
        val mutatesState = hasMutations(proposal)
        val requiresApproval = proposal["requiresApproval"]?.jsonPrimitive?.booleanOrNull ?: false
        val confidence = proposal["confidence"]?.jsonPrimitive?.doubleOrNull ?: 0.5

        if (patientScope == "GUEST") {
            return ExecutionPolicy(
                requiresApproval = ApprovalRequirement(false, "guest_scope"),
                executionMode = "analysis_only",
                historyMode = "standard",
                canMutateState = false,
            )
        }

        if (!mutatesState) {
            return ExecutionPolicy(
                requiresApproval = ApprovalRequirement(false, "none"),
                executionMode = when {
                    autopilotLevel >= 5 -> "ghost"
                    autopilotLevel >= 3 -> "autonomous"
                    else -> "assisted"
                },
                historyMode = if (autopilotLevel >= 5) "silent" else "standard",
                canMutateState = false,
            )
        }

        if (requiresApproval) {
            return ExecutionPolicy(
                requiresApproval = ApprovalRequirement(true, "explicit_gate"),
                executionMode = "manual",
                historyMode = "standard",
                canMutateState = false,
            )
        }

        if (autopilotLevel <= 2) {
            return ExecutionPolicy(
                requiresApproval = ApprovalRequirement(true, "manual_level"),
                executionMode = if (autopilotLevel == 0) "manual" else "assisted",
                historyMode = "standard",
                canMutateState = false,
            )
        }

        if (hasConflict) {
            return ExecutionPolicy(
                requiresApproval = ApprovalRequirement(true, "conflict"),
                executionMode = "manual",
                historyMode = "standard",
                canMutateState = false,
            )
        }

        if (highRisk) {
            return ExecutionPolicy(
                requiresApproval = ApprovalRequirement(autopilotLevel < 5, if (autopilotLevel < 5) "high_risk" else "none"),
                executionMode = if (autopilotLevel >= 5) "ghost" else "manual",
                historyMode = if (autopilotLevel >= 5) "silent" else "standard",
                canMutateState = autopilotLevel >= 5,
            )
        }

        if (autopilotLevel == 3) {
            val canAutoExecute = confidence >= 0.85
            return ExecutionPolicy(
                requiresApproval = ApprovalRequirement(!canAutoExecute, if (canAutoExecute) "none" else "manual_level"),
                executionMode = if (canAutoExecute) "autonomous" else "assisted",
                historyMode = "standard",
                canMutateState = canAutoExecute,
            )
        }

        if (autopilotLevel == 4) {
            val canAutoExecute = confidence >= 0.7
            return ExecutionPolicy(
                requiresApproval = ApprovalRequirement(!canAutoExecute, if (canAutoExecute) "none" else "manual_level"),
                executionMode = if (canAutoExecute) "autonomous" else "assisted",
                historyMode = "standard",
                canMutateState = canAutoExecute,
            )
        }

        // Level 5 (ghost)
        return ExecutionPolicy(
            requiresApproval = ApprovalRequirement(false, "none"),
            executionMode = "ghost",
            historyMode = "silent",
            canMutateState = true,
        )
    }

    fun getExecutionPolicyJson(
        autopilotLevel: Int,
        proposalJson: String,
        hasConflict: Boolean = false,
        highRisk: Boolean = false,
    ): String = json.encodeToString(ExecutionPolicy.serializer(), getExecutionPolicy(autopilotLevel, proposalJson, hasConflict, highRisk))
}
