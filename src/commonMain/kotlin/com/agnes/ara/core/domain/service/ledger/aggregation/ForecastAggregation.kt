package com.agnes.ara.core.domain.service.ledger.aggregation

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*

/**
 * Cash flow forecast aggregation — ported from forecast-aggregation.ts.
 *
 * All public functions accept/return JSON strings at the boundary.
 * [nowMs] replaces all Date.now() / new Date() calls.
 *
 * advanceByFrequency is inlined here (no platform recurring-engine equivalent exists yet in KMP).
 *
 * Complexity:
 *   computeCashFlowForecast  — O(r * h) where r = active rules, h = horizon days
 *   summarizeForecastByMonth — O(d * e) where d = days, e = events per day
 */
object ForecastAggregation {

    private val json = Json { ignoreUnknownKeys = true }

    // ── Internal model types ──────────────────────────────────────────────────

    @Serializable
    private data class RecurringRule(
        val id: String,
        val description: String,
        val amount: Double,
        val type: String,          // "income" | "expense"
        val category: String,
        val frequency: String,     // "daily" | "weekly" | "biweekly" | "monthly" | "quarterly" | "yearly"
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

    // Internal date representation: days since 1970-01-01
    private data class EpochDay(val days: Long) {
        operator fun compareTo(other: EpochDay): Int = days.compareTo(other.days)
        operator fun plus(n: Long): EpochDay = EpochDay(days + n)
    }

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * Compute a forward-looking cash flow forecast by expanding recurring rules
     * across the given horizon window.
     *
     * @param recurringRulesJson JSON array of RecurringRule objects.
     * @param startingBalance    Net liquid balance to begin from.
     * @param horizon            Number of days to forecast: 30, 60, or 90.
     * @param nowMs              Current epoch milliseconds.
     * @return JSON object conforming to CashFlowForecast:
     *         { generatedAt, horizon, startingBalance, days, lowestPoint, highestPoint, endBalance }.
     */
    fun computeCashFlowForecast(
        recurringRulesJson: String,
        startingBalance: Double,
        horizon: Int,
        nowMs: Long,
    ): String {
        val rules = json.decodeFromString<List<RecurringRule>>(recurringRulesJson)

        val startDay = epochMsToEpochDay(nowMs)
        val endDay = startDay + (horizon - 1).toLong()

        // Expand rules into a date-keyed map of events
        val eventsByDate = expandRulesToEvents(rules, startDay, endDay)

        val days = mutableListOf<JsonObject>()
        var runningBalance = startingBalance
        var lowestDate = epochDayToDateStr(startDay)
        var lowestBalance = runningBalance
        var highestDate = epochDayToDateStr(startDay)
        var highestBalance = runningBalance

        for (i in 0 until horizon) {
            val day = startDay + i.toLong()
            val dateStr = epochDayToDateStr(day)
            val events = eventsByDate[dateStr] ?: emptyList()

            var netFlow = 0.0
            for (event in events) {
                val amount = event["amount"]?.jsonPrimitive?.doubleOrNull ?: 0.0
                val type = event["type"]?.jsonPrimitive?.contentOrNull ?: ""
                netFlow = LedgerAggregationUtils.round2(netFlow + if (type == "income") amount else -amount)
            }

            runningBalance = LedgerAggregationUtils.round2(runningBalance + netFlow)

            if (runningBalance < lowestBalance) {
                lowestBalance = runningBalance
                lowestDate = dateStr
            }
            if (runningBalance > highestBalance) {
                highestBalance = runningBalance
                highestDate = dateStr
            }

            days.add(buildJsonObject {
                put("date", dateStr)
                put("netFlow", netFlow)
                put("runningBalance", runningBalance)
                put("events", JsonArray(events))
            })
        }

        return buildJsonObject {
            put("generatedAt", epochMsToIso(nowMs))
            put("horizon", horizon)
            put("startingBalance", startingBalance)
            put("days", JsonArray(days))
            put("lowestPoint", buildJsonObject {
                put("date", lowestDate)
                put("balance", lowestBalance)
            })
            put("highestPoint", buildJsonObject {
                put("date", highestDate)
                put("balance", highestBalance)
            })
            put("endBalance", runningBalance)
        }.toString()
    }

    /**
     * Summarise a forecast into monthly buckets suitable for table display.
     * Month keys use "MMM YYYY" format (e.g. "Apr 2026") computed from YYYY-MM-DD date strings.
     *
     * @param forecastJson JSON object from [computeCashFlowForecast].
     * @return JSON array of ForecastMonthSummary objects:
     *         { label, totalIncome, totalExpenses, net }.
     */
    fun summarizeForecastByMonth(forecastJson: String): String {
        val forecast = json.parseToJsonElement(forecastJson).jsonObject
        val forecastDays = forecast["days"]?.jsonArray ?: JsonArray(emptyList())

        // Ordered insertion using LinkedHashMap to preserve month order
        data class Bucket(var label: String, var totalIncome: Double = 0.0, var totalExpenses: Double = 0.0)
        val buckets = LinkedHashMap<String, Bucket>()

        for (dayElem in forecastDays) {
            val dayObj = dayElem.jsonObject
            val dateStr = dayObj["date"]?.jsonPrimitive?.contentOrNull ?: continue
            val label = dateToMonthLabel(dateStr)
            val bucket = buckets.getOrPut(label) { Bucket(label) }
            val events = dayObj["events"]?.jsonArray ?: continue

            for (eventElem in events) {
                val event = eventElem.jsonObject
                val amount = event["amount"]?.jsonPrimitive?.doubleOrNull ?: 0.0
                val type = event["type"]?.jsonPrimitive?.contentOrNull ?: ""
                if (type == "income") {
                    bucket.totalIncome = LedgerAggregationUtils.round2(bucket.totalIncome + amount)
                } else {
                    bucket.totalExpenses = LedgerAggregationUtils.round2(bucket.totalExpenses + amount)
                }
            }
        }

        val result = buckets.values.map { b ->
            buildJsonObject {
                put("label", b.label)
                put("totalIncome", b.totalIncome)
                put("totalExpenses", b.totalExpenses)
                put("net", LedgerAggregationUtils.round2(b.totalIncome - b.totalExpenses))
            }
        }

        return JsonArray(result).toString()
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    /**
     * Expand all active recurring rules into per-day event lists within the window.
     * Events are keyed by YYYY-MM-DD date string.
     */
    private fun expandRulesToEvents(
        rules: List<RecurringRule>,
        start: EpochDay,
        end: EpochDay,
    ): Map<String, List<JsonObject>> {
        val eventsByDate = mutableMapOf<String, MutableList<JsonObject>>()

        for (rule in rules) {
            if (!rule.isActive) continue
            var current = dateStrToEpochDay(rule.nextDueDate.take(10))
            if (current > end) continue

            while (current <= end) {
                if (current >= start) {
                    val key = epochDayToDateStr(current)
                    val list = eventsByDate.getOrPut(key) { mutableListOf() }
                    list.add(buildJsonObject {
                        put("date", key)
                        put("label", rule.description)
                        put("amount", rule.amount)
                        put("type", rule.type)
                        put("source", "recurring")
                    })
                }
                val next = advanceByFrequency(current, rule.frequency)
                if (next.days == current.days) break // safety guard
                current = next
            }
        }

        return eventsByDate
    }

    /**
     * Advance an EpochDay by one period of the given frequency.
     * Monthly/quarterly advancement uses calendar-aware logic to handle month lengths.
     */
    private fun advanceByFrequency(day: EpochDay, frequency: String): EpochDay {
        return when (frequency) {
            "daily" -> day + 1L
            "weekly" -> day + 7L
            "biweekly" -> day + 14L
            "monthly" -> advanceMonths(day, 1)
            "quarterly" -> advanceMonths(day, 3)
            "yearly" -> advanceMonths(day, 12)
            else -> day + 1L
        }
    }

    /** Advance by n calendar months, clamping to the last day of the target month. */
    private fun advanceMonths(day: EpochDay, n: Int): EpochDay {
        val (year, month, dayOfMonth) = epochDayToYMD(day)
        var newMonth = month + n
        var newYear = year
        while (newMonth > 12) { newMonth -= 12; newYear++ }
        val maxDay = daysInMonth(newYear, newMonth)
        val clampedDay = minOf(dayOfMonth, maxDay)
        return ymdToEpochDay(newYear, newMonth, clampedDay)
    }

    // ── Date arithmetic ───────────────────────────────────────────────────────

    private fun epochMsToEpochDay(ms: Long): EpochDay = EpochDay(ms / 86_400_000L)

    private fun epochDayToDateStr(day: EpochDay): String {
        val (year, month, d) = epochDayToYMD(day)
        fun p2(v: Int) = v.toString().padStart(2, '0')
        return "$year-${p2(month)}-${p2(d)}"
    }

    private fun dateStrToEpochDay(dateStr: String): EpochDay {
        val parts = dateStr.split("-")
        val y = parts.getOrNull(0)?.toIntOrNull() ?: 1970
        val m = parts.getOrNull(1)?.toIntOrNull() ?: 1
        val d = parts.getOrNull(2)?.toIntOrNull() ?: 1
        return ymdToEpochDay(y, m, d)
    }

    private data class YMD(val year: Int, val month: Int, val day: Int)

    private fun epochDayToYMD(day: EpochDay): YMD {
        var remaining = day.days.toInt()
        var year = 1970
        while (true) {
            val diy = if (isLeapYear(year)) 366 else 365
            if (remaining < diy) break
            remaining -= diy
            year++
        }
        val monthDays = if (isLeapYear(year))
            intArrayOf(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
        else
            intArrayOf(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
        var month = 0
        while (month < 12 && remaining >= monthDays[month]) {
            remaining -= monthDays[month]
            month++
        }
        return YMD(year, month + 1, remaining + 1)
    }

    private fun ymdToEpochDay(year: Int, month: Int, day: Int): EpochDay {
        var days = 0L
        for (y in 1970 until year) days += if (isLeapYear(y)) 366L else 365L
        val monthDays = if (isLeapYear(year))
            intArrayOf(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
        else
            intArrayOf(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
        for (m in 1 until month) days += monthDays[m - 1]
        days += (day - 1)
        return EpochDay(days)
    }

    private fun daysInMonth(year: Int, month: Int): Int = when (month) {
        2 -> if (isLeapYear(year)) 29 else 28
        4, 6, 9, 11 -> 30
        else -> 31
    }

    private fun isLeapYear(year: Int): Boolean =
        (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)

    /** Produce a "MMM YYYY" label from a YYYY-MM-DD string (e.g. "Apr 2026"). */
    private fun dateToMonthLabel(dateStr: String): String {
        val parts = dateStr.split("-")
        val year = parts.getOrNull(0)?.toIntOrNull() ?: return dateStr
        val month = parts.getOrNull(1)?.toIntOrNull() ?: return dateStr
        val monthName = when (month) {
            1 -> "Jan"; 2 -> "Feb"; 3 -> "Mar"; 4 -> "Apr"
            5 -> "May"; 6 -> "Jun"; 7 -> "Jul"; 8 -> "Aug"
            9 -> "Sep"; 10 -> "Oct"; 11 -> "Nov"; 12 -> "Dec"
            else -> "???"
        }
        return "$monthName $year"
    }

    /** Convert epoch ms to a minimal ISO8601 UTC string. */
    private fun epochMsToIso(epochMs: Long): String {
        var remaining = epochMs / 1000L
        val second = (remaining % 60).toInt(); remaining /= 60
        val minute = (remaining % 60).toInt(); remaining /= 60
        val hour = (remaining % 24).toInt(); remaining /= 24
        val (year, month, day) = epochDayToYMD(EpochDay(remaining))
        fun p2(v: Int) = v.toString().padStart(2, '0')
        return "$year-${p2(month)}-${p2(day)}T${p2(hour)}:${p2(minute)}:${p2(second)}Z"
    }
}
