package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.automation.AutomationClock
import com.agnes.ara.core.domain.automation.AutomationCommand
import com.agnes.ara.core.domain.automation.AutomationCommandParser
import com.agnes.ara.core.domain.automation.AutomationService
import com.agnes.ara.core.domain.automation.AutomationState
import com.agnes.ara.core.domain.automation.AutomationStorage
import com.agnes.ara.core.domain.automation.AutomationRule
import com.agnes.ara.core.domain.automation.AutomationSuggestion
import com.agnes.ara.core.domain.automation.AutomationUuidProvider
import com.agnes.ara.core.domain.automation.AUTOMATION_ACTION_IDS
import com.agnes.ara.core.domain.automation.NoOpAutomationTelemetry
import com.agnes.ara.core.domain.automation.ParseException
import com.agnes.ara.core.domain.services.ScheduleDefinition
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlinx.datetime.Clock
import kotlinx.datetime.LocalTime
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toInstant
import kotlinx.datetime.toLocalDateTime
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.json.Json
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException
import kotlin.js.JsExport

/**
 * JS-facing facade for [AutomationService].
 *
 * All storage I/O is bridged via plain JS callbacks so agnes (TypeScript) can
 * implement the storage adapter without importing Kotlin interfaces.
 *
 * ## Constructor parameters (all async JS callbacks)
 *
 * - `jsLoadRules`          — calls `onComplete(rulesJson)` or `onError(message)`
 * - `jsSaveRules`          — calls `onComplete()` or `onError(message)`
 * - `jsLoadStates`         — calls `onComplete(statesJson)` where statesJson is
 *                            a JSON object mapping ruleId → AutomationState
 * - `jsSaveStates`         — calls `onComplete()` or `onError(message)`
 * - `jsLoadSchedules`      — calls `onComplete(schedulesJson)`
 * - `jsSaveSchedules`      — calls `onComplete()` or `onError(message)`
 *
 * ## Usage from TypeScript (via automation-bridge.ts)
 * ```ts
 * const svc = new AutomationServiceJs(
 *   (ok, err) => adapter.loadRules().then(ok).catch(e => err(e.message)),
 *   (json, ok, err) => adapter.saveRules(json).then(ok).catch(e => err(e.message)),
 *   (ok, err) => adapter.loadStates().then(ok).catch(e => err(e.message)),
 *   (json, ok, err) => adapter.saveStates(json).then(ok).catch(e => err(e.message)),
 *   (ok, err) => adapter.loadSchedules().then(ok).catch(e => err(e.message)),
 *   (json, ok, err) => adapter.saveSchedules(json).then(ok).catch(e => err(e.message)),
 * )
 * ```
 */
@Suppress("WRONG_EXPORTED_DECLARATION")
@JsExport
class AutomationServiceJs(
    private val jsLoadRules: (onComplete: (String) -> Unit, onError: (String) -> Unit) -> Unit,
    private val jsSaveRules: (rulesJson: String, onComplete: () -> Unit, onError: (String) -> Unit) -> Unit,
    private val jsLoadStates: (onComplete: (String) -> Unit, onError: (String) -> Unit) -> Unit,
    private val jsSaveStates: (statesJson: String, onComplete: () -> Unit, onError: (String) -> Unit) -> Unit,
    private val jsLoadSchedules: (onComplete: (String) -> Unit, onError: (String) -> Unit) -> Unit,
    private val jsSaveSchedules: (schedulesJson: String, onComplete: () -> Unit, onError: (String) -> Unit) -> Unit,
) {
    private val json = Json { ignoreUnknownKeys = true; classDiscriminator = "type" }
    private val scope = CoroutineScope(SupervisorJob())

    private val service = AutomationService(
        storage = JsAutomationStorage(),
        clock = JsAutomationClock,
        uuid = JsUuidProvider,
        telemetry = NoOpAutomationTelemetry,
    )

    // ── Evaluate ─────────────────────────────────────────────────────────────

    /**
     * Evaluate automation rules against the current profile.
     *
     * @param profileJson  JSON string conforming to LedgerIntakeProfile.
     * @param onComplete   Called with a JSON array of [AutomationSuggestion]s.
     * @param onError      Called with an error message string on failure.
     * @return [CancellableTask] that can be cancelled if the profile changes before completion.
     */
    fun evaluate(
        profileJson: String,
        onComplete: (String) -> Unit,
        onError: (String) -> Unit,
    ): CancellableTask {
        val job = scope.launch {
            try {
                val suggestions = service.evaluate(profileJson)
                onComplete(json.encodeToString(ListSerializer(AutomationSuggestion.serializer()), suggestions))
            } catch (e: Throwable) {
                onError(e.message ?: "evaluation failed")
            }
        }
        return CancellableTask(job)
    }

    // ── Apply ────────────────────────────────────────────────────────────────

    /**
     * Apply an automation command parsed from an LLM action tag.
     *
     * Parses [actionId] + [payloadJson] via [AutomationCommandParser] then delegates
     * to [AutomationService.apply]. Replaces the six hand-written handlers in
     * agnes/automation-actions.ts.
     *
     * @param actionId    e.g. "create_automation_rule"
     * @param payloadJson JSON payload from the LLM action tag.
     * @param onComplete  Called with `"ok"` on success.
     * @param onError     Called with an error description on failure.
     * @return [CancellableTask]
     */
    fun apply(
        actionId: String,
        payloadJson: String,
        onComplete: (String) -> Unit,
        onError: (String) -> Unit,
    ): CancellableTask {
        val job = scope.launch {
            val parseResult = AutomationCommandParser.parse(actionId, payloadJson)
            if (parseResult.isFailure) {
                val err = (parseResult.exceptionOrNull() as? ParseException)?.error
                onError("parse error: $err")
                return@launch
            }
            val cmd = parseResult.getOrThrow()
            val applyResult = service.apply(cmd)
            if (applyResult.isSuccess) {
                onComplete("ok")
            } else {
                onError(applyResult.exceptionOrNull()?.message ?: "apply failed")
            }
        }
        return CancellableTask(job)
    }

    // ── Observe ──────────────────────────────────────────────────────────────

    /**
     * Subscribe to the live suggestion stream.
     *
     * [onNext] is called (on the KMP coroutine dispatcher) with a JSON array of
     * [AutomationSuggestion]s whenever [evaluate] produces new results. Cancel the
     * returned [CancellableTask] to unsubscribe.
     *
     * @param onNext Callback invoked with JSON suggestion array on each emission.
     */
    fun observeSuggestions(onNext: (String) -> Unit): CancellableTask {
        val job = service.observeSuggestions
            .onEach { suggestions ->
                onNext(json.encodeToString(ListSerializer(AutomationSuggestion.serializer()), suggestions))
            }
            .launchIn(scope)
        return CancellableTask(job)
    }

    // ── Metadata ─────────────────────────────────────────────────────────────

    /**
     * Returns a JSON array of the action IDs this service handles.
     * agnes imports this to source its LLM prompt whitelist and stays in sync
     * automatically — no more manual list in ledger-prompt-builder.ts.
     */
    fun supportedActionIds(): String =
        json.encodeToString(ListSerializer(String.serializer()), AUTOMATION_ACTION_IDS.toList())

    // ── Runner (cadence driver) ───────────────────────────────────────────────

    private var profileProvider: (() -> String)? = null
    private var runnerJob: Job? = null

    /**
     * Start the automation runner.
     *
     * Calls [getProfileJson] to obtain the current profile JSON and triggers an
     * immediate evaluation. Subsequently re-evaluates every day at 00:05 local time
     * (or the next occurrence if the current time is already past 00:05).
     *
     * Agnes calls this after the profile is first loaded, replacing the
     * `useEffect + hasRunRef` pattern in use-recurring-engine.ts.
     *
     * @param getProfileJson Callback that returns the latest profile JSON string.
     */
    fun startRunner(getProfileJson: () -> String) {
        if (runnerJob?.isActive == true) return
        profileProvider = getProfileJson
        runnerJob = scope.launch {
            // Immediate tick on start.
            runEvaluation()
            // Then tick daily at 00:05 local time.
            while (isActive) {
                val msUntilMidnight = msUntilDailyTime(hour = 0, minute = 5)
                delay(msUntilMidnight)
                if (isActive) runEvaluation()
            }
        }
    }

    /** Stop the runner. Safe to call if not started. */
    fun stopRunner() {
        runnerJob?.cancel()
        runnerJob = null
        profileProvider = null
    }

    /**
     * Trigger an immediate evaluation outside the daily schedule.
     * Agnes calls this on window-focus events to catch day/month boundary changes.
     */
    fun poke() {
        scope.launch { runEvaluation() }
    }

    private suspend fun runEvaluation() {
        val profileJson = profileProvider?.invoke() ?: return
        service.evaluate(profileJson)
    }

    private fun msUntilDailyTime(hour: Int, minute: Int): Long {
        val tz = TimeZone.currentSystemDefault()
        val now = Clock.System.now()
        val nowLocal = now.toLocalDateTime(tz)
        val targetMs = kotlinx.datetime.LocalDateTime(nowLocal.date, LocalTime(hour, minute, 0, 0))
            .toInstant(tz).toEpochMilliseconds()
        val nowMs = now.toEpochMilliseconds()
        val diff = targetMs - nowMs
        // If target already passed today, schedule for tomorrow.
        return if (diff > 0) diff else diff + 86_400_000L
    }

    // ── Inner: JS storage adapter ─────────────────────────────────────────────

    private inner class JsAutomationStorage : AutomationStorage {

        override suspend fun loadRules(): List<AutomationRule> {
            val raw = jsCallback<String> { ok, err -> jsLoadRules(ok, err) }
            return runCatching {
                json.decodeFromString(ListSerializer(AutomationRule.serializer()), raw)
            }.getOrDefault(emptyList())
        }

        override suspend fun saveRules(rules: List<AutomationRule>) {
            val rulesJson = json.encodeToString(ListSerializer(AutomationRule.serializer()), rules)
            jsCallbackUnit { ok, err -> jsSaveRules(rulesJson, ok, err) }
        }

        override suspend fun loadSuggestionStates(): Map<String, AutomationState> {
            val raw = jsCallback<String> { ok, err -> jsLoadStates(ok, err) }
            return runCatching {
                json.decodeFromString(MapSerializer(String.serializer(), AutomationState.serializer()), raw)
            }.getOrDefault(emptyMap())
        }

        override suspend fun saveSuggestionStates(states: Map<String, AutomationState>) {
            val statesJson = json.encodeToString(
                MapSerializer(String.serializer(), AutomationState.serializer()), states,
            )
            jsCallbackUnit { ok, err -> jsSaveStates(statesJson, ok, err) }
        }

        override suspend fun loadSchedules(): List<ScheduleDefinition> {
            val raw = jsCallback<String> { ok, err -> jsLoadSchedules(ok, err) }
            return runCatching {
                json.decodeFromString(ListSerializer(ScheduleDefinition.serializer()), raw)
            }.getOrDefault(emptyList())
        }

        override suspend fun saveSchedules(schedules: List<ScheduleDefinition>) {
            val schedulesJson = json.encodeToString(ListSerializer(ScheduleDefinition.serializer()), schedules)
            jsCallbackUnit { ok, err -> jsSaveSchedules(schedulesJson, ok, err) }
        }
    }
}

// ── Platform providers ───────────────────────────────────────────────────────

private object JsUuidProvider : AutomationUuidProvider {
    override fun generate(): String = js("crypto.randomUUID()") as String
}

private object JsAutomationClock : AutomationClock {
    override fun nowIso(): String = Clock.System.now().toString()
    override fun zone() = kotlinx.datetime.TimeZone.currentSystemDefault()
}

// ── Coroutine / callback bridge helpers ──────────────────────────────────────

private suspend fun <T> jsCallback(
    block: (onComplete: (T) -> Unit, onError: (String) -> Unit) -> Unit,
): T = suspendCancellableCoroutine { cont ->
    block(
        { value -> if (cont.isActive) cont.resume(value) },
        { msg -> if (cont.isActive) cont.resumeWithException(RuntimeException(msg)) },
    )
}

private suspend fun jsCallbackUnit(
    block: (onComplete: () -> Unit, onError: (String) -> Unit) -> Unit,
) = suspendCancellableCoroutine<Unit> { cont ->
    block(
        { if (cont.isActive) cont.resume(Unit) },
        { msg -> if (cont.isActive) cont.resumeWithException(RuntimeException(msg)) },
    )
}
