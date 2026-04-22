package com.agnes.ara.core.domain.service.ledger.aggregation

import kotlinx.serialization.json.*
import kotlin.math.roundToLong

/**
 * Shared ledger aggregation utilities — date math, period filtering, rounding.
 * All date functions accept nowMs to avoid platform-specific Date calls.
 */
object LedgerAggregationUtils {

    private val json = Json { ignoreUnknownKeys = true }

    fun round2(value: Double): Double =
        (value * 100).roundToLong() / 100.0

    /**
     * Convert epoch ms to "YYYY-MM" format.
     * Uses manual calculation to avoid platform-specific Date APIs.
     */
    fun epochMsToYearMonth(nowMs: Long): String {
        // Calculate year and month from epoch ms
        // Using a simplified algorithm based on days since epoch
        val days = (nowMs / 86400000L).toInt()
        var y = 1970
        var remaining = days

        while (true) {
            val daysInYear = if (isLeapYear(y)) 366 else 365
            if (remaining < daysInYear) break
            remaining -= daysInYear
            y++
        }

        val monthDays = if (isLeapYear(y))
            intArrayOf(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
        else
            intArrayOf(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)

        var m = 0
        while (m < 12 && remaining >= monthDays[m]) {
            remaining -= monthDays[m]
            m++
        }

        return "$y-${(m + 1).toString().padStart(2, '0')}"
    }

    /**
     * Returns "YYYY-MM" for n months before the given epoch ms.
     */
    fun monthsAgo(n: Int, nowMs: Long): String {
        val current = epochMsToYearMonth(nowMs)
        val parts = current.split("-")
        var year = parts[0].toInt()
        var month = parts[1].toInt() - n

        while (month <= 0) {
            month += 12
            year--
        }
        while (month > 12) {
            month -= 12
            year++
        }

        return "$year-${month.toString().padStart(2, '0')}"
    }

    /**
     * Get start/end dates for a "YYYY-MM" month string.
     */
    fun getMonthBounds(month: String): Pair<String, String> {
        val parts = month.split("-")
        val year = parts[0].toInt()
        val mo = parts[1].toInt()
        val lastDay = daysInMonth(year, mo)
        val start = "$month-01"
        val end = "$month-${lastDay.toString().padStart(2, '0')}"
        return start to end
    }

    /**
     * Filter transactions JSON array by date period.
     * @param transactionsJson JSON array of objects with "date" field
     * @param start Start date (inclusive) in YYYY-MM-DD format
     * @param end End date (inclusive) in YYYY-MM-DD format
     */
    fun filterByPeriod(transactionsJson: String, start: String, end: String): String {
        val transactions = json.parseToJsonElement(transactionsJson).jsonArray
        val filtered = transactions.filter { t ->
            val date = t.jsonObject["date"]?.jsonPrimitive?.contentOrNull ?: ""
            date >= start && date <= end
        }
        return JsonArray(filtered).toString()
    }

    fun toYearMonth(isoDate: String): String = isoDate.take(7)

    /**
     * Calculate average daily burn rate from a JSON transactions array.
     * Averages expense transactions in the last 30 days over 30 days.
     * @param transactionsJson JSON array; each object must have "type", "amount", "date" fields.
     * @param nowMs Current epoch ms (used for 30-day cutoff).
     * @return Daily burn rate ≥ 1.0 (prevents division-by-zero in downstream callers).
     */
    fun calculateDailyBurnRate(transactionsJson: String, nowMs: Long): Double {
        val cutoffMs = nowMs - 30L * 24 * 60 * 60 * 1000
        val cutoffDate = epochMsToYearMonth(cutoffMs).let { ym ->
            // Convert YYYY-MM cutoff to YYYY-MM-01 as lower bound
            "$ym-01"
        }
        val allTxns = json.parseToJsonElement(transactionsJson).jsonArray
        val expenses = allTxns.filter { t ->
            val obj = t.jsonObject
            obj["type"]?.jsonPrimitive?.contentOrNull == "expense" &&
                (obj["date"]?.jsonPrimitive?.contentOrNull ?: "") >= cutoffDate
        }
        val total = expenses.sumOf { it.jsonObject["amount"]?.jsonPrimitive?.doubleOrNull ?: 0.0 }
        return maxOf(1.0, total / 30.0)
    }

    /**
     * Per-transaction friction: F = |R_negative| × (amount / dailyBurnRate).
     * Returns 0 when resonanceScore ≥ 0 (neutral/positive resonance has no friction).
     */
    fun calculateTransactionFriction(amount: Double, resonanceScore: Double, dailyBurnRate: Double): Double {
        if (resonanceScore >= 0.0 || dailyBurnRate <= 0.0) return 0.0
        return -resonanceScore * (amount / dailyBurnRate)
    }

    /**
     * Runway days: D = (totalLiquidity / avgDailyBurn) × confidenceInterval.
     * Returns 999 when avgDailyBurn ≤ 0 (infinite runway proxy).
     */
    fun calculateRunway(liquidity: Double, avgDailyBurn: Double, confidenceInterval: Double): Double {
        if (avgDailyBurn <= 0.0) return 999.0
        return (liquidity / avgDailyBurn) * confidenceInterval.coerceIn(0.1, 1.0)
    }

    private fun isLeapYear(year: Int): Boolean =
        (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)

    private fun daysInMonth(year: Int, month: Int): Int = when (month) {
        2 -> if (isLeapYear(year)) 29 else 28
        4, 6, 9, 11 -> 30
        else -> 31
    }
}
