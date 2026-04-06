package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.service.ledger.LedgerAutomationEngine
import kotlinx.serialization.json.Json
import kotlin.js.JsExport

/**
 * JS-exportable facade for [LedgerAutomationEngine].
 *
 * Bridges the commonMain pure engine to JavaScript callers. UUID generation
 * is performed here in jsMain using the Web Crypto API, keeping commonMain
 * free of platform-specific concerns.
 */
@JsExport
class LedgerAutomationEngineJs {

    private val json = Json { ignoreUnknownKeys = true }

    /**
     * Evaluate all enabled automation rules against the profile.
     *
     * @param profileJson JSON string conforming to LedgerIntakeProfile.
     * @param nowIso      ISO-8601 instant string representing the current time.
     * @return            JSON array of AutomationSuggestion objects.
     */
    fun evaluateRules(profileJson: String, nowIso: String): String {
        val suggestions = LedgerAutomationEngine.evaluateRules(
            profileJson = profileJson,
            nowIso = nowIso,
            uuidProvider = { js("crypto.randomUUID()") as String },
        )
        return json.encodeToString(
            kotlinx.serialization.builtins.ListSerializer(LedgerAutomationEngine.AutomationSuggestion.serializer()),
            suggestions,
        )
    }

    /**
     * Return the default set of automation rules for a new user.
     *
     * @param nowIso ISO-8601 instant string used for `createdAt` timestamps.
     * @return       JSON array of AutomationRule objects.
     */
    fun getDefaultRules(nowIso: String): String {
        val rules = LedgerAutomationEngine.getDefaultRules(
            nowIso = nowIso,
            uuidProvider = { js("crypto.randomUUID()") as String },
        )
        return json.encodeToString(
            kotlinx.serialization.builtins.ListSerializer(LedgerAutomationEngine.AutomationRule.serializer()),
            rules,
        )
    }
}
