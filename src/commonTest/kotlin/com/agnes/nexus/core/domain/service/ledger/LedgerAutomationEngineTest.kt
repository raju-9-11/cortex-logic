package com.agnes.nexus.core.domain.service.ledger

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.add
import kotlinx.serialization.json.buildJsonArray
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

/**
 * Golden-reference tests for LedgerAutomationEngine.
 *
 * These tests pin the current behaviour of the pure evaluation engine before the Phase 1
 * migration to the new sealed-type domain model. They cover all seven trigger evaluators,
 * dismissal semantics (permanent and day-scoped), disabled-rule skipping, unknown
 * triggerType no-op, and getDefaultRules shape.
 *
 * There is intentionally NO mocking — the engine is a pure function, so we just build
 * profile JSON strings and assert on the returned suggestion list.
 */
class LedgerAutomationEngineTest {

    private val engine = LedgerAutomationEngine

    // Fixed "now" instants used across tests.
    // The date portion determines which month/day calculations are exercised.
    private val JAN_15 = "2026-01-15T12:00:00Z"  // mid-January baseline
    private val JAN_28 = "2026-01-28T12:00:00Z"  // 3 days before Jan 31 → no month_end
    private val JAN_29 = "2026-01-29T12:00:00Z"  // 2 days before Jan 31 → month_end fires
    private val FEB_25_NON_LEAP = "2026-02-25T12:00:00Z"  // Feb 28 - 3 → no month_end
    private val FEB_26_NON_LEAP = "2026-02-26T12:00:00Z"  // Feb 28 - 2 → month_end fires

    // ── JSON builder helpers ────────────────────────────────────────────────────

    private fun buildRule(
        id: String = "rule-1",
        name: String = "Test Rule",
        isEnabled: Boolean = true,
        triggerType: String = "spending_exceeds",
        triggerThreshold: Double? = null,
        triggerEntityId: String? = null,
        triggerCategory: String? = null,
        suggestionType: String = "review_budget",
        suggestionMessage: String = "Check your finances.",
        createdAt: String = JAN_15,
    ): JsonObject = buildJsonObject {
        put("id", id)
        put("name", name)
        put("isEnabled", isEnabled)
        put("triggerType", triggerType)
        triggerThreshold?.let { put("triggerThreshold", it) }
        triggerEntityId?.let { put("triggerEntityId", it) }
        triggerCategory?.let { put("triggerCategory", it) }
        put("suggestionType", suggestionType)
        put("suggestionMessage", suggestionMessage)
        put("createdAt", createdAt)
    }

    private fun buildProfile(
        rules: List<JsonObject> = emptyList(),
        dismissed: List<String> = emptyList(),
        transactions: List<JsonObject> = emptyList(),
        accounts: List<JsonObject> = emptyList(),
        goals: List<JsonObject> = emptyList(),
        subscriptions: List<JsonObject> = emptyList(),
        netWorthHistory: List<JsonObject> = emptyList(),
        recurringRules: List<JsonObject> = emptyList(),
    ): String = buildJsonObject {
        put("automationRules", buildJsonArray { rules.forEach { add(it) } })
        put("dismissedSuggestionIds", buildJsonArray { dismissed.forEach { add(it) } })
        put("transactions", buildJsonArray { transactions.forEach { add(it) } })
        put("accounts", buildJsonArray { accounts.forEach { add(it) } })
        put("financialGoals", buildJsonArray { goals.forEach { add(it) } })
        put("subscriptions", buildJsonArray { subscriptions.forEach { add(it) } })
        put("netWorthHistory", buildJsonArray { netWorthHistory.forEach { add(it) } })
        put("recurringRules", buildJsonArray { recurringRules.forEach { add(it) } })
    }.toString()

    private fun buildTx(
        id: String = "tx-1",
        date: String = "2026-01-10",
        description: String = "Coffee shop",
        amount: Double = 10.0,
        type: String = "expense",
        category: String = "Food",
    ): JsonObject = buildJsonObject {
        put("id", id); put("date", date); put("description", description)
        put("amount", amount); put("type", type); put("category", category)
    }

    private fun buildAccount(id: String = "acc-1", balance: Double = 1000.0): JsonObject =
        buildJsonObject { put("id", id); put("balance", balance) }

    private fun buildGoal(
        id: String = "goal-1",
        targetAmount: Double = 1000.0,
        currentAmount: Double = 200.0,
    ): JsonObject = buildJsonObject {
        put("id", id); put("targetAmount", targetAmount); put("currentAmount", currentAmount)
    }

    private fun buildSubscription(
        id: String = "sub-1",
        name: String = "Netflix",
        status: String = "active",
        createdAt: String = "2024-01-01T00:00:00Z",
    ): JsonObject = buildJsonObject {
        put("id", id); put("name", name); put("status", status); put("createdAt", createdAt)
    }

    private fun buildNetWorth(
        id: String = "nw-1",
        date: String = "2026-01-01",
        netWorth: Double = 10_000.0,
    ): JsonObject = buildJsonObject { put("id", id); put("date", date); put("netWorth", netWorth) }

    private fun buildRecurringRule(
        id: String = "rr-1",
        isActive: Boolean = true,
        nextDueDate: String = "2026-01-10",
    ): JsonObject = buildJsonObject {
        put("id", id); put("isActive", isActive); put("nextDueDate", nextDueDate)
    }

    // Deterministic UUID generator — resets counter per call site.
    private var uuidSeq = 0
    private fun evaluate(
        profileJson: String,
        nowIso: String = JAN_15,
    ): List<LedgerAutomationEngine.AutomationSuggestion> {
        uuidSeq = 0
        return engine.evaluateRules(profileJson, nowIso) { "uuid-${uuidSeq++}" }
    }

    // ── General / structural ────────────────────────────────────────────────────

    @Test
    fun evaluate_emptyProfile_returnsNoSuggestions() {
        assertTrue(evaluate(buildProfile()).isEmpty())
    }

    @Test
    fun evaluate_disabledRule_isSkipped() {
        val profile = buildProfile(rules = listOf(buildRule(isEnabled = false, triggerType = "month_end")))
        assertTrue(evaluate(profile, JAN_29).isEmpty(), "Disabled rule must not produce a suggestion")
    }

    @Test
    fun evaluate_unknownTriggerType_silentlyProducesNoSuggestion() {
        val profile = buildProfile(rules = listOf(buildRule(triggerType = "completely_unknown_trigger")))
        assertTrue(evaluate(profile).isEmpty(), "Unknown triggerType must not throw and must return no suggestion")
    }

    // ── spending_exceeds ────────────────────────────────────────────────────────

    @Test
    fun spendingExceeds_triggersWhenCurrentMonthSpendAboveThreshold() {
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "spending_exceeds", triggerThreshold = 100.0)),
            transactions = listOf(
                buildTx(id = "t1", amount = 80.0, date = "2026-01-05"),
                buildTx(id = "t2", amount = 50.0, date = "2026-01-12"),  // total 130 > 100
            ),
        )
        assertEquals(1, evaluate(profile).size)
    }

    @Test
    fun spendingExceeds_noTriggerWhenBelowThreshold() {
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "spending_exceeds", triggerThreshold = 200.0)),
            transactions = listOf(buildTx(amount = 100.0, date = "2026-01-10")),
        )
        assertTrue(evaluate(profile).isEmpty())
    }

    @Test
    fun spendingExceeds_previousMonthTransactionsAreExcluded() {
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "spending_exceeds", triggerThreshold = 50.0)),
            transactions = listOf(buildTx(amount = 200.0, date = "2025-12-31")),  // last month
        )
        assertTrue(evaluate(profile).isEmpty(), "Previous-month transactions must not count toward current month")
    }

    @Test
    fun spendingExceeds_categoryFilterIncludesOnlyMatchingCategory() {
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "spending_exceeds", triggerThreshold = 50.0, triggerCategory = "Entertainment")),
            transactions = listOf(
                buildTx(id = "t1", amount = 80.0, category = "Food"),           // excluded
                buildTx(id = "t2", amount = 60.0, category = "Entertainment"),  // included, 60 > 50
            ),
        )
        assertEquals(1, evaluate(profile).size)
    }

    @Test
    fun spendingExceeds_noTriggerWhenCategoryFilterExcludesAllTransactions() {
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "spending_exceeds", triggerThreshold = 50.0, triggerCategory = "Entertainment")),
            transactions = listOf(buildTx(amount = 200.0, category = "Food")),
        )
        assertTrue(evaluate(profile).isEmpty())
    }

    @Test
    fun spendingExceeds_missingThreshold_noTrigger() {
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "spending_exceeds")),  // no threshold
            transactions = listOf(buildTx(amount = 9999.0)),
        )
        assertTrue(evaluate(profile).isEmpty(), "Missing threshold must not trigger")
    }

    // ── balance_below ───────────────────────────────────────────────────────────

    @Test
    fun balanceBelow_triggersWhenTotalBalanceBelowThreshold() {
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "balance_below", triggerThreshold = 1000.0)),
            accounts = listOf(buildAccount(balance = 400.0), buildAccount(id = "acc-2", balance = 300.0)),
        )
        assertEquals(1, evaluate(profile).size)
    }

    @Test
    fun balanceBelow_noTriggerWhenTotalBalanceAboveThreshold() {
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "balance_below", triggerThreshold = 500.0)),
            accounts = listOf(buildAccount(balance = 600.0)),
        )
        assertTrue(evaluate(profile).isEmpty())
    }

    @Test
    fun balanceBelow_missingThreshold_noTrigger() {
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "balance_below")),
            accounts = listOf(buildAccount(balance = 0.0)),
        )
        assertTrue(evaluate(profile).isEmpty(), "Missing threshold must not trigger")
    }

    // ── goal_progress_below ─────────────────────────────────────────────────────

    @Test
    fun goalProgressBelow_triggersWhenProgressBelowThreshold() {
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "goal_progress_below", triggerThreshold = 50.0)),
            goals = listOf(buildGoal(targetAmount = 1000.0, currentAmount = 400.0)),  // 40% < 50%
        )
        assertEquals(1, evaluate(profile).size)
    }

    @Test
    fun goalProgressBelow_noTriggerWhenProgressAboveThreshold() {
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "goal_progress_below", triggerThreshold = 30.0)),
            goals = listOf(buildGoal(targetAmount = 1000.0, currentAmount = 400.0)),  // 40% > 30%
        )
        assertTrue(evaluate(profile).isEmpty())
    }

    @Test
    fun goalProgressBelow_entityIdFilterSelectsSpecificGoal() {
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "goal_progress_below", triggerThreshold = 50.0, triggerEntityId = "goal-2")),
            goals = listOf(
                buildGoal(id = "goal-1", targetAmount = 1000.0, currentAmount = 200.0),  // 20% — not selected
                buildGoal(id = "goal-2", targetAmount = 1000.0, currentAmount = 700.0),  // 70% > 50% — selected
            ),
        )
        assertTrue(evaluate(profile).isEmpty(), "Should evaluate goal-2 which is above threshold")
    }

    @Test
    fun goalProgressBelow_noGoals_noTrigger() {
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "goal_progress_below", triggerThreshold = 50.0)),
        )
        assertTrue(evaluate(profile).isEmpty())
    }

    // ── subscription_unused ─────────────────────────────────────────────────────

    @Test
    fun subscriptionUnused_triggersForOldActiveSubWithNoMatchingTransaction() {
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "subscription_unused")),
            subscriptions = listOf(buildSubscription(name = "Netflix", createdAt = "2024-01-01T00:00:00Z")),
            transactions = listOf(buildTx(description = "Grocery shopping")),
        )
        assertEquals(1, evaluate(profile).size)
    }

    @Test
    fun subscriptionUnused_noTriggerWhenMatchingTransactionExists() {
        // Engine uses exact match: txDescriptions.contains(sub.name.lowercase()).
        // The transaction description must equal the subscription name (case-insensitive).
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "subscription_unused")),
            subscriptions = listOf(buildSubscription(name = "Netflix", createdAt = "2024-01-01T00:00:00Z")),
            transactions = listOf(buildTx(description = "Netflix")),  // exact match, case-insensitive
        )
        assertTrue(evaluate(profile).isEmpty(), "Exact-name description match must suppress the trigger")
    }

    @Test
    fun subscriptionUnused_noTriggerForSubscriptionCreatedWithin60Days() {
        // JAN_15 is "now"; created Jan 5 → only 10 days old
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "subscription_unused")),
            subscriptions = listOf(buildSubscription(name = "Netflix", createdAt = "2026-01-05T00:00:00Z")),
        )
        assertTrue(evaluate(profile).isEmpty(), "Subscription < 60 days old must not trigger")
    }

    @Test
    fun subscriptionUnused_noTriggerForInactiveSubscription() {
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "subscription_unused")),
            subscriptions = listOf(buildSubscription(status = "cancelled", createdAt = "2024-01-01T00:00:00Z")),
        )
        assertTrue(evaluate(profile).isEmpty(), "Inactive subscription must not trigger")
    }

    // ── net_worth_drops ─────────────────────────────────────────────────────────

    @Test
    fun netWorthDrops_triggersWhenDropExceedsThreshold() {
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "net_worth_drops", triggerThreshold = 10.0)),
            netWorthHistory = listOf(
                buildNetWorth(id = "nw-1", date = "2025-12-01", netWorth = 10_000.0),
                buildNetWorth(id = "nw-2", date = "2026-01-01", netWorth = 8_500.0),  // 15% drop > 10%
            ),
        )
        assertEquals(1, evaluate(profile).size)
    }

    @Test
    fun netWorthDrops_noTriggerWhenDropBelowThreshold() {
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "net_worth_drops", triggerThreshold = 20.0)),
            netWorthHistory = listOf(
                buildNetWorth(id = "nw-1", date = "2025-12-01", netWorth = 10_000.0),
                buildNetWorth(id = "nw-2", date = "2026-01-01", netWorth = 9_500.0),  // 5% drop < 20%
            ),
        )
        assertTrue(evaluate(profile).isEmpty())
    }

    @Test
    fun netWorthDrops_noTriggerWithOnlyOneSnapshot() {
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "net_worth_drops", triggerThreshold = 10.0)),
            netWorthHistory = listOf(buildNetWorth()),
        )
        assertTrue(evaluate(profile).isEmpty(), "Need at least 2 snapshots")
    }

    @Test
    fun netWorthDrops_noTriggerWhenNetWorthIncreases() {
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "net_worth_drops", triggerThreshold = 10.0)),
            netWorthHistory = listOf(
                buildNetWorth(id = "nw-1", date = "2025-12-01", netWorth = 8_000.0),
                buildNetWorth(id = "nw-2", date = "2026-01-01", netWorth = 10_000.0),  // increase
            ),
        )
        assertTrue(evaluate(profile).isEmpty())
    }

    @Test
    fun netWorthDrops_usesLatestTwoSnapshotsByDateDescending() {
        // Snapshot order in JSON is oldest-first; engine should sort by date descending
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "net_worth_drops", triggerThreshold = 10.0)),
            netWorthHistory = listOf(
                buildNetWorth(id = "nw-old", date = "2025-06-01", netWorth = 5_000.0),   // oldest
                buildNetWorth(id = "nw-mid", date = "2025-12-01", netWorth = 10_000.0),  // prev
                buildNetWorth(id = "nw-new", date = "2026-01-01", netWorth = 8_500.0),   // curr (15% drop)
            ),
        )
        assertEquals(1, evaluate(profile).size)
    }

    // ── bill_overdue ────────────────────────────────────────────────────────────

    @Test
    fun billOverdue_triggersForActiveRuleWithPastDueDate() {
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "bill_overdue")),
            recurringRules = listOf(buildRecurringRule(nextDueDate = "2026-01-10")),  // 5 days before JAN_15
        )
        assertEquals(1, evaluate(profile).size)
    }

    @Test
    fun billOverdue_noTriggerForFutureDueDate() {
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "bill_overdue")),
            recurringRules = listOf(buildRecurringRule(nextDueDate = "2026-01-20")),
        )
        assertTrue(evaluate(profile).isEmpty())
    }

    @Test
    fun billOverdue_noTriggerForInactiveRecurringRule() {
        val profile = buildProfile(
            rules = listOf(buildRule(triggerType = "bill_overdue")),
            recurringRules = listOf(buildRecurringRule(isActive = false, nextDueDate = "2026-01-10")),
        )
        assertTrue(evaluate(profile).isEmpty())
    }

    @Test
    fun billOverdue_noTriggerForEmptyRecurringRuleList() {
        val profile = buildProfile(rules = listOf(buildRule(triggerType = "bill_overdue")))
        assertTrue(evaluate(profile).isEmpty())
    }

    // ── month_end ───────────────────────────────────────────────────────────────

    @Test
    fun monthEnd_triggersOnThirdToLastDayOfMonth() {
        // Jan 29 = 31 - 2 → at boundary, fires
        val profile = buildProfile(rules = listOf(buildRule(triggerType = "month_end")))
        assertEquals(1, evaluate(profile, JAN_29).size)
    }

    @Test
    fun monthEnd_noTriggerOnFourthToLastDayOfMonth() {
        // Jan 28 = 31 - 3 → just outside window
        val profile = buildProfile(rules = listOf(buildRule(triggerType = "month_end")))
        assertTrue(evaluate(profile, JAN_28).isEmpty())
    }

    @Test
    fun monthEnd_triggersOnSecondToLastDayOfFebruaryNonLeap() {
        // Feb 26 in 2026 (non-leap): 28 - 2 = 26 → fires
        val profile = buildProfile(rules = listOf(buildRule(triggerType = "month_end")))
        assertEquals(1, evaluate(profile, FEB_26_NON_LEAP).size)
    }

    @Test
    fun monthEnd_noTriggerOnThirdToLastDayOfFebruaryNonLeap() {
        // Feb 25 in 2026 (non-leap): 28 - 3 = 25 → does not fire
        val profile = buildProfile(rules = listOf(buildRule(triggerType = "month_end")))
        assertTrue(evaluate(profile, FEB_25_NON_LEAP).isEmpty())
    }

    @Test
    fun monthEnd_triggersOnLastDayOfMonth() {
        val profile = buildProfile(rules = listOf(buildRule(triggerType = "month_end")))
        assertEquals(1, evaluate(profile, "2026-01-31T23:59:59Z").size)
    }

    // ── Dismissal semantics ─────────────────────────────────────────────────────

    @Test
    fun dismissal_permanentRuleIdSuppressesSuggestion() {
        val profile = buildProfile(
            rules = listOf(buildRule(id = "rule-1", triggerType = "month_end")),
            dismissed = listOf("rule-1"),
        )
        assertTrue(evaluate(profile, JAN_29).isEmpty(), "Permanent dismiss must suppress suggestion")
    }

    @Test
    fun dismissal_dayScopedKeyForSameDaySuppressesSuggestion() {
        // Day-scoped key format: "{ruleId}_{YYYY-MM-DD}"
        val profile = buildProfile(
            rules = listOf(buildRule(id = "rule-1", triggerType = "month_end")),
            dismissed = listOf("rule-1_2026-01-29"),
        )
        assertTrue(evaluate(profile, JAN_29).isEmpty(), "Day-scoped dismiss for today must suppress suggestion")
    }

    @Test
    fun dismissal_dayScopedKeyForDifferentDayDoesNotSuppress() {
        // Dismissed on Jan 28 but evaluating on Jan 29 → should still fire
        val profile = buildProfile(
            rules = listOf(buildRule(id = "rule-1", triggerType = "month_end")),
            dismissed = listOf("rule-1_2026-01-28"),
        )
        assertEquals(1, evaluate(profile, JAN_29).size, "Dismiss for a different day must not suppress")
    }

    @Test
    fun dismissal_doesNotAffectOtherRules() {
        val profile = buildProfile(
            rules = listOf(
                buildRule(id = "r1", triggerType = "month_end"),
                buildRule(id = "r2", triggerType = "month_end"),
            ),
            dismissed = listOf("r1"),
        )
        val suggestions = evaluate(profile, JAN_29)
        assertEquals(1, suggestions.size)
        assertEquals("r2", suggestions.first().ruleId)
    }

    // ── Suggestion shape ────────────────────────────────────────────────────────

    @Test
    fun suggestion_hasCorrectFieldValues() {
        val profile = buildProfile(
            rules = listOf(buildRule(
                id = "r1",
                name = "My Rule",
                triggerType = "month_end",
                suggestionType = "record_snapshot",
                suggestionMessage = "Time to record a snapshot",
            )),
        )
        val suggestions = evaluate(profile, JAN_29)
        assertEquals(1, suggestions.size)
        val s = suggestions.first()
        assertEquals("r1", s.ruleId)
        assertEquals("My Rule", s.ruleName)
        assertEquals("record_snapshot", s.suggestionType)
        assertEquals("Time to record a snapshot", s.message)
        assertEquals(JAN_29, s.generatedAt)
        assertEquals("uuid-0", s.id)
    }

    @Test
    fun suggestion_multipleTriggeredRulesAllReturnSuggestions() {
        val profile = buildProfile(
            rules = listOf(
                buildRule(id = "r1", triggerType = "month_end"),
                buildRule(id = "r2", triggerType = "balance_below", triggerThreshold = 1000.0),
            ),
            accounts = listOf(buildAccount(balance = 200.0)),
        )
        val suggestions = evaluate(profile, JAN_29)
        assertEquals(2, suggestions.size)
        assertTrue(suggestions.any { it.ruleId == "r1" })
        assertTrue(suggestions.any { it.ruleId == "r2" })
    }

    // ── getDefaultRules ─────────────────────────────────────────────────────────

    @Test
    fun getDefaultRules_returnsExactlyThreeRules() {
        assertEquals(3, engine.getDefaultRules(JAN_15) { "id-${uuidSeq++}" }.size)
    }

    @Test
    fun getDefaultRules_allRulesHaveKnownTriggerTypes() {
        val validTriggerTypes = setOf(
            "spending_exceeds", "balance_below", "goal_progress_below",
            "subscription_unused", "net_worth_drops", "bill_overdue", "month_end",
        )
        engine.getDefaultRules(JAN_15) { "id-${uuidSeq++}" }.forEach { rule ->
            assertTrue(
                rule.triggerType in validTriggerTypes,
                "Default rule '${rule.name}' has unexpected triggerType '${rule.triggerType}'",
            )
        }
    }

    @Test
    fun getDefaultRules_allRulesEnabledByDefault() {
        val rules = engine.getDefaultRules(JAN_15) { "id-${uuidSeq++}" }
        assertTrue(rules.all { it.isEnabled }, "All default rules must start enabled")
    }

    @Test
    fun getDefaultRules_allRulesHaveUniqueIds() {
        var counter = 0
        val rules = engine.getDefaultRules(JAN_15) { "uuid-${counter++}" }
        assertEquals(rules.size, rules.map { it.id }.toSet().size, "Each default rule must have a unique id")
    }

    @Test
    fun getDefaultRules_createdAtMatchesProvidedNowIso() {
        val rules = engine.getDefaultRules(JAN_15) { "id-${uuidSeq++}" }
        assertTrue(rules.all { it.createdAt == JAN_15 }, "createdAt must equal the injected nowIso")
    }
}
