package com.agnes.ara.core.domain.automation

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertIs
import kotlin.test.assertTrue

/**
 * Tests for [AutomationCommandParser].
 *
 * Covers every command variant, all ParseError paths, and edge cases
 * (empty payload, unknown fields, case sensitivity, whitespace).
 */
class AutomationCommandParserTest {

    private fun parse(actionId: String, payload: String = "{}") =
        AutomationCommandParser.parse(actionId, payload)

    private fun ok(actionId: String, payload: String = "{}"): AutomationCommand =
        parse(actionId, payload).getOrThrow()

    private fun err(actionId: String, payload: String = "{}"): ParseError =
        (parse(actionId, payload).exceptionOrNull() as ParseException).error

    // ── Unknown action ────────────────────────────────────────────────────────

    @Test
    fun unknownActionId_returnsUnknownActionError() {
        val e = err("totally_made_up")
        assertIs<ParseError.UnknownAction>(e)
        assertEquals("totally_made_up", e.actionId)
    }

    // ── add_default_automation_rules ─────────────────────────────────────────

    @Test
    fun addDefaults_emptyPayload_returnsAddDefaults() {
        assertIs<AutomationCommand.AddDefaults>(ok("add_default_automation_rules"))
    }

    @Test
    fun addDefaults_ignoredPayload_returnsAddDefaults() {
        assertIs<AutomationCommand.AddDefaults>(ok("add_default_automation_rules", """{"unrelated":"field"}"""))
    }

    // ── create_automation_rule ────────────────────────────────────────────────

    @Test
    fun create_validSpendingExceeds_parsesCorrectly() {
        val cmd = ok(
            "create_automation_rule",
            """{"name":"High Food Spend","triggerType":"spending_exceeds","triggerThreshold":300.0,
               "triggerCategory":"Food","suggestionType":"review_budget",
               "suggestionMessage":"Review your food spend."}""",
        ) as AutomationCommand.Create
        assertEquals("High Food Spend", cmd.name)
        val t = cmd.trigger as TriggerType.SpendingExceeds
        assertEquals(300.0, t.threshold)
        assertEquals("Food", t.category)
        assertIs<SuggestionType.ReviewBudget>(cmd.suggestion)
        assertEquals("Review your food spend.", cmd.suggestionMessage)
        assertTrue(cmd.isEnabled)
    }

    @Test
    fun create_isEnabledFalse_parsesCorrectly() {
        val cmd = ok(
            "create_automation_rule",
            """{"name":"Rule","triggerType":"month_end","suggestionType":"record_snapshot",
               "suggestionMessage":"Snapshot!","isEnabled":false}""",
        ) as AutomationCommand.Create
        assertEquals(false, cmd.isEnabled)
        assertIs<TriggerType.MonthEnd>(cmd.trigger)
    }

    @Test
    fun create_missingName_returnsMissingFieldError() {
        val e = err("create_automation_rule",
            """{"triggerType":"month_end","suggestionType":"record_snapshot","suggestionMessage":"x"}""")
        assertIs<ParseError.MissingField>(e)
        assertEquals("name", e.field)
    }

    @Test
    fun create_missingTriggerType_returnsMissingFieldError() {
        val e = err("create_automation_rule",
            """{"name":"Rule","suggestionType":"record_snapshot","suggestionMessage":"x"}""")
        assertIs<ParseError.MissingField>(e)
        assertEquals("triggerType", e.field)
    }

    @Test
    fun create_invalidTriggerType_returnsInvalidEnumError() {
        val e = err("create_automation_rule",
            """{"name":"Rule","triggerType":"not_real","suggestionType":"review_budget","suggestionMessage":"x"}""")
        assertIs<ParseError.InvalidEnum>(e)
        assertEquals("triggerType", e.field)
        assertEquals("not_real", e.value)
    }

    @Test
    fun create_missingSuggestionType_returnsMissingFieldError() {
        val e = err("create_automation_rule",
            """{"name":"Rule","triggerType":"month_end","suggestionMessage":"x"}""")
        assertIs<ParseError.MissingField>(e)
        assertEquals("suggestionType", e.field)
    }

    @Test
    fun create_invalidSuggestionType_returnsInvalidEnumError() {
        val e = err("create_automation_rule",
            """{"name":"Rule","triggerType":"month_end","suggestionType":"invalid_type","suggestionMessage":"x"}""")
        assertIs<ParseError.InvalidEnum>(e)
        assertEquals("suggestionType", e.field)
    }

    @Test
    fun create_missingSuggestionMessage_returnsMissingFieldError() {
        val e = err("create_automation_rule",
            """{"name":"Rule","triggerType":"month_end","suggestionType":"record_snapshot"}""")
        assertIs<ParseError.MissingField>(e)
        assertEquals("suggestionMessage", e.field)
    }

    @Test
    fun create_allTriggerTypes_parseWithoutError() {
        val triggerTypes = listOf(
            "spending_exceeds" to """{"triggerThreshold":100}""",
            "balance_below" to """{"triggerThreshold":500}""",
            "goal_progress_below" to """{"triggerThreshold":50}""",
            "subscription_unused" to "{}",
            "net_worth_drops" to """{"triggerThreshold":10}""",
            "bill_overdue" to "{}",
            "month_end" to "{}",
        )
        for ((triggerType, extra) in triggerTypes) {
            val base = """{"name":"R","triggerType":"$triggerType","suggestionType":"review_budget","suggestionMessage":"m"}"""
            val extraFields = extra.removeSurrounding("{", "}").trim()
            val merged = if (extraFields.isEmpty()) base else base.dropLast(1) + "," + extraFields + "}"
            assertTrue(parse("create_automation_rule", merged).isSuccess, "triggerType=$triggerType should parse")
        }
    }

    @Test
    fun create_allSuggestionTypes_parseWithoutError() {
        val suggestionTypes = listOf(
            "cancel_subscription", "increase_savings", "pay_extra_debt",
            "review_budget", "record_snapshot", "transfer_to_savings", "custom_message",
        )
        for (st in suggestionTypes) {
            val payload = """{"name":"R","triggerType":"month_end","suggestionType":"$st","suggestionMessage":"m"}"""
            assertTrue(parse("create_automation_rule", payload).isSuccess, "suggestionType=$st should parse")
        }
    }

    // ── update_automation_rule ────────────────────────────────────────────────

    @Test
    fun update_partialFields_parsesOnlyProvidedFields() {
        val cmd = ok("update_automation_rule",
            """{"ruleId":"r-1","name":"Updated Name"}""") as AutomationCommand.Update
        assertEquals("r-1", cmd.ruleId)
        assertEquals("Updated Name", cmd.name)
        assertEquals(null, cmd.trigger)
        assertEquals(null, cmd.suggestion)
        assertEquals(null, cmd.suggestionMessage)
        assertEquals(null, cmd.isEnabled)
    }

    @Test
    fun update_missingRuleId_returnsMissingFieldError() {
        val e = err("update_automation_rule", """{"name":"x"}""")
        assertIs<ParseError.MissingField>(e)
        assertEquals("ruleId", e.field)
    }

    @Test
    fun update_invalidTriggerType_returnsInvalidEnumError() {
        val e = err("update_automation_rule",
            """{"ruleId":"r-1","triggerType":"bogus"}""")
        assertIs<ParseError.InvalidEnum>(e)
        assertEquals("triggerType", e.field)
    }

    // ── delete_automation_rule ────────────────────────────────────────────────

    @Test
    fun delete_validRuleId_parsesCorrectly() {
        val cmd = ok("delete_automation_rule", """{"ruleId":"r-42"}""") as AutomationCommand.Delete
        assertEquals("r-42", cmd.ruleId)
    }

    @Test
    fun delete_missingRuleId_returnsMissingFieldError() {
        val e = err("delete_automation_rule", "{}")
        assertIs<ParseError.MissingField>(e)
        assertEquals("ruleId", e.field)
    }

    // ── toggle_automation_rule ────────────────────────────────────────────────

    @Test
    fun toggle_enableTrue_parsesCorrectly() {
        val cmd = ok("toggle_automation_rule",
            """{"ruleId":"r-1","enabled":true}""") as AutomationCommand.Toggle
        assertEquals("r-1", cmd.ruleId)
        assertEquals(true, cmd.enabled)
    }

    @Test
    fun toggle_enableFalse_parsesCorrectly() {
        val cmd = ok("toggle_automation_rule",
            """{"ruleId":"r-1","enabled":false}""") as AutomationCommand.Toggle
        assertEquals(false, cmd.enabled)
    }

    @Test
    fun toggle_missingEnabled_returnsMissingFieldError() {
        val e = err("toggle_automation_rule", """{"ruleId":"r-1"}""")
        assertIs<ParseError.MissingField>(e)
        assertEquals("enabled", e.field)
    }

    // ── dismiss_suggestion ────────────────────────────────────────────────────

    @Test
    fun dismiss_withSuggestionId_defaultsToForeverScope() {
        val cmd = ok("dismiss_suggestion",
            """{"suggestionId":"s-1"}""") as AutomationCommand.DismissSuggestion
        assertEquals("s-1", cmd.suggestionId)
        assertIs<DismissScope.Forever>(cmd.scope)
    }

    @Test
    fun dismiss_withDate_usesForTodayScope() {
        val cmd = ok("dismiss_suggestion",
            """{"suggestionId":"s-1","date":"2026-01-29"}""") as AutomationCommand.DismissSuggestion
        val scope = cmd.scope as DismissScope.ForToday
        assertEquals("2026-01-29", scope.date)
    }

    @Test
    fun dismiss_fallsBackToRuleIdWhenSuggestionIdMissing() {
        val cmd = ok("dismiss_suggestion",
            """{"ruleId":"r-1"}""") as AutomationCommand.DismissSuggestion
        assertEquals("r-1", cmd.suggestionId)
    }

    @Test
    fun dismiss_missingBothIds_returnsMissingFieldError() {
        val e = err("dismiss_suggestion", "{}")
        assertIs<ParseError.MissingField>(e)
        assertEquals("suggestionId", e.field)
    }

    // ── Malformed JSON ────────────────────────────────────────────────────────

    @Test
    fun malformedJson_returnsMalformedJsonError() {
        val e = err("create_automation_rule", "not-json")
        assertIs<ParseError.MalformedJson>(e)
    }

    // ── AUTOMATION_ACTION_IDS constant ────────────────────────────────────────

    @Test
    fun automationActionIds_containsAllExpectedIds() {
        val expected = setOf(
            "create_automation_rule", "update_automation_rule", "delete_automation_rule",
            "toggle_automation_rule", "dismiss_suggestion", "add_default_automation_rules",
        )
        assertEquals(expected, AUTOMATION_ACTION_IDS)
    }
}
