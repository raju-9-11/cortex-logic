package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.models.NeuralStateVector
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import kotlinx.serialization.json.buildJsonArray
import kotlin.js.JsExport
import kotlin.math.max
import kotlin.math.min
import kotlin.math.round

/**
 * JS facade exposing the pure computation methods from AtlasPredictiveService.
 *
 * The full KMP AtlasPredictiveService requires SpineEventBus, NeuralProjectionService,
 * and a CoroutineScope — all platform-specific dependencies. Only the stateless
 * mathematical methods are implemented inline here, matching the TS source exactly.
 *
 * Original three methods:
 *   computeEffectiveEnergyBudget, getSafePlanningThreshold, isOverloaded
 *
 * New methods (ported from atlas-predictive-service.ts):
 *   computeBurnoutTrajectoryScore, computeTransitionRisk, evaluateNextState, flattenEnergyWave
 */
@JsExport
class AtlasPredictiveEngineJs {

    private val json = Json { ignoreUnknownKeys = true; coerceInputValues = true }

    /**
     * Compute the effective energy budget with biological, emotional, and resource modifiers.
     *
     * @param nsvJson JSON NeuralStateVector.
     * @return Effective energy budget clamped to [0.0, 10.0].
     */
    fun computeEffectiveEnergyBudget(nsvJson: String): Double {
        val nsv = parseNsv(nsvJson)
        return computeEffectiveBudget(nsv)
    }

    /**
     * Returns the safe planning threshold (80% of effective energy budget).
     *
     * @param nsvJson JSON NeuralStateVector.
     */
    fun getSafePlanningThreshold(nsvJson: String): Double {
        val nsv = parseNsv(nsvJson)
        return computeEffectiveBudget(nsv) * 0.8
    }

    /**
     * Returns true if totalEnergyCost exceeds the safe planning threshold.
     *
     * @param totalEnergyCost Sum of energy costs for all planned tasks.
     * @param nsvJson         JSON NeuralStateVector.
     */
    fun isOverloaded(totalEnergyCost: Double, nsvJson: String): Boolean {
        val nsv = parseNsv(nsvJson)
        return totalEnergyCost > computeEffectiveBudget(nsv) * 0.8
    }

    // ─── New computation methods (ported from atlas-predictive-service.ts) ──

    /**
     * Compute a 0–10 burnout trajectory score from a history of NSV snapshots.
     *
     * Rising bad signals (cnsFatigue, stressLoad, planningLoad, deadlinePressure)
     * and falling good signals (emotionalResilience, streakHealth) contribute weighted scores.
     *
     * @param nsvHistoryJson JSON array of NeuralStateVector snapshots, newest first.
     * @return Score in [0, 10], one decimal place.
     */
    fun computeBurnoutTrajectoryScore(nsvHistoryJson: String): Double {
        val history = parseNsvList(nsvHistoryJson)
        if (history.size < 2) return 0.0

        val newest = history[0]
        val oldest = history[history.size - 1]

        fun getNsv(nsv: NeuralStateVector, domain: String): Double = when (domain) {
            "cnsFatigue" -> nsv.biological.cnsFatigue ?: 0.0
            "stressLoad" -> nsv.emotional.stressLoad ?: 0.0
            "planningLoad" -> nsv.cognitive.planningLoad ?: 0.0
            "deadlinePressure" -> nsv.planning.deadlinePressure ?: 0.0
            "emotionalResilience" -> nsv.emotional.emotionalResilience ?: 0.0
            "streakHealth" -> nsv.planning.streakHealth ?: 0.0
            else -> 0.0
        }

        val score =
            max(0.0, getNsv(newest, "cnsFatigue") - getNsv(oldest, "cnsFatigue")) / 10.0 * 2.0 +
            max(0.0, getNsv(newest, "stressLoad") - getNsv(oldest, "stressLoad")) / 10.0 * 2.0 +
            max(0.0, getNsv(newest, "planningLoad") - getNsv(oldest, "planningLoad")) / 10.0 * 1.5 +
            max(0.0, getNsv(newest, "deadlinePressure") - getNsv(oldest, "deadlinePressure")) / 10.0 * 1.5 +
            max(0.0, -(getNsv(newest, "emotionalResilience") - getNsv(oldest, "emotionalResilience"))) / 10.0 * 2.0 +
            max(0.0, -(getNsv(newest, "streakHealth") - getNsv(oldest, "streakHealth"))) / 10.0 * 1.0

        return round(min(10.0, score) * 10.0) / 10.0
    }

    /**
     * Returns the probability (0.0–1.0) of a state transition based on metric velocity.
     * If the aggregate of planningLoad + deadlinePressure + cnsFatigue rises > 1.5 points,
     * risk = delta / 5 clamped to 1.0.
     *
     * @param currentNsvJson  JSON of the most recent NeuralStateVector.
     * @param previousNsvJson JSON of the previous NeuralStateVector.
     */
    fun computeTransitionRisk(currentNsvJson: String, previousNsvJson: String): Double {
        val current = parseNsv(currentNsvJson)
        val previous = parseNsv(previousNsvJson)

        fun agg(nsv: NeuralStateVector) =
            (nsv.cognitive.planningLoad ?: 0.0) +
            (nsv.planning.deadlinePressure ?: 0.0) +
            (nsv.biological.cnsFatigue ?: 0.0)

        val delta = agg(current) - agg(previous)
        return if (delta > 0.0) min(1.0, delta / 5.0) else 0.0
    }

    /**
     * Atlas risk state machine: evaluates the next state given current state, NSV, and
     * consecutive clean evaluation count. Returns a JSON result the TS service uses
     * to update state and emit Spine events.
     *
     * Burnout detection: 2-of-3 domain crises (resilience ≤ 3 OR cnsFatigue ≥ 8 OR financialFriction ≥ 7).
     *
     * Transitions:
     *   Normal → Compressed: planningLoad ≥ 6 OR deadlinePressure ≥ 6
     *   Compressed → Overloaded: planningLoad ≥ 8 AND deadlinePressure ≥ 6
     *   Compressed → Normal: both < 6 for 2 consecutive clean evals
     *   Overloaded → Compressed: both < 6 for 2 consecutive clean evals
     *   Recovery → Compressed: both < 4 for 2 consecutive clean evals
     *
     * @param currentState         Current AtlasState string.
     * @param nsvJson              Current NeuralStateVector JSON.
     * @param consecutiveClearCount Number of consecutive clean evaluations so far.
     * @return JSON { nextState, newCleanCount, isBurnout, emitOverload }
     */
    fun evaluateNextState(currentState: String, nsvJson: String, consecutiveClearCount: Int): String {
        val nsv = parseNsv(nsvJson)

        // Raw metric extraction (matches TS: planningLoad fallback to deadlinePressure)
        val rawPlanningLoad = nsv.cognitive.planningLoad ?: nsv.planning.deadlinePressure ?: 0.0
        val rawDeadlinePressure = nsv.planning.deadlinePressure ?: 0.0
        val planningLoad = if (rawPlanningLoad.isFinite()) rawPlanningLoad else 0.0
        val deadlinePressure = if (rawDeadlinePressure.isFinite()) rawDeadlinePressure else 0.0

        // Burnout detection: 2-of-3 domain crises
        val resilience = nsv.emotional.emotionalResilience ?: -1.0
        val cnsFatigue = nsv.biological.cnsFatigue ?: -1.0
        val financialFriction = nsv.resource.financialFriction ?: -1.0
        val emotionalCrisis = resilience != -1.0 && resilience <= 3.0
        val biologicalCrisis = cnsFatigue != -1.0 && cnsFatigue >= 8.0
        val resourceCrisis = financialFriction != -1.0 && financialFriction >= 7.0
        val isBurnout = listOf(emotionalCrisis, biologicalCrisis, resourceCrisis).count { it } >= 2

        if (isBurnout) {
            return buildJsonObject {
                put("nextState", "Recovery")
                put("newCleanCount", 0)
                put("isBurnout", true)
                put("emitOverload", false)
            }.toString()
        }

        var nextState = currentState
        var newCleanCount = consecutiveClearCount
        var emitOverload = false

        when (currentState) {
            "Normal" -> {
                if (planningLoad >= 6.0 || deadlinePressure >= 6.0) {
                    nextState = "Compressed"; newCleanCount = 0
                }
            }
            "Compressed" -> {
                if (planningLoad >= 8.0 && deadlinePressure >= 6.0) {
                    nextState = "Overloaded"; newCleanCount = 0; emitOverload = true
                } else if (planningLoad < 6.0 && deadlinePressure < 6.0) {
                    newCleanCount = consecutiveClearCount + 1
                    if (newCleanCount >= 2) { nextState = "Normal"; newCleanCount = 0 }
                } else {
                    newCleanCount = 0
                }
            }
            "Overloaded" -> {
                if (planningLoad < 6.0 && deadlinePressure < 6.0) {
                    newCleanCount = consecutiveClearCount + 1
                    if (newCleanCount >= 2) { nextState = "Compressed"; newCleanCount = 0 }
                } else {
                    newCleanCount = 0
                }
            }
            "Recovery" -> {
                if (planningLoad < 4.0 && deadlinePressure < 4.0) {
                    newCleanCount = consecutiveClearCount + 1
                    if (newCleanCount >= 2) { nextState = "Compressed"; newCleanCount = 0 }
                } else {
                    newCleanCount = 0
                }
            }
        }

        return buildJsonObject {
            put("nextState", nextState)
            put("newCleanCount", newCleanCount)
            put("isBurnout", false)
            put("emitOverload", emitOverload)
        }.toString()
    }

    /**
     * Energy-wave flattening algorithm:
     * - Day 0: energy/focus/load reduced by 20%
     * - Freed capacity redistributed: day+1 40%, day+2 35%, day+3 25%
     *
     * @param energyWaveJson JSON array of { energy, focus, load }
     * @param reason         Reason string for the flattening
     * @return JSON FlatteningPlan { budgetCap, rescaledWave, deferrals, recoveryExtensions, flattenedUntil, reason }
     */
    fun flattenEnergyWave(energyWaveJson: String, reason: String): String {
        @kotlinx.serialization.Serializable
        data class WavePoint(val energy: Double = 0.0, val focus: Double = 0.0, val load: Double = 0.0)

        val wave = json.decodeFromString<List<WavePoint>>(energyWaveJson)
        val rescaled = wave.map { it.copy() }.toMutableList()

        val flattenedUntil = js("new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()") as String

        if (rescaled.isEmpty()) {
            return buildJsonObject {
                put("budgetCap", 0.8)
                put("rescaledWave", buildJsonArray {})
                put("deferrals", buildJsonArray {})
                put("recoveryExtensions", buildJsonArray {})
                put("flattenedUntil", flattenedUntil)
                put("reason", reason)
            }.toString()
        }

        val removedEnergy = rescaled[0].energy * 0.2
        val removedFocus = rescaled[0].focus * 0.2
        val removedLoad = rescaled[0].load * 0.2

        rescaled[0] = rescaled[0].copy(
            energy = round((rescaled[0].energy - removedEnergy) * 100.0) / 100.0,
            focus = round((rescaled[0].focus - removedFocus) * 100.0) / 100.0,
            load = round((rescaled[0].load - removedLoad) * 100.0) / 100.0,
        )

        val weights = listOf(0.4, 0.35, 0.25)
        for (i in 1..3) {
            if (i >= rescaled.size) break
            val w = weights[i - 1]
            val pt = rescaled[i]
            rescaled[i] = pt.copy(
                energy = min(10.0, round((pt.energy + removedEnergy * w) * 100.0) / 100.0),
                focus = min(10.0, round((pt.focus + removedFocus * w) * 100.0) / 100.0),
                load = min(10.0, round((pt.load + removedLoad * w) * 100.0) / 100.0),
            )
        }

        return buildJsonObject {
            put("budgetCap", 0.8)
            put("rescaledWave", buildJsonArray {
                rescaled.forEach { p ->
                    add(buildJsonObject {
                        put("energy", p.energy); put("focus", p.focus); put("load", p.load)
                    })
                }
            })
            put("deferrals", buildJsonArray {})
            put("recoveryExtensions", buildJsonArray {})
            put("flattenedUntil", flattenedUntil)
            put("reason", reason)
        }.toString()
    }

    // ─── Private helpers ─────────────────────────────────────────────────────

    /** Safely deserialize a JSON string to NeuralStateVector, returning defaults on failure. */
    private fun parseNsv(nsvJson: String): NeuralStateVector {
        return try {
            json.decodeFromString<NeuralStateVector>(nsvJson)
        } catch (_: Exception) {
            NeuralStateVector()
        }
    }

    /** Safely deserialize a JSON array of NeuralStateVector snapshots, returning empty list on failure. */
    private fun parseNsvList(nsvListJson: String): List<NeuralStateVector> {
        return try {
            json.decodeFromString<List<NeuralStateVector>>(nsvListJson)
        } catch (_: Exception) {
            emptyList()
        }
    }

    /** Pure energy budget computation — matches AtlasPredictiveService.computeEffectiveEnergyBudget. */
    private fun computeEffectiveBudget(nsv: NeuralStateVector): Double {
        var budget = nsv.cognitive.energyBudget ?: 5.0

        val sleepQuality = nsv.biological.sleepQuality ?: 5.0
        if (sleepQuality < 4) {
            budget -= 2
        }

        val cnsFatigue = nsv.biological.cnsFatigue ?: 0.0
        if (cnsFatigue > 7) {
            budget = budget.coerceAtMost(4.0)
        }

        val stressLoad = nsv.emotional.stressLoad ?: 0.0
        if (stressLoad > 7) {
            budget -= 1
        }

        val financialFriction = nsv.resource.financialFriction ?: 0.0
        if (financialFriction > 8) {
            budget -= 1
        }

        return budget.coerceIn(0.0, 10.0)
    }
}
