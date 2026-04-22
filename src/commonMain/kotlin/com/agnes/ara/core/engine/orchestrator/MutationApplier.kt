package com.agnes.ara.core.engine.orchestrator

import com.agnes.ara.core.domain.model.GlobalSoul
import com.agnes.ara.core.domain.model.GlobalSoulVector
import com.agnes.ara.core.domain.model.SoulMutation
import com.agnes.ara.core.domain.services.SpineSoulMutation
import kotlinx.datetime.Clock

/**
 * Applies a batch of [SpineSoulMutation]s atomically to a [GlobalSoul].
 *
 * Mutation rules:
 * - All resulting vector values are clamped to [0.0, 1.0] (enforced by [GlobalSoul.applyMutation]).
 * - Unrecognised vector names are silently skipped — callers receive the partially-applied result.
 * - An empty mutations list is a no-op; the original soul is returned unchanged.
 * - [updatedAt] is refreshed on every non-trivial application.
 *
 * Complexity: O(m) where m = number of mutations in the batch.
 */
class MutationApplier {

    /**
     * Apply a list of [SpineSoulMutation]s (sourced from [SpineEvent.payload.mutations]) to [soul].
     *
     * @param soul      The current GlobalSoul state to mutate.
     * @param mutations The list of vector deltas to apply in order.
     * @return A new [GlobalSoul] with all recognised mutations applied and [GlobalSoul.updatedAt] refreshed.
     */
    fun apply(soul: GlobalSoul, mutations: List<SpineSoulMutation>): GlobalSoul {
        if (mutations.isEmpty()) return soul

        val typed: List<SoulMutation> = mutations.mapNotNull { m ->
            GlobalSoulVector.fromName(m.vector)?.let { vector ->
                SoulMutation(vector, m.delta)
            }
        }

        // applyMutations handles per-vector clamping internally
        return soul.applyMutations(typed).copy(
            lastUpdated = Clock.System.now().toEpochMilliseconds()
        )
    }

    /**
     * Compute the net delta for a single [vector] across an entire batch.
     *
     * Useful for preview or display of the cumulative effect before committing.
     * The result is clamped to [-1.0, 1.0] — the maximum single-call swing on any vector.
     *
     * @param vector    The [GlobalSoulVector] dimension to sum.
     * @param mutations The full batch to scan (only matching vector entries are summed).
     * @return Net delta in [-1.0, 1.0].
     */
    fun netDelta(vector: GlobalSoulVector, mutations: List<SpineSoulMutation>): Float =
        mutations
            .filter { it.vector.equals(vector.name, ignoreCase = true) }
            .sumOf { it.delta.toDouble() }
            .toFloat()
            .coerceIn(-1.0f, 1.0f)
}
