package com.agnes.ara.core.domain.service.agnes

import com.agnes.ara.core.domain.models.BeliefGraph
import com.agnes.ara.core.domain.models.BeliefNode
import com.agnes.ara.core.domain.models.NeuralLink
import com.agnes.ara.core.domain.models.Message

/**
 * Concrete Agnes repository with 2-hour TTL session cache.
 *
 * Handles:
 * - Ephemeral Impromptu session storage (Purgatory pattern — purged after 2h)
 * - Belief Graph atomic updates (node upsert + NeuralLink creation)
 * - Vault serialisation stubs (encrypted JSON, implemented in platform layer)
 *
 * The [sessionCache] is an in-memory map; platform persistence (Vault encryption)
 * is delegated via [saveSessionToVault].
 */
class AgnesConcreteRepository {

    companion object {
        const val SESSION_TTL_MS = 2 * 60 * 60 * 1000L    // 2-hour Purgatory TTL
    }

    // ── Ephemeral session cache ────────────────────────────────────────────────
    // sessionId → Pair(messages, expiryMs)
    private val sessionCache = mutableMapOf<String, Pair<List<Message>, Long>>()

    /**
     * Store messages for an Impromptu session with a 2-hour TTL.
     * After TTL expires the session is eligible for purge via [purgeExpired].
     */
    fun cacheSession(sessionId: String, messages: List<Message>) {
        val expiry = kotlinx.datetime.Clock.System.now().toEpochMilliseconds() + SESSION_TTL_MS
        sessionCache[sessionId] = Pair(messages, expiry)
    }

    /** Retrieve cached messages if still within TTL, null if expired or missing. */
    fun getCachedSession(sessionId: String): List<Message>? {
        val entry = sessionCache[sessionId] ?: return null
        val (messages, expiry) = entry
        return if (kotlinx.datetime.Clock.System.now().toEpochMilliseconds() < expiry) messages else null
    }

    /**
     * Commit a session from the in-memory cache to the encrypted Vault.
     * Removes it from the live cache after serialisation.
     *
     * Platform note: actual AES-GCM encryption is applied at the platform layer
     * (VaultKeyManager). This function produces the plaintext JSON payload.
     */
    fun saveSessionToVault(sessionId: String): String? {
        val (messages, _) = sessionCache[sessionId] ?: return null
        sessionCache.remove(sessionId)
        // Serialise to JSON — Vault layer encrypts before write
        return buildString {
            append("{\"sessionId\":\"$sessionId\",\"messages\":[")
            messages.forEachIndexed { i, msg ->
                if (i > 0) append(",")
                append("{\"role\":\"${msg.role}\",\"content\":${
                    msg.content.replace("\"", "\\\"").let { "\"$it\"" }
                }}")
            }
            append("]}")
        }
    }

    /** Purge all sessions whose TTL has elapsed. Returns purged session IDs. */
    fun purgeExpired(): List<String> {
        val now = kotlinx.datetime.Clock.System.now().toEpochMilliseconds()
        val expired = sessionCache.filter { (_, v) -> now >= v.second }.keys.toList()
        expired.forEach { sessionCache.remove(it) }
        return expired
    }

    // ── Belief Graph ───────────────────────────────────────────────────────────

    /**
     * Atomically update the Belief Graph with a new or modified node and optional NeuralLink.
     *
     * - If a node with the same [node.id] exists it is replaced (upsert semantics).
     * - If [link] is non-null it is appended unless an identical sourceId→targetId already exists.
     *
     * @return Updated [BeliefGraph] — caller is responsible for persistence.
     */
    fun updateBeliefGraph(
        graph: BeliefGraph,
        node: BeliefNode,
        link: NeuralLink? = null
    ): BeliefGraph {
        val updatedNodes = graph.nodes
            .filterNot { it.id == node.id }
            .plus(node)

        val updatedLinks = if (link != null) {
            val alreadyExists = graph.neuralLinks.any {
                it.sourceId == link.sourceId && it.targetId == link.targetId
            }
            if (alreadyExists) {
                // Update weight on existing link
                graph.neuralLinks.map {
                    if (it.sourceId == link.sourceId && it.targetId == link.targetId)
                        it.copy(weight = link.weight, context = link.context)
                    else it
                }
            } else {
                graph.neuralLinks + link
            }
        } else {
            graph.neuralLinks
        }

        return graph.copy(nodes = updatedNodes, neuralLinks = updatedLinks)
    }
}
