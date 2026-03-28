package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.models.ActionCall
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

/**
 * KMP LLM Sanitizer - extracts internal tags and cleans public output.
 * Ported from Nexus React 19 SPA for maximum robustness.
 */
class LlmSanitizer {
    private val json = Json { ignoreUnknownKeys = true }

    private val providerControlPatterns = listOf(Regex("\\[user interrupted\\]", RegexOption.IGNORE_CASE))
    private val technicalFillerPatterns = listOf(
        Regex("^(?:Query(?:\\s+Module)?|Searching(?:\\s+Memory)?|Delegating(?:\\s+to\\s+module)?|Consulting(?:\\s+module)?|Proposing(?:\\s+reminder)?)\\.?\\s*", RegexOption.IGNORE_CASE)
    )

    /**
     * Removes control tokens injected by LLM providers (e.g. [user interrupted]).
     */
    fun stripProviderControlTokens(content: String): String {
        if (content.isBlank()) return ""
        var next = content
        providerControlPatterns.forEach { pattern ->
            next = next.replace(pattern, "")
        }
        return next
    }

    fun isProviderControlOnly(content: String): Boolean {
        if (content.isBlank()) return false
        var hasControlPattern = false
        var next = content
        providerControlPatterns.forEach { pattern ->
            if (pattern.containsMatchIn(content)) {
                hasControlPattern = true
            }
            next = next.replace(pattern, "")
        }
        return hasControlPattern && next.trim().isEmpty()
    }

    fun stripTechnicalFiller(text: String): String {
        var next = text.trim()
        technicalFillerPatterns.forEach { pattern ->
            next = next.replace(pattern, "")
        }
        return next
    }

    data class SanitizedResult(
        val publicText: String,
        val internalThoughts: String? = null,
        val isThinking: Boolean = false
    )

    /**
     * Aggressively cleans public text of all internal tags.
     * Replaces with spaces to prevent word joining.
     */
    fun sanitize(content: String, retainSpacings: Boolean = false): SanitizedResult {
        if (content.isEmpty()) return SanitizedResult("")

        // 1. Extract thought content (first match wins, cross-matched tags supported)
        val thoughtMatch = Regex("<thought>([\\s\\S]*?)</thought>").find(content)
            ?: Regex("<thinking>([\\s\\S]*?)</thinking>").find(content)
            ?: Regex("<think>([\\s\\S]*?)</think>").find(content)
            ?: Regex("<thinking>([\\s\\S]*?)</thought>").find(content)
            ?: Regex("<thought>([\\s\\S]*?)</thinking>").find(content)
            ?: Regex("<think>([\\s\\S]*?)</thought>").find(content)
            ?: Regex("<thought>([\\s\\S]*?)</think>").find(content)
        val thoughtText = thoughtMatch?.groupValues?.get(1)?.trim()

        // 2. Identify if currently thinking (unclosed tags, any closer counts)
        val hasThoughtOpener = content.contains("<thought>") || content.contains("<think>") || content.contains("<thinking>")
        val hasThoughtCloser = content.contains("</thought>") || content.contains("</think>") || content.contains("</thinking>")
        val isThinking = hasThoughtOpener && !hasThoughtCloser

        // 3. Clean public text - replace closed tags with space
        var publicText = content
            .replace(Regex("<thought>[\\s\\S]*?</thought>"), " ")
            .replace(Regex("<think>[\\s\\S]*?</think>"), " ")
            .replace(Regex("<thinking>[\\s\\S]*?</thinking>"), " ")
            .replace(Regex("<thinking>[\\s\\S]*?</thought>"), " ")
            .replace(Regex("<thought>[\\s\\S]*?</thinking>"), " ")
            .replace(Regex("<think>[\\s\\S]*?</thought>"), " ")
            .replace(Regex("<thought>[\\s\\S]*?</think>"), " ")
            .replace(Regex("<action[\\s\\S]*?</action>"), " ")
            .replace(Regex("""<mutation[^/]*/>\s*""", RegexOption.IGNORE_CASE), " ")
            .replace(Regex("<tool_call>[\\s\\S]*?</tool_call>"), " ")

        // 4. Remove unclosed tags at the end (crucial for streaming)
        if (!hasThoughtCloser) {
            publicText = publicText
                .replace(Regex("<thought>[\\s\\S]*"), " ")
                .replace(Regex("<think>[\\s\\S]*"), " ")
                .replace(Regex("<thinking>[\\s\\S]*"), " ")
        }
        publicText = publicText
            .replace(Regex("<action[\\s\\S]*"), " ")
            .replace(Regex("<tool_call>[\\s\\S]*"), " ")
            // Remove partial tag fragments at the very end
            .replace(Regex("<(?:t(?:h(?:o(?:u(?:g(?:ht?)?)?)?|i(?:n(?:k(?:ing?)?)?)?)?)?|a(?:c(?:t(?:i(?:on?)?)?)?)?|tool_call)$"), "")

        if (!retainSpacings) {
            publicText = publicText.replace(Regex("\\s+"), " ").trim()
        }

        publicText = stripTechnicalFiller(publicText)

        return SanitizedResult(
            publicText = publicText,
            internalThoughts = thoughtText,
            isThinking = isThinking
        )
    }

    /**
     * Extracts all <action> tags and returns them as ActionCall objects.
     */
    fun parseActions(content: String): List<ActionCall> {
        val normalized = content.replace(Regex("[\\u201C\\u201D\\u2018\\u2019]"), "\"")
        val dedup = linkedMapOf<String, ActionCall>()

        val actionRegex = Regex("<action\\s+type=\"([^\"]+)\">([\\s\\S]*?)</action>", RegexOption.IGNORE_CASE)
        actionRegex.findAll(normalized).forEach { match ->
            try {
                val type = match.groupValues[1]
                val payloadRaw = match.groupValues[2]
                val sanitizedPayload = sanitizeJsonPayload(payloadRaw)
                val action = ActionCall(
                    type = type,
                    payload = json.parseToJsonElement(sanitizedPayload).jsonObject,
                    userId = null,
                    moduleId = null,
                    encryptionKey = null
                )
                dedup["$type|${action.payload}"] = action
            } catch (e: Exception) {
                // keep going
            }
        }

        if (dedup.isEmpty()) {
            // [action type="delegate_to_module"]{ ... }
            val bracketActionRegex = Regex("\\[action\\s+type=[\"']?([a-z_]+)[\"']?]\\s*(\\{[\\s\\S]*?\\})", RegexOption.IGNORE_CASE)
            bracketActionRegex.findAll(normalized).forEach { match ->
                val type = match.groupValues[1]
                val payload = runCatching {
                    json.parseToJsonElement(sanitizeJsonPayload(match.groupValues[2])).jsonObject
                }.getOrElse { buildJsonObject { } }
                val action = ActionCall(type = type, payload = payload, userId = null, moduleId = null, encryptionKey = null)
                dedup["$type|${action.payload}"] = action
            }
        }

        if (dedup.isEmpty()) {
            // <action>{ "type": "...", "payload": {...} }</action>
            val jsonActionRegex = Regex("<action>\\s*([\\s\\S]*?)\\s*</action>", RegexOption.IGNORE_CASE)
            jsonActionRegex.findAll(normalized).forEach { match ->
                val parsed = runCatching {
                    json.parseToJsonElement(sanitizeJsonPayload(match.groupValues[1])).jsonObject
                }.getOrNull() ?: return@forEach
                val type = parsed["type"]?.jsonPrimitive?.contentOrNull ?: return@forEach
                val payload = parsed["payload"]?.jsonObject ?: buildJsonObject { }
                val action = ActionCall(type = type, payload = payload, userId = null, moduleId = null, encryptionKey = null)
                dedup["$type|${action.payload}"] = action
            }
        }

        return dedup.values.toList()
    }

    /**
     * Represents a soul mutation extracted from an LLM <mutation> tag.
     * Format: <mutation vector="RESILIENCE" delta="-0.15"/>
     */
    data class ExtractedMutation(
        val vector: String,  // GlobalSoulVector name
        val delta: Float     // e.g. -0.15
    )

    /**
     * Extracts all <mutation> tags from the LLM response.
     * Spec §2: The Orchestrator parses XML <mutation> tags from the LLM and routes
     * them through the Autopilot gate before applying to the GlobalSoul.
     *
     * Supported format:
     *   <mutation vector="RESILIENCE" delta="-0.15"/>
     *   <mutation vector="BANDWIDTH" delta="+0.10"/>
     */
    fun parseMutations(content: String): List<ExtractedMutation> {
        val mutationRegex = Regex(
            """<mutation\s+vector="([^"]+)"\s+delta="([^"]+)"\s*/>""",
            RegexOption.IGNORE_CASE
        )
        return mutationRegex.findAll(content).mapNotNull { match ->
            try {
                val vector = match.groupValues[1].uppercase().trim()
                val delta = match.groupValues[2].trim().toFloatOrNull() ?: return@mapNotNull null
                ExtractedMutation(vector = vector, delta = delta.coerceIn(-1.0f, 1.0f))
            } catch (_: Exception) { null }
        }.toList()
    }

    /**
     * Strip <mutation> tags from the public text (they are internal directives, not user-facing).
     */
    fun stripMutationTags(content: String): String =
        content.replace(Regex("""<mutation[^/]*/>\s*""", RegexOption.IGNORE_CASE), "").trim()

    /**
     * Attempts to fix common JSON errors from LLMs (trailing commas, markdown blocks).
     */
    fun sanitizeJsonPayload(content: String): String {
        if (content.isEmpty()) return "{}"
        
        // 1. Remove markdown code blocks
        var sanitized = content.replace(Regex("```(?:json)?\\s*([\\s\\S]*?)```", RegexOption.IGNORE_CASE), "$1")
        
        // 2. Remove common AI prefixes
        sanitized = sanitized.replace(Regex("^(?:JSON|Payload|Update):\\s*", RegexOption.IGNORE_CASE), "")
        
        sanitized = sanitized.trim()

        // 3. Extract just the JSON object/array
        val jsonMatch = Regex("^(\\{[\\s\\S]*\\}|\\[[\\s\\S]*\\])").find(sanitized)
        if (jsonMatch != null) {
            sanitized = jsonMatch.groupValues[1]
        }

        // 4. Basic repair for trailing commas
        sanitized = sanitized
            .replace(Regex(",\\s*\\]"), "]")
            .replace(Regex(",\\s*\\}"), "}")

        return sanitized
    }

    fun parseFinal(raw: String): FinalParse {
        val sanitized = sanitize(raw)
        return FinalParse(
            content = sanitized.publicText,
            thoughts = sanitized.internalThoughts,
            actions = parseActions(raw)
        )
    }
}

data class FinalParse(
    val content: String,
    val thoughts: String?,
    val actions: List<ActionCall>
)
