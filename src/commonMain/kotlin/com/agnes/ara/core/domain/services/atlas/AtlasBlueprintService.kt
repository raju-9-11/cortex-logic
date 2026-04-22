package com.agnes.ara.core.domain.services.atlas

import com.agnes.ara.core.domain.models.AtlasGoal
import com.agnes.ara.core.domain.models.AtlasHabit
import com.agnes.ara.core.domain.models.AtlasProfile
import com.agnes.ara.core.domain.models.AtlasTask
import com.agnes.ara.core.domain.models.GlobalProjection
import com.agnes.ara.core.domain.models.NeuralStateVector
import com.agnes.ara.core.domain.services.atlas.AtlasPromptBuilder.CapacityBlueprint
import com.agnes.ara.core.domain.services.atlas.AtlasPromptBuilder.CapacitySnapshot
import com.agnes.ara.core.domain.services.atlas.AtlasPromptBuilder.CapacityVectors
import com.agnes.ara.core.domain.services.atlas.AtlasPromptBuilder.DailyCapacityEstimate
import com.agnes.ara.core.domain.services.atlas.AtlasPromptBuilder.ProjectionSurface
import com.agnes.ara.core.domain.services.atlas.AtlasPromptBuilder.ReviewAction
import com.agnes.ara.core.domain.services.atlas.AtlasPromptBuilder.ReviewBlueprint
import kotlinx.datetime.Clock
import kotlinx.datetime.Instant
import kotlinx.datetime.LocalDate
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime
import kotlin.math.abs
import kotlin.math.ceil
import kotlin.math.max
import kotlin.math.min
import kotlin.math.round
import kotlin.math.roundToInt

/**
 * Atlas Blueprint Service — Capacity analysis, weekly review, and projection surface.
 *
 * Pure functions for computing capacity blueprints, daily capacity estimates,
 * deadline pressure scores, and weekly review blueprints.
 *
 * Ported from web's `atlas-blueprint-service.ts` (643 lines → KMP commonMain).
 */
object AtlasBlueprintService {

    // ─── Constants ───────────────────────────────────────────────────────────

    private const val MIN_CAPACITY_PCT = 60
    private const val MAX_CAPACITY_PCT = 115

    // ─── Helpers ─────────────────────────────────────────────────────────────

    private fun clamp(value: Double, min: Double, max: Double): Double =
        min(max, max(min, value))

    private fun clampInt(value: Int, min: Int, max: Int): Int =
        min(max, max(min, value))

    private fun round1(value: Double): Double = round(value * 10) / 10

    private fun average(values: List<Double?>): Double? {
        val finite = values.filterNotNull().filter { it.isFinite() }
        if (finite.isEmpty()) return null
        return finite.sum() / finite.size
    }

    private fun normalizeTenScale(value: Double?): Double? {
        if (value == null || !value.isFinite()) return null
        return clamp(value / 10.0, 0.0, 1.0)
    }

    private fun normalizeRatio(value: Double?): Double? {
        if (value == null || !value.isFinite()) return null
        return clamp(value, 0.0, 1.0)
    }

    private fun sumEnergyWave(profile: AtlasProfile?): Double {
        if (profile?.energyWave.isNullOrEmpty()) return 0.0
        return round1(profile!!.energyWave.sumOf { it.energy })
    }

    private fun startOfWindow(now: Instant, tz: TimeZone): Long {
        val ldt = now.toLocalDateTime(tz)
        val startDate = ldt.date
        return Instant.parse("${startDate}T00:00:00Z").toEpochMilliseconds()
    }

    private fun endOfWindow(now: Instant, days: Int, tz: TimeZone): Long {
        return startOfWindow(now, tz) + days.toLong() * 86_400_000L
    }

    // ─── Energy Estimators ───────────────────────────────────────────────────

    private fun estimateHabitLoad(habits: List<AtlasHabit>): Double {
        val frequencyWeight = mapOf(
            "daily" to 2.8,
            "weekdays" to 2.2,
            "weekends" to 1.1,
            "weekly" to 0.9,
            "monthly" to 0.3,
            "custom" to 1.2
        )
        return round1(
            habits
                .filter { it.status == "active" }
                .sumOf { habit ->
                    (habit.energyCost.toDouble()) * (frequencyWeight[habit.frequency] ?: 1.0)
                } * 0.35
        )
    }

    private fun estimateScheduledDemand(tasks: List<com.agnes.ara.core.domain.models.ScheduledTask>, now: Instant, tz: TimeZone): Double {
        val windowStart = startOfWindow(now, tz)
        val windowEnd = endOfWindow(now, 7, tz)
        return round1(
            tasks
                .filter { st ->
                    val atMs = parseMs(st.scheduledAt) ?: return@filter false
                    atMs in windowStart until windowEnd && st.status != "done"
                }
                .sumOf { it.energyCost.toDouble() }
        )
    }

    private fun estimateTaskDemand(tasks: List<AtlasTask>, now: Instant, tz: TimeZone): Double {
        val windowEnd = endOfWindow(now, 7, tz)
        val ranked = tasks
            .filter { it.status == "queued" || it.status == "active" || it.status == "deferred" }
            .map { task ->
                val deadlineAt = parseMs(task.deadline)
                val deadlineUrgency = when {
                    deadlineAt != null && deadlineAt <= windowEnd -> 1.0
                    deadlineAt != null -> 0.6
                    else -> 0.45
                }
                val priorityWeight = 1.2 - ((task.priority.coerceIn(1, 5)) - 1) * 0.12
                (task.energyCost.toDouble()) * deadlineUrgency * priorityWeight
            }
            .sortedDescending()

        return round1(ranked.take(10).sum())
    }

    private fun parseMs(dateStr: String?): Long? {
        if (dateStr.isNullOrBlank()) return null
        return try {
            Instant.parse(dateStr).toEpochMilliseconds()
        } catch (_: Exception) {
            try {
                LocalDate.parse(dateStr.take(10))
                    .let { Instant.parse("${it}T00:00:00Z").toEpochMilliseconds() }
            } catch (_: Exception) {
                null
            }
        }
    }

    // ─── Top Focus Finder ────────────────────────────────────────────────────

    private fun findTopFocus(tasks: List<AtlasTask>, goals: List<AtlasGoal>, habits: List<AtlasHabit>): String {
        val urgentGoal = goals
            .filter { it.status == "active" }
            .sortedBy { parseMs(it.deadline) ?: Long.MAX_VALUE }
            .firstOrNull()

        if (urgentGoal != null) return "Advance goal: ${urgentGoal.title}"

        val topTask = tasks
            .filter { it.status != "done" }
            .sortedBy { it.priority }
            .firstOrNull()

        if (topTask != null) return "Protect task: ${topTask.title}"

        val habit = habits.firstOrNull { it.status == "active" }
        if (habit != null) return "Keep habit stable: ${habit.title}"

        return "Hold a lighter planning week and protect recovery"
    }

    // ─── Pressure Points ─────────────────────────────────────────────────────

    private fun buildPressurePoints(capacity: CapacityBlueprint): List<String> {
        val points = mutableListOf<String>()
        if (capacity.headroom < 0) {
            points.add("Demand is over safe capacity by ${round1(abs(capacity.headroom))} energy points.")
        }
        if (capacity.vectors.friction >= 6.5) {
            points.add("Friction is elevated across planning/deadline surfaces.")
        }
        if (capacity.vectors.resilience <= 4.5) {
            points.add("Resilience signals are low enough that recovery should be scheduled, not implied.")
        }
        if (capacity.vectors.specAlignment <= 5) {
            points.add("Current commitments are drifting away from goals and habit anchors.")
        }
        return points.take(3)
    }

    // ─── Review Actions ──────────────────────────────────────────────────────

    private fun buildActions(
        profile: AtlasProfile?,
        capacity: CapacityBlueprint,
        now: Instant
    ): List<ReviewAction> {
        if (profile == null) return emptyList()
        val nowMs = now.toEpochMilliseconds()

        val actions = mutableListOf<ReviewAction>()

        val overdueGoals = profile.goals.filter { goal ->
            if (goal.status != "active" || goal.deadline.isNullOrBlank()) return@filter false
            val deadlineMs = parseMs(goal.deadline) ?: return@filter false
            deadlineMs < nowMs && goal.progressPercent < 100f
        }

        val atRiskHabits = profile.habits.filter { habit ->
            if (habit.status != "active" || habit.lastCompleted.isNullOrBlank()) return@filter false
            val lastCompletedMs = parseMs(habit.lastCompleted) ?: return@filter false
            val elapsedHours = (nowMs - lastCompletedMs).toDouble() / 3_600_000
            elapsedHours >= 20
        }

        if (capacity.headroom < 0) {
            actions.add(ReviewAction(
                id = "protect-load",
                title = "Protect next week\u2019s load",
                detail = "Defer ${max(1, ceil(abs(capacity.headroom) / 6).toInt())} high-energy task(s) or shrink their scope before Monday.",
                emphasis = "protect"
            ))
        }

        if (capacity.vectors.resilience <= 4.5) {
            actions.add(ReviewAction(
                id = "schedule-recovery",
                title = "Schedule explicit recovery",
                detail = "Place one recovery window on the calendar now so compression is proactive instead of reactive.",
                emphasis = "protect"
            ))
        }

        if (overdueGoals.isNotEmpty()) {
            actions.add(ReviewAction(
                id = "goal-rescue",
                title = "Rescue a slipping goal",
                detail = "Re-scope or re-sequence ${overdueGoals[0].title} so the next action is visible and schedulable.",
                emphasis = "focus"
            ))
        }

        if (atRiskHabits.isNotEmpty()) {
            actions.add(ReviewAction(
                id = "habit-anchor",
                title = "Stabilize an at-risk habit",
                detail = "Protect ${atRiskHabits[0].title} with a minimum viable version before end of day.",
                emphasis = "build"
            ))
        }

        if (capacity.vectors.specAlignment <= 5) {
            actions.add(ReviewAction(
                id = "align-work",
                title = "Re-align task demand to goals",
                detail = "Link orphan tasks to an active goal or archive them so demand reflects what actually matters.",
                emphasis = "focus"
            ))
        }

        if (actions.isEmpty()) {
            actions.add(ReviewAction(
                id = "hold-line",
                title = "Hold the current blueprint",
                detail = "Keep a steady load and preserve your highest-leverage focus block early in the week.",
                emphasis = "focus"
            ))
        }

        return actions.take(4)
    }

    // ─── Projection Confidence ───────────────────────────────────────────────

    private fun inferProjectionConfidence(profile: AtlasProfile?, soul: GlobalProjection?): String {
        val signals = listOf(
            if (!profile?.energyWave.isNullOrEmpty()) 1 else 0,
            if (!profile?.tasks.isNullOrEmpty()) 1 else 0,
            if (!profile?.dailyCheckIns.isNullOrEmpty()) 1 else 0,
            if (soul?.crossFunctionalState != null) 1 else 0
        ).sum()

        return when {
            signals >= 4 -> "high"
            signals >= 2 -> "medium"
            else -> "low"
        }
    }

    // ─── Capacity Projection ─────────────────────────────────────────────────

    /**
     * Project capacity at a specific capacity percentage.
     */
    fun projectAtCapacityPct(
        blueprint: CapacityBlueprint,
        capacityPct: Int
    ): ProjectionSurface {
        val clampedPct = clampInt(capacityPct, MIN_CAPACITY_PCT, MAX_CAPACITY_PCT)
        val projectedCapacity = round1(blueprint.baselineCapacity * clampedPct / 100.0)
        val headroom = round1(projectedCapacity - blueprint.plannedDemand)
        val overflowTasks = if (headroom < 0) max(0, ceil(abs(headroom) / 6).toInt()) else 0

        val summary = when {
            headroom >= 3 -> "Projection leaves meaningful headroom for deep work and interruptions."
            headroom >= 0 -> "Projection is workable, but only if scope stays disciplined."
            else -> "Projection still overloads the week. Defer about $overflowTasks high-energy task(s)."
        }

        return ProjectionSurface(
            projectedCapacity = projectedCapacity,
            projectedHeadroom = headroom,
            summary = summary
        )
    }

    /**
     * Infer document ingestion mode from confidence level.
     */
    fun inferDocumentIngestionMode(confidence: Double): String =
        if (confidence >= 0.7) "structured" else "unstructured"

    // ═════════════════════════════════════════════════════════════════════════
    // Full Weekly Review Blueprint
    // ═════════════════════════════════════════════════════════════════════════

    /**
     * Compute a full weekly review blueprint with capacity analysis,
     * vector scores, projection surface, and recommended actions.
     */
    fun computeReviewBlueprint(
        profile: AtlasProfile?,
        soul: GlobalProjection?,
        now: Instant = Clock.System.now()
    ): ReviewBlueprint {
        val tz = TimeZone.currentSystemDefault()
        val nsv = soul?.crossFunctionalState

        val vitality = average(listOf(
            normalizeTenScale(nsv?.cognitive?.energyBudget),
            normalizeTenScale(nsv?.cognitive?.focusScore),
            normalizeTenScale(nsv?.biological?.sleepQuality),
            normalizeTenScale(average(profile?.energyWave?.map { it.energy } ?: emptyList())),
            normalizeTenScale(average(
                (profile?.dailyCheckIns ?: emptyList()).takeLast(7).map { it.energyLevel.toDouble() * 2 }
            ))
        ))

        val friction = average(listOf(
            normalizeTenScale(nsv?.cognitive?.planningLoad),
            normalizeTenScale(nsv?.planning?.deadlinePressure),
            normalizeTenScale(nsv?.emotional?.stressLoad),
            normalizeTenScale(nsv?.resource?.financialFriction),
            normalizeTenScale(nsv?.cognitive?.activeLoad)
        ))

        val resilience = average(listOf(
            normalizeTenScale(nsv?.emotional?.emotionalResilience),
            normalizeTenScale(nsv?.biological?.recoveryScore),
            normalizeTenScale(nsv?.planning?.streakHealth),
            normalizeTenScale(
                nsv?.biological?.cnsFatigue?.let { 10.0 - it }
            )
        ))

        val activeGoals = profile?.goals?.filter { it.status == "active" } ?: emptyList()
        val goalLinkedTasks = profile?.tasks?.count { !it.goalId.isNullOrBlank() } ?: 0
        val activeTasks = profile?.tasks?.count { it.status != "done" } ?: 0
        val activeHabits = profile?.habits?.filter { it.status == "active" } ?: emptyList()

        val nowMs = now.toEpochMilliseconds()
        val recentReviewDays = if (!profile?.reviews.isNullOrEmpty()) {
            val lastReviewMs = parseMs(profile!!.reviews.last().createdAt) ?: nowMs
            max(0.0, 14.0 - ((nowMs - lastReviewMs).toDouble() / 86_400_000)) / 14.0
        } else 0.0

        val specAlignment = average(listOf(
            normalizeRatio(nsv?.planning?.goalAlignment),
            normalizeRatio(nsv?.planning?.habitMomentum),
            if (activeGoals.isNotEmpty()) clamp(goalLinkedTasks.toDouble() / max(activeGoals.size, 1).toDouble(), 0.0, 1.0) else null,
            if (activeHabits.isNotEmpty()) clamp(activeHabits.count { (it.currentStreak) > 0 }.toDouble() / activeHabits.size, 0.0, 1.0) else null,
            recentReviewDays,
            if (activeTasks > 0) clamp(
                (profile?.tasks?.count { !it.goalId.isNullOrBlank() && it.status != "done" } ?: 0).toDouble() / activeTasks,
                0.0, 1.0
            ) else null
        ))

        val vitalityScore = round1((vitality ?: 0.5) * 10)
        val frictionScore = round1((friction ?: 0.5) * 10)
        val resilienceScore = round1((resilience ?: 0.5) * 10)
        val specAlignmentScore = round1((specAlignment ?: 0.5) * 10)

        val baselineCapacity = sumEnergyWave(profile).let { if (it > 0) it else round1((nsv?.cognitive?.energyBudget ?: 5.0) * 4.5) }
        val plannedDemand =
            estimateScheduledDemand(profile?.scheduledTasks ?: emptyList(), now, tz) +
                estimateTaskDemand(profile?.tasks ?: emptyList(), now, tz) +
                estimateHabitLoad(profile?.habits ?: emptyList())

        val rawCapacityPct =
            72.0 +
                vitalityScore * 2.2 +
                resilienceScore * 1.8 +
                specAlignmentScore * 1.2 -
                frictionScore * 2.8
        val recommendedCapacityPct = clamp(rawCapacityPct, MIN_CAPACITY_PCT.toDouble(), MAX_CAPACITY_PCT.toDouble()).roundToInt()
        val safeCapacity = round1(baselineCapacity * recommendedCapacityPct / 100.0)
        val headroom = round1(safeCapacity - plannedDemand)
        val loadRatio = if (safeCapacity > 0) round1(plannedDemand / safeCapacity) else 0.0

        val state = when {
            recommendedCapacityPct <= 72 || resilienceScore <= 4.2 -> "recover"
            recommendedCapacityPct < 92 || frictionScore >= 6 -> "compress"
            recommendedCapacityPct >= 108 && vitalityScore >= 7 && resilienceScore >= 6.5 && frictionScore <= 4.5 -> "expand"
            else -> "hold"
        }

        var capacity = CapacityBlueprint(
            baselineCapacity = baselineCapacity,
            safeCapacity = safeCapacity,
            plannedDemand = round1(plannedDemand),
            loadRatio = loadRatio,
            headroom = headroom,
            recommendedCapacityPct = recommendedCapacityPct,
            state = state,
            vectors = CapacityVectors(
                vitality = vitalityScore,
                friction = frictionScore,
                resilience = resilienceScore,
                specAlignment = specAlignmentScore
            )
        )
        capacity = capacity.copy(pressurePoints = buildPressurePoints(capacity))

        val recommendedActions = buildActions(profile, capacity, now)
        val projected = projectAtCapacityPct(capacity, recommendedCapacityPct)

        val projectionSummary = when (state) {
            "recover" -> "Atlas is projecting a recovery-first week. Protect bandwidth before adding commitments."
            "compress" -> "Atlas is projecting a compressed week. Keep scope tight and front-load the essentials."
            "expand" -> "Atlas is projecting surplus capacity. Use it intentionally, not by accident."
            else -> "Atlas is projecting a stable week. Preserve momentum without overshooting."
        }

        val projection = ProjectionSurface(
            state = state,
            summary = projectionSummary,
            confidence = inferProjectionConfidence(profile, soul),
            projectedCapacity = projected.projectedCapacity,
            projectedDemand = capacity.plannedDemand,
            projectedHeadroom = projected.projectedHeadroom,
            nextPeriodFocus = findTopFocus(profile?.tasks ?: emptyList(), profile?.goals ?: emptyList(), profile?.habits ?: emptyList()),
            recommendedActions = recommendedActions
        )

        return ReviewBlueprint(
            generatedAt = now.toString(),
            period = "weekly",
            capacity = capacity,
            projection = projection
        )
    }

    // ═════════════════════════════════════════════════════════════════════════
    // Quick Capacity Snapshot (lightweight daily planning)
    // ═════════════════════════════════════════════════════════════════════════

    /**
     * Quick capacity snapshot without full projection surface.
     * Suitable for injecting into daily planning prompts without weekly-review overhead.
     */
    fun computeQuickCapacitySnapshot(
        profile: AtlasProfile?,
        soul: GlobalProjection?
    ): CapacityBlueprint? {
        if (profile == null) return null
        val now = Clock.System.now()
        val tz = TimeZone.currentSystemDefault()
        val nsv = soul?.crossFunctionalState

        val vitality = average(listOf(
            normalizeTenScale(nsv?.cognitive?.energyBudget),
            normalizeTenScale(nsv?.cognitive?.focusScore),
            normalizeTenScale(nsv?.biological?.sleepQuality),
            normalizeTenScale(average(profile.energyWave.map { it.energy }))
        ))

        val friction = average(listOf(
            normalizeTenScale(nsv?.cognitive?.planningLoad),
            normalizeTenScale(nsv?.planning?.deadlinePressure),
            normalizeTenScale(nsv?.emotional?.stressLoad),
            normalizeTenScale(nsv?.cognitive?.activeLoad)
        ))

        val resilience = average(listOf(
            normalizeTenScale(nsv?.emotional?.emotionalResilience),
            normalizeTenScale(nsv?.biological?.recoveryScore),
            normalizeTenScale(
                nsv?.biological?.cnsFatigue?.let { 10.0 - it }
            )
        ))

        val activeGoals = profile.goals.filter { it.status == "active" }
        val goalLinkedTasks = profile.tasks.count { !it.goalId.isNullOrBlank() }
        val activeHabits = profile.habits.filter { it.status == "active" }

        val specAlignment = average(listOf(
            normalizeRatio(nsv?.planning?.goalAlignment),
            normalizeRatio(nsv?.planning?.habitMomentum),
            if (activeGoals.isNotEmpty()) clamp(goalLinkedTasks.toDouble() / max(activeGoals.size, 1).toDouble(), 0.0, 1.0) else null,
            if (activeHabits.isNotEmpty()) clamp(activeHabits.count { it.currentStreak > 0 }.toDouble() / activeHabits.size, 0.0, 1.0) else null
        ))

        val vitalityScore = round1((vitality ?: 0.5) * 10)
        val frictionScore = round1((friction ?: 0.5) * 10)
        val resilienceScore = round1((resilience ?: 0.5) * 10)
        val specAlignmentScore = round1((specAlignment ?: 0.5) * 10)

        val baselineCapacity = sumEnergyWave(profile).let { if (it > 0) it else round1((nsv?.cognitive?.energyBudget ?: 5.0) * 4.5) }
        val plannedDemand =
            estimateScheduledDemand(profile.scheduledTasks, now, tz) +
                estimateTaskDemand(profile.tasks, now, tz) +
                estimateHabitLoad(profile.habits)

        val rawCapacityPct =
            72.0 + vitalityScore * 2.2 + resilienceScore * 1.8 + specAlignmentScore * 1.2 - frictionScore * 2.8
        val recommendedCapacityPct = clamp(rawCapacityPct, MIN_CAPACITY_PCT.toDouble(), MAX_CAPACITY_PCT.toDouble()).roundToInt()
        val safeCapacity = round1(baselineCapacity * recommendedCapacityPct / 100.0)
        val headroom = round1(safeCapacity - plannedDemand)
        val loadRatio = if (safeCapacity > 0) round1(plannedDemand / safeCapacity) else 0.0

        val state = when {
            recommendedCapacityPct <= 72 || resilienceScore <= 4.2 -> "recover"
            recommendedCapacityPct < 92 || frictionScore >= 6 -> "compress"
            recommendedCapacityPct >= 108 && vitalityScore >= 7 && resilienceScore >= 6.5 && frictionScore <= 4.5 -> "expand"
            else -> "hold"
        }

        var blueprint = CapacityBlueprint(
            baselineCapacity = baselineCapacity,
            safeCapacity = safeCapacity,
            plannedDemand = round1(plannedDemand),
            loadRatio = loadRatio,
            headroom = headroom,
            recommendedCapacityPct = recommendedCapacityPct,
            state = state,
            vectors = CapacityVectors(
                vitality = vitalityScore,
                friction = frictionScore,
                resilience = resilienceScore,
                specAlignment = specAlignmentScore
            )
        )
        blueprint = blueprint.copy(pressurePoints = buildPressurePoints(blueprint))

        return blueprint
    }

    /**
     * Convert a CapacityBlueprint to a CapacitySnapshot for prompt context injection.
     */
    fun toSnapshot(blueprint: CapacityBlueprint): CapacitySnapshot = CapacitySnapshot(
        state = blueprint.state,
        safeCapacity = blueprint.safeCapacity.roundToInt(),
        plannedDemand = blueprint.plannedDemand.roundToInt(),
        headroom = blueprint.headroom.roundToInt(),
        pressurePoints = blueprint.pressurePoints,
        loadRatio = blueprint.loadRatio
    )

    // ═════════════════════════════════════════════════════════════════════════
    // Daily Capacity Estimate
    // ═════════════════════════════════════════════════════════════════════════

    /**
     * Single-day capacity estimate: energy wave for the target day, NSV modifiers applied,
     * minus routine block and scheduled task commitments.
     */
    fun computeDailyCapacity(
        profile: AtlasProfile?,
        soul: GlobalProjection?,
        targetDate: String
    ): DailyCapacityEstimate {
        val fallback = DailyCapacityEstimate()
        if (profile == null) return fallback

        val nsv = soul?.crossFunctionalState
        val target = try {
            LocalDate.parse(targetDate.take(10))
        } catch (_: Exception) {
            return fallback
        }
        // kotlinx DayOfWeek: MONDAY=0..SUNDAY=6 → JS: SUNDAY=0..SATURDAY=6
        val dayOfWeek = (target.dayOfWeek.ordinal + 1) % 7

        // Base capacity from energy wave sum
        var baseCapacity = sumEnergyWave(profile).let { if (it > 0) it else 40.0 }

        // Apply NSV modifiers
        val sleepQuality = nsv?.biological?.sleepQuality
        if (sleepQuality != null && sleepQuality < 4) {
            baseCapacity -= baseCapacity * 0.2
        }
        val cnsFatigue = nsv?.biological?.cnsFatigue
        if (cnsFatigue != null && cnsFatigue > 7) {
            baseCapacity = min(baseCapacity, 20.0)
        }
        val stressLoad = nsv?.emotional?.stressLoad
        if (stressLoad != null && stressLoad > 7) {
            baseCapacity -= baseCapacity * 0.1
        }

        val totalCapacity = round1(max(0.0, baseCapacity))

        // Committed energy: routine blocks for this day + scheduled tasks
        var committedEnergy = 0.0

        if (profile.routine.isActive && profile.routine.blocks.isNotEmpty()) {
            for (block in profile.routine.blocks) {
                if (block.daysOfWeek.contains(dayOfWeek)) {
                    committedEnergy += block.energyCost.toDouble()
                }
            }
        }

        val datePrefix = targetDate.take(10)
        for (st in profile.scheduledTasks) {
            if (st.scheduledAt.startsWith(datePrefix) && st.status != "done") {
                committedEnergy += st.energyCost.toDouble()
            }
        }

        committedEnergy = round1(committedEnergy)
        val availableEnergy = round1(max(0.0, totalCapacity - committedEnergy))

        return DailyCapacityEstimate(
            totalCapacity = totalCapacity,
            committedEnergy = committedEnergy,
            availableEnergy = availableEnergy,
            dayOfWeek = dayOfWeek
        )
    }

    // ═════════════════════════════════════════════════════════════════════════
    // Deadline Pressure Score
    // ═════════════════════════════════════════════════════════════════════════

    /**
     * Compute a 0-10 deadline pressure score from active tasks and goals.
     * Factors in urgency, energy weight, priority, milestone velocity, and proximity.
     */
    fun computeDeadlinePressureScore(
        tasks: List<AtlasTask>,
        goals: List<AtlasGoal>,
        taskCompletionRate: Double? = null
    ): Double {
        val nowMs = Clock.System.now().toEpochMilliseconds()
        val dayMs = 86_400_000.0

        // Task scores
        val taskScores = tasks
            .filter { it.status != "done" && !it.deadline.isNullOrBlank() }
            .mapNotNull { t ->
                val deadlineMs = parseMs(t.deadline) ?: return@mapNotNull null
                val daysRemaining = (deadlineMs - nowMs) / dayMs
                val urgency = when {
                    daysRemaining <= 0 -> 10.0
                    daysRemaining <= 1 -> 9.0
                    daysRemaining <= 3 -> 7.0
                    daysRemaining <= 7 -> 5.0
                    else -> 2.0
                }
                val energyWeight = (t.energyCost.coerceIn(0, 10)).toDouble() / 10.0
                val priorityMultiplier = if (t.priority <= 2) 1.5 else 1.0
                urgency * energyWeight * priorityMultiplier
            }
            .sortedDescending()

        val top5Tasks = taskScores.take(5)
        val taskAvg = if (top5Tasks.isNotEmpty()) top5Tasks.sum() / top5Tasks.size else 0.0

        // Goal scores
        val goalScores = goals
            .filter { it.status == "active" && !it.deadline.isNullOrBlank() }
            .mapNotNull { g ->
                val deadlineMs = parseMs(g.deadline) ?: return@mapNotNull null
                val daysRemaining = (deadlineMs - nowMs) / dayMs
                val totalMilestones = g.milestones.size
                val completedMilestones = g.milestones.count { it.completed }
                val milestoneRatio = if (totalMilestones > 0) {
                    completedMilestones.toDouble() / totalMilestones
                } else {
                    g.progressPercent.toDouble() / 100.0
                }
                val velocityNeeded = (1.0 - milestoneRatio) / max(1.0, daysRemaining / 7.0)
                val velocityHave = taskCompletionRate ?: 0.5
                val goalRisk = max(0.0, velocityNeeded - velocityHave) * 10.0
                val proximityMultiplier = if (daysRemaining <= 14) 1.5 else 1.0
                min(10.0, goalRisk) * proximityMultiplier
            }
            .sortedDescending()

        val top3Goals = goalScores.take(3)
        val goalAvg = if (top3Goals.isNotEmpty()) top3Goals.sum() / top3Goals.size else 0.0

        val rawScore = taskAvg * 0.6 + goalAvg * 0.4
        return round(min(10.0, max(0.0, rawScore)) * 10) / 10.0
    }
}
