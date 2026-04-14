package com.agnes.nexus.core.domain.automation

import com.agnes.nexus.core.domain.services.ScheduleDefinition
import com.agnes.nexus.core.domain.services.SchedulerService
import com.agnes.nexus.core.domain.services.SpineEventBus
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.launch

/**
 * AutomationRunner — owns the evaluation cadence for AutomationService.
 *
 * Previously, agnes drove evaluation from useMemo(evaluateAutomationRules, [profile])
 * which tied evaluation to React's render cycle. This broke time-based triggers
 * (month_end, bill_overdue) when the app stayed open across day/month boundaries.
 *
 * This class registers a daily 00:05 Spine event with SchedulerService and provides
 * a [poke] method that agnes calls from its window-focus handler (replacing hasRunRef).
 *
 * @param service   The [AutomationService] to call on each tick.
 * @param scheduler The [SchedulerService] that owns real-time scheduling.
 * @param scope     The coroutine scope in which observation jobs run.
 */
class AutomationRunner(
    private val service: AutomationService,
    private val scheduler: SchedulerService,
    private val scope: CoroutineScope,
) {

    companion object {
        const val DAILY_TICK_ID = "automation.daily_tick"
        const val DAILY_TICK_MODULE = "ledger"
        const val DAILY_TICK_TIME = "00:05"       // 12:05 AM local time
        const val DAILY_TICK_EVENT_TYPE = "AUTOMATION_DAILY_TICK"
    }

    private var profileJsonProvider: (() -> String)? = null
    private var started = false

    /**
     * Set the provider that supplies the current profile JSON when evaluation runs.
     * Agnes calls this after the profile is first loaded.
     */
    fun setProfileProvider(provider: () -> String) {
        profileJsonProvider = provider
    }

    /**
     * Start the runner.
     *
     * Registers the daily tick schedule and subscribes to spine events of type
     * [DAILY_TICK_EVENT_TYPE] to call [service.evaluate] automatically.
     *
     * Must be called after [setProfileProvider].
     */
    fun start(eventBus: SpineEventBus) {
        if (started) return
        started = true

        scheduler.register(
            ScheduleDefinition(
                id = DAILY_TICK_ID,
                moduleId = DAILY_TICK_MODULE,
                type = "daily",
                time = DAILY_TICK_TIME,
                spineEventType = DAILY_TICK_EVENT_TYPE,
                defaultEnabled = true,
            )
        )
        scheduler.start()

        eventBus.on(DAILY_TICK_EVENT_TYPE)
            .onEach { runEvaluation() }
            .launchIn(scope)
    }

    /** Stop the runner and unregister the daily schedule. */
    fun stop() {
        scheduler.unregister(DAILY_TICK_ID)
        scheduler.stop()
        started = false
    }

    /**
     * Poke the runner to run evaluation immediately.
     *
     * Agnes calls this on window-focus (replacing hasRunRef) and on profile load.
     * This fires an on-demand evaluation outside the scheduled tick.
     */
    fun poke() {
        scope.launch { runEvaluation() }
    }

    private suspend fun runEvaluation() {
        val profileJson = profileJsonProvider?.invoke() ?: return
        service.evaluate(profileJson)
    }
}
