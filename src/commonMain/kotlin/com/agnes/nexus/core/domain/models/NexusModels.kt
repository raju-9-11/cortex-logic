package com.agnes.nexus.core.domain.models

import com.agnes.nexus.core.domain.model.GlobalSoul
import com.agnes.nexus.core.domain.model.toGlobalSoul
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*
import kotlinx.datetime.Clock
import kotlinx.datetime.Instant

// ═══════════════════════════════════════════════
// Core Neural State Vector
// ═══════════════════════════════════════════════

@Serializable
data class NeuralStateVector(
    val biological: BiologicalState = BiologicalState(),
    val emotional: EmotionalState = EmotionalState(),
    val cognitive: CognitiveState = CognitiveState(),
    val planning: PlanningState = PlanningState(),
    val resource: ResourceState = ResourceState(),
    val lastUpdated: Map<String, String> = emptyMap(),
    /** Schema version for migration compatibility with TypeScript web layer. */
    val version: Int = 1
) {
    fun formatForPrompt(includeTrauma: Boolean = false): String {
        val lines = mutableListOf<String>()
        lines.add("[NEURAL STATE VECTOR]")

        biological.cnsFatigue?.let { lines.add("  CNS Fatigue: ${it}/10") }
        biological.sleepQuality?.let { lines.add("  Sleep Quality: ${it}/10") }
        biological.recoveryScore?.let { lines.add("  Recovery Score: ${it}/10") }
        biological.hormonalContext?.let { lines.add("  Hormonal Context: $it") }

        emotional.emotionalResilience?.let { lines.add("  Emotional Resilience: ${it}/10") }
        emotional.stressLoad?.let { lines.add("  Stress Load: ${it}/10") }
        emotional.moodTrend?.let { lines.add("  Mood Trend: $it") }
        if (includeTrauma && emotional.traumaMarkers.isNotEmpty()) {
            lines.add("  Trauma Markers: ${emotional.traumaMarkers.joinToString()}")
        }

        cognitive.energyBudget?.let { lines.add("  Energy Budget: ${it}/10") }
        cognitive.focusScore?.let { lines.add("  Focus Score: ${it}/10") }
        cognitive.activeLoad?.let { lines.add("  Active Load: ${it}/10") }
        cognitive.researchLoad?.let { lines.add("  Research Load: ${it}/10") }
        cognitive.planningLoad?.let { lines.add("  Planning Load: ${it}/10") }
        cognitive.taskCompletionRate?.let { lines.add("  Task Completion: ${(it * 100).toInt()}%") }
        cognitive.interestDiversity?.let { lines.add("  Interest Diversity: ${it}/10") }

        planning.streakHealth?.let { lines.add("  Habit Streak Health: ${it}/10") }
        planning.deadlinePressure?.let { lines.add("  Deadline Pressure: ${it}/10") }
        planning.reflectionStreak?.let { lines.add("  Reflection Streak: ${it}") }
        planning.goalAlignment?.let { lines.add("  Goal Alignment: ${it}/10") }
        planning.habitMomentum?.let { lines.add("  Habit Momentum: ${it}/10") }

        resource.financialFriction?.let { lines.add("  Financial Friction: ${it}/10") }
        resource.resonanceROI?.let { lines.add("  Resonance ROI: $it") }

        return if (lines.size > 1) lines.joinToString("\n") else ""
    }
}

@Serializable
data class BiologicalState(
    val cnsFatigue: Double? = null,
    val sleepQuality: Double? = null,
    val recoveryScore: Double? = null,
    val hormonalContext: String? = null,
    val aerobicLoad: Double? = null,
    val weight: Double? = null,
    val bodyFatPct: Double? = null,
    val heartRate: Double? = null,
    val hrv: Double? = null,
    /** Composite physical readiness score (0–100). Written by Soma compute_readiness action. */
    val readinessScore: Double? = null,
    /** Unix epoch timestamp of the last Soma/Titan session (ms). */
    val lastSessionTimestamp: Long? = null
)

@Serializable
data class EmotionalState(
    val emotionalResilience: Double? = null,
    val stressLoad: Double? = null,
    val moodTrend: String? = null,
    val traumaMarkers: List<String> = emptyList()
)

@Serializable
data class CognitiveState(
    val energyBudget: Double? = null,
    val focusScore: Double? = null,
    val activeLoad: Double? = null,
    val researchLoad: Double? = null,
    val planningLoad: Double? = null,
    val taskCompletionRate: Double? = null,
    val interestDiversity: Double? = null,
    val researchDepth: Double? = null
)

@Serializable
data class PlanningState(
    /**
     * Composite habit streak health (0-10). Ported from web NSV planning domain.
     */
    val streakHealth: Double? = null,
    /**
     * Urgency pressure from nearest deadlines (0-10). Ported from web NSV planning domain.
     */
    val deadlinePressure: Double? = null,
    /**
     * Daily consecutive journal entries (Sprint-B style). Used by Atlas journal logic.
     */
    val reflectionStreak: Int? = null,
    /**
     * Proportion of active goals with at least one linked task (0-1).
     */
    val goalAlignment: Double? = null,
    /**
     * Ratio of active habits with streak > 0 (0-1).
     */
    val habitMomentum: Double? = null
)

@Serializable
data class ResourceState(
    val financialFriction: Double? = null,
    val resonanceROI: Double? = null,
    /** Ledger-owned: composite automation health score (0-10). */
    val automationHealthScore: Double? = null,
    /** Ledger-owned: estimated days until cash flow goes negative. */
    val cashFlowRunwayDays: Double? = null
)

// ═══════════════════════════════════════════════
// Global Soul & Identity
// ═══════════════════════════════════════════════

@Serializable
data class GlobalProjection(
    val lastSync: String = "",
    val overallWellnessScore: Double? = null,
    val displayNames: Map<String, String> = emptyMap(),
    val agentGenders: Map<String, String> = emptyMap(),
    val crossFunctionalState: NeuralStateVector = NeuralStateVector(),
    val compactedInsights: List<String> = emptyList(),
    val therapeuticBaseline: TherapeuticBaseline? = null
)

@Serializable
data class TherapeuticBaseline(
    val isInitialized: Boolean = false,
    val initializedAt: String? = null
)

/**
 * Canonical accessor used during Phase 2 convergence.
 * `crossFunctionalState` remains the persisted field name for compatibility.
 */
val GlobalProjection.neuralStateVector: NeuralStateVector
    get() = crossFunctionalState

fun GlobalProjection.withNeuralStateVector(neuralStateVector: NeuralStateVector): GlobalProjection =
    copy(crossFunctionalState = neuralStateVector)

fun GlobalProjection.deriveGlobalSoul(
    autopilotLevel: Int = 0,
    lastSomaSyncAt: Long? = null,
    now: Long = Clock.System.now().toEpochMilliseconds()
): GlobalSoul {
    val effectiveLastSomaSyncAt = lastSomaSyncAt ?: neuralStateVector.lastBiologicalSyncAtEpochMillis()
    return neuralStateVector.toGlobalSoul(
        autopilotLevel = autopilotLevel,
        lastSomaSyncAt = effectiveLastSomaSyncAt,
        now = now
    )
}

fun NeuralStateVector.lastBiologicalSyncAtEpochMillis(): Long? =
    lastUpdated
        .filterKeys { key -> key == "biological" || key.startsWith("biological.") }
        .values
        .mapNotNull { raw ->
            runCatching { Instant.parse(raw).toEpochMilliseconds() }.getOrNull()
        }
        .maxOrNull()

fun kotlinx.serialization.json.JsonObject.toMap(): Map<String, Any?> {
    return entries.associate { (key, value) ->
        key to jsonElementToAny(value)
    }
}

private fun jsonElementToAny(value: kotlinx.serialization.json.JsonElement): Any? {
    return when (value) {
        is kotlinx.serialization.json.JsonPrimitive -> {
            // toString() returns the canonical JSON representation:
            //   "\"hello\""  for string primitives (starts with '"')
            //   "42.5"       for number primitives
            //   "true/false" for booleans
            //   "null"       for null
            // We use this to distinguish types because JsonPrimitive.content can return
            // a JS Number (not a String) in Kotlin/JS IR for numeric-content string fields.
            val repr = value.toString()
            when {
                repr == "null"         -> null
                repr == "true"         -> true
                repr == "false"        -> false
                repr.startsWith("\"") ->
                    // Strip outer JSON quotes and unescape — avoids calling .content which
                    // may return a JS Number in Kotlin/JS IR for numeric-content strings.
                    repr.substring(1, repr.length - 1)
                        .replace("\\\"", "\"")
                        .replace("\\\\", "\\")
                else -> value.doubleOrNull ?: value.content
            }
        }
        is kotlinx.serialization.json.JsonObject -> value.toMap()
        is kotlinx.serialization.json.JsonArray -> value.map { jsonElementToAny(it) }
        else -> value.toString()
    }
}

@Serializable
data class CoreUserProfile(
    val userId: String,
    val email: String,
    val preferredName: String? = null,
    val name: String? = null,
    val pronouns: String? = null,
    val occupation: String? = null,
    val typicalSleepHours: Double? = null,
    val sleepStartHour: Int = 22,
    val sleepEndHour: Int = 7,
    val age: Int? = null,
    val assignedSexAtBirth: String? = null,
    val genderIdentity: String? = null,
    val profilePhotoUrl: String? = null,
    val isOnboarded: Boolean = false,
    val onboardingComplete: Boolean = false,
    val schemaVersion: Int = 1,
    val agentPersonalityProvision: AgentPersonalityProvision = AgentPersonalityProvision(),
    val createdAt: String = "",
    val updatedAt: String = ""
)

@Serializable
data class AuthUser(
    val uid: String,
    val email: String? = null,
    val displayName: String? = null,
    val isAuthenticated: Boolean = false,
    val isGuest: Boolean = false
)

// ═══════════════════════════════════════════════
// Chat & AI Engine
// ═══════════════════════════════════════════════

@Serializable
data class Message(
    val id: String = "",
    val role: MessageRole,
    val content: String,
    val internalThoughts: String? = null,
    val actions: List<ActionCall> = emptyList(),
    val model: String? = null,
    val tokensUsed: Int? = null,
    val timestamp: Long = 0
)

@Serializable
enum class MessageRole { 
    @SerialName("system") SYSTEM, 
    @SerialName("user") USER, 
    @SerialName("assistant") ASSISTANT, 
    @SerialName("tool") TOOL 
}

@Serializable
data class ConversationContext(
    val systemPrompt: String = "",
    val history: List<Message> = emptyList(),
    val insights: String = "",
    val summary: String = ""
)

@Serializable
data class ActionCall(
    val type: String,
    val payload: JsonObject,
    val userId: String? = null,
    val moduleId: String? = null,
    val encryptionKey: String? = null
)

@Serializable
data class Persona(
    val id: String,
    val name: String,
    val alias: String,
    val systemPrompt: String,
    val model: String = "google/gemini-2.0-flash-001",
    val temperature: Double = 0.7
)

// ═══════════════════════════════════════════════
// Deterministic Insights
// ═══════════════════════════════════════════════

@Serializable
enum class EmotionalRiskLevel { LOW, MODERATE, HIGH, CRITICAL, UNKNOWN }

@Serializable
enum class EmotionalTrendLabel { IMPROVING, STABLE, DECLINING, VOLATILE, UNKNOWN }

@Serializable
data class TherapyDeterministicInsight(
    val resilienceScore: Double?,
    val stressLoadScore: Double?,
    val moodTrend: String?,
    val traumaMarkerCount: Int,
    val riskLevel: EmotionalRiskLevel,
    val trendLabel: EmotionalTrendLabel,
    val summary: String,
    val rationale: List<String>
)

@Serializable
enum class TrainingLoadFlag { UNDERLOADED, BALANCED, OVERREACHED, UNKNOWN }

@Serializable
enum class RecoveryFlag { RECOVERY_OK, WATCH, HIGH_RISK, UNKNOWN }

@Serializable
data class TrainerDeterministicInsight(
    val workoutsPerWeek: Int?,
    val plannedSessionDays: Int,
    val estimatedWeeklySessions: Int?,
    val sleepHours: Double?,
    val injuryCount: Int,
    val yearsTraining: Int?,
    val trainingLoadFlag: TrainingLoadFlag,
    val recoveryFlag: RecoveryFlag,
    val summary: String,
    val rationale: List<String>
)

@Serializable
enum class CashflowHealth { SURPLUS, TIGHT, DEFICIT, UNKNOWN }

@Serializable
enum class SavingsPressureLevel { LOW, MODERATE, HIGH, CRITICAL, UNKNOWN }

@Serializable
enum class DebtLoadLevel { LOW, MODERATE, HIGH, SEVERE, UNKNOWN }

@Serializable
data class LedgerDeterministicInsight(
    val monthlyIncome: Double,
    val totalExpenses: Double,
    val netBalance: Double,
    val debtTotal: Double,
    val debtToIncomeRatio: Double?,
    val monthlySavingsTarget: Double,
    val cashflowHealth: CashflowHealth,
    val savingsPressureLevel: SavingsPressureLevel,
    val debtLoadLevel: DebtLoadLevel,
    val resonanceROI: Double? = null,
    val summary: String,
    val rationale: List<String>
)

// ═══════════════════════════════════════════════
// Module Profiles
// ═══════════════════════════════════════════════

@Serializable
enum class GenderPersonality {
    @SerialName("female")
    FEMALE,
    @SerialName("male")
    MALE,
    @SerialName("non-binary")
    NON_BINARY,
    @SerialName("gender-fluid")
    GENDER_FLUID
}

@Serializable
data class PersonaOverlay(
    val tone: String? = null,
    val style: String? = null
)

@Serializable
data class AgentPersonalityProvision(
    val orchestratorAlias: String = "Nexus",
    val moduleAliases: Map<String, String> = emptyMap(),
    val agentGenders: Map<String, GenderPersonality> = emptyMap(),
    val personaOverlays: Map<String, PersonaOverlay> = emptyMap(),
    // Legacy compatibility
    val agentAliases: Map<String, String> = emptyMap(),
    val systemPersonality: String = "default"
)

@Serializable
data class UserSecurityPreferences(
    val vaultLocks: Map<String, Boolean> = emptyMap(),
    val persistenceMode: String = "SESSION"
)

// --- Titan ---

@Serializable
data class TitanReminderEntry(
    val id: String = "",
    val dayOfWeek: Int = 1, // 1=Mon..7=Sun
    val hour: Int = 8,
    val minute: Int = 0,
    val label: String = ""
)

@Serializable
data class TrainerProfile(
    val onboardingComplete: Boolean = false,
    val privacyLevel: String = "basic",
    val trackingLevel: String = "standard",
    val nutrition: TitanNutrition = TitanNutrition(),
    val activity: TitanActivity = TitanActivity(),
    val history: TitanHistory = TitanHistory(),
    val summary: String = "",
    val lastSessionSummary: String? = null,
    val routines: List<Routine> = emptyList(),
    val sleepLog: List<SleepEntry>? = null,
    val cycles: List<CycleEntry>? = null,
    val workoutSessions: List<WorkoutSession>? = null,
    val personalRecords: Map<String, PersonalRecord>? = null,
    val bodyWeightLog: List<BodyWeightEntry>? = null,
    val bodyFatLog: List<BodyFatEntry>? = null,
    val cardioLog: List<CardioSession>? = null,
    val injuryLog: List<TitanInjury>? = null,
    val supplementLog: List<SupplementEntry>? = null,
    val mealLog: List<MealEntry>? = null,
    val macroLog: List<DailyMacroLog>? = null,
    val plannedWorkouts: List<PlannedWorkout>? = null,
    val directWriteMode: Boolean = false,
    val customFields: List<TitanCustomField>? = null,
    val medicalOnboardingComplete: Boolean? = null,
    val knownConditions: List<String> = emptyList(),
    val medications: List<String> = emptyList(),
    val allergies: List<String> = emptyList(),
    val biomarkers: List<BiomarkerRecord> = emptyList(),
    val labSummaries: List<LabSummaryRecord> = emptyList(),
    val clearances: List<ClearanceRecord> = emptyList(),
    val medicalImageAnalyses: List<MedicalImageAnalysis> = emptyList(),
    val medicalSummary: String? = null,
    val extensibility: ModuleProfileExtensibility = ModuleProfileExtensibility(),
    val reminders: List<TitanReminderEntry> = emptyList(),
    val coachReviewEnabled: Boolean = false,
    val cnsLoadIndex: Float = 0.0f,           // Normalized CNS fatigue (0.0-1.0)
    val clearanceStatusValue: String = "CLEARED", // "CLEARED", "RESTRICTED", "REVOKED"
    val clearanceOverrides: List<TitanClearanceOverrideRecord> = emptyList(),
    val systemDebts: List<TitanSystemDebtRecord> = emptyList(),
    val createdAt: String = "",
    val updatedAt: String = ""
)

@Serializable
data class MacroEstimate(
    val calories: Int? = null,
    val protein: Int? = null,
    val carbs: Int? = null,
    val fat: Int? = null,
    val source: String? = null
)

@Serializable
data class Supplement(
    val name: String,
    val category: String? = null,
    val dosage: String? = null,
    val frequency: String? = null
)

@Serializable
data class TitanNutrition(
    val dailyCalories: Int? = null,
    val proteinGrams: Int? = null,
    val dietaryPreference: String? = null,
    val macroEstimate: MacroEstimate? = null,
    val dietNotes: String? = null,
    val mealsPerDay: Int? = null,
    val supplements: List<Supplement> = emptyList()
)

@Serializable
data class TitanActivity(
    val weeklyTrainingDays: Int = 0,
    val workoutsPerWeek: Int? = null,
    val primarySport: String? = null,
    val trainingLevel: String = "beginner",
    val baselineWeight: Double? = null,
    val baselineHeight: Double? = null,
    val activityLevel: String? = null,
    val sleepHours: Double? = null,
    val dayToDayNotes: String? = null,
    val recoveryNotes: String? = null,
    val occupation: String? = null
)

@Serializable
data class TitanHistory(
    val yearsTraining: Int = 0,
    val injuryHistory: List<String> = emptyList(),
    val surgeryHistory: List<String> = emptyList(),
    val injuries: List<String> = emptyList(),
    val goals: List<String> = emptyList(),
    val bodyGoals: String? = null
)

@Serializable
data class Routine(
    val id: String? = null,
    val name: String = "",
    val weekdays: List<String> = emptyList(),
    val weekday: String? = null,
    val timeframe: String? = null,
    val status: String = "active",
    val rationale: String? = null,
    val exercises: List<Exercise> = emptyList()
)

@Serializable
data class Exercise(
    val name: String = "",
    val sets: Int? = null,
    val reps: String? = null,
    val notes: String? = null,
    val rpe: Int? = null
)

// --- Spec-compliant Movement (non-rigid tag-based model) ---

@Serializable
enum class VolumeType { WEIGHT_REPS, TIME, DISTANCE }

/**
 * Tag-based movement definition used by the Biomechanical Engine.
 *
 * demandTags classify CNS/metabolic cost (e.g. "cns_heavy", "axial_loading",
 * "lower_body") so the Orchestrator can predict bandwidth + vitality drain.
 *
 * soulImpact maps GlobalSoul vector names to per-set deltas (e.g. "output" → +0.4,
 * "vitality" → -0.2); summed across the session to build the workout SpineEvent.
 */
@Serializable
data class Movement(
    val id: String,
    val label: String,                          // e.g. "Back Squats"
    val demandTags: List<String> = emptyList(), // ["cns_heavy", "lower_body", "axial_loading"]
    val volumeType: VolumeType = VolumeType.WEIGHT_REPS,
    val soulImpact: Map<String, Float> = emptyMap() // GlobalSoul vector → delta per set
)

// --- Titan workout / session / progress (parity with web TitanProfile) ---

@Serializable
data class ExerciseSet(
    val setNumber: Int = 0,
    val weight: Double? = null,
    val repsCompleted: Int = 0,
    val completed: Boolean = false,
    val notes: String? = null,
    val rpe: Int? = null,
    val rir: Int? = null
)

@Serializable
data class ExerciseLog(
    val exerciseName: String = "",
    val plannedSets: Int = 0,
    val plannedReps: String = "—",
    val sets: List<ExerciseSet> = emptyList()
)

@Serializable
data class WorkoutSession(
    val id: String = "",
    val routineId: String = "",
    val routineName: String = "",
    val date: String = "",
    val startedAt: String = "",
    val completedAt: String? = null,
    val exercises: List<ExerciseLog> = emptyList(),
    val totalVolume: Int? = null,
    val rpe: Int? = null,
    val notes: String? = null,
    val status: String = "completed" // completed | partial | abandoned
)

@Serializable
data class PersonalRecord(
    val exerciseName: String = "",
    val maxWeight: Double = 0.0,
    val repsAtMax: Int = 0,
    val e1RM: Double = 0.0,
    val achievedDate: String = "",
    val sessionId: String = ""
)

@Serializable
data class SleepEntry(
    val id: String = "",
    val date: String = "",
    val bedtime: String? = null,
    val wakeTime: String? = null,
    val durationHours: Double = 7.0,
    val quality: Int = 5,
    val deepSleepPct: Double? = null,
    val remSleepPct: Double? = null,
    val awakenings: Int? = null,
    val notes: String? = null,
    val tags: List<String>? = null,
    val recordedAt: String = ""
)

@Serializable
data class CyclePhase(
    val id: String = "",
    val name: String = "",
    val durationDays: Int = 7,
    val notes: String? = null,
    val dosage: String? = null,
    val trainingModifier: String? = null // increase | maintain | reduce | rest
)

@Serializable
data class CycleEntry(
    val id: String = "",
    val name: String = "",
    val type: String = "workout", // workout | recovery | custom
    val description: String? = null,
    val startDate: String = "",
    val endDate: String? = null,
    val phases: List<CyclePhase> = emptyList(),
    val currentPhaseIndex: Int = 0,
    val currentPhaseStartDate: String = "",
    val status: String = "active", // active | completed | paused
    val notes: String? = null,
    val cycleLength: Int? = null,
    val lastPeriodDate: String? = null,
    val linkedRoutineIds: List<String>? = null,
    val deloadWeekNumber: Int? = null,
    val progressionScheme: String? = null,
    val createdAt: String = "",
    val updatedAt: String = ""
)

@Serializable
data class BodyWeightMeasurements(
    val waist: Double? = null,
    val hips: Double? = null,
    val chest: Double? = null,
    val leftArm: Double? = null,
    val rightArm: Double? = null,
    val leftLeg: Double? = null,
    val rightLeg: Double? = null
)

@Serializable
data class BodyWeightEntry(
    val id: String = "",
    val date: String = "",
    val weight: Double = 0.0,
    val bodyFatPct: Double? = null,
    val measurements: BodyWeightMeasurements? = null,
    val notes: String? = null,
    val recordedAt: String = ""
)

@Serializable
data class CardioSession(
    val id: String = "",
    val date: String = "",
    val type: String = "other", // run | bike | swim | row | hike | elliptical | jump_rope | other
    val durationMinutes: Int = 0,
    val distanceKm: Double? = null,
    val avgHeartRate: Int? = null,
    val calories: Int? = null,
    val notes: String? = null,
    val rpe: Int? = null,
    val status: String = "completed",
    val recordedAt: String = ""
)

@Serializable
data class BodyFatEntry(
    val id: String = "",
    val date: String = "",
    val bodyFatPct: Double = 0.0,   // 3.0–60.0
    val method: String? = null,     // "dexa" | "caliper" | "impedance" | "estimate"
    val notes: String? = null,
    val recordedAt: String = ""
)

@Serializable
data class TitanInjury(
    val id: String = "",
    val bodyPart: String = "",
    val description: String = "",
    val severity: String = "mild",  // "mild" | "moderate" | "severe"
    val status: String = "active",  // "active" | "monitoring" | "resolved"
    val dateReported: String = "",
    val resolvedAt: String? = null,
    val notes: String? = null,
    val recordedAt: String = "",
    val affectedExercises: List<String> = emptyList()
)

@Serializable
data class SupplementEntry(
    val id: String = "",
    val name: String = "",
    val dosage: String? = null,
    val timing: String? = null,     // "pre_workout" | "post_workout" | "morning" | "night"
    val unit: String? = null,
    val notes: String? = null,
    val loggedAt: String = ""
)

@Serializable
data class MealEntry(
    val id: String = "",
    val name: String = "",
    val mealType: String? = null,   // "breakfast" | "lunch" | "dinner" | "snack"
    val calories: Int? = null,
    val protein: Double? = null,
    val carbs: Double? = null,
    val fat: Double? = null,
    val date: String = "",
    val notes: String? = null,
    val loggedAt: String = ""
)

@Serializable
data class DailyMacroLog(
    val id: String = "",
    val date: String = "",
    val calories: Double? = null,
    val protein: Double? = null,
    val carbs: Double? = null,
    val fat: Double? = null,
    val proteinG: Double? = null,
    val carbsG: Double? = null,
    val fatG: Double? = null,
    val fiberG: Double? = null,
    val meals: List<MealEntry> = emptyList(),
    val notes: String? = null,
    val loggedAt: String = ""
)

@Serializable
data class PlannedWorkout(
    val id: String = "",
    val date: String = "",            // ISO YYYY-MM-DD
    val routineName: String = "",
    val exerciseNames: List<String>? = null,
    val notes: String? = null,
    val status: String = "planned",   // "planned" | "completed" | "skipped"
    val createdAt: String = ""
)

@Serializable
data class TitanCustomField(
    val id: String = "",
    val name: String = "",
    val type: String = "number", // number | text | boolean | select
    val unit: String? = null,
    val description: String? = null,
    val range: List<Double>? = null, // [min, max]
    val options: List<String>? = null,
    val createdAt: Long = 0L
)

@Serializable
data class AgentReview(
    /** Current review lifecycle state for the health entry. */
    val status: String = "pending_review",
    /** Human-readable reasoning or note left by the agent. */
    val agentNote: String? = null,
    /**
     * Agent's proposed replacement value.
     * Typed as JsonElement to support either scalar strings or numbers.
     */
    val suggestedValue: JsonElement? = null,
    /** ISO-8601 timestamp of when the agent completed its review. */
    val reviewedAt: String? = null
)

@Serializable
data class BiomarkerRecord(
    val id: String = "",
    val name: String = "",
    val value: String = "",
    val unit: String? = null,
    val source: String? = null,
    val recordedAt: String = "",
    val agentReview: AgentReview? = null
)

@Serializable
data class LabSummaryRecord(
    val id: String = "",
    val panel: String = "",
    val findings: List<String> = emptyList(),
    val flags: List<String> = emptyList(),
    val recordedAt: String = ""
)

@Serializable
data class ClearanceRecord(
    val id: String = "",
    val activity: String = "",
    val status: String = "conditional",
    val reason: String = "",
    val issuedAt: String = ""
)

@Serializable
data class TitanClearanceOverrideRecord(
    val id: String = "",
    val activity: String = "",
    val clearanceStatus: String = "",
    val reason: String = "",
    val createdAt: String = "",
    val sourceClearanceId: String? = null,
    val systemDebtId: String = "",
    val note: String? = null
)

@Serializable
data class TitanSystemDebtRecord(
    val id: String = "",
    val kind: String = "",
    val activity: String = "",
    val status: String = "active",
    val createdAt: String = "",
    val resolvedAt: String? = null,
    val reason: String = "",
    val clearanceStatus: String = "",
    val overrideId: String = "",
    val consequenceSummary: String = "",
    val vectorImpactVitality: Float = 0f,
    val vectorImpactOutput: Float = 0f,
    val vectorImpactFriction: Float = 0f
)

@Serializable
data class MedicalImageAnalysis(
    val id: String = "",
    val analyzedAt: String = "",
    val reportType: String = "",
    val sourceLabel: String = "",
    val biomarkerCount: Int = 0,
    val clinicalFlags: List<ClinicalFlag> = emptyList()
)

@Serializable
data class SomaProfile(
    val id: String? = null,
    val userId: String? = null,
    val knownConditions: List<String> = emptyList(),
    val medications: List<String> = emptyList(),
    val allergies: List<String> = emptyList(),
    val medicalOnboardingComplete: Boolean? = false,
    val biomarkers: List<BiomarkerRecord> = emptyList(),
    val labSummaries: List<LabSummaryRecord> = emptyList(),
    val clearances: List<ClearanceRecord> = emptyList(),
    val medicalImageAnalyses: List<MedicalImageAnalysis> = emptyList(),
    val vitalReadings: List<VitalReading> = emptyList(),
    val physicalAssessments: List<PhysicalAssessment> = emptyList(),
    val medicalSummary: String? = null,
    val readinessScore: Int? = null,
    val extensibility: ModuleProfileExtensibility = ModuleProfileExtensibility(),
    val lastSomaSyncAt: Long? = null,           // Epoch ms of last Soma sync (drives stale flag)
    val patientFirewallEnabled: Boolean = true,  // Whether to enforce patient scope
    val diagnosisDocuments: List<DiagnosisDocumentData> = emptyList(),
    val restingHeartRate: Double? = null,
    val sleepHours: Double? = null,
    val sleepQuality: Double? = null,
    val energyLevel: Double? = null,
    val stressPhysical: Double? = null,
    val clearanceStatus: String? = null,
    val createdAt: String = "",
    val updatedAt: String = ""
) {
    val criticalMarkers: List<BiomarkerRecord> get() = biomarkers.filter {
        it.value.toDoubleOrNull()?.let { value -> value > 100.0 } == true
    }
}

@Serializable
data class DiagnosisDocumentData(
    val id: String = "",
    val type: String = "REPORT",      // "XRAY", "BLOODWORK", "REPORT", "PRESCRIPTION", "IMAGE"
    val fileRef: String = "",
    val fileName: String = "",
    val parsedSummary: String? = null,
    val patientScope: String = "USER", // "USER" or "GUEST"
    val uploadedAt: Long = 0L,
    val analysedAt: Long? = null
)

@Serializable
data class VitalReading(
    val timestamp: Long = 0,
    val heartRate: Double? = null,
    val bloodPressure: String? = null,
    val temperature: Double? = null,
    val spo2: Double? = null,
    val weight: Double? = null
)

@Serializable
data class PhysicalAssessment(
    val timestamp: Long = 0,
    val height: Double? = null,
    val weight: Double? = null,
    val bmi: Double? = null
)

@Serializable
data class ClinicalFlag(
    val flag: String = "",
    val severity: String = ""
)

// --- Atlas ---

@Serializable
data class AtlasProfile(
    val onboardingComplete: Boolean = false,
    val energyWave: List<EnergyWavePoint> = emptyList(),
    val recoveryWindows: List<RecoveryWindow> = emptyList(),
    val taskGraph: List<AtlasTaskNode> = emptyList(),
    val flattenedUntil: String? = null,
    val summary: String = "",
    val scheduledTasks: List<ScheduledTask> = emptyList(),
    val dailyIntentions: List<DailyIntention> = emptyList(),
    val habitRecords: List<HabitRecord> = emptyList(),
    val tasks: List<AtlasTask> = emptyList(),
    val goals: List<AtlasGoal> = emptyList(),
    val projects: List<AtlasProject> = emptyList(),
    val habits: List<AtlasHabit> = emptyList(),
    val routine: AtlasRoutine = AtlasRoutine(),
    val reviews: List<TemporalReview> = emptyList(),
    val dailyCheckIns: List<DailyCheckInEntry> = emptyList(),
    val plannerItems: List<AtlasPlannerItem> = emptyList(),
    val journalEntries: List<AtlasJournalEntry> = emptyList(),
    val reminderPreferences: AtlasReminderPreferences = AtlasReminderPreferences(),
    val focusModeActive: Boolean = false,
    val focusModeDurationMinutes: Int = 25,
    val focusModeRemainingSeconds: Int = 25 * 60,
    val focusModeStartedAt: String? = null,
    val preferences: AtlasPreferences? = null,
    val dailyBandwidthCapacity: Float? = null,  // Normalized 0.0-1.0, synced from Soma vitality
    val scheduledLoad: Float = 0.0f,            // Sum of task cognitive weights for today
    val preferenceMode: String? = null,
    val fieldValues: Map<String, String>? = null,
    val createdAt: String = "",
    val updatedAt: String = ""
)

@Serializable
data class RoutineBlock(
    val id: String = "",
    val title: String = "",
    val startTime: String = "",
    val endTime: String = "",
    val daysOfWeek: List<Int> = emptyList(),
    val category: String = "other",
    val energyCost: Int = 0,
    val status: String = "active",
    val tags: List<String> = emptyList()
)

@Serializable
data class AtlasRoutine(
    val id: String = "routine_default",
    val blocks: List<RoutineBlock> = emptyList(),
    val isActive: Boolean = true,
    val status: String = "active"
)

@Serializable
data class EnergyWavePoint(
    val id: String = "",
    val slot: String = "",
    val energy: Double = 0.0,
    val focus: Double = 0.0,
    val load: Double = 0.0
)

@Serializable
data class RecoveryWindow(
    val id: String = "",
    val title: String = "",
    val start: String = "",
    val end: String = "",
    val reason: String = "",
    val status: String = "planned"
)

@Serializable
data class AtlasTaskNode(
    val id: String = "",
    val title: String = "",
    val energyCost: Int = 0,
    val status: String = "queued",
    val dependencies: List<String>? = null
)

@Serializable
data class ScheduledTask(
    val id: String = "",
    val title: String = "",
    val energyCost: Int = 0,
    val focusCost: Int = 0,
    val scheduledAt: String = "",
    val duration: Int = 0,
    val category: String = "other",
    val status: String = "scheduled",
    val dependencies: List<String>? = null,
    val blockedBy: String? = null,
    val deferredFrom: String? = null,
    val createdAt: String = ""
)

@Serializable
data class DailyIntention(
    val id: String = "",
    val date: String = "",
    val theme: String = "",
    val focusDomain: String = "",
    val energyTarget: Int = 0,
    val createdAt: String = ""
)

@Serializable
data class HabitRecord(
    val id: String = "",
    val habitId: String = "",
    val name: String = "",
    val completed: Boolean = false,
    val streak: Int = 0,
    val loggedAt: String = ""
)

@Serializable
data class AtlasTask(
    val id: String = "",
    val title: String = "",
    val description: String? = null,
    val deadline: String? = null,
    val priority: Int = 3,
    val energyCost: Int = 0,
    val status: String = "queued",
    val dependencies: List<String> = emptyList(),
    val projectId: String? = null,
    val goalId: String? = null,
    val notes: String? = null,
    val completedAt: String? = null,
    val actualEnergyCost: Int? = null,
    val tags: List<String>? = null,
    val recurrenceRule: String? = null,
    val scheduledSlot: String? = null,
    val nextOccurrenceDate: String? = null,
    val deferCount: Int = 0,  // Anti-Snowplow: auto-archives at 3 deferrals
    val createdAt: String = "",
    val updatedAt: String = ""
)

@Serializable
data class AtlasMilestone(
    val id: String = "",
    val title: String = "",
    val dueDate: String? = null,
    val completed: Boolean = false,
    val completedAt: String? = null
)

@Serializable
data class AtlasGoal(
    val id: String = "",
    val title: String = "",
    val description: String? = null,
    val deadline: String? = null,
    val milestones: List<AtlasMilestone> = emptyList(),
    val associatedTaskIds: List<String> = emptyList(),
    val successCriteria: String = "",
    val progressPercent: Float = 0f,
    val status: String = "active",
    val tags: List<String>? = null,
    val notes: String? = null,
    val createdAt: String = "",
    val updatedAt: String = ""
)

@Serializable
data class AtlasHabit(
    val id: String = "",
    val title: String = "",
    val type: String? = null,
    val frequency: String = "daily",
    val customDays: List<Int>? = null,
    val targetStreak: Int = 0,
    val currentStreak: Int = 0,
    val bestStreak: Int = 0,
    val lastCompleted: String? = null,
    val energyCost: Int = 0,
    val minimumViableVersion: String = "",
    val status: String = "active",
    val pauseReason: String? = null,
    val pausedAt: String? = null,
    val resumeDate: String? = null,
    val metricValue: Int? = null,
    val logs: List<HabitLogEntry>? = null,
    val completionLog: List<String>? = null,
    val tags: List<String>? = null,
    val createdAt: String = "",
    val updatedAt: String = ""
)

@Serializable
data class AtlasPlannerItem(
    val id: String = "",
    val title: String = "",
    val type: String = "task",
    val date: String = "",
    val startTime: String? = null,
    val endTime: String? = null,
    val status: String = "planned",
    val goalId: String? = null,
    val habitId: String? = null,
    val notes: String? = null,
    val tags: List<String> = emptyList(),
    val createdAt: String = "",
    val updatedAt: String = ""
)

@Serializable
data class AtlasJournalStructuredEntry(
    val intention: String = "",
    val achievement: String = "",
    val friction: String = "",
    val feelingsReflection: String = ""
)

@Serializable
data class AtlasJournalEntry(
    val id: String = "",
    val date: String = "",
    val mode: String = "free",
    val freeText: String? = null,
    val structured: AtlasJournalStructuredEntry? = null,
    val emojiRating: Int = 3,
    val reflectiveTone: String = "cheerful",
    val reflectivePrompt: String = "",
    val tags: List<String> = emptyList(),
    val createdAt: String = "",
    val updatedAt: String = ""
)

@Serializable
data class AtlasReminderPreferences(
    val taskCheckInEnabled: Boolean = true,
    val journalTimeEnabled: Boolean = true,
    val weeklyReviewEnabled: Boolean = true
)

@Serializable
data class HabitLogEntry(
    val date: String = "",
    val value: String = "",
    val notes: String? = null
)

@Serializable
data class AtlasProject(
    val id: String = "",
    val title: String = "",
    val description: String? = null,
    val status: String = "active",
    val goalId: String? = null,
    val taskIds: List<String> = emptyList(),
    val deadline: String? = null,
    val notes: String? = null,
    val tags: List<String>? = null,
    val createdAt: String = "",
    val updatedAt: String = ""
)

@Serializable
data class HabitWeekSummary(
    val habitId: String = "",
    val habitTitle: String = "",
    val streak: Int = 0,
    val completions: Int = 0,
    val status: String = "active"
)

@Serializable
data class GoalWeekProgress(
    val goalId: String = "",
    val goalTitle: String = "",
    val progressPercent: Int = 0,
    val milestonesCompleted: Int = 0,
    val milestonesTotal: Int = 0
)

@Serializable
data class TemporalReview(
    val id: String = "",
    val scope: String = "weekly",
    val periodStart: String = "",
    val periodEnd: String = "",
    val completionRate: Int = 0,
    val totalScheduled: Int = 0,
    val totalCompleted: Int = 0,
    val habitSummary: List<HabitWeekSummary> = emptyList(),
    val goalProgress: List<GoalWeekProgress> = emptyList(),
    val nsvTrend: NsvTrend = NsvTrend(),
    val insights: List<String> = emptyList(),
    val driftScore: Int? = null,
    val nextPeriodFocus: String = "",
    val notes: String? = null,
    val createdAt: String = ""
)

@Serializable
data class NsvTrend(
    val energyBudgetAvg: Int = 0,
    val resilienceTrend: String = "stable",
    val focusScoreAvg: Int = 0
)

@Serializable
data class AtlasPreferences(
    val timezone: String = "",
    val wakeTime: String = "",
    val sleepTime: String = "",
    val peakEnergyStart: String = "",
    val peakEnergyEnd: String = "",
    val workStyle: String = "deep_blocks",
    val planningHorizon: String = "week",
    val recoveryPreference: String = "moderate"
)

@Serializable
data class DailyCheckInEntry(
    val date: String = "",
    val tasksCompleted: Int = 0,
    val totalTasks: Int = 0,
    val energyLevel: Int = 0,
    val blockers: String = "",
    val loggedAt: String = ""
)

// --- Ledger ---

@Serializable
enum class DebtType { CREDIT_CARD, STUDENT_LOAN, MORTGAGE, AUTO, PERSONAL, MEDICAL, OTHER }

@Serializable
data class DebtItem(
    val id: String = "",
    val name: String = "",
    val balance: Double = 0.0,
    val apr: Double? = null,
    val minPayment: Double? = null,
    val type: DebtType? = null,
    val dueDay: Int? = null,
    val variableRate: Boolean = false
)

@Serializable
data class LedgerProfile(
    val onboardingComplete: Boolean = false,
    val lastSessionSummary: String? = null,
    /**
     * Ledger onboarding summary (parity with web guided intake).
     * Stored separately from `lastSessionSummary` which is session-end feedback.
     */
    val summary: String = "",
    val monthlyIncome: Double = 0.0,
    val currency: String? = null,
    val fixedExpenses: List<LedgerExpense> = emptyList(),
    val variableExpenses: List<LedgerExpense> = emptyList(),
    val debtItems: List<DebtItem> = emptyList(),
    /** Planning horizon selection from onboarding. */
    val planningHorizon: String = "monthly",
    val plans: List<LedgerPlan> = emptyList(),
    val financialPlans: List<LegacyFinancialPlan> = emptyList(),
    val activePlanId: String? = null,
    val resonanceROI: Float? = null,
    val financialFriction: Float? = null,
    val transactions: List<LedgerTransaction> = emptyList(),
    val budgetCategories: List<LedgerBudgetCategory> = emptyList(),
    val financialGoals: List<LedgerFinancialGoal> = emptyList(),
    val extensibility: ModuleProfileExtensibility = ModuleProfileExtensibility(),
    val runwayDays: Float? = null,             // Days of survival = liquidAssets / dailyBurnRate
    val resonanceSwipes: List<ResonanceSwipeData> = emptyList(),
    val taxSummaryJson: String? = null,         // Serialized TaxSummary JSON
    val createdAt: String = "",
    val updatedAt: String = ""
)

@Serializable
data class ResonanceSwipeData(
    val id: String = "",
    val amount: Float = 0f,
    val currency: String = "USD",
    val resonanceScore: Float = 0f,  // -1.0 to +1.0
    val category: String? = null,
    val description: String? = null,
    val timestamp: Long = 0L,
    val notes: String? = null
)

@Serializable
data class LedgerPlan(
    val id: String,
    val monthlyIncome: Double = 0.0,
    val currency: String = "USD",
    val fixedExpenses: List<LedgerExpense> = emptyList(),
    val variableExpenses: List<LedgerExpense> = emptyList(),
    val savingsGoal: Double? = null,
    val status: String = "active",
    val createdAt: String = ""
)

@Serializable
data class LedgerExpense(
    val name: String,
    val amount: Double,
    val category: String = "other",
    val isFixed: Boolean = false
)

@Serializable
data class ExpenseItem(
    val name: String,
    val amount: Double
)

@Serializable
data class LegacyFinancialPlan(
    val id: String,
    val monthlyTarget: Double = 0.0
)

@Serializable
data class LedgerTransaction(
    val id: String = "",
    val date: String = "",
    val description: String = "",
    val amount: Double = 0.0,
    val type: String = "expense",
    val category: String = "Other",
    val budgetCategoryId: String? = null,
    val notes: String? = null
)

@Serializable
data class LedgerBudgetCategory(
    val id: String = "",
    val name: String = "",
    val allocated: Double = 0.0,
    val spent: Double = 0.0,
    val color: String = "#06b6d4"
)

@Serializable
data class LedgerFinancialGoal(
    val id: String = "",
    val name: String = "",
    val type: String = "savings",
    val targetAmount: Double = 0.0,
    val currentAmount: Double = 0.0,
    val targetDate: String? = null,
    val monthlyContribution: Double = 0.0,
    val priority: String = "medium",
    val notes: String? = null,
    val createdAt: String = ""
)

/**
 * A projected cash-flow entry representing income vs. expenses for a given month label.
 * Used by CashFlowForecastChart and exposed via LedgerViewModel.cashFlow.
 */
@Serializable
data class CashFlowEntry(
    val label: String = "",
    val income: Double = 0.0,
    val expenses: Double = 0.0
) {
    val net: Double get() = income - expenses
}

@Serializable
data class TaxDeduction(
    val id: String = "",
    val taxYear: Int = 0,
    val name: String = "",
    val amount: Double = 0.0,
    val category: String = "other"
)

@Serializable
data class TitanGoal(
    val id: String = "",
    val title: String = "",
    val type: String = "strength",
    val completed: Boolean = false,
    val currentValue: Double = 0.0,
    val targetValue: Double = 0.0,
    val unit: String = "",
    val deadline: String? = null,
    val createdAt: String = ""
)

@Serializable
data class LedgerSubscription(
    val id: String = "",
    val name: String = "",
    val category: String = "",
    val amount: Double = 0.0,
    val billingCycle: String = "monthly",
    val status: String = "active",
    val nextRenewalDate: String? = null
)

@Serializable
data class LedgerInvestment(
    val id: String = "",
    val name: String = "",
    val ticker: String? = null,
    val currentValue: Double = 0.0,
    val costBasis: Double = 0.0
) {
    val unrealizedGain: Double get() = currentValue - costBasis
    val unrealizedGainPct: Double get() = if (costBasis > 0) unrealizedGain / costBasis * 100 else 0.0
}

@Serializable
data class LedgerRetirementAccount(
    val id: String = "",
    val name: String = "",
    val balance: Double = 0.0,
    val monthlyContribution: Double = 0.0,
    val employerMatch: Double = 0.0,
    val estimatedAnnualReturn: Double = 0.07
)

@Serializable
data class LedgerRetirementGoal(
    val targetAge: Int = 65,
    val targetBalance: Double = 0.0
)

@Serializable
data class LedgerNetWorthSnapshot(
    val date: String = "",
    val netWorth: Double = 0.0,
    val totalAssets: Double = 0.0,
    val totalLiabilities: Double = 0.0
)

@Serializable
data class LedgerCreditScore(
    val score: Int = 0,
    val recordedAt: String = ""
)

@Serializable
data class LedgerCreditCard(
    val name: String = "",
    val limit: Double = 0.0,
    val balance: Double = 0.0
)

@Serializable
data class LedgerInsurancePolicy(
    val id: String = "",
    val type: String = "health",
    val provider: String = "",
    val premium: Double = 0.0,
    val frequency: String = "monthly"
)

// --- Scout ---

@Serializable
data class ScoutKnowledge(
    val onboardingComplete: Boolean = false,
    val documents: List<ScoutDocument> = emptyList(),
    val evidenceSources: List<ScoutEvidenceSource> = emptyList(),
    val epistemicGraph: EpistemicGraph = EpistemicGraph(),
    val extensibility: ModuleProfileExtensibility = ModuleProfileExtensibility(),
    val createdAt: String = "",
    val updatedAt: String = ""
)

@Serializable
data class ScoutDocument(
    val id: String,
    val title: String,
    val summary: String = "",
    val claims: List<String> = emptyList(),
    val source: String = "",
    val date: String = ""
)

@Serializable
data class ScoutEvidenceSource(
    val id: String,
    val title: String,
    val url: String? = null,
    val reliability: String = "unknown",
    val date: String = ""
)

// --- Forge ---

@Serializable
data class ForgeExecutionRecord(
    val id: String = "",
    val command: String = "",
    val result: String = "queued", // queued | running | success | error
    val outputSummary: String? = null,
    val errorLog: List<String> = emptyList(),
    val createdAt: String = ""
)

@Serializable
data class AtlasCapacityBlueprint(
    val state: String = "normal",
    val vitality: Double = 0.0,
    val friction: Double = 0.0,
    val resilience: Double = 0.0,
    val specAlignment: Double = 0.0,
    val loadPct: Double = 0.0,
    val summary: String = ""
)

@Serializable
data class ForgeArtifact(
    val id: String = "",
    val type: String = "document", // code | email | document | checklist | plan
    val title: String = "Untitled",
    val content: String = "",
    val createdAt: String = "",
    val sessionId: String? = null,
    val mode: String = "CODE"
)

@Serializable
data class ForgeProfile(
    val onboardingComplete: Boolean = false,
    val environment: String = "",
    val safetyMode: String = "standard",
    val reportingStyle: String = "",
    val summary: String = "",
    val commandQueue: List<String> = emptyList(),
    val sessions: List<ForgeExecutionRecord> = emptyList(),
    val artifacts: List<ForgeArtifact> = emptyList(),
    val extensibility: ModuleProfileExtensibility = ModuleProfileExtensibility(),
    val createdAt: String = "",
    val updatedAt: String = ""
)

// --- Therapy ---

@Serializable
data class TherapyProfile(
    val onboardingComplete: Boolean = false,
    val baseContext: TherapyContext = TherapyContext(),
    val beliefGraph: BeliefGraph? = null,
    val sessionCount: Int = 0,
    val sentimentGravity: Float = 0.0f,          // 0.0-1.0; triggers Deep Session invite at > 0.8
    val currentSessionMode: String? = null,       // "CASUAL", "DEEP", "IMPROMPTU"
    val lastSessionSummary: String? = null,
    val extensibility: ModuleProfileExtensibility = ModuleProfileExtensibility(),
    val updatedAt: String? = null
)

@Serializable
data class TherapyContext(
    val identity: TherapyIdentity? = null,
    val struggles: List<String> = emptyList(),
    val goals: List<String> = emptyList(),
    val backgroundSummary: String? = null,
    val integratedInsights: List<SessionSummary> = emptyList(),
    val communicationStyle: String? = null,
    val occupation: String? = null,
    val typicalSleepHours: Double? = null,
    val preferredTherapist: TherapistPreference? = null,
    val childhood: String? = null,
    val trauma: String? = null,
    val history: String? = null,
    /**
     * Somatic loop preference (parity with web `somaticEnabled`).
     * Default-true semantics: null/absent is treated as enabled.
     */
    val somaticEnabled: Boolean? = null
)

@Serializable
data class TherapyIdentity(
    val name: String? = null,
    val pronouns: String? = null,
    val ageGroup: String? = null
)

@Serializable
data class TherapistPreference(
    val gender: String? = null,
    val tone: String? = null,
    val traits: List<String> = emptyList()
)

@Serializable
data class SessionSummary(
    val date: String,
    val summary: String,
    val keyInsights: List<String> = emptyList(),
    val theme: String? = null
)

// ═══════════════════════════════════════════════
// Epistemic & Belief Graphs
// ═══════════════════════════════════════════════

@Serializable
data class EpistemicGraph(
    val nodes: List<KnowledgeNode> = emptyList(),
    val relations: List<KnowledgeRelation> = emptyList(),
    val focusArea: String? = null
)

@Serializable
data class KnowledgeNode(
    val id: String,
    val claim: String,
    val confidence: Double = 0.5,
    val sourceLevel: String = "S3",
    val tags: List<String> = emptyList()
)

@Serializable
data class KnowledgeRelation(
    val fromId: String,
    val toId: String,
    val strength: Double = 0.5
)

@Serializable
data class BeliefGraph(
    val nodes: List<BeliefNode> = emptyList(),
    val edges: List<BeliefEdge> = emptyList(),
    val neuralLinks: List<NeuralLink> = emptyList(),
    val summary: String? = null,
    val createdAt: String? = null,
    val updatedAt: String? = null
)

@Serializable
data class BeliefNode(
    val id: String,
    val label: String,
    val type: String = "TRIGGER",        // NodeType: WOUND, STRENGTH, ANCHOR, TRIGGER, GROWTH
    val gravity: Float = 0.5f,          // 0.0-1.0 importance weight (spec field)
    val metadata: Map<String, String> = emptyMap(),
    val valence: String = "neutral",     // sentiment polarity
    val intensity: Float = 0.5f,        // activation strength (half-life decays this)
    val lastTriggeredAt: Long? = null,
    val halfLifeDays: Int = 30
)

@Serializable
data class BeliefEdge(
    val from: String,
    val to: String,
    val relation: String = "related"
)

/** Directed weighted link between belief nodes. Positive weight = healing; negative = triggering. */
@Serializable
data class NeuralLink(
    val sourceId: String,
    val targetId: String,
    val weight: Float = 0.0f,   // positive → heals/reinforces; negative → triggers
    val context: String = ""    // the "Why" behind the connection
)

// ═══════════════════════════════════════════════
// Security & Vault
// ═══════════════════════════════════════════════

@Serializable
data class EncryptedEnvelope(
    val ciphertext: String,
    val iv: String,
    val version: Int = 1
)

@Serializable
data class EncryptedProfile(
    val uid: String,
    val moduleId: String,
    val envelope: EncryptedEnvelope,
    val lastUpdated: String = ""
)

@Serializable
data class VaultMetadata(
    val userId: String = "vault",
    val salt: String,
    val canary: String? = null,
    val encryptionMethod: String = "AES-GCM",
    val iterations: Int = 100000
)

@Serializable
data class TherapyBeliefProposalState(
    val id: String = "",
    val status: String = "pending",
    val graph: BeliefGraph? = null,
    val title: String = "",
    val summary: String = "",
    val confidence: Double = 0.0,
    val source: String = "",
    val createdAt: String? = null,
    val updatedAt: String? = null
)

@Serializable
data class TherapyBeliefInvitationState(
    val id: String = "",
    val status: String = "pending",
    val title: String = "",
    val summary: String = "",
    val confidence: Double = 0.0,
    val threadId: String? = null,
    val threadSnapshotJson: String = "",
    val runtimeSummaryJson: String = "",
    val proposalCardJson: String = "",
    val sentimentGravity: Double? = null,
    val stressLoad: Double? = null,
    val fingerprint: String = "",
    val triggeringBeliefs: List<String> = emptyList(),
    val rationale: List<String> = emptyList(),
    val triggeredAt: String? = null
)

@Serializable
data class TherapyBeliefWorkflowState(
    val proposals: List<TherapyBeliefProposalState> = emptyList(),
    val invitation: TherapyBeliefInvitationState? = null,
    val createdAt: String = "",
    val updatedAt: String? = null
)
