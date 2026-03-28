package com.agnes.nexus.core.domain.model

import kotlinx.serialization.Serializable

/** The semantic type of an [AliveEntity]. */
@Serializable
enum class AliveEntityType {
    ACTION,   // A discrete task or executable step
    HABIT,    // A recurring behavioural pattern
    LOG,      // A historical record or journal entry
    METRIC    // A measurable data point (e.g. weight, 1RM)
}
