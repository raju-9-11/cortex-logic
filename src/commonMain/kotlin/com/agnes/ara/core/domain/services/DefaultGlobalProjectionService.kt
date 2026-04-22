package com.agnes.ara.core.domain.services

import com.agnes.ara.core.engine.GlobalSoulStore
import com.agnes.ara.core.engine.orchestrator.OverridePenaltyEnforcer
import com.agnes.ara.core.domain.models.GlobalProjection
import com.agnes.ara.core.domain.models.NeuralStateVector
import com.agnes.ara.core.domain.models.TherapeuticBaseline
import com.agnes.ara.core.domain.models.neuralStateVector
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.onEach
import kotlin.time.TimeSource

/**
 * KMP Global Projection Service - persistence-agnostic business logic for the Soul.
 * Wraps a [GlobalSoulRepository] and uses [CurrentUserIdProvider] so that all operations
 * (observe, get, update) use the live current user. All modules get correct projection/NSV
 * without per-ViewModel setUserId(); the platform supplies the provider from auth state.
 */
@OptIn(ExperimentalCoroutinesApi::class)
class DefaultGlobalProjectionService(
    private val repository: GlobalProjectionRepository,
    private val userIdProvider: CurrentUserIdProvider,
    private val globalSoulStore: GlobalSoulStore? = null,
    private val overridePenaltyEnforcer: OverridePenaltyEnforcer? = null,
    private val timeSource: TimeSource = TimeSource.Monotonic
) : NeuralProjectionService {

    override fun observeNsv(): Flow<NeuralStateVector> =
        userIdProvider.currentUserId().flatMapLatest { uid ->
            if (uid != null) {
                repository.observeProjection(uid)
                    .onEach { projection -> syncProjectionState(projection) }
                    .map { it?.neuralStateVector ?: NeuralStateVector() }
            } else {
                globalSoulStore?.reset()
                flowOf(NeuralStateVector())
            }
        }

    override suspend fun updateNsv(patch: Map<String, Any?>) {
        userIdProvider.getCurrentUserId()?.let { uid ->
            repository.updateNsvFields(uid, patch)
        }
    }

    override suspend fun getCompactedInsights(): List<String> =
        userIdProvider.getCurrentUserId()?.let { repository.getProjection(it)?.compactedInsights } ?: emptyList()

    override suspend fun addInsight(insight: String) {
        val uid = userIdProvider.getCurrentUserId() ?: return
        val projection = repository.getProjection(uid) ?: return
        val updatedInsights = (projection.compactedInsights + insight).takeLast(20)
        repository.saveProjection(uid, projection.copy(compactedInsights = updatedInsights))
    }

    suspend fun getProjection(): GlobalProjection? =
        userIdProvider.getCurrentUserId()?.let { repository.getProjection(it) }

    fun observeProjection(): Flow<GlobalProjection?> =
        userIdProvider.currentUserId().flatMapLatest { uid ->
            if (uid != null) {
                repository.observeProjection(uid)
                    .onEach { projection -> syncProjectionState(projection) }
            } else {
                globalSoulStore?.reset()
                flowOf(null)
            }
        }

    private suspend fun syncProjectionState(projection: GlobalProjection?) {
        globalSoulStore?.syncFromProjection(projection)
        overridePenaltyEnforcer?.clearDebtIfRecovered()
    }

    suspend fun updateTherapeuticBaseline(isInitialized: Boolean) {
        val uid = userIdProvider.getCurrentUserId() ?: return
        val projection = repository.getProjection(uid) ?: return
        val updated = projection.copy(
            therapeuticBaseline = TherapeuticBaseline(
                isInitialized = isInitialized,
                initializedAt = "monotonic:${timeSource.markNow().elapsedNow()}"
            )
        )
        repository.saveProjection(uid, updated)
    }
}
