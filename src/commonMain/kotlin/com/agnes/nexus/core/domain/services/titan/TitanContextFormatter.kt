package com.agnes.nexus.core.domain.services.titan

import com.agnes.nexus.core.domain.models.CycleEntry
import com.agnes.nexus.core.domain.models.Routine
import com.agnes.nexus.core.domain.models.SleepEntry
import com.agnes.nexus.core.domain.models.TrainerProfile
import com.agnes.nexus.core.domain.models.WorkoutSession
import com.agnes.nexus.core.domain.services.SchemaRegistry
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive

/**
 * Web-parity formatter for Titan prompt context blocks.
 *
 * Keeping this logic in a dedicated file reduces drift between:
 * - the Titan session prompt wrapper (TitanPromptBuilder)
 * - the detailed profile context formatting (this file)
 */
object TitanContextFormatter {
    fun buildProfileContext(profile: TrainerProfile): String {
        val routinesText = formatRoutines(profile.routines)
        val privacy = profile.privacyLevel.uppercase()
        val isComplete = profile.privacyLevel == "complete"

        val sb = StringBuilder()
        // Web parity: the template starts with a leading newline before "PRIVACY LEVEL".
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
        val injuriesLine = profile.history.injuries.joinToString(", ") { "${it.bodyPart}: ${it.description} (${it.severity}/${it.status})" }.ifBlank { "None" }
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

        if (
            profile.knownConditions.isNotEmpty()
            || profile.medications.isNotEmpty()
            || profile.allergies.isNotEmpty()
        ) {
            sb.appendLine()
            sb.appendLine()
            sb.appendLine("MEDICAL CONTEXT:")
            sb.appendLine(
                "Known Conditions: ${profile.knownConditions.joinToString(", ").ifBlank { "None reported" }}"
            )
            sb.appendLine(
                "Medications: ${profile.medications.joinToString(", ").ifBlank { "None reported" }}"
            )
            sb.appendLine(
                "Allergies: ${profile.allergies.joinToString(", ").ifBlank { "None reported" }}"
            )
            sb.appendLine(
                "Medical Summary: ${profile.medicalSummary?.takeIf { it.isNotBlank() } ?: "Not yet summarized"}"
            )
        }

        return sb.toString()
    }

    /**
     * Web parity for the `extensionBlock` injected into Titan's MEDICAL mode.
     *
     * Format:
     * - empty -> ""
     * - otherwise -> `\n\n[CUSTOM TRACKED BIOMARKERS — SOMA]\n<serialized lines>`
     */
    fun buildSomaExtensionBiomarkersBlock(): String {
        val extensionFields = SchemaRegistry.getExtensions("soma")
        if (extensionFields.isEmpty()) return ""

        val serialized = serializeSomaExtensionFields(extensionFields)
        return "\n\n[CUSTOM TRACKED BIOMARKERS — SOMA]\n$serialized"
    }

    private fun serializeSomaExtensionFields(extensionFields: List<com.agnes.nexus.core.domain.models.FieldDefinition>): String {
        // Matches web behavior: if the caller passes empty, return the web's specific message.
        if (extensionFields.isEmpty()) return "No custom biomarker fields configured."

        return extensionFields.joinToString("\n") { f ->
            val unit = (f.metadata?.get("unit") as? JsonPrimitive)?.content
            val range = if (f.validation?.minimum != null && f.validation?.maximum != null) {
                "${f.validation.minimum}–${f.validation.maximum}"
            } else null

            val valueStr = when (val v = f.defaultValue) {
                null -> "not set"
                is JsonNull -> "not set"
                is JsonPrimitive -> {
                    if (v.isString) "\"${v.content}\"" else v.toString()
                }
                else -> v.toString()
            }

            val unitStr = unit?.let { " $it" } ?: ""
            val rangeStr = range?.let { " (range: $it)" } ?: ""
            "- ${f.name}: ${valueStr}${unitStr}${rangeStr}"
        }
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
            val avgRpe = if (rpeVals.isNotEmpty()) (kotlin.math.round((rpeVals.average() * 10.0) / 10.0).toString() as Double) else null
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
}

