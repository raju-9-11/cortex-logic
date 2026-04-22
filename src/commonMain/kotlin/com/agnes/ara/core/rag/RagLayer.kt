package com.agnes.ara.core.rag

import kotlinx.serialization.Serializable

@Serializable
data class RagRetrieveOptions(
    val query: String,
    val namespace: String? = null,
    val filters: Map<String, String> = emptyMap(),
    val limit: Int = 6,
    val rerank: Boolean = false,
    val requiresVault: Boolean = false
)

@Serializable
data class RagMatch(
    val id: String,
    val content: String,
    val score: Double? = null,
    val metadata: Map<String, String> = emptyMap(),
    val source: String? = null
)

@Serializable
data class RagRetrieveResult(
    val query: String,
    val matches: List<RagMatch> = emptyList(),
    val adapterId: String = "",
    val requiresVault: Boolean = false,
    val tookMs: Long? = null
)

/**
 * Adapter contract for plugging different RAG backends (local/remote).
 * The vault flag allows host apps to gate access before touching protected stores.
 */
interface RagAdapter {
    val id: String
    val requiresVault: Boolean get() = false

    suspend fun retrieve(options: RagRetrieveOptions): RagRetrieveResult
}

class RagAdapterRegistry(adapters: List<RagAdapter> = emptyList()) {
    private val registry = adapters.associateBy { it.id }.toMutableMap()

    fun register(adapter: RagAdapter, replace: Boolean = true) {
        if (!replace && registry.containsKey(adapter.id)) return
        registry[adapter.id] = adapter
    }

    fun resolve(id: String): RagAdapter? = registry[id]

    fun list(): List<RagAdapter> = registry.values.toList()
}

class RagVaultLockedException(
    message: String = "Vault is locked; RAG retrieval is not permitted."
) : IllegalStateException(message)

/**
 * Thin runtime wrapper that enforces vault access rules before delegating to adapters.
 */
class RagRuntime(
    private val registry: RagAdapterRegistry,
    private val isVaultUnlocked: () -> Boolean = { true }
) {
    suspend fun retrieve(adapterId: String, options: RagRetrieveOptions): RagRetrieveResult {
        val adapter = registry.resolve(adapterId)
            ?: throw IllegalArgumentException("No RAG adapter registered for '$adapterId'")

        val vaultRequired = options.requiresVault || adapter.requiresVault
        if (vaultRequired && !isVaultUnlocked()) {
            throw RagVaultLockedException()
        }

        val raw = adapter.retrieve(options)
        val requiresVaultFlag = raw.requiresVault || vaultRequired
        val resolvedAdapterId = if (raw.adapterId.isNotBlank()) raw.adapterId else adapter.id

        return raw.copy(
            adapterId = resolvedAdapterId,
            requiresVault = requiresVaultFlag
        )
    }
}

/**
 * Convenience façade that mirrors the web RAG service surface.
 */
class RagService(
    private val runtime: RagRuntime,
    private val defaultAdapterId: String = "native",
    private val requiresVault: Boolean = false
) {
    suspend fun retrieve(
        query: String,
        adapterId: String? = null,
        namespace: String? = null,
        filters: Map<String, String> = emptyMap(),
        limit: Int = 6,
        rerank: Boolean = false
    ): RagRetrieveResult {
        val options = RagRetrieveOptions(
            query = query,
            namespace = namespace,
            filters = filters,
            limit = limit,
            rerank = rerank,
            requiresVault = requiresVault
        )

        return runtime.retrieve(adapterId ?: defaultAdapterId, options)
    }
}
