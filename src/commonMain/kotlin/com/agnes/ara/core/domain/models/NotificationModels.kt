package com.agnes.ara.core.domain.models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
enum class NotificationPriority { @SerialName("info") INFO, @SerialName("alert") ALERT, @SerialName("critical") CRITICAL }

@Serializable
data class NotificationChannelPrefs(
    val os: Boolean = true,
    val inApp: Boolean = true
)

@Serializable
data class NotificationDeepLink(
    /** Target route, e.g. `/agnes`, `/atlas`, `/ledger` */
    val route: String,
    /** Optional module focus anchor (platform-agnostic). */
    val focusId: String? = null
)

@Serializable
data class NotificationMessageTemplate(
    val title: String = "",
    val body: String = ""
)

// ---------------------------------------------------------------------------
// Recurrence representation (platform-agnostic; parity with web)
// ---------------------------------------------------------------------------

@Serializable
sealed class Recurrence {
    @Serializable
    @SerialName("every_n_days")
    data class EveryNDays(
        val intervalDays: Int,
        val dtStart: String,
        val timezone: String? = null
    ) : Recurrence()

    @Serializable
    @SerialName("hourly")
    data class Hourly(
        val intervalHours: Int,
        val dtStart: String,
        val timezone: String? = null
    ) : Recurrence()

    @Serializable
    @SerialName("weekly_by_days")
    data class WeeklyByDays(
        val intervalWeeks: Int,
        /** 0=Sun ... 6=Sat */
        val daysOfWeek: List<Int>,
        /** HH:mm */
        val timeOfDay: String,
        val startAt: String,
        val timezone: String? = null
    ) : Recurrence()

    @Serializable
    @SerialName("daily_window")
    data class DailyWindow(
        val startAt: String,
        val timezone: String? = null,
        /** HH:mm */
        val windowStart: String,
        /** HH:mm */
        val windowEnd: String,
        val intervalMinutes: Int
    ) : Recurrence()

    @Serializable
    @SerialName("rrule")
    data class RRule(
        val rrule: String,
        val dtStart: String,
        val timezone: String? = null
    ) : Recurrence()
}

@Serializable
data class NotificationScheduleConfig(
    val enabled: Boolean = true,
    val moduleId: String,
    val channelPrefs: NotificationChannelPrefs = NotificationChannelPrefs(),
    val timezone: String = "",
    val recurrence: Recurrence,
    val messageTemplate: NotificationMessageTemplate = NotificationMessageTemplate(),
    val deepLink: NotificationDeepLink? = null,
    val priority: NotificationPriority = NotificationPriority.ALERT,
    val createdAt: String = "",
    val updatedAt: String = ""
)

@Serializable
data class NotificationOccurrenceRecord(
    val occurrenceId: String,
    val scheduleId: String,
    val moduleId: String,
    /** ISO8601 timestamp */
    val dueAt: String,
    val status: String = "pending", // pending|delivered|completed|skipped
    val createdAt: String = "",
    val updatedAt: String = ""
)

@Serializable
data class NotificationInboxRecord(
    val occurrenceId: String,
    val scheduleId: String,
    val type: String,
    val source: String,
    val priority: String = "alert",
    val data: Map<String, String> = emptyMap(),
    val read: Boolean = false,
    val createdAt: String = "",
    val updatedAt: String = ""
)

object NotificationCollections {
    const val SCHEDULES = "notification_schedules"
    const val OCCURRENCES = "notification_occurrences"
    const val INBOX = "notification_inbox"
}

