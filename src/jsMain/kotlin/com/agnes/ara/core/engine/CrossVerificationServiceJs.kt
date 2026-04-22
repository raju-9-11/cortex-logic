package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.models.LedgerProfile
import com.agnes.ara.core.domain.service.ledger.CrossVerificationService
import com.agnes.ara.core.domain.services.ResonanceROIService
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.buildJsonArray
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import kotlin.js.JsExport
import kotlin.math.ceil
import kotlin.math.max
import kotlin.math.min
import kotlin.math.round

@JsExport
class CrossVerificationServiceJs {

    private val json = Json { ignoreUnknownKeys = true }

    // ── Internal model types for cross-verification methods ──────────────────

    @Serializable
    private data class BudgetItemInput(
        val id: String = "",
        val label: String = "",
        val amount: Double = 0.0,
        val taxCategory: String? = null,
    )

    @Serializable
    private data class DebtItemInput(
        val name: String = "",
        val balance: Double = 0.0,
        val apr: Double? = null,
        val minPayment: Double = 0.0,
    )

    @Serializable
    private data class SavingsGoalInput(
        val id: String = "",
        val name: String = "",
        val targetAmount: Double = 0.0,
        val currentAmount: Double? = null,
    )

    @Serializable
    private data class LedgerProfileInput(
        val fixedExpenses: List<BudgetItemInput> = emptyList(),
        val variableExpenses: List<BudgetItemInput> = emptyList(),
        val debtItems: List<DebtItemInput> = emptyList(),
        val savingsGoals: List<SavingsGoalInput> = emptyList(),
        val monthlyIncome: Double = 0.0,
    )

    // ── Keyword tables (from TS ledger-cross-verification-engine.ts) ─────────

    private val DEDUCTIBLE_KEYWORDS = listOf(
        "medical", "dental", "vision", "pharmacy", "doctor", "health", "fsa", "hsa",
        "laptop", "equipment", "hardware", "monitor", "computer", "camera", "keyboard",
        "course", "udemy", "conference", "book", "training", "certification", "education",
        "coursera", "pluralsight", "linkedin learning",
        "donation", "charity", "nonprofit", "tithe",
        "ira", "401k", "retirement", "pension",
        "business", "office supply", "professional",
    )

    private val NON_DEDUCTIBLE_KEYWORDS = listOf(
        "grocery", "groceries", "supermarket", "food", "restaurant", "coffee",
        "dining", "takeout", "takeaway",
        "clothing", "clothes", "shoes", "fashion", "apparel",
        "haircut", "beauty", "spa", "salon",
        "pet", "hobby", "toy", "game",
        "mortgage",
    )

    private val PARTIAL_KEYWORDS = listOf(
        "entertainment", "netflix", "spotify", "hulu", "streaming", "amazon prime",
        "travel", "flight", "hotel", "airbnb", "uber", "lyft",
        "phone", "mobile", "cell",
        "internet", "wifi",
        "electricity", "utilities", "utility",
        "rent",
        "software", "saas", "subscription",
    )

    // ── Existing delegated methods ───────────────────────────────────────────

    /** Compute profile-level financial friction (0–1). */
    fun computeFinancialFriction(profileJson: String): Double =
        CrossVerificationService.computeFinancialFriction(profileJson)

    /** Run coherence rules. Returns JSON CoherenceReport. */
    fun verifyCoherence(profileJson: String): String =
        CrossVerificationService.verifyCoherence(profileJson)

    /** Compute NSV financial patch. Returns JSON {financialFriction, energyBudget}. */
    fun computeNsvFinancialPatch(profileJson: String): String =
        CrossVerificationService.computeNsvFinancialPatch(profileJson)

    /**
     * Compute Resonance ROI for a ledger profile.
     * Returns JSON: { resonanceROI, financialFriction, frictionTier, analysis }
     */
    fun computeResonanceROI(profileJson: String): String {
        val profile = json.decodeFromString<LedgerProfile>(profileJson)
        val result = ResonanceROIService().calculate(profile)
        return buildJsonObject {
            put("resonanceROI", result.resonanceROI)
            put("financialFriction", result.financialFriction)
            put("frictionTier", result.frictionTier.name)
            put("analysis", result.analysis)
        }.toString()
    }

    // ── New computation methods ──────────────────────────────────────────────

    /**
     * Derives high-level tax-deductibility from an expense label.
     *
     * @param expenseJson JSON { id, label, amount, taxCategory? }
     * @return "deductible" | "non-deductible" | "partial" | "unknown"
     */
    fun categorizeTax(expenseJson: String): String {
        val expense = json.decodeFromString<BudgetItemInput>(expenseJson)
        val label = expense.label.lowercase()
        for (kw in DEDUCTIBLE_KEYWORDS) if (label.contains(kw)) return "deductible"
        for (kw in NON_DEDUCTIBLE_KEYWORDS) if (label.contains(kw)) return "non-deductible"
        for (kw in PARTIAL_KEYWORDS) if (label.contains(kw)) return "partial"
        return "unknown"
    }

    /**
     * Behavioral ROI: 10 × (1 − costPerUse / 100), clamped to [0, 10].
     *
     * @param itemJson       JSON { id, label, amount, ... }
     * @param usageFrequency Times per month the item is used.
     * @return Score in [0, 10] (one decimal place).
     */
    fun calculateBehavioralROI(itemJson: String, usageFrequency: Double): Double {
        val item = json.decodeFromString<BudgetItemInput>(itemJson)
        if (usageFrequency <= 0.0 || item.amount <= 0.0) return 0.0
        val costPerUse = item.amount / usageFrequency
        val raw = max(0.0, min(10.0, 10.0 * (1.0 - costPerUse / 100.0)))
        return round(raw * 10.0) / 10.0
    }

    /**
     * Estimates usage frequency (times/month) from expense label keywords.
     *
     * @param itemJson JSON { id, label, amount, ... }
     * @return Frequency per month (30 = daily, 4 = weekly, 1 = monthly).
     */
    fun estimateUsageFrequency(itemJson: String): Double {
        val item = json.decodeFromString<BudgetItemInput>(itemJson)
        val label = item.label.lowercase()

        val daily = listOf("netflix", "spotify", "hulu", "streaming", "gym", "fitness",
            "phone", "mobile", "internet", "wifi")
        val weekly = listOf("restaurant", "dining", "coffee", "grocery", "groceries",
            "transport", "transit")
        val monthly = listOf("rent", "mortgage", "insurance", "utilities", "electricity",
            "subscription", "saas", "software", "course", "membership")

        for (kw in daily) if (label.contains(kw)) return 30.0
        for (kw in weekly) if (label.contains(kw)) return 4.0
        for (kw in monthly) if (label.contains(kw)) return 1.0
        return 4.0
    }

    /**
     * Plans a debt snowball payoff schedule (lowest balance first).
     * Freed minimum payments cascade to the next debt when a debt is cleared.
     *
     * @param debtsJson  JSON array: [{ name, balance, rate (APR decimal), minPayment }]
     * @param extraBudget Extra monthly budget beyond all minimums.
     * @return JSON array of DebtPayoffPlan: [{ name, originalBalance, payoffOrder, monthsToPayoff, totalInterestPaid, effectiveRate }]
     */
    fun planDebtSnowball(debtsJson: String, extraBudget: Double): String {
        @Serializable
        data class DebtIn(val name: String = "", val balance: Double = 0.0, val rate: Double = 0.0, val minPayment: Double = 0.0)

        val debts = json.decodeFromString<List<DebtIn>>(debtsJson)
        if (debts.isEmpty()) return "[]"

        val sorted = debts.sortedBy { it.balance }
        val balances = sorted.map { it.balance }.toMutableList()
        val interest = MutableList(sorted.size) { 0.0 }
        val monthsPaid = MutableList(sorted.size) { 0 }
        val cleared = MutableList(sorted.size) { false }

        var snowball = max(0.0, extraBudget)
        var month = 0
        val MAX_MONTHS = 600

        while (month < MAX_MONTHS) {
            month++
            // 1. Accrue interest and apply minimum payments
            for (i in sorted.indices) {
                if (cleared[i]) continue
                val monthlyInterest = balances[i] * (sorted[i].rate / 12.0)
                balances[i] += monthlyInterest
                interest[i] += monthlyInterest
                val pay = min(sorted[i].minPayment, balances[i])
                balances[i] -= pay
            }
            // 2. Apply snowball to first non-cleared debt
            for (i in sorted.indices) {
                if (cleared[i]) continue
                val extra = min(snowball, balances[i])
                balances[i] -= extra
                break
            }
            // 3. Mark cleared debts and cascade minimums
            for (i in sorted.indices) {
                if (cleared[i]) continue
                if (balances[i] <= 0.01) {
                    balances[i] = 0.0
                    cleared[i] = true
                    monthsPaid[i] = month
                    interest[i] = round(interest[i] * 100.0) / 100.0
                    snowball += sorted[i].minPayment
                }
            }
            if (cleared.all { it }) break
        }

        val results = sorted.mapIndexed { i, d ->
            mapOf(
                "name" to d.name,
                "originalBalance" to d.balance,
                "payoffOrder" to (i + 1),
                "monthsToPayoff" to (if (monthsPaid[i] > 0) monthsPaid[i] else MAX_MONTHS),
                "totalInterestPaid" to interest[i],
                "effectiveRate" to d.rate,
            )
        }.sortedBy { it["monthsToPayoff"] as Int }.mapIndexed { idx, m ->
            m.toMutableMap().also { it["payoffOrder"] = idx + 1 }
        }

        return buildJsonArray {
            for (r in results) {
                add(buildJsonObject {
                    put("name", r["name"] as String)
                    put("originalBalance", r["originalBalance"] as Double)
                    put("payoffOrder", r["payoffOrder"] as Int)
                    put("monthsToPayoff", r["monthsToPayoff"] as Int)
                    put("totalInterestPaid", r["totalInterestPaid"] as Double)
                    put("effectiveRate", r["effectiveRate"] as Double)
                })
            }
        }.toString()
    }

    /**
     * Projects months-to-goal for a savings target with a ±10% contribution confidence band.
     *
     * @param goalJson JSON { id, name, targetAmount, currentBalance, monthlyContribution }
     * @return JSON SavingsProjection
     */
    fun projectSavingsGoal(goalJson: String): String {
        @Serializable
        data class GoalIn(
            val id: String = "", val name: String = "",
            val targetAmount: Double = 0.0, val currentBalance: Double = 0.0,
            val monthlyContribution: Double = 0.0,
        )

        val goal = json.decodeFromString<GoalIn>(goalJson)
        val remaining = max(0.0, goal.targetAmount - goal.currentBalance)
        val percentComplete = if (goal.targetAmount > 0)
            min(100.0, round((goal.currentBalance / goal.targetAmount) * 100.0))
        else 0.0

        fun calcMonths(contrib: Double): Int =
            if (contrib <= 0.0) Int.MAX_VALUE else ceil(remaining / contrib).toInt()

        val baseMonths = calcMonths(goal.monthlyContribution)
        val optimisticMonths = calcMonths(goal.monthlyContribution * 1.1)
        val pessimisticMonths = calcMonths(goal.monthlyContribution * 0.9)

        val achieveByDate: String = if (baseMonths == Int.MAX_VALUE) "Unknown" else {
            val today = js("new Date().toISOString().slice(0,10)") as String
            val year = today.substring(0, 4).toInt()
            val month = today.substring(5, 7).toInt()
            val totalMonths = month - 1 + baseMonths
            val futureYear = year + totalMonths / 12
            val futureMonth = totalMonths % 12 + 1
            val day = today.substring(8, 10)
            "${futureYear.toString().padStart(4, '0')}-${futureMonth.toString().padStart(2, '0')}-$day"
        }

        return buildJsonObject {
            put("goalId", goal.id)
            put("label", goal.name)
            put("targetAmount", goal.targetAmount)
            put("currentBalance", goal.currentBalance)
            put("monthlyContribution", goal.monthlyContribution)
            put("monthsToGoal", if (baseMonths == Int.MAX_VALUE) Double.POSITIVE_INFINITY else baseMonths.toDouble())
            put("achieveByDate", achieveByDate)
            put("confidenceBand", buildJsonObject {
                put("optimistic", if (optimisticMonths == Int.MAX_VALUE) Double.POSITIVE_INFINITY else optimisticMonths.toDouble())
                put("base", if (baseMonths == Int.MAX_VALUE) Double.POSITIVE_INFINITY else baseMonths.toDouble())
                put("pessimistic", if (pessimisticMonths == Int.MAX_VALUE) Double.POSITIVE_INFINITY else pessimisticMonths.toDouble())
            })
            put("percentComplete", percentComplete)
        }.toString()
    }

    /**
     * Estimates quarterly tax liability at a 25% marginal rate.
     *
     * @param monthlyIncome      Monthly gross income.
     * @param monthlyDeductibles Monthly total of deductible expenses.
     * @return JSON { estimatedLiability: number, nextDeadline: string (YYYY-MM-DD) }
     */
    fun estimateQuarterlyTax(monthlyIncome: Double, monthlyDeductibles: Double): String {
        val taxableIncome = max(0.0, (monthlyIncome - monthlyDeductibles) * 12.0)
        val quarterlyLiability = round(taxableIncome * 0.25 / 4.0).toInt()

        val today = js("new Date().toISOString().slice(0,10)") as String
        val year = today.substring(0, 4).toInt()
        val deadlines = listOf("$year-04-15", "$year-06-15", "$year-09-15", "${year + 1}-01-15")
        val nextDeadline = deadlines.firstOrNull { it > today } ?: deadlines[0]

        return buildJsonObject {
            put("estimatedLiability", quarterlyLiability)
            put("nextDeadline", nextDeadline)
        }.toString()
    }

    /**
     * Scans non-deductible/unknown expenses for potential tax-saving re-classifications.
     *
     * @param expensesJson JSON array of { id, label, amount, taxCategory }
     * @return JSON array of { fieldId, current, suggested, reason }
     */
    fun suggestTaxOptimizations(expensesJson: String): String {
        val expenses = json.decodeFromString<List<BudgetItemInput>>(expensesJson)
        val professionalKeywords = listOf("education", "training", "book", "office", "software", "saas")
        val healthKeywords = listOf("doctor", "health", "medical", "pharmacy", "therapy")

        return buildJsonArray {
            for (exp in expenses) {
                val cat = exp.taxCategory ?: "unknown"
                if (cat != "non-deductible" && cat != "unknown") continue
                val label = exp.label.lowercase()
                when {
                    professionalKeywords.any { label.contains(it) } -> add(buildJsonObject {
                        put("fieldId", exp.id)
                        put("current", cat)
                        put("suggested", "deductible")
                        put("reason", "Label indicates professional development or business tool usage.")
                    })
                    healthKeywords.any { label.contains(it) } -> add(buildJsonObject {
                        put("fieldId", exp.id)
                        put("current", cat)
                        put("suggested", "deductible")
                        put("reason", "Label indicates potential medical or HSA-eligible expense.")
                    })
                }
            }
        }.toString()
    }

    /**
     * Full cross-verification analysis on a LedgerIntakeProfile.
     * Pure computation — does NOT emit NSV signals.
     *
     * @param profileJson  JSON LedgerIntakeProfile (fixedExpenses, variableExpenses, debtItems, savingsGoals, monthlyIncome)
     * @param savingsContributionsJson JSON Record<goalId, monthlyContribution> (optional, pass "{}" if absent)
     * @return JSON LedgerAnalysisSummary
     */
    fun analyzeProfile(profileJson: String, savingsContributionsJson: String): String {
        val profile = json.decodeFromString<LedgerProfileInput>(profileJson)
        val savingsContributions: Map<String, Double> = try {
            json.decodeFromString(savingsContributionsJson)
        } catch (e: Exception) {
            emptyMap()
        }

        val allExpenses = profile.fixedExpenses + profile.variableExpenses

        // Tax categorization
        val categorizedExpenses = allExpenses.map { expense ->
            val taxCat = expense.taxCategory ?: run {
                val label = expense.label.lowercase()
                for (kw in DEDUCTIBLE_KEYWORDS) if (label.contains(kw)) return@run "deductible"
                for (kw in NON_DEDUCTIBLE_KEYWORDS) if (label.contains(kw)) return@run "non-deductible"
                for (kw in PARTIAL_KEYWORDS) if (label.contains(kw)) return@run "partial"
                "unknown"
            }
            expense to taxCat
        }

        val monthlyDeductible = categorizedExpenses
            .filter { it.second == "deductible" }
            .sumOf { it.first.amount }
        val ytdDeductibleTotal = monthlyDeductible * 12.0
        val estimatedTaxSaving = ytdDeductibleTotal * 0.25

        // Behavioral ROI
        val roiScores = allExpenses.map { item ->
            val label = item.label.lowercase()
            val freq = when {
                listOf("netflix", "spotify", "hulu", "streaming", "gym", "fitness", "phone", "mobile", "internet", "wifi").any { label.contains(it) } -> 30.0
                listOf("restaurant", "dining", "coffee", "grocery", "groceries", "transport", "transit").any { label.contains(it) } -> 4.0
                listOf("rent", "mortgage", "insurance", "utilities", "electricity", "subscription", "saas", "software", "course", "membership").any { label.contains(it) } -> 1.0
                else -> 4.0
            }
            val roi = if (freq <= 0.0 || item.amount <= 0.0) 0.0 else {
                val raw = max(0.0, min(10.0, 10.0 * (1.0 - item.amount / freq / 100.0)))
                round(raw * 10.0) / 10.0
            }
            Triple(item, freq, roi)
        }

        // Debt snowball
        val totalFixed = profile.fixedExpenses.sumOf { it.amount }
        val totalVariable = profile.variableExpenses.sumOf { it.amount }
        val totalMinPayments = profile.debtItems.sumOf { it.minPayment }
        val extraBudget = max(0.0, profile.monthlyIncome - totalFixed - totalVariable - totalMinPayments)

        val debtDebts = profile.debtItems.map { d ->
            "${d.name}|${d.balance}|${if (d.apr != null) d.apr / 100.0 else 0.18}|${d.minPayment}"
        }

        // Run snowball inline
        @Serializable
        data class DebtWork(val name: String, val balance: Double, val rate: Double, val minPayment: Double)
        val sortedDebts = profile.debtItems
            .map { d -> DebtWork(d.name, d.balance, if (d.apr != null) d.apr / 100.0 else 0.18, d.minPayment) }
            .sortedBy { it.balance }

        val balances = sortedDebts.map { it.balance }.toMutableList()
        val interest = MutableList(sortedDebts.size) { 0.0 }
        val monthsPaid = MutableList(sortedDebts.size) { 0 }
        val cleared = MutableList(sortedDebts.size) { false }
        var snowball = max(0.0, extraBudget)
        var month = 0
        while (month < 600) {
            month++
            for (i in sortedDebts.indices) {
                if (cleared[i]) continue
                val mi = balances[i] * (sortedDebts[i].rate / 12.0)
                balances[i] += mi; interest[i] += mi
                balances[i] -= min(sortedDebts[i].minPayment, balances[i])
            }
            for (i in sortedDebts.indices) { if (!cleared[i]) { balances[i] -= min(snowball, balances[i]); break } }
            for (i in sortedDebts.indices) {
                if (!cleared[i] && balances[i] <= 0.01) {
                    cleared[i] = true; monthsPaid[i] = month
                    interest[i] = round(interest[i] * 100.0) / 100.0
                    snowball += sortedDebts[i].minPayment
                }
            }
            if (cleared.all { it }) break
        }

        val debtPlan = sortedDebts.mapIndexed { i, d ->
            mapOf("name" to d.name, "originalBalance" to d.balance, "payoffOrder" to i + 1,
                "monthsToPayoff" to if (monthsPaid[i] > 0) monthsPaid[i] else 600,
                "totalInterestPaid" to interest[i], "effectiveRate" to d.rate)
        }.sortedBy { (it["monthsToPayoff"] as Int) }.mapIndexed { idx, m ->
            m.toMutableMap().also { it["payoffOrder"] = idx + 1 }
        }

        // Savings projections
        val monthlyBuffer = max(0.0, profile.monthlyIncome - totalFixed - totalVariable)
        val goalCount = max(1, profile.savingsGoals.size)
        val defaultContrib = monthlyBuffer / goalCount

        val today = js("new Date().toISOString().slice(0,10)") as String
        val todayYear = today.substring(0, 4).toInt()
        val todayMonth = today.substring(5, 7).toInt()

        val savingsProjections = profile.savingsGoals.map { goal ->
            val contribution = savingsContributions[goal.id] ?: defaultContrib
            val remaining = max(0.0, goal.targetAmount - (goal.currentAmount ?: 0.0))
            val percentComplete = if (goal.targetAmount > 0) min(100.0, round((goal.currentAmount ?: 0.0) / goal.targetAmount * 100.0)) else 0.0
            val baseMonths = if (contribution <= 0.0) Int.MAX_VALUE else ceil(remaining / contribution).toInt()
            val achieveBy = if (baseMonths == Int.MAX_VALUE) "Unknown" else {
                val totalMonths = todayMonth - 1 + baseMonths
                val fy = todayYear + totalMonths / 12
                val fm = totalMonths % 12 + 1
                "${fy.toString().padStart(4, '0')}-${fm.toString().padStart(2, '0')}-${today.substring(8, 10)}"
            }
            mapOf(
                "goalId" to goal.id, "label" to goal.name,
                "targetAmount" to goal.targetAmount, "currentBalance" to (goal.currentAmount ?: 0.0),
                "monthlyContribution" to contribution,
                "monthsToGoal" to baseMonths,
                "achieveByDate" to achieveBy,
                "percentComplete" to percentComplete,
            )
        }

        return buildJsonObject {
            put("categorizedExpenses", buildJsonArray {
                categorizedExpenses.forEach { (exp, cat) ->
                    add(buildJsonObject {
                        put("id", exp.id); put("label", exp.label)
                        put("amount", exp.amount); put("taxCategory", cat)
                    })
                }
            })
            put("ytdDeductibleTotal", ytdDeductibleTotal)
            put("estimatedTaxSaving", estimatedTaxSaving)
            put("roiScores", buildJsonArray {
                roiScores.forEach { (item, freq, roi) ->
                    add(buildJsonObject {
                        put("item", buildJsonObject {
                            put("id", item.id); put("label", item.label); put("amount", item.amount)
                        })
                        put("usageFrequency", freq)
                        put("roiScore", roi)
                    })
                }
            })
            put("debtSnowballPlan", buildJsonArray {
                debtPlan.forEach { r ->
                    add(buildJsonObject {
                        put("name", r["name"] as String)
                        put("originalBalance", r["originalBalance"] as Double)
                        put("payoffOrder", r["payoffOrder"] as Int)
                        put("monthsToPayoff", r["monthsToPayoff"] as Int)
                        put("totalInterestPaid", r["totalInterestPaid"] as Double)
                        put("effectiveRate", r["effectiveRate"] as Double)
                    })
                }
            })
            put("savingsProjections", buildJsonArray {
                savingsProjections.forEach { sp ->
                    add(buildJsonObject {
                        put("goalId", sp["goalId"] as String)
                        put("label", sp["label"] as String)
                        put("targetAmount", sp["targetAmount"] as Double)
                        put("currentBalance", sp["currentBalance"] as Double)
                        put("monthlyContribution", sp["monthlyContribution"] as Double)
                        put("monthsToGoal", (sp["monthsToGoal"] as Int).toDouble())
                        put("achieveByDate", sp["achieveByDate"] as String)
                        put("percentComplete", sp["percentComplete"] as Double)
                    })
                }
            })
        }.toString()
    }
}
