package com.agnes.nexus.core.domain.model

import kotlinx.serialization.Serializable

/** Type classification for documents in the Soma Diagnosis Vault. */
@Serializable
enum class DiagnosisDocumentType {
    XRAY, BLOODWORK, REPORT, PRESCRIPTION, IMAGE, LAB_RESULT, SCAN
}

/**
 * A clinical document stored in the Soma Diagnosis Vault.
 * [patientScope] determines whether this document can mutate the GlobalSoul.
 * GUEST documents are analysed but never update the user's personal health baseline.
 */
@Serializable
data class DiagnosisDocument(
    val id: String,
    val type: DiagnosisDocumentType,
    val fileRef: String,           // Vault-encrypted file reference
    val fileName: String = "",
    val parsedSummary: String? = null,  // LLM-extracted clinical summary
    val patientScope: PatientScope = PatientScope.USER,
    val uploadedAt: Long = 0L,
    val analysedAt: Long? = null
)
