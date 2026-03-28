package com.agnes.nexus.core.domain.model

import kotlinx.serialization.Serializable

/** Titan training clearance status, computed by ClearanceService. */
@Serializable
enum class ClearanceStatus {
    CLEARED,      // Full training authorized
    RESTRICTED,   // Downgraded to active recovery only
    REVOKED       // No training — injury or illness protocol active
}
