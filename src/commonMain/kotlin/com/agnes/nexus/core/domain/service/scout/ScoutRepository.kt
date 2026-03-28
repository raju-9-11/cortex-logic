package com.agnes.nexus.core.domain.service.scout

import kotlinx.coroutines.flow.Flow

interface ScoutRepository {
    // ── Profile ─────────────────────────────────────────────────────────────
    suspend fun getProfile(userId: String): ScoutProfile?
    suspend fun saveProfile(userId: String, profile: ScoutProfile)

    // ── Knowledge Nodes ──────────────────────────────────────────────────────
    suspend fun getKnowledgeNodes(userId: String): List<ScoutKnowledgeNode>
    fun observeKnowledgeNodes(userId: String): Flow<List<ScoutKnowledgeNode>>
    suspend fun saveKnowledgeNode(userId: String, node: ScoutKnowledgeNode)
    suspend fun updateKnowledgeNodeTags(userId: String, nodeId: String, tags: List<String>)
    suspend fun deleteKnowledgeNode(userId: String, nodeId: String)

    // ── Sources ──────────────────────────────────────────────────────────────
    suspend fun getSources(userId: String): List<SourceEntry>
    fun observeSources(userId: String): Flow<List<SourceEntry>>
    suspend fun saveSource(userId: String, source: SourceEntry)
    suspend fun toggleSourceStar(userId: String, sourceId: String)
    suspend fun archiveSource(userId: String, sourceId: String)
    suspend fun deleteSource(userId: String, sourceId: String)

    // ── Research Sessions ────────────────────────────────────────────────────
    suspend fun getResearchSessions(userId: String): List<ResearchSession>
    fun observeResearchSessions(userId: String): Flow<List<ResearchSession>>
    suspend fun saveResearchSession(userId: String, session: ResearchSession)
    suspend fun updateSessionStatus(userId: String, sessionId: String, status: String)
    suspend fun deleteResearchSession(userId: String, sessionId: String)

    // ── Digests ──────────────────────────────────────────────────────────────
    suspend fun getDigests(userId: String): List<ScoutDigest>
    fun observeDigests(userId: String): Flow<List<ScoutDigest>>
    suspend fun saveDigest(userId: String, digest: ScoutDigest)
    suspend fun deleteDigest(userId: String, digestId: String)
}
