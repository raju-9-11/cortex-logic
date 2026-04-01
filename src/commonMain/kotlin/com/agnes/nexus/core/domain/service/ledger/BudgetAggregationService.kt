package com.agnes.nexus.core.domain.service.ledger

import com.agnes.nexus.core.domain.models.LedgerBudgetCategory
import com.agnes.nexus.core.domain.models.LedgerTransaction
import kotlinx.datetime.Clock
import kotlinx.datetime.LocalDate
import kotlinx.datetime.TimeZone
import kotlinx.datetime.todayIn

/**
 * Aggregates budget category allocations vs. actual spend for a given period.
 *
 * Transactions are matched by category name (case-insensitive) and date range.
 * Returns one [BudgetPerformance] entry per category.
 */
object BudgetAggregationService {

    enum class BudgetStatus { UNDER, ON_TRACK, WARNING, OVER }

    data class BudgetPerformance(
        val categoryId: String,
        val categoryName: String,
        val allocated: Double,
        val actual: Double,
        val variance: Double,
        val variancePct: Double,
        val utilizationPct: Double,
        val status: BudgetStatus
    )

    /**
     * @param categories  Budget category definitions with allocation amounts.
     * @param transactions All transactions to filter against.
     * @param periodStart  Start of the budget period (inclusive). Defaults to first of current month.
     * @param periodEnd    End of the budget period (inclusive). Defaults to today.
     */
    fun compute(
        categories: List<LedgerBudgetCategory>,
        transactions: List<LedgerTransaction>,
        periodStart: LocalDate? = null,
        periodEnd: LocalDate? = null
    ): List<BudgetPerformance> {
        val tz = TimeZone.currentSystemDefault()
        val today = Clock.System.todayIn(tz)
        val start = periodStart ?: LocalDate(today.year, today.month, 1)
        val end = periodEnd ?: today

        return categories.map { cat ->
            val allocated = cat.allocated
            val actual = transactions
                .filter { tx ->
                    tx.type == "expense" &&
                    tx.category.equals(cat.name, ignoreCase = true) &&
                    runCatching {
                        val date = LocalDate.parse(tx.date.take(10))
                        date >= start && date <= end
                    }.getOrElse { false }
                }
                .sumOf { it.amount }

            val variance = actual - allocated
            val variancePct = when {
                allocated > 0 -> variance / allocated * 100
                actual > 0    -> 100.0
                else          -> 0.0
            }
            val utilizationPct = if (allocated > 0) actual / allocated * 100 else 0.0

            val status = when {
                utilizationPct < 80   -> BudgetStatus.UNDER
                utilizationPct <= 100 -> BudgetStatus.ON_TRACK
                utilizationPct <= 120 -> BudgetStatus.WARNING
                else                  -> BudgetStatus.OVER
            }

            BudgetPerformance(cat.id, cat.name, allocated, actual, variance, variancePct, utilizationPct, status)
        }
    }
}
