package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.service.OnboardingValidation
import kotlin.js.JsExport

/**
 * JS/TS facade for [OnboardingValidation] pure helpers.
 * LLM calls, React hooks, and MODULE_MANIFEST lookups stay in TS.
 */
@JsExport
class OnboardingValidationJs {

    /**
     * Traverse a dot-path in a JSON object string.
     * @return JSON string of the value, or null if missing/null.
     */
    fun resolvePath(objectJson: String, path: String): String? =
        OnboardingValidation.resolvePath(objectJson, path)

    /**
     * Returns true if [valueJson] represents a missing value
     * (null, JSON null, empty string, or empty array).
     */
    fun isMissingValue(valueJson: String?): Boolean =
        OnboardingValidation.isMissingValue(valueJson)

    /**
     * Parse a sanitized LLM validation response into a structured result JSON string.
     * @param sanitized Pre-cleaned JSON string (use LlmSanitizerJs.sanitizeJsonPayload first).
     * @return JSON object string, or null if unparseable.
     */
    fun parseValidationResponse(sanitized: String): String? =
        OnboardingValidation.parseValidationResponse(sanitized)

    /**
     * Build an onboarding fast-track validation prompt for an LLM.
     * @param moduleId       Module identifier.
     * @param objective      Human-readable objective.
     * @param requiredFields Array of required field path strings.
     * @param payloadJson    JSON object string of the payload.
     */
    fun createValidationPrompt(
        moduleId: String,
        objective: String,
        requiredFields: Array<String>,
        payloadJson: String,
    ): String = OnboardingValidation.createValidationPrompt(moduleId, objective, requiredFields.toList(), payloadJson)
}
