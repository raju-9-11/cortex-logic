package com.agnes.ara.core.domain.service.ledger.aggregation

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*

/**
 * Subscription aggregation logic — ported from subscription-aggregation.ts.
 *
 * All public functions accept/return JSON strings at the boundary.
 * [nowMs] replaces Date.now() / new Date() calls.
 *
 * Complexity: O(n) for all functions where n = number of subscriptions.
 */
object SubscriptionAggregation {

    private val json = Json { ignoreUnknownKeys = true }

    // ── Internal model types ──────────────────────────────────────────────────

    @Serializable
    private data class Subscription(
        val id: String,
        val name: String,
        val category: String,
        val amount: Double,
        val billingCycle: String,
        val monthlyEquivalent: Double = 0.0,
        val status: String,
        val nextRenewalDate: String,
        val trialEndsAt: String? = null,
        val reminderDays: Int? = null,
        val website: String? = null,
        val notes: String? = null,
        val color: String? = null,
        val accountId: String? = null,
        val createdAt: String,
        val updatedAt: String,
    )

    // ── Billing cycle conversion ──────────────────────────────────────────────

    /**
     * Convert an amount billed at [cycle] frequency to its monthly equivalent.
     *
     * weekly    → amount * 52 / 12
     * monthly   → amount
     * quarterly → amount / 3
     * yearly    → amount / 12
     * lifetime  → 0
     */
    fun toMonthlyEquivalent(amount: Double, cycle: String): Double = when (cycle) {
        "weekly" -> amount * 52.0 / 12.0
        "monthly" -> amount
        "quarterly" -> amount / 3.0
        "yearly" -> amount / 12.0
        "lifetime" -> 0.0
        else -> amount
    }

    /**
     * Convert an amount billed at [cycle] frequency to its annual equivalent.
     *
     * weekly    → amount * 52
     * monthly   → amount * 12
     * quarterly → amount * 4
     * yearly    → amount
     * lifetime  → 0
     */
    fun toAnnualEquivalent(amount: Double, cycle: String): Double = when (cycle) {
        "weekly" -> amount * 52.0
        "monthly" -> amount * 12.0
        "quarterly" -> amount * 4.0
        "yearly" -> amount
        "lifetime" -> 0.0
        else -> amount * 12.0
    }

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * Compute aggregate subscription totals and status counts.
     * Active and trial subscriptions contribute to totalMonthly/totalAnnual.
     *
     * @param subscriptionsJson JSON array of Subscription objects.
     * @return JSON object: { totalMonthly, totalAnnual, activeCount, trialCount,
     *         pausedCount, cancelledCount }.
     */
    fun computeSubscriptionSummary(subscriptionsJson: String): String {
        val subscriptions = parseSubscriptions(subscriptionsJson)

        var totalMonthly = 0.0
        var totalAnnual = 0.0
        var activeCount = 0
        var trialCount = 0
        var pausedCount = 0
        var cancelledCount = 0

        for (sub in subscriptions) {
            val monthly = toMonthlyEquivalent(sub.amount, sub.billingCycle)
            val annual = toAnnualEquivalent(sub.amount, sub.billingCycle)

            when (sub.status) {
                "active" -> {
                    totalMonthly += monthly
                    totalAnnual += annual
                    activeCount++
                }
                "trial" -> {
                    totalMonthly += monthly
                    totalAnnual += annual
                    trialCount++
                }
                "paused" -> pausedCount++
                else -> cancelledCount++
            }
        }

        return buildJsonObject {
            put("totalMonthly", totalMonthly)
            put("totalAnnual", totalAnnual)
            put("activeCount", activeCount)
            put("trialCount", trialCount)
            put("pausedCount", pausedCount)
            put("cancelledCount", cancelledCount)
        }.toString()
    }

    /**
     * Returns subscriptions whose trial ends within [withinDays] days from [nowMs].
     *
     * @param subscriptionsJson JSON array of Subscription objects.
     * @param nowMs             Current epoch milliseconds.
     * @param withinDays        Lookahead window in days (default 7).
     * @return JSON array of matching Subscription objects (original JSON preserved).
     */
    fun getExpiringTrials(
        subscriptionsJson: String,
        nowMs: Long,
        withinDays: Int = 7,
    ): String {
        val rawArray = json.parseToJsonElement(subscriptionsJson).jsonArray
        val subscriptions = parseSubscriptions(subscriptionsJson)
        val cutoffMs = nowMs + withinDays.toLong() * 86_400_000L

        val filtered = rawArray.filterIndexed { index, _ ->
            val sub = subscriptions[index]
            if (sub.status != "trial" || sub.trialEndsAt == null) return@filterIndexed false
            val trialEndMs = isoToEpochMs(sub.trialEndsAt)
            trialEndMs >= nowMs && trialEndMs <= cutoffMs
        }

        return JsonArray(filtered).toString()
    }

    /**
     * Returns active/trial subscriptions renewing within [withinDays] days from [nowMs].
     *
     * @param subscriptionsJson JSON array of Subscription objects.
     * @param nowMs             Current epoch milliseconds.
     * @param withinDays        Lookahead window in days (default 7).
     * @return JSON array of matching Subscription objects (original JSON preserved).
     */
    fun getUpcomingRenewals(
        subscriptionsJson: String,
        nowMs: Long,
        withinDays: Int = 7,
    ): String {
        val rawArray = json.parseToJsonElement(subscriptionsJson).jsonArray
        val subscriptions = parseSubscriptions(subscriptionsJson)
        val cutoffMs = nowMs + withinDays.toLong() * 86_400_000L

        val filtered = rawArray.filterIndexed { index, _ ->
            val sub = subscriptions[index]
            if (sub.status == "cancelled" || sub.status == "paused") return@filterIndexed false
            val renewalMs = isoToEpochMs(sub.nextRenewalDate)
            renewalMs >= nowMs && renewalMs <= cutoffMs
        }

        return JsonArray(filtered).toString()
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    private fun parseSubscriptions(subscriptionsJson: String): List<Subscription> =
        json.decodeFromString<List<Subscription>>(subscriptionsJson)

    /**
     * Parse an ISO date-only or ISO datetime string to epoch milliseconds.
     * Handles "YYYY-MM-DD" and "YYYY-MM-DDTHH:MM:SSZ" forms without platform APIs.
     */
    private fun isoToEpochMs(iso: String): Long {
        val datePart = iso.take(10)
        val parts = datePart.split("-")
        if (parts.size < 3) return 0L
        val year = parts[0].toIntOrNull() ?: return 0L
        val month = parts[1].toIntOrNull() ?: return 0L
        val day = parts[2].toIntOrNull() ?: return 0L

        // Days from epoch (1970-01-01) to year-month-day
        var days = 0L
        for (y in 1970 until year) {
            days += if (isLeapYear(y)) 366L else 365L
        }
        val monthDays = if (isLeapYear(year))
            intArrayOf(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
        else
            intArrayOf(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
        for (m in 1 until month) days += monthDays[m - 1]
        days += (day - 1)

        // Parse optional time component
        var timeMs = 0L
        if (iso.length > 10) {
            val timePart = iso.substring(11).trimEnd('Z')
            val timeParts = timePart.split(":")
            val h = timeParts.getOrNull(0)?.toIntOrNull() ?: 0
            val min = timeParts.getOrNull(1)?.toIntOrNull() ?: 0
            val s = timeParts.getOrNull(2)?.toDoubleOrNull()?.toLong() ?: 0L
            timeMs = (h * 3600L + min * 60L + s) * 1000L
        }

        return days * 86_400_000L + timeMs
    }

    private fun isLeapYear(year: Int): Boolean =
        (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)
}
