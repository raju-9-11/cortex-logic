package com.agnes.ara.core.engine

/**
 * A single streaming delta emitted to TypeScript during a [CognitiveEngineJs.chat] call.
 *
 * Only primitive types are used — no `List<>` or `Map<>` — so this class can be
 * safely annotated with [@JsExport] without restriction.
 *
 * @param delta             Incremental public text since the previous chunk.
 * @param isThinking        True while the model has an unclosed `<thought>` block.
 * @param isActing          True while the model has an unclosed `<action>` block.
 * @param currentActionType The `type` attribute of the in-progress `<action>` tag, or null.
 */
@JsExport
data class StreamChunkJs(
    val delta: String,
    val isThinking: Boolean,
    val isActing: Boolean,
    val currentActionType: String? = null
)

/**
 * The fully-resolved response delivered once after all streaming chunks are exhausted.
 *
 * Actions and mutations are serialized as JSON strings rather than typed arrays
 * because `Array<T>` with complex element types is not consistently JS-exportable
 * across all Kotlin/JS IR configurations.
 *
 * TypeScript callers should `JSON.parse(actionsJson)` to hydrate the arrays.
 *
 * @param content       Final cleaned public text (mutation tags and thought tags stripped).
 * @param thoughts      The agent's internal reasoning, or null if none was emitted.
 * @param actionsJson   JSON array string of `{type: string, payload: string}` objects.
 * @param mutationsJson JSON array string of `{vector: string, delta: number}` objects.
 */
@JsExport
data class FinalResponseJs(
    val content: String,
    val thoughts: String? = null,
    val actionsJson: String = "[]",
    val mutationsJson: String = "[]"
)
