package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.models.ModuleIds
import kotlinx.datetime.Clock
import kotlinx.datetime.DatePeriod
import kotlinx.datetime.Instant
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.TimeZone
import kotlinx.datetime.plus
import kotlinx.datetime.toLocalDateTime
import kotlinx.datetime.toInstant
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.jsonArray

typealias CommandCapability = String
typealias CommandIntentType = String
typealias ParsedCommandMentionDisposition = String

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

data class ParsedCommandEntities(
    val title: String? = null,
    val status: String? = null,
    val dateText: String? = null,
    val timeText: String? = null
)

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
    val entities: ParsedCommandEntities,
    val temporal: List<ParsedCommandTimeReference>
)

data class ParsedCommandMention(
    val moduleId: String,
    val raw: String,
    val confidence: Double,
    val disposition: ParsedCommandMentionDisposition
)

data class ParsedCommandEnvelope(
    val rawInput: String,
    val normalizedInput: String,
    val parserVersion: String,
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

class CommandIntelligenceService {
    private data class IntentDraft(
        val intentType: CommandIntentType,
        val verb: String,
        val mutatesState: Boolean,
        val confidence: Double,
        val capabilities: List<CommandCapability>,
        val candidateModules: List<String>,
        val routeHints: List<ParsedCommandRouteHint>,
        val entities: ParsedCommandEntities
    )

    fun parse(
        rawInput: String,
        sourceModuleId: String = ModuleIds.NEXUS,
        timezone: String = TimeZone.currentSystemDefault().id,
        now: Instant = Clock.System.now()
    ): ParsedCommandEnvelope {
        val normalized = normalizeWhitespace(rawInput)
        val segments = splitSegments(normalized)
        val mentions = detectMentions(normalized)
        val intents = segments.mapIndexed { index, segment ->
            parseIntent(segment, index, timezone, now)
        }

        val temporalRefs = intents.flatMap { it.temporal }
        val sharedHints = dedupeRouteHints(intents.flatMap { it.routeHints })
        val ambiguityReasons = buildAmbiguityReasons(intents)
        val confidence = if (intents.isNotEmpty()) {
            val avg = intents.sumOf { it.confidence } / intents.size.toDouble()
            (avg * 100.0).toInt() / 100.0
        } else {
            0.45
        }
        val requiresClarification = ambiguityReasons.isNotEmpty() && confidence < 0.7

        return ParsedCommandEnvelope(
            rawInput = rawInput,
            normalizedInput = normalized,
            parserVersion = "phase1-v1",
            sourceModuleId = ModuleIds.normalize(sourceModuleId) ?: ModuleIds.NEXUS,
            generatedAt = now.toString(),
            timezone = timezone,
            confidence = confidence,
            intents = intents,
            temporalReferences = temporalRefs,
            sharedRouteHints = sharedHints,
            mentions = mentions.takeIf { it.isNotEmpty() },
            mentionedModuleIds = mentions.map { it.moduleId }.distinct().takeIf { it.isNotEmpty() },
            requiresClarification = requiresClarification,
            ambiguityReasons = ambiguityReasons
        )
    }

    suspend fun parseWithLlm(
        rawInput: String,
        sourceModuleId: String = ModuleIds.NEXUS,
        timezone: String = TimeZone.currentSystemDefault().id,
        now: Instant = Clock.System.now(),
        generateJson: (suspend (prompt: String, systemPrompt: String) -> JsonObject?)? = null
    ): ParsedCommandEnvelope {
        val fallback = parse(
            rawInput = rawInput,
            sourceModuleId = sourceModuleId,
            timezone = timezone,
            now = now
        )
        val generator = generateJson ?: return fallback

        val localNow = now.toLocalDateTime(TimeZone.of(timezone))
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
            val entitiesObject = raw["entities"]?.asObject()
            val entities = ParsedCommandEntities(
                title = raw["title"]?.stringOrNull ?: entitiesObject?.get("title")?.stringOrNull ?: base?.entities?.title,
                status = raw["status"]?.stringOrNull ?: entitiesObject?.get("status")?.stringOrNull ?: base?.entities?.status,
                dateText = normalizeDateText(
                    raw["dateText"]?.stringOrNull ?: entitiesObject?.get("dateText")?.stringOrNull ?: base?.entities?.dateText
                ),
                timeText = normalizeTimeText(
                    raw["timeText"]?.stringOrNull ?: entitiesObject?.get("timeText")?.stringOrNull ?: base?.entities?.timeText
                )
            )
            val capabilities = normalizeCapabilities(
                raw["capabilities"],
                base?.capabilities ?: defaults.capabilities
            )
            val candidateModules = normalizeModuleIds(
                raw["candidateModules"],
                base?.candidateModules ?: defaults.candidateModules
            )
            val routeHints = normalizeRouteHints(
                raw["routeHints"],
                base?.routeHints ?: defaults.routeHints
            )
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
            sourceModuleId = ModuleIds.normalize(sourceModuleId) ?: ModuleIds.NEXUS,
            generatedAt = now.toString(),
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

    private fun normalizeWhitespace(input: String): String {
        return input.replace(Regex("\\s+"), " ").trim()
    }

    private fun splitSegments(input: String): List<String> {
        if (input.isBlank()) return emptyList()
        val commaSegments = input.split(Regex("\\s*[;,]\\s*"))
            .map { it.trim() }
            .filter { it.isNotBlank() }
        if (commaSegments.size > 1) return commaSegments
        val conjunctionSegments = input.split(Regex("\\s+(?:and|then)\\s+", RegexOption.IGNORE_CASE))
            .map { it.trim() }
            .filter { it.isNotBlank() }
        return if (conjunctionSegments.isEmpty()) listOf(input) else conjunctionSegments
    }

    private fun parseIntent(
        segment: String,
        index: Int,
        timezone: String,
        now: Instant
    ): ParsedCommandIntent {
        val lower = segment.lowercase()
        val temporal = parseTemporal(segment, timezone, now)
        val draft = buildIntentDraft(segment)
        val inferredDate = temporal.firstOrNull { it.isoDate != null }?.isoDate
        val inferredTime = temporal.firstOrNull { it.time24 != null }?.time24
        val entities = draft.entities.copy(
            dateText = draft.entities.dateText ?: inferredDate,
            timeText = draft.entities.timeText ?: inferredTime
        )

        return ParsedCommandIntent(
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

    private fun buildIntentDraft(segment: String): IntentDraft {
        val normalized = normalizeWhitespace(segment)
        val lower = normalized.lowercase()

        if (Regex("plan my day|day plan|daily plan|plan tomorrow|plan .* tomorrow").containsMatchIn(lower)) {
            return IntentDraft(
                intentType = "plan_day",
                verb = "plan",
                mutatesState = true,
                confidence = 0.9,
                capabilities = listOf("daily-planning"),
                candidateModules = listOf("atlas"),
                routeHints = listOf(routeHint("atlas", 0.9, "daily planning intent")),
                entities = ParsedCommandEntities()
            )
        }

        if (
            Regex("\\b(update|move|change|reschedule)\\b").containsMatchIn(lower) ||
            (Regex("\\brest\\b").containsMatchIn(lower) && Regex("\\btomorrow\\b").containsMatchIn(lower))
        ) {
            val routeHints = mutableListOf(routeHint("atlas", 0.86, "schedule update intent"))
            val candidateModules = mutableListOf("atlas")
            val capabilities = mutableListOf("schedule-mutation")
            val hasRecovery = Regex("\\brest\\b").containsMatchIn(lower) ||
                Regex("\\b(exhausted|tired)\\b").containsMatchIn(lower)
            if (hasRecovery) {
                routeHints += routeHint("soma", 0.74, "recovery context")
                routeHints += routeHint("agnes", 0.62, "rest framing support")
                candidateModules += listOf("soma", "agnes")
                capabilities += "recovery-planning"
            }
            return IntentDraft(
                intentType = if (Regex("\\brest\\b").containsMatchIn(lower)) "recovery_day" else "update_schedule",
                verb = Regex("\\b(update|move|change|reschedule)\\b").find(lower)?.groupValues?.get(1) ?: "update",
                mutatesState = true,
                confidence = if (Regex("\\brest\\b").containsMatchIn(lower)) 0.88 else 0.82,
                capabilities = capabilities,
                candidateModules = candidateModules,
                routeHints = routeHints,
                entities = ParsedCommandEntities(status = if (Regex("\\brest\\b").containsMatchIn(lower)) "rest" else null)
            )
        }

        if (
            Regex("\\b(schedule|add|set|create)\\b").containsMatchIn(lower) &&
            (parseTime24(segment) != null || Regex("\\btomorrow\\b").containsMatchIn(lower))
        ) {
            return IntentDraft(
                intentType = "schedule_item",
                verb = Regex("\\b(schedule|add|set|create)\\b").find(lower)?.groupValues?.get(1) ?: "schedule",
                mutatesState = true,
                confidence = 0.87,
                capabilities = listOf("schedule-mutation", "daily-planning"),
                candidateModules = listOf("atlas"),
                routeHints = listOf(routeHint("atlas", 0.87, "scheduled planning item")),
                entities = ParsedCommandEntities(title = extractScheduleTitle(normalized))
            )
        }

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
                entities = ParsedCommandEntities()
            )
        }

        if (Regex("\\b(workout|training|fitness|gym|exercise|lift|run|walk|cycle|swim|routine|program)\\b").containsMatchIn(lower)) {
            return IntentDraft(
                intentType = "fitness",
                verb = commandVerb(lower) ?: "plan",
                mutatesState = true,
                confidence = 0.85,
                capabilities = listOf("fitness-planning"),
                candidateModules = listOf("titan"),
                routeHints = listOf(routeHint("titan", 0.85, "fitness intent")),
                entities = ParsedCommandEntities()
            )
        }

        if (Regex("\\b(bloodwork|biomarker|hrv|sleep score|recovery|medical|clearance|sick|ill|hurt|pain|ache|injury)\\b").containsMatchIn(lower)) {
            return IntentDraft(
                intentType = "medical",
                verb = commandVerb(lower) ?: "check",
                mutatesState = false,
                confidence = 0.82,
                capabilities = listOf("medical-review"),
                candidateModules = listOf("soma"),
                routeHints = listOf(routeHint("soma", 0.82, "medical review intent")),
                entities = ParsedCommandEntities()
            )
        }

        if (Regex("\\b(budget|expense|spending|money|finance|debt|savings|pay)\\b").containsMatchIn(lower)) {
            return IntentDraft(
                intentType = "financial",
                verb = commandVerb(lower) ?: "plan",
                mutatesState = true,
                confidence = 0.8,
                capabilities = listOf("financial-planning"),
                candidateModules = listOf("ledger"),
                routeHints = listOf(routeHint("ledger", 0.8, "financial planning intent")),
                entities = ParsedCommandEntities()
            )
        }

        if (Regex("\\b(research|verify|evidence|sources|fact-check|topic|learn)\\b").containsMatchIn(lower)) {
            return IntentDraft(
                intentType = "research",
                verb = commandVerb(lower) ?: "research",
                mutatesState = false,
                confidence = 0.8,
                capabilities = listOf("research"),
                candidateModules = listOf("scout"),
                routeHints = listOf(routeHint("scout", 0.8, "research intent")),
                entities = ParsedCommandEntities()
            )
        }

        if (Regex("\\b(code|refactor|typescript|repository|github|bug|build|dev|programming)\\b").containsMatchIn(lower)) {
            return IntentDraft(
                intentType = "technical",
                verb = commandVerb(lower) ?: "refactor",
                mutatesState = false,
                confidence = 0.8,
                capabilities = listOf("technical-work"),
                candidateModules = listOf("forge"),
                routeHints = listOf(routeHint("forge", 0.8, "technical work intent")),
                entities = ParsedCommandEntities()
            )
        }

        return IntentDraft(
            intentType = "general",
            verb = commandVerb(lower) ?: "talk",
            mutatesState = false,
            confidence = 0.45,
            capabilities = listOf("general-orchestration"),
            candidateModules = listOf(ModuleIds.NEXUS),
            routeHints = listOf(routeHint(ModuleIds.NEXUS, 0.45, "fallback general intent")),
            entities = ParsedCommandEntities()
        )
    }

    private fun parseTemporal(segment: String, timezone: String, now: Instant): List<ParsedCommandTimeReference> {
        val refs = mutableListOf<ParsedCommandTimeReference>()
        val lower = segment.lowercase()
        var dateKey: String? = null

        if (lower.contains("tomorrow")) {
            val nowLocal = now.toLocalDateTime(TimeZone.of(timezone))
            val tomorrow = nowLocal.date.plus(DatePeriod(days = 1))
            dateKey = tomorrow.toString()
            refs += ParsedCommandTimeReference(
                raw = "tomorrow",
                kind = "date",
                timezone = timezone,
                isoDate = dateKey,
                relation = "tomorrow"
            )
        }

        val parsedTime = parseTime24(segment)
        val time24 = parsedTime?.second

        if (time24 != null) {
            val isoDateTime = dateKey?.let { buildLocalIsoDateTime(it, time24, timezone) }
            refs += ParsedCommandTimeReference(
                raw = parsedTime.first,
                kind = if (dateKey != null) "datetime" else "time",
                timezone = timezone,
                isoDate = dateKey,
                isoDateTime = isoDateTime,
                time24 = time24
            )
        }

        return refs
    }

    private fun normalizeDateText(value: String?): String? {
        val trimmed = value?.trim().orEmpty()
        if (trimmed.isEmpty()) return null
        return if (Regex("^\\d{4}-\\d{2}-\\d{2}$").matches(trimmed)) trimmed else null
    }

    private fun normalizeTimeText(value: String?): String? {
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

    private fun parseTime24(segment: String): Pair<String, String>? {
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
        val standard = Regex("\\bat\\s+(\\d{1,2}:\\d{2})\\b", RegexOption.IGNORE_CASE).find(segment) ?: return null
        val parts = standard.groupValues[1].split(":")
        if (parts.size != 2) return null
        val hh = parts[0].toIntOrNull()
        val mm = parts[1].toIntOrNull()
        if (hh == null || mm == null || hh !in 0..23 || mm !in 0..59) return null
        return standard.value to "${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}"
    }

    private fun routeHint(moduleId: String, confidence: Double, reason: String): ParsedCommandRouteHint {
        return ParsedCommandRouteHint(
            moduleId = moduleId,
            confidence = confidence,
            reason = reason
        )
    }

    private fun clampConfidence(value: Double?, fallback: Double): Double {
        return (value ?: fallback).coerceIn(0.0, 1.0)
    }

    private fun normalizeIntentType(value: String?): String? {
        val knownIntentTypes = setOf(
            "plan_day",
            "schedule_item",
            "update_schedule",
            "recovery_day",
            "emotional_support",
            "fitness",
            "medical",
            "financial",
            "research",
            "technical",
            "general"
        )
        if (value == null) return null
        return value.takeIf { knownIntentTypes.contains(it) }
    }

    private fun normalizeCapabilities(value: JsonElement?, fallback: List<String>): List<String> {
        val knownCapabilities = setOf(
            "daily-planning",
            "schedule-mutation",
            "reminder-management",
            "recovery-planning",
            "emotional-support",
            "fitness-planning",
            "medical-review",
            "financial-planning",
            "research",
            "technical-work",
            "general-orchestration"
        )
        val filtered = value?.asStringList()?.filter { knownCapabilities.contains(it) }.orEmpty()
        return if (filtered.isNotEmpty()) filtered else fallback
    }

    private fun normalizeModuleIds(value: JsonElement?, fallback: List<String>): List<String> {
        val filtered = value?.asStringList()
            ?.mapNotNull { ModuleIds.normalize(it) }
            .orEmpty()
        return if (filtered.isNotEmpty()) filtered else fallback
    }

    private fun normalizeRouteHints(
        value: JsonElement?,
        fallback: List<ParsedCommandRouteHint>
    ): List<ParsedCommandRouteHint> {
        val filtered = value?.asObjectList()
            ?.mapNotNull { hint ->
                val moduleId = ModuleIds.normalize(hint["moduleId"]?.stringOrNull ?: return@mapNotNull null)
                    ?: return@mapNotNull null
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

    private fun defaultsForIntentType(intentType: String): IntentDraft {
        return when (intentType) {
            "plan_day" -> IntentDraft(
                intentType = intentType,
                verb = "plan",
                mutatesState = true,
                confidence = 0.9,
                capabilities = listOf("daily-planning"),
                candidateModules = listOf("atlas"),
                routeHints = listOf(routeHint("atlas", 0.9, "daily planning intent")),
                entities = ParsedCommandEntities()
            )
            "schedule_item" -> IntentDraft(
                intentType = intentType,
                verb = "schedule",
                mutatesState = true,
                confidence = 0.87,
                capabilities = listOf("schedule-mutation", "daily-planning"),
                candidateModules = listOf("atlas"),
                routeHints = listOf(routeHint("atlas", 0.87, "scheduled planning item")),
                entities = ParsedCommandEntities()
            )
            "update_schedule" -> IntentDraft(
                intentType = intentType,
                verb = "update",
                mutatesState = true,
                confidence = 0.82,
                capabilities = listOf("schedule-mutation"),
                candidateModules = listOf("atlas"),
                routeHints = listOf(routeHint("atlas", 0.86, "schedule update intent")),
                entities = ParsedCommandEntities()
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
                entities = ParsedCommandEntities(status = "rest")
            )
            "emotional_support" -> IntentDraft(
                intentType = intentType,
                verb = "support",
                mutatesState = false,
                confidence = 0.85,
                capabilities = listOf("emotional-support"),
                candidateModules = listOf("agnes"),
                routeHints = listOf(routeHint("agnes", 0.85, "emotional support intent")),
                entities = ParsedCommandEntities()
            )
            "fitness" -> IntentDraft(
                intentType = intentType,
                verb = "plan",
                mutatesState = true,
                confidence = 0.85,
                capabilities = listOf("fitness-planning"),
                candidateModules = listOf("titan"),
                routeHints = listOf(routeHint("titan", 0.85, "fitness intent")),
                entities = ParsedCommandEntities()
            )
            "medical" -> IntentDraft(
                intentType = intentType,
                verb = "check",
                mutatesState = false,
                confidence = 0.82,
                capabilities = listOf("medical-review"),
                candidateModules = listOf("soma"),
                routeHints = listOf(routeHint("soma", 0.82, "medical review intent")),
                entities = ParsedCommandEntities()
            )
            "financial" -> IntentDraft(
                intentType = intentType,
                verb = "plan",
                mutatesState = true,
                confidence = 0.8,
                capabilities = listOf("financial-planning"),
                candidateModules = listOf("ledger"),
                routeHints = listOf(routeHint("ledger", 0.8, "financial planning intent")),
                entities = ParsedCommandEntities()
            )
            "research" -> IntentDraft(
                intentType = intentType,
                verb = "research",
                mutatesState = false,
                confidence = 0.8,
                capabilities = listOf("research"),
                candidateModules = listOf("scout"),
                routeHints = listOf(routeHint("scout", 0.8, "research intent")),
                entities = ParsedCommandEntities()
            )
            "technical" -> IntentDraft(
                intentType = intentType,
                verb = "refactor",
                mutatesState = false,
                confidence = 0.8,
                capabilities = listOf("technical-work"),
                candidateModules = listOf("forge"),
                routeHints = listOf(routeHint("forge", 0.8, "technical work intent")),
                entities = ParsedCommandEntities()
            )
            else -> IntentDraft(
                intentType = "general",
                verb = "talk",
                mutatesState = false,
                confidence = 0.45,
                capabilities = listOf("general-orchestration"),
                candidateModules = listOf(ModuleIds.NEXUS),
                routeHints = listOf(routeHint(ModuleIds.NEXUS, 0.45, "fallback general intent")),
                entities = ParsedCommandEntities()
            )
        }
    }

    private fun dedupeRouteHints(routeHints: List<ParsedCommandRouteHint>): List<ParsedCommandRouteHint> {
        val grouped = routeHints.groupBy { it.moduleId }
        return grouped.map { (moduleId, hints) ->
            val best = hints.maxByOrNull { it.confidence }!!
            ParsedCommandRouteHint(
                moduleId = moduleId,
                confidence = best.confidence,
                reason = best.reason,
                source = "command_intelligence"
            )
        }.sortedByDescending { it.confidence }
    }

    private fun buildTemporalFromEntities(
        rawSegment: String,
        entities: ParsedCommandEntities,
        timezone: String
    ): List<ParsedCommandTimeReference> {
        val refs = mutableListOf<ParsedCommandTimeReference>()
        val dateText = normalizeDateText(entities.dateText)
        val timeText = normalizeTimeText(entities.timeText)
        if (dateText != null) {
            refs += ParsedCommandTimeReference(
                raw = if (Regex("\\btomorrow\\b", RegexOption.IGNORE_CASE).containsMatchIn(rawSegment)) "tomorrow" else dateText,
                kind = "date",
                timezone = timezone,
                isoDate = dateText,
                relation = if (Regex("\\btomorrow\\b", RegexOption.IGNORE_CASE).containsMatchIn(rawSegment)) "tomorrow" else null
            )
        }
        if (timeText != null) {
            val isoDateTime = dateText?.let { buildLocalIsoDateTime(it, timeText, timezone) }
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

    private fun buildAmbiguityReasons(intents: List<ParsedCommandIntent>): List<String> {
        val reasons = mutableListOf<String>()
        if (intents.any { it.intentType == "general" }) {
            reasons += "One or more segments remained general and may need clarification."
        }
        if (intents.any {
                Regex("\\b(schedule|add|set|update|move|change|create)\\b", RegexOption.IGNORE_CASE).containsMatchIn(it.rawSegment) &&
                    it.entities.dateText == null &&
                    it.entities.timeText == null
            }
        ) {
            reasons += "A scheduling-style command did not include a specific time or date."
        }
        return reasons
    }

    private fun detectMentions(input: String): List<ParsedCommandMention> {
        val lowerInput = input.lowercase()
        return mentionableModules().mapNotNull { moduleId ->
            val token = moduleToken(moduleId)
            val disposition = detectMentionDisposition(input, token) ?: return@mapNotNull null
            val regex = Regex("\\b${Regex.escape(token)}\\b", RegexOption.IGNORE_CASE)
            val match = regex.find(input)
            ParsedCommandMention(
                moduleId = moduleId,
                raw = match?.value ?: token,
                confidence = when (disposition) {
                    "ownership" -> 0.92
                    "vocative" -> 0.9
                    else -> 0.84
                },
                disposition = disposition
            )
        }.sortedBy { mention ->
            val index = lowerInput.indexOf(mention.raw.lowercase())
            if (index >= 0) index else Int.MAX_VALUE
        }.distinctBy { it.moduleId }
    }

    private fun normalizeMentions(
        value: JsonElement?,
        fallback: List<ParsedCommandMention>?
    ): List<ParsedCommandMention>? {
        val normalized = value?.asObjectList()?.mapNotNull { mention ->
            val moduleId = ModuleIds.normalize(mention["moduleId"]?.stringOrNull ?: return@mapNotNull null)
                ?: return@mapNotNull null
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

    private fun mentionableModules(): List<String> {
        return listOf("agnes", "atlas", "soma", "titan", "ledger", "scout", "forge")
    }

    private fun moduleToken(moduleId: String): String {
        return com.agnes.nexus.core.domain.models.ModuleManifest.byId(moduleId)?.alias ?: moduleId
    }

    private fun detectMentionDisposition(input: String, token: String): ParsedCommandMentionDisposition? {
        val escaped = Regex.escape(token)
        if (Regex("^(?:hey\\s+|hi\\s+|hello\\s+)?$escaped\\s*[,:-]", RegexOption.IGNORE_CASE).containsMatchIn(input)) {
            return "vocative"
        }
        if (
            Regex("\\b(?:ask|consult|include|loop in|bring in|check with|talk to|speak to)\\s+$escaped\\b", RegexOption.IGNORE_CASE)
                .containsMatchIn(input)
        ) {
            return "consultative"
        }
        if (
            Regex("\\b(?:delegate|route|handoff|transfer|switch)\\s+to\\s+$escaped\\b", RegexOption.IGNORE_CASE)
                .containsMatchIn(input) ||
            Regex("\\b$escaped\\s+should\\s+handle\\b", RegexOption.IGNORE_CASE).containsMatchIn(input) ||
            Regex("\\blet\\s+$escaped\\s+handle\\b", RegexOption.IGNORE_CASE).containsMatchIn(input)
        ) {
            return "ownership"
        }
        return null
    }

    private fun commandVerb(lower: String): String? {
        return Regex("\\b(plan|schedule|update|move|change|set|add|rest|remind|help|research|refactor|track|check|create|log|show|go|do|feel|need|want|make)\\b")
            .find(lower)?.value
    }

    private fun buildLocalIsoDateTime(dateKey: String, time24: String, timezone: String): String {
        val tz = TimeZone.of(timezone)
        LocalDateTime.parse("${dateKey}T${time24}:00").toInstant(tz)
        return "${dateKey}T${time24}:00"
    }

    private fun extractScheduleTitle(segment: String): String? {
        val match = Regex("\\b(?:schedule|add|set|create)\\s+(.+?)(?:\\s+at\\s+\\d{1,4}|\\s+at\\s+\\d{1,2}:\\d{2}|\\s+tomorrow|$)", RegexOption.IGNORE_CASE)
            .find(segment)
            ?: return null
        return match.groupValues[1]
            .replace(Regex("^(?:a|an|the)\\s+", RegexOption.IGNORE_CASE), "")
            .trim()
            .ifBlank { null }
    }

    private fun JsonElement.asObject(): JsonObject? = this as? JsonObject

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
