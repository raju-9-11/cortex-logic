package com.agnes.ara.core.domain.services.atlas

import com.agnes.ara.core.domain.models.AtlasGoal
import com.agnes.ara.core.domain.models.AtlasHabit
import com.agnes.ara.core.domain.models.AtlasProfile
import com.agnes.ara.core.domain.models.AtlasTask
import com.agnes.ara.core.domain.models.NeuralStateVector
import com.agnes.ara.core.domain.services.atlas.AtlasPromptBuilder.BlockedChain
import com.agnes.ara.core.domain.services.atlas.AtlasPromptBuilder.ConflictReport
import com.agnes.ara.core.domain.services.atlas.AtlasPromptBuilder.DailyLoadForecast
import com.agnes.ara.core.domain.services.atlas.AtlasPromptBuilder.DeadlineConvergence
import com.agnes.ara.core.domain.services.atlas.AtlasPromptBuilder.DependencyGraph
import com.agnes.ara.core.domain.services.atlas.AtlasPromptBuilder.DependencyGraphSummary
import com.agnes.ara.core.domain.services.atlas.AtlasPromptBuilder.GoalVelocity
import com.agnes.ara.core.domain.services.atlas.AtlasPromptBuilder.HabitScheduleGap
import com.agnes.ara.core.domain.services.atlas.AtlasPromptBuilder.HistoricalPatterns
import com.agnes.ara.core.domain.services.atlas.AtlasPromptBuilder.RecoveryViolation
import com.agnes.ara.core.domain.services.atlas.AtlasPromptBuilder.SubtaskSuggestion
import com.agnes.ara.core.domain.services.atlas.AtlasPromptBuilder.TaskBreakdownSuggestion
import kotlinx.datetime.Clock
import kotlinx.datetime.DateTimeUnit
import kotlinx.datetime.Instant
import kotlinx.datetime.LocalDate
import kotlinx.datetime.TimeZone
import kotlinx.datetime.atStartOfDayIn
import kotlinx.datetime.plus
import kotlinx.datetime.toLocalDateTime
import kotlin.math.max
import kotlin.math.round
import kotlin.math.roundToInt

/**
 * Atlas Planning Engine — Pure computation layer for intelligent planning.
 *
 * All functions are pure (no side effects, no persistence, no Spine events).
 * Input: AtlasProfile + optional NeuralStateVector
 * Output: Computed intelligence structures for AI context injection and action logic.
 *
 * Ported from web's `atlas-planning-engine.ts` (696 lines → KMP commonMain).
 */
object AtlasPlanningEngine {

    // ─── Constants ───────────────────────────────────────────────────────────

    private const val DAY_MS = 86_400_000L
    private const val WEEK_MS = 7 * DAY_MS
    private val DAY_NAMES = listOf("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")

    /** Fraction of a habit's energy that counts per day, keyed by frequency string. */
    private val HABIT_DAILY_WEIGHT: Map<String, Double> = mapOf(
        "daily" to 1.0,
        "weekdays" to 5.0 / 7,
        "weekends" to 2.0 / 7,
        "weekly" to 1.0 / 7,
        "monthly" to 1.0 / 30,
        "custom" to 1.0 / 7
    )

    /** Domain-specific phase templates for task breakdown. */
    private data class PhaseTemplate(val phases: List<String>, val weights: List<Double>)

    private val DOMAIN_PHASES: Map<String, PhaseTemplate> = mapOf(
        "dev" to PhaseTemplate(
            phases = listOf("Spike & research", "Design approach", "Implement", "Test & review"),
            weights = listOf(0.15, 0.15, 0.5, 0.2)
        ),
        "writing" to PhaseTemplate(
            phases = listOf("Research & outline", "Draft", "Edit & refine"),
            weights = listOf(0.25, 0.5, 0.25)
        ),
        "design" to PhaseTemplate(
            phases = listOf("Explore references", "Create draft", "Iterate & polish"),
            weights = listOf(0.2, 0.5, 0.3)
        ),
        "generic_large" to PhaseTemplate(
            phases = listOf("Research & plan", "Design approach", "Execute", "Review & verify"),
            weights = listOf(0.15, 0.15, 0.5, 0.2)
        ),
        "generic_medium" to PhaseTemplate(
            phases = listOf("Prepare", "Execute", "Verify"),
            weights = listOf(0.2, 0.55, 0.25)
        ),
        "generic_small" to PhaseTemplate(
            phases = listOf("Do", "Verify"),
            weights = listOf(0.7, 0.3)
        )
    )

    // ─── Helpers ─────────────────────────────────────────────────────────────

    private fun round1(v: Double): Double = round(v * 10) / 10

    private fun parseInstant(dateStr: String?): Instant? {
        if (dateStr.isNullOrBlank()) return null
        return try {
            Instant.parse(dateStr)
        } catch (_: Exception) {
            try {
                // Handle date-only strings like "2025-03-15"
                LocalDate.parse(dateStr.take(10))
                    .atStartOfDayIn(TimeZone.UTC)
            } catch (_: Exception) {
                null
            }
        }
    }

    private fun nowInstant(): Instant = Clock.System.now()

    // ═════════════════════════════════════════════════════════════════════════
    // 2A: Dependency Graph Analysis
    // ═════════════════════════════════════════════════════════════════════════

    /**
     * Build a full dependency graph from active tasks.
     * Performs topological sort (Kahn's algorithm), critical path (longest
     * weighted path by energyCost), blocked chain BFS, and orphan detection.
     */
    fun buildDependencyGraph(tasks: List<AtlasTask>): DependencyGraph {
        val activeTasks = tasks.filter { it.status != "done" }
        val taskMap = activeTasks.associateBy { it.id }
        val adjacency = mutableMapOf<String, MutableList<String>>()
        val reverseAdj = mutableMapOf<String, MutableList<String>>()

        for (task in activeTasks) {
            adjacency[task.id] = task.dependencies.toMutableList()
            if (!reverseAdj.containsKey(task.id)) reverseAdj[task.id] = mutableListOf()
            for (depId in task.dependencies) {
                reverseAdj.getOrPut(depId) { mutableListOf() }.add(task.id)
            }
        }

        // Kahn's algorithm for topological sort + cycle detection
        val inDegree = mutableMapOf<String, Int>()
        for (task in activeTasks) {
            var deg = 0
            for (depId in task.dependencies) {
                if (taskMap.containsKey(depId)) deg++
            }
            inDegree[task.id] = deg
        }

        val queue = ArrayDeque<String>()
        for ((id, deg) in inDegree) {
            if (deg == 0) queue.addLast(id)
        }

        val topologicalOrder = mutableListOf<String>()
        while (queue.isNotEmpty()) {
            val id = queue.removeFirst()
            topologicalOrder.add(id)
            for (dependentId in reverseAdj[id] ?: emptyList()) {
                val newDeg = (inDegree[dependentId] ?: 1) - 1
                inDegree[dependentId] = newDeg
                if (newDeg == 0) queue.addLast(dependentId)
            }
        }

        val cycleDetected = topologicalOrder.size < activeTasks.size

        // Critical path: longest weighted path using DP on topological order
        val dist = mutableMapOf<String, Int>()
        val prev = mutableMapOf<String, String?>()
        for (id in topologicalOrder) {
            dist[id] = taskMap[id]?.energyCost ?: 0
            prev[id] = null
        }

        for (id in topologicalOrder) {
            val currentDist = dist[id] ?: 0
            for (dependentId in reverseAdj[id] ?: emptyList()) {
                if (!dist.containsKey(dependentId)) continue
                val dependentTask = taskMap[dependentId]
                val newDist = currentDist + (dependentTask?.energyCost ?: 0)
                if (newDist > (dist[dependentId] ?: 0)) {
                    dist[dependentId] = newDist
                    prev[dependentId] = id
                }
            }
        }

        // Find the end of critical path (node with max distance)
        var maxDist = 0
        var maxNode: String? = null
        for ((id, d) in dist) {
            if (d > maxDist) {
                maxDist = d
                maxNode = id
            }
        }

        val criticalPath = mutableListOf<String>()
        if (maxNode != null) {
            var current: String? = maxNode
            while (current != null) {
                criticalPath.add(0, current)
                current = prev[current]
            }
        }

        // Blocked chains: BFS from each blocked task following reverseAdj
        val blockedChains = mutableListOf<BlockedChain>()
        val blockedRoots = activeTasks.filter { it.status == "blocked" }
        for (root in blockedRoots) {
            val chain = mutableListOf<String>()
            val bfsQueue = ArrayDeque<String>()
            bfsQueue.addLast(root.id)
            val seen = mutableSetOf(root.id)
            while (bfsQueue.isNotEmpty()) {
                val nodeId = bfsQueue.removeFirst()
                for (downstream in reverseAdj[nodeId] ?: emptyList()) {
                    if (!seen.contains(downstream)) {
                        seen.add(downstream)
                        chain.add(downstream)
                        bfsQueue.addLast(downstream)
                    }
                }
            }
            if (chain.isNotEmpty()) {
                blockedChains.add(BlockedChain(root = root.id, chain = chain))
            }
        }

        // Orphan tasks: no goal, no project, no dependencies, not depended upon
        val orphanTasks = activeTasks
            .filter { t ->
                t.goalId.isNullOrBlank() &&
                    t.projectId.isNullOrBlank() &&
                    t.dependencies.isEmpty() &&
                    (reverseAdj[t.id] ?: emptyList()).isEmpty()
            }
            .map { it.id }

        return DependencyGraph(
            adjacency = adjacency.mapValues { it.value.toList() },
            reverseAdj = reverseAdj.mapValues { it.value.toList() },
            criticalPath = criticalPath,
            blockedChains = blockedChains,
            orphanTasks = orphanTasks,
            cycleDetected = cycleDetected,
            topologicalOrder = topologicalOrder
        )
    }

    /** Project the full DependencyGraph down to a prompt-facing summary. */
    fun toSummary(graph: DependencyGraph): DependencyGraphSummary = DependencyGraphSummary(
        criticalPath = graph.criticalPath,
        blockedChains = graph.blockedChains,
        orphanTasks = graph.orphanTasks,
        cycleDetected = graph.cycleDetected
    )

    // ═════════════════════════════════════════════════════════════════════════
    // 2B: Goal Velocity Tracker
    // ═════════════════════════════════════════════════════════════════════════

    /**
     * Compute per-goal velocity and risk analysis for all active goals.
     */
    fun computeGoalVelocities(
        goals: List<AtlasGoal>,
        tasks: List<AtlasTask>,
        now: Instant = nowInstant()
    ): List<GoalVelocity> {
        val nowMs = now.toEpochMilliseconds()

        return goals
            .filter { it.status == "active" }
            .map { goal ->
                val completedMilestones = goal.milestones.count { it.completed }
                val totalMilestones = goal.milestones.size
                val remaining = totalMilestones - completedMilestones

                val createdAtMs = parseInstant(goal.createdAt)?.toEpochMilliseconds() ?: nowMs
                val daysElapsed = max(1.0, (nowMs - createdAtMs).toDouble() / DAY_MS)
                val weeksElapsed = daysElapsed / 7

                val deadlineMs = parseInstant(goal.deadline)?.toEpochMilliseconds()
                val daysRemaining = if (deadlineMs != null) {
                    max(0.0, (deadlineMs - nowMs).toDouble() / DAY_MS)
                } else null
                val weeksRemaining = daysRemaining?.let { it / 7 }

                val actualVelocity = if (totalMilestones > 0) {
                    round1(completedMilestones.toDouble() / max(1.0, weeksElapsed))
                } else 0.0

                val requiredVelocity = if (weeksRemaining != null && weeksRemaining > 0 && totalMilestones > 0) {
                    round1(remaining.toDouble() / weeksRemaining)
                } else null

                val linkedTasks = tasks.filter { it.goalId == goal.id }
                val linkedTaskCount = linkedTasks.size
                val linkedTasksDone = linkedTasks.count { it.status == "done" }

                val riskLevel: String = when {
                    completedMilestones == 0 && daysElapsed > 14 && totalMilestones > 0 ->
                        "stalled"
                    requiredVelocity != null && actualVelocity > 0 && requiredVelocity > actualVelocity * 1.5 ->
                        "behind"
                    requiredVelocity != null && actualVelocity > 0 && requiredVelocity > actualVelocity ->
                        "at-risk"
                    requiredVelocity != null && actualVelocity == 0.0 && remaining > 0 ->
                        if (daysRemaining != null && daysRemaining < 14) "behind" else "stalled"
                    else -> "on-track"
                }

                val onPace = riskLevel == "on-track"

                GoalVelocity(
                    goalId = goal.id,
                    title = goal.title,
                    completedMilestones = completedMilestones,
                    totalMilestones = totalMilestones,
                    daysElapsed = daysElapsed.roundToInt(),
                    actualVelocity = actualVelocity,
                    requiredVelocity = requiredVelocity,
                    daysRemaining = daysRemaining?.roundToInt(),
                    onPace = onPace,
                    linkedTaskCount = linkedTaskCount,
                    linkedTasksDone = linkedTasksDone,
                    riskLevel = riskLevel
                )
            }
    }

    // ═════════════════════════════════════════════════════════════════════════
    // 2C: Load Forecaster
    // ═════════════════════════════════════════════════════════════════════════

    private fun estimateDailyHabitEnergy(habits: List<AtlasHabit>, dayOfWeek: Int): Double {
        return habits
            .filter { it.status == "active" }
            .sumOf { h ->
                val freq = h.frequency
                when {
                    freq == "weekdays" && (dayOfWeek == 0 || dayOfWeek == 6) -> 0.0
                    freq == "weekends" && dayOfWeek in 1..5 -> 0.0
                    freq == "custom" && h.customDays != null && !h.customDays.contains(dayOfWeek) -> 0.0
                    else -> (h.energyCost.toDouble()) * (HABIT_DAILY_WEIGHT[freq] ?: 0.14)
                }
            }
    }

    private fun estimateDailyRoutineEnergy(profile: AtlasProfile, dayOfWeek: Int): Double {
        if (!profile.routine.isActive) return 0.0
        return profile.routine.blocks
            .filter { it.daysOfWeek.contains(dayOfWeek) }
            .sumOf { it.energyCost.toDouble() }
    }

    private fun estimateBaseCapacity(
        profile: AtlasProfile,
        nsv: NeuralStateVector?
    ): Double {
        if (profile.energyWave.isEmpty()) {
            val budget = nsv?.cognitive?.energyBudget
            return if (budget != null) budget * 4.5 else 40.0
        }
        val waveSum = profile.energyWave.sumOf { it.energy }
        var capacity = if (waveSum > 0) waveSum else 40.0

        val sleepQuality = nsv?.biological?.sleepQuality
        if (sleepQuality != null && sleepQuality < 4) capacity *= 0.8

        val cnsFatigue = nsv?.biological?.cnsFatigue
        if (cnsFatigue != null && cnsFatigue > 7) capacity = minOf(capacity, 20.0)

        val stressLoad = nsv?.emotional?.stressLoad
        if (stressLoad != null && stressLoad > 7) capacity *= 0.9

        return max(0.0, capacity)
    }

    /**
     * Forecast daily energy load for the next [days] days.
     */
    fun forecastLoad(
        profile: AtlasProfile,
        nsv: NeuralStateVector?,
        days: Int = 7,
        now: Instant = nowInstant()
    ): List<DailyLoadForecast> {
        val baseCapacity = estimateBaseCapacity(profile, nsv)
        val tz = TimeZone.currentSystemDefault()
        val nowLdt = now.toLocalDateTime(tz)
        val startDate = nowLdt.date

        val forecasts = mutableListOf<DailyLoadForecast>()

        for (i in 0 until days) {
            val date = startDate.plus(i, DateTimeUnit.DAY)
            val dateStr = date.toString()   // "2025-03-15"
            val dayOfWeek = date.dayOfWeek.ordinal // Monday=0 in kotlinx; adjust to JS Sunday=0
            // kotlinx DayOfWeek: MONDAY=0, ..., SUNDAY=6
            // JS Date.getDay(): SUNDAY=0, MONDAY=1, ..., SATURDAY=6
            val jsDayOfWeek = (dayOfWeek + 1) % 7

            // Scheduled tasks for this day
            val scheduledEnergy = profile.scheduledTasks
                .filter { it.scheduledAt.startsWith(dateStr) && it.status != "done" }
                .sumOf { it.energyCost.toDouble() }

            // Tasks with deadlines or scheduledSlots on this day
            val taskEnergy = profile.tasks
                .filter { t ->
                    if (t.status == "done" || t.status == "deferred") return@filter false
                    if (t.scheduledSlot == dateStr) return@filter true
                    val deadlineDate = t.deadline?.take(10)
                    deadlineDate == dateStr
                }
                .sumOf { it.energyCost.toDouble() }

            val habitEnergy = round1(estimateDailyHabitEnergy(profile.habits, jsDayOfWeek))
            val routineEnergy = estimateDailyRoutineEnergy(profile, jsDayOfWeek)
            val totalDemand = round1(scheduledEnergy + taskEnergy + habitEnergy + routineEnergy)
            val estimatedCapacity = round1(baseCapacity)
            val headroom = round1(estimatedCapacity - totalDemand)

            forecasts.add(
                DailyLoadForecast(
                    date = dateStr,
                    scheduledEnergy = round1(scheduledEnergy),
                    taskEnergy = round1(taskEnergy),
                    habitEnergy = habitEnergy,
                    routineEnergy = round1(routineEnergy),
                    totalDemand = totalDemand,
                    estimatedCapacity = estimatedCapacity,
                    headroom = headroom,
                    overloaded = headroom < 0
                )
            )
        }

        return forecasts
    }

    // ═════════════════════════════════════════════════════════════════════════
    // 2D: Conflict Detector
    // ═════════════════════════════════════════════════════════════════════════

    /**
     * Detect scheduling conflicts: deadline convergence, habit-schedule gaps,
     * and recovery window violations.
     */
    fun detectConflicts(
        profile: AtlasProfile,
        forecastDays: Int = 7,
        now: Instant = nowInstant()
    ): ConflictReport {
        val nowMs = now.toEpochMilliseconds()

        // Deadline convergence: group active tasks by deadline date
        val deadlineGroups = mutableMapOf<String, MutableList<String>>()
        for (task in profile.tasks) {
            if (task.status == "done" || task.deadline.isNullOrBlank()) continue
            val deadlineDate = task.deadline.take(10)
            val deadlineMs = parseInstant(deadlineDate)?.toEpochMilliseconds() ?: continue
            val windowEnd = nowMs + forecastDays * DAY_MS
            if (deadlineMs > windowEnd) continue

            deadlineGroups.getOrPut(deadlineDate) { mutableListOf() }.add(task.id)
        }

        val deadlineConvergence = deadlineGroups
            .filter { it.value.size >= 2 }
            .map { (date, taskIds) -> DeadlineConvergence(date = date, taskIds = taskIds, count = taskIds.size) }
            .sortedByDescending { it.count }

        // Habit-schedule gaps: daily/weekday habits without routine blocks matching their category
        val habitScheduleGaps = mutableListOf<HabitScheduleGap>()
        val routineBlockCategories = if (profile.routine.isActive) {
            profile.routine.blocks.map { it.title.lowercase() }.toSet()
        } else emptySet()

        for (habit in profile.habits) {
            if (habit.status != "active") continue
            if (habit.frequency != "daily" && habit.frequency != "weekdays") continue
            val habitWords = habit.title.lowercase().split(Regex("\\s+"))
            val hasMatchingBlock = routineBlockCategories.any { blockTitle ->
                habitWords.any { word -> word.length > 3 && blockTitle.contains(word) }
            }
            if (!hasMatchingBlock) {
                habitScheduleGaps.add(HabitScheduleGap(habitTitle = habit.title, habitFrequency = habit.frequency))
            }
        }

        // Recovery violations: scheduled tasks overlapping recovery windows
        val recoveryViolations = mutableListOf<RecoveryViolation>()
        for (window in profile.recoveryWindows) {
            if (window.status == "completed") continue
            val wStartMs = parseInstant(window.start)?.toEpochMilliseconds() ?: continue
            val wEndMs = parseInstant(window.end)?.toEpochMilliseconds() ?: continue
            for (st in profile.scheduledTasks) {
                if (st.status == "done") continue
                val stStartMs = parseInstant(st.scheduledAt)?.toEpochMilliseconds() ?: continue
                val stEndMs = stStartMs + st.duration * 60 * 1000L
                if (stStartMs < wEndMs && stEndMs > wStartMs) {
                    recoveryViolations.add(RecoveryViolation(taskTitle = st.title, windowTitle = window.title))
                }
            }
        }

        return ConflictReport(
            deadlineConvergence = deadlineConvergence,
            habitScheduleGaps = habitScheduleGaps,
            recoveryViolations = recoveryViolations
        )
    }

    // ═════════════════════════════════════════════════════════════════════════
    // 2E: Smart Task Decomposition
    // ═════════════════════════════════════════════════════════════════════════

    private fun inferDomain(task: AtlasTask): String {
        val tags = (task.tags ?: emptyList()).map { it.lowercase() }
        val titleLower = task.title.lowercase()
        val descLower = (task.description ?: "").lowercase()
        val combined = "$titleLower $descLower ${tags.joinToString(" ")}"

        return when {
            Regex("\\b(code|dev|implement|api|bug|refactor|deploy|test)\\b").containsMatchIn(combined) -> "dev"
            Regex("\\b(write|draft|blog|article|essay|document|copy)\\b").containsMatchIn(combined) -> "writing"
            Regex("\\b(design|figma|ui|ux|mockup|wireframe|layout)\\b").containsMatchIn(combined) -> "design"
            else -> "generic"
        }
    }

    /**
     * Suggest a phased breakdown for a task, using domain-aware templates.
     */
    fun suggestTaskBreakdown(
        task: AtlasTask,
        profile: AtlasProfile
    ): TaskBreakdownSuggestion {
        val domain = inferDomain(task)
        val energy = task.energyCost.let { if (it > 0) it else 4 }

        // Select phase template based on domain + energy
        val templateKey = when {
            domain != "generic" -> domain
            energy >= 7 -> "generic_large"
            energy >= 4 -> "generic_medium"
            else -> "generic_small"
        }

        val template = DOMAIN_PHASES[templateKey] ?: DOMAIN_PHASES["generic_medium"]!!
        val phases = template.phases.toMutableList()
        val weights = template.weights.toMutableList()

        // If task has unmet dependencies, prepend a verification step
        val unmetDeps = task.dependencies.filter { depId ->
            val dep = profile.tasks.find { it.id == depId }
            dep != null && dep.status != "done"
        }
        if (unmetDeps.isNotEmpty()) {
            phases.add(0, "Verify dependencies are complete")
            val scaleFactor = 0.9
            weights.add(0, 0.1)
            for (i in 1 until weights.size) {
                weights[i] = weights[i] * scaleFactor
            }
        }

        // If task has a goalId, enrich the first phase with goal context
        if (!task.goalId.isNullOrBlank()) {
            val goal = profile.goals.find { it.id == task.goalId }
            if (goal != null) {
                val nextMilestone = goal.milestones.find { !it.completed }
                if (nextMilestone != null) {
                    val firstActionIdx = if (unmetDeps.isNotEmpty()) 1 else 0
                    phases[firstActionIdx] = "${phases[firstActionIdx]} (toward: \"${nextMilestone.title.take(50)}\")"
                }
            }
        }

        val subtasks = phases.mapIndexed { i, title ->
            SubtaskSuggestion(
                title = "${task.title}: $title",
                estimatedEnergyCost = max(1, (energy * weights[i]).roundToInt()),
                suggestedOrder = i + 1,
                rationale = if (i == 0 && unmetDeps.isNotEmpty())
                    "${unmetDeps.size} dependency(ies) must complete first"
                else "Phase ${i + 1} of ${phases.size}"
            )
        }

        val totalEstimatedEnergy = subtasks.sumOf { it.estimatedEnergyCost }

        return TaskBreakdownSuggestion(
            subtasks = subtasks,
            totalEstimatedEnergy = totalEstimatedEnergy,
            decompositionStrategy = when {
                domain != "generic" -> "$domain-specific phases"
                energy >= 7 -> "sequential-phases"
                energy >= 4 -> "prepare-execute-verify"
                else -> "do-and-verify"
            }
        )
    }

    // ═════════════════════════════════════════════════════════════════════════
    // 2F: Historical Patterns
    // ═════════════════════════════════════════════════════════════════════════

    /**
     * Compute historical completion patterns, energy accuracy, deferral
     * patterns, peak productivity hour, and review consistency.
     */
    fun computeHistoricalPatterns(
        profile: AtlasProfile,
        now: Instant = nowInstant()
    ): HistoricalPatterns {
        val tasks = profile.tasks
        val nowMs = now.toEpochMilliseconds()

        // Completion rates
        val completedTasks = tasks.filter { it.status == "done" && !it.completedAt.isNullOrBlank() }

        val tasksCompleted7d = completedTasks.count { t ->
            val completedMs = parseInstant(t.completedAt)?.toEpochMilliseconds() ?: return@count false
            nowMs - completedMs <= 7 * DAY_MS
        }
        val tasksActive7d = tasks.count { t ->
            val createdMs = parseInstant(t.createdAt)?.toEpochMilliseconds() ?: return@count false
            nowMs - createdMs <= 7 * DAY_MS && t.status != "done"
        }
        val total7d = tasksCompleted7d + tasksActive7d
        val completionRate7d = if (total7d > 0) round1(tasksCompleted7d.toDouble() / total7d) else 0.0

        val tasksCompleted30d = completedTasks.count { t ->
            val completedMs = parseInstant(t.completedAt)?.toEpochMilliseconds() ?: return@count false
            nowMs - completedMs <= 30 * DAY_MS
        }
        val tasksActive30d = tasks.count { t ->
            val createdMs = parseInstant(t.createdAt)?.toEpochMilliseconds() ?: return@count false
            nowMs - createdMs <= 30 * DAY_MS && t.status != "done"
        }
        val total30d = tasksCompleted30d + tasksActive30d
        val completionRate30d = if (total30d > 0) round1(tasksCompleted30d.toDouble() / total30d) else 0.0

        // Energy accuracy: actual vs estimated for completed tasks
        val withActualEnergy = completedTasks.filter { t ->
            t.actualEnergyCost != null && t.energyCost > 0
        }
        val avgEnergyAccuracy = if (withActualEnergy.isNotEmpty()) {
            round1(
                withActualEnergy.sumOf { t ->
                    t.actualEnergyCost!!.toDouble() / t.energyCost
                } / withActualEnergy.size
            )
        } else null

        // Common deferral days: check scheduledTasks with deferredFrom
        val deferDayCounts = mutableMapOf<Int, Int>()
        for (st in profile.scheduledTasks) {
            if (!st.deferredFrom.isNullOrBlank()) {
                val deferDate = parseInstant(st.deferredFrom)
                if (deferDate != null) {
                    val day = deferDate.toLocalDateTime(TimeZone.currentSystemDefault()).dayOfWeek.ordinal
                    // Convert kotlinx Monday=0..Sunday=6 → JS Sunday=0..Saturday=6
                    val jsDay = (day + 1) % 7
                    deferDayCounts[jsDay] = (deferDayCounts[jsDay] ?: 0) + 1
                }
            }
        }
        val commonDeferDays = deferDayCounts.entries
            .sortedByDescending { it.value }
            .take(3)
            .map { DAY_NAMES[it.key] }

        // Peak productivity hour: most common completion hour
        val hourCounts = mutableMapOf<Int, Int>()
        for (t in completedTasks) {
            if (!t.completedAt.isNullOrBlank()) {
                val completedInstant = parseInstant(t.completedAt)
                if (completedInstant != null) {
                    val hour = completedInstant.toLocalDateTime(TimeZone.currentSystemDefault()).hour
                    hourCounts[hour] = (hourCounts[hour] ?: 0) + 1
                }
            }
        }
        var peakProductivityHour: Int? = null
        var maxCount = 0
        for ((hour, count) in hourCounts) {
            if (count > maxCount) {
                maxCount = count
                peakProductivityHour = hour
            }
        }

        // Review consistency: weeks with reviews / total weeks tracked
        val weeklyReviews = profile.reviews.filter { it.scope == "weekly" }
        val firstTaskMs = if (tasks.isNotEmpty()) {
            tasks.mapNotNull { parseInstant(it.createdAt)?.toEpochMilliseconds() }.minOrNull() ?: nowMs
        } else nowMs
        val totalWeeksTracked = max(1, ((nowMs - firstTaskMs).toDouble() / WEEK_MS).toInt() + 1)
        val reviewConsistency = round1(minOf(1.0, weeklyReviews.size.toDouble() / totalWeeksTracked))

        return HistoricalPatterns(
            completionRate7d = completionRate7d,
            completionRate30d = completionRate30d,
            avgEnergyAccuracy = avgEnergyAccuracy,
            commonDeferDays = commonDeferDays,
            peakProductivityHour = peakProductivityHour,
            reviewConsistency = reviewConsistency
        )
    }
}
