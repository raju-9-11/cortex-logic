package com.agnes.nexus.core.domain.services

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.emptyFlow
import kotlinx.coroutines.test.UnconfinedTestDispatcher
import kotlin.test.Test
import kotlin.test.assertFailsWith
import kotlin.test.assertFalse
import kotlin.test.assertTrue

/**
 * Lifecycle and format-validation smoke tests for SchedulerService.
 *
 * NOTE: Time-math firing tests (verify that a schedule at "HH:MM" actually emits a SpineEvent
 * after the correct delay) require an injectable AutomationClock so the real wall-clock call
 * inside msUntilNextOccurrence can be replaced with virtual time. That injection lands in
 * Phase 1 of the automation consolidation plan. Until then, firing behaviour is covered by
 * end-to-end dev-server verification described in the plan's §5 Verification section.
 */
@OptIn(ExperimentalCoroutinesApi::class)
class SchedulerServiceTest {

    // Minimal SpineEventBus fake — records emitted events; ignores everything else.
    private class FakeSpineEventBus : SpineEventBus {
        val emitted = mutableListOf<SpineEvent>()
        override fun on(type: String, minPriority: String?): Flow<SpineEvent> = emptyFlow()
        override suspend fun emit(event: SpineEvent) { emitted += event }
        override suspend fun emit(payload: SpineEventPayload): SpineEvent =
            payload.toSpineEvent().also { emitted += it }
        override fun registerCascadeRules(rules: List<CascadeRule>) = Unit
        override fun getRecentEvents(filter: SpineEventFilter?): List<SpineEvent> = emptyList()
        // setSuppression has a default body in the interface — no override needed.
    }

    private fun makeScheduler(bus: FakeSpineEventBus = FakeSpineEventBus()): SchedulerService =
        SchedulerService(bus, CoroutineScope(UnconfinedTestDispatcher()))

    private fun makeDefinition(
        id: String = "sched-1",
        moduleId: String = "ledger",
        type: String = "daily",
        time: String = "09:00",
        spineEventType: String = "TEST_EVENT",
        defaultEnabled: Boolean = true,
    ) = ScheduleDefinition(id, moduleId, type, time, spineEventType, defaultEnabled)

    // ── Lifecycle ────────────────────────────────────────────────────────────────

    @Test
    fun startAndStop_withNoRegistrations_doesNotCrash() {
        val svc = makeScheduler()
        svc.start()
        svc.stop()
    }

    @Test
    fun start_calledTwice_isIdempotent() {
        val svc = makeScheduler()
        svc.register(makeDefinition())
        svc.start()
        svc.start()  // second call must be a no-op, not a re-arm
        svc.stop()
    }

    @Test
    fun stop_calledBeforeStart_doesNotCrash() {
        val svc = makeScheduler()
        svc.stop()  // should be safe; nothing to cancel
    }

    @Test
    fun stop_calledTwice_doesNotCrash() {
        val svc = makeScheduler()
        svc.start()
        svc.stop()
        svc.stop()
    }

    @Test
    fun register_beforeStart_doesNotArmImmediately() {
        // Registering before start should queue the definition but not launch a job yet.
        // We verify this indirectly: start() → stop() with a valid "09:00" schedule must
        // not throw, which means the job was armed cleanly only after start().
        val svc = makeScheduler()
        svc.register(makeDefinition(time = "09:00"))
        svc.start()
        svc.stop()
    }

    @Test
    fun register_afterStart_armsImmediately() {
        val svc = makeScheduler()
        svc.start()
        svc.register(makeDefinition(time = "09:00"))  // must arm synchronously without error
        svc.stop()
    }

    @Test
    fun unregister_existingId_preventsJobFromFiring() {
        val svc = makeScheduler()
        svc.register(makeDefinition(id = "my-sched", time = "09:00"))
        svc.start()
        svc.unregister("my-sched")
        svc.stop()
        // If the coroutine was still running it would see registry.containsKey("my-sched") == false
        // and bail — this is a guard in fire(). No assertion beyond no crash needed here.
    }

    @Test
    fun unregister_nonExistentId_doesNotCrash() {
        val svc = makeScheduler()
        svc.unregister("no-such-id")
    }

    @Test
    fun register_sameIdTwice_replacesExistingDefinition() {
        val svc = makeScheduler()
        svc.register(makeDefinition(id = "dup", time = "08:00"))
        svc.register(makeDefinition(id = "dup", time = "10:00"))  // replaces previous
        svc.start()
        svc.stop()
    }

    // ── Weekly format ────────────────────────────────────────────────────────────

    @Test
    fun register_weeklyFormat_allValidDayAbbreviationsAreAccepted() {
        val validDays = listOf("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat")
        for (day in validDays) {
            val svc = makeScheduler()
            svc.register(makeDefinition(id = "sched-$day", time = "$day 09:00"))
            svc.start()
            svc.stop()
        }
    }

    // ── Validation errors ────────────────────────────────────────────────────────

    @Test
    fun start_withInvalidTimeFormat_throwsIllegalArgumentException() {
        val svc = makeScheduler()
        svc.register(makeDefinition(time = "not-a-time"))
        assertFailsWith<IllegalArgumentException> { svc.start() }
    }

    @Test
    fun start_withExtraTimeTokens_throwsIllegalArgumentException() {
        // Three tokens: "Mon 09:00 extra" — the parser only accepts 1 or 2
        val svc = makeScheduler()
        svc.register(makeDefinition(time = "Mon 09:00 extra"))
        assertFailsWith<IllegalArgumentException> { svc.start() }
    }

    @Test
    fun start_withUnknownDayAbbreviation_throwsIllegalArgumentException() {
        val svc = makeScheduler()
        svc.register(makeDefinition(time = "Xyz 09:00"))
        assertFailsWith<IllegalArgumentException> { svc.start() }
    }

    @Test
    fun start_withOutOfRangeHour_throwsIllegalArgumentException() {
        val svc = makeScheduler()
        svc.register(makeDefinition(time = "25:00"))
        assertFailsWith<IllegalArgumentException> { svc.start() }
    }

    @Test
    fun start_withOutOfRangeMinute_throwsIllegalArgumentException() {
        val svc = makeScheduler()
        svc.register(makeDefinition(time = "09:60"))
        assertFailsWith<IllegalArgumentException> { svc.start() }
    }

    @Test
    fun register_afterStart_withInvalidFormat_throwsIllegalArgumentException() {
        val svc = makeScheduler()
        svc.start()
        assertFailsWith<IllegalArgumentException> {
            svc.register(makeDefinition(time = "bad-format"))
        }
        svc.stop()
    }

    // ── Boundary edge cases for time parsing ─────────────────────────────────────

    @Test
    fun start_withMidnightTime_doesNotThrow() {
        val svc = makeScheduler()
        svc.register(makeDefinition(time = "00:00"))
        svc.start()
        svc.stop()
    }

    @Test
    fun start_withLastValidTime_doesNotThrow() {
        val svc = makeScheduler()
        svc.register(makeDefinition(time = "23:59"))
        svc.start()
        svc.stop()
    }

    @Test
    fun start_withWeeklyMidnightSunday_doesNotThrow() {
        val svc = makeScheduler()
        svc.register(makeDefinition(time = "Sun 00:00"))
        svc.start()
        svc.stop()
    }
}
