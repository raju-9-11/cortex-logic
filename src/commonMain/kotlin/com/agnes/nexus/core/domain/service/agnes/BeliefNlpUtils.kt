package com.agnes.nexus.core.domain.service.agnes

import com.agnes.nexus.core.domain.models.BeliefNode

/**
 * NLP utilities for belief-graph intent matching and deduplication.
 *
 * Ported from the TS `belief-graph-service.ts` helpers:
 *   stemToken, normalizeIntentToken, tokenizeBeliefIntent,
 *   countOverlap, areValenceCompatible, areBeliefsIntentEquivalent.
 *
 * All functions are pure and stateless.
 */
object BeliefNlpUtils {

    // ── Stop-words stripped during intent tokenization ──────────────────────
    private val INTENT_STOPWORDS: Set<String> = setOf(
        "a", "an", "and", "are", "as", "at", "be", "been", "being", "but", "by",
        "for", "from", "had", "has", "have", "i", "if", "in", "is", "it", "its",
        "me", "my", "of", "on", "or", "so", "that", "the", "their", "them",
        "there", "they", "this", "to", "was", "we", "were", "with", "you", "your"
    )

    // ── Canonical aliases collapsed before stemming ────────────────────────
    private val TOKEN_ALIASES: Map<String, String> = mapOf(
        "cannot" to "cant",
        "cant" to "cant",
        "couldnt" to "cant",
        "faking" to "fake",
        "fake" to "fake",
        "never" to "not",
        "wont" to "not"
    )

    // ── Primitive stemmer (suffix stripping) ───────────────────────────────

    /**
     * Minimal suffix-strip stemmer matching the TS implementation.
     * Only strips -ing, -ed, -ly, -s from tokens longer than a threshold.
     */
    fun stemToken(token: String): String {
        if (token.length <= 3) return token
        if (token.endsWith("ing") && token.length > 5) return token.dropLast(3)
        if (token.endsWith("ed") && token.length > 4) return token.dropLast(2)
        if (token.endsWith("ly") && token.length > 4) return token.dropLast(2)
        if (token.endsWith("s") && token.length > 4) return token.dropLast(1)
        return token
    }

    /**
     * Lowercase, alias, and stem a single raw token.
     */
    fun normalizeIntentToken(rawToken: String): String {
        val lower = rawToken.lowercase().trim()
        if (lower.isEmpty()) return ""
        val aliased = TOKEN_ALIASES[lower] ?: lower
        val stemmed = stemToken(aliased)
        return TOKEN_ALIASES[stemmed] ?: stemmed
    }

    /**
     * Tokenize a belief label into a deduplicated list of normalized intent tokens.
     * Splits on non-alphanumeric characters, strips stopwords.
     */
    fun tokenizeBeliefIntent(label: String): List<String> {
        val rawTokens = label
            .lowercase()
            .split(Regex("[^a-z0-9]+"))
            .filter { it.isNotEmpty() }

        val normalizedTokens = rawTokens
            .map { normalizeIntentToken(it) }
            .filter { it.isNotEmpty() && it !in INTENT_STOPWORDS }

        return normalizedTokens.distinct()
    }

    // ── Set-overlap helpers ────────────────────────────────────────────────

    /**
     * Count the number of tokens in [left] that also appear in [right].
     */
    fun countOverlap(left: List<String>, right: List<String>): Int {
        if (left.isEmpty() || right.isEmpty()) return 0
        val rightSet = right.toSet()
        return left.count { it in rightSet }
    }

    // ── Valence compatibility ──────────────────────────────────────────────

    /**
     * Two valences are compatible if they are equal, or at least one is neutral.
     */
    fun areValenceCompatible(left: String, right: String): Boolean {
        return left == right || left == "neutral" || right == "neutral"
    }

    // ── Intent-equivalence (Jaccard + containment) ─────────────────────────

    /**
     * Determine whether two belief nodes express the same underlying intent
     * using token overlap (Jaccard similarity ≥ 0.6 **and** containment ≥ 0.75,
     * or containment alone ≥ 0.95).
     *
     * Valence must be compatible; otherwise false immediately.
     */
    fun areBeliefsIntentEquivalent(left: BeliefNode, right: BeliefNode): Boolean {
        if (!areValenceCompatible(left.valence, right.valence)) return false

        val leftTokens = tokenizeBeliefIntent(left.label)
        val rightTokens = tokenizeBeliefIntent(right.label)
        if (leftTokens.isEmpty() || rightTokens.isEmpty()) return false

        val overlap = countOverlap(leftTokens, rightTokens)
        if (overlap == 0) return false

        val union = (leftTokens + rightTokens).toSet().size
        val minSize = minOf(leftTokens.size, rightTokens.size)
        val jaccard = if (union > 0) overlap.toDouble() / union else 0.0
        val containment = if (minSize > 0) overlap.toDouble() / minSize else 0.0

        if (containment >= 0.95) return true
        return containment >= 0.75 && jaccard >= 0.6
    }
}
