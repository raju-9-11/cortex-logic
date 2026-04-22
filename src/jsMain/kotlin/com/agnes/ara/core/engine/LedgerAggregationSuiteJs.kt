package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.service.ledger.aggregation.*
import kotlin.js.JsExport

// ═══════════════════════════════════════════════════════════════════════════════
// LedgerAggregationSuiteJs — JS/TS facade for all ledger aggregation services.
// Each @JsExport class is a thin adapter delegating to the commonMain object.
// All functions accept/return JSON strings; nowMs: Double bridges JS Number.
// ═══════════════════════════════════════════════════════════════════════════════

@JsExport
class LedgerAggregationUtilsJs {
    fun round2(value: Double): Double = LedgerAggregationUtils.round2(value)
    fun epochMsToYearMonth(nowMs: Double): String = LedgerAggregationUtils.epochMsToYearMonth(nowMs.toLong())
    fun monthsAgo(n: Int, nowMs: Double): String = LedgerAggregationUtils.monthsAgo(n, nowMs.toLong())
    fun getMonthBounds(month: String): String {
        val (start, end) = LedgerAggregationUtils.getMonthBounds(month)
        return """{"start":"$start","end":"$end"}"""
    }
    fun filterByPeriod(transactionsJson: String, start: String, end: String): String =
        LedgerAggregationUtils.filterByPeriod(transactionsJson, start, end)
    fun toYearMonth(isoDate: String): String = LedgerAggregationUtils.toYearMonth(isoDate)
    fun calculateDailyBurnRate(transactionsJson: String, nowMs: Double): Double =
        LedgerAggregationUtils.calculateDailyBurnRate(transactionsJson, nowMs.toLong())
    fun calculateTransactionFriction(amount: Double, resonanceScore: Double, dailyBurnRate: Double): Double =
        LedgerAggregationUtils.calculateTransactionFriction(amount, resonanceScore, dailyBurnRate)
    fun calculateRunway(liquidity: Double, avgDailyBurn: Double, confidenceInterval: Double): Double =
        LedgerAggregationUtils.calculateRunway(liquidity, avgDailyBurn, confidenceInterval)
}

@JsExport
class AccountAggregationJs {
    fun computeAccountSummary(accountsJson: String): String =
        AccountAggregation.computeAccountSummary(accountsJson)
    fun computeNetLiquidAssets(accountsJson: String): Double =
        AccountAggregation.computeNetLiquidAssets(accountsJson)
    fun computeTotalBalance(accountsJson: String): Double =
        AccountAggregation.computeTotalBalance(accountsJson)
    fun getDefaultAccount(accountsJson: String): String =
        AccountAggregation.getDefaultAccount(accountsJson)
    fun computeTotalDebtFromItems(debtItemsJson: String): Double =
        AccountAggregation.computeTotalDebtFromItems(debtItemsJson)
}

@JsExport
class NetWorthAggregationJs {
    fun computeCurrentNetWorth(accountsJson: String, debtItemsJson: String): String =
        NetWorthAggregation.computeCurrentNetWorth(accountsJson, debtItemsJson)
    fun computeNetWorthTrend(historyJson: String): String =
        NetWorthAggregation.computeNetWorthTrend(historyJson)
    fun buildNetWorthSnapshot(accountsJson: String, debtItemsJson: String, nowMs: Double, note: String?): String =
        NetWorthAggregation.buildNetWorthSnapshot(accountsJson, debtItemsJson, nowMs.toLong(), note)
}

@JsExport
class PortfolioAggregationJs {
    fun computePortfolioSummary(investmentsJson: String): String =
        PortfolioAggregation.computePortfolioSummary(investmentsJson)
    fun buildPortfolioSnapshot(investmentsJson: String, nowMs: Double, note: String?): String =
        PortfolioAggregation.buildPortfolioSnapshot(investmentsJson, nowMs.toLong(), note)
    fun getTopHoldings(investmentsJson: String, n: Int): String =
        PortfolioAggregation.getTopHoldings(investmentsJson, n)
    fun recomputeInvestment(investmentJson: String, nowMs: Double): String =
        PortfolioAggregation.recomputeInvestment(investmentJson, nowMs.toLong())
}

@JsExport
class TransactionAggregationJs {
    fun computeMonthlyTotals(transactionsJson: String, nowMs: Double, months: Int): String =
        TransactionAggregation.computeMonthlyTotals(transactionsJson, months, nowMs.toLong())
    fun computeCategorySpend(transactionsJson: String, nowMs: Double, periodStart: String?, periodEnd: String?): String =
        TransactionAggregation.computeCategorySpend(transactionsJson, nowMs.toLong(), periodStart, periodEnd)
    fun getSpendingTrend(transactionsJson: String, nowMs: Double): String =
        TransactionAggregation.getSpendingTrend(transactionsJson, nowMs.toLong())
    fun computeCategoryTrends(transactionsJson: String, nowMs: Double, months: Int, topN: Int): String =
        TransactionAggregation.computeCategoryTrends(transactionsJson, nowMs.toLong(), topN)
    fun computeIncomeBreakdown(transactionsJson: String, nowMs: Double, periodStart: String?, periodEnd: String?): String =
        TransactionAggregation.computeIncomeBreakdown(transactionsJson, nowMs.toLong(), periodStart, periodEnd)
    fun matchCategoryToTransaction(description: String, category: String, categoriesJson: String): String? =
        TransactionAggregation.matchCategoryToTransaction(description, category, categoriesJson)
}

@JsExport
class BudgetAggregationJs {
    fun computeBudgetActuals(
        transactionsJson: String,
        budgetCategoriesJson: String,
        nowMs: Double,
        periodStart: String?,
        periodEnd: String?,
    ): String = BudgetAggregation.computeBudgetActuals(
        transactionsJson, budgetCategoriesJson, nowMs.toLong(), periodStart, periodEnd,
    )
}

@JsExport
class TaxAggregationJs {
    fun computeTaxBreakdown(profileJson: String, taxYear: Int): String =
        TaxAggregation.computeTaxBreakdown(profileJson, taxYear)
    fun buildTaxYearSummary(profileJson: String, taxYear: Int, nowMs: Double): String =
        TaxAggregation.buildTaxYearSummary(profileJson, taxYear, nowMs.toLong())
}

@JsExport
class SubscriptionAggregationJs {
    fun toMonthlyEquivalent(amount: Double, cycle: String): Double =
        SubscriptionAggregation.toMonthlyEquivalent(amount, cycle)
    fun toAnnualEquivalent(amount: Double, cycle: String): Double =
        SubscriptionAggregation.toAnnualEquivalent(amount, cycle)
    fun computeSubscriptionSummary(subscriptionsJson: String): String =
        SubscriptionAggregation.computeSubscriptionSummary(subscriptionsJson)
    fun getExpiringTrials(subscriptionsJson: String, nowMs: Double, withinDays: Int): String =
        SubscriptionAggregation.getExpiringTrials(subscriptionsJson, nowMs.toLong(), withinDays)
    fun getUpcomingRenewals(subscriptionsJson: String, nowMs: Double, withinDays: Int): String =
        SubscriptionAggregation.getUpcomingRenewals(subscriptionsJson, nowMs.toLong(), withinDays)
}

@JsExport
class CreditAggregationJs {
    fun computeCreditTrend(historyJson: String): String =
        CreditAggregation.computeCreditTrend(historyJson)
    fun getCreditRating(score: Int): String =
        CreditAggregation.getCreditRating(score)
    fun getImprovementTips(score: Int, profileJson: String?): String =
        CreditAggregation.getImprovementTips(score)
}

@JsExport
class ForecastAggregationJs {
    fun computeCashFlowForecast(
        recurringRulesJson: String,
        startingBalance: Double,
        horizon: Int,
        nowMs: Double,
    ): String = ForecastAggregation.computeCashFlowForecast(
        recurringRulesJson, startingBalance, horizon, nowMs.toLong(),
    )
    fun summarizeForecastByMonth(forecastJson: String): String =
        ForecastAggregation.summarizeForecastByMonth(forecastJson)
}

@JsExport
class InsuranceAggregationJs {
    fun computeInsuranceSummary(policiesJson: String): String =
        InsuranceAggregation.computeInsuranceSummary(policiesJson)
    fun getUpcomingRenewals(policiesJson: String, nowMs: Double, withinDays: Int): String =
        InsuranceAggregation.getUpcomingRenewals(policiesJson, nowMs.toLong(), withinDays)
    fun detectCoverageGaps(policiesJson: String): String =
        InsuranceAggregation.detectCoverageGaps(policiesJson)
}

@JsExport
class CalendarAggregationJs {
    fun buildCalendarEvents(profileJson: String, year: Int, month: Int, nowMs: Double): String =
        CalendarAggregation.buildCalendarEvents(profileJson, year, month, nowMs.toLong())
}

@JsExport
class DashboardAggregationJs {
    fun computeDashboardMetrics(transactionsJson: String, totalDebt: Double, accountsJson: String, nowMs: Double): String =
        DashboardAggregation.computeDashboardMetrics(transactionsJson, totalDebt, accountsJson, nowMs.toLong())
    fun computeRunwayProjection(profileJson: String?, nowMs: Double): String =
        DashboardAggregation.computeRunwayProjection(profileJson, nowMs.toLong())
    fun computeDebtPayoffSchedule(debtItemsJson: String, strategy: String, extraMonthlyPayment: Double): String =
        DashboardAggregation.computeDebtPayoffSchedule(debtItemsJson, strategy, extraMonthlyPayment)
    fun evaluateAlerts(
        profileJson: String?,
        budgetWithActualsJson: String,
        currentMonthIncome: Double,
        currentMonthExpenses: Double,
        currentMonthNet: Double,
        nowMs: Double,
    ): String = DashboardAggregation.evaluateAlerts(
        profileJson, budgetWithActualsJson, currentMonthIncome, currentMonthExpenses, currentMonthNet, nowMs.toLong(),
    )
    fun computeSavingsProjection(goalJson: String, nowMs: Double): String =
        DashboardAggregation.computeSavingsProjection(goalJson, nowMs.toLong())
}
