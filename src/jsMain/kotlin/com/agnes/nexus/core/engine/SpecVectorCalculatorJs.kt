package com.agnes.nexus.core.engine

import kotlin.js.JsExport

/**
 * JS-safe snapshot of the five composite spec vectors.
 */
@JsExport
class SpecVectorSnapshotJs(
    val resilience: Double?,
    val bandwidth: Double?,
    val vitality: Double?,
    val output: Double?,
    val friction: Double?,
)

/** Single NSV field contributing to a spec vector breakdown. */
@JsExport
class SpecVectorBreakdownEntryJs(val key: String, val value: Double)

/**
 * Breakdown of how a single spec vector was computed.
 * [vector] is the string key: "resilience" | "bandwidth" | "vitality" | "output" | "friction"
 */
@JsExport
class SpecVectorBreakdownJs(
    val vector: String,
    val value: Double?,
    val inputs: Array<SpecVectorBreakdownEntryJs>,
    val notes: Array<String>,
)

/**
 * JS-exportable bridge for [SpecVectorCalculator].
 *
 * All methods accept a [NeuralStateVectorJs] (JSON-boundary wrapper) and return
 * plain JS-safe types. Create a single instance and reuse it.
 *
 * Usage:
 * ```ts
 * const calc = new SpecVectorCalculatorJs()
 * const snap = calc.getSnapshot(new NeuralStateVectorJs(JSON.stringify(nsv)))
 * console.log(snap.resilience, snap.bandwidth)
 * ```
 */
@JsExport
class SpecVectorCalculatorJs {

    fun getSnapshot(nsv: NeuralStateVectorJs): SpecVectorSnapshotJs {
        val snap = SpecVectorCalculator.getSnapshot(nsv.nsv)
        return SpecVectorSnapshotJs(snap.resilience, snap.bandwidth, snap.vitality, snap.output, snap.friction)
    }

    fun getBreakdown(nsv: NeuralStateVectorJs): Array<SpecVectorBreakdownJs> =
        SpecVectorCalculator.getBreakdown(nsv.nsv).map { bd ->
            SpecVectorBreakdownJs(
                vector = bd.vector.key,
                value = bd.value,
                inputs = bd.inputs.map { SpecVectorBreakdownEntryJs(it.key, it.value) }.toTypedArray(),
                notes = bd.notes.toTypedArray(),
            )
        }.toTypedArray()

    fun selectResilience(nsv: NeuralStateVectorJs): Double? = SpecVectorCalculator.selectResilience(nsv.nsv)
    fun selectBandwidth(nsv: NeuralStateVectorJs): Double? = SpecVectorCalculator.selectBandwidth(nsv.nsv)
    fun selectVitality(nsv: NeuralStateVectorJs): Double? = SpecVectorCalculator.selectVitality(nsv.nsv)
    fun selectOutput(nsv: NeuralStateVectorJs): Double? = SpecVectorCalculator.selectOutput(nsv.nsv)
    fun selectFriction(nsv: NeuralStateVectorJs): Double? = SpecVectorCalculator.selectFriction(nsv.nsv)
}
