package com.agnes.nexus.core.domain.service.ledger

import com.agnes.nexus.core.domain.models.LedgerProfile
import kotlinx.datetime.Clock
import kotlinx.datetime.DateTimeUnit
import kotlinx.datetime.TimeZone
import kotlinx.datetime.plus
import kotlinx.datetime.todayIn

/**
 * Projects daily cash balance over a rolling horizon given recurring income and expenses.
 *
 * Monthly income and expenses are distributed evenly across days (÷ 30), producing a
 * day-by-day [ForecastDay] list with running balance, plus summary extremes.
 */
object CashFlowForecastService {

    data class ForecastDay(
        val date: String,
        val income: Double,
        val expense: Double,
        val netFlow: Double,
        val runningBalance: Double
    )

    data class CashFlowForecast(
        val horizon: Int,
        val days: List<ForecastDay>,
        val endBalance: Double,
        val lowestBalance: Double,
        val lowestDate: String,
        val highestBalance: Double,
        val generatedAt: Long
    )

    /**
     * @param profile         Source of income, fixed, and variable expense data.
     * @param horizon         Number of days to project (default 30).
     * @param startingBalance Opening balance to project from (default 0.0).
     */
    fun generate(
        profile: LedgerProfile,
        horizon: Int = 30,
        startingBalance: Double = 0.0
    ): CashFlowForecast {
        val tz = TimeZone.currentSystemDefault()
        val today = Clock.System.todayIn(tz)

        val fixedExpenses = profile.fixedExpenses.sumOf { it.amount }
        val variableExpenses = profile.variableExpenses.sumOf { it.amount }
        val dailyExpense = (fixedExpenses + variableExpenses) / 30.0
        val dailyIncome = profile.monthlyIncome / 30.0

        val days = mutableListOf<ForecastDay>()
        var runningBalance = startingBalance

        for (i in 0 until horizon) {
            val date = today.plus(i, DateTimeUnit.DAY)
            val netFlow = dailyIncome - dailyExpense
            runningBalance += netFlow
            days.add(ForecastDay(date.toString(), dailyIncome, dailyExpense, netFlow, runningBalance))
        }

        val lowestDay = days.minByOrNull { it.runningBalance } ?: days.first()
        val highestDay = days.maxByOrNull { it.runningBalance } ?: days.last()

        return CashFlowForecast(
            horizon = horizon,
            days = days,
            endBalance = days.lastOrNull()?.runningBalance ?: 0.0,
            lowestBalance = lowestDay.runningBalance,
            lowestDate = lowestDay.date,
            highestBalance = highestDay.runningBalance,
            generatedAt = Clock.System.now().toEpochMilliseconds()
        )
    }
}
