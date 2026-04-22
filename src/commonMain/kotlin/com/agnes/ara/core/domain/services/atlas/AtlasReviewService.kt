package com.agnes.ara.core.domain.services.atlas

import com.agnes.ara.core.domain.models.AtlasGoal
import com.agnes.ara.core.domain.models.AtlasHabit
import com.agnes.ara.core.domain.models.AtlasProfile
import com.agnes.ara.core.domain.models.AtlasTask
import com.agnes.ara.core.domain.services.SpineEventBus
import com.agnes.ara.core.domain.services.SpineEventPayload
import kotlinx.datetime.Clock
import kotlinx.datetime.DatePeriod
import kotlinx.datetime.Instant
import kotlinx.datetime.LocalDate
import kotlinx.datetime.TimeZone
import kotlinx.datetime.minus
import kotlinx.datetime.toLocalDateTime

/**
 * Atlas Review Service - Habit streak detection, goal progress analysis, and weekly insights.
 * 
 * Ported from web's AtlasReviewService for parity.
 */
class AtlasReviewService(
    private val eventBus: SpineEventBus
) {
    data class ReviewInsight(
        val type: String,
        val title: String,
        val description: String,
        val severity: String, // "info", "warning", "success"
        val relatedId: String? = null
    )

    data class WeeklyReviewSummary(
        val periodStart: String,
        val periodEnd: String,
        val completionRate: Double,
        val habitSummaries: List<HabitSummary>,
        val goalProgress: List<GoalProgressSummary>,
        val insights: List<ReviewInsight>,
        val nsvTrend: NsvTrendSummary
    )

    data class HabitSummary(
        val habitId: String,
        val habitTitle: String,
        val currentStreak: Int,
        val bestStreak: Int,
        val completionsThisWeek: Int,
        val status: String,
        val isAtRisk: Boolean
    )

    data class GoalProgressSummary(
        val goalId: String,
        val goalTitle: String,
        val progressPercent: Float,
        val velocity: Float, // Change in progress this week
        val deadline: String?,
        val isOverdue: Boolean,
        val daysUntilDeadline: Int?
    )

    data class NsvTrendSummary(
        val energyBudgetAvg: Double,
        val focusScoreAvg: Double,
        val planningLoadAvg: Double,
        val resilienceTrend: String // "improving", "stable", "declining"
    )

    /**
     * Perform audit on Atlas profile and emit relevant Spine events.
     */
    suspend fun performAudit(profile: AtlasProfile) {
        checkHabitStreaks(profile.habits)
        checkGoalProgress(profile.goals)
    }

    /**
     * Check for broken habit streaks and emit events.
     */
    suspend fun checkHabitStreaks(habits: List<AtlasHabit>) {
        val now = Clock.System.now()
        val today = now.toLocalDateTime(TimeZone.currentSystemDefault()).date

        habits.filter { it.status == "active" }.forEach { habit ->
            val isStreakBroken = isHabitStreakBroken(habit, today)
            
            if (isStreakBroken && habit.bestStreak >= 5) {
                // Emit HABIT_STREAK_BROKEN for significant streaks
                eventBus.emit(SpineEventPayload(
                    type = "HABIT_STREAK_BROKEN",
                    source = "atlas",
                    domain = "C",
                    data = mapOf(
                        "habitId" to habit.id,
                        "habitTitle" to habit.title,
                        "previousBest" to habit.bestStreak,
                        "currentStreak" to habit.currentStreak,
                        "streakDays" to habit.bestStreak, // For cascade rule
                        "timestamp" to now.toString(),
                        "moduleId" to "atlas",
                        "route" to "atlas",
                        "focusId" to "habit:${habit.id}",
                        "title" to "Atlas habit streak broken",
                        "note" to "${habit.title} needs attention in Atlas rhythms."
                    ),
                    priority = "alert"
                ))
            }
        }
    }

    /**
     * Check if a habit streak is broken based on last completion and frequency.
     */
    private fun isHabitStreakBroken(habit: AtlasHabit, today: LocalDate): Boolean {
        val lastCompleted = habit.lastCompleted?.let { parseDate(it) } ?: return false
        
        // If current streak is 0 but had a good best streak, it's broken
        if (habit.currentStreak == 0 && habit.bestStreak >= 3) {
            return true
        }

        // Check based on frequency
        val daysSinceCompletion = daysBetween(lastCompleted, today)
        
        return when (habit.frequency.lowercase()) {
            "daily" -> daysSinceCompletion > 1
            "weekdays" -> daysSinceCompletion > 3 // Allow for weekends
            "weekly" -> daysSinceCompletion > 10
            else -> daysSinceCompletion > 2
        }
    }

    /**
     * Check goal progress and emit events for missed deadlines.
     */
    suspend fun checkGoalProgress(goals: List<AtlasGoal>) {
        val now = Clock.System.now()
        val today = now.toLocalDateTime(TimeZone.currentSystemDefault()).date
        val todayStr = today.toString()

        goals.filter { it.status == "active" }.forEach { goal ->
            val deadline = goal.deadline?.take(10)
            
            if (deadline != null && deadline.isNotBlank() && deadline <= todayStr) {
                // Goal is overdue
                if (goal.progressPercent < 100f) {
                    eventBus.emit(SpineEventPayload(
                        type = "GOAL_MISSING_PROGRESS",
                        source = "atlas",
                        domain = "C",
                        data = mapOf(
                            "goalId" to goal.id,
                            "goalTitle" to goal.title,
                            "progressPercent" to goal.progressPercent,
                            "deadline" to deadline,
                            "daysOverdue" to daysBetween(parseDate(deadline) ?: today, today),
                            "timestamp" to now.toString(),
                            "moduleId" to "atlas",
                            "route" to "atlas",
                            "focusId" to "goal:${goal.id}",
                            "title" to "Atlas goal missing progress",
                            "note" to "${goal.title} is overdue and should be reviewed in Atlas backlog."
                        ),
                        priority = "alert"
                    ))
                }
            }
        }
    }

    /**
     * Generate weekly review summary with insights.
     */
    fun generateWeeklyReview(
        profile: AtlasProfile,
        periodStart: LocalDate,
        periodEnd: LocalDate,
        nsvHistory: List<Map<String, Double>>? = null
    ): WeeklyReviewSummary {
        val insights = mutableListOf<ReviewInsight>()
        
        // Task completion analysis
        val completionRate = calculateCompletionRate(profile.tasks, periodStart, periodEnd)
        if (completionRate < 0.5) {
            insights.add(ReviewInsight(
                type = "completion_low",
                title = "Low Completion Rate",
                description = "Only ${(completionRate * 100).toInt()}% of tasks completed this week. Consider reducing planned tasks.",
                severity = "warning"
            ))
        } else if (completionRate >= 0.8) {
            insights.add(ReviewInsight(
                type = "completion_high",
                title = "Great Week!",
                description = "${(completionRate * 100).toInt()}% completion rate. You're on track!",
                severity = "success"
            ))
        }

        // Habit analysis
        val habitSummaries = profile.habits.filter { it.status == "active" }.map { habit ->
            val isAtRisk = isHabitAtRisk(habit, periodEnd)
            
            if (isAtRisk) {
                insights.add(ReviewInsight(
                    type = "habit_at_risk",
                    title = "Habit at Risk: ${habit.title}",
                    description = "This habit hasn't been completed recently. Consider a simpler version.",
                    severity = "warning",
                    relatedId = habit.id
                ))
            }
            
            HabitSummary(
                habitId = habit.id,
                habitTitle = habit.title,
                currentStreak = habit.currentStreak,
                bestStreak = habit.bestStreak,
                completionsThisWeek = countHabitCompletions(habit, periodStart, periodEnd),
                status = habit.status,
                isAtRisk = isAtRisk
            )
        }

        // Goal analysis
        val goalProgress = profile.goals.filter { it.status == "active" }.map { goal ->
            val deadline = goal.deadline?.take(10)?.let { parseDate(it) }
            val isOverdue = deadline != null && deadline < periodEnd
            val daysUntilDeadline = deadline?.let { daysBetween(periodEnd, it) }
            
            if (isOverdue && goal.progressPercent < 100f) {
                insights.add(ReviewInsight(
                    type = "goal_overdue",
                    title = "Overdue Goal: ${goal.title}",
                    description = "This goal is past its deadline at ${goal.progressPercent.toInt()}% complete.",
                    severity = "warning",
                    relatedId = goal.id
                ))
            } else if (daysUntilDeadline != null && daysUntilDeadline <= 7 && goal.progressPercent < 50f) {
                insights.add(ReviewInsight(
                    type = "goal_deadline_approaching",
                    title = "Deadline Approaching: ${goal.title}",
                    description = "Only $daysUntilDeadline days until deadline with ${goal.progressPercent.toInt()}% complete.",
                    severity = "warning",
                    relatedId = goal.id
                ))
            }
            
            GoalProgressSummary(
                goalId = goal.id,
                goalTitle = goal.title,
                progressPercent = goal.progressPercent,
                velocity = 0f, // Would need historical data
                deadline = goal.deadline,
                isOverdue = isOverdue,
                daysUntilDeadline = daysUntilDeadline
            )
        }

        // NSV trend analysis (simplified without historical data)
        val nsvTrend = NsvTrendSummary(
            energyBudgetAvg = 5.0,
            focusScoreAvg = 5.0,
            planningLoadAvg = 5.0,
            resilienceTrend = "stable"
        )

        return WeeklyReviewSummary(
            periodStart = periodStart.toString(),
            periodEnd = periodEnd.toString(),
            completionRate = completionRate,
            habitSummaries = habitSummaries,
            goalProgress = goalProgress,
            insights = insights,
            nsvTrend = nsvTrend
        )
    }

    /**
     * Surgical Weekly Review — dense paragraph summaries per life domain.
     * Goal trajectory is only shown when confidence > 70% (spec §4.2).
     */
    data class SurgicalReviewSummary(
        val periodStart: String,
        val periodEnd: String,
        val workParagraph: String,
        val mentalParagraph: String,
        val physicalParagraph: String,
        val confidenceScore: Float,       // 0.0-1.0
        val trajectoryProjections: List<GoalTrajectory>  // Only populated when confidence > 0.70
    )

    data class GoalTrajectory(
        val goalId: String,
        val goalTitle: String,
        val probabilityPercent: Int,      // e.g. 85 = "85% likely to hit goal"
        val daysRemaining: Int?,
        val velocityLabel: String         // "On Track", "Behind", "Ahead"
    )

    /**
     * Build a Surgical Review from completed tasks, habits, and goal progress.
     * Trajectories are suppressed when confidenceScore <= 0.70 (spec requirement).
     */
    fun buildSurgicalReview(
        periodStart: String,
        periodEnd: String,
        completedTaskTitles: List<String>,
        completedHabitTitles: List<String>,
        weeklyGoalProgress: List<GoalProgressSummary>,
        physicalSessions: List<String>,
        confidenceScore: Float
    ): SurgicalReviewSummary {
        val workParagraph = if (completedTaskTitles.isEmpty()) {
            "No work items were completed this period."
        } else {
            "Completed ${completedTaskTitles.size} work items: ${completedTaskTitles.take(5).joinToString(", ")}${if (completedTaskTitles.size > 5) ", and ${completedTaskTitles.size - 5} more" else ""}."
        }

        val mentalParagraph = if (completedHabitTitles.isEmpty()) {
            "No mental habits tracked this period."
        } else {
            "Maintained ${completedHabitTitles.size} mental habits this week: ${completedHabitTitles.joinToString(", ")}."
        }

        val physicalParagraph = if (physicalSessions.isEmpty()) {
            "No physical sessions logged this period."
        } else {
            "Completed ${physicalSessions.size} physical sessions: ${physicalSessions.joinToString(", ")}."
        }

        // Confidence gate: only include trajectory when > 70%
        val trajectories = if (confidenceScore > 0.70f) {
            weeklyGoalProgress.mapNotNull { goal ->
                if (goal.progressPercent > 0) {
                    GoalTrajectory(
                        goalId = goal.goalId,
                        goalTitle = goal.goalTitle,
                        probabilityPercent = estimateProbability(goal),
                        daysRemaining = goal.daysUntilDeadline,
                        velocityLabel = when {
                            goal.velocity > 0.05f  -> "Ahead"
                            goal.velocity < -0.05f -> "Behind"
                            else                   -> "On Track"
                        }
                    )
                } else null
            }
        } else emptyList()

        return SurgicalReviewSummary(
            periodStart = periodStart,
            periodEnd = periodEnd,
            workParagraph = workParagraph,
            mentalParagraph = mentalParagraph,
            physicalParagraph = physicalParagraph,
            confidenceScore = confidenceScore,
            trajectoryProjections = trajectories
        )
    }

    private fun estimateProbability(goal: GoalProgressSummary): Int {
        val base = goal.progressPercent.coerceIn(0f, 100f).toInt()
        val velocityBonus = (goal.velocity * 100).toInt().coerceIn(-20, 20)
        return (base + velocityBonus).coerceIn(0, 99)
    }

    /**
     * Goal Projection Algorithm — linear regression on task velocity vs. time.
     *
     * Given a list of (dayOffset, progressPercent) data points, fits a least-squares
     * line to project when progress will reach 100% and computes a confidence score.
     *
     * @param velocityPoints  List of (dayIndex, progressPercent) — at least 2 required.
     * @param daysRemaining   Calendar days until deadline.
     * @return ProjectionResult with probability and projected completion day.
     */
    fun goalProjectionAlgorithm(
        velocityPoints: List<Pair<Int, Float>>,   // (dayIndex, progressPercent)
        daysRemaining: Int?
    ): ProjectionResult {
        if (velocityPoints.size < 2) {
            return ProjectionResult(probabilityPercent = 50, projectedDaysToComplete = null, rSquared = 0f)
        }

        val n = velocityPoints.size.toFloat()
        val sumX  = velocityPoints.sumOf { it.first.toDouble() }.toFloat()
        val sumY  = velocityPoints.sumOf { it.second.toDouble() }.toFloat()
        val sumXY = velocityPoints.sumOf { (x, y) -> x.toDouble() * y }.toFloat()
        val sumX2 = velocityPoints.sumOf { (x, _) -> x.toDouble() * x }.toFloat()

        val denom = n * sumX2 - sumX * sumX
        if (denom == 0f) return ProjectionResult(50, null, 0f)

        val slope     = (n * sumXY - sumX * sumY) / denom
        val intercept = (sumY - slope * sumX) / n

        // Project day when progress reaches 100%
        val projectedDay = if (slope > 0) ((100f - intercept) / slope).toInt() else null
        val lastDay = velocityPoints.last().first

        // R² — goodness of fit as confidence proxy
        val meanY = sumY / n
        val ssTot = velocityPoints.sumOf { (_, y) -> ((y - meanY) * (y - meanY)).toDouble() }.toFloat()
        val ssRes = velocityPoints.sumOf { (x, y) ->
            val predicted = slope * x + intercept
            ((y - predicted) * (y - predicted)).toDouble()
        }.toFloat()
        val rSquared = if (ssTot > 0) (1f - ssRes / ssTot).coerceIn(0f, 1f) else 0f

        // Probability: based on whether projection completes before deadline
        val probability = when {
            projectedDay == null -> 10
            daysRemaining == null -> 60
            projectedDay <= (lastDay + daysRemaining) -> {
                val margin = daysRemaining - (projectedDay - lastDay)
                (70 + (margin.toFloat() / daysRemaining * 25).toInt()).coerceIn(0, 99)
            }
            else -> {
                val overrun = projectedDay - lastDay - daysRemaining
                (50 - (overrun.toFloat() / daysRemaining * 40).toInt()).coerceIn(1, 49)
            }
        }

        return ProjectionResult(
            probabilityPercent = (probability * rSquared + probability * (1f - rSquared) * 0.5f).toInt().coerceIn(1, 99),
            projectedDaysToComplete = projectedDay?.let { it - lastDay },
            rSquared = rSquared
        )
    }

    data class ProjectionResult(
        val probabilityPercent: Int,        // 0-99
        val projectedDaysToComplete: Int?,  // null if slope ≤ 0 (stalling)
        val rSquared: Float                 // model fit quality — used as confidence proxy
    )

    private fun calculateCompletionRate(tasks: List<AtlasTask>, periodStart: LocalDate, periodEnd: LocalDate): Double {
        val periodTasks = tasks.filter { task ->
            val createdAt = task.createdAt?.let { parseDate(it) }
            val completedAt = task.completedAt?.let { parseDate(it) }
            
            // Task was active during this period
            (createdAt == null || createdAt <= periodEnd) &&
                (task.status == "done" && completedAt != null && completedAt >= periodStart && completedAt <= periodEnd) ||
                (task.status in setOf("active", "queued", "blocked"))
        }
        
        if (periodTasks.isEmpty()) return 1.0
        
        val completed = periodTasks.count { it.status == "done" }
        return completed.toDouble() / periodTasks.size
    }

    private fun isHabitAtRisk(habit: AtlasHabit, today: LocalDate): Boolean {
        val lastCompleted = habit.lastCompleted?.let { parseDate(it) } ?: return true
        val daysSince = daysBetween(lastCompleted, today)
        
        return when (habit.frequency.lowercase()) {
            "daily" -> daysSince > 2
            "weekdays" -> daysSince > 4
            "weekly" -> daysSince > 10
            else -> daysSince > 3
        }
    }

    private fun countHabitCompletions(habit: AtlasHabit, periodStart: LocalDate, periodEnd: LocalDate): Int {
        // Without detailed log history, estimate from streak
        val lastCompleted = habit.lastCompleted?.let { parseDate(it) }
        if (lastCompleted == null || lastCompleted < periodStart) return 0
        
        return when (habit.frequency.lowercase()) {
            "daily" -> minOf(habit.currentStreak, 7)
            "weekdays" -> minOf(habit.currentStreak, 5)
            "weekly" -> if (habit.currentStreak > 0) 1 else 0
            else -> minOf(habit.currentStreak, 3)
        }
    }

    private fun parseDate(dateStr: String): LocalDate? {
        return try {
            LocalDate.parse(dateStr.take(10))
        } catch (e: Exception) {
            null
        }
    }

    private fun daysBetween(start: LocalDate, end: LocalDate): Int {
        // Simple day count
        return (end.toEpochDays() - start.toEpochDays()).toInt()
    }
}
