package com.agnes.ara.core.domain.model.orchestration

import com.agnes.ara.core.domain.model.PatientScope
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.buildJsonObject

// ═══════════════════════════════════════════════════════════════════════════════
// Execution and History Modes
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
enum class ExecutionMode {
    @SerialName("manual") MANUAL,
    @SerialName("assisted") ASSISTED,
    @SerialName("autonomous") AUTONOMOUS,
    @SerialName("ghost") GHOST,
    @SerialName("analysis_only") ANALYSIS_ONLY
}

@Serializable
enum class HistoryMode {
    @SerialName("standard") STANDARD,
    @SerialName("silent") SILENT
}

@Serializable
enum class RuntimeAutonomy {
    @SerialName("manual_lock") MANUAL_LOCK,
    @SerialName("proposal_first") PROPOSAL_FIRST,
    @SerialName("guided_assist") GUIDED_ASSIST,
    @SerialName("conditional_autonomy") CONDITIONAL_AUTONOMY,
    @SerialName("supervised_autonomy") SUPERVISED_AUTONOMY,
    @SerialName("ghost") GHOST
}

// ═══════════════════════════════════════════════════════════════════════════════
// Approval Requirement
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
enum class ApprovalReason {
    @SerialName("manual_level") MANUAL_LEVEL,
    @SerialName("explicit_gate") EXPLICIT_GATE,
    @SerialName("high_risk") HIGH_RISK,
    @SerialName("conflict") CONFLICT,
    @SerialName("guest_scope") GUEST_SCOPE,
    @SerialName("none") NONE
}

@Serializable
data class ApprovalRequirement(
    val required: Boolean,
    val reason: ApprovalReason
) {
    companion object {
        val None = ApprovalRequirement(required = false, reason = ApprovalReason.NONE)
        val ManualLevel = ApprovalRequirement(required = true, reason = ApprovalReason.MANUAL_LEVEL)
        val HighRisk = ApprovalRequirement(required = true, reason = ApprovalReason.HIGH_RISK)
        val GuestScope = ApprovalRequirement(required = true, reason = ApprovalReason.GUEST_SCOPE)
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Mutation Proposal
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
data class MutationProposal(
    val id: String,
    /** moduleId | 'nexus' */
    val source: String,
    val intent: String,
    /** NSV patch fields */
    val patch: JsonObject? = null,
    /** GlobalSoulVector key → delta float */
    val vectorMutations: Map<String, Float> = emptyMap(),
    val confidence: Float,
    val requiresApproval: Boolean = false,
    val patientScope: PatientScope,
    val createdAt: String,
    val metadata: JsonObject? = null
)

// ═══════════════════════════════════════════════════════════════════════════════
// Full Proposal Card (UI representation)
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
enum class ProposalStatus {
    @SerialName("draft") DRAFT,
    @SerialName("pending_approval") PENDING_APPROVAL,
    @SerialName("approved") APPROVED,
    @SerialName("executed") EXECUTED,
    @SerialName("deferred") DEFERRED,
    @SerialName("blocked") BLOCKED,
    @SerialName("failed") FAILED,
    @SerialName("incident") INCIDENT
}

@Serializable
data class FullProposalCard(
    val id: String,
    val proposalId: String,
    val title: String,
    val summary: String,
    /** Human-readable formatted soul impact, e.g. "recovery +0.5, stress -0.3" */
    val soulImpact: String? = null,
    /** moduleId | 'nexus' */
    val source: String,
    val status: ProposalStatus,
    val approvalRequirement: ApprovalRequirement,
    val executionMode: ExecutionMode,
    val historyMode: HistoryMode,
    /** True when this proposal was blocked by a higher-priority gate */
    val isVeto: Boolean = false,
    val vetoReason: String? = null
)
