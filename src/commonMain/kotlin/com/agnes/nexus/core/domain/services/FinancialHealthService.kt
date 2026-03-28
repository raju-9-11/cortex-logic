package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.models.LedgerProfile
import kotlin.math.abs
import kotlin.math.roundToInt

/**
 * Service for calculating comprehensive financial health scores.
 * Evaluates savings rate, debt load, emergency fund adequacy, and budget adherence.
 *
 * The financial health score is a weighted composite of four key components:
 * - Savings Rate (25%): How much of income is being saved
 * - Emergency Fund (25%): Months of expenses covered by savings
 * - Debt-to-Income Ratio (30%): Debt payment burden relative to income
 * - Budget Adherence (20%): How well spending aligns with budget allocations
 */
object FinancialHealthService {

    /**
     * Health status classification from best to worst.
     */
    enum class HealthStatus {
        /** Score 80-100: Exceptional financial health */
        EXCELLENT,
        /** Score 60-79: Strong financial position */
        GOOD,
        /** Score 40-59: Adequate but room for improvement */
        FAIR,
        /** Score 20-39: Concerning financial health */
        POOR,
        /** Score 0-19: Urgent attention needed */
        CRITICAL
    }

    /**
     * A single component of the financial health evaluation.
     *
     * @property name Human-readable name of the component
     * @property score Score from 0-100 for this component
     * @property weight Weight of this component in the overall score (0.0-1.0)
     * @property status Health status classification for this component
     * @property message Descriptive message explaining the score
     */
    data class HealthComponent(
        val name: String,
        val score: Int,
        val weight: Double,
        val status: HealthStatus,
        val message: String
    )

    /**
     * A risk indicator highlighting potential financial concerns.
     *
     * @property type Category of risk (e.g., "emergency_fund", "debt_exposure")
     * @property severity Risk severity level: "low", "moderate", "high", or "critical"
     * @property message Description of the risk and its implications
     */
    data class RiskIndicator(
        val type: String,
        val severity: String,
        val message: String
    )

    /**
     * Complete financial health assessment report.
     *
     * @property overallScore Weighted composite score from 0-100
     * @property overallStatus Overall health status classification
     * @property components Individual component evaluations
     * @property risks Identified risk indicators
     * @property recommendations Actionable suggestions for improvement
     * @property summary Brief narrative summary of financial health
     */
    data class FinancialHealthReport(
        val overallScore: Int,
        val overallStatus: HealthStatus,
        val components: List<HealthComponent>,
        val risks: List<RiskIndicator>,
        val recommendations: List<String>,
        val summary: String
    )

    // Component weights
    private const val WEIGHT_SAVINGS_RATE = 0.25
    private const val WEIGHT_EMERGENCY_FUND = 0.25
    private const val WEIGHT_DEBT_TO_INCOME = 0.30
    private const val WEIGHT_BUDGET_ADHERENCE = 0.20

    /**
     * Calculate comprehensive financial health report for a ledger profile.
     *
     * Analyzes the profile's income, expenses, debt, savings goals, and budget
     * categories to produce a holistic financial health assessment.
     *
     * @param profile The ledger profile to evaluate
     * @return A complete financial health report with scores, risks, and recommendations
     */
    fun calculateHealthReport(profile: LedgerProfile): FinancialHealthReport {
        val components = mutableListOf<HealthComponent>()
        val risks = mutableListOf<RiskIndicator>()
        val recommendations = mutableListOf<String>()

        // Calculate total expenses
        val totalFixedExpenses = profile.fixedExpenses.sumOf { it.amount }
        val totalVariableExpenses = profile.variableExpenses.sumOf { it.amount }
        val totalExpenses = totalFixedExpenses + totalVariableExpenses

        // Calculate total debt payments
        val totalDebtPayments = profile.debtItems.sumOf { it.minPayment ?: 0.0 }

        // 1. Savings Rate Component
        val savingsRateComponent = calculateSavingsRate(
            monthlyIncome = profile.monthlyIncome,
            totalExpenses = totalExpenses,
            totalDebtPayments = totalDebtPayments
        )
        components.add(savingsRateComponent)

        // 2. Emergency Fund Component
        val emergencyFundComponent = calculateEmergencyFund(
            profile = profile,
            monthlyExpenses = totalExpenses + totalDebtPayments
        )
        components.add(emergencyFundComponent)

        // 3. Debt-to-Income Ratio Component
        val dtiComponent = calculateDebtToIncome(
            monthlyIncome = profile.monthlyIncome,
            totalDebtPayments = totalDebtPayments
        )
        components.add(dtiComponent)

        // 4. Budget Adherence Component
        val budgetComponent = calculateBudgetAdherence(profile.budgetCategories)
        components.add(budgetComponent)

        // Calculate overall score
        val overallScore = components.sumOf { it.score * it.weight }.roundToInt()
            .coerceIn(0, 100)
        val overallStatus = scoreToStatus(overallScore)

        // Identify risks
        risks.addAll(identifyRisks(profile, components, totalExpenses, totalDebtPayments))

        // Generate recommendations based on weakest components
        recommendations.addAll(generateRecommendations(components, risks))

        // Generate summary
        val summary = generateSummary(overallScore, overallStatus, components, risks)

        return FinancialHealthReport(
            overallScore = overallScore,
            overallStatus = overallStatus,
            components = components,
            risks = risks,
            recommendations = recommendations,
            summary = summary
        )
    }

    /**
     * Calculate savings rate component.
     *
     * Savings Rate = (monthlyIncome - totalExpenses - debtPayments) / monthlyIncome
     *
     * Scoring:
     * - <10% = POOR (score 20-39)
     * - 10-15% = FAIR (score 40-59)
     * - 15-20% = GOOD (score 60-79)
     * - >20% = EXCELLENT (score 80-100)
     */
    private fun calculateSavingsRate(
        monthlyIncome: Double,
        totalExpenses: Double,
        totalDebtPayments: Double
    ): HealthComponent {
        if (monthlyIncome <= 0) {
            return HealthComponent(
                name = "Savings Rate",
                score = 0,
                weight = WEIGHT_SAVINGS_RATE,
                status = HealthStatus.CRITICAL,
                message = "No income recorded. Unable to calculate savings rate."
            )
        }

        val netSavings = monthlyIncome - totalExpenses - totalDebtPayments
        val savingsRate = (netSavings / monthlyIncome) * 100

        val (score, status, message) = when {
            savingsRate < 0 -> Triple(
                0,
                HealthStatus.CRITICAL,
                "Negative savings rate (${formatPercent(savingsRate)}). Spending exceeds income."
            )
            savingsRate < 10 -> Triple(
                (savingsRate * 3.9).roundToInt().coerceIn(0, 39),
                HealthStatus.POOR,
                "Low savings rate of ${formatPercent(savingsRate)}. Aim for at least 10%."
            )
            savingsRate < 15 -> Triple(
                (40 + (savingsRate - 10) * 4).roundToInt().coerceIn(40, 59),
                HealthStatus.FAIR,
                "Savings rate of ${formatPercent(savingsRate)} is fair. Target 15-20% for better security."
            )
            savingsRate < 20 -> Triple(
                (60 + (savingsRate - 15) * 4).roundToInt().coerceIn(60, 79),
                HealthStatus.GOOD,
                "Good savings rate of ${formatPercent(savingsRate)}. On track for financial goals."
            )
            else -> Triple(
                (80 + ((savingsRate - 20) * 2).coerceAtMost(20.0)).roundToInt().coerceIn(80, 100),
                HealthStatus.EXCELLENT,
                "Excellent savings rate of ${formatPercent(savingsRate)}. Strong financial discipline."
            )
        }

        return HealthComponent(
            name = "Savings Rate",
            score = score,
            weight = WEIGHT_SAVINGS_RATE,
            status = status,
            message = message
        )
    }

    /**
     * Calculate emergency fund adequacy.
     *
     * Evaluates savings goals marked as emergency funds or general savings
     * against monthly expenses to determine months of coverage.
     *
     * Scoring:
     * - <1 month = CRITICAL (score 0-19)
     * - 1-3 months = POOR (score 20-39)
     * - 3-6 months = FAIR (score 40-69)
     * - >6 months = GOOD/EXCELLENT (score 70-100)
     */
    private fun calculateEmergencyFund(
        profile: LedgerProfile,
        monthlyExpenses: Double
    ): HealthComponent {
        if (monthlyExpenses <= 0) {
            return HealthComponent(
                name = "Emergency Fund",
                score = 50,
                weight = WEIGHT_EMERGENCY_FUND,
                status = HealthStatus.FAIR,
                message = "No expenses recorded. Unable to fully evaluate emergency fund adequacy."
            )
        }

        // Look for emergency fund or savings goals
        val emergencyFundGoals = profile.financialGoals.filter { goal ->
            goal.type.lowercase() in listOf("emergency", "emergency_fund", "savings") ||
                goal.name.lowercase().contains("emergency")
        }

        // Calculate total emergency savings
        val emergencySavings = if (emergencyFundGoals.isNotEmpty()) {
            emergencyFundGoals.sumOf { it.currentAmount }
        } else {
            // Fall back to any savings-type goals
            profile.financialGoals
                .filter { it.type.lowercase() == "savings" }
                .sumOf { it.currentAmount }
        }

        val monthsCovered = emergencySavings / monthlyExpenses

        val (score, status, message) = when {
            monthsCovered < 1 -> Triple(
                (monthsCovered * 19).roundToInt().coerceIn(0, 19),
                HealthStatus.CRITICAL,
                "Emergency fund covers less than 1 month of expenses. This is a critical priority."
            )
            monthsCovered < 3 -> Triple(
                (20 + (monthsCovered - 1) * 10).roundToInt().coerceIn(20, 39),
                HealthStatus.POOR,
                "Emergency fund covers ${formatMonths(monthsCovered)} of expenses. Target 3-6 months."
            )
            monthsCovered < 6 -> Triple(
                (40 + (monthsCovered - 3) * 10).roundToInt().coerceIn(40, 69),
                HealthStatus.FAIR,
                "Emergency fund covers ${formatMonths(monthsCovered)} of expenses. Good progress toward 6-month goal."
            )
            monthsCovered < 12 -> Triple(
                (70 + (monthsCovered - 6) * 5).roundToInt().coerceIn(70, 89),
                HealthStatus.GOOD,
                "Emergency fund covers ${formatMonths(monthsCovered)} of expenses. Solid financial cushion."
            )
            else -> Triple(
                90 + ((monthsCovered - 12) * 2).roundToInt().coerceAtMost(10),
                HealthStatus.EXCELLENT,
                "Emergency fund covers ${formatMonths(monthsCovered)} of expenses. Excellent financial security."
            )
        }

        return HealthComponent(
            name = "Emergency Fund",
            score = score.coerceIn(0, 100),
            weight = WEIGHT_EMERGENCY_FUND,
            status = status,
            message = message
        )
    }

    /**
     * Calculate debt-to-income ratio component.
     *
     * DTI = totalDebtPayments / monthlyIncome
     *
     * Scoring (lower is better):
     * - >50% = CRITICAL (score 0-19)
     * - 36-50% = POOR (score 20-39)
     * - 20-36% = FAIR (score 40-69)
     * - <20% = GOOD/EXCELLENT (score 70-100)
     */
    private fun calculateDebtToIncome(
        monthlyIncome: Double,
        totalDebtPayments: Double
    ): HealthComponent {
        if (monthlyIncome <= 0) {
            return HealthComponent(
                name = "Debt-to-Income Ratio",
                score = 0,
                weight = WEIGHT_DEBT_TO_INCOME,
                status = HealthStatus.CRITICAL,
                message = "No income recorded. Unable to calculate debt-to-income ratio."
            )
        }

        // If no debt, perfect score
        if (totalDebtPayments <= 0) {
            return HealthComponent(
                name = "Debt-to-Income Ratio",
                score = 100,
                weight = WEIGHT_DEBT_TO_INCOME,
                status = HealthStatus.EXCELLENT,
                message = "No debt payments recorded. Excellent debt position."
            )
        }

        val dtiRatio = (totalDebtPayments / monthlyIncome) * 100

        val (score, status, message) = when {
            dtiRatio > 50 -> Triple(
                (19 - ((dtiRatio - 50) * 0.38)).roundToInt().coerceIn(0, 19),
                HealthStatus.CRITICAL,
                "Critical DTI of ${formatPercent(dtiRatio)}. Debt payments consume over half of income."
            )
            dtiRatio > 36 -> Triple(
                (39 - ((dtiRatio - 36) * 1.36)).roundToInt().coerceIn(20, 39),
                HealthStatus.POOR,
                "High DTI of ${formatPercent(dtiRatio)}. Consider debt reduction strategies."
            )
            dtiRatio > 20 -> Triple(
                (69 - ((dtiRatio - 20) * 1.875)).roundToInt().coerceIn(40, 69),
                HealthStatus.FAIR,
                "Moderate DTI of ${formatPercent(dtiRatio)}. Manageable but monitor closely."
            )
            dtiRatio > 10 -> Triple(
                (89 - ((dtiRatio - 10) * 2)).roundToInt().coerceIn(70, 89),
                HealthStatus.GOOD,
                "Good DTI of ${formatPercent(dtiRatio)}. Debt is well-managed."
            )
            else -> Triple(
                (90 + ((10 - dtiRatio))).roundToInt().coerceIn(90, 100),
                HealthStatus.EXCELLENT,
                "Excellent DTI of ${formatPercent(dtiRatio)}. Very low debt burden."
            )
        }

        return HealthComponent(
            name = "Debt-to-Income Ratio",
            score = score,
            weight = WEIGHT_DEBT_TO_INCOME,
            status = status,
            message = message
        )
    }

    /**
     * Calculate budget adherence component.
     *
     * Evaluates how well actual spending aligns with budget allocations
     * across all categories.
     *
     * Scoring based on average variance:
     * - >25% over = POOR/CRITICAL
     * - 10-25% over = FAIR
     * - Within 10% = GOOD
     * - Under budget = EXCELLENT
     */
    private fun calculateBudgetAdherence(
        budgetCategories: List<com.agnes.nexus.core.domain.models.LedgerBudgetCategory>
    ): HealthComponent {
        if (budgetCategories.isEmpty()) {
            return HealthComponent(
                name = "Budget Adherence",
                score = 50,
                weight = WEIGHT_BUDGET_ADHERENCE,
                status = HealthStatus.FAIR,
                message = "No budget categories defined. Set up a budget to track spending adherence."
            )
        }

        // Calculate variance for each category
        var totalAllocated = 0.0
        var totalSpent = 0.0
        var categoriesOverBudget = 0
        var categoriesUnderBudget = 0

        for (category in budgetCategories) {
            if (category.allocated > 0) {
                totalAllocated += category.allocated
                totalSpent += category.spent

                val variance = (category.spent - category.allocated) / category.allocated
                when {
                    variance > 0.1 -> categoriesOverBudget++
                    variance < -0.1 -> categoriesUnderBudget++
                }
            }
        }

        if (totalAllocated <= 0) {
            return HealthComponent(
                name = "Budget Adherence",
                score = 50,
                weight = WEIGHT_BUDGET_ADHERENCE,
                status = HealthStatus.FAIR,
                message = "No budget allocations set. Define budget amounts to track adherence."
            )
        }

        val overallVariance = ((totalSpent - totalAllocated) / totalAllocated) * 100
        val overBudgetPercent = (categoriesOverBudget.toDouble() / budgetCategories.size) * 100

        val (score, status, message) = when {
            overallVariance > 25 -> Triple(
                (19 - (overallVariance - 25) * 0.38).roundToInt().coerceIn(0, 19),
                HealthStatus.CRITICAL,
                "Significantly over budget by ${formatPercent(overallVariance)}. Urgent spending review needed."
            )
            overallVariance > 10 -> Triple(
                (39 - (overallVariance - 10) * 1.33).roundToInt().coerceIn(20, 39),
                HealthStatus.POOR,
                "Over budget by ${formatPercent(overallVariance)}. Review spending in $categoriesOverBudget categories."
            )
            overallVariance > 0 -> Triple(
                (69 - overallVariance * 3).roundToInt().coerceIn(40, 69),
                HealthStatus.FAIR,
                "Slightly over budget by ${formatPercent(overallVariance)}. Minor adjustments needed."
            )
            overallVariance > -10 -> Triple(
                (70 + (abs(overallVariance) * 2)).roundToInt().coerceIn(70, 89),
                HealthStatus.GOOD,
                "On track with budget. Spending within ${formatPercent(abs(overallVariance))} of plan."
            )
            else -> Triple(
                (90 + (abs(overallVariance) - 10).coerceAtMost(10.0)).roundToInt().coerceIn(90, 100),
                HealthStatus.EXCELLENT,
                "Excellent budget discipline. Under budget by ${formatPercent(abs(overallVariance))}."
            )
        }

        return HealthComponent(
            name = "Budget Adherence",
            score = score,
            weight = WEIGHT_BUDGET_ADHERENCE,
            status = status,
            message = message
        )
    }

    /**
     * Identify risk indicators based on profile data and calculated components.
     */
    private fun identifyRisks(
        profile: LedgerProfile,
        components: List<HealthComponent>,
        monthlyExpenses: Double,
        totalDebtPayments: Double
    ): List<RiskIndicator> {
        val risks = mutableListOf<RiskIndicator>()

        // Check emergency fund adequacy
        val emergencyComponent = components.find { it.name == "Emergency Fund" }
        if (emergencyComponent != null && emergencyComponent.status in listOf(HealthStatus.CRITICAL, HealthStatus.POOR)) {
            val severity = if (emergencyComponent.status == HealthStatus.CRITICAL) "critical" else "high"
            risks.add(
                RiskIndicator(
                    type = "emergency_fund",
                    severity = severity,
                    message = "Insufficient emergency fund. Unexpected expenses could cause financial hardship."
                )
            )
        }

        // Check debt exposure (DTI > 36%)
        val dtiComponent = components.find { it.name == "Debt-to-Income Ratio" }
        if (dtiComponent != null && dtiComponent.status in listOf(HealthStatus.CRITICAL, HealthStatus.POOR)) {
            val severity = if (dtiComponent.status == HealthStatus.CRITICAL) "critical" else "high"
            risks.add(
                RiskIndicator(
                    type = "debt_exposure",
                    severity = severity,
                    message = "High debt-to-income ratio limits financial flexibility and borrowing capacity."
                )
            )
        }

        // Check negative cash flow
        val savingsComponent = components.find { it.name == "Savings Rate" }
        if (savingsComponent != null && savingsComponent.status == HealthStatus.CRITICAL) {
            risks.add(
                RiskIndicator(
                    type = "cash_flow",
                    severity = "critical",
                    message = "Negative cash flow. Spending exceeds income, depleting savings or increasing debt."
                )
            )
        }

        // Check for no active financial plan
        if (profile.activePlanId == null && profile.plans.isEmpty()) {
            risks.add(
                RiskIndicator(
                    type = "no_plan",
                    severity = "moderate",
                    message = "No active financial plan. A structured plan helps achieve financial goals."
                )
            )
        }

        // Check high financial friction
        val friction = profile.financialFriction
        if (friction != null && friction > 6f) {
            val severity = if (friction > 8f) "high" else "moderate"
            risks.add(
                RiskIndicator(
                    type = "financial_friction",
                    severity = severity,
                    message = "High financial friction score (${(kotlin.math.round((friction.toDouble() * 10.0) / 10.0).toString())}). Consider simplifying financial management."
                )
            )
        }

        // Check for high-interest debt (credit cards)
        val highInterestDebt = profile.debtItems.filter {
            it.type == com.agnes.nexus.core.domain.models.DebtType.CREDIT_CARD &&
                (it.apr ?: 0.0) > 15.0
        }
        if (highInterestDebt.isNotEmpty()) {
            val totalHighInterest = highInterestDebt.sumOf { it.balance }
            risks.add(
                RiskIndicator(
                    type = "high_interest_debt",
                    severity = if (totalHighInterest > 5000) "high" else "moderate",
                    message = "High-interest credit card debt detected. Prioritize paying down to reduce interest costs."
                )
            )
        }

        return risks
    }

    /**
     * Generate personalized recommendations based on weakest components and risks.
     */
    private fun generateRecommendations(
        components: List<HealthComponent>,
        risks: List<RiskIndicator>
    ): List<String> {
        val recommendations = mutableListOf<String>()

        // Sort components by score to address weakest first
        val sortedComponents = components.sortedBy { it.score }

        for (component in sortedComponents) {
            if (component.status in listOf(HealthStatus.CRITICAL, HealthStatus.POOR, HealthStatus.FAIR)) {
                when (component.name) {
                    "Savings Rate" -> {
                        if (component.status == HealthStatus.CRITICAL) {
                            recommendations.add("Immediately review all expenses and identify non-essential spending to cut.")
                        }
                        recommendations.add("Target saving at least 15-20% of income. Automate transfers to savings on payday.")
                    }
                    "Emergency Fund" -> {
                        if (component.status == HealthStatus.CRITICAL) {
                            recommendations.add("Start building an emergency fund immediately, even with small amounts.")
                        }
                        recommendations.add("Work toward 3-6 months of expenses in an accessible savings account.")
                    }
                    "Debt-to-Income Ratio" -> {
                        if (component.status == HealthStatus.CRITICAL) {
                            recommendations.add("Consider debt consolidation or speaking with a financial counselor.")
                        }
                        recommendations.add("Focus on paying down highest-interest debt first (avalanche method).")
                    }
                    "Budget Adherence" -> {
                        recommendations.add("Review spending categories that exceed budget and adjust allocations or spending habits.")
                    }
                }
            }

            // Limit to 5 recommendations
            if (recommendations.size >= 5) break
        }

        // Add risk-specific recommendations
        for (risk in risks) {
            if (recommendations.size >= 5) break

            when (risk.type) {
                "high_interest_debt" -> {
                    if (!recommendations.any { it.contains("interest") }) {
                        recommendations.add("Prioritize paying off credit card balances to eliminate high interest charges.")
                    }
                }
                "no_plan" -> {
                    recommendations.add("Create a financial plan with clear goals and milestones.")
                }
                "financial_friction" -> {
                    recommendations.add("Simplify your finances by consolidating accounts or automating payments.")
                }
            }
        }

        return recommendations.take(5)
    }

    /**
     * Generate a narrative summary of the financial health assessment.
     */
    private fun generateSummary(
        overallScore: Int,
        overallStatus: HealthStatus,
        components: List<HealthComponent>,
        risks: List<RiskIndicator>
    ): String {
        val statusDescription = when (overallStatus) {
            HealthStatus.EXCELLENT -> "Your financial health is excellent."
            HealthStatus.GOOD -> "Your financial health is good with strong fundamentals."
            HealthStatus.FAIR -> "Your financial health is fair with room for improvement."
            HealthStatus.POOR -> "Your financial health needs attention in several areas."
            HealthStatus.CRITICAL -> "Your financial health requires urgent attention."
        }

        val strongestComponent = components.maxByOrNull { it.score }
        val weakestComponent = components.minByOrNull { it.score }

        val strengths = if (strongestComponent != null && strongestComponent.score >= 60) {
            " Your ${strongestComponent.name.lowercase()} is a strength."
        } else ""

        val weaknesses = if (weakestComponent != null && weakestComponent.score < 50) {
            " Focus on improving your ${weakestComponent.name.lowercase()}."
        } else ""

        val riskWarning = when {
            risks.any { it.severity == "critical" } ->
                " There are critical risks that need immediate attention."
            risks.any { it.severity == "high" } ->
                " Be aware of high-priority risks identified in this assessment."
            else -> ""
        }

        return "$statusDescription$strengths$weaknesses$riskWarning"
    }

    /**
     * Convert a numeric score to a health status.
     */
    private fun scoreToStatus(score: Int): HealthStatus = when {
        score >= 80 -> HealthStatus.EXCELLENT
        score >= 60 -> HealthStatus.GOOD
        score >= 40 -> HealthStatus.FAIR
        score >= 20 -> HealthStatus.POOR
        else -> HealthStatus.CRITICAL
    }

    /**
     * Format a percentage value for display.
     */
    private fun formatPercent(value: Double): String {
        return "${(kotlin.math.round((kotlin.math.abs(value) * 10.0) / 10.0).toString() as Double)}%"
    }

    /**
     * Format months value for display.
     */
    private fun formatMonths(months: Double): String {
        return if (months < 1) {
            "less than 1 month"
        } else {
            "${(kotlin.math.round((months as Double) * 10.0) / 10.0).toString()} months"
        }
    }
}
