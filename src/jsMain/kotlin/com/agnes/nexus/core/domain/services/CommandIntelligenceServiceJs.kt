package com.agnes.nexus.core.domain.services

import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import kotlinx.datetime.Clock
import kotlinx.datetime.Instant
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime
import kotlinx.serialization.json.*

/**
 * JS-facing bridge that exposes the KMP [CommandIntelligenceService] to
 * TypeScript/React callers.
 *
 * ## Contract
 * Every public method returns a JSON string rather than a Kotlin data class so
 * that it satisfies `@JsExport` constraints (no generic `List<>` or `Map<>`
 * types may cross the Kotlin/JS IR boundary directly).
 *
 * ## Usage from TypeScript
 * ```ts
 * import { CommandIntelligenceServiceJs } from 'cortex-logic'
 * const svc = new CommandIntelligenceServiceJs()
 * const envelope = JSON.parse(svc.parse("plan my day", "agnes", "2024-01-15", "America/New_York"))
 * ```
 *
 * ## Threading model
 * [parse] is fully synchronous — no coroutines, no IO.  It is safe to call on
 * the JS event loop without a callback wrapper.
 */
@OptIn(DelicateCoroutinesApi::class)
@JsExport
class CommandIntelligenceServiceJs {

    /**
     * Parse a raw input string (phase 1 — fully deterministic, synchronous).
     *
     * @param rawInput       The raw user input text.
     * @param sourceModuleId The module that received the input (e.g. `"agnes"`).
     * @param nowIso         ISO 8601 date string for "now" (e.g. `"2024-01-15"`).
     *                       Pass `""` to use the current UTC date.
     * @param timezone       IANA timezone string (e.g. `"America/New_York"`).
     *                       Pass `""` for UTC.
     * @return JSON-encoded [ParsedCommandEnvelope].
     */
    fun parse(
        rawInput: String,
        sourceModuleId: String,
        nowIso: String = "",
        timezone: String = ""
    ): String {
        val envelope = CommandIntelligenceService.parse(rawInput, sourceModuleId, nowIso, timezone)
        return serializeEnvelope(envelope)
    }

    /**
     * Phase 1 + LLM-enhanced parse. Falls back to phase 1 if [generateJson] is null
     * or if the LLM call fails.
     *
     * @param generateJson  JS callback that accepts `(prompt, systemPrompt, onComplete, onError)`.
     *                      Agnes wires this to `kmpEngine.generateText()`. Pass `null` to skip LLM.
     * @param onComplete    Called with JSON-encoded [ParsedCommandEnvelope].
     * @param onError       Called with an error message string.
     */
    fun parseWithLlm(
        rawInput: String,
        sourceModuleId: String,
        nowIso: String = "",
        timezone: String = "",
        generateJson: ((prompt: String, systemPrompt: String, onComplete: (String) -> Unit, onError: (String) -> Unit) -> Unit)?,
        onComplete: (String) -> Unit,
        onError: (String) -> Unit
    ) {
        val nowInstant: Instant = if (nowIso.isBlank()) {
            Clock.System.now()
        } else {
            runCatching { Instant.parse(nowIso) }.getOrElse { Clock.System.now() }
        }

        val generateJsonSuspend: (suspend (String, String) -> JsonObject?)? = if (generateJson != null) {
            { prompt, systemPrompt ->
                kotlinx.coroutines.suspendCancellableCoroutine { cont ->
                    generateJson(prompt, systemPrompt,
                        { text ->
                            val obj = try { Json.parseToJsonElement(text).jsonObject } catch (_: Exception) { null }
                            cont.resumeWith(Result.success(obj))
                        },
                        { _ -> cont.resumeWith(Result.success(null)) }
                    )
                }
            }
        } else null

        GlobalScope.launch {
            try {
                val envelope = CommandIntelligenceService.parseWithLlm(
                    rawInput = rawInput,
                    sourceModuleId = sourceModuleId,
                    timezone = timezone,
                    now = nowInstant,
                    generateJson = generateJsonSuspend
                )
                onComplete(serializeEnvelope(envelope))
            } catch (e: Throwable) {
                onError(e.message ?: "Command parse failed")
            }
        }
    }
}

// ── Private serialisation ─────────────────────────────────────────────────────

/**
 * Serialises a [ParsedCommandEnvelope] to a JSON string using
 * [kotlinx.serialization.json.buildJsonObject].
 *
 * Each nested type is serialised inline rather than relying on
 * `@Serializable` annotations, keeping the data classes free of
 * serialisation annotations and the commonMain module free of any
 * `kotlinx-serialization-json` plugin requirement beyond what is already
 * present for [CognitiveEngineJs].
 *
 * Time: O(i + t + h + m) where i = number of intents, t = temporal references,
 * h = shared route hints, m = mentions.
 */
private fun serializeEnvelope(envelope: ParsedCommandEnvelope): String =
    buildJsonObject {
        put("rawInput", envelope.rawInput)
        put("normalizedInput", envelope.normalizedInput)
        put("parserVersion", envelope.parserVersion)
        put("parserMode", envelope.parserMode)
        put("sourceModuleId", envelope.sourceModuleId)
        put("generatedAt", envelope.generatedAt)
        put("timezone", envelope.timezone)
        put("confidence", envelope.confidence)
        put("requiresClarification", envelope.requiresClarification)

        put("intents", buildJsonArray {
            envelope.intents.forEach { intent ->
                add(buildJsonObject {
                    put("id", intent.id)
                    put("rawSegment", intent.rawSegment)
                    put("intentType", intent.intentType)
                    put("verb", intent.verb)
                    put("mutatesState", intent.mutatesState)
                    put("confidence", intent.confidence)

                    put("capabilities", buildJsonArray {
                        intent.capabilities.forEach { add(it) }
                    })
                    put("candidateModules", buildJsonArray {
                        intent.candidateModules.forEach { add(it) }
                    })
                    put("routeHints", buildJsonArray {
                        intent.routeHints.forEach { hint ->
                            add(serializeRouteHint(hint))
                        }
                    })
                    put("dependsOn", buildJsonArray {
                        intent.dependsOn.forEach { add(it) }
                    })
                    put("entities", buildJsonObject {
                        intent.entities.title?.let { put("title", it) }
                        intent.entities.status?.let { put("status", it) }
                        intent.entities.dateText?.let { put("dateText", it) }
                        intent.entities.timeText?.let { put("timeText", it) }
                    })
                    put("temporal", buildJsonArray {
                        intent.temporal.forEach { ref ->
                            add(serializeTimeReference(ref))
                        }
                    })
                })
            }
        })

        put("temporalReferences", buildJsonArray {
            envelope.temporalReferences.forEach { ref ->
                add(serializeTimeReference(ref))
            }
        })

        put("sharedRouteHints", buildJsonArray {
            envelope.sharedRouteHints.forEach { hint ->
                add(serializeRouteHint(hint))
            }
        })

        put("mentions", buildJsonArray {
            envelope.mentions?.forEach { mention ->
                add(buildJsonObject {
                    put("moduleId", mention.moduleId)
                    put("raw", mention.raw)
                    put("confidence", mention.confidence)
                    put("disposition", mention.disposition)
                })
            }
        })

        put("mentionedModuleIds", buildJsonArray {
            envelope.mentionedModuleIds?.forEach { add(it) }
        })

        put("ambiguityReasons", buildJsonArray {
            envelope.ambiguityReasons.forEach { add(it) }
        })
    }.toString()

private fun serializeRouteHint(hint: ParsedCommandRouteHint) =
    buildJsonObject {
        put("moduleId", hint.moduleId)
        put("confidence", hint.confidence)
        put("reason", hint.reason)
        put("source", hint.source)
    }

private fun serializeTimeReference(ref: ParsedCommandTimeReference) =
    buildJsonObject {
        put("raw", ref.raw)
        put("kind", ref.kind)
        put("timezone", ref.timezone)
        ref.isoDate?.let { put("isoDate", it) }
        ref.isoDateTime?.let { put("isoDateTime", it) }
        ref.time24?.let { put("time24", it) }
        ref.relation?.let { put("relation", it) }
    }
