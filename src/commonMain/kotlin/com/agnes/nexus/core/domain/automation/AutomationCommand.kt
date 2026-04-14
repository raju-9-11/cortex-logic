package com.agnes.nexus.core.domain.automation

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.doubleOrNull
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

// ─────────────────────────────────────────────────────────────────────────────
// AutomationCommand — sealed typed commands
//
// One variant per LLM action-tag in LedgerPromptBuilder:
//   create_automation_rule, update_automation_rule, delete_automation_rule,
//   toggle_automation_rule, dismiss_suggestion, add_default_automation_rules.
//
// These replace the ad-hoc validation in agnes/automation-actions.ts:17-28.
// ─────────────────────────────────────────────────────────────────────────────

sealed class AutomationCommand {
    /** Create a new automation rule from the provided draft fields. */
    data class Create(
        val name: String,
        val trigger: TriggerType,
        val suggestion: SuggestionType,
        val suggestionMessage: String,
        val isEnabled: Boolean = true,
    ) : AutomationCommand()

    /** Patch an existing rule by id. Only provided fields are updated. */
    data class Update(
        val ruleId: String,
        val name: String? = null,
        val trigger: TriggerType? = null,
        val suggestion: SuggestionType? = null,
        val suggestionMessage: String? = null,
        val isEnabled: Boolean? = null,
    ) : AutomationCommand()

    /** Delete a rule by id. */
    data class Delete(val ruleId: String) : AutomationCommand()

    /** Enable or disable a rule by id. */
    data class Toggle(val ruleId: String, val enabled: Boolean) : AutomationCommand()

    /** Dismiss a suggestion, either forever or for today only. */
    data class DismissSuggestion(
        val suggestionId: String,
        val scope: DismissScope = DismissScope.ForToday(date = ""),  // caller fills date
    ) : AutomationCommand()

    /** Add the three default rules for a new user. Idempotent: existing defaults are skipped. */
    object AddDefaults : AutomationCommand()
}

// ─────────────────────────────────────────────────────────────────────────────
// AutomationCommandParser — cortex-owned validation replacing agnes-side checks
// ─────────────────────────────────────────────────────────────────────────────

sealed class ParseError {
    data class UnknownAction(val actionId: String) : ParseError()
    data class MissingField(val field: String) : ParseError()
    data class InvalidEnum(val field: String, val value: String) : ParseError()
    data class MalformedJson(val reason: String) : ParseError()
}

object AutomationCommandParser {

    private val json = Json { ignoreUnknownKeys = true }

    private val validTriggerTypes = setOf(
        "spending_exceeds", "balance_below", "goal_progress_below",
        "subscription_unused", "net_worth_drops", "bill_overdue", "month_end",
    )

    private val validSuggestionTypes = setOf(
        "cancel_subscription", "increase_savings", "pay_extra_debt",
        "review_budget", "record_snapshot", "transfer_to_savings", "custom_message",
    )

    /**
     * Parse an LLM action tag into a typed [AutomationCommand].
     *
     * @param actionId    The action identifier (e.g. "create_automation_rule").
     * @param payloadJson The JSON payload string from the LLM response.
     * @return [Result.success] with the command, or [Result.failure] with a [ParseError].
     */
    fun parse(actionId: String, payloadJson: String): Result<AutomationCommand> {
        val payload = runCatching {
            json.parseToJsonElement(payloadJson).jsonObject
        }.getOrElse {
            return Result.failure(ParseException(ParseError.MalformedJson(it.message ?: "invalid JSON")))
        }

        return when (actionId) {
            "create_automation_rule"      -> parseCreate(payload)
            "update_automation_rule"      -> parseUpdate(payload)
            "delete_automation_rule"      -> parseDelete(payload)
            "toggle_automation_rule"      -> parseToggle(payload)
            "dismiss_suggestion"          -> parseDismiss(payload)
            "add_default_automation_rules" -> Result.success(AutomationCommand.AddDefaults)
            else -> Result.failure(ParseException(ParseError.UnknownAction(actionId)))
        }
    }

    private fun parseCreate(p: JsonObject): Result<AutomationCommand> {
        val name = p.string("name")
            ?: return err(ParseError.MissingField("name"))
        val triggerTypeStr = p.string("triggerType")
            ?: return err(ParseError.MissingField("triggerType"))
        if (triggerTypeStr !in validTriggerTypes)
            return err(ParseError.InvalidEnum("triggerType", triggerTypeStr))
        val suggestionTypeStr = p.string("suggestionType")
            ?: return err(ParseError.MissingField("suggestionType"))
        if (suggestionTypeStr !in validSuggestionTypes)
            return err(ParseError.InvalidEnum("suggestionType", suggestionTypeStr))
        val message = p.string("suggestionMessage")
            ?: return err(ParseError.MissingField("suggestionMessage"))
        val threshold = p["triggerThreshold"]?.jsonPrimitive?.doubleOrNull
        val category = p.string("triggerCategory")
        val entityId = p.string("triggerEntityId")
        val isEnabled = p["isEnabled"]?.jsonPrimitive?.contentOrNull?.toBooleanStrictOrNull() ?: true
        return Result.success(
            AutomationCommand.Create(
                name = name.trim(),
                trigger = buildTrigger(triggerTypeStr, threshold, category, entityId),
                suggestion = buildSuggestion(suggestionTypeStr),
                suggestionMessage = message,
                isEnabled = isEnabled,
            )
        )
    }

    private fun parseUpdate(p: JsonObject): Result<AutomationCommand> {
        val ruleId = p.string("ruleId") ?: return err(ParseError.MissingField("ruleId"))
        val triggerTypeStr = p.string("triggerType")
        if (triggerTypeStr != null && triggerTypeStr !in validTriggerTypes)
            return err(ParseError.InvalidEnum("triggerType", triggerTypeStr))
        val suggestionTypeStr = p.string("suggestionType")
        if (suggestionTypeStr != null && suggestionTypeStr !in validSuggestionTypes)
            return err(ParseError.InvalidEnum("suggestionType", suggestionTypeStr))
        val threshold = p["triggerThreshold"]?.jsonPrimitive?.doubleOrNull
        val category = p.string("triggerCategory")
        val entityId = p.string("triggerEntityId")
        val isEnabled = p["isEnabled"]?.jsonPrimitive?.contentOrNull?.toBooleanStrictOrNull()
        return Result.success(
            AutomationCommand.Update(
                ruleId = ruleId,
                name = p.string("name")?.trim(),
                trigger = triggerTypeStr?.let { buildTrigger(it, threshold, category, entityId) },
                suggestion = suggestionTypeStr?.let { buildSuggestion(it) },
                suggestionMessage = p.string("suggestionMessage"),
                isEnabled = isEnabled,
            )
        )
    }

    private fun parseDelete(p: JsonObject): Result<AutomationCommand> {
        val ruleId = p.string("ruleId") ?: return err(ParseError.MissingField("ruleId"))
        return Result.success(AutomationCommand.Delete(ruleId))
    }

    private fun parseToggle(p: JsonObject): Result<AutomationCommand> {
        val ruleId = p.string("ruleId") ?: return err(ParseError.MissingField("ruleId"))
        val enabled = p["enabled"]?.jsonPrimitive?.contentOrNull?.toBooleanStrictOrNull()
            ?: return err(ParseError.MissingField("enabled"))
        return Result.success(AutomationCommand.Toggle(ruleId, enabled))
    }

    private fun parseDismiss(p: JsonObject): Result<AutomationCommand> {
        val id = p.string("suggestionId") ?: p.string("ruleId")
            ?: return err(ParseError.MissingField("suggestionId"))
        val todayDate = p.string("date")  // optional; caller supplies YYYY-MM-DD
        val scope = if (todayDate != null)
            DismissScope.ForToday(todayDate)
        else
            DismissScope.Forever
        return Result.success(AutomationCommand.DismissSuggestion(id, scope))
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

    private fun buildTrigger(
        type: String,
        threshold: Double?,
        category: String?,
        entityId: String?,
    ): TriggerType = when (type) {
        "spending_exceeds"    -> TriggerType.SpendingExceeds(threshold ?: 0.0, category)
        "balance_below"       -> TriggerType.BalanceBelow(threshold ?: 0.0)
        "goal_progress_below" -> TriggerType.GoalProgressBelow(threshold ?: 50.0, entityId)
        "subscription_unused" -> TriggerType.SubscriptionUnused
        "net_worth_drops"     -> TriggerType.NetWorthDrops(threshold ?: 10.0)
        "bill_overdue"        -> TriggerType.BillOverdue
        "month_end"           -> TriggerType.MonthEnd
        else -> TriggerType.MonthEnd  // guarded by validTriggerTypes check above
    }

    private fun buildSuggestion(type: String): SuggestionType = when (type) {
        "cancel_subscription" -> SuggestionType.CancelSubscription
        "increase_savings"    -> SuggestionType.IncreaseSavings
        "pay_extra_debt"      -> SuggestionType.PayExtraDebt
        "review_budget"       -> SuggestionType.ReviewBudget
        "record_snapshot"     -> SuggestionType.RecordSnapshot
        "transfer_to_savings" -> SuggestionType.TransferToSavings
        "custom_message"      -> SuggestionType.CustomMessage
        else -> SuggestionType.CustomMessage
    }

    private fun JsonObject.string(key: String): String? =
        this[key]?.jsonPrimitive?.contentOrNull?.takeIf { it.isNotBlank() }

    private fun err(error: ParseError): Result<AutomationCommand> =
        Result.failure(ParseException(error))
}

/** Wraps a [ParseError] as a [Throwable] so it travels through [Result]. */
class ParseException(val error: ParseError) : Exception(error.toString())

/** The set of action IDs this parser accepts — agnes imports this to stay in sync. */
val AUTOMATION_ACTION_IDS: Set<String> = setOf(
    "create_automation_rule",
    "update_automation_rule",
    "delete_automation_rule",
    "toggle_automation_rule",
    "dismiss_suggestion",
    "add_default_automation_rules",
)
