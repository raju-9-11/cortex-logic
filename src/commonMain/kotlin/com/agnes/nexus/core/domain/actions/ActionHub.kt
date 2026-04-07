package com.agnes.nexus.core.domain.actions

import com.agnes.nexus.core.domain.models.ActionCall
import com.agnes.nexus.core.domain.models.FieldDefinition
import com.agnes.nexus.core.domain.models.FieldOption
import com.agnes.nexus.core.domain.models.FieldType
import com.agnes.nexus.core.domain.models.ValidationRules
import com.agnes.nexus.core.domain.models.AtlasJournalEntry
import com.agnes.nexus.core.domain.models.AtlasProfile
import com.agnes.nexus.core.domain.models.ForgeArtifact
import com.agnes.nexus.core.domain.models.ForgeExecutionRecord
import com.agnes.nexus.core.domain.models.ForgeProfile
import com.agnes.nexus.core.domain.models.LedgerProfile
import com.agnes.nexus.core.domain.models.ScoutKnowledge
import com.agnes.nexus.core.domain.models.TherapyProfile
import com.agnes.nexus.core.domain.models.SessionSummary
import com.agnes.nexus.core.domain.models.BeliefGraph
import com.agnes.nexus.core.domain.models.BeliefNode
import com.agnes.nexus.core.domain.models.BeliefEdge
import com.agnes.nexus.core.domain.models.TherapyIdentity
import com.agnes.nexus.core.domain.models.TherapistPreference
import com.agnes.nexus.core.domain.models.TrainerProfile
import com.agnes.nexus.core.domain.models.Routine
import com.agnes.nexus.core.domain.models.WorkoutSession
import com.agnes.nexus.core.domain.models.ExerciseLog
import com.agnes.nexus.core.domain.models.ExerciseSet
import com.agnes.nexus.core.domain.models.PersonalRecord
import com.agnes.nexus.core.domain.models.SleepEntry
import com.agnes.nexus.core.domain.models.CycleEntry
import com.agnes.nexus.core.domain.models.CyclePhase
import com.agnes.nexus.core.domain.models.BodyWeightEntry
import com.agnes.nexus.core.domain.models.CardioSession
import com.agnes.nexus.core.domain.models.TitanCustomField
import com.agnes.nexus.core.domain.models.DebtItem
import com.agnes.nexus.core.domain.models.DebtType
import com.agnes.nexus.core.domain.models.LedgerExpense
import com.agnes.nexus.core.domain.models.LedgerTransaction
import com.agnes.nexus.core.domain.models.LedgerBudgetCategory
import com.agnes.nexus.core.domain.models.LedgerFinancialGoal
import com.agnes.nexus.core.domain.models.AtlasTask
import com.agnes.nexus.core.domain.models.AtlasHabit
import com.agnes.nexus.core.domain.models.AtlasGoal
import com.agnes.nexus.core.domain.models.AtlasTaskNode
import com.agnes.nexus.core.domain.models.AtlasProject
import com.agnes.nexus.core.domain.models.EnergyWavePoint
import com.agnes.nexus.core.domain.models.RecoveryWindow
import com.agnes.nexus.core.domain.models.ScheduledTask
import com.agnes.nexus.core.domain.models.DailyIntention
import com.agnes.nexus.core.domain.models.DailyCheckInEntry
import com.agnes.nexus.core.domain.models.HabitLogEntry
import com.agnes.nexus.core.domain.models.TemporalReview
import com.agnes.nexus.core.domain.models.HabitWeekSummary
import com.agnes.nexus.core.domain.models.GoalWeekProgress
import com.agnes.nexus.core.domain.models.EncryptedEnvelope
import com.agnes.nexus.core.domain.models.toMap
import com.agnes.nexus.core.domain.services.DefaultFieldValidators
import com.agnes.nexus.core.domain.services.FieldValidationContext
import com.agnes.nexus.core.domain.services.FieldValidationRouter
import com.agnes.nexus.core.domain.services.FieldValueValidationRequest
import com.agnes.nexus.core.domain.services.NexusLogger
import com.agnes.nexus.core.domain.services.SchemaRegistry
import com.agnes.nexus.core.domain.services.NeuralProjectionService
import com.agnes.nexus.core.domain.services.NexusDataLayer
import com.agnes.nexus.core.domain.services.SpineEventBus
import com.agnes.nexus.core.domain.services.SpineEventPayload
import com.agnes.nexus.core.domain.services.NexusOrderBy
import com.agnes.nexus.core.domain.services.NexusQuery
import com.agnes.nexus.core.domain.services.NexusQueryFilter
import com.agnes.nexus.core.domain.services.VaultBoundary
import kotlin.random.Random
import kotlinx.datetime.Clock
import kotlinx.datetime.Instant
import kotlinx.serialization.encodeToString
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.*

/**
 * Action Hub - registers and dispatches structured agent actions.
 * Centralizes the "Hand-to-Brain" connection in KMP.
 */
class ActionHub(
    private val nsvService: NeuralProjectionService,
    private val eventBus: SpineEventBus,
    private val dataLayer: NexusDataLayer? = null,
    private val vaultBoundary: VaultBoundary? = null,
    private val settings: com.agnes.nexus.core.domain.services.NexusSettings? = null
) {
    private val registry = mutableMapOf<String, MutableMap<String, suspend (ActionCall) -> Unit>>()
    private val dependencies = mutableMapOf<String, MutableSet<String>>()
    private val validationRouter = FieldValidationRouter(DefaultFieldValidators.all())
    private val json = Json { ignoreUnknownKeys = true; encodeDefaults = true }

    private val nsvReadOnlyModules = setOf("forge", "scout")
    private val nsvWriteActionTypes = setOf(
        "update_soul",
        "write_soul",
        "patch_nsv",
        "update_nsv",
        "commit_nsv",
        "soul_write",
        "nsv_write",
        "update_nsv_fields",
        "UPDATE_SOUL",
        "WRITE_SOUL",
        "PATCH_NSV",
        "UPDATE_NSV",
        "COMMIT_NSV"
    )

    init {
        // 0. Deep Link Focus Handlers (Issue 1)
        // These handlers catch LLM "show me X" intents and set a pending focus for the module UI.
        
        // Atlas: Tasks and Journals
        register("atlas", "focus_task") { call ->
            val taskId = call.payload["taskId"]?.jsonPrimitive?.content ?: return@register
            emitDeepLinkFocus("atlas", "task:$taskId")
        }
        register("atlas", "focus_journal") { call ->
            val journalId = call.payload["journalId"]?.jsonPrimitive?.content ?: return@register
            emitDeepLinkFocus("atlas", "journal:$journalId")
        }

        // Titan: Sessions
        register("titan", "focus_session") { call ->
            val sessionId = call.payload["sessionId"]?.jsonPrimitive?.content ?: return@register
            emitDeepLinkFocus("titan", "session:$sessionId")
        }

        // Ledger: Transactions (future-proof)
        register("ledger", "focus_transaction") { call ->
            val txId = call.payload["transactionId"]?.jsonPrimitive?.content ?: return@register
            emitDeepLinkFocus("ledger", "transaction:$txId")
        }

        // 1. Spine Broadcaster
        register("orchestrator", "broadcast_spine_event") { call ->
            val type = call.payload["type"]?.jsonPrimitive?.content ?: "VITAL_UPDATED"
            val domainRaw = call.payload["domain"]?.jsonPrimitive?.content ?: "system"
            val domain = normalizeDomain(domainRaw)
            val data = call.payload["payload"]?.jsonObject?.toMap() ?: emptyMap<String, Any?>()
            eventBus.emit(SpineEventPayload(type = type, source = "orchestrator", domain = domain, data = data, priority = "info"))
        }

        // 2. NSV Mutator
        register("orchestrator", "update_nsv_fields") { call ->
            val patch = mutableMapOf<String, Any?>()
            call.payload.forEach { (key, value) ->
                patch[key] = when (value) {
                    is JsonPrimitive -> value.doubleOrNull ?: value.content
                    else -> value.toString()
                }
            }
            nsvService.updateNsv(patch)
        }

        // 3. Delegation
        register("orchestrator", "delegate_to_module") { call ->
            val target = call.payload["target"]?.jsonPrimitive?.content
            if (target != null) {
                eventBus.emit(SpineEventPayload(
                    type = "MODULE_DELEGATED", 
                    source = "orchestrator", 
                    domain = "system", 
                    data = mapOf("target" to target),
                    priority = "info"
                ))
            }
        }

        // 3b. Reminder pipeline — propose / query / complete / snooze across all modules
        listOf("agnes", "atlas", "ledger", "titan", "soma", "scout", "forge", "orchestrator").forEach { mod ->
            register(mod, "propose_reminder") { call -> handleProposeReminder(call, mod) }
            register(mod, "query_reminders") { call -> handleQueryReminders(call, mod) }
            register(mod, "complete_reminder") { call -> handleCompleteReminder(call, mod) }
            register(mod, "snooze_reminder") { call -> handleSnoozeReminder(call, mod) }
        }

        // 4. Therapy Context Update
        register("agnes", "update_therapy_context") { call ->
            // Web parity: persist immediately by merging payload into profile.baseContext.
            handleAgnesUpdateOnboardingProfile(call)
        }

        // 4b. Global identity update
        register("orchestrator", "update_global_identity") { call ->
            eventBus.emit(SpineEventPayload(
                type = "PROFILE_UPDATE_REQUESTED",
                source = "orchestrator",
                domain = "system",
                data = call.payload.toMap(),
                priority = "info"
            ))
        }

        // 4c. Personality provision sync
        register("orchestrator", "sync_personality_provision") { call ->
            eventBus.emit(SpineEventPayload(
                type = "PERSONALITY_PROVISION_UPDATED",
                source = "orchestrator",
                domain = "system",
                data = call.payload.toMap(),
                priority = "info"
            ))
        }

        // 5. Titan Workout Logging
        register("titan", "log_workout") { call ->
            val fatigue = call.payload["cnsFatigue"]?.jsonPrimitive?.doubleOrNull ?: 5.0

            // Side-effect 1: Update NSV
            nsvService.updateNsv(mapOf("biological.cnsFatigue" to fatigue))

            // Side-effect 2: Persist to cardioLog when an activity name is present
            val activity = call.payload["activity"]?.jsonPrimitive?.content?.trim()
            if (!activity.isNullOrBlank()) {
                call.userId?.let { uid ->
                    val durationRaw = call.payload["duration"]?.jsonPrimitive?.content
                    val durationMinutes = durationRaw?.toIntOrNull()
                        ?: durationRaw?.filter { it.isDigit() }?.toIntOrNull()
                        ?: 0
                    val date = call.payload["date"]?.jsonPrimitive?.content
                        ?.takeIf { it.length >= 10 } ?: nowIso().take(10)
                    val rpe = call.payload["rpe"]?.jsonPrimitive?.doubleOrNull
                        ?.toInt()?.coerceIn(1, 10)
                    val session = CardioSession(
                        id = "wl-${Clock.System.now().toEpochMilliseconds()}-${Random.nextInt(0xFFFF)}",
                        date = date,
                        type = "other",
                        durationMinutes = durationMinutes,
                        notes = activity,
                        rpe = rpe,
                        status = "completed",
                        recordedAt = nowIso(),
                    )
                    val profile = loadTrainerProfile(uid, call.encryptionKey)
                    val updated = profile.copy(
                        cardioLog = listOf(session) + (profile.cardioLog ?: emptyList()).take(499),
                        updatedAt = nowIso(),
                    )
                    saveTrainerProfile(uid, updated, call.encryptionKey)
                }
            }

            // Side-effect 3: Spine Event
            eventBus.emit(SpineEventPayload(
                type = "WORKOUT_LOGGED",
                source = "titan",
                domain = "B",
                data = call.payload.toMap(),
                priority = "info"
            ))
        }

        // 6. Agnes crisis flag
        register("agnes", "crisis_flag") { call ->
            val trigger = call.payload["trigger"]?.jsonPrimitive?.content ?: "unknown"
            val severity = call.payload["severity"]?.jsonPrimitive?.content ?: "high"
            nsvService.updateNsv(mapOf("emotional.stressLoad" to 10.0))
            eventBus.emit(SpineEventPayload(
                type = "CRISIS_DETECTED",
                source = "agnes",
                domain = "E",
                data = mapOf(
                    "trigger" to trigger,
                    "severity" to severity,
                    "timestamp" to nowIso()
                ),
                priority = "critical"
            ))
        }

        // 7. Agnes emotional resilience update
        register("agnes", "update_emotional_resilience") { call ->
            val score = call.payload["score"]?.jsonPrimitive?.doubleOrNull ?: return@register
            val policy = call.payload["persistencePolicy"]?.jsonPrimitive?.content
            if (policy != "ephemeral") {
                nsvService.updateNsv(mapOf("emotional.emotionalResilience" to score))
            }
            if (score <= 3) {
                eventBus.emit(
                    SpineEventPayload(
                        type = "BURNOUT_WARNING",
                        source = "agnes",
                        domain = "E",
                        data = mapOf(
                            "cnsFatigue" to score / 10.0,
                            "source" to "agnes",
                            "trigger" to "low_resilience"
                        ),
                        priority = "alert"
                    )
                )
            }
        }

        // 8. Agnes stress load update
        register("agnes", "update_stress_load") { call ->
            val score = call.payload["score"]?.jsonPrimitive?.doubleOrNull ?: return@register
            val policy = call.payload["persistencePolicy"]?.jsonPrimitive?.content
            if (policy != "ephemeral") {
                nsvService.updateNsv(mapOf("emotional.stressLoad" to score))
            }
            if (score >= 8) {
                eventBus.emit(
                    SpineEventPayload(
                        type = "COMPOUND_STRESS",
                        source = "agnes",
                        domain = "E",
                        data = mapOf("stressLoad" to score, "source" to "agnes"),
                        priority = "alert"
                    )
                )
            } else if (score >= 6) {
                eventBus.emit(
                    SpineEventPayload(
                        type = "VITAL_UPDATED",
                        source = "agnes",
                        domain = "E",
                        data = mapOf("stressLoad" to score, "source" to "agnes", "domain" to "E"),
                        priority = "info"
                    )
                )
            }
        }

        // 9. Agnes mood trend update
        register("agnes", "update_mood_trend") { call ->
            val trend = call.payload["trend"]?.jsonPrimitive?.content ?: return@register
            val policy = call.payload["persistencePolicy"]?.jsonPrimitive?.content
            if (policy != "ephemeral") {
                nsvService.updateNsv(mapOf("emotional.moodTrend" to trend))
            }
            eventBus.emit(
                SpineEventPayload(
                    type = "VITAL_UPDATED",
                    source = "agnes",
                    domain = "E",
                    data = mapOf("moodTrend" to trend, "source" to "agnes", "domain" to "E"),
                    priority = "info"
                )
            )
        }

        // 10. Agnes trauma markers update
        register("agnes", "update_trauma_markers") { call ->
            val markers = (call.payload["markers"] as? JsonArray)?.map { it.toString() } ?: emptyList()
            val policy = call.payload["persistencePolicy"]?.jsonPrimitive?.content
            if (policy != "ephemeral") {
                nsvService.updateNsv(mapOf("emotional.traumaMarkers" to markers))
            }
        }

        // 11. Agnes sync vitals
        register("orchestrator", "sync_vitals") { call ->
            val emotional = (call.payload["emotional"] as? JsonObject)?.toMap() ?: return@register
            val policy = call.payload["persistencePolicy"]?.jsonPrimitive?.content
            if (policy != "ephemeral") {
                nsvService.updateNsv(mapOf("emotional" to emotional))
            }
            val stressLoad = (emotional["stressLoad"] as? Number)?.toDouble()
            if (stressLoad != null && stressLoad >= 8) {
                eventBus.emit(
                    SpineEventPayload(
                        type = "COMPOUND_STRESS",
                        source = "agnes",
                        domain = "E",
                        data = mapOf("stressLoad" to stressLoad, "source" to "agnes"),
                        priority = "alert"
                    )
                )
            } else {
                eventBus.emit(
                    SpineEventPayload(
                        type = "VITAL_UPDATED",
                        source = "agnes",
                        domain = "E",
                        data = emotional + mapOf("source" to "agnes", "domain" to "E"),
                        priority = "info"
                    )
                )
            }
        }

        // 12. Schema Management (Issue 5)
        val schemaModules = listOf("atlas", "titan", "ledger", "soma", "scout", "forge", "profile", "agnes", "orchestrator")
        schemaModules.forEach { moduleId ->
            register(moduleId, "suggest_field") { handleSuggestField(it) }
            register(moduleId, "create_field") { handleCreateField(it) }
            register(moduleId, "update_field") { handleUpdateField(it) }
            register(moduleId, "delete_field") { handleDeleteField(it) }
            register(moduleId, "update_field_value") { handleUpdateFieldValue(it) }
        }

        // -------------------------
        // Soma parity actions (events + NSV)
        // -------------------------
        addDependency("titan", "soma")
        register("soma", "compute_readiness") { call ->
            val readiness = computeReadinessScore(
                restingHeartRate = call.payload["restingHeartRate"]?.jsonPrimitive?.doubleOrNull,
                sleepQuality = call.payload["sleepQuality"]?.jsonPrimitive?.doubleOrNull,
                energyLevel = call.payload["energyLevel"]?.jsonPrimitive?.doubleOrNull,
                stressPhysical = call.payload["stressPhysical"]?.jsonPrimitive?.doubleOrNull
            )
            eventBus.emit(
                SpineEventPayload(
                    type = "SOMA_READINESS_UPDATED",
                    source = "soma",
                    domain = "B",
                    data = mapOf(
                        "score" to readiness.score,
                        "breakdown" to readiness.breakdown,
                        "level" to readiness.level
                    ),
                    priority = "info"
                )
            )
            nsvService.updateNsv(mapOf("biological.recoveryScore" to readiness.score / 10.0))
            call.userId?.let { uid ->
                updateProfileFields("soma_profiles", uid, mapOf("readinessScore" to readiness.score))
            }
        }

        register("soma", "commit_biomarker") { call ->
            val name = call.payload["name"]?.jsonPrimitive?.content?.trim().orEmpty()
            val value = call.payload["value"]?.jsonPrimitive?.doubleOrNull
                ?: call.payload["value"]?.jsonPrimitive?.content
            if (name.isBlank() || value == null) return@register
            call.userId?.let { uid ->
                appendProfileList(
                    collection = "soma_profiles",
                    uid = uid,
                    field = "biomarkers",
                    record = mapOf(
                        "id" to "bm-${Clock.System.now().toEpochMilliseconds()}",
                        "name" to name,
                        "value" to value.toString(),
                        "unit" to call.payload["unit"]?.jsonPrimitive?.content,
                        "source" to (call.payload["source"]?.jsonPrimitive?.content ?: "ai"),
                        "recordedAt" to nowIso()
                    )
                )
            }
            eventBus.emit(
                SpineEventPayload(
                    type = "SOMA_BIOMARKER_COMMITTED",
                    source = "soma",
                    domain = "B",
                    data = mapOf("moduleId" to "soma", "fieldName" to name, "newValue" to value, "timestamp" to nowIso()),
                    priority = "info"
                )
            )
        }

        register("soma", "log_vital") { call ->
            val fields = mutableMapOf<String, Any?>()
            listOf("heartRate", "weight", "spo2", "temperature", "bloodPressure").forEach { key ->
                call.payload[key]?.let { value ->
                    fields[key] = if (value is JsonPrimitive) value.doubleOrNull ?: value.content else value.toString()
                }
            }
            if (fields.isEmpty()) return@register
            call.userId?.let { uid ->
                appendProfileList(
                    collection = "soma_profiles",
                    uid = uid,
                    field = "vitalReadings",
                    record = mapOf(
                        "timestamp" to Clock.System.now().toEpochMilliseconds(),
                        "heartRate" to fields["heartRate"],
                        "weight" to fields["weight"],
                        "spo2" to fields["spo2"],
                        "temperature" to fields["temperature"],
                        "bloodPressure" to fields["bloodPressure"]
                    )
                )
            }
            eventBus.emit(
                SpineEventPayload(
                    type = "SOMA_VITAL_LOGGED",
                    source = "soma",
                    domain = "B",
                    data = mapOf("moduleId" to "soma", "fields" to fields, "timestamp" to nowIso()),
                    priority = "info"
                )
            )
        }

        register("soma", "issue_clearance") { call ->
            val activity = call.payload["activity"]?.jsonPrimitive?.content?.trim().orEmpty()
            if (activity.isBlank()) return@register
            val status = call.payload["status"]?.jsonPrimitive?.content ?: "conditional"
            call.userId?.let { uid ->
                appendProfileList(
                    collection = "soma_profiles",
                    uid = uid,
                    field = "clearances",
                    record = mapOf(
                        "id" to "cl-${Clock.System.now().toEpochMilliseconds()}",
                        "activity" to activity,
                        "status" to status,
                        "reason" to (call.payload["reason"]?.jsonPrimitive?.content ?: ""),
                        "issuedAt" to nowIso()
                    )
                )
            }
            eventBus.emit(
                SpineEventPayload(
                    type = "SOMA_CLEARANCE_CHANGED",
                    source = "soma",
                    domain = "B",
                    data = mapOf("moduleId" to "soma", "activity" to activity, "status" to status, "timestamp" to nowIso()),
                    priority = if (status == "denied") "alert" else "info"
                )
            )
        }

        register("soma", "parse_lab_report") { call ->
            val panel = call.payload["panel"]?.jsonPrimitive?.content?.trim().orEmpty()
            if (panel.isBlank()) return@register
            call.userId?.let { uid ->
                appendProfileList(
                    collection = "soma_profiles",
                    uid = uid,
                    field = "labSummaries",
                    record = mapOf(
                        "id" to "lab-${Clock.System.now().toEpochMilliseconds()}",
                        "panel" to panel,
                        "findings" to ((call.payload["findings"] as? JsonArray)?.map { it.toString() } ?: emptyList<String>()),
                        "flags" to ((call.payload["flags"] as? JsonArray)?.map { it.toString() } ?: emptyList<String>()),
                        "recordedAt" to nowIso()
                    )
                )
            }
            eventBus.emit(
                SpineEventPayload(
                    type = "SOMA_LAB_REPORT_PARSED",
                    source = "soma",
                    domain = "B",
                    data = mapOf("moduleId" to "soma", "panel" to panel, "timestamp" to nowIso()),
                    priority = "info"
                )
            )
        }

        register("soma", "update_conditions") { call ->
            val updates = mutableListOf<String>()
            if (call.payload["knownConditions"] != null) updates += "knownConditions"
            if (call.payload["medications"] != null) updates += "medications"
            if (call.payload["allergies"] != null) updates += "allergies"
            if (updates.isEmpty()) return@register
            call.userId?.let { uid ->
                val payload = mutableMapOf<String, Any?>()
                (call.payload["knownConditions"] as? JsonArray)?.let { payload["knownConditions"] = it.map { v -> v.toString() } }
                (call.payload["medications"] as? JsonArray)?.let { payload["medications"] = it.map { v -> v.toString() } }
                (call.payload["allergies"] as? JsonArray)?.let { payload["allergies"] = it.map { v -> v.toString() } }
                updateProfileFields("soma_profiles", uid, payload)
            }
            eventBus.emit(
                SpineEventPayload(
                    type = "SOMA_PROFILE_UPDATED",
                    source = "soma",
                    domain = "B",
                    data = mapOf("moduleId" to "soma", "updatedFields" to updates, "timestamp" to nowIso()),
                    priority = "info"
                )
            )
        }

        register("soma", "approve_health_entry") { call ->
            val entryId = call.payload["entryId"]?.jsonPrimitive?.content ?: return@register
            eventBus.emit(
                SpineEventPayload(
                    type = "SOMA_PROFILE_UPDATED",
                    source = "soma",
                    domain = "B",
                    data = mapOf("action" to "approve_health_entry", "entryId" to entryId, "timestamp" to nowIso()),
                    priority = "info"
                )
            )
        }

        register("soma", "reject_health_entry") { call ->
            val entryId = call.payload["entryId"]?.jsonPrimitive?.content ?: return@register
            eventBus.emit(
                SpineEventPayload(
                    type = "SOMA_PROFILE_UPDATED",
                    source = "soma",
                    domain = "B",
                    data = mapOf("action" to "reject_health_entry", "entryId" to entryId, "timestamp" to nowIso()),
                    priority = "alert"
                )
            )
        }

        register("soma", "approve_diagnosis_merge") { call ->
            val sessionId = call.payload["sessionId"]?.jsonPrimitive?.content ?: return@register
            eventBus.emit(
                SpineEventPayload(
                    type = "SOMA_DIAGNOSIS_MERGED",
                    source = "soma",
                    domain = "B",
                    data = mapOf("sessionId" to sessionId, "timestamp" to nowIso()),
                    priority = "info"
                )
            )
        }

        register("soma", "reject_diagnosis_merge") { call ->
            val sessionId = call.payload["sessionId"]?.jsonPrimitive?.content ?: return@register
            eventBus.emit(
                SpineEventPayload(
                    type = "SOMA_DIAGNOSIS_DISCARDED",
                    source = "soma",
                    domain = "B",
                    data = mapOf("sessionId" to sessionId, "timestamp" to nowIso()),
                    priority = "alert"
                )
            )
        }

        // -------------------------
        // Soma full-parity handlers
        // -------------------------
        register("soma", "complete_soma_onboarding") { call ->
            call.userId?.let { uid ->
                updateProfileFields("soma_profiles", uid, mapOf(
                    "medicalOnboardingComplete" to true,
                    "onboardingComplete" to true
                ))
            }
            eventBus.emit(SpineEventPayload(
                type = "ONBOARDING_COMPLETED",
                source = "soma",
                domain = "B",
                data = mapOf("moduleId" to "soma", "timestamp" to nowIso()),
                priority = "info"
            ))
        }

        register("soma", "log_assessment") { call ->
            val observation = call.payload["observation"]?.jsonPrimitive?.content?.trim()
            val assessType = call.payload["type"]?.jsonPrimitive?.content ?: "physical"
            val physFields = mutableMapOf<String, Any?>()
            listOf("height", "weight", "bmi", "bodyFatPercentage", "muscleMass", "vo2Max").forEach { key ->
                call.payload[key]?.let { v ->
                    physFields[key] = if (v is JsonPrimitive) v.doubleOrNull ?: v.content else v.toString()
                }
            }
            if (observation.isNullOrBlank() && physFields.isEmpty()) return@register
            call.userId?.let { uid ->
                val assessRec = mutableMapOf<String, Any?>(
                    "timestamp" to Clock.System.now().toEpochMilliseconds(),
                    "type" to assessType
                )
                if (!observation.isNullOrBlank()) assessRec["observation"] = observation
                assessRec.putAll(physFields)
                appendProfileList(collection = "soma_profiles", uid = uid, field = "physicalAssessments", record = assessRec)
            }
            physFields["height"]?.let { h ->
                val hv = (h as? Double) ?: (h as? String)?.toDoubleOrNull()
                if (hv != null) nsvService.updateNsv(mapOf("biological.height" to hv))
            }
            eventBus.emit(SpineEventPayload(
                type = "SOMA_BIOMARKER_COMMITTED",
                source = "soma",
                domain = "B",
                data = mapOf("moduleId" to "soma", "type" to "assessment", "assessType" to assessType, "timestamp" to nowIso()),
                priority = "info"
            ))
        }

        register("soma", "parse_health_report") { call ->
            val reportType = call.payload["reportType"]?.jsonPrimitive?.content ?: "general"
            val biomarkersRaw = call.payload["biomarkers"] as? JsonArray
            val findingsRaw = call.payload["findings"] as? JsonArray
            val extractedCount = biomarkersRaw?.size ?: 0
            call.userId?.let { uid ->
                val healthRec = mutableMapOf<String, Any?>(
                    "id" to "hr-${Clock.System.now().toEpochMilliseconds()}",
                    "reportType" to reportType,
                    "extractedCount" to extractedCount,
                    "parsedAt" to nowIso()
                )
                biomarkersRaw?.let { arr -> healthRec["biomarkers"] = arr.map { b -> b.toString() } }
                findingsRaw?.let { arr -> healthRec["findings"] = arr.map { b -> b.toString() } }
                appendProfileList(collection = "soma_profiles", uid = uid, field = "labSummaries", record = healthRec)
            }
            eventBus.emit(SpineEventPayload(
                type = "SOMA_LAB_REPORT_PARSED",
                source = "soma",
                domain = "B",
                data = mapOf("moduleId" to "soma", "reportType" to reportType, "extractedCount" to extractedCount, "timestamp" to nowIso()),
                priority = "info"
            ))
        }

        register("soma", "parse_biometric_data") { call ->
            val biometricSource = call.payload["source"]?.jsonPrimitive?.content ?: "device"
            val biometricFields = mutableMapOf<String, Any?>()
            listOf("heartRate", "weight", "spo2", "temperature", "bloodPressure", "steps", "hrv").forEach { key ->
                call.payload[key]?.let { v ->
                    biometricFields[key] = if (v is JsonPrimitive) v.doubleOrNull ?: v.content else v.toString()
                }
            }
            if (biometricFields.isEmpty()) return@register
            call.userId?.let { uid ->
                appendProfileList(
                    collection = "soma_profiles",
                    uid = uid,
                    field = "vitalReadings",
                    record = mapOf("timestamp" to Clock.System.now().toEpochMilliseconds(), "source" to biometricSource) + biometricFields
                )
            }
            val nsvBioPatch = mutableMapOf<String, Any?>()
            biometricFields["heartRate"]?.let { nsvBioPatch["biological.heartRate"] = it }
            biometricFields["hrv"]?.let { nsvBioPatch["biological.hrv"] = it }
            biometricFields["weight"]?.let { nsvBioPatch["biological.weight"] = it }
            if (nsvBioPatch.isNotEmpty()) nsvService.updateNsv(nsvBioPatch)
            eventBus.emit(SpineEventPayload(
                type = "SOMA_BIOMARKER_COMMITTED",
                source = "soma",
                domain = "B",
                data = mapOf("moduleId" to "soma", "source" to biometricSource, "fields" to biometricFields, "timestamp" to nowIso()),
                priority = "info"
            ))
        }

        register("soma", "analyze_medical_image") { call ->
            val imageRef = call.payload["imageRef"]?.jsonPrimitive?.content
            val sessionId = call.payload["sessionId"]?.jsonPrimitive?.content
            val imageType = call.payload["imageType"]?.jsonPrimitive?.content
                ?: call.payload["analysisType"]?.jsonPrimitive?.content
                ?: "general"
            val imageResult = call.payload["result"]?.jsonPrimitive?.content
                ?: call.payload["findings"]?.jsonPrimitive?.content
                ?: ""
            val resolvedRef = imageRef ?: sessionId ?: return@register
            val imageId = "img-${Clock.System.now().toEpochMilliseconds()}"
            call.userId?.let { uid ->
                appendProfileList(
                    collection = "soma_profiles",
                    uid = uid,
                    field = "medicalImageAnalyses",
                    record = mapOf("id" to imageId, "imageRef" to resolvedRef, "imageType" to imageType, "result" to imageResult, "sessionId" to sessionId, "analyzedAt" to nowIso())
                )
            }
            eventBus.emit(SpineEventPayload(
                type = "SOMA_DIAGNOSIS_MERGED",
                source = "soma",
                domain = "B",
                data = mapOf("moduleId" to "soma", "id" to imageId, "sessionId" to sessionId, "imageType" to imageType, "result" to imageResult, "timestamp" to nowIso()),
                priority = "info"
            ))
        }

        register("soma", "grant_clearance") { call ->
            handleSomaClearance(call, status = "granted", secondaryEvent = "CLEARANCE_GRANTED")
        }

        register("soma", "deny_clearance") { call ->
            handleSomaClearance(call, status = "denied", secondaryEvent = "CLEARANCE_DENIED")
        }

        register("soma", "set_conditional_clearance") { call ->
            val cond = call.payload["conditions"]?.jsonPrimitive?.content
                ?: call.payload["condition"]?.jsonPrimitive?.content
                ?: ""
            handleSomaClearance(call, status = "conditional", extraData = mapOf("conditions" to cond))
        }

        register("soma", "log_lab_result") { call ->
            val labBiomarker = (call.payload["biomarker"] ?: call.payload["name"])?.jsonPrimitive?.content?.trim().orEmpty()
            if (labBiomarker.isBlank()) return@register
            val labValue = call.payload["value"]?.jsonPrimitive?.content ?: return@register
            val labUnit = call.payload["unit"]?.jsonPrimitive?.content ?: ""
            val labRefRange = call.payload["referenceRange"]?.jsonPrimitive?.content ?: ""
            val labFlag = call.payload["flag"]?.jsonPrimitive?.content ?: "normal"
            val labId = "lr-${Clock.System.now().toEpochMilliseconds()}"
            call.userId?.let { uid ->
                appendProfileList(
                    collection = "soma_profiles",
                    uid = uid,
                    field = "biomarkers",
                    record = mapOf("id" to labId, "name" to labBiomarker, "value" to labValue, "unit" to labUnit, "referenceRange" to labRefRange, "flag" to labFlag, "source" to "lab", "recordedAt" to nowIso())
                )
            }
            eventBus.emit(SpineEventPayload(
                type = "SOMA_LAB_REPORT_PARSED",
                source = "soma",
                domain = "B",
                data = mapOf("moduleId" to "soma", "panel" to labBiomarker, "biomarker" to labBiomarker, "value" to labValue, "unit" to labUnit, "flag" to labFlag, "timestamp" to nowIso()),
                priority = if (labFlag == "critical" || labFlag == "high") "alert" else "info"
            ))
        }

        register("soma", "log_medication") { call ->
            val medName = call.payload["name"]?.jsonPrimitive?.content?.trim().orEmpty()
            if (medName.isBlank()) return@register
            val medDosage = call.payload["dosage"]?.jsonPrimitive?.content ?: ""
            val medFreq = call.payload["frequency"]?.jsonPrimitive?.content ?: ""
            call.userId?.let { uid ->
                appendProfileList(
                    collection = "soma_profiles",
                    uid = uid,
                    field = "medications",
                    record = mapOf("name" to medName, "dosage" to medDosage, "frequency" to medFreq, "addedAt" to nowIso())
                )
            }
            val medEntry = listOf(medName, medDosage, medFreq).filter { it.isNotBlank() }.joinToString(" ")
            eventBus.emit(SpineEventPayload(
                type = "SOMA_PROFILE_UPDATED",
                source = "soma",
                domain = "B",
                data = mapOf("moduleId" to "soma", "field" to "medications", "entry" to medEntry, "timestamp" to nowIso()),
                priority = "info"
            ))
        }

        register("soma", "log_condition") { call ->
            val condName = call.payload["condition"]?.jsonPrimitive?.content?.trim().orEmpty()
            if (condName.isBlank()) return@register
            val condSeverity = call.payload["severity"]?.jsonPrimitive?.content ?: "unknown"
            val condNotes = call.payload["notes"]?.jsonPrimitive?.content ?: ""
            call.userId?.let { uid ->
                appendProfileList(
                    collection = "soma_profiles",
                    uid = uid,
                    field = "knownConditions",
                    record = mapOf("name" to condName, "severity" to condSeverity, "notes" to condNotes, "loggedAt" to nowIso())
                )
            }
            eventBus.emit(SpineEventPayload(
                type = "SOMA_PROFILE_UPDATED",
                source = "soma",
                domain = "B",
                data = mapOf("moduleId" to "soma", "field" to "knownConditions", "condition" to condName, "timestamp" to nowIso()),
                priority = "info"
            ))
        }

        // -------------------------
        // Module field CRUD parity
        // -------------------------
        register("soma", "suggest_field") { call -> handleSuggestField(call) }
        register("atlas", "suggest_field") { call -> handleSuggestField(call) }
        register("ledger", "suggest_field") { call -> handleSuggestField(call) }
        register("soma", "create_field") { call -> handleCreateField(call) }
        register("atlas", "create_field") { call -> handleCreateField(call) }
        register("ledger", "create_field") { call -> handleCreateField(call) }
        register("soma", "delete_field") { call -> handleDeleteField(call) }
        register("atlas", "delete_field") { call -> handleDeleteField(call) }
        register("ledger", "delete_field") { call -> handleDeleteField(call) }
        register("soma", "update_field_value") { call -> handleUpdateFieldValue(call) }
        register("atlas", "update_field_value") { call -> handleUpdateFieldValue(call) }
        register("ledger", "update_field_value") { call -> handleLedgerSetFieldValue(call) }
        register("soma", "update_field") { call -> handleUpdateField(call) }
        register("atlas", "update_field") { call -> handleUpdateField(call) }
        register("ledger", "update_field") { call -> handleUpdateField(call) }
        register("ledger", "set_field_value") { call -> handleLedgerSetFieldValue(call) }

        // -------------------------
        // Atlas actions parity
        // -------------------------
        register("atlas", "update_energy_wave") { call -> handleAtlasUpdateEnergyWave(call) }
        register("atlas", "flatten_schedule") { call -> handleAtlasFlattenSchedule(call) }
        register("atlas", "create_recovery_window") { call -> handleAtlasCreateRecoveryWindow(call) }
        register("atlas", "update_task_graph") { call -> handleAtlasUpdateTaskGraph(call) }
        register("atlas", "create_task") { call -> handleAtlasCreateTask(call) }
        register("atlas", "update_task") { call -> handleAtlasUpdateTask(call) }
        register("atlas", "complete_task") { call -> handleAtlasCompleteTask(call) }
        register("atlas", "delete_task") { call -> handleAtlasDeleteTask(call) }
        register("atlas", "create_habit") { call -> handleAtlasCreateHabit(call) }
        register("atlas", "update_habit") { call -> handleAtlasUpdateHabit(call) }
        register("atlas", "update_habit_streak") { call -> handleAtlasUpdateHabitStreak(call) }
        register("atlas", "pause_habit") { call -> handleAtlasPauseHabit(call) }
        register("atlas", "delete_habit") { call -> handleAtlasDeleteHabit(call) }
        register("atlas", "create_goal") { call -> handleAtlasCreateGoal(call) }
        register("atlas", "update_goal") { call -> handleAtlasUpdateGoal(call) }
        register("atlas", "update_goal_progress") { call -> handleAtlasUpdateGoalProgress(call) }
        register("atlas", "delete_goal") { call -> handleAtlasDeleteGoal(call) }
        register("atlas", "daily_plan") { call -> handleAtlasDailyPlan(call) }
        register("atlas", "temporal_review") { call -> handleAtlasTemporalReview(call) }
        register("atlas", "schedule_block") { call -> handleAtlasScheduleBlock(call) }
        register("atlas", "set_daily_intention") { call -> handleAtlasSetDailyIntention(call) }
        register("atlas", "update_daily_intention") { call -> handleAtlasUpdateDailyIntention(call) }
        register("atlas", "defer_task") { call -> handleAtlasDeferTask(call) }
        register("atlas", "move_task") { call -> handleAtlasMoveTask(call) }
        register("atlas", "resume_habit") { call -> handleAtlasResumeHabit(call) }
        register("atlas", "create_project") { call -> handleAtlasCreateProject(call) }
        register("atlas", "schedule_energy_wave") { call -> handleAtlasScheduleEnergyWave(call) }
        register("atlas", "log_recovery_checkin") { call -> handleAtlasLogRecoveryCheckin(call) }
        register("atlas", "log_habit_metric") { call -> handleAtlasLogHabitMetric(call) }
        register("atlas", "log_sleep") { call -> handleAtlasLogSleep(call) }

        // -------------------------
        // Atlas onboarding parity
        // -------------------------
        register("atlas", "update_atlas_profile") { call -> handleAtlasUpdateOnboardingProfile(call) }
        register("atlas", "complete_atlas_onboarding") { call -> handleAtlasCompleteOnboarding(call) }
        register("atlas", "update_global_base_context") { /* no-op (handled via prompts/local state on mobile) */ }
        register("atlas", "focus_energy_wave") { call -> emitGuidedIntakeFocus(moduleId = "atlas", focusActionType = call.type) }
        register("atlas", "focus_load_pressure") { call -> emitGuidedIntakeFocus(moduleId = "atlas", focusActionType = call.type) }
        register("atlas", "focus_recovery_constraints") { call -> emitGuidedIntakeFocus(moduleId = "atlas", focusActionType = call.type) }
        register("atlas", "focus_execution_baseline") { call -> emitGuidedIntakeFocus(moduleId = "atlas", focusActionType = call.type) }

        // -------------------------
        // Atlas spine event hooks
        // -------------------------
        register("atlas", "deadline_pressure_changed") { call ->
            val deadlinePressure =
                call.payload["deadlinePressure"]?.jsonPrimitive?.doubleOrNull
                    ?: call.payload["urgencyPressure"]?.jsonPrimitive?.doubleOrNull
                    ?: call.payload["pressure"]?.jsonPrimitive?.doubleOrNull

            deadlinePressure?.let { value ->
                nsvService.updateNsv(
                    mapOf("planning.deadlinePressure" to value.coerceIn(0.0, 10.0))
                )
            }
            eventBus.emit(SpineEventPayload(
                type = "DEADLINE_PRESSURE_CHANGED",
                source = "atlas",
                domain = "C",
                data = call.payload.toMap(),
                priority = "alert"
            ))
        }
        register("atlas", "planning_state_updated") { call ->
            eventBus.emit(SpineEventPayload(
                type = "PLANNING_STATE_UPDATED",
                source = "atlas",
                domain = "C",
                data = call.payload.toMap(),
                priority = "info"
            ))
        }
        register("atlas", "habit_streak_broken") { call ->
            val streakHealth =
                call.payload["streakHealth"]?.jsonPrimitive?.doubleOrNull
                    ?: call.payload["streakDays"]?.jsonPrimitive?.intOrNull?.let { streakDays ->
                        // Heuristic mapping: 0 days => 0 health, 7 days => 10 health.
                        (streakDays.toDouble() / 7.0 * 10.0).coerceIn(0.0, 10.0)
                    }

            streakHealth?.let { value ->
                nsvService.updateNsv(
                    mapOf("planning.streakHealth" to value)
                )
            }
            // Persist streak reset to profile
            val habitId = call.payload["habitId"]?.jsonPrimitive?.contentOrNull
            if (habitId != null) {
                call.userId?.let { uid ->
                    val profile = loadAtlasProfile(uid, call.encryptionKey)
                    val updated = profile.habits.map { h ->
                        if (h.id != habitId) h else h.copy(currentStreak = 0, updatedAt = nowIso())
                    }
                    saveAtlasProfile(uid, profile.copy(habits = updated, updatedAt = nowIso()), call.encryptionKey)
                }
            }
            eventBus.emit(SpineEventPayload(
                type = "HABIT_STREAK_BROKEN",
                source = "atlas",
                domain = "C",
                data = call.payload.toMap(),
                priority = "alert"
            ))
        }
        register("atlas", "journal_entry_created") { call ->
            call.userId?.let { uid ->
                val profile = loadAtlasProfile(uid, call.encryptionKey)
                val id = call.payload["id"]?.jsonPrimitive?.contentOrNull
                    ?: Clock.System.now().toEpochMilliseconds().toString()
                val now = nowIso()
                val entry = AtlasJournalEntry(
                    id = id,
                    date = call.payload["date"]?.jsonPrimitive?.contentOrNull ?: now.take(10),
                    mode = call.payload["mode"]?.jsonPrimitive?.contentOrNull ?: "free",
                    freeText = call.payload["freeText"]?.jsonPrimitive?.contentOrNull
                        ?: call.payload["content"]?.jsonPrimitive?.contentOrNull,
                    emojiRating = call.payload["emojiRating"]?.jsonPrimitive?.intOrNull ?: 3,
                    reflectiveTone = call.payload["reflectiveTone"]?.jsonPrimitive?.contentOrNull ?: "cheerful",
                    reflectivePrompt = call.payload["reflectivePrompt"]?.jsonPrimitive?.contentOrNull ?: "",
                    tags = (call.payload["tags"] as? JsonArray)?.mapNotNull { it.jsonPrimitive.contentOrNull } ?: emptyList(),
                    createdAt = now,
                    updatedAt = now
                )
                saveAtlasProfile(uid, profile.copy(
                    journalEntries = (listOf(entry) + profile.journalEntries).take(500),
                    updatedAt = now
                ), call.encryptionKey)
            }
            eventBus.emit(SpineEventPayload(
                type = "JOURNAL_ENTRY_CREATED",
                source = "atlas",
                domain = "C",
                data = call.payload.toMap(),
                priority = "info"
            ))
        }
        register("atlas", "atlas_state_changed") { call ->
            eventBus.emit(SpineEventPayload(
                type = "ATLAS_STATE_CHANGED",
                source = "atlas",
                domain = "C",
                data = call.payload.toMap(),
                priority = "info"
            ))
        }
        register("atlas", "routine_updated") { call ->
            eventBus.emit(SpineEventPayload(
                type = "ROUTINE_UPDATED",
                source = "atlas",
                domain = "C",
                data = call.payload.toMap(),
                priority = "alert"
            ))
        }

        // -------------------------
        // Ledger onboarding parity
        // -------------------------
        register("ledger", "update_ledger_profile") { call -> handleLedgerUpdateOnboardingProfile(call) }
        register("ledger", "complete_ledger_onboarding") { call -> handleLedgerCompleteOnboarding(call) }
        register("ledger", "update_global_base_context") { /* no-op (handled via prompts/local state on mobile) */ }
        register("ledger", "focus_income") { call -> emitGuidedIntakeFocus(moduleId = "ledger", focusActionType = call.type) }
        register("ledger", "focus_expenses") { call -> emitGuidedIntakeFocus(moduleId = "ledger", focusActionType = call.type) }
        register("ledger", "focus_debt_goals") { call -> emitGuidedIntakeFocus(moduleId = "ledger", focusActionType = call.type) }
        register("ledger", "focus_plan_horizon") { call -> emitGuidedIntakeFocus(moduleId = "ledger", focusActionType = call.type) }

        // -------------------------
        // Ledger spine event hooks
        // -------------------------
        register("ledger", "create_transaction") { call ->
            val uid = call.userId ?: return@register
            val profile = loadLedgerProfile(uid, call.encryptionKey)
            val amount = call.payload["amount"]?.jsonPrimitive?.doubleOrNull ?: return@register
            val description = call.payload["description"]?.jsonPrimitive?.contentOrNull ?: ""
            val type = call.payload["type"]?.jsonPrimitive?.contentOrNull ?: "expense"
            val category = call.payload["category"]?.jsonPrimitive?.contentOrNull ?: "Other"
            val date = call.payload["date"]?.jsonPrimitive?.contentOrNull ?: nowIso().take(10)
            val id = call.payload["id"]?.jsonPrimitive?.contentOrNull
                ?: Clock.System.now().toEpochMilliseconds().toString()
            val transaction = LedgerTransaction(
                id = id, date = date, description = description,
                amount = amount, type = type, category = category,
                notes = call.payload["notes"]?.jsonPrimitive?.contentOrNull
            )
            saveLedgerProfile(uid, profile.copy(
                transactions = profile.transactions + transaction, updatedAt = nowIso()
            ), call.encryptionKey)
            eventBus.emit(SpineEventPayload(
                type = "TRANSACTION_CREATED", source = "ledger", domain = "R",
                data = mapOf("moduleId" to "ledger", "transactionId" to id, "amount" to amount, "type" to type),
                priority = "info"
            ))
        }
        register("ledger", "update_transaction") { call ->
            val uid = call.userId ?: return@register
            val profile = loadLedgerProfile(uid, call.encryptionKey)
            val id = call.payload["id"]?.jsonPrimitive?.contentOrNull ?: return@register
            val updated = profile.transactions.map { t ->
                if (t.id != id) t else t.copy(
                    amount = call.payload["amount"]?.jsonPrimitive?.doubleOrNull ?: t.amount,
                    description = call.payload["description"]?.jsonPrimitive?.contentOrNull ?: t.description,
                    category = call.payload["category"]?.jsonPrimitive?.contentOrNull ?: t.category,
                    type = call.payload["type"]?.jsonPrimitive?.contentOrNull ?: t.type,
                    date = call.payload["date"]?.jsonPrimitive?.contentOrNull ?: t.date,
                    notes = call.payload["notes"]?.jsonPrimitive?.contentOrNull ?: t.notes
                )
            }
            saveLedgerProfile(uid, profile.copy(transactions = updated, updatedAt = nowIso()), call.encryptionKey)
            eventBus.emit(SpineEventPayload(
                type = "TRANSACTION_UPDATED", source = "ledger", domain = "R",
                data = mapOf("moduleId" to "ledger", "transactionId" to id),
                priority = "info"
            ))
        }
        register("ledger", "delete_transaction") { call ->
            val uid = call.userId ?: return@register
            val profile = loadLedgerProfile(uid, call.encryptionKey)
            val id = call.payload["id"]?.jsonPrimitive?.contentOrNull ?: return@register
            saveLedgerProfile(uid, profile.copy(
                transactions = profile.transactions.filter { it.id != id }, updatedAt = nowIso()
            ), call.encryptionKey)
            eventBus.emit(SpineEventPayload(
                type = "TRANSACTION_DELETED", source = "ledger", domain = "R",
                data = mapOf("moduleId" to "ledger", "transactionId" to id),
                priority = "info"
            ))
        }
        register("ledger", "update_budget") { call ->
            val uid = call.userId ?: return@register
            val profile = loadLedgerProfile(uid, call.encryptionKey)
            val id = call.payload["id"]?.jsonPrimitive?.contentOrNull ?: return@register
            val updated = profile.budgetCategories.map { b ->
                if (b.id != id) b else b.copy(
                    name = call.payload["name"]?.jsonPrimitive?.contentOrNull ?: b.name,
                    allocated = call.payload["allocated"]?.jsonPrimitive?.doubleOrNull ?: b.allocated,
                    spent = call.payload["spent"]?.jsonPrimitive?.doubleOrNull ?: b.spent,
                    color = call.payload["color"]?.jsonPrimitive?.contentOrNull ?: b.color
                )
            }
            saveLedgerProfile(uid, profile.copy(budgetCategories = updated, updatedAt = nowIso()), call.encryptionKey)
            eventBus.emit(SpineEventPayload(
                type = "BUDGET_UPDATED", source = "ledger", domain = "R",
                data = mapOf("moduleId" to "ledger", "budgetId" to id),
                priority = "info"
            ))
        }
        register("ledger", "create_budget") { call ->
            val uid = call.userId ?: return@register
            val profile = loadLedgerProfile(uid, call.encryptionKey)
            val name = call.payload["name"]?.jsonPrimitive?.contentOrNull ?: return@register
            val allocated = call.payload["allocated"]?.jsonPrimitive?.doubleOrNull ?: 0.0
            val id = call.payload["id"]?.jsonPrimitive?.contentOrNull
                ?: Clock.System.now().toEpochMilliseconds().toString()
            val budget = LedgerBudgetCategory(
                id = id, name = name, allocated = allocated,
                spent = call.payload["spent"]?.jsonPrimitive?.doubleOrNull ?: 0.0,
                color = call.payload["color"]?.jsonPrimitive?.contentOrNull ?: "#06b6d4"
            )
            saveLedgerProfile(uid, profile.copy(
                budgetCategories = profile.budgetCategories + budget, updatedAt = nowIso()
            ), call.encryptionKey)
            eventBus.emit(SpineEventPayload(
                type = "BUDGET_CREATED", source = "ledger", domain = "R",
                data = mapOf("moduleId" to "ledger", "budgetId" to id, "name" to name, "allocated" to allocated),
                priority = "info"
            ))
        }
        register("ledger", "goal_progress") { call ->
            val uid = call.userId ?: return@register
            val profile = loadLedgerProfile(uid, call.encryptionKey)
            val goalId = call.payload["goalId"]?.jsonPrimitive?.contentOrNull ?: return@register
            val delta = call.payload["delta"]?.jsonPrimitive?.doubleOrNull
            val newAmount = call.payload["newAmount"]?.jsonPrimitive?.doubleOrNull
            if (delta != null || newAmount != null) {
                val updated = profile.financialGoals.map { g ->
                    if (g.id != goalId) g else g.copy(
                        currentAmount = newAmount ?: (g.currentAmount + (delta ?: 0.0))
                    )
                }
                saveLedgerProfile(uid, profile.copy(financialGoals = updated, updatedAt = nowIso()), call.encryptionKey)
            }
            eventBus.emit(SpineEventPayload(
                type = "GOAL_PROGRESS", source = "ledger", domain = "R",
                data = call.payload.toMap(), priority = "info"
            ))
        }
        register("ledger", "risk_detected") { call ->
            eventBus.emit(SpineEventPayload(
                type = "RISK_DETECTED",
                source = "ledger",
                domain = "R",
                data = call.payload.toMap(),
                priority = "alert"
            ))
        }

        register("ledger", "update_financial_friction") { call ->
            val score = call.payload["score"]?.jsonPrimitive?.doubleOrNull ?: return@register
            if (score < 0.0 || score > 10.0) return@register
            nsvService.updateNsv(mapOf("resource.financialFriction" to score))
            eventBus.emit(SpineEventPayload(
                type = "FINANCIAL_FRICTION_CHANGED",
                source = "ledger",
                domain = "R",
                data = mapOf(
                    "moduleId" to "ledger",
                    "newScore" to score,
                    "tier" to frictionTier(score)
                ),
                priority = "info"
            ))
        }

        register("ledger", "compute_resonance_roi") { call ->
            val friction = call.payload["financialFriction"]?.jsonPrimitive?.doubleOrNull ?: return@register
            val roi = call.payload["resonanceROI"]?.jsonPrimitive?.doubleOrNull ?: return@register
            nsvService.updateNsv(mapOf(
                "resource.financialFriction" to friction,
                "resource.resonanceROI" to roi
            ))
            eventBus.emit(SpineEventPayload(
                type = "RESONANCE_ROI_UPDATED",
                source = "ledger",
                domain = "R",
                data = mapOf(
                    "moduleId" to "ledger",
                    "newROI" to roi,
                    "newFriction" to friction
                ),
                priority = "info"
            ))
        }

        register("ledger", "set_financial_goal") { call ->
            val name = call.payload["name"]?.jsonPrimitive?.contentOrNull ?: return@register
            val targetAmount = call.payload["targetAmount"]?.jsonPrimitive?.doubleOrNull ?: return@register
            val type = call.payload["type"]?.jsonPrimitive?.contentOrNull ?: "savings"
            val id = call.payload["id"]?.jsonPrimitive?.contentOrNull
                ?: Clock.System.now().toEpochMilliseconds().toString()
            val monthlyContribution = call.payload["monthlyContribution"]?.jsonPrimitive?.doubleOrNull ?: 0.0
            val priority = call.payload["priority"]?.jsonPrimitive?.contentOrNull ?: "medium"
            val goal = LedgerFinancialGoal(
                id = id, name = name, type = type, targetAmount = targetAmount,
                currentAmount = call.payload["currentAmount"]?.jsonPrimitive?.doubleOrNull ?: 0.0,
                monthlyContribution = monthlyContribution,
                targetDate = call.payload["targetDate"]?.jsonPrimitive?.contentOrNull,
                priority = priority,
                notes = call.payload["notes"]?.jsonPrimitive?.contentOrNull,
                createdAt = nowIso()
            )
            call.userId?.let { uid ->
                val profile = loadLedgerProfile(uid, call.encryptionKey)
                saveLedgerProfile(uid, profile.copy(
                    financialGoals = profile.financialGoals + goal, updatedAt = nowIso()
                ), call.encryptionKey)
            }
            eventBus.emit(SpineEventPayload(
                type = "GOAL_CREATED", source = "ledger", domain = "R",
                data = mapOf("moduleId" to "ledger", "goalId" to id, "name" to name, "targetAmount" to targetAmount, "type" to type, "monthlyContribution" to monthlyContribution, "priority" to priority),
                priority = "info"
            ))
        }

        register("ledger", "update_goal_progress") { call ->
            val goalId = call.payload["goalId"]?.jsonPrimitive?.contentOrNull ?: return@register
            val delta = call.payload["delta"]?.jsonPrimitive?.doubleOrNull
            val newAmount = call.payload["newAmount"]?.jsonPrimitive?.doubleOrNull
            call.userId?.let { uid ->
                val profile = loadLedgerProfile(uid, call.encryptionKey)
                val updated = profile.financialGoals.map { g ->
                    if (g.id != goalId) g else g.copy(
                        currentAmount = newAmount ?: (g.currentAmount + (delta ?: 0.0))
                    )
                }
                saveLedgerProfile(uid, profile.copy(financialGoals = updated, updatedAt = nowIso()), call.encryptionKey)
            }
            eventBus.emit(SpineEventPayload(
                type = "GOAL_PROGRESS", source = "ledger", domain = "R",
                data = buildMap {
                    put("moduleId", "ledger"); put("goalId", goalId)
                    if (delta != null) put("delta", delta)
                    if (newAmount != null) put("newAmount", newAmount)
                },
                priority = "info"
            ))
        }

        register("ledger", "complete_goal") { call ->
            val goalId = call.payload["goalId"]?.jsonPrimitive?.contentOrNull ?: return@register
            call.userId?.let { uid ->
                val profile = loadLedgerProfile(uid, call.encryptionKey)
                // Mark complete by setting currentAmount = targetAmount
                val updated = profile.financialGoals.map { g ->
                    if (g.id != goalId) g else g.copy(currentAmount = g.targetAmount)
                }
                saveLedgerProfile(uid, profile.copy(financialGoals = updated, updatedAt = nowIso()), call.encryptionKey)
            }
            eventBus.emit(SpineEventPayload(
                type = "GOAL_COMPLETED", source = "ledger", domain = "R",
                data = mapOf("moduleId" to "ledger", "goalId" to goalId),
                priority = "alert"
            ))
        }

        register("ledger", "add_transaction") { call ->
            val amount = call.payload["amount"]?.jsonPrimitive?.doubleOrNull ?: return@register
            val type = call.payload["type"]?.jsonPrimitive?.contentOrNull ?: "expense"
            val category = call.payload["category"]?.jsonPrimitive?.contentOrNull ?: "Other"
            val description = call.payload["description"]?.jsonPrimitive?.contentOrNull ?: ""
            val date = call.payload["date"]?.jsonPrimitive?.contentOrNull ?: nowIso().take(10)
            val id = Clock.System.now().toEpochMilliseconds().toString()
            val transaction = LedgerTransaction(
                id = id, date = date, description = description,
                amount = amount, type = type, category = category,
                notes = call.payload["note"]?.jsonPrimitive?.contentOrNull
                    ?: call.payload["notes"]?.jsonPrimitive?.contentOrNull
            )
            call.userId?.let { uid ->
                val profile = loadLedgerProfile(uid, call.encryptionKey)
                saveLedgerProfile(uid, profile.copy(
                    transactions = profile.transactions + transaction, updatedAt = nowIso()
                ), call.encryptionKey)
            }
            eventBus.emit(SpineEventPayload(
                type = "TRANSACTION_CREATED", source = "ledger", domain = "R",
                data = mapOf("moduleId" to "ledger", "transactionId" to id, "amount" to amount, "type" to type, "category" to category, "description" to description),
                priority = "info"
            ))
        }

        register("ledger", "detect_data_hint") { call ->
            val targetModule = call.payload["targetModule"]?.jsonPrimitive?.contentOrNull ?: return@register
            val field = call.payload["field"]?.jsonPrimitive?.contentOrNull ?: return@register
            val inferredValue = call.payload["inferredValue"]?.jsonPrimitive?.contentOrNull ?: return@register
            val confidence = call.payload["confidence"]?.jsonPrimitive?.doubleOrNull ?: 0.0
            if (confidence < 0.75) return@register
            val sourceModule = call.payload["sourceModule"]?.jsonPrimitive?.contentOrNull ?: call.moduleId ?: "ledger"
            eventBus.emit(SpineEventPayload(
                type = "DATA_HINT_DETECTED",
                source = "ledger",
                domain = "C",
                data = mapOf(
                    "sourceModule" to sourceModule,
                    "targetModule" to targetModule,
                    "field" to field,
                    "inferredValue" to inferredValue,
                    "confidence" to confidence
                ),
                priority = "info"
            ))
        }

        register("ledger", "run_debt_simulation") { call ->
            val strategy = call.payload["strategy"]?.jsonPrimitive?.contentOrNull ?: "avalanche"
            eventBus.emit(SpineEventPayload(
                type = "DEBT_SIMULATION_RUN",
                source = "ledger",
                domain = "R",
                data = mapOf("strategy" to strategy),
                priority = "info"
            ))
        }

        register("ledger", "analyze_financial_document") { call ->
            val monthlyIncome = call.payload["monthlyIncome"]?.jsonPrimitive?.doubleOrNull ?: 0.0
            val currency = call.payload["currency"]?.jsonPrimitive?.contentOrNull ?: "USD"
            val periodLabel = call.payload["periodLabel"]?.jsonPrimitive?.contentOrNull ?: "Unknown Period"
            eventBus.emit(SpineEventPayload(
                type = "DOCUMENT_ANALYZED",
                source = "ledger",
                domain = "R",
                data = mapOf(
                    "monthlyIncome" to monthlyIncome,
                    "currency" to currency,
                    "periodLabel" to periodLabel
                ),
                priority = "info"
            ))
        }

        register("ledger", "financial_health_check") { call ->
            val checkType = call.payload["checkType"]?.jsonPrimitive?.contentOrNull ?: "general"
            eventBus.emit(SpineEventPayload(
                type = "FINANCIAL_HEALTH_CHECK",
                source = "ledger",
                domain = "R",
                data = mapOf("checkType" to checkType),
                priority = "info"
            ))
        }

        register("ledger", "query_reminders") { call ->
            val moduleId = call.payload["moduleId"]?.jsonPrimitive?.contentOrNull ?: call.moduleId ?: "ledger"
            eventBus.emit(SpineEventPayload(
                type = "REMINDERS_QUERIED",
                source = "ledger",
                domain = "R",
                data = mapOf("moduleId" to moduleId),
                priority = "info"
            ))
        }

        // -------------------------
        // Ledger extended action parity
        // -------------------------
        register("ledger", "commit_transaction") { call ->
            val uid = call.userId ?: return@register
            val profile = loadLedgerProfile(uid, call.encryptionKey)
            val amount = call.payload["amount"]?.jsonPrimitive?.doubleOrNull ?: return@register
            val description = call.payload["description"]?.jsonPrimitive?.content ?: return@register
            val type = call.payload["type"]?.jsonPrimitive?.content ?: "expense"
            val category = call.payload["category"]?.jsonPrimitive?.content ?: "Other"
            val date = call.payload["date"]?.jsonPrimitive?.content ?: nowIso().take(10)
            val id = call.payload["id"]?.jsonPrimitive?.content
                ?: Clock.System.now().toEpochMilliseconds().toString()
            val transaction = LedgerTransaction(
                id = id,
                date = date,
                description = description,
                amount = amount,
                type = type,
                category = category,
                notes = call.payload["notes"]?.jsonPrimitive?.content
            )
            val updatedCommit = profile.copy(
                transactions = profile.transactions + transaction,
                updatedAt = nowIso()
            )
            saveLedgerProfile(uid, updatedCommit, call.encryptionKey)
            eventBus.emit(SpineEventPayload(
                type = "TRANSACTION_CREATED",
                source = "ledger",
                domain = "R",
                data = mapOf("moduleId" to "ledger", "transactionId" to id, "amount" to amount, "type" to type),
                priority = "info"
            ))
            val totalExpenses = updatedCommit.transactions.filter { it.type == "expense" }.sumOf { it.amount }
            val totalIncome = updatedCommit.transactions.filter { it.type == "income" }.sumOf { it.amount }
            if (totalIncome > 0 && totalExpenses > totalIncome) {
                eventBus.emit(SpineEventPayload(
                    type = "OVERSPEND_DETECTED",
                    source = "ledger",
                    domain = "R",
                    data = mapOf("moduleId" to "ledger", "totalExpenses" to totalExpenses, "totalIncome" to totalIncome),
                    priority = "alert"
                ))
            }
        }

        register("ledger", "categorize_expense") { call ->
            val uid = call.userId ?: return@register
            val profile = loadLedgerProfile(uid, call.encryptionKey)
            val transactionId = call.payload["transactionId"]?.jsonPrimitive?.content ?: return@register
            val category = call.payload["category"]?.jsonPrimitive?.content ?: return@register
            val updatedCat = profile.copy(
                transactions = profile.transactions.map {
                    if (it.id == transactionId) it.copy(category = category) else it
                },
                updatedAt = nowIso()
            )
            saveLedgerProfile(uid, updatedCat, call.encryptionKey)
            eventBus.emit(SpineEventPayload(
                type = "TRANSACTION_UPDATED",
                source = "ledger",
                domain = "R",
                data = mapOf("moduleId" to "ledger", "transactionId" to transactionId, "category" to category),
                priority = "info"
            ))
        }

        register("ledger", "create_financial_goal") { call ->
            val uid = call.userId ?: return@register
            val profile = loadLedgerProfile(uid, call.encryptionKey)
            val name = call.payload["name"]?.jsonPrimitive?.content ?: return@register
            val targetAmount = call.payload["targetAmount"]?.jsonPrimitive?.doubleOrNull ?: return@register
            val type = call.payload["type"]?.jsonPrimitive?.content ?: "savings"
            val id = call.payload["id"]?.jsonPrimitive?.content
                ?: Clock.System.now().toEpochMilliseconds().toString()
            val goal = LedgerFinancialGoal(
                id = id,
                name = name,
                type = type,
                targetAmount = targetAmount,
                currentAmount = call.payload["currentAmount"]?.jsonPrimitive?.doubleOrNull ?: 0.0,
                monthlyContribution = call.payload["monthlyContribution"]?.jsonPrimitive?.doubleOrNull ?: 0.0,
                targetDate = call.payload["targetDate"]?.jsonPrimitive?.content,
                priority = call.payload["priority"]?.jsonPrimitive?.content ?: "medium",
                notes = call.payload["notes"]?.jsonPrimitive?.content,
                createdAt = nowIso()
            )
            val updatedGoal = profile.copy(
                financialGoals = profile.financialGoals + goal,
                updatedAt = nowIso()
            )
            saveLedgerProfile(uid, updatedGoal, call.encryptionKey)
            eventBus.emit(SpineEventPayload(
                type = "GOAL_PROGRESS",
                source = "ledger",
                domain = "R",
                data = mapOf("moduleId" to "ledger", "goalId" to id, "goalName" to name, "targetAmount" to targetAmount),
                priority = "info"
            ))
        }

        register("ledger", "flag_anomaly") { call ->
            eventBus.emit(SpineEventPayload(
                type = "EXPENSE_SPIKE",
                source = "ledger",
                domain = "R",
                data = call.payload.toMap() + mapOf("moduleId" to "ledger"),
                priority = "alert"
            ))
        }

        register("ledger", "project_savings_timeline") { call ->
            val uid = call.userId ?: return@register
            val goalId = call.payload["goalId"]?.jsonPrimitive?.content
            val projectedMonths = call.payload["projectedMonths"]?.jsonPrimitive?.doubleOrNull ?: 0.0
            eventBus.emit(SpineEventPayload(
                type = "SAVINGS_MILESTONE",
                source = "ledger",
                domain = "R",
                data = mapOf(
                    "moduleId" to "ledger",
                    "userId" to uid,
                    "goalId" to (goalId ?: ""),
                    "projectedMonths" to projectedMonths
                ),
                priority = "info"
            ))
        }

        register("ledger", "log_income_change") { call ->
            val uid = call.userId ?: return@register
            val profile = loadLedgerProfile(uid, call.encryptionKey)
            val newIncome = call.payload["newIncome"]?.jsonPrimitive?.doubleOrNull ?: return@register
            val reason = call.payload["reason"]?.jsonPrimitive?.content ?: "manual"
            val updatedIncome = profile.copy(monthlyIncome = newIncome, updatedAt = nowIso())
            saveLedgerProfile(uid, updatedIncome, call.encryptionKey)
            val cashflowPositive = newIncome > profile.monthlyIncome
            eventBus.emit(SpineEventPayload(
                type = "INCOME_CHANGE",
                source = "ledger",
                domain = "R",
                data = mapOf(
                    "moduleId" to "ledger",
                    "previousIncome" to profile.monthlyIncome,
                    "newIncome" to newIncome,
                    "reason" to reason
                ),
                priority = "info"
            ))
            eventBus.emit(SpineEventPayload(
                type = if (cashflowPositive) "CASHFLOW_POSITIVE" else "CASHFLOW_NEGATIVE",
                source = "ledger",
                domain = "R",
                data = mapOf("moduleId" to "ledger", "monthlyIncome" to newIncome),
                priority = "info"
            ))
        }

        register("ledger", "add_debt_item") { call ->
            val uid = call.userId ?: return@register
            val profile = loadLedgerProfile(uid, call.encryptionKey)
            val name = call.payload["name"]?.jsonPrimitive?.content ?: return@register
            val balance = call.payload["balance"]?.jsonPrimitive?.doubleOrNull ?: return@register
            val id = call.payload["id"]?.jsonPrimitive?.content
                ?: Clock.System.now().toEpochMilliseconds().toString()
            val typeRaw = call.payload["type"]?.jsonPrimitive?.content?.uppercase()
            val debtType = typeRaw?.let { runCatching { DebtType.valueOf(it) }.getOrNull() }
            val debt = DebtItem(
                id = id,
                name = name,
                balance = balance,
                apr = call.payload["apr"]?.jsonPrimitive?.doubleOrNull,
                minPayment = call.payload["minPayment"]?.jsonPrimitive?.doubleOrNull,
                type = debtType,
                dueDay = call.payload["dueDay"]?.jsonPrimitive?.intOrNull,
                variableRate = call.payload["variableRate"]?.jsonPrimitive?.booleanOrNull ?: false
            )
            val updatedDebt = profile.copy(debtItems = profile.debtItems + debt, updatedAt = nowIso())
            saveLedgerProfile(uid, updatedDebt, call.encryptionKey)
            eventBus.emit(SpineEventPayload(
                type = "DEBT_MILESTONE",
                source = "ledger",
                domain = "R",
                data = mapOf("moduleId" to "ledger", "debtId" to id, "debtName" to name, "balance" to balance),
                priority = "info"
            ))
        }

        register("ledger", "update_debt_item") { call ->
            val uid = call.userId ?: return@register
            val profile = loadLedgerProfile(uid, call.encryptionKey)
            val id = call.payload["id"]?.jsonPrimitive?.content ?: return@register
            val updatedDebtItem = profile.copy(
                debtItems = profile.debtItems.map { debt ->
                    if (debt.id != id) debt else debt.copy(
                        name = call.payload["name"]?.jsonPrimitive?.content ?: debt.name,
                        balance = call.payload["balance"]?.jsonPrimitive?.doubleOrNull ?: debt.balance,
                        apr = call.payload["apr"]?.jsonPrimitive?.doubleOrNull ?: debt.apr,
                        minPayment = call.payload["minPayment"]?.jsonPrimitive?.doubleOrNull ?: debt.minPayment
                    )
                },
                updatedAt = nowIso()
            )
            saveLedgerProfile(uid, updatedDebtItem, call.encryptionKey)
            val totalDebt = updatedDebtItem.debtItems.sumOf { it.balance }
            eventBus.emit(SpineEventPayload(
                type = "DEBT_MILESTONE",
                source = "ledger",
                domain = "R",
                data = mapOf("moduleId" to "ledger", "debtId" to id, "totalDebt" to totalDebt),
                priority = "info"
            ))
        }

        register("ledger", "financial_streak_milestone") { call ->
            val streakDays = call.payload["streakDays"]?.jsonPrimitive?.intOrNull ?: 0
            nsvService.updateNsv(mapOf("resource.financialFriction" to 0.0))
            eventBus.emit(SpineEventPayload(
                type = "FINANCIAL_STREAK_MILESTONE",
                source = "ledger",
                domain = "R",
                data = mapOf("moduleId" to "ledger", "streakDays" to streakDays),
                priority = "info"
            ))
        }

        register("ledger", "budget_alert") { call ->
            val category = call.payload["category"]?.jsonPrimitive?.content ?: "unknown"
            val percentUsed = call.payload["percentUsed"]?.jsonPrimitive?.doubleOrNull ?: 100.0
            eventBus.emit(SpineEventPayload(
                type = "BUDGET_ALERT",
                source = "ledger",
                domain = "R",
                data = mapOf("moduleId" to "ledger", "category" to category, "percentUsed" to percentUsed),
                priority = "alert"
            ))
        }

        // -------------------------
        // Titan onboarding + training parity with web
        // -------------------------
        register("titan", "update_titan_profile") { call -> handleTitanUpdateOnboardingProfile(call) }
        register("titan", "complete_titan_onboarding") { call -> handleTitanCompleteOnboarding(call) }
        register("titan", "update_routine") { call -> handleTitanUpdateRoutine(call) }
        register("titan", "log_workout_session") { call -> handleTitanLogWorkoutSession(call) }
        register("titan", "log_workout_set") { call -> handleTitanLogWorkoutSet(call) }
        register("titan", "log_sleep") { call -> handleTitanLogSleep(call) }
        register("titan", "create_cycle") { call -> handleTitanCreateCycle(call) }
        register("titan", "advance_cycle_phase") { call -> handleTitanAdvanceCyclePhase(call) }
        register("titan", "complete_cycle") { call -> handleTitanCompleteCycle(call) }
        register("titan", "log_body_weight") { call -> handleTitanLogBodyWeight(call) }
        register("titan", "log_cardio_session") { call -> handleTitanLogCardioSession(call) }
        register("titan", "log_body_fat") { call -> handleTitanLogBodyFat(call) }
        register("titan", "log_injury") { call -> handleTitanLogInjury(call) }
        register("titan", "update_injury_status") { call -> handleTitanUpdateInjuryStatus(call) }
        register("titan", "log_supplement") { call -> handleTitanLogSupplement(call) }
        register("titan", "log_meal") { call -> handleTitanLogMeal(call) }
        register("titan", "log_macros") { call -> handleTitanLogMacros(call) }
        register("titan", "schedule_workout") { call -> handleTitanScheduleWorkout(call) }
        register("titan", "update_planned_workout") { call -> handleTitanUpdatePlannedWorkout(call) }
        register("titan", "update_global_base_context") { /* no-op */ }
        register("titan", "focus_nutrition") { call -> emitGuidedIntakeFocus(moduleId = "titan", focusActionType = call.type) }
        register("titan", "focus_physical_data") { call -> emitGuidedIntakeFocus(moduleId = "titan", focusActionType = call.type) }
        register("titan", "focus_history_goals") { call -> emitGuidedIntakeFocus(moduleId = "titan", focusActionType = call.type) }

        // -------------------------
        // Scout onboarding parity
        // -------------------------
        register("scout", "update_scout_profile") { call -> handleScoutUpdateOnboardingProfile(call) }
        register("scout", "complete_scout_onboarding") { call -> handleScoutCompleteOnboarding(call) }
        register("scout", "update_global_base_context") { /* no-op */ }
        register("scout", "focus_research_focus") { call -> emitGuidedIntakeFocus(moduleId = "scout", focusActionType = call.type) }
        register("scout", "focus_evidence_quality") { call -> emitGuidedIntakeFocus(moduleId = "scout", focusActionType = call.type) }
        register("scout", "focus_output_shape") { call -> emitGuidedIntakeFocus(moduleId = "scout", focusActionType = call.type) }
        register("scout", "focus_baseline_summary") { call -> emitGuidedIntakeFocus(moduleId = "scout", focusActionType = call.type) }
        // Scout research parity
        register("scout", "start_deep_research") { call -> handleScoutStartDeepResearch(call) }
        register("scout", "synthesize_knowledge") { call -> handleScoutGenerateDigest(call) }
        register("scout", "add_sources") { call -> handleScoutAddSource(call) }
        register("scout", "add_source") { call -> handleScoutAddSource(call) }
        register("scout", "add_knowledge_node") { call -> handleScoutAddKnowledgeNode(call) }
        register("scout", "extract_citation") { call -> handleScoutExtractCitation(call) }
        register("scout", "extract_finding") { call -> handleScoutExtractFinding(call) }
        register("scout", "commit_research_session") { call -> handleScoutCommitResearchSession(call) }
        register("scout", "generate_digest") { call -> handleScoutGenerateDigest(call) }
        register("scout", "export_research") { call -> handleScoutExportResearch(call) }
        register("scout", "flag_anomaly") { call -> handleScoutFlagAnomaly(call) }
        register("scout", "web_search") { call ->
            val query = call.payload["query"]?.jsonPrimitive?.contentOrNull ?: return@register
            eventBus.emit(SpineEventPayload(
                type = "SCOUT_WEB_SEARCH_REQUESTED",
                source = "scout",
                domain = "R",
                data = mapOf("query" to query, "moduleId" to "scout"),
                priority = "info"
            ))
        }

        // -------------------------
        // Forge onboarding parity
        // -------------------------
        register("forge", "update_forge_profile") { call -> handleForgeUpdateOnboardingProfile(call) }
        register("forge", "complete_forge_onboarding") { call -> handleForgeCompleteOnboarding(call) }
        register("forge", "update_global_base_context") { /* no-op */ }
        register("forge", "focus_environment") { call -> emitGuidedIntakeFocus(moduleId = "forge", focusActionType = call.type) }
        register("forge", "focus_safety") { call -> emitGuidedIntakeFocus(moduleId = "forge", focusActionType = call.type) }
        register("forge", "focus_reporting") { call -> emitGuidedIntakeFocus(moduleId = "forge", focusActionType = call.type) }
        register("forge", "focus_summary") { call -> emitGuidedIntakeFocus(moduleId = "forge", focusActionType = call.type) }
        register("forge", "execute_code") { call -> handleForgeExecuteCode(call) }
        register("forge", "create_artifact") { call -> handleForgeCreateArtifact(call) }
        register("forge", "update_artifact") { call -> handleForgeUpdateArtifact(call) }
        register("forge", "run_tests") { call -> handleForgeRunTests(call) }
        register("forge", "draft_communication") { call -> handleForgeDraftCommunication(call) }
        register("forge", "draft_document") { call -> handleForgeDraftDocument(call) }
        register("forge", "schedule_life_task") { call -> handleForgeScheduleLifeTask(call) }
        register("forge", "log_execution") { call -> handleForgeLogExecution(call) }

        // -------------------------
        // Agnes onboarding parity
        // -------------------------
        register("agnes", "update_agnes_profile") { call -> handleAgnesUpdateOnboardingProfile(call) }
        register("agnes", "update_belief_graph") { call -> handleAgnesUpdateBeliefGraph(call) }
        register("agnes", "complete_agnes_onboarding") { call -> handleAgnesCompleteOnboarding(call) }
        register("agnes", "focus_identity") { call -> emitGuidedIntakeFocus(moduleId = "agnes", focusActionType = call.type) }
        register("agnes", "focus_background") { call -> emitGuidedIntakeFocus(moduleId = "agnes", focusActionType = call.type) }
        register("agnes", "focus_struggles") { call -> emitGuidedIntakeFocus(moduleId = "agnes", focusActionType = call.type) }
        register("agnes", "focus_goals") { call -> emitGuidedIntakeFocus(moduleId = "agnes", focusActionType = call.type) }
        register("agnes", "focus_preferences") { call -> emitGuidedIntakeFocus(moduleId = "agnes", focusActionType = call.type) }

        // -------------------------
        // Agnes somatic + session parity actions
        // -------------------------

        register("agnes", "start_somatic_session") { call ->
            val sessionType = call.payload["sessionType"]?.jsonPrimitive?.content ?: "breathwork"
            val calmingTypes = setOf("breathwork", "body_scan", "grounding", "meditation")
            eventBus.emit(
                SpineEventPayload(
                    type = "SESSION_STARTED",
                    source = "agnes",
                    domain = "E",
                    data = mapOf(
                        "moduleId" to "agnes",
                        "sessionType" to sessionType,
                        "timestamp" to nowIso()
                    ),
                    priority = "info"
                )
            )
            if (sessionType.lowercase() in calmingTypes) {
                // Calming exercises emit a stress-load delta; ViewModel tracks absolute value.
                eventBus.emit(
                    SpineEventPayload(
                        type = "VITAL_UPDATED",
                        source = "agnes",
                        domain = "E",
                        data = mapOf(
                            "stressLoadDelta" to -1.0,
                            "source" to "somatic_session_start",
                            "sessionType" to sessionType
                        ),
                        priority = "info"
                    )
                )
            }
        }

        // log_session_outcome: emit SESSION_ENDED with outcome data, update emotionalResilience.
        register("agnes", "log_session_outcome") { call ->
            val outcomeScore = call.payload["outcomeScore"]?.jsonPrimitive?.doubleOrNull
                ?: call.payload["score"]?.jsonPrimitive?.doubleOrNull
                ?: 5.0
            val sessionId = call.payload["sessionId"]?.jsonPrimitive?.content ?: ""
            val notes = call.payload["notes"]?.jsonPrimitive?.content ?: ""
            eventBus.emit(
                SpineEventPayload(
                    type = "SESSION_ENDED",
                    source = "agnes",
                    domain = "E",
                    data = mapOf(
                        "moduleId" to "agnes",
                        "sessionId" to sessionId,
                        "outcomeScore" to outcomeScore,
                        "notes" to notes,
                        "timestamp" to nowIso()
                    ),
                    priority = "info"
                )
            )
            // Positive outcome raises resilience; emit as a delta via spine for ViewModel to apply.
            val resilienceDelta = ((outcomeScore - 5.0) * 0.2).coerceIn(-0.5, 1.0)
            if (resilienceDelta > 0.0) {
                eventBus.emit(
                    SpineEventPayload(
                        type = "VITAL_UPDATED",
                        source = "agnes",
                        domain = "E",
                        data = mapOf(
                            "emotionalResilienceDelta" to resilienceDelta,
                            "source" to "session_outcome",
                            "outcomeScore" to outcomeScore
                        ),
                        priority = "info"
                    )
                )
            }
        }

        // propose_somatic_exercise: emit SOMATIC_SUPPORT_REQUESTED (domain=E) with exercise type in payload.
        register("agnes", "propose_somatic_exercise") { call ->
            val exerciseType = call.payload["exerciseType"]?.jsonPrimitive?.content ?: "breathwork"
            eventBus.emit(
                SpineEventPayload(
                    type = "SOMATIC_SUPPORT_REQUESTED",
                    source = "agnes",
                    domain = "E",
                    data = mapOf(
                        "moduleId" to "agnes",
                        "exerciseType" to exerciseType,
                        "timestamp" to nowIso()
                    ),
                    priority = "info"
                )
            )
        }

        // log_breathing_round: emit SOMATIC_COMPLETED (domain=E) with round count, lower stressLoad.
        register("agnes", "log_breathing_round") { call ->
            val roundCount = call.payload["roundCount"]?.jsonPrimitive?.intOrNull
                ?: call.payload["rounds"]?.jsonPrimitive?.intOrNull
                ?: 1
            eventBus.emit(
                SpineEventPayload(
                    type = "SOMATIC_COMPLETED",
                    source = "agnes",
                    domain = "E",
                    data = mapOf(
                        "moduleId" to "agnes",
                        "exerciseType" to "breathwork",
                        "roundCount" to roundCount,
                        "timestamp" to nowIso()
                    ),
                    priority = "info"
                )
            )
            // Each completed breathing round incrementally reduces stress load via delta.
            val stressReduction = (roundCount * 0.2).coerceAtMost(1.5)
            eventBus.emit(
                SpineEventPayload(
                    type = "VITAL_UPDATED",
                    source = "agnes",
                    domain = "E",
                    data = mapOf(
                        "stressLoadDelta" to -stressReduction,
                        "source" to "breathing_round",
                        "roundCount" to roundCount
                    ),
                    priority = "info"
                )
            )
        }

        // flag_crisis_resource: emit CRISIS_RESOLVED (domain=E, priority=info) to close active crisis state.
        register("agnes", "flag_crisis_resource") { call ->
            val resourceType = call.payload["resourceType"]?.jsonPrimitive?.content ?: "general"
            val note = call.payload["note"]?.jsonPrimitive?.content ?: ""
            eventBus.emit(
                SpineEventPayload(
                    type = "CRISIS_RESOLVED",
                    source = "agnes",
                    domain = "E",
                    data = mapOf(
                        "moduleId" to "agnes",
                        "resourceType" to resourceType,
                        "note" to note,
                        "timestamp" to nowIso()
                    ),
                    priority = "info"
                )
            )
        }

        // -------------------------
        // Orchestrator onboarding parity
        // -------------------------
        register("orchestrator", "complete_orchestrator_onboarding") { call -> handleOrchestratorCompleteOnboarding(call) }
        register("orchestrator", "focus_identity") { call -> emitGuidedIntakeFocus(moduleId = "orchestrator", focusActionType = call.type) }
        register("orchestrator", "focus_bio") { call -> emitGuidedIntakeFocus(moduleId = "orchestrator", focusActionType = call.type) }
        register("orchestrator", "focus_review") { call -> emitGuidedIntakeFocus(moduleId = "orchestrator", focusActionType = call.type) }

    }

    private suspend fun emitGuidedIntakeFocus(moduleId: String, focusActionType: String) {
        // Guided-intake step index is computed in each module ViewModel by parsing the assistant message tags.
        // This spine event exists for observability and future UI hooks without changing the step algorithm.
        eventBus.emit(
            SpineEventPayload(
                type = "${moduleId.uppercase()}_GUIDED_INTAKE_FOCUS",
                source = moduleId,
                domain = "system",
                data = mapOf(
                    "moduleId" to moduleId,
                    "focusActionType" to focusActionType
                ),
                priority = "info"
            )
        )
    }

    fun register(moduleId: String, type: String, handler: suspend (ActionCall) -> Unit) {
        val map = registry.getOrPut(moduleId) { mutableMapOf() }
        map[type] = handler
    }

    fun registerMultiple(moduleId: String, handlers: Map<String, suspend (ActionCall) -> Unit>) {
        handlers.forEach { (type, handler) -> register(moduleId, type, handler) }
    }

    fun addDependency(moduleId: String, dependsOn: String) {
        dependencies.getOrPut(moduleId) { mutableSetOf() }.add(dependsOn)
    }

    suspend fun execute(action: ActionCall) {
        val moduleId = action.moduleId ?: resolveModuleId(action) ?: "orchestrator"

        if (nsvReadOnlyModules.contains(moduleId) && nsvWriteActionTypes.contains(action.type)) {
            NexusLogger.warn("ActionHub", "Module \"$moduleId\" is NSV read-only; blocked ${action.type}")
            return
        }

        val handler = registry[moduleId]?.get(action.type)
        if (handler != null) {
            handler.invoke(action)
            NexusLogger.action(moduleId, action.type, action.payload.toMap())
            return
        }

        val deps = dependencies[moduleId]
        if (deps != null) {
            deps.forEach { dep ->
                val depHandler = registry[dep]?.get(action.type)
                if (depHandler != null) {
                    depHandler.invoke(action)
                    NexusLogger.action(moduleId, action.type, action.payload.toMap())
                    return
                }
            }
        }

        val orchestratorHandler = registry["orchestrator"]?.get(action.type)
        if (orchestratorHandler != null) {
            orchestratorHandler.invoke(action)
            NexusLogger.action(moduleId, action.type, action.payload.toMap())
            return
        }

        NexusLogger.warn("ActionHub", "No handler for \"${action.type}\" in module \"$moduleId\"")
    }

    /**
     * Returns true if [actionType] has a registered handler reachable from [moduleId]
     * (module's own registry, its declared dependencies, or the orchestrator fallback).
     * Used by [ActionHubJs] to signal to the TS bridge whether delegation was handled.
     */
    fun isRegistered(moduleId: String, actionType: String): Boolean {
        if (registry[moduleId]?.containsKey(actionType) == true) return true
        val deps = dependencies[moduleId]
        if (deps != null) {
            for (dep in deps) {
                if (registry[dep]?.containsKey(actionType) == true) return true
            }
        }
        return registry["orchestrator"]?.containsKey(actionType) == true
    }

    private fun JsonObject.toMap(): Map<String, Any?> {
        return entries.associate { (key, value) ->
            key to value.toAny()
        }
    }

    private fun JsonElement.toAny(): Any? {
        return when (this) {
            is JsonPrimitive -> {
                // Use toString() (JSON repr) to detect string primitives.
                // doubleOrNull / booleanOrNull lose type info for numeric-content strings
                // (e.g. timestamp IDs) in Kotlin/JS IR — they coerce "1774963752017" → Double.
                val repr = toString()
                when {
                    repr == "null"        -> null
                    repr == "true"        -> true
                    repr == "false"       -> false
                    repr.startsWith("\"") ->
                        repr.substring(1, repr.length - 1)
                            .replace("\\\"", "\"")
                            .replace("\\\\", "\\")
                    else -> doubleOrNull ?: content
                }
            }
            is JsonObject -> this.toMap()
            is JsonArray  -> this.map { it.toAny() }
            else          -> toString()
        }
    }

    // ─── Reminder pipeline ────────────────────────────────────────────────────

    private suspend fun handleProposeReminder(call: ActionCall, moduleId: String) {
        val uid = call.userId
        val layer = dataLayer
        if (uid.isNullOrBlank() || layer == null) {
            // No data layer — emit a draft-proposed event so UI can show a confirmation
            eventBus.emit(SpineEventPayload(
                type = "DRAFT_PROPOSED",
                source = moduleId,
                domain = "system",
                data = call.payload.toMap() + mapOf(
                    "title" to (call.payload["title"]?.jsonPrimitive?.contentOrNull ?: "Reminder"),
                    "actionType" to call.type,
                    "source" to moduleId
                ),
                priority = "info"
            ))
            return
        }

        val payload = call.payload
        val now = nowIso()
        val title = payload["title"]?.jsonPrimitive?.contentOrNull
            ?: payload["label"]?.jsonPrimitive?.contentOrNull
            ?: "Reminder"
        val message = payload["message"]?.jsonPrimitive?.contentOrNull
            ?: payload["note"]?.jsonPrimitive?.contentOrNull
            ?: payload["body"]?.jsonPrimitive?.contentOrNull
            ?: ""
        val scheduledAt = payload["scheduledAt"]?.jsonPrimitive?.contentOrNull
            ?: payload["scheduled_at"]?.jsonPrimitive?.contentOrNull
            ?: now
        val type = payload["type"]?.jsonPrimitive?.contentOrNull ?: "one-time"
        val recurrence = payload["recurrence"]?.jsonPrimitive?.contentOrNull ?: ""
        val reminderId = "reminder_${uid}_${moduleId}_${Clock.System.now().toEpochMilliseconds()}"

        val reminderDoc = mapOf(
            "id" to reminderId,
            "moduleId" to moduleId,
            "title" to title,
            "message" to message,
            "scheduledAt" to scheduledAt,
            "type" to type,
            "recurrence" to recurrence,
            "status" to "pending",
            "createdAt" to now
        )

        runCatching {
            layer.setDocument("users/$uid/reminders", reminderId, reminderDoc)
        }.onFailure { e ->
            NexusLogger.warn("ActionHub", "propose_reminder: failed to persist reminder for $moduleId: ${e.message}")
        }

        eventBus.emit(
            SpineEventPayload(
                type = "REMINDER_SCHEDULE_REQUESTED",
                source = moduleId,
                domain = "system",
                data = mapOf(
                    "reminderId" to reminderId,
                    "moduleId" to moduleId,
                    "title" to title,
                    "message" to message,
                    "scheduledAt" to scheduledAt,
                    "type" to type,
                    "recurrence" to recurrence
                ),
                priority = "info"
            )
        )
    }

    private suspend fun handleQueryReminders(call: ActionCall, moduleId: String) {
        val uid = call.userId
        val layer = dataLayer

        val reminders = if (!uid.isNullOrBlank() && layer != null) {
            runCatching {
                layer.query(
                    NexusQuery(
                        collection = "users/$uid/reminders",
                        where = listOf(
                            NexusQueryFilter("moduleId", "==", moduleId),
                            NexusQueryFilter("status", "in", listOf("pending", "completed"))
                        ),
                        orderBy = listOf(NexusOrderBy("scheduledAt", "asc")),
                        limit = 50
                    )
                ) { raw -> raw }
            }.getOrElse { e ->
                NexusLogger.warn("ActionHub", "query_reminders: failed for $moduleId: ${e.message}")
                emptyList()
            }
        } else {
            emptyList()
        }

        eventBus.emit(
            SpineEventPayload(
                type = "REMINDERS_QUERIED",
                source = moduleId,
                domain = "system",
                data = mapOf(
                    "reminders" to reminders,
                    "moduleId" to moduleId,
                    "count" to reminders.size
                ),
                priority = "info"
            )
        )
    }

    private suspend fun handleCompleteReminder(call: ActionCall, moduleId: String) {
        val uid = call.userId
        val layer = dataLayer
        val reminderId = call.payload["reminderId"]?.jsonPrimitive?.contentOrNull
            ?: call.payload["id"]?.jsonPrimitive?.contentOrNull
        if (uid.isNullOrBlank() || layer == null || reminderId.isNullOrBlank()) return

        runCatching {
            layer.updateDocument(
                "users/$uid/reminders",
                reminderId,
                mapOf("status" to "completed", "completedAt" to nowIso())
            )
        }.onFailure { e ->
            NexusLogger.warn("ActionHub", "complete_reminder: failed for $moduleId/$reminderId: ${e.message}")
        }

        eventBus.emit(
            SpineEventPayload(
                type = "MODULE_REMINDER_COMPLETED",
                source = moduleId,
                domain = "system",
                data = mapOf("reminderId" to reminderId, "moduleId" to moduleId),
                priority = "info"
            )
        )
    }

    private suspend fun handleSnoozeReminder(call: ActionCall, moduleId: String) {
        val uid = call.userId
        val layer = dataLayer
        val reminderId = call.payload["reminderId"]?.jsonPrimitive?.contentOrNull
            ?: call.payload["id"]?.jsonPrimitive?.contentOrNull
        val nextFireAt = call.payload["nextFireAt"]?.jsonPrimitive?.contentOrNull
            ?: call.payload["snoozedUntil"]?.jsonPrimitive?.contentOrNull
        if (uid.isNullOrBlank() || layer == null || reminderId.isNullOrBlank() || nextFireAt.isNullOrBlank()) return

        runCatching {
            layer.updateDocument(
                "users/$uid/reminders",
                reminderId,
                mapOf(
                    "status" to "snoozed",
                    "scheduledAt" to nextFireAt,
                    "snoozedAt" to nowIso()
                )
            )
        }.onFailure { e ->
            NexusLogger.warn("ActionHub", "snooze_reminder: failed for $moduleId/$reminderId: ${e.message}")
        }

        eventBus.emit(
            SpineEventPayload(
                type = "REMINDER_SCHEDULE_REQUESTED",
                source = moduleId,
                domain = "system",
                data = mapOf(
                    "reminderId" to reminderId,
                    "moduleId" to moduleId,
                    "scheduledAt" to nextFireAt,
                    "type" to "one-time"
                ),
                priority = "info"
            )
        )
    }

    private fun nowIso(): String = Clock.System.now().toString()

    private fun normalizeDomain(domain: String): String {
        return when (domain.lowercase()) {
            "b", "biological" -> "B"
            "e", "emotional" -> "E"
            "c", "cognitive" -> "C"
            "r", "resource" -> "R"
            "system" -> "system"
            else -> "system"
        }
    }

    private fun resolveModuleId(call: ActionCall): String? {
        return call.moduleId
            ?: call.payload["moduleId"]?.jsonPrimitive?.content
            ?: call.payload["module"]?.jsonPrimitive?.content
            ?: call.payload["targetModule"]?.jsonPrimitive?.content
    }

    private suspend fun handleCreateField(call: ActionCall) {
        val moduleId = resolveModuleId(call) ?: return
        val fieldId = call.payload["id"]?.jsonPrimitive?.content ?: return
        val name = call.payload["name"]?.jsonPrimitive?.content ?: return
        val typeRaw = call.payload["type"]?.jsonPrimitive?.content ?: "text"
        val type = runCatching { FieldType.valueOf(typeRaw.uppercase()) }.getOrElse { FieldType.TEXT }
        if (moduleId == "ledger") {
            val allowed = setOf(FieldType.NUMBER, FieldType.RANGE, FieldType.SELECT, FieldType.MULTI_SELECT, FieldType.DATE)
            if (!allowed.contains(type)) return
        }
        val field = FieldDefinition(
            id = fieldId,
            name = name,
            type = type,
            description = call.payload["description"]?.jsonPrimitive?.content,
            required = false,
            defaultValue = call.payload["defaultValue"],
            metadata = call.payload["metadata"] as? JsonObject,
            options = (call.payload["options"] as? JsonArray)?.mapNotNull { item ->
                (item as? JsonObject)?.let { obj ->
                    val value = obj["value"]?.jsonPrimitive?.content ?: return@let null
                    val label = obj["label"]?.jsonPrimitive?.content ?: value
                    FieldOption(value = value, label = label)
                }
            }
        )
        val result = SchemaRegistry.extendSchema(moduleId, listOf(field))
        if (result.valid) {
            call.userId?.let { SchemaRegistry.saveExtensions(it, moduleId) }
            eventBus.emit(
                SpineEventPayload(
                    type = fieldEventType(moduleId, "created"),
                    source = moduleId,
                    domain = moduleDomain(moduleId),
                    data = mapOf("moduleId" to moduleId, "fieldId" to fieldId, "fieldName" to name, "fieldType" to field.type.name.lowercase()),
                    priority = "info"
                )
            )
        }
    }

    private suspend fun handleSuggestField(call: ActionCall) {
        // Mobile parity: when AI outputs <action type="suggest_field"> we treat it as a
        // persisted schema proposal (create) so the UI immediately reflects the new field.
        val moduleId = resolveModuleId(call) ?: return

        val name = call.payload["name"]?.jsonPrimitive?.content
            ?: call.payload["label"]?.jsonPrimitive?.content
            ?: call.payload["fieldName"]?.jsonPrimitive?.content
            ?: return

        val typeRaw = call.payload["type"]?.jsonPrimitive?.content ?: "text"
        val type = runCatching { FieldType.valueOf(typeRaw.uppercase()) }.getOrElse { FieldType.TEXT }

        if (moduleId == "ledger") {
            val allowed = setOf(FieldType.NUMBER, FieldType.RANGE, FieldType.SELECT, FieldType.MULTI_SELECT, FieldType.DATE)
            if (!allowed.contains(type)) return
        }

        val fieldId = call.payload["fieldId"]?.jsonPrimitive?.content
            ?: call.payload["id"]?.jsonPrimitive?.content
            ?: normalizeAutoFieldId(name)

        val description = call.payload["description"]?.jsonPrimitive?.content
            ?: call.payload["purpose"]?.jsonPrimitive?.content
            ?: call.payload["rationale"]?.jsonPrimitive?.content

        val validation: ValidationRules? = (call.payload["validation"] as? JsonObject)?.let { obj ->
            runCatching { json.decodeFromJsonElement(ValidationRules.serializer(), obj) }.getOrNull()
        }

        val metadata = call.payload["metadata"] as? JsonObject

        val options = (call.payload["options"] as? JsonArray)?.mapNotNull { item ->
            val obj = item as? JsonObject ?: return@mapNotNull null
            val value = obj["value"]?.jsonPrimitive?.content ?: return@mapNotNull null
            val label = obj["label"]?.jsonPrimitive?.content ?: value
            FieldOption(value = value, label = label)
        }

        val field = FieldDefinition(
            id = fieldId,
            name = name,
            type = type,
            description = description,
            required = false,
            defaultValue = call.payload["defaultValue"],
            validation = validation,
            metadata = metadata,
            options = options,
        )

        val result = SchemaRegistry.extendSchema(moduleId, listOf(field))
        if (!result.valid) {
            NexusLogger.warn("ActionHub", "suggest_field rejected for module=$moduleId fieldId=$fieldId")
            return
        }

        call.userId?.let { SchemaRegistry.saveExtensions(it, moduleId) }
        eventBus.emit(
            SpineEventPayload(
                type = fieldEventType(moduleId, "created"),
                source = moduleId,
                domain = moduleDomain(moduleId),
                data = mapOf(
                    "moduleId" to moduleId,
                    "fieldId" to fieldId,
                    "fieldName" to name,
                    "fieldType" to field.type.name.lowercase()
                ),
                priority = "info"
            )
        )
    }

    private fun normalizeAutoFieldId(name: String): String {
        // Mirrors DefaultFieldValidators' normalizeFieldId behavior (snake_case).
        return name.trim().lowercase().replace(Regex("[^a-z0-9]+"), "_").trim('_')
    }

    private suspend fun handleDeleteField(call: ActionCall) {
        val moduleId = resolveModuleId(call) ?: return
        val fieldId = call.payload["fieldId"]?.jsonPrimitive?.content
            ?: call.payload["id"]?.jsonPrimitive?.content
            ?: return
        val result = SchemaRegistry.removeExtension(moduleId, fieldId)
        if (result.valid) {
            call.userId?.let { SchemaRegistry.saveExtensions(it, moduleId) }
            call.userId?.let { uid ->
                removeExtensionFieldValue(uid, moduleId, fieldId, call.encryptionKey)
            }
            eventBus.emit(
                SpineEventPayload(
                    type = fieldEventType(moduleId, "deleted"),
                    source = moduleId,
                    domain = moduleDomain(moduleId),
                    data = mapOf("moduleId" to moduleId, "fieldId" to fieldId),
                    priority = "info"
                )
            )
        }
    }

    private suspend fun handleUpdateFieldValue(call: ActionCall) {
        val moduleId = resolveModuleId(call) ?: return
        val fieldId = call.payload["fieldId"]?.jsonPrimitive?.content ?: return
        val value = call.payload["value"] ?: return
        val uid = call.userId
        if (uid != null) {
            updateExtensionFieldValue(uid, moduleId, fieldId, value, call.encryptionKey)
        }
        eventBus.emit(
            SpineEventPayload(
                type = fieldEventType(moduleId, "value_updated"),
                source = moduleId,
                domain = moduleDomain(moduleId),
                data = mapOf("moduleId" to moduleId, "fieldId" to fieldId),
                priority = "info"
            )
        )
    }

    private suspend fun handleUpdateField(call: ActionCall) {
        val moduleId = resolveModuleId(call) ?: return
        val fieldId = call.payload["fieldId"]?.jsonPrimitive?.content ?: call.payload["id"]?.jsonPrimitive?.content ?: return
        val extensions = SchemaRegistry.getExtensions(moduleId)
        val existing = extensions.firstOrNull { it.id == fieldId } ?: return
        val updated = existing.copy(
            name = call.payload["name"]?.jsonPrimitive?.content ?: existing.name,
            description = call.payload["description"]?.jsonPrimitive?.content ?: existing.description,
            metadata = (call.payload["metadata"] as? JsonObject) ?: existing.metadata
        )
        SchemaRegistry.removeExtension(moduleId, fieldId)
        SchemaRegistry.extendSchema(moduleId, listOf(updated))
        call.userId?.let { SchemaRegistry.saveExtensions(it, moduleId) }
        eventBus.emit(
            SpineEventPayload(
                type = fieldEventType(moduleId, "updated"),
                source = moduleId,
                domain = moduleDomain(moduleId),
                data = mapOf("moduleId" to moduleId, "fieldId" to fieldId, "fieldName" to updated.name),
                priority = "info"
            )
        )
    }

    private fun moduleDomain(moduleId: String): String = when (moduleId) {
        "ledger" -> "R"
        "atlas" -> "C"
        "agnes" -> "E"
        else -> "B"
    }

    private fun fieldEventType(moduleId: String, action: String): String {
        return when (moduleId) {
            "atlas" -> when (action) {
                "created" -> "ATLAS_FIELD_CREATED"
                "deleted" -> "ATLAS_FIELD_DELETED"
                "value_updated" -> "ATLAS_FIELD_VALUE_UPDATED"
                "updated" -> "ATLAS_FIELD_UPDATED"
                else -> "ATLAS_FIELD_UPDATED"
            }
            "soma" -> when (action) {
                "created" -> "SOMA_FIELD_CREATED"
                "deleted" -> "SOMA_FIELD_DELETED"
                "updated" -> "SOMA_FIELD_UPDATED"
                "value_updated" -> "SOMA_FIELD_UPDATED"
                else -> "SOMA_FIELD_UPDATED"
            }
            "ledger" -> when (action) {
                "created" -> "FIELD_CREATED"
                "deleted" -> "FIELD_DELETED"
                "value_updated" -> "FIELD_VALUE_UPDATED"
                "updated" -> "FIELD_VALUE_UPDATED"
                else -> "FIELD_UPDATED"
            }
            else -> when (action) {
                "created" -> "FIELD_CREATED"
                "deleted" -> "FIELD_DELETED"
                "value_updated" -> "FIELD_VALUE_UPDATED"
                "updated" -> "FIELD_UPDATED"
                else -> "FIELD_UPDATED"
            }
        }
    }

    private suspend fun updateProfileFields(collection: String, uid: String, payload: Map<String, Any?>) {
        val layer = dataLayer ?: return
        val existing = layer.getDocument(collection, uid) { Json.parseToJsonElement(it).jsonObject }
        val base = existing?.toMap() ?: mapOf("id" to uid, "userId" to uid, "createdAt" to nowIso())
        val merged = base + payload + mapOf("updatedAt" to nowIso())
        layer.setDocument(collection, uid, merged)
    }

    private suspend fun appendProfileList(
        collection: String,
        uid: String,
        field: String,
        record: Map<String, Any?>
    ) {
        val layer = dataLayer ?: return
        val existing = layer.getDocument(collection, uid) { Json.parseToJsonElement(it).jsonObject }
        val base = existing?.toMap() ?: mapOf("id" to uid, "userId" to uid, "createdAt" to nowIso())
        val current = (base[field] as? List<*>)?.toMutableList() ?: mutableListOf()
        current.add(record)
        val capped = when (field) {
            "biomarkers" -> current.takeLast(200)
            "labSummaries" -> current.takeLast(50)
            "clearances" -> current.takeLast(100)
            "medicalImageAnalyses" -> current.takeLast(100)
            "vitalReadings" -> current.takeLast(500)
            "physicalAssessments" -> current.takeLast(200)
            else -> current
        }
        val merged = base + mapOf(field to capped, "updatedAt" to nowIso())
        layer.setDocument(collection, uid, merged)
    }

    private fun parseBoundedScore(value: JsonElement?, fallback: Int = 5): Int {
        val num = value?.jsonPrimitive?.doubleOrNull ?: return fallback
        return num.toInt().coerceIn(0, 10)
    }

    private fun normalizeTaskStatus(raw: String?, fallback: String): String {
        return when (raw) {
            "queued", "active", "blocked", "done", "deferred" -> raw
            else -> fallback
        }
    }

    private fun normalizeTaskGraphStatus(raw: String?): String {
        return when (raw) {
            "queued", "active", "done" -> raw
            else -> "queued"
        }
    }

    private suspend fun loadAtlasProfile(uid: String, encryptionKey: String? = null): AtlasProfile {
        val layer = dataLayer ?: return AtlasProfile()
        val doc = layer.getDocument("atlas_profiles", uid) { Json.parseToJsonElement(it).jsonObject }
            ?: return AtlasProfile()
        val payloadMode = doc["payloadMode"]?.jsonPrimitive?.content
        val plaintextData = doc["plaintextData"]?.jsonPrimitive?.content
        if (payloadMode == "plaintext" && !plaintextData.isNullOrBlank()) {
            return runCatching {
                json.decodeFromString(AtlasProfile.serializer(), plaintextData)
            }.getOrElse { AtlasProfile() }
        }
        val encryptedData = doc["encryptedData"]?.jsonPrimitive?.content
        val iv = doc["iv"]?.jsonPrimitive?.content
        if (!encryptedData.isNullOrBlank() && !iv.isNullOrBlank()) {
            val vault = vaultBoundary
            if (vault != null) {
                val decrypted = runCatching {
                    vault.decrypt(EncryptedEnvelope(ciphertext = encryptedData, iv = iv), encryptionKey ?: "")
                }.getOrNull()
                if (!decrypted.isNullOrBlank()) {
                    return runCatching {
                        json.decodeFromString(AtlasProfile.serializer(), decrypted)
                    }.getOrElse { AtlasProfile() }
                }
            }
            return AtlasProfile()
        }
        return runCatching {
            json.decodeFromJsonElement(AtlasProfile.serializer(), doc)
        }.getOrElse { AtlasProfile() }
    }

    private suspend fun saveAtlasProfile(uid: String, profile: AtlasProfile, encryptionKey: String? = null) {
        val layer = dataLayer ?: return
        val updatedProfile = profile.copy(updatedAt = nowIso())
        val vault = vaultBoundary
        if (vault != null) {
            val payloadJson = json.encodeToString(AtlasProfile.serializer(), updatedProfile)
            val encrypted = runCatching { vault.encrypt(payloadJson, encryptionKey ?: "") }.getOrNull() ?: return
            val metadata = mapOf(
                "onboardingComplete" to updatedProfile.onboardingComplete,
                "lastActive" to nowIso(),
                "windows" to updatedProfile.recoveryWindows.size
            )
            val payload = mapOf(
                "encryptedData" to encrypted.ciphertext,
                "iv" to encrypted.iv,
                "salt" to "vault_salt_used",
                "metadata" to metadata
            )
            layer.setDocument("atlas_profiles", uid, payload)
            return
        }
        val profileMap = json.encodeToJsonElement(AtlasProfile.serializer(), updatedProfile).jsonObject.toMap()
        layer.setDocument("atlas_profiles", uid, profileMap)
    }

    private suspend fun loadLedgerProfile(uid: String, encryptionKey: String? = null): LedgerProfile {
        val layer = dataLayer ?: return LedgerProfile()
        val doc = layer.getDocument("ledger_profiles", uid) { Json.parseToJsonElement(it).jsonObject }
            ?: return LedgerProfile()

        val payloadMode = doc["payloadMode"]?.jsonPrimitive?.content
        val plaintextData = doc["plaintextData"]?.jsonPrimitive?.content
        if (payloadMode == "plaintext" && !plaintextData.isNullOrBlank()) {
            return runCatching {
                json.decodeFromString(LedgerProfile.serializer(), plaintextData)
            }.getOrElse { LedgerProfile() }
        }
        val encryptedData = doc["encryptedData"]?.jsonPrimitive?.content
        val iv = doc["iv"]?.jsonPrimitive?.content
        if (!encryptedData.isNullOrBlank() && !iv.isNullOrBlank()) {
            val vault = vaultBoundary
            if (vault != null) {
                val decrypted = runCatching {
                    vault.decrypt(EncryptedEnvelope(ciphertext = encryptedData, iv = iv), encryptionKey ?: "")
                }.getOrNull()
                if (!decrypted.isNullOrBlank()) {
                    return runCatching {
                        json.decodeFromString(LedgerProfile.serializer(), decrypted)
                    }.getOrElse { LedgerProfile() }
                }
            }
            return LedgerProfile()
        }

        return runCatching {
            json.decodeFromJsonElement(LedgerProfile.serializer(), doc)
        }.getOrElse { LedgerProfile() }
    }

    private suspend fun saveLedgerProfile(uid: String, profile: LedgerProfile, encryptionKey: String? = null) {
        val layer = dataLayer ?: return
        val updatedProfile = profile.copy(updatedAt = nowIso())
        val vault = vaultBoundary

        if (vault != null) {
            val payloadJson = json.encodeToString(LedgerProfile.serializer(), updatedProfile)
            val encrypted = runCatching { vault.encrypt(payloadJson, encryptionKey ?: "") }.getOrNull() ?: return

            val metadata = mapOf(
                "onboardingComplete" to updatedProfile.onboardingComplete,
                "lastActive" to nowIso(),
                "activePlanId" to updatedProfile.activePlanId
            )

            val payload = mapOf(
                "encryptedData" to encrypted.ciphertext,
                "iv" to encrypted.iv,
                "salt" to "vault_salt_used",
                "metadata" to metadata
            )
            layer.setDocument("ledger_profiles", uid, payload)
            return
        }

        val profileMap = json.encodeToJsonElement(LedgerProfile.serializer(), updatedProfile).jsonObject.toMap()
        layer.setDocument("ledger_profiles", uid, profileMap)
    }

    private fun parseBoundedDouble(value: JsonElement?, fallback: Double = 0.0): Double {
        val d = value?.jsonPrimitive?.doubleOrNull ?: return fallback
        return d.coerceIn(0.0, 1.0E9)
    }

    private fun parseLedgerExpenseArray(value: JsonElement?, isFixed: Boolean): List<LedgerExpense> {
        val arr = value as? JsonArray ?: return emptyList()
        return arr.mapNotNull { element ->
            val obj = element as? JsonObject ?: return@mapNotNull null
            val name = obj["name"]?.jsonPrimitive?.content
                ?: obj["label"]?.jsonPrimitive?.content
                ?: obj["title"]?.jsonPrimitive?.content
                ?: "Expense"

            val amount = obj["amount"]?.jsonPrimitive?.doubleOrNull
                ?: obj["targetAmount"]?.jsonPrimitive?.doubleOrNull
                ?: obj["currentAmount"]?.jsonPrimitive?.doubleOrNull
                ?: 0.0

            val category = obj["category"]?.jsonPrimitive?.content ?: (if (isFixed) "fixed" else "variable")
            val explicitFixed = obj["isFixed"]?.jsonPrimitive?.booleanOrNull
            LedgerExpense(
                name = name,
                amount = amount,
                category = category,
                isFixed = explicitFixed ?: isFixed
            )
        }
    }

    private fun parseLedgerDebtItemsArray(value: JsonElement?): List<DebtItem> {
        val arr = value as? JsonArray ?: return emptyList()
        return arr.mapNotNull { element ->
            val obj = element as? JsonObject ?: return@mapNotNull null

            val name = obj["name"]?.jsonPrimitive?.content
                ?: obj["label"]?.jsonPrimitive?.content
                ?: "Debt"

            val balance = obj["balance"]?.jsonPrimitive?.doubleOrNull
                ?: obj["amount"]?.jsonPrimitive?.doubleOrNull
                ?: obj["currentAmount"]?.jsonPrimitive?.doubleOrNull
                ?: 0.0

            val apr = obj["apr"]?.jsonPrimitive?.doubleOrNull
            val minPayment = obj["minPayment"]?.jsonPrimitive?.doubleOrNull
                ?: obj["minimumPayment"]?.jsonPrimitive?.doubleOrNull

            DebtItem(
                id = obj["id"]?.jsonPrimitive?.content ?: name.lowercase().replace(" ", "_"),
                name = name,
                balance = balance,
                apr = apr,
                minPayment = minPayment
            )
        }
    }

    private fun normalizePlanningHorizon(raw: String?): String {
        return when (raw?.lowercase()) {
            "quarterly" -> "quarterly"
            "yearly" -> "yearly"
            "monthly" -> "monthly"
            else -> "monthly"
        }
    }

    private suspend fun handleAtlasUpdateOnboardingProfile(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)

        val summary = call.payload["summary"]?.jsonPrimitive?.content ?: profile.summary

        val energyWaveArray = call.payload["energyWave"] as? JsonArray
        val energyWave = energyWaveArray?.mapIndexed { index, element ->
            val obj = element as? JsonObject ?: JsonObject(emptyMap())
            EnergyWavePoint(
                id = obj["id"]?.jsonPrimitive?.content ?: "wave_${Clock.System.now().toEpochMilliseconds()}_$index",
                slot = obj["slot"]?.jsonPrimitive?.content ?: "Slot ${index + 1}",
                energy = obj["energy"]?.jsonPrimitive?.doubleOrNull?.coerceIn(0.0, 10.0) ?: 5.0,
                focus = obj["focus"]?.jsonPrimitive?.doubleOrNull?.coerceIn(0.0, 10.0) ?: 5.0,
                load = obj["load"]?.jsonPrimitive?.doubleOrNull?.coerceIn(0.0, 10.0) ?: 5.0
            )
        }?.take(48) ?: profile.energyWave

        val taskGraphArray = call.payload["taskGraph"] as? JsonArray
        val taskGraph = taskGraphArray?.mapIndexed { index, element ->
            val obj = element as? JsonObject ?: JsonObject(emptyMap())
            val deps = (obj["dependencies"] as? JsonArray)?.mapNotNull { it.jsonPrimitive.contentOrNull } ?: emptyList()
            AtlasTaskNode(
                id = obj["id"]?.jsonPrimitive?.content ?: "task_${Clock.System.now().toEpochMilliseconds()}_$index",
                title = obj["title"]?.jsonPrimitive?.content ?: "Task ${index + 1}",
                energyCost = parseBoundedScore(obj["energyCost"], 4),
                status = normalizeTaskGraphStatus(obj["status"]?.jsonPrimitive?.content),
                dependencies = deps
            )
        }?.take(100) ?: profile.taskGraph

        val updated = profile.copy(
            summary = summary,
            energyWave = energyWave,
            taskGraph = taskGraph
        )
        saveAtlasProfile(uid, updated, call.encryptionKey)
    }

    private suspend fun handleAtlasCompleteOnboarding(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val updated = profile.copy(onboardingComplete = true, updatedAt = nowIso())
        saveAtlasProfile(uid, updated, call.encryptionKey)
    }

    private suspend fun handleLedgerUpdateOnboardingProfile(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadLedgerProfile(uid, call.encryptionKey)

        val currency = call.payload["currency"]?.jsonPrimitive?.content?.uppercase() ?: profile.currency
        val monthlyIncome = call.payload["monthlyIncome"]?.jsonPrimitive?.doubleOrNull
            ?: call.payload["income"]?.jsonPrimitive?.doubleOrNull
            ?: profile.monthlyIncome

        val fixedExpenses = parseLedgerExpenseArray(call.payload["fixedExpenses"], isFixed = true).take(80)
        val variableExpenses = parseLedgerExpenseArray(call.payload["variableExpenses"], isFixed = false).take(80)
        val debtItems = parseLedgerDebtItemsArray(call.payload["debtItems"]).take(80)

        val planningHorizon = normalizePlanningHorizon(call.payload["planningHorizon"]?.jsonPrimitive?.content)
        val summary = call.payload["summary"]?.jsonPrimitive?.content ?: profile.summary

        val updated = profile.copy(
            currency = currency,
            monthlyIncome = monthlyIncome,
            fixedExpenses = fixedExpenses,
            variableExpenses = variableExpenses,
            debtItems = debtItems,
            planningHorizon = planningHorizon,
            summary = summary
        )
        saveLedgerProfile(uid, updated, call.encryptionKey)
    }

    private suspend fun handleLedgerCompleteOnboarding(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadLedgerProfile(uid, call.encryptionKey)
        val updated = profile.copy(onboardingComplete = true, updatedAt = nowIso())
        saveLedgerProfile(uid, updated, call.encryptionKey)
    }

    // ------------------------- Titan onboarding -------------------------
    private suspend fun loadTrainerProfile(uid: String, encryptionKey: String? = null): TrainerProfile {
        val layer = dataLayer ?: return TrainerProfile()
        val doc = layer.getDocument("titan_profiles", uid) { Json.parseToJsonElement(it).jsonObject } ?: return TrainerProfile()
        val payloadMode = doc["payloadMode"]?.jsonPrimitive?.content
        val plaintextData = doc["plaintextData"]?.jsonPrimitive?.content
        if (payloadMode == "plaintext" && !plaintextData.isNullOrBlank()) {
            return runCatching { json.decodeFromString(TrainerProfile.serializer(), plaintextData) }.getOrElse { TrainerProfile() }
        }
        val encryptedData = doc["encryptedData"]?.jsonPrimitive?.content
        val iv = doc["iv"]?.jsonPrimitive?.content
        if (!encryptedData.isNullOrBlank() && !iv.isNullOrBlank() && vaultBoundary != null) {
            val vault = vaultBoundary
            val decrypted = runCatching {
                vault.decrypt(EncryptedEnvelope(ciphertext = encryptedData, iv = iv), encryptionKey ?: "")
            }.getOrNull()
            if (!decrypted.isNullOrBlank()) {
                return runCatching { json.decodeFromString(TrainerProfile.serializer(), decrypted) }.getOrElse { TrainerProfile() }
            }
            return TrainerProfile()
        }
        return runCatching { json.decodeFromJsonElement(TrainerProfile.serializer(), doc) }.getOrElse { TrainerProfile() }
    }

    private suspend fun saveTrainerProfile(uid: String, profile: TrainerProfile, encryptionKey: String? = null) {
        val layer = dataLayer ?: return
        val updated = profile.copy(updatedAt = nowIso())
        if (vaultBoundary != null) {
            val vault = vaultBoundary
            val payloadJson = json.encodeToString(TrainerProfile.serializer(), updated)
            val encrypted = runCatching { vault.encrypt(payloadJson, encryptionKey ?: "") }.getOrNull() ?: return
            layer.setDocument("titan_profiles", uid, mapOf(
                "encryptedData" to encrypted.ciphertext,
                "iv" to encrypted.iv,
                "salt" to "vault_salt_used",
                "metadata" to mapOf("onboardingComplete" to updated.onboardingComplete, "lastActive" to nowIso())
            ))
            return
        }
        val profileJson = json.encodeToString(TrainerProfile.serializer(), updated)
        layer.setDocument("titan_profiles", uid, mapOf(
            "payloadMode" to "plaintext",
            "plaintextData" to profileJson,
            "metadata" to mapOf("onboardingComplete" to updated.onboardingComplete, "lastActive" to nowIso())
        ))
    }

    private suspend fun handleTitanUpdateOnboardingProfile(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadTrainerProfile(uid, call.encryptionKey)
        val summary = call.payload["summary"]?.jsonPrimitive?.content ?: profile.summary
        var updated = profile.copy(summary = summary, updatedAt = nowIso())
        // Merge nutrition/activity/history when present (web parity)
        call.payload["nutrition"]?.jsonObject?.let { obj ->
            updated = updated.copy(
                nutrition = profile.nutrition.copy(
                    dailyCalories = obj["dailyCalories"]?.jsonPrimitive?.content?.toIntOrNull() ?: profile.nutrition.dailyCalories,
                    proteinGrams = obj["proteinGrams"]?.jsonPrimitive?.content?.toIntOrNull() ?: profile.nutrition.proteinGrams,
                    dietaryPreference = obj["dietaryPreference"]?.jsonPrimitive?.content ?: profile.nutrition.dietaryPreference,
                    dietNotes = obj["dietNotes"]?.jsonPrimitive?.content ?: profile.nutrition.dietNotes
                )
            )
        }
        call.payload["activity"]?.jsonObject?.let { obj ->
            updated = updated.copy(
                activity = profile.activity.copy(
                    workoutsPerWeek = obj["workoutsPerWeek"]?.jsonPrimitive?.content?.toIntOrNull() ?: profile.activity.workoutsPerWeek,
                    primarySport = obj["primarySport"]?.jsonPrimitive?.content ?: profile.activity.primarySport,
                    trainingLevel = obj["trainingLevel"]?.jsonPrimitive?.content ?: profile.activity.trainingLevel,
                    sleepHours = obj["sleepHours"]?.jsonPrimitive?.content?.toDoubleOrNull() ?: profile.activity.sleepHours,
                    recoveryNotes = obj["recoveryNotes"]?.jsonPrimitive?.content ?: profile.activity.recoveryNotes
                )
            )
        }
        call.payload["history"]?.jsonObject?.let { obj ->
            val goals = (obj["goals"] as? JsonArray)?.mapNotNull { (it as? JsonPrimitive)?.content } ?: profile.history.goals
            updated = updated.copy(history = profile.history.copy(goals = goals))
        }
        saveTrainerProfile(uid, updated, call.encryptionKey)
    }

    private suspend fun handleTitanCompleteOnboarding(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadTrainerProfile(uid, call.encryptionKey)
        saveTrainerProfile(uid, profile.copy(onboardingComplete = true, updatedAt = nowIso()), call.encryptionKey)
    }

    /** Epley e1RM: weight * (1 + reps/30) */
    private fun e1rm(weight: Double, reps: Int): Double =
        if (reps <= 0) 0.0 else if (reps == 1) weight else weight * (1.0 + reps / 30.0)

    private suspend fun handleTitanUpdateRoutine(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadTrainerProfile(uid, call.encryptionKey)
        val routinesArray = call.payload["routines"] as? JsonArray ?: return
        val newRoutines = routinesArray.mapNotNull { el ->
            val obj = el as? JsonObject ?: return@mapNotNull null
            Routine(
                id = obj["id"]?.jsonPrimitive?.content ?: "titan-${Clock.System.now().toEpochMilliseconds()}-${Random.nextInt(0xFFFF)}",
                name = obj["name"]?.jsonPrimitive?.content ?: "",
                weekdays = (obj["weekdays"] as? JsonArray)?.mapNotNull { (it as? JsonPrimitive)?.content } ?: emptyList(),
                weekday = obj["weekday"]?.jsonPrimitive?.content,
                timeframe = obj["timeframe"]?.jsonPrimitive?.content,
                status = obj["status"]?.jsonPrimitive?.content ?: "active",
                rationale = obj["rationale"]?.jsonPrimitive?.content,
                exercises = (obj["exercises"] as? JsonArray)?.mapNotNull { exEl ->
                    val ex = exEl as? JsonObject ?: return@mapNotNull null
                    com.agnes.nexus.core.domain.models.Exercise(
                        name = ex["name"]?.jsonPrimitive?.content ?: "",
                        sets = ex["sets"]?.jsonPrimitive?.content?.toIntOrNull(),
                        reps = ex["reps"]?.jsonPrimitive?.content,
                        notes = ex["notes"]?.jsonPrimitive?.content,
                        rpe = ex["rpe"]?.jsonPrimitive?.content?.toIntOrNull()
                    )
                } ?: emptyList()
            )
        }
        val existing = profile.routines
        val merged = existing.toMutableList()
        for (nr in newRoutines) {
            val weekday = nr.weekday ?: nr.weekdays.firstOrNull()
            val idx = merged.indexOfFirst { it.weekday == weekday || it.weekdays.contains(weekday) }
            if (idx >= 0) merged[idx] = nr else merged.add(nr)
        }
        val updated = profile.copy(routines = merged, updatedAt = nowIso())
        saveTrainerProfile(uid, updated, call.encryptionKey)
    }

    private fun parseExerciseSet(obj: JsonObject, idx: Int): ExerciseSet = ExerciseSet(
        setNumber = obj["setNumber"]?.jsonPrimitive?.content?.toIntOrNull() ?: (idx + 1),
        weight = obj["weight"]?.jsonPrimitive?.content?.toDoubleOrNull(),
        repsCompleted = obj["repsCompleted"]?.jsonPrimitive?.content?.toIntOrNull() ?: 0,
        completed = obj["completed"]?.jsonPrimitive?.content?.toBooleanStrictOrNull() ?: true,
        notes = obj["notes"]?.jsonPrimitive?.content
    )

    private fun parseExerciseLog(obj: JsonObject): ExerciseLog {
        val setsArray = obj["sets"] as? JsonArray ?: JsonArray(emptyList())
        return ExerciseLog(
            exerciseName = obj["exerciseName"]?.jsonPrimitive?.content ?: "Exercise",
            plannedSets = obj["plannedSets"]?.jsonPrimitive?.content?.toIntOrNull() ?: setsArray.size,
            plannedReps = obj["plannedReps"]?.jsonPrimitive?.content ?: "—",
            sets = setsArray.mapIndexed { i, el -> (el as? JsonObject)?.let { parseExerciseSet(it, i) } ?: ExerciseSet(setNumber = i + 1) }
        )
    }

    private suspend fun handleTitanLogWorkoutSession(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadTrainerProfile(uid, call.encryptionKey)
        val exercisesArray = call.payload["exercises"] as? JsonArray ?: return
        val exercises = exercisesArray.mapNotNull { el -> (el as? JsonObject)?.let { parseExerciseLog(it) } }
        if (exercises.isEmpty()) return
        val now = nowIso()
        val date = call.payload["date"]?.jsonPrimitive?.content?.takeIf { it.length >= 10 } ?: now.take(10)
        val totalVolume = exercises.sumOf { ex ->
            ex.sets.filter { it.completed && it.weight != null }.sumOf { (it.weight ?: 0.0) * it.repsCompleted }
        }.toInt()
        val session = WorkoutSession(
            id = call.payload["id"]?.jsonPrimitive?.content ?: "wl-${Clock.System.now().toEpochMilliseconds()}",
            routineId = call.payload["routineId"]?.jsonPrimitive?.content ?: "",
            routineName = call.payload["routineName"]?.jsonPrimitive?.content ?: "Workout",
            date = date,
            startedAt = call.payload["startedAt"]?.jsonPrimitive?.content ?: now,
            completedAt = call.payload["completedAt"]?.jsonPrimitive?.content ?: now,
            exercises = exercises,
            totalVolume = totalVolume.takeIf { it > 0 },
            rpe = call.payload["rpe"]?.jsonPrimitive?.content?.toIntOrNull()?.coerceIn(1, 10),
            notes = call.payload["notes"]?.jsonPrimitive?.content,
            status = call.payload["status"]?.jsonPrimitive?.content?.takeIf { it in listOf("completed", "partial", "abandoned") } ?: "completed"
        )
        var newPRs = profile.personalRecords?.toMutableMap() ?: mutableMapOf()
        for (exLog in session.exercises) {
            val key = exLog.exerciseName.lowercase().trim()
            for (s in exLog.sets) {
                if (!s.completed || s.weight == null || s.repsCompleted <= 0) continue
                val e1 = e1rm(s.weight, s.repsCompleted)
                val existing = newPRs[key]
                if (existing == null || e1 > existing.e1RM) {
                    newPRs[key] = PersonalRecord(
                        exerciseName = exLog.exerciseName,
                        maxWeight = s.weight,
                        repsAtMax = s.repsCompleted,
                        e1RM = e1,
                        achievedDate = session.date,
                        sessionId = session.id
                    )
                }
            }
        }
        val updatedSessions = listOf(session) + (profile.workoutSessions ?: emptyList()).take(499)
        val updated = profile.copy(
            workoutSessions = updatedSessions,
            personalRecords = newPRs,
            updatedAt = now
        )
        saveTrainerProfile(uid, updated, call.encryptionKey)
        eventBus.emit(SpineEventPayload(
            type = "WORKOUT_COMPLETED",
            source = "titan",
            domain = "B",
            data = mapOf(
                "sessionId" to session.id,
                "routineName" to session.routineName,
                "date" to session.date,
                "totalVolume" to (session.totalVolume ?: 0),
                "rpe" to (session.rpe ?: 0),
                "exerciseCount" to exercises.size
            ),
            priority = "info"
        ))
    }

    private suspend fun handleTitanLogWorkoutSet(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadTrainerProfile(uid, call.encryptionKey)
        val exerciseName = call.payload["exercise"]?.jsonPrimitive?.content?.trim() ?: "Exercise"
        val sets = call.payload["sets"]?.jsonPrimitive?.content?.toIntOrNull()?.coerceAtLeast(1) ?: 1
        val reps = call.payload["reps"]?.jsonPrimitive?.content?.toIntOrNull()?.coerceAtLeast(1) ?: 1
        val weight = call.payload["weight"]?.jsonPrimitive?.content?.toDoubleOrNull()?.takeIf { it > 0 }
        val now = nowIso()
        val date = now.take(10)
        val sessionId = "ql-set-${Clock.System.now().toEpochMilliseconds()}"
        val exerciseSets = List(sets) { i -> ExerciseSet(setNumber = i + 1, weight = weight, repsCompleted = reps, completed = true) }
        val session = WorkoutSession(
            id = sessionId,
            routineId = "quick-log",
            routineName = "Quick Log",
            date = date,
            startedAt = now,
            completedAt = now,
            exercises = listOf(ExerciseLog(exerciseName = exerciseName, plannedSets = sets, plannedReps = reps.toString(), sets = exerciseSets)),
            totalVolume = if (weight != null) (weight * reps * sets).toInt() else null,
            status = "completed"
        )
        var newPRs = profile.personalRecords?.toMutableMap() ?: mutableMapOf()
        val key = exerciseName.lowercase().trim()
        if (weight != null && reps > 0) {
            val e1 = e1rm(weight, reps)
            val existing = newPRs[key]
            if (existing == null || e1 > existing.e1RM) {
                newPRs[key] = PersonalRecord(exerciseName = exerciseName, maxWeight = weight, repsAtMax = reps, e1RM = e1, achievedDate = date, sessionId = sessionId)
            }
        }
        val updatedSessions = listOf(session) + (profile.workoutSessions ?: emptyList()).take(499)
        val updated = profile.copy(workoutSessions = updatedSessions, personalRecords = newPRs, updatedAt = now)
        saveTrainerProfile(uid, updated, call.encryptionKey)
    }

    private suspend fun handleTitanLogSleep(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadTrainerProfile(uid, call.encryptionKey)
        val durationHours = call.payload["durationHours"]?.jsonPrimitive?.content?.toDoubleOrNull()?.coerceIn(0.0, 24.0) ?: 7.0
        val quality = call.payload["quality"]?.jsonPrimitive?.content?.toIntOrNull()?.coerceIn(0, 10) ?: 5
        val entry = SleepEntry(
            id = call.payload["id"]?.jsonPrimitive?.content ?: "titan-${Clock.System.now().toEpochMilliseconds()}-${Random.nextInt(0xFFFF)}",
            date = call.payload["date"]?.jsonPrimitive?.content?.takeIf { it.length >= 10 } ?: nowIso().take(10),
            bedtime = call.payload["bedtime"]?.jsonPrimitive?.content,
            wakeTime = call.payload["wakeTime"]?.jsonPrimitive?.content,
            durationHours = durationHours,
            quality = quality,
            notes = call.payload["notes"]?.jsonPrimitive?.content,
            recordedAt = nowIso()
        )
        val updatedLog = listOf(entry) + (profile.sleepLog ?: emptyList()).take(729)
        val updated = profile.copy(sleepLog = updatedLog, updatedAt = nowIso())
        saveTrainerProfile(uid, updated, call.encryptionKey)
    }

    private suspend fun handleTitanCreateCycle(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadTrainerProfile(uid, call.encryptionKey)
        val phasesArray = call.payload["phases"] as? JsonArray ?: return
        val phases = phasesArray.mapNotNull { el ->
            val obj = el as? JsonObject ?: return@mapNotNull null
            CyclePhase(
                id = obj["id"]?.jsonPrimitive?.content ?: "titan-${Clock.System.now().toEpochMilliseconds()}-${Random.nextInt(0xFFFF)}",
                name = obj["name"]?.jsonPrimitive?.content ?: "Phase",
                durationDays = obj["durationDays"]?.jsonPrimitive?.content?.toIntOrNull()?.coerceAtLeast(1) ?: 7,
                notes = obj["notes"]?.jsonPrimitive?.content,
                dosage = obj["dosage"]?.jsonPrimitive?.content,
                trainingModifier = obj["trainingModifier"]?.jsonPrimitive?.content
            )
        }
        if (phases.isEmpty()) return
        val now = nowIso()
        val startDate = call.payload["startDate"]?.jsonPrimitive?.content?.takeIf { it.length >= 10 } ?: now.take(10)
        val cycle = CycleEntry(
            id = call.payload["id"]?.jsonPrimitive?.content ?: "titan-${Clock.System.now().toEpochMilliseconds()}-${Random.nextInt(0xFFFF)}",
            name = call.payload["name"]?.jsonPrimitive?.content ?: "Custom Cycle",
            type = call.payload["type"]?.jsonPrimitive?.content?.takeIf { it in listOf("workout", "recovery", "custom") } ?: "workout",
            description = call.payload["description"]?.jsonPrimitive?.content,
            startDate = startDate,
            endDate = call.payload["endDate"]?.jsonPrimitive?.content,
            phases = phases,
            currentPhaseIndex = 0,
            currentPhaseStartDate = startDate,
            status = "active",
            notes = call.payload["notes"]?.jsonPrimitive?.content,
            createdAt = now,
            updatedAt = now
        )
        val updatedCycles = listOf(cycle) + (profile.cycles ?: emptyList()).take(49)
        val updated = profile.copy(cycles = updatedCycles, updatedAt = now)
        saveTrainerProfile(uid, updated, call.encryptionKey)
        eventBus.emit(SpineEventPayload(type = "CYCLE_STARTED", source = "titan", domain = "B", data = mapOf("cycleId" to cycle.id, "name" to cycle.name), priority = "info"))
    }

    private suspend fun handleTitanAdvanceCyclePhase(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadTrainerProfile(uid, call.encryptionKey)
        val cycleId = call.payload["cycleId"]?.jsonPrimitive?.content ?: return
        val cycles = profile.cycles ?: return
        if (!cycles.any { it.id == cycleId }) return
        val now = nowIso()
        val updatedCycles = cycles.map { c ->
            if (c.id != cycleId) c
            else {
                val nextIdx = c.currentPhaseIndex + 1
                if (nextIdx >= c.phases.size) c.copy(status = "completed", updatedAt = now)
                else c.copy(currentPhaseIndex = nextIdx, currentPhaseStartDate = now.take(10), updatedAt = now)
            }
        }
        val updated = profile.copy(cycles = updatedCycles, updatedAt = now)
        saveTrainerProfile(uid, updated, call.encryptionKey)
    }

    private suspend fun handleTitanCompleteCycle(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadTrainerProfile(uid, call.encryptionKey)
        val cycleId = call.payload["cycleId"]?.jsonPrimitive?.content ?: return
        val cycles = profile.cycles ?: return
        val updatedCycles = cycles.map { c -> if (c.id == cycleId) c.copy(status = "completed", updatedAt = nowIso()) else c }
        val updated = profile.copy(cycles = updatedCycles, updatedAt = nowIso())
        saveTrainerProfile(uid, updated, call.encryptionKey)
    }

    private suspend fun handleTitanLogBodyWeight(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadTrainerProfile(uid, call.encryptionKey)
        var weight = call.payload["weight"]?.jsonPrimitive?.content?.toDoubleOrNull() ?: return
        if (call.payload["unit"]?.jsonPrimitive?.content.equals("lbs", ignoreCase = true)) weight = weight / 2.20462
        weight = weight.coerceIn(20.0, 300.0)
        val date = call.payload["date"]?.jsonPrimitive?.content?.takeIf { it.length >= 10 } ?: nowIso().take(10)
        val entry = BodyWeightEntry(
            id = call.payload["id"]?.jsonPrimitive?.content ?: "titan-${Clock.System.now().toEpochMilliseconds()}-${Random.nextInt(0xFFFF)}",
            date = date,
            weight = kotlin.math.round(weight * 100) / 100.0,
            bodyFatPct = call.payload["bodyFatPct"]?.jsonPrimitive?.content?.toDoubleOrNull()?.coerceIn(3.0, 60.0),
            notes = call.payload["notes"]?.jsonPrimitive?.content,
            recordedAt = nowIso()
        )
        val updatedLog = listOf(entry) + (profile.bodyWeightLog ?: emptyList()).take(999)
        val updated = profile.copy(bodyWeightLog = updatedLog, updatedAt = nowIso())
        saveTrainerProfile(uid, updated, call.encryptionKey)
        eventBus.emit(SpineEventPayload(type = "TITAN_BODY_WEIGHT_LOGGED", source = "titan", domain = "B", data = mapOf("weight" to entry.weight, "date" to entry.date), priority = "info"))
    }

    private suspend fun handleTitanLogCardioSession(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadTrainerProfile(uid, call.encryptionKey)
        val durationMinutes = call.payload["durationMinutes"]?.jsonPrimitive?.content?.toIntOrNull()?.coerceIn(1, 600) ?: return
        val validTypes = listOf("run", "bike", "swim", "row", "hike", "elliptical", "jump_rope", "other")
        val type = call.payload["type"]?.jsonPrimitive?.content?.takeIf { it in validTypes } ?: "other"
        val now = nowIso()
        val date = call.payload["date"]?.jsonPrimitive?.content?.takeIf { it.length >= 10 } ?: now.take(10)
        val session = CardioSession(
            id = call.payload["id"]?.jsonPrimitive?.content ?: "titan-${Clock.System.now().toEpochMilliseconds()}-${Random.nextInt(0xFFFF)}",
            date = date,
            type = type,
            durationMinutes = durationMinutes,
            distanceKm = call.payload["distanceKm"]?.jsonPrimitive?.content?.toDoubleOrNull()?.takeIf { it > 0 },
            avgHeartRate = call.payload["avgHeartRate"]?.jsonPrimitive?.content?.toIntOrNull()?.coerceIn(40, 220),
            calories = call.payload["calories"]?.jsonPrimitive?.content?.toIntOrNull()?.takeIf { it > 0 },
            notes = call.payload["notes"]?.jsonPrimitive?.content,
            rpe = call.payload["rpe"]?.jsonPrimitive?.content?.toIntOrNull()?.coerceIn(1, 10),
            status = if (call.payload["status"]?.jsonPrimitive?.content == "partial") "partial" else "completed",
            recordedAt = now
        )
        val updatedLog = listOf(session) + (profile.cardioLog ?: emptyList()).take(499)
        val updated = profile.copy(cardioLog = updatedLog, updatedAt = now)
        saveTrainerProfile(uid, updated, call.encryptionKey)
        eventBus.emit(SpineEventPayload(type = "WORKOUT_COMPLETED", source = "titan", domain = "B", data = mapOf("sessionId" to session.id, "routineName" to type, "date" to session.date, "durationMinutes" to session.durationMinutes, "isCardio" to true), priority = "info"))
    }

    private suspend fun handleTitanLogBodyFat(call: ActionCall) {
        val uid = call.userId ?: return
        val pct = call.payload["bodyFatPct"]?.jsonPrimitive?.content?.toDoubleOrNull()?.coerceIn(3.0, 60.0) ?: return
        val date = call.payload["date"]?.jsonPrimitive?.content?.takeIf { it.length >= 10 } ?: nowIso().take(10)
        val entry = com.agnes.nexus.core.domain.models.BodyFatEntry(
            id = "bf-${Clock.System.now().toEpochMilliseconds()}-${Random.nextInt(0xFFFF)}",
            date = date,
            bodyFatPct = kotlin.math.round(pct * 10) / 10.0,
            method = call.payload["method"]?.jsonPrimitive?.content,
            notes = call.payload["notes"]?.jsonPrimitive?.content,
            recordedAt = nowIso()
        )
        val profile = loadTrainerProfile(uid, call.encryptionKey)
        val updated = profile.copy(bodyFatLog = listOf(entry) + (profile.bodyFatLog ?: emptyList()).take(499), updatedAt = nowIso())
        saveTrainerProfile(uid, updated, call.encryptionKey)
        nsvService.updateNsv(mapOf("biological.bodyFatPct" to pct))
        eventBus.emit(SpineEventPayload(type = "VITAL_UPDATED", source = "titan", domain = "B", data = mapOf("bodyFatPct" to pct, "date" to date), priority = "info"))
    }

    private suspend fun handleTitanLogInjury(call: ActionCall) {
        val uid = call.userId ?: return
        val bodyPart = call.payload["bodyPart"]?.jsonPrimitive?.content?.trim()?.takeIf { it.isNotBlank() } ?: return
        val description = call.payload["description"]?.jsonPrimitive?.content ?: ""
        val validSeverities = setOf("mild", "moderate", "severe")
        val severity = call.payload["severity"]?.jsonPrimitive?.content?.takeIf { it in validSeverities } ?: "mild"
        val entry = com.agnes.nexus.core.domain.models.TitanInjury(
            id = "inj-${Clock.System.now().toEpochMilliseconds()}-${Random.nextInt(0xFFFF)}",
            bodyPart = bodyPart,
            description = description,
            severity = severity,
            status = "active",
            dateReported = nowIso().take(10),
            notes = call.payload["notes"]?.jsonPrimitive?.content,
            recordedAt = nowIso()
        )
        val profile = loadTrainerProfile(uid, call.encryptionKey)
        val updated = profile.copy(injuryLog = listOf(entry) + (profile.injuryLog ?: emptyList()).take(199), updatedAt = nowIso())
        saveTrainerProfile(uid, updated, call.encryptionKey)
        val priority = if (severity == "severe") "alert" else "info"
        eventBus.emit(SpineEventPayload(type = "TITAN_INJURY_LOGGED", source = "titan", domain = "B", data = mapOf("bodyPart" to bodyPart, "severity" to severity, "id" to entry.id), priority = priority))
    }

    private suspend fun handleTitanUpdateInjuryStatus(call: ActionCall) {
        val uid = call.userId ?: return
        val injuryId = call.payload["id"]?.jsonPrimitive?.content?.trim()?.takeIf { it.isNotBlank() } ?: return
        val validStatuses = setOf("active", "monitoring", "resolved")
        val newStatus = call.payload["status"]?.jsonPrimitive?.content?.takeIf { it in validStatuses } ?: return
        val profile = loadTrainerProfile(uid, call.encryptionKey)
        val resolvedAt = if (newStatus == "resolved") nowIso() else null
        val updatedLog = (profile.injuryLog ?: emptyList()).map { injury ->
            if (injury.id == injuryId) injury.copy(status = newStatus, resolvedAt = resolvedAt ?: injury.resolvedAt) else injury
        }
        saveTrainerProfile(uid, profile.copy(injuryLog = updatedLog, updatedAt = nowIso()), call.encryptionKey)
        eventBus.emit(SpineEventPayload(type = "TITAN_INJURY_UPDATED", source = "titan", domain = "B", data = mapOf("id" to injuryId, "status" to newStatus), priority = "info"))
    }

    private suspend fun handleTitanLogSupplement(call: ActionCall) {
        val uid = call.userId ?: return
        val name = call.payload["name"]?.jsonPrimitive?.content?.trim()?.takeIf { it.isNotBlank() } ?: return
        val entry = com.agnes.nexus.core.domain.models.SupplementEntry(
            id = "sup-${Clock.System.now().toEpochMilliseconds()}-${Random.nextInt(0xFFFF)}",
            name = name,
            dosage = call.payload["dosage"]?.jsonPrimitive?.content,
            timing = call.payload["timing"]?.jsonPrimitive?.content,
            unit = call.payload["unit"]?.jsonPrimitive?.content,
            notes = call.payload["notes"]?.jsonPrimitive?.content,
            loggedAt = nowIso()
        )
        val profile = loadTrainerProfile(uid, call.encryptionKey)
        val updated = profile.copy(supplementLog = listOf(entry) + (profile.supplementLog ?: emptyList()).take(999), updatedAt = nowIso())
        saveTrainerProfile(uid, updated, call.encryptionKey)
        eventBus.emit(SpineEventPayload(type = "TITAN_SUPPLEMENT_LOGGED", source = "titan", domain = "B", data = mapOf("name" to name, "id" to entry.id), priority = "info"))
    }

    private suspend fun handleTitanLogMeal(call: ActionCall) {
        val uid = call.userId ?: return
        val mealName = call.payload["name"]?.jsonPrimitive?.content?.trim()?.takeIf { it.isNotBlank() } ?: return
        val entry = com.agnes.nexus.core.domain.models.MealEntry(
            id = "meal-${Clock.System.now().toEpochMilliseconds()}-${Random.nextInt(0xFFFF)}",
            name = mealName,
            mealType = call.payload["mealType"]?.jsonPrimitive?.content,
            calories = call.payload["calories"]?.jsonPrimitive?.content?.toIntOrNull(),
            protein = call.payload["protein"]?.jsonPrimitive?.content?.toDoubleOrNull(),
            carbs = call.payload["carbs"]?.jsonPrimitive?.content?.toDoubleOrNull(),
            fat = call.payload["fat"]?.jsonPrimitive?.content?.toDoubleOrNull(),
            date = call.payload["date"]?.jsonPrimitive?.content?.takeIf { it.length >= 10 } ?: nowIso().take(10),
            notes = call.payload["notes"]?.jsonPrimitive?.content,
            loggedAt = nowIso()
        )
        val profile = loadTrainerProfile(uid, call.encryptionKey)
        val updated = profile.copy(mealLog = listOf(entry) + (profile.mealLog ?: emptyList()).take(999), updatedAt = nowIso())
        saveTrainerProfile(uid, updated, call.encryptionKey)
        eventBus.emit(SpineEventPayload(type = "TITAN_MEAL_LOGGED", source = "titan", domain = "B", data = mapOf("name" to mealName, "date" to entry.date, "calories" to (entry.calories ?: 0)), priority = "info"))
    }

    private suspend fun handleTitanLogMacros(call: ActionCall) {
        val uid = call.userId ?: return
        val date = call.payload["date"]?.jsonPrimitive?.content?.takeIf { it.length >= 10 } ?: nowIso().take(10)
        val calories = call.payload["calories"]?.jsonPrimitive?.content?.toDoubleOrNull()
        val proteinG = call.payload["protein"]?.jsonPrimitive?.content?.toDoubleOrNull()
            ?: call.payload["proteinG"]?.jsonPrimitive?.content?.toDoubleOrNull()
        val carbsG = call.payload["carbs"]?.jsonPrimitive?.content?.toDoubleOrNull()
            ?: call.payload["carbsG"]?.jsonPrimitive?.content?.toDoubleOrNull()
        val fatG = call.payload["fat"]?.jsonPrimitive?.content?.toDoubleOrNull()
            ?: call.payload["fatG"]?.jsonPrimitive?.content?.toDoubleOrNull()
        if (calories == null && proteinG == null && carbsG == null && fatG == null) return
        val entry = com.agnes.nexus.core.domain.models.DailyMacroLog(
            id = "macro-${Clock.System.now().toEpochMilliseconds()}-${Random.nextInt(0xFFFF)}",
            date = date,
            calories = calories,
            proteinG = proteinG,
            carbsG = carbsG,
            fatG = fatG,
            fiberG = call.payload["fiber"]?.jsonPrimitive?.content?.toDoubleOrNull()
                ?: call.payload["fiberG"]?.jsonPrimitive?.content?.toDoubleOrNull(),
            notes = call.payload["notes"]?.jsonPrimitive?.content,
            loggedAt = nowIso()
        )
        val profile = loadTrainerProfile(uid, call.encryptionKey)
        // Replace same-day macro entry to avoid duplicates; keep up to 365 days
        val updatedLog = listOf(entry) + (profile.macroLog ?: emptyList()).filter { it.date != date }.take(364)
        val updated = profile.copy(macroLog = updatedLog, updatedAt = nowIso())
        saveTrainerProfile(uid, updated, call.encryptionKey)
        eventBus.emit(SpineEventPayload(type = "TITAN_MACROS_LOGGED", source = "titan", domain = "B", data = mapOf("date" to date, "calories" to (calories ?: 0), "protein" to (proteinG ?: 0.0)), priority = "info"))
    }

    private suspend fun handleTitanScheduleWorkout(call: ActionCall) {
        val uid = call.userId ?: return
        val date = call.payload["date"]?.jsonPrimitive?.content?.takeIf { it.length >= 10 } ?: return
        val routineName = call.payload["routineName"]?.jsonPrimitive?.content ?: "Workout"
        val exerciseNames = (call.payload["exerciseNames"] as? JsonArray)?.mapNotNull { it.jsonPrimitive.contentOrNull }
        val plan = com.agnes.nexus.core.domain.models.PlannedWorkout(
            id = "plan-${Clock.System.now().toEpochMilliseconds()}-${Random.nextInt(0xFFFF)}",
            date = date,
            routineName = routineName,
            exerciseNames = exerciseNames?.ifEmpty { null },
            notes = call.payload["notes"]?.jsonPrimitive?.content,
            status = "planned",
            createdAt = nowIso()
        )
        val profile = loadTrainerProfile(uid, call.encryptionKey)
        val updated = profile.copy(plannedWorkouts = listOf(plan) + (profile.plannedWorkouts ?: emptyList()).take(199), updatedAt = nowIso())
        saveTrainerProfile(uid, updated, call.encryptionKey)
        eventBus.emit(SpineEventPayload(type = "WORKOUT_SCHEDULED", source = "titan", domain = "B", data = mapOf("planId" to plan.id, "date" to date, "routineName" to routineName), priority = "info"))
    }

    private suspend fun handleTitanUpdatePlannedWorkout(call: ActionCall) {
        val uid = call.userId ?: return
        val planId = call.payload["id"]?.jsonPrimitive?.content?.trim()?.takeIf { it.isNotBlank() } ?: return
        val profile = loadTrainerProfile(uid, call.encryptionKey)
        val newStatus = call.payload["status"]?.jsonPrimitive?.content
        val newNotes = call.payload["notes"]?.jsonPrimitive?.content
        val updatedPlans = (profile.plannedWorkouts ?: emptyList()).map { pw ->
            if (pw.id == planId) pw.copy(status = newStatus ?: pw.status, notes = newNotes ?: pw.notes) else pw
        }
        saveTrainerProfile(uid, profile.copy(plannedWorkouts = updatedPlans, updatedAt = nowIso()), call.encryptionKey)
        eventBus.emit(SpineEventPayload(type = "WORKOUT_PLAN_UPDATED", source = "titan", domain = "B", data = mapOf("planId" to planId, "status" to (newStatus ?: "unchanged")), priority = "info"))
    }

    // ------------------------- Scout onboarding -------------------------
    private suspend fun loadScoutKnowledge(uid: String, encryptionKey: String? = null): ScoutKnowledge {
        val layer = dataLayer ?: return ScoutKnowledge()
        val doc = layer.getDocument("scout_knowledge", uid) { Json.parseToJsonElement(it).jsonObject } ?: return ScoutKnowledge()
        val encryptedData = doc["encryptedData"]?.jsonPrimitive?.content
        val iv = doc["iv"]?.jsonPrimitive?.content
        if (!encryptedData.isNullOrBlank() && !iv.isNullOrBlank() && encryptionKey != null && vaultBoundary != null) {
            val vault = vaultBoundary
            val decrypted = runCatching {
                vault.decrypt(EncryptedEnvelope(ciphertext = encryptedData, iv = iv), encryptionKey)
            }.getOrNull()
            if (!decrypted.isNullOrBlank()) {
                return runCatching { json.decodeFromString(ScoutKnowledge.serializer(), decrypted) }.getOrElse { ScoutKnowledge() }
            }
            return ScoutKnowledge()
        }
        return runCatching { json.decodeFromJsonElement(ScoutKnowledge.serializer(), doc) }.getOrElse { ScoutKnowledge() }
    }

    private suspend fun saveScoutKnowledge(uid: String, knowledge: ScoutKnowledge, encryptionKey: String? = null) {
        val layer = dataLayer ?: return
        val updated = knowledge.copy(updatedAt = nowIso())
        if (encryptionKey != null && vaultBoundary != null) {
            val vault = vaultBoundary
            val payloadJson = json.encodeToString(ScoutKnowledge.serializer(), updated)
            val encrypted = runCatching { vault.encrypt(payloadJson, encryptionKey) }.getOrNull() ?: return
            layer.setDocument("scout_knowledge", uid, mapOf(
                "encryptedData" to encrypted.ciphertext,
                "iv" to encrypted.iv,
                "salt" to "vault_salt_used",
                "metadata" to mapOf("onboardingComplete" to updated.onboardingComplete, "lastActive" to nowIso())
            ))
            return
        }
        val payload = json.encodeToJsonElement(ScoutKnowledge.serializer(), updated).jsonObject.toMap()
        layer.setDocument("scout_knowledge", uid, payload)
    }

    private suspend fun handleScoutUpdateOnboardingProfile(call: ActionCall) {
        val uid = call.userId ?: return
        val knowledge = loadScoutKnowledge(uid, call.encryptionKey)
        val focusArea = call.payload["focusArea"]?.jsonPrimitive?.content ?: knowledge.epistemicGraph.focusArea
        val updated = knowledge.copy(
            epistemicGraph = knowledge.epistemicGraph.copy(focusArea = focusArea),
            updatedAt = nowIso()
        )
        saveScoutKnowledge(uid, updated, call.encryptionKey)
    }

    private suspend fun handleScoutCompleteOnboarding(call: ActionCall) {
        val uid = call.userId ?: return
        val knowledge = loadScoutKnowledge(uid, call.encryptionKey)
        saveScoutKnowledge(uid, knowledge.copy(onboardingComplete = true, updatedAt = nowIso()), call.encryptionKey)
        eventBus.emit(SpineEventPayload(
            type = "ONBOARDING_COMPLETED",
            source = "scout",
            domain = "C",
            priority = "info",
            data = mapOf("moduleId" to "scout")
        ))
    }

    // ------------------------- Scout research handlers -------------------------

    private suspend fun handleScoutAddKnowledgeNode(call: ActionCall) {
        val uid = call.userId ?: return
        val layer = dataLayer ?: return
        val id = call.payload["id"]?.jsonPrimitive?.contentOrNull
            ?: call.payload["nodeId"]?.jsonPrimitive?.contentOrNull
            ?: "kn-${Clock.System.now().toEpochMilliseconds()}-${Random.nextInt(0xFFFF)}"
        val title = call.payload["title"]?.jsonPrimitive?.contentOrNull ?: ""
        val content = call.payload["content"]?.jsonPrimitive?.contentOrNull
            ?: call.payload["claim"]?.jsonPrimitive?.contentOrNull
            ?: ""
        val confidence = call.payload["confidence"]?.jsonPrimitive?.doubleOrNull ?: 0.5
        val type = call.payload["type"]?.jsonPrimitive?.contentOrNull ?: "unverified"
        val sourceId = call.payload["sourceId"]?.jsonPrimitive?.contentOrNull
        val status = if (type == "verified") "verified" else "pending"
        val nodeData = mapOf(
            "id" to id,
            "title" to title,
            "content" to content,
            "confidence" to confidence,
            "type" to type,
            "sourceId" to sourceId,
            "userId" to uid,
            "createdAt" to nowIso()
        )
        layer.setDocument("scout_knowledge/$uid/nodes", id, nodeData)
        eventBus.emit(SpineEventPayload(
            type = "KNOWLEDGE_NODE_ADDED",
            source = "scout",
            domain = "C",
            priority = "info",
            data = mapOf("nodeId" to id, "title" to title, "confidence" to confidence, "nodeType" to type, "status" to status)
        ))
    }

    private suspend fun handleScoutExtractCitation(call: ActionCall) {
        val uid = call.userId ?: return
        val layer = dataLayer ?: return
        val text = call.payload["text"]?.jsonPrimitive?.contentOrNull ?: return
        val id = call.payload["id"]?.jsonPrimitive?.contentOrNull
            ?: "cite-${Clock.System.now().toEpochMilliseconds()}-${Random.nextInt(0xFFFF)}"
        val url = call.payload["url"]?.jsonPrimitive?.contentOrNull
            ?: call.payload["sourceUrl"]?.jsonPrimitive?.contentOrNull
            ?: ""
        val title = call.payload["title"]?.jsonPrimitive?.contentOrNull
            ?: call.payload["sourceTitle"]?.jsonPrimitive?.contentOrNull
            ?: ""
        val sourceId = call.payload["sourceId"]?.jsonPrimitive?.contentOrNull ?: ""
        val citationData = mapOf(
            "id" to id,
            "text" to text,
            "url" to url,
            "title" to title,
            "sourceId" to sourceId,
            "userId" to uid,
            "extractedAt" to nowIso()
        )
        layer.setDocument("scout_knowledge/$uid/citations", id, citationData)
        eventBus.emit(SpineEventPayload(
            type = "VITAL_UPDATED",
            source = "scout",
            domain = "C",
            priority = "info",
            data = mapOf("citationId" to id, "title" to title, "url" to url, "action" to "extract_citation")
        ))
    }

    private suspend fun handleScoutExtractFinding(call: ActionCall) {
        val uid = call.userId ?: return
        val layer = dataLayer ?: return
        val id = call.payload["id"]?.jsonPrimitive?.contentOrNull
            ?: "find-${Clock.System.now().toEpochMilliseconds()}-${Random.nextInt(0xFFFF)}"
        val finding = call.payload["finding"]?.jsonPrimitive?.contentOrNull
            ?: call.payload["content"]?.jsonPrimitive?.contentOrNull
            ?: ""
        val confidence = call.payload["confidence"]?.jsonPrimitive?.doubleOrNull ?: 0.5
        val sourceId = call.payload["sourceId"]?.jsonPrimitive?.contentOrNull
        val findingData = mapOf(
            "id" to id,
            "finding" to finding,
            "confidence" to confidence,
            "sourceId" to sourceId,
            "userId" to uid,
            "extractedAt" to nowIso()
        )
        layer.setDocument("scout_knowledge/$uid/findings", id, findingData)
        eventBus.emit(SpineEventPayload(
            type = "KNOWLEDGE_NODE_ADDED",
            source = "scout",
            domain = "C",
            priority = "info",
            data = mapOf("findingId" to id, "finding" to finding, "confidence" to confidence)
        ))
    }

    private suspend fun handleScoutCommitResearchSession(call: ActionCall) {
        val uid = call.userId ?: return
        val layer = dataLayer ?: return
        val id = call.payload["id"]?.jsonPrimitive?.contentOrNull
            ?: call.payload["sessionId"]?.jsonPrimitive?.contentOrNull
            ?: "session-${Clock.System.now().toEpochMilliseconds()}-${Random.nextInt(0xFFFF)}"
        val query = call.payload["query"]?.jsonPrimitive?.contentOrNull ?: ""
        val summary = call.payload["summary"]?.jsonPrimitive?.contentOrNull ?: ""
        val findingsCount = call.payload["findingsCount"]?.jsonPrimitive?.intOrNull ?: 0
        val sourcesCount = call.payload["sourcesCount"]?.jsonPrimitive?.intOrNull ?: 0
        val sessionData = mapOf(
            "id" to id,
            "query" to query,
            "summary" to summary,
            "findingsCount" to findingsCount,
            "sourcesCount" to sourcesCount,
            "status" to "complete",
            "userId" to uid,
            "committedAt" to nowIso()
        )
        layer.setDocument("scout_sessions/$uid/sessions", id, sessionData)
        eventBus.emit(SpineEventPayload(
            type = "VITAL_UPDATED",
            source = "scout",
            domain = "C",
            priority = "info",
            data = mapOf("sessionId" to id, "query" to query, "findingsCount" to findingsCount)
        ))
    }

    private suspend fun handleScoutAddSource(call: ActionCall) {
        val uid = call.userId ?: return
        val layer = dataLayer ?: return
        val id = call.payload["id"]?.jsonPrimitive?.contentOrNull
            ?: "src-${Clock.System.now().toEpochMilliseconds()}-${Random.nextInt(0xFFFF)}"
        val url = call.payload["url"]?.jsonPrimitive?.contentOrNull ?: ""
        if (url.isBlank()) return
        val title = call.payload["title"]?.jsonPrimitive?.contentOrNull ?: ""
        val type = call.payload["type"]?.jsonPrimitive?.contentOrNull ?: "web"
        val sourceData = mapOf(
            "id" to id,
            "url" to url,
            "title" to title,
            "type" to type,
            "isStarred" to false,
            "isArchived" to false,
            "userId" to uid,
            "addedAt" to nowIso()
        )
        layer.setDocument("scout_sources/$uid/sources", id, sourceData)
        eventBus.emit(SpineEventPayload(
            type = "VITAL_UPDATED",
            source = "scout",
            domain = "C",
            priority = "info",
            data = mapOf("sourceId" to id, "url" to url, "title" to title, "sourceType" to type)
        ))
    }

    private suspend fun handleScoutGenerateDigest(call: ActionCall) {
        val uid = call.userId ?: return
        val layer = dataLayer ?: return
        val id = call.payload["id"]?.jsonPrimitive?.contentOrNull
            ?: "digest-${Clock.System.now().toEpochMilliseconds()}-${Random.nextInt(0xFFFF)}"
        val digestText = call.payload["digestText"]?.jsonPrimitive?.contentOrNull
            ?: call.payload["text"]?.jsonPrimitive?.contentOrNull
            ?: ""
        val nodeCount = call.payload["nodeCount"]?.jsonPrimitive?.intOrNull ?: 0
        val sourceCount = call.payload["sourceCount"]?.jsonPrimitive?.intOrNull ?: 0
        val digestData = mapOf(
            "id" to id,
            "digestText" to digestText,
            "nodeCount" to nodeCount,
            "sourceCount" to sourceCount,
            "userId" to uid,
            "createdAt" to nowIso()
        )
        layer.setDocument("scout_digests/$uid/digests", id, digestData)
        eventBus.emit(SpineEventPayload(
            type = "DIGEST_GENERATED",
            source = "scout",
            domain = "C",
            priority = "info",
            data = mapOf("digestId" to id, "nodeCount" to nodeCount, "sourceCount" to sourceCount)
        ))
    }

    private suspend fun handleScoutExportResearch(call: ActionCall) {
        val uid = call.userId ?: return
        val layer = dataLayer ?: return
        val id = call.payload["id"]?.jsonPrimitive?.contentOrNull
            ?: "export-${Clock.System.now().toEpochMilliseconds()}-${Random.nextInt(0xFFFF)}"
        val format = call.payload["format"]?.jsonPrimitive?.contentOrNull ?: "markdown"
        val nodeCount = call.payload["nodeCount"]?.jsonPrimitive?.intOrNull ?: 0
        val sourceCount = call.payload["sourceCount"]?.jsonPrimitive?.intOrNull ?: 0
        val exportData = mapOf(
            "id" to id,
            "format" to format,
            "nodeCount" to nodeCount,
            "sourceCount" to sourceCount,
            "userId" to uid,
            "exportedAt" to nowIso()
        )
        layer.setDocument("scout_exports/$uid/exports", id, exportData)
        eventBus.emit(SpineEventPayload(
            type = "RESEARCH_EXPORTED",
            source = "scout",
            domain = "C",
            priority = "info",
            data = mapOf("exportId" to id, "format" to format, "nodeCount" to nodeCount)
        ))
    }

    private suspend fun handleScoutStartDeepResearch(call: ActionCall) {
        val uid = call.userId ?: return
        val layer = dataLayer ?: return
        val query = call.payload["query"]?.jsonPrimitive?.contentOrNull
            ?: call.payload["topic"]?.jsonPrimitive?.contentOrNull
            ?: ""
        if (query.isBlank()) return
        val sessionId = call.payload["sessionId"]?.jsonPrimitive?.contentOrNull
            ?: "deep-${Clock.System.now().toEpochMilliseconds()}-${Random.nextInt(0xFFFF)}"
        val sessionData = mapOf(
            "id" to sessionId,
            "query" to query,
            "status" to "deep_research",
            "userId" to uid,
            "createdAt" to nowIso()
        )
        layer.setDocument("scout_sessions/$uid/sessions", sessionId, sessionData)
        eventBus.emit(SpineEventPayload(
            type = "DEEP_RESEARCH_REQUESTED",
            source = "scout",
            domain = "C",
            priority = "info",
            data = mapOf("query" to query, "sessionId" to sessionId)
        ))
    }

    private suspend fun handleScoutFlagAnomaly(call: ActionCall) {
        val uid = call.userId ?: return
        val layer = dataLayer ?: return
        val id = call.payload["id"]?.jsonPrimitive?.contentOrNull
            ?: "anomaly-${Clock.System.now().toEpochMilliseconds()}-${Random.nextInt(0xFFFF)}"
        val description = call.payload["description"]?.jsonPrimitive?.contentOrNull
            ?: call.payload["anomaly"]?.jsonPrimitive?.contentOrNull
            ?: ""
        val severity = call.payload["severity"]?.jsonPrimitive?.contentOrNull ?: "medium"
        val sourceId = call.payload["sourceId"]?.jsonPrimitive?.contentOrNull
        val anomalyData = mapOf(
            "id" to id,
            "description" to description,
            "severity" to severity,
            "sourceId" to sourceId,
            "userId" to uid,
            "flaggedAt" to nowIso()
        )
        layer.setDocument("scout_anomalies/$uid/anomalies", id, anomalyData)
        eventBus.emit(SpineEventPayload(
            type = "KNOWLEDGE_NODE_ADDED",
            source = "scout",
            domain = "C",
            priority = if (severity == "high") "alert" else "info",
            data = mapOf("anomalyId" to id, "description" to description, "severity" to severity)
        ))
    }

    // ------------------------- Forge onboarding -------------------------
    private suspend fun loadForgeProfile(uid: String, encryptionKey: String? = null): ForgeProfile {
        val layer = dataLayer ?: return ForgeProfile()
        val doc = layer.getDocument("forge_sessions", uid) { Json.parseToJsonElement(it).jsonObject } ?: return ForgeProfile()
        val encryptedData = doc["encryptedData"]?.jsonPrimitive?.content
        val iv = doc["iv"]?.jsonPrimitive?.content
        if (!encryptedData.isNullOrBlank() && !iv.isNullOrBlank() && encryptionKey != null && vaultBoundary != null) {
            val vault = vaultBoundary
            val decrypted = runCatching {
                vault.decrypt(EncryptedEnvelope(ciphertext = encryptedData, iv = iv), encryptionKey)
            }.getOrNull()
            if (!decrypted.isNullOrBlank()) {
                return runCatching { json.decodeFromString(ForgeProfile.serializer(), decrypted) }.getOrElse { ForgeProfile() }
            }
            return ForgeProfile()
        }
        return runCatching { json.decodeFromJsonElement(ForgeProfile.serializer(), doc) }.getOrElse { ForgeProfile() }
    }

    private suspend fun saveForgeProfile(uid: String, profile: ForgeProfile, encryptionKey: String? = null) {
        val layer = dataLayer ?: return
        val updated = profile.copy(updatedAt = nowIso())
        if (encryptionKey != null && vaultBoundary != null) {
            val vault = vaultBoundary
            val payloadJson = json.encodeToString(ForgeProfile.serializer(), updated)
            val encrypted = runCatching { vault.encrypt(payloadJson, encryptionKey) }.getOrNull() ?: return
            layer.setDocument("forge_sessions", uid, mapOf(
                "encryptedData" to encrypted.ciphertext,
                "iv" to encrypted.iv,
                "salt" to "vault_salt_used",
                "metadata" to mapOf("onboardingComplete" to updated.onboardingComplete, "lastActive" to nowIso())
            ))
            return
        }
        val payload = json.encodeToJsonElement(ForgeProfile.serializer(), updated).jsonObject.toMap()
        layer.setDocument("forge_sessions", uid, payload)
    }

    private suspend fun handleForgeUpdateOnboardingProfile(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadForgeProfile(uid, call.encryptionKey)
        val environment = call.payload["environment"]?.jsonPrimitive?.content ?: profile.environment
        val safetyMode = call.payload["safetyMode"]?.jsonPrimitive?.content ?: profile.safetyMode
        val reportingStyle = call.payload["reportingStyle"]?.jsonPrimitive?.content ?: profile.reportingStyle
        val summary = call.payload["summary"]?.jsonPrimitive?.content ?: profile.summary
        val updated = profile.copy(
            environment = environment,
            safetyMode = safetyMode,
            reportingStyle = reportingStyle,
            summary = summary,
            updatedAt = nowIso()
        )
        saveForgeProfile(uid, updated, call.encryptionKey)
    }

    private suspend fun handleForgeCompleteOnboarding(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadForgeProfile(uid, call.encryptionKey)
        saveForgeProfile(uid, profile.copy(onboardingComplete = true, updatedAt = nowIso()), call.encryptionKey)
        eventBus.emit(SpineEventPayload(
            type = "ONBOARDING_COMPLETED",
            source = "forge",
            domain = "system",
            data = mapOf("moduleId" to "forge"),
            priority = "info"
        ))
    }

    private fun payloadString(payload: JsonObject, key: String): String? =
        payload[key]?.jsonPrimitive?.contentOrNull

    private suspend fun appendForgeSession(
        uid: String,
        session: ForgeExecutionRecord,
        commandQueueEntry: String? = null,
        encryptionKey: String? = null
    ) {
        val profile = loadForgeProfile(uid, encryptionKey)
        val nextQueue = if (commandQueueEntry != null)
            (listOf(commandQueueEntry) + profile.commandQueue).distinct().take(100)
        else profile.commandQueue
        val nextSessions = (listOf(session) + profile.sessions.filter { it.id != session.id }).take(300)
        saveForgeProfile(uid, profile.copy(commandQueue = nextQueue, sessions = nextSessions, updatedAt = nowIso()), encryptionKey)
    }

    private suspend fun appendForgeArtifact(uid: String, artifact: ForgeArtifact, encryptionKey: String? = null) {
        val profile = loadForgeProfile(uid, encryptionKey)
        val nextArtifacts = (listOf(artifact) + profile.artifacts.filter { it.id != artifact.id }).take(300)
        saveForgeProfile(uid, profile.copy(artifacts = nextArtifacts, updatedAt = nowIso()), encryptionKey)
    }

    private suspend fun handleForgeExecuteCode(call: ActionCall) {
        val uid = call.userId ?: return
        val code = payloadString(call.payload, "code") ?: payloadString(call.payload, "content") ?: ""
        if (code.isBlank()) return
        val language = payloadString(call.payload, "language") ?: "javascript"
        val sessionId = "forge-exec-${Clock.System.now().toEpochMilliseconds()}"
        val session = ForgeExecutionRecord(
            id = sessionId,
            command = code.take(500),
            result = "queued",
            outputSummary = "Execution queued for $language",
            createdAt = nowIso()
        )
        appendForgeSession(uid, session, commandQueueEntry = code.lines().firstOrNull(), encryptionKey = call.encryptionKey)
        eventBus.emit(SpineEventPayload(
            type = "FORGE_EXECUTION_COMPLETED",
            source = "forge",
            domain = "system",
            data = mapOf("sessionId" to sessionId, "language" to language, "result" to "queued"),
            priority = "info"
        ))
    }

    private suspend fun handleForgeCreateArtifact(call: ActionCall) {
        val uid = call.userId ?: return
        val name = payloadString(call.payload, "name") ?: "Untitled"
        val type = payloadString(call.payload, "type") ?: "document"
        val content = payloadString(call.payload, "content") ?: ""
        val mode = payloadString(call.payload, "mode") ?: "CODE"
        val artifactId = "forge-artifact-${Clock.System.now().toEpochMilliseconds()}"
        val artifact = ForgeArtifact(
            id = artifactId,
            type = type,
            title = name,
            content = content,
            createdAt = nowIso(),
            mode = mode
        )
        appendForgeArtifact(uid, artifact, call.encryptionKey)
        eventBus.emit(SpineEventPayload(
            type = "FORGE_ARTIFACT_CREATED",
            source = "forge",
            domain = "system",
            data = mapOf("artifactId" to artifactId, "type" to type, "title" to name, "name" to name, "mode" to mode),
            priority = "info"
        ))
    }

    private suspend fun handleForgeUpdateArtifact(call: ActionCall) {
        val uid = call.userId ?: return
        val artifactId = payloadString(call.payload, "artifactId") ?: return
        val newContent = payloadString(call.payload, "content") ?: return
        val profile = loadForgeProfile(uid, call.encryptionKey)
        val existing = profile.artifacts.firstOrNull { it.id == artifactId } ?: return
        val updated = existing.copy(content = newContent)
        appendForgeArtifact(uid, updated, call.encryptionKey)
        eventBus.emit(SpineEventPayload(
            type = "VITAL_UPDATED",
            source = "forge",
            domain = "system",
            data = mapOf("moduleId" to "forge", "artifactId" to artifactId, "fieldName" to "content", "timestamp" to nowIso()),
            priority = "info"
        ))
    }

    private suspend fun handleForgeRunTests(call: ActionCall) {
        val uid = call.userId ?: return
        val testPath = payloadString(call.payload, "testPath") ?: "."
        val framework = payloadString(call.payload, "framework") ?: "gradle"
        val summary = payloadString(call.payload, "summary") ?: "Tests queued"
        val sessionId = "forge-test-${Clock.System.now().toEpochMilliseconds()}"
        val session = ForgeExecutionRecord(
            id = sessionId,
            command = "$framework $testPath",
            result = "queued",
            outputSummary = summary,
            createdAt = nowIso()
        )
        appendForgeSession(uid, session, encryptionKey = call.encryptionKey)
        eventBus.emit(SpineEventPayload(
            type = "FORGE_EXECUTION_COMPLETED",
            source = "forge",
            domain = "system",
            data = mapOf("sessionId" to sessionId, "framework" to framework, "testPath" to testPath, "result" to "queued"),
            priority = "info"
        ))
    }

    private suspend fun handleForgeDraftCommunication(call: ActionCall) {
        val uid = call.userId ?: return
        val recipient = payloadString(call.payload, "recipient") ?: ""
        val subject = payloadString(call.payload, "subject") ?: "Draft"
        val body = payloadString(call.payload, "body") ?: ""
        val tone = (payloadString(call.payload, "tone") ?: "formal").ifBlank { "formal" }
        val artifactId = "forge-comms-${Clock.System.now().toEpochMilliseconds()}"
        val emailContent = buildString {
            if (recipient.isNotBlank()) appendLine("To: $recipient")
            appendLine("Subject: $subject")
            appendLine("Tone: $tone")
            appendLine()
            append(body)
        }
        val artifact = ForgeArtifact(
            id = artifactId,
            type = "email",
            title = subject,
            content = emailContent,
            createdAt = nowIso(),
            mode = "COMMS"
        )
        appendForgeArtifact(uid, artifact, call.encryptionKey)
        eventBus.emit(SpineEventPayload(
            type = "FORGE_COMMS_DRAFTED",
            source = "forge",
            domain = "system",
            data = mapOf("artifactId" to artifactId, "recipient" to recipient, "subject" to subject, "tone" to tone),
            priority = "info"
        ))
    }

    private suspend fun handleForgeDraftDocument(call: ActionCall) {
        val uid = call.userId ?: return
        val title = payloadString(call.payload, "title") ?: "Untitled Document"
        val templateType = payloadString(call.payload, "templateType") ?: "document"
        val content = payloadString(call.payload, "content") ?: ""
        val artifactId = "forge-doc-${Clock.System.now().toEpochMilliseconds()}"
        val artifact = ForgeArtifact(
            id = artifactId,
            type = templateType,
            title = title,
            content = content,
            createdAt = nowIso(),
            mode = "DOCS"
        )
        appendForgeArtifact(uid, artifact, call.encryptionKey)
        eventBus.emit(SpineEventPayload(
            type = "FORGE_ARTIFACT_CREATED",
            source = "forge",
            domain = "system",
            data = mapOf("artifactId" to artifactId, "type" to templateType, "templateType" to templateType, "title" to title, "mode" to "DOCS"),
            priority = "info"
        ))
    }

    private suspend fun handleForgeScheduleLifeTask(call: ActionCall) {
        val uid = call.userId ?: return
        val description = payloadString(call.payload, "description") ?: return
        val dueDate = payloadString(call.payload, "dueDate") ?: ""
        val category = payloadString(call.payload, "category") ?: "general"
        val artifactId = "forge-life-${Clock.System.now().toEpochMilliseconds()}"
        val taskContent = buildString {
            appendLine("- [ ] $description")
            if (dueDate.isNotBlank()) appendLine("  Due: $dueDate")
            appendLine("  Category: $category")
        }
        val artifact = ForgeArtifact(
            id = artifactId,
            type = "checklist",
            title = description.take(80),
            content = taskContent,
            createdAt = nowIso(),
            mode = "LIFE"
        )
        appendForgeArtifact(uid, artifact, call.encryptionKey)
        eventBus.emit(SpineEventPayload(
            type = "VITAL_UPDATED",
            source = "forge",
            domain = "system",
            data = mapOf("moduleId" to "forge", "artifactId" to artifactId, "category" to category, "description" to description, "dueDate" to dueDate, "timestamp" to nowIso()),
            priority = "info"
        ))
    }

    private suspend fun handleForgeLogExecution(call: ActionCall) {
        val uid = call.userId ?: return
        val command = payloadString(call.payload, "command") ?: return
        val result = payloadString(call.payload, "result") ?: "success"
        val output = payloadString(call.payload, "output") ?: ""
        val sessionId = "forge-log-${Clock.System.now().toEpochMilliseconds()}"
        val session = ForgeExecutionRecord(
            id = sessionId,
            command = command,
            result = result,
            outputSummary = output.ifBlank { null },
            createdAt = nowIso()
        )
        appendForgeSession(uid, session, encryptionKey = call.encryptionKey)
    }

    // ------------------------- Agnes onboarding -------------------------
    private suspend fun loadTherapyProfile(uid: String, encryptionKey: String? = null): TherapyProfile {
        val layer = dataLayer ?: return TherapyProfile()
        val doc = layer.getDocument("agnes_profiles", uid) { Json.parseToJsonElement(it).jsonObject } ?: return TherapyProfile()
        val payloadMode = doc["payloadMode"]?.jsonPrimitive?.content
        val plaintextData = doc["plaintextData"]?.jsonPrimitive?.content
        if (payloadMode == "plaintext" && !plaintextData.isNullOrBlank()) {
            return runCatching { json.decodeFromString(TherapyProfile.serializer(), plaintextData) }.getOrElse { TherapyProfile() }
        }
        val encryptedData = doc["encryptedData"]?.jsonPrimitive?.content
        val iv = doc["iv"]?.jsonPrimitive?.content
        if (!encryptedData.isNullOrBlank() && !iv.isNullOrBlank() && vaultBoundary != null) {
            val vault = vaultBoundary
            val decrypted = runCatching {
                vault.decrypt(EncryptedEnvelope(ciphertext = encryptedData, iv = iv), encryptionKey ?: "")
            }.getOrNull()
            if (!decrypted.isNullOrBlank()) {
                return runCatching { json.decodeFromString(TherapyProfile.serializer(), decrypted) }.getOrElse { TherapyProfile() }
            }
            return TherapyProfile()
        }
        return runCatching { json.decodeFromJsonElement(TherapyProfile.serializer(), doc) }.getOrElse { TherapyProfile() }
    }

    private suspend fun saveTherapyProfile(uid: String, profile: TherapyProfile, encryptionKey: String? = null) {
        val layer = dataLayer ?: return
        val updated = profile.copy(updatedAt = nowIso())
        if (vaultBoundary != null) {
            val vault = vaultBoundary
            val payloadJson = json.encodeToString(TherapyProfile.serializer(), updated)
            val encrypted = runCatching { vault.encrypt(payloadJson, encryptionKey ?: "") }.getOrNull() ?: return
            layer.setDocument("agnes_profiles", uid, mapOf(
                "encryptedData" to encrypted.ciphertext,
                "iv" to encrypted.iv,
                "salt" to "vault_salt_used",
                "metadata" to mapOf("onboardingComplete" to updated.onboardingComplete, "lastActive" to nowIso())
            ))
            return
        }
        val profileJson = json.encodeToString(TherapyProfile.serializer(), updated)
        layer.setDocument("agnes_profiles", uid, mapOf(
            "payloadMode" to "plaintext",
            "plaintextData" to profileJson,
            "metadata" to mapOf("onboardingComplete" to updated.onboardingComplete, "lastActive" to nowIso())
        ))
    }

    private suspend fun handleAgnesUpdateOnboardingProfile(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadTherapyProfile(uid, call.encryptionKey)

        // Web parity: update_agnes_profile merges the provided payload into baseContext.
        // We do key-preserving merges so missing keys do not wipe existing data.
        val payload = call.payload

        val backgroundSummary = payload["backgroundSummary"]?.jsonPrimitive?.contentOrNull
            ?: profile.baseContext.backgroundSummary

        val communicationStyle = payload["communicationStyle"]?.jsonPrimitive?.contentOrNull
            ?: profile.baseContext.communicationStyle

        val occupation = payload["occupation"]?.jsonPrimitive?.contentOrNull
            ?: profile.baseContext.occupation

        val typicalSleepHours = payload["typicalSleepHours"]?.jsonPrimitive?.doubleOrNull
            ?: profile.baseContext.typicalSleepHours

        val childhood = payload["childhood"]?.jsonPrimitive?.contentOrNull
            ?: profile.baseContext.childhood

        val struggles = if (payload["struggles"] != null) {
            (payload["struggles"] as? JsonArray)?.mapNotNull { it.jsonPrimitive.contentOrNull } ?: emptyList()
        } else profile.baseContext.struggles

        val goals = if (payload["goals"] != null) {
            (payload["goals"] as? JsonArray)?.mapNotNull { it.jsonPrimitive.contentOrNull } ?: emptyList()
        } else profile.baseContext.goals

        val trauma = payload["trauma"]?.jsonPrimitive?.contentOrNull
            ?: profile.baseContext.trauma

        val history = payload["history"]?.jsonPrimitive?.contentOrNull
            ?: profile.baseContext.history

        val integratedInsights = if (payload["integratedInsights"] != null) {
            val arr = payload["integratedInsights"] as? JsonArray ?: JsonArray(emptyList())
            arr.mapNotNull { el ->
                val obj = el as? JsonObject ?: return@mapNotNull null
                val date = obj["date"]?.jsonPrimitive?.contentOrNull ?: obj["sessionDate"]?.jsonPrimitive?.contentOrNull ?: nowIso()
                val summary = obj["summary"]?.jsonPrimitive?.contentOrNull ?: ""
                val theme = obj["theme"]?.jsonPrimitive?.contentOrNull
                val keyInsights = (obj["keyInsights"] as? JsonArray)
                    ?.mapNotNull { it.jsonPrimitive.contentOrNull }
                    ?: emptyList()
                SessionSummary(
                    date = date,
                    summary = summary,
                    keyInsights = keyInsights,
                    theme = theme
                )
            }
        } else profile.baseContext.integratedInsights

        val somaticEnabled = payload["somaticEnabled"]?.jsonPrimitive?.booleanOrNull
            ?: profile.baseContext.somaticEnabled

        val identity = payload["identity"]?.jsonObject?.let { obj ->
            TherapyIdentity(
                name = obj["name"]?.jsonPrimitive?.contentOrNull,
                pronouns = obj["pronouns"]?.jsonPrimitive?.contentOrNull,
                ageGroup = obj["ageGroup"]?.jsonPrimitive?.contentOrNull
            )
        } ?: profile.baseContext.identity

        val preferredAgnes = payload["preferredAgnes"]?.jsonObject?.let { obj ->
            TherapistPreference(
                gender = obj["gender"]?.jsonPrimitive?.contentOrNull,
                tone = obj["tone"]?.jsonPrimitive?.contentOrNull,
                traits = (obj["traits"] as? JsonArray)?.mapNotNull { it.jsonPrimitive.contentOrNull } ?: emptyList()
            )
        }
        val preferredTherapist = preferredAgnes
            ?: payload["preferredTherapist"]?.jsonObject?.let { obj ->
                TherapistPreference(
                    gender = obj["gender"]?.jsonPrimitive?.contentOrNull,
                    tone = obj["tone"]?.jsonPrimitive?.contentOrNull,
                    traits = (obj["traits"] as? JsonArray)?.mapNotNull { it.jsonPrimitive.contentOrNull } ?: emptyList()
                )
            }
            ?: profile.baseContext.preferredTherapist

        val updated = profile.copy(
            baseContext = profile.baseContext.copy(
                identity = identity,
                backgroundSummary = backgroundSummary,
                communicationStyle = communicationStyle,
                occupation = occupation,
                typicalSleepHours = typicalSleepHours,
                childhood = childhood,
                struggles = struggles,
                goals = goals,
                trauma = trauma,
                history = history,
                preferredTherapist = preferredTherapist,
                integratedInsights = integratedInsights,
                somaticEnabled = somaticEnabled
            ),
            updatedAt = nowIso()
        )

        saveTherapyProfile(uid, updated, call.encryptionKey)
    }

    private fun normalizeBeliefGraph(payload: JsonObject): BeliefGraph {
        val now = nowIso()
        val seed = Clock.System.now().toEpochMilliseconds().toString()

        val nodes = (payload["nodes"] as? JsonArray)?.mapIndexed { index, raw ->
            val obj = raw as? JsonObject ?: JsonObject(emptyMap())
            val id = obj["id"]?.jsonPrimitive?.contentOrNull ?: "belief_${seed}_$index"
            val label = obj["label"]?.jsonPrimitive?.contentOrNull ?: "Belief ${index + 1}"
            val valenceContent = obj["valence"]?.jsonPrimitive?.contentOrNull
            val valence = when (valenceContent) {
                "positive", "negative" -> valenceContent
                else -> "neutral"
            }
            val intensity = (obj["intensity"]?.jsonPrimitive?.floatOrNull ?: 0.5f).coerceIn(0.0f, 1.0f)

            BeliefNode(id = id, label = label, valence = valence, intensity = intensity)
        } ?: emptyList()

        val edges = (payload["edges"] as? JsonArray)?.mapIndexed { index, raw ->
            val obj = raw as? JsonObject ?: JsonObject(emptyMap())
            val from = obj["from"]?.jsonPrimitive?.contentOrNull ?: "belief_$index"
            val to = obj["to"]?.jsonPrimitive?.contentOrNull ?: "belief_$index"
            val relation = obj["relation"]?.jsonPrimitive?.contentOrNull ?: "related"
            BeliefEdge(from = from, to = to, relation = relation)
        } ?: emptyList()

        val summary = payload["summary"]?.jsonPrimitive?.contentOrNull ?: ""
        val createdAt = payload["createdAt"]?.jsonPrimitive?.contentOrNull ?: now
        val updatedAt = now

        return BeliefGraph(
            nodes = nodes,
            edges = edges,
            summary = summary,
            createdAt = createdAt,
            updatedAt = updatedAt
        )
    }

    private suspend fun handleAgnesUpdateBeliefGraph(call: ActionCall) {
        val uid = call.userId ?: return
        val layer = dataLayer ?: return
        val vault = vaultBoundary ?: return  // vault callbacks carry the real key in their closure
        call.encryptionKey ?: return  // encryption key is required for belief graph persistence

        val next = normalizeBeliefGraph(call.payload)

        // Persist belief graph into the dedicated collection (web parity).
        val graphJson = json.encodeToString(BeliefGraph.serializer(), next)
        // call.encryptionKey is null on JS/web — pass "" as the key string; it is ignored
        // by JsVaultBoundary which uses the CryptoKey from the callback closure instead.
        val encrypted = runCatching { vault.encrypt(graphJson, call.encryptionKey ?: "") }.getOrNull() ?: return

        layer.setDocument(
            "belief_graphs",
            uid,
            mapOf(
                "encryptedData" to encrypted.ciphertext,
                "iv" to encrypted.iv,
                "salt" to "vault_salt_used",
                "metadata" to mapOf(
                    "nodes" to next.nodes.size,
                    "lastActive" to nowIso()
                )
            )
        )

        // Also update profile field so Android UI panels update immediately.
        val profile = loadTherapyProfile(uid, call.encryptionKey)
        saveTherapyProfile(uid, profile.copy(beliefGraph = next, updatedAt = nowIso()), call.encryptionKey)

        // Emit BELIEF_UPDATED so downstream listeners (ViewModel, analytics) react.
        eventBus.emit(
            SpineEventPayload(
                type = "BELIEF_UPDATED",
                source = "agnes",
                domain = "E",
                data = mapOf(
                    "nodeCount" to next.nodes.size,
                    "updatedAt" to nowIso()
                ),
                priority = "info"
            )
        )
    }

    private suspend fun handleAgnesCompleteOnboarding(call: ActionCall) {
        val uid = call.userId ?: return
        val now = nowIso()
        val profile = loadTherapyProfile(uid, call.encryptionKey)
        saveTherapyProfile(uid, profile.copy(onboardingComplete = true, updatedAt = now), call.encryptionKey)
        eventBus.emit(
            SpineEventPayload(
                type = "ONBOARDING_COMPLETED",
                source = "agnes",
                domain = "system",
                data = mapOf("moduleId" to "agnes", "uid" to uid, "timestamp" to now),
                priority = "info"
            )
        )
    }

    // ------------------------- Orchestrator onboarding -------------------------
    private suspend fun handleOrchestratorCompleteOnboarding(call: ActionCall) {
        val uid = call.userId ?: return
        val layer = dataLayer ?: return
        layer.setDocument("orchestrator_profiles", uid, mapOf(
            "onboardingComplete" to true,
            "updatedAt" to nowIso()
        ))
    }

    private fun overlapsRecoveryWindow(scheduledAt: String, duration: Int, windows: List<RecoveryWindow>): Boolean {
        return runCatching {
            val blockStart = Instant.parse(scheduledAt).toEpochMilliseconds()
            val blockEnd = blockStart + duration * 60 * 1000L
            windows.any { window ->
                val wStart = Instant.parse(window.start).toEpochMilliseconds()
                val wEnd = Instant.parse(window.end).toEpochMilliseconds()
                blockStart < wEnd && blockEnd > wStart
            }
        }.getOrDefault(false)
    }

    private suspend fun handleAtlasUpdateEnergyWave(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val waveArray = call.payload["wave"] as? JsonArray ?: return
        val wave = waveArray.mapIndexed { index, element ->
            val obj = element as? JsonObject ?: JsonObject(emptyMap())
            EnergyWavePoint(
                id = obj["id"]?.jsonPrimitive?.content ?: "wave_${Clock.System.now().toEpochMilliseconds()}_$index",
                slot = obj["slot"]?.jsonPrimitive?.content ?: "Slot ${index + 1}",
                energy = parseBoundedScore(obj["energy"]).toDouble(),
                focus = parseBoundedScore(obj["focus"]).toDouble(),
                load = parseBoundedScore(obj["load"]).toDouble()
            )
        }.take(48)
        if (wave.isEmpty()) return
        saveAtlasProfile(uid, profile.copy(energyWave = wave), call.encryptionKey)
        val energyBudget = call.payload["energyBudget"]?.jsonPrimitive?.doubleOrNull
        val focusScore = call.payload["focusScore"]?.jsonPrimitive?.doubleOrNull
        val activeLoad = call.payload["activeLoad"]?.jsonPrimitive?.doubleOrNull
        val patch = mutableMapOf<String, Any?>()
        energyBudget?.let { patch["cognitive.energyBudget"] = it }
        focusScore?.let { patch["cognitive.focusScore"] = it }
        activeLoad?.let { patch["cognitive.activeLoad"] = it }
        if (patch.isNotEmpty()) nsvService.updateNsv(patch)
    }

    private suspend fun handleAtlasFlattenSchedule(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val flattenedUntil = call.payload["flattenedUntil"]?.jsonPrimitive?.content ?: nowIso()
        saveAtlasProfile(uid, profile.copy(flattenedUntil = flattenedUntil), call.encryptionKey)
        call.payload["activeLoad"]?.jsonPrimitive?.doubleOrNull?.let {
            nsvService.updateNsv(mapOf("cognitive.activeLoad" to it))
        }
    }

    private suspend fun handleAtlasCreateRecoveryWindow(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val window = RecoveryWindow(
            id = call.payload["id"]?.jsonPrimitive?.content ?: "recovery_${Clock.System.now().toEpochMilliseconds()}",
            title = call.payload["title"]?.jsonPrimitive?.content ?: "Recovery Window",
            start = call.payload["start"]?.jsonPrimitive?.content ?: nowIso(),
            end = call.payload["end"]?.jsonPrimitive?.content ?: nowIso(),
            reason = call.payload["reason"]?.jsonPrimitive?.content ?: "Recovery allocation",
            status = call.payload["status"]?.jsonPrimitive?.content ?: "planned"
        )
        val updated = listOf(window) + profile.recoveryWindows
        saveAtlasProfile(uid, profile.copy(recoveryWindows = updated.take(80)), call.encryptionKey)
    }

    private suspend fun handleAtlasUpdateTaskGraph(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val tasksArray = call.payload["tasks"] as? JsonArray ?: return
        val graph = tasksArray.mapIndexed { index, element ->
            val obj = element as? JsonObject ?: JsonObject(emptyMap())
            AtlasTaskNode(
                id = obj["id"]?.jsonPrimitive?.content ?: "task_${Clock.System.now().toEpochMilliseconds()}_$index",
                title = obj["title"]?.jsonPrimitive?.content ?: "Task ${index + 1}",
                energyCost = parseBoundedScore(obj["energyCost"], 4),
                status = normalizeTaskGraphStatus(obj["status"]?.jsonPrimitive?.content),
                dependencies = (obj["dependencies"] as? JsonArray)?.mapNotNull { it.jsonPrimitive.contentOrNull }
            )
        }.take(100)
        if (graph.isEmpty()) return
        saveAtlasProfile(uid, profile.copy(taskGraph = graph), call.encryptionKey)
        call.payload["activeLoad"]?.jsonPrimitive?.doubleOrNull?.let {
            nsvService.updateNsv(mapOf("cognitive.activeLoad" to it))
        }
    }

    private suspend fun handleAtlasCreateTask(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        if (profile.tasks.size >= 500) return
        val now = nowIso()
        val priority = call.payload["priority"]?.jsonPrimitive?.intOrNull?.coerceIn(1, 5) ?: 3
        val task = AtlasTask(
            id = "task_${Clock.System.now().toEpochMilliseconds()}",
            title = call.payload["title"]?.jsonPrimitive?.content ?: "Untitled Task",
            description = call.payload["description"]?.jsonPrimitive?.content,
            deadline = call.payload["deadline"]?.jsonPrimitive?.content,
            priority = priority,
            energyCost = parseBoundedScore(call.payload["energyCost"], 4),
            status = normalizeTaskStatus(call.payload["status"]?.jsonPrimitive?.content, "queued"),
            dependencies = (call.payload["dependencies"] as? JsonArray)?.mapNotNull { it.jsonPrimitive.contentOrNull } ?: emptyList(),
            projectId = call.payload["projectId"]?.jsonPrimitive?.content,
            goalId = call.payload["goalId"]?.jsonPrimitive?.content,
            notes = call.payload["notes"]?.jsonPrimitive?.content,
            tags = (call.payload["tags"] as? JsonArray)?.mapNotNull { it.jsonPrimitive.contentOrNull },
            recurrenceRule = call.payload["recurrenceRule"]?.jsonPrimitive?.content,
            createdAt = now,
            updatedAt = now
        )
        saveAtlasProfile(uid, profile.copy(tasks = profile.tasks + task), call.encryptionKey)
        eventBus.emit(SpineEventPayload(
            type = "ATLAS_TASK_CREATED",
            source = "atlas",
            domain = "C",
            data = mapOf("taskId" to task.id, "title" to task.title, "priority" to task.priority),
            priority = "info"
        ))
    }

    private suspend fun handleAtlasUpdateTask(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val taskId = call.payload["id"]?.jsonPrimitive?.content ?: return
        val now = nowIso()
        val updated = profile.tasks.map { task ->
            if (task.id != taskId) task else task.copy(
                title = call.payload["title"]?.jsonPrimitive?.content ?: task.title,
                description = call.payload["description"]?.jsonPrimitive?.content ?: task.description,
                deadline = call.payload["deadline"]?.jsonPrimitive?.content ?: task.deadline,
                priority = call.payload["priority"]?.jsonPrimitive?.intOrNull?.coerceIn(1, 5) ?: task.priority,
                energyCost = call.payload["energyCost"]?.jsonPrimitive?.intOrNull ?: task.energyCost,
                status = normalizeTaskStatus(call.payload["status"]?.jsonPrimitive?.content, task.status),
                notes = call.payload["notes"]?.jsonPrimitive?.content ?: task.notes,
                updatedAt = now
            )
        }
        saveAtlasProfile(uid, profile.copy(tasks = updated), call.encryptionKey)
    }

    private suspend fun handleAtlasCompleteTask(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val taskId = call.payload["id"]?.jsonPrimitive?.content ?: return
        val now = nowIso()
        val updated = profile.tasks.map { task ->
            if (task.id != taskId) task else task.copy(status = "done", completedAt = now, updatedAt = now)
        }
        saveAtlasProfile(uid, profile.copy(tasks = updated), call.encryptionKey)
        eventBus.emit(SpineEventPayload(
            type = "ATLAS_TASK_COMPLETED",
            source = "atlas",
            domain = "C",
            data = mapOf("taskId" to taskId, "completedAt" to now),
            priority = "info"
        ))
    }

    private suspend fun handleAtlasDeleteTask(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val taskId = call.payload["id"]?.jsonPrimitive?.content ?: return
        val updated = profile.tasks.filterNot { it.id == taskId }
        saveAtlasProfile(uid, profile.copy(tasks = updated), call.encryptionKey)
    }

    private suspend fun handleAtlasCreateHabit(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val now = nowIso()
        val habit = AtlasHabit(
            id = "habit_${Clock.System.now().toEpochMilliseconds()}",
            title = call.payload["title"]?.jsonPrimitive?.content ?: "Habit",
            frequency = call.payload["frequency"]?.jsonPrimitive?.content ?: "daily",
            targetStreak = call.payload["targetStreak"]?.jsonPrimitive?.intOrNull ?: 7,
            energyCost = parseBoundedScore(call.payload["energyCost"], 3),
            minimumViableVersion = call.payload["minimumViableVersion"]?.jsonPrimitive?.content ?: "",
            status = call.payload["status"]?.jsonPrimitive?.content ?: "active",
            createdAt = now,
            updatedAt = now
        )
        saveAtlasProfile(uid, profile.copy(habits = profile.habits + habit), call.encryptionKey)
    }

    private suspend fun handleAtlasUpdateHabit(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val habitId = call.payload["id"]?.jsonPrimitive?.content ?: return
        val now = nowIso()
        val updated = profile.habits.map { habit ->
            if (habit.id != habitId) habit else habit.copy(
                title = call.payload["title"]?.jsonPrimitive?.content ?: habit.title,
                frequency = call.payload["frequency"]?.jsonPrimitive?.content ?: habit.frequency,
                targetStreak = call.payload["targetStreak"]?.jsonPrimitive?.intOrNull ?: habit.targetStreak,
                status = call.payload["status"]?.jsonPrimitive?.content ?: habit.status,
                updatedAt = now
            )
        }
        saveAtlasProfile(uid, profile.copy(habits = updated), call.encryptionKey)
    }

    private suspend fun handleAtlasUpdateHabitStreak(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val habitId = call.payload["id"]?.jsonPrimitive?.content ?: return
        val now = nowIso()
        val updated = profile.habits.map { habit ->
            if (habit.id != habitId) habit else habit.copy(
                currentStreak = call.payload["currentStreak"]?.jsonPrimitive?.intOrNull ?: (habit.currentStreak + 1),
                bestStreak = call.payload["bestStreak"]?.jsonPrimitive?.intOrNull ?: habit.bestStreak,
                lastCompleted = call.payload["lastCompleted"]?.jsonPrimitive?.content ?: now,
                updatedAt = now
            )
        }
        saveAtlasProfile(uid, profile.copy(habits = updated), call.encryptionKey)
    }

    private suspend fun handleAtlasPauseHabit(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val habitId = call.payload["id"]?.jsonPrimitive?.content ?: return
        val now = nowIso()
        val updated = profile.habits.map { habit ->
            if (habit.id != habitId) habit else habit.copy(
                status = "paused",
                pauseReason = call.payload["pauseReason"]?.jsonPrimitive?.content,
                pausedAt = now,
                resumeDate = call.payload["resumeDate"]?.jsonPrimitive?.content,
                updatedAt = now
            )
        }
        saveAtlasProfile(uid, profile.copy(habits = updated), call.encryptionKey)
    }

    private suspend fun handleAtlasDeleteHabit(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val habitId = call.payload["id"]?.jsonPrimitive?.content ?: return
        val updated = profile.habits.filterNot { it.id == habitId }
        saveAtlasProfile(uid, profile.copy(habits = updated), call.encryptionKey)
    }

    private suspend fun handleAtlasCreateGoal(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val now = nowIso()
        val goal = AtlasGoal(
            id = "goal_${Clock.System.now().toEpochMilliseconds()}",
            title = call.payload["title"]?.jsonPrimitive?.content ?: "Goal",
            description = call.payload["description"]?.jsonPrimitive?.content,
            deadline = call.payload["deadline"]?.jsonPrimitive?.content,
            successCriteria = call.payload["successCriteria"]?.jsonPrimitive?.content ?: "",
            progressPercent = call.payload["progressPercent"]?.jsonPrimitive?.doubleOrNull?.toFloat() ?: 0f,
            status = call.payload["status"]?.jsonPrimitive?.content ?: "active",
            createdAt = now,
            updatedAt = now
        )
        saveAtlasProfile(uid, profile.copy(goals = profile.goals + goal), call.encryptionKey)
    }

    private suspend fun handleAtlasUpdateGoal(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val goalId = call.payload["id"]?.jsonPrimitive?.content ?: return
        val now = nowIso()
        val updated = profile.goals.map { goal ->
            if (goal.id != goalId) goal else goal.copy(
                title = call.payload["title"]?.jsonPrimitive?.content ?: goal.title,
                description = call.payload["description"]?.jsonPrimitive?.content ?: goal.description,
                deadline = call.payload["deadline"]?.jsonPrimitive?.content ?: goal.deadline,
                progressPercent = call.payload["progressPercent"]?.jsonPrimitive?.doubleOrNull?.toFloat() ?: goal.progressPercent,
                status = call.payload["status"]?.jsonPrimitive?.content ?: goal.status,
                updatedAt = now
            )
        }
        saveAtlasProfile(uid, profile.copy(goals = updated), call.encryptionKey)
        eventBus.emit(SpineEventPayload(
            type = "ATLAS_GOAL_UPDATED",
            source = "atlas",
            domain = "C",
            data = mapOf("goalId" to goalId, "action" to "update_goal"),
            priority = "info"
        ))
    }

    private suspend fun handleAtlasUpdateGoalProgress(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val goalId = call.payload["id"]?.jsonPrimitive?.content ?: return
        val now = nowIso()
        val progress = call.payload["progressPercent"]?.jsonPrimitive?.doubleOrNull?.toFloat() ?: return
        val updated = profile.goals.map { goal ->
            if (goal.id != goalId) goal else goal.copy(progressPercent = progress, updatedAt = now)
        }
        saveAtlasProfile(uid, profile.copy(goals = updated), call.encryptionKey)
        eventBus.emit(SpineEventPayload(
            type = "ATLAS_GOAL_UPDATED",
            source = "atlas",
            domain = "C",
            data = mapOf("goalId" to goalId, "progressPercent" to progress, "action" to "update_goal_progress"),
            priority = "info"
        ))
    }

    private suspend fun handleAtlasDeleteGoal(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val goalId = call.payload["id"]?.jsonPrimitive?.content ?: return
        val updated = profile.goals.filterNot { it.id == goalId }
        saveAtlasProfile(uid, profile.copy(goals = updated), call.encryptionKey)
    }

    private suspend fun handleAtlasDailyPlan(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val date = call.payload["date"]?.jsonPrimitive?.content ?: nowIso().take(10)
        val blocks = call.payload["blocks"] as? JsonArray ?: return
        if (blocks.isEmpty()) return
        val now = nowIso()
        val newScheduled = blocks.mapNotNull { element ->
            val obj = element as? JsonObject ?: return@mapNotNull null
            val time = obj["time"]?.jsonPrimitive?.content ?: now
            val scheduledAt = if (time.contains("T")) time else "${date}T$time"
            val duration = obj["duration"]?.jsonPrimitive?.intOrNull ?: 60
            if (overlapsRecoveryWindow(scheduledAt, duration, profile.recoveryWindows)) return@mapNotNull null
            ScheduledTask(
                id = "sched_${Clock.System.now().toEpochMilliseconds()}",
                title = obj["title"]?.jsonPrimitive?.content ?: "Planned Block",
                energyCost = parseBoundedScore(obj["energyLevel"]),
                focusCost = parseBoundedScore(obj["focusCost"]),
                scheduledAt = scheduledAt,
                duration = duration,
                category = obj["type"]?.jsonPrimitive?.content ?: "other",
                status = "scheduled",
                dependencies = obj["taskId"]?.jsonPrimitive?.content?.let { listOf(it) },
                blockedBy = null,
                createdAt = now
            )
        }
        val updatedTasks = profile.scheduledTasks.filterNot { it.scheduledAt.startsWith(date) } + newScheduled
        val intention = DailyIntention(
            id = "intention_${Clock.System.now().toEpochMilliseconds()}",
            date = date,
            theme = call.payload["theme"]?.jsonPrimitive?.content ?: "Focused Work",
            focusDomain = call.payload["focusDomain"]?.jsonPrimitive?.content ?: "general",
            energyTarget = parseBoundedScore(call.payload["energyTarget"], 7),
            createdAt = now
        )
        val intentions = profile.dailyIntentions.filterNot { it.date == date } + intention
        saveAtlasProfile(uid, profile.copy(scheduledTasks = updatedTasks, dailyIntentions = intentions), call.encryptionKey)
        val planningLoad = ((updatedTasks.count { it.status == "scheduled" } / 20.0) * 10).toInt().coerceIn(0, 10)
        nsvService.updateNsv(mapOf("cognitive.planningLoad" to planningLoad))
    }

    private suspend fun handleAtlasTemporalReview(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val now = nowIso()
        val habitSummary = (call.payload["habitSummary"] as? JsonArray)?.map { item ->
            val obj = item as? JsonObject ?: JsonObject(emptyMap())
            HabitWeekSummary(
                habitId = obj["habitId"]?.jsonPrimitive?.content ?: "",
                habitTitle = obj["habitTitle"]?.jsonPrimitive?.content ?: "",
                streak = obj["streak"]?.jsonPrimitive?.intOrNull ?: 0,
                completions = obj["completions"]?.jsonPrimitive?.intOrNull ?: 0,
                status = obj["status"]?.jsonPrimitive?.content ?: "active"
            )
        } ?: emptyList()
        val goalProgress = (call.payload["goalProgress"] as? JsonArray)?.map { item ->
            val obj = item as? JsonObject ?: JsonObject(emptyMap())
            GoalWeekProgress(
                goalId = obj["goalId"]?.jsonPrimitive?.content ?: "",
                goalTitle = obj["goalTitle"]?.jsonPrimitive?.content ?: "",
                progressPercent = obj["progressPercent"]?.jsonPrimitive?.intOrNull ?: 0,
                milestonesCompleted = obj["milestonesCompleted"]?.jsonPrimitive?.intOrNull ?: 0,
                milestonesTotal = obj["milestonesTotal"]?.jsonPrimitive?.intOrNull ?: 0
            )
        } ?: emptyList()
        val review = TemporalReview(
            id = "review_${Clock.System.now().toEpochMilliseconds()}",
            scope = call.payload["scope"]?.jsonPrimitive?.content ?: "weekly",
            periodStart = call.payload["periodStart"]?.jsonPrimitive?.content ?: now,
            periodEnd = call.payload["periodEnd"]?.jsonPrimitive?.content ?: now,
            completionRate = call.payload["completionRate"]?.jsonPrimitive?.intOrNull ?: 0,
            totalScheduled = call.payload["totalScheduled"]?.jsonPrimitive?.intOrNull ?: 0,
            totalCompleted = call.payload["totalCompleted"]?.jsonPrimitive?.intOrNull ?: 0,
            habitSummary = habitSummary,
            goalProgress = goalProgress,
            insights = (call.payload["insights"] as? JsonArray)?.mapNotNull { it.jsonPrimitive.contentOrNull } ?: emptyList(),
            driftScore = call.payload["driftScore"]?.jsonPrimitive?.intOrNull,
            nextPeriodFocus = call.payload["nextPeriodFocus"]?.jsonPrimitive?.content ?: "",
            notes = call.payload["notes"]?.jsonPrimitive?.content,
            createdAt = now
        )
        val trimmed = if (profile.reviews.size >= 52) profile.reviews.takeLast(51) else profile.reviews
        saveAtlasProfile(uid, profile.copy(reviews = trimmed + review), call.encryptionKey)
        eventBus.emit(
            SpineEventPayload(
                type = "TEMPORAL_REVIEW_COMPLETE",
                source = "atlas",
                domain = "C",
                data = mapOf(
                    "reviewId" to review.id,
                    "scope" to review.scope,
                    "periodStart" to review.periodStart,
                    "completionRate" to review.completionRate,
                    "totalCompleted" to review.totalCompleted,
                    "moduleId" to "atlas",
                    "route" to "atlas",
                    "focusId" to "review:${review.id}",
                    "title" to "Atlas weekly review completed",
                    "note" to "Weekly review results are ready in Atlas insights."
                ),
                priority = "info"
            )
        )
    }

    private suspend fun handleAtlasScheduleBlock(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val now = nowIso()
        val scheduledAt = call.payload["scheduledAt"]?.jsonPrimitive?.content ?: now
        val duration = call.payload["duration"]?.jsonPrimitive?.intOrNull ?: 60
        if (overlapsRecoveryWindow(scheduledAt, duration, profile.recoveryWindows)) return
        val entry = ScheduledTask(
            id = "sched_${Clock.System.now().toEpochMilliseconds()}",
            title = call.payload["title"]?.jsonPrimitive?.content ?: "Scheduled Block",
            energyCost = parseBoundedScore(call.payload["energyCost"]),
            focusCost = parseBoundedScore(call.payload["focusCost"]),
            scheduledAt = scheduledAt,
            duration = duration,
            category = call.payload["category"]?.jsonPrimitive?.content ?: "other",
            status = "scheduled",
            blockedBy = null,
            createdAt = now
        )
        val updated = profile.scheduledTasks + entry
        saveAtlasProfile(uid, profile.copy(scheduledTasks = updated), call.encryptionKey)
    }

    private suspend fun handleAtlasSetDailyIntention(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val date = call.payload["date"]?.jsonPrimitive?.content ?: nowIso().take(10)
        val now = nowIso()
        val intention = DailyIntention(
            id = "intention_${Clock.System.now().toEpochMilliseconds()}",
            date = date,
            theme = call.payload["theme"]?.jsonPrimitive?.content ?: "Focused Work",
            focusDomain = call.payload["focusDomain"]?.jsonPrimitive?.content ?: "general",
            energyTarget = parseBoundedScore(call.payload["energyTarget"], 7),
            createdAt = now
        )
        val updated = profile.dailyIntentions.filterNot { it.date == date } + intention
        saveAtlasProfile(uid, profile.copy(dailyIntentions = updated), call.encryptionKey)
    }

    private suspend fun handleAtlasUpdateDailyIntention(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val date = call.payload["date"]?.jsonPrimitive?.content ?: nowIso().take(10)
        val now = nowIso()
        val updated = profile.dailyIntentions.map { intention ->
            if (intention.date != date) intention else intention.copy(
                theme = call.payload["theme"]?.jsonPrimitive?.content ?: intention.theme,
                focusDomain = call.payload["focusDomain"]?.jsonPrimitive?.content ?: intention.focusDomain,
                energyTarget = parseBoundedScore(call.payload["energyTarget"], intention.energyTarget)
            )
        }
        saveAtlasProfile(uid, profile.copy(dailyIntentions = updated, updatedAt = now), call.encryptionKey)
    }

    private suspend fun handleAtlasDeferTask(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val taskId = call.payload["id"]?.jsonPrimitive?.content ?: return
        val now = nowIso()
        val updated = profile.tasks.map { task ->
            if (task.id != taskId) task else task.copy(
                status = "deferred",
                deferCount = task.deferCount + 1,
                updatedAt = now
            )
        }
        saveAtlasProfile(uid, profile.copy(tasks = updated, updatedAt = now), call.encryptionKey)
        eventBus.emit(SpineEventPayload(
            type = "ATLAS_TASK_BLOCKED",
            source = "atlas",
            domain = "C",
            data = mapOf("taskId" to taskId, "reason" to "deferred"),
            priority = "info"
        ))
    }

    private suspend fun handleAtlasMoveTask(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val taskId = call.payload["id"]?.jsonPrimitive?.content ?: return
        val targetProjectId = call.payload["projectId"]?.jsonPrimitive?.content
        val targetGoalId = call.payload["goalId"]?.jsonPrimitive?.content
        val now = nowIso()
        val updated = profile.tasks.map { task ->
            if (task.id != taskId) task else task.copy(
                projectId = targetProjectId ?: task.projectId,
                goalId = targetGoalId ?: task.goalId,
                updatedAt = now
            )
        }
        saveAtlasProfile(uid, profile.copy(tasks = updated, updatedAt = now), call.encryptionKey)
    }

    private suspend fun handleAtlasResumeHabit(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val habitId = call.payload["id"]?.jsonPrimitive?.content ?: return
        val now = nowIso()
        val updated = profile.habits.map { habit ->
            if (habit.id != habitId) habit else habit.copy(
                status = "active",
                pauseReason = null,
                pausedAt = null,
                resumeDate = null,
                updatedAt = now
            )
        }
        saveAtlasProfile(uid, profile.copy(habits = updated, updatedAt = now), call.encryptionKey)
    }

    private suspend fun handleAtlasCreateProject(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        if (profile.projects.size >= 200) return
        val now = nowIso()
        val project = AtlasProject(
            id = "project_${Clock.System.now().toEpochMilliseconds()}",
            title = call.payload["title"]?.jsonPrimitive?.content ?: "Untitled Project",
            description = call.payload["description"]?.jsonPrimitive?.content,
            status = call.payload["status"]?.jsonPrimitive?.content ?: "active",
            goalId = call.payload["goalId"]?.jsonPrimitive?.content,
            deadline = call.payload["deadline"]?.jsonPrimitive?.content,
            notes = call.payload["notes"]?.jsonPrimitive?.content,
            tags = (call.payload["tags"] as? JsonArray)?.mapNotNull { it.jsonPrimitive.contentOrNull },
            createdAt = now,
            updatedAt = now
        )
        saveAtlasProfile(uid, profile.copy(projects = profile.projects + project, updatedAt = now), call.encryptionKey)
        eventBus.emit(SpineEventPayload(
            type = "ATLAS_GOAL_MILESTONE",
            source = "atlas",
            domain = "C",
            data = mapOf("projectId" to project.id, "title" to project.title, "action" to "create_project"),
            priority = "info"
        ))
    }

    private suspend fun handleAtlasScheduleEnergyWave(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val now = nowIso()
        val slot = call.payload["slot"]?.jsonPrimitive?.content ?: now
        val energy = call.payload["energy"]?.jsonPrimitive?.doubleOrNull ?: 7.0
        val focus = call.payload["focus"]?.jsonPrimitive?.doubleOrNull ?: 7.0
        val load = call.payload["load"]?.jsonPrimitive?.doubleOrNull ?: 5.0
        val wave = EnergyWavePoint(
            id = "wave_${Clock.System.now().toEpochMilliseconds()}",
            slot = slot,
            energy = energy.coerceIn(0.0, 10.0),
            focus = focus.coerceIn(0.0, 10.0),
            load = load.coerceIn(0.0, 10.0)
        )
        val updatedWave = (profile.energyWave + wave).takeLast(200)
        saveAtlasProfile(uid, profile.copy(energyWave = updatedWave, updatedAt = now), call.encryptionKey)
        eventBus.emit(SpineEventPayload(
            type = "ATLAS_ENERGY_UPDATED",
            source = "atlas",
            domain = "C",
            data = mapOf("slot" to slot, "energy" to energy, "focus" to focus, "load" to load),
            priority = "info"
        ))
        if (load >= 8.0) {
            eventBus.emit(SpineEventPayload(
                type = "ATLAS_ENERGY_OVERLOAD",
                source = "atlas",
                domain = "C",
                data = mapOf("slot" to slot, "load" to load),
                priority = "alert"
            ))
        }
    }

    private suspend fun handleAtlasLogRecoveryCheckin(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val now = nowIso()
        val date = call.payload["date"]?.jsonPrimitive?.content ?: now.take(10)
        val tasksCompleted = call.payload["tasksCompleted"]?.jsonPrimitive?.intOrNull ?: 0
        val totalTasks = call.payload["totalTasks"]?.jsonPrimitive?.intOrNull ?: 0
        val energyLevel = call.payload["energyLevel"]?.jsonPrimitive?.intOrNull ?: 5
        val blockers = call.payload["blockers"]?.jsonPrimitive?.content ?: ""
        val entry = DailyCheckInEntry(
            date = date,
            tasksCompleted = tasksCompleted,
            totalTasks = totalTasks,
            energyLevel = energyLevel,
            blockers = blockers,
            loggedAt = now
        )
        val checkIns = (profile.dailyCheckIns + entry).takeLast(90)
        saveAtlasProfile(uid, profile.copy(dailyCheckIns = checkIns, updatedAt = now), call.encryptionKey)
        nsvService.updateNsv(mapOf("cognitive.planningLoad" to energyLevel.toDouble()))
        eventBus.emit(SpineEventPayload(
            type = "ATLAS_RECOVERY_WINDOW_CREATED",
            source = "atlas",
            domain = "C",
            data = mapOf("date" to date, "energyLevel" to energyLevel, "tasksCompleted" to tasksCompleted),
            priority = "info"
        ))
    }

    private suspend fun handleAtlasLogHabitMetric(call: ActionCall) {
        val uid = call.userId ?: return
        val profile = loadAtlasProfile(uid, call.encryptionKey)
        val habitId = call.payload["habitId"]?.jsonPrimitive?.content ?: return
        val metricValue = call.payload["value"]?.jsonPrimitive?.intOrNull ?: 1
        val now = nowIso()
        val logEntry = HabitLogEntry(
            date = call.payload["date"]?.jsonPrimitive?.content ?: now.take(10),
            value = metricValue.toString(),
            notes = call.payload["notes"]?.jsonPrimitive?.content
        )
        val updated = profile.habits.map { habit ->
            if (habit.id != habitId) habit else habit.copy(
                metricValue = metricValue,
                logs = ((habit.logs ?: emptyList()) + logEntry).takeLast(365),
                updatedAt = now
            )
        }
        saveAtlasProfile(uid, profile.copy(habits = updated, updatedAt = now), call.encryptionKey)
        eventBus.emit(SpineEventPayload(
            type = "ATLAS_HABIT_MILESTONE",
            source = "atlas",
            domain = "C",
            data = mapOf("habitId" to habitId, "value" to metricValue, "timestamp" to now),
            priority = "info"
        ))
    }

    private suspend fun handleAtlasLogSleep(call: ActionCall) {
        val uid = call.userId ?: return
        val now = nowIso()
        val sleepHours = call.payload["hours"]?.jsonPrimitive?.doubleOrNull?.coerceIn(0.0, 24.0) ?: 7.0
        val quality = call.payload["quality"]?.jsonPrimitive?.intOrNull?.coerceIn(0, 10) ?: 7
        val date = call.payload["date"]?.jsonPrimitive?.content ?: now.take(10)
        val entry = SleepEntry(
            id = "atlas-sleep-${Clock.System.now().toEpochMilliseconds()}",
            date = date,
            durationHours = sleepHours,
            quality = quality,
            notes = call.payload["notes"]?.jsonPrimitive?.content,
            recordedAt = now
        )
        val trainerProfile = loadTrainerProfile(uid, call.encryptionKey)
        val updatedLog = listOf(entry) + (trainerProfile.sleepLog ?: emptyList()).take(729)
        saveTrainerProfile(uid, trainerProfile.copy(sleepLog = updatedLog, updatedAt = now), call.encryptionKey)
        nsvService.updateNsv(mapOf("cognitive.planningLoad" to (10.0 - sleepHours.coerceIn(0.0, 10.0))))
    }

    private suspend fun handleLedgerSetFieldValue(call: ActionCall) {
        val fieldId = call.payload["fieldId"]?.jsonPrimitive?.content
            ?: call.payload["id"]?.jsonPrimitive?.content
            ?: return
        val value = call.payload["value"] ?: return

        val extensions = SchemaRegistry.getExtensions("ledger")
        val field = extensions.firstOrNull { it.id == fieldId } ?: return

        val validation = validationRouter.validateValueUpdate(
            FieldValueValidationRequest(
                moduleId = "ledger",
                definition = field,
                fieldId = fieldId,
                targetPath = "profile.$fieldId",
                value = value,
                context = FieldValidationContext()
            )
        )
        if (!validation.isValid) return

        eventBus.emit(
            SpineEventPayload(
                type = "FIELD_VALUE_UPDATED",
                source = "ledger",
                domain = "R",
                data = mapOf(
                    "moduleId" to "ledger",
                    "fieldId" to fieldId,
                    "fieldName" to field.name,
                    "value" to value.toAny()
                ),
                priority = "info"
            )
        )
    }

    private fun frictionTier(score: Double): String {
        return when {
            score <= 2.0 -> "low"
            score <= 5.0 -> "moderate"
            score <= 7.0 -> "elevated"
            else -> "critical"
        }
    }

    private suspend fun updateExtensionFieldValue(
        uid: String,
        moduleId: String,
        fieldId: String,
        value: JsonElement,
        encryptionKey: String?
    ) {
        val layer = dataLayer ?: return
        val storePath = "extension_field_values/$uid/modules"
        val doc = layer.getDocument(storePath, moduleId) { Json.parseToJsonElement(it).jsonObject }
        val plain = (doc?.get("plainValues") as? JsonObject)?.toMap()?.toMutableMap() ?: mutableMapOf()
        plain[fieldId] = value.toAny()

        val payload = mutableMapOf<String, Any?>(
            "moduleId" to moduleId,
            "lastModified" to nowIso(),
            "plainValues" to plain
        )

        val existingEncrypted = (doc?.get("encryptedValues") as? JsonObject)?.toMap()
        if (encryptionKey != null && vaultBoundary != null) {
            val jsonPayload = json.encodeToString(JsonObject.serializer(), mapToJsonObject(plain))
            val encrypted = vaultBoundary.encrypt(jsonPayload, encryptionKey)
            payload["encryptedValues"] = mapOf(
                "ciphertext" to encrypted.ciphertext,
                "iv" to encrypted.iv
            )
        } else if (existingEncrypted != null) {
            payload["encryptedValues"] = existingEncrypted
        }

        layer.setDocument(storePath, moduleId, payload)
    }

    private suspend fun removeExtensionFieldValue(
        uid: String,
        moduleId: String,
        fieldId: String,
        encryptionKey: String?
    ) {
        val layer = dataLayer ?: return
        val storePath = "extension_field_values/$uid/modules"
        val doc = layer.getDocument(storePath, moduleId) { Json.parseToJsonElement(it).jsonObject }
        val plain = (doc?.get("plainValues") as? JsonObject)?.toMap()?.toMutableMap() ?: mutableMapOf()
        if (!plain.containsKey(fieldId) && doc?.get("encryptedValues") == null) return
        plain.remove(fieldId)

        val payload = mutableMapOf<String, Any?>(
            "moduleId" to moduleId,
            "lastModified" to nowIso(),
            "plainValues" to plain
        )

        val encryptedObj = doc?.get("encryptedValues") as? JsonObject
        if (encryptionKey != null && vaultBoundary != null && encryptedObj != null) {
            val vault = vaultBoundary
            val ciphertext = encryptedObj["ciphertext"]?.jsonPrimitive?.contentOrNull
            val iv = encryptedObj["iv"]?.jsonPrimitive?.contentOrNull
            if (ciphertext != null && iv != null) {
                val decrypted = runCatching {
                    vault.decrypt(
                        com.agnes.nexus.core.domain.models.EncryptedEnvelope(ciphertext = ciphertext, iv = iv),
                        encryptionKey
                    )
                }.getOrNull()
                if (decrypted != null) {
                    val decryptedJson = Json.parseToJsonElement(decrypted).jsonObject
                    val decryptedMap = decryptedJson.toMap().toMutableMap()
                    decryptedMap.remove(fieldId)
                    val jsonPayload = json.encodeToString(JsonObject.serializer(), mapToJsonObject(decryptedMap))
                    val encrypted = vault.encrypt(jsonPayload, encryptionKey)
                    payload["encryptedValues"] = mapOf(
                        "ciphertext" to encrypted.ciphertext,
                        "iv" to encrypted.iv
                    )
                } else {
                    payload["encryptedValues"] = encryptedObj.toMap()
                }
            }
        } else if (encryptedObj != null) {
            payload["encryptedValues"] = encryptedObj.toMap()
        }

        layer.setDocument(storePath, moduleId, payload)
    }

    private fun mapToJsonObject(map: Map<String, Any?>): JsonObject {
        return buildJsonObject {
            map.forEach { (key, value) ->
                put(key, toJsonElement(value))
            }
        }
    }

    private fun toJsonElement(value: Any?): JsonElement {
        return when (value) {
            null -> JsonNull
            is Boolean -> JsonPrimitive(value)
            is Number -> JsonPrimitive(value)
            is String -> JsonPrimitive(value)
            is Map<*, *> -> mapToJsonObject(value as Map<String, Any?>)
            is List<*> -> buildJsonArray { value.forEach { add(toJsonElement(it)) } }
            is JsonElement -> value
            else -> JsonPrimitive(value.toString())
        }
    }

    private data class ReadinessResult(
        val score: Int,
        val breakdown: Map<String, Int>,
        val level: String,
        val recommendations: List<String>
    )

    private fun computeReadinessScore(
        restingHeartRate: Double?,
        sleepQuality: Double?,
        energyLevel: Double?,
        stressPhysical: Double?
    ): ReadinessResult {
        val vitals = restingHeartRate?.let { (100 - kotlin.math.abs(it - 60) * 2).coerceIn(0.0, 100.0) } ?: 50.0
        val sleep = sleepQuality?.let { (it * 10).coerceIn(0.0, 100.0) } ?: 50.0
        val energy = energyLevel?.let { (it * 10).coerceIn(0.0, 100.0) } ?: 50.0
        val stress = stressPhysical?.let { ((10 - it) * 10).coerceIn(0.0, 100.0) } ?: 50.0
        val score = (vitals * 0.40 + sleep * 0.30 + energy * 0.20 + stress * 0.10).toInt().coerceIn(0, 100)
        val level = when {
            score >= 80 -> "optimal"
            score >= 60 -> "good"
            score >= 40 -> "fair"
            else -> "poor"
        }
        val recommendations = mutableListOf<String>()
        if (vitals < 60) {
            recommendations.add("Elevated resting heart rate detected — consider light aerobic recovery and stress management.")
        }
        if (sleep < 60) {
            recommendations.add("Sleep quality is below target — aim for 7–9 hours of uninterrupted sleep and consistent bed/wake times.")
        }
        if (energy < 60) {
            recommendations.add("Low energy level — review nutrition, hydration, and training volume for potential over-reaching.")
        }
        if (stressPhysical != null && stressPhysical >= 7 && recommendations.size < 3) {
            recommendations.add("High physical stress reported — prioritise recovery modalities (foam rolling, stretching, sleep).")
        }
        return ReadinessResult(
            score = score,
            breakdown = mapOf(
                "vitals" to vitals.toInt(),
                "sleep" to sleep.toInt(),
                "energy" to energy.toInt(),
                "stress" to stress.toInt()
            ),
            level = level,
            recommendations = recommendations.take(3)
        )
    }

    /**
     * Helper to bridge the gap between "Action" (LLM) and "UI" (Android Activity).
     * Since we can't easily pass objects to Android deep links, we use a "pending focus"
     * flag in settings. The ModuleUiController picks this up on next init.
     */
    private suspend fun handleSomaClearance(
        call: ActionCall,
        status: String,
        secondaryEvent: String? = null,
        extraData: Map<String, Any?> = emptyMap()
    ) {
        val activity = call.payload["activity"]?.jsonPrimitive?.content?.trim().orEmpty()
        if (activity.isBlank()) return
        val reason = call.payload["reason"]?.jsonPrimitive?.content ?: ""
        val id = "cl-${Clock.System.now().toEpochMilliseconds()}"
        call.userId?.let { uid ->
            appendProfileList(
                collection = "soma_profiles",
                uid = uid,
                field = "clearances",
                record = mapOf("id" to id, "activity" to activity, "status" to status, "reason" to reason, "issuedAt" to nowIso())
            )
            updateProfileFields("soma_profiles", uid, mapOf("clearanceStatus" to status))
        }
        nsvService.updateNsv(mapOf("biological.clearanceStatus" to status))
        val priority = if (status == "denied") "alert" else "info"
        eventBus.emit(SpineEventPayload(
            type = "SOMA_CLEARANCE_CHANGED",
            source = "soma",
            domain = "B",
            data = mapOf("moduleId" to "soma", "activity" to activity, "status" to status, "timestamp" to nowIso()) + extraData,
            priority = priority
        ))
        if (secondaryEvent != null) {
            eventBus.emit(SpineEventPayload(
                type = secondaryEvent,
                source = "soma",
                domain = "B",
                data = mapOf("activity" to activity, "reason" to reason, "timestamp" to nowIso()),
                priority = priority
            ))
        }
    }

    private suspend fun emitDeepLinkFocus(module: String, focusId: String) {
        settings?.putString("pending_focus_id_${module}", focusId)
    }
}
