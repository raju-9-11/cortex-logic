package com.agnes.nexus.core.domain.services

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.datetime.Clock
import kotlinx.datetime.DatePeriod
import kotlinx.datetime.DayOfWeek
import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.LocalTime
import kotlinx.datetime.TimeZone
import kotlinx.datetime.plus
import kotlinx.datetime.toInstant
import kotlinx.datetime.toLocalDateTime

/**
 * Spine Scheduler Service (web parity).
 * Allows modules to register time-based triggers that emit Spine events.
 */
class SchedulerService(
    private val eventBus: SpineEventBus,
    private val scope: CoroutineScope
) {
    private val registry = mutableMapOf<String, ScheduleDefinition>()
    private val jobs = mutableMapOf<String, Job>()
    private var started = false

    fun register(def: ScheduleDefinition) {
        clearTimer(def.id)
        registry[def.id] = def
        if (started) {
            arm(def)
        }
    }

    fun unregister(id: String) {
        clearTimer(id)
        registry.remove(id)
    }

    fun start() {
        if (started) return
        started = true
        registry.values.forEach { arm(it) }
    }

    fun stop() {
        jobs.values.forEach { it.cancel() }
        jobs.clear()
        started = false
    }

    private fun arm(def: ScheduleDefinition) {
        clearTimer(def.id)
        val delayMs = msUntilNextOccurrence(def.time)
        val job = scope.launch {
            if (delayMs > 0) {
                delay(delayMs)
            }
            if (!registry.containsKey(def.id)) return@launch
            fire(def)
            if (started) {
                arm(def)
            }
        }
        jobs[def.id] = job
    }

    private fun fire(def: ScheduleDefinition) {
        scope.launch {
            eventBus.emit(
                SpineEventPayload(
                    type = def.spineEventType,
                    source = def.moduleId,
                    domain = "C",
                    priority = "info",
                    data = mapOf(
                        "scheduleId" to def.id,
                        "scheduledType" to def.type
                    )
                )
            )
        }
    }

    private fun clearTimer(id: String) {
        jobs.remove(id)?.cancel()
    }

    private fun msUntilNextOccurrence(time: String): Long {
        val tokens = time.trim().split(" ")
        return when (tokens.size) {
            1 -> {
                val (hours, minutes) = parseTime(tokens[0])
                msUntilDailyTime(hours, minutes)
            }
            2 -> {
                val dayAbbr = tokens[0]
                val (hours, minutes) = parseTime(tokens[1])
                val targetDow = DAY_ABBREVIATIONS.indexOf(dayAbbr)
                require(targetDow >= 0) {
                    "SchedulerService: unrecognised day abbreviation \"$dayAbbr\". Expected one of: ${DAY_ABBREVIATIONS.joinToString(", ")}."
                }
                msUntilWeeklyTime(targetDow, hours, minutes)
            }
            else -> throw IllegalArgumentException(
                "SchedulerService: invalid time format \"$time\". Expected \"HH:MM\" or \"DDD HH:MM\"."
            )
        }
    }

    private fun parseTime(timeStr: String): Pair<Int, Int> {
        val parts = timeStr.split(":")
        require(parts.size == 2) {
            "SchedulerService: invalid time string \"$timeStr\". Expected HH:MM."
        }
        val hours = parts[0].toIntOrNull() ?: -1
        val minutes = parts[1].toIntOrNull() ?: -1
        require(hours in 0..23 && minutes in 0..59) {
            "SchedulerService: out-of-range time \"$timeStr\". Expected HH:MM in 24h format."
        }
        return hours to minutes
    }

    private fun msUntilDailyTime(hours: Int, minutes: Int): Long {
        val tz = TimeZone.currentSystemDefault()
        val now = Clock.System.now()
        val nowLocal = now.toLocalDateTime(tz)
        var targetDate = nowLocal.date
        var targetInstant = targetDate.atTime(hours, minutes).toInstant(tz)
        if (targetInstant <= now) {
            targetDate = targetDate.plus(DatePeriod(days = 1))
            targetInstant = targetDate.atTime(hours, minutes).toInstant(tz)
        }
        return targetInstant.toEpochMilliseconds() - now.toEpochMilliseconds()
    }

    private fun msUntilWeeklyTime(targetDowIndex: Int, hours: Int, minutes: Int): Long {
        val tz = TimeZone.currentSystemDefault()
        val now = Clock.System.now()
        val nowLocal = now.toLocalDateTime(tz)
        val currentDowIndex = dayOfWeekIndex(nowLocal.dayOfWeek)
        var daysUntil = (targetDowIndex - currentDowIndex + 7) % 7
        var targetDate = nowLocal.date.plus(DatePeriod(days = daysUntil))
        var targetInstant = targetDate.atTime(hours, minutes).toInstant(tz)
        if (daysUntil == 0 && targetInstant <= now) {
            daysUntil = 7
            targetDate = nowLocal.date.plus(DatePeriod(days = daysUntil))
            targetInstant = targetDate.atTime(hours, minutes).toInstant(tz)
        }
        return targetInstant.toEpochMilliseconds() - now.toEpochMilliseconds()
    }

    private fun LocalDate.atTime(hours: Int, minutes: Int): LocalDateTime {
        return LocalDateTime(this, LocalTime(hour = hours, minute = minutes, second = 0, nanosecond = 0))
    }

    companion object {
        private val DAY_ABBREVIATIONS = listOf("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat")
    }

    private fun dayOfWeekIndex(day: DayOfWeek): Int {
        return when (day) {
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
}

data class ScheduleDefinition(
    val id: String,
    val moduleId: String,
    val type: String,
    val time: String,
    val spineEventType: String,
    val defaultEnabled: Boolean
)
