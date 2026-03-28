package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.models.BiologicalState
import com.agnes.nexus.core.domain.models.GlobalProjection
import com.agnes.nexus.core.domain.models.NeuralStateVector
import com.agnes.nexus.core.engine.GlobalSoulStore
import com.agnes.nexus.core.engine.orchestrator.OverridePenaltyEnforcer
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.launch
import kotlinx.coroutines.test.UnconfinedTestDispatcher
import kotlinx.coroutines.test.advanceUntilIdle
import kotlinx.coroutines.test.runTest
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

@OptIn(ExperimentalCoroutinesApi::class)
class DefaultGlobalProjectionServiceRecoveryTest {

    @Test
    fun observeProjection_preservesActiveDebtUntilRecoveryThreshold() = runTest {
        val store = GlobalSoulStore().apply {
            update {
                it.copy(
                    vitality = 0.1f,
                    recoveryRateMultiplier = 0.5f,
                    isSystemDebtActive = true
                )
            }
        }
        val bus = FakeSpineEventBus()
        val service = createService(
            projection = projectionWithRecoveryScore(4.0),
            globalSoulStore = store,
            overridePenaltyEnforcer = OverridePenaltyEnforcer(store, bus)
        )

        val job = launch(UnconfinedTestDispatcher(testScheduler)) {
            service.observeProjection().collect {}
        }
        advanceUntilIdle()

        assertTrue(store.current.isSystemDebtActive)
        assertEquals(0.5f, store.current.recoveryRateMultiplier)
        assertTrue(bus.emittedEvents.none { it.type == "SYSTEM_DEBT_CLEARED" })

        job.cancel()
    }

    @Test
    fun observeProjection_clearsDebtWhenRecoveryThresholdIsReached() = runTest {
        val store = GlobalSoulStore().apply {
            update {
                it.copy(
                    vitality = 0.1f,
                    recoveryRateMultiplier = 0.5f,
                    isSystemDebtActive = true
                )
            }
        }
        val bus = FakeSpineEventBus()
        val service = createService(
            projection = projectionWithRecoveryScore(7.0),
            globalSoulStore = store,
            overridePenaltyEnforcer = OverridePenaltyEnforcer(store, bus)
        )

        val job = launch(UnconfinedTestDispatcher(testScheduler)) {
            service.observeProjection().collect {}
        }
        advanceUntilIdle()

        assertFalse(store.current.isSystemDebtActive)
        assertEquals(1.0f, store.current.recoveryRateMultiplier)
        assertTrue(bus.emittedEvents.any { it.type == "SYSTEM_DEBT_CLEARED" })

        job.cancel()
    }

    private fun createService(
        projection: GlobalProjection,
        globalSoulStore: GlobalSoulStore,
        overridePenaltyEnforcer: OverridePenaltyEnforcer
    ): DefaultGlobalProjectionService = DefaultGlobalProjectionService(
        repository = object : GlobalProjectionRepository {
            override suspend fun getProjection(userId: String): GlobalProjection? = projection

            override fun observeProjection(userId: String): Flow<GlobalProjection?> = flowOf(projection)

            override suspend fun saveProjection(userId: String, projection: GlobalProjection) = Unit

            override suspend fun updateNsvFields(userId: String, updates: Map<String, Any?>) = Unit
        },
        userIdProvider = object : CurrentUserIdProvider {
            override fun currentUserId(): Flow<String?> = flowOf("user-1")

            override fun getCurrentUserId(): String = "user-1"
        },
        globalSoulStore = globalSoulStore,
        overridePenaltyEnforcer = overridePenaltyEnforcer
    )

    private fun projectionWithRecoveryScore(recoveryScore: Double): GlobalProjection =
        GlobalProjection(
            crossFunctionalState = NeuralStateVector(
                biological = BiologicalState(recoveryScore = recoveryScore)
            )
        )

    private class FakeSpineEventBus : SpineEventBus {
        val emittedEvents = mutableListOf<SpineEventPayload>()

        override fun on(type: String, minPriority: String?): Flow<SpineEvent> = flowOf()

        override suspend fun emit(event: SpineEvent) {
            emittedEvents += SpineEventPayload(
                type = event.type,
                source = event.source,
                domain = event.domain,
                data = event.data,
                priority = event.priority
            )
        }

        override suspend fun emit(payload: SpineEventPayload): SpineEvent {
            emittedEvents += payload
            return payload.toSpineEvent()
        }

        override fun registerCascadeRules(rules: List<CascadeRule>) = Unit

        override fun getRecentEvents(filter: SpineEventFilter?): List<SpineEvent> = emptyList()
    }
}
