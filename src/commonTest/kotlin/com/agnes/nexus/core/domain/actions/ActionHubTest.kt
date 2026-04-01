package com.agnes.nexus.core.domain.actions

import com.agnes.nexus.core.domain.models.ActionCall
import com.agnes.nexus.core.domain.models.AtlasHabit
import com.agnes.nexus.core.domain.models.AtlasProfile
import com.agnes.nexus.core.domain.models.FieldSchema
import com.agnes.nexus.core.domain.models.LedgerFinancialGoal
import com.agnes.nexus.core.domain.models.LedgerProfile
import com.agnes.nexus.core.domain.models.LedgerTransaction
import com.agnes.nexus.core.domain.models.ModuleSchemaDefinition
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
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.SerializationStrategy
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import kotlin.test.AfterTest
import kotlin.test.BeforeTest
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class ActionHubTest {

    /**
     * In-memory NexusDataLayer. Stores each document as a JSON string so that
     * the round-trip through [ActionHub]'s load/save helpers works identically
     * to the real Firestore path: setDocument → JSON string → getDocument(serializer).
     */
    class FakeNexusDataLayer : NexusDataLayer {
        // Documents stored as JSON strings, matching the Firestore serialization path.
        private val store = mutableMapOf<String, MutableMap<String, String>>()

        /** Pre-populate a document so tests can start with existing profile state. */
        fun <T> prefill(collection: String, id: String, value: T, json: Json, serializer: SerializationStrategy<T>) {
            store.getOrPut(collection) { mutableMapOf() }[id] =
                json.encodeToString(serializer, value)
        }

        /** Retrieve the last-written document as a raw JSON string, for assertions. */
        fun getStoredJson(collection: String, id: String): String? = store[collection]?.get(id)

        /** Returns document IDs stored in a collection (for diagnostics). */
        fun getCollectionKeys(collection: String): Set<String> = store[collection]?.keys ?: emptySet()

        override suspend fun <T> getDocument(collection: String, id: String, serializer: (String) -> T): T? {
            val jsonStr = store[collection]?.get(id) ?: return null
            return serializer(jsonStr)
        }

        override suspend fun setDocument(collection: String, id: String, data: Map<String, Any?>) {
            store.getOrPut(collection) { mutableMapOf() }[id] = buildString { appendJsonObject(data) }
        }

        /**
         * Recursively serializes the map to a JSON string.
         *
         * In Kotlin/JS IR, [JsonObject.toMap] unwraps [JsonElement] values to their
         * underlying Kotlin/JS types:
         *  - [JsonPrimitive] (string) → [String] (the content, NOT JSON-quoted)
         *  - [JsonPrimitive] (number) → [Int] / [Double]
         *  - [JsonPrimitive] (boolean) → [Boolean]
         *  - [JsonNull] → [String] with value "null" (its [content] property)
         *  - [JsonArray] → [List] (ArrayList)
         *  - [JsonObject] → [Map] (LinkedHashMap)
         *
         * Ambiguity: String "null" appears for both [JsonNull] AND a string field whose
         * actual value is the literal string "null". For the test profiles used here,
         * no actual string field ever holds the value "null", so we treat String "null"
         * as a JSON null literal.
         */
        private fun StringBuilder.appendJsonObject(map: Map<*, *>) {
            append('{')
            var first = true
            for (entry in map.entries) {
                if (!first) append(',')
                first = false
                append('"')
                append(entry.key.toString().replace("\\", "\\\\").replace("\"", "\\\""))
                append("\":")
                appendJsonValue(entry.value)
            }
            append('}')
        }

        private fun StringBuilder.appendJsonValue(v: Any?) {
            when {
                v == null          -> append("null")
                v is Boolean       -> append(if (v) "true" else "false")
                        v is Number        -> {
                    val s = v.toString()
                    // Kotlin/JS represents integers as Double; strip trailing ".0"
                    if (s.endsWith(".0")) append(s.dropLast(2)) else append(s)
                }
                v is String        -> {
                    // String "null" originates from JsonNull.content; treat as JSON null.
                    // All other strings are actual string values.
                    if (v == "null") {
                        append("null")
                    } else {
                        append('"')
                        append(v.replace("\\", "\\\\").replace("\"", "\\\""))
                        append('"')
                    }
                }
                v is List<*>       -> {
                    append('[')
                    var first = true
                    for (elem in v) { if (!first) append(','); first = false; appendJsonValue(elem) }
                    append(']')
                }
                v is Map<*, *>     -> appendJsonObject(v)
                else               -> append(v.toString())
            }
        }

        override suspend fun updateDocument(collection: String, id: String, updates: Map<String, Any?>) {}
        override suspend fun deleteDocument(collection: String, id: String) { store[collection]?.remove(id) }
        override suspend fun listDocuments(collection: String): List<String> = store[collection]?.keys?.toList() ?: emptyList()
        override suspend fun createDocument(collection: String, data: Map<String, Any?>, id: String?): String = id ?: "generated"
        override fun <T> subscribeToDocument(collection: String, id: String, serializer: (String) -> T, listener: (T?) -> Unit): () -> Unit = {}
        override suspend fun <T> query(query: NexusQuery, serializer: (String) -> T): List<T> = emptyList()
        override fun <T> subscribeToQuery(query: NexusQuery, serializer: (String) -> T, listener: (List<T>) -> Unit): () -> Unit = {}
        override suspend fun batchWrite(operations: List<BatchOperation>) {}
    }

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

    // ── Helpers ──────────────────────────────────────────────────────────────

    private val json = Json { ignoreUnknownKeys = true; encodeDefaults = true }

    private fun hub(dataLayer: FakeNexusDataLayer? = null): Triple<ActionHub, FakeNeuralProjectionService, FakeSpineEventBus> {
        val nsv = FakeNeuralProjectionService()
        val bus = FakeSpineEventBus()
        return Triple(ActionHub(nsv, bus, dataLayer), nsv, bus)
    }

    private fun FakeNexusDataLayer.prefillLedger(uid: String, profile: LedgerProfile) =
        prefill("ledger_profiles", uid, profile, json, LedgerProfile.serializer())

    private fun FakeNexusDataLayer.prefillAtlas(uid: String, profile: AtlasProfile) =
        prefill("atlas_profiles", uid, profile, json, AtlasProfile.serializer())

    private fun FakeNexusDataLayer.loadedLedger(uid: String): LedgerProfile {
        val raw = getStoredJson("ledger_profiles", uid)
            ?: error("No ledger profile stored for uid=$uid. Store keys: ${getCollectionKeys("ledger_profiles")}")
        return json.decodeFromString(LedgerProfile.serializer(), raw)
    }

    private fun FakeNexusDataLayer.loadedAtlas(uid: String): AtlasProfile {
        val raw = getStoredJson("atlas_profiles", uid)
            ?: error("No atlas profile stored for uid=$uid. Store keys: ${getCollectionKeys("atlas_profiles")}")
        return json.decodeFromString(AtlasProfile.serializer(), raw)
    }

    // ── Agnes tests ───────────────────────────────────────────────────────────

    @Test
    fun crisisFlag_writesStressLoadToNsvAndEmitsEvent() = runTest {
        val (actionHub, nsv, bus) = hub()

        actionHub.execute(ActionCall(
            type = "crisis_flag",
            payload = buildJsonObject { put("trigger", "panic"); put("severity", "high") },
            moduleId = "agnes"
        ))

        assertTrue(nsv.updates.any { it["emotional.stressLoad"] == 10.0 })
        assertTrue(bus.events.any { it.type == "CRISIS_DETECTED" && it.domain == "E" })
    }

    // ── Ledger transaction tests ──────────────────────────────────────────────

    @Test
    fun createTransaction_persistsToProfileAndEmitsEvent() = runTest {
        val dl = FakeNexusDataLayer()
        val (actionHub, _, bus) = hub(dl)

        actionHub.execute(ActionCall(
            type = "create_transaction",
            payload = buildJsonObject {
                put("amount", 42.5)
                put("description", "Coffee")
                put("type", "expense")
                put("category", "Food & Dining")
                put("date", "2026-03-31")
            },
            userId = "u1",
            moduleId = "ledger"
        ))

        val profile = dl.loadedLedger("u1")
        assertEquals(1, profile.transactions.size)
        val tx = profile.transactions.first()
        assertEquals(42.5, tx.amount)
        assertEquals("Coffee", tx.description)
        assertEquals("expense", tx.type)
        assertEquals("Food & Dining", tx.category)
        assertTrue(bus.events.any { it.type == "TRANSACTION_CREATED" })
    }

    @Test
    fun createTransaction_withoutUserId_doesNotPersist() = runTest {
        val dl = FakeNexusDataLayer()
        val (actionHub, _, _) = hub(dl)

        actionHub.execute(ActionCall(
            type = "create_transaction",
            payload = buildJsonObject { put("amount", 10.0) },
            userId = null,
            moduleId = "ledger"
        ))

        assertEquals(null, dl.getStoredJson("ledger_profiles", ""))
    }

    @Test
    fun updateTransaction_patchesExistingTransaction() = runTest {
        val dl = FakeNexusDataLayer()
        val existing = LedgerProfile(
            transactions = listOf(LedgerTransaction(id = "tx1", amount = 10.0, description = "Old", category = "Other", type = "expense", date = "2026-01-01"))
        )
        dl.prefillLedger("u1", existing)
        val (actionHub, _, bus) = hub(dl)

        actionHub.execute(ActionCall(
            type = "update_transaction",
            payload = buildJsonObject {
                put("id", "tx1")
                put("amount", 99.0)
                put("category", "Transport")
            },
            userId = "u1",
            moduleId = "ledger"
        ))

        val profile = dl.loadedLedger("u1")
        assertEquals(1, profile.transactions.size)
        val tx = profile.transactions.first()
        assertEquals(99.0, tx.amount)
        assertEquals("Transport", tx.category)
        assertEquals("Old", tx.description) // unchanged field preserved
        assertTrue(bus.events.any { it.type == "TRANSACTION_UPDATED" })
    }

    @Test
    fun deleteTransaction_removesTransactionFromProfile() = runTest {
        val dl = FakeNexusDataLayer()
        dl.prefillLedger("u1", LedgerProfile(
            transactions = listOf(
                LedgerTransaction(id = "tx1", amount = 5.0),
                LedgerTransaction(id = "tx2", amount = 10.0)
            )
        ))
        val (actionHub, _, bus) = hub(dl)

        actionHub.execute(ActionCall(
            type = "delete_transaction",
            payload = buildJsonObject { put("id", "tx1") },
            userId = "u1",
            moduleId = "ledger"
        ))

        val profile = dl.loadedLedger("u1")
        assertEquals(1, profile.transactions.size)
        assertEquals("tx2", profile.transactions.first().id)
        assertTrue(bus.events.any { it.type == "TRANSACTION_DELETED" })
    }

    @Test
    fun addTransaction_persistsAndEmitsEvent() = runTest {
        val dl = FakeNexusDataLayer()
        val (actionHub, _, bus) = hub(dl)

        actionHub.execute(ActionCall(
            type = "add_transaction",
            payload = buildJsonObject {
                put("amount", 20.0)
                put("type", "income")
                put("category", "Salary")
                put("description", "Freelance")
                put("date", "2026-03-31")
            },
            userId = "u1",
            moduleId = "ledger"
        ))

        val profile = dl.loadedLedger("u1")
        assertEquals(1, profile.transactions.size)
        assertEquals("income", profile.transactions.first().type)
        assertTrue(bus.events.any { it.type == "TRANSACTION_CREATED" })
    }

    // ── Ledger budget tests ───────────────────────────────────────────────────

    @Test
    fun createBudget_persistsToBudgetCategoriesAndEmitsEvent() = runTest {
        val dl = FakeNexusDataLayer()
        val (actionHub, _, bus) = hub(dl)

        actionHub.execute(ActionCall(
            type = "create_budget",
            payload = buildJsonObject {
                put("name", "Groceries")
                put("allocated", 500.0)
            },
            userId = "u1",
            moduleId = "ledger"
        ))

        val profile = dl.loadedLedger("u1")
        assertEquals(1, profile.budgetCategories.size)
        assertEquals("Groceries", profile.budgetCategories.first().name)
        assertEquals(500.0, profile.budgetCategories.first().allocated)
        assertTrue(bus.events.any { it.type == "BUDGET_CREATED" })
    }

    @Test
    fun updateBudget_patchesExistingCategory() = runTest {
        val dl = FakeNexusDataLayer()
        dl.prefillLedger("u1", LedgerProfile(
            budgetCategories = listOf(
                com.agnes.nexus.core.domain.models.LedgerBudgetCategory(id = "b1", name = "Food", allocated = 300.0)
            )
        ))
        val (actionHub, _, bus) = hub(dl)

        actionHub.execute(ActionCall(
            type = "update_budget",
            payload = buildJsonObject { put("id", "b1"); put("allocated", 450.0) },
            userId = "u1",
            moduleId = "ledger"
        ))

        val profile = dl.loadedLedger("u1")
        assertEquals(450.0, profile.budgetCategories.first().allocated)
        assertEquals("Food", profile.budgetCategories.first().name) // unchanged
        assertTrue(bus.events.any { it.type == "BUDGET_UPDATED" })
    }

    // ── Ledger goal tests ─────────────────────────────────────────────────────

    @Test
    fun setFinancialGoal_persistsGoalAndEmitsEvent() = runTest {
        val dl = FakeNexusDataLayer()
        val (actionHub, _, bus) = hub(dl)

        actionHub.execute(ActionCall(
            type = "set_financial_goal",
            payload = buildJsonObject {
                put("name", "Emergency Fund")
                put("targetAmount", 10000.0)
                put("type", "savings")
                put("priority", "high")
            },
            userId = "u1",
            moduleId = "ledger"
        ))

        val profile = dl.loadedLedger("u1")
        assertEquals(1, profile.financialGoals.size)
        val goal = profile.financialGoals.first()
        assertEquals("Emergency Fund", goal.name)
        assertEquals(10000.0, goal.targetAmount)
        assertEquals("high", goal.priority)
        assertTrue(bus.events.any { it.type == "GOAL_CREATED" })
    }

    @Test
    fun updateGoalProgress_appliesDeltaToCurrentAmount() = runTest {
        val dl = FakeNexusDataLayer()
        dl.prefillLedger("u1", LedgerProfile(
            financialGoals = listOf(LedgerFinancialGoal(id = "g1", name = "Car", targetAmount = 5000.0, currentAmount = 1000.0))
        ))
        val (actionHub, _, bus) = hub(dl)

        actionHub.execute(ActionCall(
            type = "update_goal_progress",
            payload = buildJsonObject { put("goalId", "g1"); put("delta", 500.0) },
            userId = "u1",
            moduleId = "ledger"
        ))

        val profile = dl.loadedLedger("u1")
        assertEquals(1500.0, profile.financialGoals.first().currentAmount)
        assertTrue(bus.events.any { it.type == "GOAL_PROGRESS" })
    }

    @Test
    fun updateGoalProgress_setsNewAmountDirectly() = runTest {
        val dl = FakeNexusDataLayer()
        dl.prefillLedger("u1", LedgerProfile(
            financialGoals = listOf(LedgerFinancialGoal(id = "g1", targetAmount = 5000.0, currentAmount = 0.0))
        ))
        val (actionHub, _, _) = hub(dl)

        actionHub.execute(ActionCall(
            type = "update_goal_progress",
            payload = buildJsonObject { put("goalId", "g1"); put("newAmount", 3000.0) },
            userId = "u1",
            moduleId = "ledger"
        ))

        assertEquals(3000.0, dl.loadedLedger("u1").financialGoals.first().currentAmount)
    }

    @Test
    fun completeGoal_setsCurrentAmountToTarget() = runTest {
        val dl = FakeNexusDataLayer()
        dl.prefillLedger("u1", LedgerProfile(
            financialGoals = listOf(LedgerFinancialGoal(id = "g1", targetAmount = 2000.0, currentAmount = 500.0))
        ))
        val (actionHub, _, bus) = hub(dl)

        actionHub.execute(ActionCall(
            type = "complete_goal",
            payload = buildJsonObject { put("goalId", "g1") },
            userId = "u1",
            moduleId = "ledger"
        ))

        val goal = dl.loadedLedger("u1").financialGoals.first()
        assertEquals(goal.targetAmount, goal.currentAmount)
        assertTrue(bus.events.any { it.type == "GOAL_COMPLETED" })
    }

    @Test
    fun goalProgress_updatesCurrentAmountWhenDeltaProvided() = runTest {
        val dl = FakeNexusDataLayer()
        dl.prefillLedger("u1", LedgerProfile(
            financialGoals = listOf(LedgerFinancialGoal(id = "g1", targetAmount = 1000.0, currentAmount = 200.0))
        ))
        val (actionHub, _, _) = hub(dl)

        actionHub.execute(ActionCall(
            type = "goal_progress",
            payload = buildJsonObject { put("goalId", "g1"); put("delta", 100.0) },
            userId = "u1",
            moduleId = "ledger"
        ))

        assertEquals(300.0, dl.loadedLedger("u1").financialGoals.first().currentAmount)
    }

    // ── Atlas tests ───────────────────────────────────────────────────────────

    @Test
    fun habitStreakBroken_resetsStreakToZeroAndUpdatesNsv() = runTest {
        val dl = FakeNexusDataLayer()
        dl.prefillAtlas("u1", AtlasProfile(
            habits = listOf(AtlasHabit(id = "h1", title = "Run", currentStreak = 14))
        ))
        val (actionHub, nsv, bus) = hub(dl)

        actionHub.execute(ActionCall(
            type = "habit_streak_broken",
            payload = buildJsonObject { put("habitId", "h1"); put("streakHealth", 2.0) },
            userId = "u1",
            moduleId = "atlas"
        ))

        val profile = dl.loadedAtlas("u1")
        assertEquals(0, profile.habits.first().currentStreak)
        assertTrue(nsv.updates.any { it.containsKey("planning.streakHealth") })
        assertTrue(bus.events.any { it.type == "HABIT_STREAK_BROKEN" })
    }

    @Test
    fun habitStreakBroken_withoutHabitId_stillUpdatesNsvAndEmitsEvent() = runTest {
        val dl = FakeNexusDataLayer()
        val (actionHub, nsv, bus) = hub(dl)

        actionHub.execute(ActionCall(
            type = "habit_streak_broken",
            payload = buildJsonObject { put("streakDays", 7) },
            userId = "u1",
            moduleId = "atlas"
        ))

        assertTrue(nsv.updates.any { it.containsKey("planning.streakHealth") })
        assertTrue(bus.events.any { it.type == "HABIT_STREAK_BROKEN" })
    }

    @Test
    fun journalEntryCreated_persistsEntryAndEmitsEvent() = runTest {
        val dl = FakeNexusDataLayer()
        val (actionHub, _, bus) = hub(dl)

        actionHub.execute(ActionCall(
            type = "journal_entry_created",
            payload = buildJsonObject {
                put("freeText", "Felt great today")
                put("emojiRating", 5)
                put("date", "2026-03-31")
            },
            userId = "u1",
            moduleId = "atlas"
        ))

        val profile = dl.loadedAtlas("u1")
        assertEquals(1, profile.journalEntries.size)
        val entry = profile.journalEntries.first()
        assertEquals("Felt great today", entry.freeText)
        assertEquals(5, entry.emojiRating)
        assertTrue(bus.events.any { it.type == "JOURNAL_ENTRY_CREATED" })
    }

    @Test
    fun journalEntryCreated_capsAtFiveHundredEntries() = runTest {
        val dl = FakeNexusDataLayer()
        val existingEntries = (1..500).map {
            com.agnes.nexus.core.domain.models.AtlasJournalEntry(id = "e$it", freeText = "old")
        }
        dl.prefillAtlas("u1", AtlasProfile(journalEntries = existingEntries))
        val (actionHub, _, _) = hub(dl)

        actionHub.execute(ActionCall(
            type = "journal_entry_created",
            payload = buildJsonObject { put("freeText", "new entry") },
            userId = "u1",
            moduleId = "atlas"
        ))

        val profile = dl.loadedAtlas("u1")
        assertEquals(500, profile.journalEntries.size)
        assertEquals("new entry", profile.journalEntries.first().freeText)
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

        // Verify SchemaRegistry has the extension (state-based assertion)
        val extensions = SchemaRegistry.getExtensions("soma")
        assertEquals(1, extensions.size)
        assertEquals("mood_score", extensions.first().id)

        // Verify SOMA_FIELD_CREATED event was emitted by ActionHub synchronously.
        // NOTE: SchemaRegistry also emits SCHEMA_EXTENDED asynchronously via its own
        // CoroutineScope (Dispatchers.Default), which is outside the runTest scheduler,
        // so we only assert the synchronous ActionHub event here.
        assertTrue(bus.events.any { it.type == "SOMA_FIELD_CREATED" })

        val fieldEvent = bus.events.find { it.type == "SOMA_FIELD_CREATED" }!!
        assertEquals("mood_score", fieldEvent.data["fieldId"])
    }
}
