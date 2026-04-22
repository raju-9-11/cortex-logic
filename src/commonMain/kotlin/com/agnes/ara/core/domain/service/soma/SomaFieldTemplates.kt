package com.agnes.ara.core.domain.service.soma

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

/**
 * SomaFieldTemplates — Soma module extension field templates and clinical ranges.
 *
 * Pre-built extension field suggestions for the Soma (health/biometrics) sub-module.
 * These are NOT core schema fields; they are offered as suggestions in the
 * "Add Field" flow and are capped at 25 per user.
 *
 * Architecture contract:
 *   - LLM is the sole semantic domain validator — no keyword gates here.
 *   - Structural validation is handled by SchemaRegistry.
 *   - These templates are surfaced as suggestions, never force-added.
 *   - evaluateBiomarkerStatus follows the TS precedence:
 *       normal check → warning check → critical fallback.
 */

// ═══════════════════════════════════════════════════════════════════════════════
// Category definitions
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
data class SomaFieldCategory(
    val key: String,
    val label: String,
    val color: String,
    val icon: String,
)

// ═══════════════════════════════════════════════════════════════════════════════
// Clinical reference ranges
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
data class RangeBound(val min: Double, val max: Double)

@Serializable
data class ClinicalRange(
    val fieldId: String,
    val unit: String,
    val normal: RangeBound,
    val warning: RangeBound? = null,
    val critical: RangeBound? = null,
)

// ═══════════════════════════════════════════════════════════════════════════════
// Suggested field model (structural subset — full FieldDefinition lives in TS)
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
data class SomaFieldValidation(
    val minimum: Double? = null,
    val maximum: Double? = null,
    val multipleOf: Double? = null,
    val enum: List<String>? = null,
)

@Serializable
data class SomaSelectOption(val value: String, val label: String)

@Serializable
data class SomaFieldMetadata(
    val category: String,
    val order: Int,
    val icon: String,
    val unit: String? = null,
    val helpText: String? = null,
    val placeholder: String? = null,
    val uiHint: String? = null,
    val searchable: Boolean = false,
)

@Serializable
data class SomaFieldTemplate(
    val id: String,
    val name: String,
    /** "number" | "select" | "range" */
    val type: String,
    val description: String,
    val required: Boolean = false,
    val defaultValue: Double? = null,
    val options: List<SomaSelectOption>? = null,
    val validation: SomaFieldValidation? = null,
    val metadata: SomaFieldMetadata,
)

// ═══════════════════════════════════════════════════════════════════════════════
// SomaFieldTemplates object
// ═══════════════════════════════════════════════════════════════════════════════

object SomaFieldTemplates {

    private val json = Json { ignoreUnknownKeys = true }

    // ─── Category definitions ─────────────────────────────────────────────────

    val SOMA_FIELD_CATEGORIES: List<SomaFieldCategory> = listOf(
        SomaFieldCategory(key = "vitals",    label = "Vital Signs",    color = "emerald", icon = "Heart"),
        SomaFieldCategory(key = "hormones",  label = "Hormones",       color = "purple",  icon = "Activity"),
        SomaFieldCategory(key = "metabolic", label = "Metabolic",      color = "amber",   icon = "Droplet"),
        SomaFieldCategory(key = "general",   label = "General Health", color = "cyan",    icon = "Shield"),
    )

    // ─── Clinical reference ranges ────────────────────────────────────────────

    val SOMA_CLINICAL_RANGES: List<ClinicalRange> = listOf(
        ClinicalRange(
            fieldId = "cortisol-level",
            unit = "ng/dL",
            normal   = RangeBound(6.0,   23.0),
            warning  = RangeBound(3.0,   30.0),
            critical = RangeBound(0.0,   50.0),
        ),
        ClinicalRange(
            fieldId = "testosterone-level",
            unit = "ng/dL",
            normal   = RangeBound(300.0,  1000.0),
            warning  = RangeBound(200.0,  1200.0),
            critical = RangeBound(0.0,    1500.0),
        ),
        ClinicalRange(
            fieldId = "thyroid-tsh",
            unit = "mIU/L",
            normal   = RangeBound(0.4,  4.0),
            warning  = RangeBound(0.1,  6.0),
            critical = RangeBound(0.0,  20.0),
        ),
        ClinicalRange(
            fieldId = "iron-ferritin",
            unit = "ng/mL",
            normal   = RangeBound(24.0,  336.0),
            warning  = RangeBound(10.0,  500.0),
            critical = RangeBound(0.0,  1000.0),
        ),
        ClinicalRange(
            fieldId = "blood-glucose",
            unit = "mg/dL",
            normal   = RangeBound(70.0,   100.0),
            warning  = RangeBound(55.0,   125.0),
            critical = RangeBound(0.0,    600.0),
        ),
        ClinicalRange(
            fieldId = "hba1c",
            unit = "%",
            normal   = RangeBound(4.0,  5.6),
            warning  = RangeBound(5.7,  6.4),
            critical = RangeBound(0.0,  20.0),
        ),
        ClinicalRange(
            fieldId = "cholesterol-total",
            unit = "mg/dL",
            normal   = RangeBound(0.0,    199.0),
            warning  = RangeBound(200.0,  239.0),
            critical = RangeBound(240.0,  500.0),
        ),
    )

    // ─── Suggested extension field templates (10 total) ───────────────────────

    val SOMA_SUGGESTED_FIELDS: List<SomaFieldTemplate> = listOf(
        // Hormones
        SomaFieldTemplate(
            id = "cortisol-level",
            name = "Cortisol Level",
            type = "number",
            description = "Serum cortisol concentration in ng/dL. Normal morning range: 6\u201323 ng/dL. " +
                "Elevated levels may indicate chronic stress, Cushing syndrome, or adrenal dysfunction. " +
                "Values vary by time of day \u2014 morning samples are the clinical standard.",
            required = false,
            validation = SomaFieldValidation(minimum = 0.0, maximum = 50.0, multipleOf = 0.1),
            metadata = SomaFieldMetadata(
                category = "hormones",
                order = 1,
                icon = "Activity",
                unit = "ng/dL",
                helpText = "Enter your morning (AM) serum cortisol value from lab work",
                placeholder = "e.g., 14.5",
                searchable = true,
            ),
        ),
        SomaFieldTemplate(
            id = "testosterone-level",
            name = "Testosterone Level",
            type = "number",
            description = "Total testosterone concentration in ng/dL. Normal ranges \u2014 Male: 300\u20131000 ng/dL, " +
                "Female: 15\u201370 ng/dL. Values outside these ranges may warrant clinical follow-up. " +
                "Best measured via morning blood draw.",
            required = false,
            validation = SomaFieldValidation(minimum = 0.0, maximum = 1500.0, multipleOf = 0.1),
            metadata = SomaFieldMetadata(
                category = "hormones",
                order = 2,
                icon = "TrendingUp",
                unit = "ng/dL",
                helpText = "Total testosterone from lab results (morning blood draw recommended)",
                placeholder = "e.g., 550",
                searchable = true,
            ),
        ),
        SomaFieldTemplate(
            id = "thyroid-tsh",
            name = "Thyroid TSH",
            type = "number",
            description = "Thyroid-stimulating hormone (TSH) level in mIU/L. Normal range: 0.4\u20134.0 mIU/L. " +
                "Values above 4.0 may suggest hypothyroidism; below 0.4 may indicate hyperthyroidism. " +
                "TSH is the primary screening marker for thyroid function.",
            required = false,
            validation = SomaFieldValidation(minimum = 0.0, maximum = 20.0, multipleOf = 0.01),
            metadata = SomaFieldMetadata(
                category = "hormones",
                order = 3,
                icon = "Activity",
                unit = "mIU/L",
                helpText = "TSH from thyroid panel lab work \u2014 the key thyroid screening marker",
                placeholder = "e.g., 2.15",
                searchable = true,
            ),
        ),
        // Metabolic
        SomaFieldTemplate(
            id = "vitamin-d-status",
            name = "Vitamin D Status",
            type = "select",
            description = "Serum 25-hydroxyvitamin D classification based on standard clinical thresholds. " +
                "Deficient: <20 ng/mL, Insufficient: 20\u201329 ng/mL, Optimal: 30\u2013100 ng/mL, " +
                "High: >100 ng/mL. Adequate vitamin D supports bone health, immunity, and mood.",
            required = false,
            options = listOf(
                SomaSelectOption(value = "deficient",   label = "Deficient (<20 ng/mL)"),
                SomaSelectOption(value = "insufficient", label = "Insufficient (20\u201329 ng/mL)"),
                SomaSelectOption(value = "optimal",     label = "Optimal (30\u2013100 ng/mL)"),
                SomaSelectOption(value = "high",        label = "High (>100 ng/mL)"),
            ),
            validation = SomaFieldValidation(enum = listOf("deficient", "insufficient", "optimal", "high")),
            metadata = SomaFieldMetadata(
                category = "metabolic",
                order = 4,
                icon = "Sun",
                helpText = "Select the classification from your most recent 25(OH)D lab result",
                uiHint = "chip-group",
                searchable = true,
            ),
        ),
        SomaFieldTemplate(
            id = "iron-ferritin",
            name = "Iron / Ferritin",
            type = "number",
            description = "Serum ferritin level in ng/mL \u2014 the primary marker of iron storage. " +
                "Normal ranges \u2014 Male: 24\u2013336 ng/mL, Female: 11\u2013307 ng/mL. " +
                "Low ferritin indicates depleted iron stores; very high levels may signal " +
                "inflammation or iron overload conditions.",
            required = false,
            validation = SomaFieldValidation(minimum = 0.0, maximum = 1000.0, multipleOf = 0.1),
            metadata = SomaFieldMetadata(
                category = "metabolic",
                order = 5,
                icon = "Droplet",
                unit = "ng/mL",
                helpText = "Ferritin from your iron panel \u2014 the best single marker of iron stores",
                placeholder = "e.g., 85",
                searchable = true,
            ),
        ),
        SomaFieldTemplate(
            id = "blood-glucose",
            name = "Blood Glucose",
            type = "number",
            description = "Blood glucose concentration in mg/dL. Normal fasting range: 70\u2013100 mg/dL. " +
                "Pre-diabetic fasting: 100\u2013125 mg/dL, Diabetic fasting: \u2265126 mg/dL. " +
                "Post-meal values naturally run higher. Track fasting values for consistency.",
            required = false,
            validation = SomaFieldValidation(minimum = 0.0, maximum = 600.0, multipleOf = 1.0),
            metadata = SomaFieldMetadata(
                category = "metabolic",
                order = 6,
                icon = "Droplet",
                unit = "mg/dL",
                helpText = "Enter fasting blood glucose for the most comparable day-to-day tracking",
                placeholder = "e.g., 92",
                searchable = true,
            ),
        ),
        SomaFieldTemplate(
            id = "hba1c",
            name = "HbA1c",
            type = "number",
            description = "Glycated hemoglobin (HbA1c) percentage \u2014 reflects average blood sugar over " +
                "2\u20133 months. Normal: <5.7%, Pre-diabetic: 5.7\u20136.4%, Diabetic: \u22656.5%. " +
                "HbA1c is the gold-standard marker for long-term glycemic control.",
            required = false,
            validation = SomaFieldValidation(minimum = 0.0, maximum = 20.0, multipleOf = 0.1),
            metadata = SomaFieldMetadata(
                category = "metabolic",
                order = 7,
                icon = "BarChart3",
                unit = "%",
                helpText = "HbA1c from lab work \u2014 measures your 2\u20133 month average blood sugar",
                placeholder = "e.g., 5.4",
                searchable = true,
            ),
        ),
        SomaFieldTemplate(
            id = "cholesterol-total",
            name = "Cholesterol Total",
            type = "number",
            description = "Total cholesterol in mg/dL. Desirable: <200 mg/dL, Borderline high: 200\u2013239 mg/dL, " +
                "High: \u2265240 mg/dL. Total cholesterol is one component of a full lipid panel \u2014 " +
                "consider tracking alongside HDL, LDL, and triglycerides for a complete picture.",
            required = false,
            validation = SomaFieldValidation(minimum = 0.0, maximum = 500.0, multipleOf = 1.0),
            metadata = SomaFieldMetadata(
                category = "metabolic",
                order = 8,
                icon = "Heart",
                unit = "mg/dL",
                helpText = "Total cholesterol from your lipid panel lab results",
                placeholder = "e.g., 185",
                searchable = true,
            ),
        ),
        // General health
        SomaFieldTemplate(
            id = "allergy-severity",
            name = "Allergy Severity",
            type = "range",
            description = "Self-assessed allergy severity on a 0\u201310 scale. 0 = no symptoms, " +
                "1\u20133 = mild (occasional sneezing, minor irritation), 4\u20136 = moderate " +
                "(persistent congestion, itchy eyes, skin reaction), 7\u201310 = severe " +
                "(significant impairment, requires medication or medical attention).",
            required = false,
            defaultValue = 0.0,
            validation = SomaFieldValidation(minimum = 0.0, maximum = 10.0, multipleOf = 1.0),
            metadata = SomaFieldMetadata(
                category = "general",
                order = 9,
                icon = "AlertTriangle",
                helpText = "Rate your current allergy severity. Track alongside common allergens " +
                    "(pollen, dust, pet dander, food) to identify patterns and seasonal trends.",
                uiHint = "slider",
            ),
        ),
        SomaFieldTemplate(
            id = "skin-health-score",
            name = "Skin Health Score",
            type = "range",
            description = "Self-assessed overall skin health on a 0\u201310 scale. 0 = severe issues, " +
                "10 = excellent condition. Consider factors such as hydration, clarity, " +
                "elasticity, acne/breakouts, redness, and texture when scoring.",
            required = false,
            defaultValue = 5.0,
            validation = SomaFieldValidation(minimum = 0.0, maximum = 10.0, multipleOf = 1.0),
            metadata = SomaFieldMetadata(
                category = "general",
                order = 10,
                icon = "Shield",
                helpText = "Rate your overall skin condition. Consider hydration, clarity, elasticity, " +
                    "breakouts, redness, and texture. Consistent daily logging helps surface " +
                    "correlations with diet, sleep, and stress.",
                uiHint = "slider",
            ),
        ),
    )

    // ─── Public API ───────────────────────────────────────────────────────────

    /**
     * Get the clinical range definition for a given [fieldId].
     * Returns a JSON-encoded ClinicalRange, or null if none defined.
     */
    fun getClinicalRange(fieldId: String): String? {
        val range = SOMA_CLINICAL_RANGES.find { it.fieldId == fieldId } ?: return null
        return json.encodeToString(ClinicalRange.serializer(), range)
    }

    /**
     * Evaluate a biomarker [value] against its clinical reference range.
     *
     * Precedence mirrors the TS source:
     *   normal check → warning check → critical fallback → "unknown"
     *
     * @param fieldId  The field identifier (e.g. "cortisol-level")
     * @param value    Measured numeric value
     * @return "normal" | "warning" | "critical" | "unknown"
     */
    fun evaluateBiomarkerStatus(fieldId: String, value: Double): String {
        val range = SOMA_CLINICAL_RANGES.find { it.fieldId == fieldId }
            ?: return "unknown"

        if (value >= range.normal.min && value <= range.normal.max) return "normal"

        val warning = range.warning
        if (warning != null && value >= warning.min && value <= warning.max) return "warning"

        val critical = range.critical
        if (critical != null && value >= critical.min && value <= critical.max) return "critical"

        return "critical"
    }
}
