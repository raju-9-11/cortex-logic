package com.agnes.ara.core.domain.service.soma

import com.agnes.ara.core.domain.models.SomaProfile

/**
 * Evaluates activity clearance against a user's known medical conditions and medications.
 *
 * Returns a [ClearanceEvaluation] with status "granted" | "denied" | "conditional"
 * based on pattern-matched contraindications and medication warnings.
 */
object ClearanceEngine {

    private val contraindicationMap: Map<String, List<String>> = mapOf(
        "cardiac"     to listOf("heart disease", "cardiac", "coronary", "arrhythmia", "afib", "heart failure"),
        "hernia"      to listOf("hernia", "inguinal"),
        "asthma"      to listOf("asthma", "copd", "bronchospasm"),
        "joint"       to listOf("arthritis", "joint replacement", "osteoporosis"),
        "spinal"      to listOf("back pain", "herniated disc", "scoliosis", "spinal stenosis"),
        "high_impact" to listOf("stress fracture", "osteoporosis"),
        "swimming"    to listOf("open wound", "active skin infection"),
        "running"     to listOf("plantar fasciitis", "shin splints", "stress fracture"),
        "lifting"     to listOf("hernia", "spinal stenosis", "hypertension"),
    )

    private val medicationWarningMap: Map<String, List<String>> = mapOf(
        "cardiac"      to listOf("beta blocker", "digoxin", "warfarin", "anticoagulant"),
        "heat_exposure" to listOf("diuretic", "lithium"),
        "high_impact"  to listOf("corticosteroid", "fluoroquinolone"),
    )

    data class ClearanceEvaluation(
        val status: String,           // "granted" | "denied" | "conditional"
        val reason: String,
        val contraindications: List<String>,
        val warnings: List<String>
    )

    fun evaluate(activity: String, profile: SomaProfile): ClearanceEvaluation {
        val activityLower = activity.lowercase()
        val conditions = profile.knownConditions.map { it.lowercase() }
        val medications = profile.medications.map { it.lowercase() }

        val contraindications = mutableListOf<String>()
        val warnings = mutableListOf<String>()

        // Pattern keyword match against activity name
        for ((pattern, contraindicatedConditions) in contraindicationMap) {
            if (activityLower.contains(pattern)) {
                for (condition in conditions) {
                    if (contraindicatedConditions.any { condition.contains(it) }) {
                        contraindications.add("$condition may contraindicate $activity")
                    }
                }
            }
        }

        // Broad reverse check: activity name contains a contraindication keyword
        for ((_, contraindicatedConditions) in contraindicationMap) {
            if (contraindicatedConditions.any { keyword -> activityLower.contains(keyword) }) {
                for (condition in conditions) {
                    if (contraindicatedConditions.any { condition.contains(it) }) {
                        if (!contraindications.any { it.startsWith(condition) }) {
                            contraindications.add("$condition may contraindicate $activity")
                        }
                    }
                }
            }
        }

        // Medication warnings
        for ((pattern, warningMeds) in medicationWarningMap) {
            if (activityLower.contains(pattern)) {
                for (med in medications) {
                    if (warningMeds.any { med.contains(it) }) {
                        warnings.add("$med may require monitoring during $activity")
                    }
                }
            }
        }

        return when {
            contraindications.isNotEmpty() -> ClearanceEvaluation(
                status = "denied",
                reason = "Activity contraindicated based on medical profile: ${contraindications.first()}",
                contraindications = contraindications,
                warnings = warnings
            )
            warnings.isNotEmpty() -> ClearanceEvaluation(
                status = "conditional",
                reason = "Proceed with caution — medication interactions detected",
                contraindications = emptyList(),
                warnings = warnings
            )
            else -> ClearanceEvaluation(
                status = "granted",
                reason = "No contraindications found in current medical profile",
                contraindications = emptyList(),
                warnings = emptyList()
            )
        }
    }
}
