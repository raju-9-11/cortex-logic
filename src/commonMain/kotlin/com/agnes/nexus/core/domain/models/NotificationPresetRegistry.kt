package com.agnes.nexus.core.domain.models

import kotlinx.datetime.Clock
import kotlinx.datetime.TimeZone

data class NotificationSchedulePreset(
    val scheduleId: String,
    val config: NotificationScheduleConfig
)

object NotificationPresetRegistry {
    fun buildAllPresets(
        nowIso: String = Clock.System.now().toString(),
        timezone: String = TimeZone.currentSystemDefault().id
    ): List<NotificationSchedulePreset> {
        val channels = NotificationChannelPrefs(os = true, inApp = true)

        return listOf(
            // Agnes
            preset(
                "agnes-therapy-every-2-days",
                NotificationScheduleConfig(
                    enabled = true,
                    moduleId = "agnes",
                    channelPrefs = channels,
                    timezone = timezone,
                    recurrence = Recurrence.EveryNDays(
                        intervalDays = 2,
                        dtStart = nowIso,
                        timezone = timezone
                    ),
                    messageTemplate = NotificationMessageTemplate(
                        title = "Therapy session due",
                        body = "Log your therapy session and complete the scheduled grounding."
                    ),
                    priority = NotificationPriority.ALERT,
                    createdAt = nowIso,
                    updatedAt = nowIso
                )
            ),
            // Titan
            preset(
                "titan-workout-window",
                NotificationScheduleConfig(
                    enabled = true,
                    moduleId = "titan",
                    channelPrefs = channels,
                    timezone = timezone,
                    recurrence = Recurrence.WeeklyByDays(
                        intervalWeeks = 1,
                        daysOfWeek = listOf(1, 2, 3, 4, 5),
                        timeOfDay = "07:00",
                        startAt = nowIso,
                        timezone = timezone
                    ),
                    messageTemplate = NotificationMessageTemplate(
                        title = "Workout time",
                        body = "Log your workout session so Titan can update readiness and recovery."
                    ),
                    priority = NotificationPriority.ALERT,
                    createdAt = nowIso,
                    updatedAt = nowIso
                )
            ),
            preset(
                "titan-sleep-log-evening",
                NotificationScheduleConfig(
                    enabled = true,
                    moduleId = "titan",
                    channelPrefs = channels,
                    timezone = timezone,
                    recurrence = Recurrence.WeeklyByDays(
                        intervalWeeks = 1,
                        daysOfWeek = listOf(0, 1, 2, 3, 4, 5, 6),
                        timeOfDay = "21:30",
                        startAt = nowIso,
                        timezone = timezone
                    ),
                    messageTemplate = NotificationMessageTemplate(
                        title = "Sleep log due",
                        body = "Log tonight's sleep to keep recovery calculations accurate."
                    ),
                    priority = NotificationPriority.ALERT,
                    createdAt = nowIso,
                    updatedAt = nowIso
                )
            ),
            // Ledger
            preset(
                "ledger-spend-due",
                NotificationScheduleConfig(
                    enabled = true,
                    moduleId = "ledger",
                    channelPrefs = channels,
                    timezone = timezone,
                    recurrence = Recurrence.WeeklyByDays(
                        intervalWeeks = 1,
                        daysOfWeek = listOf(1, 2, 3, 4, 5),
                        timeOfDay = "09:00",
                        startAt = nowIso,
                        timezone = timezone
                    ),
                    messageTemplate = NotificationMessageTemplate(
                        title = "Log spend",
                        body = "Log today's spending so Ledger can update your financial picture."
                    ),
                    priority = NotificationPriority.ALERT,
                    createdAt = nowIso,
                    updatedAt = nowIso
                )
            ),
            preset(
                "ledger-income-due",
                NotificationScheduleConfig(
                    enabled = true,
                    moduleId = "ledger",
                    channelPrefs = channels,
                    timezone = timezone,
                    recurrence = Recurrence.WeeklyByDays(
                        intervalWeeks = 1,
                        daysOfWeek = listOf(1, 2, 3, 4, 5),
                        timeOfDay = "17:00",
                        startAt = nowIso,
                        timezone = timezone
                    ),
                    messageTemplate = NotificationMessageTemplate(
                        title = "Log income",
                        body = "Capture income to keep cashflow calculations accurate."
                    ),
                    priority = NotificationPriority.INFO,
                    createdAt = nowIso,
                    updatedAt = nowIso
                )
            ),
            preset(
                "ledger-investments-due",
                NotificationScheduleConfig(
                    enabled = false,
                    moduleId = "ledger",
                    channelPrefs = channels,
                    timezone = timezone,
                    recurrence = Recurrence.WeeklyByDays(
                        intervalWeeks = 1,
                        daysOfWeek = listOf(5),
                        timeOfDay = "18:00",
                        startAt = nowIso,
                        timezone = timezone
                    ),
                    messageTemplate = NotificationMessageTemplate(
                        title = "Investment log",
                        body = "Log investment activity to maintain long-term ROI tracking."
                    ),
                    priority = NotificationPriority.INFO,
                    createdAt = nowIso,
                    updatedAt = nowIso
                )
            ),
            // Soma
            preset(
                "soma-vitals-morning",
                NotificationScheduleConfig(
                    enabled = true,
                    moduleId = "soma",
                    channelPrefs = channels,
                    timezone = timezone,
                    recurrence = Recurrence.WeeklyByDays(
                        intervalWeeks = 1,
                        daysOfWeek = listOf(0, 1, 2, 3, 4, 5, 6),
                        timeOfDay = "07:30",
                        startAt = nowIso,
                        timezone = timezone
                    ),
                    messageTemplate = NotificationMessageTemplate(
                        title = "Morning vitals",
                        body = "Log weight, blood pressure, and any symptoms so Soma can track trends."
                    ),
                    priority = NotificationPriority.ALERT,
                    createdAt = nowIso,
                    updatedAt = nowIso
                )
            ),
            preset(
                "soma-labs-monthly",
                NotificationScheduleConfig(
                    enabled = false,
                    moduleId = "soma",
                    channelPrefs = channels,
                    timezone = timezone,
                    recurrence = Recurrence.EveryNDays(
                        intervalDays = 30,
                        dtStart = nowIso,
                        timezone = timezone
                    ),
                    messageTemplate = NotificationMessageTemplate(
                        title = "Lab results due",
                        body = "Upload any recent lab results to keep your medical profile current."
                    ),
                    priority = NotificationPriority.INFO,
                    createdAt = nowIso,
                    updatedAt = nowIso
                )
            ),
            // Atlas
            preset(
                "atlas-hourly-task-reminder",
                NotificationScheduleConfig(
                    enabled = true,
                    moduleId = "atlas",
                    channelPrefs = channels,
                    timezone = timezone,
                    recurrence = Recurrence.WeeklyByDays(
                        intervalWeeks = 1,
                        daysOfWeek = listOf(0, 1, 2, 3, 4, 5, 6),
                        timeOfDay = "09:00",
                        startAt = nowIso,
                        timezone = timezone
                    ),
                    messageTemplate = NotificationMessageTemplate(
                        title = "Task check-in",
                        body = "Log the next task progress or mark it as handled for today."
                    ),
                    priority = NotificationPriority.ALERT,
                    createdAt = nowIso,
                    updatedAt = nowIso
                )
            ),
            preset(
                "atlas-evening-journal",
                NotificationScheduleConfig(
                    enabled = true,
                    moduleId = "atlas",
                    channelPrefs = channels,
                    timezone = timezone,
                    recurrence = Recurrence.WeeklyByDays(
                        intervalWeeks = 1,
                        daysOfWeek = listOf(0, 1, 2, 3, 4, 5, 6),
                        timeOfDay = "21:00",
                        startAt = nowIso,
                        timezone = timezone
                    ),
                    messageTemplate = NotificationMessageTemplate(
                        title = "Journal time",
                        body = "Capture what changed today - wins, friction, and next focus."
                    ),
                    priority = NotificationPriority.ALERT,
                    createdAt = nowIso,
                    updatedAt = nowIso
                )
            ),
            preset(
                "atlas-weekly-review",
                NotificationScheduleConfig(
                    enabled = true,
                    moduleId = "atlas",
                    channelPrefs = channels,
                    timezone = timezone,
                    recurrence = Recurrence.WeeklyByDays(
                        intervalWeeks = 1,
                        daysOfWeek = listOf(0),
                        timeOfDay = "10:00",
                        startAt = nowIso,
                        timezone = timezone
                    ),
                    messageTemplate = NotificationMessageTemplate(
                        title = "Weekly review due",
                        body = "Reflect, compress the plan, and set next week's focus."
                    ),
                    priority = NotificationPriority.ALERT,
                    createdAt = nowIso,
                    updatedAt = nowIso
                )
            )
        )
    }

    private fun preset(
        scheduleId: String,
        config: NotificationScheduleConfig
    ): NotificationSchedulePreset = NotificationSchedulePreset(scheduleId = scheduleId, config = config)
}
