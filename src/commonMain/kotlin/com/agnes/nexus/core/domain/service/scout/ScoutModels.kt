package com.agnes.nexus.core.domain.service.scout

import kotlinx.serialization.Serializable

// ═══════════════════════════════════════════════════════════════════════════
// Scout Profile
// Matches web: scout_knowledge/{uid} parent document
// ═══════════════════════════════════════════════════════════════════════════

@Serializable
data class InterestNode(
    val id: String,
    val topic: String,
    val score: Double = 0.0,
    /** "rising" | "steady" | "cooling" */
    val trend: String = "steady",
    val lastSeenAt: String = ""
)

@Serializable
data class ScoutNewsBrief(
    val topic: String,
    val summary: String,
    val source: String? = null,
    val updatedAt: String = "",
    val isPlaceholder: Boolean = false
)

@Serializable
data class ScoutProfile(
    val onboardingComplete: Boolean = false,
    val researchFocus: List<String> = emptyList(),
    val interests: List<InterestNode> = emptyList(),
    val summary: String = "",
    val newsBriefs: List<ScoutNewsBrief> = emptyList(),
    val createdAt: String = "",
    val updatedAt: String = ""
)

// ═══════════════════════════════════════════════════════════════════════════
// Evidence Highlight
// ═══════════════════════════════════════════════════════════════════════════

@Serializable
data class EvidenceHighlight(
    val id: String,
    val sourceId: String,
    val text: String,
    val contextBefore: String? = null,
    val contextAfter: String? = null,
    val pageNumber: Int? = null,
    val confidence: Double = 0.8,
    val addedAt: String = ""
)

// ═══════════════════════════════════════════════════════════════════════════
// Source Entry
// Matches web SourceEntryDecrypted; Firestore: scout_sources/{uid}/sources/
// ═══════════════════════════════════════════════════════════════════════════

@Serializable
data class SourceEntry(
    val id: String,
    val url: String,
    val normalizedUrl: String = url,
    val title: String = "",
    val domain: String = "",
    val snippet: String = "",
    val imageUrl: String? = null,
    val favicon: String? = null,
    val addedAt: String = "",
    val savedAt: String? = null,
    val lastAccessedAt: String? = null,
    val readAt: String? = null,
    /** "manual" | "web_search" | "deep_research" | "cross_module" | "handoff" */
    val discoveredVia: String = "manual",
    /** "unread" | "reading" | "read" */
    val readStatus: String = "unread",
    val starred: Boolean = false,
    val isStarred: Boolean = false,
    val archived: Boolean = false,
    val isArchived: Boolean = false,
    val notes: String? = null,
    val tags: List<String> = emptyList(),
    val nodeId: String? = null,
    val citingNodeIds: List<String> = emptyList(),
    val highlights: List<EvidenceHighlight> = emptyList(),
    val encryptedData: String? = null,
    val iv: String? = null
) {
    /** Unified starred flag (handles both field names) */
    val isEffectivelyStarred: Boolean get() = starred || isStarred
    /** Unified archived flag */
    val isEffectivelyArchived: Boolean get() = archived || isArchived
}

// ═══════════════════════════════════════════════════════════════════════════
// Research Session
// Matches web ResearchSession; Firestore: scout_sessions/{uid}/sessions/
// ═══════════════════════════════════════════════════════════════════════════

@Serializable
data class SubQuestion(
    val id: String,
    val text: String,
    /** "factual" | "comparative" | "temporal" | "causal" */
    val intent: String = "factual",
    /** "pending" | "approved" | "rejected" | "searching" | "completed" | "failed" */
    val status: String = "pending",
    val results: List<String> = emptyList()
)

@Serializable
data class ResearchSessionReasoning(
    val id: String,
    /** "reasoning" | "search" | "result" | "synthesis" | "source" | "user" */
    val type: String,
    val text: String,
    val timestamp: Long = 0L,
    val dataJson: String? = null
)

@Serializable
data class ResearchSession(
    val id: String,
    val userId: String,
    val topic: String,
    /** "idle" | "decomposing" | "awaiting_review" | "searching" | "synthesizing" | "complete" | "error" | "cancelled" | "archived" */
    val status: String = "idle",
    val subQuestions: List<SubQuestion> = emptyList(),
    val activeSubQuestion: String? = null,
    val searchDepth: Int = 1,
    val deepResearchEnabled: Boolean = false,
    val lastSearchedAt: String? = null,
    val summary: String? = null,
    val createdAt: String = "",
    val updatedAt: String = "",
    val resultNodeId: String? = null,
    val reasoningHistory: List<ResearchSessionReasoning> = emptyList()
)

// ═══════════════════════════════════════════════════════════════════════════
// Knowledge Node
// Matches web ScoutKnowledgeNode; Firestore: scout_knowledge/{uid}/nodes/
// ═══════════════════════════════════════════════════════════════════════════

@Serializable
data class ScoutKnowledgeNodeProvenance(
    val source: String = "scout",
    val sourceEntityId: String = "",
    val sourceIds: List<String> = emptyList(),
    val sessionId: String? = null,
    val synthesizedAt: String = ""
)

@Serializable
data class ScoutKnowledgeNode(
    val id: String,
    val claim: String,
    val title: String? = null,
    val confidence: Double = 0.8,
    /** Source IDs cited as evidence */
    val evidence: List<String> = emptyList(),
    val highlights: List<String> = emptyList(),
    val tags: List<String> = emptyList(),
    val source: String? = null,
    val sources: List<String> = emptyList(),
    /** "pending" | "verified" | "contested" */
    val status: String = "pending",
    val updatedAt: String = "",
    val parentSessionId: String? = null,
    val provenance: ScoutKnowledgeNodeProvenance? = null,
    val encryptedData: String? = null,
    val iv: String? = null
)

// ═══════════════════════════════════════════════════════════════════════════
// Digest
// Matches web ScoutDigestDecrypted; Firestore: scout_digests/{uid}/digests/
// ═══════════════════════════════════════════════════════════════════════════

@Serializable
data class ScoutDigestSections(
    val executiveSummary: String = "",
    val keyThemes: List<String> = emptyList(),
    val knowledgeGaps: List<String> = emptyList(),
    val recommendedActions: List<String> = emptyList(),
    val sourceSummary: String? = null
)

@Serializable
data class ScoutDigestSummary(
    val totalNodes: Int = 0,
    val newNodesThisPeriod: Int = 0,
    val verifiedCount: Int = 0,
    val contestedCount: Int = 0
)

@Serializable
data class ScoutDigestTopClaim(
    val nodeId: String,
    val claim: String,
    val confidence: Double,
    val evidenceCount: Int
)

@Serializable
data class ScoutDigestTrendingInterest(
    val topic: String,
    val score: Double,
    val trend: String
)

@Serializable
data class ScoutDigest(
    val id: String,
    val userId: String,
    val generatedAt: String = "",
    /** "manual" | "scheduled" */
    val generationType: String = "manual",
    val triggerSource: String = "manual",
    val periodStart: String = "",
    val periodEnd: String = "",
    val nodeCount: Int = 0,
    val sourceCount: Int = 0,
    val sections: ScoutDigestSections = ScoutDigestSections(),
    val summary: ScoutDigestSummary = ScoutDigestSummary(),
    val topClaims: List<ScoutDigestTopClaim> = emptyList(),
    val trendingInterests: List<ScoutDigestTrendingInterest> = emptyList(),
    val synthesizedContent: String = "",
    val encryptedData: String? = null,
    val iv: String? = null
)
