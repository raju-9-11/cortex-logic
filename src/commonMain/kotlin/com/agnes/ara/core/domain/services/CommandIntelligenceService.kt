package com.agnes.ara.core.domain.services

import com.agnes.ara.core.domain.models.ModuleIds
import kotlinx.datetime.Clock
import kotlinx.datetime.DatePeriod
import kotlinx.datetime.LocalDate
import kotlinx.datetime.TimeZone
import kotlinx.datetime.plus
import kotlinx.datetime.toLocalDateTime
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.contentOrNull

// ── Type aliases ──────────────────────────────────────────────────────────────

typealias CommandCapability = String
typealias CommandIntentType = String
typealias ParsedCommandMentionDisposition = String

// ── Data contracts ────────────────────────────────────────────────────────────

data class ParsedCommandRouteHint(
    val moduleId: String,
    val confidence: Double,
    val reason: String,
    val source: String = "command_intelligence"
)

data class ParsedCommandTimeReference(
    val raw: String,
    val kind: String,
    val timezone: String,
    val isoDate: String? = null,
    val isoDateTime: String? = null,
    val time24: String? = null,
    val relation: String? = null
)

data class ParsedCommandMention(
    val moduleId: String,
    val raw: String,
    val confidence: Double,
    val disposition: ParsedCommandMentionDisposition
)

/**
 * Extracted entity fields from a single parsed segment. Named `ParsedCommandEntity`
 * to match the JS contract; the plural form `ParsedCommandEntities` is a typealias
 * preserved for backwards compatibility with internal KMP callers.
 */
data class ParsedCommandEntity(
    val title: String? = null,
    val status: String? = null,
    val dateText: String? = null,
    val timeText: String? = null
)

@Suppress("unused")
typealias ParsedCommandEntities = ParsedCommandEntity

data class ParsedCommandIntent(
    val id: String,
    val rawSegment: String,
    val intentType: CommandIntentType,
    val verb: String,
    val mutatesState: Boolean,
    val confidence: Double,
    val capabilities: List<CommandCapability>,
    val candidateModules: List<String>,
    val routeHints: List<ParsedCommandRouteHint>,
    val dependsOn: List<String>,
    val entities: ParsedCommandEntity,
    val temporal: List<ParsedCommandTimeReference>
)

data class ParsedCommandEnvelope(
    val rawInput: String,
    val normalizedInput: String,
    val parserVersion: String,
    val parserMode: String,
    val sourceModuleId: String,
    val generatedAt: String,
    val timezone: String,
    val confidence: Double,
    val intents: List<ParsedCommandIntent>,
    val temporalReferences: List<ParsedCommandTimeReference>,
    val sharedRouteHints: List<ParsedCommandRouteHint>,
    val mentions: List<ParsedCommandMention>? = null,
    val mentionedModuleIds: List<String>? = null,
    val requiresClarification: Boolean,
    val ambiguityReasons: List<String>
)

// ── Service object ────────────────────────────────────────────────────────────

/**
 * Deterministic (non-LLM) command parser ported from the TypeScript
 * `CommandIntelligenceService.parse()` path.
 *
 * All parsing is purely regex-based and runs synchronously in O(s * r) time
 * where s is the number of segments and r is the (constant) number of regex
 * patterns evaluated per segment.  No coroutine context is required.
 *
 * The async `parseWithLLM` path remains in TypeScript; this object exposes
 * only the deterministic parse phase so that it can be called from JS via
 * [CommandIntelligenceServiceJs] without incurring coroutine overhead on
 * the JS event loop.
 *
 * ## Thread safety
 * All state is local to each [parse] invocation.  The object itself holds no
 * mutable state, making it safe to call from any thread/coroutine context.
 */
object CommandIntelligenceService {

    // ── Internal draft type ───────────────────────────────────────────────────

    private data class IntentDraft(
        val intentType: CommandIntentType,
        val verb: String,
        val mutatesState: Boolean,
        val confidence: Double,
        val capabilities: List<CommandCapability>,
        val candidateModules: List<String>,
        val routeHints: List<ParsedCommandRouteHint>,
        val entities: ParsedCommandEntity
    )

    // ── Constants ─────────────────────────────────────────────────────────────

    private val MENTIONABLE_MODULES = listOf("agnes", "atlas", "soma", "titan", "ledger", "scout", "forge")

    private val KNOWN_INTENT_TYPES = setOf(
        "plan_day", "schedule_item", "update_schedule", "recovery_day",
        "emotional_support", "fitness", "medical", "financial", "research",
        "technical", "general"
    )

    private val KNOWN_CAPABILITIES = setOf(
        "daily-planning", "schedule-mutation", "reminder-management",
        "recovery-planning", "emotional-support", "fitness-planning",
        "medical-review", "financial-planning", "research",
        "technical-work", "general-orchestration"
    )

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * Parses [rawInput] into a [ParsedCommandEnvelope] using deterministic
     * regex-based heuristics only.  No network calls are made.
     *
     * @param rawInput      The raw user input string.
     * @param sourceModuleId The module that received the input (e.g. `"agnes"`).
     * @param nowIso        ISO 8601 date string representing "now" (e.g. `"2024-01-15"`).
     *                      Pass an empty string to use the current UTC date.
     * @param timezone      IANA timezone string (e.g. `"America/New_York"`).
     *                      Defaults to `"UTC"`.
     * @return A fully-populated [ParsedCommandEnvelope].
     *
     * Complexity: O(s) where s is the number of parsed segments (bounded by
     * the number of `;`, `,`, `and`, or `then` tokens in the input).
     */
    fun parse(
        rawInput: String,
        sourceModuleId: String,
        nowIso: String = "",
        timezone: String = "UTC"
    ): ParsedCommandEnvelope {
        val normalizedInput = normalizeWhitespace(rawInput)
        val resolvedTimezone = timezone.ifBlank { "UTC" }
        val todayKey = resolveNowKey(nowIso, resolvedTimezone)
        val segments = splitIntoSegments(normalizedInput)
        val mentions = detectMentions(normalizedInput)

        val intents: List<ParsedCommandIntent> = segments.mapIndexed { index, segment ->
            val temporal = parseTemporalReferences(segment, todayKey, resolvedTimezone)
            val draft = buildIntentDraft(segment)
            val inferredDate = temporal.firstOrNull { it.isoDate != null }?.isoDate
            val inferredTime = temporal.firstOrNull { it.time24 != null }?.time24
            val entities = draft.entities.copy(
                dateText = draft.entities.dateText ?: inferredDate,
                timeText = draft.entities.timeText ?: inferredTime
            )
            ParsedCommandIntent(
                id = "intent-${index + 1}",
                rawSegment = segment,
                intentType = draft.intentType,
                verb = draft.verb,
                mutatesState = draft.mutatesState,
                confidence = draft.confidence,
                capabilities = draft.capabilities,
                candidateModules = draft.candidateModules,
                routeHints = draft.routeHints,
                dependsOn = if (index > 0) listOf("intent-$index") else emptyList(),
                entities = entities,
                temporal = temporal
            )
        }

        val temporalReferences = intents.flatMap { it.temporal }
        val sharedRouteHints = dedupeRouteHints(intents.flatMap { it.routeHints })
        val ambiguityReasons = buildAmbiguityReasons(intents)
        val confidence = if (intents.isNotEmpty()) {
            val avg = intents.sumOf { it.confidence } / intents.size.toDouble()
            (avg * 100.0).toLong() / 100.0
        } else {
            0.45
        }
        val mentionedModuleIds = mentions.map { it.moduleId }.distinct()

        return ParsedCommandEnvelope(
            rawInput = rawInput,
            normalizedInput = normalizedInput,
            parserVersion = "phase1-v1",
            parserMode = "phase1",
            sourceModuleId = ModuleIds.normalize(sourceModuleId) ?: ModuleIds.NEXUS,
            generatedAt = buildGeneratedAt(todayKey),
            timezone = resolvedTimezone,
            confidence = confidence,
            intents = intents,
            temporalReferences = temporalReferences,
            sharedRouteHints = sharedRouteHints,
            mentions = mentions.takeIf { it.isNotEmpty() },
            mentionedModuleIds = mentionedModuleIds.takeIf { it.isNotEmpty() },
            requiresClarification = ambiguityReasons.isNotEmpty() && confidence < 0.7,
            ambiguityReasons = ambiguityReasons
        )
    }

    /**
     * Backward-compatible overload that accepts a [kotlinx.datetime.Instant]
     * for the "now" parameter.  Converts the instant to a UTC date key and
     * delegates to the primary [parse] overload.
     *
     * This overload exists so that existing KMP callers that pass
     * `now: Instant` do not require a migration to the string-based API.
     * The JS bridge always uses the string form.
     */
    fun parse(
        rawInput: String,
        sourceModuleId: String,
        timezone: String = "UTC",
        now: kotlinx.datetime.Instant
    ): ParsedCommandEnvelope {
        val tz = if (timezone.isBlank()) TimeZone.UTC else TimeZone.of(timezone)
        val nowIso = now.toLocalDateTime(tz).date.toString()
        return parse(rawInput = rawInput, sourceModuleId = sourceModuleId, nowIso = nowIso, timezone = timezone)
    }

    /**
     * LLM-augmented parse path.  Calls the deterministic [parse] as a fallback
     * and optionally invokes [generateJson] to get an LLM-derived intent
     * envelope.  If [generateJson] is null or throws, the deterministic result
     * is returned unchanged.
     *
     * This function is `suspend` because [generateJson] is typically a
     * network-bound coroutine; it may be called from a coroutine scope on
     * JVM/Native or via `GlobalScope.launch` on JS.
     *
     * The [now] parameter accepts an [kotlinx.datetime.Instant] to match the
     * existing KMP caller contract.
     */
    suspend fun parseWithLlm(
        rawInput: String,
        sourceModuleId: String = ModuleIds.NEXUS,
        timezone: String = "UTC",
        now: kotlinx.datetime.Instant = Clock.System.now(),
        generateJson: (suspend (prompt: String, systemPrompt: String) -> kotlinx.serialization.json.JsonObject?)? = null
    ): ParsedCommandEnvelope {
        val tz = if (timezone.isBlank()) TimeZone.UTC else TimeZone.of(timezone)
        val nowIso = now.toLocalDateTime(tz).date.toString()
        val fallback = parse(
            rawInput = rawInput,
            sourceModuleId = sourceModuleId,
            nowIso = nowIso,
            timezone = timezone
        )
        val generator = generateJson ?: return fallback

        val localNow = now.toLocalDateTime(tz)
        val todayKey = localNow.date.toString()
        val tomorrowKey = localNow.date.plus(DatePeriod(days = 1)).toString()
        val systemPrompt = listOf(
            "You are a command-intelligence parser.",
            "Return ONLY valid JSON. No markdown, no commentary.",
            "Parse the user input into intents using the provided enums.",
            "Interpret times like \"1200\" as \"12:00\" even without the word \"at\".",
            "If the user says \"tomorrow\", use the provided date."
        ).joinToString(" ")
        val prompt = listOf(
            "Input: \"$rawInput\"",
            "Timezone: $timezone",
            "Today: $todayKey",
            "Tomorrow: $tomorrowKey",
            "Output JSON shape:",
            "{",
            "  \"intents\": [",
            "    {",
            "      \"rawSegment\": \"string\",",
            "      \"intentType\": \"one of: plan_day|schedule_item|update_schedule|recovery_day|emotional_support|fitness|medical|financial|research|technical|general\",",
            "      \"verb\": \"string\",",
            "      \"confidence\": 0.0,",
            "      \"mutatesState\": true,",
            "      \"capabilities\": [\"daily-planning\"],",
            "      \"candidateModules\": [\"atlas\"],",
            "      \"routeHints\": [{\"moduleId\":\"atlas\",\"confidence\":0.8,\"reason\":\"...\",\"source\":\"command_intelligence\"}],",
            "      \"entities\": {\"title\":\"...\", \"status\":\"...\", \"dateText\":\"YYYY-MM-DD\", \"timeText\":\"HH:mm\"}",
            "    }",
            "  ],",
            "  \"mentions\": [{\"moduleId\":\"atlas\",\"raw\":\"Atlas\",\"confidence\":0.8,\"disposition\":\"vocative\"}],",
            "  \"confidence\": 0.0,",
            "  \"ambiguityReasons\": [\"...\"]",
            "}"
        ).joinToString("\n")

        val llm = runCatching { generator(prompt, systemPrompt) }.getOrNull() ?: return fallback
        val intentsRaw = llm["intents"]?.asObjectList().orEmpty()
        if (intentsRaw.isEmpty()) return fallback

        val intents = intentsRaw.mapIndexed { index, raw ->
            val base = fallback.intents.getOrNull(index)
            val rawSegment = raw["rawSegment"]?.stringOrNull ?: base?.rawSegment ?: fallback.normalizedInput
            val normalizedIntentType = normalizeIntentType(raw["intentType"]?.stringOrNull)
            val intentType = normalizedIntentType ?: base?.intentType ?: "general"
            val defaults = defaultsForIntentType(intentType)
            val verb = raw["verb"]?.stringOrNull ?: base?.verb ?: defaults.verb
            val entitiesObject = (raw["entities"] as? kotlinx.serialization.json.JsonObject)
            val entities = ParsedCommandEntity(
                title = raw["title"]?.stringOrNull ?: entitiesObject?.get("title")?.stringOrNull ?: base?.entities?.title,
                status = raw["status"]?.stringOrNull ?: entitiesObject?.get("status")?.stringOrNull ?: base?.entities?.status,
                dateText = normalizeDateText(
                    raw["dateText"]?.stringOrNull ?: entitiesObject?.get("dateText")?.stringOrNull ?: base?.entities?.dateText
                ),
                timeText = normalizeTimeText(
                    raw["timeText"]?.stringOrNull ?: entitiesObject?.get("timeText")?.stringOrNull ?: base?.entities?.timeText
                )
            )
            val capabilities = normalizeCapabilities(raw["capabilities"], base?.capabilities ?: defaults.capabilities)
            val candidateModules = normalizeModuleIds(raw["candidateModules"], base?.candidateModules ?: defaults.candidateModules)
            val routeHints = normalizeRouteHints(raw["routeHints"], base?.routeHints ?: defaults.routeHints)
            val dependsOn = raw["dependsOn"]?.asStringList()
                ?: if (index > 0) listOf("intent-$index") else emptyList()

            ParsedCommandIntent(
                id = "intent-${index + 1}",
                rawSegment = rawSegment,
                intentType = intentType,
                verb = verb,
                mutatesState = raw["mutatesState"]?.booleanOrNullValue ?: base?.mutatesState ?: defaults.mutatesState,
                confidence = clampConfidence(raw["confidence"]?.doubleOrNullValue, base?.confidence ?: defaults.confidence),
                capabilities = capabilities,
                candidateModules = candidateModules,
                routeHints = routeHints,
                dependsOn = dependsOn,
                entities = entities,
                temporal = buildTemporalFromEntities(rawSegment, entities, timezone)
            )
        }

        val temporalReferences = intents.flatMap { it.temporal }
        val sharedRouteHints = dedupeRouteHints(intents.flatMap { it.routeHints })
        val mentions = normalizeMentions(llm["mentions"], fallback.mentions)
        val mentionedModuleIds = mentions?.map { it.moduleId }
        val ambiguityReasons = llm["ambiguityReasons"]?.asStringList()
            ?.ifEmpty { null }
            ?: buildAmbiguityReasons(intents)
        val confidenceFallback = intents.sumOf { it.confidence } / intents.size.toDouble()
        val confidence = clampConfidence(llm["confidence"]?.doubleOrNullValue, confidenceFallback)

        return ParsedCommandEnvelope(
            rawInput = rawInput,
            normalizedInput = fallback.normalizedInput,
            parserVersion = "llm-v1",
            parserMode = "llm",
            sourceModuleId = ModuleIds.normalize(sourceModuleId) ?: ModuleIds.NEXUS,
            generatedAt = buildGeneratedAt(todayKey),
            timezone = timezone,
            confidence = confidence,
            intents = intents,
            temporalReferences = temporalReferences,
            sharedRouteHints = sharedRouteHints,
            mentions = mentions,
            mentionedModuleIds = mentionedModuleIds,
            requiresClarification = ambiguityReasons.isNotEmpty() && confidence < 0.7,
            ambiguityReasons = ambiguityReasons
        )
    }

    // ── LLM path helpers (used by parseWithLlm) ──────────────────────────────

    /**
     * Clamps [value] to `[0.0, 1.0]`, returning [fallback] for null or
     * non-finite inputs.
     */
    fun clampConfidence(value: Double?, fallback: Double): Double =
        (value ?: fallback).coerceIn(0.0, 1.0)

    /**
     * Returns [value] only when it is a recognised intent-type string;
     * otherwise returns null.
     */
    fun normalizeIntentType(value: String?): String? =
        value?.takeIf { KNOWN_INTENT_TYPES.contains(it) }

    /**
     * Filters [value] to known capability strings.  Returns [fallback] when
     * the result would be empty.
     */
    fun normalizeCapabilities(
        value: JsonElement?,
        fallback: List<String>
    ): List<String> {
        val filtered = value?.asStringList()?.filter { KNOWN_CAPABILITIES.contains(it) }.orEmpty()
        return if (filtered.isNotEmpty()) filtered else fallback
    }

    /**
     * Filters [value] to known module IDs via [ModuleIds.normalize].
     * Returns [fallback] when the result would be empty.
     */
    fun normalizeModuleIds(value: JsonElement?, fallback: List<String>): List<String> {
        val filtered = value?.asStringList()
            ?.mapNotNull { ModuleIds.normalize(it) }
            .orEmpty()
        return if (filtered.isNotEmpty()) filtered else fallback
    }

    /**
     * Coerces a JSON element array of route-hint objects into typed
     * [ParsedCommandRouteHint] values.  Returns [fallback] when the result
     * would be empty.
     */
    fun normalizeRouteHints(
        value: JsonElement?,
        fallback: List<ParsedCommandRouteHint>
    ): List<ParsedCommandRouteHint> {
        val filtered = value?.asObjectList()
            ?.mapNotNull { hint ->
                val moduleId = ModuleIds.normalize(
                    hint["moduleId"]?.stringOrNull ?: return@mapNotNull null
                ) ?: return@mapNotNull null
                ParsedCommandRouteHint(
                    moduleId = moduleId,
                    confidence = clampConfidence(hint["confidence"]?.doubleOrNullValue, 0.62),
                    reason = hint["reason"]?.stringOrNull ?: "llm_hint",
                    source = "command_intelligence"
                )
            }
            .orEmpty()
        return if (filtered.isNotEmpty()) filtered else fallback
    }

    /**
     * Coerces a JSON element array of mention objects into typed
     * [ParsedCommandMention] values.  Returns [fallback] when the result
     * would be empty.
     */
    fun normalizeMentions(
        value: JsonElement?,
        fallback: List<ParsedCommandMention>?
    ): List<ParsedCommandMention>? {
        val normalized = value?.asObjectList()?.mapNotNull { mention ->
            val moduleId = ModuleIds.normalize(
                mention["moduleId"]?.stringOrNull ?: return@mapNotNull null
            ) ?: return@mapNotNull null
            val disposition = mention["disposition"]?.stringOrNull ?: return@mapNotNull null
            if (disposition !in setOf("vocative", "consultative", "ownership")) return@mapNotNull null
            ParsedCommandMention(
                moduleId = moduleId,
                raw = mention["raw"]?.stringOrNull ?: moduleId,
                confidence = clampConfidence(mention["confidence"]?.doubleOrNullValue, 0.62),
                disposition = disposition
            )
        }.orEmpty()
        return if (normalized.isNotEmpty()) normalized else fallback
    }

    /**
     * Returns a canonical [IntentDraft] for a given [intentType] string.
     * Used by `parseWithLlm` to supply safe defaults when the LLM result is
     * incomplete.
     */
    private fun defaultsForIntentType(intentType: String): IntentDraft = when (intentType) {
        "plan_day" -> IntentDraft(
            intentType = intentType,
            verb = "plan",
            mutatesState = true,
            confidence = 0.9,
            capabilities = listOf("daily-planning"),
            candidateModules = listOf("atlas"),
            routeHints = listOf(routeHint("atlas", 0.9, "daily planning intent")),
            entities = ParsedCommandEntity()
        )
        "schedule_item" -> IntentDraft(
            intentType = intentType,
            verb = "schedule",
            mutatesState = true,
            confidence = 0.87,
            capabilities = listOf("schedule-mutation", "daily-planning"),
            candidateModules = listOf("atlas"),
            routeHints = listOf(routeHint("atlas", 0.87, "scheduled planning item")),
            entities = ParsedCommandEntity()
        )
        "update_schedule" -> IntentDraft(
            intentType = intentType,
            verb = "update",
            mutatesState = true,
            confidence = 0.82,
            capabilities = listOf("schedule-mutation"),
            candidateModules = listOf("atlas"),
            routeHints = listOf(routeHint("atlas", 0.86, "schedule update intent")),
            entities = ParsedCommandEntity()
        )
        "recovery_day" -> IntentDraft(
            intentType = intentType,
            verb = "rest",
            mutatesState = true,
            confidence = 0.88,
            capabilities = listOf("schedule-mutation", "recovery-planning"),
            candidateModules = listOf("atlas", "soma", "agnes"),
            routeHints = listOf(
                routeHint("atlas", 0.86, "schedule update intent"),
                routeHint("soma", 0.74, "recovery context"),
                routeHint("agnes", 0.62, "rest framing support")
            ),
            entities = ParsedCommandEntity(status = "rest")
        )
        "emotional_support" -> IntentDraft(
            intentType = intentType,
            verb = "support",
            mutatesState = false,
            confidence = 0.85,
            capabilities = listOf("emotional-support"),
            candidateModules = listOf("agnes"),
            routeHints = listOf(routeHint("agnes", 0.85, "emotional support intent")),
            entities = ParsedCommandEntity()
        )
        "fitness" -> IntentDraft(
            intentType = intentType,
            verb = "plan",
            mutatesState = true,
            confidence = 0.85,
            capabilities = listOf("fitness-planning"),
            candidateModules = listOf("titan"),
            routeHints = listOf(routeHint("titan", 0.85, "fitness intent")),
            entities = ParsedCommandEntity()
        )
        "medical" -> IntentDraft(
            intentType = intentType,
            verb = "check",
            mutatesState = false,
            confidence = 0.82,
            capabilities = listOf("medical-review"),
            candidateModules = listOf("soma"),
            routeHints = listOf(routeHint("soma", 0.82, "medical review intent")),
            entities = ParsedCommandEntity()
        )
        "financial" -> IntentDraft(
            intentType = intentType,
            verb = "plan",
            mutatesState = true,
            confidence = 0.8,
            capabilities = listOf("financial-planning"),
            candidateModules = listOf("ledger"),
            routeHints = listOf(routeHint("ledger", 0.8, "financial planning intent")),
            entities = ParsedCommandEntity()
        )
        "research" -> IntentDraft(
            intentType = intentType,
            verb = "research",
            mutatesState = false,
            confidence = 0.8,
            capabilities = listOf("research"),
            candidateModules = listOf("scout"),
            routeHints = listOf(routeHint("scout", 0.8, "research intent")),
            entities = ParsedCommandEntity()
        )
        "technical" -> IntentDraft(
            intentType = intentType,
            verb = "refactor",
            mutatesState = false,
            confidence = 0.8,
            capabilities = listOf("technical-work"),
            candidateModules = listOf("forge"),
            routeHints = listOf(routeHint("forge", 0.8, "technical work intent")),
            entities = ParsedCommandEntity()
        )
        else -> IntentDraft(
            intentType = "general",
            verb = "talk",
            mutatesState = false,
            confidence = 0.45,
            capabilities = listOf("general-orchestration"),
            candidateModules = listOf(ModuleIds.NEXUS),
            routeHints = listOf(routeHint(ModuleIds.NEXUS, 0.45, "fallback general intent")),
            entities = ParsedCommandEntity()
        )
    }

    /**
     * Reconstructs [ParsedCommandTimeReference] entries from the already-parsed
     * [entities] block.  Used by `parseWithLlm` to build temporal from LLM output.
     */
    fun buildTemporalFromEntities(
        rawSegment: String,
        entities: ParsedCommandEntity,
        timezone: String
    ): List<ParsedCommandTimeReference> {
        val refs = mutableListOf<ParsedCommandTimeReference>()
        val dateText = normalizeDateText(entities.dateText)
        val timeText = normalizeTimeText(entities.timeText)
        if (dateText != null) {
            refs += ParsedCommandTimeReference(
                raw = if (Regex("\\btomorrow\\b", RegexOption.IGNORE_CASE)
                        .containsMatchIn(rawSegment)) "tomorrow" else dateText,
                kind = "date",
                timezone = timezone,
                isoDate = dateText,
                relation = if (Regex("\\btomorrow\\b", RegexOption.IGNORE_CASE)
                        .containsMatchIn(rawSegment)) "tomorrow" else null
            )
        }
        if (timeText != null) {
            val isoDateTime = dateText?.let { buildLocalIsoDateTime(it, timeText) }
            refs += ParsedCommandTimeReference(
                raw = timeText,
                kind = if (dateText != null) "datetime" else "time",
                timezone = timezone,
                isoDate = dateText,
                isoDateTime = isoDateTime,
                time24 = timeText
            )
        }
        return refs
    }

    // ── Private: text normalisation ───────────────────────────────────────────

    /**
     * Collapses runs of whitespace to a single space and trims both ends.
     * O(n) where n is input length.
     */
    internal fun normalizeWhitespace(input: String): String =
        input.replace(Regex("\\s+"), " ").trim()

    /**
     * Splits [input] on `;`, `,`, `and`, or `then` delimiters, trying
     * punctuation-based splits first.  Falls back to conjunction splits only
     * when no punctuation delimiter is found.
     *
     * Mirrors the TS `splitIntoSegments` exactly:
     * - comma/semicolon split returns multiple segments when count > 1
     * - otherwise conjunction-based split is used
     *
     * Time: O(n).  The returned list has at least one element for non-blank input.
     */
    internal fun splitIntoSegments(input: String): List<String> {
        if (input.isBlank()) return emptyList()
        val commaSegments = input.split(Regex("\\s*[;,]\\s*"))
            .map { it.trim() }
            .filter { it.isNotBlank() }
        if (commaSegments.size > 1) return commaSegments
        return input.split(Regex("\\s+(?:and|then)\\s+", RegexOption.IGNORE_CASE))
            .map { it.trim() }
            .filter { it.isNotBlank() }
            .ifEmpty { listOf(input) }
    }

    // ── Private: date/time helpers ────────────────────────────────────────────

    /**
     * Resolves the "today" key as `"YYYY-MM-DD"`.
     *
     * When [nowIso] is blank the current UTC date from [Clock.System] is used.
     * When [nowIso] already looks like a local-date string it is returned as-is
     * after stripping any time component.  This keeps the function pure and
     * avoids Instant→LocalDateTime conversion which requires a tz-aware clock.
     *
     * Time: O(1).
     */
    private fun resolveNowKey(nowIso: String, timezone: String): String {
        if (nowIso.isNotBlank()) {
            // Accept "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm…" — take the date part.
            val datePart = nowIso.substringBefore('T')
            if (Regex("^\\d{4}-\\d{2}-\\d{2}$").matches(datePart)) return datePart
        }
        // Fall back to current UTC date.
        return Clock.System.now()
            .toLocalDateTime(TimeZone.UTC)
            .date
            .toString()
    }

    /**
     * Produces the local date key for the day following [dateKey] in the form
     * `"YYYY-MM-DD"`.  Uses [kotlinx.datetime.LocalDate] arithmetic to handle
     * month and year boundaries correctly.
     *
     * Time: O(1).
     */
    internal fun buildLocalDateKey(dateKey: String): String {
        return LocalDate.parse(dateKey).toString()
    }

    /**
     * Advances [dateKey] by one day, handling month/year rollover via
     * [DatePeriod].
     *
     * Time: O(1).
     */
    private fun tomorrowDateKey(dateKey: String): String {
        return LocalDate.parse(dateKey).plus(DatePeriod(days = 1)).toString()
    }

    /**
     * Constructs a local ISO 8601 date-time string without timezone offset
     * information — suitable for display and scheduling slots where the
     * consumer attaches its own timezone context.
     *
     * Output form: `"YYYY-MM-DDTHH:mm:00"`.
     *
     * Time: O(1).
     */
    internal fun buildLocalIsoDateTime(dateKey: String, time24: String): String =
        "${dateKey}T${time24}:00"

    /**
     * Builds a short ISO timestamp string for the `generatedAt` field using
     * only the date portion.  Appending `T00:00:00Z` makes it a valid ISO 8601
     * instant without requiring a full Instant conversion.
     */
    private fun buildGeneratedAt(todayKey: String): String = "${todayKey}T00:00:00Z"

    // ── Private: time parsing ─────────────────────────────────────────────────

    /**
     * Extracts a 24-hour time value from [segment] by matching either a
     * compact digit form (`at 1430`) or a colon-separated form (`at 14:30`).
     *
     * Returns a [Pair] of `(rawMatch, "HH:mm")` or `null` when no valid time
     * is found.  Both digits and colon forms are validated against the calendar
     * range `[0..23]:[0..59]`.
     *
     * Time: O(n) where n is segment length (regex scan).
     */
    internal fun parseTime24(segment: String): Pair<String, String>? {
        // Compact form: "at 900", "at 1430"
        val compact = Regex("\\bat\\s+(\\d{3,4})\\b", RegexOption.IGNORE_CASE).find(segment)
        if (compact != null) {
            val digits = compact.groupValues[1]
            val hours = if (digits.length == 3) digits.substring(0, 1) else digits.substring(0, 2)
            val minutes = if (digits.length == 3) digits.substring(1) else digits.substring(2)
            val hh = hours.toIntOrNull()
            val mm = minutes.toIntOrNull()
            if (hh != null && mm != null && hh in 0..23 && mm in 0..59) {
                return compact.value to "${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}"
            }
        }
        // Standard colon form: "at 9:30", "at 14:00"
        val standard = Regex("\\bat\\s+(\\d{1,2}:\\d{2})\\b", RegexOption.IGNORE_CASE).find(segment)
            ?: return null
        val parts = standard.groupValues[1].split(":")
        if (parts.size != 2) return null
        val hh = parts[0].toIntOrNull()
        val mm = parts[1].toIntOrNull()
        if (hh == null || mm == null || hh !in 0..23 || mm !in 0..59) return null
        return standard.value to "${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}"
    }

    // ── Private: temporal reference extraction ────────────────────────────────

    /**
     * Produces a list of [ParsedCommandTimeReference] by scanning [segment]
     * for temporal keywords (`tomorrow`) and time values (`at HH:mm`).
     *
     * [todayKey] is the resolved "today" ISO date string used to compute
     * tomorrow's date key without needing a live clock.
     *
     * Time: O(n) for regex scans over segment.
     */
    internal fun parseTemporalReferences(
        segment: String,
        todayKey: String,
        timezone: String
    ): List<ParsedCommandTimeReference> {
        val refs = mutableListOf<ParsedCommandTimeReference>()
        val lower = segment.lowercase()
        var targetDateKey: String? = null

        if (lower.contains("tomorrow")) {
            targetDateKey = tomorrowDateKey(todayKey)
            refs += ParsedCommandTimeReference(
                raw = "tomorrow",
                kind = "date",
                timezone = timezone,
                isoDate = targetDateKey,
                relation = "tomorrow"
            )
        }

        val timeMatch = parseTime24(segment)
        if (timeMatch != null) {
            val (rawTime, time24) = timeMatch
            val isoDateTime = targetDateKey?.let { buildLocalIsoDateTime(it, time24) }
            refs += ParsedCommandTimeReference(
                raw = rawTime,
                kind = if (targetDateKey != null) "datetime" else "time",
                timezone = timezone,
                isoDate = targetDateKey,
                isoDateTime = isoDateTime,
                time24 = time24
            )
        }

        return refs
    }

    // ── Private: text normalisation helpers ───────────────────────────────────

    /**
     * Normalises a raw time value string to canonical `"HH:mm"` form.
     *
     * Accepts compact 3–4 digit strings (`"900"`, `"1430"`) or colon-separated
     * strings (`"9:30"`, `"14:00"`).  Returns the trimmed input unchanged when
     * neither form matches.  Returns null for blank or null input.
     */
    internal fun normalizeTimeText(value: String?): String? {
        val trimmed = value?.trim().orEmpty()
        if (trimmed.isEmpty()) return null
        if (Regex("^\\d{3,4}$").matches(trimmed)) {
            val hours = if (trimmed.length == 3) trimmed.substring(0, 1) else trimmed.substring(0, 2)
            val minutes = if (trimmed.length == 3) trimmed.substring(1) else trimmed.substring(2)
            val hh = hours.toIntOrNull()
            val mm = minutes.toIntOrNull()
            if (hh != null && mm != null && hh in 0..23 && mm in 0..59) {
                return "${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}"
            }
        }
        if (Regex("^\\d{1,2}:\\d{2}$").matches(trimmed)) {
            val parts = trimmed.split(":")
            val hh = parts.getOrNull(0)?.toIntOrNull()
            val mm = parts.getOrNull(1)?.toIntOrNull()
            if (hh != null && mm != null && hh in 0..23 && mm in 0..59) {
                return "${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}"
            }
        }
        return trimmed
    }

    /**
     * Validates that [value] is a well-formed ISO date string (`"YYYY-MM-DD"`).
     * Returns null for any other format, empty strings, or null input.
     */
    internal fun normalizeDateText(value: String?): String? {
        val trimmed = value?.trim().orEmpty()
        if (trimmed.isEmpty()) return null
        return if (Regex("^\\d{4}-\\d{2}-\\d{2}$").matches(trimmed)) trimmed else null
    }

    // ── Private: title extraction ─────────────────────────────────────────────

    /**
     * Extracts a scheduling title from [segment] by stripping the leading
     * scheduling verb and any trailing time/date qualifiers.
     *
     * Examples:
     * - `"schedule a standup at 9:00"` → `"standup"`
     * - `"add dentist appointment tomorrow"` → `"dentist appointment"`
     *
     * Returns null when no scheduling verb is found.
     *
     * Time: O(n) for a single regex scan.
     */
    internal fun extractTitle(segment: String): String? {
        val match = Regex(
            "\\b(?:schedule|add|set|create)\\s+(.+?)(?:\\s+at\\s+\\d{1,4}|\\s+at\\s+\\d{1,2}:\\d{2}|\\s+tomorrow|\$)",
            RegexOption.IGNORE_CASE
        ).find(segment) ?: return null
        return match.groupValues[1]
            .replace(Regex("^(?:a|an|the)\\s+", RegexOption.IGNORE_CASE), "")
            .trim()
            .ifBlank { null }
    }

    // ── Private: intent classification ────────────────────────────────────────

    /**
     * Maps a single segment to an [IntentDraft] using an ordered cascade of
     * regex heuristics.  Mirrors the TS `buildIntentDraft` function exactly,
     * including the multi-route recovery-day path.
     *
     * The cascade is evaluated top-to-bottom; the first match wins.
     *
     * Time: O(r) where r is the fixed number of regex patterns (constant).
     */
    private fun buildIntentDraft(segment: String): IntentDraft {
        val normalized = normalizeWhitespace(segment)
        val lower = normalized.lowercase()

        // ── plan_day ─────────────────────────────────────────────────────────
        if (Regex("plan my day|day plan|daily plan|plan tomorrow|plan .* tomorrow")
                .containsMatchIn(lower)) {
            return IntentDraft(
                intentType = "plan_day",
                verb = "plan",
                mutatesState = true,
                confidence = 0.9,
                capabilities = listOf("daily-planning"),
                candidateModules = listOf("atlas"),
                routeHints = listOf(routeHint("atlas", 0.9, "daily planning intent")),
                entities = ParsedCommandEntity()
            )
        }

        // ── update_schedule / recovery_day ───────────────────────────────────
        if (
            Regex("\\b(update|move|change|reschedule)\\b").containsMatchIn(lower) ||
            (Regex("\\brest\\b").containsMatchIn(lower) &&
                Regex("\\btomorrow\\b").containsMatchIn(lower))
        ) {
            val routeHints = mutableListOf(routeHint("atlas", 0.86, "schedule update intent"))
            val candidateModules = mutableListOf("atlas")
            val capabilities = mutableListOf<CommandCapability>("schedule-mutation")
            val hasRecovery = Regex("\\brest\\b").containsMatchIn(lower) ||
                Regex("\\b(exhausted|tired)\\b").containsMatchIn(lower)
            if (hasRecovery) {
                routeHints += routeHint("soma", 0.74, "recovery context")
                routeHints += routeHint("agnes", 0.62, "rest framing support")
                candidateModules += listOf("soma", "agnes")
                capabilities += "recovery-planning"
            }
            return IntentDraft(
                intentType = if (Regex("\\brest\\b").containsMatchIn(lower)) "recovery_day"
                    else "update_schedule",
                verb = Regex("\\b(update|move|change|reschedule)\\b").find(lower)
                    ?.groupValues?.get(1) ?: "update",
                mutatesState = true,
                confidence = if (Regex("\\brest\\b").containsMatchIn(lower)) 0.88 else 0.82,
                capabilities = capabilities,
                candidateModules = candidateModules,
                routeHints = routeHints,
                entities = ParsedCommandEntity(
                    status = if (Regex("\\brest\\b").containsMatchIn(lower)) "rest" else null
                )
            )
        }

        // ── schedule_item ────────────────────────────────────────────────────
        if (
            Regex("\\b(schedule|add|set|create)\\b").containsMatchIn(lower) &&
            (parseTime24(segment) != null || Regex("\\btomorrow\\b").containsMatchIn(lower))
        ) {
            return IntentDraft(
                intentType = "schedule_item",
                verb = Regex("\\b(schedule|add|set|create)\\b").find(lower)
                    ?.groupValues?.get(1) ?: "schedule",
                mutatesState = true,
                confidence = 0.87,
                capabilities = listOf("schedule-mutation", "daily-planning"),
                candidateModules = listOf("atlas"),
                routeHints = listOf(routeHint("atlas", 0.87, "scheduled planning item")),
                entities = ParsedCommandEntity(title = extractTitle(normalized))
            )
        }

        // ── emotional_support ────────────────────────────────────────────────
        if (
            Regex("\\b(anxiety|emotion|feeling|therapy|relationship|depression|trauma|exhausted|tired|stressed|sad|overwhelmed|alone|lonely)\\b")
                .containsMatchIn(lower) ||
            Regex("\\b(feel|feeling)\\b").containsMatchIn(lower)
        ) {
            return IntentDraft(
                intentType = "emotional_support",
                verb = commandVerb(lower) ?: "support",
                mutatesState = false,
                confidence = 0.85,
                capabilities = listOf("emotional-support"),
                candidateModules = listOf("agnes"),
                routeHints = listOf(routeHint("agnes", 0.85, "emotional support intent")),
                entities = ParsedCommandEntity()
            )
        }

        // ── fitness ──────────────────────────────────────────────────────────
        if (Regex("\\b(workout|training|fitness|gym|exercise|lift|run|walk|cycle|swim|routine|program)\\b")
                .containsMatchIn(lower)) {
            return IntentDraft(
                intentType = "fitness",
                verb = commandVerb(lower) ?: "plan",
                mutatesState = true,
                confidence = 0.85,
                capabilities = listOf("fitness-planning"),
                candidateModules = listOf("titan"),
                routeHints = listOf(routeHint("titan", 0.85, "fitness intent")),
                entities = ParsedCommandEntity()
            )
        }

        // ── medical ──────────────────────────────────────────────────────────
        if (Regex("\\b(bloodwork|biomarker|hrv|sleep score|recovery|medical|clearance|sick|ill|hurt|pain|ache|injury)\\b")
                .containsMatchIn(lower)) {
            return IntentDraft(
                intentType = "medical",
                verb = commandVerb(lower) ?: "check",
                mutatesState = false,
                confidence = 0.82,
                capabilities = listOf("medical-review"),
                candidateModules = listOf("soma"),
                routeHints = listOf(routeHint("soma", 0.82, "medical review intent")),
                entities = ParsedCommandEntity()
            )
        }

        // ── financial ────────────────────────────────────────────────────────
        if (Regex("\\b(budget|expense|spending|money|finance|debt|savings|pay)\\b")
                .containsMatchIn(lower)) {
            return IntentDraft(
                intentType = "financial",
                verb = commandVerb(lower) ?: "plan",
                mutatesState = true,
                confidence = 0.8,
                capabilities = listOf("financial-planning"),
                candidateModules = listOf("ledger"),
                routeHints = listOf(routeHint("ledger", 0.8, "financial planning intent")),
                entities = ParsedCommandEntity()
            )
        }

        // ── research ─────────────────────────────────────────────────────────
        if (Regex("\\b(research|verify|evidence|sources|fact-check|topic|learn)\\b")
                .containsMatchIn(lower)) {
            return IntentDraft(
                intentType = "research",
                verb = commandVerb(lower) ?: "research",
                mutatesState = false,
                confidence = 0.8,
                capabilities = listOf("research"),
                candidateModules = listOf("scout"),
                routeHints = listOf(routeHint("scout", 0.8, "research intent")),
                entities = ParsedCommandEntity()
            )
        }

        // ── technical ────────────────────────────────────────────────────────
        if (Regex("\\b(code|refactor|typescript|repository|github|bug|build|dev|programming)\\b")
                .containsMatchIn(lower)) {
            return IntentDraft(
                intentType = "technical",
                verb = commandVerb(lower) ?: "refactor",
                mutatesState = false,
                confidence = 0.8,
                capabilities = listOf("technical-work"),
                candidateModules = listOf("forge"),
                routeHints = listOf(routeHint("forge", 0.8, "technical work intent")),
                entities = ParsedCommandEntity()
            )
        }

        // ── general (fallback) ────────────────────────────────────────────────
        return IntentDraft(
            intentType = "general",
            verb = commandVerb(lower) ?: "talk",
            mutatesState = false,
            confidence = 0.45,
            capabilities = listOf("general-orchestration"),
            candidateModules = listOf(ModuleIds.NEXUS),
            routeHints = listOf(routeHint(ModuleIds.NEXUS, 0.45, "fallback general intent")),
            entities = ParsedCommandEntity()
        )
    }

    // ── Private: route-hint deduplication ────────────────────────────────────

    /**
     * Removes duplicate route hints by [ParsedCommandRouteHint.moduleId],
     * keeping the entry with the highest confidence.  The result is sorted
     * descending by confidence.
     *
     * Time: O(h log h) where h is the number of hints.
     */
    internal fun dedupeRouteHints(
        routeHints: List<ParsedCommandRouteHint>
    ): List<ParsedCommandRouteHint> {
        val byModule = linkedMapOf<String, ParsedCommandRouteHint>()
        for (hint in routeHints) {
            val existing = byModule[hint.moduleId]
            if (existing == null || hint.confidence > existing.confidence) {
                byModule[hint.moduleId] = hint
            }
        }
        return byModule.values.sortedByDescending { it.confidence }
    }

    // ── Private: ambiguity detection ─────────────────────────────────────────

    /**
     * Generates human-readable ambiguity messages for the envelope.
     *
     * Two conditions are checked:
     * 1. Any intent remained at the `"general"` fallback type.
     * 2. A scheduling-style segment lacks both a date and a time entity.
     *
     * Time: O(s) where s is the number of intents.
     */
    internal fun buildAmbiguityReasons(intents: List<ParsedCommandIntent>): List<String> {
        val reasons = mutableListOf<String>()
        if (intents.any { it.intentType == "general" }) {
            reasons += "One or more segments remained general and may need clarification."
        }
        if (intents.any {
                Regex("\\b(schedule|add|set|update|move|change|create)\\b", RegexOption.IGNORE_CASE)
                    .containsMatchIn(it.rawSegment) &&
                    it.entities.dateText == null &&
                    it.entities.timeText == null
            }
        ) {
            reasons += "A scheduling-style command did not include a specific time or date."
        }
        return reasons
    }

    // ── Private: mention detection ────────────────────────────────────────────

    /**
     * Determines how [token] is used within [input].
     *
     * The three disposition classes mirror the TS contract:
     * - `"vocative"` — the module is directly addressed at the start of input.
     * - `"consultative"` — the module is asked/consulted.
     * - `"ownership"` — the command is delegated to the module.
     *
     * Returns null when none of the patterns match.
     *
     * Time: O(n) per disposition check (constant number of patterns, all O(n)).
     */
    internal fun detectMentionDisposition(
        input: String,
        token: String
    ): ParsedCommandMentionDisposition? {
        val escaped = Regex.escape(token)
        if (Regex("^(?:hey\\s+|hi\\s+|hello\\s+)?$escaped\\s*[,:-]", RegexOption.IGNORE_CASE)
                .containsMatchIn(input)) {
            return "vocative"
        }
        if (Regex(
                "\\b(?:ask|consult|include|loop in|bring in|check with|talk to|speak to)\\s+$escaped\\b",
                RegexOption.IGNORE_CASE
            ).containsMatchIn(input)) {
            return "consultative"
        }
        if (
            Regex("\\b(?:delegate|route|handoff|transfer|switch)\\s+to\\s+$escaped\\b", RegexOption.IGNORE_CASE)
                .containsMatchIn(input) ||
            Regex("\\b$escaped\\s+should\\s+handle\\b", RegexOption.IGNORE_CASE)
                .containsMatchIn(input) ||
            Regex("\\blet\\s+$escaped\\s+handle\\b", RegexOption.IGNORE_CASE)
                .containsMatchIn(input)
        ) {
            return "ownership"
        }
        return null
    }

    /**
     * Scans [input] for mentions of all [MENTIONABLE_MODULES], returning one
     * [ParsedCommandMention] per matching module.
     *
     * Results are ordered by first occurrence position in [input] and
     * deduplicated so that each module appears at most once.
     *
     * Confidence levels match the TS implementation:
     * - `"ownership"` → 0.92
     * - `"vocative"` → 0.90
     * - `"consultative"` → 0.84
     *
     * Time: O(m * n) where m is the (constant) number of mentionable modules
     * and n is the input length.
     */
    internal fun detectMentions(input: String): List<ParsedCommandMention> {
        val lowerInput = input.lowercase()
        return MENTIONABLE_MODULES
            .mapNotNull { moduleId ->
                // Use the module ID directly as the alias (same as TS MODULE_MANIFEST where
                // alias == moduleId for all mentionable modules).
                val token = moduleId
                val disposition = detectMentionDisposition(input, token) ?: return@mapNotNull null
                val match = Regex("\\b${Regex.escape(token)}\\b", RegexOption.IGNORE_CASE).find(input)
                ParsedCommandMention(
                    moduleId = moduleId,
                    raw = match?.value ?: token,
                    confidence = when (disposition) {
                        "ownership" -> 0.92
                        "vocative" -> 0.90
                        else -> 0.84
                    },
                    disposition = disposition
                )
            }
            .sortedBy { mention ->
                val idx = lowerInput.indexOf(mention.raw.lowercase())
                if (idx >= 0) idx else Int.MAX_VALUE
            }
            .distinctBy { it.moduleId }
    }

    // ── Private: small utilities ──────────────────────────────────────────────

    private fun routeHint(moduleId: String, confidence: Double, reason: String) =
        ParsedCommandRouteHint(moduleId = moduleId, confidence = confidence, reason = reason)

    /**
     * Extracts the first known command verb from [lower] (already lowercased).
     * Returns null when no verb is found.
     */
    private fun commandVerb(lower: String): String? =
        Regex("\\b(plan|schedule|update|move|change|set|add|rest|remind|help|research|refactor|track|check|create|log|show|go|do|feel|need|want|make)\\b")
            .find(lower)?.value

    // ── Internal JSON helpers (used by parseWithLlm callers) ─────────────────

    private fun JsonElement.asObjectList(): List<JsonObject>? {
        val array = this as? JsonArray ?: return null
        return array.mapNotNull { it as? JsonObject }
    }

    private fun JsonElement.asStringList(): List<String>? {
        val array = this as? JsonArray ?: return null
        return array.mapNotNull { (it as? JsonPrimitive)?.contentOrNull }
    }

    private val JsonElement.stringOrNull: String?
        get() = (this as? JsonPrimitive)?.contentOrNull

    private val JsonElement.doubleOrNullValue: Double?
        get() = (this as? JsonPrimitive)?.contentOrNull?.toDoubleOrNull()

    private val JsonElement.booleanOrNullValue: Boolean?
        get() = when ((this as? JsonPrimitive)?.contentOrNull?.lowercase()) {
            "true" -> true
            "false" -> false
            else -> null
        }
}
