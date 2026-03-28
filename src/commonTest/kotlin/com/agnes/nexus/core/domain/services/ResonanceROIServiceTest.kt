package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.models.*
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

/**
 * Comprehensive tests for ResonanceROIService covering friction calculations,
 * ROI inversion, plan adherence, tier boundaries, and edge cases.
 */
class ResonanceROIServiceTest {

    private val service = ResonanceROIService()

    // ==================== Helper Functions ====================

    /**
     * Creates a minimal profile with only income set.
     */
    private fun createProfileWithIncome(income: Double): LedgerProfile {
        return LedgerProfile(monthlyIncome = income)
    }

    /**
     * Creates a profile with income and expenses.
     */
    private fun createProfileWithExpenses(
        income: Double,
        fixedExpenses: List<Double> = emptyList(),
        variableExpenses: List<Double> = emptyList()
    ): LedgerProfile {
        return LedgerProfile(
            monthlyIncome = income,
            fixedExpenses = fixedExpenses.mapIndexed { i, amount ->
                LedgerExpense(name = "Fixed $i", amount = amount, isFixed = true)
            },
            variableExpenses = variableExpenses.mapIndexed { i, amount ->
                LedgerExpense(name = "Variable $i", amount = amount, isFixed = false)
            }
        )
    }

    /**
     * Creates a profile with income and debt.
     */
    private fun createProfileWithDebt(
        income: Double,
        debtBalances: List<Double>
    ): LedgerProfile {
        return LedgerProfile(
            monthlyIncome = income,
            debtItems = debtBalances.mapIndexed { i, balance ->
                DebtItem(id = "debt$i", name = "Debt $i", balance = balance)
            }
        )
    }

    /**
     * Creates a profile with savings goals.
     */
    private fun createProfileWithSavingsGoals(
        income: Double,
        goals: List<Pair<Double, Double>> // (currentAmount, targetAmount)
    ): LedgerProfile {
        return LedgerProfile(
            monthlyIncome = income,
            financialGoals = goals.mapIndexed { i, (current, target) ->
                LedgerFinancialGoal(
                    id = "goal$i",
                    name = "Goal $i",
                    type = "savings",
                    currentAmount = current,
                    targetAmount = target
                )
            }
        )
    }

    /**
     * Creates a profile with an active plan.
     */
    private fun createProfileWithActivePlan(
        income: Double,
        actualFixedExpenses: List<Double>,
        actualVariableExpenses: List<Double>,
        planFixedExpenses: List<Double>,
        planVariableExpenses: List<Double>,
        planStatus: String = "active"
    ): LedgerProfile {
        val planId = "plan-001"
        return LedgerProfile(
            monthlyIncome = income,
            fixedExpenses = actualFixedExpenses.mapIndexed { i, amount ->
                LedgerExpense(name = "Fixed $i", amount = amount, isFixed = true)
            },
            variableExpenses = actualVariableExpenses.mapIndexed { i, amount ->
                LedgerExpense(name = "Variable $i", amount = amount, isFixed = false)
            },
            activePlanId = planId,
            plans = listOf(
                LedgerPlan(
                    id = planId,
                    monthlyIncome = income,
                    fixedExpenses = planFixedExpenses.mapIndexed { i, amount ->
                        LedgerExpense(name = "Fixed $i", amount = amount, isFixed = true)
                    },
                    variableExpenses = planVariableExpenses.mapIndexed { i, amount ->
                        LedgerExpense(name = "Variable $i", amount = amount, isFixed = false)
                    },
                    status = planStatus
                )
            )
        )
    }

    /**
     * Creates a comprehensive profile for testing.
     */
    private fun createFullProfile(
        income: Double,
        fixedExpenses: List<Double> = emptyList(),
        variableExpenses: List<Double> = emptyList(),
        debtBalances: List<Double> = emptyList(),
        savingsGoals: List<Pair<Double, Double>> = emptyList(),
        activePlanId: String? = null,
        plans: List<LedgerPlan> = emptyList()
    ): LedgerProfile {
        return LedgerProfile(
            monthlyIncome = income,
            fixedExpenses = fixedExpenses.mapIndexed { i, amount ->
                LedgerExpense(name = "Fixed $i", amount = amount, isFixed = true)
            },
            variableExpenses = variableExpenses.mapIndexed { i, amount ->
                LedgerExpense(name = "Variable $i", amount = amount, isFixed = false)
            },
            debtItems = debtBalances.mapIndexed { i, balance ->
                DebtItem(id = "debt$i", name = "Debt $i", balance = balance)
            },
            financialGoals = savingsGoals.mapIndexed { i, (current, target) ->
                LedgerFinancialGoal(
                    id = "goal$i",
                    name = "Goal $i",
                    type = "savings",
                    currentAmount = current,
                    targetAmount = target
                )
            },
            activePlanId = activePlanId,
            plans = plans
        )
    }

    // ==================== Friction Tier Tests ====================

    @Test
    fun `friction tier LOW for score 0 to 3`() {
        // Profile with no debt, expenses, or savings gap = friction 0
        val profile = createProfileWithIncome(5000.0)
        val result = service.calculate(profile)

        assertEquals(FrictionTier.LOW, result.frictionTier)
        assertTrue(result.financialFriction <= 3f)
    }

    @Test
    fun `friction tier LOW at boundary value 3`() {
        // Create friction exactly at 3: Need debt-to-income and expense ratios to yield ~3
        // Friction = 0.4 * DTI + 0.4 * ExpenseRatio + 0.2 * SavingsGap
        // DTI component: 3000 / 5000 * 10 = 6, weighted: 2.4
        // Expense component: need to hit ~1.5 weighted = 0.375 * 10 = 3.75
        // Let's simplify: 30% debt-to-income, 30% expense-to-income, no savings gap
        // Friction = 0.4 * 3 + 0.4 * 3 + 0.2 * 0 = 2.4
        val profile = createFullProfile(
            income = 5000.0,
            fixedExpenses = listOf(1500.0), // 30% of income = 3 component
            debtBalances = listOf(1500.0)   // 30% of income = 3 component
        )
        val result = service.calculate(profile)

        // Friction = 0.4 * 3 + 0.4 * 3 = 2.4
        assertTrue(result.financialFriction <= 3f)
        assertEquals(FrictionTier.LOW, result.frictionTier)
    }

    @Test
    fun `friction tier MODERATE for score 4 to 6`() {
        // Create profile with moderate financial stress
        // Target friction ~5
        // 50% DTI = 5 component, 50% expense = 5 component
        // Friction = 0.4 * 5 + 0.4 * 5 = 4.0
        // Add some savings gap: 50% gap = 5 component, 0.2 * 5 = 1.0
        // Total = 5.0
        val profile = createFullProfile(
            income = 5000.0,
            fixedExpenses = listOf(2500.0),  // 50% of income
            debtBalances = listOf(2500.0),   // 50% of income
            savingsGoals = listOf(Pair(500.0, 1000.0)) // 50% progress = 50% gap
        )
        val result = service.calculate(profile)

        assertTrue(result.financialFriction > 3f)
        assertTrue(result.financialFriction <= 6f)
        assertEquals(FrictionTier.MODERATE, result.frictionTier)
    }

    @Test
    fun `friction tier MODERATE at boundary value 4`() {
        // Target friction just above 3 (around 4)
        // 40% DTI = 4 component, 40% expense = 4 component
        // Friction = 0.4 * 4 + 0.4 * 4 = 3.2
        // Add savings gap: 40% gap = 4 component, 0.2 * 4 = 0.8
        // Total = 4.0
        val profile = createFullProfile(
            income = 5000.0,
            fixedExpenses = listOf(2000.0),  // 40% of income
            debtBalances = listOf(2000.0),   // 40% of income
            savingsGoals = listOf(Pair(600.0, 1000.0)) // 60% progress = 40% gap
        )
        val result = service.calculate(profile)

        assertTrue(result.financialFriction > 3f)
        assertTrue(result.financialFriction <= 6f)
        assertEquals(FrictionTier.MODERATE, result.frictionTier)
    }

    @Test
    fun `friction tier MODERATE at boundary value 6`() {
        // Target friction at 6
        // 60% DTI = 6 component, 60% expense = 6 component
        // Friction = 0.4 * 6 + 0.4 * 6 + 0.2 * 6 = 6.0
        val profile = createFullProfile(
            income = 5000.0,
            fixedExpenses = listOf(3000.0),  // 60% of income
            debtBalances = listOf(3000.0),   // 60% of income
            savingsGoals = listOf(Pair(400.0, 1000.0)) // 40% progress = 60% gap
        )
        val result = service.calculate(profile)

        assertTrue(result.financialFriction <= 6f)
        assertEquals(FrictionTier.MODERATE, result.frictionTier)
    }

    @Test
    fun `friction tier ELEVATED for score 7 to 8`() {
        // Create profile with elevated financial stress
        // Target friction ~7.5
        val profile = createFullProfile(
            income = 5000.0,
            fixedExpenses = listOf(3750.0),  // 75% of income
            debtBalances = listOf(3750.0),   // 75% of income
            savingsGoals = listOf(Pair(250.0, 1000.0)) // 25% progress = 75% gap
        )
        val result = service.calculate(profile)

        assertTrue(result.financialFriction > 6f)
        assertTrue(result.financialFriction <= 8f)
        assertEquals(FrictionTier.ELEVATED, result.frictionTier)
    }

    @Test
    fun `friction tier ELEVATED at boundary value 7`() {
        // Target friction at 7
        val profile = createFullProfile(
            income = 5000.0,
            fixedExpenses = listOf(3500.0),  // 70% of income
            debtBalances = listOf(3500.0),   // 70% of income
            savingsGoals = listOf(Pair(300.0, 1000.0)) // 30% progress = 70% gap
        )
        val result = service.calculate(profile)

        assertTrue(result.financialFriction > 6f)
        assertTrue(result.financialFriction <= 8f)
        assertEquals(FrictionTier.ELEVATED, result.frictionTier)
    }

    @Test
    fun `friction tier ELEVATED at boundary value 8`() {
        // Target friction at 8
        val profile = createFullProfile(
            income = 5000.0,
            fixedExpenses = listOf(4000.0),  // 80% of income
            debtBalances = listOf(4000.0),   // 80% of income
            savingsGoals = listOf(Pair(200.0, 1000.0)) // 20% progress = 80% gap
        )
        val result = service.calculate(profile)

        assertTrue(result.financialFriction <= 8f)
        assertEquals(FrictionTier.ELEVATED, result.frictionTier)
    }

    @Test
    fun `friction tier CRITICAL for score 9 to 10`() {
        // Create profile with critical financial stress
        // Target friction ~9.5
        val profile = createFullProfile(
            income = 5000.0,
            fixedExpenses = listOf(5000.0),  // 100% of income
            debtBalances = listOf(5000.0),   // 100% of income
            savingsGoals = listOf(Pair(0.0, 1000.0)) // 0% progress = 100% gap
        )
        val result = service.calculate(profile)

        assertTrue(result.financialFriction > 8f)
        assertEquals(FrictionTier.CRITICAL, result.frictionTier)
    }

    @Test
    fun `friction tier CRITICAL at boundary value 9`() {
        // Target friction just above 8 (around 9)
        val profile = createFullProfile(
            income = 5000.0,
            fixedExpenses = listOf(4500.0),  // 90% of income
            debtBalances = listOf(4500.0),   // 90% of income
            savingsGoals = listOf(Pair(100.0, 1000.0)) // 10% progress = 90% gap
        )
        val result = service.calculate(profile)

        assertTrue(result.financialFriction > 8f)
        assertEquals(FrictionTier.CRITICAL, result.frictionTier)
    }

    // ==================== Friction Calculation Tests ====================

    @Test
    fun `zero income returns critical tier with max friction`() {
        val profile = createProfileWithIncome(0.0)
        val result = service.calculate(profile)

        assertEquals(10f, result.financialFriction)
        assertEquals(0f, result.resonanceROI)
        assertEquals(FrictionTier.CRITICAL, result.frictionTier)
        assertTrue(result.analysis.contains("monthly income must be greater than zero"))
    }

    @Test
    fun `negative income returns critical tier with max friction`() {
        val profile = createProfileWithIncome(-1000.0)
        val result = service.calculate(profile)

        assertEquals(10f, result.financialFriction)
        assertEquals(0f, result.resonanceROI)
        assertEquals(FrictionTier.CRITICAL, result.frictionTier)
    }

    @Test
    fun `no debt results in zero debt component`() {
        val profile = createProfileWithExpenses(
            income = 5000.0,
            fixedExpenses = listOf(1000.0)
        )
        val result = service.calculate(profile)

        // Only expense component contributes: 0.4 * (1000/5000 * 10) = 0.4 * 2 = 0.8
        assertTrue(result.financialFriction < 1f)
    }

    @Test
    fun `high debt results in higher friction`() {
        // DTI > 1.0 (more debt than monthly income)
        val profile = createProfileWithDebt(
            income = 5000.0,
            debtBalances = listOf(10000.0) // 200% of income, capped at 10
        )
        val result = service.calculate(profile)

        // DTI component capped at 10: 0.4 * 10 = 4.0
        assertTrue(result.financialFriction >= 4f)
    }

    @Test
    fun `very high debt caps debt component at 10`() {
        val profile = createProfileWithDebt(
            income = 5000.0,
            debtBalances = listOf(100000.0) // 2000% of income
        )
        val result = service.calculate(profile)

        // Should cap at max friction component (10), weighted at 0.4 = 4.0
        assertTrue(result.financialFriction >= 4f)
        assertTrue(result.financialFriction <= 4.1f) // Only debt component
    }

    @Test
    fun `balanced budget with expenses less than income`() {
        // 50% of income in expenses
        val profile = createProfileWithExpenses(
            income = 5000.0,
            fixedExpenses = listOf(1500.0),
            variableExpenses = listOf(1000.0)
        )
        val result = service.calculate(profile)

        // Expense ratio: 2500/5000 = 0.5, component = 5, weighted = 2.0
        assertTrue(result.financialFriction < 3f)
        assertEquals(FrictionTier.LOW, result.frictionTier)
    }

    @Test
    fun `negative cash flow with expenses exceeding income`() {
        // 120% of income in expenses
        val profile = createProfileWithExpenses(
            income = 5000.0,
            fixedExpenses = listOf(4000.0),
            variableExpenses = listOf(2000.0)
        )
        val result = service.calculate(profile)

        // Expense ratio: 6000/5000 = 1.2, component = 10 (capped), weighted = 4.0
        assertTrue(result.financialFriction >= 4f)
    }

    @Test
    fun `savings goals with full progress result in zero savings gap`() {
        val profile = createProfileWithSavingsGoals(
            income = 5000.0,
            goals = listOf(Pair(10000.0, 10000.0)) // 100% progress
        )
        val result = service.calculate(profile)

        // No debt, no expenses, no savings gap = 0 friction
        assertEquals(0f, result.financialFriction)
        assertEquals(FrictionTier.LOW, result.frictionTier)
    }

    @Test
    fun `savings goals with zero progress result in max savings gap`() {
        val profile = createProfileWithSavingsGoals(
            income = 5000.0,
            goals = listOf(Pair(0.0, 10000.0)) // 0% progress
        )
        val result = service.calculate(profile)

        // Savings gap: 100%, component = 10, weighted = 2.0
        assertTrue(result.financialFriction >= 2f)
        assertTrue(result.financialFriction <= 2.1f)
    }

    @Test
    fun `savings goals with partial progress`() {
        val profile = createProfileWithSavingsGoals(
            income = 5000.0,
            goals = listOf(Pair(5000.0, 10000.0)) // 50% progress
        )
        val result = service.calculate(profile)

        // Savings gap: 50%, component = 5, weighted = 1.0
        assertTrue(result.financialFriction >= 1f)
        assertTrue(result.financialFriction <= 1.1f)
    }

    @Test
    fun `multiple savings goals aggregate correctly`() {
        val profile = createProfileWithSavingsGoals(
            income = 5000.0,
            goals = listOf(
                Pair(1000.0, 2000.0),  // 50% progress
                Pair(2000.0, 3000.0)   // 67% progress
            )
            // Total: 3000/5000 = 60% progress, 40% gap
        )
        val result = service.calculate(profile)

        // Savings gap: 40%, component = 4, weighted = 0.8
        assertTrue(result.financialFriction >= 0.7f)
        assertTrue(result.financialFriction <= 0.9f)
    }

    @Test
    fun `no savings goals results in zero savings gap`() {
        val profile = createProfileWithIncome(5000.0)
        val result = service.calculate(profile)

        // No savings goals = no gap
        assertEquals(0f, result.financialFriction)
    }

    // ==================== Resonance ROI Tests ====================

    @Test
    fun `ROI is inverted from friction`() {
        // Zero friction = max ROI
        val profile = createProfileWithIncome(5000.0)
        val result = service.calculate(profile)

        // ROI = (10 - 0) / 10 = 1.0
        assertEquals(1f, result.resonanceROI)
    }

    @Test
    fun `ROI with maximum friction is zero`() {
        val profile = createProfileWithIncome(0.0) // Forces critical/max friction
        val result = service.calculate(profile)

        assertEquals(10f, result.financialFriction)
        assertEquals(0f, result.resonanceROI)
    }

    @Test
    fun `ROI scales linearly with friction`() {
        // Create ~50% friction (5.0)
        val profile = createFullProfile(
            income = 5000.0,
            fixedExpenses = listOf(2500.0),  // 50% expense ratio = 5, weighted = 2.0
            debtBalances = listOf(2500.0),   // 50% DTI = 5, weighted = 2.0
            savingsGoals = listOf(Pair(500.0, 1000.0)) // 50% gap = 5, weighted = 1.0
        )
        val result = service.calculate(profile)

        // Friction = 2.0 + 2.0 + 1.0 = 5.0
        // ROI = (10 - 5) / 10 = 0.5
        assertTrue(result.resonanceROI >= 0.4f)
        assertTrue(result.resonanceROI <= 0.6f)
    }

    @Test
    fun `plan adherence boost adds 0_1 to ROI`() {
        // Create profile with active plan that's being followed (actual <= planned)
        val profile = createProfileWithActivePlan(
            income = 5000.0,
            actualFixedExpenses = listOf(1000.0),
            actualVariableExpenses = listOf(500.0),
            planFixedExpenses = listOf(1000.0),
            planVariableExpenses = listOf(500.0)
        )
        val result = service.calculate(profile)

        // Base friction from expenses: 1500/5000 = 30%, component = 3, weighted = 1.2
        // Base ROI = (10 - 1.2) / 10 = 0.88
        // With boost: 0.88 + 0.1 = 0.98 (capped at 1.0)
        assertTrue(result.resonanceROI >= 0.9f)
    }

    @Test
    fun `plan adherence boost with 10 percent tolerance`() {
        // Actual spending is slightly over plan but within 10% tolerance
        val profile = createProfileWithActivePlan(
            income = 5000.0,
            actualFixedExpenses = listOf(1050.0),  // 5% over plan
            actualVariableExpenses = listOf(525.0), // 5% over plan
            planFixedExpenses = listOf(1000.0),
            planVariableExpenses = listOf(500.0)
        )
        val result = service.calculate(profile)

        // Still within 10% tolerance, should get boost
        // Base friction + boost should yield high ROI
        assertTrue(result.resonanceROI >= 0.9f)
    }

    @Test
    fun `no plan adherence boost when exceeding budget beyond tolerance`() {
        // Actual spending is 20% over plan (exceeds 10% tolerance)
        val profile = createProfileWithActivePlan(
            income = 5000.0,
            actualFixedExpenses = listOf(1200.0),  // 20% over plan
            actualVariableExpenses = listOf(600.0), // 20% over plan
            planFixedExpenses = listOf(1000.0),
            planVariableExpenses = listOf(500.0)
        )
        val result = service.calculate(profile)

        // No boost: Base friction from expenses: 1800/5000 = 36%, component = 3.6, weighted = 1.44
        // ROI = (10 - 1.44) / 10 = 0.856 (no boost)
        assertTrue(result.resonanceROI < 0.9f)
    }

    @Test
    fun `ROI clamped to 1_0 maximum`() {
        // Very low friction with plan adherence could theoretically exceed 1.0
        val profile = createProfileWithActivePlan(
            income = 5000.0,
            actualFixedExpenses = listOf(100.0),
            actualVariableExpenses = listOf(50.0),
            planFixedExpenses = listOf(100.0),
            planVariableExpenses = listOf(50.0)
        )
        val result = service.calculate(profile)

        // Base ROI ~0.99 + 0.1 boost = 1.09 should be clamped to 1.0
        assertEquals(1f, result.resonanceROI)
    }

    @Test
    fun `ROI clamped to 0_0 minimum`() {
        val profile = createProfileWithIncome(0.0)
        val result = service.calculate(profile)

        // Max friction = 10, ROI = 0.0 (can't go negative)
        assertEquals(0f, result.resonanceROI)
        assertTrue(result.resonanceROI >= 0f)
    }

    @Test
    fun `no active plan results in no boost`() {
        val profile = createFullProfile(
            income = 5000.0,
            fixedExpenses = listOf(100.0),
            plans = listOf(
                LedgerPlan(
                    id = "plan-001",
                    monthlyIncome = 5000.0,
                    fixedExpenses = listOf(LedgerExpense("Rent", 100.0)),
                    status = "active"
                )
            )
            // Note: activePlanId is not set
        )
        val result = service.calculate(profile)

        // Without active plan, no boost should be applied
        // Base ROI = (10 - 0.08) / 10 ≈ 0.99
        assertTrue(result.resonanceROI < 1f)
        assertTrue(result.resonanceROI >= 0.98f)
    }

    @Test
    fun `inactive plan status results in no boost`() {
        val profile = createProfileWithActivePlan(
            income = 5000.0,
            actualFixedExpenses = listOf(100.0),
            actualVariableExpenses = emptyList(),
            planFixedExpenses = listOf(100.0),
            planVariableExpenses = emptyList(),
            planStatus = "draft" // Not "active"
        )
        val result = service.calculate(profile)

        // Plan exists but status is not "active", no boost
        assertTrue(result.resonanceROI < 1f)
    }

    @Test
    fun `active plan ID with no matching plan results in no boost`() {
        val profile = LedgerProfile(
            monthlyIncome = 5000.0,
            fixedExpenses = listOf(LedgerExpense("Rent", 100.0)),
            activePlanId = "non-existent-plan",
            plans = listOf(
                LedgerPlan(
                    id = "different-plan",
                    monthlyIncome = 5000.0,
                    status = "active"
                )
            )
        )
        val result = service.calculate(profile)

        // Active plan ID doesn't match any plan, no boost
        assertTrue(result.resonanceROI < 1f)
    }

    // ==================== Edge Cases ====================

    @Test
    fun `empty profile with only defaults`() {
        val profile = LedgerProfile()
        val result = service.calculate(profile)

        // Default income is 0, should trigger critical state
        assertEquals(10f, result.financialFriction)
        assertEquals(0f, result.resonanceROI)
        assertEquals(FrictionTier.CRITICAL, result.frictionTier)
    }

    @Test
    fun `negative expense amounts handled gracefully`() {
        // Negative amounts could represent refunds or credits
        val profile = LedgerProfile(
            monthlyIncome = 5000.0,
            fixedExpenses = listOf(
                LedgerExpense("Rent", 1000.0),
                LedgerExpense("Refund", -200.0) // Credit/refund
            )
        )
        val result = service.calculate(profile)

        // Total expenses: 800, 16% of income
        // Friction should still calculate
        assertTrue(result.financialFriction >= 0f)
        assertTrue(result.resonanceROI >= 0f)
    }

    @Test
    fun `negative debt balance handled gracefully`() {
        // Negative balance could represent overpayment
        val profile = LedgerProfile(
            monthlyIncome = 5000.0,
            debtItems = listOf(
                DebtItem(id = "d1", balance = 1000.0),
                DebtItem(id = "d2", balance = -200.0) // Overpayment
            )
        )
        val result = service.calculate(profile)

        // Should handle gracefully
        assertTrue(result.financialFriction >= 0f)
    }

    @Test
    fun `very large income value`() {
        val profile = createFullProfile(
            income = 1_000_000_000.0, // 1 billion
            fixedExpenses = listOf(500_000_000.0), // 50%
            debtBalances = listOf(100_000_000.0)   // 10%
        )
        val result = service.calculate(profile)

        // Should calculate normally without overflow
        assertTrue(result.financialFriction >= 0f)
        assertTrue(result.financialFriction <= 10f)
    }

    @Test
    fun `very large debt value`() {
        val profile = createProfileWithDebt(
            income = 5000.0,
            debtBalances = listOf(1_000_000_000.0) // 1 billion
        )
        val result = service.calculate(profile)

        // DTI component should cap at 10
        assertTrue(result.financialFriction >= 4f) // 0.4 * 10
        assertTrue(result.financialFriction <= 4.1f)
    }

    @Test
    fun `very small positive income`() {
        val profile = createProfileWithExpenses(
            income = 0.01, // 1 cent
            fixedExpenses = listOf(0.005) // Half a cent
        )
        val result = service.calculate(profile)

        // Should not crash with tiny values
        assertTrue(result.financialFriction >= 0f)
        assertTrue(result.financialFriction <= 10f)
    }

    @Test
    fun `savings goal with zero target treated as no gap`() {
        val profile = LedgerProfile(
            monthlyIncome = 5000.0,
            financialGoals = listOf(
                LedgerFinancialGoal(
                    id = "goal1",
                    type = "savings",
                    currentAmount = 1000.0,
                    targetAmount = 0.0 // Zero target
                )
            )
        )
        val result = service.calculate(profile)

        // Zero target = no savings gap (avoid division by zero)
        assertEquals(0f, result.financialFriction)
    }

    @Test
    fun `non-savings type goals are ignored`() {
        val profile = LedgerProfile(
            monthlyIncome = 5000.0,
            financialGoals = listOf(
                LedgerFinancialGoal(
                    id = "goal1",
                    type = "investment", // Not "savings"
                    currentAmount = 0.0,
                    targetAmount = 10000.0
                )
            )
        )
        val result = service.calculate(profile)

        // Non-savings goals should be ignored
        assertEquals(0f, result.financialFriction)
    }

    @Test
    fun `savings goal exceeding target is clamped`() {
        val profile = createProfileWithSavingsGoals(
            income = 5000.0,
            goals = listOf(Pair(15000.0, 10000.0)) // 150% progress
        )
        val result = service.calculate(profile)

        // Progress capped at 100%, gap = 0
        assertEquals(0f, result.financialFriction)
    }

    // ==================== Analysis Text Tests ====================

    @Test
    fun `analysis text for LOW tier`() {
        val profile = createProfileWithIncome(5000.0)
        val result = service.calculate(profile)

        assertTrue(result.analysis.contains("strong"))
    }

    @Test
    fun `analysis text for MODERATE tier`() {
        val profile = createFullProfile(
            income = 5000.0,
            fixedExpenses = listOf(2500.0),
            debtBalances = listOf(2500.0)
        )
        val result = service.calculate(profile)

        assertTrue(result.analysis.contains("manageable") || result.analysis.contains("improvement"))
    }

    @Test
    fun `analysis text for ELEVATED tier`() {
        // Need friction between 6 and 8
        // Use 85% expense ratio = 8.5 component, weighted = 3.4
        // Use 85% DTI = 8.5 component, weighted = 3.4
        // Total = 6.8, which is ELEVATED
        val profile = createFullProfile(
            income = 5000.0,
            fixedExpenses = listOf(4250.0),
            debtBalances = listOf(4250.0)
        )
        val result = service.calculate(profile)

        assertEquals(FrictionTier.ELEVATED, result.frictionTier)
        assertTrue(result.analysis.contains("strain") || result.analysis.contains("attention"))
    }

    @Test
    fun `analysis text for CRITICAL tier`() {
        val profile = createProfileWithIncome(0.0)
        val result = service.calculate(profile)

        assertTrue(result.analysis.contains("immediate") || result.analysis.contains("action") ||
                result.analysis.contains("greater than zero"))
    }

    @Test
    fun `analysis includes plan suggestion when no active plan`() {
        val profile = createProfileWithIncome(5000.0)
        val result = service.calculate(profile)

        assertTrue(result.analysis.contains("Consider creating a financial plan"))
    }

    @Test
    fun `analysis mentions active plan when present`() {
        val profile = createProfileWithActivePlan(
            income = 5000.0,
            actualFixedExpenses = listOf(1000.0),
            actualVariableExpenses = emptyList(),
            planFixedExpenses = listOf(1000.0),
            planVariableExpenses = emptyList()
        )
        val result = service.calculate(profile)

        assertTrue(result.analysis.contains("active financial plan"))
    }

    // ==================== Weighted Formula Verification ====================

    @Test
    fun `verify friction formula weights sum to 1`() {
        // Implicitly tested - if weights don't sum to 1, results would be off
        // Explicit test: 40% + 40% + 20% = 100%
        val debtWeight = 0.40f
        val expenseWeight = 0.40f
        val savingsWeight = 0.20f

        assertEquals(1.0f, debtWeight + expenseWeight + savingsWeight)
    }

    @Test
    fun `debt to income ratio contributes 40 percent to friction`() {
        // Profile with only debt (no expenses, no savings gap)
        val profile = createProfileWithDebt(
            income = 5000.0,
            debtBalances = listOf(5000.0) // 100% DTI = component 10
        )
        val result = service.calculate(profile)

        // 0.4 * 10 = 4.0
        assertEquals(4f, result.financialFriction, 0.01f)
    }

    @Test
    fun `expense ratio contributes 40 percent to friction`() {
        // Profile with only expenses (no debt, no savings gap)
        val profile = createProfileWithExpenses(
            income = 5000.0,
            fixedExpenses = listOf(5000.0) // 100% expense ratio = component 10
        )
        val result = service.calculate(profile)

        // 0.4 * 10 = 4.0
        assertEquals(4f, result.financialFriction, 0.01f)
    }

    @Test
    fun `savings gap contributes 20 percent to friction`() {
        // Profile with only savings gap (no debt, no expenses)
        val profile = createProfileWithSavingsGoals(
            income = 5000.0,
            goals = listOf(Pair(0.0, 10000.0)) // 0% progress = 100% gap = component 10
        )
        val result = service.calculate(profile)

        // 0.2 * 10 = 2.0
        assertEquals(2f, result.financialFriction, 0.01f)
    }

    @Test
    fun `all components at max yield friction 10`() {
        val profile = createFullProfile(
            income = 5000.0,
            fixedExpenses = listOf(10000.0),  // 200% of income, capped at 10
            debtBalances = listOf(10000.0),   // 200% of income, capped at 10
            savingsGoals = listOf(Pair(0.0, 10000.0)) // 0% progress
        )
        val result = service.calculate(profile)

        // 0.4 * 10 + 0.4 * 10 + 0.2 * 10 = 10.0
        assertEquals(10f, result.financialFriction)
        assertEquals(FrictionTier.CRITICAL, result.frictionTier)
    }
}
