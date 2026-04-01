package com.agnes.nexus.core.domain.service.ledger.aggregation

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*

/**
 * Financial calendar aggregation — ported from calendar-aggregation.ts.
 *
 * Builds CalendarEvent lists for a given month from recurring rules, subscriptions,
 * financial goals, debt due dates, credit card due dates, and estimated tax quarters.
 *
 * computeUpcomingBills (from recurring-engine.ts) is inlined here since no KMP
 * equivalent exists in cortex-logic yet.
 *
 * All public functions accept/return JSON strings at the boundary.
 * [nowMs] is used where bill lookahead needs a current reference point.
 *
 * Complexity: O(r * h + s + g + d + a) where r = recurring rules, h = lookahead horizon,
 *             s = subscriptions, g = goals, d = debt items, a = accounts.
 */
object CalendarAggregation {

    private val json = Json { ignoreUnknownKeys = true }

    // ── Internal model types ──────────────────────────────────────────────────

    @Serializable
    private data class RecurringRule(
        val id: String,
        val description: String,
        val amount: Double,
        val type: String,
        val category: String,
        val frequency: String,
        val startDate: String,
        val nextDueDate: String,
        val isActive: Boolean,
        val autoPost: Boolean,
        val createdAt: String,
        val lastPostedDate: String? = null,
        val accountId: String? = null,
        val budgetCategoryId: String? = null,
        val taxCategory: String? = null,
        val notes: String? = null,
    )

    @Serializable
    private data class Subscription(
        val id: String,
        val name: String,
        val category: String,
        val amount: Double,
        val billingCycle: String,
        val status: String,
        val nextRenewalDate: String,
        val trialEndsAt: String? = null,
        val color: String? = null,
        val accountId: String? = null,
        val createdAt: String,
        val updatedAt: String,
    )

    @Serializable
    private data class FinancialGoal(
        val id: String,
        val name: String,
        val targetAmount: Double,
        val currentAmount: Double,
        val targetDate: String? = null,
        val monthlyContribution: Double = 0.0,
    )

    @Serializable
    private data class DebtItem(
        val id: String,
        val name: String,
        val balance: Double,
        val minPayment: Double,
        val apr: Double,
        val dueDay: Int? = null,
    )

    @Serializable
    private data class Account(
        val id: String,
        val name: String,
        val type: String,
        val balance: Double,
        val lastFour: String? = null,
        val paymentDueDay: Int? = null,
    )

    /**
     * Minimal profile view for calendar generation.
     */
    @Serializable
    private data class LedgerProfile(
        val recurringRules: List<RecurringRule> = emptyList(),
        val subscriptions: List<Subscription> = emptyList(),
        val financialGoals: List<FinancialGoal> = emptyList(),
        val debtItems: List<DebtItem> = emptyList(),
        val accounts: List<Account> = emptyList(),
    )

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * Build CalendarEvent objects for a given month (year/month 1-based) from:
     *   - Recurring rules (bills and income) within a 90-day lookahead
     *   - Subscription renewal and trial-end dates
     *   - Financial goal deadlines
     *   - Debt item due dates (from dueDay)
     *   - Credit card payment due dates (from paymentDueDay)
     *   - Quarterly estimated tax due dates
     *
     * Events are sorted ascending by date.
     *
     * @param profileJson JSON object conforming to LedgerIntakeProfile.
     * @param year        Calendar year (e.g. 2026).
     * @param month       Calendar month 1–12.
     * @param nowMs       Current epoch milliseconds (for recurring bill lookahead).
     * @return JSON array of CalendarEvent objects.
     */
    fun buildCalendarEvents(profileJson: String, year: Int, month: Int, nowMs: Long): String {
        val profile = json.decodeFromString<LedgerProfile>(profileJson)
        val target = dateToYearMonth(year, month)
        val events = mutableListOf<JsonObject>()

        // ── Recurring rules (bills + income) ─────────────────────────────────
        val allBills = computeUpcomingBills(profile.recurringRules, 90, nowMs)
        for (bill in allBills) {
            val billYM = bill.nextDueDate.take(7)
            if (billYM == target) {
                events.add(buildJsonObject {
                    put("id", "rec_${bill.id}_$target")
                    put("type", if (bill.type == "income") "income" else "bill")
                    put("title", bill.description)
                    put("date", bill.nextDueDate)
                    put("amount", bill.amount)
                    put("isIncome", bill.type == "income")
                    put("color", if (bill.type == "income") "#10b981" else "#f43f5e")
                    put("entityId", bill.id)
                })
            }
        }

        // ── Subscriptions ─────────────────────────────────────────────────────
        for (sub in profile.subscriptions) {
            if (sub.status == "cancelled") continue

            val renewYM = sub.nextRenewalDate.take(7)
            if (renewYM == target) {
                events.add(buildJsonObject {
                    put("id", "sub_${sub.id}_$target")
                    put("type", "subscription")
                    put("title", "${sub.name} renewal")
                    put("date", sub.nextRenewalDate)
                    put("amount", sub.amount)
                    put("isIncome", false)
                    put("color", sub.color ?: "#6366f1")
                    put("entityId", sub.id)
                })
            }

            // Trial end event
            if (sub.status == "trial" && sub.trialEndsAt != null) {
                val trialYM = sub.trialEndsAt.take(7)
                if (trialYM == target) {
                    events.add(buildJsonObject {
                        put("id", "trial_${sub.id}_$target")
                        put("type", "subscription")
                        put("title", "${sub.name} trial ends")
                        put("date", sub.trialEndsAt)
                        put("amount", sub.amount)
                        put("isIncome", false)
                        put("color", "#f59e0b")
                        put("entityId", sub.id)
                        put("notes", "Trial period ending")
                    })
                }
            }
        }

        // ── Financial goal deadlines ──────────────────────────────────────────
        for (goal in profile.financialGoals) {
            if (goal.targetDate == null) continue
            val goalYM = goal.targetDate.take(7)
            if (goalYM == target) {
                events.add(buildJsonObject {
                    put("id", "goal_${goal.id}")
                    put("type", "goal_deadline")
                    put("title", "Goal deadline: ${goal.name}")
                    put("date", goal.targetDate)
                    put("amount", goal.targetAmount)
                    put("color", "#a78bfa")
                    put("entityId", goal.id)
                })
            }
        }

        // ── Debt payment due dates ────────────────────────────────────────────
        for (debt in profile.debtItems) {
            if (debt.dueDay == null) continue
            val maxDay = daysInMonth(year, month)
            val day = minOf(debt.dueDay, maxDay)
            fun p2(v: Int) = v.toString().padStart(2, '0')
            val dateStr = "$year-${p2(month)}-${p2(day)}"
            val minLabel = if (debt.minPayment > 0.0) " — Min $${debt.minPayment.toLong()}" else ""

            events.add(buildJsonObject {
                put("id", "debt_due_${debt.id}_$target")
                put("type", "bill")
                put("title", "${debt.name}$minLabel")
                put("date", dateStr)
                if (debt.minPayment > 0.0) put("amount", debt.minPayment) else put("amount", JsonNull)
                put("isIncome", false)
                put("color", "#f43f5e")
                put("entityId", debt.id)
                put("notes", "Debt payment due")
            })
        }

        // ── Credit card payment due dates ─────────────────────────────────────
        for (acct in profile.accounts) {
            if (acct.type != "credit_card" || acct.paymentDueDay == null) continue
            val maxDay = daysInMonth(year, month)
            val day = minOf(acct.paymentDueDay, maxDay)
            fun p2(v: Int) = v.toString().padStart(2, '0')
            val dateStr = "$year-${p2(month)}-${p2(day)}"
            val cardLabel = if (acct.lastFour != null) " ···· ${acct.lastFour}" else ""
            val absBalance = kotlin.math.abs(acct.balance)
            val balanceLabel = if (acct.balance != 0.0) " — $${absBalance.toLong()} owed" else ""

            events.add(buildJsonObject {
                put("id", "card_due_${acct.id}_$target")
                put("type", "bill")
                put("title", "${acct.name}${cardLabel} payment${balanceLabel}")
                put("date", dateStr)
                if (absBalance > 0.0) put("amount", absBalance) else put("amount", JsonNull)
                put("isIncome", false)
                put("color", "#f43f5e")
                put("entityId", acct.id)
                put("notes", "Credit card payment due")
            })
        }

        // ── Quarterly estimated tax due dates ─────────────────────────────────
        // Q1→04-15, Q2→06-15, Q3→09-15, Q4→01-15 (next year)
        val quarters = listOf(
            Triple(0, year,     "04-15"),
            Triple(1, year,     "06-15"),
            Triple(2, year,     "09-15"),
            Triple(3, year + 1, "01-15"),
        )
        for ((qIdx, taxYear, mmdd) in quarters) {
            val dateStr = "$taxYear-$mmdd"
            val taxYM = dateStr.take(7)
            if (taxYM == target) {
                events.add(buildJsonObject {
                    put("id", "tax_q${qIdx}_$year")
                    put("type", "tax")
                    put("title", "Q${qIdx + 1} Estimated Tax Due")
                    put("date", dateStr)
                    put("color", "#f97316")
                })
            }
        }

        // Sort ascending by date string (ISO8601 lexicographic == chronological)
        val sorted = events.sortedBy { it["date"]?.jsonPrimitive?.contentOrNull ?: "" }
        return JsonArray(sorted).toString()
    }

    /**
     * Group CalendarEvents by ISO date string (date portion only).
     *
     * @param eventsJson JSON array of CalendarEvent objects.
     * @return JSON object mapping "YYYY-MM-DD" keys to arrays of CalendarEvent objects.
     */
    fun groupEventsByDate(eventsJson: String): String {
        val events = json.parseToJsonElement(eventsJson).jsonArray
        val grouped = LinkedHashMap<String, MutableList<JsonObject>>()

        for (elem in events) {
            val obj = elem.jsonObject
            val key = (obj["date"]?.jsonPrimitive?.contentOrNull ?: "").take(10)
            grouped.getOrPut(key) { mutableListOf() }.add(obj)
        }

        return buildJsonObject {
            for ((date, list) in grouped) {
                put(date, JsonArray(list))
            }
        }.toString()
    }

    // ── Private: computeUpcomingBills (inlined from recurring-engine.ts) ──────

    /**
     * Return all active recurring rules whose nextDueDate falls within [days] days
     * from [nowMs]. Each result has a resolved `nextDueDate` field (YYYY-MM-DD).
     */
    private fun computeUpcomingBills(
        rules: List<RecurringRule>,
        days: Int,
        nowMs: Long,
    ): List<RecurringRule> {
        val todayDay = nowMs / 86_400_000L
        val horizonDay = todayDay + days

        return rules
            .filter { it.isActive }
            .mapNotNull { rule ->
                val due = dateStrToEpochDay(rule.nextDueDate.take(10))
                if (due < todayDay || due > horizonDay) null
                else rule.copy(nextDueDate = epochDayToDateStr(due))
            }
            .sortedBy { it.nextDueDate }
    }

    // ── Private: date helpers ─────────────────────────────────────────────────

    private fun dateToYearMonth(year: Int, month: Int): String =
        "$year-${month.toString().padStart(2, '0')}"

    private fun daysInMonth(year: Int, month: Int): Int = when (month) {
        2 -> if (isLeapYear(year)) 29 else 28
        4, 6, 9, 11 -> 30
        else -> 31
    }

    private fun isLeapYear(year: Int): Boolean =
        (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)

    private fun dateStrToEpochDay(dateStr: String): Long {
        val parts = dateStr.split("-")
        val year = parts.getOrNull(0)?.toIntOrNull() ?: 1970
        val month = parts.getOrNull(1)?.toIntOrNull() ?: 1
        val day = parts.getOrNull(2)?.toIntOrNull() ?: 1
        var days = 0L
        for (y in 1970 until year) days += if (isLeapYear(y)) 366L else 365L
        val md = if (isLeapYear(year)) intArrayOf(31,29,31,30,31,30,31,31,30,31,30,31)
                 else intArrayOf(31,28,31,30,31,30,31,31,30,31,30,31)
        for (m in 1 until month) days += md[m - 1]
        return days + (day - 1)
    }

    private fun epochDayToDateStr(epochDay: Long): String {
        var remaining = epochDay.toInt()
        var year = 1970
        while (true) {
            val diy = if (isLeapYear(year)) 366 else 365
            if (remaining < diy) break
            remaining -= diy
            year++
        }
        val md = if (isLeapYear(year)) intArrayOf(31,29,31,30,31,30,31,31,30,31,30,31)
                 else intArrayOf(31,28,31,30,31,30,31,31,30,31,30,31)
        var month = 0
        while (month < 12 && remaining >= md[month]) { remaining -= md[month]; month++ }
        fun p2(v: Int) = v.toString().padStart(2, '0')
        return "$year-${p2(month + 1)}-${p2(remaining + 1)}"
    }
}
