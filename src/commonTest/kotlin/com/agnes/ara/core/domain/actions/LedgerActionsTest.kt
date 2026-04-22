package com.agnes.ara.core.domain.actions

import com.agnes.ara.core.domain.models.ActionCall
import com.agnes.ara.core.domain.models.EncryptedEnvelope
import com.agnes.ara.core.domain.models.NeuralStateVector
import com.agnes.ara.core.domain.services.CascadeRule
import com.agnes.ara.core.domain.services.NeuralProjectionService
import com.agnes.ara.core.domain.services.AraSettings
import com.agnes.ara.core.domain.services.AraDataLayer
import com.agnes.ara.core.domain.services.SpineEvent
import com.agnes.ara.core.domain.services.SpineEventBus
import com.agnes.ara.core.domain.services.SpineEventFilter
import com.agnes.ara.core.domain.services.SpineEventPayload
import com.agnes.ara.core.domain.services.VaultBoundary
import com.agnes.ara.core.domain.services.BatchOperation
import com.agnes.ara.core.domain.services.AraQuery
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
import kotlin.test.assertNotNull

class LedgerActionsTest {

    // ========================================
    // Fake Implementations
    // ========================================

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

        override fun <T> subscribeToDocument(collection: String, id: String, serializer: (String) -> T, listener: (T?) -> Unit): () -> Unit = {}

        override suspend fun <T> query(query: AraQuery, serializer: (String) -> T): List<T> = emptyList()

        override fun <T> subscribeToQuery(query: AraQuery, serializer: (String) -> T, listener: (List<T>) -> Unit): () -> Unit = {}

        override suspend fun batchWrite(operations: List<BatchOperation>) {}
    }

    class FakeVaultBoundary : VaultBoundary {
        override suspend fun encrypt(plaintext: String, secretKey: String): EncryptedEnvelope =
            EncryptedEnvelope(ciphertext = "encrypted", iv = "iv", version = 1)

        override suspend fun decrypt(envelope: EncryptedEnvelope, secretKey: String): String = "decrypted"

        override suspend fun deriveKey(password: String, salt: String): String = "derived_key"
    }

    // ========================================
    // Test Setup
    // ========================================

    private lateinit var nsv: FakeNeuralProjectionService
    private lateinit var bus: FakeSpineEventBus
    private lateinit var settings: FakeAraSettings
    private lateinit var dataLayer: FakeDataLayer
    private lateinit var vault: FakeVaultBoundary
    private lateinit var actionHub: ActionHub

    @BeforeTest
    fun setup() {
        nsv = FakeNeuralProjectionService()
        bus = FakeSpineEventBus()
        settings = FakeAraSettings()
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

    // ========================================
    // set_financial_goal Action Tests
    // ========================================

    @Test
    fun setFinancialGoal_withValidPayload_emitsGoalCreatedEvent() = runTest {
        val payload = buildJsonObject {
            put("name", "Emergency Fund")
            put("type", "savings")
            put("targetAmount", 10000.0)
            put("monthlyContribution", 500.0)
            put("priority", "high")
        }

        val call = ActionCall(
            type = "set_financial_goal",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        val event = bus.events.first()
        assertEquals("GOAL_CREATED", event.type)
        assertEquals("ledger", event.source)
        assertEquals("R", event.domain)

        val data = event.data as Map<*, *>
        assertEquals("Emergency Fund", data["name"])
        assertEquals("savings", data["type"])
        assertEquals(10000.0, data["targetAmount"])
        assertEquals(500.0, data["monthlyContribution"])
        assertEquals("high", data["priority"])
    }

    @Test
    fun setFinancialGoal_withMissingName_doesNotEmitEvent() = runTest {
        val payload = buildJsonObject {
            put("type", "savings")
            put("targetAmount", 10000.0)
        }

        val call = ActionCall(
            type = "set_financial_goal",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(0, bus.events.size)
    }

    @Test
    fun setFinancialGoal_withMissingTargetAmount_doesNotEmitEvent() = runTest {
        val payload = buildJsonObject {
            put("name", "Emergency Fund")
            put("type", "savings")
        }

        val call = ActionCall(
            type = "set_financial_goal",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(0, bus.events.size)
    }

    @Test
    fun setFinancialGoal_withDefaultValues_usesDefaults() = runTest {
        val payload = buildJsonObject {
            put("name", "Vacation Fund")
            put("targetAmount", 5000.0)
        }

        val call = ActionCall(
            type = "set_financial_goal",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        val data = bus.events.first().data as Map<*, *>
        assertEquals("savings", data["type"])
        assertEquals(0.0, data["monthlyContribution"])
        assertEquals("medium", data["priority"])
    }

    @Test
    fun setFinancialGoal_withDifferentGoalTypes_acceptsAllTypes() = runTest {
        val goalTypes = listOf("savings", "debt_payoff", "investment", "emergency", "retirement")

        goalTypes.forEach { goalType ->
            bus.events.clear()

            val payload = buildJsonObject {
                put("name", "Goal for $goalType")
                put("type", goalType)
                put("targetAmount", 1000.0)
            }

            val call = ActionCall(
                type = "set_financial_goal",
                payload = payload,
                moduleId = "ledger"
            )

            actionHub.execute(call)

            assertEquals(1, bus.events.size, "Should emit event for goal type: $goalType")
            val data = bus.events.first().data as Map<*, *>
            assertEquals(goalType, data["type"])
        }
    }

    // ========================================
    // update_goal_progress Action Tests
    // ========================================

    @Test
    fun updateGoalProgress_withDelta_emitsGoalProgressEvent() = runTest {
        val payload = buildJsonObject {
            put("goalId", "goal-123")
            put("delta", 250.0)
        }

        val call = ActionCall(
            type = "update_goal_progress",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        val event = bus.events.first()
        assertEquals("GOAL_PROGRESS", event.type)
        assertEquals("ledger", event.source)

        val data = event.data as Map<*, *>
        assertEquals("goal-123", data["goalId"])
        assertEquals(250.0, data["delta"])
    }

    @Test
    fun updateGoalProgress_withNewAmount_emitsGoalProgressEvent() = runTest {
        val payload = buildJsonObject {
            put("goalId", "goal-456")
            put("newAmount", 1500.0)
        }

        val call = ActionCall(
            type = "update_goal_progress",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        val data = bus.events.first().data as Map<*, *>
        assertEquals("goal-456", data["goalId"])
        assertEquals(1500.0, data["newAmount"])
    }

    @Test
    fun updateGoalProgress_withMissingGoalId_doesNotEmitEvent() = runTest {
        val payload = buildJsonObject {
            put("delta", 100.0)
        }

        val call = ActionCall(
            type = "update_goal_progress",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(0, bus.events.size)
    }

    @Test
    fun updateGoalProgress_withBothDeltaAndNewAmount_includesBoth() = runTest {
        val payload = buildJsonObject {
            put("goalId", "goal-789")
            put("delta", 100.0)
            put("newAmount", 2000.0)
        }

        val call = ActionCall(
            type = "update_goal_progress",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        val data = bus.events.first().data as Map<*, *>
        assertEquals(100.0, data["delta"])
        assertEquals(2000.0, data["newAmount"])
    }

    // ========================================
    // update_financial_friction Action Tests
    // ========================================

    @Test
    fun updateFinancialFriction_withValidScore_updatesNsvAndEmitsEvent() = runTest {
        val payload = buildJsonObject {
            put("score", 5.5)
        }

        val call = ActionCall(
            type = "update_financial_friction",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        // Verify NSV update
        assertEquals(1, nsv.updates.size)
        assertEquals(5.5, nsv.updates.first()["resource.financialFriction"])

        // Verify event emission
        assertEquals(1, bus.events.size)
        val event = bus.events.first()
        assertEquals("FINANCIAL_FRICTION_CHANGED", event.type)
        assertEquals("ledger", event.source)
        assertEquals("R", event.domain)

        val data = event.data as Map<*, *>
        assertEquals(5.5, data["newScore"])
        assertEquals("elevated", data["tier"]) // 5.5 > 5.0, so it's "elevated"
    }

    @Test
    fun updateFinancialFriction_scoreAbove10_doesNotUpdate() = runTest {
        val payload = buildJsonObject {
            put("score", 11.0)
        }

        val call = ActionCall(
            type = "update_financial_friction",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(0, nsv.updates.size)
        assertEquals(0, bus.events.size)
    }

    @Test
    fun updateFinancialFriction_scoreBelow0_doesNotUpdate() = runTest {
        val payload = buildJsonObject {
            put("score", -1.0)
        }

        val call = ActionCall(
            type = "update_financial_friction",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(0, nsv.updates.size)
        assertEquals(0, bus.events.size)
    }

    @Test
    fun updateFinancialFriction_missingScore_doesNotUpdate() = runTest {
        val payload = buildJsonObject {
            put("other", "value")
        }

        val call = ActionCall(
            type = "update_financial_friction",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(0, nsv.updates.size)
        assertEquals(0, bus.events.size)
    }

    @Test
    fun updateFinancialFriction_boundaryScore0_isValid() = runTest {
        val payload = buildJsonObject {
            put("score", 0.0)
        }

        val call = ActionCall(
            type = "update_financial_friction",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, nsv.updates.size)
        assertEquals(1, bus.events.size)
        val data = bus.events.first().data as Map<*, *>
        assertEquals("low", data["tier"])
    }

    @Test
    fun updateFinancialFriction_boundaryScore10_isValid() = runTest {
        val payload = buildJsonObject {
            put("score", 10.0)
        }

        val call = ActionCall(
            type = "update_financial_friction",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, nsv.updates.size)
        assertEquals(1, bus.events.size)
        val data = bus.events.first().data as Map<*, *>
        assertEquals("critical", data["tier"])
    }

    // ========================================
    // Friction Tier Mapping Tests
    // ========================================

    @Test
    fun frictionTier_score0to2_mapsToLow() = runTest {
        val testScores = listOf(0.0, 1.0, 1.5, 2.0)

        testScores.forEach { score ->
            bus.events.clear()
            nsv.updates.clear()

            val payload = buildJsonObject {
                put("score", score)
            }

            val call = ActionCall(
                type = "update_financial_friction",
                payload = payload,
                moduleId = "ledger"
            )

            actionHub.execute(call)

            val data = bus.events.first().data as Map<*, *>
            assertEquals("low", data["tier"], "Score $score should map to 'low' tier")
        }
    }

    @Test
    fun frictionTier_score2to5_mapsToModerate() = runTest {
        val testScores = listOf(2.1, 3.0, 4.0, 5.0)

        testScores.forEach { score ->
            bus.events.clear()
            nsv.updates.clear()

            val payload = buildJsonObject {
                put("score", score)
            }

            val call = ActionCall(
                type = "update_financial_friction",
                payload = payload,
                moduleId = "ledger"
            )

            actionHub.execute(call)

            val data = bus.events.first().data as Map<*, *>
            assertEquals("moderate", data["tier"], "Score $score should map to 'moderate' tier")
        }
    }

    @Test
    fun frictionTier_score5to7_mapsToElevated() = runTest {
        val testScores = listOf(5.1, 6.0, 7.0)

        testScores.forEach { score ->
            bus.events.clear()
            nsv.updates.clear()

            val payload = buildJsonObject {
                put("score", score)
            }

            val call = ActionCall(
                type = "update_financial_friction",
                payload = payload,
                moduleId = "ledger"
            )

            actionHub.execute(call)

            val data = bus.events.first().data as Map<*, *>
            assertEquals("elevated", data["tier"], "Score $score should map to 'elevated' tier")
        }
    }

    @Test
    fun frictionTier_scoreAbove7_mapsToCritical() = runTest {
        val testScores = listOf(7.1, 8.0, 9.0, 10.0)

        testScores.forEach { score ->
            bus.events.clear()
            nsv.updates.clear()

            val payload = buildJsonObject {
                put("score", score)
            }

            val call = ActionCall(
                type = "update_financial_friction",
                payload = payload,
                moduleId = "ledger"
            )

            actionHub.execute(call)

            val data = bus.events.first().data as Map<*, *>
            assertEquals("critical", data["tier"], "Score $score should map to 'critical' tier")
        }
    }

    // ========================================
    // compute_resonance_roi Action Tests
    // ========================================

    @Test
    fun computeResonanceRoi_withValidValues_updatesNsvAndEmitsEvent() = runTest {
        val payload = buildJsonObject {
            put("financialFriction", 4.0)
            put("resonanceROI", 0.75)
        }

        val call = ActionCall(
            type = "compute_resonance_roi",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        // Verify NSV updates
        assertEquals(1, nsv.updates.size)
        val update = nsv.updates.first()
        assertEquals(4.0, update["resource.financialFriction"])
        assertEquals(0.75, update["resource.resonanceROI"])

        // Verify event emission
        assertEquals(1, bus.events.size)
        val event = bus.events.first()
        assertEquals("RESONANCE_ROI_UPDATED", event.type)
        assertEquals("ledger", event.source)

        val data = event.data as Map<*, *>
        assertEquals(0.75, data["newROI"])
        assertEquals(4.0, data["newFriction"])
    }

    @Test
    fun computeResonanceRoi_missingFriction_doesNotUpdate() = runTest {
        val payload = buildJsonObject {
            put("resonanceROI", 0.5)
        }

        val call = ActionCall(
            type = "compute_resonance_roi",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(0, nsv.updates.size)
        assertEquals(0, bus.events.size)
    }

    @Test
    fun computeResonanceRoi_missingRoi_doesNotUpdate() = runTest {
        val payload = buildJsonObject {
            put("financialFriction", 3.0)
        }

        val call = ActionCall(
            type = "compute_resonance_roi",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(0, nsv.updates.size)
        assertEquals(0, bus.events.size)
    }

    @Test
    fun computeResonanceRoi_withBoundaryValues_succeeds() = runTest {
        val payload = buildJsonObject {
            put("financialFriction", 0.0)
            put("resonanceROI", 0.0)
        }

        val call = ActionCall(
            type = "compute_resonance_roi",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, nsv.updates.size)
        assertEquals(1, bus.events.size)
    }

    @Test
    fun computeResonanceRoi_withHighValues_succeeds() = runTest {
        val payload = buildJsonObject {
            put("financialFriction", 10.0)
            put("resonanceROI", 1.0)
        }

        val call = ActionCall(
            type = "compute_resonance_roi",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, nsv.updates.size)
        assertEquals(1, bus.events.size)

        val data = bus.events.first().data as Map<*, *>
        assertEquals(1.0, data["newROI"])
        assertEquals(10.0, data["newFriction"])
    }

    // ========================================
    // add_transaction Action Tests
    // ========================================

    @Test
    fun addTransaction_withValidPayload_emitsTransactionCreatedEvent() = runTest {
        val payload = buildJsonObject {
            put("amount", 150.0)
            put("type", "expense")
            put("category", "Groceries")
            put("date", "2024-01-15")
            put("description", "Weekly groceries")
            put("note", "Bought organic produce")
        }

        val call = ActionCall(
            type = "add_transaction",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        val event = bus.events.first()
        assertEquals("TRANSACTION_CREATED", event.type)
        assertEquals("ledger", event.source)
        assertEquals("R", event.domain)

        val data = event.data as Map<*, *>
        assertEquals(150.0, data["amount"])
        assertEquals("expense", data["type"])
        assertEquals("Groceries", data["category"])
    }

    @Test
    fun addTransaction_missingAmount_doesNotEmitEvent() = runTest {
        val payload = buildJsonObject {
            put("type", "expense")
            put("category", "Food")
        }

        val call = ActionCall(
            type = "add_transaction",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(0, bus.events.size)
    }

    @Test
    fun addTransaction_withDefaultValues_usesDefaults() = runTest {
        val payload = buildJsonObject {
            put("amount", 50.0)
        }

        val call = ActionCall(
            type = "add_transaction",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        val data = bus.events.first().data as Map<*, *>
        assertEquals("expense", data["type"])
        assertEquals("Other", data["category"])
        assertEquals("", data["description"])
    }

    @Test
    fun addTransaction_withIncomeType_succeeds() = runTest {
        val payload = buildJsonObject {
            put("amount", 3000.0)
            put("type", "income")
            put("category", "Salary")
            put("description", "Monthly salary")
        }

        val call = ActionCall(
            type = "add_transaction",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        val data = bus.events.first().data as Map<*, *>
        assertEquals("income", data["type"])
        assertEquals("Salary", data["category"])
    }

    @Test
    fun addTransaction_withZeroAmount_isValid() = runTest {
        val payload = buildJsonObject {
            put("amount", 0.0)
            put("type", "expense")
        }

        val call = ActionCall(
            type = "add_transaction",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        val data = bus.events.first().data as Map<*, *>
        assertEquals(0.0, data["amount"])
    }

    // ========================================
    // detect_data_hint Action Tests
    // ========================================

    @Test
    fun detectDataHint_withHighConfidence_emitsEvent() = runTest {
        val payload = buildJsonObject {
            put("sourceModule", "ledger")
            put("targetModule", "soma")
            put("field", "stressLevel")
            put("inferredValue", "high")
            put("confidence", 0.85)
        }

        val call = ActionCall(
            type = "detect_data_hint",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        val event = bus.events.first()
        assertEquals("DATA_HINT_DETECTED", event.type)
        assertEquals("ledger", event.source)
        assertEquals("C", event.domain) // Cross-module domain

        val data = event.data as Map<*, *>
        assertEquals("ledger", data["sourceModule"])
        assertEquals("soma", data["targetModule"])
        assertEquals("stressLevel", data["field"])
        assertEquals("high", data["inferredValue"])
        assertEquals(0.85, data["confidence"])
    }

    @Test
    fun detectDataHint_withExactThresholdConfidence_emitsEvent() = runTest {
        val payload = buildJsonObject {
            put("sourceModule", "ledger")
            put("targetModule", "atlas")
            put("field", "productivity")
            put("inferredValue", "low")
            put("confidence", 0.75) // Exact threshold
        }

        val call = ActionCall(
            type = "detect_data_hint",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
    }

    @Test
    fun detectDataHint_withBelowThresholdConfidence_doesNotEmitEvent() = runTest {
        val payload = buildJsonObject {
            put("sourceModule", "ledger")
            put("targetModule", "soma")
            put("field", "mood")
            put("inferredValue", "anxious")
            put("confidence", 0.74) // Below 0.75 threshold
        }

        val call = ActionCall(
            type = "detect_data_hint",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(0, bus.events.size)
    }

    @Test
    fun detectDataHint_withZeroConfidence_doesNotEmitEvent() = runTest {
        val payload = buildJsonObject {
            put("sourceModule", "ledger")
            put("targetModule", "soma")
            put("field", "mood")
            put("inferredValue", "happy")
            put("confidence", 0.0)
        }

        val call = ActionCall(
            type = "detect_data_hint",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(0, bus.events.size)
    }

    @Test
    fun detectDataHint_missingTargetModule_doesNotEmitEvent() = runTest {
        val payload = buildJsonObject {
            put("sourceModule", "ledger")
            put("field", "stressLevel")
            put("inferredValue", "high")
            put("confidence", 0.9)
        }

        val call = ActionCall(
            type = "detect_data_hint",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(0, bus.events.size)
    }

    @Test
    fun detectDataHint_missingField_doesNotEmitEvent() = runTest {
        val payload = buildJsonObject {
            put("sourceModule", "ledger")
            put("targetModule", "soma")
            put("inferredValue", "high")
            put("confidence", 0.9)
        }

        val call = ActionCall(
            type = "detect_data_hint",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(0, bus.events.size)
    }

    @Test
    fun detectDataHint_missingInferredValue_doesNotEmitEvent() = runTest {
        val payload = buildJsonObject {
            put("sourceModule", "ledger")
            put("targetModule", "soma")
            put("field", "stressLevel")
            put("confidence", 0.9)
        }

        val call = ActionCall(
            type = "detect_data_hint",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(0, bus.events.size)
    }

    @Test
    fun detectDataHint_missingConfidence_defaultsToZeroAndDoesNotEmit() = runTest {
        val payload = buildJsonObject {
            put("sourceModule", "ledger")
            put("targetModule", "soma")
            put("field", "stressLevel")
            put("inferredValue", "high")
            // No confidence field - should default to 0.0
        }

        val call = ActionCall(
            type = "detect_data_hint",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(0, bus.events.size)
    }

    // ========================================
    // run_debt_simulation Action Tests
    // ========================================

    @Test
    fun runDebtSimulation_withAvalancheStrategy_emitsEvent() = runTest {
        val payload = buildJsonObject {
            put("strategy", "avalanche")
        }

        val call = ActionCall(
            type = "run_debt_simulation",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        val event = bus.events.first()
        assertEquals("DEBT_SIMULATION_RUN", event.type)
        assertEquals("ledger", event.source)
        assertEquals("R", event.domain)

        val data = event.data as Map<*, *>
        assertEquals("avalanche", data["strategy"])
    }

    @Test
    fun runDebtSimulation_withSnowballStrategy_emitsEvent() = runTest {
        val payload = buildJsonObject {
            put("strategy", "snowball")
        }

        val call = ActionCall(
            type = "run_debt_simulation",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        val data = bus.events.first().data as Map<*, *>
        assertEquals("snowball", data["strategy"])
    }

    @Test
    fun runDebtSimulation_withoutStrategy_usesDefaultAvalanche() = runTest {
        val payload = buildJsonObject {
            // No strategy specified
        }

        val call = ActionCall(
            type = "run_debt_simulation",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        val data = bus.events.first().data as Map<*, *>
        assertEquals("avalanche", data["strategy"])
    }

    @Test
    fun runDebtSimulation_withCustomStrategy_acceptsAnyValue() = runTest {
        val payload = buildJsonObject {
            put("strategy", "custom")
        }

        val call = ActionCall(
            type = "run_debt_simulation",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        val data = bus.events.first().data as Map<*, *>
        assertEquals("custom", data["strategy"])
    }

    // ========================================
    // complete_goal Action Tests
    // ========================================

    @Test
    fun completeGoal_withValidGoalId_emitsGoalCompletedEvent() = runTest {
        val payload = buildJsonObject {
            put("goalId", "goal-abc-123")
        }

        val call = ActionCall(
            type = "complete_goal",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        val event = bus.events.first()
        assertEquals("GOAL_COMPLETED", event.type)
        assertEquals("ledger", event.source)
        assertEquals("alert", event.priority)

        val data = event.data as Map<*, *>
        assertEquals("goal-abc-123", data["goalId"])
    }

    @Test
    fun completeGoal_missingGoalId_doesNotEmitEvent() = runTest {
        val payload = buildJsonObject {
            put("otherField", "value")
        }

        val call = ActionCall(
            type = "complete_goal",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(0, bus.events.size)
    }

    // ========================================
    // Empty/Invalid Payload Tests
    // ========================================

    @Test
    fun ledgerAction_withEmptyPayload_handlesGracefully() = runTest {
        val payload = buildJsonObject { }

        val call = ActionCall(
            type = "set_financial_goal",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(0, bus.events.size)
        assertEquals(0, nsv.updates.size)
    }

    @Test
    fun ledgerAction_withNullValues_handlesGracefully() = runTest {
        val payload = buildJsonObject {
            put("name", null as String?)
            put("targetAmount", null as Double?)
        }

        val call = ActionCall(
            type = "set_financial_goal",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(0, bus.events.size)
    }

    // ========================================
    // Event Domain Tests
    // ========================================

    @Test
    fun ledgerResourceEvents_haveDomainR() = runTest {
        val payload = buildJsonObject {
            put("name", "Test Goal")
            put("targetAmount", 1000.0)
        }

        val call = ActionCall(
            type = "set_financial_goal",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals("R", bus.events.first().domain)
    }

    @Test
    fun crossModuleEvents_haveDomainC() = runTest {
        val payload = buildJsonObject {
            put("sourceModule", "ledger")
            put("targetModule", "soma")
            put("field", "stress")
            put("inferredValue", "elevated")
            put("confidence", 0.9)
        }

        val call = ActionCall(
            type = "detect_data_hint",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals("C", bus.events.first().domain)
    }

    // ========================================
    // Focus Actions Tests
    // ========================================

    @Test
    fun focusIncome_emitsGuidedIntakeFocusEvent() = runTest {
        val payload = buildJsonObject { }

        val call = ActionCall(
            type = "focus_income",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        val event = bus.events.first()
        assertEquals("LEDGER_GUIDED_INTAKE_FOCUS", event.type)
        assertEquals("ledger", event.source)
    }

    @Test
    fun focusExpenses_emitsGuidedIntakeFocusEvent() = runTest {
        val payload = buildJsonObject { }

        val call = ActionCall(
            type = "focus_expenses",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        assertEquals("LEDGER_GUIDED_INTAKE_FOCUS", bus.events.first().type)
    }

    @Test
    fun focusDebtGoals_emitsGuidedIntakeFocusEvent() = runTest {
        val payload = buildJsonObject { }

        val call = ActionCall(
            type = "focus_debt_goals",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        assertEquals("LEDGER_GUIDED_INTAKE_FOCUS", bus.events.first().type)
    }

    @Test
    fun focusPlanHorizon_emitsGuidedIntakeFocusEvent() = runTest {
        val payload = buildJsonObject { }

        val call = ActionCall(
            type = "focus_plan_horizon",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        assertEquals("LEDGER_GUIDED_INTAKE_FOCUS", bus.events.first().type)
    }

    // ========================================
    // risk_detected Action Tests
    // ========================================

    @Test
    fun riskDetected_emitsRiskDetectedEvent() = runTest {
        val payload = buildJsonObject {
            put("pattern", "overspending")
            put("severity", "high")
            put("trigger", "monthly_budget_exceeded")
        }

        val call = ActionCall(
            type = "risk_detected",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        val event = bus.events.first()
        assertEquals("RISK_DETECTED", event.type)
        assertEquals("ledger", event.source)
        assertEquals("alert", event.priority)
    }

    // ========================================
    // query_reminders Action Tests
    // ========================================

    @Test
    fun queryReminders_emitsRemindersQueriedEvent() = runTest {
        val payload = buildJsonObject { }

        val call = ActionCall(
            type = "query_reminders",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        val event = bus.events.first()
        assertEquals("REMINDERS_QUERIED", event.type)
        assertEquals("ledger", event.source)
    }

    // ========================================
    // analyze_financial_document Action Tests
    // ========================================

    @Test
    fun analyzeFinancialDocument_emitsDocumentAnalyzedEvent() = runTest {
        val payload = buildJsonObject {
            put("monthlyIncome", 5000.0)
            put("currency", "EUR")
            put("periodLabel", "January 2024")
        }

        val call = ActionCall(
            type = "analyze_financial_document",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        val event = bus.events.first()
        assertEquals("DOCUMENT_ANALYZED", event.type)
        assertEquals("ledger", event.source)

        val data = event.data as Map<*, *>
        assertEquals(5000.0, data["monthlyIncome"])
        assertEquals("EUR", data["currency"])
        assertEquals("January 2024", data["periodLabel"])
    }

    @Test
    fun analyzeFinancialDocument_withEmptyPayload_usesDefaults() = runTest {
        val payload = buildJsonObject { }

        val call = ActionCall(
            type = "analyze_financial_document",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        val data = bus.events.first().data as Map<*, *>
        assertEquals(0.0, data["monthlyIncome"])
        assertEquals("USD", data["currency"])
        assertEquals("Unknown Period", data["periodLabel"])
    }

    // ========================================
    // financial_health_check Action Tests
    // ========================================

    @Test
    fun financialHealthCheck_emitsFinancialHealthCheckEvent() = runTest {
        val payload = buildJsonObject {
            put("checkType", "monthly")
        }

        val call = ActionCall(
            type = "financial_health_check",
            payload = payload,
            moduleId = "ledger"
        )

        actionHub.execute(call)

        assertEquals(1, bus.events.size)
        val event = bus.events.first()
        assertEquals("FINANCIAL_HEALTH_CHECK", event.type)
        assertEquals("ledger", event.source)
    }
}
