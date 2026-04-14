package com.agnes.nexus.core.domain.automation

import com.agnes.nexus.core.domain.service.ledger.LedgerAutomationEngine
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.add
import kotlinx.serialization.json.buildJsonArray
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.put
import kotlinx.serialization.json.putJsonArray

/**
 * AutomationService — single authoritative entry point for automation logic.
 *
 * Replaces the three-way split between:
 *   - agnes/automation-engine.ts (evaluation)
 *   - agnes/automation-actions.ts (CRUD via ActionHub)
 *   - agnes/use-ledger-recurring-automation-receipts.ts (hook mutation path)
 *
 * Consumers:
 *   - Call [evaluate] on app resume and on the daily scheduler tick.
 *   - Call [apply] when the UI or an LLM action tag mutates a rule.
 *   - Subscribe to [observeSuggestions] to drive UI reactivity.
 *
 * Invariant: this service is SUGGESTION-ONLY. [apply] never executes financial actions;
 * it only mutates the rule/state storage. The single guard lives here — not in the
 * persona prompt and not in AutopilotEnforcer.
 */
class AutomationService(
    private val storage: AutomationStorage,
    private val clock: AutomationClock = SystemAutomationClock,
    private val uuid: AutomationUuidProvider,
    private val telemetry: AutomationTelemetry = NoOpAutomationTelemetry,
) {

    private val json = Json { ignoreUnknownKeys = true; classDiscriminator = "type" }

    // Replays last value so new subscribers receive the current suggestion list immediately.
    private val _suggestions = MutableSharedFlow<List<AutomationSuggestion>>(replay = 1)

    /** Observable stream of the current active suggestions for this session. */
    val observeSuggestions: Flow<List<AutomationSuggestion>> = _suggestions.asSharedFlow()

    /**
     * Evaluate all enabled rules against the current profile.
     *
     * This function:
     * 1. Loads rules + dismissal states from storage.
     * 2. Delegates to [LedgerAutomationEngine] for pure evaluation.
     * 3. Converts results to [AutomationSuggestion] with [AutomationState.Suggested].
     * 4. Persists the new states and emits on [observeSuggestions].
     *
     * @param profileJson JSON string conforming to LedgerIntakeProfile.
     * @return The list of active suggestions (non-dismissed, triggered).
     */
    suspend fun evaluate(profileJson: String): List<AutomationSuggestion> {
        return try {
            val nowIso = clock.nowIso()
            val rules = storage.loadRules()
            val states = storage.loadSuggestionStates().toMutableMap()

            // Build the legacy v1 profile JSON the engine expects, augmented with rules
            // from storage so the engine sees the latest state.
            val enrichedJson = injectRulesAndDismissals(profileJson, rules, states)

            // Delegate to the pure engine.
            val engineSuggestions = LedgerAutomationEngine.evaluateRules(
                profileJson = enrichedJson,
                nowIso = nowIso,
                uuidProvider = { uuid.generate() },
            )

            // Convert engine output (using legacy string types) to typed suggestions.
            val suggestions = engineSuggestions.map { s ->
                AutomationSuggestion(
                    id = s.id,
                    ruleId = s.ruleId,
                    ruleName = s.ruleName,
                    suggestion = legacySuggestionType(s.suggestionType),
                    message = s.message,
                    generatedAt = s.generatedAt,
                    state = AutomationState.Suggested(s.generatedAt),
                )
            }

            // Persist updated states only when new Suggested states are added.
            // Skipping the write when nothing changed prevents the Firestore listener
            // from firing → profile reload → evaluate() → infinite loop.
            var statesDirty = false
            for (s in suggestions) {
                if (states[s.ruleId] !is AutomationState.Suggested) {
                    states[s.ruleId] = AutomationState.Suggested(s.generatedAt)
                    statesDirty = true
                }
            }
            if (statesDirty) storage.saveSuggestionStates(states)

            telemetry.onEvaluated(suggestions.size)
            _suggestions.emit(suggestions)
            suggestions
        } catch (e: Throwable) {
            telemetry.onError(e)
            emptyList()
        }
    }

    /**
     * Apply a typed [AutomationCommand] to storage.
     *
     * This is the single mutation path for all automation CRUD. Both the UI and
     * LLM action-tag handlers route through here.
     *
     * @return [Result.success] on success, [Result.failure] with a descriptive error otherwise.
     */
    suspend fun apply(cmd: AutomationCommand): Result<Unit> {
        return try {
            when (cmd) {
                is AutomationCommand.Create -> {
                    val rules = storage.loadRules().toMutableList()
                    val nowIso = clock.nowIso()
                    rules.add(
                        AutomationRule(
                            id = uuid.generate(),
                            name = cmd.name,
                            isEnabled = cmd.isEnabled,
                            trigger = cmd.trigger,
                            suggestion = cmd.suggestion,
                            suggestionMessage = cmd.suggestionMessage,
                            createdAt = nowIso,
                        )
                    )
                    storage.saveRules(rules)
                }

                is AutomationCommand.Update -> {
                    val rules = storage.loadRules().toMutableList()
                    val idx = rules.indexOfFirst { it.id == cmd.ruleId }
                    if (idx < 0) return Result.failure(IllegalArgumentException("Rule ${cmd.ruleId} not found"))
                    val existing = rules[idx]
                    rules[idx] = existing.copy(
                        name = cmd.name ?: existing.name,
                        isEnabled = cmd.isEnabled ?: existing.isEnabled,
                        trigger = cmd.trigger ?: existing.trigger,
                        suggestion = cmd.suggestion ?: existing.suggestion,
                        suggestionMessage = cmd.suggestionMessage ?: existing.suggestionMessage,
                        updatedAt = clock.nowIso(),
                    )
                    storage.saveRules(rules)
                }

                is AutomationCommand.Delete -> {
                    val rules = storage.loadRules().filter { it.id != cmd.ruleId }
                    storage.saveRules(rules)
                    // Also clear suggestion state for this rule.
                    val states = storage.loadSuggestionStates().toMutableMap()
                    states.remove(cmd.ruleId)
                    storage.saveSuggestionStates(states)
                }

                is AutomationCommand.Toggle -> {
                    val rules = storage.loadRules().map { r ->
                        if (r.id == cmd.ruleId) r.copy(isEnabled = cmd.enabled, updatedAt = clock.nowIso()) else r
                    }
                    storage.saveRules(rules)
                }

                is AutomationCommand.DismissSuggestion -> {
                    val states = storage.loadSuggestionStates().toMutableMap()
                    states[cmd.suggestionId] = AutomationState.Dismissed(clock.nowIso(), cmd.scope)
                    storage.saveSuggestionStates(states)
                }

                is AutomationCommand.AddDefaults -> {
                    val existing = storage.loadRules()
                    val existingTriggerKeys = existing.map { it.trigger.legacyKey }.toSet()
                    val nowIso = clock.nowIso()
                    val defaults = LedgerAutomationEngine.getDefaultRules(nowIso) { uuid.generate() }
                        .filter { it.triggerType !in existingTriggerKeys }
                        .map { d ->
                            AutomationRule(
                                id = d.id,
                                name = d.name,
                                isEnabled = d.isEnabled,
                                trigger = buildTriggerFromLegacy(d.triggerType, d.triggerThreshold, d.triggerCategory, d.triggerEntityId),
                                suggestion = legacySuggestionType(d.suggestionType),
                                suggestionMessage = d.suggestionMessage,
                                createdAt = d.createdAt,
                            )
                        }
                    if (defaults.isNotEmpty()) storage.saveRules(existing + defaults)
                }
            }
            telemetry.onCommandApplied(cmd)
            Result.success(Unit)
        } catch (e: Throwable) {
            telemetry.onError(e)
            Result.failure(e)
        }
    }

    /**
     * The set of action IDs this service handles.
     * agnes imports this to source its LLM prompt action whitelist — preventing drift.
     */
    fun supportedActionIds(): Set<String> = AUTOMATION_ACTION_IDS

    // ── Internal helpers ────────────────────────────────────────────────────

    /**
     * Rebuild the profile JSON with rules from storage and dismissal ids derived
     * from the current suggestion states. This decouples the engine from the storage
     * contract — the engine stays a pure function.
     */
    private fun injectRulesAndDismissals(
        originalProfileJson: String,
        rules: List<AutomationRule>,
        states: Map<String, AutomationState>,
    ): String {
        // Use the local json instance (ignoreUnknownKeys = true) for consistency.
        // Explicit type parameter on mutableMapOf avoids type-inference ambiguity on JVM.
        val profile: MutableMap<String, JsonElement> = runCatching {
            json.parseToJsonElement(originalProfileJson).jsonObject.toMutableMap()
        }.getOrElse { mutableMapOf() }

        // Convert typed rules back to the v1 JSON format the engine expects.
        val rulesArray: JsonArray = buildJsonArray {
            for (r in rules) add(r.toLegacyJson())
        }
        profile["automationRules"] = rulesArray

        // Build dismissedSuggestionIds from current states.
        val dismissed: JsonArray = buildJsonArray {
            for ((ruleId, state) in states) {
                when (state) {
                    is AutomationState.Dismissed -> when (val s = state.scope) {
                        is DismissScope.Forever  -> add(ruleId)
                        is DismissScope.ForToday -> add("${ruleId}_${s.date}")
                    }
                    else -> { /* non-dismissed states do not contribute a dismissal key */ }
                }
            }
        }
        profile["dismissedSuggestionIds"] = dismissed

        return buildJsonObject {
            for ((k, v) in profile) put(k, v)
        }.toString()
    }

    private fun AutomationRule.toLegacyJson(): JsonObject = buildJsonObject {
        put("id", id)
        put("name", name)
        put("isEnabled", isEnabled)
        put("triggerType", trigger.legacyKey)
        put("suggestionType", suggestion.legacyKey)
        put("suggestionMessage", suggestionMessage)
        put("createdAt", createdAt)
        updatedAt?.let { put("updatedAt", it) }
        when (val t = trigger) {
            is TriggerType.SpendingExceeds    -> { put("triggerThreshold", t.threshold); t.category?.let { put("triggerCategory", it) } }
            is TriggerType.BalanceBelow       -> put("triggerThreshold", t.threshold)
            is TriggerType.GoalProgressBelow  -> { put("triggerThreshold", t.thresholdPct); t.goalId?.let { put("triggerEntityId", it) } }
            is TriggerType.NetWorthDrops      -> put("triggerThreshold", t.thresholdPct)
            is TriggerType.SubscriptionUnused, is TriggerType.BillOverdue, is TriggerType.MonthEnd -> Unit
        }
    }

    private fun buildTriggerFromLegacy(
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
        else                  -> TriggerType.MonthEnd
    }

    private fun legacySuggestionType(key: String): SuggestionType = when (key) {
        "cancel_subscription" -> SuggestionType.CancelSubscription
        "increase_savings"    -> SuggestionType.IncreaseSavings
        "pay_extra_debt"      -> SuggestionType.PayExtraDebt
        "review_budget"       -> SuggestionType.ReviewBudget
        "record_snapshot"     -> SuggestionType.RecordSnapshot
        "transfer_to_savings" -> SuggestionType.TransferToSavings
        "custom_message"      -> SuggestionType.CustomMessage
        else                  -> SuggestionType.CustomMessage
    }
}
