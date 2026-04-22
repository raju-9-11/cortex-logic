package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.models.NeuralStateVector
import kotlinx.serialization.json.Json

/**
 * JS-exportable wrapper for [NeuralStateVector].
 *
 * [NeuralStateVector] cannot be directly `@JsExport`-ed because it contains
 * `Map<String, String>` fields and nested `List<String>` fields which are not
 * safely expressible at the JS/TypeScript boundary.
 *
 * This class accepts the NSV as a JSON string (from Firestore or the TypeScript
 * state layer) and deserialises it on the Kotlin side, making the result safe
 * to pass into KMP functions that require [NeuralStateVector].
 *
 * ## Usage from TypeScript
 * ```ts
 * import { NeuralStateVectorJs } from 'cortex-logic'
 * const nsv = new NeuralStateVectorJs(JSON.stringify(globalProjection.crossFunctionalState))
 * const prompt = factory.assemble("agnes", identity, nsv)
 * ```
 *
 * ## Empty / null handling
 * Passing an empty string, `"{}"`, or malformed JSON produces a default
 * [NeuralStateVector] with all fields null — equivalent to `NeuralStateVector()`.
 *
 * @param nsvJson  JSON-serialised [NeuralStateVector].  Pass `"{}"` or `""` for defaults.
 */
@JsExport
class NeuralStateVectorJs(nsvJson: String = "{}") {

    internal val nsv: NeuralStateVector = parseOrDefault(nsvJson)

    private companion object {
        private val lenientJson = Json { ignoreUnknownKeys = true; coerceInputValues = true }

        fun parseOrDefault(json: String): NeuralStateVector {
            if (json.isBlank() || json == "{}") return NeuralStateVector()
            return try {
                lenientJson.decodeFromString<NeuralStateVector>(json)
            } catch (_: Exception) {
                NeuralStateVector()
            }
        }
    }
}
