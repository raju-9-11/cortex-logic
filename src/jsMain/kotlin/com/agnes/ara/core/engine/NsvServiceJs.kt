package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.service.NsvService
import kotlin.js.JsExport

@JsExport
class NsvServiceJs {

    /** Returns default NSV as JSON string. */
    fun createDefault(): String = NsvService.createDefault()

    /** Normalize an NSV JSON (merge defaults, resolve legacy aliases). */
    fun normalize(nsvJson: String): String = NsvService.normalize(nsvJson)

    /** Deep merge base NSV with updates (both JSON). */
    fun merge(baseJson: String, updatesJson: String): String = NsvService.merge(baseJson, updatesJson)

    /** Format full NSV for prompt with [GLOBAL NEURAL STATE] header. */
    fun formatForPrompt(nsvJson: String): String = NsvService.formatForPrompt(nsvJson)

    /**
     * Format NSV filtered to allowed paths for module prompt.
     * @param allowedPathsJson JSON array of metric path strings
     */
    fun formatForModulePrompt(nsvJson: String, allowedPathsJson: String): String =
        NsvService.formatForModulePrompt(nsvJson, allowedPathsJson)

    /**
     * Format NSV as enriched Atlas planning context (overrides, maxLoad, deepWorkWindow).
     * Returns the full [ATLAS PLANNING STATE] block as a multi-line string.
     */
    fun formatForAtlasPlanner(nsvJson: String): String =
        NsvService.formatForAtlasPlanner(nsvJson)

    /** Merge two NSV patch objects — shallow spread + domain deep merge. */
    fun mergePatches(baseJson: String, updatesJson: String): String =
        NsvService.mergePatches(baseJson, updatesJson)
}
