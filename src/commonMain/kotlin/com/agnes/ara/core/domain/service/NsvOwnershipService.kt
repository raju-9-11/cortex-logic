package com.agnes.ara.core.domain.service

import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

// ═══════════════════════════════════════════════════════════════════════════════
// NSV Ownership & Read Permissions — single source of truth for both platforms
// ═══════════════════════════════════════════════════════════════════════════════

object NsvOwnershipService {

    /** Module → list of NSV metric paths the module can WRITE. */
    val WRITE_PERMISSIONS: Map<String, List<String>> = mapOf(
        "nexus" to emptyList(),
        "agnes" to listOf(
            "emotional.emotionalResilience", "emotional.stressLoad",
            "emotional.moodTrend", "emotional.traumaMarkers",
        ),
        "titan" to listOf(
            "biological.cnsFatigue", "biological.sleepQuality",
            "biological.recoveryScore", "biological.hormonalContext",
        ),
        "soma" to listOf("biological.recoveryScore"),
        "ledger" to listOf("resource.financialFriction", "resource.resonanceROI"),
        "atlas" to listOf(
            "cognitive.energyBudget", "cognitive.focusScore", "cognitive.activeLoad",
            "cognitive.planningLoad", "cognitive.taskCompletionRate",
            "planning.streakHealth", "planning.deadlinePressure",
            "planning.reflectionStreak", "planning.goalAlignment", "planning.habitMomentum",
        ),
        "scout" to listOf("cognitive.researchLoad", "cognitive.interestDiversity"),
        "forge" to emptyList(),
        "bridge" to emptyList(),
    )

    /** Module → list of NSV metric paths the module's LLM system prompt receives. */
    val READ_PERMISSIONS: Map<String, List<String>> = mapOf(
        "nexus" to listOf(
            "biological.cnsFatigue", "biological.sleepQuality", "biological.recoveryScore",
            "biological.hormonalContext",
            "emotional.emotionalResilience", "emotional.stressLoad", "emotional.moodTrend",
            "emotional.traumaMarkers",
            "cognitive.energyBudget", "cognitive.focusScore", "cognitive.activeLoad",
            "cognitive.researchLoad", "cognitive.planningLoad", "cognitive.taskCompletionRate",
            "cognitive.interestDiversity",
            "planning.streakHealth", "planning.deadlinePressure",
            "resource.financialFriction", "resource.resonanceROI",
        ),
        "agnes" to listOf(
            "biological.cnsFatigue", "biological.sleepQuality", "biological.hormonalContext",
            "emotional.emotionalResilience", "emotional.stressLoad", "emotional.moodTrend",
            "emotional.traumaMarkers",
            "cognitive.energyBudget", "cognitive.activeLoad",
            "planning.streakHealth", "resource.financialFriction",
        ),
        "titan" to listOf(
            "biological.cnsFatigue", "biological.sleepQuality", "biological.recoveryScore",
            "biological.hormonalContext",
            "emotional.emotionalResilience", "emotional.stressLoad", "emotional.moodTrend",
            "cognitive.energyBudget",
        ),
        "soma" to listOf(
            "biological.cnsFatigue", "biological.sleepQuality", "biological.recoveryScore",
            "biological.hormonalContext",
        ),
        "atlas" to listOf(
            "biological.cnsFatigue", "biological.sleepQuality", "biological.recoveryScore",
            "emotional.emotionalResilience", "emotional.stressLoad", "emotional.moodTrend",
            "cognitive.energyBudget", "cognitive.focusScore", "cognitive.activeLoad",
            "cognitive.researchLoad", "cognitive.planningLoad", "cognitive.taskCompletionRate",
            "planning.streakHealth", "planning.deadlinePressure", "planning.reflectionStreak",
            "planning.goalAlignment", "planning.habitMomentum",
            "resource.financialFriction",
        ),
        "scout" to listOf("cognitive.researchLoad", "cognitive.interestDiversity"),
        "ledger" to listOf(
            "resource.financialFriction", "resource.resonanceROI",
            "cognitive.energyBudget", "emotional.stressLoad",
        ),
        "forge" to listOf(
            "biological.cnsFatigue", "biological.sleepQuality",
            "cognitive.energyBudget", "cognitive.focusScore", "cognitive.activeLoad",
        ),
        "bridge" to emptyList(),
    )

    /** Whether [moduleId] can write [metric]. */
    fun ownsMetric(moduleId: String, metric: String): Boolean =
        WRITE_PERMISSIONS[moduleId]?.contains(metric) == true

    /** All metrics [moduleId] can write. */
    fun getWritableMetrics(moduleId: String): List<String> =
        WRITE_PERMISSIONS[moduleId] ?: emptyList()

    /** All metrics [moduleId]'s LLM receives. */
    fun getReadableMetrics(moduleId: String): List<String> =
        READ_PERMISSIONS[moduleId] ?: emptyList()

    /** Primary owner of a metric (first module that claims it). */
    fun getMetricOwner(metric: String): String =
        WRITE_PERMISSIONS.entries.firstOrNull { metric in it.value }?.key ?: "nexus"

    /** All modules that own a metric. */
    fun getMetricOwners(metric: String): List<String> =
        WRITE_PERMISSIONS.entries.filter { metric in it.value }.map { it.key }

    /** Whether [moduleId] is the sole owner of [metric]. */
    fun isExclusiveOwner(moduleId: String, metric: String): Boolean {
        val owners = getMetricOwners(metric)
        return owners.size == 1 && owners[0] == moduleId
    }

    /**
     * Returns true if a metric's last-updated timestamp is older than [thresholdDays].
     * @param lastUpdated ISO 8601 timestamp string, or null/blank for missing.
     * @param thresholdDays Age limit in days.
     * @param nowMs Current epoch ms (injected to avoid platform-specific Date calls).
     */
    fun isMetricStale(lastUpdated: String?, thresholdDays: Int, nowMs: Long): Boolean {
        if (lastUpdated.isNullOrBlank()) return true
        // Parse ISO 8601 date string via epoch ms approximation.
        // Date strings in format "YYYY-MM-DDTHH:MM:SS.sssZ" or "YYYY-MM-DD".
        val stamp: Long = try {
            // For full ISO strings we parse via known fixed-width format.
            parseIso8601ToMs(lastUpdated)
        } catch (_: Exception) {
            return true
        }
        val ageMs = nowMs - stamp
        return ageMs > thresholdDays * 24L * 60 * 60 * 1000
    }

    /**
     * Returns co-owned metrics from a patch that [moduleId] does not exclusively own.
     * These metrics should go through the SOUL_WRITE_REQUESTED validation path.
     *
     * @param moduleId  Module performing the write.
     * @param patchJson JSON object with structure: {domain: {field: value}}.
     * @return List of co-owned metric paths (dotted, e.g. "biological.cnsFatigue").
     */
    fun getCoOwnedMetricsInPatch(moduleId: String, patchJson: String): List<String> {
        val patch = try {
            Json.parseToJsonElement(patchJson) as? JsonObject ?: return emptyList()
        } catch (_: Exception) { return emptyList() }

        val coOwned = mutableListOf<String>()
        for ((domain, domainEl) in patch) {
            val domainObj = domainEl as? JsonObject ?: continue
            for (field in domainObj.keys) {
                val metric = "$domain.$field"
                if (ownsMetric(moduleId, metric) && !isExclusiveOwner(moduleId, metric)) {
                    coOwned.add(metric)
                }
            }
        }
        return coOwned
    }

    /** Metrics that are computed/derived rather than directly user-reported. */
    val DERIVED_METRICS: List<String> = listOf(
        "cognitive.activeLoad", "cognitive.researchLoad", "cognitive.planningLoad",
        "cognitive.taskCompletionRate", "cognitive.interestDiversity",
        "planning.streakHealth", "planning.deadlinePressure",
    )

    /** Per-metric calibration prompt templates for user-facing data collection. */
    val CALIBRATION_PROMPTS: Map<String, String> = mapOf(
        "biological.cnsFatigue" to "On a 0-10 scale, how fatigued does your CNS feel right now?",
        "biological.sleepQuality" to "How would you rate your last sleep quality from 0-10?",
        "biological.recoveryScore" to "What is your current recovery score (0-10) if you have one?",
        "biological.hormonalContext" to "Any notable hormonal context or cycle phase to note right now?",
        "emotional.emotionalResilience" to "On a 0-10 scale, how resilient do you feel today?",
        "emotional.stressLoad" to "On a 0-10 scale, how elevated is your stress load?",
        "emotional.moodTrend" to "What is your current mood trend (e.g., stable, improving, declining)?",
        "emotional.traumaMarkers" to "Any trauma markers or triggers to log, or should I mark none for now?",
        "cognitive.energyBudget" to "What is your current energy budget (0-10)?",
        "cognitive.focusScore" to "How would you rate your focus today (0-10)?",
        "cognitive.activeLoad" to "How heavy is your task load right now (0-10)?",
        "cognitive.researchLoad" to "How intense is your research load right now (0-10)?",
        "cognitive.planningLoad" to "How many open, uncommitted tasks or plans do you have in your head right now (0-10)?",
        "cognitive.taskCompletionRate" to "Roughly what fraction of tasks you planned this week did you complete (0.0-1.0)?",
        "cognitive.interestDiversity" to "How broad are your active research interests right now (0-10, low = hyperfocused on one thing)?",
        "planning.streakHealth" to "How well are you maintaining your daily habits and streaks (0-10)?",
        "planning.deadlinePressure" to "How much deadline pressure do you feel right now (0-10)?",
        "planning.reflectionStreak" to "How many consecutive days have you journaled recently?",
        "planning.goalAlignment" to "What fraction of your active goals have linked tasks (0-1)?",
        "planning.habitMomentum" to "What fraction of your active habits have live streaks (0-1)?",
        "resource.financialFriction" to "How much financial friction do you feel right now (0-10)?",
        "resource.resonanceROI" to "What is your current resonance ROI (0-1 or percentage)?",
    )

    /** Build a calibration prompt for a module based on its owned metrics. */
    fun buildCalibrationPrompt(moduleId: String): String {
        val owned = WRITE_PERMISSIONS[moduleId] ?: return "Calibration required. Share any missing vital metrics for this domain."
        if (owned.isEmpty()) return "Calibration required. Share any missing vital metrics for this domain."
        val lines = owned.map { metric -> "- ${CALIBRATION_PROMPTS[metric] ?: metric}" }
        return (listOf("Calibration required. Please provide:") + lines).joinToString("\n")
    }

    /**
     * Filter an NSV write patch to only include metrics [moduleId] is allowed to write.
     * KMP equivalent of Agnes `filterReadOnlyModuleNSVUpdate`.
     *
     * Supports both flat dotted keys (e.g. {"biological.cnsFatigue": 5})
     * and nested JSON (e.g. {"biological": {"cnsFatigue": 5}}).
     *
     * @param moduleId Module performing the write.
     * @param patchJson JSON object in either format.
     * @return Filtered JSON (flat dotted format) with only writable paths, or `null` if nothing remains.
     */
    fun filterWritePatch(moduleId: String, patchJson: String): String? {
        val allowed = WRITE_PERMISSIONS[moduleId] ?: return null
        if (allowed.isEmpty()) return null
        val allowedSet = allowed.toSet()

        val patch = try {
            Json.parseToJsonElement(patchJson) as? JsonObject ?: return null
        } catch (_: Exception) { return null }

        // Flatten nested format to dotted keys, pass flat keys through
        val flatPatch = mutableMapOf<String, JsonElement>()
        for ((key, value) in patch) {
            if (value is JsonObject && !key.contains('.')) {
                // Nested: { "biological": { "cnsFatigue": 5 } } → "biological.cnsFatigue": 5
                for ((field, fieldValue) in value) {
                    flatPatch["$key.$field"] = fieldValue
                }
            } else {
                flatPatch[key] = value
            }
        }

        val filtered = flatPatch.filterKeys { it in allowedSet }
        if (filtered.isEmpty()) return null
        return Json.encodeToString(JsonObject.serializer(), JsonObject(filtered))
    }

    // ── Private helpers ──────────────────────────────────────────────────────

    /**
     * Minimal ISO 8601 parser to epoch ms — handles the most common formats:
     * "YYYY-MM-DDTHH:MM:SS.sssZ", "YYYY-MM-DDTHH:MM:SSZ", "YYYY-MM-DD".
     * Throws NumberFormatException for unrecognised formats (caller returns stale=true).
     */
    private fun parseIso8601ToMs(s: String): Long {
        val parts = s.trim().replace('T', ' ').replace('Z', ' ').trim()
        val datePart = parts.substring(0, 10)
        val d = datePart.split('-')
        val year = d[0].toInt()
        val month = d[1].toInt()
        val day = d[2].toInt()

        var timePart = if (parts.length > 10) parts.substring(11).trim().split('.')[0].split(':') else listOf("0", "0", "0")
        val hour = timePart.getOrElse(0) { "0" }.toInt()
        val min  = timePart.getOrElse(1) { "0" }.toInt()
        val sec  = timePart.getOrElse(2) { "0" }.toInt()

        // Days since epoch using the same algorithm as LedgerAggregationUtils.epochMsToYearMonth.
        var days = 0L
        for (y in 1970 until year) {
            days += if ((y % 4 == 0 && y % 100 != 0) || (y % 400 == 0)) 366L else 365L
        }
        val monthDays = if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))
            intArrayOf(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
        else
            intArrayOf(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
        for (m in 0 until (month - 1)) days += monthDays[m]
        days += (day - 1).toLong()

        return (days * 86400L + hour * 3600L + min * 60L + sec) * 1000L
    }

    /**
     * Filter an NSV JSON to only include fields readable by [moduleId].
     * @param nsvJson full NSV as JSON
     * @return filtered NSV as JSON (only paths the module can read)
     */
    fun filterNsvForModule(nsvJson: String, moduleId: String): String {
        val allowed = READ_PERMISSIONS[moduleId] ?: return "{}"
        if (allowed.isEmpty()) return "{}"

        val allowedByDomain = allowed.groupBy(
            { it.substringBefore('.') },
            { it.substringAfter('.') },
        )

        val parsed = Json.parseToJsonElement(nsvJson)
        if (parsed !is JsonObject) return "{}"

        val result = buildMap {
            for ((domain, fields) in allowedByDomain) {
                val domainObj = parsed[domain]
                if (domainObj !is JsonObject) continue
                val filtered = domainObj.filterKeys { it in fields }
                if (filtered.isNotEmpty()) {
                    put(domain, JsonObject(filtered))
                }
            }

            // Preserve lastUpdated but filter to allowed metrics only
            val lastUpdated = parsed["lastUpdated"]
            if (lastUpdated is JsonObject) {
                val filteredTimestamps = lastUpdated.filterKeys { it in allowed }
                if (filteredTimestamps.isNotEmpty()) {
                    put("lastUpdated", JsonObject(filteredTimestamps))
                }
            }
        }

        return Json.encodeToString(
            JsonObject.serializer(),
            JsonObject(result),
        )
    }
}
