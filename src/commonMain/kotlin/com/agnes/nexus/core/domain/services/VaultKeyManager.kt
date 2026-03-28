package com.agnes.nexus.core.domain.services

/**
 * Vault Key Manager - Platform-agnostic contract for secure key storage.
 * Handles the "Sealed Safe" cryptographic boundary.
 */
expect class VaultKeyManager(context: PlatformContext) {
    suspend fun storeKey(keyAlias: String, keyData: ByteArray)
    suspend fun retrieveKey(keyAlias: String): ByteArray?
    suspend fun clearKey(keyAlias: String)
}
