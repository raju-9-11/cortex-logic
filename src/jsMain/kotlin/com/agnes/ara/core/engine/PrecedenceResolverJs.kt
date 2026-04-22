package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.model.AgentSource
import kotlinx.datetime.Clock
import kotlin.js.JsExport

/**
 * JS-safe wrapper for PrecedenceResolver — stateful, time-windowed conflict resolution.
 *
 * Instead of passing full SpineEvent objects across the JS boundary, this accepts
 * flat primitives and returns a decision on whether requiresApproval should be set.
 */
@JsExport
class PrecedenceResolverJs {

    private data class PendingMutation(
        val vector: String,
        val sourcePrecedence: Int,
        val registeredAt: Long,
    )

    private val pendingMutations = mutableListOf<PendingMutation>()
    private val COLLISION_WINDOW_MS = 500L

    private val PRECEDENCE_MAP = mapOf(
        "system" to 0,
        "agnes" to 1,
        "atlas" to 2,
        "soma" to 3,
        "titan" to 4,
        "ledger" to 5,
        "scout" to 6,
        "forge" to 7,
        "nexus" to 99,
    )

    /**
     * Evaluate an event's mutations against pending state.
     *
     * @param source module ID (e.g. "agnes", "titan")
     * @param mutationVectorsJson JSON array of vector strings (e.g. `["emotional.stressLoad"]`)
     * @param currentlyRequiresApproval whether the event already has requiresApproval = true
     * @return true if requiresApproval should be set (downgraded), false otherwise
     */
    fun evaluate(
        source: String,
        mutationVectorsJson: String,
        currentlyRequiresApproval: Boolean,
    ): Boolean {
        val now = Clock.System.now().toEpochMilliseconds()

        // Prune stale pending mutations
        pendingMutations.removeAll { now - it.registeredAt > COLLISION_WINDOW_MS }

        val incomingPrecedence = PRECEDENCE_MAP[source.lowercase()] ?: 99
        val vectors = try {
            kotlinx.serialization.json.Json.decodeFromString<List<String>>(mutationVectorsJson)
        } catch (_: Exception) {
            return currentlyRequiresApproval
        }

        var requiresApproval = currentlyRequiresApproval
        for (vector in vectors) {
            val collision = pendingMutations.firstOrNull { it.vector == vector }
            if (collision != null) {
                if (collision.sourcePrecedence < incomingPrecedence) {
                    requiresApproval = true
                } else {
                    pendingMutations.removeAll { it.vector == vector }
                }
            }
        }

        // Register this event's mutations as pending
        for (vector in vectors) {
            pendingMutations.add(PendingMutation(vector, incomingPrecedence, now))
        }

        return requiresApproval
    }

    /** Flush all pending mutation state. */
    fun clear() = pendingMutations.clear()
}
