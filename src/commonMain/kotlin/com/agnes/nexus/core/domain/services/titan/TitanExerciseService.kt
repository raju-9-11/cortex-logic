package com.agnes.nexus.core.domain.services.titan

import com.agnes.nexus.core.domain.models.ExerciseLibraryEntry
import kotlinx.serialization.json.Json

class TitanExerciseService(
    private val jsonContent: String // Injected JSON string for now, platform-specific loader later
) {
    private val library: List<ExerciseLibraryEntry> by lazy {
        try {
            Json { ignoreUnknownKeys = true }.decodeFromString(jsonContent)
        } catch (e: Exception) {
            emptyList()
        }
    }

    /**
     * Computes trigram similarity between two strings, normalized to [0, 1].
     */
    private fun trigramSimilarity(a: String, b: String): Double {
        val normalize = { s: String ->
            s.lowercase().replace(Regex("[^a-z0-9 ]"), "").trim()
        }

        val na = normalize(a)
        val nb = normalize(b)

        if (na == nb) return 1.0
        if (na.length < 2 || nb.length < 2) return 0.0

        val trigrams = { s: String ->
            val set = mutableSetOf<String>()
            val padded = "  $s  "
            for (i in 0 until padded.length - 2) {
                set.add(padded.substring(i, i + 3))
            }
            set
        }

        val ta = trigrams(na)
        val tb = trigrams(nb)

        var intersection = 0
        for (t in ta) {
            if (tb.contains(t)) intersection++
        }

        return (2.0 * intersection) / (ta.size + tb.size)
    }

    /**
     * Find the best matching exercise in the library for a free-text name.
     */
    fun matchExerciseName(name: String): ExerciseLibraryEntry? {
        if (name.isBlank()) return null

        var best: ExerciseLibraryEntry? = null
        var bestScore = 0.3 // minimum threshold

        for (entry in library) {
            val candidates = listOf(entry.name) + entry.aliases
            for (candidate in candidates) {
                val score = trigramSimilarity(name, candidate)
                if (score > bestScore) {
                    bestScore = score
                    best = entry
                }
            }
        }

        return best
    }

    fun getExercisesByMuscle(muscle: String): List<ExerciseLibraryEntry> {
        val m = muscle.lowercase()
        return library.filter { e ->
            e.primaryMuscles.any { it.lowercase().contains(m) } ||
            e.secondaryMuscles.any { it.lowercase().contains(m) }
        }
    }
}
