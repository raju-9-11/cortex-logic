package com.agnes.nexus.core.domain.services

/**
 * JS/Web actual implementation of [VaultKeyManager].
 *
 * Stores key material as Base64 strings in [kotlinx.browser.localStorage] under
 * the namespace prefix `nexus_key_<alias>`.
 *
 * Security notes:
 * - localStorage is same-origin isolated but not encrypted at rest.
 * - For production, wrap key bytes with SubtleCrypto AES-GCM using a user-derived
 *   wrapping key (PBKDF2) before storing. The interface contract is preserved below.
 * - Web Crypto (SubtleCrypto) is only available in secure contexts (HTTPS / localhost).
 *   Ensure the app is served over HTTPS before relying on this implementation.
 *
 * The Base64 codec below is a pure-Kotlin RFC 4648 implementation with no external
 * dependencies — it operates identically on all JS runtimes (browser, Node.js).
 */
actual class VaultKeyManager actual constructor(
    @Suppress("UNUSED_PARAMETER") context: PlatformContext
) {

    /**
     * Encode [keyData] as Base64 and persist it under `nexus_key_<keyAlias>`.
     *
     * @param keyAlias Unique identifier for the key (e.g. "vault_master", "session_key").
     * @param keyData  Raw key bytes to persist.
     */
    actual suspend fun storeKey(keyAlias: String, keyData: ByteArray) {
        kotlinx.browser.localStorage.setItem(storageKey(keyAlias), keyData.encodeBase64())
    }

    /**
     * Retrieve and decode the key stored under [keyAlias].
     *
     * @return The raw key bytes, or `null` if no entry exists for [keyAlias].
     */
    actual suspend fun retrieveKey(keyAlias: String): ByteArray? =
        kotlinx.browser.localStorage.getItem(storageKey(keyAlias))?.decodeBase64()

    /**
     * Remove the key entry for [keyAlias] from localStorage.
     * No-op if the alias does not exist.
     */
    actual suspend fun clearKey(keyAlias: String) {
        kotlinx.browser.localStorage.removeItem(storageKey(keyAlias))
    }

    private fun storageKey(alias: String): String = "nexus_key_$alias"
}

// ── Pure-Kotlin RFC 4648 Base64 codec ────────────────────────────────────────

private const val BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

/**
 * Encode this [ByteArray] to a Base64 string (standard alphabet, with padding).
 * Complexity: O(n), where n = [ByteArray.size].
 */
private fun ByteArray.encodeBase64(): String {
    val sb = StringBuilder(((size + 2) / 3) * 4)
    var i = 0
    while (i < size) {
        val b0 = this[i].toInt() and 0xFF
        val b1 = if (i + 1 < size) this[i + 1].toInt() and 0xFF else 0
        val b2 = if (i + 2 < size) this[i + 2].toInt() and 0xFF else 0

        sb.append(BASE64_CHARS[b0 shr 2])
        sb.append(BASE64_CHARS[(b0 and 0x3) shl 4 or (b1 shr 4)])
        sb.append(if (i + 1 < size) BASE64_CHARS[(b1 and 0xF) shl 2 or (b2 shr 6)] else '=')
        sb.append(if (i + 2 < size) BASE64_CHARS[b2 and 0x3F] else '=')
        i += 3
    }
    return sb.toString()
}

/**
 * Decode a Base64-encoded [String] back to a [ByteArray].
 * Handles standard padding (`=`). Ignores trailing padding characters.
 * Complexity: O(n), where n = [String.length].
 */
private fun String.decodeBase64(): ByteArray {
    val clean = trimEnd('=')
    val outputSize = clean.length * 3 / 4
    val output = ByteArray(outputSize + 3) // +3 guards against length rounding
    var outIdx = 0
    var i = 0
    while (i < clean.length) {
        val c0 = BASE64_CHARS.indexOf(clean[i])
        val c1 = if (i + 1 < clean.length) BASE64_CHARS.indexOf(clean[i + 1]) else 0
        val c2 = if (i + 2 < clean.length) BASE64_CHARS.indexOf(clean[i + 2]) else 0
        val c3 = if (i + 3 < clean.length) BASE64_CHARS.indexOf(clean[i + 3]) else 0

        output[outIdx++] = ((c0 shl 2) or (c1 shr 4)).toByte()
        if (i + 2 < clean.length) output[outIdx++] = ((c1 shl 4) or (c2 shr 2)).toByte()
        if (i + 3 < clean.length) output[outIdx++] = ((c2 shl 6) or c3).toByte()
        i += 4
    }
    return output.copyOf(outIdx)
}
