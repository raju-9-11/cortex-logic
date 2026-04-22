package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.model.orchestration.InteractionCandidate
import com.agnes.ara.core.domain.model.orchestration.InteractionKind
import com.agnes.ara.core.engine.orchestrator.InteractionGate
import kotlin.js.JsExport

/**
 * JS-exportable decision result from [InteractionGate].
 *
 * All enum fields are serialized as their @SerialName strings, e.g.:
 *   kind:        "routing" | "planning" | "routine"
 *   mode:        "visible_proposal" | "silent_execute" | "silent_delegate" | "defer" | "blocked"
 *   reason:      "manual_level" | "low_confidence" | "explicit_gate" | "high_risk" | "conflict"
 *                "silent_unavailable" | "auto_routing" | "auto_execution" | "ghost_mode"
 *   historyMode: "standard" | "silent"
 */
@JsExport
class InteractionDecisionJs(
    val kind: String,
    val mode: String,
    val reason: String,
    val confidence: Double,
    val historyMode: String,
    val shouldPersistDraft: Boolean,
    val shouldNotifyUser: Boolean,
    val shouldRenderHudSignal: Boolean,
)

/**
 * JS-exportable bridge for [InteractionGate].
 *
 * Usage:
 * ```ts
 * const gate = new InteractionGateJs()
 * const decision = gate.evaluate(4, 'routing', 'agnes', 0.75, false, false, false, true)
 * console.log(decision.mode) // "silent_delegate"
 * ```
 *
 * Pass [confidence] as `-1` to use the kind-specific default.
 */
@JsExport
class InteractionGateJs {

    /**
     * Evaluate an interaction candidate against the current autopilot level.
     *
     * @param autopilotLevel  Global autopilot level (0–5).
     * @param kind            Interaction kind: "routing" | "planning" | "routine".
     * @param sourceModuleId  Module originating the interaction.
     * @param confidence      Confidence score [0–1]; pass -1 for kind-specific default.
     * @param requiresApproval Whether the action is explicitly gated for approval.
     * @param highRisk        Whether the action is classified as high-risk.
     * @param hasConflict     Whether a conflict with another pending action was detected.
     * @param canAutoDispatch  Whether the target supports autonomous dispatch.
     */
    fun evaluate(
        autopilotLevel: Int,
        kind: String,
        sourceModuleId: String,
        confidence: Double,
        requiresApproval: Boolean,
        highRisk: Boolean,
        hasConflict: Boolean,
        canAutoDispatch: Boolean,
    ): InteractionDecisionJs {
        val interactionKind = when (kind.lowercase()) {
            "routing" -> InteractionKind.ROUTING
            "planning" -> InteractionKind.PLANNING
            else -> InteractionKind.ROUTINE
        }
        val candidate = InteractionCandidate(
            kind = interactionKind,
            sourceModuleId = sourceModuleId,
            confidence = if (confidence < 0) null else confidence,
            requiresApproval = requiresApproval,
            highRisk = highRisk,
            hasConflict = hasConflict,
            canAutoDispatch = canAutoDispatch,
        )
        val d = InteractionGate.evaluate(autopilotLevel, candidate)
        return InteractionDecisionJs(
            kind = d.kind.name.lowercase(),
            mode = d.mode.name.lowercase(),
            reason = d.reason.name.lowercase(),
            confidence = d.confidence,
            historyMode = d.historyMode.name.lowercase(),
            shouldPersistDraft = d.shouldPersistDraft,
            shouldNotifyUser = d.shouldNotifyUser,
            shouldRenderHudSignal = d.shouldRenderHudSignal,
        )
    }
}
