package com.agnes.ara.core.domain.service.orchestration

/**
 * Per-action autopilot risk thresholds.
 * Actions at or above their threshold require explicit user approval.
 * Lower threshold = higher risk = requires more user oversight.
 */
object AutopilotActionPolicyService {

    private val ACTION_RISK_THRESHOLDS = mapOf(
        // Crisis / medical
        "crisis_flag" to 2,
        "initiate_crisis_recovery_protocol" to 2,
        "issue_clearance" to 3,
        "end_recovery_plan" to 3,
        // Destructive / irreversible
        "delete_goal" to 4,
        "delete_habit" to 4,
        "delete_task" to 4,
        "complete_goal" to 4,
        // Financial mutations
        "create_transaction" to 3,
        "add_transaction" to 3,
        "update_financial_plan" to 4,
        // Identity / profile
        "update_global_identity" to 3,
        "update_agnes_profile" to 4,
        "update_titan_profile" to 4,
    )

    /**
     * Returns true if the action is allowed to execute at the given autopilot level.
     * Returns false if the action requires user approval (autopilot >= threshold).
     */
    fun isAllowed(actionType: String, autopilotLevel: Int): Boolean {
        val threshold = ACTION_RISK_THRESHOLDS[actionType] ?: return true
        return autopilotLevel < threshold
    }

    fun getThreshold(actionType: String): Int? =
        ACTION_RISK_THRESHOLDS[actionType]
}
