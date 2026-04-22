package com.agnes.ara.core.engine

import kotlinx.serialization.json.*

/**
 * Pure guest quota computation — stateless helper.
 *
 * Agnes holds the quota state (localStorage / sessionStorage). This service
 * performs the increment and validation logic so the same rules can later be
 * enforced server-side when cortex-logic moves to a server.
 */
@JsExport
class GuestQuotaServiceJs {

    private val maxTurns = 10
    private val json = Json { ignoreUnknownKeys = true }

    /** Returns a default quota JSON string (0 turns used). */
    fun getDefault(): String = buildQuotaJson(turnsUsed = 0, isLocked = false)

    /** Increments the turn count from [currentJson] and returns the updated quota JSON. */
    fun computeNext(currentJson: String): String {
        val current = try { json.parseToJsonElement(currentJson).jsonObject } catch (_: Exception) { null }
        val turns = current?.get("totalTurnsUsed")?.jsonPrimitive?.intOrNull ?: 0
        val next = turns + 1
        return buildQuotaJson(turnsUsed = next, isLocked = next >= maxTurns)
    }

    /** Returns true when the guest has turns remaining. */
    fun canProceed(currentJson: String): Boolean {
        val current = try { json.parseToJsonElement(currentJson).jsonObject } catch (_: Exception) { null }
        val turns = current?.get("totalTurnsUsed")?.jsonPrimitive?.intOrNull ?: 0
        return turns < maxTurns
    }

    fun getMaxTurns(): Int = maxTurns

    // ── Private ───────────────────────────────────────────────────────────────

    private fun buildQuotaJson(turnsUsed: Int, isLocked: Boolean): String =
        json.encodeToString(JsonObject.serializer(), JsonObject(mapOf(
            "totalTurnsUsed" to JsonPrimitive(turnsUsed),
            "maxTurnsAllowed" to JsonPrimitive(maxTurns),
            "isHardLocked" to JsonPrimitive(isLocked),
        )))
}
