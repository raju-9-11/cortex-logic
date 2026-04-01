package com.agnes.nexus.core.domain.service.orchestration

/**
 * Pure utility functions extracted from OrchestrationExecutionService.
 * These functions classify errors, compute retry backoffs, and build failure status.
 * No I/O dependencies.
 */
object OrchestrationExecutionUtils {

    private val RETRY_BACKOFF_MS = longArrayOf(1000L, 4000L, 16000L)
    val MAX_RETRIES = RETRY_BACKOFF_MS.size

    /**
     * Classify an error message string into an ExecutionFailureCode.
     * @param errorMessage Concatenated error name + message, lowercased
     */
    fun classifyFailureCode(errorMessage: String): String {
        val message = errorMessage.lowercase()
        return when {
            message.contains("no handler for") -> "MISSING_HANDLER"
            message.contains("permission") || message.contains("unauthorized") ||
                    message.contains("forbidden") || message.contains("insufficient") -> "PERMISSION"
            message.contains("network") || message.contains("timeout") ||
                    message.contains("temporar") || message.contains("unavailable") ||
                    message.contains("deadline exceeded") -> "TRANSIENT"
            else -> "PERMANENT"
        }
    }

    /**
     * Determine next failure status based on error code and retry count.
     */
    fun nextFailureStatus(errorCode: String, retryCount: Int): String = when {
        errorCode == "MISSING_HANDLER" || errorCode == "PERMISSION" || errorCode == "PERMANENT" -> "escalated"
        errorCode != "TRANSIENT" -> "failed"
        retryCount < MAX_RETRIES -> "retry_scheduled"
        else -> "escalated"
    }

    /**
     * Get exponential backoff delay for a retry attempt.
     */
    fun getRetryBackoffMs(retryCount: Int): Long =
        RETRY_BACKOFF_MS[retryCount.coerceIn(0, RETRY_BACKOFF_MS.size - 1)]
}
