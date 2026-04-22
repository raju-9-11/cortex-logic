package com.agnes.ara.core.domain.service

import kotlinx.serialization.json.*
import kotlin.math.max
import kotlin.math.min

/**
 * Pure helpers for onboarding fast-track validation.
 *
 * Ported from fast-track-validation.ts (Agnes Web).
 * React hook, LLM calls, and MODULE_MANIFEST lookups stay in TS.
 */
object OnboardingValidation {

    private val json = Json { ignoreUnknownKeys = true }

    /**
     * Traverse a dot-path in a JSON object and return the value at that path.
     * Returns null if the path doesn't exist or the value is JsonNull.
     *
     * @param objectJson JSON object string.
     * @param path       Dot-separated path, e.g. "user.profile.name".
     * @return JSON string of the value at path, or null if missing.
     */
    fun resolvePath(objectJson: String, path: String): String? {
        val root = try {
            json.parseToJsonElement(objectJson) as? JsonObject ?: return null
        } catch (_: Exception) { return null }

        val segments = path.split('.')
        var current: JsonElement = root
        for (segment in segments) {
            current = (current as? JsonObject)?.get(segment) ?: return null
        }
        return if (current is JsonNull) null else current.toString()
    }

    /**
     * Returns true if [valueJson] represents a "missing" value:
     * null, JSON null, empty string, or empty array.
     *
     * @param valueJson JSON-encoded value string from [resolvePath], or null.
     */
    fun isMissingValue(valueJson: String?): Boolean {
        if (valueJson == null) return true
        return when (val el = try { json.parseToJsonElement(valueJson) } catch (_: Exception) { return true }) {
            is JsonNull      -> true
            is JsonPrimitive -> el.contentOrNull?.trim()?.isEmpty() ?: true
            is JsonArray     -> el.isEmpty()
            else             -> false
        }
    }

    /**
     * Parse a raw LLM validation response string into a structured result JSON.
     * Uses best-effort JSON extraction (strips markdown fences, slices first `{`..`}`).
     *
     * @param raw      Raw LLM response text.
     * @param sanitize Pre-cleaned JSON string (pass the result of LlmSanitizer.sanitizeJsonPayload).
     * @return JSON string: {"accepted":bool,"confidence":float,"reason":"…","missingFields":[…],"issues":[…]}
     *         or null if unparseable.
     */
    fun parseValidationResponse(sanitized: String): String? {
        return try {
            val start = sanitized.indexOf('{')
            val end   = sanitized.lastIndexOf('}')
            if (start == -1 || end == -1 || end < start) return null

            val slice = sanitized.substring(start, end + 1)
            val parsed = json.parseToJsonElement(slice).jsonObject

            buildJsonObject {
                put("accepted", parsed["accepted"]?.jsonPrimitive?.booleanOrNull ?: false)
                val rawConf = parsed["confidence"]?.jsonPrimitive?.doubleOrNull ?: 0.0
                put("confidence", max(0.0, min(1.0, rawConf)))
                put("reason", parsed["reason"]?.jsonPrimitive?.contentOrNull ?: "validation_failed")
                put("missingFields", parsed["missingFields"]?.jsonArray?.filter { it is JsonPrimitive }
                    ?.let { JsonArray(it) } ?: JsonArray(emptyList()))
                put("issues", parsed["issues"]?.jsonArray?.filter { it is JsonPrimitive }
                    ?.let { JsonArray(it) } ?: JsonArray(emptyList()))
            }.toString()
        } catch (_: Exception) { null }
    }

    /**
     * Build an onboarding fast-track validation prompt for an LLM.
     *
     * @param moduleId       Module identifier string.
     * @param objective      Human-readable objective being validated.
     * @param requiredFields Comma-separated list of required field paths.
     * @param payloadJson    JSON object of the payload being validated.
     * @return Formatted prompt string.
     */
    fun createValidationPrompt(
        moduleId: String,
        objective: String,
        requiredFields: List<String>,
        payloadJson: String,
    ): String = buildString {
        appendLine("You validate onboarding fast-track payloads.")
        appendLine("Return ONLY strict JSON in this shape:")
        appendLine("""{"accepted":true|false,"confidence":0.0-1.0,"reason":"short_reason","missingFields":["field.path"],"issues":["issue"]}""")
        appendLine("Module: $moduleId")
        appendLine("Objective: $objective")
        appendLine("Required fields: ${requiredFields.joinToString(", ")}")
        appendLine("Payload: $payloadJson")
        appendLine("Rules:")
        appendLine("- accepted=true only if payload is coherent and sufficient to skip guided intake.")
        appendLine("- confidence must reflect data completeness and plausibility.")
        append("- if uncertain, set accepted=false with a short reason.")
    }
}
