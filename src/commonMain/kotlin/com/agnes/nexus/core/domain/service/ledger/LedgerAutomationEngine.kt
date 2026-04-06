package com.agnes.nexus.core.domain.service.ledger

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*

/**
 * Pure commonMain engine for evaluating automation rules against a ledger profile.
 *
 * Ported from automation-engine.ts. All logic is deterministic given the inputs;
 * UUID generation is intentionally excluded — the jsMain facade injects UUIDs.
 *
 * Complexity: O(R * T) where R = number of rules and T = number of transactions.
 * Space: O(S) for the transaction-description lookup set where S = subscriptions.
 */
object LedgerAutomationEngine {

    private val json = Json { ignoreUnknownKeys = true }

    // ── Internal model types ─────────────────────────────────────────────────

    @Serializable
    data class AutomationRule(
        val id: String,
        val name: String,
        val isEnabled: Boolean = true,
        val triggerType: String,
        val triggerThreshold: Double? = null,
        val triggerEntityId: String? = null,
        val triggerCategory: String? = null,
        val suggestionType: String,
        val suggestionMessage: String,
        val createdAt: String,
    )

    @Serializable
    data class AutomationSuggestion(
        val id: String,
        val ruleId: String,
        val ruleName: String,
        val suggestionType: String,
        val message: String,
        val generatedAt: String,
    )

    @Serializable
    private data class Transaction(
        val id: String = "",
        val date: String = "",
        val description: String = "",
        val amount: Double = 0.0,
        val type: String = "expense",
        val category: String = "",
    )

    @Serializable
    private data class Account(
        val id: String = "",
        val balance: Double = 0.0,
    )

    @Serializable
    private data class FinancialGoal(
        val id: String = "",
        val targetAmount: Double = 0.0,
        val currentAmount: Double = 0.0,
    )

    @Serializable
    private data class Subscription(
        val id: String = "",
        val name: String = "",
        val status: String = "active",
        val createdAt: String = "",
    )

    @Serializable
    private data class NetWorthSnapshot(
        val id: String = "",
        val date: String = "",
        val netWorth: Double = 0.0,
    )

    @Serializable
    private data class RecurringRule(
        val id: String = "",
        val isActive: Boolean = true,
        val nextDueDate: String = "",
    )

    @Serializable
    private data class LedgerProfile(
        val automationRules: List<AutomationRule> = emptyList(),
        val dismissedSuggestionIds: List<String> = emptyList(),
        val transactions: List<Transaction> = emptyList(),
        val accounts: List<Account> = emptyList(),
        val financialGoals: List<FinancialGoal> = emptyList(),
        val subscriptions: List<Subscription> = emptyList(),
        val netWorthHistory: List<NetWorthSnapshot> = emptyList(),
        val recurringRules: List<RecurringRule> = emptyList(),
    )

    // ── Public API ───────────────────────────────────────────────────────────

    /**
     * Evaluate all enabled automation rules against the profile.
     *
     * @param profileJson  JSON conforming to LedgerIntakeProfile (from TS).
     * @param nowIso       ISO-8601 instant string representing "now" (makes logic testable).
     * @param uuidProvider Lambda that produces a new UUID string for each suggestion.
     * @return List of AutomationSuggestion values for triggered, non-dismissed rules.
     */
    fun evaluateRules(
        profileJson: String,
        nowIso: String,
        uuidProvider: () -> String,
    ): List<AutomationSuggestion> {
        val profile = json.decodeFromString<LedgerProfile>(profileJson)
        val dismissed = profile.dismissedSuggestionIds.toHashSet()

        // Parse "now" from ISO string — YYYY-MM-DDTHH:mm:ss...
        val nowParts = nowIso.split("T")
        val nowDateStr = nowParts.getOrElse(0) { nowIso.take(10) }
        val nowDate = parseDate(nowDateStr)
        val nowYear = nowDate.first
        val nowMonth = nowDate.second
        val nowDay = nowDate.third

        val suggestions = mutableListOf<AutomationSuggestion>()

        for (rule in profile.automationRules) {
            if (!rule.isEnabled) continue

            val triggered = when (rule.triggerType) {
                "spending_exceeds" -> evaluateSpendingExceeds(rule, profile, nowYear, nowMonth)
                "balance_below" -> evaluateBalanceBelow(rule, profile)
                "goal_progress_below" -> evaluateGoalProgressBelow(rule, profile)
                "subscription_unused" -> evaluateSubscriptionUnused(profile, nowIso)
                "net_worth_drops" -> evaluateNetWorthDrops(rule, profile)
                "bill_overdue" -> evaluateBillOverdue(profile, nowYear, nowMonth, nowDay)
                "month_end" -> evaluateMonthEnd(nowYear, nowMonth, nowDay)
                else -> false
            }

            if (triggered) {
                val dayKey = "${rule.id}_$nowDateStr"
                if (!dismissed.contains(dayKey) && !dismissed.contains(rule.id)) {
                    suggestions.add(
                        AutomationSuggestion(
                            id = uuidProvider(),
                            ruleId = rule.id,
                            ruleName = rule.name,
                            suggestionType = rule.suggestionType,
                            message = rule.suggestionMessage,
                            generatedAt = nowIso,
                        )
                    )
                }
            }
        }

        return suggestions
    }

    /**
     * Return the default set of automation rules for a new user.
     *
     * @param nowIso       ISO-8601 string for the `createdAt` timestamp.
     * @param uuidProvider Lambda that produces a new UUID for each rule's id.
     */
    fun getDefaultRules(nowIso: String, uuidProvider: () -> String): List<AutomationRule> {
        return listOf(
            AutomationRule(
                id = uuidProvider(),
                name = "High Dining Spend",
                isEnabled = true,
                triggerType = "spending_exceeds",
                triggerThreshold = 300.0,
                triggerCategory = "Food",
                suggestionType = "review_budget",
                suggestionMessage = "Your dining/food spend exceeded \$300 this month. Consider meal prepping or cooking at home to save.",
                createdAt = nowIso,
            ),
            AutomationRule(
                id = uuidProvider(),
                name = "Low Balance Warning",
                isEnabled = true,
                triggerType = "balance_below",
                triggerThreshold = 500.0,
                suggestionType = "transfer_to_savings",
                suggestionMessage = "Your total balance dropped below \$500. Review upcoming expenses and consider pausing non-essential subscriptions.",
                createdAt = nowIso,
            ),
            AutomationRule(
                id = uuidProvider(),
                name = "Month-End Snapshot",
                isEnabled = true,
                triggerType = "month_end",
                suggestionType = "record_snapshot",
                suggestionMessage = "End of month \u2014 a good time to record a net worth snapshot and review your budget performance.",
                createdAt = nowIso,
            ),
        )
    }

    // ── Trigger evaluators ───────────────────────────────────────────────────

    private fun evaluateSpendingExceeds(
        rule: AutomationRule,
        profile: LedgerProfile,
        nowYear: Int,
        nowMonth: Int,
    ): Boolean {
        val threshold = rule.triggerThreshold ?: return false
        val monthPrefix = "$nowYear-${nowMonth.toString().padStart(2, '0')}"
        val monthlySpend = profile.transactions
            .filter { tx -> tx.type == "expense" && tx.date.startsWith(monthPrefix) }
            .filter { tx -> rule.triggerCategory == null || tx.category == rule.triggerCategory }
            .sumOf { it.amount }
        return monthlySpend > threshold
    }

    private fun evaluateBalanceBelow(rule: AutomationRule, profile: LedgerProfile): Boolean {
        val threshold = rule.triggerThreshold ?: return false
        val totalBalance = profile.accounts.sumOf { it.balance }
        return totalBalance < threshold
    }

    private fun evaluateGoalProgressBelow(rule: AutomationRule, profile: LedgerProfile): Boolean {
        val threshold = rule.triggerThreshold ?: return false
        val targetGoal = if (rule.triggerEntityId != null)
            profile.financialGoals.find { it.id == rule.triggerEntityId }
        else
            profile.financialGoals.firstOrNull()
        if (targetGoal == null || targetGoal.targetAmount <= 0.0) return false
        val pct = targetGoal.currentAmount / targetGoal.targetAmount
        return pct < threshold / 100.0
    }

    private fun evaluateSubscriptionUnused(profile: LedgerProfile, nowIso: String): Boolean {
        val nowMs = parseIsoToEpochMs(nowIso)
        val txDescriptions = profile.transactions.map { it.description.lowercase() }.toHashSet()
        return profile.subscriptions.any { sub ->
            if (sub.status != "active") return@any false
            val createdMs = parseIsoToEpochMs(sub.createdAt)
            val daysSinceCreation = (nowMs - createdMs) / 86_400_000.0
            val hasMatchingTx = txDescriptions.contains(sub.name.lowercase())
            daysSinceCreation > 60.0 && !hasMatchingTx
        }
    }

    private fun evaluateNetWorthDrops(rule: AutomationRule, profile: LedgerProfile): Boolean {
        val threshold = rule.triggerThreshold ?: return false
        val history = profile.netWorthHistory
        if (history.size < 2) return false
        val sorted = history.sortedByDescending { it.date }
        val prev = sorted[1].netWorth
        val curr = sorted[0].netWorth
        val drop = if (prev > 0.0) (prev - curr) / prev else 0.0
        return drop > threshold / 100.0
    }

    private fun evaluateBillOverdue(
        profile: LedgerProfile,
        nowYear: Int,
        nowMonth: Int,
        nowDay: Int,
    ): Boolean {
        val todayStr = "$nowYear-${nowMonth.toString().padStart(2, '0')}-${nowDay.toString().padStart(2, '0')}"
        return profile.recurringRules.any { r ->
            if (!r.isActive) return@any false
            val dueStr = r.nextDueDate.take(10)
            dueStr < todayStr
        }
    }

    private fun evaluateMonthEnd(nowYear: Int, nowMonth: Int, nowDay: Int): Boolean {
        val lastDay = daysInMonth(nowYear, nowMonth)
        return nowDay >= lastDay - 2
    }

    // ── Date helpers ─────────────────────────────────────────────────────────

    /** Returns (year, month, day) from "YYYY-MM-DD". */
    private fun parseDate(dateStr: String): Triple<Int, Int, Int> {
        val parts = dateStr.split("-")
        val y = parts.getOrNull(0)?.toIntOrNull() ?: 1970
        val m = parts.getOrNull(1)?.toIntOrNull() ?: 1
        val d = parts.getOrNull(2)?.toIntOrNull() ?: 1
        return Triple(y, m, d)
    }

    /** Approximate epoch millis from ISO string — sufficient for day-level comparisons. */
    private fun parseIsoToEpochMs(isoStr: String): Long {
        val dateStr = isoStr.split("T").getOrElse(0) { isoStr.take(10) }
        val (year, month, day) = parseDate(dateStr)
        var days = 0L
        for (y in 1970 until year) days += if (isLeapYear(y)) 366L else 365L
        val md = monthDays(year)
        for (m in 1 until month) days += md[m - 1]
        days += (day - 1)
        return days * 86_400_000L
    }

    private fun daysInMonth(year: Int, month: Int): Int = when (month) {
        2 -> if (isLeapYear(year)) 29 else 28
        4, 6, 9, 11 -> 30
        else -> 31
    }

    private fun isLeapYear(year: Int): Boolean =
        (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)

    private fun monthDays(year: Int): IntArray =
        if (isLeapYear(year)) intArrayOf(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
        else intArrayOf(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
}
