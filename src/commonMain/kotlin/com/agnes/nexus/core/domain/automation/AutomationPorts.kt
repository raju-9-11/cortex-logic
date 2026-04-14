package com.agnes.nexus.core.domain.automation

import com.agnes.nexus.core.domain.services.ScheduleDefinition
import kotlinx.datetime.Clock
import kotlinx.datetime.TimeZone

// ─────────────────────────────────────────────────────────────────────────────
// AutomationStorage — consumer-implemented persistence port
//
// cortex-logic calls these; agnes/android implement them against their own
// storage backends (encrypted LedgerIntakeProfile / Room database).
// ─────────────────────────────────────────────────────────────────────────────

interface AutomationStorage {
    /** Load the current list of automation rules. Returns empty list if none stored. */
    suspend fun loadRules(): List<AutomationRule>

    /** Persist the updated rule list atomically. */
    suspend fun saveRules(rules: List<AutomationRule>)

    /**
     * Load the suggestion-state map, keyed by ruleId.
     * The map records whether a rule's suggestion has been seen, dismissed, etc.
     */
    suspend fun loadSuggestionStates(): Map<String, AutomationState>

    /** Persist the updated suggestion-state map atomically. */
    suspend fun saveSuggestionStates(states: Map<String, AutomationState>)

    /**
     * Load persisted schedule definitions so SchedulerService can be re-hydrated
     * after process restart without losing registrations.
     */
    suspend fun loadSchedules(): List<ScheduleDefinition>

    /** Persist the updated schedule list atomically. */
    suspend fun saveSchedules(schedules: List<ScheduleDefinition>)
}

// ─────────────────────────────────────────────────────────────────────────────
// AutomationClock — injectable time source; default uses the system clock
// ─────────────────────────────────────────────────────────────────────────────

interface AutomationClock {
    /** Returns the current instant as an ISO-8601 string (e.g. "2026-01-15T12:00:00Z"). */
    fun nowIso(): String

    /** Returns the time zone to use when interpreting date-local triggers. */
    fun zone(): TimeZone
}

/** Default implementation backed by kotlinx.datetime.Clock.System. */
object SystemAutomationClock : AutomationClock {
    override fun nowIso(): String = Clock.System.now().toString()
    override fun zone(): TimeZone = TimeZone.currentSystemDefault()
}

// ─────────────────────────────────────────────────────────────────────────────
// AutomationUuidProvider — injectable UUID generator
// Platform-default implementations live in jsMain / androidMain.
// ─────────────────────────────────────────────────────────────────────────────

interface AutomationUuidProvider {
    fun generate(): String
}

// ─────────────────────────────────────────────────────────────────────────────
// AutomationTelemetry — optional observability hook; default is a no-op
// ─────────────────────────────────────────────────────────────────────────────

interface AutomationTelemetry {
    fun onEvaluated(suggestionCount: Int) {}
    fun onCommandApplied(cmd: AutomationCommand) {}
    fun onError(err: Throwable) {}
}

object NoOpAutomationTelemetry : AutomationTelemetry
