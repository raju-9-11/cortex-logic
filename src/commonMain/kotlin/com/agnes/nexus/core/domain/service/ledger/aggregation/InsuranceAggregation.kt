package com.agnes.nexus.core.domain.service.ledger.aggregation

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*

/**
 * Insurance aggregation logic — ported from insurance-aggregation.ts.
 *
 * All public functions accept/return JSON strings at the boundary.
 * [nowMs] replaces Date.now() / new Date() calls.
 *
 * Complexity: O(n) for all functions where n = number of policies.
 */
object InsuranceAggregation {

    private val json = Json { ignoreUnknownKeys = true }

    // ── Internal model types ──────────────────────────────────────────────────

    @Serializable
    private data class InsurancePolicy(
        val id: String,
        val name: String,
        val type: String,
        val provider: String,
        val premium: Double,
        val billingCycle: String,
        val monthlyPremium: Double,
        val coverageAmount: Double? = null,
        val deductible: Double? = null,
        val policyNumber: String? = null,
        val nextRenewalDate: String,
        val startDate: String,
        val isActive: Boolean,
        val notes: String? = null,
        val createdAt: String,
        val updatedAt: String,
    )

    // ── Billing cycle conversion ──────────────────────────────────────────────

    /**
     * Normalise a premium amount to its monthly equivalent.
     *
     * monthly   → premium
     * quarterly → premium / 3
     * biannual  → premium / 6
     * yearly    → premium / 12
     */
    fun toMonthlyPremium(premium: Double, cycle: String): Double = when (cycle) {
        "monthly" -> premium
        "quarterly" -> premium / 3.0
        "biannual" -> premium / 6.0
        "yearly" -> premium / 12.0
        else -> premium
    }

    /**
     * Normalise a premium amount to its annual equivalent.
     *
     * monthly   → premium * 12
     * quarterly → premium * 4
     * biannual  → premium * 2
     * yearly    → premium
     */
    fun toAnnualPremium(premium: Double, cycle: String): Double = when (cycle) {
        "monthly" -> premium * 12.0
        "quarterly" -> premium * 4.0
        "biannual" -> premium * 2.0
        "yearly" -> premium
        else -> premium * 12.0
    }

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * Compute an aggregate summary of all insurance policies.
     * Only active policies contribute to cost totals and byType breakdown.
     *
     * @param policiesJson JSON array of InsurancePolicy objects.
     * @return JSON object: { totalMonthly, totalAnnual, activeCount, inactiveCount, byType }.
     */
    fun computeInsuranceSummary(policiesJson: String): String {
        val policies = parsePolicies(policiesJson)

        var totalMonthly = 0.0
        var totalAnnual = 0.0
        var activeCount = 0
        var inactiveCount = 0
        val byType = mutableMapOf<String, Double>()

        for (policy in policies) {
            if (policy.isActive) {
                totalMonthly += policy.monthlyPremium
                totalAnnual += toAnnualPremium(policy.premium, policy.billingCycle)
                activeCount++
                byType[policy.type] = (byType[policy.type] ?: 0.0) + policy.monthlyPremium
            } else {
                inactiveCount++
            }
        }

        return buildJsonObject {
            put("totalMonthly", totalMonthly)
            put("totalAnnual", totalAnnual)
            put("activeCount", activeCount)
            put("inactiveCount", inactiveCount)
            put("byType", buildJsonObject { for ((t, v) in byType) put(t, v) })
        }.toString()
    }

    /**
     * Returns active policies renewing within [withinDays] days from [nowMs].
     *
     * @param policiesJson JSON array of InsurancePolicy objects.
     * @param nowMs        Current epoch milliseconds.
     * @param withinDays   Lookahead window in days (default 30).
     * @return JSON array of matching InsurancePolicy objects (original JSON preserved).
     */
    fun getUpcomingRenewals(
        policiesJson: String,
        nowMs: Long,
        withinDays: Int = 30,
    ): String {
        val rawArray = json.parseToJsonElement(policiesJson).jsonArray
        val policies = parsePolicies(policiesJson)
        val cutoffMs = nowMs + withinDays.toLong() * 86_400_000L

        val filtered = rawArray.filterIndexed { index, _ ->
            val p = policies[index]
            if (!p.isActive) return@filterIndexed false
            val renewalMs = isoToEpochMs(p.nextRenewalDate)
            renewalMs >= nowMs && renewalMs <= cutoffMs
        }

        return JsonArray(filtered).toString()
    }

    /**
     * Detect potential coverage gaps by checking for required policy types.
     * Evaluates health, life/disability, and auto coverage.
     *
     * @param policiesJson JSON array of InsurancePolicy objects.
     * @return JSON array of gap description strings.
     */
    fun detectCoverageGaps(policiesJson: String): String {
        val policies = parsePolicies(policiesJson)
        val activeTypes = policies.filter { it.isActive }.map { it.type }.toSet()
        val gaps = mutableListOf<String>()

        if ("health" !in activeTypes) {
            gaps.add("No active health insurance policy detected.")
        }
        if ("life" !in activeTypes && "disability" !in activeTypes) {
            gaps.add("No life or disability insurance — consider coverage for income protection.")
        }
        if ("auto" !in activeTypes) {
            gaps.add("No auto insurance detected (required in most jurisdictions).")
        }

        return JsonArray(gaps.map { JsonPrimitive(it) }).toString()
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    private fun parsePolicies(policiesJson: String): List<InsurancePolicy> =
        json.decodeFromString<List<InsurancePolicy>>(policiesJson)

    /** Parse an ISO date string to epoch milliseconds (date-only and datetime forms). */
    private fun isoToEpochMs(iso: String): Long {
        val datePart = iso.take(10)
        val parts = datePart.split("-")
        if (parts.size < 3) return 0L
        val year = parts[0].toIntOrNull() ?: return 0L
        val month = parts[1].toIntOrNull() ?: return 0L
        val day = parts[2].toIntOrNull() ?: return 0L

        var days = 0L
        for (y in 1970 until year) days += if (isLeapYear(y)) 366L else 365L
        val monthDays = if (isLeapYear(year))
            intArrayOf(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
        else
            intArrayOf(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
        for (m in 1 until month) days += monthDays[m - 1]
        days += (day - 1)
        return days * 86_400_000L
    }

    private fun isLeapYear(year: Int): Boolean =
        (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)
}
