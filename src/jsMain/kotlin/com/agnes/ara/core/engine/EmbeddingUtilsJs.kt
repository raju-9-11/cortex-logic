package com.agnes.ara.core.engine

import kotlin.math.abs
import kotlin.math.sqrt
import kotlinx.serialization.json.*

/**
 * EmbeddingUtilsJs — pure text and vector utilities ported from TypeScript.
 *
 * Covers:
 *  - cosineSimilarity           (embedding-service.ts)
 *  - computeKeywordScore        (scout-knowledge-service.ts)
 *  - deduplicateTextResults     (memory-orchestrator.ts)
 *  - evaluateDiscrepancy        (context-inference-service.ts)
 *  - resolveFieldPath           (context-inference-service.ts)
 *
 * NOTE: lexicalFallbackEmbedding is intentionally kept in TypeScript to maintain
 * hash-function compatibility with embeddings stored in Firestore.
 */
@JsExport
class EmbeddingUtilsJs {

  // ─── Vector math ─────────────────────────────────────────────────────────────

  /**
   * Cosine similarity between two embedding vectors supplied as JSON arrays of doubles.
   * Returns 0.0 on dimension mismatch (uses min length) or zero-norm vectors.
   */
  fun cosineSimilarity(aJson: String, bJson: String): Double {
    val a = Json.decodeFromString<List<Double>>(aJson)
    val b = Json.decodeFromString<List<Double>>(bJson)
    val length = minOf(a.size, b.size)
    if (length == 0) return 0.0
    var dot = 0.0; var normA = 0.0; var normB = 0.0
    for (i in 0 until length) {
      val ai = a[i]; val bi = b[i]
      dot += ai * bi; normA += ai * ai; normB += bi * bi
    }
    if (normA == 0.0 || normB == 0.0) return 0.0
    return dot / sqrt(normA * normB)
  }

  // ─── Text scoring ─────────────────────────────────────────────────────────────

  /**
   * BM25-inspired keyword score: fraction of query tokens (len > 2) found in claim.
   * Returns 0.0 when no qualifying tokens.
   */
  fun computeKeywordScore(claim: String, query: String): Double {
    val claimLower = claim.lowercase()
    val tokens = query.lowercase().split(Regex("\\s+")).filter { it.length > 2 }
    if (tokens.isEmpty()) return 0.0
    val hits = tokens.count { claimLower.contains(it) }
    return hits.toDouble() / tokens.size
  }

  // ─── Result deduplication ─────────────────────────────────────────────────────

  /**
   * Removes near-duplicate entries where two items share > [overlapThreshold] word overlap.
   * Input must be pre-sorted by score descending — higher-scored entry wins on collision.
   * Each element must have a "text" string field.
   */
  fun deduplicateTextResults(resultsJson: String, overlapThreshold: Double): String {
    val arr = Json.parseToJsonElement(resultsJson).jsonArray
    val seenTexts = mutableListOf<String>()
    val out = buildJsonArray {
      for (elem in arr) {
        val text = elem.jsonObject["text"]?.jsonPrimitive?.contentOrNull ?: continue
        val words = text.lowercase().split(Regex("\\s+")).filter { it.isNotBlank() }.toSet()
        val isDuplicate = seenTexts.any { prev ->
          val prevWords = prev.lowercase().split(Regex("\\s+")).filter { it.isNotBlank() }.toSet()
          val overlap = words.count { prevWords.contains(it) }
          overlap.toDouble() / maxOf(words.size, prevWords.size).coerceAtLeast(1) > overlapThreshold
        }
        if (!isDuplicate) {
          seenTexts.add(text)
          add(elem)
        }
      }
    }
    return out.toString()
  }

  // ─── Context inference ────────────────────────────────────────────────────────

  /**
   * Returns true when the inferred value meaningfully differs from the stored value.
   *
   * Rules:
   *  - storedJson == "null" → always true (new data opportunity)
   *  - Both numeric: discrepant if |diff| > 1 OR percentage diff > 15 %
   *  - Both string: discrepant if not equal (case-insensitive)
   *  - Otherwise: equality check
   */
  fun evaluateDiscrepancy(inferredJson: String, storedJson: String): Boolean {
    if (storedJson == "null") return true
    val inferred = Json.parseToJsonElement(inferredJson)
    val stored = Json.parseToJsonElement(storedJson)

    val infNum = (inferred as? JsonPrimitive)?.doubleOrNull
    val storedNum = (stored as? JsonPrimitive)?.doubleOrNull
    if (infNum != null && storedNum != null) {
      val diff = abs(infNum - storedNum)
      val pct = if (storedNum != 0.0) diff / abs(storedNum) else diff
      return diff > 1.0 || pct > 0.15
    }

    val infStr = (inferred as? JsonPrimitive)?.contentOrNull
    val storedStr = (stored as? JsonPrimitive)?.contentOrNull
    if (infStr != null && storedStr != null) {
      return infStr.lowercase() != storedStr.lowercase()
    }

    return inferred != stored
  }

  /**
   * Resolves a dot-notation path (supports array indices like `arr[0].field`) through a JSON object.
   * Returns the JSON-serialised value at that path, or the string "null" when any segment is missing.
   *
   * Examples:
   *   resolveFieldPath(obj, "training.weeklyWorkouts") → "5"
   *   resolveFieldPath(obj, "incomeSources[0].amount") → "3500"
   */
  fun resolveFieldPath(objJson: String, path: String): String {
    val normalised = path.replace(Regex("\\[(\\d+)]"), ".$1")
    val segments = normalised.split(".")
    var cursor: JsonElement = Json.parseToJsonElement(objJson)
    for (segment in segments) {
      cursor = when (cursor) {
        is JsonObject -> cursor[segment] ?: return "null"
        is JsonArray -> {
          val idx = segment.toIntOrNull() ?: return "null"
          cursor.getOrNull(idx) ?: return "null"
        }
        else -> return "null"
      }
    }
    return cursor.toString()
  }
}
