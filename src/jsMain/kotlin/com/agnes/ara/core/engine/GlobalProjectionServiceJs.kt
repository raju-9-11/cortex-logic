package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.service.GlobalProjectionService
import kotlin.js.JsExport

/**
 * JS facade for [GlobalProjectionService].
 *
 * ## Why only two methods?
 * [GlobalProjectionService] is a **pure-computation object** — it contains no I/O, no
 * Firestore access, and no coroutines. Its two methods perform deterministic calculations
 * from JSON strings and return a result immediately. This makes them safe to expose as
 * synchronous JS functions without any callback wrapper.
 *
 * All Firestore operations that involve a GlobalProjection document (getProjection,
 * updateCrossFunctionalState, syncFromProfile, approveSoulWrite, etc.) are intentionally
 * implemented in the agnes TypeScript layer (`src/lib/services/global-projection-service.ts`).
 * They depend on the Firebase SDK, the vault encryption key, and the agnes data layer — all
 * platform-specific concerns that belong in TS, not in shared KMP code.
 *
 * Do NOT add Firestore-backed methods here. Extend the TS service instead.
 */
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
