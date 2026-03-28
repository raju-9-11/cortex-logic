package com.agnes.nexus.core.domain.service.titan

import com.agnes.nexus.core.domain.model.AutopilotLevel
import com.agnes.nexus.core.domain.model.ClearanceStatus
import com.agnes.nexus.core.domain.model.TitanUiMode
import com.agnes.nexus.core.domain.models.ClearanceRecord
import com.agnes.nexus.core.domain.models.SomaProfile
import com.agnes.nexus.core.domain.models.TitanClearanceOverrideRecord
import com.agnes.nexus.core.domain.models.TitanSystemDebtRecord
import com.agnes.nexus.core.domain.models.TrainerProfile
import com.agnes.nexus.core.domain.services.SpineEventBus
import com.agnes.nexus.core.domain.services.SpineEventPayload
import kotlin.math.max
import kotlin.math.min
import kotlin.math.pow
import kotlin.math.roundToInt

/**
 * Computes Titan clearance status via the Triple-Check Clearance Protocol (Spec §3.2).
 *
 * Three independent gates run before any Performance session:
 *   1. Composite Clearance Score: score = (vitality × 0.6) + (resilience × 0.4)
 *      If score < 0.4 → REVOKED; morphs "Start Workout" → "Initiate Recovery".
 *   2. HRV Delta check: if hrv_delta < -20% (-0.20f) → WARNING; propose 20% volume reduction.
 *   3. Agnes Resilience check: if resilience < 0.2 → VETO; propose "Rest" or low-stiffness cardio.
 *
 * Legacy CNS Calibration Matrix (kept for backward compat):
 *   cnsLoad > 0.85 OR somaReadiness < 0.15 → REVOKED
 *   cnsLoad > 0.70 OR somaReadiness < 0.30 → RESTRICTED
 */
class ClearanceService(
    private val eventBus: SpineEventBus
) {

    // ── Composite Clearance Score ──────────────────────────────────────────────────

    /**
     * Spec §3.2 composite formula.
     * Clearance = (vitality × 0.6) + (resilience × 0.4)
     * Score < 0.4 → REVOKED (force Recovery Mode).
     */
    fun computeCompositeClearanceScore(vitality: Float, resilience: Float): Float =
        (vitality * 0.6f) + (resilience * 0.4f)

    fun clearanceStatusFromComposite(score: Float): ClearanceStatus = when {
        score < 0.4f -> ClearanceStatus.REVOKED
        score < 0.55f -> ClearanceStatus.RESTRICTED
        else -> ClearanceStatus.CLEARED
    }

    // ── Legacy CNS matrix (backward compat) ───────────────────────────────────────

    /**
     * Compute clearance status from Soma readiness + CNS load index.
     *
     * @param somaReadiness  Normalized soma readiness score (0.0–1.0)
     * @param cnsLoadIndex   Normalized CNS fatigue (0.0–1.0; higher = more fatigued)
     */
    fun computeClearance(somaReadiness: Float, cnsLoadIndex: Float): ClearanceStatus = when {
        cnsLoadIndex > 0.85f || somaReadiness < 0.15f -> ClearanceStatus.REVOKED
        cnsLoadIndex > 0.7f  || somaReadiness < 0.3f  -> ClearanceStatus.RESTRICTED
        else                                           -> ClearanceStatus.CLEARED
    }

    /**
     * Compute the UI mode signal from clearance status.
     * REVOKED/RESTRICTED → RECOVERY mode.
     * CLEARED            → PERFORMANCE mode.
     */
    fun computeUiMode(clearance: ClearanceStatus): TitanUiMode = when (clearance) {
        ClearanceStatus.CLEARED    -> TitanUiMode.PERFORMANCE
        ClearanceStatus.RESTRICTED -> TitanUiMode.RECOVERY
        ClearanceStatus.REVOKED    -> TitanUiMode.RECOVERY
    }

    // ── Triple-Check Clearance Protocol ───────────────────────────────────────────

    /**
     * Full Triple-Check protocol — runs all 3 gates before a Performance session.
     *
     * @param vitality      GlobalSoul.vitality (0.0–1.0)
     * @param resilience    GlobalSoul.resilience (0.0–1.0) from Agnes
     * @param hrvDelta      Fractional HRV change vs. 7-day baseline; e.g. -0.25 = -25%
     * @param routineId     The pending routine/session ID (for caching to Horizon if vetoed)
     * @param autopilotLevel Current autopilot level (governs proposal vs silent action)
     * @return Resolved [ClearanceStatus] after all gates evaluated
     */
    suspend fun runTripleCheckClearance(
        vitality: Float,
        resilience: Float,
        hrvDelta: Float,
        routineId: String?,
        autopilotLevel: AutopilotLevel
    ): ClearanceStatus {
        // Gate 1 — composite score
        val score = computeCompositeClearanceScore(vitality, resilience)
        val compositeStatus = clearanceStatusFromComposite(score)

        if (compositeStatus == ClearanceStatus.REVOKED) {
            emitClearanceVeto(
                reason = "composite_score_low",
                detail = "Clearance score ${"%.2f".let { score.toString() }} < 0.4. Start button morphed to 'Initiate Recovery'.",
                routineId = routineId,
                autopilotLevel = autopilotLevel
            )
            return ClearanceStatus.REVOKED
        }

        // Gate 2 — HRV delta warning (> -20% drop triggers volume reduction proposal)
        if (hrvDelta < -0.20f) {
            eventBus.emit(SpineEventPayload(
                type = "TITAN_HRV_VOLUME_REDUCTION",
                source = "titan",
                priority = "alert",
                requiresApproval = true,
                data = mapOf(
                    "gate" to "hrv_delta",
                    "hrvDelta" to hrvDelta,
                    "proposal" to "Reduce session volume by 20%",
                    "reason" to "HRV dropped ${(hrvDelta * 100).toInt()}% vs. 7-day baseline"
                )
            ).toSpineEvent())
        }

        // Gate 3 — Agnes resilience veto
        if (resilience < 0.2f) {
            emitClearanceVeto(
                reason = "agnes_resilience_crash",
                detail = "Resilience ${resilience} < 0.2. Proposing Rest or low-stiffness cardio.",
                routineId = routineId,
                autopilotLevel = autopilotLevel,
                proposalType = "REST_OR_LOW_STIFFNESS_CARDIO"
            )
            return ClearanceStatus.REVOKED
        }

        return compositeStatus
    }

    // ── CNS Calibration (heavy-session autopilot flow) ────────────────────────────

    /**
     * Apply the CNS Calibration Matrix when readiness conflicts with a scheduled heavy session.
     * No-op if no heavy session is scheduled or if clearance is CLEARED.
     */
    suspend fun applyCnsCalibration(
        somaReadiness: Float,
        cnsLoadIndex: Float,
        hasHeavySessionScheduled: Boolean,
        autopilotLevel: AutopilotLevel
    ) {
        if (!hasHeavySessionScheduled) return
        val clearance = computeClearance(somaReadiness, cnsLoadIndex)
        if (clearance == ClearanceStatus.CLEARED) return

        when {
            // Low autopilot: present override tap test — user retains decision authority
            autopilotLevel.level <= AutopilotLevel.ADVISORY.level -> {
                eventBus.emit(SpineEventPayload(
                    type = "SOMATIC_CHECK_IN_REQUIRED",
                    source = "titan",
                    priority = "alert",
                    requiresApproval = true,
                    data = mapOf(
                        "reason" to "low_readiness_heavy_session_conflict",
                        "somaReadiness" to somaReadiness,
                        "cnsLoadIndex" to cnsLoadIndex,
                        "message" to "Soma data suggests low readiness. Override with subjective energy?"
                    )
                ).toSpineEvent())
            }
            // High autopilot: silently downgrade to recovery — no user prompt
            autopilotLevel.level >= AutopilotLevel.HIGH_AUTONOMY.level -> {
                eventBus.emit(SpineEventPayload(
                    type = "TITAN_SESSION_DOWNGRADED",
                    source = "titan",
                    priority = "info",
                    data = mapOf(
                        "reason" to "cns_calibration_auto_recovery",
                        "clearance" to clearance.name,
                        "message" to "Session automatically downgraded to active recovery"
                    )
                ).toSpineEvent())
            }
        }
    }

    // ── Training Gate State (webapp parity: getTitanTrainingGateState) ────────────

    /**
     * Returns the full gate state for the Titan training gate.
     * Ported from webapp `titan-clearance-debt-service.ts#getTitanTrainingGateState`.
     */
    fun getTitanTrainingGateState(
        profile: TrainerProfile?,
        somaProfile: SomaProfile?,
        recoveryScore: Double?,
        cnsFatigue: Double?,
        isRecoveryActive: Boolean,
        activity: String = "high_intensity"
    ): TitanTrainingGateState {
        val clearances = somaProfile?.clearances ?: profile?.clearances ?: emptyList()
        val latestClearance = getLatestTitanClearance(clearances, activity)
        val clearanceStatus = latestClearance?.status ?: "pending"
        val activeDebts = getActiveSystemDebts(profile, activity)
        val activeDebt = activeDebts.firstOrNull()
        val activeDebtCount = activeDebts.size
        val lowRecovery = recoveryScore != null && recoveryScore < 5.0
        val highFatigue = cnsFatigue != null && cnsFatigue >= 7.0
        val shouldBlockFullTraining = clearanceStatus != "granted"
        val presentationMode = if (
            isRecoveryActive || shouldBlockFullTraining || activeDebtCount > 0 || lowRecovery || highFatigue
        ) "recovery" else "performance"

        return TitanTrainingGateState(
            activity = activity,
            clearanceStatus = clearanceStatus,
            latestClearance = latestClearance,
            activeDebtCount = activeDebtCount,
            activeDebt = activeDebt,
            shouldBlockFullTraining = shouldBlockFullTraining,
            shouldRequireExplicitOverride = shouldBlockFullTraining,
            presentationMode = presentationMode,
            readinessLabel = when {
                presentationMode == "performance" -> "Performance window open"
                activeDebtCount > 0 -> "Biological debt repayment"
                shouldBlockFullTraining -> "Clearance guardrail active"
                isRecoveryActive -> "Recovery protocol active"
                else -> "Recovery-first day"
            },
            enforcementReason = buildEnforcementReason(clearanceStatus, latestClearance, activeDebtCount)
        )
    }

    private fun getLatestTitanClearance(clearances: List<ClearanceRecord>, activity: String): ClearanceRecord? =
        clearances
            .filter { it.activity.equals(activity, ignoreCase = true) }
            .maxByOrNull { it.issuedAt }

    private fun getActiveSystemDebts(profile: TrainerProfile?, activity: String): List<TitanSystemDebtRecord> =
        (profile?.systemDebts ?: emptyList()).filter { debt ->
            debt.kind == "soma_veto_override" &&
            debt.status == "active" &&
            debt.activity.equals(activity, ignoreCase = true)
        }

    private fun buildEnforcementReason(
        clearanceStatus: String,
        latestClearance: ClearanceRecord?,
        activeDebtCount: Int
    ): String? = when {
        activeDebtCount > 0 -> "Active biological debt from prior clearance override requires recovery-first protocol."
        clearanceStatus == "denied" -> latestClearance?.reason?.takeIf { it.isNotEmpty() } ?: "Soma has denied clearance for this activity."
        clearanceStatus == "conditional" -> latestClearance?.reason?.takeIf { it.isNotEmpty() } ?: "Conditional clearance — reduced intensity recommended."
        clearanceStatus == "pending" -> "Awaiting Soma clearance — check in with your biometrics first."
        else -> null
    }

    // ── Override recording (webapp parity: recordSomaVetoOverride) ────────────────

    /**
     * Records a user override of a Soma veto. Creates both a [TitanClearanceOverrideRecord]
     * and a [TitanSystemDebtRecord] tracking the biological cost.
     *
     * Returns updated (overrides, systemDebts) pair to be merged into profile.
     */
    fun recordSomaVetoOverride(
        profile: TrainerProfile,
        activity: String,
        clearanceStatus: String,
        reason: String,
        latestClearanceId: String?
    ): Pair<List<TitanClearanceOverrideRecord>, List<TitanSystemDebtRecord>> {
        val now = kotlinx.datetime.Clock.System.now().toString()
        val overrideId = generateId()
        val debtId = generateId()

        val override = TitanClearanceOverrideRecord(
            id = overrideId,
            activity = activity,
            clearanceStatus = clearanceStatus,
            reason = reason,
            createdAt = now,
            sourceClearanceId = latestClearanceId,
            systemDebtId = debtId,
            note = null
        )

        val debt = TitanSystemDebtRecord(
            id = debtId,
            kind = "soma_veto_override",
            activity = activity,
            status = "active",
            createdAt = now,
            resolvedAt = null,
            reason = reason,
            clearanceStatus = clearanceStatus,
            overrideId = overrideId,
            consequenceSummary = "Override logged. Recovery-first protocol now active for next $activity session.",
            vectorImpactVitality = -0.18f,
            vectorImpactOutput = -0.12f,
            vectorImpactFriction = 0.10f
        )

        val updatedOverrides = (listOf(override) + profile.clearanceOverrides).take(100)
        val updatedDebts = (listOf(debt) + profile.systemDebts).take(100)
        return Pair(updatedOverrides, updatedDebts)
    }

    /**
     * Marks all active debts for the given activity as resolved when Soma grants clearance.
     * Ported from `resolveSystemDebtsForGrantedClearance` in the webapp.
     */
    fun resolveSystemDebtsForGrantedClearance(
        profile: TrainerProfile,
        activity: String
    ): List<TitanSystemDebtRecord> {
        val now = kotlinx.datetime.Clock.System.now().toString()
        return profile.systemDebts.map { debt ->
            if (debt.status == "active" && debt.activity.equals(activity, ignoreCase = true)) {
                debt.copy(status = "resolved", resolvedAt = now)
            } else {
                debt
            }
        }
    }

    // ── CNS Fatigue Decay (webapp parity: workout-actions.ts) ─────────────────────

    /**
     * Computes new CNS fatigue after a session.
     * Ported from `computeNewCnsFatigue` in `workout-actions.ts`.
     *
     * @param existingFatigue Current cnsFatigue (0–10)
     * @param sessionRpe      RPE of the just-completed session (1–10)
     * @param totalVolume     Total volume in kg-reps
     * @param hoursElapsed    Hours since last fatigue update
     */
    fun computeNewCnsFatigue(
        existingFatigue: Double,
        sessionRpe: Int,
        totalVolume: Double,
        hoursElapsed: Double
    ): Double {
        val rawFatigue = min(10.0, sessionRpe * 0.6 + min(4.0, totalVolume / 5000.0))
        val decayed = existingFatigue * 0.5.pow(hoursElapsed / 48.0)
        return max(decayed, rawFatigue)
    }

    // ── Recovery Checkin Score (webapp parity: recovery-actions.ts) ───────────────

    /**
     * Computes a 0–10 recovery score from pain, fatigue, and sleep quality inputs.
     * Ported from `computeRecoveryCheckinScore` in `recovery-actions.ts`.
     */
    fun computeRecoveryCheckinScore(pain: Int, fatigue: Int, sleepQuality: Int): Int =
        min(10, max(0, ((10 - pain) * 0.3 + (10 - fatigue) * 0.4 + sleepQuality * 0.3).roundToInt()))

    // ── Internal helpers ──────────────────────────────────────────────────────────

    private fun generateId(): String = buildString {
        val chars = "abcdefghijklmnopqrstuvwxyz0123456789"
        repeat(20) { append(chars.random()) }
    }

    private suspend fun emitClearanceVeto(
        reason: String,
        detail: String,
        routineId: String?,
        autopilotLevel: AutopilotLevel,
        proposalType: String = "RECOVERY_MODE"
    ) {
        val isHighAutopilot = autopilotLevel.level >= AutopilotLevel.HIGH_AUTONOMY.level
        eventBus.emit(SpineEventPayload(
            type = "TITAN_CLEARANCE_VETOED",
            source = "titan",
            priority = "critical",
            requiresApproval = !isHighAutopilot,
            data = mapOf(
                "reason" to reason,
                "detail" to detail,
                "proposalType" to proposalType,
                "routineId" to (routineId ?: ""),
                "silentMode" to isHighAutopilot
            )
        ).toSpineEvent())
    }
}

// ── TitanTrainingGateState ─────────────────────────────────────────────────────

/**
 * Full gate state snapshot for the Titan training gate.
 * Ported from webapp `TitanTrainingGateState` interface.
 */
data class TitanTrainingGateState(
    val activity: String,
    val clearanceStatus: String,               // "granted" | "pending" | "conditional" | "denied"
    val latestClearance: ClearanceRecord?,
    val activeDebtCount: Int,
    val activeDebt: TitanSystemDebtRecord?,
    val shouldBlockFullTraining: Boolean,
    val shouldRequireExplicitOverride: Boolean,
    val presentationMode: String,              // "performance" | "recovery"
    val readinessLabel: String,
    val enforcementReason: String?
)
