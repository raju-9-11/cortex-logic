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
import com.agnes.nexus.core.domain.services.SpineEvent
import com.agnes.nexus.core.domain.services.SpineEventBus
import com.agnes.nexus.core.domain.services.SpineEventFilter
import com.agnes.nexus.core.domain.services.SpineEventPayload
import com.agnes.nexus.core.domain.services.VaultBoundary
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.test.runTest
import kotlinx.datetime.Clock
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import kotlin.test.BeforeTest
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class ScoutActionsTest {

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

        override suspend fun <T> getDocument(collection: String, id: String, serializer: (String) -> T): T? = null

        override suspend fun listDocuments(collection: String): List<String> =
            documents[collection]?.keys?.toList() ?: emptyList()

        override suspend fun createDocument(collection: String, data: Map<String, Any?>, id: String?): String {
            val docId = id ?: "doc_${Clock.System.now().toEpochMilliseconds()}"
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

        override fun <T> subscribeToDocument(collection: String, id: String, serializer: (String) -> T, listener: (T?) -> Unit): () -> Unit = {}

        override suspend fun <T> query(query: NexusQuery, serializer: (String) -> T): List<T> = emptyList()

        override fun <T> subscribeToQuery(query: NexusQuery, serializer: (String) -> T, listener: (List<T>) -> Unit): () -> Unit = {}

        override suspend fun batchWrite(operations: List<BatchOperation>) {}

        fun getDocumentsInCollection(collection: String): Map<String, Map<String, Any?>> =
            documents[collection] ?: emptyMap()
    }

    class FakeVaultBoundary : VaultBoundary {
        override suspend fun encrypt(plaintext: String, secretKey: String): EncryptedEnvelope =
            EncryptedEnvelope(ciphertext = "enc_$plaintext", iv = "iv_test", version = 1)
        override suspend fun decrypt(envelope: EncryptedEnvelope, secretKey: String): String = "decrypted"
        override suspend fun deriveKey(password: String, salt: String): String = "key_test"
    }

    // ── Fixture ───────────────────────────────────────────────────────────────

    private lateinit var nsv: FakeNeuralProjectionService
    private lateinit var bus: FakeSpineEventBus
    private lateinit var settings: FakeNexusSettings
    private lateinit var dataLayer: FakeDataLayer
    private lateinit var actionHub: ActionHub

    @BeforeTest
    fun setup() {
        nsv = FakeNeuralProjectionService()
        bus = FakeSpineEventBus()
        settings = FakeNexusSettings()
        dataLayer = FakeDataLayer()
        actionHub = ActionHub(
            nsvService = nsv,
            eventBus = bus,
            dataLayer = dataLayer,
            settings = settings
        )
    }

    // ── add_knowledge_node ────────────────────────────────────────────────────

    @Test
    fun `add_knowledge_node persists node and emits KNOWLEDGE_NODE_ADDED`() = runTest {
        val call = ActionCall(
            moduleId = "scout",
            type = "add_knowledge_node",
            userId = "user_1",
            payload = buildJsonObject {
                put("title", "Quantum entanglement basics")
                put("content", "Two particles can be entangled across any distance")
                put("confidence", 0.85)
                put("type", "verified")
                put("sourceId", "src_abc")
            }
        )

        actionHub.execute(call)

        val emittedTypes = bus.events.map { it.type }
        assertTrue("KNOWLEDGE_NODE_ADDED should be emitted") { "KNOWLEDGE_NODE_ADDED" in emittedTypes }

        val event = bus.events.first { it.type == "KNOWLEDGE_NODE_ADDED" }
        assertEquals("C", event.domain, "Domain must be cognitive")
        assertEquals("scout", event.source)
        assertNotNull(event.data["nodeId"])

        val nodeCollectionKey = dataLayer.documents.keys
            .firstOrNull { it.startsWith("scout_knowledge/user_1/nodes") }
        assertNotNull(nodeCollectionKey, "Node should be persisted to scout_knowledge subcollection")
    }

    @Test
    fun `add_knowledge_node sets status=verified for type=verified`() = runTest {
        val call = ActionCall(
            moduleId = "scout",
            type = "add_knowledge_node",
            userId = "user_1",
            payload = buildJsonObject {
                put("content", "Earth is round")
                put("confidence", 0.99)
                put("type", "verified")
            }
        )

        actionHub.execute(call)

        val event = bus.events.first { it.type == "KNOWLEDGE_NODE_ADDED" }
        assertEquals("verified", event.data["status"] as? String)
    }

    @Test
    fun `add_knowledge_node with unverified type sets status=pending`() = runTest {
        val call = ActionCall(
            moduleId = "scout",
            type = "add_knowledge_node",
            userId = "user_1",
            payload = buildJsonObject {
                put("content", "Hypothesis about dark matter")
                put("confidence", 0.4)
                put("type", "unverified")
            }
        )

        actionHub.execute(call)

        val event = bus.events.first { it.type == "KNOWLEDGE_NODE_ADDED" }
        assertEquals("pending", event.data["status"] as? String)
    }

    // ── extract_citation ──────────────────────────────────────────────────────

    @Test
    fun `extract_citation persists citation and emits VITAL_UPDATED`() = runTest {
        val call = ActionCall(
            moduleId = "scout",
            type = "extract_citation",
            userId = "user_1",
            payload = buildJsonObject {
                put("text", "The universe is approximately 13.8 billion years old")
                put("sourceUrl", "https://science.nasa.gov")
                put("sourceTitle", "NASA Science")
                put("pageNumber", 42)
            }
        )

        actionHub.execute(call)

        val emittedTypes = bus.events.map { it.type }
        assertTrue { "VITAL_UPDATED" in emittedTypes }

        val event = bus.events.first { it.type == "VITAL_UPDATED" }
        assertEquals("C", event.domain)
        assertEquals("extract_citation", event.data["action"] as? String)

        val citationKey = dataLayer.documents.keys
            .firstOrNull { it.startsWith("scout_knowledge/user_1/citations") }
        assertNotNull(citationKey, "Citation should be persisted")
    }

    @Test
    fun `extract_citation with missing text is ignored gracefully`() = runTest {
        val call = ActionCall(
            moduleId = "scout",
            type = "extract_citation",
            userId = "user_1",
            payload = buildJsonObject {
                put("sourceUrl", "https://example.com")
            }
        )

        actionHub.execute(call)

        // No VITAL_UPDATED should be emitted when text is missing
        assertTrue("No VITAL_UPDATED for missing text") {
            bus.events.none { it.type == "VITAL_UPDATED" && it.data["action"] == "extract_citation" }
        }
    }

    // ── extract_finding ───────────────────────────────────────────────────────

    @Test
    fun `extract_finding persists finding and emits KNOWLEDGE_NODE_ADDED`() = runTest {
        val call = ActionCall(
            moduleId = "scout",
            type = "extract_finding",
            userId = "user_1",
            payload = buildJsonObject {
                put("summary", "Regular exercise reduces cardiovascular disease risk by 30%")
                put("confidence", 0.9)
            }
        )

        actionHub.execute(call)

        val emittedTypes = bus.events.map { it.type }
        assertTrue { "KNOWLEDGE_NODE_ADDED" in emittedTypes }

        val findingKey = dataLayer.documents.keys
            .firstOrNull { it.startsWith("scout_knowledge/user_1/findings") }
        assertNotNull(findingKey, "Finding should be persisted")
    }

    // ── commit_research_session ───────────────────────────────────────────────

    @Test
    fun `commit_research_session persists session summary and emits VITAL_UPDATED`() = runTest {
        val call = ActionCall(
            moduleId = "scout",
            type = "commit_research_session",
            userId = "user_1",
            payload = buildJsonObject {
                put("query", "Effects of sleep deprivation on cognition")
                put("findingsCount", 5)
                put("sourcesCount", 8)
            }
        )

        actionHub.execute(call)

        val emittedTypes = bus.events.map { it.type }
        assertTrue { "VITAL_UPDATED" in emittedTypes }

        val sessionKey = dataLayer.documents.keys
            .firstOrNull { it.startsWith("scout_sessions/user_1/sessions") }
        assertNotNull(sessionKey, "Session should be persisted")

        val sessionDoc = dataLayer.documents[sessionKey]?.values?.firstOrNull()
        assertEquals("complete", sessionDoc?.get("status") as? String)
    }

    // ── add_source ────────────────────────────────────────────────────────────

    @Test
    fun `add_source persists source and emits VITAL_UPDATED`() = runTest {
        val call = ActionCall(
            moduleId = "scout",
            type = "add_source",
            userId = "user_1",
            payload = buildJsonObject {
                put("url", "https://pubmed.ncbi.nlm.nih.gov/12345")
                put("title", "Sleep and Cognitive Function")
                put("type", "web")
            }
        )

        actionHub.execute(call)

        val emittedTypes = bus.events.map { it.type }
        assertTrue { "VITAL_UPDATED" in emittedTypes }

        val sourceKey = dataLayer.documents.keys
            .firstOrNull { it.startsWith("scout_sources/user_1/sources") }
        assertNotNull(sourceKey, "Source should be persisted")

        val sourceDoc = dataLayer.documents[sourceKey]?.values?.firstOrNull()
        assertEquals("https://pubmed.ncbi.nlm.nih.gov/12345", sourceDoc?.get("url") as? String)
    }

    @Test
    fun `add_source with missing url is ignored`() = runTest {
        val call = ActionCall(
            moduleId = "scout",
            type = "add_source",
            userId = "user_1",
            payload = buildJsonObject {
                put("title", "No URL source")
            }
        )

        actionHub.execute(call)

        assertTrue("No source should be persisted for missing url") {
            dataLayer.documents.keys.none { it.startsWith("scout_sources/user_1/sources") }
        }
    }

    // ── generate_digest ───────────────────────────────────────────────────────

    @Test
    fun `generate_digest persists digest and emits DIGEST_GENERATED`() = runTest {
        val call = ActionCall(
            moduleId = "scout",
            type = "generate_digest",
            userId = "user_1",
            payload = buildJsonObject {
                put("digestText", "Weekly synthesis: key themes in quantum computing research")
                put("nodeCount", 12)
                put("sourceCount", 7)
            }
        )

        actionHub.execute(call)

        val emittedTypes = bus.events.map { it.type }
        assertTrue { "DIGEST_GENERATED" in emittedTypes }

        val event = bus.events.first { it.type == "DIGEST_GENERATED" }
        assertEquals("C", event.domain)
        assertEquals("scout", event.source)

        val digestKey = dataLayer.documents.keys
            .firstOrNull { it.startsWith("scout_digests/user_1/digests") }
        assertNotNull(digestKey, "Digest should be persisted")
    }

    // ── export_research ───────────────────────────────────────────────────────

    @Test
    fun `export_research persists export record and emits RESEARCH_EXPORTED`() = runTest {
        val call = ActionCall(
            moduleId = "scout",
            type = "export_research",
            userId = "user_1",
            payload = buildJsonObject {
                put("format", "markdown")
            }
        )

        actionHub.execute(call)

        val emittedTypes = bus.events.map { it.type }
        assertTrue { "RESEARCH_EXPORTED" in emittedTypes }

        val event = bus.events.first { it.type == "RESEARCH_EXPORTED" }
        assertEquals("C", event.domain)
        assertEquals("markdown", event.data["format"] as? String)

        val exportKey = dataLayer.documents.keys
            .firstOrNull { it.startsWith("scout_exports/user_1/exports") }
        assertNotNull(exportKey, "Export record should be persisted")
    }

    // ── start_deep_research ───────────────────────────────────────────────────

    @Test
    fun `start_deep_research emits DEEP_RESEARCH_REQUESTED and persists session`() = runTest {
        val call = ActionCall(
            moduleId = "scout",
            type = "start_deep_research",
            userId = "user_1",
            payload = buildJsonObject {
                put("query", "Long-term effects of intermittent fasting on metabolic health")
            }
        )

        actionHub.execute(call)

        val emittedTypes = bus.events.map { it.type }
        assertTrue { "DEEP_RESEARCH_REQUESTED" in emittedTypes }

        val event = bus.events.first { it.type == "DEEP_RESEARCH_REQUESTED" }
        assertEquals("C", event.domain)
        assertEquals("Long-term effects of intermittent fasting on metabolic health", event.data["query"] as? String)

        val sessionKey = dataLayer.documents.keys
            .firstOrNull { it.startsWith("scout_sessions/user_1/sessions") }
        assertNotNull(sessionKey, "Research session should be persisted")
    }

    @Test
    fun `start_deep_research with blank query emits rejection`() = runTest {
        val call = ActionCall(
            moduleId = "scout",
            type = "start_deep_research",
            userId = "user_1",
            payload = buildJsonObject {
                put("query", "   ")
            }
        )

        actionHub.execute(call)

        assertTrue("No DEEP_RESEARCH_REQUESTED for blank query") {
            bus.events.none { it.type == "DEEP_RESEARCH_REQUESTED" }
        }
    }

    // ── complete_scout_onboarding ─────────────────────────────────────────────

    @Test
    fun `complete_scout_onboarding emits ONBOARDING_COMPLETED with moduleId=scout`() = runTest {
        val call = ActionCall(
            moduleId = "scout",
            type = "complete_scout_onboarding",
            userId = "user_1",
            payload = buildJsonObject {}
        )

        actionHub.execute(call)

        val event = bus.events.firstOrNull { it.type == "ONBOARDING_COMPLETED" }
        assertNotNull(event, "ONBOARDING_COMPLETED should be emitted")
        assertEquals("scout", event.data["moduleId"] as? String)
    }
}
