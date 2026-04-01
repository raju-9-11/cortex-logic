package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.model.orchestration.SpecVectorKey
import com.agnes.nexus.core.domain.models.NeuralStateVector
import kotlinx.serialization.Serializable

// ═══════════════════════════════════════════════════════════════════════════════
// Spec Vector Output Types
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
data class SpecVectorSnapshot(
    val resilience: Double?,
    val bandwidth: Double?,
    val vitality: Double?,
    val output: Double?,
    val friction: Double?
)

@Serializable
data class SpecVectorBreakdownEntry(
    val key: String,
    val value: Double
)

@Serializable
data class SpecVectorBreakdown(
    val vector: SpecVectorKey,
    val value: Double?,
    val inputs: List<SpecVectorBreakdownEntry>,
    val notes: List<String>
)

// ═══════════════════════════════════════════════════════════════════════════════
// SpecVectorCalculator
//
// Pure, stateless derivation of the five composite spec vectors from a
// NeuralStateVector. Mirrors agnes's spec-vector-service.ts exactly so
// both platforms produce identical values.
//
// All inputs are 0–10 scales; all outputs are normalised to 0–1.
// ═══════════════════════════════════════════════════════════════════════════════

object SpecVectorCalculator {

    private fun clamp01(value: Double) = value.coerceIn(0.0, 1.0)

    private fun clampTen(value: Double?): Double? {
        if (value == null || value.isNaN()) return null
        return value.coerceIn(0.0, 10.0)
    }

    private fun invertTen(value: Double?): Double? {
        val clamped = clampTen(value) ?: return null
        return 10.0 - clamped
    }

    private fun average(values: List<Double?>): Double? {
        val defined = values.filterNotNull().filter { it.isFinite() }
        if (defined.isEmpty()) return null
        return defined.sum() / defined.size
    }

    private fun normalizeTen(value: Double?): Double? {
        val clamped = clampTen(value) ?: return null
        return clamp01(clamped / 10.0)
    }

    fun selectResilience(nsv: NeuralStateVector): Double? =
        normalizeTen(nsv.emotional.emotionalResilience)

    fun selectBandwidth(nsv: NeuralStateVector): Double? {
        val composite = average(
            listOf(
                clampTen(nsv.cognitive.energyBudget),
                clampTen(nsv.cognitive.focusScore),
                invertTen(nsv.cognitive.activeLoad),
                invertTen(nsv.cognitive.planningLoad),
                invertTen(nsv.planning.deadlinePressure),
            )
        )
        return if (composite == null) null else clamp01(composite / 10.0)
    }

    fun selectVitality(nsv: NeuralStateVector): Double? {
        val composite = average(
            listOf(
                invertTen(nsv.biological.cnsFatigue),
                clampTen(nsv.biological.sleepQuality),
                clampTen(nsv.biological.recoveryScore),
            )
        )
        return if (composite == null) null else clamp01(composite / 10.0)
    }

    fun selectOutput(nsv: NeuralStateVector): Double? {
        val composite = average(
            listOf(
                clampTen(nsv.biological.recoveryScore),
                invertTen(nsv.biological.cnsFatigue),
                invertTen(nsv.biological.aerobicLoad),
                clampTen(nsv.cognitive.energyBudget),
            )
        )
        return if (composite == null) null else clamp01(composite / 10.0)
    }

    fun selectFriction(nsv: NeuralStateVector): Double? =
        normalizeTen(nsv.resource.financialFriction)

    fun getSnapshot(nsv: NeuralStateVector): SpecVectorSnapshot = SpecVectorSnapshot(
        resilience = selectResilience(nsv),
        bandwidth = selectBandwidth(nsv),
        vitality = selectVitality(nsv),
        output = selectOutput(nsv),
        friction = selectFriction(nsv),
    )

    fun getBreakdown(nsv: NeuralStateVector): List<SpecVectorBreakdown> = listOf(
        SpecVectorBreakdown(
            vector = SpecVectorKey.RESILIENCE,
            value = selectResilience(nsv),
            inputs = listOfNotNull(
                nsv.emotional.emotionalResilience?.let { SpecVectorBreakdownEntry("emotional.emotionalResilience", it) },
            ),
            notes = listOf("Directly mapped from the current emotional resilience metric."),
        ),
        SpecVectorBreakdown(
            vector = SpecVectorKey.BANDWIDTH,
            value = selectBandwidth(nsv),
            inputs = listOfNotNull(
                nsv.cognitive.energyBudget?.let { SpecVectorBreakdownEntry("cognitive.energyBudget", it) },
                nsv.cognitive.focusScore?.let { SpecVectorBreakdownEntry("cognitive.focusScore", it) },
                invertTen(nsv.cognitive.activeLoad)?.let { SpecVectorBreakdownEntry("cognitive.activeLoad_inverted", it) },
                invertTen(nsv.cognitive.planningLoad)?.let { SpecVectorBreakdownEntry("cognitive.planningLoad_inverted", it) },
                invertTen(nsv.planning.deadlinePressure)?.let { SpecVectorBreakdownEntry("planning.deadlinePressure_inverted", it) },
            ),
            notes = listOf("Bandwidth is derived from both cognitive and planning signals."),
        ),
        SpecVectorBreakdown(
            vector = SpecVectorKey.VITALITY,
            value = selectVitality(nsv),
            inputs = listOfNotNull(
                invertTen(nsv.biological.cnsFatigue)?.let { SpecVectorBreakdownEntry("biological.cnsFatigue_inverted", it) },
                nsv.biological.sleepQuality?.let { SpecVectorBreakdownEntry("biological.sleepQuality", it) },
                nsv.biological.recoveryScore?.let { SpecVectorBreakdownEntry("biological.recoveryScore", it) },
            ),
            notes = listOf("Vitality is an aggregate alias over biological readiness, not a stored base field."),
        ),
        SpecVectorBreakdown(
            vector = SpecVectorKey.OUTPUT,
            value = selectOutput(nsv),
            inputs = listOfNotNull(
                nsv.biological.recoveryScore?.let { SpecVectorBreakdownEntry("biological.recoveryScore", it) },
                invertTen(nsv.biological.cnsFatigue)?.let { SpecVectorBreakdownEntry("biological.cnsFatigue_inverted", it) },
                invertTen(nsv.biological.aerobicLoad)?.let { SpecVectorBreakdownEntry("biological.aerobicLoad_inverted", it) },
                nsv.cognitive.energyBudget?.let { SpecVectorBreakdownEntry("cognitive.energyBudget", it) },
            ),
            notes = listOf("Output is currently a compatibility aggregate; the platform lacks a first-class output metric."),
        ),
        SpecVectorBreakdown(
            vector = SpecVectorKey.FRICTION,
            value = selectFriction(nsv),
            inputs = listOfNotNull(
                nsv.resource.financialFriction?.let { SpecVectorBreakdownEntry("resource.financialFriction", it) },
            ),
            notes = listOf("Directly mapped from the current financial friction metric."),
        ),
    )
}
