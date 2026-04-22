package com.agnes.ara.core.domain.automation

import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.json.Json
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertIs
import kotlin.test.assertNull
import kotlin.test.assertTrue

/**
 * Tests that the custom [AutomationRuleSerializer] correctly upgrades v1 (legacy flat-string)
 * JSON to v2 (sealed-class) [AutomationRule] objects on deserialization, and that
 * v2 objects round-trip cleanly through JSON.
 */
class AutomationRuleMigrationTest {

    private val json = Json { ignoreUnknownKeys = true; classDiscriminator = "type" }

    private fun decode(rawJson: String): AutomationRule =
        json.decodeFromString(AutomationRule.serializer(), rawJson)

    private fun decodeList(rawJson: String): List<AutomationRule> =
        json.decodeFromString(ListSerializer(AutomationRule.serializer()), rawJson)

    private fun encode(rule: AutomationRule): String =
        json.encodeToString(AutomationRule.serializer(), rule)

    // ── V1 → V2 migration ────────────────────────────────────────────────────

    @Test
    fun v1_spendingExceedsWithCategory_upgradesCorrectly() {
        val v1 = """{"id":"r1","name":"Food Spend","isEnabled":true,"triggerType":"spending_exceeds",
                    "triggerThreshold":300.0,"triggerCategory":"Food","suggestionType":"review_budget",
                    "suggestionMessage":"Review food.","createdAt":"2026-01-01T00:00:00Z"}"""
        val rule = decode(v1)
        assertEquals("r1", rule.id)
        assertEquals("Food Spend", rule.name)
        assertTrue(rule.isEnabled)
        val trigger = rule.trigger as TriggerType.SpendingExceeds
        assertEquals(300.0, trigger.threshold)
        assertEquals("Food", trigger.category)
        assertIs<SuggestionType.ReviewBudget>(rule.suggestion)
        assertEquals("Review food.", rule.suggestionMessage)
        assertEquals(2, rule.schemaVersion)
    }

    @Test
    fun v1_balanceBelow_upgradesCorrectly() {
        val v1 = """{"id":"r2","name":"Low Bal","isEnabled":true,"triggerType":"balance_below",
                    "triggerThreshold":500.0,"suggestionType":"transfer_to_savings",
                    "suggestionMessage":"Top up.","createdAt":"2026-01-01T00:00:00Z"}"""
        val rule = decode(v1)
        val trigger = rule.trigger as TriggerType.BalanceBelow
        assertEquals(500.0, trigger.threshold)
        assertIs<SuggestionType.TransferToSavings>(rule.suggestion)
    }

    @Test
    fun v1_goalProgressBelow_upgradesCorrectlyWithEntityId() {
        val v1 = """{"id":"r3","name":"Goal","isEnabled":true,"triggerType":"goal_progress_below",
                    "triggerThreshold":50.0,"triggerEntityId":"goal-42","suggestionType":"increase_savings",
                    "suggestionMessage":"Save more.","createdAt":"2026-01-01T00:00:00Z"}"""
        val rule = decode(v1)
        val trigger = rule.trigger as TriggerType.GoalProgressBelow
        assertEquals(50.0, trigger.thresholdPct)
        assertEquals("goal-42", trigger.goalId)
    }

    @Test
    fun v1_subscriptionUnused_upgradesCorrectly() {
        val v1 = """{"id":"r4","name":"Unused Sub","isEnabled":true,"triggerType":"subscription_unused",
                    "suggestionType":"cancel_subscription","suggestionMessage":"Cancel.","createdAt":"2026-01-01T00:00:00Z"}"""
        val rule = decode(v1)
        assertIs<TriggerType.SubscriptionUnused>(rule.trigger)
        assertIs<SuggestionType.CancelSubscription>(rule.suggestion)
    }

    @Test
    fun v1_netWorthDrops_upgradesCorrectly() {
        val v1 = """{"id":"r5","name":"NW Drop","isEnabled":true,"triggerType":"net_worth_drops",
                    "triggerThreshold":15.0,"suggestionType":"record_snapshot",
                    "suggestionMessage":"Record.","createdAt":"2026-01-01T00:00:00Z"}"""
        val rule = decode(v1)
        val trigger = rule.trigger as TriggerType.NetWorthDrops
        assertEquals(15.0, trigger.thresholdPct)
    }

    @Test
    fun v1_billOverdue_upgradesCorrectly() {
        val v1 = """{"id":"r6","name":"Overdue","isEnabled":true,"triggerType":"bill_overdue",
                    "suggestionType":"pay_extra_debt","suggestionMessage":"Pay.","createdAt":"2026-01-01T00:00:00Z"}"""
        val rule = decode(v1)
        assertIs<TriggerType.BillOverdue>(rule.trigger)
        assertIs<SuggestionType.PayExtraDebt>(rule.suggestion)
    }

    @Test
    fun v1_monthEnd_upgradesCorrectly() {
        val v1 = """{"id":"r7","name":"Month End","isEnabled":true,"triggerType":"month_end",
                    "suggestionType":"record_snapshot","suggestionMessage":"Snapshot.","createdAt":"2026-01-01T00:00:00Z"}"""
        val rule = decode(v1)
        assertIs<TriggerType.MonthEnd>(rule.trigger)
        assertEquals(2, rule.schemaVersion)
    }

    @Test
    fun v1_missingOptionalFields_useDefaults() {
        val v1 = """{"id":"r8","name":"Rule","isEnabled":true,"triggerType":"month_end",
                    "suggestionType":"record_snapshot","suggestionMessage":"X","createdAt":"2026-01-01T00:00:00Z"}"""
        val rule = decode(v1)
        assertNull(rule.updatedAt)
        assertNull((rule.trigger as? TriggerType.SpendingExceeds)?.category)
    }

    @Test
    fun v1_listOfRules_allUpgraded() {
        val v1List = """[
            {"id":"a","name":"A","isEnabled":true,"triggerType":"month_end","suggestionType":"record_snapshot","suggestionMessage":"M","createdAt":"2026-01-01T00:00:00Z"},
            {"id":"b","name":"B","isEnabled":false,"triggerType":"balance_below","triggerThreshold":200.0,"suggestionType":"transfer_to_savings","suggestionMessage":"T","createdAt":"2026-01-01T00:00:00Z"}
        ]"""
        val rules = decodeList(v1List)
        assertEquals(2, rules.size)
        assertTrue(rules.all { it.schemaVersion == 2 })
        assertIs<TriggerType.MonthEnd>(rules[0].trigger)
        assertIs<TriggerType.BalanceBelow>(rules[1].trigger)
        assertEquals(false, rules[1].isEnabled)
    }

    // ── V2 round-trip ────────────────────────────────────────────────────────

    @Test
    fun v2_roundTripPreservesAllFields() {
        val original = AutomationRule(
            id = "r1",
            name = "High Dining",
            isEnabled = true,
            trigger = TriggerType.SpendingExceeds(threshold = 300.0, category = "Food"),
            suggestion = SuggestionType.ReviewBudget,
            suggestionMessage = "Review your dining spend.",
            createdAt = "2026-01-01T00:00:00Z",
            updatedAt = "2026-01-15T00:00:00Z",
            schemaVersion = 2,
        )
        val encoded = encode(original)
        val decoded = decode(encoded)
        assertEquals(original.id, decoded.id)
        assertEquals(original.name, decoded.name)
        assertEquals(original.isEnabled, decoded.isEnabled)
        assertEquals(original.suggestionMessage, decoded.suggestionMessage)
        assertEquals(original.createdAt, decoded.createdAt)
        assertEquals(original.updatedAt, decoded.updatedAt)
        assertEquals(2, decoded.schemaVersion)
        val trigger = decoded.trigger as TriggerType.SpendingExceeds
        assertEquals(300.0, trigger.threshold)
        assertEquals("Food", trigger.category)
        assertIs<SuggestionType.ReviewBudget>(decoded.suggestion)
    }

    @Test
    fun v2_encodedJsonContainsSchemaVersion2() {
        val rule = AutomationRule(
            id = "x", name = "X", isEnabled = true,
            trigger = TriggerType.MonthEnd,
            suggestion = SuggestionType.RecordSnapshot,
            suggestionMessage = "Snapshot",
            createdAt = "2026-01-01T00:00:00Z",
        )
        val encoded = encode(rule)
        assertTrue(encoded.contains("\"schemaVersion\":2"), "Encoded JSON must include schemaVersion:2")
    }

    // ── legacyKey helpers ────────────────────────────────────────────────────

    @Test
    fun legacyKey_matchesV1StringValues() {
        assertEquals("spending_exceeds", TriggerType.SpendingExceeds(0.0).legacyKey)
        assertEquals("balance_below", TriggerType.BalanceBelow(0.0).legacyKey)
        assertEquals("goal_progress_below", TriggerType.GoalProgressBelow(0.0).legacyKey)
        assertEquals("subscription_unused", TriggerType.SubscriptionUnused.legacyKey)
        assertEquals("net_worth_drops", TriggerType.NetWorthDrops(0.0).legacyKey)
        assertEquals("bill_overdue", TriggerType.BillOverdue.legacyKey)
        assertEquals("month_end", TriggerType.MonthEnd.legacyKey)
        assertEquals("cancel_subscription", SuggestionType.CancelSubscription.legacyKey)
        assertEquals("increase_savings", SuggestionType.IncreaseSavings.legacyKey)
        assertEquals("pay_extra_debt", SuggestionType.PayExtraDebt.legacyKey)
        assertEquals("review_budget", SuggestionType.ReviewBudget.legacyKey)
        assertEquals("record_snapshot", SuggestionType.RecordSnapshot.legacyKey)
        assertEquals("transfer_to_savings", SuggestionType.TransferToSavings.legacyKey)
        assertEquals("custom_message", SuggestionType.CustomMessage.legacyKey)
    }
}
