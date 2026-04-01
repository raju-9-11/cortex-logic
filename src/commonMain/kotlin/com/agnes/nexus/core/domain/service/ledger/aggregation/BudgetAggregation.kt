package com.agnes.nexus.core.domain.service.ledger.aggregation

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*

/**
 * Budget aggregation logic — ported from budget-aggregation.ts.
 *
 * All public functions accept/return JSON strings at the boundary.
 * [nowMs] replaces Date.now() / new Date() calls.
 *
 * Complexity: O(n + m) where n = transactions, m = budget categories.
 */
object BudgetAggregation {

    private val json = Json { ignoreUnknownKeys = true }

    // ── Internal model types ──────────────────────────────────────────────────

    @Serializable
    private data class Transaction(
        val id: String,
        val date: String,
        val description: String,
        val amount: Double,
        val type: String,
        val category: String,
    )

    @Serializable
    private data class BudgetCategory(
        val id: String,
        val name: String,
        val allocated: Double,
        val spent: Double = 0.0,
        val color: String = "",
    )

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * Compute budget actuals — compares actual spending against allocated amounts
     * for each budget category in the given period.
     *
     * Status thresholds (based on utilization %):
     *   < 80%    → "under"
     *   80–100%  → "on_track"
     *   100–120% → "warning"
     *   > 120%   → "over"
     *
     * @param transactionsJson      JSON array of Transaction objects.
     * @param budgetCategoriesJson  JSON array of BudgetCategory objects.
     * @param nowMs                 Current epoch milliseconds (used to resolve default period).
     * @param periodStart           Optional start date (inclusive, YYYY-MM-DD).
     * @param periodEnd             Optional end date (inclusive, YYYY-MM-DD).
     * @return JSON array of BudgetPerformance objects:
     *         { categoryId, categoryName, allocated, actual, variance, variancePercent, status }.
     */
    fun computeBudgetActuals(
        transactionsJson: String,
        budgetCategoriesJson: String,
        nowMs: Long,
        periodStart: String? = null,
        periodEnd: String? = null,
    ): String {
        val (start, end) = if (periodStart != null && periodEnd != null) {
            periodStart to periodEnd
        } else {
            LedgerAggregationUtils.getMonthBounds(LedgerAggregationUtils.monthsAgo(0, nowMs))
        }

        val transactions = json.decodeFromString<List<Transaction>>(transactionsJson)
        val budgetCategories = json.decodeFromString<List<BudgetCategory>>(budgetCategoriesJson)

        val expenses = transactions.filter { it.date >= start && it.date <= end && it.type == "expense" }

        // Accumulate actuals by lowercase category name
        val actualByCategory = mutableMapOf<String, Double>()
        for (tx in expenses) {
            val key = tx.category.lowercase()
            actualByCategory[key] = LedgerAggregationUtils.round2((actualByCategory[key] ?: 0.0) + tx.amount)
        }

        val result = budgetCategories.map { bc ->
            val actual = actualByCategory[bc.name.lowercase()] ?: 0.0
            val variance = LedgerAggregationUtils.round2(actual - bc.allocated)
            val variancePercent = when {
                bc.allocated > 0.0 -> LedgerAggregationUtils.round2((variance / bc.allocated) * 100.0)
                actual > 0.0 -> 100.0
                else -> 0.0
            }
            val utilizationPct = when {
                bc.allocated > 0.0 -> (actual / bc.allocated) * 100.0
                actual > 0.0 -> 100.0
                else -> 0.0
            }

            val status = when {
                utilizationPct < 80.0 -> "under"
                utilizationPct <= 100.0 -> "on_track"
                utilizationPct <= 120.0 -> "warning"
                else -> "over"
            }

            buildJsonObject {
                put("categoryId", bc.id)
                put("categoryName", bc.name)
                put("allocated", bc.allocated)
                put("actual", actual)
                put("variance", variance)
                put("variancePercent", variancePercent)
                put("status", status)
            }
        }

        return JsonArray(result).toString()
    }
}
