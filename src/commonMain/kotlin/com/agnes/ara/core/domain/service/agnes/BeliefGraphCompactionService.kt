package com.agnes.ara.core.domain.service.agnes

import com.agnes.ara.core.domain.models.BeliefEdge
import com.agnes.ara.core.domain.models.BeliefGraph
import com.agnes.ara.core.domain.models.BeliefNode
import com.agnes.ara.core.engine.LlmJsonGenerator
import com.agnes.ara.core.platform.generateUuid
import kotlinx.serialization.Serializable
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.json.Json

/**
 * Pure domain service for belief-graph normalization, compaction (dedup), and merging.
 *
 * Ported from the TS `belief-graph-service.ts` and `belief-graph-workflow-service.ts`.
 *
 * **Intensity range**: This service operates in the **0–10** range used by the
 * web-layer data model. This differs from [HalfLifeEngine] which uses 0–1. The
 * JS adapter passes TS values through without conversion; a future unification
 * can reconcile the ranges when KMP becomes the authoritative data layer.
 */
class BeliefGraphCompactionService {

    companion object {
        /** Default node cap for the compaction pipeline. */
        const val DEFAULT_COMPACT_NODE_LIMIT = 60

        /** Hard cap for [mergeGraphs]. */
        const val MAX_MERGE_NODE_LIMIT = 80

        private const val DEFAULT_INTENSITY = 5.0f
        private const val MIN_INTENSITY = 0.0f
        private const val MAX_INTENSITY = 10.0f

        private val json = Json { ignoreUnknownKeys = true }
    }

    // ══════════════════════════════════════════════════════════════════════════
    // Phase 3 — normalizeBeliefGraph
    // ══════════════════════════════════════════════════════════════════════════

    /**
     * Normalize a belief graph, ensuring every field has a valid value.
     * Returns an empty graph if [graph] is null.
     *
     * Matches the TS `normalizeBeliefGraph(raw)` semantics:
     * - Clamps intensity to 0–10.
     * - Trims labels, defaults missing IDs to `belief_<index>`.
     * - Preserves timestamps or defaults to [now].
     */
    fun normalize(graph: BeliefGraph?, now: String? = null): BeliefGraph {
        val timestamp = now ?: currentIso()
        if (graph == null) return emptyGraph(timestamp)

        val normalizedNodes = (graph.nodes).mapIndexed { index, node ->
            node.copy(
                id = node.id.ifBlank { "belief_$index" },
                label = node.label.ifBlank { "Belief" },
                valence = normalizeValence(node.valence),
                intensity = node.intensity.coerceIn(MIN_INTENSITY, MAX_INTENSITY)
                    .takeIf { it.isFinite() } ?: DEFAULT_INTENSITY
            )
        }

        val normalizedEdges = (graph.edges).mapIndexed { index, edge ->
            edge.copy(
                from = edge.from.ifBlank { "belief_$index" },
                to = edge.to.ifBlank { "belief_$index" },
                relation = edge.relation.trim().ifEmpty { "related" }
            )
        }

        return BeliefGraph(
            nodes = normalizedNodes,
            edges = normalizedEdges,
            neuralLinks = graph.neuralLinks,
            summary = graph.summary ?: "",
            createdAt = graph.createdAt?.ifBlank { timestamp } ?: timestamp,
            updatedAt = graph.updatedAt?.ifBlank { timestamp } ?: timestamp
        )
    }

    // ══════════════════════════════════════════════════════════════════════════
    // Phase 4 — compactBeliefGraph (heuristic only)
    // ══════════════════════════════════════════════════════════════════════════

    /**
     * Compact a belief graph by exact-label dedup, heuristic semantic merge,
     * and capping to [maxNodes].
     *
     * Pure — no LLM call.
     */
    fun compact(graph: BeliefGraph, maxNodes: Int = DEFAULT_COMPACT_NODE_LIMIT): BeliefGraph {
        val normalized = normalize(graph)
        val (canonicalNodes, aliasMap) = dedupeNodesByExactLabel(normalized.nodes)
        val merged = applyHeuristicSemanticMerge(canonicalNodes, aliasMap)
        return finalizeCompactedGraph(normalized, merged, aliasMap, maxNodes)
    }

    // ══════════════════════════════════════════════════════════════════════════
    // Phase 5 — compactBeliefGraphWithLLM
    // ══════════════════════════════════════════════════════════════════════════

    /**
     * Compact a belief graph using an optional LLM-assisted semantic merge.
     * Falls back to heuristic merge if the LLM is unavailable, returns an
     * empty plan, or has no effect.
     */
    suspend fun compactWithLlm(
        graph: BeliefGraph,
        llmGenerator: LlmJsonGenerator? = null,
        maxNodes: Int = DEFAULT_COMPACT_NODE_LIMIT
    ): BeliefGraph {
        val normalized = normalize(graph)
        val (canonicalNodes, aliasMap) = dedupeNodesByExactLabel(normalized.nodes)

        var semanticallyCompacted = canonicalNodes
        var usedLlmPlan = false

        if (llmGenerator != null) {
            val plan = requestLlmSemanticMergePlan(canonicalNodes, llmGenerator)
            semanticallyCompacted = applyLlmSemanticMerge(canonicalNodes, aliasMap, plan)
            usedLlmPlan = plan != null && plan.groups.isNotEmpty()
        }

        // Fallback to heuristic if LLM had no effect
        if (semanticallyCompacted === canonicalNodes ||
            semanticallyCompacted.size == canonicalNodes.size
        ) {
            semanticallyCompacted = applyHeuristicSemanticMerge(canonicalNodes, aliasMap)
        }

        return finalizeCompactedGraph(normalized, semanticallyCompacted, aliasMap, maxNodes)
    }

    // ══════════════════════════════════════════════════════════════════════════
    // Phase 6 — mergeBeliefGraphs
    // ══════════════════════════════════════════════════════════════════════════

    /**
     * Merge two belief graphs (existing + proposal) with exact-label dedup,
     * recency-aware selection, and edge consolidation.
     * Capped to [MAX_MERGE_NODE_LIMIT] nodes.
     *
     * Ported from TS `mergeBeliefGraphs` in `belief-graph-workflow-service.ts`.
     */
    fun mergeGraphs(current: BeliefGraph?, proposal: BeliefGraph): BeliefGraph {
        val base = normalize(current)
        val addition = normalize(proposal)
        val now = currentIso()

        val nodeByKey = mutableMapOf<String, BeliefNode>()
        val nodeRankById = mutableMapOf<String, Int>()
        val aliasIdToCanonicalId = mutableMapOf<String, String>()
        val usedIds = mutableSetOf<String>()
        var rankCounter = 0

        fun absorbNode(node: BeliefNode) {
            val label = node.label.trim().ifEmpty { "Belief" }
            val normalizedKey = label.lowercase()
            if (normalizedKey.isEmpty()) return

            val existing = nodeByKey[normalizedKey]
            if (existing != null) {
                val incomingIntensity = node.intensity.coerceIn(MIN_INTENSITY, MAX_INTENSITY)
                if (incomingIntensity >= existing.intensity) {
                    nodeByKey[normalizedKey] = existing.copy(
                        label = label,
                        valence = node.valence
                    )
                }
                // Update intensity to max
                val current = nodeByKey[normalizedKey]!!
                nodeByKey[normalizedKey] = current.copy(
                    intensity = maxOf(current.intensity, incomingIntensity)
                )
                nodeRankById[existing.id] = maxOf(nodeRankById[existing.id] ?: -1, rankCounter)
                aliasIdToCanonicalId[node.id] = existing.id
                rankCounter++
                return
            }

            var canonicalId = if (node.id.isNotBlank()) node.id else "belief.${generateUuid()}"
            if (canonicalId in usedIds) {
                canonicalId = "belief.${generateUuid()}"
            }
            usedIds.add(canonicalId)

            val created = node.copy(
                id = canonicalId,
                label = label,
                intensity = node.intensity.coerceIn(MIN_INTENSITY, MAX_INTENSITY)
            )

            nodeByKey[normalizedKey] = created
            nodeRankById[canonicalId] = rankCounter
            aliasIdToCanonicalId[node.id] = canonicalId
            rankCounter++
        }

        base.nodes.forEach { absorbNode(it) }
        addition.nodes.forEach { absorbNode(it) }

        // Sort by intensity desc → rank desc → label asc; cap to limit
        val scoredNodes = nodeByKey.values.toList()
            .sortedWith(compareBy<BeliefNode> { -(it.intensity) }
                .thenBy { -(nodeRankById[it.id] ?: -1) }
                .thenBy { it.label })
            .take(MAX_MERGE_NODE_LIMIT)

        val retainedNodeIds = scoredNodes.map { it.id }.toSet()

        // Re-sort for output: intensity desc → label asc
        val nextNodes = scoredNodes.sortedWith(
            compareBy<BeliefNode> { -(it.intensity) }.thenBy { it.label }
        )

        // Merge edges from both graphs
        val nextEdges = mutableListOf<BeliefEdge>()
        val edgeKeys = mutableSetOf<String>()

        fun resolveNodeId(id: String): String = aliasIdToCanonicalId[id] ?: id

        fun pushEdge(edge: BeliefEdge) {
            val from = resolveNodeId(edge.from)
            val to = resolveNodeId(edge.to)
            if (from !in retainedNodeIds || to !in retainedNodeIds) return
            val normalizedEdge = BeliefEdge(
                from = from,
                to = to,
                relation = edge.relation.trim().ifEmpty { "related" }
            )
            if (normalizedEdge.from == normalizedEdge.to) return
            val key = edgeKey(normalizedEdge)
            if (key in edgeKeys) return
            edgeKeys.add(key)
            nextEdges.add(normalizedEdge)
        }

        base.edges.forEach { pushEdge(it) }
        addition.edges.forEach { pushEdge(it) }

        return BeliefGraph(
            nodes = nextNodes,
            edges = nextEdges,
            summary = addition.summary?.takeIf { it.isNotBlank() } ?: base.summary,
            createdAt = (base.createdAt ?: addition.createdAt) ?: now,
            updatedAt = now
        )
    }

    // ══════════════════════════════════════════════════════════════════════════
    // Private — Dedup helpers
    // ══════════════════════════════════════════════════════════════════════════

    private data class DedupeResult(
        val canonicalNodes: List<BeliefNode>,
        val aliasToCanonicalId: MutableMap<String, String>
    )

    /**
     * Exact-label deduplication. Nodes with identical normalized labels are
     * merged (higher intensity wins label+valence; intensity = max).
     */
    private fun dedupeNodesByExactLabel(nodes: List<BeliefNode>): DedupeResult {
        val nodeByLabel = mutableMapOf<String, BeliefNode>()
        val aliasToCanonicalId = mutableMapOf<String, String>()

        for (node in nodes) {
            val label = node.label.trim().ifEmpty { "Belief" }
            val normalizedLabel = label.lowercase()
            if (normalizedLabel.isEmpty()) continue

            val candidateNode = node.copy(
                id = node.id.trim().ifEmpty { "belief.${generateUuid()}" },
                label = label,
                intensity = node.intensity.coerceIn(MIN_INTENSITY, MAX_INTENSITY)
            )

            val existing = nodeByLabel[normalizedLabel]
            if (existing != null) {
                val updated = if (candidateNode.intensity >= existing.intensity) {
                    existing.copy(
                        label = candidateNode.label,
                        valence = candidateNode.valence,
                        intensity = maxOf(existing.intensity, candidateNode.intensity)
                    )
                } else {
                    existing.copy(intensity = maxOf(existing.intensity, candidateNode.intensity))
                }
                nodeByLabel[normalizedLabel] = updated
                aliasToCanonicalId[candidateNode.id] = existing.id
                continue
            }

            nodeByLabel[normalizedLabel] = candidateNode
            aliasToCanonicalId[candidateNode.id] = candidateNode.id
        }

        return DedupeResult(
            canonicalNodes = nodeByLabel.values.toList(),
            aliasToCanonicalId = aliasToCanonicalId
        )
    }

    /**
     * Merge [source] into [target]: higher-intensity node wins label+valence.
     */
    private fun mergeNodeIntoTarget(target: BeliefNode, source: BeliefNode): BeliefNode {
        return if (source.intensity >= target.intensity) {
            target.copy(
                label = source.label,
                valence = source.valence,
                intensity = maxOf(target.intensity, source.intensity)
            )
        } else {
            target.copy(intensity = maxOf(target.intensity, source.intensity))
        }
    }

    /**
     * O(n²) pairwise heuristic merge using [BeliefNlpUtils.areBeliefsIntentEquivalent].
     */
    private fun applyHeuristicSemanticMerge(
        canonicalNodes: List<BeliefNode>,
        aliasToCanonicalId: MutableMap<String, String>
    ): List<BeliefNode> {
        val workingNodes = canonicalNodes.toMutableList()
        val removed = mutableSetOf<String>()

        for (i in workingNodes.indices) {
            val left = workingNodes[i]
            if (left.id in removed) continue
            for (j in (i + 1) until workingNodes.size) {
                val right = workingNodes[j]
                if (right.id in removed) continue
                if (!BeliefNlpUtils.areBeliefsIntentEquivalent(left, right)) continue

                workingNodes[i] = mergeNodeIntoTarget(workingNodes[i], right)
                removed.add(right.id)
                aliasToCanonicalId[right.id] = left.id
            }
        }

        // Resolve transitive aliases
        val remaining = workingNodes.filter { it.id !in removed }
        val remainingIds = remaining.map { it.id }.toSet()
        for ((fromId, toId) in aliasToCanonicalId.entries.toList()) {
            if (toId in remainingIds) continue
            // Find the chain endpoint
            var resolved = toId
            var depth = 0
            while (resolved !in remainingIds && depth < 100) {
                resolved = aliasToCanonicalId[resolved] ?: break
                depth++
            }
            if (resolved in remainingIds) {
                aliasToCanonicalId[fromId] = resolved
            }
        }

        return remaining
    }

    // ══════════════════════════════════════════════════════════════════════════
    // Private — LLM-assisted merge
    // ══════════════════════════════════════════════════════════════════════════

    @Serializable
    private data class LlmMergeGroup(
        val canonicalId: String = "",
        val memberIds: List<String> = emptyList()
    )

    @Serializable
    private data class LlmSemanticMergePlan(
        val groups: List<LlmMergeGroup> = emptyList()
    )

    /**
     * Ask the LLM to produce a semantic merge plan for the given nodes.
     * Returns null on failure.
     */
    private suspend fun requestLlmSemanticMergePlan(
        nodes: List<BeliefNode>,
        llmGenerator: LlmJsonGenerator
    ): LlmSemanticMergePlan? {
        if (nodes.size <= 1) return LlmSemanticMergePlan()

        val compactNodes = nodes.map { node ->
            mapOf(
                "id" to node.id,
                "label" to node.label,
                "valence" to node.valence,
                "intensity" to node.intensity.toString()
            )
        }

        val prompt = buildString {
            appendLine("Input beliefs (JSON):")
            appendLine(json.encodeToString(ListSerializer(
                MapSerializer(
                    String.serializer(),
                    String.serializer()
                )
            ), compactNodes))
            appendLine()
            appendLine("Return ONLY JSON with this exact shape:")
            appendLine("""{"groups":[{"canonicalId":"node-id","memberIds":["node-id"]}]}""")
            appendLine()
            appendLine("Rules:")
            appendLine("- Group only beliefs with the same underlying intent.")
            appendLine("- Never group opposite-intent beliefs (for example: \"i am safe\" vs \"i am unsafe\").")
            appendLine("- Keep valence-compatible grouping only (same valence, or one neutral).")
            appendLine("- Every memberId must be present in input. canonicalId must be one of memberIds.")
        }

        return try {
            val responseJson = llmGenerator.generateJson(
                prompt = prompt,
                systemPrompt = "You are a strict JSON-only belief deduplication planner.",
                temperature = 0.1,
                maxTokens = 900
            )
            val plan = json.decodeFromString<LlmSemanticMergePlan>(responseJson)
            if (plan.groups.isEmpty()) plan else plan
        } catch (_: Exception) {
            null
        }
    }

    /**
     * Apply an LLM-generated merge plan to the canonical nodes.
     * Validates each group: member IDs must exist, valence must be compatible.
     */
    private fun applyLlmSemanticMerge(
        canonicalNodes: List<BeliefNode>,
        aliasToCanonicalId: MutableMap<String, String>,
        plan: LlmSemanticMergePlan?
    ): List<BeliefNode> {
        if (plan == null || plan.groups.isEmpty()) return canonicalNodes

        val byId = canonicalNodes.associateBy { it.id }.toMutableMap()
        val removed = mutableSetOf<String>()
        val consumed = mutableSetOf<String>()

        for (group in plan.groups) {
            val memberIds = group.memberIds.filter { it in byId }
            if (memberIds.size < 2) continue
            if (memberIds.any { it in removed || it in consumed }) continue

            val canonicalId = if (group.canonicalId in memberIds) group.canonicalId else memberIds[0]
            var canonicalNode = byId[canonicalId] ?: continue
            if (canonicalId in removed) continue

            for (memberId in memberIds) {
                if (memberId == canonicalId) continue
                val memberNode = byId[memberId] ?: continue
                if (memberId in removed) continue
                if (!BeliefNlpUtils.areValenceCompatible(canonicalNode.valence, memberNode.valence)) continue

                canonicalNode = mergeNodeIntoTarget(canonicalNode, memberNode)
                byId[canonicalId] = canonicalNode
                removed.add(memberId)
                aliasToCanonicalId[memberId] = canonicalId
            }
            memberIds.forEach { consumed.add(it) }
        }

        val compacted = canonicalNodes.filter { it.id !in removed }.map { byId[it.id] ?: it }
        val compactedIds = compacted.map { it.id }.toSet()

        // Fix dangling alias references
        for ((fromId, toId) in aliasToCanonicalId.entries.toList()) {
            if (toId in compactedIds) continue
            if (fromId in compactedIds) {
                aliasToCanonicalId[fromId] = fromId
            }
        }

        return compacted
    }

    // ══════════════════════════════════════════════════════════════════════════
    // Private — Finalization
    // ══════════════════════════════════════════════════════════════════════════

    /**
     * Sort compacted nodes by intensity desc, apply node cap,
     * rewire edges through the alias map, and dedup edges.
     */
    private fun finalizeCompactedGraph(
        normalized: BeliefGraph,
        compactedNodes: List<BeliefNode>,
        aliasToCanonicalId: Map<String, String>,
        maxNodes: Int
    ): BeliefGraph {
        val limit = maxOf(1, maxNodes)
        val nodes = compactedNodes
            .sortedWith(compareBy<BeliefNode> { -(it.intensity) }.thenBy { it.label })
            .take(limit)

        val retainedNodeIds = nodes.map { it.id }.toSet()
        val edges = mutableListOf<BeliefEdge>()
        val seenEdges = mutableSetOf<String>()

        for (edge in normalized.edges) {
            val from = aliasToCanonicalId[edge.from] ?: edge.from
            val to = aliasToCanonicalId[edge.to] ?: edge.to
            if (from !in retainedNodeIds || to !in retainedNodeIds || from == to) continue
            val normalizedEdge = BeliefEdge(
                from = from,
                to = to,
                relation = edge.relation.trim().ifEmpty { "related" }
            )
            val key = edgeKey(normalizedEdge)
            if (key in seenEdges) continue
            seenEdges.add(key)
            edges.add(normalizedEdge)
        }

        return normalized.copy(
            nodes = nodes,
            edges = edges,
            updatedAt = currentIso()
        )
    }

    // ══════════════════════════════════════════════════════════════════════════
    // Private — Utilities
    // ══════════════════════════════════════════════════════════════════════════

    private fun normalizeValence(valence: String): String {
        return when (valence) {
            "positive", "negative" -> valence
            else -> "neutral"
        }
    }

    private fun edgeKey(edge: BeliefEdge): String {
        return "${edge.from}::${edge.to}::${edge.relation.trim().lowercase()}"
    }

    private fun emptyGraph(now: String): BeliefGraph = BeliefGraph(
        nodes = emptyList(),
        edges = emptyList(),
        summary = "",
        createdAt = now,
        updatedAt = now
    )

    private fun currentIso(): String {
        // Use kotlinx-datetime for ISO timestamp
        return kotlinx.datetime.Clock.System.now().toString()
    }
}
