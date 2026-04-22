package com.agnes.ara.core.domain.services.titan

import com.agnes.ara.core.domain.models.ExerciseLibraryEntry

data class ParsedEntry(
    val raw: String,
    val exerciseName: String,
    val exerciseId: String?,
    val sets: Int,
    val reps: Int?,
    val weight: Double?,
    val unit: String, // "kg" or "lbs"
    val isNew: Boolean,
    val parseConfidence: ParseConfidence,
    var isPR: Boolean = false,
    var prDelta: Double? = null
)

enum class ParseConfidence {
    HIGH, MEDIUM, LOW
}

data class QuickLogParseResult(
    val entries: List<ParsedEntry>,
    val hasLowConfidence: Boolean,
    val isEmpty: Boolean
)

class TitanQuickLogParser(
    private val exerciseService: TitanExerciseService
) {

    fun parseQuickLogInput(input: String): QuickLogParseResult {
        val trimmed = input.trim()
        if (trimmed.isEmpty()) {
            return QuickLogParseResult(emptyList(), hasLowConfidence = false, isEmpty = true)
        }

        // Split on commas
        val rawEntries = trimmed.split(",").map { it.trim() }.filter { it.isNotEmpty() }
        val entries = rawEntries.map { parseEntry(it) }
        
        val hasLowConfidence = entries.any { it.parseConfidence == ParseConfidence.LOW }
        
        return QuickLogParseResult(entries, hasLowConfidence, entries.isEmpty())
    }

    private fun parseEntry(raw: String): ParsedEntry {
        val tokens = tokenize(raw)

        var sets: Int? = null
        var reps: Int? = null
        var weight: Double? = null
        var unit = "kg"
        val nameTokens = mutableListOf<String>()

        val remainingTokens = tokens.toMutableList()
        val iterator = remainingTokens.iterator()

        while (iterator.hasNext()) {
            val token = iterator.next()

            // Try set-spec first (NxN)
            if (sets == null && reps == null) {
                val ss = parseSetSpec(token)
                if (ss != null) {
                    sets = ss.first
                    reps = ss.second
                    iterator.remove()
                    continue
                }
            }

            // Try weight (@N or Nkg/lbs)
            if (weight == null && (token.startsWith("@") || token.matches(Regex(".*(kg|lbs?)$", RegexOption.IGNORE_CASE)))) {
                val wt = parseWeight(token)
                if (wt != null) {
                    weight = wt.first
                    unit = wt.second
                    iterator.remove()
                    continue
                }
            }
            
            // If not consumed, keep for name
            nameTokens.add(token)
        }

        // Late pass: if last name-token is a bare number and weight is still null
        if (weight == null && nameTokens.size > 1) {
            val lastToken = nameTokens.last()
            val maybeWeight = parseWeight(lastToken)
            if (maybeWeight != null) {
                weight = maybeWeight.first
                unit = maybeWeight.second
                nameTokens.removeAt(nameTokens.size - 1)
            }
        }

        val rawExerciseName = nameTokens.joinToString(" ").trim()
        val resolved = exerciseService.matchExerciseName(rawExerciseName)

        val exerciseName = resolved?.name ?: rawExerciseName
        val exerciseId = resolved?.id
        val isNew = resolved == null

        val parseConfidence = when {
            rawExerciseName.isBlank() -> ParseConfidence.LOW
            isNew || (reps == null && weight == null) -> if (isNew) ParseConfidence.LOW else ParseConfidence.MEDIUM
            reps != null && weight != null -> ParseConfidence.HIGH
            else -> ParseConfidence.MEDIUM
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
            parseConfidence = parseConfidence
        )
    }

    private fun tokenize(text: String): List<String> {
        return text.trim().split(Regex("\\s+")).filter { it.isNotEmpty() }
    }

    private fun parseSetSpec(token: String): Pair<Int, Int>? {
        val match = Regex("^(\\d+)[x×](\\d+)$", RegexOption.IGNORE_CASE).find(token)
        if (match != null) {
            val (s, r) = match.destructured
            val sets = s.toIntOrNull() ?: return null
            val reps = r.toIntOrNull() ?: return null
            if (sets !in 1..99 || reps !in 1..999) return null
            return sets to reps
        }
        return null
    }

    private fun parseWeight(token: String): Pair<Double, String>? {
        val cleaned = token.replace(Regex("^@"), "")
        val match = Regex("^(\\d+(?:\\.\\d+)?)(kg|lbs?)?$", RegexOption.IGNORE_CASE).find(cleaned)
        if (match != null) {
            val (w, u) = match.destructured
            val weight = w.toDoubleOrNull() ?: return null
            if (weight < 0 || weight > 9999) return null
            val unit = if (u.matches(Regex("lbs?", RegexOption.IGNORE_CASE))) "lbs" else "kg"
            return weight to unit
        }
        return null
    }
}
