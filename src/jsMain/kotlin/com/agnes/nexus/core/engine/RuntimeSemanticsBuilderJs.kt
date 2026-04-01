package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.model.orchestration.HistoryMode
import com.agnes.nexus.core.engine.orchestrator.RuntimeSemanticsBuilder
import kotlin.js.JsExport

/**
 * JS-exportable runtime semantics result.
 *
 * String fields mirror the @SerialName values from the Kotlin enums:
 *   autonomy:    "manual_lock" | "proposal_first" | "guided_assist"
 *                "conditional_autonomy" | "supervised_autonomy" | "ghost"
 *   disposition: "manual_review" | "proposal_review" | "high_risk_review" | "incident_review"
 *                "analysis_only" | "visible_execution" | "silent_execution" | "ephemeral_preview"
 *   historyDestination: "standard" | "silent_audit" | "none"
 */
@JsExport
class RuntimeSemanticsJs(
    val autopilotLevel: Int,
    val autonomy: String,
    val disposition: String,
    val historyDestination: String,
    val willPersistHistory: Boolean,
    val shouldNotifyUser: Boolean,
)

/**
 * JS-exportable bridge for [RuntimeSemanticsBuilder].
 *
 * Usage:
 * ```ts
 * const builder = new RuntimeSemanticsBuilderJs()
 * const semantics = builder.build(3, 'standard', 'approved', false)
 * console.log(semantics.disposition) // "visible_execution"
 * ```
 */
@JsExport
class RuntimeSemanticsBuilderJs {

    /**
     * Derive full [RuntimeSemanticsJs] for a specific action context.
     *
     * @param autopilotLevel  Global autopilot level (0–5).
     * @param historyMode     "standard" | "silent"
     * @param dispatchStatus  "approved" | "awaiting_approval" | "analysis_only" | "blocked" | "ephemeral"
     * @param highRisk        Whether the action is classified as high-risk.
     */
    fun build(
        autopilotLevel: Int,
        historyMode: String,
        dispatchStatus: String,
        highRisk: Boolean,
    ): RuntimeSemanticsJs {
        val mode = if (historyMode.lowercase() == "silent") HistoryMode.SILENT else HistoryMode.STANDARD
        val s = RuntimeSemanticsBuilder.build(autopilotLevel, mode, dispatchStatus, highRisk)
        return RuntimeSemanticsJs(
            autopilotLevel = s.autopilotLevel,
            autonomy = s.autonomy.name.lowercase(),
            disposition = s.disposition.name.lowercase(),
            historyDestination = s.historyDestination,
            willPersistHistory = s.willPersistHistory,
            shouldNotifyUser = s.shouldNotifyUser,
        )
    }

    /** Derive just the runtime autonomy label for a given autopilot level. */
    fun deriveAutonomy(autopilotLevel: Int): String =
        RuntimeSemanticsBuilder.deriveAutonomy(autopilotLevel).name.lowercase()
}
