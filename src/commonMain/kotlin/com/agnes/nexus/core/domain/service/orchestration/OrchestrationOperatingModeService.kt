package com.agnes.nexus.core.domain.service.orchestration

import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

@Serializable
data class ShellModeChip(
    val id: String,
    val label: String,
    val tone: String,
)

@Serializable
data class ShellOperatingModeSemantics(
    val levelLabel: String,
    val autonomyLabel: String,
    val scopeLabel: String,
    val authorityLabel: String,
    val historyLabel: String,
    val summaryLabel: String,
    val chips: List<ShellModeChip>,
)

object OrchestrationOperatingModeService {

    private val LEVEL_LABELS = mapOf(
        0 to "L0 Manual lock",
        1 to "L1 Proposal first",
        2 to "L2 Guided assist",
        3 to "L3 Conditional autonomy",
        4 to "L4 Supervised autonomy",
        5 to "L5 Ghost",
    )

    private val AUTONOMY_LABELS = mapOf(
        "manual_lock" to "Manual lock",
        "proposal_first" to "Proposal first",
        "guided_assist" to "Guided assist",
        "conditional_autonomy" to "Conditional autonomy",
        "supervised_autonomy" to "Supervised autonomy",
        "ghost" to "Ghost",
    )

    fun derive(
        autopilotLevel: Int = 2,
        historyMode: String = "standard",
        autonomy: String? = null,
        isGuest: Boolean = false,
        awaitingApprovalCount: Int = 0,
        failedCount: Int = 0,
        escalatedCount: Int = 0,
    ): ShellOperatingModeSemantics {
        val level = autopilotLevel.coerceIn(0, 5)
        val resolvedAutonomy = autonomy ?: when {
            level == 5 -> "ghost"
            level >= 4 -> "supervised_autonomy"
            level == 3 -> "conditional_autonomy"
            level == 2 -> "guided_assist"
            level == 1 -> "proposal_first"
            else -> "manual_lock"
        }

        val scopeLabel = if (isGuest) "Guest scope" else "User scope"
        val historyLabel = if (historyMode == "silent") "Silent audit" else "Visible history"
        val authorityLabel = when {
            isGuest -> "Analysis-only"
            level == 5 -> "Ghost authority"
            level >= 4 -> "Auto execution"
            level == 3 -> "Conditional auto"
            level == 2 -> "Guided execution"
            else -> "Approval-first"
        }

        var summaryLabel = authorityLabel
        var summaryTone = "border-white/10 bg-white/[0.05] text-white/70"
        when {
            isGuest -> {
                summaryLabel = "Guest analysis-only"
                summaryTone = "border-sky-500/20 bg-sky-500/10 text-sky-200"
            }
            escalatedCount > 0 || failedCount > 0 -> {
                summaryLabel = if (escalatedCount > 0) "Incident posture" else "Failure review"
                summaryTone = "border-rose-500/20 bg-rose-500/10 text-rose-200"
            }
            awaitingApprovalCount > 0 -> {
                summaryLabel = "Approval gated"
                summaryTone = "border-amber-500/20 bg-amber-500/10 text-amber-200"
            }
            level == 5 || historyMode == "silent" -> {
                summaryLabel = "Ghost silent"
                summaryTone = "border-violet-500/20 bg-violet-500/10 text-violet-200"
            }
            level >= 4 -> {
                summaryLabel = "Supervised auto"
                summaryTone = "border-emerald-500/20 bg-emerald-500/10 text-emerald-200"
            }
        }

        val chips = listOf(
            ShellModeChip(
                id = "summary",
                label = summaryLabel,
                tone = summaryTone,
            ),
            ShellModeChip(
                id = "scope",
                label = scopeLabel,
                tone = if (isGuest) "border-sky-500/20 bg-sky-500/10 text-sky-200"
                else "border-white/10 bg-white/[0.05] text-white/65",
            ),
            ShellModeChip(
                id = "history",
                label = historyLabel,
                tone = if (historyMode == "silent") "border-violet-500/20 bg-violet-500/10 text-violet-200"
                else "border-white/10 bg-white/[0.05] text-white/65",
            ),
            ShellModeChip(
                id = "authority",
                label = authorityLabel,
                tone = if (isGuest) "border-sky-500/20 bg-sky-500/10 text-sky-200"
                else "border-cyan-500/20 bg-cyan-500/10 text-cyan-200",
            ),
        )

        return ShellOperatingModeSemantics(
            levelLabel = LEVEL_LABELS[level] ?: "L$level",
            autonomyLabel = AUTONOMY_LABELS[resolvedAutonomy] ?: resolvedAutonomy,
            scopeLabel = scopeLabel,
            authorityLabel = authorityLabel,
            historyLabel = historyLabel,
            summaryLabel = summaryLabel,
            chips = chips,
        )
    }

    fun deriveJson(
        autopilotLevel: Int = 2,
        historyMode: String = "standard",
        autonomy: String? = null,
        isGuest: Boolean = false,
        awaitingApprovalCount: Int = 0,
        failedCount: Int = 0,
        escalatedCount: Int = 0,
    ): String = Json.encodeToString(
        derive(autopilotLevel, historyMode, autonomy, isGuest, awaitingApprovalCount, failedCount, escalatedCount)
    )
}
