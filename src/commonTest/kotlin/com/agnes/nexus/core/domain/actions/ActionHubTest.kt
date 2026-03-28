package com.agnes.nexus.core.domain.actions

import com.agnes.nexus.core.domain.models.ActionCall
import com.agnes.nexus.core.domain.models.FieldSchema
import com.agnes.nexus.core.domain.models.ModuleSchemaDefinition
import com.agnes.nexus.core.domain.models.NeuralStateVector
import com.agnes.nexus.core.domain.services.CascadeRule
import com.agnes.nexus.core.domain.services.NeuralProjectionService
import com.agnes.nexus.core.domain.services.NexusSettings
import com.agnes.nexus.core.domain.services.SchemaRegistry
import com.agnes.nexus.core.domain.services.SpineEvent
import com.agnes.nexus.core.domain.services.SpineEventBus
import com.agnes.nexus.core.domain.services.SpineEventFilter
import com.agnes.nexus.core.domain.services.SpineEventPayload
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import kotlin.test.AfterTest
import kotlin.test.BeforeTest
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class ActionHubTest {

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

    @BeforeTest
    fun setup() {
        SchemaRegistry.reset()
    }

    @AfterTest
    fun tearDown() {
        SchemaRegistry.reset()
    }

    @Test
    fun focusTask_setsPendingFocusInSettings() = runTest {
        val nsv = FakeNeuralProjectionService()
        val bus = FakeSpineEventBus()
        val settings = FakeNexusSettings()
        val actionHub = ActionHub(
            nsvService = nsv, 
            eventBus = bus, 
            dataLayer = null, 
            vaultBoundary = null, 
            settings = settings
        )

        val payload = buildJsonObject {
            put("taskId", "123")
        }
        
        val call = ActionCall(
            type = "focus_task",
            payload = payload,
            moduleId = "atlas"
        )

        actionHub.execute(call)

        assertEquals("task:123", settings.getString("pending_focus_id_atlas", null))
    }

    @Test
    fun focusSession_setsPendingFocusInSettings() = runTest {
        val nsv = FakeNeuralProjectionService()
        val bus = FakeSpineEventBus()
        val settings = FakeNexusSettings()
        val actionHub = ActionHub(
            nsvService = nsv, 
            eventBus = bus, 
            dataLayer = null, 
            vaultBoundary = null, 
            settings = settings
        )

        val payload = buildJsonObject {
            put("sessionId", "s456")
        }
        
        val call = ActionCall(
            type = "focus_session",
            payload = payload,
            moduleId = "titan"
        )

        actionHub.execute(call)

        assertEquals("session:s456", settings.getString("pending_focus_id_titan", null))
    }

    @Test
    fun broadcastSpineEvent_emitsEvent() = runTest {
        val nsv = FakeNeuralProjectionService()
        val bus = FakeSpineEventBus()
        val actionHub = ActionHub(nsv, bus)

        val payload = buildJsonObject {
            put("type", "TEST_EVENT")
            put("domain", "system")
            put("payload", buildJsonObject { put("foo", "bar") })
        }
        
        val call = ActionCall(
            type = "broadcast_spine_event",
            payload = payload,
            moduleId = "orchestrator"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        val event = bus.events.first()
        assertEquals("TEST_EVENT", event.type)
        assertEquals("orchestrator", event.source)
        assertEquals("system", event.domain)
        val data = event.data as Map<*, *>
        assertEquals("bar", data["foo"])
    }
    
    @Test
    fun updateNsvFields_updatesNsv() = runTest {
        val nsv = FakeNeuralProjectionService()
        val bus = FakeSpineEventBus()
        val actionHub = ActionHub(nsv, bus)
        
        val payload = buildJsonObject {
            put("user.focus", "high")
        }
        
        val call = ActionCall(
            type = "update_nsv_fields",
            payload = payload,
            moduleId = "orchestrator"
        )
        
        actionHub.execute(call)
        
        assertEquals(1, nsv.updates.size)
        assertEquals("high", nsv.updates.first()["user.focus"])
    }

    @Test
    fun nexusAlias_executesOrchestratorHandlers() = runTest {
        val nsv = FakeNeuralProjectionService()
        val bus = FakeSpineEventBus()
        val actionHub = ActionHub(nsv, bus)

        val payload = buildJsonObject {
            put("user.focus", "nexus")
        }
        val call = ActionCall(
            type = "update_nsv_fields",
            payload = payload,
            moduleId = "nexus"
        )

        actionHub.execute(call)

        assertEquals(1, nsv.updates.size)
        assertEquals("nexus", nsv.updates.first()["user.focus"])
    }

    @Test
    fun scoutWebSearch_emitsRequestEvent() = runTest {
        val nsv = FakeNeuralProjectionService()
        val bus = FakeSpineEventBus()
        val actionHub = ActionHub(nsv, bus)

        val call = ActionCall(
            type = "web_search",
            payload = buildJsonObject { put("query", "sleep quality studies") },
            moduleId = "scout"
        )

        actionHub.execute(call)

        assertTrue(bus.events.any { it.type == "SCOUT_WEB_SEARCH_REQUESTED" })
    }

    @Test
    fun suggestField_extendsSchemaAndEmitsEvent() = runTest {
        val nsv = FakeNeuralProjectionService()
        val bus = FakeSpineEventBus()
        val actionHub = ActionHub(nsv, bus)
        
        // Setup SchemaRegistry
        SchemaRegistry.bindSpine(bus)
        val schemaDef = ModuleSchemaDefinition(
            moduleId = "soma",
            version = "1.0.0",
            coreSchema = FieldSchema("1.0.0", emptyList(), emptyList()),
            allowExtensions = true
        )
        SchemaRegistry.registerSchema(schemaDef)
        
        val payload = buildJsonObject {
            put("name", "Mood Score")
            put("type", "number")
        }
        
        val call = ActionCall(
            type = "suggest_field",
            payload = payload,
            moduleId = "soma"
        )

        actionHub.execute(call)

        // Verify SchemaRegistry has the extension
        val extensions = SchemaRegistry.getExtensions("soma")
        assertEquals(1, extensions.size)
        assertEquals("mood_score", extensions.first().id)
        
        // Verify Event
        // There should be 2 events:
        // 1. SCHEMA_EXTENDED (from SchemaRegistry)
        // 2. SOMA_FIELD_CREATED (from ActionHub)
        assertEquals(2, bus.events.size)
        
        val events = bus.events
        assertTrue(events.any { it.type == "SCHEMA_EXTENDED" })
        assertTrue(events.any { it.type == "SOMA_FIELD_CREATED" })
        
        val fieldEvent = events.find { it.type == "SOMA_FIELD_CREATED" }!!
        assertEquals("mood_score", fieldEvent.data["fieldId"])
    }
}
