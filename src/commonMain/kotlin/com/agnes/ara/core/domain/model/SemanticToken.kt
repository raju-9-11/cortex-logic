package com.agnes.ara.core.domain.model

import kotlinx.serialization.Serializable

/**
 * A compacted memory unit derived from historical conversation messages.
 * Replaces raw message history in long-term storage to preserve LLM context windows.
 * Active session messages (since sessionStartedAt) are always retained at 100%.
 */
@Serializable
data class SemanticToken(
    val id: String,
    val moduleId: String,
    val content: String,          // Distilled semantic fact about the user
    val extractedAt: Long,
    val confidence: Float = 1.0f, // LLM confidence in the extraction (0.0-1.0)
    val sourceMessageCount: Int = 1
)
