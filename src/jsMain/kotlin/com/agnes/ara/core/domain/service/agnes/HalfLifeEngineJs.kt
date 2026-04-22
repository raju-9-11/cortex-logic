package com.agnes.ara.core.domain.service.agnes

import com.agnes.ara.core.domain.models.BeliefGraph
import com.agnes.ara.core.domain.models.BeliefNode
import kotlinx.serialization.json.Json
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.encodeToString
import kotlin.js.JsExport

/**
 * JS-exported facade for HalfLifeEngine.
 * Handles belief graph decay and triggering with JSON-boundary safety.
 */
@JsExport
class HalfLifeEngineJs {
    private val engine = HalfLifeEngine()
    private val json = Json { ignoreUnknownKeys = true; isLenient = true }

    /**
     * Apply half-life decay to a belief graph.
     * @param graphJson JSON-encoded [BeliefGraph].
     * @return JSON-encoded object { decayedGraph: BeliefGraph, strippedNodeIds: String[] }
     */
    fun decay(graphJson: String): String {
        val graph = try {
            json.decodeFromString<BeliefGraph>(graphJson)
        } catch (e: Exception) {
            return graphJson
        }

        val (decayed, stripped) = engine.decay(graph)
        
        val decayedJson = json.encodeToString(decayed)
        val strippedJson = json.encodeToString(stripped)
        
        return """{"decayedGraph": $decayedJson, "strippedNodeIds": $strippedJson}"""
    }

    /**
     * Trigger a belief node (resets decay, applies boost).
     * @param nodeJson JSON-encoded [BeliefNode].
     * @param intensityBoost Boost value (default 0.2).
     * @return JSON-encoded updated [BeliefNode].
     */
    fun trigger(nodeJson: String, intensityBoost: Float = 0.2f): String {
        val node = try {
            json.decodeFromString<BeliefNode>(nodeJson)
        } catch (e: Exception) {
            return nodeJson
        }

        val updated = engine.trigger(node, intensityBoost)
        return json.encodeToString(updated)
    }
}
