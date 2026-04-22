package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.service.titan.ExerciseLibrary
import com.agnes.ara.core.domain.service.titan.QuickLogParser
import com.agnes.ara.core.domain.service.titan.RecoveryTemplates
import kotlin.js.JsExport

// ═══════════════════════════════════════════════════════════════════════════════
// TitanDataJs — JS/TS-facing wrappers for titan data services
//
// Each class is a thin @JsExport adapter that delegates to the platform-agnostic
// commonMain objects. No business logic lives here.
// ═══════════════════════════════════════════════════════════════════════════════

@JsExport
class ExerciseLibraryJs {

    /**
     * Find the first exercise matching [query] by name or alias (case-insensitive).
     * @return JSON-encoded Exercise object, or null if no match found.
     */
    fun findExercise(query: String): String? =
        ExerciseLibrary.findExercise(query)

    /**
     * Search for exercises matching [query] by name or alias.
     * When [query] is blank the first [limit] entries are returned.
     * @return JSON-encoded array of Exercise objects.
     */
    fun searchExercises(query: String, limit: Int = 5): String =
        ExerciseLibrary.searchExercises(query, limit)
}

@JsExport
class RecoveryTemplatesJs {

    /**
     * Returns the JSON-encoded RecoveryTemplate for [type].
     *
     * When [type] is "rehab" and [bodyRegion] is provided, the region-specific
     * protocol is returned. Falls back to "other" for unknown regions.
     *
     * @param type        "rest" | "active" | "rehab" | "deload"
     * @param bodyRegion  Optional: "knee" | "shoulder" | "back" | "hip" |
     *                    "ankle" | "wrist" | "neck" | "other"
     * @return JSON-encoded RecoveryTemplate
     */
    fun getRecoveryTemplate(type: String, bodyRegion: String? = null): String =
        RecoveryTemplates.getRecoveryTemplate(type, bodyRegion)

    /**
     * Returns the human-readable label for a recovery [type].
     * Returns null for unrecognised type values.
     */
    fun getRecoveryLabel(type: String): String? =
        RecoveryTemplates.RECOVERY_TEMPLATE_LABELS[type]
}

@JsExport
class QuickLogParserJs {

    /**
     * Parse a full quick-log input string into structured entries.
     *
     * @param input  Raw user text, e.g. "3x5 squat @100kg, 3x8 bench @80"
     * @return JSON-encoded QuickLogParseResult `{entries, hasLowConfidence, isEmpty}`
     */
    fun parseQuickLogInput(input: String): String =
        QuickLogParser.parseQuickLogInput(input)

    /**
     * Annotate parsed entries with PR status.
     *
     * @param entriesJson         JSON array of ParsedEntry from parseQuickLogInput()
     * @param personalRecordsJson JSON array of `[{exerciseId, e1RM}]`
     * @return JSON array of ParsedEntry with isPR and prDelta populated
     */
    fun annotatePRs(entriesJson: String, personalRecordsJson: String): String =
        QuickLogParser.annotatePRs(entriesJson, personalRecordsJson)

    /**
     * Build a history-suggestion string from the most recent session.
     *
     * @param recentSessionsJson JSON array of sessions (newest-first) with
     *                           `date` and `exercises[]{exerciseName, sets[]}`
     * @param maxLength          Max summary character length (default 120)
     * @return JSON-encoded `{text, date}` or null if no usable history
     */
    fun buildHistorySuggestion(recentSessionsJson: String, maxLength: Int = 120): String? =
        QuickLogParser.buildHistorySuggestion(recentSessionsJson, maxLength)
}
