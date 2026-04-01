package com.agnes.nexus.core.domain.service.ledger.aggregation

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*

/**
 * Dashboard aggregation — ported from dashboard-aggregation.ts.
 *
 * Covers: dashboard metrics, runway projection, debt payoff simulation (avalanche/snowball),
 * ledger alerts, and savings goal projection.
 *
 * All public functions accept/return JSON strings at the boundary.
 * [nowMs] replaces all Date.now() / new Date() calls.
 *
 * Complexity:
 *   computeDashboardMetrics    — O(n) transactions
 *   computeRunwayProjection    — O(n) transactions + O(d) debt items
 *   computeDebtPayoffSchedule  — O(m * d) where m = months (≤ 360), d = debt items
 *   evaluateAlerts             — O(b + g) budget categories + goals
 *   computeSavingsProjection   — O(1)
 */
object DashboardAggregation {

    private val json = Json { ignoreUnknownKeys = true }

    // ── Internal model types ──────────────────────────────────────────────────

    @Serializable
    private data class Transaction(
        val id: String,
        val date: String,
        val description: String,
        val amount: Double,
        val type: String,
        val category: String,
    )

    @Serializable
    private data class Account(
        val id: String,
        val type: String,
        val balance: Double,
    )

    @Serializable
    private data class DebtItem(
        val id: String,
        val name: String,
        val balance: Double,
        val minPayment: Double,
        val apr: Double,
        val interestPaid: Double? = null,
        val type: String? = null,
        val originalBalance: Double? = null,
        val dueDay: Int? = null,
        val isVariableRate: Boolean? = null,
    )

    @Serializable
    private data class BudgetLineItem(
        val id: String,
        val label: String,
        val amount: Double,
    )

    @Serializable
    private data class SavingsGoal(
        val id: String,
        val name: String,
        val targetAmount: Double,
        val currentAmount: Double,
        val targetDate: String? = null,
        val monthlyContribution: Double? = null,
    )

    @Serializable
    private data class FinancialGoal(
        val id: String,
        val name: String,
        val targetAmount: Double,
        val currentAmount: Double,
        val targetDate: String? = null,
        val monthlyContribution: Double = 0.0,
    )

    /**
     * Minimal profile view for runway/alert functions.
     */
    @Serializable
    private data class LedgerProfile(
        val monthlyIncome: Double = 0.0,
        val transactions: List<Transaction> = emptyList(),
        val accounts: List<Account> = emptyList(),
        val debtItems: List<DebtItem> = emptyList(),
        val fixedExpenses: List<BudgetLineItem> = emptyList(),
        val variableExpenses: List<BudgetLineItem> = emptyList(),
        val savingsGoals: List<SavingsGoal> = emptyList(),
        val financialGoals: List<FinancialGoal> = emptyList(),
        val currency: String = "USD",
    )

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * Compute high-level dashboard metrics from transactions and optional accounts.
     *
     * @param transactionsJson JSON array of Transaction objects.
     * @param totalDebt        Total debt balance (defaults to 0).
     * @param accountsJson     JSON array of Account objects (optional; pass "[]" if absent).
     * @param nowMs            Current epoch milliseconds.
     * @return JSON object: { currentMonthIncome, currentMonthExpenses, currentMonthNet,
     *         totalBalance, totalDebt, averageMonthlyExpenses, savingsRate (nullable),
     *         topSpendCategory (nullable), hasTransactions }.
     */
    fun computeDashboardMetrics(
        transactionsJson: String,
        totalDebt: Double = 0.0,
        accountsJson: String = "[]",
        nowMs: Long,
    ): String {
        val transactions = json.decodeFromString<List<Transaction>>(transactionsJson)
        val accounts = json.decodeFromString<List<Account>>(accountsJson)

        val cm = LedgerAggregationUtils.monthsAgo(0, nowMs)
        val (start, end) = LedgerAggregationUtils.getMonthBounds(cm)
        val currentTxs = transactions.filter { it.date >= start && it.date <= end }

        var currentMonthIncome = 0.0
        var currentMonthExpenses = 0.0

        for (tx in currentTxs) {
            when (tx.type) {
                "income" -> currentMonthIncome = LedgerAggregationUtils.round2(currentMonthIncome + tx.amount)
                "expense" -> currentMonthExpenses = LedgerAggregationUtils.round2(currentMonthExpenses + tx.amount)
            }
        }

        val currentMonthNet = LedgerAggregationUtils.round2(currentMonthIncome - currentMonthExpenses)

        val totalBalance = if (accounts.isNotEmpty()) {
            LedgerAggregationUtils.round2(accounts.fold(0.0) { sum, a -> sum + a.balance })
        } else {
            transactions.fold(0.0) { bal, tx ->
                LedgerAggregationUtils.round2(if (tx.type == "income") bal + tx.amount else bal - tx.amount)
            }
        }

        val last3Start = LedgerAggregationUtils.getMonthBounds(LedgerAggregationUtils.monthsAgo(2, nowMs)).first
        val last3End = LedgerAggregationUtils.getMonthBounds(LedgerAggregationUtils.monthsAgo(0, nowMs)).second
        val last3Expenses = transactions
            .filter { it.date >= last3Start && it.date <= last3End && it.type == "expense" }
            .fold(0.0) { sum, tx -> LedgerAggregationUtils.round2(sum + tx.amount) }
        val averageMonthlyExpenses = LedgerAggregationUtils.round2(last3Expenses / 3.0)

        val savingsRate = if (currentMonthIncome > 0.0) {
            LedgerAggregationUtils.round2(currentMonthNet / currentMonthIncome)
        } else null

        val categorySpendJson = TransactionAggregation.computeCategorySpend(
            transactionsJson, nowMs, start, end
        )
        val categorySpendArray = json.parseToJsonElement(categorySpendJson).jsonArray
        val topSpendCategory = categorySpendArray.firstOrNull()
            ?.jsonObject?.get("category")?.jsonPrimitive?.contentOrNull

        return buildJsonObject {
            put("currentMonthIncome", currentMonthIncome)
            put("currentMonthExpenses", currentMonthExpenses)
            put("currentMonthNet", currentMonthNet)
            put("totalBalance", totalBalance)
            put("totalDebt", totalDebt)
            put("averageMonthlyExpenses", averageMonthlyExpenses)
            if (savingsRate != null) put("savingsRate", savingsRate) else put("savingsRate", JsonNull)
            if (topSpendCategory != null) put("topSpendCategory", topSpendCategory) else put("topSpendCategory", JsonNull)
            put("hasTransactions", transactions.isNotEmpty())
        }.toString()
    }

    /**
     * Compute a runway projection from a ledger profile, estimating how many months
     * of liquidity remain if income falls short of expenses.
     *
     * Status values: "needs_data" | "stable" | "healthy" | "watch" | "critical" | "depleted"
     *
     * @param profileJson JSON object conforming to LedgerIntakeProfile.
     * @param nowMs       Current epoch milliseconds.
     * @return JSON object conforming to RunwayProjection, or "null" if profile is absent.
     */
    fun computeRunwayProjection(profileJson: String?, nowMs: Long): String {
        if (profileJson == null) return "null"

        val profile = json.decodeFromString<LedgerProfile>(profileJson)
        val transactions = profile.transactions
        val totalDebt = profile.debtItems.fold(0.0) { sum, d -> LedgerAggregationUtils.round2(sum + d.balance) }
        val metricsJson = computeDashboardMetrics(
            json.encodeToString(kotlinx.serialization.builtins.ListSerializer(Transaction.serializer()), transactions),
            totalDebt,
            json.encodeToString(kotlinx.serialization.builtins.ListSerializer(Account.serializer()), profile.accounts),
            nowMs,
        )
        val metrics = json.parseToJsonElement(metricsJson).jsonObject

        val plannedExpenseBaseline = LedgerAggregationUtils.round2(
            profile.fixedExpenses.fold(0.0) { s, i -> s + i.amount } +
            profile.variableExpenses.fold(0.0) { s, i -> s + i.amount } +
            profile.debtItems.fold(0.0) { s, i -> s + i.minPayment }
        )

        val reserveSavings = LedgerAggregationUtils.round2(
            profile.savingsGoals.fold(0.0) { s, g -> s + g.currentAmount }
        )
        val ledgerBalance = LedgerAggregationUtils.round2(
            maxOf(metrics["totalBalance"]?.jsonPrimitive?.doubleOrNull ?: 0.0, 0.0)
        )
        val modeledLiquidity = LedgerAggregationUtils.round2(ledgerBalance + reserveSavings)

        val currentMonthIncome = metrics["currentMonthIncome"]?.jsonPrimitive?.doubleOrNull ?: 0.0
        val averageMonthlyExpenses = metrics["averageMonthlyExpenses"]?.jsonPrimitive?.doubleOrNull ?: 0.0
        val currentMonthExpenses = metrics["currentMonthExpenses"]?.jsonPrimitive?.doubleOrNull ?: 0.0

        val monthlyIncome = LedgerAggregationUtils.round2(
            if (profile.monthlyIncome > 0.0) profile.monthlyIncome else currentMonthIncome
        )
        val monthlyExpenseBaseline = LedgerAggregationUtils.round2(
            if (plannedExpenseBaseline > 0.0) plannedExpenseBaseline
            else maxOf(averageMonthlyExpenses, currentMonthExpenses)
        )
        val monthlyBuffer = LedgerAggregationUtils.round2(monthlyIncome - monthlyExpenseBaseline)
        val monthlyBurn = LedgerAggregationUtils.round2(maxOf(monthlyExpenseBaseline - monthlyIncome, 0.0))
        val monthsRemaining: Double? = if (monthlyBurn > 0.0) LedgerAggregationUtils.round2(modeledLiquidity / monthlyBurn) else null
        val daysRemaining: Int? = if (monthsRemaining != null) maxOf(0, (monthsRemaining * 30.4).toInt()) else null

        val source = when {
            profile.monthlyIncome > 0.0 || plannedExpenseBaseline > 0.0 ->
                if (transactions.isNotEmpty()) "profile+transactions" else "profile"
            else -> "transactions"
        }

        val status = when {
            monthlyIncome <= 0.0 && monthlyExpenseBaseline <= 0.0 && modeledLiquidity <= 0.0 -> "needs_data"
            monthlyBurn <= 0.0 -> "stable"
            modeledLiquidity <= 0.0 -> "depleted"
            (monthsRemaining ?: 0.0) < 3.0 -> "critical"
            (monthsRemaining ?: 0.0) < 6.0 -> "watch"
            else -> "healthy"
        }

        return buildJsonObject {
            put("source", source)
            put("modeledLiquidity", modeledLiquidity)
            put("ledgerBalance", ledgerBalance)
            put("reserveSavings", reserveSavings)
            put("monthlyIncome", monthlyIncome)
            put("monthlyExpenseBaseline", monthlyExpenseBaseline)
            put("monthlyBurn", monthlyBurn)
            put("monthlyBuffer", monthlyBuffer)
            if (monthsRemaining != null) put("monthsRemaining", monthsRemaining) else put("monthsRemaining", JsonNull)
            if (daysRemaining != null) put("daysRemaining", daysRemaining) else put("daysRemaining", JsonNull)
            put("status", status)
        }.toString()
    }

    /**
     * Compute a debt payoff schedule using either the avalanche (highest APR first)
     * or snowball (lowest balance first) strategy, with an optional extra monthly payment.
     *
     * Returns monthly snapshots up to 360 months (30 years) maximum.
     *
     * @param debtItemsJson        JSON array of DebtItem objects.
     * @param strategy             "avalanche" or "snowball".
     * @param extraMonthlyPayment  Additional payment above minimums (default 0).
     * @return JSON object: { strategy, months, totalInterestPaid, monthsToPayoff, interestSavedVsMinimum }.
     */
    fun computeDebtPayoffSchedule(
        debtItemsJson: String,
        strategy: String,
        extraMonthlyPayment: Double = 0.0,
    ): String {
        val debts = json.decodeFromString<List<DebtItem>>(debtItemsJson)
        val activeDebts = debts.filter { it.balance > 0.0 }

        val mainResult = runPayoffSimulation(activeDebts, strategy, maxOf(extraMonthlyPayment, 0.0))
        val minimumOnlyResult = runPayoffSimulation(activeDebts, "avalanche", 0.0)

        return buildJsonObject {
            put("strategy", strategy)
            put("months", JsonArray(mainResult.months))
            put("totalInterestPaid", mainResult.totalInterestPaid)
            put("monthsToPayoff", mainResult.months.size)
            put(
                "interestSavedVsMinimum",
                LedgerAggregationUtils.round2(minimumOnlyResult.totalInterestPaid - mainResult.totalInterestPaid)
            )
        }.toString()
    }

    /**
     * Evaluate budget and goal alerts from a ledger profile.
     *
     * Alert types produced:
     *   "budget_over"        — category actual > allocated (severity: "danger")
     *   "budget_80pct"       — category at >= 80% of allocation (severity: "warning")
     *   "negative_cashflow"  — current month net < 0 (severity: "danger")
     *   "goal_near_complete" — goal >= 90% funded but incomplete (severity: "info")
     *   "goal_stale"         — goal < 90% funded with ≤ 30 days remaining (severity: "warning")
     *
     * @param profileJson         JSON object conforming to LedgerIntakeProfile.
     * @param budgetWithActualsJson JSON array of BudgetPerformance objects (from BudgetAggregation).
     * @param currentMonthIncome  Current month income amount.
     * @param currentMonthExpenses Current month expenses amount.
     * @param currentMonthNet     Current month net amount.
     * @param nowMs               Current epoch milliseconds.
     * @return JSON array of LedgerAlert objects:
     *         { id, type, severity, title, message, entityId? }.
     */
    fun evaluateAlerts(
        profileJson: String?,
        budgetWithActualsJson: String,
        currentMonthIncome: Double,
        currentMonthExpenses: Double,
        currentMonthNet: Double,
        nowMs: Long,
    ): String {
        if (profileJson == null) return "[]"

        val profile = json.decodeFromString<LedgerProfile>(profileJson)
        val budgetActuals = json.parseToJsonElement(budgetWithActualsJson).jsonArray
        val currency = profile.currency.ifEmpty { "USD" }
        val alerts = mutableListOf<JsonObject>()

        // Budget alerts
        for (elem in budgetActuals) {
            val cat = elem.jsonObject
            val allocated = cat["allocated"]?.jsonPrimitive?.doubleOrNull ?: 0.0
            if (allocated <= 0.0) continue

            val actual = cat["actual"]?.jsonPrimitive?.doubleOrNull ?: 0.0
            val categoryId = cat["categoryId"]?.jsonPrimitive?.contentOrNull ?: ""
            val categoryName = cat["categoryName"]?.jsonPrimitive?.contentOrNull ?: ""
            val spendPct = (actual / allocated) * 100.0

            if (actual > allocated) {
                val overage = LedgerAggregationUtils.round2(actual - allocated)
                alerts.add(buildJsonObject {
                    put("id", "budget_over_$categoryId")
                    put("type", "budget_over")
                    put("severity", "danger")
                    put("title", "$categoryName Over Budget")
                    put("message", "$categoryName is over budget by ${formatAmount(overage, currency)}")
                    put("entityId", categoryId)
                })
            } else if (spendPct >= 80.0) {
                val displayPct = spendPct.toInt()
                alerts.add(buildJsonObject {
                    put("id", "budget_80pct_$categoryId")
                    put("type", "budget_80pct")
                    put("severity", "warning")
                    put("title", "$categoryName Approaching Limit")
                    put("message", "$categoryName is at $displayPct% of budget")
                    put("entityId", categoryId)
                })
            }
        }

        // Negative cashflow alert
        if (currentMonthNet < 0.0) {
            val deficit = formatAmount(kotlin.math.abs(currentMonthNet), currency)
            alerts.add(buildJsonObject {
                put("id", "negative_cashflow_current")
                put("type", "negative_cashflow")
                put("severity", "danger")
                put("title", "Negative Cashflow")
                put("message", "Spending exceeds income this month by $deficit")
            })
        }

        // Goal alerts
        val msPerDay = 86_400_000L
        for (goal in profile.financialGoals) {
            if (goal.targetAmount <= 0.0) continue
            val fundedRatio = goal.currentAmount / goal.targetAmount
            val fundedPct = (fundedRatio * 100.0).toInt()

            if (fundedRatio >= 0.9 && goal.currentAmount < goal.targetAmount) {
                alerts.add(buildJsonObject {
                    put("id", "goal_near_complete_${goal.id}")
                    put("type", "goal_near_complete")
                    put("severity", "info")
                    put("title", "${goal.name} — Almost There!")
                    put("message", "${goal.name} is 90%+ funded — finish line in sight!")
                    put("entityId", goal.id)
                })
            } else if (goal.targetDate != null) {
                val targetMs = isoToEpochMs(goal.targetDate)
                val daysLeft = ((targetMs - nowMs) / msPerDay).toInt()
                if (daysLeft in 0..30 && fundedRatio < 0.9) {
                    alerts.add(buildJsonObject {
                        put("id", "goal_stale_${goal.id}")
                        put("type", "goal_stale")
                        put("severity", "warning")
                        put("title", "${goal.name} — Falling Behind")
                        put("message", "${goal.name}: $fundedPct% funded with $daysLeft days left")
                        put("entityId", goal.id)
                    })
                }
            }
        }

        return JsonArray(alerts).toString()
    }

    /**
     * Compute a savings projection for a single financial goal, estimating months
     * to completion and whether the goal is on track relative to any target date.
     *
     * @param goalJson JSON object of a FinancialGoal.
     * @param nowMs    Current epoch milliseconds.
     * @return JSON object: { goalId, monthsToTarget (nullable), projectedCompletionDate (nullable),
     *         onTrack, monthlyRequired, surplusOrDeficit }.
     */
    fun computeSavingsProjection(goalJson: String, nowMs: Long): String {
        val goal = json.decodeFromString<FinancialGoal>(goalJson)
        val remaining = goal.targetAmount - goal.currentAmount

        if (remaining <= 0.0) {
            return buildJsonObject {
                put("goalId", goal.id)
                put("monthsToTarget", 0)
                put("projectedCompletionDate", JsonNull)
                put("onTrack", true)
                put("monthlyRequired", 0.0)
                put("surplusOrDeficit", 0.0)
            }.toString()
        }

        val monthlyContribution = goal.monthlyContribution

        if (monthlyContribution <= 0.0) {
            val monthlyRequired = if (goal.targetDate != null) {
                val monthsUntilTarget = monthsBetween(nowMs, isoToEpochMs(goal.targetDate))
                if (monthsUntilTarget > 0) remaining / monthsUntilTarget else remaining
            } else 0.0

            return buildJsonObject {
                put("goalId", goal.id)
                put("monthsToTarget", JsonNull)
                put("projectedCompletionDate", JsonNull)
                put("onTrack", false)
                put("monthlyRequired", monthlyRequired)
                put("surplusOrDeficit", monthlyContribution - monthlyRequired)
            }.toString()
        }

        val monthsToTarget = kotlin.math.ceil(remaining / monthlyContribution).toInt()
        val projectedCompletionDate = addMonthsToEpochMs(nowMs, monthsToTarget)

        var onTrack = true
        val monthlyRequired: Double

        if (goal.targetDate != null) {
            onTrack = projectedCompletionDate <= goal.targetDate
            val monthsUntilTargetDate = monthsBetween(nowMs, isoToEpochMs(goal.targetDate))
            monthlyRequired = if (monthsUntilTargetDate > 0) remaining / monthsUntilTargetDate else remaining
        } else {
            monthlyRequired = monthlyContribution
        }

        return buildJsonObject {
            put("goalId", goal.id)
            put("monthsToTarget", monthsToTarget)
            put("projectedCompletionDate", projectedCompletionDate)
            put("onTrack", onTrack)
            put("monthlyRequired", monthlyRequired)
            put("surplusOrDeficit", monthlyContribution - monthlyRequired)
        }.toString()
    }

    // ── Private: debt payoff simulation ──────────────────────────────────────

    private data class SimResult(val months: List<JsonObject>, val totalInterestPaid: Double)

    private data class SimDebt(
        val id: String,
        val name: String,
        var balance: Double,
        val minPayment: Double,
        val apr: Double,
    )

    private fun runPayoffSimulation(
        rawDebts: List<DebtItem>,
        strategy: String,
        extraMonthlyPayment: Double,
    ): SimResult {
        val MAX_MONTHS = 360
        val ZERO_THRESHOLD = 0.005

        val active = rawDebts
            .filter { it.balance > ZERO_THRESHOLD && it.minPayment >= 0.0 && it.apr >= 0.0 }
            .map { SimDebt(it.id, it.name, it.balance, maxOf(it.minPayment, 0.0), it.apr) }

        if (active.isEmpty()) return SimResult(emptyList(), 0.0)

        val totalBudget = LedgerAggregationUtils.round2(
            active.fold(0.0) { s, d -> s + d.minPayment } + extraMonthlyPayment
        )

        val paidOff = mutableSetOf<String>()
        val months = mutableListOf<JsonObject>()
        var totalInterestPaid = 0.0

        for (m in 1..MAX_MONTHS) {
            val currentActive = active.filter { it.id !in paidOff }
            if (currentActive.isEmpty()) break

            // Accrue interest
            for (debt in currentActive) {
                val interest = LedgerAggregationUtils.round2(debt.balance * (debt.apr / 100.0 / 12.0))
                debt.balance = LedgerAggregationUtils.round2(debt.balance + interest)
                totalInterestPaid = LedgerAggregationUtils.round2(totalInterestPaid + interest)
            }

            // Apply minimum payments
            var remainingBudget = totalBudget
            for (debt in currentActive) {
                val payment = minOf(debt.minPayment, debt.balance)
                debt.balance = LedgerAggregationUtils.round2(maxOf(0.0, debt.balance - payment))
                remainingBudget = LedgerAggregationUtils.round2(remainingBudget - payment)
                if (debt.balance <= ZERO_THRESHOLD) {
                    debt.balance = 0.0
                    paidOff.add(debt.id)
                }
            }

            // Apply extra payment to priority target
            if (remainingBudget > ZERO_THRESHOLD) {
                val prioritized = active
                    .filter { it.id !in paidOff }
                    .sortedWith(Comparator { a, b ->
                        if (strategy == "avalanche") b.apr.compareTo(a.apr)
                        else a.balance.compareTo(b.balance)
                    })

                for (debt in prioritized) {
                    if (remainingBudget <= ZERO_THRESHOLD) break
                    val payment = minOf(remainingBudget, debt.balance)
                    debt.balance = LedgerAggregationUtils.round2(maxOf(0.0, debt.balance - payment))
                    remainingBudget = LedgerAggregationUtils.round2(remainingBudget - payment)
                    if (debt.balance <= ZERO_THRESHOLD) {
                        debt.balance = 0.0
                        paidOff.add(debt.id)
                    }
                }
            }

            val totalBalance = LedgerAggregationUtils.round2(active.fold(0.0) { s, d -> s + d.balance })
            months.add(buildJsonObject {
                put("month", m)
                put("totalBalance", totalBalance)
                put("totalInterestPaid", LedgerAggregationUtils.round2(totalInterestPaid))
                put("debts", JsonArray(active.map { d ->
                    buildJsonObject {
                        put("id", d.id)
                        put("name", d.name)
                        put("balance", d.balance)
                    }
                }))
            })

            if (totalBalance <= ZERO_THRESHOLD) break
        }

        return SimResult(months, LedgerAggregationUtils.round2(totalInterestPaid))
    }

    // ── Private: date/money helpers ───────────────────────────────────────────

    /** Format currency amount as a simple string (e.g. "USD 123.45"). */
    private fun formatAmount(amount: Double, currency: String): String =
        "$currency ${(amount * 100.0).toLong().let { it / 100.0 }}"

    /** Convert ISO date string to epoch milliseconds. */
    private fun isoToEpochMs(iso: String): Long {
        val datePart = iso.take(10)
        val parts = datePart.split("-")
        val year = parts.getOrNull(0)?.toIntOrNull() ?: return 0L
        val month = parts.getOrNull(1)?.toIntOrNull() ?: return 0L
        val day = parts.getOrNull(2)?.toIntOrNull() ?: return 0L
        var days = 0L
        for (y in 1970 until year) days += if (isLeapYear(y)) 366L else 365L
        val md = if (isLeapYear(year)) intArrayOf(31,29,31,30,31,30,31,31,30,31,30,31)
                 else intArrayOf(31,28,31,30,31,30,31,31,30,31,30,31)
        for (m in 1 until month) days += md[m - 1]
        days += (day - 1)
        return days * 86_400_000L
    }

    /** Add n calendar months to an epoch ms value and return "YYYY-MM-DD". */
    private fun addMonthsToEpochMs(epochMs: Long, months: Int): String {
        val totalDays = epochMs / 86_400_000L
        val (year, month, day) = epochDayToYMD(totalDays.toInt())
        var newMonth = month + months
        var newYear = year
        while (newMonth > 12) { newMonth -= 12; newYear++ }
        val maxDay = daysInMonth(newYear, newMonth)
        val clampedDay = minOf(day, maxDay)
        fun p2(v: Int) = v.toString().padStart(2, '0')
        return "$newYear-${p2(newMonth)}-${p2(clampedDay)}"
    }

    /** Number of calendar months between two epoch ms values (truncated). */
    private fun monthsBetween(fromMs: Long, toMs: Long): Double {
        val (y1, m1, _) = epochDayToYMD((fromMs / 86_400_000L).toInt())
        val (y2, m2, _) = epochDayToYMD((toMs / 86_400_000L).toInt())
        return ((y2 - y1) * 12 + (m2 - m1)).toDouble()
    }

    private data class YMD(val year: Int, val month: Int, val day: Int)

    private fun epochDayToYMD(totalDays: Int): YMD {
        var remaining = totalDays
        var year = 1970
        while (true) {
            val diy = if (isLeapYear(year)) 366 else 365
            if (remaining < diy) break
            remaining -= diy
            year++
        }
        val md = if (isLeapYear(year)) intArrayOf(31,29,31,30,31,30,31,31,30,31,30,31)
                 else intArrayOf(31,28,31,30,31,30,31,31,30,31,30,31)
        var month = 0
        while (month < 12 && remaining >= md[month]) { remaining -= md[month]; month++ }
        return YMD(year, month + 1, remaining + 1)
    }

    private fun daysInMonth(year: Int, month: Int): Int = when (month) {
        2 -> if (isLeapYear(year)) 29 else 28
        4, 6, 9, 11 -> 30
        else -> 31
    }

    private fun isLeapYear(year: Int): Boolean =
        (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)
}
