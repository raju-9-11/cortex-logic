package com.agnes.ara.core.domain.service.ledger.aggregation

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*

/**
 * Credit score aggregation logic — ported from credit-aggregation.ts.
 *
 * All public functions accept/return JSON strings at the boundary.
 *
 * Complexity:
 *   computeCreditTrend   — O(n log n) for sort where n = history entries
 *   getCreditRating      — O(1)
 *   getImprovementTips   — O(1)
 *   inferCreditFactors   — O(1)
 */
object CreditAggregation {

    private val json = Json { ignoreUnknownKeys = true }

    // ── Internal model types ──────────────────────────────────────────────────

    @Serializable
    private data class CreditScoreEntry(
        val id: String,
        val score: Int,
        val bureau: String,
        val recordedAt: String,
        val notes: String? = null,
    )

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * Compute trend direction from a history of credit score entries.
     * Sorts descending by recordedAt and compares the two most recent entries.
     * Direction threshold: delta > 5 → "up", delta < -5 → "down", else "stable".
     *
     * @param historyJson JSON array of CreditScoreEntry objects.
     * @return JSON object: { direction, absoluteChange, latestScore, previousScore (nullable) }.
     */
    fun computeCreditTrend(historyJson: String): String {
        val history = json.decodeFromString<List<CreditScoreEntry>>(historyJson)

        if (history.isEmpty()) {
            return buildJsonObject {
                put("direction", "stable")
                put("absoluteChange", 0)
                put("latestScore", 0)
                put("previousScore", JsonNull)
            }.toString()
        }

        val sorted = history.sortedByDescending { it.recordedAt }
        val latest = sorted[0].score
        val previous = sorted.getOrNull(1)?.score

        val delta = if (previous != null) latest - previous else 0
        val direction = when {
            delta > 5 -> "up"
            delta < -5 -> "down"
            else -> "stable"
        }

        return buildJsonObject {
            put("direction", direction)
            put("absoluteChange", kotlin.math.abs(delta))
            put("latestScore", latest)
            if (previous != null) put("previousScore", previous) else put("previousScore", JsonNull)
        }.toString()
    }

    /**
     * Get a human-readable credit rating label and associated display color for a score.
     *
     * Score bands (FICO model):
     *   800+  → Exceptional (#10b981)
     *   740+  → Very Good   (#34d399)
     *   670+  → Good        (#fbbf24)
     *   580+  → Fair        (#f97316)
     *   < 580 → Poor        (#ef4444)
     *
     * @param score Credit score integer.
     * @return JSON object: { label, color }.
     */
    fun getCreditRating(score: Int): String = buildJsonObject {
        when {
            score >= 800 -> { put("label", "Exceptional"); put("color", "#10b981") }
            score >= 740 -> { put("label", "Very Good");   put("color", "#34d399") }
            score >= 670 -> { put("label", "Good");        put("color", "#fbbf24") }
            score >= 580 -> { put("label", "Fair");        put("color", "#f97316") }
            else         -> { put("label", "Poor");        put("color", "#ef4444") }
        }
    }.toString()

    /**
     * Return up to 4 actionable improvement tips based on the credit score.
     * Tips are ordered from most impactful (payment history) to supplemental.
     *
     * @param score Credit score integer.
     * @return JSON array of tip strings.
     */
    fun getImprovementTips(score: Int): String {
        val tips = mutableListOf<String>()
        if (score < 800) tips.add("Pay all bills on time — payment history is 35% of your FICO score.")
        if (score < 740) tips.add("Keep credit card utilization below 30% of each card's limit.")
        if (score < 700) tips.add("Avoid opening multiple new credit accounts in a short period.")
        if (score < 670) tips.add("Check your credit report for errors at annualcreditreport.com.")
        if (score < 620) tips.add("Consider a secured credit card to rebuild positive history.")
        tips.add("Keep older accounts open — length of credit history helps your score.")
        return JsonArray(tips.take(4).map { JsonPrimitive(it) }).toString()
    }

    /**
     * Infer likely credit factors and their impact level from a credit score.
     * Returns 5 standard FICO factors with positive/neutral/negative impact labels.
     *
     * @param score Credit score integer.
     * @return JSON array of CreditFactor objects: { name, impact, description }.
     */
    fun inferCreditFactors(score: Int): String {
        val factors = listOf(
            buildJsonObject {
                put("name", "Payment History")
                put("impact", if (score >= 700) "positive" else "negative")
                put(
                    "description",
                    if (score >= 700) "No recent missed payments detected."
                    else "Late payments can significantly hurt your score.",
                )
            },
            buildJsonObject {
                put("name", "Credit Utilization")
                put("impact", when {
                    score >= 740 -> "positive"
                    score >= 670 -> "neutral"
                    else -> "negative"
                })
                put(
                    "description",
                    if (score >= 740) "Utilization appears low — good standing."
                    else "Try to keep balances below 30% of your credit limit.",
                )
            },
            buildJsonObject {
                put("name", "Credit Age")
                put("impact", if (score >= 700) "positive" else "neutral")
                put("description", "Longer average credit history improves your score over time.")
            },
            buildJsonObject {
                put("name", "New Inquiries")
                put("impact", "neutral")
                put("description", "Hard inquiries from applications stay on your report for 2 years.")
            },
            buildJsonObject {
                put("name", "Credit Mix")
                put("impact", if (score >= 720) "positive" else "neutral")
                put("description", "Having a mix of revolving and installment accounts is beneficial.")
            },
        )
        return JsonArray(factors).toString()
    }
}
