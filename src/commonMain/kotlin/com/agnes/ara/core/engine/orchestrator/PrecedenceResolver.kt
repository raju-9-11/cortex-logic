package com.agnes.ara.core.engine.orchestrator

import com.agnes.ara.core.domain.model.AgentSource
import com.agnes.ara.core.domain.services.SpineEvent
import kotlinx.datetime.Clock

/**
 * Resolves conflicts between competing SpineEvents targeting the same GlobalSoul vector.
 *
 * Precedence hierarchy (lower int = higher authority):
 *   Agnes(1) > Atlas(2) > Soma(3) > Titan(4) > Ledger(5) > Scout(6) > Forge(7)
 *
 * When two events mutate the same vector within the collision window:
 * - Higher-authority agent's event executes as-is
 * - Lower-authority agent's event is downgraded: requiresApproval = true
 *
 * Complexity: O(v × p) per call, where v = vectors in incoming event, p = pending mutations.
 * The pending list is bounded by COLLISION_WINDOW_MS, keeping p small in practice.
 */
class PrecedenceResolver {

    private data class PendingMutation(
        val vector: String,
        val source: AgentSource,
        val registeredAt: Long
    )

    private val pendingMutations = mutableListOf<PendingMutation>()
    private val COLLISION_WINDOW_MS = 500L

    /**
     * Evaluate a [SpineEvent] against currently pending mutations.
     *
     * Returns the event unchanged if no collision exists, or with
     * [SpineLogicGates.requiresApproval] forced to `true` when this event's
     * source loses a precedence conflict over any mutated vector.
     *
     * @param event The incoming SpineEvent to evaluate.
     * @return The (possibly downgraded) SpineEvent. Never null — suppression is
     *         achieved by the [requiresApproval] flag, not by dropping the event.
     */
    fun evaluate(event: SpineEvent): SpineEvent {
        val now = Clock.System.now().toEpochMilliseconds()

        // Prune stale pending mutations outside the collision window
        pendingMutations.removeAll { now - it.registeredAt > COLLISION_WINDOW_MS }

        val incomingSource = AgentSource.fromId(event.header.source)
        val incomingVectors = event.payload.mutations.map { it.vector }

        // Check each mutated vector for collisions
        var requiresApprovalOverride = event.logicGates.requiresApproval
        for (vector in incomingVectors) {
            val collision = pendingMutations.firstOrNull { it.vector == vector }
            if (collision != null) {
                if (collision.source.precedence < incomingSource.precedence) {
                    // Existing claim has higher authority — downgrade incoming to proposal
                    requiresApprovalOverride = true
                } else {
                    // Incoming event wins — evict the lower-authority pending claim
                    pendingMutations.removeAll { it.vector == vector }
                }
            }
        }

        // Register this event's mutations as pending for subsequent arrivals
        incomingVectors.forEach { vector ->
            pendingMutations.add(PendingMutation(vector, incomingSource, now))
        }

        return if (requiresApprovalOverride && !event.logicGates.requiresApproval) {
            event.copy(logicGates = event.logicGates.copy(requiresApproval = true))
        } else {
            event
        }
    }

    /** Flush all pending mutation state. Useful for test teardown and scope resets. */
    fun clear() = pendingMutations.clear()
}
