package com.agnes.ara.core.domain.services

import com.agnes.ara.core.domain.models.Message
import kotlinx.coroutines.flow.Flow

/**
 * Episodic Memory Repository - Abstraction for cross-device chat history.
 * Ensures the system remembers what was discussed across sessions.
 */
interface EpisodicMemoryRepository {
    /**
     * Persists the current chat thread for a module.
     * In a robust implementation, this would handle encryption before storage.
     */
    suspend fun saveThread(moduleId: String, userId: String, messages: List<Message>)

    /**
     * Retrieves the latest chat thread for a module.
     */
    suspend fun getThread(moduleId: String, userId: String): List<Message>

    /**
     * Reactive observation of a chat thread.
     */
    fun observeThread(moduleId: String, userId: String): Flow<List<Message>>

    /**
     * Permanently deletes a chat thread (used during account deletion or data reset).
     */
    suspend fun deleteThread(moduleId: String, userId: String) {}
}
