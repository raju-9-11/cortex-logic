package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.services.NexusRoutingService
import com.agnes.nexus.core.domain.services.ParsedCommandEnvelope
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*
import kotlin.js.JsExport

/**
 * JS facade for NexusRoutingService.
 *
 * All crossing data uses JSON strings to avoid @JsExport limitations.
 *
 * ## classifyIntent
 * Input: message string
 * Output: JSON {"moduleId":"...","confidence":0.0,"rationale":"..."}
 *
 * ## classifyIntentFromParsedCommand
 * Input: parsedCommandJson — JSON serialised ParsedCommandEnvelope
 * Output: JSON or empty string if no decision
 *
 * ## buildRouterPrompt
 * Output: system prompt string for the LLM routing call
 *
 * ## parseRoutingResponse
 * Input: raw LLM response string
 * Output: JSON decision or empty string
 */
@JsExport
class NexusRoutingServiceJs {

    private val json = Json { ignoreUnknownKeys = true }
    private val service = NexusRoutingService()

    /**
     * Keyword-based classification. Returns JSON:
     * {"moduleId":"...","confidence":0.0,"rationale":"..."}
     */
    fun classifyIntent(message: String): String {
        val decision = service.decideRoute(message)
        return buildJsonObject {
            put("moduleId", decision.moduleId)
            put("confidence", decision.confidence)
            put("rationale", decision.rationale)
        }.toString()
    }

    /**
     * ParsedCommand-aware classification.
     * @param parsedCommandJson Serialised ParsedCommandEnvelope, or null/empty to skip.
     * @return JSON decision or empty string if no decision made.
     */
    fun classifyIntentFromParsedCommand(parsedCommandJson: String?): String {
        if (parsedCommandJson.isNullOrBlank()) return ""
        return try {
            val parsed = json.decodeFromString<ParsedCommandEnvelope>(parsedCommandJson)
            val decision = service.classifyIntentFromParsedCommand(parsed) ?: return ""
            buildJsonObject {
                put("moduleId", decision.moduleId)
                put("confidence", decision.confidence)
                put("rationale", decision.rationale)
            }.toString()
        } catch (_: Exception) {
            ""
        }
    }

    /**
     * Classify using both parsedCommand and message as fallback.
     * @param message Raw user message.
     * @param parsedCommandJson Serialised ParsedCommandEnvelope or null.
     * @return JSON decision.
     */
    fun classifyIntentWithContext(message: String, parsedCommandJson: String?): String {
        val parsed = parsedCommandJson?.takeIf { it.isNotBlank() }?.let {
            try { json.decodeFromString<ParsedCommandEnvelope>(it) } catch (_: Exception) { null }
        }
        val decision = service.decideRoute(message, parsedCommand = parsed)
        return buildJsonObject {
            put("moduleId", decision.moduleId)
            put("confidence", decision.confidence)
            put("rationale", decision.rationale)
        }.toString()
    }

    /** LLM router system prompt. */
    fun buildRouterPrompt(): String = service.buildRouterPrompt()

    /**
     * Parse an LLM routing response into a decision.
     * @return JSON decision or empty string if unparseable.
     */
    fun parseRoutingResponse(raw: String): String {
        val decision = service.parseRoutingResponse(raw) ?: return ""
        return buildJsonObject {
            put("moduleId", decision.moduleId)
            put("confidence", decision.confidence)
            put("rationale", decision.rationale)
        }.toString()
    }

    /** Get the navigation route path for a moduleId. */
    fun getRoute(moduleId: String): String = service.getRoute(moduleId)
}
