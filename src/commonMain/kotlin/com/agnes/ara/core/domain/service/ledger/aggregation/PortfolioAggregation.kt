package com.agnes.ara.core.domain.service.ledger.aggregation

import com.agnes.ara.core.platform.generateUuid
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*

/**
 * Portfolio aggregation logic — ported from portfolio-aggregation.ts.
 *
 * All public functions accept/return JSON strings at the boundary.
 *
 * Complexity: O(n) for computePortfolioSummary/buildPortfolioSnapshot,
 *             O(n log n) for getTopHoldings (sort), O(1) for recomputeInvestment.
 */
object PortfolioAggregation {

    private val json = Json { ignoreUnknownKeys = true }

    // ── Internal model types ──────────────────────────────────────────────────

    @Serializable
    private data class Investment(
        val id: String,
        val name: String,
        val ticker: String? = null,
        val type: String,
        val quantity: Double,
        val costBasis: Double,
        val currentPrice: Double,
        val currentValue: Double,
        val totalCost: Double,
        val unrealizedGain: Double,
        val dividendsReceived: Double? = null,
        val accountId: String? = null,
        val notes: String? = null,
        val purchasedAt: String? = null,
        val lastUpdatedAt: String,
        val createdAt: String,
    )

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * Compute an aggregate summary of all investment holdings.
     *
     * @param investmentsJson JSON array of Investment objects.
     * @return JSON object with fields: totalValue, totalCost, unrealizedGain,
     *         unrealizedGainPct, totalDividends, allocationByType, holdingCount.
     */
    fun computePortfolioSummary(investmentsJson: String): String {
        val investments = parseInvestments(investmentsJson)

        var totalValue = 0.0
        var totalCost = 0.0
        var totalDividends = 0.0
        val allocationByType = mutableMapOf<String, Double>()

        for (inv in investments) {
            totalValue += inv.currentValue
            totalCost += inv.totalCost
            totalDividends += inv.dividendsReceived ?: 0.0
            allocationByType[inv.type] = (allocationByType[inv.type] ?: 0.0) + inv.currentValue
        }

        val unrealizedGain = totalValue - totalCost
        val unrealizedGainPct = if (totalCost > 0.0) (unrealizedGain / totalCost) * 100.0 else 0.0

        return buildJsonObject {
            put("totalValue", totalValue)
            put("totalCost", totalCost)
            put("unrealizedGain", unrealizedGain)
            put("unrealizedGainPct", unrealizedGainPct)
            put("totalDividends", totalDividends)
            put("allocationByType", buildJsonObject {
                for ((type, value) in allocationByType) put(type, value)
            })
            put("holdingCount", investments.size)
        }.toString()
    }

    /**
     * Build a portfolio snapshot from current holdings.
     * Uses [generateUuid] for the snapshot id and [nowMs] for the ISO timestamp.
     *
     * @param investmentsJson JSON array of Investment objects.
     * @param nowMs           Current epoch milliseconds.
     * @param note            Optional human-readable note.
     * @return JSON object representing the PortfolioSnapshot.
     */
    fun buildPortfolioSnapshot(
        investmentsJson: String,
        nowMs: Long,
        note: String? = null,
    ): String {
        val summary = json.parseToJsonElement(computePortfolioSummary(investmentsJson)).jsonObject

        return buildJsonObject {
            put("id", generateUuid())
            put("date", epochMsToIso(nowMs))
            put("totalValue", summary["totalValue"] ?: JsonPrimitive(0.0))
            put("totalCost", summary["totalCost"] ?: JsonPrimitive(0.0))
            put("unrealizedGain", summary["unrealizedGain"] ?: JsonPrimitive(0.0))
            put("dividendsReceived", summary["totalDividends"] ?: JsonPrimitive(0.0))
            put("allocationByType", summary["allocationByType"] ?: buildJsonObject {})
            if (note != null) put("note", note) else put("note", JsonNull)
        }.toString()
    }

    /**
     * Returns the top N holdings by current value, sorted descending.
     *
     * @param investmentsJson JSON array of Investment objects.
     * @param n               Number of top holdings to return (default 5).
     * @return JSON array of the top N Investment objects.
     */
    fun getTopHoldings(investmentsJson: String, n: Int = 5): String {
        val rawArray = json.parseToJsonElement(investmentsJson).jsonArray
        val sorted = rawArray.sortedByDescending { elem ->
            elem.jsonObject["currentValue"]?.jsonPrimitive?.doubleOrNull ?: 0.0
        }
        return JsonArray(sorted.take(n)).toString()
    }

    /**
     * Recalculates derived fields on an Investment when price changes.
     * Recomputes currentValue, totalCost, unrealizedGain, and lastUpdatedAt.
     *
     * @param investmentJson JSON object of a single Investment.
     * @param nowMs          Current epoch milliseconds (for lastUpdatedAt).
     * @return Updated JSON object for the Investment.
     */
    fun recomputeInvestment(investmentJson: String, nowMs: Long): String {
        val inv = parseInvestments("[$investmentJson]").first()
        val currentValue = inv.quantity * inv.currentPrice
        val totalCost = inv.quantity * inv.costBasis
        val unrealizedGain = currentValue - totalCost

        // Merge updated fields back into the original JSON to preserve all fields
        val original = json.parseToJsonElement(investmentJson).jsonObject
        return buildJsonObject {
            for ((key, value) in original) put(key, value)
            put("currentValue", currentValue)
            put("totalCost", totalCost)
            put("unrealizedGain", unrealizedGain)
            put("lastUpdatedAt", epochMsToIso(nowMs))
        }.toString()
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    private fun parseInvestments(investmentsJson: String): List<Investment> =
        json.decodeFromString<List<Investment>>(investmentsJson)

    /** Convert epoch ms to a minimal ISO8601 UTC string. */
    private fun epochMsToIso(epochMs: Long): String {
        var remaining = epochMs / 1000L
        val second = (remaining % 60).toInt(); remaining /= 60
        val minute = (remaining % 60).toInt(); remaining /= 60
        val hour = (remaining % 24).toInt(); remaining /= 24

        var year = 1970
        var days = remaining.toInt()
        while (true) {
            val diy = if (isLeapYear(year)) 366 else 365
            if (days < diy) break
            days -= diy
            year++
        }
        val monthDays = if (isLeapYear(year))
            intArrayOf(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
        else
            intArrayOf(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
        var month = 0
        while (month < 12 && days >= monthDays[month]) {
            days -= monthDays[month]
            month++
        }
        val day = days + 1
        fun p2(v: Int) = v.toString().padStart(2, '0')
        return "$year-${p2(month + 1)}-${p2(day)}T${p2(hour)}:${p2(minute)}:${p2(second)}Z"
    }

    private fun isLeapYear(year: Int): Boolean =
        (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)
}
