package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.service.titan.E1rmService
import kotlin.js.JsExport

@JsExport
class E1rmServiceJs {

    /** Epley formula: weight × (1 + reps / 30). Returns weight unchanged for 1-rep sets. */
    fun calculateE1RM(weight: Double, reps: Int): Double =
        E1rmService.calculateE1RM(weight, reps)

    /**
     * Computes session PRs from a list of sets and existing PR map.
     * @param setsJson JSON array of `[{exerciseName, weightKg, reps}]`
     * @param existingPRsJson JSON object `{"exercise_name_lowercase": e1rm}`
     * @return JSON-serialized `{updatedPRs, results}` object
     */
    fun computeSessionPRs(setsJson: String, existingPRsJson: String): String =
        E1rmService.computeSessionPRs(setsJson, existingPRsJson)

    /**
     * Returns the best e1RM for an exercise from a personal records array.
     * @param recordsJson JSON array of `[{exerciseId, e1RM}]`
     * @return best e1RM or -1.0 if no match
     */
    fun getBestE1RM(recordsJson: String, exerciseId: String): Double =
        E1rmService.getBestE1RM(recordsJson, exerciseId)
}
