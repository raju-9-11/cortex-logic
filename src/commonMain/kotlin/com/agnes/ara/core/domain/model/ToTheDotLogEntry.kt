package com.agnes.ara.core.domain.model

import kotlinx.serialization.Serializable

/**
 * Titan "To the Dot" log entry.
 * 1-tap confirmation that the user followed a planned routine exactly as prescribed.
 * Generates a Spine event that contributes to bandwidth (+0.1) in the GlobalSoul.
 */
@Serializable
data class ToTheDotLogEntry(
    val id: String,
    val routineId: String,
    val routineTitle: String,
    val confirmedAt: Long,
    val adherenceFull: Boolean = true,     // false = partial adherence logged
    val deviationNote: String? = null,     // Optional note if not fully adherent
    val soulMutations: List<SoulMutation> = listOf(
        SoulMutation(GlobalSoulVector.BANDWIDTH, +0.05f),
        SoulMutation(GlobalSoulVector.OUTPUT, -0.05f)   // physical load consumed
    )
)
