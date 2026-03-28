package com.agnes.nexus.core.engine.personas.ledger

import com.agnes.nexus.core.domain.models.LedgerProfile
import com.agnes.nexus.core.domain.models.LedgerBudgetCategory
import com.agnes.nexus.core.domain.models.LedgerFinancialGoal
import com.agnes.nexus.core.domain.models.DebtItem

/**
 * Ledger prompt builder for mode-scoped conversations.
 * 
 * Supports four conversation modes:
 * - GENERAL: Full financial advising with all actions
 * - BUDGET_REVIEW: Scoped to a single budget category
 * - GOAL_FOCUS: Scoped to a single financial goal
 * - FIELD_CRUD: Schema management only (no user financial data)
 */
object LedgerPromptBuilder {

    /**
     * Conversation mode for Ledger AI interactions.
     */
    enum class LedgerContextMode {
        GENERAL,        // Full financial advising (all actions)
        BUDGET_REVIEW,  // Scoped to single budget category
        GOAL_FOCUS,     // Scoped to single financial goal
        FIELD_CRUD      // Schema management only (no financial data)
    }

    /**
     * Result of building a mode-scoped prompt.
     */
    data class PromptModeResult(
        val systemPrompt: String,
        val allowedActions: List<String>,
        val contextInjection: String,
        val persistent: Boolean
    )

    /**
     * All Ledger action tags by category.
     */
    private val PLAN_ACTIONS = listOf(
        "create_financial_plan",
        "update_budget_snapshot"
    )

    private val METRIC_ACTIONS = listOf(
        "update_financial_friction",
        "compute_resonance_roi",
        "financial_health_check"
    )

    private val TRANSACTION_ACTIONS = listOf(
        "add_transaction",
        "create_transaction",
        "update_transaction",
        "delete_transaction"
    )

    private val GOAL_ACTIONS = listOf(
        "set_financial_goal",
        "update_goal_progress",
        "complete_goal"
    )

    private val DEBT_ACTIONS = listOf(
        "run_debt_simulation"
    )

    private val REMINDER_ACTIONS = listOf(
        "propose_reminder",
        "query_reminders"
    )

    private val DOCUMENT_ACTIONS = listOf(
        "analyze_financial_document"
    )

    private val CROSS_MODULE_ACTIONS = listOf(
        "detect_data_hint",
        "detect_risk"
    )

    private val FIELD_ACTIONS = listOf(
        "suggest_field",
        "create_field",
        "delete_field",
        "update_field",
        "set_field_value"
    )

    private val ALL_ACTIONS = PLAN_ACTIONS + METRIC_ACTIONS + TRANSACTION_ACTIONS + 
        GOAL_ACTIONS + DEBT_ACTIONS + REMINDER_ACTIONS + DOCUMENT_ACTIONS + 
        CROSS_MODULE_ACTIONS + FIELD_ACTIONS

    /**
     * Build a mode-scoped prompt for Ledger conversations.
     *
     * @param mode The conversation mode
     * @param profile The user's Ledger profile (null for FIELD_CRUD mode)
     * @param focusCategory For BUDGET_REVIEW mode, the category to focus on
     * @param focusGoal For GOAL_FOCUS mode, the goal to focus on
     * @return PromptModeResult with scoped prompt and allowed actions
     */
    fun buildLedgerPrompt(
        mode: LedgerContextMode,
        profile: LedgerProfile? = null,
        focusCategory: LedgerBudgetCategory? = null,
        focusGoal: LedgerFinancialGoal? = null
    ): PromptModeResult {
        return when (mode) {
            LedgerContextMode.GENERAL -> buildGeneralPrompt(profile)
            LedgerContextMode.BUDGET_REVIEW -> buildBudgetReviewPrompt(profile, focusCategory)
            LedgerContextMode.GOAL_FOCUS -> buildGoalFocusPrompt(profile, focusGoal)
            LedgerContextMode.FIELD_CRUD -> buildFieldCrudPrompt()
        }
    }

    /**
     * GENERAL mode: Full financial advising with all profile context.
     */
    private fun buildGeneralPrompt(profile: LedgerProfile?): PromptModeResult {
        val contextInjection = if (profile != null) {
            buildFullProfileContext(profile)
        } else {
            "No profile data available. Begin with onboarding."
        }

        return PromptModeResult(
            systemPrompt = LedgerPersonaPrompts.base.systemPrompt,
            allowedActions = ALL_ACTIONS,
            contextInjection = contextInjection,
            persistent = true
        )
    }

    /**
     * BUDGET_REVIEW mode: Deep-dive on a single budget category.
     */
    private fun buildBudgetReviewPrompt(
        profile: LedgerProfile?,
        category: LedgerBudgetCategory?
    ): PromptModeResult {
        val contextInjection = buildString {
            appendLine("BUDGET REVIEW MODE")
            appendLine("You are analyzing a specific budget category in detail.")
            appendLine()
            
            if (category != null) {
                appendLine("FOCUS CATEGORY:")
                appendLine("- Name: ${category.name}")
                appendLine("- Allocated: ${profile?.currency ?: "$"}${category.allocated}")
                appendLine("- Spent: ${profile?.currency ?: "$"}${category.spent}")
                val remaining = category.allocated - category.spent
                val percentUsed = if (category.allocated > 0) {
                    ((category.spent / category.allocated) * 100).toInt()
                } else 0
                appendLine("- Remaining: ${profile?.currency ?: "$"}$remaining ($percentUsed% used)")
                appendLine()
                
                // Find related transactions
                val relatedTransactions = profile?.transactions
                    ?.filter { it.category.equals(category.name, ignoreCase = true) }
                    ?.takeLast(10)
                
                if (!relatedTransactions.isNullOrEmpty()) {
                    appendLine("RECENT TRANSACTIONS IN THIS CATEGORY:")
                    relatedTransactions.forEach { tx ->
                        appendLine("- ${tx.date}: ${tx.description} - ${profile.currency ?: "$"}${tx.amount}")
                    }
                }
            } else {
                appendLine("No specific category selected. Ask user which category to review.")
            }
        }

        val allowedActions = TRANSACTION_ACTIONS + METRIC_ACTIONS + REMINDER_ACTIONS + 
            listOf("update_budget_snapshot")

        return PromptModeResult(
            systemPrompt = LedgerPersonaPrompts.base.systemPrompt + """
                
BUDGET REVIEW MODE INSTRUCTIONS:
- Focus analysis on the specified budget category
- Identify spending patterns within this category
- Suggest optimizations specific to this category
- Do not provide broad financial advice outside this category scope
- You may suggest adjusting allocations based on analysis
            """.trimIndent(),
            allowedActions = allowedActions,
            contextInjection = contextInjection,
            persistent = false
        )
    }

    /**
     * GOAL_FOCUS mode: Progress review for a single financial goal.
     */
    private fun buildGoalFocusPrompt(
        profile: LedgerProfile?,
        goal: LedgerFinancialGoal?
    ): PromptModeResult {
        val contextInjection = buildString {
            appendLine("GOAL FOCUS MODE")
            appendLine("You are tracking progress on a specific financial goal.")
            appendLine()
            
            if (goal != null) {
                appendLine("FOCUS GOAL:")
                appendLine("- Name: ${goal.name}")
                appendLine("- Type: ${goal.type}")
                appendLine("- Target: ${profile?.currency ?: "$"}${goal.targetAmount}")
                appendLine("- Current: ${profile?.currency ?: "$"}${goal.currentAmount}")
                val percentComplete = if (goal.targetAmount > 0) {
                    ((goal.currentAmount / goal.targetAmount) * 100).toInt()
                } else 0
                appendLine("- Progress: $percentComplete%")
                appendLine("- Monthly Contribution: ${profile?.currency ?: "$"}${goal.monthlyContribution}")
                appendLine("- Priority: ${goal.priority}")
                goal.targetDate?.let { appendLine("- Target Date: $it") }
                appendLine()
                
                // Calculate projections
                if (goal.monthlyContribution > 0 && goal.targetAmount > goal.currentAmount) {
                    val remaining = goal.targetAmount - goal.currentAmount
                    val monthsToGoal = (remaining / goal.monthlyContribution).toInt()
                    appendLine("PROJECTION: At current contribution rate, goal will be reached in ~$monthsToGoal months.")
                }
            } else {
                appendLine("No specific goal selected. Ask user which goal to review.")
            }
        }

        val allowedActions = GOAL_ACTIONS + METRIC_ACTIONS + REMINDER_ACTIONS

        return PromptModeResult(
            systemPrompt = LedgerPersonaPrompts.base.systemPrompt + """
                
GOAL FOCUS MODE INSTRUCTIONS:
- Focus on progress toward the specified goal
- Provide projections and timeline estimates
- Suggest contribution adjustments if needed
- Celebrate milestones and progress
- Do not provide broad financial advice outside this goal scope
            """.trimIndent(),
            allowedActions = allowedActions,
            contextInjection = contextInjection,
            persistent = false
        )
    }

    /**
     * FIELD_CRUD mode: Schema management only (no user financial data).
     * 
     * SECURITY: This mode intentionally excludes all user financial data
     * to prevent data leakage during field management operations.
     */
    private fun buildFieldCrudPrompt(): PromptModeResult {
        val contextInjection = """
FIELD MANAGEMENT MODE
You are managing custom extension fields for the Ledger module.
You can suggest, create, update, or delete custom fields.

SECURITY NOTE: No user financial data is included in this context.
Focus only on schema management operations.

Available field types:
- text: Free-form text input
- number: Numeric values
- currency: Monetary amounts
- date: Date values
- boolean: Yes/no toggles
- select: Dropdown selection from options

Suggested extension fields for Ledger:
- Side hustle income (currency)
- Crypto portfolio value (currency)
- Emergency fund months (number)
- Net worth (currency)
- Credit score (number)
- Tax bracket (select)
        """.trimIndent()

        return PromptModeResult(
            systemPrompt = """
IDENTITY:
You are LEDGER's field management assistant.
Your role is to help users customize their financial tracking with extension fields.

CAPABILITIES:
- Suggest useful custom fields based on user needs
- Create new fields with appropriate types and validation
- Update field definitions
- Delete fields that are no longer needed

CONSTRAINTS:
- Only perform field management operations
- Do not provide financial advice in this mode
- Do not access or reference user financial data
            """.trimIndent(),
            allowedActions = FIELD_ACTIONS,
            contextInjection = contextInjection,
            persistent = false
        )
    }

    /**
     * Build full profile context for GENERAL mode.
     */
    private fun buildFullProfileContext(profile: LedgerProfile): String = buildString {
        appendLine("CURRENT FINANCIAL STATE:")
        appendLine()
        
        // Income & Overview
        appendLine("INCOME & OVERVIEW:")
        appendLine("- Monthly Income: ${profile.currency ?: "$"}${profile.monthlyIncome}")
        appendLine("- Planning Horizon: ${profile.planningHorizon}")
        appendLine("- Onboarding Complete: ${profile.onboardingComplete}")
        profile.financialFriction?.let { 
            appendLine("- Financial Friction: $it/10 (${frictionTierLabel(it)})")
        }
        profile.resonanceROI?.let {
            appendLine("- Resonance ROI: $it")
        }
        appendLine()
        
        // Expenses
        val totalFixed = profile.fixedExpenses.sumOf { it.amount }
        val totalVariable = profile.variableExpenses.sumOf { it.amount }
        appendLine("EXPENSES:")
        appendLine("- Fixed Expenses: ${profile.currency ?: "$"}$totalFixed")
        if (profile.fixedExpenses.isNotEmpty()) {
            profile.fixedExpenses.take(5).forEach { expense ->
                appendLine("  • ${expense.name}: ${profile.currency ?: "$"}${expense.amount}")
            }
        }
        appendLine("- Variable Expenses: ${profile.currency ?: "$"}$totalVariable")
        if (profile.variableExpenses.isNotEmpty()) {
            profile.variableExpenses.take(5).forEach { expense ->
                appendLine("  • ${expense.name}: ${profile.currency ?: "$"}${expense.amount}")
            }
        }
        appendLine()
        
        // Debt
        if (profile.debtItems.isNotEmpty()) {
            val totalDebt = profile.debtItems.sumOf { it.balance }
            appendLine("DEBT:")
            appendLine("- Total Debt: ${profile.currency ?: "$"}$totalDebt")
            profile.debtItems.forEach { debt ->
                val aprStr = debt.apr?.let { apr -> " (${(apr * 100).toInt()}% APR)" } ?: ""
                appendLine("  • ${debt.name}: ${profile.currency ?: "$"}${debt.balance}$aprStr")
            }
            appendLine()
        }
        
        // Goals
        if (profile.financialGoals.isNotEmpty()) {
            appendLine("FINANCIAL GOALS:")
            profile.financialGoals.forEach { goal ->
                val percentComplete = if (goal.targetAmount > 0) {
                    ((goal.currentAmount / goal.targetAmount) * 100).toInt()
                } else 0
                appendLine("  • ${goal.name}: ${profile.currency ?: "$"}${goal.currentAmount}/${goal.targetAmount} ($percentComplete%)")
            }
            appendLine()
        }
        
        // Active Plan
        val activePlan = profile.plans.find { it.id == profile.activePlanId }
        if (activePlan != null) {
            appendLine("ACTIVE PLAN:")
            appendLine("- Status: Active")
            appendLine("- Monthly Savings Target: ${profile.currency ?: "$"}${activePlan.savingsGoal ?: 0}")
        } else {
            appendLine("ACTIVE PLAN: None")
        }
        
        // Budget Categories
        if (profile.budgetCategories.isNotEmpty()) {
            appendLine()
            appendLine("BUDGET CATEGORIES:")
            profile.budgetCategories.forEach { cat ->
                val percentUsed = if (cat.allocated > 0) {
                    ((cat.spent / cat.allocated) * 100).toInt()
                } else 0
                appendLine("  • ${cat.name}: ${profile.currency ?: "$"}${cat.spent}/${cat.allocated} ($percentUsed% used)")
            }
        }
        
        // Recent Transactions Summary
        if (profile.transactions.isNotEmpty()) {
            appendLine()
            appendLine("RECENT ACTIVITY: ${profile.transactions.size} transactions on record")
            val recentExpenses = profile.transactions
                .filter { it.type == "expense" }
                .takeLast(5)
                .sumOf { it.amount }
            appendLine("- Last 5 expenses total: ${profile.currency ?: "$"}$recentExpenses")
        }
    }

    /**
     * Convert friction score to tier label.
     */
    private fun frictionTierLabel(score: Float): String = when {
        score <= 3 -> "Sustainable"
        score <= 6 -> "Moderate"
        score <= 8 -> "Elevated"
        else -> "Critical"
    }
}
