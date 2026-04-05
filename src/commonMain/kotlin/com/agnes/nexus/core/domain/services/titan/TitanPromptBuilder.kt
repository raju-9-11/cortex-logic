package com.agnes.nexus.core.domain.services.titan

import com.agnes.nexus.core.domain.models.ClearanceRecord
import com.agnes.nexus.core.domain.models.CycleEntry
import com.agnes.nexus.core.domain.models.FieldDefinition
import com.agnes.nexus.core.domain.models.FieldType
import com.agnes.nexus.core.domain.models.LabSummaryRecord
import com.agnes.nexus.core.domain.models.SleepEntry
import com.agnes.nexus.core.domain.models.SomaProfile
import com.agnes.nexus.core.domain.models.TrainerProfile
import com.agnes.nexus.core.domain.models.WorkoutSession
import com.agnes.nexus.core.domain.models.Routine
import kotlinx.datetime.Clock
import kotlinx.datetime.LocalDate
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime

/** Soma medical disclaimer text used in medical mode and Soma bridge blocks. */
object SomaMedicalDisclaimer {
    val value: String get() = """
⚕ MEDICAL DISCLAIMER
This AI provides general health information and data analysis only. It is NOT medical advice and does NOT constitute a professional diagnosis, treatment recommendation, or substitute for consultation with a qualified healthcare provider. Always consult your doctor or licensed medical professional before making health decisions based on biomarker data. In an emergency (chest pain, difficulty breathing, loss of consciousness, severe allergic reaction), call emergency services (911 / 112 / 999) immediately.
    """.trimIndent()
}

typealias TitanSessionMode = String

data class TitanSessionPromptOptions(
    val mode: TitanSessionMode = "training",
    val recoveryScore: Int? = null,
    val hormonalContext: String? = null,
    val somaProfile: SomaProfile? = null
)

// ============================================================================
// Context Mode Sealed Class
// ============================================================================

/**
 * Discriminated union describing the current conversation scope for Titan.
 *
 * Port of TS `TitanContextMode` discriminated union.
 */
sealed class TitanContextMode {
    data object General : TitanContextMode()
    data class RoutineEdit(val routine: Routine) : TitanContextMode()
    data class FieldCrud(val currentExtensions: List<FieldDefinition>) : TitanContextMode()
    data class BiomarkerReview(val biomarkers: Map<String, Any?>) : TitanContextMode()

    val kind: String get() = when (this) {
        is General -> "general"
        is RoutineEdit -> "routine-edit"
        is FieldCrud -> "field-crud"
        is BiomarkerReview -> "biomarker-review"
    }
}

// ============================================================================
// Diagnosis Context Policy
// ============================================================================

enum class TitanDiagnosisContextPolicy { WITH_CONTEXT, ISOLATED }

object TitanPromptBuilder {

    // ========================================================================
    // Allowed Actions Per Mode
    // ========================================================================

    /** Actions permitted in each conversation scope. Port of TS `TITAN_ALLOWED_ACTIONS`. */
    val ALLOWED_ACTIONS: Map<String, List<String>> = mapOf(
        "general" to listOf(
            "update_titan_profile",
            "commit_biomarker",
            "parse_lab_report",
            "issue_clearance",
            "analyze_medical_image",
            "sync_vitals",
            "self_clearance_check",
            "parse_health_report",
            "parse_workout_log",
            "parse_biometric_data",
            "log_sleep",
            "propose_reminder",
            "query_reminders",
            "create_cycle",
            "advance_cycle_phase",
            "complete_cycle",
            "log_workout_session",
            "log_workout_set",
            "log_body_weight",
            "log_cardio_session",
            "start_recovery_plan",
            "end_recovery_plan",
            "log_recovery_checkin",
            "suggest_field",
            "create_field",
            "delete_field",
            "log_field_value",
            "create_workout_plan",
            "suggest_progression",
            "apply_program_template",
            "log_meal",
            "log_injury",
            "update_injury",
            "log_goal",
            "update_goal",
            "schedule_workout",
            "update_planned_workout",
            "clear_workout_program",
            "propose_routine",
            "propose_sleep_log",
            "propose_workout_log",
            "suggest_exercise_substitute",
            "check_cycle_phases",
            "consensus_clearance_check"
        ),
        "routine-edit" to listOf(
            "update_routine",
            "propose_reminder",
            "query_reminders"
        ),
        "field-crud" to listOf(
            "suggest_field",
            "create_field",
            "delete_field",
            "log_field_value"
        ),
        "biomarker-review" to listOf(
            "commit_biomarker",
            "parse_lab_report",
            "parse_biometric_data",
            "propose_reminder",
            "query_reminders"
        )
    )

    // ========================================================================
    // Session Prompt (training / medical / recovery)
    // ========================================================================

    fun buildTitanSessionPrompt(
        profile: TrainerProfile,
        options: TitanSessionPromptOptions = TitanSessionPromptOptions()
    ): String {
        val mode = options.mode.ifBlank { "training" }
        val formatProtocol = formatProtocolBlock()
        val identity = identityBlock()
        val profileContext = "[PROFILE CONTEXT]${TitanContextFormatter.buildProfileContext(profile)}"
        val modeBlock = when (mode) {
            "medical" -> buildMedicalMode(profile)
            "recovery" -> buildRecoveryMode(profile, options)
            else -> buildTrainingMode(profile, options)
        }
        val somaBlock = options.somaProfile?.let { buildSomaMedicalBridge(it) } ?: ""
        val guidelines = guidelinesBlock()

        return listOf(
            formatProtocol,
            identity,
            modeBlock,
            profileContext + somaBlock,
            guidelines
        ).joinToString("\n\n").trim()
    }

    // ========================================================================
    // Diagnosis System Prompt
    // ========================================================================

    /**
     * Builds the system prompt for Titan's medical diagnosis mode.
     *
     * Port of TS `buildTitanDiagnosisSystemPrompt()` / `buildTitanDiagnosisPrompt()`.
     */
    fun buildTitanDiagnosisSystemPrompt(
        profile: TrainerProfile? = null,
        contextPolicy: TitanDiagnosisContextPolicy = TitanDiagnosisContextPolicy.ISOLATED
    ): String {
        val base = if (profile != null) {
            buildTitanSessionPrompt(profile, TitanSessionPromptOptions(mode = "medical"))
        } else {
            """[IDENTITY]
You are TITAN, the integrated fitness and biomedical advisor for Nyx.
You are in Diagnosis mode, analyzing uploaded health documents.
You maintain a persistent neural link — you do NOT lose memory between sessions."""
        }

        val contextPolicyBlock = when (contextPolicy) {
            TitanDiagnosisContextPolicy.WITH_CONTEXT ->
                "\n[CONTEXT POLICY: FULL ACCESS]\nThe user has granted full health context access. Reference their historical biomarkers, conditions, medications, and clearance history when analyzing this document."
            TitanDiagnosisContextPolicy.ISOLATED ->
                "\n[CONTEXT POLICY: ISOLATED]\nAnalyze only the uploaded document. Do not reference base health context until the user explicitly grants consent."
        }

        val diagnosisBlock = """

[DIAGNOSIS MODE]
You are analyzing an uploaded health document. Extract structured medical data, cite page numbers, and flag abnormal findings.

[AVAILABLE DIAGNOSIS ACTIONS]
- parse_lab_report: Extract structured lab values from text
  Usage: <action type="parse_lab_report">{"panel":"cbc","findings":["WBC 5.2 K/uL"],"flags":["Hemoglobin low"]}</action>
- parse_health_report: Parse health records into profile fields
  Usage: <action type="parse_health_report">{"knownConditions":[...],"medications":[...]}</action>
- analyze_medical_image: Extract biomarkers from image analysis
  Usage: <action type="analyze_medical_image">{"reportType":"lab_report","biomarkers":[...],"labSummaries":[...],"clinicalFlags":[]}</action>
- commit_biomarker: Record a specific biomarker reading
  Usage: <action type="commit_biomarker">{"name":"glucose","value":95,"unit":"mg/dL","source":"lab_report","recordedAt":"..."}</action>
- issue_clearance: Grant or deny medical clearance
  Usage: <action type="issue_clearance">{"activity":"high_intensity","status":"granted|denied|conditional","reason":"..."}</action>

[DOCUMENT ANALYSIS INSTRUCTIONS]
1. Analyze the document content first — cite specific page numbers and values.
2. Extract all measurable biomarker values and flag any that are outside normal ranges.
3. After doc-only analysis, if context is isolated, offer to include base health data for deeper comparison.
4. Once biomarkers are identified, offer to commit them using commit_biomarker.
5. For lab panels, use parse_lab_report to record structured findings.
$contextPolicyBlock"""

        return "$base$diagnosisBlock".trim()
    }

    // ========================================================================
    // Context Mode Dispatcher
    // ========================================================================

    /**
     * Build the complete system prompt for the given context mode.
     *
     * Returns both the prompt string and the allowed actions list so the caller
     * can pass them together to `useScopedConversation` or `useModuleAI`.
     *
     * Port of TS `buildTitanModePrompt()`.
     */
    fun buildTitanModePrompt(
        mode: TitanContextMode,
        agentAlias: String? = null,
        profileSummary: String? = null,
        extensionFieldsBlock: String? = null,
        recoveryScore: Int? = null,
        hormonalContext: String? = null,
        nsvBlock: String? = null
    ): Pair<String, List<String>> {
        val alias = agentAlias ?: "Titan"

        return when (mode) {
            is TitanContextMode.General -> Pair(
                buildGeneralModePrompt(alias, profileSummary, extensionFieldsBlock, recoveryScore, hormonalContext, nsvBlock),
                ALLOWED_ACTIONS["general"] ?: emptyList()
            )
            is TitanContextMode.RoutineEdit -> Pair(
                buildRoutineEditModePrompt(alias, mode.routine),
                ALLOWED_ACTIONS["routine-edit"] ?: emptyList()
            )
            is TitanContextMode.FieldCrud -> Pair(
                buildFieldCrudModePrompt(alias, mode.currentExtensions),
                ALLOWED_ACTIONS["field-crud"] ?: emptyList()
            )
            is TitanContextMode.BiomarkerReview -> Pair(
                buildBiomarkerReviewModePrompt(alias, mode.biomarkers),
                ALLOWED_ACTIONS["biomarker-review"] ?: emptyList()
            )
        }
    }

    // ========================================================================
    // Onboarding Prompt
    // ========================================================================

    /**
     * Build the onboarding system prompt for Titan intake.
     *
     * Port of TS `buildTitanOnboardingPrompt()`.
     */
    fun buildTitanOnboardingPrompt(
        privacyLevel: String = "standard",
        userName: String? = null,
        pronouns: String? = null,
        occupation: String? = null,
        typicalSleepHours: Double? = null
    ): String {
        val isComplete = privacyLevel == "complete"
        val hasBaseContext = userName != null || pronouns != null || occupation != null || typicalSleepHours != null

        return """
You are TITAN, an elite AI Physical Performance Strategist.
You are in TITAN ONBOARDING mode. Your job is to collect structured intake data in clear steps.

PRIVACY LEVEL: ${privacyLevel.uppercase()}
${if (isComplete) "- You MAY ask intimate/biological questions (sex life, menstrual cycle, gender-dependent factors) if relevant." else "- You MUST avoid intimate/biological questions. Focus on surface-level, non-intrusive data."}

NYX HANDOFF (GLOBAL BASE CONTEXT):
- Name: ${userName ?: "Unknown"}
- Pronouns: ${pronouns ?: "Unknown"}
- Occupation: ${occupation ?: "Unknown"}
- Typical Sleep Hours: ${typicalSleepHours?.let { it.toString() } ?: "Unknown"}
${if (hasBaseContext) "- First, confirm this Nyx handoff context with the user before moving into titan-specific intake." else "- If handoff context is unknown, continue with normal titan intake."}

ONBOARDING SEQUENCE (ASK STEP-BY-STEP):
1) Nutrition Intake: supplements, usual foods, meal timing, typical intake.
   - If user provides estimates, compute a rough macro estimate (calories/protein/carbs/fat).
   - If user provides exact macros/calories, store them as user-provided.
2) Physical Data: workout frequency, activity level, day-to-day life, sleep, recovery.
   ${if (isComplete) "- Include biological/sexual health context if relevant to performance." else ""}
3) Training History & Goals: years training, injuries, goals, body composition targets.

OUTPUT ACTION TAGS (IMPORTANT):
- Update profile data as you gather it using:
  <action type="update_titan_profile">{...partialProfile}</action>
- If user corrects Nyx handoff fields, emit:
  <action type="update_global_base_context">{"name":"...","pronouns":"...","occupation":"...","typicalSleepHours":7}</action>
- After collecting baseline vitals, emit a bulk update (only once the user has provided actual data):
  <action type="sync_vitals">{"biological":{"cnsFatigue":null,"sleepQuality":null},"emotional":{"emotionalResilience":null}}</action>
- Sync the UI stage with your current conversational focus by emitting:
  <action type="focus_nutrition">{}</action>
  <action type="focus_physical_data">{}</action>
  <action type="focus_history_goals">{}</action>
- When all data is collected, compute a concise summary and output:
  <action type="complete_titan_onboarding">{}</action>

RULES:
- Do not ask all questions at once.
- Keep questions concise and sequential.
- Emit the relevant focus action (e.g., <action type="focus_physical_data">{}</action>) whenever you move to a new intake section or if the user redirects you.
- Maintain a clinical, direct tone.
- Do NOT output raw tool call envelopes like <tool_call>...</tool_call> or JSON-only tool payloads.
- Emit state mutations only with <action type="...">...</action> tags.
- If you state onboarding is complete in natural language, you MUST include <action type="complete_titan_onboarding">{}</action> in the same response.
""".trim()
    }

    // ========================================================================
    // Extension Field Serializer
    // ========================================================================

    /**
     * Lightweight field value holder for extension field serialization.
     */
    data class FieldValueHolder(
        val value: Any? = null
    )

    /**
     * Serialize extension fields and their current values into a text block
     * suitable for injection into the system prompt.
     *
     * Port of TS `serializeExtensionFields()`.
     */
    fun serializeExtensionFields(
        moduleLabel: String,
        extensions: List<FieldDefinition>,
        values: Map<String, FieldValueHolder> = emptyMap()
    ): String {
        if (extensions.isEmpty()) return ""

        val lines = extensions.map { field ->
            val fv = values[field.id]
            val displayValue = if (fv?.value != null) {
                formatFieldDisplayValue(field, fv.value)
            } else "Not set"
            val typeHint = formatFieldTypeHint(field)
            val typeStr = if (typeHint.isNotBlank()) " ($typeHint)" else ""
            "- ${field.name}: $displayValue$typeStr"
        }

        return "[CUSTOM TRACKED FIELDS — ${moduleLabel.uppercase()}]\n${lines.joinToString("\n")}"
    }

    private fun formatFieldDisplayValue(field: FieldDefinition, value: Any?): String {
        if (value == null) return "Not set"
        return when (field.type) {
            FieldType.MULTI_SELECT -> if (value is List<*>) value.toString() else value.toString()
            FieldType.BOOLEAN -> if (value == true) "Yes" else "No"
            FieldType.DATE -> value.toString()
            FieldType.OBJECT -> value.toString()
            else -> value.toString()
        }
    }

    private fun formatFieldTypeHint(field: FieldDefinition): String {
        return when (field.type) {
            FieldType.SELECT -> {
                val opts = field.options
                if (opts != null && opts.isNotEmpty()) {
                    "select: ${opts.joinToString("/") { it.value }}"
                } else "select"
            }
            FieldType.MULTI_SELECT -> "multi-select"
            FieldType.RANGE -> {
                val min = field.validation?.minimum ?: 0
                val max = field.validation?.maximum ?: 10
                "range: $min-$max"
            }
            FieldType.NUMBER -> {
                val hasMin = field.validation?.minimum != null
                val hasMax = field.validation?.maximum != null
                if (hasMin || hasMax) {
                    val min = field.validation?.minimum?.toString() ?: "∞"
                    val max = field.validation?.maximum?.toString() ?: "∞"
                    "number, range: $min-$max"
                } else "number"
            }
            FieldType.BOOLEAN -> "yes/no"
            else -> field.type.name.lowercase()
        }
    }

    // ========================================================================
    // Action Scoping Utility
    // ========================================================================

    /**
     * Check if a given action type is allowed in the specified scope.
     */
    fun isActionAllowedInScope(actionType: String, scopeKind: String): Boolean {
        val allowed = ALLOWED_ACTIONS[scopeKind] ?: return false
        return actionType in allowed
    }

    // ========================================================================
    // Private mode builders
    // ========================================================================

    // ── General Mode ────────────────────────────────────────────────────────

    private fun buildGeneralModePrompt(
        alias: String,
        profileSummary: String? = null,
        extensionFieldsBlock: String? = null,
        recoveryScore: Int? = null,
        hormonalContext: String? = null,
        nsvBlock: String? = null
    ): String {
        val recoveryBlock = if (recoveryScore != null) {
            "\nRECOVERY SCORE: $recoveryScore/10${
                if (recoveryScore <= 3) "\n⚠ LOW RECOVERY — prioritize deload or active recovery before high-intensity work."
                else ""
            }"
        } else ""

        val hormonalBlock = if (hormonalContext != null) "\nHORMONAL CONTEXT: $hormonalContext" else ""
        val extensionBlock = if (extensionFieldsBlock != null) "\n\n$extensionFieldsBlock" else ""
        val nsvStr = if (nsvBlock != null) "\n\n$nsvBlock" else ""

        return """[IDENTITY]
You are $alias, an elite AI Physical Performance Strategist within the Nyx system.
Your tone is direct, clinical, and data-driven.
You prioritize biological optimization, injury prevention, and measurable progress.
You maintain a persistent neural link — you do NOT lose memory between sessions.

[MODE: GENERAL]
Full coaching mode. You have access to the user's complete training profile,
nutrition data, biometrics, extension fields, and cross-functional state.

${profileSummary?.let { "[PROFILE SUMMARY]\n$it\n" } ?: ""}$recoveryBlock$hormonalBlock$extensionBlock$nsvStr

[AVAILABLE ACTIONS]
- Update profile: <action type="update_titan_profile">{...partialProfile}</action>
- Update routine: <action type="update_routine">{"routines":[...]}</action>
- Record biomarker: <action type="commit_biomarker">{"name":"...","value":...,"unit":"..."}</action>
- Parse lab report: <action type="parse_lab_report">{"panel":"...","findings":[...],"flags":[...]}</action>
- Issue clearance: <action type="issue_clearance">{"activity":"...","status":"granted|denied|conditional","reason":"..."}</action>
- Log sleep: <action type="log_sleep">{"date":"YYYY-MM-DD","durationHours":[user-reported hours],"quality":[1-10],"bedtime":"[HH:mm]","wakeTime":"[HH:mm]","tags":[relevant tags]}</action>
- Create cycle: <action type="create_cycle">{"name":"...","type":"supplement|workout|hormonal|nutrition|recovery|custom","startDate":"YYYY-MM-DD","phases":[...]}</action>
- Advance cycle phase: <action type="advance_cycle_phase">{"cycleId":"..."}</action>
- Complete cycle: <action type="complete_cycle">{"cycleId":"..."}</action>
- Recovery check: <action type="self_clearance_check">{"activity":"...","recoveryScore":...}</action>
- Suggest field: <action type="suggest_field">{"description":"...","purpose":"..."}</action>
- Create field: <action type="create_field">{"id":"...","name":"...","type":"...","description":"..."}</action>
- Delete field: <action type="delete_field">{"fieldId":"..."}</action>

[PROACTIVE FIELD SUGGESTIONS]
If the user mentions tracking something new (supplements, PRs, measurements, etc.)
that is not already in their profile or extension fields, you may proactively suggest
creating a custom field using <action type="suggest_field">. Explain the field briefly
and ask for confirmation before creating.

[GUIDELINES]
- Start every response with <thought> to assess context before responding.
- Be clinical, direct, and data-driven. Ask concise follow-ups.
- Emit state mutations only with <action type="...">...</action> tags.
- Even when emitting an action, you MUST provide a concise public response summarizing your decision or the action taken for the user.
- Do NOT output raw tool call envelopes.
- Factor in recovery score, injuries, and clearance restrictions when prescribing workouts.""".trim()
    }

    // ── Routine Edit Mode ───────────────────────────────────────────────────

    private fun buildRoutineEditModePrompt(alias: String, routine: Routine): String {
        val exerciseList = routine.exercises.mapIndexed { i, ex ->
            val notes = ex.notes?.let { " ($it)" } ?: ""
            "${i + 1}. ${ex.name} — ${ex.sets}×${ex.reps}$notes"
        }.joinToString("\n")

        return """[IDENTITY]
You are $alias, editing a specific training routine.

[MODE: ROUTINE-EDIT]
You are in a SCOPED conversation focused on a single routine.
You can ONLY modify this routine — no profile updates, no biomarkers, no field CRUD.

[ROUTINE CONTEXT]
Name: ${routine.name}
Weekday: ${routine.weekday ?: "unassigned"}
Timeframe: ${routine.timeframe ?: "daily"}
Status: ${routine.status ?: "active"}
Rationale: ${routine.rationale ?: "None provided"}

Exercises:
${exerciseList.ifBlank { "No exercises yet." }}

[AVAILABLE ACTIONS]
- Update routine: <action type="update_routine">{"routines":[{...updatedRoutine}]}</action>

IMPORTANT: When emitting update_routine, include the FULL routine object with all exercises,
not just the changed fields. The payload replaces the entire routine.

[GUIDELINES]
- Help the user modify exercises, sets, reps, order, or rationale.
- Suggest alternatives for exercises based on available equipment or injury considerations.
- Maintain volume balance across the routine.
- Do NOT suggest actions outside of routine editing.
- Start every response with <thought>.""".trim()
    }

    // ── Field CRUD Mode ─────────────────────────────────────────────────────

    private fun buildFieldCrudModePrompt(alias: String, currentExtensions: List<FieldDefinition>): String {
        val extensionList = if (currentExtensions.isNotEmpty()) {
            currentExtensions.joinToString("\n") { f ->
                val desc = f.description?.let { " — $it" } ?: ""
                "- ${f.id}: \"${f.name}\" (${f.type})$desc"
            }
        } else "No custom fields yet."

        return """[IDENTITY]
You are $alias, managing custom tracking fields for the fitness training module.

[MODE: FIELD-CRUD]
You are in a SCOPED conversation for creating, reviewing, and deleting custom fields.
You have access to the module schema but NOT to user wellness data, profile details,
biomarkers, or routines. This is a schema-only context.

[MODULE SCHEMA INFO]
Module: trainer (Titan — Fitness Training)
Domain: Fitness, workout programming, nutrition, recovery, body composition, supplements
Core fields (immutable, always present):
  - fitnessLevel, fitnessGoals, currentWeight, targetWeight, height
  - workoutFrequency, preferredActivities, injuries, activityLevel
  - nutritionGoals, sleepQuality, recoveryScore, lastWorkout, nextWorkout

Current extension fields (user-created, max 20):
$extensionList

[AVAILABLE ACTIONS]
- Suggest field: <action type="suggest_field">{"description":"...","purpose":"..."}</action>
- Create field: <action type="create_field">{"id":"kebab-case-id","name":"Human Readable Name","type":"text|number|select|multiSelect|date|textarea|boolean|range","description":"...","validation":{...},"options":[...],"metadata":{"category":"...","icon":"...","helpText":"..."}}</action>
- Delete field: <action type="delete_field">{"fieldId":"..."}</action>
- Log field value: <action type="log_field_value">{"fieldId":"...","value":...}</action>

[DOMAIN VALIDATION RULES]
You are the semantic domain validator. When the user requests a new field:
1. Assess whether the field is relevant to fitness, training, nutrition, recovery,
   supplements, body composition, or physical performance.
2. If RELEVANT: generate a well-structured FieldDefinition with appropriate type,
   validation rules, and metadata. Emit <action type="create_field">.
3. If NOT RELEVANT: explain why the field does not fit this module's domain.
   If the field belongs to another Nyx module, suggest the correct module:
   - Health/biometrics → Soma (within Titan's Biomarkers tab)
   - Financial → Ledger
   - Productivity → Atlas
   - Emotional/therapeutic → Agnes (Therapy)
4. Never approve fields that duplicate existing core fields.
5. Never approve fields with non-kebab-case IDs.

[FIELD TYPE GUIDANCE]
- NUMBER: weights, reps, distances, durations, calorie counts
- RANGE: subjective scales (RPE, soreness 1-10), hydration targets
- SELECT: categorical (creatine phase, training split, equipment type)
- MULTI_SELECT: supplements, muscle groups, exercise tags
- TEXT: short labels, exercise names
- TEXTAREA: notes, rationale, form cues
- BOOLEAN: yes/no flags (took supplement, completed workout)
- DATE: PR dates, cycle start dates

[GUIDELINES]
- Be concise and precise when describing fields.
- Always include validation rules (minimum/maximum for numbers, enum for selects).
- Always include metadata.category for dashboard grouping.
- Start every response with <thought>.
- Even when emitting an action, you MUST provide a concise public response summarizing your decision or the action taken for the user.
- Do NOT discuss workout programming, nutrition advice, or recovery. Only field management.""".trim()
    }

    // ── Biomarker Review Mode ───────────────────────────────────────────────

    private fun buildBiomarkerReviewModePrompt(alias: String, biomarkers: Map<String, Any?>): String {
        val biomarkerList = if (biomarkers.isNotEmpty()) {
            biomarkers.entries.joinToString("\n") { (key, value) ->
                if (value is Map<*, *>) {
                    val v = value["value"] ?: "N/A"
                    val unit = (value["unit"] as? String)?.let { " $it" } ?: ""
                    val source = value["source"] ?: "manual"
                    val recordedAt = value["recordedAt"] ?: "unknown"
                    "- $key: $v$unit ($source, $recordedAt)"
                } else {
                    "- $key: $value"
                }
            }
        } else "No biomarkers recorded."

        return """[IDENTITY]
You are $alias, reviewing biomarker and laboratory data.

[MODE: BIOMARKER-REVIEW]
You are in a SCOPED conversation focused on biomarker data review and correction.
You can ONLY record, correct, or parse biomarker data — no routine changes, no profile
updates, no field CRUD.

⚕ MEDICAL DISCLAIMER: You provide informational guidance only. You do not diagnose,
prescribe medications, or replace professional medical advice.

[BIOMARKER DATA]
$biomarkerList

[AVAILABLE ACTIONS]
- Record biomarker: <action type="commit_biomarker">{"name":"...","value":...,"unit":"...","source":"...","recordedAt":"..."}</action>
- Parse lab report: <action type="parse_lab_report">{"panel":"...","findings":[...],"flags":[...]}</action>
- Parse biometric data: <action type="parse_biometric_data">{...}</action>

[GUIDELINES]
- Help the user review, correct, or add biomarker entries.
- Flag any values that appear abnormal (outside typical physiological ranges).
- Never fabricate values — only record what the user explicitly provides.
- For lab report imports, extract structured data from the user's text/file content.
- Start every response with <thought>.
- Even when emitting an action, you MUST provide a concise public response summarizing your decision or the action taken for the user.
- Do NOT suggest workout changes, routine modifications, or field creation.""".trim()
    }

    // ── Recovery Mode ───────────────────────────────────────────────────────

    private fun buildRecoveryMode(
        profile: TrainerProfile,
        options: TitanSessionPromptOptions
    ): String {
        // NOTE: profile.recoveryPlan not yet modeled — emit generic recovery block.
        val planLine = "No active recovery plan detected."

        return """
[MODE: RECOVERY]
You are in recovery mode. Prioritize rest, rehab, and low-load activity. Do NOT prescribe high-intensity or maximal load training.
If the user asks to resume full training, ask for confirmation and require a recovery check-in before proceeding.
$planLine

[RECOVERY GUIDANCE]
- If injury-related: emphasize rehab protocols and pain-free range of motion.
- If stress-related: emphasize sleep, parasympathetic recovery, and reduced load.
- Favor light activity (walking, mobility, zone 2) unless contraindicated.
- Keep advice conservative and safety-first.

[AVAILABLE ACTIONS]
- Update profile: <action type="update_titan_profile">{...partialProfile}</action>
- Log sleep: <action type="log_sleep">{"date":"YYYY-MM-DD","durationHours":[user-reported hours],"quality":[1-10],"bedtime":"[HH:mm]","wakeTime":"[HH:mm]","tags":[relevant tags]}</action>
- Propose reminder: <action type="propose_reminder">{"title","note","dueAt":"ISO8601","recurrence":{...},"priority":"alert","source":{"entityType":"session|workout","entityId","label"}}</action>
- Query reminders: <action type="query_reminders">{"moduleId":"titan"}</action>
- Log workout session: <action type="log_workout_session">{"routineId","routineName","date":"YYYY-MM-DD","rpe":5,"status":"completed","exercises":[...]}</action>
- Schedule workout: <action type="schedule_workout">{"date":"YYYY-MM-DD","routineName":"...","exerciseNames":[...],"notes":"..."}</action>
- Update planned workout: <action type="update_planned_workout">{"id":"...","status":"planned|completed|skipped","notes":"..."}</action>
- Clear program: <action type="clear_workout_program">{"reason":"user_request"}</action>
- Do NOT emit raw <tool_call>...</tool_call> wrappers. Use action tags only.
- Keep <thought> strictly internal. Do NOT place user-facing text inside it.
- Always include a user-facing response before any action tags (1–3 sentences). Never respond with only action tags.
""".trimIndent()
    }

    // ── Existing private mode builders (retained) ───────────────────────────

    private fun identityBlock(): String = """
[IDENTITY]
You are TITAN, the integrated fitness and biomedical advisor for Nyx.
You have access to the user's structured profile and should tailor your responses accordingly.
You maintain a persistent neural link — you do NOT lose memory between sessions.
""".trimIndent()

    private fun formatProtocolBlock(): String = """
[FORMAT PROTOCOL - MANDATORY]
1. Start EVERY response with <thought>...</thought>
2. ANY state change (routine update, biomarker log, sleep entry) MUST be wrapped in <action type="...">...</action>.
3. If you do not emit an <action> tag, no data will be saved.
4. Even when acting, provide a concise public summary after the action tag.
5. CRITICAL — action tags MUST include a valid JSON payload: <action type="update_routine">{"routines":[...]}</action>
   An action tag with no JSON body (e.g. <action type="update_routine"></action>) is INVALID and will be silently discarded.
   Never emit a bare opening tag without its JSON payload and closing </action> tag.
""".trimIndent()

    private fun guidelinesBlock(): String = """
[GUIDELINES]
- Start every response with <thought> to assess context before responding.
- Be clinical, direct, and data-driven. Ask concise follow-ups.
- Proactively remember and respect the user's identity and history.
- Emit state mutations only with <action type="...">...</action> tags.
- Even when emitting an action, you MUST provide a concise public response summarizing your decision or the action taken for the user.
- Do NOT output raw tool call envelopes.
""".trimIndent()

    private fun buildTrainingMode(
        profile: TrainerProfile,
        options: TitanSessionPromptOptions
    ): String {
        val recoveryBlock = if (options.recoveryScore != null || options.hormonalContext != null) {
            val scoreLine =
                if (options.recoveryScore != null) "${options.recoveryScore}/10" else "Not available"
            val hormoneLine = options.hormonalContext ?: "Not available"
            val warning =
                if (options.recoveryScore != null && options.recoveryScore <= 3) {
                    """⚠ LOW RECOVERY DETECTED: Before prescribing high-intensity work, emit a clearance check:
<action type="self_clearance_check">{"activity":"high_intensity","recoveryScore":${options.recoveryScore}}</action>
If recovery is critically low, recommend deload or active recovery instead.""".trimIndent()
                } else ""
            """
RECOVERY AWARENESS:
Recovery Score: $scoreLine
Hormonal Context: $hormoneLine
$warning""".trimStart()
        } else ""

        val activeCycle = profile.cycles?.find { it.status == "active" && it.type == "workout" }
        val activeCycleBlock = if (activeCycle != null) {
            val currentPhase = activeCycle.phases.getOrNull(activeCycle.currentPhaseIndex)
            val phaseStart = runCatching {
                LocalDate.parse(activeCycle.currentPhaseStartDate)
            }.getOrNull()
            val today = Clock.System.now().toLocalDateTime(TimeZone.currentSystemDefault()).date
            val weeks = when (phaseStart) {
                null -> 1
                else -> {
                    val days = (today.toEpochDays() - phaseStart.toEpochDays()).toDouble()
                    kotlin.math.floor(days / 7.0).toInt() + 1
                }
            }
            val isDeloadWeek =
                activeCycle.deloadWeekNumber != null && weeks == activeCycle.deloadWeekNumber
            val lines = mutableListOf<String>()
            lines += "Active Mesocycle: ${activeCycle.name}"
            lines += "Phase: ${currentPhase?.name ?: "Phase ${activeCycle.currentPhaseIndex + 1}"}"
            lines += "Week: $weeks"
            activeCycle.progressionScheme?.let { lines += "Progression: $it" }
            if (isDeloadWeek) {
                lines += "⚠️ DELOAD WEEK — reduce intensity and volume by 40–50%, prioritize recovery"
            }
            "\nACTIVE MESOCYCLE CONTEXT:\n${lines.joinToString("\n")}"
        } else ""

        val clearanceNote = profile.clearances
            .filter { it.status == "denied" || it.status == "conditional" }
            .takeIf { it.isNotEmpty() }
            ?.joinToString(
                prefix = "\nACTIVE CLEARANCE RESTRICTIONS:\n",
                separator = "\n"
            ) { c ->
                "- ${c.activity}: ${c.status.uppercase()} — ${c.reason}"
            }
            ?.plus("\nYou MUST respect these clearance restrictions when programming workouts.")
            ?: ""

        return """
[MODE: TRAINING]
You are in fitness coaching mode. Focus on workout planning, exercise guidance, nutrition optimization, and recovery management.
$recoveryBlock$clearanceNote$activeCycleBlock

[AVAILABLE ACTIONS]
- Update profile: <action type="update_titan_profile">{...partialProfile}</action>
- Update routine: <action type="update_routine">{"routines":[...]}</action>
- Log sleep: <action type="log_sleep">{"date":"YYYY-MM-DD","durationHours":7.5,"quality":8,"bedtime":"23:00","wakeTime":"06:30","deepSleepPct":20,"remSleepPct":25,"awakenings":1,"tags":["stress"],"notes":"..."}</action>
- Create cycle: <action type="create_cycle">{"name":"Creatine Loading","type":"supplement","description":"...","startDate":"YYYY-MM-DD","phases":[{"id":"...","name":"Loading","durationDays":5,"dosage":"20g/day"},{"id":"...","name":"Maintenance","durationDays":30,"dosage":"5g/day"}]}</action>
- Advance cycle phase: <action type="advance_cycle_phase">{"cycleId":"..."}</action>
- Complete cycle: <action type="complete_cycle">{"cycleId":"..."}</action>
- Log workout session: <action type="log_workout_session">{"routineId":"...","routineName":"...","date":"YYYY-MM-DD","startedAt":"...","completedAt":"...","rpe":7,"notes":"...","status":"completed","exercises":[{"exerciseName":"Squat","plannedSets":4,"plannedReps":"8","sets":[{"setNumber":1,"weight":100,"repsCompleted":8,"completed":true}]}]}</action>
- Recovery clearance check: <action type="self_clearance_check">{"activity":"...","recoveryScore":...}</action>

[ROUTINE INSTRUCTIONS]
- If the user wants a new weekly routine, propose a 7-day plan as daily entries for each weekday.
- Each routine entry MUST include: weekday (e.g., "monday", "tuesday"), timeframe "daily", status "active", rationale, exercises[].
- Exercises must have: name, sets, reps, notes.
- Factor in any known medical conditions, medications, or clearance restrictions when designing routines.
""".trimIndent()
    }

    private fun buildMedicalMode(profile: TrainerProfile): String {
        val biomarkers = formatBiomarkers(profile.biomarkers)
        val labs = formatLabSummaries(profile.labSummaries)
        val clearances = formatClearances(profile.clearances)
        val extensionBlock = TitanContextFormatter.buildSomaExtensionBiomarkersBlock()

        val knownConditions = profile.knownConditions.joinToString(", ").ifBlank { "None reported" }
        val medications = profile.medications.joinToString(", ").ifBlank { "None reported" }
        val allergies = profile.allergies.joinToString(", ").ifBlank { "None reported" }

        return """
[MODE: MEDICAL]
You are in biomedical advisory mode. Focus on biomarker interpretation, lab review, clearance decisions, and medical context management.

${SomaMedicalDisclaimer.value}

BIOMARKER SUMMARY:
$biomarkers

$extensionBlock

LAB SUMMARIES:
$labs

CLEARANCE STATUS:
$clearances

Known Conditions: $knownConditions
Medications: $medications
Allergies: $allergies

[AVAILABLE ACTIONS]
- Record biomarker: <action type="commit_biomarker">{"name":"hrv","value":62,"unit":"ms","source":"wearable","recordedAt":"..."}</action>
- Parse lab report: <action type="parse_lab_report">{"panel":"cbc","findings":["..."],"flags":["..."]}</action>
- Issue clearance: <action type="issue_clearance">{"activity":"hiit","status":"granted|denied|conditional","reason":"..."}</action>
- Analyze medical image: <action type="analyze_medical_image">{"reportType":"lab_report","sourceLabel":"patient_upload","biomarkers":[...],"labSummaries":[...],"medications":[...],"allergies":[...],"clinicalFlags":[...]}</action>
  Only emit AFTER DRAFT_APPROVED Spine event. User must review and confirm before this action fires.
- Recovery clearance check: <action type="self_clearance_check">{"activity":"...","recoveryScore":...}</action>
- Compute readiness: <action type="compute_readiness">{"restingHeartRate":...,"sleepQuality":...,"energyLevel":...,"stressPhysical":...}</action>
- Create custom biomarker field: <action type="create_field">{"id":"...","name":"...","type":"number","description":"...","validation":{"minimum":0,"maximum":100},"metadata":{"category":"metabolic","unit":"mg/dL"}}</action>
- Delete custom biomarker field: <action type="delete_field">{"fieldId":"..."}</action>
- Update profile: <action type="update_titan_profile">{...partialProfile}</action>
- Do NOT emit raw <tool_call>...</tool_call> wrappers. Use action tags only.

[MEDICAL RULES]
- NEVER provide medical diagnoses, prescribe medications, or recommend dosage changes.
- NEVER fabricate biomarker values, lab results, or clearance decisions. Only record data the user explicitly provides.
- Clearance decisions should be conservative: when in doubt, issue "conditional" status with clear conditions.
- Prefer objective observations over speculation. State what is missing rather than guessing.
- For emergencies or acute symptoms, instruct immediate local emergency care.
""".trimIndent()
    }

    private fun buildSomaMedicalBridge(somaProfile: SomaProfile): String {
        val conditions = somaProfile.knownConditions.joinToString(", ").ifBlank { "None reported" }
        val medications = somaProfile.medications.joinToString(", ").ifBlank { "None reported" }
        val allergies = somaProfile.allergies.joinToString(", ").ifBlank { "None reported" }

        val activeDenied = somaProfile.clearances.filter { it.status == "denied" || it.status == "conditional" }
        val clearanceLines = if (activeDenied.isNotEmpty()) {
            activeDenied.joinToString("\n") { c ->
                "- ${c.activity}: ${c.status.uppercase()} — ${c.reason}"
            }
        } else {
            "No active restrictions"
        }

        val readiness = somaProfile.readinessScore
            ?.let { "${it}/100" }
            ?: "Not computed"

        return """

[MEDICAL CONTEXT — SOMA]
${SomaMedicalDisclaimer.value}

Known Conditions: $conditions
Current Medications: $medications
Allergies: $allergies
Soma Readiness Score: $readiness

Active Clearance Restrictions:
$clearanceLines

You MUST factor all medical context into workout programming and advice.
""".trimIndent()
    }

    // ── Private formatting helpers (retained from original) ─────────────────

    private fun formatBiomarkers(biomarkers: List<com.agnes.nexus.core.domain.models.BiomarkerRecord>): String {
        if (biomarkers.isEmpty()) return "No biomarkers recorded."
        val recent = biomarkers.take(10)
        return recent.joinToString("\n") { b ->
            val unit = b.unit?.let { " $it" } ?: ""
            val source = b.source ?: "manual"
            "${b.name}: ${b.value}$unit ($source, ${b.recordedAt})"
        }
    }

    private fun formatClearances(clearances: List<ClearanceRecord>): String {
        if (clearances.isEmpty()) return "No clearance records."
        val recent = clearances.take(5)
        return recent.joinToString("\n") { c ->
            "${c.activity}: ${c.status.uppercase()} — ${c.reason} (${c.issuedAt})"
        }
    }

    private fun formatLabSummaries(labs: List<LabSummaryRecord>): String {
        if (labs.isEmpty()) return "No lab summaries."
        val recent = labs.take(5)
        return recent.joinToString("\n") { l ->
            val flags =
                if (l.flags.isNotEmpty()) " [FLAGS: ${l.flags.joinToString(", ")}]" else ""
            "${l.panel}: ${l.findings.joinToString("; ")}$flags (${l.recordedAt})"
        }
    }

    // Note: The duplicate buildProfileContext, formatRoutines, formatSleepLog,
    // formatRecentSessions, formatCycles methods that existed in the original
    // TitanPromptBuilder have been removed. TitanContextFormatter is the
    // single source for those formatters.
}

