package com.agnes.ara.core.domain.automation

import kotlinx.serialization.KSerializer
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.descriptors.buildClassSerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder
import kotlinx.serialization.json.JsonDecoder
import kotlinx.serialization.json.JsonEncoder
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.decodeFromJsonElement
import kotlinx.serialization.json.doubleOrNull
import kotlinx.serialization.json.encodeToJsonElement
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.json.put

// ─────────────────────────────────────────────────────────────────────────────
// TriggerType — sealed, typed, parameter-bearing
// Replaces the stringly-typed triggerType + flat triggerThreshold/triggerEntityId/
// triggerCategory grab-bag from the v1 schema.
// ─────────────────────────────────────────────────────────────────────────────

@Serializable
sealed class TriggerType {
    @Serializable @SerialName("spending_exceeds")
    data class SpendingExceeds(val threshold: Double, val category: String? = null) : TriggerType()

    @Serializable @SerialName("balance_below")
    data class BalanceBelow(val threshold: Double) : TriggerType()

    @Serializable @SerialName("goal_progress_below")
    data class GoalProgressBelow(val thresholdPct: Double, val goalId: String? = null) : TriggerType()

    @Serializable @SerialName("subscription_unused")
    object SubscriptionUnused : TriggerType()

    @Serializable @SerialName("net_worth_drops")
    data class NetWorthDrops(val thresholdPct: Double) : TriggerType()

    @Serializable @SerialName("bill_overdue")
    object BillOverdue : TriggerType()

    @Serializable @SerialName("month_end")
    object MonthEnd : TriggerType()
}

// ─────────────────────────────────────────────────────────────────────────────
// SuggestionType — sealed, replaces the string literals
// ─────────────────────────────────────────────────────────────────────────────

@Serializable
sealed class SuggestionType {
    @Serializable @SerialName("cancel_subscription")   object CancelSubscription  : SuggestionType()
    @Serializable @SerialName("increase_savings")      object IncreaseSavings     : SuggestionType()
    @Serializable @SerialName("pay_extra_debt")        object PayExtraDebt        : SuggestionType()
    @Serializable @SerialName("review_budget")         object ReviewBudget        : SuggestionType()
    @Serializable @SerialName("record_snapshot")       object RecordSnapshot      : SuggestionType()
    @Serializable @SerialName("transfer_to_savings")   object TransferToSavings   : SuggestionType()
    @Serializable @SerialName("custom_message")        object CustomMessage       : SuggestionType()
}

// ─────────────────────────────────────────────────────────────────────────────
// AutomationState — lifecycle of a suggestion
// ─────────────────────────────────────────────────────────────────────────────

@Serializable
sealed class AutomationState {
    @Serializable @SerialName("idle")                   object Idle                               : AutomationState()
    @Serializable @SerialName("suggested")              data class Suggested(val at: String)      : AutomationState()
    @Serializable @SerialName("acknowledged")           data class Acknowledged(val at: String)   : AutomationState()
    @Serializable @SerialName("dismissed")              data class Dismissed(val at: String, val scope: DismissScope) : AutomationState()
    @Serializable @SerialName("expired")                data class Expired(val at: String)        : AutomationState()
}

@Serializable
sealed class DismissScope {
    /** Dismiss this rule's suggestion forever — never surface again. */
    @Serializable @SerialName("forever") object Forever : DismissScope()
    /** Dismiss only for the given calendar day (ISO date string "YYYY-MM-DD"). */
    @Serializable @SerialName("for_today") data class ForToday(val date: String) : DismissScope()
}

// ─────────────────────────────────────────────────────────────────────────────
// AutomationRule — consolidated, versioned
//
// Supports two schema versions:
//   v1 — legacy flat JSON (string triggerType, optional triggerThreshold, etc.)
//        produced by the original TS automation-engine and the v1 Kotlin port.
//   v2 — current sealed-class JSON produced by this package.
//
// The custom serializer upgrades v1 → v2 on read; writes always emit v2.
// ─────────────────────────────────────────────────────────────────────────────

@Serializable(with = AutomationRuleSerializer::class)
data class AutomationRule(
    val id: String,
    val name: String,
    val isEnabled: Boolean = true,
    val trigger: TriggerType,
    val suggestion: SuggestionType,
    val suggestionMessage: String,
    val createdAt: String,
    val updatedAt: String? = null,
    val schemaVersion: Int = 2,
)

/**
 * Custom serializer that reads both v1 (flat string fields) and v2 (sealed-class fields)
 * AutomationRule JSON, and always writes v2.
 *
 * V1 layout:
 *   { "id":…, "name":…, "isEnabled":…, "triggerType":"spending_exceeds",
 *     "triggerThreshold":300.0, "triggerCategory":"Food",
 *     "suggestionType":"review_budget", "suggestionMessage":…, "createdAt":… }
 *
 * V2 layout:
 *   { "schemaVersion":2, "id":…, "name":…, "isEnabled":…,
 *     "trigger":{"type":"spending_exceeds","threshold":300.0,"category":"Food"},
 *     "suggestion":{"type":"review_budget"}, "suggestionMessage":…, … }
 */
object AutomationRuleSerializer : KSerializer<AutomationRule> {

    override val descriptor: SerialDescriptor = buildClassSerialDescriptor("AutomationRule")

    /**
     * Always writes v2 JSON. Builds the element explicitly so that schemaVersion is
     * always present regardless of the caller's encodeDefaults setting.
     */
    override fun serialize(encoder: Encoder, value: AutomationRule) {
        val jsonEncoder = encoder as? JsonEncoder
            ?: error("AutomationRuleSerializer requires a JSON encoder")
        val json = jsonEncoder.json
        val element = buildJsonObject {
            put("schemaVersion", value.schemaVersion)
            put("id", value.id)
            put("name", value.name)
            put("isEnabled", value.isEnabled)
            put("trigger", json.encodeToJsonElement(TriggerType.serializer(), value.trigger))
            put("suggestion", json.encodeToJsonElement(SuggestionType.serializer(), value.suggestion))
            put("suggestionMessage", value.suggestionMessage)
            put("createdAt", value.createdAt)
            value.updatedAt?.let { put("updatedAt", it) }
        }
        jsonEncoder.encodeJsonElement(element)
    }

    /**
     * Reads v1 (flat-string fields, no schemaVersion) or v2 (sealed JSON, schemaVersion=2).
     * Uses the decoder's own Json configuration so classDiscriminator flows through correctly.
     */
    override fun deserialize(decoder: Decoder): AutomationRule {
        val jsonDecoder = decoder as? JsonDecoder
            ?: error("AutomationRuleSerializer requires JSON")
        val json = jsonDecoder.json
        val element = jsonDecoder.decodeJsonElement().jsonObject
        return if (element["schemaVersion"]?.jsonPrimitive?.doubleOrNull?.toInt() == 2) {
            json.decodeFromJsonElement(AutomationRuleV2Surrogate.serializer(), element).toRule()
        } else {
            fromV1(element)
        }
    }

    private fun fromV1(obj: JsonObject): AutomationRule {
        val triggerType = obj["triggerType"]?.jsonPrimitive?.contentOrNull ?: ""
        val threshold = obj["triggerThreshold"]?.jsonPrimitive?.doubleOrNull
        val entityId = obj["triggerEntityId"]?.jsonPrimitive?.contentOrNull
        val category = obj["triggerCategory"]?.jsonPrimitive?.contentOrNull
        val trigger: TriggerType = when (triggerType) {
            "spending_exceeds"    -> TriggerType.SpendingExceeds(threshold ?: 0.0, category)
            "balance_below"       -> TriggerType.BalanceBelow(threshold ?: 0.0)
            "goal_progress_below" -> TriggerType.GoalProgressBelow(threshold ?: 50.0, entityId)
            "subscription_unused" -> TriggerType.SubscriptionUnused
            "net_worth_drops"     -> TriggerType.NetWorthDrops(threshold ?: 10.0)
            "bill_overdue"        -> TriggerType.BillOverdue
            "month_end"           -> TriggerType.MonthEnd
            else -> TriggerType.MonthEnd  // safe fallback; unknown types become no-op via MonthEnd default
        }
        val suggestionType = obj["suggestionType"]?.jsonPrimitive?.contentOrNull ?: ""
        val suggestion: SuggestionType = when (suggestionType) {
            "cancel_subscription" -> SuggestionType.CancelSubscription
            "increase_savings"    -> SuggestionType.IncreaseSavings
            "pay_extra_debt"      -> SuggestionType.PayExtraDebt
            "review_budget"       -> SuggestionType.ReviewBudget
            "record_snapshot"     -> SuggestionType.RecordSnapshot
            "transfer_to_savings" -> SuggestionType.TransferToSavings
            "custom_message"      -> SuggestionType.CustomMessage
            else                  -> SuggestionType.CustomMessage
        }
        return AutomationRule(
            id = obj["id"]?.jsonPrimitive?.contentOrNull ?: "",
            name = obj["name"]?.jsonPrimitive?.contentOrNull ?: "",
            isEnabled = obj["isEnabled"]?.jsonPrimitive?.booleanOrNull ?: true,
            trigger = trigger,
            suggestion = suggestion,
            suggestionMessage = obj["suggestionMessage"]?.jsonPrimitive?.contentOrNull ?: "",
            createdAt = obj["createdAt"]?.jsonPrimitive?.contentOrNull ?: "",
            updatedAt = obj["updatedAt"]?.jsonPrimitive?.contentOrNull,
            schemaVersion = 2,
        )
    }

    private fun AutomationRuleV2Surrogate.toRule() = AutomationRule(
        id = id, name = name, isEnabled = isEnabled, trigger = trigger, suggestion = suggestion,
        suggestionMessage = suggestionMessage, createdAt = createdAt, updatedAt = updatedAt,
        schemaVersion = 2,
    )
}

/** Internal surrogate used only for v2 JSON round-tripping. */
@Serializable
private data class AutomationRuleV2Surrogate(
    val id: String,
    val name: String,
    val isEnabled: Boolean = true,
    val trigger: TriggerType,
    val suggestion: SuggestionType,
    val suggestionMessage: String,
    val createdAt: String,
    val updatedAt: String? = null,
    val schemaVersion: Int = 2,
)

// ─────────────────────────────────────────────────────────────────────────────
// AutomationSuggestion — emitted by AutomationService.evaluate()
// ─────────────────────────────────────────────────────────────────────────────

@Serializable
data class AutomationSuggestion(
    val id: String,
    val ruleId: String,
    val ruleName: String,
    val suggestion: SuggestionType,
    val message: String,
    val generatedAt: String,
    val state: AutomationState = AutomationState.Suggested(generatedAt),
)

// ─────────────────────────────────────────────────────────────────────────────
// Legacy string helpers — used by the v1 serializer fallback and unit tests
// ─────────────────────────────────────────────────────────────────────────────

/** Canonical string representation of a TriggerType, matching the v1 schema. */
val TriggerType.legacyKey: String get() = when (this) {
    is TriggerType.SpendingExceeds    -> "spending_exceeds"
    is TriggerType.BalanceBelow       -> "balance_below"
    is TriggerType.GoalProgressBelow  -> "goal_progress_below"
    is TriggerType.SubscriptionUnused -> "subscription_unused"
    is TriggerType.NetWorthDrops      -> "net_worth_drops"
    is TriggerType.BillOverdue        -> "bill_overdue"
    is TriggerType.MonthEnd           -> "month_end"
}

/** Canonical string representation of a SuggestionType, matching the v1 schema. */
val SuggestionType.legacyKey: String get() = when (this) {
    is SuggestionType.CancelSubscription -> "cancel_subscription"
    is SuggestionType.IncreaseSavings    -> "increase_savings"
    is SuggestionType.PayExtraDebt       -> "pay_extra_debt"
    is SuggestionType.ReviewBudget       -> "review_budget"
    is SuggestionType.RecordSnapshot     -> "record_snapshot"
    is SuggestionType.TransferToSavings  -> "transfer_to_savings"
    is SuggestionType.CustomMessage      -> "custom_message"
}
