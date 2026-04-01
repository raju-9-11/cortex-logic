package com.agnes.nexus.core.domain.service.ledger

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlin.math.abs
import kotlin.math.max
import kotlin.math.min
import kotlin.math.round

// ═══════════════════════════════════════════════════════════════════════════════
// IO Types
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
data class BudgetLineItemSlim(
    val amount: Double = 0.0,
)

@Serializable
data class DebtItemSlim(
    val id: String = "",
    val name: String = "",
    val minPayment: Double = 0.0,
)

@Serializable
data class BudgetCategorySlim(
    val id: String = "",
    val name: String = "",
    val allocated: Double = 0.0,
    val spent: Double = 0.0,
)

@Serializable
data class SavingsGoalSlim(
    val monthlyContribution: Double = 0.0,
)

/** Minimal financial snapshot — only the fields needed for coherence checks + NSV patch. */
@Serializable
data class LedgerIntakeSnapshot(
    val monthlyIncome: Double = 0.0,
    val fixedExpenses: List<BudgetLineItemSlim> = emptyList(),
    val variableExpenses: List<BudgetLineItemSlim> = emptyList(),
    val debtItems: List<DebtItemSlim> = emptyList(),
    val budgetCategories: List<BudgetCategorySlim> = emptyList(),
    val savingsGoals: List<SavingsGoalSlim> = emptyList(),
)

@Serializable
data class CoherenceIssue(
    val severity: String,
    val field: String,
    val message: String,
    val suggestion: String,
)

@Serializable
data class CoherenceReport(
    val issues: List<CoherenceIssue>,
    val score: Int,
    val hasErrors: Boolean,
)

@Serializable
data class NsvFinancialPatch(
    val financialFriction: Double,
    val energyBudget: Double,
)

// ═══════════════════════════════════════════════════════════════════════════════
// CrossVerificationService
// ═══════════════════════════════════════════════════════════════════════════════

object CrossVerificationService {

    private val json = Json { ignoreUnknownKeys = true }

    private fun sumAmounts(items: List<BudgetLineItemSlim>): Double =
        items.sumOf { it.amount }

    /**
     * Compute profile-level financial friction (agnes resonance-roi-service formula).
     * friction = DTI × 0.4 + expenseRatio × 0.4 + savingsGap × 0.2, clamped to [0, 1].
     */
    fun computeFinancialFriction(profileJson: String): Double {
        val p = json.decodeFromString<LedgerIntakeSnapshot>(profileJson)
        val income = max(p.monthlyIncome, 0.0)
        if (income == 0.0) return 0.0

        val totalExpenses = sumAmounts(p.fixedExpenses) + sumAmounts(p.variableExpenses)
        val monthlyDebtPayments = p.debtItems.sumOf { it.minPayment }
        val dti = min(monthlyDebtPayments / income, 1.0)
        val expenseRatio = min(totalExpenses / income, 1.0)

        val recommendedMonthlySavings = income * 0.2
        val actualMonthlySavings = p.savingsGoals.sumOf { it.monthlyContribution }
        val savingsGap = min(max(0.0, recommendedMonthlySavings - actualMonthlySavings) / income, 1.0)

        val friction = dti * 0.4 + expenseRatio * 0.4 + savingsGap * 0.2
        return min(1.0, max(0.0, friction))
    }

    /**
     * Run deterministic coherence rules. Scoring: 100 − 20/error − 10/warning, clamped [0, 100].
     * @param profileJson JSON-serialized LedgerIntakeSnapshot
     * @return JSON-serialized CoherenceReport
     */
    fun verifyCoherence(profileJson: String): String {
        val p = json.decodeFromString<LedgerIntakeSnapshot>(profileJson)
        val issues = mutableListOf<CoherenceIssue>()

        val totalIncome = max(p.monthlyIncome, 0.0)
        val totalExpenses = sumAmounts(p.fixedExpenses) + sumAmounts(p.variableExpenses)
        val monthlyDebtPayments = p.debtItems.sumOf { it.minPayment }
        val dti = if (totalIncome > 0) monthlyDebtPayments / totalIncome else 0.0
        val savingsRate = if (totalIncome > 0) (totalIncome - totalExpenses) / totalIncome else 0.0

        // Rule 1: Expenses > 150% of income
        if (totalExpenses > totalIncome * 1.5) {
            issues.add(CoherenceIssue("error", "expenses",
                "Expenses exceed 150% of income",
                "Review and reduce variable or fixed expenses to bring spending below 150% of income."))
        }

        // Rule 2: DTI above 43%
        if (dti > 0.43) {
            issues.add(CoherenceIssue("warning", "debtToIncomeRatio",
                "DTI above 43% (mortgage qualification threshold)",
                "Consider reducing debt obligations or increasing income to bring DTI below 43%."))
        }

        // Rule 3: Negative savings rate
        if (savingsRate < 0) {
            issues.add(CoherenceIssue("warning", "savingsRate",
                "Negative savings rate — spending exceeds income",
                "Identify discretionary expenses to cut in order to return to a positive savings rate."))
        }

        // Rule 4: No income
        if (totalIncome == 0.0) {
            issues.add(CoherenceIssue("warning", "monthlyIncome",
                "No income sources configured",
                "Add at least one income source to enable accurate financial analysis."))
        }

        // Rule 5: Negative budget allocation
        for (cat in p.budgetCategories) {
            if (cat.allocated < 0) {
                issues.add(CoherenceIssue("error", "budgetCategory.${cat.id}",
                    "Negative budget allocation for ${cat.name}",
                    "Set the allocated amount for \"${cat.name}\" to 0 or a positive value."))
            }
        }

        // Rule 6: Missing minimum payment
        for (debt in p.debtItems) {
            if (debt.minPayment <= 0) {
                issues.add(CoherenceIssue("warning", "debtItem.${debt.id}",
                    "Debt item missing minimum payment",
                    "Set the minimum payment for \"${debt.name}\" to ensure accurate DTI calculation."))
            }
        }

        val errorCount = issues.count { it.severity == "error" }
        val warningCount = issues.count { it.severity == "warning" }
        val score = max(0, 100 - errorCount * 20 - warningCount * 10)

        val report = CoherenceReport(issues, score, errorCount > 0)
        return json.encodeToString(CoherenceReport.serializer(), report)
    }

    /**
     * Compute the NSV financial patch from a ledger profile.
     * financialFriction: friction × 10 (0–10 scale)
     * energyBudget: piecewise-linear from savingsRate
     * @return JSON-serialized NsvFinancialPatch
     */
    fun computeNsvFinancialPatch(profileJson: String): String {
        val p = json.decodeFromString<LedgerIntakeSnapshot>(profileJson)
        val rawFriction = computeFinancialFriction(profileJson)
        val financialFriction = round(rawFriction * 10.0 * 10.0) / 10.0

        val totalIncome = max(p.monthlyIncome, 0.0)
        val totalExpenses = sumAmounts(p.fixedExpenses) + sumAmounts(p.variableExpenses)
        val savingsRate = if (totalIncome > 0) (totalIncome - totalExpenses) / totalIncome else 0.0

        val energyBudget = when {
            savingsRate <= 0 -> 3.0
            savingsRate <= 0.2 -> 3.0 + (savingsRate / 0.2) * 4.0
            savingsRate <= 0.4 -> 7.0 + ((savingsRate - 0.2) / 0.2) * 3.0
            else -> 10.0
        }.let { round(it * 10.0) / 10.0 }

        val patch = NsvFinancialPatch(financialFriction, energyBudget)
        return json.encodeToString(NsvFinancialPatch.serializer(), patch)
    }
}
