package com.agnes.ara.core.domain.service.ledger.aggregation

import com.agnes.ara.core.platform.generateUuid
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*

/**
 * Net worth aggregation logic — ported from networth-aggregation.ts.
 *
 * All public functions accept/return JSON strings at the boundary.
 *
 * Complexity: O(n log n) for computeNetWorthTrend (sort), O(n) otherwise.
 */
object NetWorthAggregation {

    private val json = Json { ignoreUnknownKeys = true }

    // ── Internal model types ──────────────────────────────────────────────────

    @Serializable
    private data class NetWorthSnapshot(
        val id: String,
        val date: String,
        val assets: Double,
        val liabilities: Double,
        val netWorth: Double,
        val note: String? = null,
    )

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * Compute the live net worth from current account balances and debt items.
     *
     * Assets = sum of positive account balances (checking/savings/investment/cash).
     * Liabilities = credit card debt + debt items.
     *
     * @param accountsJson  JSON array of Account objects.
     * @param debtItemsJson JSON array of DebtItem objects.
     * @return JSON object with fields: assets, liabilities, netWorth.
     */
    fun computeCurrentNetWorth(accountsJson: String, debtItemsJson: String): String {
        val summaryJson = json.parseToJsonElement(
            AccountAggregation.computeAccountSummary(accountsJson)
        ).jsonObject

        val totalAssets = summaryJson["totalAssets"]?.jsonPrimitive?.double ?: 0.0
        val totalLiabilities = summaryJson["totalLiabilities"]?.jsonPrimitive?.double ?: 0.0

        val debtBalance = LedgerAggregationUtils.round2(
            AccountAggregation.computeTotalDebtFromItems(debtItemsJson)
        )
        val liabilities = LedgerAggregationUtils.round2(totalLiabilities + debtBalance)
        val netWorth = LedgerAggregationUtils.round2(totalAssets - liabilities)

        return buildJsonObject {
            put("assets", totalAssets)
            put("liabilities", liabilities)
            put("netWorth", netWorth)
        }.toString()
    }

    /**
     * Compute trend from historical net worth snapshots.
     * Sorts descending by date and compares the two most recent entries.
     *
     * @param historyJson JSON array of NetWorthSnapshot objects.
     * @return JSON object with fields: direction, absoluteChange, percentChange (nullable), lastSnapshot (nullable).
     */
    fun computeNetWorthTrend(historyJson: String): String {
        val history = json.decodeFromString<List<NetWorthSnapshot>>(historyJson)

        if (history.isEmpty()) {
            return buildJsonObject {
                put("direction", "flat")
                put("absoluteChange", 0.0)
                put("percentChange", JsonNull)
                put("lastSnapshot", JsonNull)
            }.toString()
        }

        // Sort descending by date string (ISO8601 lexicographic order is correct)
        val sorted = history.sortedByDescending { it.date }
        val latest = sorted[0]
        val previous = sorted.getOrNull(1)

        if (previous == null) {
            return buildJsonObject {
                put("direction", "flat")
                put("absoluteChange", 0.0)
                put("percentChange", JsonNull)
                put("lastSnapshot", encodeSnapshot(latest))
            }.toString()
        }

        val absoluteChange = LedgerAggregationUtils.round2(latest.netWorth - previous.netWorth)
        val percentChange: Double? = if (previous.netWorth != 0.0) {
            LedgerAggregationUtils.round2((absoluteChange / kotlin.math.abs(previous.netWorth)) * 100.0)
        } else {
            null
        }

        val direction = when {
            absoluteChange > 0.0 -> "up"
            absoluteChange < 0.0 -> "down"
            else -> "flat"
        }

        return buildJsonObject {
            put("direction", direction)
            put("absoluteChange", absoluteChange)
            if (percentChange != null) put("percentChange", percentChange) else put("percentChange", JsonNull)
            put("lastSnapshot", encodeSnapshot(latest))
        }.toString()
    }

    /**
     * Build a new NetWorthSnapshot from current computed values.
     * Uses [generateUuid] for the snapshot id and [nowMs] for the ISO timestamp.
     *
     * @param accountsJson  JSON array of Account objects.
     * @param debtItemsJson JSON array of DebtItem objects.
     * @param nowMs         Current epoch milliseconds (replaces Date.now()).
     * @param note          Optional human-readable note.
     * @return JSON object representing the new NetWorthSnapshot.
     */
    fun buildNetWorthSnapshot(
        accountsJson: String,
        debtItemsJson: String,
        nowMs: Long,
        note: String? = null,
    ): String {
        val result = json.parseToJsonElement(
            computeCurrentNetWorth(accountsJson, debtItemsJson)
        ).jsonObject

        val assets = result["assets"]?.jsonPrimitive?.double ?: 0.0
        val liabilities = result["liabilities"]?.jsonPrimitive?.double ?: 0.0
        val netWorth = result["netWorth"]?.jsonPrimitive?.double ?: 0.0

        return buildJsonObject {
            put("id", generateUuid())
            put("date", epochMsToIso(nowMs))
            put("assets", assets)
            put("liabilities", liabilities)
            put("netWorth", netWorth)
            if (note != null) put("note", note) else put("note", JsonNull)
        }.toString()
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    private fun encodeSnapshot(snap: NetWorthSnapshot): JsonObject = buildJsonObject {
        put("id", snap.id)
        put("date", snap.date)
        put("assets", snap.assets)
        put("liabilities", snap.liabilities)
        put("netWorth", snap.netWorth)
        if (snap.note != null) put("note", snap.note) else put("note", JsonNull)
    }

    /** Convert epoch ms to a minimal ISO8601 string (UTC). */
    private fun epochMsToIso(epochMs: Long): String {
        // Compute date/time components from epoch ms without platform Date APIs
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
