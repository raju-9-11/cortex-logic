package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.models.GlobalProjection
import com.agnes.nexus.core.domain.models.NeuralStateVector
import com.agnes.nexus.core.domain.models.neuralStateVector
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

/**
 * Canonical repository for persisted global projection state.
 *
 * Phase 2 note: the persisted document shape is [GlobalProjection], while
 * spec-facing orchestration state is [com.agnes.nexus.core.domain.model.GlobalSoul].
 * This repository owns the persisted projection/NSV boundary; callers should derive
 * GlobalSoul from projection state rather than inventing parallel persistence paths.
 */
interface GlobalProjectionRepository {
    suspend fun getProjection(userId: String): GlobalProjection?
    fun observeProjection(userId: String): Flow<GlobalProjection?>
    suspend fun saveProjection(userId: String, projection: GlobalProjection)
    suspend fun updateNsvFields(userId: String, updates: Map<String, Any?>)
    suspend fun deleteProjection(userId: String) {}

    suspend fun getNsv(userId: String): NeuralStateVector =
        getProjection(userId)?.neuralStateVector ?: NeuralStateVector()

    fun observeNsv(userId: String): Flow<NeuralStateVector> =
        observeProjection(userId).map { it?.neuralStateVector ?: NeuralStateVector() }
}

/**
 * Backward-compatible alias retained while Phase 2 migrates the app toward the
 * more accurate repository naming.
 */
typealias GlobalSoulRepository = GlobalProjectionRepository
