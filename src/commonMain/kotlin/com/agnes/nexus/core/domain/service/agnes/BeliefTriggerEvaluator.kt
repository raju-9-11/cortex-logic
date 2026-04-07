package com.agnes.nexus.core.domain.service.agnes

import com.agnes.nexus.core.domain.models.BeliefGraph
import com.agnes.nexus.core.domain.models.BeliefNode
import kotlin.math.min
import kotlin.math.round

/**
 * Pure rule-based evaluator for Agnes belief-session invitations.
 *
 * Ported from the TS `belief-trigger-service.ts`:
 * - [evaluateThreshold]: determines whether the current belief graph
 *   warrants an Agnes support session invitation.
 * - [getTriggeringNodes]: filters the graph to the nodes that triggered
 *   the invitation.
 *
 * **Intensity range**: operates in **0–10** (same as [BeliefGraphCompactionService]).
 *
 * Orchestration wiring (gate evaluation, runtime assembly, master-thread
 * snapshot) remains in the TS layer.
 */
class BeliefTriggerEvaluator {

    companion object {
        /** Nodes with intensity ≥ this are "high-intensity". */
        private const val HIGH_INTENSITY_THRESHOLD = 7.0f

        /** Nodes with intensity ≥ this are "severe". */
        private const val SEVERE_INTENSITY_THRESHOLD = 9.0f

        /** Minimum high-intensity negative count to trigger. */
        private const val MIN_HIGH_INTENSITY_COUNT = 2

        /** Minimum negative density count. */
        private const val MIN_NEGATIVE_DENSITY_COUNT = 3

        /** Average negative intensity floor for density rule. */
        private const val AVG_NEGATIVE_INTENSITY_FLOOR = 6.5f

        /** Stress load threshold for severe-belief + stress rule. */
        private const val STRESS_THRESHOLD = 7.0f

        /** Resilience ceiling for severe-belief + low-resilience rule. */
        private const val RESILIENCE_CEILING = 4.0f

        /** Max triggering belief labels to include. */
        private const val MAX_TRIGGERING_LABELS = 4

        // ── Confidence formula constants ──
        private const val CONFIDENCE_BASE = 0.68
        private const val CONFIDENCE_PER_HIGH_INTENSITY = 0.06
        private const val CONFIDENCE_HIGH_INTENSITY_CAP = 0.18
        private const val CONFIDENCE_STRESS_BONUS = 0.08
        private const val CONFIDENCE_RESILIENCE_BONUS = 0.08
    }

    /**
     * Evaluation result matching the TS `BeliefInvitationDecision` interface.
     */
    data class InvitationDecision(
        val shouldInvite: Boolean,
        val summary: String,
        val rationale: List<String>,
        val fingerprint: String,
        val confidence: Double,
        val triggeringBeliefs: List<String>,
        val metrics: Metrics
    )

    data class Metrics(
        val totalNodes: Int,
        val negativeCount: Int,
        val highIntensityNegativeCount: Int,
        val severeNegativeCount: Int,
        val averageNegativeIntensity: Double,
        val resilience: Double?,
        val stressLoad: Double?
    )

    /**
     * Evaluate whether the belief graph crosses the invitation threshold.
     *
     * @param graph The current belief graph (nullable — treated as empty).
     * @param emotionalResilience 0–10 resilience score, or null if unknown.
     * @param stressLoad 0–10 stress score, or null if unknown.
     */
    fun evaluateThreshold(
        graph: BeliefGraph?,
        emotionalResilience: Double? = null,
        stressLoad: Double? = null
    ): InvitationDecision {
        val nodes = graph?.nodes ?: emptyList()
        val negativeNodes = nodes.filter { it.valence == "negative" }
        val highIntensityNegatives = negativeNodes.filter { it.intensity >= HIGH_INTENSITY_THRESHOLD }
        val severeNegatives = negativeNodes.filter { it.intensity >= SEVERE_INTENSITY_THRESHOLD }

        val averageNegativeIntensity = if (negativeNodes.isNotEmpty()) {
            round1(negativeNodes.sumOf { it.intensity.toDouble() } / negativeNodes.size)
        } else {
            0.0
        }

        val rationale = mutableListOf<String>()

        if (highIntensityNegatives.size >= MIN_HIGH_INTENSITY_COUNT) {
            rationale.add(
                "${highIntensityNegatives.size} high-intensity negative beliefs are active in the graph."
            )
        }

        if (negativeNodes.size >= MIN_NEGATIVE_DENSITY_COUNT &&
            averageNegativeIntensity >= AVG_NEGATIVE_INTENSITY_FLOOR
        ) {
            rationale.add(
                "Negative belief density is elevated (${negativeNodes.size} beliefs averaging $averageNegativeIntensity/10)."
            )
        }

        if (severeNegatives.isNotEmpty() && (stressLoad ?: 0.0) >= STRESS_THRESHOLD) {
            rationale.add("A severe negative belief is paired with a high stress signal.")
        }

        if (severeNegatives.isNotEmpty() && (emotionalResilience ?: 10.0) <= RESILIENCE_CEILING) {
            rationale.add("A severe negative belief is paired with low emotional resilience.")
        }

        val triggeringBeliefs = (highIntensityNegatives + severeNegatives)
            .map { it.label.trim() }
            .filter { it.isNotEmpty() }
            .distinct()
            .take(MAX_TRIGGERING_LABELS)

        val uniqueReasonKeys = rationale.map { it.lowercase() }
        val fingerprint = buildString {
            append(uniqueReasonKeys.joinToString("|").ifEmpty { "none" })
            triggeringBeliefs.forEach { label ->
                append("::")
                append(label.lowercase())
            }
            append("::stress:${stressLoad ?: "na"}")
            append("::resilience:${emotionalResilience ?: "na"}")
        }

        val shouldInvite = rationale.isNotEmpty()
        val confidence = (
            CONFIDENCE_BASE +
                min(CONFIDENCE_HIGH_INTENSITY_CAP, highIntensityNegatives.size * CONFIDENCE_PER_HIGH_INTENSITY) +
                (if (stressLoad != null && stressLoad >= STRESS_THRESHOLD) CONFIDENCE_STRESS_BONUS else 0.0) +
                (if (emotionalResilience != null && emotionalResilience <= RESILIENCE_CEILING) CONFIDENCE_RESILIENCE_BONUS else 0.0)
            ).coerceIn(0.0, 1.0)

        return InvitationDecision(
            shouldInvite = shouldInvite,
            summary = if (shouldInvite) {
                "Agnes can help unpack this pattern before it hardens into the next session gap."
            } else {
                "Belief graph does not currently meet invitation thresholds."
            },
            rationale = rationale,
            fingerprint = fingerprint,
            confidence = confidence,
            triggeringBeliefs = triggeringBeliefs,
            metrics = Metrics(
                totalNodes = nodes.size,
                negativeCount = negativeNodes.size,
                highIntensityNegativeCount = highIntensityNegatives.size,
                severeNegativeCount = severeNegatives.size,
                averageNegativeIntensity = averageNegativeIntensity,
                resilience = emotionalResilience,
                stressLoad = stressLoad
            )
        )
    }

    /**
     * Filter a belief graph to the nodes that triggered the invitation.
     *
     * @param graph The belief graph.
     * @param triggeringBeliefLabels The labels from [InvitationDecision.triggeringBeliefs].
     */
    fun getTriggeringNodes(
        graph: BeliefGraph?,
        triggeringBeliefLabels: List<String>
    ): List<BeliefNode> {
        if (graph == null || triggeringBeliefLabels.isEmpty()) return emptyList()
        val labelSet = triggeringBeliefLabels.map { it.trim().lowercase() }.toSet()
        return graph.nodes.filter { node ->
            node.label.trim().lowercase() in labelSet
        }
    }

    private fun round1(value: Double): Double {
        return round(value * 10) / 10
    }
}
