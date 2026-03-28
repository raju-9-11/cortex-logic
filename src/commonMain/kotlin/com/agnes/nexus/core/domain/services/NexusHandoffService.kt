package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.actions.ActionHub
import com.agnes.nexus.core.domain.models.ActionCall
import com.agnes.nexus.core.domain.models.ModuleIds
import kotlinx.datetime.Clock
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.put

/**
 * Cross-module handoff storage + delegation helper.
 * Parity with web sessionStorage handoff semantics.
 */
class NexusHandoffService(
    private val actionHub: ActionHub,
    private val settings: NexusSettings
) {
    @Serializable
    data class NexusHandoff(
        val moduleId: String,
        val type: String,
        val content: String,
        val reason: String? = null,
        val sourceModuleId: String? = null,
        val createdAt: String
    )

    private val json = Json { ignoreUnknownKeys = true }
    private val _pendingModuleIds = MutableStateFlow<Set<String>>(emptySet())
    val pendingModuleIds: StateFlow<Set<String>> = _pendingModuleIds.asStateFlow()

    init {
        _pendingModuleIds.value = loadPendingModuleIds()
    }

    suspend fun delegate(
        targetModule: String,
        instruction: String,
        content: String
    ) {
        store(
            NexusHandoff(
                moduleId = ModuleIds.normalize(targetModule) ?: targetModule,
                type = "delegate",
                content = content,
                reason = instruction,
                sourceModuleId = ModuleIds.NEXUS,
                createdAt = Clock.System.now().toString()
            )
        )

        val payload = buildJsonObject {
            put("target", targetModule)
            put("instruction", instruction)
            put("content", content)
        }
        actionHub.execute(
            ActionCall(
                type = "delegate_to_module",
                payload = payload,
                userId = null,
                moduleId = ModuleIds.NEXUS,
                encryptionKey = null
            )
        )
    }

    fun store(handoff: NexusHandoff) {
        val store = readStore(pruneExpired = true).toMutableMap()
        val safeHandoff = handoff.copy(
            moduleId = ModuleIds.normalize(handoff.moduleId) ?: handoff.moduleId,
            sourceModuleId = ModuleIds.normalize(handoff.sourceModuleId) ?: handoff.sourceModuleId,
            content = handoff.content.take(MAX_CONTENT)
        )

        store[safeHandoff.moduleId] = safeHandoff
        writeStore(store)
        publishPendingModuleIds(store)
    }

    fun consume(moduleId: String): NexusHandoff? {
        val store = readStore(pruneExpired = true).toMutableMap()
        val key = ModuleIds.equivalents(moduleId).firstOrNull { store.containsKey(it) } ?: return null
        val handoff = store[key] ?: return null
        store.remove(key)
        writeStore(store)
        publishPendingModuleIds(store)
        return handoff
    }

    fun hasPending(moduleId: String): Boolean {
        val store = readStore(pruneExpired = true)
        return ModuleIds.equivalents(moduleId).any { store.containsKey(it) }
    }

    private fun readStore(pruneExpired: Boolean = false): Map<String, NexusHandoff> {
        val raw = settings.getString(STORAGE_KEY, null) ?: return emptyMap()
        val decoded = try {
            json.decodeFromString<Map<String, NexusHandoff>>(raw)
        } catch (_: Exception) {
            emptyMap()
        }
        if (!pruneExpired) {
            return decoded
        }
        val pruned = decoded.toMutableMap()
        pruneExpired(pruned)
        if (pruned.size != decoded.size) {
            writeStore(pruned)
        }
        return pruned
    }

    private fun writeStore(next: Map<String, NexusHandoff>) {
        val payload = json.encodeToString(next)
        settings.putString(STORAGE_KEY, payload)
    }

    private fun pruneExpired(store: MutableMap<String, NexusHandoff>) {
        val iterator = store.iterator()
        while (iterator.hasNext()) {
            val entry = iterator.next()
            if (!isFresh(entry.value)) {
                iterator.remove()
            }
        }
    }

    private fun isFresh(handoff: NexusHandoff): Boolean {
        val createdAt = runCatching { kotlinx.datetime.Instant.parse(handoff.createdAt) }.getOrNull()
            ?: return false
        val ageMs = Clock.System.now().toEpochMilliseconds() - createdAt.toEpochMilliseconds()
        return ageMs <= HANDOFF_TTL_MS
    }

    private fun loadPendingModuleIds(): Set<String> = readStore(pruneExpired = true).keys

    private fun publishPendingModuleIds(store: Map<String, NexusHandoff>) {
        _pendingModuleIds.value = store.keys
    }

    companion object {
        private const val STORAGE_KEY = "nexus_nexus_handoff"
        private const val MAX_CONTENT = 4000
        private const val HANDOFF_TTL_MS = 10 * 60 * 1000L
    }
}
