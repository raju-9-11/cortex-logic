package com.agnes.nexus.core.domain.model

import kotlinx.serialization.Serializable

/**
 * Agnes session interaction mode.
 *
 * CASUAL     — Daily venting and check-ins in the standard chat thread.
 * DEEP       — Immersive therapy. Suppresses non-critical notifications.
 *              Focuses on Belief Graph mapping and structured exploration.
 * IMPROMPTU  — Ephemeral safety valve. Data is marked for deletion on close.
 *              A 2-hour "Vault Purgatory" window allows recovery before permanent purge.
 */
@Serializable
enum class AgnesSessionMode {
    CASUAL,
    DEEP,
    IMPROMPTU
}
