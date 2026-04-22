package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.models.AtlasGoal
import com.agnes.ara.core.domain.models.AtlasProfile
import com.agnes.ara.core.domain.models.AtlasTask
import com.agnes.ara.core.domain.models.NeuralStateVector
import com.agnes.ara.core.domain.services.atlas.AtlasPlanningEngine
import com.agnes.ara.core.domain.services.atlas.AtlasPromptBuilder
import kotlinx.datetime.Instant
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.add
import kotlinx.serialization.json.addJsonObject
import kotlinx.serialization.json.buildJsonArray
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import kotlinx.serialization.json.putJsonArray
import kotlinx.serialization.json.putJsonObject
import kotlin.js.JsExport

@JsExport
class AtlasPlanningEngineJs {

    private val json = Json { ignoreUnknownKeys = true; coerceInputValues = true }

    /**
     * Build a dependency graph from a JSON array of AtlasTask objects.
     * Returns a JSON object representing the DependencyGraph.
     */
    fun buildDependencyGraph(tasksJson: String): String {
        val tasks = json.decodeFromString<List<AtlasTask>>(tasksJson)
        val graph = AtlasPlanningEngine.buildDependencyGraph(tasks)
        return serializeDependencyGraph(graph)
    }

    /**
     * Compute per-goal velocities.
     * @param goalsJson  JSON array of AtlasGoal objects.
     * @param tasksJson  JSON array of AtlasTask objects.
     * @param nowIso     ISO-8601 instant string for deterministic "now".
     * Returns a JSON array of GoalVelocity objects.
     */
    fun computeGoalVelocities(goalsJson: String, tasksJson: String, nowIso: String): String {
        val goals = json.decodeFromString<List<AtlasGoal>>(goalsJson)
        val tasks = json.decodeFromString<List<AtlasTask>>(tasksJson)
        val now = Instant.parse(nowIso)
        val velocities = AtlasPlanningEngine.computeGoalVelocities(goals, tasks, now)
        return buildJsonArray {
            for (v in velocities) {
                addJsonObject {
                    put("goalId", v.goalId)
                    put("title", v.title)
                    put("completedMilestones", v.completedMilestones)
                    put("totalMilestones", v.totalMilestones)
                    put("daysElapsed", v.daysElapsed)
                    put("actualVelocity", v.actualVelocity)
                    if (v.requiredVelocity != null) put("requiredVelocity", v.requiredVelocity) else put("requiredVelocity", JsonNull)
                    if (v.daysRemaining != null) put("daysRemaining", v.daysRemaining) else put("daysRemaining", JsonNull)
                    put("onPace", v.onPace)
                    put("linkedTaskCount", v.linkedTaskCount)
                    put("linkedTasksDone", v.linkedTasksDone)
                    put("riskLevel", v.riskLevel)
                }
            }
        }.toString()
    }

    /**
     * Forecast daily energy load.
     * @param profileJson  JSON AtlasProfile.
     * @param nsvJson      JSON NeuralStateVector (may be "null").
     * @param daysAhead    Number of days to forecast.
     * @param nowIso       ISO-8601 instant string.
     * Returns a JSON array of DailyLoadForecast objects.
     */
    fun forecastLoad(profileJson: String, nsvJson: String, daysAhead: Int, nowIso: String): String {
        val profile = json.decodeFromString<AtlasProfile>(profileJson)
        val nsv = if (nsvJson == "null" || nsvJson.isBlank()) null
                  else json.decodeFromString<NeuralStateVector>(nsvJson)
        val now = Instant.parse(nowIso)
        val forecasts = AtlasPlanningEngine.forecastLoad(profile, nsv, daysAhead, now)
        return buildJsonArray {
            for (f in forecasts) {
                addJsonObject {
                    put("date", f.date)
                    put("scheduledEnergy", f.scheduledEnergy)
                    put("taskEnergy", f.taskEnergy)
                    put("habitEnergy", f.habitEnergy)
                    put("routineEnergy", f.routineEnergy)
                    put("totalDemand", f.totalDemand)
                    put("estimatedCapacity", f.estimatedCapacity)
                    put("headroom", f.headroom)
                    put("overloaded", f.overloaded)
                }
            }
        }.toString()
    }

    /**
     * Detect scheduling conflicts.
     * @param profileJson  JSON AtlasProfile.
     * @param daysAhead    Forecast window in days.
     * @param nowIso       ISO-8601 instant string.
     * Returns a JSON ConflictReport object.
     */
    fun detectConflicts(profileJson: String, daysAhead: Int, nowIso: String): String {
        val profile = json.decodeFromString<AtlasProfile>(profileJson)
        val now = Instant.parse(nowIso)
        val report = AtlasPlanningEngine.detectConflicts(profile, daysAhead, now)
        return buildJsonObject {
            putJsonArray("deadlineConvergence") {
                for (dc in report.deadlineConvergence) {
                    addJsonObject {
                        put("date", dc.date)
                        putJsonArray("taskIds") { for (id in dc.taskIds) add(id) }
                        put("count", dc.count)
                    }
                }
            }
            putJsonArray("habitScheduleGaps") {
                for (gap in report.habitScheduleGaps) {
                    addJsonObject {
                        put("habitTitle", gap.habitTitle)
                        put("habitFrequency", gap.habitFrequency)
                    }
                }
            }
            putJsonArray("recoveryViolations") {
                for (v in report.recoveryViolations) {
                    addJsonObject {
                        put("taskTitle", v.taskTitle)
                        put("windowTitle", v.windowTitle)
                    }
                }
            }
        }.toString()
    }

    /**
     * Suggest a phased task breakdown for a single task.
     * @param taskJson  JSON AtlasTask. The function uses only the task itself with an empty profile context.
     * Returns a JSON TaskBreakdownSuggestion.
     */
    fun suggestTaskBreakdown(taskJson: String): String {
        val task = json.decodeFromString<AtlasTask>(taskJson)
        // Construct a minimal profile containing only this task so dependency + goal
        // enrichment logic has a consistent baseline without requiring a full profile.
        val minimalProfile = json.decodeFromString<AtlasProfile>(
            """{"tasks":[${taskJson}],"goals":[],"habits":[],"scheduledTasks":[],"recoveryWindows":[],"energyWave":[],"routine":{"isActive":false,"blocks":[]},"reviews":[]}"""
        )
        val suggestion = AtlasPlanningEngine.suggestTaskBreakdown(task, minimalProfile)
        return buildJsonObject {
            putJsonArray("subtasks") {
                for (s in suggestion.subtasks) {
                    addJsonObject {
                        put("title", s.title)
                        put("estimatedEnergyCost", s.estimatedEnergyCost)
                        put("suggestedOrder", s.suggestedOrder)
                        put("rationale", s.rationale)
                    }
                }
            }
            put("totalEstimatedEnergy", suggestion.totalEstimatedEnergy)
            put("decompositionStrategy", suggestion.decompositionStrategy)
        }.toString()
    }

    /**
     * Compute historical completion patterns for a profile.
     * @param profileJson  JSON AtlasProfile.
     * @param nowIso       ISO-8601 instant string.
     * Returns a JSON HistoricalPatterns object.
     */
    fun computeHistoricalPatterns(profileJson: String, nowIso: String): String {
        val profile = json.decodeFromString<AtlasProfile>(profileJson)
        val now = Instant.parse(nowIso)
        val patterns = AtlasPlanningEngine.computeHistoricalPatterns(profile, now)
        return buildJsonObject {
            put("completionRate7d", patterns.completionRate7d)
            put("completionRate30d", patterns.completionRate30d)
            if (patterns.avgEnergyAccuracy != null) put("avgEnergyAccuracy", patterns.avgEnergyAccuracy) else put("avgEnergyAccuracy", JsonNull)
            putJsonArray("commonDeferDays") { for (day in patterns.commonDeferDays) add(day) }
            if (patterns.peakProductivityHour != null) put("peakProductivityHour", patterns.peakProductivityHour) else put("peakProductivityHour", JsonNull)
            put("reviewConsistency", patterns.reviewConsistency)
        }.toString()
    }

    // ─── Private serialization helpers ───────────────────────────────────────

    private fun serializeDependencyGraph(graph: AtlasPromptBuilder.DependencyGraph): String {
        return buildJsonObject {
            putJsonObject("adjacency") {
                for ((k, v) in graph.adjacency) {
                    putJsonArray(k) { for (id in v) add(id) }
                }
            }
            putJsonObject("reverseAdj") {
                for ((k, v) in graph.reverseAdj) {
                    putJsonArray(k) { for (id in v) add(id) }
                }
            }
            putJsonArray("criticalPath") { for (id in graph.criticalPath) add(id) }
            putJsonArray("blockedChains") {
                for (chain in graph.blockedChains) {
                    addJsonObject {
                        put("root", chain.root)
                        putJsonArray("chain") { for (id in chain.chain) add(id) }
                    }
                }
            }
            putJsonArray("orphanTasks") { for (id in graph.orphanTasks) add(id) }
            put("cycleDetected", graph.cycleDetected)
            putJsonArray("topologicalOrder") { for (id in graph.topologicalOrder) add(id) }
        }.toString()
    }
}
