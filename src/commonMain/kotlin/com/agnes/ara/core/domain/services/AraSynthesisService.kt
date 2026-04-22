package com.agnes.ara.core.domain.services

import com.agnes.ara.core.domain.models.NeuralStateVector
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.datetime.Clock

/**
 * AraSynthesisService — Cross-Module Conflict Detection & Resolution (shared parity).
 *
 * Ported from web `src/lib/services/nexus-synthesis-service.ts`.
 *
 * Responsibilities:
 * - detectConflicts(nsv): evaluate conflict matrix against NSV snapshot
 * - shouldSurface(conflict): block always, warn throttled (4h per conflict id)
 * - markSurfaced(conflict): set throttle timestamp + emit CONFLICT_DETECTED
 * - resolveConflict(conflictId, resolution): emit CONFLICT_RESOLVED and optional reroute cascades
 */
class AraSynthesisService(
    private val eventBus: SpineEventBus,
    private val scope: CoroutineScope,
) {
    enum class ConflictSeverity { WARN, BLOCK }
    enum class ConflictResolutionChoice { PROCEED, DEFER, REROUTE }

    data class ConflictResult(
        val id: String,
        val title: String,
        val affectedModules: List<String>,
        val severity: ConflictSeverity,
        val suggestedResolution: String,
        val detectedAt: Long
    )

    private val surfacedAt = mutableMapOf<String, Long>()
    private val resolutions = mutableMapOf<String, ConflictResolutionChoice>()
    private val resolutionTimestamps = mutableMapOf<String, Long>()

    private val FOUR_HOURS_MS = 4L * 60L * 60L * 1000L
    private val ONE_HOUR_MS = 1L * 60L * 60L * 1000L

    private fun nowMs(): Long = Clock.System.now().toEpochMilliseconds()

    private fun n(v: Double?): Double = v ?: -1.0

    /**
     * Scans the current NSV snapshot against the (web) Conflict Zone Matrix.
     *
     * Notes (parity with web):
     * - Conflicts the user resolved with `reroute` are excluded until the 1-hour expiry.
     * - Conflicts resolved with `proceed`/`defer` remain detectable (throttle controls surfacing).
     */
    fun detectConflicts(nsv: NeuralStateVector): List<ConflictResult> {
        val now = nowMs()
        val results = mutableListOf<ConflictResult>()

        val cnsFatigue = n(nsv.biological.cnsFatigue)
        val sleepQuality = n(nsv.biological.sleepQuality)
        val recoveryScore = n(nsv.biological.recoveryScore)
        val resilience = n(nsv.emotional.emotionalResilience)
        val stress = n(nsv.emotional.stressLoad)
        val activeLoad = n(nsv.cognitive.activeLoad)
        val planningLoad = n(nsv.cognitive.planningLoad)
        val interestDiversity = n(nsv.cognitive.interestDiversity)
        val deadlinePressure = n(nsv.planning.deadlinePressure)
        val streakHealth = n(nsv.planning.streakHealth)
        val friction = n(nsv.resource.financialFriction)

        // -----------------------------------------------------------------------
        // Task-specific conflict IDs (web GAP-06 spec)
        // -----------------------------------------------------------------------
        if (cnsFatigue >= 7.0 && resilience in 0.0..4.0) {
            results += ConflictResult(
                id = "CONFLICT_THERAPY_FATIGUE",
                title = "Titan \u2194 Agnes — Intensity / Therapy Timing",
                affectedModules = listOf("titan", "agnes"),
                severity = ConflictSeverity.BLOCK,
                suggestedResolution =
                    "CNS fatigue is high and resilience is low. Titan recommends deload; Agnes needs grounding before any intense session.",
                detectedAt = now
            )
        }

        if (friction >= 7.0 && stress >= 6.0) {
            results += ConflictResult(
                id = "CONFLICT_FINANCIAL_STRESS",
                title = "Ledger \u2194 Agnes — Financial Stress Loop",
                affectedModules = listOf("ledger", "agnes"),
                severity = ConflictSeverity.BLOCK,
                suggestedResolution =
                    "New financial commitments should be deferred until stress drops. Agnes can help process the emotional load first.",
                detectedAt = now
            )
        }

        if (cnsFatigue >= 7.0 && planningLoad >= 7.0) {
            results += ConflictResult(
                id = "CONFLICT_OVERLOAD_TRAINING",
                title = "Titan \u2194 Atlas — Overload / Training Conflict",
                affectedModules = listOf("titan", "atlas"),
                severity = ConflictSeverity.BLOCK,
                suggestedResolution =
                    "Both CNS fatigue and planning load are elevated. Defer high-intensity training and compress the active task list.",
                detectedAt = now
            )
        }

        if (stress >= 8.0 && streakHealth in 0.0..4.0) {
            results += ConflictResult(
                id = "CONFLICT_STRESS_HABIT",
                title = "Agnes \u2194 Forge — Stress / Habit Streak Conflict",
                affectedModules = listOf("agnes", "forge"),
                severity = ConflictSeverity.BLOCK,
                suggestedResolution =
                    "Stress is too high to sustain strict habit pressure. Temporarily relax Forge streak requirements.",
                detectedAt = now
            )
        }

        if (resilience in 0.0..3.0) {
            results += ConflictResult(
                id = "CONFLICT_RESILIENCE_DISPATCH",
                title = "Agnes — Critical Resilience Floor Breached",
                affectedModules = listOf("agnes", "orchestrator"),
                severity = ConflictSeverity.BLOCK,
                suggestedResolution =
                    "Emotional resilience is critically low. Agnes must intervene before any other module takes action.",
                detectedAt = now
            )
        }

        // -----------------------------------------------------------------------
        // Design-doc Conflict Zone Matrix — remaining 6 pairs
        // -----------------------------------------------------------------------
        if (cnsFatigue >= 8.0 && deadlinePressure >= 8.0) {
            results += ConflictResult(
                id = "TITAN_ATLAS_DEADLINE",
                title = "Titan \u2194 Atlas — Deadline / Fatigue Crisis",
                affectedModules = listOf("titan", "atlas"),
                severity = ConflictSeverity.BLOCK,
                suggestedResolution =
                    "Critical fatigue meets critical deadline pressure. Atlas must triage; Titan must enforce rest before execution.",
                detectedAt = now
            )
        }

        if (sleepQuality in 0.0..3.0 && resilience in 0.0..4.0) {
            results += ConflictResult(
                id = "AGNES_TITAN_SLEEP",
                title = "Titan \u2194 Agnes — Sleep / Resilience Deficit",
                affectedModules = listOf("titan", "agnes"),
                severity = ConflictSeverity.BLOCK,
                suggestedResolution =
                    "Poor sleep quality is compounding emotional fragility. Prioritise sleep hygiene; delay all demanding plans.",
                detectedAt = now
            )
        }

        if (stress >= 7.0 && activeLoad >= 8.0) {
            results += ConflictResult(
                id = "AGNES_ATLAS_CAPACITY",
                title = "Agnes \u2194 Atlas — Capacity Overload",
                affectedModules = listOf("agnes", "atlas"),
                severity = ConflictSeverity.BLOCK,
                suggestedResolution =
                    "Emotional stress is compounding cognitive overload. Atlas should reduce active tasks to three or fewer.",
                detectedAt = now
            )
        }

        if (recoveryScore in 0.0..3.0 && friction >= 8.0) {
            results += ConflictResult(
                id = "TITAN_LEDGER_RECOVERY",
                title = "Titan \u2194 Ledger — Recovery / Financial Strain",
                affectedModules = listOf("titan", "ledger"),
                severity = ConflictSeverity.WARN,
                suggestedResolution =
                    "Physical recovery is impaired alongside high financial friction. Avoid major financial decisions until recovery improves.",
                detectedAt = now
            )
        }

        if (planningLoad >= 8.0 && interestDiversity in 0.0..2.0) {
            results += ConflictResult(
                id = "ATLAS_SCOUT_HYPERFOCUS",
                title = "Atlas \u2194 Scout — Planning Hyperfocus",
                affectedModules = listOf("atlas", "scout"),
                severity = ConflictSeverity.WARN,
                suggestedResolution =
                    "Planning load is maxed while research interest diversity is narrow. Scout should defer new research threads.",
                detectedAt = now
            )
        }

        if (activeLoad >= 8.0 && friction >= 6.0) {
            results += ConflictResult(
                id = "ATLAS_LEDGER_COGNITIVE",
                title = "Atlas \u2194 Ledger — Cognitive / Financial Loop",
                affectedModules = listOf("atlas", "ledger"),
                severity = ConflictSeverity.WARN,
                suggestedResolution =
                    "Planning overload is amplifying financial friction. Reduce discretionary tasks and revisit budget commitments.",
                detectedAt = now
            )
        }

        if (cnsFatigue >= 7.0 && stress >= 7.0 && friction >= 6.0) {
            results += ConflictResult(
                id = "COMPOUND_3WAY",
                title = "Crisis — Biological + Emotional + Financial",
                affectedModules = listOf("titan", "agnes", "ledger"),
                severity = ConflictSeverity.BLOCK,
                suggestedResolution =
                    "Three domains are simultaneously critical. Immediate triage: rest first, emotional grounding second, financial review third.",
                detectedAt = now
            )
        }

        // Exclude rerouted conflicts until 1-hour resolution expiry
        return results.filter { conflict ->
            val resolution = resolutions[conflict.id]
            if (resolution != ConflictResolutionChoice.REROUTE) return@filter true
            val resolvedAt = resolutionTimestamps[conflict.id] ?: return@filter true
            now - resolvedAt >= ONE_HOUR_MS
        }
    }

    /**
     * Whether a detected conflict should be surfaced.
     *
     * Parity with web:
     * - block: always
     * - warn: throttle to at most once per 4 hours per conflict id
     */
    fun shouldSurface(conflict: ConflictResult): Boolean {
        if (conflict.severity == ConflictSeverity.BLOCK) return true
        val lastSeen = surfacedAt[conflict.id] ?: 0L
        return nowMs() - lastSeen >= FOUR_HOURS_MS
    }

    /**
     * Marks a conflict as surfaced and emits CONFLICT_DETECTED to Spine.
     *
     * Web parity:
     * - data: conflictId, severity, affectedModules
     */
    suspend fun markSurfaced(conflict: ConflictResult) {
        surfacedAt[conflict.id] = nowMs()
        eventBus.emit(
            SpineEventPayload(
                type = "CONFLICT_DETECTED",
                source = "nexus-synthesis",
                domain = "system",
                priority = if (conflict.severity == ConflictSeverity.BLOCK) "alert" else "info",
                data = mapOf(
                    "conflictId" to conflict.id,
                    "severity" to when (conflict.severity) {
                        ConflictSeverity.BLOCK -> "block"
                        ConflictSeverity.WARN -> "warn"
                    },
                    "affectedModules" to conflict.affectedModules
                )
            )
        )
    }

    /**
     * Records the user's resolution choice and emits the same Spine events as web:
     * - CONFLICT_RESOLVED (always)
     * - Optional reroute cascade event depending on conflictId + reroute choice
     *
     * Resolution entry is auto-expired after 1 hour to allow the conflict to re-emerge.
     */
    fun resolveConflict(conflictId: String, resolution: ConflictResolutionChoice) {
        resolutions[conflictId] = resolution
        resolutionTimestamps[conflictId] = nowMs()

        scope.launch {
            eventBus.emit(
                SpineEventPayload(
                    type = "CONFLICT_RESOLVED",
                    source = "nexus-synthesis",
                    domain = "system",
                    priority = "info",
                    data = mapOf(
                        "conflictId" to conflictId,
                        "resolution" to when (resolution) {
                            ConflictResolutionChoice.PROCEED -> "proceed"
                            ConflictResolutionChoice.DEFER -> "defer"
                            ConflictResolutionChoice.REROUTE -> "reroute"
                        }
                    )
                )
            )

            if (resolution == ConflictResolutionChoice.REROUTE) {
                emitRerouteEvent(conflictId)
            }
        }
    }

    private suspend fun emitRerouteEvent(conflictId: String) {
        val trainingConflicts = listOf(
            "CONFLICT_THERAPY_FATIGUE",
            "CONFLICT_OVERLOAD_TRAINING",
            "TITAN_ATLAS_DEADLINE",
            "AGNES_TITAN_SLEEP",
            "TITAN_LEDGER_RECOVERY"
        )

        if (trainingConflicts.contains(conflictId)) {
            eventBus.emit(
                SpineEventPayload(
                    type = "BLOCK_HIGH_INTENSITY",
                    source = "nexus-synthesis",
                    domain = "B",
                    priority = "alert",
                    data = mapOf("reason" to "conflict_reroute:$conflictId")
                )
            )
            return
        }

        if (conflictId == "CONFLICT_FINANCIAL_STRESS" || conflictId == "ATLAS_LEDGER_COGNITIVE") {
            eventBus.emit(
                SpineEventPayload(
                    type = "FINANCIAL_STRESS",
                    source = "nexus-synthesis",
                    domain = "R",
                    priority = "alert",
                    data = mapOf("reason" to "conflict_reroute:$conflictId")
                )
            )
            return
        }

        if (conflictId == "COMPOUND_3WAY") {
            eventBus.emit(
                SpineEventPayload(
                    type = "CRISIS_MODE",
                    source = "nexus-synthesis",
                    domain = "system",
                    priority = "critical",
                    data = mapOf("reason" to "conflict_reroute:$conflictId")
                )
            )
        }
    }
}

