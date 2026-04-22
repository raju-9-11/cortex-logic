package com.agnes.ara.core.domain.model

import kotlinx.serialization.Serializable

/**
 * Determines whether clinical data mutates the user's personal GlobalSoul.
 *
 * USER  → Full pipeline: parse report → update SomaProfile → mutate GlobalSoul vitality.
 * GUEST → Stateless: parse report → return analysis → zero NSV / GlobalSoul mutation.
 *
 * The PatientFirewallService enforces this at the Spine emit() gate.
 */
@Serializable
enum class PatientScope {
    USER,   // Data belongs to the device owner — full pipeline
    GUEST   // Data belongs to another person — analysis only, no soul mutation
}
