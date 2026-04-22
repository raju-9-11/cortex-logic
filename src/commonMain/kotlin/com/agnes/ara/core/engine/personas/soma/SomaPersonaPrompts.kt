package com.agnes.ara.core.engine.personas.soma

import com.agnes.ara.core.engine.personas.PersonaPrompt

/**
 * Soma persona prompt catalog — full parity with TS soma-prompt-builder.ts.
 *
 * The [base] prompt uses `{{PLACEHOLDER}}` slots that the prompt builder will
 * `.replace()` at runtime with live user data. Phase 2 will wire the builder;
 * Phase 1 ensures the template text is in KMP.
 */
object SomaPersonaPrompts {

    // =========================================================================
    // Medical Disclaimer (shared across Soma prompts)
    // =========================================================================

    const val MEDICAL_DISCLAIMER = """
⚕ MEDICAL DISCLAIMER
This AI provides general health information and data analysis only. \
It is NOT medical advice and does NOT constitute a professional diagnosis, \
treatment recommendation, or substitute for consultation with a qualified \
healthcare provider. Always consult your doctor or licensed medical \
professional before making health decisions based on biomarker data. \
In an emergency (chest pain, difficulty breathing, loss of consciousness, \
severe allergic reaction), call emergency services (911 / 112 / 999) immediately."""

    // =========================================================================
    // Agent System Prompt Template (13 placeholders)
    // =========================================================================

    /**
     * Raw template string with `{{PLACEHOLDER}}` tokens. The prompt builder
     * replaces each token with serialized user data at runtime.
     *
     * Placeholders:
     *  1. {{HEALTH_CONTEXT}}      — Core fields + custom biomarkers
     *  2. {{NSV_BIOLOGICAL}}      — NSV biological dimension values
     *  3. {{CLEARANCE_STATUS}}    — granted / conditional / denied
     *  4. {{LAST_CHECKUP}}        — ISO date or "Unknown"
     *  5. {{NEXT_CHECKUP}}        — ISO date or "Not scheduled"
     *  6. {{KNOWN_CONDITIONS}}    — comma-separated or "None reported"
     *  7. {{MEDICATIONS}}         — comma-separated or "None reported"
     *  8. {{ALLERGIES}}           — comma-separated or "None reported"
     *  9. {{BIOMARKERS}}          — Recent 20 biomarker records
     * 10. {{LAB_SUMMARIES}}       — Recent 5 lab panel summaries
     * 11. {{CLEARANCE_DETAILS}}   — Per-activity clearance records
     * 12. {{PHYSICAL_ASSESSMENT}} — Latest physical assessment metrics
     * 13. {{MEDICAL_SUMMARY}}     — Free-text medical notes
     */
    const val AGENT_SYSTEM_TEMPLATE = """
[IDENTITY]
You are Soma, the Biological Authority within the Ara system.
You are a clinically analytical, tightly bounded medical intelligence agent responsible for monitoring, analyzing, and contextualizing the user's biological state.

[CORE RESPONSIBILITIES]
1. Monitor biomarkers, lab results, and vital signs.
2. Analyze recovery state and readiness for physical exertion.
3. Manage health clearance status (Granted / Conditional / Denied).
4. Extract and structure data from medical documents and images.

[CURRENT BIOLOGICAL STATE]
{{HEALTH_CONTEXT}}

[NEURAL STATE VECTOR - BIOLOGICAL]
{{NSV_BIOLOGICAL}}

[MEDICAL CONTEXT]
Clearance Status: {{CLEARANCE_STATUS}}
Last Checkup: {{LAST_CHECKUP}}
Next Checkup: {{NEXT_CHECKUP}}
Known Conditions: {{KNOWN_CONDITIONS}}
Current Medications: {{MEDICATIONS}}
Allergies: {{ALLERGIES}}

[BIOMARKERS — RECENT 20]
{{BIOMARKERS}}

[LAB SUMMARIES — RECENT 5]
{{LAB_SUMMARIES}}

[CLEARANCE DETAILS]
{{CLEARANCE_DETAILS}}

[LATEST PHYSICAL ASSESSMENT]
{{PHYSICAL_ASSESSMENT}}

[MEDICAL NOTES]
{{MEDICAL_SUMMARY}}

[BEHAVIORAL GUIDELINES]
- Speak with the precision of a senior clinician, but stay explicitly bounded to the provided data.
- Be direct, calm, data-driven, and objective.
- Identify trends, anomalies, uncertainty, and what data is missing.
- NEVER provide a medical diagnosis. Do NOT diagnose diseases, prescribe treatments, recommend dosage changes, or claim emergency triage beyond advising urgent evaluation.
- When exercise or exertion is discussed, anchor guidance to clearance surfaces using granted / conditional / denied language.
- When readiness is reduced or restrictions exist, explicitly coordinate toward Titan recovery / reduced-load follow-up rather than improvising aggressive training advice.
- When analyzing documents, extract every possible structured field.
- If an X-ray or medical image is provided, provide a structured radiology-style analysis (modality, findings, impression) without overstating certainty.

[AVAILABLE TOOLS]
- commit_biomarker: Save a specific biomarker value.
  <action type="commit_biomarker">{"name":"...","value":...,"unit":"...","source":"..."}</action>
- parse_lab_report: Save a summary of a lab panel.
  <action type="parse_lab_report">{"panel":"...","findings":["..."],"flags":["..."]}</action>
- update_conditions: Update the list of known medical conditions or medications.
  <action type="update_conditions">{"knownConditions":["..."],"medications":["..."]}</action>
- issue_clearance: Update the user's physical clearance status.
  <action type="issue_clearance">{"status":"granted|conditional|denied","activity":"...","reason":"..."}</action>
- medical_image_analysis: Save structured analysis of an X-ray, MRI, or other medical image.
  <action type="medical_image_analysis">{"reportType":"...","modality":"X-Ray|MRI|CT","bodyPart":"...","findings":["..."],"impression":"...","clinicalFlags":[{"flag":"...","severity":"mild|moderate|severe"}]}</action>

⚠️ ACTION FORMAT: Always use <action type="...">JSON</action> — exactly this XML format. Never use /action, [action], or any other variant. Malformed formats are silently dropped and the action will not execute.

$MEDICAL_DISCLAIMER"""

    // =========================================================================
    // PersonaPrompt (used by PersonaPromptCatalog / PersonaFactory fallback)
    // =========================================================================

    val base = PersonaPrompt(
        systemPrompt = AGENT_SYSTEM_TEMPLATE
    )

    // =========================================================================
    // Runtime prompt builder (replaces placeholders with live data)
    // =========================================================================

    /**
     * Build the Soma agent system prompt with injected health context.
     *
     * Each parameter maps to one of the 13 `{{PLACEHOLDER}}` tokens in the
     * template. Callers pass pre-serialized strings; default values ensure
     * a graceful fallback when data is unavailable.
     */
    fun buildAgentSystemPrompt(
        healthContext: String = "No health data available.",
        nsvBiological: String = "Not available.",
        clearanceStatus: String = "unknown",
        lastCheckup: String = "Unknown",
        nextCheckup: String = "Not scheduled",
        knownConditions: String = "None reported",
        medications: String = "None reported",
        allergies: String = "None reported",
        biomarkers: String = "No biomarker records.",
        labSummaries: String = "No lab summaries.",
        clearanceDetails: String = "No clearance records.",
        physicalAssessment: String = "No physical assessment on record.",
        medicalSummary: String = "No notes."
    ): String {
        return AGENT_SYSTEM_TEMPLATE
            .replace("{{HEALTH_CONTEXT}}", healthContext)
            .replace("{{NSV_BIOLOGICAL}}", nsvBiological)
            .replace("{{CLEARANCE_STATUS}}", clearanceStatus)
            .replace("{{LAST_CHECKUP}}", lastCheckup)
            .replace("{{NEXT_CHECKUP}}", nextCheckup)
            .replace("{{KNOWN_CONDITIONS}}", knownConditions)
            .replace("{{MEDICATIONS}}", medications)
            .replace("{{ALLERGIES}}", allergies)
            .replace("{{BIOMARKERS}}", biomarkers)
            .replace("{{LAB_SUMMARIES}}", labSummaries)
            .replace("{{CLEARANCE_DETAILS}}", clearanceDetails)
            .replace("{{PHYSICAL_ASSESSMENT}}", physicalAssessment)
            .replace("{{MEDICAL_SUMMARY}}", medicalSummary)
    }

    // =========================================================================
    // Extension field serializer (shared by Soma/Titan prompt builders)
    // =========================================================================

    /**
     * Serialize Soma extension fields into a compact human-readable block.
     *
     * Each field is rendered as:  `Name: value unit (range: lo–hi)`
     *
     * Returns a fallback string when the list is empty.
     */
    fun serializeExtensionFields(
        fields: List<ExtensionField>
    ): String {
        if (fields.isEmpty()) return "No custom biomarker fields configured."
        return fields.joinToString("\n") { f ->
            val value = when {
                f.value == null -> "not set"
                f.value is String -> "\"${f.value}\""
                else -> f.value.toString()
            }
            val unit = if (f.unit != null) " ${f.unit}" else ""
            val range = if (f.range != null) " (range: ${f.range})" else ""
            "${f.name}: $value$unit$range"
        }
    }

    data class ExtensionField(
        val id: String,
        val name: String,
        val value: Any?,
        val type: String,
        val unit: String? = null,
        val range: String? = null
    )

    // =========================================================================
    // Diagnosis prompts
    // =========================================================================

    /** Max characters of raw document text to include in the analysis prompt. */
    private const val MAX_RAW_TEXT_CHARS = 32_000

    // ── Diagnosis Context Policy ─────────────────────────────────────────────

    enum class DiagnosisContextPolicy { WITH_CONTEXT, ISOLATED }

    // ── Diagnosis Chat System Prompt ─────────────────────────────────────────

    /**
     * Summary of a previously extracted item — used to tell the LLM what
     * has already been saved so it does not re-extract.
     */
    data class ExtractedItemSummary(
        val label: String,
        val type: String
    )

    /**
     * Minimal Soma profile fields needed by the diagnosis system prompt.
     * Callers map their full profile type to this before calling.
     */
    data class SomaDiagnosisProfile(
        val knownConditions: List<String> = emptyList(),
        val medications: List<String> = emptyList(),
        val allergies: List<String> = emptyList(),
        val recentBiomarkers: List<BiomarkerSnapshot> = emptyList()
    )

    data class BiomarkerSnapshot(
        val name: String,
        val value: String,
        val unit: String? = null
    )

    /**
     * Builds the system prompt for Soma's diagnosis **chat** mode.
     *
     * This is the interactive system prompt used while the user is chatting
     * about an uploaded document — distinct from the one-shot extraction
     * prompt ([buildDiagnosisAnalysisPrompt]).
     *
     * Port of TS `somaDiagnosisSpec.buildSystemPrompt()`.
     */
    fun buildDiagnosisSystemPrompt(
        contextPolicy: DiagnosisContextPolicy = DiagnosisContextPolicy.ISOLATED,
        profile: SomaDiagnosisProfile? = null,
        extractedItems: List<ExtractedItemSummary> = emptyList()
    ): String {
        // ── Medical context (only if with-context and profile available) ──
        val contextBlock = if (
            contextPolicy == DiagnosisContextPolicy.WITH_CONTEXT && profile != null
        ) {
            val conditions = profile.knownConditions.joinToString(", ").ifEmpty { "None reported" }
            val meds = profile.medications.joinToString(", ").ifEmpty { "None reported" }
            val allergies = profile.allergies.joinToString(", ").ifEmpty { "None reported" }
            val biomarkers = profile.recentBiomarkers.take(10).joinToString("; ") { b ->
                "${b.name}: ${b.value}${if (b.unit != null) " ${b.unit}" else ""}"
            }.ifEmpty { "None recorded" }
            """
[CURRENT MEDICAL CONTEXT]
Known Conditions: $conditions
Medications: $meds
Allergies: $allergies
Recent Biomarkers: $biomarkers
"""
        } else ""

        // ── Already-extracted items ──
        val hasImageAnalysis = extractedItems.any { it.type == "medical_image_analysis" }
        val hasBiomarkers = extractedItems.any { it.type == "biomarker" }
        val hasLabSummary = extractedItems.any { it.type == "lab_summary" }
        val extractionComplete = hasImageAnalysis || hasBiomarkers || hasLabSummary

        val itemsBlock = if (extractedItems.isNotEmpty()) {
            "\n[EXTRACTED DATA - ALREADY SAVED]\n" +
                extractedItems.joinToString("\n") { "- ${it.label} (${it.type})" }
        } else ""

        val extractionStatusBlock = if (extractionComplete) {
            """
[EXTRACTION STATUS: COMPLETE]
Data extraction from the document has been completed. The items listed above are already saved.
DO NOT emit any more action tags for data that has already been extracted.
You are now in CONVERSATIONAL MODE - answer the user's questions about the findings without re-extracting.
If the user uploads a NEW document, you may extract data from that new document only.
"""
        } else ""

        // ── Instructions switch on extraction state ──
        val extractionInstructions = if (!extractionComplete) {
            """
[CRITICAL INSTRUCTION FOR IMAGES]
If the input text starts with [VISUAL DESCRIPTION], it means a specialized vision model has already analyzed the image for you. 
- Treat this description as YOUR OWN direct observation.
- Do NOT say "I cannot see the image" or "Based on the description".
- You ARE the radiologist. Interpret the findings provided in the description as authoritative clinical facts.
- Use the 'medical_image_analysis' tool to structure these findings immediately.

[BEHAVIORAL RULES]
- State findings plainly and directly.
- Use "above/below typical range" rather than diagnosing "you have X".
- Stay bounded to the extracted evidence; name uncertainty and missing data explicitly.
- Do not prescribe treatment, recommend dosage changes, or overstate certainty.
- If exercise safety is relevant, use granted / conditional / denied clearance framing and point toward recovery follow-up when appropriate.
- When an item is extracted, use the relevant action to store it.
- For X-rays/Imaging (when seeing [VISUAL DESCRIPTION]):
  - Identify Modality (X-Ray, MRI, CT) and Body Part.
  - List detailed Findings (observations about bone density, fractures, soft tissue, etc.).
  - Provide a clinical Impression (summary of key pathological findings).
  - Flag any abnormalities with severity (mild/moderate/severe).

[AVAILABLE TOOLS]
- commit_biomarker: Save a specific biomarker value.
  <action type="commit_biomarker">{"name":"...","value":...,"unit":"...","source":"..."}</action>
- parse_lab_report: Save a summary of a lab panel.
  <action type="parse_lab_report">{"panel":"...","findings":["..."],"flags":["..."]}</action>
- update_conditions: Update known medical conditions or medications.
  <action type="update_conditions">{"knownConditions":["..."],"medications":["..."],"allergies":["..."]}</action>
- medical_image_analysis: Save structured analysis of an X-ray, MRI, or other medical image.
  <action type="medical_image_analysis">{"reportType":"...","modality":"X-Ray|MRI|CT|Ultrasound","bodyPart":"...","findings":["..."],"impression":"...","clinicalFlags":[{"flag":"...","severity":"mild|moderate|severe"}]}</action>
- diagnosis_summary: Emit ONE structured clinical summary AFTER all other extraction actions.
  <action type="diagnosis_summary">{"reportType":"lab_report|xray|mri|ct|ultrasound|prescription|medical_report|other","summary":"2-4 sentence plain-language clinical summary","comparisons":[{"item":"...","value":"...","referenceRange":"optional","status":"below|within|above|unknown","note":"optional"}],"whatItMeans":["clinical significance point"],"recommendedActions":["actionable follow-up step"],"suggestedMedications":["medication to discuss with provider"],"confidenceLevel":"high|moderate|low","confidenceRationale":"1-2 sentences explaining confidence level"}</action>
  (Emit exactly ONE diagnosis_summary action, as the FINAL action after all data extraction.)
"""
        } else {
            """
[CONVERSATIONAL MODE]
Extraction is complete. Answer questions about the findings conversationally.
Do NOT emit action tags unless the user explicitly uploads a new document.
"""
        }

        return """
[IDENTITY]
You are Soma's clinical analysis engine. Your role is to interpret medical documents with the directness of a senior clinician while remaining tightly bounded to the available evidence.

[CAPABILITIES]
- Extract structured biomarkers (name, value, unit, reference range)
- Identify medical conditions, medications, and allergies
- Summarize lab panels and imaging reports
- Provide clinical context for findings
- Perform detailed radiological analysis on X-rays and medical images.
$extractionInstructions
$contextBlock$itemsBlock$extractionStatusBlock
$MEDICAL_DISCLAIMER
""".trim()
    }

    // ── Allowed Diagnosis Actions ────────────────────────────────────────────

    /** The set of action types that are valid inside Soma diagnosis mode. */
    val DIAGNOSIS_ALLOWED_ACTIONS: List<String> = listOf(
        "commit_biomarker",
        "parse_lab_report",
        "update_conditions",
        "issue_clearance",
        "medical_image_analysis",
        "diagnosis_summary"
    )

    // ── File Analysis Prompt (specialized per-document extraction) ───────────

    /**
     * Result of file/document processing — text content plus metadata.
     */
    data class FileAnalysisResult(
        val text: String,
        val fileType: String
    )

    /**
     * Infer the medical document type from raw text content and file type.
     *
     * Port of TS `inferDiagnosisDocType()`.
     */
    fun inferDiagnosisDocType(rawText: String, fileType: String): String {
        val haystack = rawText.lowercase()
        if (fileType == "image") {
            if (Regex("""\bx[\s-]?ray\b""").containsMatchIn(haystack)) return "xray"
            if (Regex("""\bmri\b""").containsMatchIn(haystack)) return "mri"
            if (Regex("""\bct\b|\bcat scan\b""").containsMatchIn(haystack)) return "ct"
            if (Regex("""\bultrasound\b|\bsonography\b""").containsMatchIn(haystack)) return "ultrasound"
        }
        if (Regex("""\bprescription\b|\brx\b|\bdosage\b|\btablet\b|\bcapsule\b""").containsMatchIn(haystack)) return "prescription"
        if (Regex("""\blab\b|\bcbc\b|\bhemoglobin\b|\bcholesterol\b|\bglucose\b|\bcreatinine\b|\btsh\b""").containsMatchIn(haystack)) return "lab_report"
        if (Regex("""\bx[\s-]?ray\b""").containsMatchIn(haystack)) return "xray"
        if (Regex("""\bmri\b""").containsMatchIn(haystack)) return "mri"
        if (Regex("""\bct\b|\bcat scan\b""").containsMatchIn(haystack)) return "ct"
        if (Regex("""\bultrasound\b|\bsonography\b""").containsMatchIn(haystack)) return "ultrasound"
        return "medical_report"
    }

    /**
     * Build the specialized file analysis prompt for a single uploaded document.
     *
     * For imaging documents (X-ray, MRI, CT, ultrasound) or documents containing
     * a [VISUAL DESCRIPTION] block, produces an imaging-specific extraction prompt.
     * Otherwise delegates to [buildDiagnosisAnalysisPrompt].
     *
     * Port of TS `somaDiagnosisSpec.buildFileAnalysisPrompt()`.
     */
    fun buildFileAnalysisPrompt(result: FileAnalysisResult): String {
        val inferredType = inferDiagnosisDocType(result.text, result.fileType)
        val isImagingType = inferredType in listOf("xray", "mri", "ct", "ultrasound")
        val hasVisualDescription = result.text.contains("[VISUAL DESCRIPTION]")

        if (isImagingType || hasVisualDescription) {
            return listOf(
                "You are Soma clinical imaging extraction engine.",
                "Detected medical document type: $inferredType.",
                "The input may include a [VISUAL DESCRIPTION] block generated by vision OCR.",
                "Treat that visual description as authoritative imaging evidence.",
                "Emit exactly two action tags and no prose:",
                """1. <action type="medical_image_analysis">{"reportType":"...","modality":"X-Ray|MRI|CT|Ultrasound","bodyPart":"...","findings":["..."],"impression":"...","clinicalFlags":[{"flag":"...","severity":"mild|moderate|severe"}]}</action>""",
                """2. <action type="diagnosis_summary">{"reportType":"xray|mri|ct|ultrasound","summary":"2-4 sentence plain-language summary","comparisons":[],"whatItMeans":["..."],"recommendedActions":["..."],"suggestedMedications":[],"confidenceLevel":"high|moderate|low","confidenceRationale":"..."}</action>""",
                "If data is uncertain, still emit both action tags and mark uncertain phrases in findings.",
                "",
                "---BEGIN DOCUMENT---",
                result.text,
                "---END DOCUMENT---"
            ).joinToString("\n")
        }

        val contextHint = "Detected medical document type: $inferredType"
        return buildDiagnosisAnalysisPrompt(result.text, contextHint)
    }

    /**
     * Build the LLM prompt for structured extraction from a medical/lab document.
     *
     * Instructs the LLM to use tool calls (action tags) to persist extracted data,
     * then emit a single `diagnosis_summary` action as the final step.
     */
    fun buildDiagnosisAnalysisPrompt(
        rawText: String,
        contextHint: String? = null
    ): String {
        val truncated = if (rawText.length > MAX_RAW_TEXT_CHARS) {
            rawText.take(MAX_RAW_TEXT_CHARS) + "\n[... document truncated for analysis ...]"
        } else rawText

        val contextLine = if (!contextHint.isNullOrBlank()) {
            "Document context hint from user: \"$contextHint\"\n"
        } else ""

        return """You are a medical document analysis engine. Your task is to analyze the provided document text and extract structured data using the available tools.

$contextLine
INPUT TEXT:
${"\"\"\""}
$truncated
${"\"\"\""}

INSTRUCTIONS:
1. If the text contains lab results, use 'parse_lab_report' or 'commit_biomarker'.
2. If the text contains a visual description of an image (e.g. [VISUAL DESCRIPTION] for X-ray, MRI), use 'medical_image_analysis'.
3. If the text describes medical conditions or medications, use 'update_conditions'.
4. After ALL extraction actions, emit exactly ONE 'diagnosis_summary' action as the final action:
   {"reportType":"lab_report|xray|mri|ct|ultrasound|prescription|medical_report|other","summary":"2-4 sentence plain-language clinical summary of key findings","comparisons":[{"item":"field name","value":"value","referenceRange":"optional","status":"below|within|above|unknown","note":"optional"}],"whatItMeans":["3-5 clinical significance bullets"],"recommendedActions":["3-5 actionable follow-up steps"],"suggestedMedications":["medications to discuss with provider, may be empty array"],"confidenceLevel":"high|moderate|low","confidenceRationale":"1-2 sentences explaining confidence"}
   - comparisons: only items with extracted values, max 10 items
   - Do NOT diagnose diseases; use "above/below typical range" language
   - Keep medication mentions as "discuss with prescriber"
   - If exertion guidance is needed, use granted / conditional / denied clearance framing and point toward recovery follow-up when risk is elevated

Do NOT just output JSON text. You MUST use the provided tools/functions to save the data.
"""
    }

    /**
     * Build the second-pass diagnosis summary prompt.
     * Expects strict JSON output matching the diagnosis summary schema.
     */
    fun buildDiagnosisSummaryPrompt(
        rawText: String,
        documentType: String,
        detectedPanels: List<String>,
        extractedFields: List<ExtractedField>
    ): String {
        val panelLines = if (detectedPanels.isNotEmpty()) {
            detectedPanels.joinToString("\n") { "- $it" }
        } else "- none"

        val extractedLines = if (extractedFields.isNotEmpty()) {
            extractedFields.take(120).joinToString("\n") { f ->
                val unit = if (f.unit != null) " ${f.unit}" else ""
                val range = if (f.referenceRange != null) " (ref: ${f.referenceRange})" else ""
                val category = if (f.category != null) " [${f.category}]" else ""
                "- ${f.fieldName}: ${f.value}$unit$range$category"
            }
        } else "- none"

        val rawPreview = if (rawText.length > 20_000) {
            rawText.take(20_000) + "\n[...TRUNCATED...]"
        } else rawText

        return """You are Soma's clinical summarizer.

Generate a concise medical summary from extracted findings.
Return ONLY valid JSON with this shape:
{
  "reportType": "lab_report|medical_report|xray|mri|ct|ultrasound|prescription|other",
  "summary": "2-6 sentence plain-language clinical summary",
  "comparisons": [
    { "item": "field name", "value": "value", "referenceRange": "optional", "status": "high|low|normal|unknown", "note": "optional" }
  ],
  "whatItMeans": ["clinical interpretation point"],
  "recommendedActions": ["actionable non-diagnostic follow-up"],
  "suggestedMedications": ["optional medication discussion item"],
  "confidenceLevel": "high|moderate|low",
  "confidenceRationale": "one short rationale"
}

Rules:
- Do not diagnose diseases.
- Be explicit about uncertainty.
- Keep medication mentions as "discuss with prescriber".
- When discussing exertion or next steps, use conservative clearance framing and mention recovery / follow-up review where appropriate.
- Do not include markdown fences.

Document type: $documentType

Detected panels:
$panelLines

Extracted fields:
$extractedLines

Raw text preview:
---BEGIN DOCUMENT---
$rawPreview
---END DOCUMENT---"""
    }

    data class ExtractedField(
        val fieldName: String,
        val value: String,
        val unit: String? = null,
        val referenceRange: String? = null,
        val category: String? = null
    )

    // =========================================================================
    // Legacy shims (retained for backward compat with PersonaFactory)
    // =========================================================================

    fun system(moduleId: String, userId: String, isGuestMode: Boolean): String {
        return base.systemPrompt
    }

    fun context(ctx: Map<String, Any>): String {
        val profile = ctx["medical_profile"] as? Map<*, *> ?: return ""
        val conditions = (profile["knownConditions"] as? List<*>)?.joinToString(", ")
            ?: (profile["conditions"] as? List<*>)?.joinToString(", ")
            ?: "None"
        val readiness = profile["readinessScore"] ?: profile["readiness"] ?: "--"
        val biomarkers = (profile["biomarkers"] as? List<*>)?.joinToString("\n")
            ?: (profile["recent_biomarkers"] as? List<*>)?.joinToString("\n")
            ?: "None"

        return """
            [CURRENT BIOLOGICAL STATE]
            - Known Conditions: $conditions
            - Readiness Score: $readiness/100
            - Recent Biomarkers: $biomarkers
        """.trimIndent()
    }
}
