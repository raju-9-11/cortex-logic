package com.agnes.nexus.core.engine.personas.notifications

import com.agnes.nexus.core.engine.personas.PersonaPrompt

/**
 * Notifications persona prompt — ported from web NOTIFICATIONS_PERSONA.
 */
object NotificationsPersonaPrompts {
    val base = PersonaPrompt(
        systemPrompt = """
            You are Nyx Notify — the intelligent notification and reminder management agent for the Nyx platform.

            ROLE:
            You help users triage their notification inbox, manage reminders, set quiet hours, and stay on top of cross-module signals without being overwhelmed. You have visibility into what's in their inbox right now.

            PERSONALITY:
            - Calm, efficient, signal-over-noise focused
            - You surface what actually matters and help silence what doesn't
            - You never create urgency where there is none
            - You're direct: one sentence per insight, no padding

            CAPABILITIES:
            You can read the user's notification inbox context (injected below) and take actions via structured tags.

            TRIAGE ACTION TAGS:
            - <action type="mark_all_read">{}</action>
              Use when the user wants to clear their unread count or says "mark everything as read".
            - <action type="bulk_delete">{"source":"titan"}</action>
              Use to delete all notifications from a specific module. Always confirm before emitting.
            - <action type="snooze_notification">{"notificationId":"abc123","snoozedUntil":"2026-03-26T09:00:00.000Z"}</action>
              Use when the user wants to delay a specific notification.
            - <action type="snooze_all_from_source">{"source":"ledger","snoozedUntil":"2026-03-26T09:00:00.000Z"}</action>
              Use when the user wants to snooze all notifications from a module.

            QUIET HOURS ACTION TAGS:
            - <action type="enable_quiet_hours">{"from":"22:00","to":"08:00","exemptModules":[]}</action>
              Use when the user wants to turn on Do Not Disturb mode.
            - <action type="disable_quiet_hours">{}</action>
              Use when the user disables DND.
            - <action type="update_quiet_hours">{"from":"23:00","to":"07:00"}</action>
              Use to update the quiet hours window.
            - <action type="add_exempt_module">{"moduleId":"titan"}</action>
              Use when the user wants a specific module to bypass quiet hours.

            REMINDER ACTION TAGS:
            - <action type="create_reminder">{"title":"Review ledger","moduleId":"ledger","scheduledFor":"2026-03-26T10:00:00.000Z","priority":"normal"}</action>
              Use when the user asks to be reminded of something.

            TRIAGE PRINCIPLES:
            - Critical and alert-priority notifications should never be snoozed beyond 24 hours.
            - Suggest grouping by source when the user has 10+ notifications from one module.
            - If the inbox is empty, proactively offer to help set up useful reminders.
            - If the user seems overwhelmed, offer to enable quiet hours.

            BOUNDARIES:
            - You do not access module data directly — you only see notification metadata.
            - You do not make financial, medical, or training decisions — you route users to the right module.
            - You never delete notifications without confirmation.
        """.trimIndent()
    )

    // =========================================================================
    // Scope Actions
    // =========================================================================

    /** Allowed action types within the notifications agent scope. */
    val SCOPE_ACTIONS: List<String> = listOf(
        "mark_all_read",
        "bulk_delete",
        "snooze_notification",
        "snooze_all_from_source",
        "enable_quiet_hours",
        "disable_quiet_hours",
        "update_quiet_hours",
        "add_exempt_module",
        "create_reminder"
    )

    // =========================================================================
    // Notification Context Serializer
    // =========================================================================

    /**
     * Serialized notification summary — mirrors TS `NotificationSummary`.
     */
    data class NotificationSummary(
        val total: Int,
        val unread: Int,
        val critical: Int,
        val bySource: Map<String, Int> = emptyMap(),
        /** ISO-8601 timestamp of the oldest unread notification, or null. */
        val oldestUnread: String? = null
    )

    /**
     * Builds the dynamic [INBOX] context block injected into the system prompt.
     * Summarises the current inbox state so the agent can give contextually relevant advice.
     *
     * Port of TS `serializeNotificationContext()`.
     */
    fun serializeNotificationContext(
        summary: NotificationSummary,
        quietHoursEnabled: Boolean,
        nowEpochMs: Long? = null
    ): String {
        if (summary.total == 0) {
            return "[INBOX]\n  Empty — no notifications."
        }

        val lines = mutableListOf<String>()

        lines.add("[INBOX]\n  ${summary.total} total | ${summary.unread} unread | ${summary.critical} critical/alert")

        if (summary.bySource.isNotEmpty()) {
            val sourceLines = summary.bySource.entries
                .sortedByDescending { it.value }
                .joinToString("\n") { (src, count) -> "  - $src: $count" }
            lines.add("[BY SOURCE]\n$sourceLines")
        }

        if (summary.oldestUnread != null) {
            // Compute age in days from epoch ms (caller provides current time or we skip)
            val ageLabel = if (nowEpochMs != null) {
                // Parse ISO-8601 date to epoch ms — simple approach: try extracting date part
                val ageDays = computeAgeDays(summary.oldestUnread, nowEpochMs)
                if (ageDays != null) {
                    when (ageDays) {
                        0L -> "Today"
                        1L -> "1 day ago"
                        else -> "$ageDays days ago"
                    }
                } else {
                    summary.oldestUnread
                }
            } else {
                summary.oldestUnread
            }
            lines.add("[OLDEST UNREAD]\n  $ageLabel")
        }

        val quietLabel = if (quietHoursEnabled) {
            "Active — notifications suppressed outside exempt modules"
        } else {
            "Off"
        }
        lines.add("[QUIET HOURS]\n  $quietLabel")

        return lines.joinToString("\n\n")
    }

    /**
     * Simple ISO-8601 date-to-epoch-day diff.
     * Parses the date portion (YYYY-MM-DDTHH:MM:SS...) and computes the
     * difference in days from [nowEpochMs].
     *
     * Returns null if parsing fails.
     */
    private fun computeAgeDays(isoDate: String, nowEpochMs: Long): Long? {
        // Extract just YYYY-MM-DD to compute rough day difference
        return try {
            val datePart = isoDate.substringBefore("T")
            val parts = datePart.split("-")
            if (parts.size != 3) return null
            val year = parts[0].toInt()
            val month = parts[1].toInt()
            val day = parts[2].toInt()

            // Approximate epoch days for the parsed date (since 1970-01-01)
            // Using a simplified Julian Day calculation
            val parsedDays = julianDay(year, month, day)
            // Now epoch ms → days
            val nowDays = (nowEpochMs / 86_400_000L)
            // Julian day for 1970-01-01 to offset
            val epochJulianDay = julianDay(1970, 1, 1)
            val ageInDays = nowDays - (parsedDays - epochJulianDay)
            if (ageInDays < 0) 0L else ageInDays
        } catch (_: Exception) {
            null
        }
    }

    /** Simplified Julian Day Number for date arithmetic. */
    private fun julianDay(year: Int, month: Int, day: Int): Long {
        val a = (14 - month) / 12
        val y = year + 4800 - a
        val m = month + 12 * a - 3
        return (day + (153 * m + 2) / 5 + 365L * y + y / 4 - y / 100 + y / 400 - 32045)
    }
}
