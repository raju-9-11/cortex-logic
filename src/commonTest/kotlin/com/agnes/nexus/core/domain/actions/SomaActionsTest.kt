package com.agnes.nexus.core.domain.actions

import com.agnes.nexus.core.domain.models.ActionCall
import com.agnes.nexus.core.domain.models.EncryptedEnvelope
import com.agnes.nexus.core.domain.models.NeuralStateVector
import com.agnes.nexus.core.domain.services.BatchOperation
import com.agnes.nexus.core.domain.services.CascadeRule
import com.agnes.nexus.core.domain.services.NeuralProjectionService
import com.agnes.nexus.core.domain.services.NexusDataLayer
import com.agnes.nexus.core.domain.services.NexusQuery
import com.agnes.nexus.core.domain.services.NexusSettings
import com.agnes.nexus.core.domain.services.SchemaRegistry
import com.agnes.nexus.core.domain.services.SpineEvent
import com.agnes.nexus.core.domain.services.SpineEventBus
import com.agnes.nexus.core.domain.services.SpineEventFilter
import com.agnes.nexus.core.domain.services.SpineEventPayload
import com.agnes.nexus.core.domain.services.VaultBoundary
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.putJsonArray
import kotlin.test.AfterTest
import kotlin.test.BeforeTest
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class SomaActionsTest {

    // ========================
    // Test doubles
    // ========================

    class FakeNsv : NeuralProjectionService {
        val updates = mutableListOf<Map<String, Any?>>()
        override fun observeNsv(): Flow<NeuralStateVector> = flowOf()
        override suspend fun updateNsv(patch: Map<String, Any?>) { updates.add(patch) }
        override suspend fun getCompactedInsights(): List<String> = emptyList()
        override suspend fun addInsight(insight: String) {}
    }

    class FakeBus : SpineEventBus {
        val events = mutableListOf<SpineEventPayload>()
        override fun on(type: String, minPriority: String?): Flow<SpineEvent> = flowOf()
        override suspend fun emit(event: SpineEvent) {}
        override suspend fun emit(payload: SpineEventPayload): SpineEvent {
            events.add(payload)
            return payload.toSpineEvent()
        }
        override fun registerCascadeRules(rules: List<CascadeRule>) {}
        override fun getRecentEvents(filter: SpineEventFilter?): List<SpineEvent> = emptyList()
    }

    class FakeSettings : NexusSettings {
        val storage = mutableMapOf<String, Any?>()
        override fun getInt(key: String, defaultValue: Int) = storage[key] as? Int ?: defaultValue
        override fun putInt(key: String, value: Int) { storage[key] = value }
        override fun getString(key: String, defaultValue: String?) = storage[key] as? String ?: defaultValue
        override fun putString(key: String, value: String?) { storage[key] = value }
        override fun getBoolean(key: String, defaultValue: Boolean) = storage[key] as? Boolean ?: defaultValue
        override fun putBoolean(key: String, value: Boolean) { storage[key] = value }
        override fun remove(key: String) { storage.remove(key) }
        override fun contains(key: String) = storage.containsKey(key)
    }

    class FakeDataLayer : NexusDataLayer {
        val docs = mutableMapOf<String, MutableMap<String, Map<String, Any?>>>()
        override suspend fun <T> getDocument(collection: String, id: String, serializer: (String) -> T): T? = null
        override suspend fun listDocuments(collection: String): List<String> = docs[collection]?.keys?.toList() ?: emptyList()
        override suspend fun createDocument(collection: String, data: Map<String, Any?>, id: String?): String {
            val docId = id ?: "doc_${docs.size}"
            docs.computeIfAbsent(collection) { mutableMapOf() }[docId] = data
            return docId
        }
        override suspend fun setDocument(collection: String, id: String, data: Map<String, Any?>) {
            docs.computeIfAbsent(collection) { mutableMapOf() }[id] = data
        }
        override suspend fun updateDocument(collection: String, id: String, updates: Map<String, Any?>) {
            val existing = docs[collection]?.get(id) ?: return
            docs[collection]?.put(id, existing + updates)
        }
        override suspend fun deleteDocument(collection: String, id: String) { docs[collection]?.remove(id) }
        override fun <T> subscribeToDocument(collection: String, id: String, serializer: (String) -> T, listener: (T?) -> Unit): () -> Unit = {}
        override suspend fun <T> query(query: NexusQuery, serializer: (String) -> T): List<T> = emptyList()
        override fun <T> subscribeToQuery(query: NexusQuery, serializer: (String) -> T, listener: (List<T>) -> Unit): () -> Unit = {}
        override suspend fun batchWrite(operations: List<BatchOperation>) {}
    }

    class FakeVault : VaultBoundary {
        override suspend fun encrypt(plaintext: String, secretKey: String): EncryptedEnvelope =
            EncryptedEnvelope(ciphertext = "enc", iv = "iv", version = 1)
        override suspend fun decrypt(envelope: EncryptedEnvelope, secretKey: String): String = "dec"
        override suspend fun deriveKey(password: String, salt: String): String = "key"
    }

    // ========================
    // Setup
    // ========================

    private lateinit var nsv: FakeNsv
    private lateinit var bus: FakeBus
    private lateinit var settings: FakeSettings
    private lateinit var dataLayer: FakeDataLayer
    private lateinit var hub: ActionHub

    @BeforeTest
    fun setup() {
        SchemaRegistry.reset()
        nsv = FakeNsv()
        bus = FakeBus()
        settings = FakeSettings()
        dataLayer = FakeDataLayer()
        hub = ActionHub(
            nsvService = nsv,
            eventBus = bus,
            dataLayer = dataLayer,
            vaultBoundary = FakeVault(),
            settings = settings
        )
    }

    @AfterTest
    fun tearDown() {
        SchemaRegistry.reset()
    }

    // ========================
    // Tests
    // ========================

    @Test
    fun completeSomaOnboarding_emitsOnboardingCompleted() = runTest {
        hub.execute(ActionCall(
            type = "complete_soma_onboarding",
            moduleId = "soma",
            payload = buildJsonObject {},
            userId = "u1"
        ))

        val event = bus.events.firstOrNull { it.type == "ONBOARDING_COMPLETED" }
        assertTrue(event != null, "Expected ONBOARDING_COMPLETED event")
        assertEquals("soma", event?.source)
        assertEquals("B", event?.domain)
    }

    @Test
    fun completeSomaOnboarding_persistsFlag() = runTest {
        hub.execute(ActionCall(
            type = "complete_soma_onboarding",
            moduleId = "soma",
            payload = buildJsonObject {},
            userId = "u1"
        ))

        val doc = dataLayer.docs["soma_profiles"]?.get("u1")
        assertEquals(true, doc?.get("medicalOnboardingComplete"))
        assertEquals(true, doc?.get("onboardingComplete"))
    }

    @Test
    fun grantClearance_emitsClearanceGrantedAndChanged() = runTest {
        hub.execute(ActionCall(
            type = "grant_clearance",
            moduleId = "soma",
            payload = buildJsonObject {
                put("activity", "running")
                put("reason", "All metrics normal")
            },
            userId = "u1"
        ))

        assertTrue(bus.events.any { it.type == "SOMA_CLEARANCE_CHANGED" && it.data["status"] == "granted" })
        assertTrue(bus.events.any { it.type == "CLEARANCE_GRANTED" })
    }

    @Test
    fun grantClearance_updatesNsvClearanceStatus() = runTest {
        hub.execute(ActionCall(
            type = "grant_clearance",
            moduleId = "soma",
            payload = buildJsonObject { put("activity", "yoga") },
            userId = "u1"
        ))

        assertTrue(nsv.updates.any { it.containsKey("biological.clearanceStatus") && it["biological.clearanceStatus"] == "granted" })
    }

    @Test
    fun denyClearance_emitsAlertPriorityEvents() = runTest {
        hub.execute(ActionCall(
            type = "deny_clearance",
            moduleId = "soma",
            payload = buildJsonObject {
                put("activity", "heavy_lifting")
                put("reason", "Elevated inflammation markers")
            },
            userId = "u1"
        ))

        val changed = bus.events.firstOrNull { it.type == "SOMA_CLEARANCE_CHANGED" }
        assertEquals("alert", changed?.priority)
        val denied = bus.events.firstOrNull { it.type == "CLEARANCE_DENIED" }
        assertEquals("alert", denied?.priority)
    }

    @Test
    fun setConditionalClearance_emitsConditionalStatus() = runTest {
        hub.execute(ActionCall(
            type = "set_conditional_clearance",
            moduleId = "soma",
            payload = buildJsonObject {
                put("activity", "running")
                put("condition", "rest recommended")
            },
            userId = "u1"
        ))

        val event = bus.events.firstOrNull { it.type == "SOMA_CLEARANCE_CHANGED" }
        assertEquals("conditional", event?.data?.get("status"))
    }

    @Test
    fun logAssessment_emitsBiomarkerCommitted() = runTest {
        hub.execute(ActionCall(
            type = "log_assessment",
            moduleId = "soma",
            payload = buildJsonObject {
                put("observation", "Mild knee discomfort during squat pattern")
                put("type", "musculoskeletal")
            },
            userId = "u1"
        ))

        val event = bus.events.firstOrNull { it.type == "SOMA_BIOMARKER_COMMITTED" }
        assertTrue(event != null, "Expected SOMA_BIOMARKER_COMMITTED")
        assertEquals("assessment", event?.data?.get("type"))
    }

    @Test
    fun logAssessment_blankObservation_noEvent() = runTest {
        hub.execute(ActionCall(
            type = "log_assessment",
            moduleId = "soma",
            payload = buildJsonObject { put("observation", "  ") },
            userId = "u1"
        ))

        assertTrue(bus.events.none { it.type == "SOMA_BIOMARKER_COMMITTED" })
    }

    @Test
    fun parseHealthReport_emitsLabReportParsed() = runTest {
        hub.execute(ActionCall(
            type = "parse_health_report",
            moduleId = "soma",
            payload = buildJsonObject {
                put("reportType", "CBC")
                putJsonArray("findings") { add(JsonPrimitive("WBC: 5.2")) }
                putJsonArray("flags") {}
            },
            userId = "u1"
        ))

        val event = bus.events.firstOrNull { it.type == "SOMA_LAB_REPORT_PARSED" }
        assertTrue(event != null, "Expected SOMA_LAB_REPORT_PARSED")
        assertEquals("CBC", event?.data?.get("reportType"))
    }

    @Test
    fun parseBiometricData_emitsBiomarkerCommittedAndUpdatesNsv() = runTest {
        hub.execute(ActionCall(
            type = "parse_biometric_data",
            moduleId = "soma",
            payload = buildJsonObject {
                put("heartRate", 68.0)
                put("weight", 75.0)
            },
            userId = "u1"
        ))

        assertTrue(bus.events.any { it.type == "SOMA_BIOMARKER_COMMITTED" })
        assertTrue(nsv.updates.any { it.containsKey("biological.heartRate") })
        assertTrue(nsv.updates.any { it.containsKey("biological.weight") })
    }

    @Test
    fun parseBiometricData_emptyPayload_noEvent() = runTest {
        hub.execute(ActionCall(
            type = "parse_biometric_data",
            moduleId = "soma",
            payload = buildJsonObject {},
            userId = "u1"
        ))

        assertTrue(bus.events.none { it.type == "SOMA_BIOMARKER_COMMITTED" })
    }

    @Test
    fun analyzeMedicalImage_emitsDiagnosisMerged() = runTest {
        hub.execute(ActionCall(
            type = "analyze_medical_image",
            moduleId = "soma",
            payload = buildJsonObject {
                put("imageType", "xray")
                put("result", "No acute fracture observed")
                put("sessionId", "sess-42")
            },
            userId = "u1"
        ))

        val event = bus.events.firstOrNull { it.type == "SOMA_DIAGNOSIS_MERGED" }
        assertTrue(event != null, "Expected SOMA_DIAGNOSIS_MERGED")
        assertEquals("sess-42", event?.data?.get("sessionId"))
        assertEquals("xray", event?.data?.get("imageType"))
    }

    @Test
    fun logLabResult_emitsLabReportParsed() = runTest {
        hub.execute(ActionCall(
            type = "log_lab_result",
            moduleId = "soma",
            payload = buildJsonObject {
                put("name", "HbA1c")
                put("value", "5.4")
                put("unit", "%")
                put("referenceRange", "4.0-5.6")
                put("flag", "normal")
            },
            userId = "u1"
        ))

        assertTrue(bus.events.any { it.type == "SOMA_LAB_REPORT_PARSED" && it.data["panel"] == "HbA1c" })
    }

    @Test
    fun logLabResult_missingNameOrValue_noEvent() = runTest {
        hub.execute(ActionCall(
            type = "log_lab_result",
            moduleId = "soma",
            payload = buildJsonObject { put("unit", "%") },
            userId = "u1"
        ))

        assertTrue(bus.events.none { it.type == "SOMA_LAB_REPORT_PARSED" })
    }

    @Test
    fun logMedication_emitsProfileUpdated() = runTest {
        hub.execute(ActionCall(
            type = "log_medication",
            moduleId = "soma",
            payload = buildJsonObject { put("name", "Metformin 500mg") },
            userId = "u1"
        ))

        val event = bus.events.firstOrNull { it.type == "SOMA_PROFILE_UPDATED" }
        assertTrue(event != null)
        assertEquals("medications", event?.data?.get("field"))
    }

    @Test
    fun logCondition_emitsProfileUpdated() = runTest {
        hub.execute(ActionCall(
            type = "log_condition",
            moduleId = "soma",
            payload = buildJsonObject { put("condition", "Type 2 Diabetes") },
            userId = "u1"
        ))

        val event = bus.events.firstOrNull { it.type == "SOMA_PROFILE_UPDATED" }
        assertTrue(event != null)
        assertEquals("knownConditions", event?.data?.get("field"))
    }

    @Test
    fun logVital_emitsSomaVitalLogged() = runTest {
        hub.execute(ActionCall(
            type = "log_vital",
            moduleId = "soma",
            payload = buildJsonObject {
                put("heartRate", 72.0)
                put("spo2", 98.5)
            },
            userId = "u1"
        ))

        assertTrue(bus.events.any { it.type == "SOMA_VITAL_LOGGED" })
    }
}
