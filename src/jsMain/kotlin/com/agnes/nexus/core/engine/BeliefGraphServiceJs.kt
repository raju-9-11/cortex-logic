package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.models.BeliefGraph
import com.agnes.nexus.core.domain.models.BeliefNode
import com.agnes.nexus.core.domain.service.agnes.BeliefGraphCompactionService
import com.agnes.nexus.core.domain.service.agnes.BeliefTriggerEvaluator
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import kotlinx.serialization.json.*
import kotlin.coroutines.cancellation.CancellationException
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException
import kotlinx.coroutines.suspendCancellableCoroutine

/**
 * JS/TS facade for belief-graph domain operations.
 *
 * Wraps [BeliefGraphCompactionService] (normalize, compact, merge) and
 * [BeliefTriggerEvaluator] (threshold evaluation, triggering-node lookup).
 *
 * ## Data format
 * All belief graphs cross the boundary as JSON strings. The adapter handles
 * serialization/deserialization internally. Input JSON must be a valid
 * serialized [BeliefGraph] (or null/empty for defaults).
 *
 * ## Async operations
 * [compactGraphWithLlm] accepts a TS-side `generateJson` callback and returns
 * a [CancellableTask] for structured concurrency.
 */
@JsExport
class BeliefGraphServiceJs {

    private val compactionService = BeliefGraphCompactionService()
    private val triggerEvaluator = BeliefTriggerEvaluator()
    private var scope = CoroutineScope(SupervisorJob())

    private val json = Json { ignoreUnknownKeys = true; isLenient = true }

    // ══════════════════════════════════════════════════════════════════════════
    // Normalize
    // ══════════════════════════════════════════════════════════════════════════

    /**
     * Normalize a belief graph: clamp intensity, trim labels, default missing fields.
     *
     * @param graphJson JSON-encoded [BeliefGraph], or `""` / `"null"` for an empty graph.
     * @return JSON-encoded normalized [BeliefGraph].
     */
    fun normalizeGraph(graphJson: String): String {
        val graph = parseGraphOrNull(graphJson)
        val result = compactionService.normalize(graph)
        return encodeGraph(result)
    }

    // ══════════════════════════════════════════════════════════════════════════
    // Compact (heuristic only — synchronous)
    // ══════════════════════════════════════════════════════════════════════════

    /**
     * Compact a belief graph using exact-label dedup + heuristic semantic merge.
     * Pure — no LLM call.
     *
     * @param graphJson JSON-encoded [BeliefGraph].
     * @param maxNodes  Maximum nodes to retain (default 60).
     * @return JSON-encoded compacted [BeliefGraph].
     */
    fun compactGraph(graphJson: String, maxNodes: Int = 60): String {
        val graph = parseGraphOrNull(graphJson) ?: return encodeGraph(
            compactionService.normalize(null)
        )
        return encodeGraph(compactionService.compact(graph, maxNodes))
    }

    // ══════════════════════════════════════════════════════════════════════════
    // Compact with LLM — async
    // ══════════════════════════════════════════════════════════════════════════

    /**
     * Compact a belief graph with an optional LLM-assisted semantic merge.
     *
     * The [generateJsonFn] callback bridges to the TS-side `generateJSON` function.
     * It receives a JSON request object:
     * ```json
     * { "prompt": "...", "systemPrompt": "...", "temperature": 0.1, "maxTokens": 900 }
     * ```
     * and must call either [onResult] with the raw JSON response or [onError]
     * with an error message.
     *
     * @param graphJson      JSON-encoded [BeliefGraph].
     * @param maxNodes       Maximum nodes to retain.
     * @param generateJsonFn TS callback: `(requestJson, onResult, onError) => void`.
     * @param onComplete     Called with the JSON-encoded compacted graph.
     * @param onError        Called if the operation fails.
     * @return [CancellableTask] handle.
     */
    fun compactGraphWithLlm(
        graphJson: String,
        maxNodes: Int,
        generateJsonFn: (String, (String) -> Unit, (String) -> Unit) -> Unit,
        onComplete: (String) -> Unit,
        onError: (String) -> Unit
    ): CancellableTask {
        val graph = parseGraphOrNull(graphJson)
        if (graph == null) {
            onComplete(encodeGraph(compactionService.normalize(null)))
            return CancellableTask(SupervisorJob().apply { complete() })
        }

        val llmGenerator = callbackToLlmGenerator(generateJsonFn)

        val job = scope.launch {
            try {
                val result = compactionService.compactWithLlm(graph, llmGenerator, maxNodes)
                onComplete(encodeGraph(result))
            } catch (_: CancellationException) {
                // Cancelled from TS — don't call onError.
            } catch (e: Throwable) {
                onError(e.message ?: "Belief graph LLM compaction failed")
            }
        }
        return CancellableTask(job)
    }

    // ══════════════════════════════════════════════════════════════════════════
    // Merge
    // ══════════════════════════════════════════════════════════════════════════

    /**
     * Merge two belief graphs (existing + proposal) with exact-label dedup.
     * Capped to 80 nodes.
     *
     * @param currentGraphJson  JSON-encoded current [BeliefGraph], or `""` for null.
     * @param proposalGraphJson JSON-encoded proposal [BeliefGraph].
     * @return JSON-encoded merged [BeliefGraph].
     */
    fun mergeGraphs(currentGraphJson: String, proposalGraphJson: String): String {
        val current = parseGraphOrNull(currentGraphJson)
        val proposal = parseGraphOrNull(proposalGraphJson)
            ?: return encodeGraph(compactionService.normalize(current))
        return encodeGraph(compactionService.mergeGraphs(current, proposal))
    }

    // ══════════════════════════════════════════════════════════════════════════
    // Trigger evaluation
    // ══════════════════════════════════════════════════════════════════════════

    /**
     * Evaluate whether the belief graph crosses the Agnes session invitation threshold.
     *
     * @param graphJson         JSON-encoded [BeliefGraph], or `""` for null.
     * @param emotionalResilience Resilience score (0–10), or -1 if unknown.
     * @param stressLoad        Stress score (0–10), or -1 if unknown.
     * @return JSON-encoded [BeliefTriggerEvaluator.InvitationDecision].
     */
    fun evaluateInvitationThreshold(
        graphJson: String,
        emotionalResilience: Double = -1.0,
        stressLoad: Double = -1.0
    ): String {
        val graph = parseGraphOrNull(graphJson)
        val resilience = if (emotionalResilience < 0) null else emotionalResilience
        val stress = if (stressLoad < 0) null else stressLoad

        val decision = triggerEvaluator.evaluateThreshold(graph, resilience, stress)

        return buildJsonObject {
            put("shouldInvite", decision.shouldInvite)
            put("summary", decision.summary)
            putJsonArray("rationale") {
                decision.rationale.forEach { add(it) }
            }
            put("fingerprint", decision.fingerprint)
            put("confidence", decision.confidence)
            putJsonArray("triggeringBeliefs") {
                decision.triggeringBeliefs.forEach { add(it) }
            }
            putJsonObject("metrics") {
                put("totalNodes", decision.metrics.totalNodes)
                put("negativeCount", decision.metrics.negativeCount)
                put("highIntensityNegativeCount", decision.metrics.highIntensityNegativeCount)
                put("severeNegativeCount", decision.metrics.severeNegativeCount)
                put("averageNegativeIntensity", decision.metrics.averageNegativeIntensity)
                if (decision.metrics.resilience != null) {
                    put("resilience", decision.metrics.resilience)
                } else {
                    put("resilience", JsonNull)
                }
                if (decision.metrics.stressLoad != null) {
                    put("stressLoad", decision.metrics.stressLoad)
                } else {
                    put("stressLoad", JsonNull)
                }
            }
        }.toString()
    }

    /**
     * Filter a belief graph to the nodes that triggered the invitation.
     *
     * @param graphJson               JSON-encoded [BeliefGraph].
     * @param triggeringBeliefsJson    JSON array of label strings.
     * @return JSON array of matching [BeliefNode] objects.
     */
    fun getTriggeringNodes(graphJson: String, triggeringBeliefsJson: String): String {
        val graph = parseGraphOrNull(graphJson)
        val labels = parseStringArray(triggeringBeliefsJson)
        val nodes = triggerEvaluator.getTriggeringNodes(graph, labels)
        return encodeNodes(nodes)
    }

    // ══════════════════════════════════════════════════════════════════════════
    // Private — JSON helpers
    // ══════════════════════════════════════════════════════════════════════════

    private fun parseGraphOrNull(graphJson: String): BeliefGraph? {
        if (graphJson.isBlank() || graphJson == "null") return null
        return try {
            json.decodeFromString<BeliefGraph>(graphJson)
        } catch (_: Exception) {
            null
        }
    }

    private fun encodeGraph(graph: BeliefGraph): String {
        return json.encodeToString(BeliefGraph.serializer(), graph)
    }

    private fun encodeNodes(nodes: List<BeliefNode>): String {
        return json.encodeToString(
            kotlinx.serialization.builtins.ListSerializer(BeliefNode.serializer()),
            nodes
        )
    }

    private fun parseStringArray(jsonStr: String): List<String> {
        if (jsonStr.isBlank() || jsonStr == "[]") return emptyList()
        return try {
            Json.parseToJsonElement(jsonStr).jsonArray.mapNotNull {
                it.jsonPrimitive.contentOrNull
            }
        } catch (_: Exception) {
            emptyList()
        }
    }

    /**
     * Wraps a TS-side callback into a [LlmJsonGenerator] using
     * [suspendCancellableCoroutine] to bridge callback → suspend.
     */
    private fun callbackToLlmGenerator(
        generateJsonFn: (String, (String) -> Unit, (String) -> Unit) -> Unit
    ): LlmJsonGenerator {
        return object : LlmJsonGenerator {
            override suspend fun generateJson(
                prompt: String,
                systemPrompt: String,
                temperature: Double,
                maxTokens: Int
            ): String = suspendCancellableCoroutine { continuation ->
                val requestJson = buildJsonObject {
                    put("prompt", prompt)
                    put("systemPrompt", systemPrompt)
                    put("temperature", temperature)
                    put("maxTokens", maxTokens)
                }.toString()

                generateJsonFn(
                    requestJson,
                    { result -> continuation.resume(result) },
                    { error -> continuation.resumeWithException(Exception(error)) }
                )
            }
        }
    }
}
