package com.agnes.nexus.core.domain.service.atlas

import kotlinx.serialization.Serializable

@Serializable
data class AtlasFieldTemplate(
    val id: String,
    val label: String,
    val description: String,
    val type: String,           // "hours" | "count" | "score" | "boolean"
    val unit: String? = null,
    val min: Double? = null,
    val max: Double? = null,
    val defaultValue: Double? = null
)

object AtlasFieldTemplates {
    val all: List<AtlasFieldTemplate> = listOf(
        AtlasFieldTemplate("deep_work_hours",   "Deep Work Hours",       "Hours of uninterrupted focus work",           "hours", "hrs",   0.0, 16.0, 0.0),
        AtlasFieldTemplate("pomodoro_count",    "Pomodoro Count",        "Number of 25-min focused sessions completed", "count", "pomo",  0.0, 20.0, 0.0),
        AtlasFieldTemplate("distraction_count", "Distraction Count",     "Number of focus-breaking interruptions",      "count", "×",     0.0, 50.0, 0.0),
        AtlasFieldTemplate("screen_time",       "Screen Time",           "Total recreational screen time in hours",     "hours", "hrs",   0.0, 16.0, 0.0),
        AtlasFieldTemplate("meeting_load",      "Meeting Load",          "Hours spent in meetings",                     "hours", "hrs",   0.0, 12.0, 0.0),
        AtlasFieldTemplate("decision_fatigue",  "Decision Fatigue",      "Subjective decision load (1=low, 10=high)",   "score", "/10",   1.0, 10.0, 5.0),
        AtlasFieldTemplate("creative_output",   "Creative Output",       "Creative sessions or output units",           "count", "units", 0.0, 20.0, 0.0),
        AtlasFieldTemplate("learning_hours",    "Learning Hours",        "Hours spent on deliberate learning",          "hours", "hrs",   0.0, 8.0,  0.0),
        AtlasFieldTemplate("journaling_streak", "Journaling Streak",     "Consecutive days with journal entries",       "count", "days",  0.0, 365.0, 0.0),
        AtlasFieldTemplate("morning_routine",   "Morning Routine Score", "Morning routine completion score (1-10)",     "score", "/10",   1.0, 10.0, 5.0)
    )

    fun findById(id: String): AtlasFieldTemplate? = all.find { it.id == id }

    fun validateValue(template: AtlasFieldTemplate, value: Double): Boolean {
        val min = template.min ?: Double.MIN_VALUE
        val max = template.max ?: Double.MAX_VALUE
        return value in min..max
    }
}
