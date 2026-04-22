package com.agnes.ara.core.domain.actions

import com.agnes.ara.core.domain.models.ActionCall
import com.agnes.ara.core.domain.models.EncryptedEnvelope
import com.agnes.ara.core.domain.models.NeuralStateVector
import com.agnes.ara.core.domain.services.BatchOperation
import com.agnes.ara.core.domain.services.CascadeRule
import com.agnes.ara.core.domain.services.NeuralProjectionService
import com.agnes.ara.core.domain.services.AraDataLayer
import com.agnes.ara.core.domain.services.AraQuery
import com.agnes.ara.core.domain.services.AraSettings
import com.agnes.ara.core.domain.services.SpineEvent
import com.agnes.ara.core.domain.services.SpineEventBus
import com.agnes.ara.core.domain.services.SpineEventFilter
import com.agnes.ara.core.domain.services.SpineEventPayload
import com.agnes.ara.core.domain.services.VaultBoundary
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import kotlin.test.BeforeTest
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class ForgeActionsTest {

    // ── Fakes ─────────────────────────────────────────────────────────────────

    class FakeNeuralProjectionService : NeuralProjectionService {
        val updates = mutableListOf<Map<String, Any?>>()
        override fun observeNsv(): Flow<NeuralStateVector> = flowOf()
        override suspend fun updateNsv(patch: Map<String, Any?>) { updates.add(patch) }
        override suspend fun getCompactedInsights(): List<String> = emptyList()
        override suspend fun addInsight(insight: String) {}
    }

    class FakeSpineEventBus : SpineEventBus {
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

    class FakeAraSettings : AraSettings {
        val storage = mutableMapOf<String, Any?>()
        override fun getInt(key: String, defaultValue: Int): Int = storage[key] as? Int ?: defaultValue
        override fun putInt(key: String, value: Int) { storage[key] = value }
        override fun getString(key: String, defaultValue: String?): String? = storage[key] as? String ?: defaultValue
        override fun putString(key: String, value: String?) { storage[key] = value }
        override fun getBoolean(key: String, defaultValue: Boolean): Boolean = storage[key] as? Boolean ?: defaultValue
        override fun putBoolean(key: String, value: Boolean) { storage[key] = value }
        override fun remove(key: String) { storage.remove(key) }
        override fun contains(key: String): Boolean = storage.containsKey(key)
    }

    class FakeDataLayer : AraDataLayer {
        val documents = mutableMapOf<String, MutableMap<String, Map<String, Any?>>>()

        override suspend fun <T> getDocument(collection: String, id: String, serializer: (String) -> T): T? = null

        override suspend fun listDocuments(collection: String): List<String> =
            documents[collection]?.keys?.toList() ?: emptyList()

        override suspend fun createDocument(collection: String, data: Map<String, Any?>, id: String?): String {
            val docId = id ?: "doc_${documents.size}"
            documents.getOrPut(collection) { mutableMapOf() }[docId] = data
            return docId
        }

        override suspend fun setDocument(collection: String, id: String, data: Map<String, Any?>) {
            documents.getOrPut(collection) { mutableMapOf() }[id] = data
        }

        override suspend fun updateDocument(collection: String, id: String, updates: Map<String, Any?>) {
            val existing = documents[collection]?.get(id) ?: return
            documents[collection]?.put(id, existing + updates)
        }

        override suspend fun deleteDocument(collection: String, id: String) {
            documents[collection]?.remove(id)
        }

        override fun <T> subscribeToDocument(
            collection: String,
            id: String,
            serializer: (String) -> T,
            listener: (T?) -> Unit
        ): () -> Unit = {}

        override suspend fun <T> query(query: AraQuery, serializer: (String) -> T): List<T> = emptyList()

        override fun <T> subscribeToQuery(
            query: AraQuery,
            serializer: (String) -> T,
            listener: (List<T>) -> Unit
        ): () -> Unit = {}

        override suspend fun batchWrite(operations: List<BatchOperation>) {}
    }

    class FakeVaultBoundary : VaultBoundary {
        override suspend fun encrypt(plaintext: String, secretKey: String): EncryptedEnvelope =
            EncryptedEnvelope(ciphertext = "encrypted", iv = "iv", version = 1)

        override suspend fun decrypt(envelope: EncryptedEnvelope, secretKey: String): String = "decrypted"

        override suspend fun deriveKey(password: String, salt: String): String = "derived_key"
    }

    // ── Setup ─────────────────────────────────────────────────────────────────

    private lateinit var nsv: FakeNeuralProjectionService
    private lateinit var bus: FakeSpineEventBus
    private lateinit var settings: FakeAraSettings
    private lateinit var dataLayer: FakeDataLayer
    private lateinit var vault: FakeVaultBoundary
    private lateinit var hub: ActionHub

    @BeforeTest
    fun setup() {
        nsv = FakeNeuralProjectionService()
        bus = FakeSpineEventBus()
        settings = FakeAraSettings()
        dataLayer = FakeDataLayer()
        vault = FakeVaultBoundary()
        hub = ActionHub(
            nsvService = nsv,
            eventBus = bus,
            dataLayer = dataLayer,
            vaultBoundary = vault,
            settings = settings
        )
    }

    // ── complete_forge_onboarding ─────────────────────────────────────────────

    @Test
    fun completeForgeOnboarding_emitsOnboardingCompletedEvent() = runTest {
        hub.execute(ActionCall(
            type = "complete_forge_onboarding",
            moduleId = "forge",
            userId = "user1",
            payload = buildJsonObject {}
        ))

        val event = bus.events.firstOrNull { it.type == "ONBOARDING_COMPLETED" }
        assertTrue(event != null, "Expected ONBOARDING_COMPLETED event")
        assertEquals("forge", event?.source)
        assertEquals("forge", event?.data?.get("moduleId"))
    }

    // ── create_artifact ───────────────────────────────────────────────────────

    @Test
    fun createArtifact_emitsForgeArtifactCreatedEvent() = runTest {
        hub.execute(ActionCall(
            type = "create_artifact",
            moduleId = "forge",
            userId = "user1",
            payload = buildJsonObject {
                put("name", "my-script.js")
                put("type", "code")
                put("content", "console.log('hello')")
                put("mode", "CODE")
            }
        ))

        val event = bus.events.firstOrNull { it.type == "FORGE_ARTIFACT_CREATED" }
        assertTrue(event != null, "Expected FORGE_ARTIFACT_CREATED event")
        assertEquals("forge", event?.source)
        assertEquals("system", event?.domain)
        assertEquals("my-script.js", event?.data?.get("name"))
        assertEquals("code", event?.data?.get("type"))
    }

    @Test
    fun createArtifact_withNoUserId_doesNotEmitEvent() = runTest {
        hub.execute(ActionCall(
            type = "create_artifact",
            moduleId = "forge",
            userId = null,
            payload = buildJsonObject { put("name", "test") }
        ))

        assertTrue(
            bus.events.none { it.type == "FORGE_ARTIFACT_CREATED" },
            "No event should be emitted without userId"
        )
    }

    // ── update_artifact ───────────────────────────────────────────────────────

    @Test
    fun updateArtifact_withNoMatchingArtifact_doesNotEmitEvent() = runTest {
        hub.execute(ActionCall(
            type = "update_artifact",
            moduleId = "forge",
            userId = "user1",
            payload = buildJsonObject {
                put("artifactId", "nonexistent-id")
                put("content", "new content")
            }
        ))

        assertTrue(
            bus.events.none { it.type == "VITAL_UPDATED" && it.source == "forge" },
            "No VITAL_UPDATED event when artifact not found"
        )
    }

    // ── run_tests ─────────────────────────────────────────────────────────────

    @Test
    fun runTests_emitsForgeExecutionCompletedEvent() = runTest {
        hub.execute(ActionCall(
            type = "run_tests",
            moduleId = "forge",
            userId = "user1",
            payload = buildJsonObject {
                put("testPath", "src/test")
                put("framework", "gradle")
            }
        ))

        val event = bus.events.firstOrNull { it.type == "FORGE_EXECUTION_COMPLETED" }
        assertTrue(event != null, "Expected FORGE_EXECUTION_COMPLETED event")
        assertEquals("forge", event?.source)
        assertEquals("src/test", event?.data?.get("testPath"))
        assertEquals("gradle", event?.data?.get("framework"))
        assertEquals("queued", event?.data?.get("result"))
    }

    @Test
    fun runTests_withNoUserId_doesNotEmitEvent() = runTest {
        hub.execute(ActionCall(
            type = "run_tests",
            moduleId = "forge",
            userId = null,
            payload = buildJsonObject { put("framework", "jest") }
        ))

        assertTrue(
            bus.events.none { it.type == "FORGE_EXECUTION_COMPLETED" },
            "No event emitted without userId"
        )
    }

    // ── draft_communication ───────────────────────────────────────────────────

    @Test
    fun draftCommunication_emitsForgeCommsDraftedEvent() = runTest {
        hub.execute(ActionCall(
            type = "draft_communication",
            moduleId = "forge",
            userId = "user1",
            payload = buildJsonObject {
                put("recipient", "alice@example.com")
                put("subject", "Project Update")
                put("body", "Here is the latest status.")
                put("tone", "formal")
            }
        ))

        val event = bus.events.firstOrNull { it.type == "FORGE_COMMS_DRAFTED" }
        assertTrue(event != null, "Expected FORGE_COMMS_DRAFTED event")
        assertEquals("forge", event?.source)
        assertEquals("alice@example.com", event?.data?.get("recipient"))
        assertEquals("Project Update", event?.data?.get("subject"))
        assertEquals("formal", event?.data?.get("tone"))
    }

    @Test
    fun draftCommunication_usesDefaultToneWhenBlank() = runTest {
        hub.execute(ActionCall(
            type = "draft_communication",
            moduleId = "forge",
            userId = "user1",
            payload = buildJsonObject {
                put("recipient", "bob@example.com")
                put("subject", "Hello")
                put("body", "Hi Bob!")
                put("tone", "")
            }
        ))

        val event = bus.events.firstOrNull { it.type == "FORGE_COMMS_DRAFTED" }
        assertTrue(event != null, "Expected FORGE_COMMS_DRAFTED event")
        assertEquals("formal", event?.data?.get("tone"), "Default tone should be 'formal'")
    }

    // ── draft_document ────────────────────────────────────────────────────────

    @Test
    fun draftDocument_emitsForgeArtifactCreatedEvent() = runTest {
        hub.execute(ActionCall(
            type = "draft_document",
            moduleId = "forge",
            userId = "user1",
            payload = buildJsonObject {
                put("title", "Q3 Summary Report")
                put("templateType", "report")
                put("content", "Executive summary of Q3 operations.")
            }
        ))

        val event = bus.events.firstOrNull { it.type == "FORGE_ARTIFACT_CREATED" }
        assertTrue(event != null, "Expected FORGE_ARTIFACT_CREATED event")
        assertEquals("forge", event?.source)
        assertEquals("Q3 Summary Report", event?.data?.get("title"))
        assertEquals("report", event?.data?.get("templateType"))
    }

    @Test
    fun draftDocument_withDefaultTemplateType_emitsEvent() = runTest {
        hub.execute(ActionCall(
            type = "draft_document",
            moduleId = "forge",
            userId = "user1",
            payload = buildJsonObject {
                put("title", "Meeting Notes")
                put("content", "Notes from the team sync.")
            }
        ))

        val event = bus.events.firstOrNull { it.type == "FORGE_ARTIFACT_CREATED" }
        assertTrue(event != null, "Expected FORGE_ARTIFACT_CREATED event")
        assertEquals("document", event?.data?.get("templateType"), "Default templateType should be 'document'")
    }

    // ── schedule_life_task ────────────────────────────────────────────────────

    @Test
    fun scheduleLifeTask_emitsVitalUpdatedEvent() = runTest {
        hub.execute(ActionCall(
            type = "schedule_life_task",
            moduleId = "forge",
            userId = "user1",
            payload = buildJsonObject {
                put("description", "Book dentist appointment")
                put("dueDate", "2026-04-01")
                put("category", "health")
            }
        ))

        val event = bus.events.firstOrNull { it.type == "VITAL_UPDATED" && it.source == "forge" }
        assertTrue(event != null, "Expected VITAL_UPDATED event from forge")
        assertEquals("Book dentist appointment", event?.data?.get("description"))
        assertEquals("2026-04-01", event?.data?.get("dueDate"))
        assertEquals("health", event?.data?.get("category"))
    }

    @Test
    fun scheduleLifeTask_withMinimalPayload_emitsEvent() = runTest {
        hub.execute(ActionCall(
            type = "schedule_life_task",
            moduleId = "forge",
            userId = "user1",
            payload = buildJsonObject {
                put("description", "Buy groceries")
            }
        ))

        val event = bus.events.firstOrNull { it.type == "VITAL_UPDATED" && it.source == "forge" }
        assertTrue(event != null, "Expected VITAL_UPDATED event")
        assertEquals("Buy groceries", event?.data?.get("description"))
    }

    // ── log_execution ─────────────────────────────────────────────────────────

    @Test
    fun logExecution_withValidPayload_doesNotThrow() = runTest {
        hub.execute(ActionCall(
            type = "log_execution",
            moduleId = "forge",
            userId = "user1",
            payload = buildJsonObject {
                put("command", "npm run build")
                put("result", "success")
                put("output", "Build succeeded in 3.2s")
            }
        ))
        // log_execution is persistence-only, no spine event emitted
        assertTrue(bus.events.none { it.type == "FORGE_EXECUTION_COMPLETED" && it.data["command"] == "npm run build" })
    }

    // ── execute_code (existing handler, verify FORGE_EXECUTION not emitted) ───

    @Test
    fun executeCode_withBlankCode_doesNotCrash() = runTest {
        hub.execute(ActionCall(
            type = "execute_code",
            moduleId = "forge",
            userId = "user1",
            payload = buildJsonObject {
                put("code", "")
                put("language", "python")
            }
        ))
        // Does not throw; error result stored in profile
    }

    @Test
    fun executeCode_withValidCode_queuesExecution() = runTest {
        hub.execute(ActionCall(
            type = "execute_code",
            moduleId = "forge",
            userId = "user1",
            payload = buildJsonObject {
                put("code", "print('hello')")
                put("language", "python")
            }
        ))
        // No exception; existing handler stores queued record
    }
}
