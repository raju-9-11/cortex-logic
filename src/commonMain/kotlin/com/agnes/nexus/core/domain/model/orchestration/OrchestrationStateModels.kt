package com.agnes.nexus.core.domain.model.orchestration

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

// ═══════════════════════════════════════════════════════════════════════════════
// Dispatch Status
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
enum class DispatchStatus {
    @SerialName("approved") APPROVED,
    @SerialName("awaiting_approval") AWAITING_APPROVAL,
    @SerialName("analysis_only") ANALYSIS_ONLY,
    @SerialName("blocked") BLOCKED,
    @SerialName("ephemeral") EPHEMERAL
}

// ═══════════════════════════════════════════════════════════════════════════════
// Execution Count Summary (displayed in Shell HUD + Ops workspace)
// ═══════════════════════════════════════════════════════════════════════════════

data class ExecutionCountSummary(
    /** Total executed (visible + silent) */
    val total: Int = 0,
    /** Standard visible executions (cyan) */
    val visibleExecutions: Int = 0,
    /** SILENT-mode executions (violet) */
    val silentExecutions: Int = 0,
    /** Awaiting approval (amber) */
    val awaitingApproval: Int = 0,
    /** Analysis-only dispatches (gray) */
    val analysisOnly: Int = 0,
    /** Blocked executions */
    val blocked: Int = 0,
    /** Ephemeral previews */
    val ephemeral: Int = 0,
    /** Failed executions */
    val failed: Int = 0,
    /** Escalated failures (rose, urgent) */
    val escalated: Int = 0
) {
    val hasActivity: Boolean get() = total > 0

    companion object {
        val Empty = ExecutionCountSummary()
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Orchestration Turn Runtime Summary
// ═══════════════════════════════════════════════════════════════════════════════

data class OrchestrationTurnRuntimeSummary(
    val turnId: String,
    val threadId: String,
    val moduleId: String = "",
    val autopilotLevel: Int = 2,
    val historyMode: HistoryMode = HistoryMode.STANDARD,
    val activeThreadId: String? = null,
    val counts: ExecutionCountSummary = ExecutionCountSummary.Empty,
    /** Whether the assistant message should be suppressed (ghost mode silent execute) */
    val shouldSuppressAssistantMessage: Boolean = false
)

// ═══════════════════════════════════════════════════════════════════════════════
// Shell Status (drives OrchestrationStatusChip display text + colour)
// ═══════════════════════════════════════════════════════════════════════════════

sealed class ShellStatus {
    /** System is idle and healthy */
    data object Steady : ShellStatus()

    /** Active routing suggestion toward [moduleId] */
    data class Routing(val moduleId: String) : ShellStatus()

    /** Active planning suggestion: [stepCount] steps via [moduleId] */
    data class Planning(val stepCount: Int, val moduleId: String) : ShellStatus()

    /** Routine proposal label (e.g. habit nudge) */
    data class Routine(val label: String) : ShellStatus()

    /** One or more escalated failures require attention */
    data class Escalated(val count: Int) : ShellStatus()

    /** Conflict is actively being resolved */
    data object ConflictActive : ShellStatus()

    /** Upload in progress */
    data object Uploading : ShellStatus()

    /** Waiting for a downstream module to respond */
    data object WaitingForModule : ShellStatus()
}
