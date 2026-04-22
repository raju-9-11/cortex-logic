package com.agnes.ara.core.domain.services.atlas

import com.agnes.ara.core.domain.models.AtlasProfile
import com.agnes.ara.core.domain.models.GlobalProjection
import com.agnes.ara.core.domain.models.NeuralStateVector
import com.agnes.ara.core.domain.services.atlas.AtlasPromptBuilder.PlanningAlert
import com.agnes.ara.core.domain.services.atlas.AtlasPromptBuilder.PlanningDigest
import kotlinx.datetime.Clock
import kotlinx.datetime.Instant
import kotlin.math.roundToInt

/**
 * Atlas Proactive Intelligence Service
 *
 * Aggregates computed intelligence from the planning engine into a compact
 * PlanningDigest suitable for AI context injection. Pure functions, no side effects.
 *
 * Ported from web's `atlas-proactive-service.ts` (304 lines → KMP commonMain).
 */
object AtlasProactiveService {

    // ─── Severity ordering ───────────────────────────────────────────────────

    private val SEVERITY_RANK = mapOf(
        "critical" to 3,
        "warning" to 2,
        "info" to 1
    )

    // ─── Alert generators ────────────────────────────────────────────────────

    private fun deadlineAlerts(
        profile: AtlasProfile,
        now: Instant
    ): List<PlanningAlert> {
        val conflicts = AtlasPlanningEngine.detectConflicts(profile, 7, now)
        val alerts = mutableListOf<PlanningAlert>()

        for (convergence in conflicts.deadlineConvergence) {
            val taskTitles = convergence.taskIds
                .take(3)
                .map { id ->
                    val task = profile.tasks.find { it.id == id }
                    if (task != null) "\"${task.title.take(30)}\"" else id.take(12)
                }
                .joinToString(", ")
            val extra = if (convergence.count > 3) " +${convergence.count - 3} more" else ""

            alerts.add(PlanningAlert(
                id = "deadline-${convergence.date}",
                category = "deadline",
                severity = if (convergence.count >= 3) "critical" else "warning",
                title = "${convergence.count} deadlines converge on ${convergence.date}",
                detail = "Tasks: $taskTitles$extra",
                actionHint = "Defer or reschedule lower-priority tasks to spread the load."
            ))
        }

        for (violation in conflicts.recoveryViolations.take(2)) {
            alerts.add(PlanningAlert(
                id = "recovery-violation-${violation.taskTitle.take(20)}",
                category = "deadline",
                severity = "warning",
                title = "\"${violation.taskTitle.take(30)}\" overlaps recovery window",
                detail = "Conflicts with \"${violation.windowTitle}\". Recovery windows are inviolable.",
                actionHint = "Reschedule the task outside the recovery window."
            ))
        }

        return alerts
    }

    private fun capacityAlerts(
        profile: AtlasProfile,
        nsv: NeuralStateVector?,
        now: Instant
    ): List<PlanningAlert> {
        val forecast = AtlasPlanningEngine.forecastLoad(profile, nsv, 3, now)
        val alerts = mutableListOf<PlanningAlert>()

        val overloadedDays = forecast.filter { it.overloaded }
        val consecutiveOverloaded = forecast.indices.fold(0) { max, i ->
            if (!forecast[i].overloaded) return@fold max
            var streak = 1
            var j = i + 1
            while (j < forecast.size && forecast[j].overloaded) {
                streak++
                j++
            }
            maxOf(max, streak)
        }

        if (consecutiveOverloaded >= 2) {
            val worstDay = overloadedDays.sortedBy { it.headroom }.first()
            alerts.add(PlanningAlert(
                id = "capacity-consecutive-overload",
                category = "capacity",
                severity = "critical",
                title = "$consecutiveOverloaded consecutive days overloaded",
                detail = "Worst: ${worstDay.date} (demand ${worstDay.totalDemand} vs capacity ${worstDay.estimatedCapacity})",
                actionHint = "Defer non-essential tasks or flatten the schedule."
            ))
        } else if (overloadedDays.isNotEmpty()) {
            val day = overloadedDays.first()
            alerts.add(PlanningAlert(
                id = "capacity-overload-${day.date}",
                category = "capacity",
                severity = "warning",
                title = "Capacity overload predicted for ${day.date}",
                detail = "Demand: ${day.totalDemand} vs capacity: ${day.estimatedCapacity} (headroom: ${day.headroom})",
                actionHint = "Consider deferring the highest-energy task."
            ))
        }

        return alerts
    }

    private fun habitAlerts(
        profile: AtlasProfile,
        nsv: NeuralStateVector?,
        now: Instant
    ): List<PlanningAlert> {
        val alerts = mutableListOf<PlanningAlert>()
        val forecast = AtlasPlanningEngine.forecastLoad(profile, nsv, 1, now)
        val todayOverloaded = forecast.isNotEmpty() && forecast[0].overloaded
        val nowMs = now.toEpochMilliseconds()

        for (habit in profile.habits) {
            if (habit.status != "active" || habit.lastCompleted.isNullOrBlank()) continue
            if (habit.currentStreak == 0) continue

            val lastCompletedMs = try {
                Instant.parse(habit.lastCompleted).toEpochMilliseconds()
            } catch (_: Exception) {
                try {
                    kotlinx.datetime.LocalDate.parse(habit.lastCompleted.take(10))
                        .let { Instant.parse("${it}T00:00:00Z").toEpochMilliseconds() }
                } catch (_: Exception) { continue }
            }

            val hoursSinceLastCompleted = (nowMs - lastCompletedMs).toDouble() / 3_600_000

            val thresholdHours = when (habit.frequency) {
                "daily", "weekdays" -> 20.0
                "weekly" -> 144.0
                else -> 20.0
            }

            if (hoursSinceLastCompleted >= thresholdHours) {
                val isUrgent = todayOverloaded || hoursSinceLastCompleted > thresholdHours * 1.2
                val mvvHint = habit.minimumViableVersion.takeIf { it.isNotBlank() }
                    ?.let { "Try the minimum viable version: \"${it.take(50)}\"" }

                alerts.add(PlanningAlert(
                    id = "habit-risk-${habit.id}",
                    category = "habit",
                    severity = if (isUrgent) "warning" else "info",
                    title = "\"${habit.title.take(30)}\" streak at risk",
                    detail = "${hoursSinceLastCompleted.roundToInt()}hrs since last completion (streak: ${habit.currentStreak})${if (todayOverloaded) " — high load today" else ""}",
                    actionHint = mvvHint ?: "Complete before end of day to preserve streak."
                ))
            }
        }

        return alerts
    }

    private fun goalAlerts(
        profile: AtlasProfile,
        now: Instant
    ): List<PlanningAlert> {
        val alerts = mutableListOf<PlanningAlert>()
        val velocities = AtlasPlanningEngine.computeGoalVelocities(profile.goals, profile.tasks, now)

        for (v in velocities) {
            if (v.riskLevel == "stalled") {
                alerts.add(PlanningAlert(
                    id = "goal-stalled-${v.goalId}",
                    category = "goal",
                    severity = "critical",
                    title = "Goal \"${v.title.take(30)}\" is stalled",
                    detail = "${v.completedMilestones}/${v.totalMilestones} milestones in ${v.daysElapsed} days. ${v.linkedTaskCount} linked tasks (${v.linkedTasksDone} done).",
                    actionHint = "Create a concrete next-action task or re-scope the goal."
                ))
            } else if (v.riskLevel == "behind") {
                alerts.add(PlanningAlert(
                    id = "goal-behind-${v.goalId}",
                    category = "goal",
                    severity = "warning",
                    title = "Goal \"${v.title.take(30)}\" is falling behind",
                    detail = "Velocity: ${v.actualVelocity} ms/week vs ${v.requiredVelocity} required. ${v.daysRemaining ?: "?"} days remaining.",
                    actionHint = "Accelerate by breaking the next milestone into smaller tasks."
                ))
            }
        }

        return alerts
    }

    private fun coherenceAlerts(
        profile: AtlasProfile
    ): List<PlanningAlert> {
        val alerts = mutableListOf<PlanningAlert>()
        val graph = AtlasPlanningEngine.buildDependencyGraph(profile.tasks)
        val activeTasks = profile.tasks.filter { it.status != "done" }

        // Orphan task drift
        if (activeTasks.isNotEmpty()) {
            val orphanRatio = graph.orphanTasks.size.toDouble() / activeTasks.size
            if (orphanRatio > 0.3 && graph.orphanTasks.size >= 3) {
                alerts.add(PlanningAlert(
                    id = "coherence-orphan-drift",
                    category = "coherence",
                    severity = "warning",
                    title = "${graph.orphanTasks.size} tasks not linked to any goal",
                    detail = "${(orphanRatio * 100).roundToInt()}% of active tasks are orphaned \u2014 work may be drifting from goals.",
                    actionHint = "Link orphan tasks to active goals or archive them."
                ))
            }
        }

        // Cycle detection
        if (graph.cycleDetected) {
            alerts.add(PlanningAlert(
                id = "coherence-cycle",
                category = "coherence",
                severity = "critical",
                title = "Dependency cycle detected",
                detail = "Circular dependency in task graph \u2014 some tasks can never unblock.",
                actionHint = "Review and break the dependency cycle."
            ))
        }

        // Stale goals: active goals with 0 active linked tasks
        for (goal in profile.goals) {
            if (goal.status != "active") continue
            val linkedActive = activeTasks.filter { it.goalId == goal.id }
            if (linkedActive.isEmpty() && goal.progressPercent < 100f) {
                alerts.add(PlanningAlert(
                    id = "coherence-stale-goal-${goal.id}",
                    category = "coherence",
                    severity = "info",
                    title = "Goal \"${goal.title.take(30)}\" has no active tasks",
                    detail = "${goal.progressPercent.toInt()}% complete but no tasks driving it forward.",
                    actionHint = "Create a next-action task for this goal."
                ))
            }
        }

        return alerts
    }

    // ─── Capacity summary builder ────────────────────────────────────────────

    private fun buildCapacitySummary(
        profile: AtlasProfile,
        soul: GlobalProjection?
    ): String {
        val snapshot = AtlasBlueprintService.computeQuickCapacitySnapshot(profile, soul)
            ?: return "Capacity data unavailable."

        val stateLabel = snapshot.state.uppercase()
        val headroomSign = if (snapshot.headroom >= 0) "+" else ""
        return "State: $stateLabel | Safe capacity: ${snapshot.safeCapacity.roundToInt()} | " +
            "Demand: ${snapshot.plannedDemand.roundToInt()} | " +
            "Headroom: $headroomSign${snapshot.headroom.roundToInt()} | " +
            "Load ratio: ${snapshot.loadRatio}"
    }

    // ═════════════════════════════════════════════════════════════════════════
    // Main digest generator
    // ═════════════════════════════════════════════════════════════════════════

    /**
     * Generate a planning digest by aggregating alerts from 5 generators,
     * sorted by severity, capped at 5 alerts.
     */
    fun generatePlanningDigest(
        profile: AtlasProfile,
        soul: GlobalProjection?,
        now: Instant = Clock.System.now()
    ): PlanningDigest {
        val nsv = soul?.crossFunctionalState

        // Collect all alerts
        val allAlerts = mutableListOf<PlanningAlert>().apply {
            addAll(deadlineAlerts(profile, now))
            addAll(capacityAlerts(profile, nsv, now))
            addAll(habitAlerts(profile, nsv, now))
            addAll(goalAlerts(profile, now))
            addAll(coherenceAlerts(profile))
        }

        // Sort by severity (critical first), cap at 5
        allAlerts.sortByDescending { SEVERITY_RANK[it.severity] ?: 0 }
        val alerts = allAlerts.take(5)

        val capacitySummary = buildCapacitySummary(profile, soul)
        val topRisk = alerts.firstOrNull()?.title

        return PlanningDigest(
            alerts = alerts,
            capacitySummary = capacitySummary,
            topRisk = topRisk,
            generatedAt = now.toString()
        )
    }
}
