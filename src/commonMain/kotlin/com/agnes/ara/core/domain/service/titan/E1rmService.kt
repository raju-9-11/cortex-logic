package com.agnes.ara.core.domain.service.titan

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlin.math.round

// ═══════════════════════════════════════════════════════════════════════════════
// IO Types (JSON boundary)
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
data class PRSet(
    val exerciseName: String,
    val weightKg: Double,
    val reps: Int,
)

@Serializable
data class PRResult(
    val exerciseName: String,
    val isNewPR: Boolean,
    val previousE1RM: Double?,
    val newE1RM: Double,
)

@Serializable
data class PRComputeOutput(
    val updatedPRs: Map<String, Double>,
    val results: List<PRResult>,
)

@Serializable
data class PersonalRecordEntry(
    val exerciseId: String,
    val e1RM: Double,
)

// ═══════════════════════════════════════════════════════════════════════════════
// E1rmService — Epley e1RM + session PR computation
// ═══════════════════════════════════════════════════════════════════════════════

object E1rmService {

    private val json = Json { ignoreUnknownKeys = true }

    /** Epley formula: weight × (1 + reps / 30). Returns weight unchanged for 1-rep sets. */
    fun calculateE1RM(weight: Double, reps: Int): Double {
        if (reps == 1) return weight
        return round(weight * (1.0 + reps / 30.0) * 10.0) / 10.0
    }

    /**
     * Computes session PRs from a list of sets and existing PR map.
     * @param setsJson JSON array of PRSet
     * @param existingPRsJson JSON object `{ "exercise_name_lowercase": e1rm }`
     * @return JSON-serialized PRComputeOutput
     */
    fun computeSessionPRs(setsJson: String, existingPRsJson: String): String {
        val sets = json.decodeFromString<List<PRSet>>(setsJson)
        val existingPRs = json.decodeFromString<Map<String, Double>>(existingPRsJson)
        val updatedPRs = existingPRs.toMutableMap()
        val resultsMap = linkedMapOf<String, PRResult>()

        for (set in sets) {
            val key = set.exerciseName.lowercase()
            val newE1RM = calculateE1RM(set.weightKg, set.reps)

            val current = resultsMap[key]
            if (current == null) {
                resultsMap[key] = PRResult(
                    exerciseName = set.exerciseName,
                    isNewPR = false,
                    previousE1RM = existingPRs[key],
                    newE1RM = newE1RM,
                )
            } else if (newE1RM > current.newE1RM) {
                resultsMap[key] = current.copy(newE1RM = newE1RM)
            }
        }

        val results = resultsMap.map { (key, result) ->
            val isNew = result.previousE1RM == null || result.newE1RM > result.previousE1RM
            if (isNew) updatedPRs[key] = result.newE1RM
            result.copy(isNewPR = isNew)
        }

        return json.encodeToString(PRComputeOutput.serializer(), PRComputeOutput(updatedPRs, results))
    }

    /**
     * Returns the best (highest) e1RM for an exercise from an array of personal records.
     * @param recordsJson JSON array of PersonalRecordEntry
     * @return best e1RM or -1.0 if no match
     */
    fun getBestE1RM(recordsJson: String, exerciseId: String): Double {
        val records = json.decodeFromString<List<PersonalRecordEntry>>(recordsJson)
        return records
            .filter { it.exerciseId == exerciseId }
            .maxOfOrNull { it.e1RM } ?: -1.0
    }
}
