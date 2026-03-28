package com.agnes.nexus.core.domain.services.atlas

import com.agnes.nexus.core.domain.models.AtlasGoal
import com.agnes.nexus.core.domain.models.AtlasHabit
import com.agnes.nexus.core.domain.models.AtlasProfile
import com.agnes.nexus.core.domain.models.AtlasTask
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
 * KMP Atlas prompt builder (web parity oriented).
 *
 * Notes:
 * - Implements the general-mode system prompt assembly as:
 *   ATLAS_PERSONA + [ATLAS LIVE DATA...] + ENERGY_BUDGET_COMPUTATION_PROMPT
 * - Additional scopes (task-focus/habit-review/goal-planning/field-crud) can be layered
 *   later once Android has the full web data shapes and action gating parity.
 */
object AtlasPromptBuilder {

    private const val LIVE_DATA_MARKER =
        "[ATLAS LIVE DATA — DO NOT FABRICATE ANY VALUES BELOW]"

    // Ported from web: ENERGY_BUDGET_COMPUTATION_PROMPT (general mode fragment).
    private val ENERGY_BUDGET_COMPUTATION_PROMPT =
        """
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

    fun buildAtlasSessionPrompt(
        profile: AtlasProfile,
        options: AtlasSessionPromptOptions = AtlasSessionPromptOptions()
    ): String {
        // Web general prompt: ATLAS_PERSONA + (optional context blocks) + ENERGY_BUDGET_COMPUTATION_PROMPT
        val today = options.today
            ?.takeIf { it.isNotBlank() }
            ?.let { runCatching { LocalDate.parse(it) }.getOrNull() }
            ?: Clock.System.now().toLocalDateTime(TimeZone.currentSystemDefault()).date

        val dataBlock = buildAtlasDataContextBlock(profile, today)

        return listOf(
            AtlasPersonaPrompts.base.systemPrompt.trim(),
            dataBlock.trim(),
            ENERGY_BUDGET_COMPUTATION_PROMPT
        ).joinToString("\n\n").trim()
    }

    private fun buildAtlasDataContextBlock(profile: AtlasProfile, today: LocalDate): String {
        val parts = mutableListOf<String>()
        parts += LIVE_DATA_MARKER

        formatGoals(profile.goals, today)?.let { parts += it }
        formatTasks(profile.tasks, today)?.let { parts += it }
        formatHabits(profile.habits)?.let { parts += it }
        formatTodayRoutineBlocks(profile.routine.blocks, profile.routine.isActive, today)?.let { parts += it }

        // Web supports Journal Summaries and Check-ins; current KMP model only includes dailyCheckIns
        // (different shape than web's AtlasJournalSummary/AtlasCheckInSummary), so we intentionally omit
        // to avoid fabricating mismatched fields.

        return parts.joinToString("\n\n")
    }

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

        // Web sort: overdue first, then priority desc.
        val sorted = activeTasks.sortedWith { a, b ->
            val aOverdue = overdueFirst(a)
            val bOverdue = overdueFirst(b)
            if (aOverdue != bOverdue) {
                // false(0) should come after true(1)
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
            // Web streak risk compares last completed recency; current KMP model doesn't guarantee
            // a consistent parseable format, so we omit the "streak at risk" marker for now.
            val streakRisk = ""
            "  - \"${h.title}\" | streak: ${h.currentStreak}/${h.targetStreak} (best: ${h.bestStreak}) | ${h.frequency}$streakRisk"
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

        // TS uses JS Date.getDay() (0=Sunday..6=Saturday).
        val tsDayOfWeek = when (today.dayOfWeek) {
            DayOfWeek.SUNDAY -> 0
            DayOfWeek.MONDAY -> 1
            DayOfWeek.TUESDAY -> 2
            DayOfWeek.WEDNESDAY -> 3
            DayOfWeek.THURSDAY -> 4
            DayOfWeek.FRIDAY -> 5
            DayOfWeek.SATURDAY -> 6
            else -> 0
        }

        val todayBlocks = blocks
            .filter { it.daysOfWeek.contains(tsDayOfWeek) }

        if (todayBlocks.isEmpty()) return null

        val blockLines = todayBlocks.map { b ->
            "  - ${b.startTime}–${b.endTime}: \"${b.title}\" (${b.category}, E${b.energyCost})"
        }
        return "TODAY'S ROUTINE BLOCKS:\n${blockLines.joinToString("\n")}"
    }
}

