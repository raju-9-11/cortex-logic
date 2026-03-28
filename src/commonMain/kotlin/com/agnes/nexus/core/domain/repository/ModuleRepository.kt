package com.agnes.nexus.core.domain.repository

import kotlinx.coroutines.flow.Flow

/**
 * Platform-agnostic repository interface for a single module's profile data.
 * Android implementations use Firestore. Web implementations use Ktor REST.
 */
interface ModuleRepository<T> {
    fun observe(): Flow<T?>
    suspend fun get(): T?
    suspend fun upsert(data: T)
    suspend fun delete()
}
