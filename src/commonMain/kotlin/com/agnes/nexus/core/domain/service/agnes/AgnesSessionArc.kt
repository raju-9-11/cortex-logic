package com.agnes.nexus.core.domain.service.agnes

import com.agnes.nexus.core.domain.model.AgnesSessionMode
import kotlinx.datetime.Clock
import kotlinx.serialization.Serializable

/**
 * Agnes session arc computation — ported from web session-arc.ts.
 * Tracks session progress and provides phase guidance for LLM prompts.
 */
@Serializable
enum class AgnesSessionPhase { OPENING, DEEPENING, INTEGRATION, CLOSING }

@Serializable
data class SessionProgressState(
    val exchangeCount: Int,
    val elapsedMs: Long,
    val targetExchanges: Int,
    val progressFraction: Float,
    val suggestedPhase: AgnesSessionPhase,
    val isInFinalThird: Boolean,
    val isOverTarget: Boolean
)

object AgnesSessionArc {

    val exchangeTargets: Map<AgnesSessionMode, Int> = mapOf(
        AgnesSessionMode.IMPROMPTU to 7,
        AgnesSessionMode.CASUAL to 14,
        AgnesSessionMode.SOMATIC to 17,
        AgnesSessionMode.DEEP to 24
    )

    fun computeProgress(
        exchangeCount: Int,
        sessionStartedAt: Long,
        mode: AgnesSessionMode
    ): SessionProgressState {
        val target = exchangeTargets[mode] ?: 14
        val progressFraction = minOf(1f, exchangeCount.toFloat() / target)
        val isInFinalThird = progressFraction >= 2f / 3f
        val isOverTarget = exchangeCount >= target

        val suggestedPhase = when {
            progressFraction < 0.25f -> AgnesSessionPhase.OPENING
            progressFraction < 0.65f -> AgnesSessionPhase.DEEPENING
            progressFraction < 0.85f -> AgnesSessionPhase.INTEGRATION
            else -> AgnesSessionPhase.CLOSING
        }

        return SessionProgressState(
            exchangeCount = exchangeCount,
            elapsedMs = Clock.System.now().toEpochMilliseconds() - sessionStartedAt,
            targetExchanges = target,
            progressFraction = progressFraction,
            suggestedPhase = suggestedPhase,
            isInFinalThird = isInFinalThird,
            isOverTarget = isOverTarget
        )
    }

    fun buildProgressBlock(progress: SessionProgressState, mode: AgnesSessionMode): String? {
        if (progress.exchangeCount == 0) return null
        val remaining = maxOf(0, progress.targetExchanges - progress.exchangeCount)
        val urgencyLine = when {
            progress.isOverTarget ->
                "The session has run past its natural length. Move decisively toward CLOSING if not already there. Do not open new threads."
            progress.isInFinalThird ->
                "The session is in its final third (~$remaining exchanges remain before the natural close). Begin moving toward INTEGRATION or CLOSING — do not open new threads. Resource activation and synthesis are now the priority."
            else -> null
        }
        return listOfNotNull(
            "SESSION PROGRESS:",
            "Mode: $mode | Exchanges: ${progress.exchangeCount} of ~${progress.targetExchanges} | Phase guidance: ${progress.suggestedPhase}",
            urgencyLine,
            "Clinical arc reminder: OPENING (ground, orient) → DEEPENING (follow thread, titrate) → INTEGRATION (meaning-making, summary) → CLOSING (resource activation, continuity planning, safe exit).",
            "Your Phase field in <thought> should reflect where you actually are. Clinical judgment takes precedence — but be aware of where the session is heading."
        ).joinToString("\n")
    }
}
