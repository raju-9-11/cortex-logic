package com.agnes.nexus.core.domain.services

import kotlinx.serialization.Serializable

/**
 * Guest quota state — tracks free-tier usage limits.
 */
@Serializable
data class QuotaState(
    val totalTurnsUsed: Int = 0,
    val maxTurnsAllowed: Int = 10,
    val isHardLocked: Boolean = false
) {
    val turnsRemaining: Int get() = maxTurnsAllowed - totalTurnsUsed
}

/**
 * Quota Service — enforces free-tier message limits.
 * Ported from Nexus Android for parity.
 */
class QuotaService(
    private val settings: NexusSettings
) {
    companion object {
        private const val KEY_TURNS_USED = "agnes_guest_turns_used"
        private const val MAX_TURNS = 10
    }

    /**
     * Get current quota state.
     */
    fun getQuota(): QuotaState {
        val used = settings.getInt(KEY_TURNS_USED, 0)
        return QuotaState(
            totalTurnsUsed = used,
            maxTurnsAllowed = MAX_TURNS,
            isHardLocked = used >= MAX_TURNS
        )
    }

    /**
     * Consume one turn. Returns updated quota.
     */
    fun incrementTurn(): QuotaState {
        val current = getQuota()
        val newUsed = current.totalTurnsUsed + 1
        settings.putInt(KEY_TURNS_USED, newUsed)

        return QuotaState(
            totalTurnsUsed = newUsed,
            maxTurnsAllowed = MAX_TURNS,
            isHardLocked = newUsed >= MAX_TURNS
        )
    }

    /**
     * Check if guest can send a message.
     */
    fun canSendMessage(): Boolean = !getQuota().isHardLocked

    /**
     * Reset quota (called when guest upgrades to registered user).
     */
    fun reset() {
        settings.remove(KEY_TURNS_USED)
    }
}
