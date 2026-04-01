package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.service.ledger.CrossVerificationService
import kotlin.js.JsExport

@JsExport
class CrossVerificationServiceJs {

    /** Compute profile-level financial friction (0–1). */
    fun computeFinancialFriction(profileJson: String): Double =
        CrossVerificationService.computeFinancialFriction(profileJson)

    /** Run coherence rules. Returns JSON CoherenceReport. */
    fun verifyCoherence(profileJson: String): String =
        CrossVerificationService.verifyCoherence(profileJson)

    /** Compute NSV financial patch. Returns JSON {financialFriction, energyBudget}. */
    fun computeNsvFinancialPatch(profileJson: String): String =
        CrossVerificationService.computeNsvFinancialPatch(profileJson)
}
