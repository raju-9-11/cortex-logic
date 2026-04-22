package com.agnes.ara.core.domain.service.ledger.aggregation

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*

/**
 * Transaction aggregation logic — ported from transaction-aggregation.ts.
 *
 * All public functions accept/return JSON strings at the boundary.
 * [nowMs] replaces all Date.now() / new Date() calls.
 *
 * Complexity:
 *   computeMonthlyTotals    — O(n) where n = transactions
 *   computeCategorySpend    — O(n log n) (sort by amount)
 *   computeIncomeBreakdown  — O(n log n)
 *   computeCategoryTrends   — O(n + k log k) where k = distinct categories
 *   getSpendingTrend        — O(n)
 *   matchCategoryToTransaction — O(k * w) where k = budget categories, w = keyword map size
 */
object TransactionAggregation {

    private val json = Json { ignoreUnknownKeys = true }

    // ── Internal model types ──────────────────────────────────────────────────

    @Serializable
    private data class Transaction(
        val id: String,
        val date: String,
        val description: String,
        val amount: Double,
        val type: String,          // "income" | "expense"
        val category: String,
        val isRecurring: Boolean = false,
        val goalId: String? = null,
        val budgetCategoryId: String? = null,
        val taxCategory: String? = null,
        val notes: String? = null,
    )

    @Serializable
    private data class BudgetCategory(
        val id: String,
        val name: String,
        val allocated: Double,
        val spent: Double,
        val color: String,
    )

    // ── Keyword map for category inference ───────────────────────────────────

    private val KEYWORD_MAP: Map<String, List<String>> = mapOf(
        "Food & Dining" to listOf(
            "grocery", "groceries", "supermarket", "restaurant", "cafe", "coffee",
            "doordash", "ubereats", "grubhub", "chipotle", "mcdonald", "subway",
            "pizza", "starbucks", "whole foods", "trader joe",
        ),
        "Transportation" to listOf(
            "uber", "lyft", "gas", "fuel", "parking", "toll", "transit", "metro",
            "bus", "train", "airline", "flight", "car wash",
        ),
        "Entertainment" to listOf(
            "netflix", "spotify", "hulu", "disney", "amazon prime", "movie",
            "cinema", "concert", "theater", "gaming", "steam",
        ),
        "Shopping" to listOf(
            "amazon", "walmart", "target", "costco", "ebay", "etsy", "clothing",
            "apparel", "shoes", "zara", "h&m",
        ),
        "Health" to listOf(
            "pharmacy", "cvs", "walgreens", "doctor", "hospital", "clinic",
            "dental", "gym", "fitness", "yoga",
        ),
        "Utilities" to listOf(
            "electric", "gas bill", "water", "internet", "phone", "at&t",
            "verizon", "comcast", "wifi",
        ),
        "Housing" to listOf(
            "rent", "mortgage", "hoa", "property", "maintenance", "repairs",
            "airbnb", "hotel",
        ),
        "Education" to listOf(
            "tuition", "student loan", "course", "udemy", "coursera", "books",
            "school",
        ),
        "Insurance" to listOf(
            "insurance", "geico", "state farm", "allstate", "progressive",
        ),
        "Subscriptions" to listOf(
            "subscription", "membership", "annual fee", "monthly fee",
        ),
    )

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * Compute monthly income/expense/net totals for the last [months] months.
     * Months are ordered oldest-first. [nowMs] is used to determine the current month.
     *
     * @param transactionsJson JSON array of Transaction objects.
     * @param months           Number of months to include (default 6).
     * @param nowMs            Current epoch milliseconds.
     * @return JSON array of MonthlyTotals objects: { month, income, expenses, net, transactionCount }.
     */
    fun computeMonthlyTotals(
        transactionsJson: String,
        months: Int = 6,
        nowMs: Long,
    ): String {
        val transactions = parseTransactions(transactionsJson)

        // Build list of "YYYY-MM" strings from oldest to newest
        val targetMonths = (months - 1 downTo 0).map { i ->
            LedgerAggregationUtils.monthsAgo(i, nowMs)
        }

        // Accumulator: month -> { income, expenses, transactionCount }
        data class Bucket(var income: Double = 0.0, var expenses: Double = 0.0, var count: Int = 0)
        val accumulator = targetMonths.associateWith { Bucket() }.toMutableMap()

        for (tx in transactions) {
            val ym = LedgerAggregationUtils.toYearMonth(tx.date)
            val bucket = accumulator[ym] ?: continue
            bucket.count += 1
            when (tx.type) {
                "income" -> bucket.income = LedgerAggregationUtils.round2(bucket.income + tx.amount)
                "expense" -> bucket.expenses = LedgerAggregationUtils.round2(bucket.expenses + tx.amount)
            }
        }

        val result = targetMonths.map { m ->
            val b = accumulator[m]!!
            buildJsonObject {
                put("month", m)
                put("income", b.income)
                put("expenses", b.expenses)
                put("net", LedgerAggregationUtils.round2(b.income - b.expenses))
                put("transactionCount", b.count)
            }
        }

        return JsonArray(result).toString()
    }

    /**
     * Compute per-category spending totals for a given period.
     * Defaults to the current month when [periodStart]/[periodEnd] are not supplied.
     * Results are sorted descending by amount.
     *
     * @param transactionsJson JSON array of Transaction objects.
     * @param nowMs            Current epoch milliseconds.
     * @param periodStart      Optional start date (inclusive, YYYY-MM-DD).
     * @param periodEnd        Optional end date (inclusive, YYYY-MM-DD).
     * @return JSON array of CategorySpend objects: { category, amount, transactionCount, percentOfTotal }.
     */
    fun computeCategorySpend(
        transactionsJson: String,
        nowMs: Long,
        periodStart: String? = null,
        periodEnd: String? = null,
    ): String {
        val (start, end) = resolvePeriodBounds(nowMs, periodStart, periodEnd)
        val transactions = parseTransactions(transactionsJson)
        val expenses = transactions.filter { it.date >= start && it.date <= end && it.type == "expense" }

        data class Entry(var amount: Double = 0.0, var count: Int = 0)
        val byCategory = mutableMapOf<String, Entry>()
        var totalExpenses = 0.0

        for (tx in expenses) {
            val entry = byCategory.getOrPut(tx.category) { Entry() }
            entry.amount = LedgerAggregationUtils.round2(entry.amount + tx.amount)
            entry.count += 1
            totalExpenses = LedgerAggregationUtils.round2(totalExpenses + tx.amount)
        }

        val result = byCategory.entries
            .sortedByDescending { it.value.amount }
            .map { (category, entry) ->
                buildJsonObject {
                    put("category", category)
                    put("amount", entry.amount)
                    put("transactionCount", entry.count)
                    put(
                        "percentOfTotal",
                        if (totalExpenses > 0.0) LedgerAggregationUtils.round2((entry.amount / totalExpenses) * 100.0)
                        else 0.0
                    )
                }
            }

        return JsonArray(result).toString()
    }

    /**
     * Compute income breakdown by category for a given period, with 3-month average.
     *
     * @param transactionsJson JSON array of Transaction objects.
     * @param nowMs            Current epoch milliseconds.
     * @param periodStart      Optional start date (inclusive, YYYY-MM-DD).
     * @param periodEnd        Optional end date (inclusive, YYYY-MM-DD).
     * @return JSON object: { total, byCategory: [{category, amount, count}], averageMonthly }.
     */
    fun computeIncomeBreakdown(
        transactionsJson: String,
        nowMs: Long,
        periodStart: String? = null,
        periodEnd: String? = null,
    ): String {
        val (start, end) = resolvePeriodBounds(nowMs, periodStart, periodEnd)
        val transactions = parseTransactions(transactionsJson)
        val periodIncome = transactions.filter {
            it.date >= start && it.date <= end && it.type == "income"
        }

        data class Entry(var amount: Double = 0.0, var count: Int = 0)
        val byCategory = mutableMapOf<String, Entry>()
        var total = 0.0

        for (tx in periodIncome) {
            val entry = byCategory.getOrPut(tx.category) { Entry() }
            entry.amount = LedgerAggregationUtils.round2(entry.amount + tx.amount)
            entry.count += 1
            total = LedgerAggregationUtils.round2(total + tx.amount)
        }

        // 3-month rolling average
        val last3Start = LedgerAggregationUtils.getMonthBounds(LedgerAggregationUtils.monthsAgo(2, nowMs)).first
        val last3End = LedgerAggregationUtils.getMonthBounds(LedgerAggregationUtils.monthsAgo(0, nowMs)).second
        val last3Income = transactions
            .filter { it.date >= last3Start && it.date <= last3End && it.type == "income" }
            .fold(0.0) { sum, tx -> LedgerAggregationUtils.round2(sum + tx.amount) }
        val averageMonthly = LedgerAggregationUtils.round2(last3Income / 3.0)

        val sortedByCategory = byCategory.entries
            .sortedByDescending { it.value.amount }
            .map { (category, entry) ->
                buildJsonObject {
                    put("category", category)
                    put("amount", entry.amount)
                    put("count", entry.count)
                }
            }

        return buildJsonObject {
            put("total", total)
            put("byCategory", JsonArray(sortedByCategory))
            put("averageMonthly", averageMonthly)
        }.toString()
    }

    /**
     * Compute category spending trends across the last 6 months.
     * Returns data rows (one per month) and the list of top category names.
     * [nowMs] is used to determine the current month.
     *
     * Note: month labels use "YYYY-MM" format (formatMonthLabel is browser-specific and is omitted).
     *
     * @param transactionsJson JSON array of Transaction objects.
     * @param nowMs            Current epoch milliseconds.
     * @param topN             Number of top categories to include (default 5).
     * @return JSON object: { data: [{month, [category]: amount, ...}], categories: [string] }.
     */
    fun computeCategoryTrends(
        transactionsJson: String,
        nowMs: Long,
        topN: Int = 5,
    ): String {
        val transactions = parseTransactions(transactionsJson)
        val targetMonths = (5 downTo 0).map { i -> LedgerAggregationUtils.monthsAgo(i, nowMs) }

        // month -> category -> amount
        val monthCategoryMap = targetMonths.associateWith { mutableMapOf<String, Double>() }.toMutableMap()
        val categoryTotalMap = mutableMapOf<String, Double>()

        for (tx in transactions) {
            if (tx.type != "expense") continue
            val ym = LedgerAggregationUtils.toYearMonth(tx.date)
            val monthMap = monthCategoryMap[ym] ?: continue
            monthMap[tx.category] = LedgerAggregationUtils.round2((monthMap[tx.category] ?: 0.0) + tx.amount)
            categoryTotalMap[tx.category] = LedgerAggregationUtils.round2((categoryTotalMap[tx.category] ?: 0.0) + tx.amount)
        }

        val sortedCategories = categoryTotalMap.entries.sortedByDescending { it.value }
        val topCategories = sortedCategories.take(topN).map { it.key }
        val hasOther = sortedCategories.size > topN
        val topCategorySet = topCategories.toSet()
        val categories = if (hasOther) topCategories + "Other" else topCategories

        val data = targetMonths.map { ym ->
            val monthMap = monthCategoryMap[ym] ?: emptyMap<String, Double>()

            // Accumulate into a mutable map first; JsonObjectBuilder has no read-back getter
            val row = mutableMapOf<String, Double>()
            for (cat in topCategories) row[cat] = 0.0
            if (hasOther) row["Other"] = 0.0

            for ((cat, amount) in monthMap) {
                when {
                    cat in topCategorySet -> row[cat] = LedgerAggregationUtils.round2((row[cat] ?: 0.0) + amount)
                    hasOther -> row["Other"] = LedgerAggregationUtils.round2((row["Other"] ?: 0.0) + amount)
                }
            }

            buildJsonObject {
                put("month", ym)
                for ((k, v) in row) put(k, v)
            }
        }

        return buildJsonObject {
            put("data", JsonArray(data))
            put("categories", JsonArray(categories.map { JsonPrimitive(it) }))
        }.toString()
    }

    /**
     * Compute month-over-month spending trend comparing current month vs. prior month.
     *
     * @param transactionsJson JSON array of Transaction objects.
     * @param nowMs            Current epoch milliseconds.
     * @return JSON object: { direction, percentChange, currentMonth, previousMonth }.
     */
    fun getSpendingTrend(transactionsJson: String, nowMs: Long): String {
        val transactions = parseTransactions(transactionsJson)
        val (cmStart, cmEnd) = LedgerAggregationUtils.getMonthBounds(LedgerAggregationUtils.monthsAgo(0, nowMs))
        val (pmStart, pmEnd) = LedgerAggregationUtils.getMonthBounds(LedgerAggregationUtils.monthsAgo(1, nowMs))

        fun sumExpenses(start: String, end: String): Double =
            transactions
                .filter { it.date >= start && it.date <= end && it.type == "expense" }
                .fold(0.0) { sum, tx -> LedgerAggregationUtils.round2(sum + tx.amount) }

        val currentMonthAmt = sumExpenses(cmStart, cmEnd)
        val previousMonthAmt = sumExpenses(pmStart, pmEnd)

        var percentChange = 0.0
        when {
            previousMonthAmt > 0.0 ->
                percentChange = LedgerAggregationUtils.round2(
                    ((currentMonthAmt - previousMonthAmt) / previousMonthAmt) * 100.0
                )
            currentMonthAmt > 0.0 -> percentChange = 100.0
        }

        val absChange = kotlin.math.abs(percentChange)
        val direction = when {
            absChange < 5.0 -> "stable"
            percentChange > 0.0 -> "up"
            else -> "down"
        }

        return buildJsonObject {
            put("direction", direction)
            put("percentChange", absChange)
            put("currentMonth", currentMonthAmt)
            put("previousMonth", previousMonthAmt)
        }.toString()
    }

    /**
     * Match a transaction description and raw category string to a budget category id.
     * Returns the matched category id, or null if no match is found.
     *
     * Matching priority:
     *   1. Exact category name match (case-insensitive) against budget categories.
     *   2. Keyword match on description via KEYWORD_MAP.
     *
     * @param description       Transaction description.
     * @param category          Raw category string from the transaction.
     * @param categoriesJson    JSON array of BudgetCategory objects.
     * @return Matched budget category id, or null.
     */
    fun matchCategoryToTransaction(
        description: String,
        category: String,
        categoriesJson: String,
    ): String? {
        val categories = parseBudgetCategories(categoriesJson)
        if (categories.isEmpty()) return null

        val trimmedCategory = category.trim()
        if (trimmedCategory.isNotEmpty()) {
            val lowerCategory = trimmedCategory.lowercase()
            val exact = categories.find { it.name.lowercase() == lowerCategory }
            if (exact != null) return exact.id
        }

        val lowerDesc = description.lowercase()
        for ((mapKey, keywords) in KEYWORD_MAP) {
            val hasKeyword = keywords.any { kw -> lowerDesc.contains(kw) }
            if (!hasKeyword) continue
            val budgetCategory = categories.find { it.name.lowercase() == mapKey.lowercase() }
            if (budgetCategory != null) return budgetCategory.id
        }

        return null
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    private fun resolvePeriodBounds(nowMs: Long, start: String?, end: String?): Pair<String, String> {
        if (start != null && end != null) return start to end
        return LedgerAggregationUtils.getMonthBounds(LedgerAggregationUtils.monthsAgo(0, nowMs))
    }

    private fun parseTransactions(transactionsJson: String): List<Transaction> =
        json.decodeFromString<List<Transaction>>(transactionsJson)

    private fun parseBudgetCategories(categoriesJson: String): List<BudgetCategory> =
        json.decodeFromString<List<BudgetCategory>>(categoriesJson)
}
