package com.agnes.ara.core.domain.services

import kotlinx.datetime.Clock
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.Instant
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime

/**
 * Spine cascade rules aligned with the Nexus web app.
 * Uses AraSettings as the localStorage equivalent when available.
 */
object SpineCascadeDefaults {
    private const val ATLAS_LAST_WEEKLY_REVIEW_KEY = "atlas_last_weekly_review"
    private const val MORNING_BRIEF_KEY = "atlas_last_morning_brief"
    private const val EVENING_CHECKIN_KEY = "atlas_last_evening_checkin"
    private const val SEVEN_DAYS_MS = 7L * 24 * 60 * 60 * 1000

    fun register(eventBus: SpineEventBus, settings: AraSettings? = null) {
        registerLedgerCascadeRules(eventBus)
        registerAgnesCascadeRules(eventBus)
        registerTitanCascadeRules(eventBus)
        registerTitanPostPumpRules(eventBus)
        registerSomaCascadeRules(eventBus)
        registerAtlasCascadeRules(eventBus, settings)
        registerAtlasFailureRules(eventBus)
        registerAtlasPlanningCascadeRules(eventBus)
        registerCircularCascadeRules(eventBus)
        registerCompletedCascadeRules(eventBus)
    }

    fun registerCompletedCascadeRules(eventBus: SpineEventBus) {
        eventBus.registerCascadeRules(COMPLETED_CASCADE_RULES)
    }

    fun registerLedgerCascadeRules(eventBus: SpineEventBus) {
        eventBus.registerCascadeRules(LEDGER_CASCADE_RULES)
    }

    fun registerTitanCascadeRules(eventBus: SpineEventBus) {
        eventBus.registerCascadeRules(TITAN_CASCADE_RULES)
    }

    fun registerTitanPostPumpRules(eventBus: SpineEventBus) {
        eventBus.registerCascadeRules(TITAN_POST_PUMP_RULES)
    }

    fun registerAgnesCascadeRules(eventBus: SpineEventBus) {
        eventBus.registerCascadeRules(AGNES_CASCADE_RULES)
    }

    fun registerAtlasCascadeRules(eventBus: SpineEventBus, settings: AraSettings? = null) {
        eventBus.registerCascadeRules(weeklyReviewRules(settings))
        eventBus.registerCascadeRules(ATLAS_MORNING_RULES(settings))
        eventBus.registerCascadeRules(ATLAS_JOURNAL_RULES)
    }

    fun registerAtlasFailureRules(eventBus: SpineEventBus) {
        eventBus.registerCascadeRules(ATLAS_FAILURE_RULES)
    }

    fun registerAtlasPlanningCascadeRules(eventBus: SpineEventBus) {
        eventBus.registerCascadeRules(ATLAS_PLANNING_CASCADE_RULES)
    }

    // -----------------------------------------------------------------------
    // Ledger cascade rules
    // -----------------------------------------------------------------------

    val LEDGER_CASCADE_RULES: List<CascadeRule> = listOf(
        CascadeRule(
            id = "ledger-transaction-to-budget",
            trigger = "TRANSACTION_CREATED",
            condition = { true },
            transform = { event ->
                SpineEventPayload(
                    type = "BUDGET_UPDATED",
                    domain = "R",
                    source = event.source,
                    priority = event.priority,
                    data = mapOf(
                        "transactionAmount" to event.data["amount"],
                        "transactionType" to event.data["type"],
                        "netCashflow" to event.data["netCashflow"]
                    )
                )
            }
        ),
        CascadeRule(
            id = "ledger-goal-progress-to-health",
            trigger = "GOAL_PROGRESS",
            condition = { true },
            transform = { event ->
                val progress = (event.data["percentComplete"] as? Number)?.toDouble()
                SpineEventPayload(
                    type = "FINANCIAL_HEALTH_CHECK",
                    domain = "R",
                    source = event.source,
                    priority = event.priority,
                    data = mapOf(
                        "goalProgress" to progress,
                        "goalName" to event.data["goalName"],
                        "healthScore" to progress?.div(10.0)
                    )
                )
            }
        ),
        CascadeRule(
            id = "ledger-risk-to-alert",
            trigger = "RISK_DETECTED",
            condition = { true },
            transform = { event ->
                val riskType = event.data["riskType"]
                SpineEventPayload(
                    type = "FINANCIAL_FRICTION_CHANGED",
                    domain = "R",
                    source = event.source,
                    priority = event.priority,
                    data = mapOf(
                        "newScore" to 8.5,
                        "analysis" to "Risk detected: $riskType",
                        "tier" to "elevated"
                    )
                )
            }
        ),
        // L2 — Friction > 0.8 → Atlas Runway Audit Request (Spec §1.1)
        CascadeRule(
            id = "ledger-friction-threshold-atlas-audit",
            trigger = "FRICTION_THRESHOLD_EXCEEDED",
            condition = { it.type == "FRICTION_THRESHOLD_EXCEEDED" },
            transform = { event ->
                SpineEventPayload(
                    type = "ATLAS_AUDIT_REQUEST_RUNWAY",
                    source = "ledger",
                    priority = "critical",
                    requiresApproval = true,
                    data = mapOf(
                        "triggeredBy"       to "FRICTION_THRESHOLD_EXCEEDED",
                        "projectedFriction" to event.data["projectedFriction"],
                        "auditType"         to "RUNWAY_REVIEW",
                        "message"           to "Financial friction exceeded 0.8. Atlas: review the Runway and non-essential spend.",
                        "timestamp"         to Clock.System.now().toString()
                    )
                )
            }
        ),
        // L3 — Runway critical → Autopilot locked to Level 1 (Spec §1.2)
        // (RunwayService emits NEXUS_AUTOPILOT_LOCK directly; this cascade handles
        //  any downstream RUNWAY_UPDATED event with CRITICAL status for belt-and-suspenders)
        CascadeRule(
            id = "ledger-runway-critical-autopilot-lock",
            trigger = "RUNWAY_UPDATED",
            condition = { it.type == "RUNWAY_UPDATED" && it.data["status"] == "CRITICAL" },
            transform = { event ->
                SpineEventPayload(
                    type = "NEXUS_AUTOPILOT_LOCK",
                    source = "ledger",
                    priority = "critical",
                    data = mapOf(
                        "triggeredBy" to "RUNWAY_UPDATED",
                        "lockLevel"   to 1,
                        "reason"      to "runway_critical",
                        "runwayDays"  to event.data["runwayDays"],
                        "scope"       to "non_essential_spending",
                        "message"     to "Runway critical. Autopilot locked to Level 1 (Manual) for non-essential spending.",
                        "timestamp"   to Clock.System.now().toString()
                    )
                )
            }
        ),
        // S4a — High-friction impulse spend (R < -0.8) → Agnes pings "Scarcity" belief node
        CascadeRule(
            id = "ledger-impulse-friction-agnes-scarcity-ping",
            trigger = "RESONANCE_FRICTION_UPDATED",
            condition = { it.type == "RESONANCE_FRICTION_UPDATED" && (it.data["avgResonance"] as? Number)?.toFloat()?.let { r -> r < -0.8f } == true },
            transform = { event ->
                SpineEventPayload(
                    type = "AGNES_SCARCITY_NODE_PING",
                    source = "ledger",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy"    to "RESONANCE_FRICTION_UPDATED",
                        "avgResonance"   to event.data["avgResonance"],
                        "frictionDelta"  to event.data["frictionDelta"],
                        "beliefNodeHint" to "Scarcity",
                        "probeMessage"   to "High-friction impulse spending detected (resonance ${event.data["avgResonance"]}). Agnes: check Scarcity node — is this a financial coping mechanism?",
                        "timestamp"      to Clock.System.now().toString()
                    )
                )
            }
        )
    )

    /** Alias — core cascade rules used by App-level registration. */
    val CORE_CASCADE_RULES: List<CascadeRule> = LEDGER_CASCADE_RULES

    // -----------------------------------------------------------------------
    // Soma cascade rules
    // -----------------------------------------------------------------------

    val SOMA_CASCADE_RULES: List<CascadeRule> = listOf(
        // S4b — Blood work (USER) processed → revoke Titan clearance if anomaly detected
        CascadeRule(
            id = "soma-clinical-upload-user-titan-clearance-revoke",
            trigger = "CLINICAL_UPLOAD_PROCESSED",
            condition = { it.type == "CLINICAL_UPLOAD_PROCESSED" && it.data["anomalyCount"].let { c -> (c as? Number)?.toInt()?.let { n -> n > 0 } == true } },
            transform = { event ->
                SpineEventPayload(
                    type = "TITAN_CLEARANCE_VETOED",
                    source = "soma",
                    priority = "critical",
                    data = mapOf(
                        "triggeredBy"  to "CLINICAL_UPLOAD_PROCESSED",
                        "reason"       to "biomarker_anomaly",
                        "anomalyCount" to event.data["anomalyCount"],
                        "detail"       to "Soma clinical upload detected ${event.data["anomalyCount"]} biomarker anomalies. Titan clearance revoked pending review.",
                        "proposalType" to "REST_OR_LOW_STIFFNESS_CARDIO",
                        "timestamp"    to Clock.System.now().toString()
                    )
                )
            }
        ),
        // S4c — Override Veto → flag for Weekly Review Surgical Review
        CascadeRule(
            id = "soma-override-veto-weekly-review-flag",
            trigger = "OVERRIDE_VETO",
            condition = { it.type == "OVERRIDE_VETO" },
            transform = { event ->
                SpineEventPayload(
                    type = "WEEKLY_REVIEW_FLAG",
                    source = "soma",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "OVERRIDE_VETO",
                        "reason"      to "system_debt_incurred",
                        "agent"       to event.data["agent"],
                        "vitalityAtOverride" to event.data["vitalityAtOverride"],
                        "summary"     to "System Debt incurred: user forced output at vitality=${event.data["vitalityAtOverride"]}. Recovery rate halved.",
                        "timestamp"   to Clock.System.now().toString()
                    )
                )
            }
        )
    )

    fun registerSomaCascadeRules(eventBus: SpineEventBus) {
        eventBus.registerCascadeRules(SOMA_CASCADE_RULES)
    }

    val TITAN_CASCADE_RULES: List<CascadeRule> = listOf(
        CascadeRule(
            id = "titan-workout-completed-to-vital-updated",
            trigger = "WORKOUT_COMPLETED",
            condition = { true },
            transform = { event ->
                SpineEventPayload(
                    type = "VITAL_UPDATED",
                    domain = "B",
                    source = "spine-cascade",
                    priority = "info",
                    data = mapOf(
                        "triggeredBy" to "WORKOUT_COMPLETED",
                        "volume" to event.data["volume"],
                        "duration" to event.data["duration"],
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "titan-recovery-needed-to-flatten-energy-wave",
            trigger = "TITAN_RECOVERY_NEEDED",
            condition = { it.type == "TITAN_RECOVERY_NEEDED" },
            transform = { event ->
                SpineEventPayload(
                    type = "FLATTEN_ENERGY_WAVE",
                    domain = "C",
                    source = "spine-cascade",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "TITAN_RECOVERY_NEEDED",
                        "cnsFatigue" to event.data["cnsFatigue"],
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        // T3 — Recovery Mode State Transformer (Spec §3.3)
        // When Titan enters Recovery Mode, cache the active routine to Atlas Horizon (backlog).
        CascadeRule(
            id = "titan-recovery-mode-cache-routine-to-horizon",
            trigger = "TITAN_UI_MODE_RECOVERY",
            condition = { it.type == "TITAN_UI_MODE_RECOVERY" },
            transform = { event ->
                SpineEventPayload(
                    type = "TITAN_CACHE_ROUTINE_TO_HORIZON",
                    domain = "B",
                    source = "spine-cascade",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "TITAN_UI_MODE_RECOVERY",
                        "routineId" to (event.data["routineId"] ?: ""),
                        "reason" to (event.data["reason"] ?: "recovery_mode_active"),
                        "action" to "DEFER_ACTIVE_ROUTINE_TO_ATLAS_HORIZON",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        // T3b — Veto clearance also triggers routine cache to Horizon
        CascadeRule(
            id = "titan-clearance-vetoed-cache-routine",
            trigger = "TITAN_CLEARANCE_VETOED",
            condition = { it.type == "TITAN_CLEARANCE_VETOED" && (it.data["routineId"] as? String).isNullOrBlank().not() },
            transform = { event ->
                SpineEventPayload(
                    type = "TITAN_CACHE_ROUTINE_TO_HORIZON",
                    domain = "B",
                    source = "spine-cascade",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "TITAN_CLEARANCE_VETOED",
                        "routineId" to (event.data["routineId"] ?: ""),
                        "reason" to (event.data["reason"] ?: "clearance_vetoed"),
                        "action" to "DEFER_ACTIVE_ROUTINE_TO_ATLAS_HORIZON",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        // T4 — "To the Dot" adherence → Atlas marks task done + Agnes Dopamine Anchor (Spec §4)
        CascadeRule(
            id = "titan-to-the-dot-success-agnes-dopamine-anchor",
            trigger = "TO_THE_DOT_SUCCESS",
            condition = { it.type == "TO_THE_DOT_SUCCESS" },
            transform = { event ->
                SpineEventPayload(
                    type = "AGNES_DOPAMINE_ANCHOR",
                    domain = "A",
                    source = "spine-cascade",
                    priority = "info",
                    data = mapOf(
                        "triggeredBy" to "TO_THE_DOT_SUCCESS",
                        "routineId" to (event.data["routineId"] ?: ""),
                        "routineName" to (event.data["routineName"] ?: ""),
                        "message" to "Routine adherence confirmed. Positive reinforcement queued.",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        )
    )

    // -----------------------------------------------------------------------
    // Atlas Weekly Review Cascade Rule (S9-005)
    // -----------------------------------------------------------------------

    private fun isWeeklyReviewDue(settings: AraSettings?): Boolean {
        val now = Clock.System.now()
        val local = now.toLocalDateTime(TimeZone.currentSystemDefault())
        val isSundayEvening = local.dayOfWeek == DayOfWeek.SUNDAY && local.hour in 18..21
        if (isSundayEvening) return true

        val lastReview = settings?.getString(ATLAS_LAST_WEEKLY_REVIEW_KEY, null) ?: return true
        val lastInstant = parseInstant(lastReview) ?: return true
        return now.toEpochMilliseconds() - lastInstant.toEpochMilliseconds() > SEVEN_DAYS_MS
    }

    private fun weeklyReviewRules(settings: AraSettings?): List<CascadeRule> = listOf(
        CascadeRule(
            id = "atlas-weekly-review-due-session",
            trigger = "SESSION_STARTED",
            condition = { isWeeklyReviewDue(settings) },
            transform = { event ->
                SpineEventPayload(
                    type = "WEEKLY_REVIEW_DUE",
                    domain = "C",
                    source = event.source,
                    priority = "info",
                    data = mapOf(
                        "triggeredBy" to "SESSION_STARTED",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "atlas-weekly-review-due-state",
            trigger = "ATLAS_STATE_CHANGED",
            condition = { isWeeklyReviewDue(settings) },
            transform = { event ->
                SpineEventPayload(
                    type = "WEEKLY_REVIEW_DUE",
                    domain = "C",
                    source = event.source,
                    priority = "info",
                    data = mapOf(
                        "triggeredBy" to "ATLAS_STATE_CHANGED",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        )
    )

    // -----------------------------------------------------------------------
    // Agnes Somatic Support Cascade Rule (S14-006)
    // -----------------------------------------------------------------------

    val AGNES_CASCADE_RULES: List<CascadeRule> = listOf(
        CascadeRule(
            id = "agnes-burnout-to-somatic-support",
            trigger = "BURNOUT_WARNING",
            condition = { true },
            transform = { event ->
                SpineEventPayload(
                    type = "SOMATIC_SUPPORT_REQUESTED",
                    domain = "E",
                    source = "spine-cascade",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "BURNOUT_WARNING",
                        "cnsFatigue" to event.data["cnsFatigue"],
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "agnes-stress-spike-to-financial-health-check",
            trigger = "STRESS_SPIKE",
            condition = { event ->
                val stressLoad = (event.data["stressLoad"] as? Number)?.toDouble()
                stressLoad != null && stressLoad >= 8.0
            },
            transform = { event ->
                SpineEventPayload(
                    type = "FINANCIAL_HEALTH_CHECK",
                    domain = "R",
                    source = "spine-cascade",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "STRESS_SPIKE",
                        "stressLoad" to event.data["stressLoad"],
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "agnes-financial-friction-to-somatic-support",
            trigger = "FINANCIAL_FRICTION_CHANGED",
            condition = { event ->
                val friction = (event.data["friction"] as? Number)?.toDouble()
                    ?: (event.data["newScore"] as? Number)?.toDouble()
                friction != null && friction >= 7.0
            },
            transform = { event ->
                SpineEventPayload(
                    type = "SOMATIC_SUPPORT_REQUESTED",
                    domain = "E",
                    source = "spine-cascade",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "FINANCIAL_FRICTION_CHANGED",
                        "friction" to (event.data["friction"] ?: event.data["newScore"]),
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        )
    )

    // -----------------------------------------------------------------------
    // Atlas Morning / Evening Intelligence Cadence (S9-007)
    // -----------------------------------------------------------------------

    private fun isMorningBriefDue(settings: AraSettings?): Boolean {
        val now = Clock.System.now()
        val local = now.toLocalDateTime(TimeZone.currentSystemDefault())
        val hour = local.hour
        if (hour < 5 || hour >= 11) return false
        val last = settings?.getString(MORNING_BRIEF_KEY, null) ?: return true
        val lastLocal = parseInstant(last)?.toLocalDateTime(TimeZone.currentSystemDefault())?.date ?: return true
        return lastLocal != local.date
    }

    private fun isEveningCheckinDue(settings: AraSettings?): Boolean {
        val now = Clock.System.now()
        val local = now.toLocalDateTime(TimeZone.currentSystemDefault())
        val hour = local.hour
        if (hour < 19 || hour >= 22) return false
        val last = settings?.getString(EVENING_CHECKIN_KEY, null) ?: return true
        val lastLocal = parseInstant(last)?.toLocalDateTime(TimeZone.currentSystemDefault())?.date ?: return true
        return lastLocal != local.date
    }

    private fun ATLAS_MORNING_RULES(settings: AraSettings?): List<CascadeRule> = listOf(
        CascadeRule(
            id = "atlas-morning-brief-session",
            trigger = "SESSION_STARTED",
            condition = { isMorningBriefDue(settings) },
            transform = { event ->
                SpineEventPayload(
                    type = "MORNING_BRIEF_DUE",
                    domain = "C",
                    source = event.source,
                    priority = "info",
                    data = mapOf(
                        "triggeredBy" to "SESSION_STARTED",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "atlas-evening-checkin-session",
            trigger = "SESSION_STARTED",
            condition = { isEveningCheckinDue(settings) },
            transform = { event ->
                SpineEventPayload(
                    type = "EVENING_CHECKIN_DUE",
                    domain = "C",
                    source = event.source,
                    priority = "info",
                    data = mapOf(
                        "triggeredBy" to "SESSION_STARTED",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        )
    )

    // -----------------------------------------------------------------------
    // Atlas Journal Cascade Rules — reflection-streak milestone
    // -----------------------------------------------------------------------

    val ATLAS_JOURNAL_RULES: List<CascadeRule> = listOf(
        CascadeRule(
            id = "atlas-journal-reflection-streak-milestone",
            trigger = "JOURNAL_ENTRY_CREATED",
            condition = { event ->
                val streak = (event.data["reflectionStreak"] as? Number)?.toInt()
                streak != null && streak >= 7
            },
            transform = { event ->
                SpineEventPayload(
                    type = "HABIT_STREAK_MILESTONE",
                    domain = "C",
                    source = "spine-cascade",
                    priority = "info",
                    data = mapOf(
                        "source" to "atlas",
                        "habitName" to "Daily Reflection",
                        "streak" to event.data["reflectionStreak"]
                    )
                )
            }
        )
    )

    // -----------------------------------------------------------------------
    // Atlas Failure Notification Loop (S9-008)
    // -----------------------------------------------------------------------

    val ATLAS_FAILURE_RULES: List<CascadeRule> = listOf(
        CascadeRule(
            id = "atlas-commitment-missed-to-routine-disrupted",
            trigger = "COMMITMENT_MISSED",
            condition = { true },
            transform = { event ->
                SpineEventPayload(
                    type = "ROUTINE_UPDATED",
                    domain = "C",
                    source = event.source,
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "COMMITMENT_MISSED",
                        "overdueCount" to event.data["overdueCount"],
                        "taskIds" to event.data["taskIds"]
                    )
                )
            }
        ),
        CascadeRule(
            id = "atlas-habit-streak-broken-to-somatic-support",
            trigger = "HABIT_STREAK_BROKEN",
            condition = { event ->
                val days = (event.data["streakDays"] as? Number)?.toInt()
                days != null && days >= 3
            },
            transform = { event ->
                SpineEventPayload(
                    type = "SOMATIC_SUPPORT_REQUESTED",
                    domain = "E",
                    source = "spine-cascade",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "HABIT_STREAK_BROKEN",
                        "streakDays" to event.data["streakDays"],
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        )
    )

    // -----------------------------------------------------------------------
    // Atlas Planning Intelligence Cascade Rules (Atlas Audit)
    // -----------------------------------------------------------------------

    val ATLAS_PLANNING_CASCADE_RULES: List<CascadeRule> = listOf(
        CascadeRule(
            id = "atlas-goal-updated-to-state-changed",
            trigger = "ATLAS_GOAL_UPDATED",
            condition = { true },
            transform = { event ->
                SpineEventPayload(
                    type = "ATLAS_STATE_CHANGED",
                    domain = "C",
                    source = "spine-cascade",
                    priority = "info",
                    data = mapOf(
                        "triggeredBy" to "ATLAS_GOAL_UPDATED",
                        "goalId" to event.data["goalId"],
                        "action" to event.data["action"],
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "atlas-goal-completed-to-milestone",
            trigger = "ATLAS_GOAL_UPDATED",
            condition = { event -> event.data["action"] == "completed" },
            transform = { event ->
                SpineEventPayload(
                    type = "ATLAS_GOAL_MILESTONE",
                    domain = "C",
                    source = "spine-cascade",
                    priority = "info",
                    data = mapOf(
                        "triggeredBy" to "ATLAS_GOAL_UPDATED",
                        "goalId" to event.data["goalId"],
                        "title" to event.data["title"],
                        "progressPercent" to 100,
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "atlas-deadline-pressure-high-to-crunch",
            trigger = "DEADLINE_PRESSURE_CHANGED",
            condition = { event ->
                val pressure = (event.data["deadlinePressure"] as? Number)?.toInt()
                pressure != null && pressure >= 8
            },
            transform = { event ->
                SpineEventPayload(
                    type = "DEADLINE_CRUNCH",
                    domain = "C",
                    source = "spine-cascade",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "DEADLINE_PRESSURE_CHANGED",
                        "deadlinePressure" to event.data["deadlinePressure"],
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "atlas-planning-state-updated-to-vital",
            trigger = "PLANNING_STATE_UPDATED",
            condition = { true },
            transform = { event ->
                SpineEventPayload(
                    type = "VITAL_UPDATED",
                    domain = "C",
                    source = "spine-cascade",
                    priority = "info",
                    data = mapOf(
                        "triggeredBy" to "PLANNING_STATE_UPDATED",
                        "changedFields" to event.data["changedFields"],
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        )
    )

    private fun parseInstant(value: String?): Instant? {
        if (value.isNullOrBlank()) return null
        return try {
            Instant.parse(value)
        } catch (_: Exception) {
            null
        }
    }

    // -----------------------------------------------------------------------
    // Circular cascade rules — Nexus Master Spec §5
    // -----------------------------------------------------------------------

    /**
     * The 6 Circular Cascade paths from Nexus Master Spec §5.
     * These implement the reactive chain: Input → Spine Mutation → Agent Cascade.
     */
    fun registerCircularCascadeRules(eventBus: SpineEventBus) {
        eventBus.registerCascadeRules(CIRCULAR_CASCADE_RULES)
    }

    val CIRCULAR_CASCADE_RULES: List<CascadeRule> = listOf(

        // ── Path 1: Manual Action → bandwidth +0.1 → Agnes logs achievement ──
        CascadeRule(
            id = "circular-manual-action-bandwidth",
            trigger = "MANUAL_ACTION_COMPLETED",
            condition = { it.type == "MANUAL_ACTION_COMPLETED" },
            transform = { event ->
                SpineEventPayload(
                    type = "ACHIEVEMENT_LOGGED",
                    source = "agnes",
                    priority = "info",
                    mutations = listOf(SpineSoulMutation("BANDWIDTH", +0.1f)),
                    data = mapOf(
                        "triggeredBy" to "MANUAL_ACTION_COMPLETED",
                        "sourceModule" to event.source,
                        "actionId" to event.data["actionId"]
                    )
                )
            }
        ),

        // ── Path 2: Passive Bio-Sync → vitality -0.5 → Titan hides heavy UI + Atlas pushes deadlines ──
        CascadeRule(
            id = "circular-biosync-vitality-titan",
            trigger = "BIO_SYNC",
            condition = { event ->
                val vitality = (event.data["vitality"] as? Number)?.toFloat() ?: 1.0f
                vitality < 0.5f
            },
            transform = { event ->
                val vitality = (event.data["vitality"] as? Number)?.toFloat() ?: 0.5f
                val delta = -(0.5f - vitality).coerceIn(0f, 0.5f)
                SpineEventPayload(
                    type = "TITAN_UI_MODE_RECOVERY",
                    source = "titan",
                    priority = "alert",
                    mutations = listOf(SpineSoulMutation("VITALITY", delta)),
                    data = mapOf(
                        "triggeredBy" to "BIO_SYNC",
                        "uiMode" to "RECOVERY",
                        "reason" to "low_vitality_biosync"
                    )
                )
            }
        ),

        CascadeRule(
            id = "circular-biosync-vitality-atlas",
            trigger = "BIO_SYNC",
            condition = { event ->
                val vitality = (event.data["vitality"] as? Number)?.toFloat() ?: 1.0f
                vitality < 0.5f
            },
            transform = { event ->
                SpineEventPayload(
                    type = "ATLAS_PUSH_DEADLINES",
                    source = "atlas",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "BIO_SYNC",
                        "reason" to "low_vitality_capacity_reduction",
                        "vitality" to (event.data["vitality"] ?: 0)
                    )
                )
            }
        ),

        // ── Path 3: Blabber → multi-vector → Agnes invites session + Ledger pings runway ──
        CascadeRule(
            id = "circular-blabber-agnes-session",
            trigger = "BLABBER_INGESTED",
            condition = { event ->
                val gravity = (event.data["sentimentGravity"] as? Number)?.toFloat() ?: 0.0f
                gravity > 0.8f
            },
            transform = { event ->
                SpineEventPayload(
                    type = "AGNES_SESSION_INVITATION",
                    source = "agnes",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "BLABBER_INGESTED",
                        "sentimentGravity" to (event.data["sentimentGravity"] ?: 0),
                        "suggestedMode" to "DEEP"
                    )
                )
            }
        ),

        CascadeRule(
            id = "circular-blabber-ledger-runway",
            trigger = "BLABBER_INGESTED",
            condition = { event ->
                val topics = (event.data["semanticTags"] as? List<*>) ?: emptyList<Any>()
                topics.any { it.toString().contains("finance", ignoreCase = true) ||
                             it.toString().contains("money", ignoreCase = true) ||
                             it.toString().contains("debt", ignoreCase = true) }
            },
            transform = { _ ->
                SpineEventPayload(
                    type = "LEDGER_RUNWAY_PING",
                    source = "ledger",
                    priority = "info",
                    data = mapOf("triggeredBy" to "BLABBER_INGESTED", "reason" to "financial_topic_detected")
                )
            }
        ),

        // ── Agnes → Atlas: INFER_TASK_COMPLETE — Agnes victory silently checks Atlas task box ──
        CascadeRule(
            id = "agnes-victory-infer-task-complete",
            trigger = "AGNES_SESSION_END",
            condition = { event -> event.data.containsKey("victoryKeyword") },
            transform = { event ->
                SpineEventPayload(
                    type = "INFER_TASK_COMPLETE",
                    source = "atlas",
                    priority = "info",
                    mutations = listOf(SpineSoulMutation("BANDWIDTH", +0.05f)),
                    data = mapOf(
                        "keyword" to (event.data["victoryKeyword"] ?: ""),
                        "triggeredBy" to "AGNES_SESSION_END",
                        "reason" to "psychological_victory_attributed_to_task"
                    )
                )
            }
        ),

        // ── Soma → Atlas: VITALITY_CRITICAL — Blueprint locked for high-weight tasks ──
        CascadeRule(
            id = "soma-vitality-critical-atlas-lock",
            trigger = "VITALITY_CRITICAL",
            condition = { event ->
                val vitality = (event.data["vitality"] as? Number)?.toFloat() ?: 1.0f
                vitality < 0.5f
            },
            transform = { event ->
                SpineEventPayload(
                    type = "ATLAS_BLUEPRINT_LOCKED",
                    source = "atlas",
                    priority = "alert",
                    data = mapOf(
                        "reason" to "vitality_critical",
                        "vitality" to (event.data["vitality"] ?: 0),
                        "message" to "Blueprint locked: no high-weight tasks until vitality > 0.5",
                        "unlockCondition" to "vitality_gt_0.5"
                    )
                )
            }
        ),

        // ── Ledger → Atlas: friction > 0.8 → insert "Material Review" task ──
        CascadeRule(
            id = "ledger-friction-material-review",
            trigger = "FINANCIAL_STRESS",
            condition = { event ->
                val friction = (event.data["friction"] as? Number)?.toFloat() ?: 0.0f
                friction > 0.8f
            },
            transform = { event ->
                SpineEventPayload(
                    type = "ATLAS_INSERT_PRIORITY_TASK",
                    source = "atlas",
                    priority = "alert",
                    data = mapOf(
                        "taskTitle" to "Material Review",
                        "taskDescription" to "High financial friction detected. Review and resolve resource constraints.",
                        "cognitiveWeight" to 0.4f,
                        "priority" to 1,
                        "scheduledFor" to "tomorrow_top",
                        "triggeredBy" to "FINANCIAL_STRESS",
                        "friction" to (event.data["friction"] ?: 0)
                    )
                )
            }
        ),

        // ── Path 4: Clinical Upload (USER) → vitality baseline → Titan recovery + Atlas lower capacity ──
        CascadeRule(
            id = "circular-clinical-upload-user-titan",
            trigger = "CLINICAL_UPLOAD_PROCESSED",
            condition = { event -> event.logicGates.patientScope.name == "USER" },
            transform = { event ->
                SpineEventPayload(
                    type = "TITAN_RECOVERY_SUGGESTED",
                    source = "titan",
                    priority = "alert",
                    patientScope = SpinePatientScope.USER,
                    data = mapOf(
                        "triggeredBy" to "CLINICAL_UPLOAD_PROCESSED",
                        "reason" to "clinical_data_updated",
                        "documentType" to (event.data["documentType"] ?: "REPORT")
                    )
                )
            }
        ),

        CascadeRule(
            id = "circular-clinical-upload-user-atlas",
            trigger = "CLINICAL_UPLOAD_PROCESSED",
            condition = { event -> event.logicGates.patientScope.name == "USER" },
            transform = { event ->
                SpineEventPayload(
                    type = "ATLAS_LOWER_CAPACITY",
                    source = "atlas",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "CLINICAL_UPLOAD_PROCESSED",
                        "reason" to "health_update_reduces_bandwidth"
                    )
                )
            }
        ),

        // ── Path 5: Clinical Upload (GUEST) → NULL — firewall active ──
        // Enforced at the emit() gate level (patientScope=GUEST zeroes mutations).
        // No cascade rule needed — the bus handles this transparently.

        // ── Path 6: Agent Collision (Work vs Rest) → Agnes wins via precedence ──
        CascadeRule(
            id = "circular-collision-agnes-wins",
            trigger = "CONFLICT_DETECTED",
            condition = { event ->
                val modules = (event.data["affectedModules"] as? List<*>) ?: emptyList<Any>()
                modules.any { it.toString().equals("agnes", ignoreCase = true) }
            },
            transform = { event ->
                SpineEventPayload(
                    type = "ATLAS_WORK_BLOCK_TO_REST",
                    source = "agnes",
                    priority = "critical",
                    mutations = listOf(SpineSoulMutation("RESILIENCE", +0.1f)),
                    data = mapOf(
                        "triggeredBy" to "CONFLICT_DETECTED",
                        "reason" to "agnes_precedence_win",
                        "conflictId" to (event.data["conflictId"] ?: "")
                    )
                )
            }
        ),

        // ── Crying Override: resilience < 0.2 → VETO_PRIORITY_1 → Agnes-Only UI ─────────────
        CascadeRule(
            id = "crying-override-veto",
            trigger = "SOUL_MUTATION_APPLIED",
            condition = { event ->
                val resilience = (event.data["resilience"] as? Number)?.toFloat() ?: 1.0f
                resilience < 0.2f
            },
            transform = { _ ->
                SpineEventPayload(
                    type = "VETO_PRIORITY_1",
                    source = "agnes",
                    priority = "critical",
                    requiresApproval = false,
                    data = mapOf(
                        "reason" to "emotional_crash",
                        "threshold" to 0.2f,
                        "message" to "Resilience floor breached. Agnes override active."
                    )
                )
            }
        ),

        CascadeRule(
            id = "crying-override-atlas-hide",
            trigger = "VETO_PRIORITY_1",
            condition = { event -> event.data["reason"] == "emotional_crash" },
            transform = { _ ->
                SpineEventPayload(
                    type = "ATLAS_HIDE_BLUEPRINT",
                    source = "agnes",
                    priority = "critical",
                    data = mapOf("reason" to "agnes_veto", "restoreOn" to "AGNES_SESSION_END")
                )
            }
        ),

        CascadeRule(
            id = "crying-override-titan-hide",
            trigger = "VETO_PRIORITY_1",
            condition = { event -> event.data["reason"] == "emotional_crash" },
            transform = { _ ->
                SpineEventPayload(
                    type = "TITAN_HIDE_PERFORMANCE",
                    source = "agnes",
                    priority = "critical",
                    data = mapOf("reason" to "agnes_veto", "restoreOn" to "AGNES_SESSION_END")
                )
            }
        ),

        CascadeRule(
            id = "crying-override-nexus-morph",
            trigger = "VETO_PRIORITY_1",
            condition = { event -> event.data["reason"] == "emotional_crash" },
            transform = { _ ->
                SpineEventPayload(
                    type = "NEXUS_MORPH_AGNES_ONLY",
                    source = "agnes",
                    priority = "critical",
                    data = mapOf(
                        "reason" to "agnes_veto",
                        "uiMode" to "agnes_only",
                        "message" to "System is focusing on your emotional state."
                    )
                )
            }
        )
    )

    // -----------------------------------------------------------------------
    // Completed cascade rules — 15 new cascades (parity with web spine-cascade-defaults.ts)
    // -----------------------------------------------------------------------

    val COMPLETED_CASCADE_RULES: List<CascadeRule> = listOf(
        CascadeRule(
            id = "risk-detected-flatten-energy-wave",
            trigger = "RISK_DETECTED",
            condition = { true },
            transform = { event ->
                SpineEventPayload(
                    type = "FLATTEN_ENERGY_WAVE",
                    source = "spine-cascade",
                    target = "atlas",
                    domain = "C",
                    priority = event.priority,
                    data = mapOf(
                        "triggeredBy" to "RISK_DETECTED",
                        "source" to (event.data["source"] ?: event.source),
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "risk-detected-somatic-support",
            trigger = "RISK_DETECTED",
            condition = { true },
            transform = { event ->
                SpineEventPayload(
                    type = "SOMATIC_SUPPORT_REQUESTED",
                    source = "spine-cascade",
                    target = "agnes",
                    domain = "E",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "RISK_DETECTED",
                        "source" to (event.data["source"] ?: event.source),
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "clearance-denied-somatic-support",
            trigger = "CLEARANCE_DENIED",
            condition = { true },
            transform = { event ->
                SpineEventPayload(
                    type = "SOMATIC_SUPPORT_REQUESTED",
                    source = "spine-cascade",
                    target = "agnes",
                    domain = "E",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "CLEARANCE_DENIED",
                        "reason" to event.data["reason"],
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            },
            suppressionGates = listOf(SuppressionGate("WORKOUT_SESSION_STARTED", 30L * 60 * 1000))
        ),
        CascadeRule(
            id = "clearance-granted-vital-updated",
            trigger = "CLEARANCE_GRANTED",
            condition = { true },
            transform = { _ ->
                SpineEventPayload(
                    type = "VITAL_UPDATED",
                    source = "spine-cascade",
                    domain = "B",
                    priority = "info",
                    data = mapOf(
                        "triggeredBy" to "CLEARANCE_GRANTED",
                        "clearanceStatus" to "granted",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "weekly-review-due-atlas",
            trigger = "WEEKLY_REVIEW_DUE",
            condition = { true },
            transform = { _ ->
                SpineEventPayload(
                    type = "ATLAS_REVIEW_REQUESTED",
                    source = "spine-cascade",
                    target = "atlas",
                    domain = "C",
                    priority = "info",
                    data = mapOf(
                        "triggeredBy" to "WEEKLY_REVIEW_DUE",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "weekly-review-due-soma",
            trigger = "WEEKLY_REVIEW_DUE",
            condition = { true },
            transform = { _ ->
                SpineEventPayload(
                    type = "SOMA_CHECKIN_REQUESTED",
                    source = "spine-cascade",
                    target = "soma",
                    domain = "B",
                    priority = "info",
                    data = mapOf(
                        "triggeredBy" to "WEEKLY_REVIEW_DUE",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "weekly-review-due-ledger",
            trigger = "WEEKLY_REVIEW_DUE",
            condition = { true },
            transform = { _ ->
                SpineEventPayload(
                    type = "LEDGER_SUMMARY_REQUESTED",
                    source = "spine-cascade",
                    target = "ledger",
                    domain = "R",
                    priority = "info",
                    data = mapOf(
                        "triggeredBy" to "WEEKLY_REVIEW_DUE",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "morning-brief-atlas",
            trigger = "MORNING_BRIEF",
            condition = { true },
            transform = { _ ->
                SpineEventPayload(
                    type = "ATLAS_BRIEF_REQUESTED",
                    source = "spine-cascade",
                    target = "atlas",
                    domain = "C",
                    priority = "info",
                    data = mapOf(
                        "triggeredBy" to "MORNING_BRIEF",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "morning-brief-titan",
            trigger = "MORNING_BRIEF",
            condition = { true },
            transform = { _ ->
                SpineEventPayload(
                    type = "TITAN_READINESS_REQUESTED",
                    source = "spine-cascade",
                    target = "titan",
                    domain = "B",
                    priority = "info",
                    data = mapOf(
                        "triggeredBy" to "MORNING_BRIEF",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "morning-brief-ledger",
            trigger = "MORNING_BRIEF",
            condition = { true },
            transform = { _ ->
                SpineEventPayload(
                    type = "LEDGER_CASHFLOW_REQUESTED",
                    source = "spine-cascade",
                    target = "ledger",
                    domain = "R",
                    priority = "info",
                    data = mapOf(
                        "triggeredBy" to "MORNING_BRIEF",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "habit-streak-broken-atlas-task-blocked",
            trigger = "HABIT_STREAK_BROKEN",
            condition = { true },
            transform = { event ->
                SpineEventPayload(
                    type = "ATLAS_TASK_BLOCKED",
                    source = "spine-cascade",
                    target = "atlas",
                    domain = "C",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "HABIT_STREAK_BROKEN",
                        "context" to "streak broken",
                        "habitName" to event.data["habitName"],
                        "streakDays" to event.data["streakDays"],
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "atlas-energy-overload-risk-detected",
            trigger = "ATLAS_ENERGY_OVERLOAD",
            condition = { true },
            transform = { _ ->
                SpineEventPayload(
                    type = "RISK_DETECTED",
                    source = "spine-cascade",
                    domain = "C",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "ATLAS_ENERGY_OVERLOAD",
                        "source" to "atlas",
                        "trigger" to "energy_overload",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "atlas-energy-overload-flatten",
            trigger = "ATLAS_ENERGY_OVERLOAD",
            condition = { true },
            transform = { _ ->
                SpineEventPayload(
                    type = "FLATTEN_ENERGY_WAVE",
                    source = "spine-cascade",
                    target = "atlas",
                    domain = "C",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "ATLAS_ENERGY_OVERLOAD",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "cognitive-overload-risk-detected",
            trigger = "COGNITIVE_OVERLOAD",
            condition = { true },
            transform = { _ ->
                SpineEventPayload(
                    type = "RISK_DETECTED",
                    source = "spine-cascade",
                    domain = "C",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "COGNITIVE_OVERLOAD",
                        "source" to "orchestrator",
                        "trigger" to "cognitive_overload",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "cognitive-overload-somatic-support",
            trigger = "COGNITIVE_OVERLOAD",
            condition = { true },
            transform = { _ ->
                SpineEventPayload(
                    type = "SOMATIC_SUPPORT_REQUESTED",
                    source = "spine-cascade",
                    target = "agnes",
                    domain = "E",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "COGNITIVE_OVERLOAD",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "financial-friction-updated-vital",
            trigger = "FINANCIAL_FRICTION_UPDATED",
            condition = { true },
            transform = { event ->
                SpineEventPayload(
                    type = "VITAL_UPDATED",
                    source = "spine-cascade",
                    domain = "R",
                    priority = "info",
                    data = mapOf(
                        "triggeredBy" to "FINANCIAL_FRICTION_UPDATED",
                        "vector" to "resource.financialFriction",
                        "financialFriction" to event.data["financialFriction"],
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "financial-friction-updated-risk",
            trigger = "FINANCIAL_FRICTION_UPDATED",
            condition = { event ->
                val friction = (event.data["financialFriction"] as? Number)?.toDouble()
                friction != null && friction > 7.0
            },
            transform = { event ->
                SpineEventPayload(
                    type = "RISK_DETECTED",
                    source = "spine-cascade",
                    domain = "R",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "FINANCIAL_FRICTION_UPDATED",
                        "financialFriction" to event.data["financialFriction"],
                        "source" to "ledger",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "compound-stress-somatic-support",
            trigger = "COMPOUND_STRESS",
            condition = { true },
            transform = { _ ->
                SpineEventPayload(
                    type = "SOMATIC_SUPPORT_REQUESTED",
                    source = "spine-cascade",
                    target = "agnes",
                    domain = "E",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "COMPOUND_STRESS",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "compound-stress-recovery-window",
            trigger = "COMPOUND_STRESS",
            condition = { true },
            transform = { _ ->
                SpineEventPayload(
                    type = "ATLAS_RECOVERY_WINDOW_CREATED",
                    source = "spine-cascade",
                    target = "atlas",
                    domain = "C",
                    priority = "info",
                    data = mapOf(
                        "triggeredBy" to "COMPOUND_STRESS",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        // Guard: only escalate RISK_DETECTED when cascade hasn't already propagated too deep
        CascadeRule(
            id = "compound-stress-risk-detected",
            trigger = "COMPOUND_STRESS",
            condition = { event -> event.cascadeDepth < 2 },
            transform = { _ ->
                SpineEventPayload(
                    type = "RISK_DETECTED",
                    source = "spine-cascade",
                    domain = "C",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "COMPOUND_STRESS",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "burnout-warning-flatten-energy-wave",
            trigger = "BURNOUT_WARNING",
            condition = { true },
            transform = { _ ->
                SpineEventPayload(
                    type = "FLATTEN_ENERGY_WAVE",
                    source = "spine-cascade",
                    target = "atlas",
                    domain = "C",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "BURNOUT_WARNING",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "burnout-warning-titan-recovery",
            trigger = "BURNOUT_WARNING",
            condition = { true },
            transform = { _ ->
                SpineEventPayload(
                    type = "TITAN_RECOVERY_NEEDED",
                    source = "spine-cascade",
                    target = "titan",
                    domain = "B",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "BURNOUT_WARNING",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "soma-clearance-changed-denied",
            trigger = "SOMA_CLEARANCE_CHANGED",
            condition = { event -> event.data["clearanceStatus"] == "denied" },
            transform = { event ->
                SpineEventPayload(
                    type = "CLEARANCE_DENIED",
                    source = "spine-cascade",
                    domain = "B",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "SOMA_CLEARANCE_CHANGED",
                        "clearanceStatus" to "denied",
                        "reason" to event.data["reason"],
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "soma-clearance-changed-granted",
            trigger = "SOMA_CLEARANCE_CHANGED",
            condition = { event -> event.data["clearanceStatus"] == "granted" },
            transform = { event ->
                SpineEventPayload(
                    type = "CLEARANCE_GRANTED",
                    source = "spine-cascade",
                    domain = "B",
                    priority = "info",
                    data = mapOf(
                        "triggeredBy" to "SOMA_CLEARANCE_CHANGED",
                        "clearanceStatus" to "granted",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "overspend-detected-budget-alert",
            trigger = "OVERSPEND_DETECTED",
            condition = { true },
            transform = { event ->
                SpineEventPayload(
                    type = "BUDGET_ALERT",
                    source = "spine-cascade",
                    domain = "R",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "OVERSPEND_DETECTED",
                        "overspendAmount" to event.data["overspendAmount"],
                        "category" to event.data["category"],
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        // Repeated overspend (count > 1) propagates friction signal upstream
        CascadeRule(
            id = "overspend-detected-friction-updated",
            trigger = "OVERSPEND_DETECTED",
            condition = { event ->
                val count = (event.data["overspendCount"] as? Number)?.toInt()
                count != null && count > 1
            },
            transform = { event ->
                SpineEventPayload(
                    type = "FINANCIAL_FRICTION_UPDATED",
                    source = "spine-cascade",
                    domain = "R",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "OVERSPEND_DETECTED",
                        "overspendCount" to event.data["overspendCount"],
                        "category" to event.data["category"],
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "workout-session-completed-atlas-energy",
            trigger = "WORKOUT_SESSION_COMPLETED",
            condition = { true },
            transform = { event ->
                SpineEventPayload(
                    type = "ATLAS_ENERGY_UPDATED",
                    source = "spine-cascade",
                    target = "atlas",
                    domain = "C",
                    priority = "info",
                    data = mapOf(
                        "triggeredBy" to "WORKOUT_SESSION_COMPLETED",
                        "duration" to event.data["duration"],
                        "cognitiveLoadUpdated" to true,
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "workout-session-completed-titan-recovery",
            trigger = "WORKOUT_SESSION_COMPLETED",
            condition = { event ->
                val fatigue = (event.data["cnsFatigue"] as? Number)?.toDouble()
                fatigue != null && fatigue > 8.0
            },
            transform = { event ->
                SpineEventPayload(
                    type = "TITAN_RECOVERY_NEEDED",
                    source = "spine-cascade",
                    target = "titan",
                    domain = "B",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "WORKOUT_SESSION_COMPLETED",
                        "cnsFatigue" to event.data["cnsFatigue"],
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),
        CascadeRule(
            id = "atlas-task-completed-vital-updated",
            trigger = "ATLAS_TASK_COMPLETED",
            condition = { true },
            transform = { event ->
                SpineEventPayload(
                    type = "VITAL_UPDATED",
                    source = "spine-cascade",
                    domain = "C",
                    priority = "info",
                    data = mapOf(
                        "triggeredBy" to "ATLAS_TASK_COMPLETED",
                        "vector" to "taskCompletionRate",
                        "taskId" to event.data["taskId"],
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        )
    )

    // -----------------------------------------------------------------------
    // Recovery Library — maps crash reason to recovery prescription (Spec §3.3)
    // -----------------------------------------------------------------------

    /**
     * Maps the reason a Recovery Mode was triggered to a specific restorative prescription.
     * Titan injects this content into the Maintenance HUD when entering Recovery Mode.
     */
    object RecoveryLibrary {
        enum class CrashReason { HIGH_INFLAMMATION, LOW_HRV, LOW_RESILIENCE, CNS_OVERLOAD, LOW_VITALITY, GENERIC }

        data class RecoveryPrescription(
            val label: String,
            val modality: String,         // e.g. "Cold Exposure", "Zone 2 Cardio"
            val durationMinutes: Int?,
            val notes: String
        )

        fun prescribeFor(reason: CrashReason): RecoveryPrescription = when (reason) {
            CrashReason.HIGH_INFLAMMATION -> RecoveryPrescription(
                label = "Cold Exposure + Rest",
                modality = "Cold Exposure",
                durationMinutes = null,
                notes = "Soma reports high inflammation. Ice bath or cold shower, then full rest. No training today."
            )
            CrashReason.LOW_HRV -> RecoveryPrescription(
                label = "Zone 2 Cardio",
                modality = "Zone 2",
                durationMinutes = 30,
                notes = "HRV is suppressed. Light aerobic work at conversational pace only. No intensity."
            )
            CrashReason.LOW_RESILIENCE -> RecoveryPrescription(
                label = "Low-Stiffness Mobility",
                modality = "Mobility",
                durationMinutes = 20,
                notes = "Agnes reports low resilience. Gentle flow or restorative yoga. Movement as nervous system regulation."
            )
            CrashReason.CNS_OVERLOAD -> RecoveryPrescription(
                label = "Complete Rest",
                modality = "Rest",
                durationMinutes = null,
                notes = "CNS load is critical. No physical output today. Sleep, walk, or float."
            )
            CrashReason.LOW_VITALITY -> RecoveryPrescription(
                label = "Active Recovery",
                modality = "Active Recovery",
                durationMinutes = 20,
                notes = "Vitality is low. Light walking or stretching only. Focus on parasympathetic activation."
            )
            CrashReason.GENERIC -> RecoveryPrescription(
                label = "Rest or Mobility",
                modality = "Rest",
                durationMinutes = null,
                notes = "System flagged recovery need. Choose rest or gentle mobility based on how you feel."
            )
        }

        fun reasonFromString(reason: String?): CrashReason = when (reason) {
            "high_inflammation"  -> CrashReason.HIGH_INFLAMMATION
            "low_hrv"            -> CrashReason.LOW_HRV
            "low_resilience", "agnes_resilience_crash" -> CrashReason.LOW_RESILIENCE
            "cns_calibration_auto_recovery", "cns_overload" -> CrashReason.CNS_OVERLOAD
            "low_vitality_biosync" -> CrashReason.LOW_VITALITY
            else                 -> CrashReason.GENERIC
        }
    }

    // -----------------------------------------------------------------------
    // Post-Pump Window Cascade Rules (Spec §4 — Titan Inter-Agent Dynamics)
    // -----------------------------------------------------------------------

    val TITAN_POST_PUMP_RULES: List<CascadeRule> = listOf(

        // PP1 — High-tonnage session → Soma Delayed Fatigue flag (24h preemptive dip)
        CascadeRule(
            id = "titan-post-pump-soma-delayed-fatigue",
            trigger = "WORKOUT_COMPLETED",
            condition = { it.type == "WORKOUT_COMPLETED" && (it.data["totalTonnage"] as? Number)?.toFloat()?.let { t -> t > 3000f } == true },
            transform = { event ->
                SpineEventPayload(
                    type = "SOMA_DELAYED_FATIGUE_FLAG",
                    source = "titan",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "WORKOUT_COMPLETED",
                        "totalTonnage" to event.data["totalTonnage"],
                        "expectedFatigueWindowMs" to 86_400_000L, // 24 hours
                        "message" to "High-tonnage session logged. Soma predicts readiness dip in ~24h. Atlas preemptively alerted.",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),

        // PP1b — Soma Delayed Fatigue → Atlas defer non-critical tasks for 24h
        CascadeRule(
            id = "titan-post-pump-soma-to-atlas-defer",
            trigger = "SOMA_DELAYED_FATIGUE_FLAG",
            condition = { it.type == "SOMA_DELAYED_FATIGUE_FLAG" },
            transform = { event ->
                SpineEventPayload(
                    type = "ATLAS_DEFER_TASKS_24H",
                    source = "soma",
                    priority = "alert",
                    data = mapOf(
                        "triggeredBy" to "SOMA_DELAYED_FATIGUE_FLAG",
                        "reason" to "delayed_fatigue_window",
                        "deferPriorityBelow" to 2, // only defer low-priority tasks
                        "message" to "Titan logged a heavy session. Deferring non-critical Atlas tasks for 24h.",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),

        // PP2 — Session missed without a Veto → Agnes investigates Self-Sabotage
        CascadeRule(
            id = "titan-session-missed-agnes-lazy-bum-probe",
            trigger = "SESSION_MISSED",
            condition = { it.type == "SESSION_MISSED" && it.data["vetoActive"] != true },
            transform = { event ->
                SpineEventPayload(
                    type = "AGNES_SELF_SABOTAGE_PROBE",
                    source = "titan",
                    priority = "info",
                    data = mapOf(
                        "triggeredBy" to "SESSION_MISSED",
                        "routineName" to (event.data["routineName"] ?: "your scheduled session"),
                        "probeQuestion" to "You skipped '${event.data["routineName"] ?: "training"}' today without a body reason. Is something else going on — avoidance, burnout, or a belief pattern?",
                        "beliefNodeHint" to "Self-Sabotage",
                        "message" to "Titan flagged a no-veto miss. Agnes investigating potential core-wound triggers.",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),

        // PP3 — Workout completed with active supplement cycle → Ledger inventory check
        CascadeRule(
            id = "titan-post-pump-ledger-supplement-check",
            trigger = "WORKOUT_COMPLETED",
            condition = { it.type == "WORKOUT_COMPLETED" && it.data["supplementCycleActive"] == true },
            transform = { event ->
                SpineEventPayload(
                    type = "LEDGER_SUPPLEMENT_INVENTORY_CHECK",
                    source = "titan",
                    priority = "info",
                    data = mapOf(
                        "triggeredBy" to "WORKOUT_COMPLETED",
                        "supplementName" to (event.data["activeSupplement"] ?: ""),
                        "cycleId" to (event.data["supplementCycleId"] ?: ""),
                        "message" to "Supplement cycle is active. Ledger checking inventory levels.",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        ),

        // PP3b — Low supplement inventory → Ledger proposes purchase
        CascadeRule(
            id = "titan-ledger-supplement-low-propose-purchase",
            trigger = "LEDGER_SUPPLEMENT_INVENTORY_CHECK",
            condition = { it.type == "LEDGER_SUPPLEMENT_INVENTORY_CHECK" && it.data["inventoryLow"] == true },
            transform = { event ->
                SpineEventPayload(
                    type = "LEDGER_PROPOSE_PURCHASE",
                    source = "ledger",
                    priority = "info",
                    requiresApproval = true,
                    data = mapOf(
                        "triggeredBy" to "LEDGER_SUPPLEMENT_INVENTORY_CHECK",
                        "supplementName" to (event.data["supplementName"] ?: ""),
                        "proposal" to "Supplement '${event.data["supplementName"]}' is running low. Approve reorder?",
                        "timestamp" to Clock.System.now().toString()
                    )
                )
            }
        )
    )
}

