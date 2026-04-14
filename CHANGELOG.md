# Changelog

All notable changes to `cortex-logic` are documented here.

---

## [2.0.0] — 2026-04-12

### Breaking — Remove `LedgerAutomationEngineJs`

`LedgerAutomationEngineJs` (deprecated at 1.6.0) has been deleted. Consumers must use `AutomationServiceJs` instead.

**Migration**: Replace `new LedgerAutomationEngineJs()` with `new AutomationServiceJs(...)` and use `evaluate(profileJson, onComplete, onError)` in place of `evaluateRules(...)`. Default rules are now retrieved via `apply('add_default_automation_rules', '{}', onComplete, onError)`.

---

## [1.6.0] — 2026-04-12

### Added — Automation consolidation (Phase 1)

This release establishes cortex-logic as the single authoritative source for all automation behavior. No breaking changes — existing consumers continue to work unchanged. `LedgerAutomationEngineJs` is now deprecated with a warning; replacement is `AutomationServiceJs`.

#### New: `com.agnes.nexus.core.domain.automation` package

- **`AutomationModels.kt`** — Typed domain model replacing the stringly-typed flat representation:
  - `sealed class TriggerType` with 7 variants (each owns its own parameters — no more threshold grab-bag)
  - `sealed class SuggestionType` with 7 variants
  - `sealed class AutomationState` with 5 variants (`Idle`, `Suggested`, `Acknowledged`, `Dismissed`, `Expired`)
  - `sealed class DismissScope` (`Forever`, `ForToday(date)`) — replaces ad-hoc `"{ruleId}_{date}"` string key construction in consumers
  - Unified `data class AutomationRule` (consolidates the two `AutomationRule` classes that existed in the engine vs. prompt-context)
  - `data class AutomationSuggestion` with typed state
  - Custom `AutomationRuleSerializer` that transparently upgrades v1 JSON (flat-string triggerType/suggestionType) to v2 (sealed, `schemaVersion = 2`) on deserialization. Writes always emit v2. Closes the silent-drop hazard on unknown trigger strings.

- **`AutomationCommand.kt`** — Typed command surface:
  - `sealed class AutomationCommand` with 6 variants (`Create`, `Update`, `Delete`, `Toggle`, `DismissSuggestion`, `AddDefaults`)
  - `sealed class ParseError` (`UnknownAction`, `MissingField`, `InvalidEnum`, `MalformedJson`)
  - `object AutomationCommandParser` — `parse(actionId, payloadJson): Result<AutomationCommand>` — single validation entry point, no silent fallbacks
  - `val AUTOMATION_ACTION_IDS: Set<String>` — whitelist for LLM prompt builders

- **`AutomationPorts.kt`** — Consumer-implemented port interfaces:
  - `AutomationStorage`, `AutomationClock` (+ `SystemAutomationClock`), `AutomationUuidProvider`, `AutomationTelemetry` (+ `NoOpAutomationTelemetry`)

- **`AutomationService.kt`** — Single-entry-point service:
  - `evaluate(profileJson)` — evaluate all rules, persist states, emit on observer flow
  - `apply(cmd)` — single mutation path for all automation CRUD
  - `observeSuggestions` — `Flow<List<AutomationSuggestion>>` backed by `MutableSharedFlow(replay=1)`
  - `AddDefaults` apply is idempotent

- **`AutomationRunner.kt`** — Cadence owner:
  - Registers a daily 00:05 `ScheduleDefinition` with `SchedulerService`
  - `poke()` — immediate evaluation on window-focus / app-resume
  - Replaces the `hasRunRef` workaround in `use-recurring-engine.ts`

#### New: `jsMain` — `AutomationServiceJs`

- `@JsExport class AutomationServiceJs` — JS-friendly facade wrapping `AutomationService` + `AutomationRunner`
- All async operations return `CancellableTask` (matches existing `ActionHubJs` pattern)
- `evaluate`, `apply`, `observeSuggestions`, `supportedActionIds`, `startRunner`, `stopRunner`, `poke`

#### Modified

- **`SchedulerService.kt`** — Added `@Serializable` to `ScheduleDefinition` for persistence via `AutomationStorage.loadSchedules/saveSchedules`.
- **`LedgerPersonaPrompts.kt`** — Removed duplicate `AutomationRule(name, isEnabled)` data class; imports unified `AutomationRule` from domain package.
- **`LedgerPromptBuilder.kt`** — Replaced 5 hardcoded automation action ID strings with `*AUTOMATION_ACTION_IDS.toTypedArray()`. Prevents consumer whitelist drift.
- **`LedgerAutomationEngineJs`** — Marked `@Deprecated(level = WARNING)`. Delegates unchanged during migration period.

#### New: Tests (`commonTest`)

- `LedgerAutomationEngineTest` — 45 tests across all 7 triggers, boundary cases, dismissal scopes, disabled rules, unknown-triggerType no-op, `getDefaultRules` shape.
- `AutomationCommandParserTest` — All 6 action IDs, all `ParseError` variants, all enum values, malformed JSON, `AUTOMATION_ACTION_IDS` constant.
- `AutomationRuleMigrationTest` — V1→V2 migration for all 7 triggers, V2 round-trip, `schemaVersion:2` in output, all 14 `legacyKey` values.
- `SchedulerServiceTest` — Lifecycle, idempotent start, format validation, all valid day abbreviations.

#### Docs

- `ARCHITECTURE.md` — Automation contract, ports, consumer expectations, invariants.
- `CHANGELOG.md` — This file.

---

## [1.5.1] — prior

- `LedgerAutomationEngine` evaluation engine with 7 trigger types (stringly-typed).
- `LedgerAutomationEngineJs` JS facade.
- `SchedulerService` with `HH:MM` / `DDD HH:MM` scheduling (in-memory, no persistence).
- `AutopilotLevel` / `AutopilotEnforcer` for app-wide autopilot gating.
- `PersonaPromptCatalogJs` / `LedgerPromptBuilder` for LLM persona prompts.
- Persona, belief-graph, cognitive-engine exports.

---

## [2.0.0] — planned

### Breaking changes

- **`LedgerAutomationEngineJs` removed.** Migrate to `AutomationServiceJs`.
- `AutomationRule` v1 JSON (no `schemaVersion` field) remains readable via migration, but consumers should write only v2.
- agnes dep pin bumped to `github:raju-9-11/cortex-logic#v2.0.0`.

### Removed

- `LedgerAutomationEngineJs` class.
