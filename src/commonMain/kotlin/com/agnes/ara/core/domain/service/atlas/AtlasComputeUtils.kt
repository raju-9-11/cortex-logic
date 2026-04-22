package com.agnes.ara.core.domain.service.atlas

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlin.math.max
import kotlin.math.min
import kotlin.math.round

// ═══════════════════════════════════════════════════════════════════════════════
// IO Types
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
internal data class TaskSlim(
    val status: String? = null,
    val deadline: String? = null,
)

enum class JournalTone(val key: String) {
    GROUNDING("grounding"),
    SELF_COMPASSION("self-compassion"),
    PERSPECTIVE("perspective"),
    AMBITION("ambition"),
    REFLECTIVE("reflective"),
}

// ═══════════════════════════════════════════════════════════════════════════════
// Constants
// ═══════════════════════════════════════════════════════════════════════════════

val JOURNAL_PROMPTS: Map<JournalTone, String> = mapOf(
    JournalTone.GROUNDING to "Take a breath. What's one thing that felt manageable today, even if small?",
    JournalTone.SELF_COMPASSION to "What's something you'd tell a close friend who had a day like yours?",
    JournalTone.PERSPECTIVE to "When you look back at today in a year, what will matter most?",
    JournalTone.AMBITION to "You brought real energy today. What's the one thing you want to build on tomorrow?",
    JournalTone.REFLECTIVE to "What surprised you today — about your work, the world, or yourself?",
)

val JOURNAL_FORWARD: Map<JournalTone, String> = mapOf(
    JournalTone.GROUNDING to "Tomorrow doesn't need to be big — one small step is enough.",
    JournalTone.SELF_COMPASSION to "You showed up today. That always counts for more than you think.",
    JournalTone.PERSPECTIVE to "The things that feel urgent today rarely define tomorrow — keep your bigger picture in view.",
    JournalTone.AMBITION to "That energy you brought today? Build on it — you're already in motion.",
    JournalTone.REFLECTIVE to "Reflection like this compounds over time. Keep going.",
)

// ═══════════════════════════════════════════════════════════════════════════════
// AtlasComputeUtils
// ═══════════════════════════════════════════════════════════════════════════════

object AtlasComputeUtils {

    private val json = Json { ignoreUnknownKeys = true }

    /** Clamp a numeric value to [0, 10], returning [fallback] for null/NaN. */
    fun parseBoundedScore(value: Double?, fallback: Double = 5.0): Double {
        if (value == null || value.isNaN()) return fallback
        return max(0.0, min(10.0, value))
    }

    /** Trim and cap a title string. Returns [defaultValue] if null/blank. */
    fun sanitizeTitle(raw: String?, defaultValue: String, maxLength: Int = 500): String {
        if (raw == null) return defaultValue
        val trimmed = raw.trim().take(maxLength)
        return trimmed.ifEmpty { defaultValue }
    }

    /**
     * Calculate active task load as a 0–10 score.
     * @param tasksJson JSON array of objects with at least `{"status": "..."}`.
     */
    fun calculateActiveLoad(tasksJson: String): Int {
        val tasks = json.decodeFromString<List<TaskSlim>>(tasksJson)
        val active = tasks.count { it.status == "active" || it.status == "queued" }
        return min(10, round(active.toDouble() / 50.0 * 10.0).toInt())
    }

    /**
     * Calculate deadline pressure as a 0–10 score.
     * @param tasksJson JSON array of objects with at least `{"status", "deadline"}`.
     * @param nowMs current time as Unix milliseconds.
     */
    fun calculateDeadlinePressure(tasksJson: String, nowMs: Long): Double {
        val tasks = json.decodeFromString<List<TaskSlim>>(tasksJson)
        val fortyEightHoursMs = 48L * 60 * 60 * 1000

        var overdueCount = 0
        var upcomingCount = 0

        for (task in tasks) {
            if (task.deadline == null) continue
            if (task.status == "done" || task.status == "deferred") continue
            val deadlineMs = parseIsoToMs(task.deadline) ?: continue
            if (deadlineMs < nowMs) {
                overdueCount++
            } else if (deadlineMs - nowMs < fortyEightHoursMs) {
                upcomingCount++
            }
        }

        val overduePenalty = min(overdueCount.toDouble() * 1.5, 4.0)
        return min(10.0, upcomingCount * 3.0 + overduePenalty)
    }

    /**
     * Derive journaling tone from scalar NSV fields.
     * Uses the same first-match priority logic as agnes.
     */
    fun deriveNsvTone(
        stressLoad: Double = 0.0,
        cnsFatigue: Double = 0.0,
        emotionalResilience: Double = 5.0,
        moodTrend: Double = 3.0,
        energyBudget: Double = 5.0,
        focusScore: Double = 5.0,
    ): String {
        if (stressLoad >= 8.0 || cnsFatigue >= 0.75) return JournalTone.GROUNDING.key
        if (emotionalResilience <= 3.0) return JournalTone.SELF_COMPASSION.key
        if (moodTrend <= 2.0 && stressLoad >= 6.0) return JournalTone.PERSPECTIVE.key
        if (energyBudget >= 7.0 && focusScore >= 7.0) return JournalTone.AMBITION.key
        return JournalTone.REFLECTIVE.key
    }

    /** Get journal prompt for a tone key string. Returns reflective prompt as fallback. */
    fun getJournalPrompt(toneKey: String): String {
        val tone = JournalTone.entries.firstOrNull { it.key == toneKey } ?: JournalTone.REFLECTIVE
        return JOURNAL_PROMPTS[tone] ?: JOURNAL_PROMPTS[JournalTone.REFLECTIVE]!!
    }

    /** Get journal forward message for a tone key string. Returns reflective as fallback. */
    fun getJournalForward(toneKey: String): String {
        val tone = JournalTone.entries.firstOrNull { it.key == toneKey } ?: JournalTone.REFLECTIVE
        return JOURNAL_FORWARD[tone] ?: JOURNAL_FORWARD[JournalTone.REFLECTIVE]!!
    }

    /**
     * Simple ISO date string → millis parser.
     * Handles "YYYY-MM-DDTHH:MM:SS..." and "YYYY-MM-DD" formats.
     * Returns null on parse failure.
     */
    private fun parseIsoToMs(iso: String): Long? {
        return try {
            // Parse date parts manually — no java.time on JS/common
            val parts = iso.split("T", limit = 2)
            val dateParts = parts[0].split("-")
            if (dateParts.size != 3) return null
            val year = dateParts[0].toInt()
            val month = dateParts[1].toInt()
            val day = dateParts[2].toInt()

            // Approximate millis from epoch using day count (sufficient for comparison)
            val daysSinceEpoch = daysSinceEpoch(year, month, day)
            var ms = daysSinceEpoch * 86_400_000L

            // Parse time if present
            if (parts.size > 1) {
                val timePart = parts[1].removeSuffix("Z").split("+")[0].split("-")[0]
                val timeParts = timePart.split(":")
                if (timeParts.isNotEmpty()) ms += timeParts[0].toInt() * 3_600_000L
                if (timeParts.size > 1) ms += timeParts[1].toInt() * 60_000L
                if (timeParts.size > 2) ms += (timeParts[2].toDouble() * 1000).toLong()
            }
            ms
        } catch (_: Exception) {
            null
        }
    }

    private fun daysSinceEpoch(year: Int, month: Int, day: Int): Long {
        // Simplified Gregorian calculation
        var y = year
        var m = month
        if (m <= 2) { y--; m += 12 }
        val era = if (y >= 0) y / 400 else (y - 399) / 400
        val yoe = y - era * 400
        val doy = (153 * (m - 3) + 2) / 5 + day - 1
        val doe = yoe * 365 + yoe / 4 - yoe / 100 + doy
        return (era * 146097L + doe - 719468)
    }
}
