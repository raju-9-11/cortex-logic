package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.models.NeuralStateVector
import kotlinx.datetime.Clock

/**
 * In-memory NSV snapshot store.
 *
 * Persists a per-user point-in-time [NeuralStateVector] snapshot so that
 * trend computation can compare the current NSV against the previous session's
 * state. Snapshots expire after [SNAPSHOT_TTL_MS] (24 hours).
 *
 * ## Platform notes
 * This implementation is purely in-memory. Platform layers (Android, JS) can
 * optionally persist the snapshot across process restarts by serializing
 * [NsvSnapshot] on save and hydrating it on app launch.
 *
 * Ported from agnes TypeScript `nsv-snapshot-service.ts`.
 */
object NsvSnapshotService {

    const val SNAPSHOT_TTL_MS = 24L * 60L * 60L * 1000L // 24 hours

    data class NsvSnapshot(
        val timestamp: Long,
        /** Flat dot-notation map — e.g. "biological.sleepQuality" → 7.5 */
        val values: Map<String, Double>
    )

    private val store = mutableMapOf<String, NsvSnapshot>()

    /**
     * Persist the current NSV for [userId].
     * Flattens [nsv] to a dot-notation map before storing.
     */
    fun save(userId: String, nsv: NeuralStateVector) {
        store[userId] = NsvSnapshot(
            timestamp = Clock.System.now().toEpochMilliseconds(),
            values = flatten(nsv)
        )
    }

    /**
     * Load the stored snapshot for [userId].
     * Returns null if none exists or if the snapshot is older than [SNAPSHOT_TTL_MS].
     */
    fun load(userId: String): NsvSnapshot? {
        val snapshot = store[userId] ?: return null
        val age = Clock.System.now().toEpochMilliseconds() - snapshot.timestamp
        if (age > SNAPSHOT_TTL_MS) {
            store.remove(userId)
            return null
        }
        return snapshot
    }

    /** Remove a snapshot for [userId] (e.g. on sign-out). */
    fun clear(userId: String) {
        store.remove(userId)
    }

    // ── Internal ─────────────────────────────────────────────────────────────

    /**
     * Flattens a [NeuralStateVector] into a dot-notation numeric map.
     * Null NSV fields are omitted.
     */
    internal fun flatten(nsv: NeuralStateVector): Map<String, Double> {
        val result = mutableMapOf<String, Double>()

        nsv.biological.run {
            cnsFatigue?.let       { result["biological.cnsFatigue"] = it }
            sleepQuality?.let     { result["biological.sleepQuality"] = it }
            recoveryScore?.let    { result["biological.recoveryScore"] = it }
        }
        nsv.emotional.run {
            emotionalResilience?.let { result["emotional.emotionalResilience"] = it }
            stressLoad?.let          { result["emotional.stressLoad"] = it }
        }
        nsv.cognitive.run {
            energyBudget?.let      { result["cognitive.energyBudget"] = it }
            focusScore?.let        { result["cognitive.focusScore"] = it }
            activeLoad?.let        { result["cognitive.activeLoad"] = it }
            taskCompletionRate?.let { result["cognitive.taskCompletionRate"] = it }
        }
        nsv.planning.run {
            streakHealth?.let     { result["planning.streakHealth"] = it }
            deadlinePressure?.let { result["planning.deadlinePressure"] = it }
            goalAlignment?.let    { result["planning.goalAlignment"] = it }
            habitMomentum?.let    { result["planning.habitMomentum"] = it }
        }
        nsv.resource.run {
            financialFriction?.let { result["resource.financialFriction"] = it }
            resonanceROI?.let      { result["resource.resonanceROI"] = it }
        }

        return result
    }
}
