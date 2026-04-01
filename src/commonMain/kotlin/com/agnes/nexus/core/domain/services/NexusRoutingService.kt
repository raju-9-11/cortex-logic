package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.models.ModuleIds
import com.agnes.nexus.core.domain.models.ModuleManifest
import com.agnes.nexus.core.engine.LlmSanitizer
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.doubleOrNull
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

data class RouteDecision(
    val moduleId: String,
    val confidence: Double,
    val rationale: String
)

private data class KeywordRoute(
    val moduleId: String,
    val keywords: List<Keyword>
)

private data class Keyword(
    val term: String,
    val weight: Int
)

class NexusRoutingService(
    private val llmSanitizer: LlmSanitizer = LlmSanitizer(),
    private val commandIntelligenceService: CommandIntelligenceService = CommandIntelligenceService
) {
    fun decideRoute(
        prompt: String,
        fallback: String = ModuleIds.NEXUS,
        parsedCommand: ParsedCommandEnvelope? = null
    ): RouteDecision {
        val normalizedFallback = ModuleIds.normalize(fallback) ?: ModuleIds.NEXUS
        val resolvedParsed = parsedCommand ?: commandIntelligenceService.parse(
            rawInput = prompt,
            sourceModuleId = normalizedFallback
        )
        classifyIntentFromParsedCommand(resolvedParsed)?.let { return it }

        val normalized = prompt.lowercase()
        var best: Triple<String, Int, String>? = null
        for (route in KEYWORD_ROUTES) {
            var score = 0
            var topTerm = ""
            for (keyword in route.keywords) {
                val escaped = Regex.escape(keyword.term)
                val regex = Regex("\\b$escaped\\b", RegexOption.IGNORE_CASE)
                if (regex.containsMatchIn(normalized)) {
                    score += keyword.weight
                    val currentTop = route.keywords.find { it.term == topTerm }?.weight ?: 0
                    if (keyword.weight > currentTop) {
                        topTerm = keyword.term
                    }
                }
            }
            if (score > 0 && (best == null || score > best!!.second)) {
                best = Triple(route.moduleId, score, topTerm)
            }
        }

        if (best != null) {
            val confidence = kotlin.math.min(0.72 + (best!!.second - 1) * 0.08, 0.92)
            return RouteDecision(
                moduleId = ModuleIds.normalize(best!!.first) ?: normalizedFallback,
                confidence = confidence,
                rationale = "matched:${best!!.third}(${best!!.second})"
            )
        }

        return RouteDecision(
            moduleId = normalizedFallback,
            confidence = 0.45,
            rationale = "default_nexus"
        )
    }

    fun classifyIntentFromParsedCommand(parsedCommand: ParsedCommandEnvelope?): RouteDecision? {
        if (parsedCommand == null) return null

        classifyMentionIntent(parsedCommand)?.let { return it }

        val topHint = parsedCommand.sharedRouteHints.firstOrNull() ?: return null
        return RouteDecision(
            moduleId = ModuleIds.normalize(topHint.moduleId) ?: ModuleIds.NEXUS,
            confidence = topHint.confidence.coerceIn(0.0, 1.0),
            rationale = "command:${topHint.reason}"
        )
    }

    fun parseCommand(
        prompt: String,
        sourceModuleId: String = ModuleIds.NEXUS,
        timezone: String = "UTC"
    ): ParsedCommandEnvelope {
        return commandIntelligenceService.parse(prompt, sourceModuleId = sourceModuleId, timezone = timezone)
    }

    suspend fun parseCommandWithLlm(
        prompt: String,
        sourceModuleId: String = ModuleIds.NEXUS,
        timezone: String = "UTC",
        generateJson: (suspend (prompt: String, systemPrompt: String) -> JsonObject?)? = null
    ): ParsedCommandEnvelope {
        return commandIntelligenceService.parseWithLlm(
            rawInput = prompt,
            sourceModuleId = sourceModuleId,
            timezone = timezone,
            generateJson = generateJson
        )
    }

    suspend fun decideRouteWithLlm(
        message: String,
        sendMessage: suspend (content: String, systemPrompt: String) -> String
    ): RouteDecision {
        val prompt = buildRouterPrompt()
        val response = try {
            sendMessage(message, prompt)
        } catch (_: Exception) {
            return decideRoute(message)
        }
        return parseRoutingResponse(response) ?: decideRoute(message)
    }

    fun getRoute(moduleId: String): String {
        return ModuleManifest.byId(moduleId)?.route ?: moduleId
    }

    private fun classifyMentionIntent(parsedCommand: ParsedCommandEnvelope): RouteDecision? {
        val mentions = parsedCommand.mentions.orEmpty()
        if (mentions.isEmpty()) return null

        val ownership = mentions.firstOrNull { it.disposition == "ownership" }
        if (ownership != null) {
            return RouteDecision(
                moduleId = ModuleIds.normalize(ownership.moduleId) ?: ModuleIds.NEXUS,
                confidence = ownership.confidence.coerceIn(0.0, 1.0),
                rationale = "mention:ownership:${ownership.raw.lowercase()}"
            )
        }

        val consultative = mentions.firstOrNull { it.disposition == "consultative" }
        if (consultative != null) {
            return RouteDecision(
                moduleId = ModuleIds.NEXUS,
                confidence = maxOf(0.72, consultative.confidence.coerceIn(0.0, 1.0)),
                rationale = "mention:consult:${ModuleIds.normalize(consultative.moduleId) ?: consultative.moduleId}"
            )
        }

        val vocative = mentions.firstOrNull { it.disposition == "vocative" } ?: return null
        val vocativeModule = ModuleIds.normalize(vocative.moduleId) ?: vocative.moduleId
        val mutatingTarget = parsedCommand.intents.any { intent ->
            intent.mutatesState &&
                intent.candidateModules.any { ModuleIds.normalize(it) == vocativeModule }
        }

        return if (mutatingTarget) {
            RouteDecision(
                moduleId = vocativeModule,
                confidence = maxOf(vocative.confidence, parsedCommand.confidence).coerceIn(0.0, 1.0),
                rationale = "mention:vocative-owner:$vocativeModule"
            )
        } else {
            RouteDecision(
                moduleId = ModuleIds.NEXUS,
                confidence = maxOf(0.68, vocative.confidence - 0.08).coerceIn(0.0, 1.0),
                rationale = "mention:vocative:$vocativeModule"
            )
        }
    }

    private fun buildRouterPrompt(): String {
        val moduleLines = ModuleManifest.entries.joinToString("\n") { entry ->
            "- ${entry.id}: ${entry.title} (${entry.description})"
        }
        return """
            You are Nexus, the intent router for the Nexus system.
            Classify the user's message into the single best target module.
            Return ONLY JSON in the format:
            {"target":"moduleId","confidence":0.0-1.0,"reason":"short_reason"}

            Available modules:
            $moduleLines

            Rules:
            - Pick exactly one moduleId from the list above.
            - If unclear, choose "nexus" with lower confidence.
            - Keep reason under 8 words.
        """.trimIndent()
    }

    private fun parseRoutingResponse(raw: String): RouteDecision? {
        return try {
            val sanitized = llmSanitizer.sanitizeJsonPayload(raw)
            val element = Json.parseToJsonElement(sanitized).jsonObject
            val target = element["target"]?.jsonPrimitive?.content ?: return null
            if (ModuleManifest.byId(target) == null) return null
            val confidence = element["confidence"]?.jsonPrimitive?.doubleOrNull ?: 0.5
            val reason = element["reason"]?.jsonPrimitive?.content ?: "router_llm"
            RouteDecision(
                moduleId = ModuleIds.normalize(target) ?: ModuleIds.NEXUS,
                confidence = confidence.coerceIn(0.0, 1.0),
                rationale = reason
            )
        } catch (_: Exception) {
            null
        }
    }

    companion object {
        private val KEYWORD_ROUTES = listOf(
            KeywordRoute(
                moduleId = "soma",
                keywords = listOf(
                    Keyword("heart rate variability", 3),
                    Keyword("sleep score", 3),
                    Keyword("heart rate", 2),
                    Keyword("hrv", 2),
                    Keyword("soma", 2),
                    Keyword("recovery", 2),
                    Keyword("medical", 2),
                    Keyword("clearance", 2),
                    Keyword("bloodwork", 2),
                    Keyword("lab results", 2),
                    Keyword("lab", 1),
                    Keyword("readiness", 1),
                    Keyword("resting", 1),
                    Keyword("soreness", 1),
                    Keyword("somatic", 1),
                    Keyword("biomarker", 1)
                )
            ),
            KeywordRoute(
                moduleId = "agnes",
                keywords = listOf(
                    Keyword("mental health", 2),
                    Keyword("agnes", 2),
                    Keyword("anxiety", 1),
                    Keyword("trauma", 1),
                    Keyword("emotion", 1),
                    Keyword("emotions", 1),
                    Keyword("feeling", 1),
                    Keyword("relationship", 1),
                    Keyword("depression", 1),
                    Keyword("therapy", 1)
                )
            ),
            KeywordRoute(
                moduleId = "titan",
                keywords = listOf(
                    Keyword("workout plan", 3),
                    Keyword("training plan", 3),
                    Keyword("fitness plan", 3),
                    Keyword("exercise plan", 3),
                    Keyword("personal record", 2),
                    Keyword("titan", 2),
                    Keyword("workout", 2),
                    Keyword("training", 2),
                    Keyword("gym", 2),
                    Keyword("fitness", 2),
                    Keyword("strength", 1),
                    Keyword("routine", 1),
                    Keyword("fatigue", 1)
                )
            ),
            KeywordRoute(
                moduleId = "ledger",
                keywords = listOf(
                    Keyword("ledger", 2),
                    Keyword("budget", 2),
                    Keyword("finance", 2),
                    Keyword("money", 2),
                    Keyword("expense", 1),
                    Keyword("expenses", 1),
                    Keyword("spending", 1),
                    Keyword("debt", 1),
                    Keyword("cashflow", 1),
                    Keyword("savings", 1),
                    Keyword("crypto", 1),
                    Keyword("investment", 1)
                )
            ),
            KeywordRoute(
                moduleId = "atlas",
                keywords = listOf(
                    Keyword("week plan", 2),
                    Keyword("weekly plan", 2),
                    Keyword("day plan", 2),
                    Keyword("daily plan", 2),
                    Keyword("energy plan", 2),
                    Keyword("task load", 2),
                    Keyword("deep work", 2),
                    Keyword("atlas", 2),
                    Keyword("schedule", 2),
                    Keyword("plan", 1),
                    Keyword("planning", 1),
                    Keyword("energy", 1),
                    Keyword("focus", 1),
                    Keyword("calendar", 1),
                    Keyword("productivity", 1)
                )
            ),
            KeywordRoute(
                moduleId = "scout",
                keywords = listOf(
                    Keyword("topic map", 2),
                    Keyword("fact-check", 2),
                    Keyword("scout", 2),
                    Keyword("research", 2),
                    Keyword("search", 2),
                    Keyword("verify", 1),
                    Keyword("evidence", 1),
                    Keyword("sources", 1),
                    Keyword("trend", 1),
                    Keyword("news", 1),
                    Keyword("interest", 1),
                    Keyword("discover", 1)
                )
            ),
            KeywordRoute(
                moduleId = "forge",
                keywords = listOf(
                    Keyword("forge", 2),
                    Keyword("code", 2),
                    Keyword("refactor", 2),
                    Keyword("build", 1),
                    Keyword("typescript", 1),
                    Keyword("bug", 1),
                    Keyword("repository", 1),
                    Keyword("github", 1),
                    Keyword("programming", 1)
                )
            )
        )
    }
}
