package com.agnes.nexus.core.rag

/**
 * Placeholder native adapter; wire real vector store or on-device embeddings here.
 */
class NativeRagAdapter : RagAdapter {
    override val id: String = "native"
    override val requiresVault: Boolean = true

    override suspend fun retrieve(options: RagRetrieveOptions): RagRetrieveResult {
        // Stub keeps parity with the web layer while the native store is wired up.
        return RagRetrieveResult(
            query = options.query,
            matches = emptyList(),
            adapterId = id,
            requiresVault = options.requiresVault || requiresVault
        )
    }
}
