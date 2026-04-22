package com.agnes.ara.core.domain.model.orchestration

import com.agnes.ara.core.domain.model.PatientScope
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

// ═══════════════════════════════════════════════════════════════════════════════
// Execution Record
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
enum class ExecutionStatus {
    @SerialName("executed") EXECUTED,
    @SerialName("deferred") DEFERRED,
    @SerialName("blocked") BLOCKED,
    @SerialName("analysis_only") ANALYSIS_ONLY,
    @SerialName("failed") FAILED,
    @SerialName("failed_escalated") FAILED_ESCALATED
}

@Serializable
data class ExecutionRecord(
    val id: String,
    val proposalId: String,
    /** moduleId | 'nexus' */
    val source: String,
    /** 0–5 */
    val autopilotLevel: Int,
    val executionMode: ExecutionMode,
    val historyMode: HistoryMode,
    val patientScope: PatientScope,
    val executedAt: String,
    val status: ExecutionStatus
)

// ═══════════════════════════════════════════════════════════════════════════════
// Execution Failure
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
enum class ExecutionFailureCode {
    @SerialName("TRANSIENT") TRANSIENT,
    @SerialName("PERMISSION") PERMISSION,
    @SerialName("PERMANENT") PERMANENT,
    @SerialName("MISSING_HANDLER") MISSING_HANDLER,
    @SerialName("UNKNOWN") UNKNOWN
}

@Serializable
enum class ExecutionFailureStatus {
    @SerialName("retry_scheduled") RETRY_SCHEDULED,
    @SerialName("failed") FAILED,
    @SerialName("escalated") ESCALATED,
    @SerialName("resolved") RESOLVED
}

@Serializable
data class ExecutionFailure(
    val id: String,
    val executionId: String,
    val proposalId: String,
    val moduleId: String,
    val actionType: String,
    val threadId: String?,
    val patientScope: PatientScope,
    val errorMessage: String,
    val errorCode: ExecutionFailureCode,
    val retryCount: Int,
    val maxRetries: Int,
    val failedAt: String,
    val nextRetryAt: String?,
    val escalatedAt: String?,
    val resolvedAt: String?,
    val status: ExecutionFailureStatus
)

// ═══════════════════════════════════════════════════════════════════════════════
// Silent History Entry (audit trail for SILENT-mode executions)
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
data class SilentHistoryEntry(
    val id: String,
    val executionId: String,
    val proposalId: String,
    val summary: String,
    /** moduleId | 'nexus' */
    val source: String,
    val timestamp: String,
    val patientScope: PatientScope
)
