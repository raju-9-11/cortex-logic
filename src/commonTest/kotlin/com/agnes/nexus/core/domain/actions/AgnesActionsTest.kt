package com.agnes.nexus.core.domain.actions

import com.agnes.nexus.core.domain.models.ActionCall
import com.agnes.nexus.core.domain.models.EncryptedEnvelope
import com.agnes.nexus.core.domain.models.NeuralStateVector
import com.agnes.nexus.core.domain.services.CascadeRule
import com.agnes.nexus.core.domain.services.NeuralProjectionService
import com.agnes.nexus.core.domain.services.NexusSettings
import com.agnes.nexus.core.domain.services.NexusDataLayer
import com.agnes.nexus.core.domain.services.SpineEvent
import com.agnes.nexus.core.domain.services.SpineEventBus
import com.agnes.nexus.core.domain.services.SpineEventFilter
import com.agnes.nexus.core.domain.services.SpineEventPayload
import com.agnes.nexus.core.domain.services.VaultBoundary
import com.agnes.nexus.core.domain.services.BatchOperation
import com.agnes.nexus.core.domain.services.NexusQuery
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.buildJsonArray
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonPrimitive
import kotlin.test.AfterTest
import kotlin.test.BeforeTest
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class AgnesActionsTest {

    class FakeNeuralProjectionService : NeuralProjectionService {
        val updates = mutableListOf<Map<String, Any?>>()

        override fun observeNsv(): Flow<NeuralStateVector> = flowOf()
        override suspend fun updateNsv(patch: Map<String, Any?>) {
            updates.add(patch)
        }
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

    class FakeNexusSettings : NexusSettings {
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

    class FakeDataLayer : NexusDataLayer {
        val documents = mutableMapOf<String, MutableMap<String, Map<String, Any?>>>()

        override suspend fun <T> getDocument(collection: String, id: String, serializer: (String) -> T): T? {
            return null // Not needed for these tests
        }

        override suspend fun listDocuments(collection: String): List<String> {
            return documents[collection]?.keys?.toList() ?: emptyList()
        }

        override suspend fun createDocument(collection: String, data: Map<String, Any?>, id: String?): String {
            val docId = id ?: "doc_${System.currentTimeMillis()}"
            documents.computeIfAbsent(collection) { mutableMapOf() }[docId] = data
            return docId
        }

        override suspend fun setDocument(collection: String, id: String, data: Map<String, Any?>) {
            documents.computeIfAbsent(collection) { mutableMapOf() }[id] = data
        }

        override suspend fun updateDocument(collection: String, id: String, updates: Map<String, Any?>) {
            val existing = documents[collection]?.get(id) ?: return
            documents[collection]?.put(id, existing + updates)
        }

        override suspend fun deleteDocument(collection: String, id: String) {
            documents[collection]?.remove(id)
        }

        override fun <T> subscribeToDocument(collection: String, id: String, serializer: (String) -> T, listener: (T?) -> Unit): () -> Unit {
            return {}
        }

        override suspend fun <T> query(query: NexusQuery, serializer: (String) -> T): List<T> {
            return emptyList()
        }

        override fun <T> subscribeToQuery(query: NexusQuery, serializer: (String) -> T, listener: (List<T>) -> Unit): () -> Unit {
            return {}
        }

        override suspend fun batchWrite(operations: List<BatchOperation>) {
            // Not needed for these tests
        }

        fun getAllDocuments(collection: String): List<Map<String, Any?>> {
            return documents[collection]?.values?.toList() ?: emptyList()
        }
    }

    class FakeVaultBoundary : VaultBoundary {
        var lastEncryptionKey: String? = null

        override suspend fun encrypt(plaintext: String, secretKey: String): EncryptedEnvelope {
            lastEncryptionKey = secretKey
            return EncryptedEnvelope(
                ciphertext = "encrypted_${plaintext.length}",
                iv = "iv_for_${plaintext.hashCode()}",
                version = 1
            )
        }

        override suspend fun decrypt(envelope: EncryptedEnvelope, secretKey: String): String {
            return "decrypted_content"
        }

        override suspend fun deriveKey(password: String, salt: String): String {
            return "derived_key_${password.hashCode()}"
        }
    }

    private lateinit var nsv: FakeNeuralProjectionService
    private lateinit var bus: FakeSpineEventBus
    private lateinit var settings: FakeNexusSettings
    private lateinit var dataLayer: FakeDataLayer
    private lateinit var vault: FakeVaultBoundary
    private lateinit var actionHub: ActionHub

    @BeforeTest
    fun setup() {
        nsv = FakeNeuralProjectionService()
        bus = FakeSpineEventBus()
        settings = FakeNexusSettings()
        dataLayer = FakeDataLayer()
        vault = FakeVaultBoundary()
        actionHub = ActionHub(
            nsvService = nsv,
            eventBus = bus,
            dataLayer = dataLayer,
            vaultBoundary = vault,
            settings = settings
        )
    }

    @AfterTest
    fun tearDown() {
        // Clean up resources if needed
    }

    @Test
    fun updateEmotionalResilience_updatesNsvWhenNotEphemeral() = runTest {
        val payload = buildJsonObject {
            put("score", 7.5)
            put("persistencePolicy", "persistent")
        }

        val call = ActionCall(
            type = "update_emotional_resilience",
            payload = payload,
            moduleId = "agnes"
        )

        actionHub.execute(call)

        assertEquals(1, nsv.updates.size)
        assertEquals(7.5, nsv.updates.first()["emotional.emotionalResilience"])
    }

    @Test
    fun updateEmotionalResilience_ignoresEphemeralPolicy() = runTest {
        val payload = buildJsonObject {
            put("score", 5.0)
            put("persistencePolicy", "ephemeral")
        }

        val call = ActionCall(
            type = "update_emotional_resilience",
            payload = payload,
            moduleId = "agnes"
        )

        actionHub.execute(call)

        // NSV should not be updated for ephemeral policy
        assertEquals(0, nsv.updates.size)
    }

    @Test
    fun updateEmotionalResilience_emitsBurnoutWarningWhenScoreLowThan3() = runTest {
        val payload = buildJsonObject {
            put("score", 2.5)
            put("persistencePolicy", "persistent")
        }

        val call = ActionCall(
            type = "update_emotional_resilience",
            payload = payload,
            moduleId = "agnes"
        )

        actionHub.execute(call)

        assertEquals(1, nsv.updates.size)
        assertEquals(1, bus.events.size)

        val event = bus.events.first()
        assertEquals("BURNOUT_WARNING", event.type)
        assertEquals("agnes", event.source)
        assertEquals("E", event.domain)
        assertEquals("alert", event.priority)
        assertTrue(event.data.containsKey("cnsFatigue"))
        assertTrue(event.data.containsKey("source"))
        assertTrue(event.data.containsKey("trigger"))
    }

    @Test
    fun updateEmotionalResilience_doesNotEmitBurnoutWarningWhenScoreHigh() = runTest {
        val payload = buildJsonObject {
            put("score", 8.0)
            put("persistencePolicy", "persistent")
        }

        val call = ActionCall(
            type = "update_emotional_resilience",
            payload = payload,
            moduleId = "agnes"
        )

        actionHub.execute(call)

        assertEquals(1, nsv.updates.size)
        assertEquals(0, bus.events.size) // No event emitted for high score
    }

    @Test
    fun updateStressLoad_updatesNsvWhenNotEphemeral() = runTest {
        val payload = buildJsonObject {
            put("score", 5.0)
            put("persistencePolicy", "persistent")
        }

        val call = ActionCall(
            type = "update_stress_load",
            payload = payload,
            moduleId = "agnes"
        )

        actionHub.execute(call)

        assertEquals(1, nsv.updates.size)
        assertEquals(5.0, nsv.updates.first()["emotional.stressLoad"])
    }

    @Test
    fun updateStressLoad_ignoresEphemeralPolicy() = runTest {
        val payload = buildJsonObject {
            put("score", 7.0)
            put("persistencePolicy", "ephemeral")
        }

        val call = ActionCall(
            type = "update_stress_load",
            payload = payload,
            moduleId = "agnes"
        )

        actionHub.execute(call)

        assertEquals(0, nsv.updates.size)
    }

    @Test
    fun updateStressLoad_emitsCompoundStressWhenScoreGreaterThan8() = runTest {
        val payload = buildJsonObject {
            put("score", 8.5)
            put("persistencePolicy", "persistent")
        }

        val call = ActionCall(
            type = "update_stress_load",
            payload = payload,
            moduleId = "agnes"
        )

        actionHub.execute(call)

        assertEquals(1, nsv.updates.size)
        assertEquals(1, bus.events.size)

        val event = bus.events.first()
        assertEquals("COMPOUND_STRESS", event.type)
        assertEquals("agnes", event.source)
        assertEquals("E", event.domain)
        assertEquals("alert", event.priority)
        assertEquals(8.5, event.data["stressLoad"])
    }

    @Test
    fun updateStressLoad_emitsVitalUpdatedWhenScoreBetween6And8() = runTest {
        val payload = buildJsonObject {
            put("score", 7.0)
            put("persistencePolicy", "persistent")
        }

        val call = ActionCall(
            type = "update_stress_load",
            payload = payload,
            moduleId = "agnes"
        )

        actionHub.execute(call)

        assertEquals(1, nsv.updates.size)
        assertEquals(1, bus.events.size)

        val event = bus.events.first()
        assertEquals("VITAL_UPDATED", event.type)
        assertEquals("agnes", event.source)
        assertEquals("E", event.domain)
        assertEquals("info", event.priority)
        assertEquals(7.0, event.data["stressLoad"])
    }

    @Test
    fun updateMoodTrend_updatesNsvWhenNotEphemeral() = runTest {
        val payload = buildJsonObject {
            put("trend", "improving")
            put("persistencePolicy", "persistent")
        }

        val call = ActionCall(
            type = "update_mood_trend",
            payload = payload,
            moduleId = "agnes"
        )

        actionHub.execute(call)

        assertEquals(1, nsv.updates.size)
        assertEquals("improving", nsv.updates.first()["emotional.moodTrend"])
    }

    @Test
    fun updateMoodTrend_ignoresEphemeralPolicy() = runTest {
        val payload = buildJsonObject {
            put("trend", "stable")
            put("persistencePolicy", "ephemeral")
        }

        val call = ActionCall(
            type = "update_mood_trend",
            payload = payload,
            moduleId = "agnes"
        )

        actionHub.execute(call)

        assertEquals(0, nsv.updates.size)
    }

    @Test
    fun updateMoodTrend_alwaysEmitsVitalUpdatedEvent() = runTest {
        val payload = buildJsonObject {
            put("trend", "declining")
            put("persistencePolicy", "persistent")
        }

        val call = ActionCall(
            type = "update_mood_trend",
            payload = payload,
            moduleId = "agnes"
        )

        actionHub.execute(call)

        assertEquals(1, nsv.updates.size)
        assertEquals(1, bus.events.size)

        val event = bus.events.first()
        assertEquals("VITAL_UPDATED", event.type)
        assertEquals("agnes", event.source)
        assertEquals("E", event.domain)
        assertEquals("info", event.priority)
        assertEquals("declining", event.data["moodTrend"])
    }

    @Test
    fun updateTraumaMarkers_updatesNsvWhenNotEphemeral() = runTest {
        val payload = buildJsonObject {
            put("markers", buildJsonArray {
                add(JsonPrimitive("anxiety"))
                add(JsonPrimitive("nightmares"))
                add(JsonPrimitive("hypervigilance"))
            })
            put("persistencePolicy", "persistent")
        }

        val call = ActionCall(
            type = "update_trauma_markers",
            payload = payload,
            moduleId = "agnes"
        )

        actionHub.execute(call)

        assertEquals(1, nsv.updates.size)
        val storedMarkers = nsv.updates.first()["emotional.traumaMarkers"] as? List<*>
        assertEquals(3, storedMarkers?.size)
    }

    @Test
    fun updateTraumaMarkers_ignoresEphemeralPolicy() = runTest {
        val payload = buildJsonObject {
            put("markers", buildJsonArray {
                add(JsonPrimitive("trigger1"))
                add(JsonPrimitive("trigger2"))
            })
            put("persistencePolicy", "ephemeral")
        }

        val call = ActionCall(
            type = "update_trauma_markers",
            payload = payload,
            moduleId = "agnes"
        )

        actionHub.execute(call)

        assertEquals(0, nsv.updates.size)
    }

    @Test
    fun updateTraumaMarkers_handlesEmptyMarkers() = runTest {
        val markers = buildJsonArray {}

        val payload = buildJsonObject {
            put("markers", markers)
            put("persistencePolicy", "persistent")
        }

        val call = ActionCall(
            type = "update_trauma_markers",
            payload = payload,
            moduleId = "agnes"
        )

        actionHub.execute(call)

        assertEquals(1, nsv.updates.size)
        val storedMarkers = nsv.updates.first()["emotional.traumaMarkers"] as? List<*>
        assertEquals(0, storedMarkers?.size)
    }

    @Test
    fun crisisFlag_emitsCrisisDetectedEvent() = runTest {
        val payload = buildJsonObject {
            put("trigger", "suicidal_ideation")
            put("severity", "critical")
        }

        val call = ActionCall(
            type = "crisis_flag",
            payload = payload,
            moduleId = "agnes"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)

        val event = bus.events.first()
        assertEquals("CRISIS_DETECTED", event.type)
        assertEquals("agnes", event.source)
        assertEquals("E", event.domain)
        assertEquals("critical", event.priority)
        assertEquals("suicidal_ideation", event.data["trigger"])
        assertEquals("critical", event.data["severity"])
        assertTrue(event.data.containsKey("timestamp"))
    }

    @Test
    fun crisisFlag_usesDefaultValuesForMissingFields() = runTest {
        val payload = buildJsonObject {
            // Empty payload - will use defaults
        }

        val call = ActionCall(
            type = "crisis_flag",
            payload = payload,
            moduleId = "agnes"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)

        val event = bus.events.first()
        assertEquals("CRISIS_DETECTED", event.type)
        assertEquals("unknown", event.data["trigger"])
        assertEquals("high", event.data["severity"])
        assertTrue(event.data.containsKey("timestamp"))
    }

    @Test
    fun crisisFlag_emitsWithCorrectPriority() = runTest {
        val payload = buildJsonObject {
            put("trigger", "self_harm")
            put("severity", "critical")
        }

        val call = ActionCall(
            type = "crisis_flag",
            payload = payload,
            moduleId = "agnes"
        )

        actionHub.execute(call)

        val event = bus.events.first()
        assertEquals("critical", event.priority)
    }

    @Test
    fun updateBeliefGraph_savesBeliefGraphWhenDataLayerAndVaultAvailable() = runTest {
        val nodeJson = buildJsonObject {
            put("id", "node1")
            put("label", "Core belief")
            put("type", "belief")
            put("confidence", 0.85)
        }

        val payload = buildJsonObject {
            put("nodes", buildJsonArray { add(nodeJson) })
            put("edges", buildJsonArray {})
            put("metadata", buildJsonObject { put("version", "1.0") })
        }

        val call = ActionCall(
            type = "update_belief_graph",
            payload = payload,
            moduleId = "agnes",
            userId = "user123",
            encryptionKey = "secret_key"
        )

        actionHub.execute(call)

        // Verify that belief graph was stored in data layer
        val allDocs = dataLayer.getAllDocuments("belief_graphs")
        assertEquals(1, allDocs.size, "Should have stored one belief graph document")
        
        val storedDoc = allDocs.first()
        assertTrue(storedDoc.containsKey("encryptedData"), "Stored document should have encryptedData")
        assertTrue(storedDoc.containsKey("iv"), "Stored document should have iv")
        assertTrue(storedDoc.containsKey("metadata"), "Stored document should have metadata")
    }

    @Test
    fun updateBeliefGraph_returnsEarlyWhenMissingUserId() = runTest {
        val payload = buildJsonObject {
            put("nodes", buildJsonArray {})
            put("edges", buildJsonArray {})
        }

        val call = ActionCall(
            type = "update_belief_graph",
            payload = payload,
            moduleId = "agnes",
            userId = null, // Missing userId
            encryptionKey = "secret_key"
        )

        actionHub.execute(call)

        // Should not store anything without userId
        val storedDocs = dataLayer.getAllDocuments("belief_graphs")
        assertEquals(0, storedDocs.size)
    }

    @Test
    fun updateBeliefGraph_returnsEarlyWhenMissingEncryptionKey() = runTest {
        val payload = buildJsonObject {
            put("nodes", buildJsonArray {})
            put("edges", buildJsonArray {})
        }

        val call = ActionCall(
            type = "update_belief_graph",
            payload = payload,
            moduleId = "agnes",
            userId = "user123",
            encryptionKey = null // Missing encryption key
        )

        actionHub.execute(call)

        // Should not store anything without encryption key
        val storedDocs = dataLayer.getAllDocuments("belief_graphs")
        assertEquals(0, storedDocs.size)
    }

    @Test
    fun updateBeliefGraph_returnsEarlyWhenDataLayerUnavailable() = runTest {
        val actionHubWithoutDataLayer = ActionHub(
            nsvService = nsv,
            eventBus = bus,
            dataLayer = null, // No data layer
            vaultBoundary = vault,
            settings = settings
        )

        val payload = buildJsonObject {
            put("nodes", buildJsonArray {})
            put("edges", buildJsonArray {})
        }

        val call = ActionCall(
            type = "update_belief_graph",
            payload = payload,
            moduleId = "agnes",
            userId = "user123",
            encryptionKey = "secret_key"
        )

        actionHubWithoutDataLayer.execute(call)

        // Should not crash and should not store anything
        val storedDocs = dataLayer.getAllDocuments("belief_graphs")
        assertEquals(0, storedDocs.size)
    }

    @Test
    fun updateBeliefGraph_usesVaultToEncrypt() = runTest {
        val nodeJson = buildJsonObject {
            put("id", "node1")
            put("label", "Test node")
            put("type", "belief")
        }

        val payload = buildJsonObject {
            put("nodes", buildJsonArray { add(nodeJson) })
            put("edges", buildJsonArray {})
        }

        val call = ActionCall(
            type = "update_belief_graph",
            payload = payload,
            moduleId = "agnes",
            userId = "user123",
            encryptionKey = "my_secret_key"
        )

        actionHub.execute(call)

        // Verify that vault's encrypt was called with the correct key
        assertEquals("my_secret_key", vault.lastEncryptionKey)
    }
}
