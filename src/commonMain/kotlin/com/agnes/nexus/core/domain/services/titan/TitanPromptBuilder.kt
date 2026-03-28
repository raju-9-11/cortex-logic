package com.agnes.nexus.core.domain.services.titan

import com.agnes.nexus.core.domain.models.ClearanceRecord
import com.agnes.nexus.core.domain.models.CycleEntry
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

object TitanPromptBuilder {

    fun buildTitanSessionPrompt(
        profile: TrainerProfile,
        options: TitanSessionPromptOptions = TitanSessionPromptOptions()
    ): String {
        val mode = options.mode.ifBlank { "training" }
        val formatProtocol = formatProtocolBlock()
        val identity = identityBlock()
        val profileContext = "[PROFILE CONTEXT]${TitanContextFormatter.buildProfileContext(profile)}"
        val modeBlock = if (mode == "medical") {
            buildMedicalMode(profile)
        } else {
            buildTrainingMode(profile, options)
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

    // Mirrors buildProfileContext in web titan-session-prompt.ts
    private fun buildProfileContext(profile: TrainerProfile): String {
        val routinesText = formatRoutines(profile.routines)
        val privacy = profile.privacyLevel.uppercase()
        val isComplete = profile.privacyLevel == "complete"

        val sb = StringBuilder()
        sb.appendLine()
        sb.appendLine("PRIVACY LEVEL: $privacy")
        sb.appendLine(
            if (isComplete) "- You may discuss intimate/biological factors when relevant."
            else "- Avoid intimate/biological questions."
        )
        sb.appendLine()
        sb.appendLine("PROFILE SUMMARY:")
        sb.appendLine(profile.summary.takeIf { it.isNotBlank() } ?: "No summary yet.")
        sb.appendLine()
        sb.appendLine("NUTRITION:")
        sb.appendLine(profile.nutrition.dietNotes ?: "Unknown")
        val supplements = profile.nutrition.supplements.joinToString(", ") { it.name }
        sb.appendLine("Supplements: ${supplements.ifEmpty { "None" }}")
        val macro = profile.nutrition.macroEstimate
        val macroLine = if (macro != null) {
            val kcal = macro.calories ?: "n/a"
            val p = macro.protein ?: "n/a"
            val c = macro.carbs ?: "n/a"
            val f = macro.fat ?: "n/a"
            val source = macro.source ?: "unknown"
            "$kcal kcal, P:$p C:$c F:$f ($source)"
        } else {
            "Unknown"
        }
        sb.appendLine("Macro Estimate: $macroLine")
        sb.appendLine()
        sb.appendLine("ACTIVITY:")
        sb.appendLine("Level: ${profile.activity.activityLevel?.takeIf { it.isNotBlank() } ?: "Unknown"}")
        sb.appendLine("Workouts/Week: ${profile.activity.workoutsPerWeek ?: "Unknown"}")
        sb.appendLine("Sleep Hours (baseline): ${profile.activity.sleepHours ?: "Unknown"}")
        sb.appendLine("Notes: ${profile.activity.dayToDayNotes ?: "None"}")
        sb.appendLine()
        sb.appendLine("SLEEP LOG (last 14 nights):")
        sb.appendLine(formatSleepLog(profile.sleepLog ?: emptyList()))
        sb.appendLine()
        sb.appendLine("HISTORY & GOALS:")
        sb.appendLine("Years Training: ${profile.history.yearsTraining.takeIf { it > 0 } ?: "Unknown"}")
        val injuriesLine = profile.history.injuries.joinToString(", ").ifBlank { "None" }
        sb.appendLine("Injuries: $injuriesLine")
        val goalsLine = profile.history.goals.joinToString(", ").ifBlank {
            profile.history.bodyGoals?.takeIf { it.isNotBlank() } ?: "Unknown"
        }
        sb.appendLine("Goals: $goalsLine")
        sb.appendLine()
        sb.appendLine("CURRENT ROUTINES:")
        sb.appendLine(routinesText)
        sb.appendLine()
        sb.appendLine("ACTIVE CYCLES:")
        sb.appendLine(formatCycles(profile.cycles ?: emptyList()))
        sb.appendLine()
        sb.appendLine("RECENT WORKOUT SESSIONS (last 7):")
        sb.append(formatRecentSessions(profile.workoutSessions ?: emptyList()))

        if (profile.knownConditions.isNotEmpty() || profile.medications.isNotEmpty() || profile.allergies.isNotEmpty()) {
            sb.appendLine()
            sb.appendLine()
            sb.appendLine("MEDICAL CONTEXT:")
            sb.appendLine("Known Conditions: ${profile.knownConditions.joinToString(", ").ifBlank { "None reported" }}")
            sb.appendLine("Medications: ${profile.medications.joinToString(", ").ifBlank { "None reported" }}")
            sb.appendLine("Allergies: ${profile.allergies.joinToString(", ").ifBlank { "None reported" }}")
            sb.appendLine("Medical Summary: ${profile.medicalSummary?.takeIf { it.isNotBlank() } ?: "Not yet summarized"}")
        }
        return sb.toString()
    }

    private fun formatRoutines(routines: List<Routine>): String {
        if (routines.isEmpty()) return "None"
        return routines.joinToString("\n") { r ->
            val weekday = r.weekday ?: "unknown"
            val timeframe = r.timeframe ?: "daily"
            val count = r.exercises.size
            "$weekday ($timeframe) - $count exercises"
        }
    }

    private fun formatSleepLog(entries: List<SleepEntry>): String {
        if (entries.isEmpty()) return "No sleep entries logged."
        val recent = entries.take(14)
        val avgQuality = recent.map { it.quality }.average().let { (kotlin.math.round((it as Double) * 10.0) / 10.0).toString() }
        val avgDuration = recent.map { it.durationHours }.average().let { (kotlin.math.round((it as Double) * 10.0) / 10.0).toString() }

        val detailed = entries.take(7)
        val older = entries.drop(7).take(7)

        val detailedLines = detailed.map { e ->
            val tags = if (!e.tags.isNullOrEmpty()) " [${e.tags!!.joinToString(", ")}]" else ""
            val extraParts = listOfNotNull(
                "${e.durationHours}h",
                if (e.bedtime != null && e.wakeTime != null) "${e.bedtime}→${e.wakeTime}" else null,
                e.deepSleepPct?.let { "deep ${it}%" },
                e.remSleepPct?.let { "REM ${it}%" },
                e.awakenings?.let { "$it awakenings" }
            )
            val extra = extraParts.joinToString(", ")
            val notes = e.notes?.takeIf { it.isNotBlank() }?.let { " — \"$it\"" } ?: ""
            "${e.date}: quality ${e.quality}/10, $extra$tags$notes"
        }.toMutableList()

        if (older.isNotEmpty()) {
            val olderAvgQ = older.map { it.quality }.average().let { (kotlin.math.round((it as Double) * 10.0) / 10.0).toString() }
            val olderAvgD = older.map { it.durationHours }.average().let { (kotlin.math.round((it as Double) * 10.0) / 10.0).toString() }
            detailedLines += "(nights ${detailed.size + 1}–${recent.size} avg: quality $olderAvgQ/10, ${olderAvgD}h)"
        }

        val totalNote =
            if (entries.size > 14) " | ${entries.size} total nights on record" else ""

        return buildString {
            append("14-day averages: quality $avgQuality/10, duration ${avgDuration}h$totalNote\n")
            append(detailedLines.joinToString("\n"))
        }
    }

    private fun formatRecentSessions(sessions: List<WorkoutSession>): String {
        if (sessions.isEmpty()) return "No sessions logged yet."
        val recent = sessions.take(7)
        val lines = recent.map { s ->
            val vol = s.totalVolume?.let { ", ${it}kg" } ?: ""
            val rpe = s.rpe?.let { ", RPE ${it}/10" } ?: ""
            val status = if (s.status != "completed") " [${s.status}]" else ""
            "${s.date}: ${s.routineName}$vol$rpe$status"
        }.toMutableList()

        val older = sessions.drop(7)
        if (older.isNotEmpty()) {
            val totalVol = older.sumOf { it.totalVolume ?: 0 }
            val rpeVals = older.mapNotNull { it.rpe }
            val avgRpe = if (rpeVals.isNotEmpty()) {
                (kotlin.math.round((rpeVals.average() * 10.0) / 10.0).toString() as Double)
            } else null
            val extra = if (avgRpe != null) ", avg RPE $avgRpe" else ""
            lines += "(${older.size} older sessions — total ${totalVol}kg lifted$extra)"
        }
        return lines.joinToString("\n")
    }

    private fun formatCycles(cycles: List<CycleEntry>): String {
        val active = cycles.filter { it.status == "active" }
        if (active.isEmpty()) return "No active cycles."
        return active.joinToString("\n") { c ->
            val phase = c.phases.getOrNull(c.currentPhaseIndex)
            val phaseInfo = if (phase != null) {
                val base = "Phase ${c.currentPhaseIndex + 1}/${c.phases.size}: \"${phase.name}\" (${phase.durationDays}d"
                val dosage = phase.dosage?.let { ", $it" } ?: ""
                val training = phase.trainingModifier?.let { ", training: $it" } ?: ""
                "$base$dosage$training)"
            } else {
                "No phases defined"
            }
            val notes = c.notes?.takeIf { it.isNotBlank() }?.let { " — $it" } ?: ""
            "${c.name} [${c.type}] — started ${c.startDate} — $phaseInfo$notes"
        }
    }

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

    // Training/medical mode blocks and identity/guidelines blocks follow

    private fun identityBlock(): String = """
[IDENTITY]
You are TITAN, the integrated fitness and biomedical advisor for AGNES.
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
}

