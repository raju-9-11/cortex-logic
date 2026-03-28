package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.models.BiologicalState
import com.agnes.nexus.core.domain.models.CognitiveState
import com.agnes.nexus.core.domain.models.EmotionalState
import com.agnes.nexus.core.domain.models.NeuralStateVector
import com.agnes.nexus.core.domain.models.PlanningState
import com.agnes.nexus.core.domain.models.ResourceState
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.TestScope
import kotlinx.coroutines.test.advanceUntilIdle
import kotlinx.coroutines.test.runTest
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

/**
 * Unit tests for NexusSynthesisService — cross-module conflict detection & resolution.
 */
@OptIn(ExperimentalCoroutinesApi::class)
class NexusSynthesisServiceTest {

    /**
     * Fake SpineEventBus that records emitted events for verification.
     */
    class FakeSpineEventBus : SpineEventBus {
        val emittedEvents = mutableListOf<SpineEventPayload>()
        
        override fun on(type: String, minPriority: String?): Flow<SpineEvent> = flowOf()
        
        override suspend fun emit(event: SpineEvent) {
            emittedEvents.add(
                SpineEventPayload(
                    type = event.type,
                    source = event.source,
                    domain = event.domain,
                    data = event.data,
                    priority = event.priority
                )
            )
        }
        
        override suspend fun emit(payload: SpineEventPayload): SpineEvent {
            emittedEvents.add(payload)
            return payload.toSpineEvent()
        }

        
        override fun registerCascadeRules(rules: List<CascadeRule>) {}
        override fun getRecentEvents(filter: SpineEventFilter?): List<SpineEvent> = emptyList()
        
        fun reset() { emittedEvents.clear() }
    }

    private fun createService(
        eventBus: SpineEventBus = FakeSpineEventBus(),
        scope: CoroutineScope = TestScope()
    ): NexusSynthesisService {
        return NexusSynthesisService(eventBus, scope)
    }

    // ═══════════════════════════════════════════════════════════════════════════════════
    // Test 1: detectConflicts_highCnsFatigueAndLowResilience_returnsTherapyFatigueConflict
    // ═══════════════════════════════════════════════════════════════════════════════════

    @Test
    fun detectConflicts_highCnsFatigueAndLowResilience_returnsTherapyFatigueConflict() {
        val service = createService()
        
        // NSV with high CNS fatigue (>=7) and low emotional resilience (0-4)
        val nsv = NeuralStateVector(
            biological = BiologicalState(cnsFatigue = 8.0),
            emotional = EmotionalState(emotionalResilience = 3.0)
        )
        
        val conflicts = service.detectConflicts(nsv)
        
        // Should detect CONFLICT_THERAPY_FATIGUE
        val therapyFatigueConflict = conflicts.find { it.id == "CONFLICT_THERAPY_FATIGUE" }
        assertNotNull(therapyFatigueConflict, "Should detect therapy fatigue conflict")
        assertEquals("Titan ↔ Agnes — Intensity / Therapy Timing", therapyFatigueConflict.title)
        assertTrue(therapyFatigueConflict.affectedModules.contains("titan"))
        assertTrue(therapyFatigueConflict.affectedModules.contains("agnes"))
        assertEquals(NexusSynthesisService.ConflictSeverity.BLOCK, therapyFatigueConflict.severity)
    }

    @Test
    fun detectConflicts_moderateFatigueAndResilience_noTherapyFatigueConflict() {
        val service = createService()
        
        // NSV with moderate values that don't trigger conflict
        val nsv = NeuralStateVector(
            biological = BiologicalState(cnsFatigue = 5.0),
            emotional = EmotionalState(emotionalResilience = 6.0)
        )
        
        val conflicts = service.detectConflicts(nsv)
        
        // Should NOT detect CONFLICT_THERAPY_FATIGUE
        val therapyFatigueConflict = conflicts.find { it.id == "CONFLICT_THERAPY_FATIGUE" }
        assertTrue(therapyFatigueConflict == null, "Should not detect therapy fatigue conflict with moderate values")
    }

    // ═══════════════════════════════════════════════════════════════════════════════════
    // Test 2: detectConflicts_highFinancialFrictionAndStress_returnsFinancialStressConflict
    // ═══════════════════════════════════════════════════════════════════════════════════

    @Test
    fun detectConflicts_highFinancialFrictionAndStress_returnsFinancialStressConflict() {
        val service = createService()
        
        // NSV with high financial friction (>=7) and high stress (>=6)
        val nsv = NeuralStateVector(
            emotional = EmotionalState(stressLoad = 7.0),
            resource = ResourceState(financialFriction = 8.0)
        )
        
        val conflicts = service.detectConflicts(nsv)
        
        // Should detect CONFLICT_FINANCIAL_STRESS
        val financialStressConflict = conflicts.find { it.id == "CONFLICT_FINANCIAL_STRESS" }
        assertNotNull(financialStressConflict, "Should detect financial stress conflict")
        assertEquals("Ledger ↔ Agnes — Financial Stress Loop", financialStressConflict.title)
        assertTrue(financialStressConflict.affectedModules.contains("ledger"))
        assertTrue(financialStressConflict.affectedModules.contains("agnes"))
        assertEquals(NexusSynthesisService.ConflictSeverity.BLOCK, financialStressConflict.severity)
    }

    @Test
    fun detectConflicts_lowFinancialFrictionOrStress_noFinancialStressConflict() {
        val service = createService()
        
        // NSV with low friction - shouldn't trigger
        val nsv = NeuralStateVector(
            emotional = EmotionalState(stressLoad = 8.0),
            resource = ResourceState(financialFriction = 4.0)
        )
        
        val conflicts = service.detectConflicts(nsv)
        
        val financialStressConflict = conflicts.find { it.id == "CONFLICT_FINANCIAL_STRESS" }
        assertTrue(financialStressConflict == null, "Should not detect financial stress with low friction")
    }

    // ═══════════════════════════════════════════════════════════════════════════════════
    // Test 3: detectConflicts_compoundCrisis_returns3WayConflict
    // ═══════════════════════════════════════════════════════════════════════════════════

    @Test
    fun detectConflicts_compoundCrisis_returns3WayConflict() {
        val service = createService()
        
        // NSV with compound crisis: high CNS fatigue (>=7), high stress (>=7), and high friction (>=6)
        val nsv = NeuralStateVector(
            biological = BiologicalState(cnsFatigue = 8.0),
            emotional = EmotionalState(stressLoad = 8.0),
            resource = ResourceState(financialFriction = 7.0)
        )
        
        val conflicts = service.detectConflicts(nsv)
        
        // Should detect COMPOUND_3WAY conflict
        val compound3Way = conflicts.find { it.id == "COMPOUND_3WAY" }
        assertNotNull(compound3Way, "Should detect compound 3-way crisis")
        assertEquals("Crisis — Biological + Emotional + Financial", compound3Way.title)
        assertTrue(compound3Way.affectedModules.contains("titan"))
        assertTrue(compound3Way.affectedModules.contains("agnes"))
        assertTrue(compound3Way.affectedModules.contains("ledger"))
        assertEquals(NexusSynthesisService.ConflictSeverity.BLOCK, compound3Way.severity)
        assertEquals(3, compound3Way.affectedModules.size, "Should affect exactly 3 modules")
    }

    @Test
    fun detectConflicts_partialCrisis_no3WayConflict() {
        val service = createService()
        
        // Only 2 of 3 thresholds met
        val nsv = NeuralStateVector(
            biological = BiologicalState(cnsFatigue = 8.0),
            emotional = EmotionalState(stressLoad = 8.0),
            resource = ResourceState(financialFriction = 4.0) // Below threshold
        )
        
        val conflicts = service.detectConflicts(nsv)
        
        val compound3Way = conflicts.find { it.id == "COMPOUND_3WAY" }
        assertTrue(compound3Way == null, "Should not detect 3-way conflict when friction is low")
    }

    // ═══════════════════════════════════════════════════════════════════════════════════
    // Test 4: shouldSurface_blockSeverity_alwaysTrue
    // ═══════════════════════════════════════════════════════════════════════════════════

    @Test
    fun shouldSurface_blockSeverity_alwaysTrue() {
        val service = createService()
        
        val blockConflict = NexusSynthesisService.ConflictResult(
            id = "TEST_BLOCK_CONFLICT",
            title = "Test Block Conflict",
            affectedModules = listOf("test"),
            severity = NexusSynthesisService.ConflictSeverity.BLOCK,
            suggestedResolution = "Test resolution",
            detectedAt = System.currentTimeMillis()
        )
        
        // BLOCK severity should always surface
        assertTrue(service.shouldSurface(blockConflict), "BLOCK severity should always surface")
        
        // Even after multiple calls, should still surface
        assertTrue(service.shouldSurface(blockConflict), "BLOCK severity should always surface on subsequent checks")
        assertTrue(service.shouldSurface(blockConflict), "BLOCK severity should always surface on third check")
    }

    // ═══════════════════════════════════════════════════════════════════════════════════
    // Test 5: shouldSurface_warnSeverity_throttledToFourHours
    // ═══════════════════════════════════════════════════════════════════════════════════

    @Test
    fun shouldSurface_warnSeverity_throttledToFourHours() = runTest {
        val eventBus = FakeSpineEventBus()
        val service = createService(eventBus, this)
        
        val warnConflict = NexusSynthesisService.ConflictResult(
            id = "TEST_WARN_CONFLICT",
            title = "Test Warn Conflict",
            affectedModules = listOf("test"),
            severity = NexusSynthesisService.ConflictSeverity.WARN,
            suggestedResolution = "Test resolution",
            detectedAt = System.currentTimeMillis()
        )
        
        // First check should return true (never surfaced before)
        assertTrue(service.shouldSurface(warnConflict), "First WARN should surface")
        
        // Mark as surfaced
        service.markSurfaced(warnConflict)
        advanceUntilIdle()
        
        // Immediately after surfacing, should NOT surface again (throttled)
        assertFalse(service.shouldSurface(warnConflict), "WARN should be throttled after surfacing")
    }

    @Test
    fun shouldSurface_warnSeverity_differentConflictsNotThrottled() = runTest {
        val eventBus = FakeSpineEventBus()
        val service = createService(eventBus, this)
        
        val warnConflict1 = NexusSynthesisService.ConflictResult(
            id = "TEST_WARN_CONFLICT_1",
            title = "Test Warn Conflict 1",
            affectedModules = listOf("test"),
            severity = NexusSynthesisService.ConflictSeverity.WARN,
            suggestedResolution = "Test resolution",
            detectedAt = System.currentTimeMillis()
        )
        
        val warnConflict2 = NexusSynthesisService.ConflictResult(
            id = "TEST_WARN_CONFLICT_2",
            title = "Test Warn Conflict 2",
            affectedModules = listOf("test"),
            severity = NexusSynthesisService.ConflictSeverity.WARN,
            suggestedResolution = "Test resolution",
            detectedAt = System.currentTimeMillis()
        )
        
        // Mark first conflict as surfaced
        service.markSurfaced(warnConflict1)
        advanceUntilIdle()
        
        // Different conflict should still surface
        assertTrue(service.shouldSurface(warnConflict2), "Different WARN conflict should not be throttled")
    }

    // ═══════════════════════════════════════════════════════════════════════════════════
    // Test 6: resolveConflict_reroute_emitsBlockHighIntensity
    // ═══════════════════════════════════════════════════════════════════════════════════

    @Test
    fun resolveConflict_reroute_emitsBlockHighIntensity() = runTest {
        val eventBus = FakeSpineEventBus()
        val service = createService(eventBus, this)
        
        // Resolve CONFLICT_THERAPY_FATIGUE with REROUTE
        service.resolveConflict(
            "CONFLICT_THERAPY_FATIGUE",
            NexusSynthesisService.ConflictResolutionChoice.REROUTE
        )
        advanceUntilIdle()
        
        // Should emit CONFLICT_RESOLVED
        val resolvedEvent = eventBus.emittedEvents.find { it.type == "CONFLICT_RESOLVED" }
        assertNotNull(resolvedEvent, "Should emit CONFLICT_RESOLVED event")
        assertEquals("CONFLICT_THERAPY_FATIGUE", resolvedEvent.data["conflictId"])
        assertEquals("reroute", resolvedEvent.data["resolution"])
        
        // Should also emit BLOCK_HIGH_INTENSITY for training-related conflicts
        val blockIntensityEvent = eventBus.emittedEvents.find { it.type == "BLOCK_HIGH_INTENSITY" }
        assertNotNull(blockIntensityEvent, "Should emit BLOCK_HIGH_INTENSITY for training conflict")
        assertEquals("B", blockIntensityEvent.domain)
        assertEquals("alert", blockIntensityEvent.priority)
        assertTrue(
            (blockIntensityEvent.data["reason"] as? String)?.contains("CONFLICT_THERAPY_FATIGUE") == true,
            "Reason should reference the conflict"
        )
    }

    @Test
    fun resolveConflict_reroute_financialConflict_emitsFinancialStress() = runTest {
        val eventBus = FakeSpineEventBus()
        val service = createService(eventBus, this)
        
        // Resolve CONFLICT_FINANCIAL_STRESS with REROUTE
        service.resolveConflict(
            "CONFLICT_FINANCIAL_STRESS",
            NexusSynthesisService.ConflictResolutionChoice.REROUTE
        )
        advanceUntilIdle()
        
        // Should emit FINANCIAL_STRESS event
        val financialStressEvent = eventBus.emittedEvents.find { it.type == "FINANCIAL_STRESS" }
        assertNotNull(financialStressEvent, "Should emit FINANCIAL_STRESS for financial conflict")
        assertEquals("R", financialStressEvent.domain)
        assertEquals("alert", financialStressEvent.priority)
    }

    @Test
    fun resolveConflict_reroute_compound3Way_emitsCrisisMode() = runTest {
        val eventBus = FakeSpineEventBus()
        val service = createService(eventBus, this)
        
        // Resolve COMPOUND_3WAY with REROUTE
        service.resolveConflict(
            "COMPOUND_3WAY",
            NexusSynthesisService.ConflictResolutionChoice.REROUTE
        )
        advanceUntilIdle()
        
        // Should emit CRISIS_MODE event
        val crisisModeEvent = eventBus.emittedEvents.find { it.type == "CRISIS_MODE" }
        assertNotNull(crisisModeEvent, "Should emit CRISIS_MODE for compound crisis")
        assertEquals("system", crisisModeEvent.domain)
        assertEquals("critical", crisisModeEvent.priority)
    }

    @Test
    fun resolveConflict_proceed_noRerouteEvent() = runTest {
        val eventBus = FakeSpineEventBus()
        val service = createService(eventBus, this)
        
        // Resolve with PROCEED instead of REROUTE
        service.resolveConflict(
            "CONFLICT_THERAPY_FATIGUE",
            NexusSynthesisService.ConflictResolutionChoice.PROCEED
        )
        advanceUntilIdle()
        
        // Should only emit CONFLICT_RESOLVED, no cascade event
        val resolvedEvent = eventBus.emittedEvents.find { it.type == "CONFLICT_RESOLVED" }
        assertNotNull(resolvedEvent)
        assertEquals("proceed", resolvedEvent.data["resolution"])
        
        val blockIntensityEvent = eventBus.emittedEvents.find { it.type == "BLOCK_HIGH_INTENSITY" }
        assertTrue(blockIntensityEvent == null, "Should not emit BLOCK_HIGH_INTENSITY for PROCEED")
    }

    @Test
    fun resolveConflict_defer_noRerouteEvent() = runTest {
        val eventBus = FakeSpineEventBus()
        val service = createService(eventBus, this)
        
        // Resolve with DEFER
        service.resolveConflict(
            "CONFLICT_THERAPY_FATIGUE",
            NexusSynthesisService.ConflictResolutionChoice.DEFER
        )
        advanceUntilIdle()
        
        // Should only emit CONFLICT_RESOLVED
        val resolvedEvent = eventBus.emittedEvents.find { it.type == "CONFLICT_RESOLVED" }
        assertNotNull(resolvedEvent)
        assertEquals("defer", resolvedEvent.data["resolution"])
        
        val blockIntensityEvent = eventBus.emittedEvents.find { it.type == "BLOCK_HIGH_INTENSITY" }
        assertTrue(blockIntensityEvent == null, "Should not emit BLOCK_HIGH_INTENSITY for DEFER")
    }

    // ═══════════════════════════════════════════════════════════════════════════════════
    // Additional edge case tests
    // ═══════════════════════════════════════════════════════════════════════════════════

    @Test
    fun detectConflicts_emptyNsv_noConflicts() {
        val service = createService()
        
        val nsv = NeuralStateVector()
        val conflicts = service.detectConflicts(nsv)
        
        assertTrue(conflicts.isEmpty(), "Empty NSV should not trigger any conflicts")
    }

    @Test
    fun detectConflicts_multipleConflictsDetected() {
        val service = createService()
        
        // NSV that triggers multiple conflicts simultaneously
        val nsv = NeuralStateVector(
            biological = BiologicalState(
                cnsFatigue = 8.0,
                sleepQuality = 2.0
            ),
            emotional = EmotionalState(
                emotionalResilience = 2.0,
                stressLoad = 9.0
            ),
            cognitive = CognitiveState(
                planningLoad = 8.0,
                activeLoad = 9.0
            ),
            resource = ResourceState(financialFriction = 8.0)
        )
        
        val conflicts = service.detectConflicts(nsv)
        
        // Should detect multiple conflicts
        assertTrue(conflicts.size > 1, "Should detect multiple conflicts for severe NSV state")
        
        // Verify specific conflicts are detected
        assertTrue(conflicts.any { it.id == "CONFLICT_THERAPY_FATIGUE" })
        assertTrue(conflicts.any { it.id == "CONFLICT_FINANCIAL_STRESS" })
        assertTrue(conflicts.any { it.id == "COMPOUND_3WAY" })
    }

    @Test
    fun detectConflicts_reroutedConflictsExcluded() = runTest {
        val eventBus = FakeSpineEventBus()
        val service = createService(eventBus, this)
        
        // First, resolve CONFLICT_THERAPY_FATIGUE with REROUTE
        service.resolveConflict(
            "CONFLICT_THERAPY_FATIGUE",
            NexusSynthesisService.ConflictResolutionChoice.REROUTE
        )
        advanceUntilIdle()
        
        // Now detect conflicts with NSV that would trigger CONFLICT_THERAPY_FATIGUE
        val nsv = NeuralStateVector(
            biological = BiologicalState(cnsFatigue = 8.0),
            emotional = EmotionalState(emotionalResilience = 3.0)
        )
        
        val conflicts = service.detectConflicts(nsv)
        
        // CONFLICT_THERAPY_FATIGUE should be excluded (rerouted)
        val therapyFatigueConflict = conflicts.find { it.id == "CONFLICT_THERAPY_FATIGUE" }
        assertTrue(therapyFatigueConflict == null, "Rerouted conflict should be excluded from detection")
    }

    @Test
    fun markSurfaced_emitsConflictDetectedEvent() = runTest {
        val eventBus = FakeSpineEventBus()
        val service = createService(eventBus, this)
        
        val conflict = NexusSynthesisService.ConflictResult(
            id = "TEST_CONFLICT",
            title = "Test Conflict",
            affectedModules = listOf("titan", "agnes"),
            severity = NexusSynthesisService.ConflictSeverity.BLOCK,
            suggestedResolution = "Test resolution",
            detectedAt = System.currentTimeMillis()
        )
        
        service.markSurfaced(conflict)
        advanceUntilIdle()
        
        val detectedEvent = eventBus.emittedEvents.find { it.type == "CONFLICT_DETECTED" }
        assertNotNull(detectedEvent, "Should emit CONFLICT_DETECTED event")
        assertEquals("nexus-synthesis", detectedEvent.source)
        assertEquals("system", detectedEvent.domain)
        assertEquals("alert", detectedEvent.priority) // BLOCK severity = alert
        assertEquals("TEST_CONFLICT", detectedEvent.data["conflictId"])
        assertEquals("block", detectedEvent.data["severity"])
    }

    @Test
    fun markSurfaced_warnSeverity_infoPriority() = runTest {
        val eventBus = FakeSpineEventBus()
        val service = createService(eventBus, this)
        
        val conflict = NexusSynthesisService.ConflictResult(
            id = "TEST_WARN_CONFLICT",
            title = "Test Warn Conflict",
            affectedModules = listOf("test"),
            severity = NexusSynthesisService.ConflictSeverity.WARN,
            suggestedResolution = "Test resolution",
            detectedAt = System.currentTimeMillis()
        )
        
        service.markSurfaced(conflict)
        advanceUntilIdle()
        
        val detectedEvent = eventBus.emittedEvents.find { it.type == "CONFLICT_DETECTED" }
        assertNotNull(detectedEvent)
        assertEquals("info", detectedEvent.priority) // WARN severity = info
        assertEquals("warn", detectedEvent.data["severity"])
    }
}
