package com.agnes.nexus.core.domain.service.soma

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class SomaDiagnosisSession(
    val id: String = "",
    val userId: String = "",
    val status: String = "uploading",   // "uploading" | "parsing" | "review" | "closed"
    val documentType: String = "REPORT", // "XRAY" | "BLOODWORK" | "REPORT" | "PRESCRIPTION" | "IMAGE"
    val fileRef: String? = null,         // Firebase Storage ref
    val fileName: String? = null,
    val mimeType: String? = null,
    val patientScope: String = "USER",   // "USER" | "GUEST"
    val encryptedPayload: DiagnosisEncryptedPayload? = null,
    val summary: SomaDiagnosisSummary? = null,
    val expiresAt: Long? = null,         // 24h TTL on session
    val createdAt: Long = 0L,
    val updatedAt: Long = 0L
)

@Serializable
data class DiagnosisEncryptedPayload(
    val encryptedData: String = "",       // AES-256 encrypted JSON blob
    val keyRef: String = "",              // Reference to user key in Android Keystore
    val iv: String = ""                   // Base64 IV for decryption
)

@Serializable
data class ExtractedField(
    val key: String = "",                 // e.g. "glucose", "hemoglobin"
    val value: String = "",               // raw extracted value
    val unit: String? = null,
    val normalRange: String? = null,
    val flagged: Boolean = false,         // true if outside normal range
    val confidence: Float = 1.0f,
    val sourceSpan: String? = null        // raw text from document
)

@Serializable
data class SomaDiagnosisSummary(
    val extractedFields: List<ExtractedField> = emptyList(),
    val anomalies: List<String> = emptyList(),
    val recommendations: List<String> = emptyList(),
    val overallAssessment: String? = null,
    val parsedAt: Long = 0L
)

@Serializable
data class SomaHealthSnapshot(
    val userId: String = "",
    val readinessScore: Int? = null,
    val readinessLevel: String? = null,       // "optimal" | "good" | "fair" | "poor"
    val restingHeartRate: Double? = null,
    val sleepHours: Double? = null,
    val sleepQuality: Double? = null,
    val energyLevel: Double? = null,
    val stressPhysical: Double? = null,
    val biomarkerSummary: Map<String, String> = emptyMap(), // name → status ("optimal"|"normal"|"elevated"|"low"|"critical")
    val clearanceStatus: String? = null,       // "granted" | "denied" | "conditional"
    val capturedAt: Long = 0L
)

fun com.agnes.nexus.core.domain.models.SomaProfile.toHealthSnapshot(userId: String): SomaHealthSnapshot {
    val bioSummary = this.biomarkers.associate { b ->
        val v = b.value.toDoubleOrNull() ?: 0.0
        val baseline = OptimalBaseline.baselines[b.name.lowercase()]
        val status = when {
            baseline == null -> "unknown"
            baseline.optimalMin != null && baseline.optimalMax != null &&
                v >= baseline.optimalMin && v <= baseline.optimalMax -> "optimal"
            baseline.normalMin != null && baseline.normalMax != null &&
                v >= baseline.normalMin && v <= baseline.normalMax -> "normal"
            baseline.normalMin != null && v < baseline.normalMin -> "low"
            baseline.normalMax != null && v > baseline.normalMax -> "critical"
            else -> "elevated"
        }
        b.name to status
    }
    val level = when {
        (readinessScore ?: 0) >= 80 -> "optimal"
        (readinessScore ?: 0) >= 60 -> "good"
        (readinessScore ?: 0) >= 40 -> "fair"
        else -> "poor"
    }
    return SomaHealthSnapshot(
        userId = userId,
        readinessScore = readinessScore,
        readinessLevel = level,
        restingHeartRate = restingHeartRate,
        sleepHours = sleepHours,
        sleepQuality = sleepQuality,
        energyLevel = energyLevel,
        stressPhysical = stressPhysical,
        biomarkerSummary = bioSummary,
        clearanceStatus = clearanceStatus,
        capturedAt = kotlinx.datetime.Clock.System.now().toEpochMilliseconds()
    )
}

@Serializable
data class ReadinessBreakdown(
    val vitalsScore: Int = 0,
    val sleepScore: Int = 0,
    val energyScore: Int = 0,
    val stressScore: Int = 0
)

enum class ReadinessLevel { OPTIMAL, GOOD, FAIR, POOR }

@Serializable
data class ReadinessResult(
    val score: Int = 0,
    val level: String = "fair",           // maps to ReadinessLevel
    val breakdown: ReadinessBreakdown = ReadinessBreakdown(),
    val recommendations: List<String> = emptyList(),
    val computedAt: Long = 0L
)
