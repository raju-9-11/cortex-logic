package com.agnes.ara.core.domain.service.agnes

import com.agnes.ara.core.domain.models.BeliefGraph
import com.agnes.ara.core.domain.models.BeliefNode
import kotlinx.datetime.Clock
import kotlin.math.pow

/**
 * Half-Life Engine for Belief Graph node decay.
 *
 * Passive decay formula: intensity *= 0.5 ^ (daysSinceLastTriggered / halfLifeDays)
 * Nodes with intensity < 0.05 after decay are stripped from the active NSV
 * (but retained in storage for the monthly Psychological Audit).
 */
class HalfLifeEngine {

    companion object {
        const val STRIP_THRESHOLD = 0.05f
    }

    /**
     * Apply half-life decay to all belief nodes.
     * Returns a pair: (decayed graph, list of stripped node IDs).
     *
     * Time complexity: O(n + e) where n = nodes, e = edges.
     * Space complexity: O(n + e) for the rebuilt graph.
     */
    fun decay(graph: BeliefGraph): Pair<BeliefGraph, List<String>> {
        val now = Clock.System.now().toEpochMilliseconds()
        val stripped = mutableListOf<String>()

        val decayed = graph.nodes.map { node ->
            val decayedIntensity = computeDecay(node, now)
            node.copy(intensity = decayedIntensity)
        }

        val active = decayed.filter { node ->
            if (node.intensity < STRIP_THRESHOLD) {
                stripped.add(node.id)
                false
            } else true
        }

        // Prune edges whose endpoints were stripped — maintains graph consistency
        val activeIds = active.map { it.id }.toSet()
        val prunedEdges = graph.edges.filter { e ->
            e.from in activeIds && e.to in activeIds
        }

        return Pair(graph.copy(nodes = active, edges = prunedEdges), stripped)
    }

    /**
     * Mark a belief node as triggered (resets lastTriggeredAt, applies intensity boost).
     * Boost is clamped to [0, 1] to prevent overflow.
     */
    fun trigger(node: BeliefNode, intensityBoost: Float = 0.2f): BeliefNode {
        val boosted = (node.intensity + intensityBoost).coerceIn(0f, 1f)
        return node.copy(
            intensity = boosted,
            lastTriggeredAt = Clock.System.now().toEpochMilliseconds()
        )
    }

    /**
     * Compute decayed intensity for a single node.
     * If lastTriggeredAt is null the node has never been activated — intensity unchanged.
     *
     * Formula: decayedIntensity = intensity × 0.5^(daysSince / halfLifeDays)
     */
    private fun computeDecay(node: BeliefNode, nowMs: Long): Float {
        val lastTriggered = node.lastTriggeredAt ?: return node.intensity
        val daysSince = (nowMs - lastTriggered) / (1000.0 * 60 * 60 * 24)
        val halfLife = node.halfLifeDays.toDouble()
        val decayFactor = 0.5.pow(daysSince / halfLife).toFloat()
        return (node.intensity * decayFactor).coerceIn(0f, 1f)
    }
}
