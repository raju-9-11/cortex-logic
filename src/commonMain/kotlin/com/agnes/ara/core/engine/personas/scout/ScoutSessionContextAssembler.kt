package com.agnes.ara.core.engine.personas.scout

import kotlinx.serialization.json.*

/**
 * ScoutSessionContextAssembler — pure domain logic (no I/O).
 *
 * Assembles fused RAG context blocks for Scout research session prompts.
 * Agnes supplies retrieved knowledge nodes and optional web results as JSON;
 * this class formats them into structured prompt sections and provides
 * coverage scoring and off-topic detection.
 */
class ScoutSessionContextAssembler {

    companion object {
        private val STOP_WORDS = setOf(
            "the", "and", "for", "are", "but", "not", "you", "all", "can", "had",
            "her", "was", "one", "our", "out", "day", "get", "has", "him", "his",
            "how", "its", "may", "new", "now", "old", "see", "two", "way", "who",
            "did", "what", "with", "this", "that", "from", "they", "will", "been",
            "have", "more", "also", "into", "some", "than", "then", "there", "when",
            "which", "your", "about", "after", "could", "their", "would", "these",
        )
        private const val COVERAGE_TOP_K = 5
    }

    fun assembleFusedContext(
        nodesJson: String,
        webResultsJson: String,
        sessionTopic: String,
        @Suppress("UNUSED_PARAMETER") userQuery: String
    ): String {
        val nodes = parseNodes(nodesJson)
        val webResults = parseWebResults(webResultsJson)

        val sb = StringBuilder()

        sb.appendLine("[SESSION_KNOWLEDGE]")
        if (nodes.isEmpty()) {
            // When fresh web evidence is already provided, do NOT invite another search.
            if (webResults.isNotEmpty()) {
                sb.appendLine("No prior session findings yet. Use the web evidence in [FRESH_WEB_EVIDENCE] to answer — do not emit another search action.")
            } else {
                sb.appendLine("No prior findings for this topic yet.")
            }
        } else {
            for (node in nodes) {
                val origin = if (node.fromSession) "this session" else "library"
                val confPct = (node.confidence * 100).toInt()
                val statusTag = if (node.status == "verified") " ✓" else ""
                sb.appendLine("• ${node.claim} (confidence: ${confPct}%, ${origin}${statusTag})")
            }
        }

        if (webResults.isNotEmpty()) {
            sb.appendLine()
            sb.appendLine("[FRESH_WEB_EVIDENCE]")
            for (r in webResults) {
                val domain = extractDomain(r.url)
                val snippet = r.snippet.take(240).trimEnd()
                sb.appendLine("• ${r.title} [${domain}]: ${snippet}")
            }
        }

        return sb.toString().trimEnd()
    }

    fun computeCoverageScore(nodesJson: String): Double {
        val nodes = parseNodes(nodesJson)
        if (nodes.isEmpty()) return 0.0
        val top = nodes.sortedByDescending { it.similarity }.take(COVERAGE_TOP_K)
        return top.sumOf { it.similarity } / top.size
    }

    fun isOffTopic(userQuery: String, sessionTopic: String): Boolean {
        val queryTokens = contentTokens(userQuery)
        if (queryTokens.size < 3) return false
        val topicTokens = contentTokens(sessionTopic).toSet()
        val shared = queryTokens.count { topicTokens.contains(it) }
        return shared == 0
    }

    private data class NodeEntry(
        val claim: String,
        val confidence: Double,
        val similarity: Double,
        val status: String,
        val fromSession: Boolean,
    )

    private data class WebEntry(val title: String, val url: String, val snippet: String)

    private fun parseNodes(json: String): List<NodeEntry> {
        return try {
            Json.parseToJsonElement(json).jsonArray.mapNotNull { elem ->
                val obj = elem.jsonObject
                val claim = obj["claim"]?.jsonPrimitive?.contentOrNull ?: return@mapNotNull null
                NodeEntry(
                    claim = claim,
                    confidence = obj["confidence"]?.jsonPrimitive?.doubleOrNull ?: 0.5,
                    similarity = obj["similarity"]?.jsonPrimitive?.doubleOrNull ?: 0.0,
                    status = obj["status"]?.jsonPrimitive?.contentOrNull ?: "pending",
                    fromSession = obj["fromSession"]?.jsonPrimitive?.booleanOrNull ?: false,
                )
            }
        } catch (_: Exception) { emptyList() }
    }

    private fun parseWebResults(json: String): List<WebEntry> {
        return try {
            Json.parseToJsonElement(json).jsonArray.mapNotNull { elem ->
                val obj = elem.jsonObject
                val url = obj["url"]?.jsonPrimitive?.contentOrNull ?: return@mapNotNull null
                WebEntry(
                    title = obj["title"]?.jsonPrimitive?.contentOrNull ?: url,
                    url = url,
                    snippet = obj["snippet"]?.jsonPrimitive?.contentOrNull ?: "",
                )
            }
        } catch (_: Exception) { emptyList() }
    }

    private fun extractDomain(url: String): String = try {
        url.substringAfter("://").substringBefore("/").removePrefix("www.")
    } catch (_: Exception) { url }

    private fun contentTokens(text: String): List<String> =
        text.lowercase()
            .replace(Regex("[^a-z0-9\\s]"), " ")
            .split(Regex("\\s+"))
            .filter { it.length >= 4 && !STOP_WORDS.contains(it) }
}
