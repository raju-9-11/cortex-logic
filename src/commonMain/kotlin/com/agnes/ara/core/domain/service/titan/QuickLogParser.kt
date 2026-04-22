package com.agnes.ara.core.domain.service.titan

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlin.math.round

/**
 * QuickLogParser — Natural-language workout entry parser.
 *
 * Parses free-text like "3x5 squat @100kg, 3x8 bench @80" into structured
 * ParsedEntry objects, resolving exercise names against ExerciseLibrary.
 *
 * Grammar:
 *   input    ::= entry ("," entry)*
 *   entry    ::= (setspec WS)? exercise (WS setspec)? (WS weight)?
 *   setspec  ::= NUMBER "x" NUMBER   e.g. "3x5", "3×5"
 *   exercise ::= WORD+
 *   weight   ::= "@"? NUMBER unit?
 *   unit     ::= "kg" | "lbs" | "lb"
 *
 * Design:
 *   - Small token-based state machine; no monolithic regex.
 *   - Normalises exercise names against ExerciseLibrary aliases (case-insensitive).
 *   - Gracefully degrades: partial entries are allowed and surfaced via confidence.
 *   - All complex I/O crosses the JSON boundary.
 *
 * Complexity: O(n × k × m) where n = entry count, k = token count per entry,
 * and m = library size (41). In practice n, k are small and m is fixed, so
 * effectively O(1) for typical inputs.
 */

// ═══════════════════════════════════════════════════════════════════════════════
// IO models (JSON boundary)
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
data class ParsedEntry(
    /** Original raw substring for this entry, e.g. "3x5 squat @100kg" */
    val raw: String,
    /** Normalised display name (library name or verbatim if unresolved) */
    val exerciseName: String,
    /** Library exercise ID, null if not found */
    val exerciseId: String?,
    /** Number of sets — defaults to 1 */
    val sets: Int,
    /** Number of reps — null if not specified */
    val reps: Int?,
    /** Weight — null if not specified (bodyweight / unspecified) */
    val weight: Double?,
    /** Weight unit — defaults to "kg" */
    val unit: String,
    /** True if exercise name could not be resolved against the library */
    val isNew: Boolean,
    /**
     * "high"   — exercise + sets + reps + weight all resolved
     * "medium" — exercise resolved, some fields missing
     * "low"    — exercise not resolved or critical parse failure
     */
    val parseConfidence: String,
    /** True when the candidate e1RM exceeds the stored PR. */
    val isPR: Boolean,
    /**
     * Delta between candidate e1RM and stored PR e1RM in kg.
     * Null when isPR is false or no prior PR exists.
     */
    val prDelta: Double?,
)

@Serializable
data class QuickLogParseResult(
    val entries: List<ParsedEntry>,
    /** True if at least one entry has parseConfidence "low" */
    val hasLowConfidence: Boolean,
    /** True if the entire input produced zero usable entries */
    val isEmpty: Boolean,
)

// Internal models used during parsing — not exposed over the JSON boundary.

private data class SetSpec(val sets: Int, val reps: Int)
private data class WeightSpec(val weight: Double, val unit: String)
private data class ResolvedExercise(val id: String, val name: String)

// Used for annotatePRs deserialization
@Serializable
private data class PersonalRecordInput(
    val exerciseId: String,
    val e1RM: Double,
)

// Minimal session shape needed by buildHistorySuggestion
@Serializable
private data class SessionSet(
    val weight: Double? = null,
    val repsCompleted: Int? = null,
    val completed: Boolean? = null,
)

@Serializable
private data class SessionExercise(
    val exerciseName: String,
    val sets: List<SessionSet>,
)

@Serializable
private data class RecentSession(
    val date: String,
    val exercises: List<SessionExercise>,
)

@Serializable
private data class HistorySuggestion(
    val text: String,
    val date: String,
)

// ═══════════════════════════════════════════════════════════════════════════════
// QuickLogParser object
// ═══════════════════════════════════════════════════════════════════════════════

object QuickLogParser {

    private val json = Json { ignoreUnknownKeys = true }

    // ─── Public API ───────────────────────────────────────────────────────────

    /**
     * Parse a full quick-log input string into structured entries.
     *
     * @param input  Raw user input, e.g. "3x5 squat @100kg, 3x8 bench @80"
     * @return JSON-encoded QuickLogParseResult
     */
    fun parseQuickLogInput(input: String): String {
        val trimmed = input.trim()
        if (trimmed.isEmpty()) {
            val empty = QuickLogParseResult(entries = emptyList(), hasLowConfidence = false, isEmpty = true)
            return json.encodeToString(QuickLogParseResult.serializer(), empty)
        }

        // Split on commas, but decimal points must not split ("100.5" stays intact)
        val rawEntries = trimmed
            .split(',')
            .map { it.trim() }
            .filter { it.isNotEmpty() }

        val entries = rawEntries.map { parseEntry(it) }
        val hasLowConfidence = entries.any { it.parseConfidence == "low" }

        val result = QuickLogParseResult(
            entries = entries,
            hasLowConfidence = hasLowConfidence,
            isEmpty = entries.isEmpty(),
        )
        return json.encodeToString(QuickLogParseResult.serializer(), result)
    }

    /**
     * Annotate parsed entries with PR status.
     *
     * Must be called after parseQuickLogInput() once personal records are available.
     * Returns a new JSON array with isPR and prDelta populated.
     *
     * @param entriesJson        JSON array of ParsedEntry from parseQuickLogInput()
     * @param personalRecordsJson JSON array of `[{exerciseId, e1RM}]`
     * @return JSON array of annotated ParsedEntry
     */
    fun annotatePRs(entriesJson: String, personalRecordsJson: String): String {
        val entries = json.decodeFromString<List<ParsedEntry>>(entriesJson)
        val records = json.decodeFromString<List<PersonalRecordInput>>(personalRecordsJson)

        val annotated = entries.map { entry ->
            val exerciseId = entry.exerciseId
            val weight = entry.weight
            val reps = entry.reps

            if (exerciseId == null || weight == null || reps == null) {
                return@map entry
            }

            val candidateE1RM = E1rmService.calculateE1RM(weight, reps)
            val storedBest = records
                .filter { it.exerciseId == exerciseId }
                .maxOfOrNull { it.e1RM }

            if (storedBest == null || candidateE1RM > storedBest) {
                val delta = if (storedBest != null) {
                    round((candidateE1RM - storedBest) * 10.0) / 10.0
                } else null
                entry.copy(isPR = true, prDelta = delta)
            } else {
                entry
            }
        }

        return json.encodeToString(
            kotlinx.serialization.builtins.ListSerializer(ParsedEntry.serializer()),
            annotated,
        )
    }

    /**
     * Build a history-suggestion string from the most recent session.
     *
     * @param recentSessionsJson JSON array of sessions ordered newest-first,
     *                           each with `date` and `exercises[]{exerciseName, sets[]}`
     * @param maxLength          Cap summary at this many characters (default 120)
     * @return JSON-encoded `{text, date}` object, or null JSON string if no history
     */
    fun buildHistorySuggestion(recentSessionsJson: String, maxLength: Int = 120): String? {
        val sessions = json.decodeFromString<List<RecentSession>>(recentSessionsJson)
        if (sessions.isEmpty()) return null

        val latest = sessions[0]
        val parts = mutableListOf<String>()

        for (ex in latest.exercises) {
            val completedSets = ex.sets.filter { it.completed == true }
            if (completedSets.isEmpty()) continue

            val firstSet = completedSets[0]
            val weight = firstSet.weight
            val reps = firstSet.repsCompleted
            val count = completedSets.size

            when {
                weight != null && reps != null -> parts.add("${count}\u00d7${reps} @${weight}kg")
                reps != null -> parts.add("${count}\u00d7${reps}")
            }
        }

        if (parts.isEmpty()) return null

        var text = parts.joinToString(", ")
        if (text.length > maxLength) {
            text = text.take(maxLength - 1) + "\u2026"
        }

        val suggestion = HistorySuggestion(text = text, date = latest.date)
        return json.encodeToString(HistorySuggestion.serializer(), suggestion)
    }

    // ─── Internal tokenizer and parser ───────────────────────────────────────

    /** Split a single entry substring into tokens on whitespace. */
    private fun tokenize(text: String): List<String> =
        text.trim().split(Regex("\\s+")).filter { it.isNotEmpty() }

    /**
     * Parse a "NxN" or "N×N" set-spec token.
     * Constraints: sets 1..99, reps 1..999.
     */
    private fun parseSetSpec(token: String): SetSpec? {
        val match = Regex("^(\\d+)[x\u00d7](\\d+)$", RegexOption.IGNORE_CASE).find(token)
            ?: return null
        val sets = match.groupValues[1].toIntOrNull() ?: return null
        val reps = match.groupValues[2].toIntOrNull() ?: return null
        if (sets < 1 || sets > 99 || reps < 1 || reps > 999) return null
        return SetSpec(sets, reps)
    }

    /**
     * Parse a weight token like "@100kg", "100", "80lbs".
     * Accepts optional leading "@", optional unit suffix.
     */
    private fun parseWeight(token: String): WeightSpec? {
        val cleaned = if (token.startsWith("@")) token.drop(1) else token
        val match = Regex("^(\\d+(?:\\.\\d+)?)(kg|lbs?)?$", RegexOption.IGNORE_CASE).find(cleaned)
            ?: return null
        val weight = match.groupValues[1].toDoubleOrNull() ?: return null
        if (weight < 0.0 || weight > 9999.0) return null
        val unitSuffix = match.groupValues[2]
        val unit = if (Regex("lbs?", RegexOption.IGNORE_CASE).matches(unitSuffix)) "lbs" else "kg"
        return WeightSpec(weight, unit)
    }

    /**
     * Parse a single comma-separated entry like "3x5 squat @100kg".
     *
     * Strategy:
     *   1. Scan tokens left-to-right.
     *   2. If a token matches set-spec (NxN), consume as sets×reps.
     *   3. If a token matches weight (@N / Nkg / Nlbs), consume as weight.
     *   4. Remaining tokens form the exercise name.
     *   5. Late pass: if last name-token is a bare number, treat as weight.
     */
    private fun parseEntry(raw: String): ParsedEntry {
        val tokens = tokenize(raw)

        var sets: Int? = null
        var reps: Int? = null
        var weight: Double? = null
        var unit = "kg"
        val nameTokens = mutableListOf<String>()

        for (token in tokens) {
            // Try set-spec (higher specificity, only on first occurrence)
            if (sets == null && reps == null) {
                val ss = parseSetSpec(token)
                if (ss != null) {
                    sets = ss.sets
                    reps = ss.reps
                    continue
                }
            }

            // Try weight (only if not yet parsed, and token looks weight-like)
            if (weight == null &&
                (token.startsWith("@") || Regex("kg|lbs?$", RegexOption.IGNORE_CASE).containsMatchIn(token))
            ) {
                val wt = parseWeight(token)
                if (wt != null) {
                    weight = wt.weight
                    unit = wt.unit
                    continue
                }
            }

            nameTokens.add(token)
        }

        // Late pass: bare trailing number as weight
        if (weight == null && nameTokens.size > 1) {
            val last = nameTokens.last()
            val maybeWeight = parseWeight(last)
            if (maybeWeight != null) {
                weight = maybeWeight.weight
                unit = maybeWeight.unit
                nameTokens.removeAt(nameTokens.lastIndex)
            }
        }

        val rawExerciseName = nameTokens.joinToString(" ").trim()
        val resolved: ResolvedExercise? = if (rawExerciseName.isNotEmpty()) {
            ExerciseLibrary.resolveExercise(rawExerciseName.lowercase().trim())
                ?.let { ResolvedExercise(it.id, it.name) }
        } else null

        val exerciseName = resolved?.name ?: rawExerciseName
        val exerciseId = resolved?.id
        val isNew = resolved == null

        val parseConfidence = when {
            rawExerciseName.isEmpty() -> "low"
            isNew -> "low"
            reps == null && weight == null -> "medium"
            reps != null && weight != null -> "high"
            else -> "medium"
        }

        return ParsedEntry(
            raw = raw,
            exerciseName = exerciseName,
            exerciseId = exerciseId,
            sets = sets ?: 1,
            reps = reps,
            weight = weight,
            unit = unit,
            isNew = isNew,
            parseConfidence = parseConfidence,
            isPR = false,
            prDelta = null,
        )
    }
}
