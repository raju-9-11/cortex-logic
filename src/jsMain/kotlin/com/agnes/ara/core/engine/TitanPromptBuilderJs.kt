package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.models.TrainerProfile
import com.agnes.ara.core.domain.services.titan.TitanDiagnosisContextPolicy
import com.agnes.ara.core.domain.services.titan.TitanPromptBuilder
import kotlinx.serialization.json.Json
import kotlin.js.JsExport

// ═══════════════════════════════════════════════════════════════════════════════
// TitanPromptBuilderJs — JS/TS-facing bridge for Titan prompt construction
//
// Thin @JsExport adapter delegating to TitanPromptBuilder (commonMain).
// Allows TS to drop its own prompt-building files and call KMP directly.
// ═══════════════════════════════════════════════════════════════════════════════

@JsExport
class TitanPromptBuilderJs {

    private companion object {
        private val lenientJson = Json { ignoreUnknownKeys = true; coerceInputValues = true }
    }

    /**
     * Build the system prompt for Titan's medical diagnosis mode.
     *
     * @param profileJson    Optional JSON-encoded TrainerProfile. Pass null or
     *                       empty string to use the no-profile fallback.
     * @param contextPolicy  `"with-context"` or `"isolated"` (default).
     * @return Fully assembled diagnosis system prompt string.
     */
    fun buildDiagnosisPrompt(
        profileJson: String? = null,
        contextPolicy: String = "isolated"
    ): String {
        val profile: TrainerProfile? = profileJson?.takeIf { it.isNotBlank() }?.let {
            try {
                lenientJson.decodeFromString(TrainerProfile.serializer(), it)
            } catch (_: Exception) {
                null
            }
        }

        val policy = when (contextPolicy) {
            "with-context" -> TitanDiagnosisContextPolicy.WITH_CONTEXT
            else -> TitanDiagnosisContextPolicy.ISOLATED
        }

        return TitanPromptBuilder.buildTitanDiagnosisSystemPrompt(profile, policy)
    }

    /**
     * Build the onboarding system prompt for Titan intake.
     *
     * @param privacyLevel       `"complete"` or `"basic"` / `"standard"`.
     * @param userName           User's preferred name (from Ara handoff).
     * @param pronouns           User's pronouns.
     * @param occupation         User's occupation.
     * @param typicalSleepHours  Typical sleep hours (nullable).
     * @return Fully assembled onboarding system prompt string.
     */
    fun buildOnboardingPrompt(
        privacyLevel: String = "standard",
        userName: String? = null,
        pronouns: String? = null,
        occupation: String? = null,
        typicalSleepHours: Double? = null
    ): String {
        return TitanPromptBuilder.buildTitanOnboardingPrompt(
            privacyLevel = privacyLevel,
            userName = userName,
            pronouns = pronouns,
            occupation = occupation,
            typicalSleepHours = typicalSleepHours
        )
    }
}
