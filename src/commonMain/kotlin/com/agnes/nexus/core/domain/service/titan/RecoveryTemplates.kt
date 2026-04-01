package com.agnes.nexus.core.domain.service.titan

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

// ═══════════════════════════════════════════════════════════════════════════════
// RecoveryTemplates — Static recovery protocol definitions
//
// Mirrors the TypeScript recovery-templates.ts data exactly.
// getRecoveryTemplate dispatches on type + optional body region.
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
data class RecoveryTemplate(
    val id: String,
    /** "rest" | "active" | "rehab" | "deload" */
    val type: String,
    val label: String,
    val description: String,
    val suggestedDurationDays: Int,
    val steps: List<String>,
)

object RecoveryTemplates {

    private val json = Json { ignoreUnknownKeys = true }

    // ─── Base templates (one per recovery type) ───────────────────────────────

    private val BASE_TEMPLATES: Map<String, RecoveryTemplate> = mapOf(
        "rest" to RecoveryTemplate(
            id = "rest-core",
            type = "rest",
            label = "Complete Rest",
            description = "Focus on sleep, nutrition, and reducing load.",
            suggestedDurationDays = 5,
            steps = listOf(
                "Prioritize 8\u20139 hours of sleep and consistent sleep timing.",
                "Keep daily activity light (short walks, gentle mobility only).",
                "Hydrate and maintain protein intake to support recovery.",
                "Avoid heavy training or high-intensity intervals.",
            ),
        ),
        "active" to RecoveryTemplate(
            id = "active-core",
            type = "active",
            label = "Active Recovery",
            description = "Low-intensity work to improve circulation and readiness.",
            suggestedDurationDays = 5,
            steps = listOf(
                "Do 20\u201340 minutes of zone-2 cardio or brisk walking.",
                "Mobility flow 10\u201315 minutes focusing on hips/shoulders/spine.",
                "Light bodyweight or banded activation work (RPE \u2264 5).",
                "Keep total volume under 50% of normal training.",
            ),
        ),
        "rehab" to RecoveryTemplate(
            id = "rehab-core",
            type = "rehab",
            label = "Rehab Protocol",
            description = "Structured rehab flow with progressive loading.",
            suggestedDurationDays = 14,
            steps = listOf(
                "Limit aggravating movement patterns.",
                "Perform pain-free range of motion and isometrics.",
                "Progress to light eccentrics if tolerated.",
                "Reassess daily before increasing load.",
            ),
        ),
        "deload" to RecoveryTemplate(
            id = "deload-core",
            type = "deload",
            label = "Reduced Load (Deload)",
            description = "Maintain training pattern while lowering intensity.",
            suggestedDurationDays = 7,
            steps = listOf(
                "Reduce volume to 50\u201360% of normal.",
                "Keep intensity moderate, avoid max effort.",
                "Emphasize technique and tempo control.",
                "Schedule extra rest day mid-week.",
            ),
        ),
    )

    // ─── Region-specific rehab protocols ─────────────────────────────────────

    private val REHAB_BY_REGION: Map<String, RecoveryTemplate> = mapOf(
        "knee" to RecoveryTemplate(
            id = "rehab-knee",
            type = "rehab",
            label = "Knee Rehab",
            description = "Quad/hip stability + pain-free ROM progression.",
            suggestedDurationDays = 21,
            steps = listOf(
                "Isometric quad holds (30\u201345s) and glute bridges.",
                "Pain-free knee ROM drills (heel slides, terminal knee extension).",
                "Progress to step-ups and split squats if tolerated.",
                "Avoid deep flexion under load until pain resolves.",
            ),
        ),
        "shoulder" to RecoveryTemplate(
            id = "rehab-shoulder",
            type = "rehab",
            label = "Shoulder Rehab",
            description = "Rotator cuff + scapular stability emphasis.",
            suggestedDurationDays = 21,
            steps = listOf(
                "Scapular retraction and external rotation isometrics.",
                "Light banded rotations and face pulls.",
                "Progress to controlled overhead range of motion.",
                "Avoid heavy pressing until pain-free.",
            ),
        ),
        "back" to RecoveryTemplate(
            id = "rehab-back",
            type = "rehab",
            label = "Back Rehab",
            description = "Core stability and hip hinge re-patterning.",
            suggestedDurationDays = 21,
            steps = listOf(
                "McGill Big 3 (bird dog, side plank, curl-up).",
                "Hip hinge drills with neutral spine.",
                "Light reverse hypers or glute bridges if tolerated.",
                "Avoid high-load spinal compression.",
            ),
        ),
        "hip" to RecoveryTemplate(
            id = "rehab-hip",
            type = "rehab",
            label = "Hip Rehab",
            description = "Glute med activation + mobility.",
            suggestedDurationDays = 14,
            steps = listOf(
                "Clamshells and lateral band walks.",
                "Hip mobility: 90/90 flows and gentle stretches.",
                "Progress to step-ups or split squats as tolerated.",
                "Avoid deep flexion under heavy load.",
            ),
        ),
        "ankle" to RecoveryTemplate(
            id = "rehab-ankle",
            type = "rehab",
            label = "Ankle Rehab",
            description = "Mobility + stability work.",
            suggestedDurationDays = 14,
            steps = listOf(
                "Ankle mobility (knee-over-toe drills).",
                "Single-leg balance and calf raises.",
                "Progress to controlled plyo only if pain-free.",
                "Avoid high-impact jumps early.",
            ),
        ),
        "wrist" to RecoveryTemplate(
            id = "rehab-wrist",
            type = "rehab",
            label = "Wrist Rehab",
            description = "Tendon-friendly loading and mobility.",
            suggestedDurationDays = 14,
            steps = listOf(
                "Wrist flexion/extension isometrics.",
                "Gentle mobility through pain-free range.",
                "Progress to light grip work if tolerated.",
                "Avoid heavy pressing and loaded extensions.",
            ),
        ),
        "neck" to RecoveryTemplate(
            id = "rehab-neck",
            type = "rehab",
            label = "Neck Rehab",
            description = "Posture + cervical stability.",
            suggestedDurationDays = 14,
            steps = listOf(
                "Chin tucks and deep neck flexor holds.",
                "Gentle cervical mobility (no end-range pain).",
                "Upper back mobility to reduce load.",
                "Avoid heavy axial compression.",
            ),
        ),
        "other" to RecoveryTemplate(
            id = "rehab-general",
            type = "rehab",
            label = "General Rehab",
            description = "Pain-free movement progression.",
            suggestedDurationDays = 14,
            steps = listOf(
                "Identify pain-free movement ranges.",
                "Isometrics and light tempo control.",
                "Progress gradually to full ROM.",
                "Stop if pain exceeds mild discomfort.",
            ),
        ),
    )

    /**
     * Human-readable labels for each recovery type.
     * Mirrors RECOVERY_TEMPLATE_LABELS from the TS source.
     */
    val RECOVERY_TEMPLATE_LABELS: Map<String, String> = mapOf(
        "rest" to "Complete Rest",
        "active" to "Active Recovery",
        "rehab" to "Rehab Protocol",
        "deload" to "Reduced Load",
    )

    /**
     * Return the JSON-encoded RecoveryTemplate for the given [type].
     *
     * When [type] is "rehab" and a [bodyRegion] is provided, the region-specific
     * protocol is returned. Falls back to the general rehab template for unknown
     * regions, and to the base rehab template when no region is supplied.
     *
     * @param type        One of "rest" | "active" | "rehab" | "deload"
     * @param bodyRegion  Optional region key: "knee" | "shoulder" | "back" |
     *                    "hip" | "ankle" | "wrist" | "neck" | "other"
     * @return JSON string of the matching RecoveryTemplate
     * @throws IllegalArgumentException for unrecognised type values
     */
    fun getRecoveryTemplate(type: String, bodyRegion: String? = null): String {
        val template: RecoveryTemplate = if (type == "rehab" && bodyRegion != null) {
            REHAB_BY_REGION[bodyRegion] ?: REHAB_BY_REGION.getValue("other")
        } else {
            BASE_TEMPLATES[type]
                ?: throw IllegalArgumentException("Unknown recovery type: '$type'")
        }
        return json.encodeToString(RecoveryTemplate.serializer(), template)
    }
}
