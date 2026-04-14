package com.agnes.nexus.core.domain.services

/**
 * Resolved notification content — a user-facing title and body.
 */
data class NotificationContent(val title: String, val body: String)

/**
 * Single source of truth for mapping Spine event types + payload data to
 * user-facing notification content (title & body).
 *
 * This resolver is consumed by:
 * - **Web** (via [NotificationContentResolverJs]) — called in SpineEventBus before
 *   persisting events to Firestore so the Cloud Function receives pre-resolved content.
 * - **Android** — called by NexusNotificationChannel and SpineUIStateStore to build
 *   local notifications.
 *
 * Returns `null` for unknown / internal-only event types so callers can decide
 * their own fallback behaviour.
 */
object NotificationContentResolver {

    /**
     * Resolve notification content for the given Spine event.
     *
     * @param eventType The Spine event type string (e.g. `"BURNOUT_WARNING"`).
     * @param data      The event's data map. Keys vary per event type; the resolver
     *                  handles missing keys gracefully.
     * @return A [NotificationContent] with title and body, or `null` if the event
     *         type is not a user-facing notification type.
     */
    fun resolve(eventType: String, data: Map<String, Any?> = emptyMap()): NotificationContent? {
        return when (eventType) {

            // ----------------------------------------------------------------
            // Health & Body
            // ----------------------------------------------------------------

            "BURNOUT_WARNING" -> {
                val reason = data.str("reason")
                NotificationContent(
                    title = "\uD83E\uDDD8 Nexus \u2014 Burnout Risk Detected",
                    body = if (reason == "high_fatigue_low_resilience")
                        "High CNS fatigue combined with low emotional resilience detected. Consider rest."
                    else
                        "Your system is showing signs of burnout. Take a break."
                )
            }

            "BURNOUT_TRAJECTORY_WARNING" -> {
                val note = data.str("note")
                NotificationContent(
                    title = "\uD83E\uDDD8 Nexus \u2014 Burnout Trajectory Rising",
                    body = note ?: "Rising burnout trajectory detected. Proactive intervention recommended."
                )
            }

            "BLOCK_HIGH_INTENSITY" -> {
                val reason = data.str("reason") ?: ""
                val activity = data.str("activity")
                NotificationContent(
                    title = "\u26A0\uFE0F Nexus \u2014 High-Intensity Training Blocked",
                    body = when {
                        reason.contains("cns", ignoreCase = true) ->
                            "CNS fatigue is too high for intense training today."
                        reason.contains("clearance", ignoreCase = true) ->
                            "Medical clearance is required before high-intensity activity."
                        activity != null ->
                            "High-intensity training has been blocked for $activity."
                        else ->
                            "High-intensity training has been blocked by Nexus."
                    }
                )
            }

            "MEDICAL_ALERT" -> {
                val note = data.str("note")
                val alertCount = data.num("alertCount")
                NotificationContent(
                    title = "\uD83D\uDEA8 Nexus \u2014 Medical Alert",
                    body = when {
                        note != null -> note
                        alertCount != null -> "$alertCount severe biomarker flag(s) detected. Check Soma for details."
                        else -> "A medical alert has been issued. Check Soma/Titan for details."
                    }
                )
            }

            "WELLNESS_ALERT" -> {
                val reason = data.str("reason")
                NotificationContent(
                    title = "\uD83E\uDDD8 Nexus \u2014 Wellness Alert",
                    body = if (reason == "high_fatigue_low_resilience")
                        "High CNS fatigue combined with low emotional resilience detected. Consider rest."
                    else
                        "Your system is showing signs of burnout. Take a break."
                )
            }

            // ----------------------------------------------------------------
            // Financial
            // ----------------------------------------------------------------

            "FINANCIAL_STRESS" -> NotificationContent(
                title = "\uD83D\uDCB0 Nexus \u2014 Financial Stress Detected",
                body = "Resource friction is critically high. Ledger recommends reviewing your budget."
            )

            "BUDGET_ALERT" -> {
                val category = data.str("category")
                val percentUsed = data.num("percentUsed")
                val overspendRatio = data.num("overspendRatio")
                NotificationContent(
                    title = "\uD83D\uDCB0 Nexus \u2014 Budget Warning",
                    body = when {
                        category != null && percentUsed != null ->
                            "Budget category '$category' is at ${percentUsed.toInt()}% usage."
                        overspendRatio != null ->
                            "Overall spending exceeds income by ${overspendRatio}x."
                        else ->
                            "A budget threshold has been exceeded. Review Ledger for details."
                    }
                )
            }

            "OVERSPEND_DETECTED" -> {
                val categoryName = data.str("categoryName")
                val overspendPercent = data.num("overspendPercent")
                NotificationContent(
                    title = "\uD83D\uDCB0 Nexus \u2014 Overspend Detected",
                    body = when {
                        categoryName != null && overspendPercent != null ->
                            "Category '$categoryName' is ${overspendPercent.toInt()}% over budget."
                        else ->
                            "Spending has exceeded budget allocation. Check Ledger."
                    }
                )
            }

            "EXPENSE_SPIKE" -> {
                val percentChange = data.num("percentChange")
                NotificationContent(
                    title = "\uD83D\uDCB0 Nexus \u2014 Expense Spike",
                    body = if (percentChange != null)
                        "Expenses increased by ${percentChange.toInt()}% compared to the previous period."
                    else
                        "An unusual spike in expenses has been detected."
                )
            }

            "CASHFLOW_NEGATIVE" -> {
                val deficit = data.num("deficit")
                NotificationContent(
                    title = "\uD83D\uDCB0 Nexus \u2014 Negative Cash Flow",
                    body = if (deficit != null)
                        "Cash flow is negative with a deficit of $deficit."
                    else
                        "Cash flow has turned negative. Review your income and expenses."
                )
            }

            // ----------------------------------------------------------------
            // Cognitive & Planning
            // ----------------------------------------------------------------

            "COGNITIVE_OVERLOAD" -> {
                val activeLoad = data.num("activeLoad")
                NotificationContent(
                    title = "\uD83E\uDDE0 Nexus \u2014 Cognitive Overload",
                    body = if (activeLoad != null)
                        "Active cognitive load is at ${activeLoad.toInt()}. Consider deferring non-urgent decisions."
                    else
                        "Cognitive load is critically high. Consider deferring non-urgent decisions."
                )
            }

            "PLANNING_OVERLOAD" -> {
                val planningLoad = data.num("planningLoad")
                val deadlinePressure = data.num("deadlinePressure")
                NotificationContent(
                    title = "\uD83E\uDDE0 Nexus \u2014 Planning Overload",
                    body = if (planningLoad != null && deadlinePressure != null)
                        "Planning load (${planningLoad.toInt()}) and deadline pressure (${deadlinePressure.toInt()}) are critically high."
                    else
                        "Planning load is critically high. Atlas recommends simplifying your schedule."
                )
            }

            "DEADLINE_APPROACHING" -> {
                val label = data.str("label")
                val hoursRemaining = data.num("hoursRemaining")
                NotificationContent(
                    title = "\u23F0 Nexus \u2014 Deadline Approaching",
                    body = when {
                        label != null -> "Deadline \"$label\" is approaching soon."
                        hoursRemaining != null -> "A tracked deadline is due in ~${hoursRemaining.toInt()} hours."
                        else -> "A tracked deadline is coming up. Check Atlas for details."
                    }
                )
            }

            "DEADLINE_CRUNCH" -> {
                val deadlinePressure = data.num("deadlinePressure")
                NotificationContent(
                    title = "\u23F0 Nexus \u2014 Deadline Pressure Critical",
                    body = if (deadlinePressure != null)
                        "Deadline pressure is at ${deadlinePressure.toInt()}. Atlas suggests re-prioritising tasks."
                    else
                        "Deadline pressure is at critical levels. Atlas suggests re-prioritising tasks."
                )
            }

            // ----------------------------------------------------------------
            // System-wide Critical
            // ----------------------------------------------------------------

            "CRISIS_MODE" -> {
                val note = data.str("note")
                val reason = data.str("reason")
                NotificationContent(
                    title = "\uD83D\uDEA8 Nexus \u2014 Crisis Mode Activated",
                    body = when {
                        note != null -> note
                        reason != null -> "Crisis mode activated: $reason."
                        else -> "Multiple domains are in critical state simultaneously. Immediate attention recommended."
                    }
                )
            }

            "CRISIS_DETECTED" -> {
                val trigger = data.str("trigger")
                val severity = data.str("severity")
                NotificationContent(
                    title = "\uD83D\uDEA8 Nexus \u2014 Crisis Detected",
                    body = if (trigger != null && severity != null)
                        "A $severity crisis has been flagged (trigger: $trigger)."
                    else
                        "A crisis-level event has been detected. Immediate review recommended."
                )
            }

            // ----------------------------------------------------------------
            // Atlas Overload
            // ----------------------------------------------------------------

            "ATLAS_ENERGY_OVERLOAD" -> {
                val activeLoad = data.num("activeLoad")
                val loadPct = data.num("loadPct")
                NotificationContent(
                    title = "\u26A1 Nexus \u2014 Energy Overload",
                    body = when {
                        activeLoad != null -> "Active load is at ${activeLoad.toInt()}. Consider reducing scheduled intensity."
                        loadPct != null -> "Energy load is at ${loadPct.toInt()}%. Consider reducing scheduled intensity."
                        else -> "Energy load is critically high. Consider reducing commitments."
                    }
                )
            }

            "ATLAS_OVERLOAD_DETECTED" -> {
                val state = data.str("state")
                NotificationContent(
                    title = "\u26A1 Nexus \u2014 System Overload",
                    body = if (state != null)
                        "Atlas has entered $state state. Recovery measures recommended."
                    else
                        "Atlas has detected system overload. Recovery measures recommended."
                )
            }

            "ATLAS_PREDICTIVE_ALERT" -> {
                val note = data.str("note")
                val reason = data.str("reason")
                val riskScore = data.num("riskScore")
                NotificationContent(
                    title = "\u26A1 Nexus \u2014 Predictive Risk Alert",
                    body = when {
                        note != null -> note
                        reason != null -> "Predictive alert: $reason."
                        riskScore != null -> "Risk score is at $riskScore. Proactive adjustment recommended."
                        else -> "Atlas has detected a predictive risk signal."
                    }
                )
            }

            // ----------------------------------------------------------------
            // Goals & Habits
            // ----------------------------------------------------------------

            "STREAK_BROKEN" -> NotificationContent(
                title = "\uD83D\uDD25 Nexus \u2014 Habit Streak At Risk",
                body = "Your habit streak health is critically low. Check Atlas to recover it."
            )

            "COMMITMENT_MISSED" -> {
                val overdueCount = data.num("overdueCount")
                NotificationContent(
                    title = "\uD83D\uDCCB Nexus \u2014 Commitments Missed",
                    body = if (overdueCount != null)
                        "${overdueCount.toInt()} task(s) are overdue. Review Atlas to get back on track."
                    else
                        "Tracked commitments have been missed. Check Atlas."
                )
            }

            // ----------------------------------------------------------------
            // Cadence
            // ----------------------------------------------------------------

            "WEEKLY_REVIEW_DUE" -> {
                val note = data.str("note")
                NotificationContent(
                    title = "\uD83D\uDCC5 Weekly Review Due",
                    body = note ?: "Time for your weekly reflection and planning session."
                )
            }

            "MORNING_BRIEF_DUE" -> NotificationContent(
                title = "\uD83C\uDF05 Morning Brief Ready",
                body = "Your morning brief is ready. Review today's plan in Atlas."
            )

            "EVENING_CHECKIN_DUE" -> {
                val note = data.str("note")
                NotificationContent(
                    title = "\uD83C\uDF19 Evening Check-in Ready",
                    body = note ?: "Time for your evening check-in. Reflect on today's progress."
                )
            }

            // ----------------------------------------------------------------
            // Other
            // ----------------------------------------------------------------

            "SCOUT_KNOWLEDGE_ENRICHED" -> {
                val claim = data.str("claim")
                NotificationContent(
                    title = "\uD83D\uDD2C Nexus Knowledge Enriched",
                    body = if (claim != null)
                        "Auto-indexed discovery: \"${claim.take(60)}${if (claim.length > 60) "..." else ""}\""
                    else
                        "Scout has auto-indexed new research into your library."
                )
            }

            "MODULE_REMINDER_DUE" -> {
                val note = data.str("note")
                NotificationContent(
                    title = "\uD83D\uDD14 Nexus Reminder",
                    body = note ?: "A scheduled reminder is due."
                )
            }

            "AI_LINK_FAILURE" -> {
                val errorMessage = data.str("errorMessage")
                NotificationContent(
                    title = "\u26A0\uFE0F Neural Link Interrupted",
                    body = if (errorMessage != null)
                        "The AI link encountered an error: $errorMessage."
                    else
                        "The neural link could not complete your request."
                )
            }

            // Unknown / internal-only event types — caller decides the fallback.
            else -> null
        }
    }

    // -- helpers ----------------------------------------------------------

    /** Safely extract a String from the data map. */
    private fun Map<String, Any?>.str(key: String): String? {
        val v = this[key] ?: return null
        return v.toString().ifBlank { null }
    }

    /** Safely extract a numeric value from the data map. */
    private fun Map<String, Any?>.num(key: String): Double? {
        return when (val v = this[key]) {
            is Number -> v.toDouble()
            is String -> v.toDoubleOrNull()
            else -> null
        }
    }
}
