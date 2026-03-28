package com.agnes.nexus.core.domain.model

import com.agnes.nexus.core.domain.models.NeuralStateVector
import kotlinx.serialization.Serializable
import kotlin.math.max
import kotlin.math.min

/** Operational mode of the system — maps to Titan UI mode and LLM persona tone. */
@Serializable
enum class SystemMode { PERFORMANCE, RECOVERY, GHOST }

/**
 * The GlobalSoul — flat 5-vector Neural State Vector injected into every LLM prompt.
 *
 * All dimensions are normalized floats: 0.0 (worst/maximum stress) → 1.0 (best/optimal).
 * This is the LLM-facing representation. The richer [NeuralStateVector] is the internal state.
 *
 * Spec §1.1: Arrays are capped at top-3 items by intensity × recency weight.
 * Spec §1.3: If Soma data > 24h old, [staleFlag] = true.
 */
@Serializable
data class GlobalSoul(
    val resilience: Float = 0.5f,            // Agnes domain — psychological armor
    val bandwidth: Float = 0.5f,             // Atlas domain — cognitive capacity
    val vitality: Float = 0.5f,              // Soma domain — biological readiness
    val output: Float = 0.5f,               // Titan domain — physical/mechanical load
    val friction: Float = 0.5f,             // Ledger domain — financial stress
    val autopilot: Int = 1,                 // Current Autopilot level (0-5)
    val activeMode: SystemMode = SystemMode.PERFORMANCE,
    val staleFlag: Boolean = false,         // True if Soma data > 24h old
    val lastUpdated: Long = 0L,
    // ── System Debt fields (Spec §3 — Override Penalty) ──────────────────
    val recoveryRateMultiplier: Float = 1.0f,  // 1.0 = normal; 0.5 = debt (heals 2× slower)
    val isSystemDebtActive: Boolean = false    // true when user overrode a biological crash veto
) {
    // Backward-compat accessors
    val autopilotLevel: Int get() = autopilot
    val updatedAt: Long get() = lastUpdated

    /** Apply a clamped delta mutation to the named vector. Returns updated GlobalSoul. */
    fun applyMutation(mutation: SoulMutation): GlobalSoul {
        val clamped = (mutation.delta).coerceIn(-1.0f, 1.0f)
        return when (mutation.vector) {
            GlobalSoulVector.RESILIENCE -> copy(resilience = clamp(resilience + clamped))
            GlobalSoulVector.BANDWIDTH  -> copy(bandwidth  = clamp(bandwidth  + clamped))
            GlobalSoulVector.VITALITY   -> copy(vitality   = clamp(vitality   + clamped))
            GlobalSoulVector.OUTPUT     -> copy(output     = clamp(output     + clamped))
            GlobalSoulVector.FRICTION   -> copy(friction   = clamp(friction   + clamped))
        }
    }

    /** Apply a batch of mutations atomically. */
    fun applyMutations(mutations: List<SoulMutation>): GlobalSoul =
        mutations.fold(this) { soul, mutation -> soul.applyMutation(mutation) }

    /** Format for LLM system prompt injection. */
    fun formatForPrompt(): String = buildString {
        appendLine("[GLOBAL SOUL — Neural State Vector]")
        appendLine("  Resilience (Emotional Armor):   ${formatFloat(resilience)}")
        appendLine("  Bandwidth  (Cognitive Capacity): ${formatFloat(bandwidth)}")
        appendLine("  Vitality   (Biological Ready):   ${formatFloat(vitality)}")
        appendLine("  Output     (Physical Load):       ${formatFloat(output)}")
        appendLine("  Friction   (Financial Stress):    ${formatFloat(friction)}")
        appendLine("  Autopilot Level: $autopilot  Mode: $activeMode")
        if (staleFlag) appendLine("  ⚠ Soma data is stale (>24h). Verify physical energy before heavy tasks.")
    }

    private fun clamp(value: Float): Float = max(0.0f, min(1.0f, value))
    private fun formatFloat(v: Float): String {
        val int = v.toInt()
        val dec = ((v - int) * 100).toInt()
        return "$int.${dec.toString().padStart(2, '0')}"
    }
}

/** A single vector mutation — delta applied atomically to GlobalSoul. */
@Serializable
data class SoulMutation(
    val vector: GlobalSoulVector,
    val delta: Float   // e.g. -0.15 reduces the vector by 15%
)

/** Utility to derive a GlobalSoul from the richer NeuralStateVector. */
fun NeuralStateVector.toGlobalSoul(
    autopilotLevel: Int = 0,
    lastSomaSyncAt: Long? = null,
    now: Long = kotlinx.datetime.Clock.System.now().toEpochMilliseconds()
): GlobalSoul {
    val stale = lastSomaSyncAt?.let { (now - it) > 24 * 60 * 60 * 1000L } ?: false
    val mode = when {
        autopilotLevel >= 5 -> SystemMode.GHOST
        biological.recoveryScore?.let { it < 4.0 } == true -> SystemMode.RECOVERY
        else -> SystemMode.PERFORMANCE
    }
    return GlobalSoul(
        resilience = normalizeEmotional(emotional.emotionalResilience),
        bandwidth  = normalizeCognitive(cognitive.energyBudget),
        vitality   = normalizeBiological(biological.recoveryScore),
        output     = normalizeBiological(biological.cnsFatigue, invert = true),
        friction   = normalizeResource(resource.financialFriction),
        autopilot  = autopilotLevel,
        activeMode = mode,
        staleFlag  = stale,
        lastUpdated = now
    )
}

private fun normalizeEmotional(v: Double?): Float = ((v ?: 5.0) / 10.0).toFloat().coerceIn(0f, 1f)
private fun normalizeCognitive(v: Double?): Float = ((v ?: 5.0) / 10.0).toFloat().coerceIn(0f, 1f)
private fun normalizeBiological(v: Double?, invert: Boolean = false): Float {
    val norm = ((v ?: 5.0) / 10.0).toFloat().coerceIn(0f, 1f)
    return if (invert) 1.0f - norm else norm
}
private fun normalizeResource(v: Double?): Float = ((v ?: 5.0) / 10.0).toFloat().coerceIn(0f, 1f)
