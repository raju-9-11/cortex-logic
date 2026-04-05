package com.agnes.nexus.core.domain.services.atlas

import com.agnes.nexus.core.domain.models.AtlasGoal
import com.agnes.nexus.core.domain.models.AtlasHabit
import com.agnes.nexus.core.domain.models.AtlasProfile
import com.agnes.nexus.core.domain.models.AtlasProject
import com.agnes.nexus.core.domain.models.AtlasTask
import com.agnes.nexus.core.domain.models.NeuralStateVector
import com.agnes.nexus.core.domain.models.RoutineBlock
import com.agnes.nexus.core.engine.personas.atlas.AtlasPersonaPrompts
import kotlinx.datetime.Clock
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime
import kotlinx.datetime.DatePeriod
import kotlinx.datetime.plus

typealias AtlasSessionMode = String

data class AtlasSessionPromptOptions(
    val mode: AtlasSessionMode = "general",
    /**
     * ISO date string (YYYY-MM-DD) used to render "today" deterministically for unit tests.
     * When null/blank, defaults to the current system date.
     */
    val today: String? = null
)

/**
 * KMP Atlas prompt builder — full web parity.
 *
 * Supports five context modes:
 *   1. general     — full context + all actions (persisted)
 *   2. task-focus   — single task context + task-specific actions (ephemeral)
 *   3. habit-review — habit list context + habit-specific actions (ephemeral)
 *   4. goal-planning — single goal context + goal-specific actions (ephemeral)
 *   5. field-crud   — schema definitions only, NO user wellness data (ephemeral)
 *
 * Architecture rules:
 *   - Atlas NEVER writes to biological/emotional/resource NSV — read-only
 *   - LLM is sole semantic validator for custom field relevance (NO keyword gates)
 *   - One planning decision per response
 *   - Recovery windows are inviolable
 */
object AtlasPromptBuilder {

    // ========================================================================
    // Context Mode Sealed Class
    // ========================================================================

    sealed class AtlasContextMode {
        data object General : AtlasContextMode()
        data class TaskFocus(val task: AtlasTask) : AtlasContextMode()
        data class HabitReview(val habits: List<AtlasHabit>) : AtlasContextMode()
        data class GoalPlanning(val goal: AtlasGoal) : AtlasContextMode()
        data class FieldCrud(val currentExtensions: List<FieldDef>) : AtlasContextMode()

        val kind: String get() = when (this) {
            is General -> "general"
            is TaskFocus -> "task-focus"
            is HabitReview -> "habit-review"
            is GoalPlanning -> "goal-planning"
            is FieldCrud -> "field-crud"
        }
    }

    // ========================================================================
    // Lightweight Data Classes for Prompt Context
    // ========================================================================

    /** Simplified field definition for prompt building (avoids full FieldDefinition dependency). */
    data class FieldDef(
        val id: String,
        val name: String,
        val type: String,
        val description: String? = null,
        val defaultValue: Any? = null,
        val validationMin: Double? = null,
        val validationMax: Double? = null
    )

    /** Field value with timestamp for "last updated" display. */
    data class FieldVal(
        val value: Any? = null,
        val timestamp: Long? = null
    )

    /** Decrypted journal summary injected into the AI context. */
    data class AtlasJournalSummary(
        val date: String,
        val mood: Int,
        val energyLevel: Int,
        val morningIntent: String? = null,
        val blockers: String? = null,
        val freeformSnippet: String? = null,
        val eveningReflectionSnippet: String? = null
    )

    /** Morning or evening check-in snapshot. */
    data class AtlasCheckInSummary(
        val type: String,   // "morning" | "evening"
        val completedAt: String,
        val energyRating: Int? = null,
        val moodRating: Int? = null,
        val intention: String? = null,
        val reflection: String? = null
    )

    /** Proactive planning alert. */
    data class PlanningAlert(
        val id: String = "",
        val category: String = "",          // "deadline" | "capacity" | "habit" | "goal" | "coherence"
        val severity: String,               // "info" | "warning" | "critical"
        val title: String,
        val detail: String,
        val actionHint: String? = null
    )

    /** Proactive planning digest. */
    data class PlanningDigest(
        val alerts: List<PlanningAlert> = emptyList(),
        val capacitySummary: String = "",
        val topRisk: String? = null,
        val generatedAt: String = ""
    )

    /** Per-goal velocity and risk analysis. */
    data class GoalVelocity(
        val goalId: String,
        val title: String,
        val completedMilestones: Int,
        val totalMilestones: Int,
        val daysElapsed: Int = 0,
        val actualVelocity: Double,
        val requiredVelocity: Double? = null,
        val daysRemaining: Int? = null,
        val onPace: Boolean = true,
        val linkedTaskCount: Int = 0,
        val linkedTasksDone: Int = 0,
        val riskLevel: String = "on-track"   // "on-track" | "at-risk" | "behind" | "stalled" | "no-deadline"
    )

    /** Full dependency graph with adjacency data (used by PlanningEngine). */
    data class DependencyGraph(
        /** taskId → IDs this task depends on */
        val adjacency: Map<String, List<String>> = emptyMap(),
        /** taskId → IDs that are blocked by this task */
        val reverseAdj: Map<String, List<String>> = emptyMap(),
        /** Ordered task IDs on the longest weighted path (by energyCost) */
        val criticalPath: List<String> = emptyList(),
        /** Chains where a root task is blocked and everything downstream waits */
        val blockedChains: List<BlockedChain> = emptyList(),
        /** Tasks with no goal, no project, and no dependencies */
        val orphanTasks: List<String> = emptyList(),
        /** True if a cycle was detected in the dependency graph */
        val cycleDetected: Boolean = false,
        /** Topological order of task IDs (empty if cycle detected) */
        val topologicalOrder: List<String> = emptyList()
    )

    /** Dependency graph summary for context injection (prompt-facing projection). */
    data class DependencyGraphSummary(
        val criticalPath: List<String> = emptyList(),
        val blockedChains: List<BlockedChain> = emptyList(),
        val orphanTasks: List<String> = emptyList(),
        val cycleDetected: Boolean = false
    )

    data class BlockedChain(
        val root: String,
        val chain: List<String>
    )

    /** Historical completion patterns. */
    data class HistoricalPatterns(
        val completionRate7d: Double = 0.0,
        val completionRate30d: Double = 0.0,
        val avgEnergyAccuracy: Double? = null,
        val commonDeferDays: List<String> = emptyList(),
        val peakProductivityHour: Int? = null,
        val reviewConsistency: Double = 0.0
    )

    /** Daily energy load forecast for a single day. */
    data class DailyLoadForecast(
        val date: String,
        val scheduledEnergy: Double = 0.0,
        val taskEnergy: Double = 0.0,
        val habitEnergy: Double = 0.0,
        val routineEnergy: Double = 0.0,
        val totalDemand: Double = 0.0,
        val estimatedCapacity: Double = 0.0,
        val headroom: Double = 0.0,
        val overloaded: Boolean = false
    )

    /** Deadline convergence entry within a ConflictReport. */
    data class DeadlineConvergence(
        val date: String,
        val taskIds: List<String>,
        val count: Int
    )

    /** Habit-schedule gap entry within a ConflictReport. */
    data class HabitScheduleGap(
        val habitTitle: String,
        val habitFrequency: String
    )

    /** Recovery violation entry within a ConflictReport. */
    data class RecoveryViolation(
        val taskTitle: String,
        val windowTitle: String
    )

    /** Conflict report: deadline convergence, habit gaps, and recovery violations. */
    data class ConflictReport(
        val deadlineConvergence: List<DeadlineConvergence> = emptyList(),
        val habitScheduleGaps: List<HabitScheduleGap> = emptyList(),
        val recoveryViolations: List<RecoveryViolation> = emptyList()
    )

    /** Individual subtask suggestion within a TaskBreakdownSuggestion. */
    data class SubtaskSuggestion(
        val title: String,
        val estimatedEnergyCost: Int,
        val suggestedOrder: Int,
        val rationale: String
    )

    /** Smart task breakdown suggestion with domain-aware phases. */
    data class TaskBreakdownSuggestion(
        val subtasks: List<SubtaskSuggestion> = emptyList(),
        val totalEstimatedEnergy: Int = 0,
        val decompositionStrategy: String = ""
    )

    /** Full capacity blueprint with vector scores (used by BlueprintService). */
    data class CapacityBlueprint(
        val baselineCapacity: Double = 0.0,
        val safeCapacity: Double = 0.0,
        val plannedDemand: Double = 0.0,
        val loadRatio: Double = 0.0,
        val headroom: Double = 0.0,
        val recommendedCapacityPct: Int = 100,
        val state: String = "hold",              // "expand" | "hold" | "compress" | "recover"
        val vectors: CapacityVectors = CapacityVectors(),
        val pressurePoints: List<String> = emptyList()
    )

    /** Capacity vector scores (0-10 scale). */
    data class CapacityVectors(
        val vitality: Double = 5.0,
        val friction: Double = 5.0,
        val resilience: Double = 5.0,
        val specAlignment: Double = 5.0
    )

    /** A recommended action from the weekly review blueprint. */
    data class ReviewAction(
        val id: String,
        val title: String,
        val detail: String,
        val emphasis: String = "focus"           // "protect" | "focus" | "build"
    )

    /** Weekly projection surface. */
    data class ProjectionSurface(
        val state: String = "hold",
        val summary: String = "",
        val confidence: String = "medium",       // "high" | "medium" | "low"
        val projectedCapacity: Double = 0.0,
        val projectedDemand: Double = 0.0,
        val projectedHeadroom: Double = 0.0,
        val nextPeriodFocus: String = "",
        val recommendedActions: List<ReviewAction> = emptyList()
    )

    /** Full weekly review blueprint (capacity + projection). */
    data class ReviewBlueprint(
        val generatedAt: String = "",
        val period: String = "weekly",
        val capacity: CapacityBlueprint = CapacityBlueprint(),
        val projection: ProjectionSurface = ProjectionSurface()
    )

    /** Single-day capacity estimate. */
    data class DailyCapacityEstimate(
        val totalCapacity: Double = 40.0,
        val committedEnergy: Double = 0.0,
        val availableEnergy: Double = 40.0,
        val dayOfWeek: Int = 0
    )

    /** Quick capacity snapshot for daily planning (prompt-facing projection). */
    data class CapacitySnapshot(
        val state: String = "normal",
        val safeCapacity: Int = 0,
        val plannedDemand: Int = 0,
        val headroom: Int = 0,
        val pressurePoints: List<String> = emptyList(),
        val loadRatio: Double = 0.0
    )

    /** All Atlas entity data for general-mode prompt building. */
    data class AtlasDataContext(
        val tasks: List<AtlasTask>? = null,
        val goals: List<AtlasGoal>? = null,
        val habits: List<AtlasHabit>? = null,
        val projects: List<AtlasProject>? = null,
        val routine: RoutineData? = null,
        val journalSummaries: List<AtlasJournalSummary>? = null,
        val checkIns: List<AtlasCheckInSummary>? = null,
        val today: String? = null,
        val planningDigest: PlanningDigest? = null,
        val dependencyGraph: DependencyGraphSummary? = null,
        val goalVelocities: List<GoalVelocity>? = null,
        val historicalPatterns: HistoricalPatterns? = null,
        val capacitySnapshot: CapacitySnapshot? = null
    )

    data class RoutineData(
        val blocks: List<RoutineBlock> = emptyList(),
        val isActive: Boolean = true
    )

    // ========================================================================
    // NSV Field Permissions
    // ========================================================================

    /** NSV fields Atlas is permitted to READ (but never write). */
    val NSV_READ_FIELDS = listOf(
        "biological.cnsFatigue",
        "biological.sleepQuality",
        "biological.recoveryScore",
        "emotional.emotionalResilience",
        "emotional.stressLoad",
        "emotional.moodTrend",
        "cognitive.energyBudget",
        "cognitive.focusScore",
        "cognitive.activeLoad",
        "cognitive.researchLoad",
        "cognitive.planningLoad",
        "cognitive.taskCompletionRate",
        "planning.streakHealth",
        "planning.deadlinePressure",
        "planning.reflectionStreak",
        "planning.goalAlignment",
        "planning.habitMomentum",
        "resource.financialFriction"
    )

    /** NSV fields Atlas is permitted to WRITE (cognitive + planning domains only). */
    val NSV_WRITE_FIELDS = listOf(
        "cognitive.energyBudget",
        "cognitive.focusScore",
        "cognitive.activeLoad",
        "cognitive.planningLoad",
        "cognitive.taskCompletionRate",
        "planning.streakHealth",
        "planning.deadlinePressure"
    )

    // ========================================================================
    // Allowed Actions Per Scope
    // ========================================================================

    /** Action filtering map. Runtime hook blocks out-of-scope actions. */
    val ALLOWED_ACTIONS: Map<String, List<String>> = mapOf(
        "general" to listOf(
            // Task management
            "create_task", "update_task", "complete_task", "move_task", "prioritize", "delete_task",
            "set_task_recurrence",
            // Goal management
            "create_goal", "update_goal", "update_goal_progress", "set_deadline", "delete_goal",
            // Project management
            "create_project", "update_project", "delete_project",
            // Habit management
            "create_habit", "update_habit", "update_habit_streak", "pause_habit", "delete_habit",
            // Schedule management
            "daily_plan", "weekly_review", "schedule_block", "generate_daily_schedule", "suggest_daily_plan",
            // Energy & recovery
            "update_energy_wave", "create_recovery_window", "update_recovery_window", "delete_recovery_window", "flatten_schedule",
            // NSV sync (Atlas-owned fields only)
            "sync_vitals", "request_nsv_calibration",
            // Cross-module delegation
            "delegate_to_module",
            // Reminders
            "propose_reminder", "query_reminders",
            // Field CRUD (also available in general for AI proactive suggestions)
            "suggest_field", "create_field", "delete_field"
        ),
        "task-focus" to listOf(
            "update_task", "complete_task", "move_task", "prioritize", "set_deadline",
            "create_task", "set_task_recurrence",
            "propose_reminder", "query_reminders"
        ),
        "habit-review" to listOf(
            "update_habit_streak", "pause_habit", "create_habit", "update_habit",
            "propose_reminder", "query_reminders"
        ),
        "goal-planning" to listOf(
            "update_goal_progress", "set_deadline", "create_goal", "update_goal",
            "create_task",
            "propose_reminder", "query_reminders"
        ),
        "field-crud" to listOf(
            "suggest_field", "create_field", "delete_field"
        )
    )

    // ========================================================================
    // Atlas 13 Rules
    // ========================================================================

    val RULES = listOf(
        "1. Start every response with <thought> — always. No exceptions.",
        "2. NEVER fabricate NSV scores, deadlines, task data, or energy values.",
        "3. NEVER schedule over a recovery window without explicit user override with a documented reason.",
        "4. NEVER encourage sustained high-intensity work — if activeLoad > 7 for 2+ slots, inject recovery.",
        "5. NEVER ignore biological context — if Soma/Titan signals a contraindication, surface it before scheduling.",
        "6. NEVER contradict Soma clearance signals — do not schedule physical demands when recoveryScore < 5.",
        "7. NEVER write to biological, emotional, or resource NSV fields — those belong to other modules.",
        "8. NEVER therapize — if the user is in emotional distress, stop planning and suggest Agnes.",
        "9. NEVER promise task completion — Atlas builds plans, execution belongs to the user.",
        "10. NEVER give financial advice — financialFriction is a scheduling constraint only; Ledger owns financial guidance.",
        "11. NEVER build a plan where total scheduled energyCost > energyBudget × 0.8 without flagging the overload.",
        "12. NEVER overwhelm — one planning decision per response; do not restructure the user's entire life at once.",
        "13. NEVER silently deprioritize — surface all scheduling conflicts explicitly before resolving them."
    )

    // ========================================================================
    // Prompt Constants
    // ========================================================================

    private const val LIVE_DATA_MARKER =
        "[ATLAS LIVE DATA — DO NOT FABRICATE ANY VALUES BELOW]"

    private val ENERGY_BUDGET_COMPUTATION_PROMPT = """
ENERGY BUDGET COMPUTATION:
1. Start with raw energyBudget (0-10) from cognitive domain.
2. Apply sleep modifier: if sleepQuality < 4, reduce by 2 points.
3. Apply fatigue modifier: if cnsFatigue > 7, cap at 4.
4. Apply stress modifier: if stressLoad > 7, reduce by 1 point.
5. Apply financial modifier: if financialFriction > 8, reduce by 1 point (hidden cognitive tax).
6. Floor at 0, cap at 10.
7. Safe planning threshold = effective budget × 0.8
8. If total scheduled energyCost > threshold, flag overload BEFORE proceeding.
""".trimIndent()

    private val SUGGEST_DAILY_PLAN_ACTION_PROMPT = """
SUGGEST_DAILY_PLAN ACTION:
When the user asks you to plan their day, use:
<action type="suggest_daily_plan">{"date":"YYYY-MM-DD","proposal":{"blocks":[{"time":"HH:MM","taskId":"...","title":"...","energyCost":N,"duration":60}],"totalEnergy":N,"note":"..."}}</action>
This returns a proposal for user review — nothing is committed until they confirm.
Respect the energy wave: high-energy tasks in peak slots, low-energy tasks in valleys.
""".trimIndent()

    // ========================================================================
    // NSV-Reactive Tone Override
    // ========================================================================

    /**
     * Returns a tone calibration directive block based on the current NSV state.
     * Returns an empty string when no override is warranted.
     */
    fun buildToneOverrideBlock(nsv: NeuralStateVector?): String {
        if (nsv == null) return ""

        val stressLoad = nsv.emotional.stressLoad
        val emotionalResilience = nsv.emotional.emotionalResilience
        val cnsFatigue = nsv.biological.cnsFatigue
        val energyBudget = nsv.cognitive.energyBudget
        val focusScore = nsv.cognitive.focusScore
        val activeLoad = nsv.cognitive.activeLoad
        val planningLoad = nsv.cognitive.planningLoad

        val stressHigh = stressLoad != null && stressLoad > 7.0
        val resilienceLow = emotionalResilience != null && emotionalResilience < 4.0
        val fatigueHigh = cnsFatigue != null && cnsFatigue > 7.0
        val energyLow = energyBudget != null && energyBudget < 3.0
        val focusHigh = focusScore != null && focusScore > 7.0
        val activeLoadLow = activeLoad != null && activeLoad < 4.0
        val planningLoadLow = planningLoad != null && planningLoad < 5.0

        if (stressHigh || resilienceLow) {
            return """
TONE CALIBRATION [GENTLE_CARE]:
The user's current biometric + emotional signals indicate elevated stress or low resilience.
Adjust your tone accordingly: be warm, validating, and patient. Offer fewer options.
Avoid ambitious scheduling. Prioritize acknowledgement over optimization.
""".trimIndent()
        }

        if (fatigueHigh || energyLow) {
            return """
TONE CALIBRATION [MINIMAL_ASKS]:
The user's current signals indicate high CNS fatigue or critically low energy reserves.
Be compassionate and keep asks to an absolute minimum. Prioritize rest over any planning goal.
Do not propose multi-step plans. Offer one small, restoring action at most.
""".trimIndent()
        }

        if (focusHigh && activeLoadLow && planningLoadLow) {
            return """
TONE CALIBRATION [DIRECT_STRUCTURED]:
The user's current signals indicate high focus and available cognitive headroom.
Be concise and ambitious. Prefer structured output (lists, schedules, milestones).
This is a good window for deep work planning and goal advancement.
""".trimIndent()
        }

        return ""
    }

    // ========================================================================
    // Main Entry Points
    // ========================================================================

    /**
     * Build the system prompt for Atlas based on the current context mode.
     *
     * @param mode - The current conversation scope
     * @param nsvBlock - Pre-formatted NSV context string
     * @param extensionFieldsBlock - Serialized extension field values
     * @param dataContext - All Atlas entity data for general-mode context injection
     * @param nsvData - Raw NSV for tone calibration (general mode only)
     */
    fun buildAtlasPrompt(
        mode: AtlasContextMode,
        nsvBlock: String? = null,
        extensionFieldsBlock: String? = null,
        dataContext: AtlasDataContext? = null,
        nsvData: NeuralStateVector? = null
    ): String = when (mode) {
        is AtlasContextMode.General ->
            buildGeneralPrompt(nsvBlock, extensionFieldsBlock, dataContext, nsvData)
        is AtlasContextMode.TaskFocus ->
            buildTaskFocusPrompt(mode.task, nsvBlock)
        is AtlasContextMode.HabitReview ->
            buildHabitReviewPrompt(mode.habits, nsvBlock)
        is AtlasContextMode.GoalPlanning ->
            buildGoalPlanningPrompt(mode.goal, nsvBlock)
        is AtlasContextMode.FieldCrud ->
            buildFieldCrudPrompt(mode.currentExtensions)
    }

    /**
     * Backward-compatible entry point: builds general mode from AtlasProfile.
     */
    fun buildAtlasSessionPrompt(
        profile: AtlasProfile,
        options: AtlasSessionPromptOptions = AtlasSessionPromptOptions()
    ): String {
        val today = options.today
            ?.takeIf { it.isNotBlank() }
            ?.let { runCatching { LocalDate.parse(it) }.getOrNull() }
            ?: Clock.System.now().toLocalDateTime(TimeZone.currentSystemDefault()).date

        val dataBlock = buildProfileDataContextBlock(profile, today)

        return listOf(
            AtlasPersonaPrompts.base.systemPrompt.trim(),
            dataBlock.trim(),
            ENERGY_BUDGET_COMPUTATION_PROMPT
        ).joinToString("\n\n").trim()
    }

    // ========================================================================
    // General Mode
    // ========================================================================

    private fun buildGeneralPrompt(
        nsvBlock: String?,
        extensionFieldsBlock: String?,
        data: AtlasDataContext?,
        nsvData: NeuralStateVector?
    ): String {
        val parts = mutableListOf(AtlasPersonaPrompts.base.systemPrompt.trim())

        if (!extensionFieldsBlock.isNullOrBlank()) {
            parts += extensionFieldsBlock
        }

        if (!nsvBlock.isNullOrBlank()) {
            parts += nsvBlock
        }

        if (data != null) {
            val dataBlock = buildAtlasDataContextBlock(data)
            if (dataBlock.isNotBlank()) parts += dataBlock
        }

        val toneBlock = buildToneOverrideBlock(nsvData)
        if (toneBlock.isNotBlank()) {
            parts += toneBlock
        }

        parts += ENERGY_BUDGET_COMPUTATION_PROMPT
        parts += SUGGEST_DAILY_PLAN_ACTION_PROMPT

        return parts.joinToString("\n\n")
    }

    // ========================================================================
    // Task Focus Mode
    // ========================================================================

    private fun buildTaskFocusPrompt(task: AtlasTask, nsvBlock: String?): String {
        val dependencyList = if (task.dependencies.isNotEmpty())
            "Dependencies: ${task.dependencies.joinToString(", ")}"
        else "No dependencies"

        val nsvSection = if (!nsvBlock.isNullOrBlank()) "\nCOGNITIVE CONTEXT:\n$nsvBlock\n" else ""

        return """
IDENTITY: You are Atlas, focused on a single task.
You are providing targeted assistance for one specific task. Stay focused — do not plan the entire day.

CURRENT TASK:
- ID: ${task.id}
- Title: ${task.title}
- Status: ${task.status}
- Priority: ${task.priority}/5
- Energy Cost: ${task.energyCost}/10
- Deadline: ${task.deadline ?: "None set"}
- $dependencyList
- Description: ${task.description ?: "None"}
- Notes: ${task.notes ?: "None"}
- Tags: ${task.tags?.joinToString(", ") ?: "None"}
- Created: ${task.createdAt}
$nsvSection
ALLOWED ACTIONS:
- <action type="update_task">{"id":"${task.id}", ...changes}</action>
- <action type="complete_task">{"id":"${task.id}","completedAt":"ISO8601"}</action>
- <action type="move_task">{"id":"${task.id}","newSlot":"ISO8601","reason":"..."}</action>
- <action type="set_deadline">{"targetId":"${task.id}","targetType":"task","deadline":"ISO8601"}</action>
- <action type="create_task">{...sub-task linked to this task}</action>
- <action type="propose_reminder">{"title":"Reminder: ${task.title}","note":"...","dueAt":"ISO8601","recurrence":{"kind":"once","dueAt":"ISO8601"},"priority":"info","source":{"entityType":"task","entityId":"${task.id}","label":"${task.title}"}}</action>
- <action type="query_reminders">{"moduleId":"atlas"}</action>

RULES:
${RULES.joinToString("\n")}

SCOPE CONSTRAINT: Only discuss and modify THIS task. If the user asks about other tasks, suggest returning to the main Atlas view.
""".trimIndent()
    }

    // ========================================================================
    // Habit Review Mode
    // ========================================================================

    private fun buildHabitReviewPrompt(habits: List<AtlasHabit>, nsvBlock: String?): String {
        val habitLines = if (habits.isNotEmpty()) {
            habits.joinToString("\n") { h ->
                listOf(
                    "- [${h.status.uppercase()}] \"${h.title}\"",
                    "  Frequency: ${h.frequency} | Streak: ${h.currentStreak}/${h.targetStreak} (best: ${h.bestStreak})",
                    "  Energy: ${h.energyCost}/10 | MVV: \"${h.minimumViableVersion.ifBlank { "not set" }}\"",
                    "  Last completed: ${h.lastCompleted ?: "never"}"
                ).joinToString("\n")
            }
        } else "No habits tracked yet."

        val nsvSection = if (!nsvBlock.isNullOrBlank()) "\nCOGNITIVE CONTEXT:\n$nsvBlock\n" else ""

        return """
IDENTITY: You are Atlas, reviewing habit health.
You are providing guidance on habit streaks, motivation, and minimum viable versions.

ACTIVE HABITS:
$habitLines
$nsvSection
HABIT RULES:
- Protect high-streak habits (streak > 7) from schedule conflicts — they are momentum assets.
- When a streak breaks: acknowledge without shame. Offer a restart protocol.
- New habits use the minimum viable version principle (tiny habit). Escalate gradually.
- Paused habits retain their best streak as a reference point on resume.

ALLOWED ACTIONS:
- <action type="update_habit_streak">{"id":"habit_id","currentStreak":N,"lastCompleted":"ISO8601"}</action>
- <action type="pause_habit">{"id":"habit_id","reason":"...","resumeDate":"ISO8601"}</action>
- <action type="create_habit">{"title":"...","frequency":"[daily|weekly|custom]","targetStreak":[derive from user context],"energyCost":[0-10 based on user capacity],"minimumViableVersion":"..."}</action>
- <action type="update_habit">{"id":"habit_id",...changes}</action>
- <action type="propose_reminder">{"title":"Habit check-in: ...","note":"...","dueAt":"ISO8601","recurrence":{"kind":"weekly_by_days","daysOfWeek":[user's habit days],"timeOfDay":"[user's preferred time]"},"priority":"info","source":{"entityType":"habit","entityId":"habit_id","label":"..."}}</action>
- <action type="query_reminders">{"moduleId":"atlas"}</action>

RULES:
${RULES.joinToString("\n")}

SCOPE CONSTRAINT: Only discuss habits. For tasks or goals, suggest returning to the main Atlas view.
""".trimIndent()
    }

    // ========================================================================
    // Goal Planning Mode
    // ========================================================================

    private fun buildGoalPlanningPrompt(goal: AtlasGoal, nsvBlock: String?): String {
        val milestoneLines = if (goal.milestones.isNotEmpty()) {
            goal.milestones.mapIndexed { i, m ->
                val check = if (m.completed) "✅" else "⬜"
                val due = m.dueDate?.let { " (due: $it)" } ?: ""
                "  ${i + 1}. [$check] \"${m.title}\"$due"
            }.joinToString("\n")
        } else "  No milestones defined yet."

        val nsvSection = if (!nsvBlock.isNullOrBlank()) "\nCOGNITIVE CONTEXT:\n$nsvBlock\n" else ""

        return """
IDENTITY: You are Atlas, focused on goal architecture.
You are helping plan, break down, and track progress on a specific goal.

CURRENT GOAL:
- ID: ${goal.id}
- Title: ${goal.title}
- Status: ${goal.status}
- Progress: ${goal.progressPercent.toInt()}%
- Deadline: ${goal.deadline ?: "None set (goals without deadlines are wishes)"}
- Success Criteria: ${goal.successCriteria.ifBlank { "Not defined" }}
- Description: ${goal.description ?: "None"}
- Associated Tasks: ${goal.associatedTaskIds.size} linked tasks

MILESTONES:
$milestoneLines
$nsvSection
GOAL RULES:
- Break every goal into milestones. Break every milestone into tasks.
- Goals without deadlines are wishes. Gently push for a "committed by" date.
- Surface goal progress during reviews. Goals should never be invisible.

ALLOWED ACTIONS:
- <action type="update_goal_progress">{"id":"${goal.id}","completedMilestoneIds":["ms_id"]}</action>
- <action type="set_deadline">{"targetId":"${goal.id}","targetType":"goal","deadline":"ISO8601"}</action>
- <action type="create_task">{...task linked to goal via "goalId":"${goal.id}"}</action>
- <action type="update_goal">{"id":"${goal.id}", ...changes}</action>
- <action type="create_goal">{...new goal}</action>
- <action type="propose_reminder">{"title":"Goal check-in: ${goal.title}","note":"...","dueAt":"ISO8601","recurrence":{"kind":"every_n_days","intervalDays":[derive from goal timeline]},"priority":"info","source":{"entityType":"goal","entityId":"${goal.id}","label":"${goal.title}"}}</action>
- <action type="query_reminders">{"moduleId":"atlas"}</action>

RULES:
${RULES.joinToString("\n")}

SCOPE CONSTRAINT: Only discuss THIS goal and its milestones/tasks. For unrelated topics, suggest returning to the main Atlas view.
""".trimIndent()
    }

    // ========================================================================
    // Field CRUD Mode
    // ========================================================================

    private fun buildFieldCrudPrompt(currentExtensions: List<FieldDef>): String {
        val extensionList = if (currentExtensions.isNotEmpty()) {
            currentExtensions.joinToString("\n") { f ->
                "- \"${f.name}\" (${f.type}) — ${f.description ?: "No description"}"
            }
        } else "No custom fields yet."

        return """
IDENTITY: You are Atlas, managing custom productivity tracking fields.
You help users create, modify, or delete custom data fields for their Atlas productivity dashboard.

DOMAIN: Productivity, planning, energy management, task tracking, habit tracking, goal setting, focus optimization, cognitive load, time management.

IMPORTANT: This is a field management conversation. You have NO access to the user's wellness data, NSV scores, or personal context. You only see schema definitions.

CORE SCHEMA FIELDS (immutable — cannot be duplicated or shadowed):
- userId, energyBudget, planningLoad, taskCompletionRate, streakHealth
- urgencyPressure, peakProductivityTime, workStyle, priorityAreas
- habitTracking, goalReviewFrequency, procrastinationTriggers
- focusScore, openLoopCount, lastReview, nextReview

CURRENT EXTENSION FIELDS (user-created, max 15):
$extensionList
Extensions used: ${currentExtensions.size}/15

DOMAIN VALIDATION — YOUR RESPONSIBILITY:
You are the sole semantic domain validator. When a user proposes a field:
1. Is it relevant to productivity, planning, energy, focus, or cognitive work? → Approve
2. Is it a health/biometric field? → Reject, suggest Soma module
3. Is it an emotional/psychological field? → Reject, suggest Agnes module
4. Is it a financial field? → Reject, suggest Ledger module
5. Is it a fitness/training field? → Reject, suggest Titan module
6. Does the field ID conflict with core schema? → Reject with explanation

ALLOWED ACTIONS:
- <action type="suggest_field">{"name":"...","type":"number|range|text|select|boolean|date","description":"...","validation":{...},"metadata":{"category":"focus|energy|habits|meta","icon":"LucideIconName"}}</action>
- <action type="create_field">{"id":"kebab-case-id","name":"...","type":"...","description":"...","validation":{...},"metadata":{"category":"...","icon":"..."}}</action>
- <action type="delete_field">{"fieldId":"existing-field-id","reason":"..."}</action>

RULES:
- Field IDs must be kebab-case and unique across core + extensions
- Validate type consistency (defaultValue matches field type)
- Provide clear descriptions for every field
- Categories: focus, energy, habits, meta
- If rejecting, explain WHY and suggest the correct module
- Maximum 15 extension fields — warn user when approaching limit
""".trimIndent()
    }

    // ========================================================================
    // Extension Field Serialization
    // ========================================================================

    /**
     * Serialize extension field values for injection into general/task-focus prompts.
     */
    fun serializeAtlasExtensionFields(
        extensions: List<FieldDef>,
        values: Map<String, FieldVal> = emptyMap()
    ): String {
        if (extensions.isEmpty()) return ""

        val lines = extensions.map { field ->
            val fv = values[field.id]
            val currentValue = fv?.value ?: field.defaultValue ?: "—"

            val formatted = if (field.type == "range" && field.validationMax != null) {
                "$currentValue/${field.validationMax.toInt()}"
            } else {
                currentValue.toString()
            }

            val rangeStr = if (field.validationMin != null && field.validationMax != null)
                "${field.type}: ${field.validationMin.toInt()}-${field.validationMax.toInt()}"
            else field.type

            val lastUpdatedStr = fv?.timestamp?.let { ts ->
                // Simple epoch-to-date: just show the epoch millis; full date formatting
                // requires platform-specific code. The LLM can interpret epoch timestamps.
                ", updated $ts"
            } ?: ""

            "- ${field.name}: $formatted ($rangeStr$lastUpdatedStr)"
        }

        return "[CUSTOM TRACKED METRICS — ATLAS]\n${lines.joinToString("\n")}"
    }

    // ========================================================================
    // Greeting Templates
    // ========================================================================

    /** Context-appropriate greeting string per mode. */
    fun getAtlasGreeting(mode: AtlasContextMode, agentAlias: String): String = when (mode) {
        is AtlasContextMode.General ->
            "Cognitive link active. I am $agentAlias. Share task pressure, schedule constraints, or focus instability and I will reshape your wave."
        is AtlasContextMode.TaskFocus ->
            "Focused on: \"${mode.task.title}\". What do you need — breakdown, reschedule, or completion?"
        is AtlasContextMode.HabitReview ->
            "Reviewing ${mode.habits.size} habit(s). Let's check streaks and adjust if needed."
        is AtlasContextMode.GoalPlanning ->
            "Planning mode for: \"${mode.goal.title}\" (${mode.goal.progressPercent.toInt()}% complete). Where should we focus?"
        is AtlasContextMode.FieldCrud ->
            "Field management active. Describe what you want to track, or ask me to suggest productivity metrics."
    }

    // ========================================================================
    // Placeholder / Input Hint Templates
    // ========================================================================

    /** Chat input placeholder text per mode. */
    fun getAtlasPlaceholder(mode: AtlasContextMode): String = when (mode) {
        is AtlasContextMode.General ->
            "Share your schedule pressure, focus bottlenecks, or request load flattening..."
        is AtlasContextMode.TaskFocus ->
            "Ask about this task — break it down, reschedule, or mark complete..."
        is AtlasContextMode.HabitReview ->
            "Discuss streak health, adjust frequency, or pause a habit..."
        is AtlasContextMode.GoalPlanning ->
            "Plan milestones, link tasks, or update progress..."
        is AtlasContextMode.FieldCrud ->
            "Describe a productivity metric to track, or ask for suggestions..."
    }

    // ========================================================================
    // Action Gating
    // ========================================================================

    /** Check whether an action type is allowed in the given scope. */
    fun isActionAllowedInScope(actionType: String, scopeKind: String): Boolean {
        val allowed = ALLOWED_ACTIONS[scopeKind] ?: return false
        return actionType in allowed
    }

    // ========================================================================
    // Full Data Context Serializer (from AtlasDataContext)
    // ========================================================================

    private fun buildAtlasDataContextBlock(data: AtlasDataContext): String {
        val todayStr = data.today
            ?.takeIf { it.isNotBlank() }
            ?: Clock.System.now().toLocalDateTime(TimeZone.currentSystemDefault()).date.toString()
        val today = runCatching { LocalDate.parse(todayStr) }.getOrNull()
            ?: Clock.System.now().toLocalDateTime(TimeZone.currentSystemDefault()).date

        val parts = mutableListOf(LIVE_DATA_MARKER)

        // ── Projects ──
        data.projects?.let { projects ->
            val activeProjects = projects
                .filter { it.status == "active" || it.status == "paused" }
                .take(10)
            if (activeProjects.isNotEmpty()) {
                val lines = activeProjects.map { p ->
                    val deadlineStr = p.deadline?.let { " | due: $it" } ?: ""
                    val taskCountStr = " | tasks: ${p.taskIds.size}"
                    "  - [${p.status.uppercase()}] \"${p.title}\"$deadlineStr$taskCountStr"
                }
                parts += "ACTIVE PROJECTS (${activeProjects.size}):\n${lines.joinToString("\n")}"
            }
        }

        // ── Goals ──
        data.goals?.let { goals ->
            if (goals.isNotEmpty()) {
                val activeGoals = goals.filter { it.status != "abandoned" }.take(25)
                val now7 = today.plus(DatePeriod(days = 7))
                val now7Str = now7.toString()

                val goalLines = activeGoals.map { g ->
                    val deadline = g.deadline?.takeIf { it.isNotBlank() }?.take(10)
                    val deadlineStr = deadline?.let { " | deadline: $it" } ?: ""
                    val urgentMarker = if (deadline != null && deadline <= now7Str && deadline >= todayStr) " ⚠️" else ""
                    val criteriaStr = g.successCriteria.takeIf { it.isNotBlank() }?.let { c ->
                        val truncated = if (c.length > 80) c.take(80) + "..." else c
                        " | criteria: \"$truncated\""
                    } ?: ""
                    val totalMs = g.milestones.size
                    val doneMs = g.milestones.count { it.completed }
                    val nextMs = g.milestones.firstOrNull { !it.completed }
                    val msStr = if (totalMs > 0) {
                        val nextLabel = nextMs?.let { m ->
                            val t = if (m.title.length > 40) m.title.take(40) + "..." else m.title
                            " (next: \"$t\")"
                        } ?: " (all done)"
                        " | milestones: $doneMs/$totalMs$nextLabel"
                    } else ""
                    "  - [${g.status.uppercase()}] \"${g.title}\" — ${g.progressPercent.toInt()}% complete$deadlineStr$urgentMarker$criteriaStr$msStr"
                }
                parts += "GOALS (${activeGoals.size} active):\n${goalLines.joinToString("\n")}"

                val upcomingDeadlineGoals = activeGoals.filter { g ->
                    val d = g.deadline?.take(10)
                    d != null && d.isNotBlank() && d <= now7Str && d >= todayStr
                }
                if (upcomingDeadlineGoals.isNotEmpty()) {
                    val lines = upcomingDeadlineGoals.map { g ->
                        "  - \"${g.title}\" — due ${g.deadline?.take(10)} (${g.progressPercent.toInt()}% done)"
                    }
                    parts += "UPCOMING GOAL DEADLINES (next 7 days):\n${lines.joinToString("\n")}"
                }
            }
        }

        // ── Tasks (grouped by project/goal/unlinked) ──
        data.tasks?.let { tasks ->
            val activeTasks = tasks.filter { it.status in setOf("active", "queued", "blocked") }
            if (activeTasks.isNotEmpty()) {
                val isOverdue = { t: AtlasTask ->
                    val d = t.deadline?.take(10)
                    d != null && d.isNotBlank() && d < todayStr
                }
                val formatTask = { t: AtlasTask ->
                    val overdue = if (isOverdue(t)) " OVERDUE" else ""
                    val dueStr = t.deadline?.take(10)?.takeIf { it.isNotBlank() }?.let { " due:$it" } ?: ""
                    val depStr = if (t.status == "blocked") " [BLOCKED]" else ""
                    "    [P${t.priority}|E${t.energyCost}] \"${t.title}\" (${t.status})$dueStr$overdue$depStr"
                }

                val sorted = activeTasks.sortedWith { a, b ->
                    val aOv = isOverdue(a)
                    val bOv = isOverdue(b)
                    if (aOv != bOv) { if (aOv) -1 else 1 } else b.priority - a.priority
                }

                // Overdue tasks section
                val overdueTasks = sorted.filter { isOverdue(it) }
                if (overdueTasks.isNotEmpty()) {
                    parts += "OVERDUE TASKS (${overdueTasks.size}):\n${overdueTasks.map(formatTask).joinToString("\n")}"
                }

                // Group remaining by project, then goal, then unlinked
                val nonOverdue = sorted.filter { !isOverdue(it) }
                val grouped = mutableListOf<String>()
                val shownIds = mutableSetOf<String>()

                // By project
                val projectIds = nonOverdue.filter { it.projectId != null }.map { it.projectId!! }.distinct()
                for (pid in projectIds) {
                    val project = data.projects?.find { it.id == pid }
                    val projectTasks = nonOverdue.filter { it.projectId == pid }
                    val label = if (project != null) "Project: \"${project.title}\"" else "Project: ${pid.take(12)}"
                    grouped += "  $label (${projectTasks.size} tasks):"
                    projectTasks.take(8).forEach { grouped += formatTask(it) }
                    if (projectTasks.size > 8) grouped += "    ... +${projectTasks.size - 8} more"
                    projectTasks.forEach { shownIds += it.id }
                }

                // By goal (not already under a project)
                val goalIds = nonOverdue.filter { it.goalId != null && it.id !in shownIds }.map { it.goalId!! }.distinct()
                for (gid in goalIds) {
                    val goal = data.goals?.find { it.id == gid }
                    val goalTasks = nonOverdue.filter { it.goalId == gid && it.id !in shownIds }
                    val label = if (goal != null) "Goal: \"${goal.title}\"" else "Goal: ${gid.take(12)}"
                    grouped += "  $label (${goalTasks.size} tasks):"
                    goalTasks.take(6).forEach { grouped += formatTask(it) }
                    if (goalTasks.size > 6) grouped += "    ... +${goalTasks.size - 6} more"
                    goalTasks.forEach { shownIds += it.id }
                }

                // Unlinked tasks
                val unlinked = nonOverdue.filter { it.id !in shownIds && it.projectId == null && it.goalId == null }
                if (unlinked.isNotEmpty()) {
                    grouped += "  Unlinked tasks (${unlinked.size}):"
                    unlinked.take(10).forEach { grouped += formatTask(it) }
                    if (unlinked.size > 10) grouped += "    ... +${unlinked.size - 10} more"
                }

                parts += "ACTIVE TASKS (${activeTasks.size} total):\n${grouped.joinToString("\n")}"

                // Today's priority tasks
                val todayTasks = sorted.filter { t ->
                    val d = t.deadline?.take(10)
                    d.isNullOrBlank() || d <= todayStr
                }.take(8)
                if (todayTasks.isNotEmpty()) {
                    val lines = todayTasks.map { "  - [P${it.priority}] \"${it.title}\" — energy: ${it.energyCost}/10" }
                    parts += "TODAY'S PRIORITY TASKS:\n${lines.joinToString("\n")}"
                }
            }
        }

        // ── Habits ──
        data.habits?.let { habits ->
            val activeHabits = habits.filter { it.status == "active" }.take(10)
            if (activeHabits.isNotEmpty()) {
                val lines = activeHabits.map { h ->
                    val streakRisk = if (h.currentStreak > 0 && !h.lastCompleted.isNullOrBlank()) {
                        // Approximate streak-at-risk check: if lastCompleted > 20 hours ago
                        // we can't easily compute this without epoch millis, so include MVV instead
                        ""
                    } else ""
                    val mvvStr = h.minimumViableVersion.takeIf { it.isNotBlank() }?.let { mvv ->
                        val truncated = if (mvv.length > 60) mvv.take(60) + "..." else mvv
                        " | mvv: \"$truncated\""
                    } ?: ""
                    "  - \"${h.title}\" | streak: ${h.currentStreak}/${h.targetStreak} (best: ${h.bestStreak}) | ${h.frequency}$streakRisk$mvvStr"
                }
                parts += "ACTIVE HABITS (${activeHabits.size}):\n${lines.joinToString("\n")}"
            }
        }

        // ── Routine ──
        data.routine?.let { routine ->
            if (routine.isActive && routine.blocks.isNotEmpty()) {
                val tsDayOfWeek = tsDayOfWeekFromLocalDate(today)
                val todayBlocks = routine.blocks.filter { tsDayOfWeek in it.daysOfWeek }
                if (todayBlocks.isNotEmpty()) {
                    val lines = todayBlocks.map { b ->
                        "  - ${b.startTime}–${b.endTime}: \"${b.title}\" (${b.category}, E${b.energyCost})"
                    }
                    parts += "TODAY'S ROUTINE BLOCKS:\n${lines.joinToString("\n")}"
                }
            }
        }

        // ── Journal Summaries ──
        data.journalSummaries?.let { summaries ->
            if (summaries.isNotEmpty()) {
                val recent = summaries.takeLast(5).reversed()
                val lines = recent.map { j ->
                    val intentStr = j.morningIntent?.let { " | intent: \"${it.take(60)}\"" } ?: ""
                    val blockerStr = j.blockers?.let { " | blockers: \"${it.take(60)}\"" } ?: ""
                    val snippetStr = j.freeformSnippet?.let { " | wrote: \"${it.take(80)}...\"" } ?: ""
                    val eveningStr = j.eveningReflectionSnippet?.let { s ->
                        val truncated = if (s.length > 60) s.take(60) + "..." else s
                        " | evening: \"$truncated\""
                    } ?: ""
                    "  - ${j.date}: mood ${j.mood}/5, energy ${j.energyLevel}/5$intentStr$blockerStr$snippetStr$eveningStr"
                }
                parts += "RECENT JOURNAL ENTRIES (last ${recent.size}, summarised — raw content never exposed):\n${lines.joinToString("\n")}"
            }
        }

        // ── Today's Check-ins ──
        data.checkIns?.let { checkIns ->
            if (checkIns.isNotEmpty()) {
                val lines = checkIns.map { ci ->
                    val energyStr = ci.energyRating?.let { " energy: $it/5" } ?: ""
                    val moodStr = ci.moodRating?.let { " mood: $it/5" } ?: ""
                    val intentStr = ci.intention?.let { " intention: \"${it.take(80)}\"" } ?: ""
                    val reflectStr = ci.reflection?.let { " reflection: \"${it.take(80)}\"" } ?: ""
                    val timeSlice = ci.completedAt.let { if (it.length >= 16) it.substring(11, 16) else it }
                    "  - ${ci.type.uppercase()} ($timeSlice):$energyStr$moodStr$intentStr$reflectStr"
                }
                parts += "TODAY'S CHECK-INS:\n${lines.joinToString("\n")}"
            }
        }

        // ── Planning Alerts ──
        data.planningDigest?.let { digest ->
            if (digest.alerts.isNotEmpty()) {
                val alertLines = digest.alerts.map { a ->
                    val hint = a.actionHint?.let { " → ${it.take(60)}" } ?: ""
                    "  [${a.severity.uppercase()}] ${a.title}: ${a.detail.take(100)}$hint"
                }
                val summaryLine = if (digest.capacitySummary.isNotBlank())
                    "\n  Capacity: ${digest.capacitySummary.take(120)}" else ""
                val topRiskLine = digest.topRisk?.let { "\n  Top risk: ${it.take(80)}" } ?: ""
                parts += "[PLANNING ALERTS]\n${alertLines.joinToString("\n").take(400)}$summaryLine$topRiskLine"
            }
        }

        // ── Dependency Graph ──
        data.dependencyGraph?.let { dg ->
            val dgLines = mutableListOf<String>()

            if (dg.criticalPath.size > 1) {
                val pathTitles = dg.criticalPath.take(4).map { id ->
                    val task = data.tasks?.find { it.id == id }
                    if (task != null) "\"${task.title.take(25)}\"" else id.take(12)
                }
                val more = if (dg.criticalPath.size > 4) " → +${dg.criticalPath.size - 4} more" else ""
                dgLines += "  Critical path: ${pathTitles.joinToString(" → ")}$more"
            }

            dg.blockedChains.take(2).forEach { chain ->
                val rootTask = data.tasks?.find { it.id == chain.root }
                val rootLabel = if (rootTask != null) "\"${rootTask.title.take(25)}\"" else chain.root.take(12)
                dgLines += "  Blocked: $rootLabel blocks ${chain.chain.size} downstream task(s)"
            }

            if (dg.orphanTasks.isNotEmpty()) {
                dgLines += "  Orphan tasks: ${dg.orphanTasks.size} not linked to any goal/project"
            }

            if (dg.cycleDetected) {
                dgLines += "  WARNING: Dependency cycle detected in task graph"
            }

            if (dgLines.isNotEmpty()) {
                parts += "[DEPENDENCY GRAPH]\n${dgLines.joinToString("\n").take(300)}"
            }
        }

        // ── Goal Velocity ──
        data.goalVelocities?.let { velocities ->
            if (velocities.isNotEmpty()) {
                val lines = velocities.take(5).map { v ->
                    val riskLabel = v.riskLevel.uppercase().replace('-', ' ')
                    val paceStr = if (v.requiredVelocity != null)
                        "${v.actualVelocity} ms/wk actual vs ${v.requiredVelocity} required"
                    else "${v.actualVelocity} ms/wk"
                    val daysStr = v.daysRemaining?.let { ", ${it}d left" } ?: ""
                    val taskStr = if (v.linkedTaskCount > 0) ", tasks: ${v.linkedTasksDone}/${v.linkedTaskCount}" else ""
                    "  [$riskLabel] \"${v.title.take(30)}\" — ${v.completedMilestones}/${v.totalMilestones} ms, $paceStr$daysStr$taskStr"
                }
                parts += "[GOAL VELOCITY]\n${lines.joinToString("\n").take(400)}"
            }
        }

        // ── Capacity Snapshot ──
        data.capacitySnapshot?.let { cs ->
            val headroomSign = if (cs.headroom >= 0) "+" else ""
            val patternsStr = data.historicalPatterns?.let { hp ->
                val completion7d = "${(hp.completionRate7d * 100).toInt()}% (7d)"
                val completion30d = if (hp.completionRate30d > 0.0)
                    ", ${(hp.completionRate30d * 100).toInt()}% (30d)" else ""
                val accuracy = hp.avgEnergyAccuracy?.let { ", energy accuracy: ${(it * 100).toInt()}%" } ?: ""
                val peakHour = hp.peakProductivityHour?.let { ", peak hour: ${it}:00" } ?: ""
                " | Completion: $completion7d$completion30d$accuracy$peakHour"
            } ?: ""
            val pressureStr = if (cs.pressurePoints.isNotEmpty())
                "\n  Pressure: ${cs.pressurePoints.take(2).joinToString("; ").take(100)}"
            else ""
            parts += "[CAPACITY SNAPSHOT]\n  State: ${cs.state.uppercase()} | Capacity: ${cs.safeCapacity} | Demand: ${cs.plannedDemand} | Headroom: $headroomSign${cs.headroom}$patternsStr$pressureStr".take(450)
        }

        return parts.joinToString("\n\n")
    }

    // ========================================================================
    // Profile-based Data Context (backward-compat for buildAtlasSessionPrompt)
    // ========================================================================

    private fun buildProfileDataContextBlock(profile: AtlasProfile, today: LocalDate): String {
        val parts = mutableListOf<String>()
        parts += LIVE_DATA_MARKER

        formatGoals(profile.goals, today)?.let { parts += it }
        formatTasks(profile.tasks, today)?.let { parts += it }
        formatHabits(profile.habits)?.let { parts += it }
        formatTodayRoutineBlocks(profile.routine.blocks, profile.routine.isActive, today)?.let { parts += it }

        return parts.joinToString("\n\n")
    }

    // ========================================================================
    // Private Formatters (used by profile-based path)
    // ========================================================================

    private fun formatGoals(goals: List<AtlasGoal>, today: LocalDate): String? {
        if (goals.isEmpty()) return null

        val activeGoals = goals
            .filter { it.status != "abandoned" }
            .take(25)

        if (activeGoals.isEmpty()) return null

        val now7 = today.plus(DatePeriod(days = 7))
        val now7Str = now7.toString()
        val todayStr = today.toString()

        val goalLines = activeGoals.map { g ->
            val deadline = g.deadline?.takeIf { it.isNotBlank() }?.take(10)
            val deadlineStr = deadline?.let { " | deadline: $it" } ?: ""
            val urgentMarker = if (deadline != null && deadline <= now7Str && deadline >= todayStr) " ⚠️" else ""
            "  - [${g.status.uppercase()}] \"${g.title}\" — ${g.progressPercent.toInt()}% complete${deadlineStr}${urgentMarker}"
        }

        val base = buildString {
            append("GOALS (${activeGoals.size} active):\n")
            append(goalLines.joinToString("\n"))
        }

        val upcomingDeadlineGoals = activeGoals.filter { g ->
            val d = g.deadline?.take(10)
            d != null && d.isNotBlank() && d <= now7Str && d >= todayStr
        }

        return if (upcomingDeadlineGoals.isEmpty()) {
            base
        } else {
            val deadlineLines = upcomingDeadlineGoals.map { g ->
                "  - \"${g.title}\" — due ${g.deadline?.take(10)} (${g.progressPercent.toInt()}% done)"
            }
            buildString {
                append(base)
                append("\n\nUPCOMING GOAL DEADLINES (next 7 days):\n")
                append(deadlineLines.joinToString("\n"))
            }
        }
    }

    private fun formatTasks(tasks: List<AtlasTask>, today: LocalDate): String? {
        if (tasks.isEmpty()) return null
        val activeTasks = tasks.filter { it.status in setOf("active", "queued", "blocked") }
        if (activeTasks.isEmpty()) return null

        val todayStr = today.toString()
        val overdueFirst = { t: AtlasTask ->
            val d = t.deadline?.take(10)
            d != null && d.isNotBlank() && d < todayStr
        }

        val sorted = activeTasks.sortedWith { a, b ->
            val aOverdue = overdueFirst(a)
            val bOverdue = overdueFirst(b)
            if (aOverdue != bOverdue) {
                if (aOverdue) -1 else 1
            } else {
                b.priority - a.priority
            }
        }

        val topTasks = sorted.take(15)
        val taskLines = topTasks.map { t ->
            val overdue = if (overdueFirst(t)) " 🔴OVERDUE" else ""
            val dueStr = t.deadline?.take(10)?.takeIf { it.isNotBlank() }?.let { " | due: $it" } ?: ""
            "  - [P${t.priority}|E${t.energyCost}] \"${t.title}\" (${t.status})${dueStr}${overdue}"
        }

        val todayTasks = sorted
            .filter { t ->
                val d = t.deadline?.take(10)
                d.isNullOrBlank() || d <= todayStr
            }
            .take(8)

        val todayLines = todayTasks.map { t ->
            "  - [P${t.priority}] \"${t.title}\" — energy: ${t.energyCost}/10"
        }

        return buildString {
            append("ACTIVE TASKS (${activeTasks.size} total, top ${topTasks.size} shown):\n")
            append(taskLines.joinToString("\n"))
            if (todayLines.isNotEmpty()) {
                append("\n\nTODAY'S PRIORITY TASKS:\n")
                append(todayLines.joinToString("\n"))
            }
        }
    }

    private fun formatHabits(habits: List<AtlasHabit>): String? {
        if (habits.isEmpty()) return null
        val activeHabits = habits.filter { it.status == "active" }.take(10)
        if (activeHabits.isEmpty()) return null

        val habitLines = activeHabits.map { h ->
            "  - \"${h.title}\" | streak: ${h.currentStreak}/${h.targetStreak} (best: ${h.bestStreak}) | ${h.frequency}"
        }

        return buildString {
            append("ACTIVE HABITS (${activeHabits.size}):\n")
            append(habitLines.joinToString("\n"))
        }
    }

    private fun formatTodayRoutineBlocks(
        blocks: List<RoutineBlock>,
        isActive: Boolean,
        today: LocalDate
    ): String? {
        if (!isActive || blocks.isEmpty()) return null

        val tsDayOfWeek = tsDayOfWeekFromLocalDate(today)
        val todayBlocks = blocks.filter { tsDayOfWeek in it.daysOfWeek }
        if (todayBlocks.isEmpty()) return null

        val blockLines = todayBlocks.map { b ->
            "  - ${b.startTime}–${b.endTime}: \"${b.title}\" (${b.category}, E${b.energyCost})"
        }
        return "TODAY'S ROUTINE BLOCKS:\n${blockLines.joinToString("\n")}"
    }

    // ========================================================================
    // Utilities
    // ========================================================================

    /** Convert kotlinx LocalDate dayOfWeek to JS-style (0=Sunday..6=Saturday). */
    private fun tsDayOfWeekFromLocalDate(date: LocalDate): Int = when (date.dayOfWeek) {
        DayOfWeek.SUNDAY -> 0
        DayOfWeek.MONDAY -> 1
        DayOfWeek.TUESDAY -> 2
        DayOfWeek.WEDNESDAY -> 3
        DayOfWeek.THURSDAY -> 4
        DayOfWeek.FRIDAY -> 5
        DayOfWeek.SATURDAY -> 6
        else -> 0
    }
}
