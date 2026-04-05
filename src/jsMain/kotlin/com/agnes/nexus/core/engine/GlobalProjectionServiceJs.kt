package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.service.GlobalProjectionService
import kotlin.js.JsExport

@JsExport
class GlobalProjectionServiceJs {

    /**
     * Compute a weighted 0-100 wellness score from an NSV JSON string.
     * @param nsvJson Serialised NeuralStateVector.
     */
    fun computeOverallWellness(nsvJson: String): Int =
        GlobalProjectionService.computeOverallWellness(nsvJson)

    /**
     * Build Firestore dot-path update payload for cross-functional NSV state.
     * @param patchJson  Serialised NeuralStateVectorPatch.
     * @param timestamp  ISO 8601 timestamp string.
     * @return JSON object string of dot-notation Firestore paths → values.
     */
    fun buildNSVUpdatePayload(patchJson: String, timestamp: String): String =
        GlobalProjectionService.buildNSVUpdatePayload(patchJson, timestamp)
}
