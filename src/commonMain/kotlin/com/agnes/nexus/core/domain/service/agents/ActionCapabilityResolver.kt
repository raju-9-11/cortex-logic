package com.agnes.nexus.core.domain.service.agents

/**
 * Resolves agent capabilities from action types.
 * Pure inference — no I/O dependencies.
 */
object ActionCapabilityResolver {

    private val ACTION_CAPABILITY_MAP = mapOf(
        "schedule_item" to listOf("schedule-mutation", "daily-planning"),
        "recovery_day" to listOf("recovery-planning", "schedule-mutation"),
        "update_schedule" to listOf("schedule-mutation"),
        "query_knowledge" to listOf("research"),
        "web_search" to listOf("research"),
        "deep_research" to listOf("research"),
        "execute_code" to listOf("technical-work"),
        "create_financial_plan" to listOf("financial-planning"),
        "create_financial_plan_request" to listOf("financial-planning"),
        "create_emotional_support_session" to listOf("emotional-support"),
        "create_workout_plan" to listOf("fitness-planning"),
        "create_medical_review" to listOf("medical-review"),
        "create_research_request" to listOf("research"),
        "create_technical_task" to listOf("technical-work"),
        "create_general_request" to listOf("general-orchestration"),
        "update_emotional_resilience" to listOf("emotional-support"),
        "update_stress_load" to listOf("emotional-support"),
        "update_mood_trend" to listOf("emotional-support"),
        "update_trauma_markers" to listOf("emotional-support"),
        "daily_plan" to listOf("daily-planning"),
        "flatten_schedule" to listOf("recovery-planning", "schedule-mutation"),
        // Habit management — owned by Atlas, accessible from any module via capability routing
        "create_habit"        to listOf("habit-management"),
        "update_habit"        to listOf("habit-management"),
        "delete_habit"        to listOf("habit-management"),
        "pause_habit"         to listOf("habit-management"),
        "complete_habit"      to listOf("habit-management"),
        "update_habit_streak" to listOf("habit-management"),
        "log_habit_metric"    to listOf("habit-management"),
    )

    fun resolve(actionType: String): List<String> {
        val normalized = actionType.trim().lowercase()
        if (normalized.isEmpty()) return emptyList()

        ACTION_CAPABILITY_MAP[normalized]?.let { return it }

        val inferred = mutableSetOf<String>()
        if (normalized.startsWith("query_") || "research" in normalized || "search" in normalized) {
            inferred.add("research")
        }
        if ("code" in normalized || "build" in normalized || "refactor" in normalized) {
            inferred.add("technical-work")
        }
        if ("financial" in normalized || "budget" in normalized || "transaction" in normalized) {
            inferred.add("financial-planning")
        }
        if ("emotional" in normalized || "mood" in normalized || "stress" in normalized) {
            inferred.add("emotional-support")
        }
        if ("plan" in normalized || "schedule" in normalized) {
            inferred.add("daily-planning")
        }

        return inferred.toList()
    }
}
