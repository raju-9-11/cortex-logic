# cortex-logic — Automation Architecture

## Overview

`cortex-logic` is the single authoritative source of truth for all automation behavior shared across **agnes** (web) and **nexus-android**. No automation logic — evaluation, mutation, command parsing, dismissal key construction, or cadence — lives outside this module.

Consumers (agnes, nexus-android) are **pure adapters**: they render UI, persist bytes to their storage layer, and wire DOM/lifecycle events. They do not re-implement validation, trigger evaluation, or state-machine transitions.

---

## Two distinct "automation" concepts

| | Ledger Automation Rules | Autopilot L0–L5 |
|---|---|---|
| Scope | Ledger module only | App-wide |
| Executes actions? | No — **suggestion-only** | Yes at levels 3+ |
| Entry point | `AutomationService` | `AutopilotEnforcer` |
| Time-driven? | Yes — `AutomationRunner` | No |

---

## Package: `com.agnes.ara.core.domain.automation`

### Domain model (`AutomationModels.kt`)

- **`TriggerType`** (sealed): `SpendingExceeds(threshold, category?)`, `BalanceBelow(threshold)`, `GoalProgressBelow(thresholdPct, goalId?)`, `SubscriptionUnused`, `NetWorthDrops(thresholdPct)`, `BillOverdue`, `MonthEnd`. Each variant owns its own typed parameters — no flat threshold grab-bag.
- **`SuggestionType`** (sealed): `CancelSubscription`, `IncreaseSavings`, `PayExtraDebt`, `ReviewBudget`, `RecordSnapshot`, `TransferToSavings`, `CustomMessage`.
- **`AutomationRule`**: serialized with the custom `AutomationRuleSerializer` that transparently upgrades v1 (flat-string `triggerType`) to v2 (sealed JSON) on read. Writes always emit `schemaVersion = 2`.
- **`AutomationSuggestion`**: carries `state: AutomationState` (Idle, Suggested, Acknowledged, Dismissed, Expired).
- **`DismissScope`**: `Forever` or `ForToday(date)` — replaces ad-hoc `"{ruleId}_{YYYY-MM-DD}"` string key construction done by consumers.

### Schema migration

`AutomationRuleSerializer` is a `KSerializer<AutomationRule>` that reads both:
- **v1** (legacy): flat fields `triggerType: String`, `triggerThreshold: Double?`, `triggerCategory: String?`, `triggerEntityId: String?`, `suggestionType: String`, no `schemaVersion` field.
- **v2** (current): discriminated sealed JSON, `schemaVersion = 2`.

On write, only v2 is ever emitted. Unknown v1 `triggerType`/`suggestionType` strings are silently dropped (existing engine behaviour preserved).

### Command surface (`AutomationCommand.kt`)

`AutomationCommandParser.parse(actionId, payloadJson): Result<AutomationCommand>` is the single entry point for all LLM `<action>` tag reification. Returns `Result.failure(ParseException(ParseError))` on any validation failure — no silent string-coerce fallbacks.

**Supported action IDs** (exported as `AUTOMATION_ACTION_IDS: Set<String>`):

| Action ID | Command |
|---|---|
| `create_automation_rule` | `AutomationCommand.Create` |
| `update_automation_rule` | `AutomationCommand.Update` |
| `delete_automation_rule` | `AutomationCommand.Delete` |
| `toggle_automation_rule` | `AutomationCommand.Toggle` |
| `dismiss_suggestion` | `AutomationCommand.DismissSuggestion` |
| `add_default_automation_rules` | `AutomationCommand.AddDefaults` |

Consumers must source their LLM whitelist from `AutomationService.supportedActionIds()` (or the JS counterpart `AutomationServiceJs.supportedActionIds()`) — never hardcode the list.

### Consumer ports (`AutomationPorts.kt`)

Consumers implement these interfaces; cortex calls them:

- **`AutomationStorage`**: `loadRules/saveRules`, `loadSuggestionStates/saveSuggestionStates`, `loadSchedules/saveSchedules`.
- **`AutomationClock`**: `nowIso(): String`, `zone(): TimeZone`. Default: `SystemAutomationClock`.
- **`AutomationUuidProvider`**: `generate(): String`. Platform-default provided per source set.
- **`AutomationTelemetry`**: `onEvaluated`, `onCommandApplied`, `onError`. Default: `NoOpAutomationTelemetry`.

### Service (`AutomationService.kt`)

`AutomationService(storage, clock, uuid, telemetry)` — **single entry point** for all automation operations:

- `suspend fun evaluate(profileJson: String): List<AutomationSuggestion>` — loads rules + dismissal states, calls `LedgerAutomationEngine`, persists `Suggested(at)` states, emits on flow.
- `suspend fun apply(cmd: AutomationCommand): Result<Unit>` — **single mutation path**. All CRUD, toggle, dismiss, and add-defaults operations go through here. Precondition: Ledger automation is suggestion-only — any command that would execute a side-effect beyond storage mutation fails closed.
- `val observeSuggestions: Flow<List<AutomationSuggestion>>` — `MutableSharedFlow(replay=1)`, emits on every state change visible to the storage layer.
- `fun supportedActionIds(): Set<String>` — delegates to `AUTOMATION_ACTION_IDS`.

`AddDefaults` apply is **idempotent** — skips trigger types already present in the user's rule set.

### Runner (`AutomationRunner.kt`)

`AutomationRunner(service, scheduler, scope)` owns evaluation cadence:

- `start(eventBus)` — registers a daily 00:05 `ScheduleDefinition` (`"automation.daily_tick"`) and subscribes to `SpineEventBus` for the trigger event.
- `stop()` — unregisters and cancels.
- `poke()` — immediate evaluation. Consumers call this on window-focus / app-resume. Replaces the `hasRunRef` workaround in `use-recurring-engine.ts`.
- `setProfileProvider(provider: () -> String)` — injects the current profile JSON supplier before `start()`.

---

## JS facade (`jsMain`)

### `AutomationServiceJs`

`@JsExport class AutomationServiceJs(jsLoadRules, jsSaveRules, jsLoadStates, jsSaveStates, jsLoadSchedules, jsSaveSchedules)` — all storage params are JS callback functions with `(value, onComplete, onError)` signatures.

All async operations return `CancellableTask` (matching the existing pattern from `ActionHubJs`, `BeliefGraphServiceJs`):

```typescript
const task = automationService.evaluate(profileJson, (suggestions) => { ... }, (err) => { ... });
// later: task.cancel();
```

- `evaluate(profileJson, onComplete, onError): CancellableTask`
- `apply(actionId, payloadJson, onComplete, onError): CancellableTask` — parses the command and applies it in a single call.
- `observeSuggestions(onNext: (String) -> Unit): CancellableTask`
- `supportedActionIds(): String` — returns a JSON array string.
- `startRunner(getProfileJson: () -> String)` / `stopRunner()` / `poke()` — cadence control.

### `LedgerAutomationEngineJs` (deprecated)

`@Deprecated(level = WARNING)` — will be removed at 2.0.0. Migrate to `AutomationServiceJs`.

---

## Invariants

1. **Suggestion-only**: Ledger automation rules produce `AutomationSuggestion` objects — they do not directly execute financial operations. `AutomationService.apply` enforces this.
2. **Single mutation path**: All rule/suggestion state changes go through `AutomationService.apply(cmd)`. Do not write to `AutomationStorage` directly.
3. **Single command parser**: All LLM `<action>` tag payloads are validated by `AutomationCommandParser.parse`. Do not re-implement validation in consumers.
4. **Whitelist sourced from cortex**: The set of automation action IDs exposed to the LLM prompt is always sourced from `AUTOMATION_ACTION_IDS` — never hardcoded in consumers.
5. **Schema version**: All serialized `AutomationRule` objects include `"schemaVersion": 2`. v1 objects are upgraded on read; unrecognized trigger/suggestion strings are silently dropped.

---

## Consumer expectations

### agnes (web)

1. Implement `AutomationStorageAdapter` translating between `AutomationStorage` callbacks and the encrypted `LedgerIntakeProfile` pipeline.
2. Wire `AutomationServiceJs` via `automation-bridge.ts`.
3. Subscribe `AutomationRules.tsx` to `observeSuggestions` via `useSyncExternalStore`.
4. Call `poke()` on `window.focus` to replace the `hasRunRef` workaround.
5. Route all automation `<action>` tags through `automationService.apply(actionId, payloadJson)` from ActionHub.
6. Source the LLM whitelist from `automationService.supportedActionIds()`.

### nexus-android

Continues using the Kotlin-side `AutomationService` directly. The port interfaces (`AutomationStorage`, `AutomationClock`, `AutomationUuidProvider`) are Android-friendly by construction. Migration is a follow-up to this plan.

---

## Test coverage (`commonTest`)

| Test class | Coverage |
|---|---|
| `LedgerAutomationEngineTest` | All 7 triggers, boundary cases, dismissal scopes, disabled rules, unknown triggerType no-op, `getDefaultRules` shape |
| `AutomationCommandParserTest` | All 6 action IDs, all `ParseError` variants, all triggerType/suggestionType enum values, malformed JSON, `AUTOMATION_ACTION_IDS` constant |
| `AutomationRuleMigrationTest` | V1→V2 migration for all 7 triggers, V2 round-trip, `schemaVersion:2` in encoded JSON, all 14 `legacyKey` values |
| `SchedulerServiceTest` | Lifecycle, idempotent start, format validation, all day abbreviations |
