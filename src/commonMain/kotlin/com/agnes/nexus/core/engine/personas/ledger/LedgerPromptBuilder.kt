package com.agnes.nexus.core.engine.personas.ledger

import com.agnes.nexus.core.domain.automation.AUTOMATION_ACTION_IDS
import com.agnes.nexus.core.domain.models.FieldDefinition
import com.agnes.nexus.core.domain.models.FieldType
import com.agnes.nexus.core.domain.models.LedgerBudgetCategory
import com.agnes.nexus.core.domain.models.LedgerFinancialGoal
import com.agnes.nexus.core.domain.models.LedgerProfile
import com.agnes.nexus.core.domain.models.DebtItem
import kotlinx.datetime.Clock
import kotlinx.datetime.TimeZone
import kotlinx.datetime.todayIn
import kotlin.math.abs
import kotlin.math.ceil
import kotlin.math.max
import kotlin.math.min
import kotlin.math.roundToInt

// =============================================================================
// Context Mode (sealed class at package level for external usage)
// =============================================================================

/**
 * Conversation mode for Ledger AI interactions.
 * Each variant carries the data needed for its scoped prompt.
 */
sealed class LedgerContextMode {
    /** Full financial advising — all actions, full profile context. */
    data object General : LedgerContextMode()

    /** Scoped to a single budget category with recent transactions. */
    data class BudgetReview(val budget: BudgetSnapshot) : LedgerContextMode()

    /** Scoped to a single financial goal with projections. */
    data class GoalFocus(val goal: GoalSnapshot) : LedgerContextMode()

    /** Schema management only — NO user financial data. */
    data class FieldCrud(val currentExtensions: List<FieldDefinition>) : LedgerContextMode()

    val kind: String
        get() = when (this) {
            is General -> "general"
            is BudgetReview -> "budget-review"
            is GoalFocus -> "goal-focus"
            is FieldCrud -> "field-crud"
        }
}

// =============================================================================
// Diagnosis Context Policy
// =============================================================================

enum class LedgerDiagnosisContextPolicy {
    /** Full financial context access — reference historical data, budgets, patterns. */
    WITH_CONTEXT,
    /** Isolated — analyze only the uploaded document. */
    ISOLATED
}

// =============================================================================
// Data Classes
// =============================================================================

/**
 * A linked financial account (checking, savings, investment, credit card, cash, other).
 */
data class LedgerAccount(
    val id: String,
    val name: String,
    val type: String, // checking, savings, investment, credit_card, cash, other
    val balance: Double,
    val institutionName: String? = null,
    val lastFour: String? = null,
    val isDefault: Boolean = false
)

/**
 * Budget snapshot for budget-review mode.
 */
data class BudgetSnapshot(
    val categoryName: String,
    val allocated: Double,
    val spent: Double,
    val remaining: Double,
    val percentUsed: Double,
    val recentTransactions: List<BudgetTransaction> = emptyList(),
    val currency: String = "USD",
    val period: String = "monthly" // "monthly" | "weekly"
)

data class BudgetTransaction(
    val date: String,
    val description: String,
    val amount: Double
)

/**
 * Goal snapshot for goal-focus mode.
 */
data class GoalSnapshot(
    val id: String,
    val name: String,
    val targetAmount: Double,
    val currentAmount: Double,
    val targetDate: String? = null,
    val monthlyContribution: Double = 0.0,
    val projectedDate: String? = null,
    val percentComplete: Double,
    val currency: String = "USD"
)

/**
 * A budget line item (fixed or variable expense entry).
 */
data class BudgetLineItem(
    val label: String,
    val amount: Double
)

/**
 * A recurring transaction rule.
 */
data class RecurringRule(
    val id: String,
    val description: String,
    val amount: Double,
    val type: String, // "expense" | "income"
    val frequency: String, // daily | weekly | biweekly | monthly | quarterly | yearly
    val isActive: Boolean = true,
    val autoPost: Boolean = false
)

/**
 * An upcoming bill computed from recurring rules.
 */
data class UpcomingBill(
    val dueDateFormatted: String,
    val description: String,
    val amount: Double,
    val type: String,
    val frequency: String
)

/**
 * Cash flow forecast result.
 */
data class CashFlowForecast(
    val lowestPoint: ForecastPoint,
    val endBalance: Double,
    val horizon: Int // days
)

data class ForecastPoint(
    val balance: Double,
    val date: String
)

/**
 * A financial plan.
 */
data class FinancialPlan(
    val id: String,
    val title: String,
    val summary: String,
    val monthlyTarget: Double,
    val allocation: PlanAllocation,
    val tasks: List<String> = emptyList(),
    val status: String = "active"
)

data class PlanAllocation(
    val essentials: Int,
    val growth: Int,
    val buffer: Int
)

/**
 * A subscription service.
 */
data class LedgerSubscription(
    val id: String,
    val name: String,
    val amount: Double,
    val billingCycle: String, // monthly | quarterly | yearly | weekly
    val status: String, // active | trial | paused | cancelled
    val monthlyEquivalent: Double,
    val trialEndsAt: String? = null
)

/**
 * An investment position (for prompt context serialization).
 */
data class LedgerInvestmentPosition(
    val name: String,
    val ticker: String? = null,
    val currentValue: Double,
    val totalCost: Double
)

/**
 * An alert rule.
 */
data class LedgerAlertRule(
    val id: String,
    val label: String,
    val isEnabled: Boolean,
    val threshold: Double? = null
)

/**
 * A credit score entry.
 */
data class LedgerCreditScoreEntry(
    val score: Int,
    val bureau: String,
    val recordedAt: String // ISO 8601
)

/**
 * An insurance policy.
 */
data class LedgerInsurancePolicyEntry(
    val id: String,
    val name: String,
    val type: String,
    val monthlyPremium: Double,
    val isActive: Boolean,
    val nextRenewalDate: String
)

/**
 * A retirement projection.
 */
data class LedgerRetirementProjection(
    val onTrack: Boolean,
    val projectedNestEgg: Double,
    val fourPercentRuleMonthly: Double,
    val shortfallOrSurplus: Double
)

/**
 * A simple transaction reference for spending pattern analysis.
 */
data class SimpleTransaction(
    val date: String,
    val description: String,
    val amount: Double,
    val type: String, // "expense" | "income"
    val category: String = "Other"
)

/**
 * Net worth snapshot.
 */
data class NetWorthSnapshotEntry(
    val date: String,
    val netWorth: Double
)

/**
 * Result of building a mode-scoped prompt.
 */
data class LedgerPromptModeResult(
    val systemPrompt: String,
    val allowedActions: List<String>,
    val persistent: Boolean
)

// =============================================================================
// Ledger Prompt Builder
// =============================================================================

/**
 * Ledger prompt builder — full parity with TS `ledger-prompt-builder.ts`.
 *
 * Supports four conversation modes:
 * - General: Full financial advising with all actions
 * - BudgetReview: Scoped to a single budget category
 * - GoalFocus: Scoped to a single financial goal
 * - FieldCrud: Schema management only (no user financial data)
 *
 * Plus: financial context serialization, extension field serialization,
 * friction/ROI prompts, and diagnosis mode.
 */
object LedgerPromptBuilder {

    // =========================================================================
    // Action Definitions Per Scope
    // =========================================================================

    val SCOPE_ACTIONS: Map<String, List<String>> = mapOf(
        "general" to listOf(
            "create_financial_plan",
            "create_financial_plan_request",
            "update_budget_snapshot",
            "update_financial_friction",
            "compute_resonance_roi",
            "analyze_financial_document",
            "log_transaction_summary",
            "propose_reminder",
            "query_reminders",
            "suggest_field",
            "create_transaction",
            "set_financial_goal",
            "run_debt_simulation",
            "financial_health_check",
            "detect_risk",
            // Multi-account
            "create_account",
            "update_account",
            "delete_account",
            "transfer_funds",
            "reconcile_account",
            // Net worth
            "record_net_worth_snapshot",
            // Recurring
            "create_recurring_rule",
            "update_recurring_rule",
            "delete_recurring_rule",
            "post_recurring_now",
            "skip_next_occurrence",
            // Forecast
            "generate_cash_flow_forecast",
            // Subscriptions
            "create_subscription",
            "update_subscription",
            "delete_subscription",
            "cancel_subscription",
            // Investments
            "add_investment",
            "update_investment",
            "delete_investment",
            "record_portfolio_snapshot",
            "add_dividend",
            // Alerts
            "create_alert_rule",
            "delete_alert_rule",
            "toggle_alert_rule",
            "dismiss_notification",
            // Tax depth
            "set_tax_category",
            "add_tax_deduction",
            "delete_tax_deduction",
            "generate_tax_summary",
            // Export
            "export_transactions_csv",
            "export_tax_summary",
            "export_net_worth_report",
            // Credit score
            "add_credit_score_entry",
            "delete_credit_score_entry",
            "analyze_credit_score_trend",
            // Insurance
            "create_insurance_policy",
            "update_insurance_policy",
            "delete_insurance_policy",
            "analyze_insurance_coverage",
            // Retirement
            "create_retirement_plan",
            "update_retirement_plan",
            "delete_retirement_plan",
            "project_retirement",
            // Automation suggestions — sourced from AUTOMATION_ACTION_IDS to stay in sync.
            *AUTOMATION_ACTION_IDS.toTypedArray(),
            // Receipts
            "add_receipt",
            "delete_receipt",
            "link_receipt_to_transaction",
            "analyze_receipts_by_tax_year"
        ),
        "budget-review" to listOf(
            "update_budget_snapshot",
            "create_transaction",
            "create_budget",
            "modify_budget",
            "financial_health_check",
            "propose_reminder",
            "query_reminders"
        ),
        "goal-focus" to listOf(
            "update_budget_snapshot",
            "set_financial_goal",
            "update_goal_progress",
            "complete_goal",
            "project_savings_timeline",
            "create_transaction",
            "propose_reminder",
            "query_reminders"
        ),
        "field-crud" to listOf(
            "suggest_field",
            "create_field",
            "delete_field",
            "set_field_value"
        )
    )

    // =========================================================================
    // Base Persona (used by general + scoped modes)
    // =========================================================================

    private val LEDGER_BASE_IDENTITY = """IDENTITY:
You are LEDGER, an elite AI Financial Strategist within the Ara system.
Your tone is direct, analytical, and practical.
You optimize budgeting, debt pressure, savings velocity, and plan adherence.

CORE METHODOLOGY:
- Start from cashflow truth: income, fixed costs, variable spending, debt obligations.
- Convert user goals into clear monthly/quarterly financial plans.
- Track Financial Friction (0-10) and Resonance ROI (wellbeing return per dollar spent).
- Always confirm data with the user before committing financial mutations.

INTERACTION PROTOCOLS:
1. INTERNAL MONOLOGUE: Begin with a <thought> block that analyzes spending context and financial risk.
2. PLAN-FIRST: If no active plan exists, generate one before advising tactical optimizations.
3. EXECUTION: Give concrete actions with amounts, timelines, and priorities.
4. CLARITY: Use plain language with numbers; avoid vague finance advice.
5. PRIVACY: All financial data is encrypted end-to-end. Never suggest sharing sensitive data externally."""

    // =========================================================================
    // Friction / ROI Prompt Constants
    // =========================================================================

    const val FINANCIAL_FRICTION_ASSESSMENT_PROMPT = """Assess the user's Financial Friction score (0-10) based on these factors:

FACTORS (each 0-10, weight in parentheses):
1. Cashflow pressure (25%): Is monthly income > expenses? How tight is the buffer?
2. Debt burden (20%): Total debt relative to annual income. DTI ratio.
3. Savings adequacy (15%): Emergency fund months. Are savings goals on track?
4. Budget adherence (15%): Are they staying within budget categories?
5. Subscription creep (10%): Is subscription total growing without review?
6. Income stability (10%): Regular paycheck vs irregular income?
7. Payment deadline stress (5%): Any upcoming large payments or due dates?

SCORING GUIDE:
  0-2 (Low/Green): Positive cashflow, funded emergency fund, debt under control
  3-5 (Moderate/Cyan): Some pressure but manageable, minor overspending
  6-7 (Elevated/Amber): Negative cashflow or high DTI, needs intervention
  8-10 (Critical/Red): Severe financial stress, immediate action required

Output format:
<action type="update_financial_friction">{"score": <0-10>, "analysis": "<1-2 sentence explanation>"}</action>

Be honest and direct. Users prefer accuracy over comfort."""

    const val RESONANCE_ROI_GUIDANCE = """RESONANCE ROI METHODOLOGY:
Resonance ROI measures the wellbeing return per dollar spent. It answers:
"Is your spending making you healthier, happier, and more stable?"

HIGH ROI spending (increases numerator):
  - Emergency fund contributions (security → reduced anxiety)
  - Healthcare and preventive care (long-term health)
  - Education and skill development (future earnings)
  - Meaningful experiences with loved ones
  - Charitable giving (shown to increase life satisfaction)
  - Quality sleep environment (mattress, blackout curtains)

LOW ROI spending (decreases numerator):
  - Unused subscriptions
  - Impulse purchases with post-purchase regret
  - Lifestyle inflation without proportional happiness increase
  - High-interest debt payments (paying for past consumption)

FORMULA (simplified):
  ROI = (wellbeingContributing / totalSpending) * bufferMultiplier
  bufferMultiplier = 1 + (savingsRate * 0.5)

When computing, emit:
<action type="compute_resonance_roi">{"financialFriction": <0-10>, "resonanceROI": <0.0-5.0>}</action>"""

    // =========================================================================
    // Mode Dispatcher
    // =========================================================================

    /**
     * Build the system prompt and allowed actions for the given conversation mode.
     */
    fun buildLedgerPrompt(mode: LedgerContextMode): LedgerPromptModeResult {
        return when (mode) {
            is LedgerContextMode.General -> buildGeneralMode()
            is LedgerContextMode.BudgetReview -> buildBudgetReviewMode(mode.budget)
            is LedgerContextMode.GoalFocus -> buildGoalFocusMode(mode.goal)
            is LedgerContextMode.FieldCrud -> buildFieldCrudMode(mode.currentExtensions)
        }
    }

    /**
     * Check whether an action is allowed in the given scope.
     */
    fun isActionAllowedInScope(action: String, scopeKind: String): Boolean {
        return SCOPE_ACTIONS[scopeKind]?.contains(action) ?: false
    }

    // =========================================================================
    // General Mode
    // =========================================================================

    private fun buildGeneralMode(): LedgerPromptModeResult {
        val systemPrompt = buildString {
            append(LEDGER_BASE_IDENTITY)
            append("\n\n")
            append("""AVAILABLE ACTIONS:
- <action type="create_financial_plan">{"title":"Short title","summary":"One sentence.","monthlyTarget":0,"allocation":{"essentials":[% based on user situation],"growth":[% based on user goals],"buffer":[remaining %]},"tasks":["Task one","Task two","Task three"]}</action>
  IMPORTANT: Keep each task string under 60 characters. Use at most 4 tasks. No commas inside task strings.

- <action type="update_budget_snapshot">{"monthlyIncome":0,"fixedExpenses":[],"variableExpenses":[],"debtItems":[],"savingsGoals":[]}</action>
  Use when the user provides updated income, expense, or debt information.

- <action type="update_financial_friction">{"score":0,"analysis":"..."}</action>
  Use when you assess the user's current financial stress level. Score is 0-10 integer.
  0-2: Low friction (green). 3-5: Moderate (cyan). 6-7: Elevated (amber). 8-10: Critical (red).
  Include a 1-2 sentence analysis explaining the score.

- <action type="compute_resonance_roi">{"financialFriction":0,"resonanceROI":0.0}</action>
  Use after significant financial changes to recompute the wellbeing-per-dollar ratio.

- <action type="analyze_financial_document">{"monthlyIncome":5000,"currency":"USD","periodLabel":"March 2026","fixedExpenses":[{"description":"Rent","amount":2000}],"variableExpenses":[{"description":"Food","amount":500}],"transactions":[{"date":"2026-03-01","description":"Salary","amount":5000,"category":"income"}]}</action>
  ONLY emit AFTER user has reviewed and confirmed the extracted financial data.

- <action type="log_transaction_summary">{"summary":"..."}</action>
  Use to log a summary of discussed transactions or financial events.

- <action type="propose_reminder">{"title":"...","note":"...","dueAt":"ISO8601","recurrence":{...},"priority":"alert","source":{"entityType":"finance|bill|goal","entityId":"...","label":"..."},"tags":["..."]}</action>
  Use when the user asks for a reminder related to Ledger items. Always wait for explicit confirmation before scheduling.

- <action type="query_reminders">{"moduleId":"ledger"}</action>
  Use to list existing Ledger reminders (omit moduleId to list all reminders).

- <action type="suggest_field">{"description":"...","purpose":"...","suggestedType":"number"}</action>
  Use when the user mentions tracking a financial metric not covered by existing fields.

- <action type="create_transaction">{"type":"expense","amount":150,"description":"Grocery run","category":"Food","date":"2026-03-12","accountId":"ACCOUNT_ID_FROM_CONTEXT"}</action>
  Use when the user confirms a transaction to log. Amount must be positive.
  accountId is optional — omit to use default account. Use the [id:...] from the ACCOUNTS block above.

- <action type="set_financial_goal">{"name":"Emergency Fund","type":"savings","targetAmount":10000,"currentAmount":0,"targetDate":"2027-01-01","monthlyContribution":500,"priority":"high"}</action>
  Use when the user wants to set or track a specific financial goal.

- <action type="update_goal_progress">{"goalId":"GOAL_ID","newAmount":2500}</action>
  Use when the user reports progress on an existing goal. Requires goalId from their profile.

- <action type="complete_goal">{"goalId":"GOAL_ID","goalName":"Emergency Fund"}</action>
  Use when a goal has been fully achieved.

- <action type="run_debt_simulation">{"extraMonthlyPayment":500}</action>
  Use to run avalanche vs snowball debt payoff comparison. extraMonthlyPayment is optional.

- <action type="financial_health_check">{"healthScore":6,"healthStatus":"Moderate stress"}</action>
  Use to assess and record overall financial health. healthScore is 0-10.

- <action type="detect_risk">{"riskType":"Overspending","riskDescription":"Variable expenses exceed 40% of income"}</action>
  Use when you identify a financial risk pattern.

FINANCIAL FRICTION SCALE:
Financial Friction measures emotional and operational money stress on a 0-10 scale.
Factors: cashflow pressure, debt burden, subscription creep, irregular income,
missing budget structure, approaching payment deadlines, savings inadequacy.
This metric is shared cross-module — Atlas uses it to adjust planning load.

RESONANCE ROI:
Wellbeing return per dollar spent. Higher is better. Captures whether spending
patterns produce happiness, growth, and stability — not just consumption.

RULES:
- Never suggest specific stocks, funds, or financial products by name.
- Always use the user's currency for amounts.
- Round amounts to 2 decimal places maximum.
- If the user mentions a trackable metric, consider suggesting a custom field.
- Financial data is encrypted. Do not suggest exporting unencrypted data.""")
        }

        return LedgerPromptModeResult(
            systemPrompt = systemPrompt,
            allowedActions = SCOPE_ACTIONS["general"] ?: emptyList(),
            persistent = true
        )
    }

    // =========================================================================
    // Budget Review Mode
    // =========================================================================

    private fun buildBudgetReviewMode(budget: BudgetSnapshot): LedgerPromptModeResult {
        val statusLabel = when {
            budget.percentUsed > 100 -> "OVER BUDGET"
            budget.percentUsed > 80 -> "WARNING"
            else -> "ON TRACK"
        }

        val transactionBlock = if (budget.recentTransactions.isNotEmpty()) {
            budget.recentTransactions.joinToString("\n") { t ->
                "  ${t.date} | ${t.description} | ${budget.currency} ${fmtTwo(t.amount)}"
            }
        } else {
            "  (No recent transactions)"
        }

        val systemPrompt = buildString {
            append(LEDGER_BASE_IDENTITY)
            append("\n\n")
            append("""SCOPED CONTEXT: Budget Category Review
You are reviewing a single budget category. Focus ONLY on this category's data.
Do not reference other categories or overall financial position unless asked.

CATEGORY: ${budget.categoryName}
PERIOD: ${budget.period}
ALLOCATED: ${budget.currency} ${fmtTwo(budget.allocated)}
SPENT: ${budget.currency} ${fmtTwo(budget.spent)}
REMAINING: ${budget.currency} ${fmtTwo(budget.remaining)}
UTILIZATION: ${fmtOne(budget.percentUsed)}%
STATUS: $statusLabel

RECENT TRANSACTIONS:
$transactionBlock

AVAILABLE ACTIONS:
- <action type="update_budget_snapshot">{"monthlyIncome":0,"fixedExpenses":[],"variableExpenses":[],"debtItems":[],"savingsGoals":[]}</action>
  Use when the user wants to adjust this category's allocation or expenses.

- <action type="create_transaction">{"type":"expense","amount":50,"description":"Transaction description","category":"${budget.categoryName}","date":"2026-03-12"}</action>
  Use when the user wants to log a transaction within this budget category.

- <action type="create_budget">{"name":"Food & Dining","amount":600,"currency":"USD","categories":["groceries","restaurants"]}</action>
  Use to create a new budget category.

- <action type="modify_budget">{"budgetId":"BUDGET_ID","budgetName":"Food & Dining","amount":700,"changeSummary":"Increased food budget by ${'$'}100"}</action>
  Use to update an existing budget category amount.

- <action type="financial_health_check">{"healthScore":6,"healthStatus":"Moderate stress"}</action>
  Use to assess overall financial health after reviewing budget performance.

- <action type="propose_reminder">{"title":"...","note":"...","dueAt":"ISO8601","recurrence":{...},"priority":"alert","source":{"entityType":"bill|budget","entityId":"...","label":"..."},"tags":["..."]}</action>
  Use when the user asks for a budget reminder. Always wait for explicit confirmation before scheduling.

- <action type="query_reminders">{"moduleId":"ledger"}</action>
  Use to list existing Ledger reminders (omit moduleId to list all reminders).

RULES:
- Only discuss this budget category.
- Suggest specific cuts or reallocations with concrete numbers.
- If over budget, identify the top 2-3 transactions driving the overage.
- Use ${budget.currency} for all amounts.""")
        }

        return LedgerPromptModeResult(
            systemPrompt = systemPrompt,
            allowedActions = SCOPE_ACTIONS["budget-review"] ?: emptyList(),
            persistent = false
        )
    }

    // =========================================================================
    // Goal Focus Mode
    // =========================================================================

    private fun buildGoalFocusMode(goal: GoalSnapshot): LedgerPromptModeResult {
        val progressLabel = when {
            goal.percentComplete >= 90 -> "NEARLY COMPLETE"
            goal.percentComplete >= 50 -> "GOOD PROGRESS"
            goal.percentComplete >= 25 -> "BUILDING MOMENTUM"
            else -> "EARLY STAGE"
        }

        val projectionBlock = when {
            goal.projectedDate != null -> "PROJECTED COMPLETION: ${goal.projectedDate}"
            goal.monthlyContribution > 0 -> {
                val monthsNeeded = ceil(
                    (goal.targetAmount - goal.currentAmount) / goal.monthlyContribution
                ).toInt()
                "PROJECTED COMPLETION: ~$monthsNeeded months at current rate"
            }
            else -> "PROJECTED COMPLETION: Unable to estimate — no contribution data"
        }

        val systemPrompt = buildString {
            append(LEDGER_BASE_IDENTITY)
            append("\n\n")
            append("SCOPED CONTEXT: Financial Goal Focus\n")
            append("You are advising on a single financial goal. Focus ONLY on this goal's progress\n")
            append("and strategies to accelerate or optimize it.\n\n")
            append("GOAL: ${goal.name}\n")
            append("TARGET: ${goal.currency} ${fmtTwo(goal.targetAmount)}\n")
            append("CURRENT: ${goal.currency} ${fmtTwo(goal.currentAmount)}\n")
            append("PROGRESS: ${fmtOne(goal.percentComplete)}%\n")
            append("STATUS: $progressLabel\n")
            if (goal.targetDate != null) {
                append("TARGET DATE: ${goal.targetDate}\n")
            }
            if (goal.monthlyContribution > 0) {
                append("MONTHLY CONTRIBUTION: ${goal.currency} ${fmtTwo(goal.monthlyContribution)}\n")
            }
            append("$projectionBlock\n\n")
            append("""AVAILABLE ACTIONS:
- <action type="update_budget_snapshot">{"savingsGoals":[{"id":"${goal.id}","name":"${goal.name}","targetAmount":${goal.targetAmount.roundToInt()}}]}</action>
  Use when the user wants to adjust this goal's target, contribution, or timeline.

- <action type="set_financial_goal">{"name":"${goal.name}","type":"savings","targetAmount":${goal.targetAmount.roundToInt()},"currentAmount":${goal.currentAmount.roundToInt()},"targetDate":"YYYY-MM-DD","monthlyContribution":500,"priority":"high"}</action>
  Use when the user wants to create a new goal or replace this one.

- <action type="update_goal_progress">{"goalId":"${goal.id}","newAmount":${goal.currentAmount.roundToInt()}}</action>
  Use when the user reports updated progress toward this goal.

- <action type="complete_goal">{"goalId":"${goal.id}","goalName":"${goal.name}"}</action>
  Use when the user confirms this goal has been fully achieved.

- <action type="project_savings_timeline">{"goalId":"${goal.id}"}</action>
  Use to project when the user will reach their savings goal based on monthly contribution.

- <action type="create_transaction">{"type":"income","amount":500,"description":"Goal contribution","category":"Savings","date":"2026-03-12"}</action>
  Use when the user logs a contribution toward this goal.

- <action type="propose_reminder">{"title":"...","note":"...","dueAt":"ISO8601","recurrence":{...},"priority":"alert","source":{"entityType":"goal","entityId":"...","label":"..."},"tags":["..."]}</action>
  Use when the user asks for a goal reminder. Always wait for explicit confirmation before scheduling.

- <action type="query_reminders">{"moduleId":"ledger"}</action>
  Use to list existing Ledger reminders (omit moduleId to list all reminders).

RULES:
- Only discuss this specific goal.
- Suggest concrete contribution increases with specific dollar amounts.
- If behind schedule, propose catch-up strategies (e.g., temporary expense cuts).
- Calculate time-to-goal based on different contribution scenarios.
- Use ${goal.currency} for all amounts.""")
        }

        return LedgerPromptModeResult(
            systemPrompt = systemPrompt,
            allowedActions = SCOPE_ACTIONS["goal-focus"] ?: emptyList(),
            persistent = false
        )
    }

    // =========================================================================
    // Field CRUD Mode
    // =========================================================================

    private fun buildFieldCrudMode(
        currentExtensions: List<FieldDefinition>
    ): LedgerPromptModeResult {
        val extensionList = if (currentExtensions.isNotEmpty()) {
            currentExtensions.joinToString("\n") { f ->
                val desc = if (f.description != null) " — ${f.description}" else ""
                "  - ${f.id}: \"${f.name}\" (${f.type.name.lowercase()})$desc"
            }
        } else {
            "  (No custom fields defined)"
        }

        val systemPrompt = """IDENTITY:
You are LEDGER's Field Manager — a specialized assistant for creating and managing
custom financial tracking fields.

MODULE: Ledger (Financial Planning)
DOMAIN: Budgeting, debt tracking, savings goals, investment monitoring, transaction
categorization, financial stress metrics.

CORE SCHEMA FIELDS (immutable, cannot be shadowed):
  - userId, monthlyIncome, currency, financialGoals, budgetCategories
  - totalDebt, totalSavings, totalInvestments, riskTolerance, spendingHabits
  - financialStressLevel, creditScore, paymentSchedule
  - lastBudgetReview, nextBudgetReview

CURRENT CUSTOM FIELDS (${currentExtensions.size}/15 slots used):
$extensionList

ALLOWED FIELD TYPES:
  - NUMBER: monetary amounts, counts, ratios, rates
  - RANGE: bounded scales (e.g., risk scores 0-10)
  - SELECT: single-choice from options (e.g., payment frequency)
  - MULTI_SELECT: multi-choice from options (e.g., expense categories)
  - DATE: date values (e.g., tax filing deadline)

DISALLOWED FIELD TYPES:
  - TEXT, TEXTAREA: Not appropriate for financial metrics.
  - BOOLEAN: Too simplistic for financial tracking. Use SELECT with Yes/No options.
  - OBJECT: Too complex for extension fields.

AVAILABLE ACTIONS:
- <action type="suggest_field">{"description":"...","purpose":"...","suggestedType":"number"}</action>
  Suggest a new field before creating it. Use this to confirm with the user.

- <action type="create_field">{"id":"kebab-case-id","name":"Display Name","type":"number","description":"...","validation":{"minimum":0},"metadata":{"category":"income|expenses|assets|liabilities","icon":"LucideIconName","uiHint":"currency|percentage|number"}}</action>
  Create a validated custom field.

- <action type="delete_field">{"fieldId":"field-id-to-delete"}</action>
  Delete a custom field. Core fields are immutable.

- <action type="set_field_value">{"fieldId":"FIELD_ID","fieldName":"Monthly Savings Rate","value":"25"}</action>
  Use to set a value for a custom numeric field.

DOMAIN VALIDATION RULES:
You are the semantic domain validator. For each field creation request, evaluate:

1. Is this field relevant to personal finance, budgeting, debt, savings, investments,
   income, expenses, or financial planning?
2. Is this NOT better served by another Ara module?
   - Health/body metrics → suggest Soma module
   - Mood/emotional tracking → suggest Agnes (therapy) module
   - Fitness/workout data → suggest Titan module
   - Productivity/tasks → suggest Atlas module
3. Does it overlap with an existing core or custom field?
4. Is the suggested type appropriate for the data?

If approved: emit create_field action with complete FieldDefinition.
If rejected: explain WHY in natural language, suggest the correct module if applicable.

RULES:
- NEVER include user financial data in this conversation.
- This context is for schema management ONLY.
- Be conservative — only create fields that genuinely serve financial tracking.
- Suggest category (income/expenses/assets/liabilities) based on the field's nature.
- For monetary fields, always set metadata.uiHint = "currency".
- For percentage fields, set metadata.uiHint = "percentage".
- Always include validation rules (minimum, maximum) for NUMBER fields."""

        return LedgerPromptModeResult(
            systemPrompt = systemPrompt,
            allowedActions = SCOPE_ACTIONS["field-crud"] ?: emptyList(),
            persistent = false
        )
    }

    // =========================================================================
    // Financial Context Serializer (~360 lines TS parity)
    // =========================================================================

    /**
     * Serialize the full financial context for injection into the general mode
     * system prompt.
     *
     * Full parity with TS `serializeLedgerFinancialContext()`.
     * Covers: cashflow, accounts, net worth, bills, forecast, plans, budgets,
     * goals, debt, financial health alerts, spending patterns, subscriptions,
     * investments, alert rules, credit score, insurance, retirement.
     */
    fun serializeLedgerFinancialContext(
        accounts: List<LedgerAccount> = emptyList(),
        debtItems: List<DebtItem> = emptyList(),
        netWorthHistory: List<NetWorthSnapshotEntry> = emptyList(),
        upcomingBills: List<UpcomingBill> = emptyList(),
        lastCashFlowForecast: CashFlowForecast? = null,
        currency: String = "USD",
        subscriptions: List<LedgerSubscription> = emptyList(),
        investments: List<LedgerInvestmentPosition> = emptyList(),
        alertRules: List<LedgerAlertRule> = emptyList(),
        creditScoreHistory: List<LedgerCreditScoreEntry> = emptyList(),
        insurancePolicies: List<LedgerInsurancePolicyEntry> = emptyList(),
        lastRetirementProjection: LedgerRetirementProjection? = null,
        // Cashflow snapshot
        monthlyIncome: Double? = null,
        fixedExpenses: List<BudgetLineItem> = emptyList(),
        variableExpenses: List<BudgetLineItem> = emptyList(),
        // Computed from actual transactions — reflects what the UI shows
        actualTotalIncome: Double? = null,
        actualTotalExpenses: Double? = null,
        budgetCategories: List<LedgerBudgetCategory> = emptyList(),
        financialGoals: List<LedgerFinancialGoal> = emptyList(),
        plans: List<FinancialPlan> = emptyList(),
        activePlanId: String? = null,
        transactions: List<SimpleTransaction> = emptyList()
    ): String {
        val blocks = mutableListOf<String>()

        // ── Cashflow Snapshot ────────────────────────────────────────────────
        if (monthlyIncome != null || actualTotalIncome != null) {
            val totalFixed = fixedExpenses.sumOf { it.amount }
            val totalVariable = variableExpenses.sumOf { it.amount }
            val budgetExpenses = totalFixed + totalVariable
            val cashflowLines = mutableListOf("[CASHFLOW SNAPSHOT]")

            if (monthlyIncome != null) {
                val surplus = monthlyIncome - budgetExpenses
                val fixedLines = fixedExpenses.take(8).map { e ->
                    "    - ${e.label}: ${fmt(e.amount, currency)}"
                }
                val variableLines = variableExpenses.take(8).map { e ->
                    "    - ${e.label}: ${fmt(e.amount, currency)}"
                }
                cashflowLines.add("  Regular monthly salary: ${fmt(monthlyIncome, currency)}")
                cashflowLines.add(
                    "  Planned fixed expenses: ${fmt(totalFixed, currency)}" +
                        if (fixedLines.isNotEmpty()) "\n" + fixedLines.joinToString("\n") else ""
                )
                cashflowLines.add(
                    "  Planned variable expenses: ${fmt(totalVariable, currency)}" +
                        if (variableLines.isNotEmpty()) "\n" + variableLines.joinToString("\n") else ""
                )
                cashflowLines.add("  Planned monthly surplus: ${fmt(surplus, currency)}")
            }

            // Additional income recorded as transactions this month
            if (actualTotalIncome != null && actualTotalIncome > 0) {
                val extra = actualTotalIncome - (monthlyIncome ?: 0.0)
                val extraSuffix = if (extra > 0) " (+${fmt(extra, currency)} beyond salary — bonus/freelance/other)" else ""
                cashflowLines.add("  Recorded income this month: ${fmt(actualTotalIncome, currency)}$extraSuffix")
                cashflowLines.add("  Recorded expenses this month: ${fmt(actualTotalExpenses ?: 0.0, currency)}")
                cashflowLines.add("  Actual net this month: ${fmt(actualTotalIncome - (actualTotalExpenses ?: 0.0), currency)}")
            }

            cashflowLines.add("  NOTE: \"Regular monthly salary\" is the recurring baseline for budget planning — update via update_budget_snapshot.")
            cashflowLines.add("  Bonuses, freelance, and other one-off payments are income transactions, same as expenses are expense transactions.")
            blocks.add(cashflowLines.joinToString("\n"))
        }

        // ── Accounts ─────────────────────────────────────────────────────────
        if (accounts.isNotEmpty()) {
            val accountLines = accounts.map { a ->
                val inst = if (a.institutionName != null) " @ ${a.institutionName}" else ""
                val last4 = if (a.lastFour != null) " ···${a.lastFour}" else ""
                val defaultTag = if (a.isDefault) " [default]" else ""
                "  - [id:${a.id}] ${a.name} (${a.type}$inst$last4): ${fmt(a.balance, currency)}$defaultTag"
            }
            val totalBalance = accounts.sumOf { it.balance }
            blocks.add("[ACCOUNTS — ${accounts.size} linked]\n${accountLines.joinToString("\n")}\n  Total net balance: ${fmt(totalBalance, currency)}")
        }

        // ── Net Worth ────────────────────────────────────────────────────────
        if (accounts.isNotEmpty() || debtItems.isNotEmpty()) {
            val totalAssets = accounts.filter { it.balance > 0 }.sumOf { it.balance }
            val totalLiabilities = accounts.filter { it.balance < 0 }.sumOf { abs(it.balance) } +
                debtItems.sumOf { it.balance }
            val netWorth = totalAssets - totalLiabilities

            val trend = if (netWorthHistory.size >= 2) {
                val sorted = netWorthHistory.sortedByDescending { it.date }
                val delta = sorted[0].netWorth - sorted[1].netWorth
                if (delta >= 0) "↑ ${fmtCompact(abs(delta), currency)} since last snapshot"
                else "↓ ${fmtCompact(abs(delta), currency)} since last snapshot"
            } else {
                "no prior snapshot"
            }
            blocks.add("[NET WORTH]\n  Assets: ${fmtCompact(totalAssets, currency)} | Liabilities: ${fmtCompact(totalLiabilities, currency)} | Net Worth: ${fmtCompact(netWorth, currency)} ($trend)")
        }

        // ── Upcoming Bills ───────────────────────────────────────────────────
        if (upcomingBills.isNotEmpty()) {
            val billLines = upcomingBills.map { r ->
                "  - ${r.dueDateFormatted}: ${r.description} ${fmt(r.amount, currency)} (${r.type}, ${r.frequency})"
            }
            blocks.add("[UPCOMING BILLS — NEXT 14 DAYS]\n${billLines.joinToString("\n")}")
        }

        // ── Cash Flow Forecast ───────────────────────────────────────────────
        if (lastCashFlowForecast != null) {
            val forecast = lastCashFlowForecast
            val warnings = mutableListOf<String>()
            if (forecast.lowestPoint.balance < 0) {
                warnings.add("⚠ Negative balance projected on ${forecast.lowestPoint.date}: ${fmtCompact(forecast.lowestPoint.balance, currency)}")
            } else if (forecast.lowestPoint.balance < 500) {
                warnings.add("⚠ Cash low point: ${fmtCompact(forecast.lowestPoint.balance, currency)} on ${forecast.lowestPoint.date}")
            }
            val warningStr = if (warnings.isNotEmpty()) "\n" + warnings.joinToString("\n") else ""
            blocks.add("[CASH FLOW FORECAST — ${forecast.horizon}d]\n  End balance: ${fmtCompact(forecast.endBalance, currency)} | Lowest: ${fmtCompact(forecast.lowestPoint.balance, currency)} on ${forecast.lowestPoint.date}$warningStr")
        }

        // ── Block A: Active Financial Plan ───────────────────────────────────
        val planToShow = if (activePlanId != null) plans.find { it.id == activePlanId } else null
            ?: plans.find { it.status == "active" }
        if (planToShow != null) {
            val taskLines = planToShow.tasks.mapIndexed { i, t -> "    ${i + 1}. $t" }.joinToString("\n")
            blocks.add(
                "[ACTIVE FINANCIAL PLAN — \"${planToShow.title}\"]\n" +
                    "  Summary: ${planToShow.summary}\n" +
                    "  Monthly target surplus: ${fmt(planToShow.monthlyTarget, currency)}\n" +
                    "  Allocation — Essentials: ${planToShow.allocation.essentials}% | Growth: ${planToShow.allocation.growth}% | Buffer: ${planToShow.allocation.buffer}%\n" +
                    "  Tasks:\n${taskLines.ifEmpty { "    (No tasks defined)" }}"
            )
        }

        // ── Block B: Budget Categories ───────────────────────────────────────
        if (budgetCategories.isNotEmpty()) {
            val catLines = budgetCategories.map { cat ->
                val remaining = cat.allocated - cat.spent
                val pctUsed = if (cat.allocated > 0) (cat.spent / cat.allocated) * 100 else 0.0
                val status = when {
                    pctUsed > 100 -> "OVER BUDGET"
                    pctUsed > 80 -> "WARNING"
                    else -> "ON TRACK"
                }
                "  - ${cat.name}: allocated ${fmt(cat.allocated, currency)} | spent ${fmt(cat.spent, currency)} | remaining ${fmt(remaining, currency)} | ${pctUsed.roundToInt()}% used [$status]"
            }
            blocks.add("[BUDGET CATEGORIES — ${budgetCategories.size} tracked]\n${catLines.joinToString("\n")}")
        }

        // ── Block C: Financial Goals ─────────────────────────────────────────
        if (financialGoals.isNotEmpty()) {
            val goalLines = financialGoals.map { g ->
                val pctComplete = min(100.0, if (g.targetAmount > 0) (g.currentAmount / g.targetAmount) * 100 else 0.0)
                val remaining = g.targetAmount - g.currentAmount
                val monthsNeeded = if (g.monthlyContribution > 0) ceil(remaining / g.monthlyContribution).toInt() else null

                var monthsRemaining: Int? = null
                if (g.targetDate != null) {
                    // Approximate months remaining from target date string
                    monthsRemaining = approximateMonthsUntil(g.targetDate)
                }

                val trackStatus = when {
                    g.monthlyContribution <= 0 -> "NO CONTRIBUTION"
                    monthsNeeded != null && monthsRemaining != null -> {
                        val gap = monthsNeeded - monthsRemaining
                        if (gap > 0) "BEHIND ($gap mo gap)" else "ON TRACK"
                    }
                    monthsNeeded != null -> "~$monthsNeeded mo to completion"
                    else -> "NO CONTRIBUTION"
                }
                val targetDateStr = if (g.targetDate != null) " | target: ${g.targetDate}" else ""
                "  - [id:${g.id}] ${g.name} (${g.type}, ${g.priority}): ${fmt(g.currentAmount, currency)}/${fmt(g.targetAmount, currency)} (${pctComplete.roundToInt()}%) | contrib: ${fmt(g.monthlyContribution, currency)}/mo$targetDateStr | $trackStatus"
            }
            blocks.add("[FINANCIAL GOALS — ${financialGoals.size} active]\n${goalLines.joinToString("\n")}")
        }

        // ── Block D: Debt Snapshot ───────────────────────────────────────────
        if (debtItems.isNotEmpty()) {
            val sorted = debtItems.sortedByDescending { it.apr ?: 0.0 }
            val debtLines = sorted.map { d ->
                val payment = d.minPayment ?: 0.0
                val typeStr = d.type?.name?.lowercase() ?: "debt"
                val variableTag = if (d.variableRate) " [variable]" else ""
                "  - ${d.name} ($typeStr): balance ${fmt(d.balance, currency)} | APR ${fmtOne(d.apr ?: 0.0)}% | min payment ${fmt(payment, currency)}$variableTag"
            }
            val totalBalance = debtItems.sumOf { it.balance }
            val totalMinPayments = debtItems.sumOf { it.minPayment ?: 0.0 }
            val dtiLine = if (monthlyIncome != null && monthlyIncome > 0) {
                " | DTI: ${fmtOne((totalMinPayments / monthlyIncome) * 100)}%"
            } else ""
            blocks.add(
                "[DEBT SNAPSHOT — ${debtItems.size} items, sorted by APR]\n${debtLines.joinToString("\n")}\n  Total balance: ${fmt(totalBalance, currency)} | Total min payments: ${fmt(totalMinPayments, currency)}/mo$dtiLine"
            )
        }

        // ── Block E: Financial Health Alerts ─────────────────────────────────
        run {
            val alerts = mutableListOf<String>()
            val totalFixed = fixedExpenses.sumOf { it.amount }
            val totalVariable = variableExpenses.sumOf { it.amount }
            val income = monthlyIncome ?: 0.0

            // 1. Negative cashflow
            if (income > 0 && income - totalFixed - totalVariable < 0) {
                alerts.add("⚠ Negative cashflow: income ${fmt(income, currency)} is less than planned expenses ${fmt(totalFixed + totalVariable, currency)} (deficit: ${fmt(income - totalFixed - totalVariable, currency)})")
            }

            // 2. Budget breach per category
            for (cat in budgetCategories) {
                val pctUsed = if (cat.allocated > 0) (cat.spent / cat.allocated) * 100 else 0.0
                if (pctUsed > 100) {
                    alerts.add("⚠ Budget breach — ${cat.name}: ${pctUsed.roundToInt()}% utilized, overage ${fmt(cat.spent - cat.allocated, currency)}")
                } else if (pctUsed > 90) {
                    alerts.add("⚠ Budget warning — ${cat.name}: ${pctUsed.roundToInt()}% utilized, only ${fmt(cat.allocated - cat.spent, currency)} remaining")
                }
            }

            // 3. Emergency fund coverage
            val liquidAccounts = accounts.filter { it.type == "checking" || it.type == "savings" || it.type == "cash" }
            val liquidAssets = liquidAccounts.sumOf { it.balance }
            val ccDebt = accounts.filter { it.type == "credit_card" }.sumOf { abs(it.balance) }
            val netLiquid = liquidAssets - ccDebt
            val monthlyExpenses = totalFixed + totalVariable
            if (monthlyExpenses > 0) {
                val efMonths = netLiquid / monthlyExpenses
                if (efMonths < 1) {
                    alerts.add("⚠ CRITICAL: Emergency fund < 1 month (${fmtOne(efMonths)} mo). Liquid assets: ${fmt(netLiquid, currency)}")
                } else if (efMonths < 3) {
                    alerts.add("⚠ Emergency fund low: ${fmtOne(efMonths)} months of coverage (target: 3+ mo)")
                }
            }

            // 4. Goal at risk
            for (g in financialGoals) {
                if (g.targetDate == null || g.monthlyContribution <= 0) continue
                val remaining = g.targetAmount - g.currentAmount
                val monthsNeeded = ceil(remaining / g.monthlyContribution).toInt()
                val monthsRemaining = approximateMonthsUntil(g.targetDate) ?: continue
                if (monthsNeeded > monthsRemaining) {
                    val gap = monthsNeeded - monthsRemaining
                    alerts.add("⚠ Goal at risk — \"${g.name}\": needs $monthsNeeded mo but only $monthsRemaining mo remain (gap: $gap mo, shortfall: ${fmt(gap * g.monthlyContribution, currency)})")
                }
            }

            // 5. High-APR debt
            val highApr = debtItems.filter { (it.apr ?: 0.0) > 20 }
            if (highApr.isNotEmpty()) {
                val worst = highApr.sortedByDescending { it.apr ?: 0.0 }.first()
                alerts.add("⚠ High-APR debt — worst offender: \"${worst.name}\" at ${fmtOne(worst.apr ?: 0.0)}% APR. ${highApr.size} debt(s) above 20% APR. Recommend avalanche strategy.")
            }

            // 6. Subscription creep
            val activeSubs = subscriptions.filter { it.status == "active" || it.status == "trial" }
            val totalSubMonthly = activeSubs.sumOf { it.monthlyEquivalent }
            if (income > 0 && totalSubMonthly / income > 0.15) {
                alerts.add("ℹ Subscription creep: subscriptions total ${fmt(totalSubMonthly, currency)}/mo = ${fmtOne((totalSubMonthly / income) * 100)}% of income (threshold: 15%)")
            }

            // 7. Strategy conflict: high-APR debt AND savings goals coexist
            val hasHighAprDebt = debtItems.any { (it.apr ?: 0.0) > 20 }
            val hasSavingsGoals = financialGoals.any { it.type == "savings" || it.type == "investment" }
            if (hasHighAprDebt && hasSavingsGoals) {
                alerts.add("ℹ Strategy conflict: high-APR debt (>20%) and active savings/investment goals coexist. Mathematically, paying off high-APR debt first yields better returns than most savings rates.")
            }

            if (alerts.isNotEmpty()) {
                blocks.add("[FINANCIAL HEALTH ALERTS]\n${alerts.joinToString("\n") { "  $it" }}")
            }
        }

        // ── Block F: Spending Patterns — This Month ──────────────────────────
        if (transactions.isNotEmpty()) {
            // Filter to current month's expenses
            val currentYearMonth = currentYearMonth()
            val monthExpenses = transactions.filter { t ->
                t.type == "expense" && t.date.startsWith(currentYearMonth)
            }
            if (monthExpenses.isNotEmpty()) {
                val totalMonthSpend = monthExpenses.sumOf { it.amount }
                val byCategory = mutableMapOf<String, Double>()
                for (t in monthExpenses) {
                    val cat = t.category.ifEmpty { "Uncategorized" }
                    byCategory[cat] = (byCategory[cat] ?: 0.0) + t.amount
                }
                val top5 = byCategory.entries
                    .sortedByDescending { it.value }
                    .take(5)
                    .map { (cat, amount) ->
                        val pct = if (totalMonthSpend > 0) ((amount / totalMonthSpend) * 100).roundToInt() else 0
                        "  - $cat: ${fmt(amount, currency)} ($pct% of total)"
                    }
                blocks.add("[SPENDING PATTERNS — THIS MONTH]\n  Total expenses: ${fmt(totalMonthSpend, currency)} across ${monthExpenses.size} transactions\n${top5.joinToString("\n")}")
            }
        }

        // ── Subscriptions ────────────────────────────────────────────────────
        val activeSubs = subscriptions.filter { it.status == "active" || it.status == "trial" }
        if (activeSubs.isNotEmpty()) {
            val totalMonthly = activeSubs.sumOf { it.monthlyEquivalent }
            val trialEnding = activeSubs.filter { sub ->
                if (sub.status != "trial" || sub.trialEndsAt == null) return@filter false
                val daysUntil = approximateDaysUntil(sub.trialEndsAt)
                daysUntil != null && daysUntil <= 7
            }
            val subLines = activeSubs.take(8).map { s ->
                val trialTag = if (s.status == "trial") " [TRIAL]" else ""
                "  - ${s.name} (${s.billingCycle}): ${fmt(s.amount, currency)}$trialTag"
            }.toMutableList()
            if (activeSubs.size > 8) subLines.add("  ... and ${activeSubs.size - 8} more")
            var subsBlock = "[SUBSCRIPTIONS — ${activeSubs.size} active, ${fmtCompact(totalMonthly, currency)}/mo]\n${subLines.joinToString("\n")}"
            if (trialEnding.isNotEmpty()) {
                subsBlock += "\n  ⚠ Trials ending within 7 days: ${trialEnding.joinToString(", ") { it.name }}"
            }
            blocks.add(subsBlock)
        }

        // ── Investments ──────────────────────────────────────────────────────
        if (investments.isNotEmpty()) {
            val totalValue = investments.sumOf { it.currentValue }
            val totalCost = investments.sumOf { it.totalCost }
            val unrealizedGain = totalValue - totalCost
            val gainPct = if (totalCost > 0) (unrealizedGain / totalCost) * 100 else 0.0
            val sign = if (unrealizedGain >= 0) "+" else ""
            blocks.add(
                "[PORTFOLIO — ${investments.size} holdings]\n  Total value: ${fmtCompact(totalValue, currency)} | Cost basis: ${fmtCompact(totalCost, currency)} | Unrealized P&L: $sign${fmtCompact(unrealizedGain, currency)} ($sign${fmtOne(gainPct)}%)"
            )
        }

        // ── Active Alerts ────────────────────────────────────────────────────
        val enabledAlerts = alertRules.filter { it.isEnabled }
        if (enabledAlerts.isNotEmpty()) {
            val alertSummary = enabledAlerts.joinToString(", ") { r ->
                val threshold = if (r.threshold != null) " (threshold: ${r.threshold.roundToInt()})" else ""
                "${r.label}$threshold"
            }
            blocks.add("[ACTIVE ALERT RULES — ${enabledAlerts.size}]\n  $alertSummary")
        }

        // ── Credit Score ─────────────────────────────────────────────────────
        if (creditScoreHistory.isNotEmpty()) {
            val sorted = creditScoreHistory.sortedByDescending { it.recordedAt }
            val latest = sorted[0]
            val tier = when {
                latest.score >= 800 -> "Exceptional"
                latest.score >= 740 -> "Very Good"
                latest.score >= 670 -> "Good"
                latest.score >= 580 -> "Fair"
                else -> "Poor"
            }
            val trend = if (sorted.size >= 2) {
                val prev = sorted[1]
                when {
                    latest.score > prev.score -> "↑ ${latest.score - prev.score} pts"
                    latest.score < prev.score -> "↓ ${prev.score - latest.score} pts"
                    else -> "stable"
                }
            } else "first entry"
            val dateStr = latest.recordedAt.split("T").firstOrNull() ?: latest.recordedAt
            blocks.add("[CREDIT SCORE]\n  Latest: ${latest.score} ($tier) from ${latest.bureau} on $dateStr — $trend")
        }

        // ── Insurance ────────────────────────────────────────────────────────
        val activePolicies = insurancePolicies.filter { it.isActive }
        if (activePolicies.isNotEmpty()) {
            val totalMonthlyPremium = activePolicies.sumOf { it.monthlyPremium }
            val soon = activePolicies.filter { p ->
                val days = approximateDaysUntil(p.nextRenewalDate)
                days != null && days in 0..30
            }
            val policyLines = activePolicies.map { p ->
                "  - ${p.name} (${p.type}): ${fmt(p.monthlyPremium, currency)}/mo"
            }
            var insBlock = "[INSURANCE — ${activePolicies.size} active, ${fmtCompact(totalMonthlyPremium, currency)}/mo]\n${policyLines.joinToString("\n")}"
            if (soon.isNotEmpty()) {
                insBlock += "\n  ⚠ Renewing within 30 days: ${soon.joinToString(", ") { it.name }}"
            }
            blocks.add(insBlock)
        }

        // ── Retirement ───────────────────────────────────────────────────────
        if (lastRetirementProjection != null) {
            val proj = lastRetirementProjection
            val onTrackLabel = if (proj.onTrack) "✅ On track" else "⚠ Behind"
            val shortfallStr = if (proj.shortfallOrSurplus < 0) {
                " | Shortfall: ${fmtCompact(abs(proj.shortfallOrSurplus), currency)}"
            } else {
                " | Surplus: ${fmtCompact(proj.shortfallOrSurplus, currency)}"
            }
            blocks.add(
                "[RETIREMENT]\n  $onTrackLabel | Projected nest egg: ${fmtCompact(proj.projectedNestEgg, currency)} | 4%-rule income: ${fmtCompact(proj.fourPercentRuleMonthly, currency)}/mo$shortfallStr"
            )
        }

        return if (blocks.isNotEmpty()) blocks.joinToString("\n\n") else ""
    }

    // =========================================================================
    // Extension Field Serializer
    // =========================================================================

    /**
     * Serialize extension field definitions and values into a text block
     * for injection into the LLM system prompt.
     *
     * Called in all modes EXCEPT field-crud.
     */
    fun serializeLedgerExtensionFields(
        extensions: List<FieldDefinition>,
        values: Map<String, Any?>,
        currency: String = "USD"
    ): String {
        if (extensions.isEmpty()) return ""

        val lines = extensions.map { field ->
            val value = values[field.id]
            val formattedValue = formatFieldValueForPrompt(field, value, currency)
            val typeInfo = formatFieldTypeInfo(field)
            "- ${field.name}: $formattedValue ($typeInfo)"
        }

        return "[CUSTOM TRACKED FIELDS — LEDGER]\n${lines.joinToString("\n")}"
    }

    /**
     * Format a field value for prompt injection.
     */
    private fun formatFieldValueForPrompt(
        field: FieldDefinition,
        value: Any?,
        currency: String
    ): String {
        if (value == null) return "(not set)"

        return when (field.type) {
            FieldType.NUMBER -> {
                val uiHint = field.metadata?.get("uiHint")?.toString()?.replace("\"", "")
                when (uiHint) {
                    "currency" -> {
                        val num = (value as? Number)?.toDouble() ?: return value.toString()
                        "$currency ${fmtTwo(num)}"
                    }
                    "percentage" -> {
                        val num = (value as? Number)?.toDouble() ?: return value.toString()
                        "${fmtOne(num)}%"
                    }
                    else -> value.toString()
                }
            }
            FieldType.RANGE -> {
                val min = field.validation?.minimum?.roundToInt() ?: 0
                val max = field.validation?.maximum?.roundToInt() ?: 10
                "$value (range: $min-$max)"
            }
            FieldType.SELECT -> {
                val option = field.options?.find { it.value == value.toString() }
                if (option != null) "\"${option.label}\"" else "\"$value\""
            }
            FieldType.MULTI_SELECT -> {
                if (value !is List<*>) return "(none)"
                val labels = value.map { v ->
                    val opt = field.options?.find { it.value == v.toString() }
                    opt?.label ?: v.toString()
                }
                "[${labels.joinToString(", ")}]"
            }
            FieldType.DATE -> value.toString()
            else -> value.toString()
        }
    }

    /**
     * Format field type information for prompt context.
     */
    private fun formatFieldTypeInfo(field: FieldDefinition): String {
        val parts = mutableListOf(field.type.name.lowercase())

        field.validation?.minimum?.let { parts.add("≥ ${it.roundToInt()}") }
        field.validation?.maximum?.let { parts.add("≤ ${it.roundToInt()}") }
        if (!field.options.isNullOrEmpty()) {
            val optionLabels = field.options.joinToString("/") { it.label }
            parts.add("options: $optionLabels")
        }

        return parts.joinToString(", ")
    }

    // =========================================================================
    // Diagnosis Prompt
    // =========================================================================

    /**
     * Build the system prompt for Ledger's financial diagnosis mode.
     *
     * Full parity with TS `buildLedgerDiagnosisPrompt()`.
     */
    fun buildLedgerDiagnosisPrompt(
        contextPolicy: LedgerDiagnosisContextPolicy
    ): String {
        val identity = """[IDENTITY]
You are LEDGER, the financial analyst and advisor for Ara.
You are in Diagnosis mode, analyzing uploaded financial documents.
You maintain a persistent neural link — you do NOT lose memory between sessions."""

        val contextPolicyBlock = when (contextPolicy) {
            LedgerDiagnosisContextPolicy.WITH_CONTEXT ->
                "\n[CONTEXT POLICY: FULL ACCESS]\nThe user has granted full financial context access. Reference their historical financial data, budgets, and spending patterns when analyzing this document."
            LedgerDiagnosisContextPolicy.ISOLATED ->
                "\n[CONTEXT POLICY: ISOLATED]\nAnalyze only the uploaded document. Do not reference base financial context until the user explicitly grants consent."
        }

        val diagnosisBlock = """

[DIAGNOSIS MODE — FINANCIAL ANALYSIS]
You are analyzing an uploaded financial document. Extract structured financial data, identify patterns, and flag anomalies.

[AVAILABLE DIAGNOSIS ACTIONS]
- parse_financial_document: Extract structured financial data (transactions, balances, totals)
  Usage: <action type="parse_financial_document">{"documentType":"bank_statement","period":"2025-01","transactions":[{"date":"...","description":"...","amount":-42.50,"category":"food"}],"summary":{"totalIncome":5000,"totalExpenses":3200,"netFlow":1800}}</action>
- commit_transaction: Record a specific financial transaction
  Usage: <action type="commit_transaction">{"date":"2025-01-15","description":"Grocery Store","amount":-85.30,"category":"groceries","source":"bank_statement"}</action>
- flag_anomaly: Flag unusual financial activity
  Usage: <action type="flag_anomaly">{"type":"unusual_charge","description":"Large unrecognized charge","amount":499.99,"severity":"high","recommendation":"Verify this charge with your bank"}</action>
- categorize_expense: Categorize and tag expenses
  Usage: <action type="categorize_expense">{"description":"Monthly Gym","amount":-49.99,"category":"health","isRecurring":true,"frequency":"monthly"}</action>

[DOCUMENT ANALYSIS INSTRUCTIONS]
1. Analyze the document content first — identify the document type (statement, receipt, tax form, invoice).
2. Extract all financial figures and transactions with dates.
3. Calculate totals, averages, and identify spending patterns.
4. Flag any anomalies: unusual charges, potential duplicate transactions, or significant deviations.
5. Offer to categorize and commit extracted data using the available actions.
$contextPolicyBlock

[FINANCIAL RULES]
- NEVER provide specific investment advice or recommend specific financial products.
- NEVER fabricate transaction data. Only record data explicitly present in the document.
- Flag potential tax implications but do NOT provide tax advice.
- For sensitive financial concerns, recommend consulting a qualified financial advisor."""

        return "$identity$diagnosisBlock".trim()
    }

    // =========================================================================
    // Utility: Currency Formatting (KMP — no Intl.NumberFormat)
    // =========================================================================

    /**
     * Format a number as currency with 2 decimal places.
     * Example: 1234.56 → "$1,234.56"
     */
    private fun fmt(n: Double, currency: String = "USD"): String {
        val symbol = currencySymbol(currency)
        val isNegative = n < 0
        val absVal = abs(n)
        val wholePart = absVal.toLong()
        val fracPart = ((absVal - wholePart) * 100).roundToInt()
        val wholeStr = formatWithCommas(wholePart)
        val fracStr = fracPart.toString().padStart(2, '0')
        val prefix = if (isNegative) "-" else ""
        return "$prefix$symbol$wholeStr.$fracStr"
    }

    /**
     * Format a number as currency with 0 decimal places (compact).
     * Example: 1234.56 → "$1,235"
     */
    private fun fmtCompact(n: Double, currency: String = "USD"): String {
        val symbol = currencySymbol(currency)
        val isNegative = n < 0
        val rounded = abs(n).roundToInt().toLong()
        val prefix = if (isNegative) "-" else ""
        return "$prefix$symbol${formatWithCommas(rounded)}"
    }

    /** Format with 2 decimal places (no currency symbol). */
    private fun fmtTwo(n: Double): String {
        val isNegative = n < 0
        val absVal = abs(n)
        val wholePart = absVal.toLong()
        val fracPart = ((absVal - wholePart) * 100).roundToInt()
        val fracStr = fracPart.toString().padStart(2, '0')
        val prefix = if (isNegative) "-" else ""
        return "$prefix${formatWithCommas(wholePart)}.$fracStr"
    }

    /** Format with 1 decimal place (no currency symbol). */
    private fun fmtOne(n: Double): String {
        val isNegative = n < 0
        val absVal = abs(n)
        // Multiply by 10, round, then split
        val total = (absVal * 10 + 0.5).toLong()
        val wholePart = total / 10
        val fracPart = (total % 10).toInt()
        val prefix = if (isNegative) "-" else ""
        return "$prefix${formatWithCommas(wholePart)}.$fracPart"
    }

    /** Add thousand separators to a long value. */
    private fun formatWithCommas(n: Long): String {
        val s = n.toString()
        if (s.length <= 3) return s
        return s.reversed().chunked(3).joinToString(",").reversed()
    }

    /** Map currency code to symbol (common subset). */
    private fun currencySymbol(currency: String): String = when (currency.uppercase()) {
        "USD" -> "${'$'}"
        "EUR" -> "€"
        "GBP" -> "£"
        "JPY" -> "¥"
        "CAD" -> "CA${'$'}"
        "AUD" -> "A${'$'}"
        "CHF" -> "CHF "
        "INR" -> "₹"
        "BRL" -> "R${'$'}"
        "MXN" -> "MX${'$'}"
        else -> "$currency "
    }

    // =========================================================================
    // Utility: Date Approximations (KMP — no Date object)
    // =========================================================================

    /**
     * Approximate months until a target date string (YYYY-MM-DD or ISO 8601).
     * Returns null if the date cannot be parsed.
     */
    private fun approximateMonthsUntil(dateStr: String): Int? {
        val parts = dateStr.take(10).split("-")
        if (parts.size < 2) return null
        val targetYear = parts[0].toIntOrNull() ?: return null
        val targetMonth = parts[1].toIntOrNull() ?: return null

        // Use a simple epoch-month calculation for "now"
        // We don't have kotlinx.datetime here, so use a compile-time approximation
        // This will be called at runtime where the caller can provide the current date
        val currentYM = currentYearMonthParts()
        val currentYear = currentYM.first
        val currentMonth = currentYM.second

        val delta = (targetYear - currentYear) * 12 + (targetMonth - currentMonth)
        return max(0, delta)
    }

    /**
     * Approximate days until a target date string.
     * Returns null if the date cannot be parsed.
     */
    private fun approximateDaysUntil(dateStr: String): Int? {
        val months = approximateMonthsUntil(dateStr) ?: return null
        // Rough approximation: 30.44 days per month
        return (months * 30.44).roundToInt()
    }

    /**
     * Get the current year-month as "YYYY-MM" string.
     */
    private fun currentYearMonth(): String {
        val today = Clock.System.todayIn(TimeZone.currentSystemDefault())
        return "${today.year}-${today.monthNumber.toString().padStart(2, '0')}"
    }

    /**
     * Get the current year and month as a Pair.
     */
    private fun currentYearMonthParts(): Pair<Int, Int> {
        val today = Clock.System.todayIn(TimeZone.currentSystemDefault())
        return Pair(today.year, today.monthNumber)
    }
}
