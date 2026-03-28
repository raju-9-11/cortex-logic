package com.agnes.nexus.core.domain.model.orchestration

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

// ═══════════════════════════════════════════════════════════════════════════════
// Runtime Disposition
// Describes how an action will be handled at execution time.
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
enum class RuntimeDisposition {
    @SerialName("manual_review") MANUAL_REVIEW,
    @SerialName("proposal_review") PROPOSAL_REVIEW,
    @SerialName("high_risk_review") HIGH_RISK_REVIEW,
    @SerialName("incident_review") INCIDENT_REVIEW,
    @SerialName("analysis_only") ANALYSIS_ONLY,
    @SerialName("visible_execution") VISIBLE_EXECUTION,
    @SerialName("silent_execution") SILENT_EXECUTION,
    @SerialName("ephemeral_preview") EPHEMERAL_PREVIEW
}

// ═══════════════════════════════════════════════════════════════════════════════
// Runtime Semantics
// Computed from autopilot level — drives display labels, execution path.
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
data class RuntimeSemantics(
    val autopilotLevel: Int,
    val autonomy: RuntimeAutonomy,
    val disposition: RuntimeDisposition,
    /** Where execution history is stored: 'standard' | 'silent_audit' | 'none' */
    val historyDestination: String,
    val willPersistHistory: Boolean,
    val shouldNotifyUser: Boolean
) {
    companion object {
        /** Derive semantics from autopilot level. Mirrors web's OrchestrationOperatingModeService. */
        fun from(level: Int, isGuest: Boolean = false): RuntimeSemantics {
            if (isGuest) return RuntimeSemantics(
                autopilotLevel = level,
                autonomy = RuntimeAutonomy.MANUAL_LOCK,
                disposition = RuntimeDisposition.ANALYSIS_ONLY,
                historyDestination = "none",
                willPersistHistory = false,
                shouldNotifyUser = false
            )
            return when (level) {
                0 -> RuntimeSemantics(level, RuntimeAutonomy.MANUAL_LOCK, RuntimeDisposition.MANUAL_REVIEW, "standard", true, true)
                1 -> RuntimeSemantics(level, RuntimeAutonomy.PROPOSAL_FIRST, RuntimeDisposition.PROPOSAL_REVIEW, "standard", true, true)
                2 -> RuntimeSemantics(level, RuntimeAutonomy.GUIDED_ASSIST, RuntimeDisposition.PROPOSAL_REVIEW, "standard", true, true)
                3 -> RuntimeSemantics(level, RuntimeAutonomy.CONDITIONAL_AUTONOMY, RuntimeDisposition.VISIBLE_EXECUTION, "standard", true, true)
                4 -> RuntimeSemantics(level, RuntimeAutonomy.SUPERVISED_AUTONOMY, RuntimeDisposition.VISIBLE_EXECUTION, "standard", true, true)
                5 -> RuntimeSemantics(level, RuntimeAutonomy.GHOST, RuntimeDisposition.SILENT_EXECUTION, "silent_audit", true, false)
                else -> RuntimeSemantics(level, RuntimeAutonomy.GUIDED_ASSIST, RuntimeDisposition.PROPOSAL_REVIEW, "standard", true, true)
            }
        }

        /** Human-readable labels for each autopilot level (L0–L5). */
        fun labelFor(level: Int): String = when (level) {
            0 -> "L0 Manual lock"
            1 -> "L1 Proposal first"
            2 -> "L2 Guided assist"
            3 -> "L3 Conditional autonomy"
            4 -> "L4 Supervised autonomy"
            5 -> "L5 Ghost"
            else -> "L$level"
        }

        /** Short authority label for UI chips. */
        fun authorityLabel(level: Int, isGuest: Boolean = false): String {
            if (isGuest) return "Analysis-only"
            return when (level) {
                0, 1 -> "Approval-first"
                2 -> "Guided execution"
                3 -> "Conditional auto"
                4 -> "Auto execution"
                5 -> "Ghost authority"
                else -> "Guided execution"
            }
        }

        /** Summary chip label derived from shell state. */
        fun summaryLabel(
            level: Int,
            isGuest: Boolean,
            hasEscalated: Boolean,
            hasFailed: Boolean,
            awaitingApproval: Int
        ): String = when {
            isGuest -> "Guest analysis-only"
            hasEscalated -> "Incident posture"
            hasFailed -> "Failure review"
            awaitingApproval > 0 -> "Approval gated"
            level == 5 -> "Ghost silent"
            level >= 4 -> "Supervised auto"
            else -> labelFor(level)
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Interaction Decision
// Describes how the orchestrator decided to handle an interaction.
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
enum class InteractionKind {
    @SerialName("routing") ROUTING,
    @SerialName("planning") PLANNING,
    @SerialName("routine") ROUTINE
}

@Serializable
enum class InteractionDecisionMode {
    @SerialName("visible_proposal") VISIBLE_PROPOSAL,
    @SerialName("silent_execute") SILENT_EXECUTE,
    @SerialName("silent_delegate") SILENT_DELEGATE,
    @SerialName("defer") DEFER,
    @SerialName("blocked") BLOCKED
}

@Serializable
enum class InteractionDecisionReason {
    @SerialName("manual_level") MANUAL_LEVEL,
    @SerialName("low_confidence") LOW_CONFIDENCE,
    @SerialName("explicit_gate") EXPLICIT_GATE,
    @SerialName("high_risk") HIGH_RISK,
    @SerialName("conflict") CONFLICT,
    @SerialName("silent_unavailable") SILENT_UNAVAILABLE,
    @SerialName("auto_routing") AUTO_ROUTING,
    @SerialName("auto_execution") AUTO_EXECUTION,
    @SerialName("ghost_mode") GHOST_MODE
}

// ═══════════════════════════════════════════════════════════════════════════════
// Thread Routing & Planning Suggestion Drafts
// Richer suggestion objects stored per-thread in OrchestrationStore.
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
data class ThreadRoutingSuggestionDraft(
    /** Target module ID */
    val target: String,
    val reason: String? = null,
    val confidence: Float? = null,
    /** 'draft' = showing to user; 'deferred' = user dismissed for now */
    val state: String = "draft"
)

@Serializable
data class ThreadPlanningSuggestionDraft(
    val id: String,
    val title: String,
    val summary: String,
    val prompt: String,
    val confidence: Float? = null,
    /** 'draft' = showing to user; 'deferred' = user dismissed */
    val state: String = "draft",
    val targetModuleId: String? = null,
    val nodeCount: Int? = null,
    val supportingModuleIds: List<String> = emptyList(),
    val sourceSignalIds: List<String> = emptyList()
)

// ═══════════════════════════════════════════════════════════════════════════════
// Specialist Consultation Artifact
// Embedded in MasterThreadMessage for consultation_request / consultation_result messages.
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
enum class ConsultationStatus {
    @SerialName("completed") COMPLETED,
    @SerialName("unavailable") UNAVAILABLE,
    @SerialName("failed") FAILED
}

@Serializable
enum class ConsultationMode {
    @SerialName("state_only") STATE_ONLY,
    @SerialName("state_plus_persisted_data") STATE_PLUS_PERSISTED_DATA
}

@Serializable
data class SpecialistConsultationArtifact(
    val id: String,
    val threadId: String? = null,
    val sourceModuleId: String,
    val targetModuleId: String,
    val question: String,
    val mode: ConsultationMode = ConsultationMode.STATE_ONLY,
    val requestedAt: String,
    val resolvedAt: String = "",
    val status: ConsultationStatus = ConsultationStatus.COMPLETED,
    val summary: String = "",
    val responseText: String? = null,
    val errorMessage: String? = null
)

// ═══════════════════════════════════════════════════════════════════════════════
// Thread Execution Artifact
// Embedded in MasterThreadMessage for execution_request / execution_result messages.
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
data class ThreadExecutionArtifact(
    val id: String,
    val threadId: String? = null,
    val sourceModuleId: String,
    val actionType: String,
    val proposalId: String,
    val executionId: String,
    val requestedAt: String,
    val resolvedAt: String = "",
    val status: String = "executed",   // ExecutionRecord.status serialized value
    val summary: String = "",
    val patientScope: String = "USER",
    val errorMessage: String? = null,
    val retryable: Boolean = false,
    val retrySummary: String? = null,
    val retryPrompt: String? = null,
    val retryVisibleContent: String? = null,
    val retryOfPlanId: String? = null,
    val retryAttempt: Int? = null,
    val retryParentExecutionId: String? = null
)
