package com.agnes.ara.core.domain.service.agnes

import kotlin.math.abs

/**
 * Computes the Agnes Gravity score G = w1·|S| + w2·K
 *
 * Where:
 *   |S| = absolute sentiment polarity (0.0 = neutral, 1.0 = extreme)
 *   K   = normalised core-wound keyword density (matched keywords / total words)
 *   w1  = sentiment weight (default 0.6)
 *   w2  = keyword weight (default 0.4)
 *
 * If G > 0.8, the Orchestrator issues SESSION_INVITATION.
 */
class GravityCalculator(
    private val w1: Float = 0.6f,   // sentiment polarity weight
    private val w2: Float = 0.4f    // keyword density weight
) {
    companion object {
        const val SESSION_INVITATION_THRESHOLD = 0.8f

        /** Default wound keyword set — expanded by the LLM extraction pipeline at runtime. */
        val DEFAULT_WOUND_KEYWORDS = setOf(
            "worthless", "failure", "rejected", "abandoned", "alone", "hopeless",
            "unloved", "broken", "shame", "guilt", "panic", "terrified", "trapped",
            "invisible", "unworthy", "hurt", "betrayed", "lost", "empty", "numb"
        )
    }

    /**
     * Compute gravity from raw text and a sentiment polarity score.
     *
     * @param text              Raw message text (Blabber input).
     * @param sentimentPolarity Absolute sentiment score ∈ [0.0, 1.0]. Provide |S| directly
     *                          (i.e. always positive — we take abs() defensively).
     * @param woundKeywords     Optional override for the keyword set.
     * @return GravityResult with computed G and component breakdown.
     */
    fun compute(
        text: String,
        sentimentPolarity: Float,
        woundKeywords: Set<String> = DEFAULT_WOUND_KEYWORDS
    ): GravityResult {
        val s = abs(sentimentPolarity).coerceIn(0f, 1f)

        val words = text.lowercase().split(Regex("\\W+")).filter { it.isNotBlank() }
        val totalWords = words.size.coerceAtLeast(1)
        val matchedCount = words.count { it in woundKeywords }
        val k = (matchedCount.toFloat() / totalWords).coerceIn(0f, 1f)

        val g = (w1 * s + w2 * k).coerceIn(0f, 1f)
        return GravityResult(
            gravity = g,
            sentimentComponent = s,
            keywordDensity = k,
            matchedKeywords = words.filter { it in woundKeywords },
            exceedsThreshold = g > SESSION_INVITATION_THRESHOLD
        )
    }

    /**
     * Convenience overload: compute gravity from pre-tokenised keyword hits.
     * Used when the LLM has already extracted wound keywords from blabber.
     */
    fun computeFromExtracted(
        sentimentPolarity: Float,
        extractedKeywordCount: Int,
        totalWordCount: Int
    ): GravityResult {
        val s = abs(sentimentPolarity).coerceIn(0f, 1f)
        val k = (extractedKeywordCount.toFloat() / totalWordCount.coerceAtLeast(1)).coerceIn(0f, 1f)
        val g = (w1 * s + w2 * k).coerceIn(0f, 1f)
        return GravityResult(
            gravity = g,
            sentimentComponent = s,
            keywordDensity = k,
            matchedKeywords = emptyList(),
            exceedsThreshold = g > SESSION_INVITATION_THRESHOLD
        )
    }
}

data class GravityResult(
    val gravity: Float,                    // G ∈ [0.0, 1.0]
    val sentimentComponent: Float,         // |S|
    val keywordDensity: Float,             // K
    val matchedKeywords: List<String>,     // words matched against wound set
    val exceedsThreshold: Boolean          // G > 0.8
)
