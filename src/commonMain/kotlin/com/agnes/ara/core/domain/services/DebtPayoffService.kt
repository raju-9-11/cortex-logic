package com.agnes.ara.core.domain.services

import com.agnes.ara.core.domain.models.DebtItem
import kotlin.math.max

/**
 * Service for calculating debt payoff projections using different strategies.
 * 
 * This service implements two popular debt repayment strategies:
 * - **Snowball Method**: Focuses on paying off the smallest balances first, providing
 *   psychological wins that help maintain motivation throughout the debt payoff journey.
 * - **Avalanche Method**: Prioritizes debts with the highest interest rates first,
 *   which is mathematically optimal and results in the least total interest paid.
 * 
 * Both methods follow the same core principle: pay minimum payments on all debts,
 * then apply any extra funds to the target debt. When a debt is paid off, its
 * payment "snowballs" or "avalanches" into the next target debt, accelerating payoff.
 */
object DebtPayoffService {

    /**
     * Strategies for prioritizing which debts to pay off first.
     */
    enum class PayoffStrategy {
        /** Pay smallest balance first - provides psychological wins to maintain motivation */
        SNOWBALL,
        /** Pay highest APR first - mathematically optimal, minimizes total interest paid */
        AVALANCHE
    }

    /**
     * Projection details for a single debt within a payoff plan.
     * 
     * @property debtId Unique identifier of the debt
     * @property debtName Human-readable name of the debt
     * @property originalBalance Starting balance when the plan begins
     * @property monthsToPayoff Number of months until this debt is fully paid
     * @property totalInterestPaid Total interest accumulated on this debt during payoff
     * @property payoffOrder Order in which this debt will be paid off (1 = first)
     * @property monthlyPayment The initial monthly payment amount for this debt
     */
    data class PayoffProjection(
        val debtId: String,
        val debtName: String,
        val originalBalance: Double,
        val monthsToPayoff: Int,
        val totalInterestPaid: Double,
        val payoffOrder: Int,
        val monthlyPayment: Double
    )

    /**
     * Complete debt payoff plan with projections for all debts.
     * 
     * @property strategy The payoff strategy used (SNOWBALL or AVALANCHE)
     * @property projections Individual projections for each debt
     * @property totalMonths Total months until all debts are paid off
     * @property totalInterestPaid Sum of all interest paid across all debts
     * @property monthlyBudget Total monthly payment budget (sum of all minimum payments + extra)
     */
    data class DebtPayoffPlan(
        val strategy: PayoffStrategy,
        val projections: List<PayoffProjection>,
        val totalMonths: Int,
        val totalInterestPaid: Double,
        val monthlyBudget: Double
    )

    /**
     * Internal state for tracking a debt during simulation.
     */
    private data class DebtState(
        val id: String,
        val name: String,
        val originalBalance: Double,
        var currentBalance: Double,
        val apr: Double,
        val minPayment: Double,
        var totalInterestPaid: Double = 0.0,
        var monthsPaid: Int = 0,
        var payoffOrder: Int = 0,
        var isPaidOff: Boolean = false
    )

    /**
     * Calculate a debt payoff plan using the specified strategy.
     * 
     * The algorithm simulates month-by-month payments:
     * 1. Apply monthly interest to all outstanding balances
     * 2. Pay minimum payments on all debts
     * 3. Apply extra payment to the target debt (smallest balance for SNOWBALL, highest APR for AVALANCHE)
     * 4. When a debt is paid off, its minimum payment rolls into available extra payment
     * 5. Continue until all debts are paid off
     * 
     * @param debts List of DebtItems to include in the plan
     * @param extraMonthlyPayment Additional amount above minimum payments to accelerate payoff
     * @param strategy SNOWBALL (smallest balance first) or AVALANCHE (highest APR first)
     * @return DebtPayoffPlan with projections for each debt
     */
    fun calculatePayoffPlan(
        debts: List<DebtItem>,
        extraMonthlyPayment: Double = 0.0,
        strategy: PayoffStrategy = PayoffStrategy.AVALANCHE
    ): DebtPayoffPlan {
        if (debts.isEmpty()) {
            return DebtPayoffPlan(
                strategy = strategy,
                projections = emptyList(),
                totalMonths = 0,
                totalInterestPaid = 0.0,
                monthlyBudget = 0.0
            )
        }

        // Initialize debt states with null-safe handling
        val debtStates = debts.map { debt ->
            val effectiveMinPayment = debt.minPayment ?: calculateEstimatedMinPayment(debt.balance)
            DebtState(
                id = debt.id,
                name = debt.name,
                originalBalance = debt.balance,
                currentBalance = debt.balance,
                apr = debt.apr ?: 0.0,
                minPayment = effectiveMinPayment
            )
        }.toMutableList()

        // Calculate total minimum payments for monthly budget
        val totalMinPayments = debtStates.sumOf { it.minPayment }
        val monthlyBudget = totalMinPayments + extraMonthlyPayment

        // Sort debts according to strategy for targeting
        val sortedDebts = sortDebtsByStrategy(debtStates, strategy)

        var month = 0
        var payoffCounter = 0
        val maxMonths = 1200 // 100 year safety limit

        // Simulate month-by-month payoff
        while (sortedDebts.any { !it.isPaidOff } && month < maxMonths) {
            month++

            // Step 1: Apply monthly interest to all debts
            for (debt in sortedDebts) {
                if (!debt.isPaidOff) {
                    val monthlyInterest = calculateMonthlyInterest(debt.currentBalance, debt.apr)
                    debt.currentBalance += monthlyInterest
                    debt.totalInterestPaid += monthlyInterest
                }
            }

            // Step 2: Calculate available extra payment (original extra + freed up minimums)
            val paidOffMinimums = sortedDebts.filter { it.isPaidOff }.sumOf { it.minPayment }
            var availableExtra = extraMonthlyPayment + paidOffMinimums

            // Step 3: Pay minimum on all active debts, apply extra to target
            for (debt in sortedDebts) {
                if (debt.isPaidOff) continue

                debt.monthsPaid = month

                // Determine payment amount
                val isTargetDebt = debt == getTargetDebt(sortedDebts, strategy)
                val payment = if (isTargetDebt) {
                    val totalPayment = debt.minPayment + availableExtra
                    availableExtra = 0.0
                    totalPayment
                } else {
                    debt.minPayment
                }

                // Apply payment
                debt.currentBalance -= payment

                // Check if paid off
                if (debt.currentBalance <= 0.01) { // Small tolerance for floating point
                    debt.isPaidOff = true
                    payoffCounter++
                    debt.payoffOrder = payoffCounter
                    
                    // Handle overpayment - roll into extra for next debt
                    if (debt.currentBalance < 0) {
                        availableExtra += -debt.currentBalance
                    }
                    debt.currentBalance = 0.0
                }
            }

            // Apply any remaining extra to the next target (in case target was paid off mid-cycle)
            if (availableExtra > 0) {
                val nextTarget = getTargetDebt(sortedDebts, strategy)
                if (nextTarget != null) {
                    nextTarget.currentBalance -= availableExtra
                    if (nextTarget.currentBalance <= 0.01) {
                        nextTarget.isPaidOff = true
                        payoffCounter++
                        nextTarget.payoffOrder = payoffCounter
                        nextTarget.currentBalance = 0.0
                    }
                }
            }
        }

        // Build projections from final state
        val projections = debtStates.map { debt ->
            PayoffProjection(
                debtId = debt.id,
                debtName = debt.name,
                originalBalance = debt.originalBalance,
                monthsToPayoff = debt.monthsPaid,
                totalInterestPaid = debt.totalInterestPaid,
                payoffOrder = debt.payoffOrder,
                monthlyPayment = debt.minPayment
            )
        }

        return DebtPayoffPlan(
            strategy = strategy,
            projections = projections,
            totalMonths = month,
            totalInterestPaid = debtStates.sumOf { it.totalInterestPaid },
            monthlyBudget = monthlyBudget
        )
    }

    /**
     * Compare both payoff strategies for the same set of debts.
     * 
     * This is useful for showing users the trade-offs between the psychological
     * benefits of the Snowball method versus the interest savings of the Avalanche method.
     * 
     * @param debts List of DebtItems to analyze
     * @param extraMonthlyPayment Additional amount above minimum payments
     * @return Pair of (snowball plan, avalanche plan) for comparison
     */
    fun compareStrategies(
        debts: List<DebtItem>,
        extraMonthlyPayment: Double = 0.0
    ): Pair<DebtPayoffPlan, DebtPayoffPlan> {
        val snowballPlan = calculatePayoffPlan(debts, extraMonthlyPayment, PayoffStrategy.SNOWBALL)
        val avalanchePlan = calculatePayoffPlan(debts, extraMonthlyPayment, PayoffStrategy.AVALANCHE)
        return Pair(snowballPlan, avalanchePlan)
    }

    /**
     * Calculate estimated minimum payment when not provided.
     * Uses industry-standard approximation: 2% of balance or $25, whichever is greater.
     */
    private fun calculateEstimatedMinPayment(balance: Double): Double {
        val percentBased = balance * 0.02
        return max(percentBased, 25.0)
    }

    /**
     * Calculate monthly interest charge.
     * APR is divided by 12 to get monthly rate, then applied to balance.
     * 
     * @param balance Current debt balance
     * @param apr Annual Percentage Rate as a decimal (e.g., 0.18 for 18%)
     */
    private fun calculateMonthlyInterest(balance: Double, apr: Double): Double {
        return balance * (apr / 12.0)
    }

    /**
     * Sort debts according to the specified payoff strategy.
     * 
     * @param debts List of debt states to sort
     * @param strategy SNOWBALL sorts by balance ascending, AVALANCHE sorts by APR descending
     */
    private fun sortDebtsByStrategy(
        debts: List<DebtState>,
        strategy: PayoffStrategy
    ): List<DebtState> {
        return when (strategy) {
            PayoffStrategy.SNOWBALL -> debts.sortedBy { it.currentBalance }
            PayoffStrategy.AVALANCHE -> debts.sortedByDescending { it.apr }
        }
    }

    /**
     * Get the current target debt for extra payments based on strategy.
     * Returns the first non-paid-off debt in strategy order.
     */
    private fun getTargetDebt(debts: List<DebtState>, strategy: PayoffStrategy): DebtState? {
        val activeDebts = debts.filter { !it.isPaidOff }
        if (activeDebts.isEmpty()) return null

        return when (strategy) {
            PayoffStrategy.SNOWBALL -> activeDebts.minByOrNull { it.currentBalance }
            PayoffStrategy.AVALANCHE -> activeDebts.maxByOrNull { it.apr }
        }
    }
}
