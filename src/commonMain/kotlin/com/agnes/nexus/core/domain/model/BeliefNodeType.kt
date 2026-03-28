package com.agnes.nexus.core.domain.model

import kotlinx.serialization.Serializable

/** Classification of a node in the Agnes Belief Graph. */
@Serializable
enum class BeliefNodeType {
    WOUND,       // Deep-rooted psychological wound (spec name; maps to CORE_WOUND)
    CORE_WOUND,  // Alias kept for backward compatibility
    STRENGTH,    // Positive psychological asset/resource
    ANCHOR,      // Stabilising belief or grounding element
    TRIGGER,     // Active emotional trigger pattern
    GROWTH       // Positive growth node or integrated insight
}
