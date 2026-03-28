package com.agnes.nexus.core.domain.services

import kotlinx.coroutines.flow.Flow

/**
 * Provides the current authenticated user id for global projection / NSV observation.
 * Platform (e.g. Android) supplies an implementation backed by auth state so that
 * all modules get the correct user's data without per-ViewModel setUserId().
 *
 * Used by [DefaultGlobalProjectionService] so that observeNsv(), observeProjection(),
 * getProjection(), updateNsv(), etc. always use the live current user.
 */
interface CurrentUserIdProvider {
    /**
     * Stream of current user id. Emits when auth state changes (login, logout, token refresh).
     * New collectors should receive the latest value promptly (e.g. from a StateFlow or replay).
     */
    fun currentUserId(): Flow<String?>

    /**
     * Snapshot of current user id for synchronous or suspend callers (e.g. getProjection).
     * Should reflect the same value as the latest emission of [currentUserId].
     */
    fun getCurrentUserId(): String?
}
