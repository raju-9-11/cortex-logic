package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.models.LedgerProfile

/**
 * Represents the tier of financial friction based on the calculated friction score.
 *
 * - [LOW]: Friction 0-3, indicates healthy financial standing with minimal stress.
 * - [MODERATE]: Friction 4-6, indicates manageable financial pressure.
 * - [ELEVATED]: Friction 7-8, indicates significant financial strain requiring attention.
 * - [CRITICAL]: Friction 9-10, indicates severe financial distress needing immediate action.
 */
enum class FrictionTier {
    LOW,
    MODERATE,
    ELEVATED,
    CRITICAL
}

/**
 * Result of the Resonance ROI calculation containing friction metrics and analysis.
 *
 * @property financialFriction Score from 0-10 indicating overall financial stress level.
 * @property resonanceROI Score from 0.0-1.0 indicating financial health and plan alignment.
 * @property frictionTier Categorical tier based on friction score.
 * @property analysis Human-readable summary of the financial situation.
 */
data class ResonanceROIResult(
    val financialFriction: Float,
    val resonanceROI: Float,
    val frictionTier: FrictionTier,
    val analysis: String
)

/**
 * Service for calculating Financial Friction and Resonance ROI metrics.
 *
 * ## Financial Friction (0-10 scale)
 *
 * Measures overall financial stress using a weighted formula:
 * - **40% Debt-to-Income Ratio**: Total debt balance divided by monthly income
 * - **40% Expense Ratio**: Total monthly expenses divided by monthly income
 * - **20% Savings Gap**: Shortfall between actual and target savings progress
 *
 * Higher friction indicates greater financial stress. The score is clamped to 0-10.
 *
 * ## Resonance ROI (0.0-1.0 scale)
 *
 * Measures financial health and alignment with financial plans:
 * - Base calculation: Inverts friction score `(10 - friction) / 10`
 * - Plan adherence boost: +0.1 if an active plan exists and budget is being followed
 *
 * Higher ROI indicates better financial resonance. The score is clamped to 0.0-1.0.
 *
 * ## Usage
 *
 * ```kotlin
 * val service = ResonanceROIService()
 * val result = service.calculate(ledgerProfile)
 * println("Friction: ${result.financialFriction}, ROI: ${result.resonanceROI}")
 * println("Tier: ${result.frictionTier}")
 * ```
 */
class ResonanceROIService {

    companion object {
        /** Weight for debt-to-income ratio in friction calculation. */
        private const val WEIGHT_DEBT_TO_INCOME = 0.40f

        /** Weight for expense ratio in friction calculation. */
        private const val WEIGHT_EXPENSE_RATIO = 0.40f

        /** Weight for savings gap in friction calculation. */
        private const val WEIGHT_SAVINGS_GAP = 0.20f

        /** Boost applied to ROI when actively following a financial plan. */
        private const val PLAN_ADHERENCE_BOOST = 0.1f

        /** Maximum friction score. */
        private const val MAX_FRICTION = 10f

        /** Minimum friction score. */
        private const val MIN_FRICTION = 0f

        /** Maximum ROI score. */
        private const val MAX_ROI = 1.0f

        /** Minimum ROI score. */
        private const val MIN_ROI = 0.0f

        /** Friction threshold for LOW tier (inclusive upper bound). */
        private const val TIER_LOW_MAX = 3f

        /** Friction threshold for MODERATE tier (inclusive upper bound). */
        private const val TIER_MODERATE_MAX = 6f

        /** Friction threshold for ELEVATED tier (inclusive upper bound). */
        private const val TIER_ELEVATED_MAX = 8f
    }

    /**
     * Calculates Financial Friction and Resonance ROI for the given ledger profile.
     *
     * @param profile The [LedgerProfile] containing income, expenses, debts, goals, and plans.
     * @return A [ResonanceROIResult] containing friction score, ROI, tier, and analysis.
     */
    fun calculate(profile: LedgerProfile): ResonanceROIResult {
        val monthlyIncome = profile.monthlyIncome

        // Handle edge case: zero or negative income
        if (monthlyIncome <= 0.0) {
            return ResonanceROIResult(
                financialFriction = MAX_FRICTION,
                resonanceROI = MIN_ROI,
                frictionTier = FrictionTier.CRITICAL,
                analysis = "Unable to calculate metrics: monthly income must be greater than zero."
            )
        }

        // Calculate component values
        val debtTotal = calculateTotalDebt(profile)
        val totalExpenses = calculateTotalExpenses(profile)
        val (actualSavings, targetSavings) = calculateSavingsProgress(profile)

        // Calculate friction components
        val debtToIncomeRatio = calculateDebtToIncomeComponent(debtTotal, monthlyIncome)
        val expenseRatio = calculateExpenseRatioComponent(totalExpenses, monthlyIncome)
        val savingsGap = calculateSavingsGapComponent(actualSavings, targetSavings)

        // Calculate weighted friction score
        val rawFriction = (WEIGHT_DEBT_TO_INCOME * debtToIncomeRatio) +
                (WEIGHT_EXPENSE_RATIO * expenseRatio) +
                (WEIGHT_SAVINGS_GAP * savingsGap)

        val financialFriction = clamp(rawFriction, MIN_FRICTION, MAX_FRICTION)

        // Calculate Resonance ROI
        val baseROI = (MAX_FRICTION - financialFriction) / MAX_FRICTION
        val adherenceBoost = if (isFollowingActivePlan(profile)) PLAN_ADHERENCE_BOOST else 0f
        val resonanceROI = clamp(baseROI + adherenceBoost, MIN_ROI, MAX_ROI)

        // Determine friction tier
        val frictionTier = determineFrictionTier(financialFriction)

        // Generate analysis
        val analysis = generateAnalysis(
            frictionTier = frictionTier,
            debtToIncomeRatio = debtToIncomeRatio,
            expenseRatio = expenseRatio,
            savingsGap = savingsGap,
            hasActivePlan = profile.activePlanId != null
        )

        return ResonanceROIResult(
            financialFriction = financialFriction,
            resonanceROI = resonanceROI,
            frictionTier = frictionTier,
            analysis = analysis
        )
    }

    /**
     * Calculates total debt balance from all debt items.
     */
    private fun calculateTotalDebt(profile: LedgerProfile): Double {
        return profile.debtItems.sumOf { it.balance }
    }

    /**
     * Calculates total monthly expenses (fixed + variable).
     */
    private fun calculateTotalExpenses(profile: LedgerProfile): Double {
        val fixedTotal = profile.fixedExpenses.sumOf { it.amount }
        val variableTotal = profile.variableExpenses.sumOf { it.amount }
        return fixedTotal + variableTotal
    }

    /**
     * Calculates current savings progress and target savings from financial goals.
     *
     * @return Pair of (actualSavings, targetSavings)
     */
    private fun calculateSavingsProgress(profile: LedgerProfile): Pair<Double, Double> {
        val savingsGoals = profile.financialGoals.filter { it.type == "savings" }

        if (savingsGoals.isEmpty()) {
            // No savings goals defined - assume no gap
            return Pair(0.0, 0.0)
        }

        val actualSavings = savingsGoals.sumOf { it.currentAmount }
        val targetSavings = savingsGoals.sumOf { it.targetAmount }

        return Pair(actualSavings, targetSavings)
    }

    /**
     * Calculates the debt-to-income component (scaled to 0-10).
     *
     * Debt-to-income ratio above 100% (1.0) maps to maximum friction (10).
     */
    private fun calculateDebtToIncomeComponent(debtTotal: Double, monthlyIncome: Double): Float {
        if (debtTotal <= 0.0) return 0f

        // Scale: ratio of 1.0 (100% of income) = friction of 10
        val ratio = (debtTotal / monthlyIncome).toFloat()
        return clamp(ratio * MAX_FRICTION, MIN_FRICTION, MAX_FRICTION)
    }

    /**
     * Calculates the expense ratio component (scaled to 0-10).
     *
     * Expense ratio above 100% (1.0) maps to maximum friction (10).
     */
    private fun calculateExpenseRatioComponent(totalExpenses: Double, monthlyIncome: Double): Float {
        if (totalExpenses <= 0.0) return 0f

        // Scale: ratio of 1.0 (100% of income) = friction of 10
        val ratio = (totalExpenses / monthlyIncome).toFloat()
        return clamp(ratio * MAX_FRICTION, MIN_FRICTION, MAX_FRICTION)
    }

    /**
     * Calculates the savings gap component (scaled to 0-10).
     *
     * Savings gap is: 1 - (actualSavings / targetSavings)
     * - 0% progress = gap of 1.0 = friction of 10
     * - 100% progress = gap of 0.0 = friction of 0
     */
    private fun calculateSavingsGapComponent(actualSavings: Double, targetSavings: Double): Float {
        // No target savings means no gap
        if (targetSavings <= 0.0) return 0f

        val progressRatio = (actualSavings / targetSavings).coerceIn(0.0, 1.0)
        val gap = 1.0 - progressRatio

        return (gap * MAX_FRICTION).toFloat()
    }

    /**
     * Determines if the user is actively following their financial plan.
     *
     * Criteria:
     * - Has an active plan ID set
     * - The active plan exists in the plans list
     * - The plan has status "active"
     * - Total spending is within budget (expenses don't exceed plan allocations)
     */
    private fun isFollowingActivePlan(profile: LedgerProfile): Boolean {
        val activePlanId = profile.activePlanId ?: return false

        val activePlan = profile.plans.find { it.id == activePlanId } ?: return false

        if (activePlan.status != "active") return false

        // Check if current spending is within the plan's budget
        val currentExpenses = calculateTotalExpenses(profile)
        val planExpenses = activePlan.fixedExpenses.sumOf { it.amount } +
                activePlan.variableExpenses.sumOf { it.amount }

        // Following budget if actual expenses don't exceed planned expenses
        // Allow 10% tolerance for minor overages
        val tolerance = planExpenses * 0.10
        return currentExpenses <= (planExpenses + tolerance)
    }

    /**
     * Determines the friction tier based on the friction score.
     */
    private fun determineFrictionTier(friction: Float): FrictionTier {
        return when {
            friction <= TIER_LOW_MAX -> FrictionTier.LOW
            friction <= TIER_MODERATE_MAX -> FrictionTier.MODERATE
            friction <= TIER_ELEVATED_MAX -> FrictionTier.ELEVATED
            else -> FrictionTier.CRITICAL
        }
    }

    /**
     * Generates a human-readable analysis based on the calculated metrics.
     */
    private fun generateAnalysis(
        frictionTier: FrictionTier,
        debtToIncomeRatio: Float,
        expenseRatio: Float,
        savingsGap: Float,
        hasActivePlan: Boolean
    ): String {
        val tierDescription = when (frictionTier) {
            FrictionTier.LOW -> "Your financial health is strong."
            FrictionTier.MODERATE -> "Your finances are manageable but have room for improvement."
            FrictionTier.ELEVATED -> "Your finances show signs of strain that need attention."
            FrictionTier.CRITICAL -> "Your financial situation requires immediate action."
        }

        val concerns = mutableListOf<String>()

        if (debtToIncomeRatio > 5f) {
            concerns.add("high debt-to-income ratio")
        }
        if (expenseRatio > 7f) {
            concerns.add("expenses consuming most of income")
        }
        if (savingsGap > 5f) {
            concerns.add("significant savings shortfall")
        }

        val concernsText = if (concerns.isNotEmpty()) {
            " Key concerns: ${concerns.joinToString(", ")}."
        } else {
            ""
        }

        val planText = if (hasActivePlan) {
            " You have an active financial plan in place."
        } else {
            " Consider creating a financial plan to improve your resonance."
        }

        return "$tierDescription$concernsText$planText"
    }

    /**
     * Clamps a value to the specified range (pure Kotlin implementation).
     */
    private fun clamp(value: Float, min: Float, max: Float): Float {
        return when {
            value < min -> min
            value > max -> max
            else -> value
        }
    }
}
