package com.agnes.nexus.core.domain.service.soma

import com.agnes.nexus.core.domain.model.PatientScope
import com.agnes.nexus.core.domain.services.SpineEventBus
import com.agnes.nexus.core.domain.services.SpineEventPayload
import com.agnes.nexus.core.domain.services.SpinePatientScope
import com.agnes.nexus.core.domain.services.SpineSoulMutation
import kotlinx.serialization.Serializable

// ── Raw report + biomarker models ────────────────────────────────────────────

/** A raw clinical document to be ingested by Soma's Physician Persona. */
@Serializable
data class RawReport(
    val id: String,
    val documentType: ReportType,
    val rawText: String,          // OCR or pasted text from the clinical document
    val parsedMarkers: List<BiomarkerReading> = emptyList(),
    val uploadedAt: Long = 0L
)

@Serializable
enum class ReportType { BLOODWORK, XRAY, PRESCRIPTION, LAB_RESULT, SCAN, REPORT }

/** A single biomarker reading extracted from a clinical document. */
@Serializable
data class BiomarkerReading(
    val name: String,             // e.g. "cortisol", "glucose", "LDL"
    val value: Float,
    val unit: String,             // e.g. "nmol/L", "mg/dL"
    val optimalMin: Float? = null,
    val optimalMax: Float? = null,
    val normalMin: Float? = null,
    val normalMax: Float? = null
) {
    /** True if value falls outside the OPTIMAL range (tighter than just "normal"). */
    val isOptimalAnomaly: Boolean get() =
        (optimalMin != null && value < optimalMin) ||
        (optimalMax != null && value > optimalMax)

    /** True if value is clinically abnormal (outside standard reference range). */
    val isClinicalAnomaly: Boolean get() =
        (normalMin != null && value < normalMin) ||
        (normalMax != null && value > normalMax)

    val deviationLabel: String get() = when {
        isClinicalAnomaly && (normalMax != null && value > normalMax) -> "HIGH"
        isClinicalAnomaly && (normalMin != null && value < normalMin) -> "LOW"
        isOptimalAnomaly  -> "SUB-OPTIMAL"
        else              -> "OPTIMAL"
    }
}

/**
 * Optimal baselines for key biomarkers used by the Physician Persona.
 * The spec distinguishes "Optimal" (performance-grade) vs "Normal" (disease-avoidance).
 * Soma displays deviation from Optimal, not just Normal Range.
 */
object OptimalBaseline {
    val baselines: Map<String, BiomarkerReading> = mapOf(
        "cortisol"     to BiomarkerReading("cortisol",     0f, "nmol/L", optimalMin=100f, optimalMax=400f, normalMin=60f,  normalMax=550f),
        "glucose"      to BiomarkerReading("glucose",      0f, "mg/dL",  optimalMin=70f,  optimalMax=90f,  normalMin=70f,  normalMax=100f),
        "testosterone" to BiomarkerReading("testosterone", 0f, "ng/dL",  optimalMin=600f, optimalMax=1000f,normalMin=300f, normalMax=1000f),
        "hdl"          to BiomarkerReading("hdl",          0f, "mg/dL",  optimalMin=60f,  optimalMax=120f, normalMin=40f,  normalMax=120f),
        "ldl"          to BiomarkerReading("ldl",          0f, "mg/dL",  optimalMin=0f,   optimalMax=100f, normalMin=0f,   normalMax=130f),
        "crp"          to BiomarkerReading("crp",          0f, "mg/L",   optimalMin=0f,   optimalMax=1f,   normalMin=0f,   normalMax=3f),
        "tsh"          to BiomarkerReading("tsh",          0f, "mIU/L",  optimalMin=1f,   optimalMax=2.5f, normalMin=0.4f, normalMax=4f),
        "ferritin"     to BiomarkerReading("ferritin",     0f, "ng/mL",  optimalMin=100f, optimalMax=200f, normalMin=30f,  normalMax=300f),
        "vitd"         to BiomarkerReading("vitd",         0f, "ng/mL",  optimalMin=50f,  optimalMax=80f,  normalMin=30f,  normalMax=100f),
        "hrv"          to BiomarkerReading("hrv",          0f, "ms",     optimalMin=60f,  optimalMax=120f, normalMin=20f,  normalMax=200f),
        "hba1c"        to BiomarkerReading("hba1c",        0f, "%",       optimalMin=4.6f, optimalMax=5.6f, normalMin=4.0f,  normalMax=5.6f),
        "cholesterol"  to BiomarkerReading("cholesterol",  0f, "mg/dL",   optimalMin=0f,   optimalMax=180f, normalMin=0f,   normalMax=200f),
        "triglycerides" to BiomarkerReading("triglycerides",0f, "mg/dL",   optimalMin=0f,   optimalMax=100f, normalMin=0f,   normalMax=150f),
        "insulin"      to BiomarkerReading("insulin",      0f, "µIU/mL",  optimalMin=2f,   optimalMax=8f,   normalMin=2f,   normalMax=25f),
        "estradiol"    to BiomarkerReading("estradiol",    0f, "pg/mL",   optimalMin=20f,  optimalMax=150f, normalMin=10f,  normalMax=400f),
        "dhea"         to BiomarkerReading("dhea",         0f, "µg/dL",   optimalMin=200f, optimalMax=400f, normalMin=80f,  normalMax=560f),
        "igf1"         to BiomarkerReading("igf1",         0f, "ng/mL",   optimalMin=150f, optimalMax=300f, normalMin=80f,  normalMax=350f)
    )

    fun evaluateBiomarkerStatus(name: String, value: Float): String {
        val baseline = baselines[name.lowercase()] ?: return "unknown"
        return when {
            baseline.optimalMin != null && baseline.optimalMax != null &&
                value >= baseline.optimalMin && value <= baseline.optimalMax -> "optimal"
            baseline.normalMin != null && baseline.normalMax != null &&
                value >= baseline.normalMin && value <= baseline.normalMax -> "normal"
            baseline.normalMin != null && value < baseline.normalMin -> "low"
            baseline.normalMax != null && value > baseline.normalMax * 1.2f -> "critical"
            else -> "elevated"
        }
    }

    fun evaluate(name: String, value: Float, unit: String): BiomarkerReading? {
        val baseline = baselines[name.lowercase()] ?: return null
        return baseline.copy(value = value, unit = unit)
    }
}

// ── SomaIngestService ─────────────────────────────────────────────────────────

/**
 * Soma's "Physician Persona" ingestion gate (Spec §2.1 + §2.2).
 *
 * ingestReport() enforces the Patient Firewall:
 *   GUEST → isolate analysis → show in HUD overlay → BLOCK all SpineEvents
 *   USER  → save to clinical history → emit SpineEvents with vitality mutations
 *
 * Additionally detects biomarker anomalies and cascades to Agnes + Titan.
 */
class SomaIngestService(
    private val eventBus: SpineEventBus
) {
    /**
     * Ingest a clinical report through the Physician Persona.
     *
     * @param report  The raw clinical document
     * @param scope   USER (full pipeline) or GUEST (analysis only, no soul impact)
     */
    suspend fun ingestReport(report: RawReport, scope: PatientScope) {
        if (scope == PatientScope.GUEST) {
            // Step 1: Process in isolation — analysis only
            val analysis = PhysicianPersona.analyze(report)

            // Step 2: Write to stateless session HUD (UI overlay only)
            eventBus.emit(SpineEventPayload(
                type = "SOMA_GUEST_ANALYSIS_READY",
                source = "soma",
                priority = "info",
                patientScope = SpinePatientScope.GUEST,
                data = mapOf(
                    "documentId"   to report.id,
                    "documentType" to report.documentType.name,
                    "analysis"     to analysis.summary,
                    "anomalies"    to analysis.anomalies.map { it.name },
                    "display"      to "hud_overlay",
                    "note"         to "Guest data: GlobalSoul not modified. Firewall active."
                )
            ).toSpineEvent())

            // Step 3: BLOCK — return immediately, no soul mutations emitted
            return
        }

        // USER path: full pipeline
        val analysis = PhysicianPersona.analyze(report)
        val vitalityDelta = deriveVitalityDelta(analysis)
        val vitalitySnapshot = (1f + vitalityDelta).coerceIn(0f, 1f)

        eventBus.emit(
            SpineEventPayload(
                type = "BIO_SYNC",
                source = "soma",
                domain = "B",
                priority = "info",
                data = mapOf(
                    "documentId" to report.id,
                    "vitality" to vitalitySnapshot,
                    "anomalyCount" to analysis.anomalies.size,
                    "summary" to analysis.summary,
                    "triggeredBy" to "clinical_ingest"
                )
            )
        )

        // Emit clinical upload with vitality mutation
        eventBus.emit(SpineEventPayload(
            type = "CLINICAL_UPLOAD_PROCESSED",
            source = "soma",
            priority = "alert",
            patientScope = SpinePatientScope.USER,
            mutations = if (vitalityDelta != 0f) listOf(SpineSoulMutation("VITALITY", vitalityDelta)) else emptyList(),
            data = mapOf(
                "documentId"    to report.id,
                "documentType"  to report.documentType.name,
                "parsedSummary" to analysis.summary,
                "anomalyCount"  to analysis.anomalies.size,
                "vitalityDelta" to vitalityDelta
            )
        ).toSpineEvent())

        // Cascade: anomaly detection → Agnes + Titan
        analysis.anomalies.forEach { marker ->
            emitBiomarkerAnomaly(marker)
        }
    }

    // ── Biomarker anomaly cascade ─────────────────────────────────────────────

    private suspend fun emitBiomarkerAnomaly(marker: BiomarkerReading) {
        val isCortisol = marker.name.equals("cortisol", ignoreCase = true)
        val isCrp      = marker.name.equals("crp", ignoreCase = true)
        val isHighInflammation = isCrp && marker.value > (marker.normalMax ?: 3f)

        // High cortisol → Agnes investigate stress triggers
        if (isCortisol && marker.isOptimalAnomaly) {
            eventBus.emit(SpineEventPayload(
                type = "AGNES_BIOMARKER_STRESS_PING",
                source = "soma",
                priority = "alert",
                data = mapOf(
                    "triggeredBy"  to "CORTISOL_ANOMALY",
                    "markerName"   to marker.name,
                    "value"        to marker.value,
                    "deviation"    to marker.deviationLabel,
                    "probeMessage" to "Soma detected elevated cortisol (${marker.value} ${marker.unit}). Agnes: investigate active stress triggers and recent life events."
                )
            ).toSpineEvent())
        }

        // Any clinical anomaly → Titan Recovery Mode
        if (marker.isClinicalAnomaly) {
            val reason = if (isHighInflammation) "high_inflammation" else "biomarker_anomaly"
            eventBus.emit(SpineEventPayload(
                type = "TITAN_UI_MODE_RECOVERY",
                source = "soma",
                priority = "alert",
                data = mapOf(
                    "triggeredBy"  to "SOMA_CLINICAL_ANOMALY",
                    "markerName"   to marker.name,
                    "deviation"    to marker.deviationLabel,
                    "reason"       to reason,
                    "uiMode"       to "RECOVERY",
                    "message"      to "Soma detected ${marker.deviationLabel} ${marker.name}. Titan switching to Recovery Mode."
                )
            ).toSpineEvent())
        }
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private fun deriveVitalityDelta(analysis: PhysicianPersona.ClinicalAnalysis): Float {
        if (analysis.anomalies.isEmpty()) return 0f
        val severity = analysis.anomalies.count { it.isClinicalAnomaly }
        return -(severity * 0.1f).coerceAtMost(0.4f)
    }
}

// ── Physician Persona ─────────────────────────────────────────────────────────

/**
 * Analytical persona that parses a RawReport and returns deviation-from-optimal analysis.
 * Distinguishes "Optimal Baseline" (performance-grade) from "Normal Range" (disease-avoidance).
 */
object PhysicianPersona {

    data class ClinicalAnalysis(
        val summary: String,
        val anomalies: List<BiomarkerReading>,   // markers outside optimal OR normal range
        val overallStatus: String                // "OPTIMAL" | "SUB-OPTIMAL" | "CLINICAL_CONCERN"
    )

    fun analyze(report: RawReport): ClinicalAnalysis {
        val evaluated = report.parsedMarkers.mapNotNull { marker ->
            OptimalBaseline.evaluate(marker.name, marker.value, marker.unit)
        }

        val anomalies = evaluated.filter { it.isOptimalAnomaly || it.isClinicalAnomaly }

        val status = when {
            anomalies.any { it.isClinicalAnomaly } -> "CLINICAL_CONCERN"
            anomalies.isNotEmpty()                  -> "SUB-OPTIMAL"
            else                                    -> "OPTIMAL"
        }

        val summaryLines = buildList {
            add("Clinical analysis — ${report.documentType.name}")
            add("Overall status: $status")
            anomalies.forEach { m ->
                add("  ${m.name}: ${m.value} ${m.unit} [${m.deviationLabel}]" +
                    (if (m.optimalMin != null && m.optimalMax != null) " | Optimal: ${m.optimalMin}–${m.optimalMax}" else ""))
            }
            if (anomalies.isEmpty()) add("  All measured markers within optimal range.")
        }

        return ClinicalAnalysis(
            summary = summaryLines.joinToString("\n"),
            anomalies = anomalies,
            overallStatus = status
        )
    }
}
