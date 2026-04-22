package com.agnes.ara.core.domain.service.atlas

import com.agnes.ara.core.domain.model.AutopilotLevel
import com.agnes.ara.core.domain.services.AraHandoffService
import com.agnes.ara.core.domain.services.SpineEventBus
import com.agnes.ara.core.domain.services.SpineEventPayload

/**
 * Anti-Snowplow Protocol — prevents task avalanches from overwhelming the user.
 *
 * Bankruptcy:    Task deferred 3+ times → silently archived to Vault.
 * Friction Tax:  High-priority task deferred once → locked to top of next day.
 * Delegation:    Research-tagged task deferred → handed to Scout (at AutopilotLevel >= 3).
 *
 * Rules are evaluated in priority order: Bankruptcy > Delegation > Friction Tax.
 */
class AntiSnowplowService(
    private val eventBus: SpineEventBus,
    private val araHandoffService: AraHandoffService? = null
) {
    companion object {
        const val BANKRUPTCY_THRESHOLD = 3
        val RESEARCH_TAGS = setOf("research", "investigate", "study", "learn", "explore", "scout")
    }

    /**
     * Process a task deferral event.
     *
     * @param taskId          The deferred task ID
     * @param taskTitle       Human-readable title
     * @param deferCount      How many times this task has been deferred (post-increment)
     * @param isHighPriority  Whether the task is high-priority
     * @param semanticTags    Tags on the task
     * @param autopilotLevel  Current system autopilot level
     */
    suspend fun onTaskDeferred(
        taskId: String,
        taskTitle: String,
        deferCount: Int,
        isHighPriority: Boolean,
        semanticTags: List<String>,
        autopilotLevel: AutopilotLevel
    ) {
        when {
            // Bankruptcy: 3+ deferrals → silently archive to Vault + ping Agnes with BeliefNode probe
            deferCount >= BANKRUPTCY_THRESHOLD -> {
                eventBus.emit(SpineEventPayload(
                    type = "TASK_BANKRUPT_ARCHIVED",
                    source = "atlas",
                    priority = "info",
                    data = mapOf(
                        "taskId" to taskId,
                        "taskTitle" to taskTitle,
                        "deferCount" to deferCount,
                        "message" to "Task archived after $deferCount deferrals"
                    )
                ).toSpineEvent())
                // Ping Agnes: Is there a BeliefNode blocking this?
                eventBus.emit(SpineEventPayload(
                    type = "AGNES_BELIEF_PROBE",
                    source = "agnes",
                    priority = "alert",
                    data = mapOf(
                        "taskId" to taskId,
                        "taskTitle" to taskTitle,
                        "deferCount" to deferCount,
                        "probeQuestion" to "You've avoided '$taskTitle' $deferCount times. Is this a lack of bandwidth, or is there a belief (Fear of Failure?) blocking this?",
                        "suggestedNodeType" to "TRIGGER"
                    )
                ).toSpineEvent())
            }

            // Delegation: research-tagged task at sufficient autopilot → hand to Scout
            RESEARCH_TAGS.any { tag -> semanticTags.any { it.contains(tag, ignoreCase = true) } }
                && autopilotLevel.level >= AutopilotLevel.HYBRID_HIGH.level -> {
                araHandoffService?.delegate(
                    targetModule = "scout",
                    instruction = "Research delegated from Atlas Anti-Snowplow",
                    content = taskTitle
                )
                eventBus.emit(SpineEventPayload(
                    type = "TASK_DELEGATED_TO_SCOUT",
                    source = "atlas",
                    priority = "info",
                    data = mapOf(
                        "taskId" to taskId,
                        "taskTitle" to taskTitle,
                        "reason" to "research_delegation_autopilot_${autopilotLevel.level}"
                    )
                ).toSpineEvent())
            }

            // Friction Tax: high-priority deferred → lock to top of tomorrow's schedule
            isHighPriority -> {
                eventBus.emit(SpineEventPayload(
                    type = "TASK_FRICTION_TAX_APPLIED",
                    source = "atlas",
                    priority = "alert",
                    data = mapOf(
                        "taskId" to taskId,
                        "taskTitle" to taskTitle,
                        "deferCount" to deferCount,
                        "message" to "High-priority task locked to top of tomorrow's schedule"
                    )
                ).toSpineEvent())
            }
        }
    }
}
