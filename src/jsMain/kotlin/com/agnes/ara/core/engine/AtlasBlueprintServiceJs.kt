package com.agnes.ara.core.engine

import kotlinx.datetime.Instant
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonArray
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import kotlin.js.JsExport
import kotlin.math.abs
import kotlin.math.ceil
import kotlin.math.max
import kotlin.math.min
import kotlin.math.round

/**
 * JS facade for Atlas capacity blueprint computations.
 *
 * Ported from atlas-blueprint-service.ts. All methods are pure computation;
 * no Spine events or side effects.
 *
 * Capacity formula:
 *   rawCapacityPct = 72 + vitality×2.2 + resilience×1.8 + specAlignment×1.2 − friction×2.8
 *   clamped to [60, 115]
 */
@JsExport
class AtlasBlueprintServiceJs {

    private val json = Json { ignoreUnknownKeys = true }

    // ── Internal model types ─────────────────────────────────────────────────

    @Serializable
    private data class EnergyWavePoint(
        val energy: Double = 0.0,
        val focus: Double = 0.0,
        val load: Double = 0.0,
    )

    @Serializable
    private data class DailyCheckIn(val energyLevel: Double = 0.0)

    @Serializable
    private data class AtlasTask(
        val status: String = "queued",
        val deadline: String? = null,
        val energyCost: Double? = null,
        val priority: Int? = null,
        val goalId: String? = null,
        val title: String = "",
    )

    @Serializable
    private data class AtlasGoalMilestone(val completed: Boolean = false)

    @Serializable
    private data class AtlasGoal(
        val status: String = "active",
        val deadline: String? = null,
        val title: String = "",
        val progressPercent: Double? = null,
        val milestones: List<AtlasGoalMilestone> = emptyList(),
    )

    @Serializable
    private data class AtlasHabit(
        val status: String = "active",
        val energyCost: Double? = null,
        val frequency: String = "weekly",
        val currentStreak: Int? = null,
        val title: String = "",
        val lastCompleted: String? = null,
    )

    @Serializable
    private data class ScheduledTask(
        val scheduledAt: String = "",
        val status: String = "queued",
        val energyCost: Double? = null,
    )

    @Serializable
    private data class RoutineBlock(
        val daysOfWeek: List<Int> = emptyList(),
        val energyCost: Double? = null,
    )

    @Serializable
    private data class RoutineData(
        val isActive: Boolean = false,
        val blocks: List<RoutineBlock> = emptyList(),
    )

    @Serializable
    private data class AtlasReview(val createdAt: String = "")

    @Serializable
    private data class AtlasProfile(
        val energyWave: List<EnergyWavePoint>? = null,
        val tasks: List<AtlasTask>? = null,
        val scheduledTasks: List<ScheduledTask>? = null,
        val habits: List<AtlasHabit>? = null,
        val goals: List<AtlasGoal>? = null,
        val dailyCheckIns: List<DailyCheckIn>? = null,
        val reviews: List<AtlasReview>? = null,
        val routine: RoutineData? = null,
    )

    @Serializable
    private data class NsvCognitive(
        val energyBudget: Double? = null,
        val focusScore: Double? = null,
        val activeLoad: Double? = null,
        val planningLoad: Double? = null,
        val taskCompletionRate: Double? = null,
    )

    @Serializable
    private data class NsvBiological(
        val sleepQuality: Double? = null,
        val recoveryScore: Double? = null,
        val cnsFatigue: Double? = null,
    )

    @Serializable
    private data class NsvEmotional(
        val emotionalResilience: Double? = null,
        val stressLoad: Double? = null,
    )

    @Serializable
    private data class NsvPlanning(
        val deadlinePressure: Double? = null,
        val streakHealth: Double? = null,
        val goalAlignment: Double? = null,
        val habitMomentum: Double? = null,
    )

    @Serializable
    private data class NsvResource(val financialFriction: Double? = null)

    @Serializable
    private data class Nsv(
        val cognitive: NsvCognitive? = null,
        val biological: NsvBiological? = null,
        val emotional: NsvEmotional? = null,
        val planning: NsvPlanning? = null,
        val resource: NsvResource? = null,
    )

    @Serializable
    private data class GlobalProjectionInput(val crossFunctionalState: Nsv? = null)

    @Serializable
    private data class VectorSet(
        val vitality: Double = 5.0,
        val friction: Double = 5.0,
        val resilience: Double = 5.0,
        val specAlignment: Double = 5.0,
    )

    @Serializable
    private data class BlueprintInput(
        val baselineCapacity: Double = 0.0,
        val plannedDemand: Double = 0.0,
        val safeCapacity: Double = 0.0,
        val headroom: Double = 0.0,
        val recommendedCapacityPct: Double = 100.0,
        val state: String = "hold",
        val vectors: VectorSet? = null,
        val pressurePoints: List<String> = emptyList(),
    )

    // ── Constants ────────────────────────────────────────────────────────────

    private val MIN_CAPACITY_PCT = 60.0
    private val MAX_CAPACITY_PCT = 115.0

    // ── Math helpers ─────────────────────────────────────────────────────────

    private fun clamp(v: Double, lo: Double, hi: Double) = min(hi, max(lo, v))
    private fun round1(v: Double) = round(v * 10.0) / 10.0

    private fun average(values: List<Double?>): Double? {
        val finite = values.filterNotNull().filter { it.isFinite() }
        return if (finite.isEmpty()) null else finite.sum() / finite.size
    }

    private fun normalizeTenScale(v: Double?): Double? =
        if (v == null || !v.isFinite()) null else clamp(v / 10.0, 0.0, 1.0)

    private fun normalizeRatio(v: Double?): Double? =
        if (v == null || !v.isFinite()) null else clamp(v, 0.0, 1.0)

    private fun sumEnergyWave(profile: AtlasProfile?): Double =
        if (profile?.energyWave.isNullOrEmpty()) 0.0
        else round1(profile!!.energyWave!!.sumOf { it.energy })

    private fun estimateHabitLoad(habits: List<AtlasHabit>): Double {
        val fw = mapOf(
            "daily" to 2.8, "weekdays" to 2.2, "weekends" to 1.1,
            "weekly" to 0.9, "monthly" to 0.3, "custom" to 1.2,
        )
        return round1(habits.filter { it.status == "active" }
            .sumOf { (it.energyCost ?: 0.0) * (fw[it.frequency] ?: 1.0) } * 0.35)
    }

    private fun estimateScheduledDemand(tasks: List<ScheduledTask>, nowMs: Double): Double {
        val windowEnd = nowMs + 7.0 * 86400000.0
        return round1(tasks.filter { task ->
            val at = try { Instant.parse(task.scheduledAt).toEpochMilliseconds().toDouble() } catch (e: Exception) { -1.0 }
            at >= nowMs && at < windowEnd && task.status != "done"
        }.sumOf { it.energyCost ?: 0.0 })
    }

    private fun estimateTaskDemand(tasks: List<AtlasTask>, nowMs: Double): Double {
        val windowEnd = nowMs + 7.0 * 86400000.0
        return round1(tasks
            .filter { it.status == "queued" || it.status == "active" || it.status == "deferred" }
            .map { task ->
                val dMs = task.deadline?.let { d -> try { Instant.parse(d).toEpochMilliseconds().toDouble() } catch (e: Exception) { null } }
                val urgency = when { dMs != null && dMs <= windowEnd -> 1.0; dMs != null -> 0.6; else -> 0.45 }
                val pw = 1.2 - ((task.priority ?: 3) - 1) * 0.12
                (task.energyCost ?: 0.0) * urgency * pw
            }
            .sortedDescending()
            .take(10)
            .sum())
    }

    private fun findTopFocus(tasks: List<AtlasTask>, goals: List<AtlasGoal>, habits: List<AtlasHabit>): String {
        val urgentGoal = goals.filter { it.status == "active" }
            .minByOrNull { g -> g.deadline?.let { d -> try { Instant.parse(d).toEpochMilliseconds().toDouble() } catch (e: Exception) { Double.MAX_VALUE } } ?: Double.MAX_VALUE }
        if (urgentGoal != null) return "Advance goal: ${urgentGoal.title}"
        val topTask = tasks.filter { it.status != "done" }.minByOrNull { it.priority ?: 3 }
        if (topTask != null) return "Protect task: ${topTask.title}"
        val habit = habits.firstOrNull { it.status == "active" }
        if (habit != null) return "Keep habit stable: ${habit.title}"
        return "Hold a lighter planning week and protect recovery"
    }

    private fun buildPressurePoints(headroom: Double, frictionScore: Double, resilienceScore: Double, specAlignmentScore: Double): List<String> {
        val pts = mutableListOf<String>()
        if (headroom < 0) pts.add("Demand is over safe capacity by ${round1(abs(headroom))} energy points.")
        if (frictionScore >= 6.5) pts.add("Friction is elevated across planning/deadline surfaces.")
        if (resilienceScore <= 4.5) pts.add("Resilience signals are low enough that recovery should be scheduled, not implied.")
        if (specAlignmentScore <= 5.0) pts.add("Current commitments are drifting away from goals and habit anchors.")
        return pts.take(3)
    }

    private data class ReviewAction(val id: String, val title: String, val detail: String, val emphasis: String)

    private fun buildActions(
        profile: AtlasProfile,
        headroom: Double,
        resilienceScore: Double,
        specAlignmentScore: Double,
        nowMs: Double,
    ): List<ReviewAction> {
        val actions = mutableListOf<ReviewAction>()

        val overdueGoals = profile.goals?.filter { g ->
            if (g.status != "active" || g.deadline == null) return@filter false
            try { Instant.parse(g.deadline).toEpochMilliseconds().toDouble() < nowMs && (g.progressPercent ?: 0.0) < 100.0 }
            catch (e: Exception) { false }
        } ?: emptyList()

        val atRiskHabits = profile.habits?.filter { h ->
            if (h.status != "active" || h.lastCompleted == null) return@filter false
            try { (nowMs - Instant.parse(h.lastCompleted).toEpochMilliseconds().toDouble()) / 3600000.0 >= 20.0 }
            catch (e: Exception) { false }
        } ?: emptyList()

        if (headroom < 0) {
            val n = max(1, ceil(abs(headroom) / 6.0).toInt())
            actions.add(ReviewAction("protect-load", "Protect next week's load",
                "Defer $n high-energy task(s) or shrink their scope before Monday.", "protect"))
        }
        if (resilienceScore <= 4.5) {
            actions.add(ReviewAction("schedule-recovery", "Schedule explicit recovery",
                "Place one recovery window on the calendar now so compression is proactive instead of reactive.", "protect"))
        }
        if (overdueGoals.isNotEmpty()) {
            actions.add(ReviewAction("goal-rescue", "Rescue a slipping goal",
                "Re-scope or re-sequence ${overdueGoals[0].title} so the next action is visible and schedulable.", "focus"))
        }
        if (atRiskHabits.isNotEmpty()) {
            actions.add(ReviewAction("habit-anchor", "Stabilize an at-risk habit",
                "Protect ${atRiskHabits[0].title} with a minimum viable version before end of day.", "build"))
        }
        if (specAlignmentScore <= 5.0) {
            actions.add(ReviewAction("align-work", "Re-align task demand to goals",
                "Link orphan tasks to an active goal or archive them so demand reflects what actually matters.", "focus"))
        }
        if (actions.isEmpty()) {
            actions.add(ReviewAction("hold-line", "Hold the current blueprint",
                "Keep a steady load and preserve your highest-leverage focus block early in the week.", "focus"))
        }
        return actions.take(4)
    }

    // ── Core capacity computation ─────────────────────────────────────────────

    private data class CapacityVectors(
        val vitalityScore: Double, val frictionScore: Double,
        val resilienceScore: Double, val specAlignmentScore: Double,
        val baselineCapacity: Double, val plannedDemand: Double,
        val recommendedCapacityPct: Double, val safeCapacity: Double,
        val headroom: Double, val loadRatio: Double, val state: String,
    )

    private fun computeVectors(profile: AtlasProfile, nsv: Nsv?, nowMs: Double, includeReview: Boolean): CapacityVectors {
        val vitality = average(listOf(
            normalizeTenScale(nsv?.cognitive?.energyBudget),
            normalizeTenScale(nsv?.cognitive?.focusScore),
            normalizeTenScale(nsv?.biological?.sleepQuality),
            normalizeTenScale(profile.energyWave?.let { w -> if (w.isEmpty()) null else w.sumOf { it.energy } / w.size }),
            if (includeReview) normalizeTenScale((profile.dailyCheckIns ?: emptyList()).takeLast(7).let { list -> if (list.isEmpty()) null else list.sumOf { it.energyLevel * 2.0 } / list.size }) else null,
        ))

        val friction = average(listOf(
            normalizeTenScale(nsv?.cognitive?.planningLoad),
            normalizeTenScale(nsv?.planning?.deadlinePressure),
            normalizeTenScale(nsv?.emotional?.stressLoad),
            normalizeTenScale(nsv?.resource?.financialFriction),
            normalizeTenScale(nsv?.cognitive?.activeLoad),
        ))

        val resilience = average(listOf(
            normalizeTenScale(nsv?.emotional?.emotionalResilience),
            normalizeTenScale(nsv?.biological?.recoveryScore),
            normalizeTenScale(nsv?.planning?.streakHealth),
            normalizeTenScale(if (nsv?.biological?.cnsFatigue != null) 10.0 - nsv.biological.cnsFatigue else null),
        ))

        val activeGoals = profile.goals?.filter { it.status == "active" } ?: emptyList()
        val goalLinkedTasks = profile.tasks?.count { it.goalId != null } ?: 0
        val activeTasks = profile.tasks?.count { it.status != "done" } ?: 0
        val activeHabits = profile.habits?.filter { it.status == "active" } ?: emptyList()

        val recentReviewDays = if (includeReview && profile.reviews?.isNotEmpty() == true) {
            val lastReviewMs = try { Instant.parse(profile.reviews.last().createdAt).toEpochMilliseconds().toDouble() } catch (e: Exception) { nowMs }
            max(0.0, (14.0 - (nowMs - lastReviewMs) / 86400000.0)) / 14.0
        } else 0.0

        val specAlignment = average(listOf(
            normalizeRatio(nsv?.planning?.goalAlignment),
            normalizeRatio(nsv?.planning?.habitMomentum),
            if (activeGoals.isNotEmpty()) clamp(goalLinkedTasks.toDouble() / max(activeGoals.size, 1).toDouble(), 0.0, 1.0) else null,
            if (activeHabits.isNotEmpty()) clamp(activeHabits.count { (it.currentStreak ?: 0) > 0 }.toDouble() / activeHabits.size.toDouble(), 0.0, 1.0) else null,
            if (includeReview) recentReviewDays else null,
            if (activeTasks > 0 && includeReview) clamp((profile.tasks?.count { it.goalId != null && it.status != "done" } ?: 0).toDouble() / activeTasks.toDouble(), 0.0, 1.0) else null,
        ))

        val vs = round1((vitality ?: 0.5) * 10.0)
        val fs = round1((friction ?: 0.5) * 10.0)
        val rs = round1((resilience ?: 0.5) * 10.0)
        val ss = round1((specAlignment ?: 0.5) * 10.0)

        val baselineCapacity = sumEnergyWave(profile).let { if (it > 0.0) it else round1(((nsv?.cognitive?.energyBudget ?: 5.0)) * 4.5) }
        val plannedDemand = estimateScheduledDemand(profile.scheduledTasks ?: emptyList(), nowMs) +
                estimateTaskDemand(profile.tasks ?: emptyList(), nowMs) +
                estimateHabitLoad(profile.habits ?: emptyList())

        val rawCapacityPct = 72.0 + vs * 2.2 + rs * 1.8 + ss * 1.2 - fs * 2.8
        val recommendedCapacityPct = round(clamp(rawCapacityPct, MIN_CAPACITY_PCT, MAX_CAPACITY_PCT)).toDouble()
        val safeCapacity = round1(baselineCapacity * recommendedCapacityPct / 100.0)
        val headroom = round1(safeCapacity - plannedDemand)
        val loadRatio = if (safeCapacity > 0.0) round1(plannedDemand / safeCapacity) else 0.0

        val state = when {
            recommendedCapacityPct <= 72.0 || rs <= 4.2 -> "recover"
            recommendedCapacityPct < 92.0 || fs >= 6.0 -> "compress"
            recommendedCapacityPct >= 108.0 && vs >= 7.0 && rs >= 6.5 && fs <= 4.5 -> "expand"
            else -> "hold"
        }

        return CapacityVectors(vs, fs, rs, ss, baselineCapacity, round1(plannedDemand), recommendedCapacityPct, safeCapacity, headroom, loadRatio, state)
    }

    // ── Public API ───────────────────────────────────────────────────────────

    /**
     * Returns "structured" when confidence >= 0.7, else "unstructured".
     */
    fun inferIngestionMode(confidence: Double): String =
        if (confidence >= 0.7) "structured" else "unstructured"

    /**
     * Projects capacity at a given capacityPct override.
     *
     * @param blueprintJson JSON AtlasCapacityBlueprint
     * @param capacityPct   Capacity override (60–115)
     * @return JSON { capacity, headroom, overflowTasks, summary }
     */
    fun projectCapacityBlueprint(blueprintJson: String, capacityPct: Double): String {
        val bp = json.decodeFromString<BlueprintInput>(blueprintJson)
        val projectedCapacity = round1(bp.baselineCapacity * clamp(capacityPct, MIN_CAPACITY_PCT, MAX_CAPACITY_PCT) / 100.0)
        val headroom = round1(projectedCapacity - bp.plannedDemand)
        val overflowTasks = if (headroom < 0) max(0, ceil(abs(headroom) / 6.0).toInt()) else 0
        val summary = when {
            headroom >= 3.0 -> "Projection leaves meaningful headroom for deep work and interruptions."
            headroom >= 0.0 -> "Projection is workable, but only if scope stays disciplined."
            else -> "Projection still overloads the week. Defer about $overflowTasks high-energy task(s)."
        }
        return buildJsonObject {
            put("capacity", projectedCapacity)
            put("headroom", headroom)
            put("overflowTasks", overflowTasks)
            put("summary", summary)
        }.toString()
    }

    /**
     * Full weekly review blueprint computation.
     *
     * @param profileJson JSON AtlasProfile
     * @param soulJson    JSON GlobalProjection (with crossFunctionalState NSV)
     * @param nowIso      ISO-8601 timestamp representing "now"
     * @return JSON AtlasReviewBlueprint
     */
    fun computeReviewBlueprint(profileJson: String, soulJson: String, nowIso: String): String {
        val profile = if (profileJson == "null") return "null" else json.decodeFromString<AtlasProfile>(profileJson)
        val soul = try { json.decodeFromString<GlobalProjectionInput>(soulJson) } catch (e: Exception) { null }
        val nsv = soul?.crossFunctionalState
        val nowMs = try { Instant.parse(nowIso).toEpochMilliseconds().toDouble() } catch (e: Exception) { js("Date.now()") as Double }

        val cv = computeVectors(profile, nsv, nowMs, includeReview = true)

        val pressurePoints = buildPressurePoints(cv.headroom, cv.frictionScore, cv.resilienceScore, cv.specAlignmentScore)
        val actions = buildActions(profile, cv.headroom, cv.resilienceScore, cv.specAlignmentScore, nowMs)

        val overflowTasks = if (cv.headroom < 0) max(0, ceil(abs(cv.headroom) / 6.0).toInt()) else 0
        val projectedCapacity = round1(cv.baselineCapacity * clamp(cv.recommendedCapacityPct, MIN_CAPACITY_PCT, MAX_CAPACITY_PCT) / 100.0)
        val projectedHeadroom = round1(projectedCapacity - cv.plannedDemand)

        val projectionSummary = when (cv.state) {
            "recover" -> "Atlas is projecting a recovery-first week. Protect bandwidth before adding commitments."
            "compress" -> "Atlas is projecting a compressed week. Keep scope tight and front-load the essentials."
            "expand" -> "Atlas is projecting surplus capacity. Use it intentionally, not by accident."
            else -> "Atlas is projecting a stable week. Preserve momentum without overshooting."
        }

        val signalCount = listOf(
            (profile.energyWave?.isNotEmpty() == true), (profile.tasks?.isNotEmpty() == true),
            (profile.dailyCheckIns?.isNotEmpty() == true), (nsv != null),
        ).count { it }
        val confidence = when { signalCount >= 4 -> "high"; signalCount >= 2 -> "medium"; else -> "low" }

        val focus = findTopFocus(profile.tasks ?: emptyList(), profile.goals ?: emptyList(), profile.habits ?: emptyList())

        return buildJsonObject {
            put("generatedAt", nowIso)
            put("period", "weekly")
            put("capacity", buildJsonObject {
                put("baselineCapacity", cv.baselineCapacity)
                put("safeCapacity", cv.safeCapacity)
                put("plannedDemand", cv.plannedDemand)
                put("loadRatio", cv.loadRatio)
                put("headroom", cv.headroom)
                put("recommendedCapacityPct", cv.recommendedCapacityPct)
                put("state", cv.state)
                put("vectors", buildJsonObject {
                    put("vitality", cv.vitalityScore); put("friction", cv.frictionScore)
                    put("resilience", cv.resilienceScore); put("specAlignment", cv.specAlignmentScore)
                })
                put("pressurePoints", buildJsonArray { pressurePoints.forEach { add(JsonPrimitive(it)) } })
            })
            put("projection", buildJsonObject {
                put("state", cv.state)
                put("summary", projectionSummary)
                put("confidence", confidence)
                put("projectedCapacity", projectedCapacity)
                put("projectedDemand", cv.plannedDemand)
                put("projectedHeadroom", projectedHeadroom)
                put("nextPeriodFocus", focus)
                put("recommendedActions", buildJsonArray {
                    actions.forEach { a ->
                        add(buildJsonObject {
                            put("id", a.id); put("title", a.title)
                            put("detail", a.detail); put("emphasis", a.emphasis)
                        })
                    }
                })
            })
        }.toString()
    }

    /**
     * Lightweight capacity snapshot without full projection surface.
     *
     * @param profileJson JSON AtlasProfile (or "null")
     * @param soulJson    JSON GlobalProjection
     * @return JSON AtlasCapacityBlueprint or "null" if no profile
     */
    fun computeQuickSnapshot(profileJson: String, soulJson: String): String {
        if (profileJson == "null") return "null"
        val profile = try { json.decodeFromString<AtlasProfile>(profileJson) } catch (e: Exception) { return "null" }
        val soul = try { json.decodeFromString<GlobalProjectionInput>(soulJson) } catch (e: Exception) { null }
        val nsv = soul?.crossFunctionalState
        val nowMs = js("Date.now()") as Double

        val cv = computeVectors(profile, nsv, nowMs, includeReview = false)
        val pressurePoints = buildPressurePoints(cv.headroom, cv.frictionScore, cv.resilienceScore, cv.specAlignmentScore)

        return buildJsonObject {
            put("baselineCapacity", cv.baselineCapacity)
            put("safeCapacity", cv.safeCapacity)
            put("plannedDemand", cv.plannedDemand)
            put("loadRatio", cv.loadRatio)
            put("headroom", cv.headroom)
            put("recommendedCapacityPct", cv.recommendedCapacityPct)
            put("state", cv.state)
            put("vectors", buildJsonObject {
                put("vitality", cv.vitalityScore); put("friction", cv.frictionScore)
                put("resilience", cv.resilienceScore); put("specAlignment", cv.specAlignmentScore)
            })
            put("pressurePoints", buildJsonArray { pressurePoints.forEach { add(JsonPrimitive(it)) } })
        }.toString()
    }

    /**
     * Single-day capacity estimate with NSV modifiers and committed energy.
     *
     * @param profileJson JSON AtlasProfile (or "null")
     * @param soulJson    JSON GlobalProjection
     * @param targetDate  ISO date string (YYYY-MM-DD)
     * @return JSON { totalCapacity, committedEnergy, availableEnergy, dayOfWeek }
     */
    fun computeDailyCapacity(profileJson: String, soulJson: String, targetDate: String): String {
        val fallback = buildJsonObject {
            put("totalCapacity", 40.0); put("committedEnergy", 0.0)
            put("availableEnergy", 40.0); put("dayOfWeek", 0)
        }.toString()

        if (profileJson == "null") return fallback
        val profile = try { json.decodeFromString<AtlasProfile>(profileJson) } catch (e: Exception) { return fallback }
        val soul = try { json.decodeFromString<GlobalProjectionInput>(soulJson) } catch (e: Exception) { null }
        val nsv = soul?.crossFunctionalState

        // Day of week: JS getDay() → 0=Sun, 1=Mon, ..., 6=Sat
        val dayOfWeek = js("new Date(targetDate + 'T12:00:00').getDay()") as Int

        var baseCapacity = sumEnergyWave(profile).let { if (it > 0.0) it else 40.0 }

        val sleepQuality = nsv?.biological?.sleepQuality
        if (sleepQuality != null && sleepQuality < 4.0) baseCapacity -= baseCapacity * 0.2
        val cnsFatigue = nsv?.biological?.cnsFatigue
        if (cnsFatigue != null && cnsFatigue > 7.0) baseCapacity = min(baseCapacity, 20.0)
        val stressLoad = nsv?.emotional?.stressLoad
        if (stressLoad != null && stressLoad > 7.0) baseCapacity -= baseCapacity * 0.1

        val totalCapacity = round1(max(0.0, baseCapacity))

        var committedEnergy = 0.0
        val routine = profile.routine
        if (routine != null && routine.isActive) {
            for (block in routine.blocks) {
                if (block.daysOfWeek.contains(dayOfWeek)) committedEnergy += block.energyCost ?: 0.0
            }
        }

        val datePrefix = targetDate.take(10)
        for (st in profile.scheduledTasks ?: emptyList()) {
            if (st.scheduledAt.startsWith(datePrefix) && st.status != "done") {
                committedEnergy += st.energyCost ?: 0.0
            }
        }

        committedEnergy = round1(committedEnergy)
        val availableEnergy = round1(max(0.0, totalCapacity - committedEnergy))

        return buildJsonObject {
            put("totalCapacity", totalCapacity)
            put("committedEnergy", committedEnergy)
            put("availableEnergy", availableEnergy)
            put("dayOfWeek", dayOfWeek)
        }.toString()
    }

    /**
     * Compute a 0–10 deadline pressure score from active tasks and goals.
     *
     * @param tasksJson           JSON array of AtlasTask
     * @param goalsJson           JSON array of AtlasGoal
     * @param taskCompletionRate  Completion rate 0–1 (default 0.5)
     * @return Score in [0, 10]
     */
    fun computeDeadlinePressureScore(tasksJson: String, goalsJson: String, taskCompletionRate: Double): Double {
        val tasks = json.decodeFromString<List<AtlasTask>>(tasksJson)
        val goals = json.decodeFromString<List<AtlasGoal>>(goalsJson)
        val nowMs = js("Date.now()") as Double
        val windowEnd = nowMs + 7.0 * 86400000.0

        val taskScores = tasks
            .filter { it.status != "done" && it.deadline != null }
            .map { t ->
                val dMs = try { Instant.parse(t.deadline!!).toEpochMilliseconds().toDouble() } catch (e: Exception) { null }
                val daysRemaining = if (dMs != null) (dMs - nowMs) / 86400000.0 else null
                val urgency = when {
                    daysRemaining == null -> 0.0
                    daysRemaining <= 0 -> 10.0
                    daysRemaining <= 1 -> 9.0
                    daysRemaining <= 3 -> 7.0
                    daysRemaining <= 7 -> 5.0
                    else -> 2.0
                }
                val energyWeight = (t.energyCost ?: 5.0) / 10.0
                val priorityMultiplier = if ((t.priority ?: 3) <= 2) 1.5 else 1.0
                urgency * energyWeight * priorityMultiplier
            }.sortedDescending()

        val taskAvg = if (taskScores.isEmpty()) 0.0 else taskScores.take(5).average()

        val goalScores = goals
            .filter { it.status == "active" && it.deadline != null }
            .map { g ->
                val dMs = try { Instant.parse(g.deadline!!).toEpochMilliseconds().toDouble() } catch (e: Exception) { null }
                val daysRemaining = if (dMs != null) (dMs - nowMs) / 86400000.0 else null
                if (daysRemaining == null) return@map 0.0
                val totalM = g.milestones.size
                val completedM = g.milestones.count { it.completed }
                val milestoneRatio = if (totalM > 0) completedM.toDouble() / totalM else (g.progressPercent ?: 0.0) / 100.0
                val velocityNeeded = (1.0 - milestoneRatio) / max(1.0, daysRemaining / 7.0)
                val goalRisk = max(0.0, velocityNeeded - taskCompletionRate) * 10.0
                val proximityMultiplier = if (daysRemaining <= 14.0) 1.5 else 1.0
                min(10.0, goalRisk) * proximityMultiplier
            }.sortedDescending()

        val goalAvg = if (goalScores.isEmpty()) 0.0 else goalScores.take(3).average()

        return round(min(10.0, max(0.0, taskAvg * 0.6 + goalAvg * 0.4)) * 10.0) / 10.0
    }
}
