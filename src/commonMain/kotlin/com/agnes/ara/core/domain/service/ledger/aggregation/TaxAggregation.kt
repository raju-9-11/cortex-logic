package com.agnes.ara.core.domain.service.ledger.aggregation

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*

/**
 * Tax aggregation logic — ported from tax-aggregation.ts.
 *
 * All public functions accept/return JSON strings at the boundary.
 * [nowMs] replaces new Date() calls.
 *
 * Complexity: O(n) for both functions where n = transactions in the tax year.
 */
object TaxAggregation {

    private val json = Json { ignoreUnknownKeys = true }

    // Categories considered deductible
    private val DEDUCTIBLE_CATEGORIES = setOf("deductible", "partial")

    // ── Internal model types ──────────────────────────────────────────────────

    @Serializable
    private data class Transaction(
        val id: String,
        val date: String,
        val amount: Double,
        val type: String,
        val category: String,
        val taxCategory: String? = null,
    )

    @Serializable
    private data class TaxDeduction(
        val id: String,
        val label: String,
        val amount: Double,
        val taxYear: Int,
        val category: String,
    )

    /**
     * Minimal ledger profile view used by tax functions.
     * Only the fields needed for tax aggregation are parsed.
     */
    @Serializable
    private data class TaxProfile(
        val transactions: List<Transaction> = emptyList(),
        val taxDeductions: List<TaxDeduction> = emptyList(),
    )

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * Compute a breakdown of expenses by tax category for a given tax year.
     *
     * @param profileJson JSON object conforming to LedgerIntakeProfile (transactions, taxDeductions).
     * @param taxYear     The calendar year to analyse.
     * @return JSON array of TaxCategoryBreakdown objects:
     *         { category, total, transactionCount }.
     */
    fun computeTaxBreakdown(profileJson: String, taxYear: Int): String {
        val profile = json.decodeFromString<TaxProfile>(profileJson)
        val yearTransactions = profile.transactions.filter { tx ->
            tx.type == "expense" && extractYear(tx.date) == taxYear
        }

        data class Entry(var total: Double = 0.0, var count: Int = 0)
        val map = mutableMapOf<String, Entry>()

        for (tx in yearTransactions) {
            val cat = tx.taxCategory ?: "unknown"
            val entry = map.getOrPut(cat) { Entry() }
            entry.total += tx.amount
            entry.count += 1
        }

        val result = map.entries.map { (cat, data) ->
            buildJsonObject {
                put("category", cat)
                put("total", data.total)
                put("transactionCount", data.count)
            }
        }

        return JsonArray(result).toString()
    }

    /**
     * Build a complete tax year summary including income, expenses, deductions,
     * and estimated taxable income.
     *
     * @param profileJson JSON object conforming to LedgerIntakeProfile.
     * @param taxYear     The calendar year to summarise.
     * @param nowMs       Current epoch milliseconds (used for generatedAt timestamp).
     * @return JSON object representing TaxYearSummary.
     */
    fun buildTaxYearSummary(profileJson: String, taxYear: Int, nowMs: Long): String {
        val profile = json.decodeFromString<TaxProfile>(profileJson)
        val yearTxs = profile.transactions.filter { extractYear(it.date) == taxYear }

        val totalIncome = yearTxs.filter { it.type == "income" }.fold(0.0) { s, tx -> s + tx.amount }
        val totalExpenses = yearTxs.filter { it.type == "expense" }.fold(0.0) { s, tx -> s + tx.amount }

        val deductibleTxs = yearTxs.filter { tx ->
            tx.type == "expense" && tx.taxCategory != null && tx.taxCategory in DEDUCTIBLE_CATEGORIES
        }
        val deductibleExpenses = deductibleTxs.fold(0.0) { s, tx -> s + tx.amount }

        val yearDeductions = profile.taxDeductions.filter { it.taxYear == taxYear }
        val totalDeductions = yearDeductions.fold(0.0) { s, d -> s + d.amount } + deductibleExpenses

        // Re-use computeTaxBreakdown to build the category breakdown map
        val breakdownArray = json.parseToJsonElement(computeTaxBreakdown(profileJson, taxYear)).jsonArray
        val categoryBreakdown = buildJsonObject {
            for (elem in breakdownArray) {
                val obj = elem.jsonObject
                val cat = obj["category"]?.jsonPrimitive?.contentOrNull ?: continue
                val total = obj["total"]?.jsonPrimitive?.doubleOrNull ?: 0.0
                put(cat, total)
            }
        }

        val estimatedTaxableIncome = maxOf(0.0, totalIncome - totalDeductions)

        return buildJsonObject {
            put("taxYear", taxYear)
            put("generatedAt", epochMsToIso(nowMs))
            put("totalIncome", totalIncome)
            put("totalExpenses", totalExpenses)
            put("deductibleExpenses", deductibleExpenses)
            put("totalDeductions", totalDeductions)
            put("estimatedTaxableIncome", estimatedTaxableIncome)
            put("categoryBreakdown", categoryBreakdown)
            put("deductibleTransactionIds", JsonArray(deductibleTxs.map { JsonPrimitive(it.id) }))
        }.toString()
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    /** Extract the year component from an ISO date string (YYYY-MM-DD...). */
    private fun extractYear(isoDate: String): Int =
        isoDate.take(4).toIntOrNull() ?: 0

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
