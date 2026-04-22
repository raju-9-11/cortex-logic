package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.service.soma.SomaFieldTemplates
import kotlin.js.JsExport

// ═══════════════════════════════════════════════════════════════════════════════
// SomaFieldTemplatesJs — JS/TS-facing wrapper for SomaFieldTemplates
//
// Thin @JsExport adapter. All business logic lives in the commonMain object.
// ═══════════════════════════════════════════════════════════════════════════════

@JsExport
class SomaFieldTemplatesJs {

    /**
     * Get the clinical range definition for a given [fieldId].
     *
     * @param fieldId  e.g. "cortisol-level", "thyroid-tsh"
     * @return JSON-encoded ClinicalRange `{fieldId, unit, normal, warning?, critical?}`,
     *         or null if no range is defined for this field.
     */
    fun getClinicalRange(fieldId: String): String? =
        SomaFieldTemplates.getClinicalRange(fieldId)

    /**
     * Evaluate a biomarker [value] against its clinical reference range.
     *
     * @param fieldId  The field identifier (e.g. "blood-glucose")
     * @param value    Measured numeric value
     * @return "normal" | "warning" | "critical" | "unknown"
     */
    fun evaluateBiomarkerStatus(fieldId: String, value: Double): String =
        SomaFieldTemplates.evaluateBiomarkerStatus(fieldId, value)
}
