package com.agnes.nexus.core.domain.model

import kotlinx.serialization.Serializable

/**
 * Region-specific tax summary for the Ledger Tax Tab.
 * Tracks deductions, strategies, and estimated liability for a given tax year.
 */
@Serializable
data class TaxSummary(
    val taxYear: Int,
    val region: String,                         // e.g. "US", "UK", "CA"
    val deductions: List<TaxDeduction> = emptyList(),
    val strategies: List<String> = emptyList(),
    val estimatedLiability: Float? = null,
    val estimatedRefund: Float? = null,
    val currency: String = "USD",
    val notes: String? = null,
    val updatedAt: Long = 0L
)

@Serializable
data class TaxDeduction(
    val id: String,
    val category: String,
    val amount: Float,
    val currency: String = "USD",
    val notes: String? = null,
    val documentRef: String? = null  // Link to DiagnosisDocument if backed by a receipt
)
