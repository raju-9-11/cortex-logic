package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.models.EncryptedEnvelope
import com.agnes.nexus.core.domain.models.Message
import com.agnes.nexus.core.domain.models.MessageRole
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

@Serializable
private data class PersistedMessage(
    val role: String,
    val content: String,
    val model: String? = null,
    val tokensUsed: Int? = null,
    val timestamp: Long
)

/**
 * Session Service - encrypted local persistence for resumable runtime chat state.
 *
 * This is intentionally not an authority for profiles, handoffs, audit history, or
 * Global Soul data; it only keeps in-progress conversational state between visits.
 */
class SessionService(
    private val settings: NexusSettings,
    private val vaultBoundary: VaultBoundary
) {
    private val json = Json {
        ignoreUnknownKeys = true
        encodeDefaults = true
    }

    companion object {
        private const val PREFIX = "nexus_session_"
        private const val MAX_MESSAGES_PER_SESSION = 100
    }

    /**
     * Save messages for a module session (Encrypted).
     */
    suspend fun saveSession(moduleId: String, messages: List<Message>, secretKey: String?) {
        if (secretKey == null) return
        
        try {
            val persisted = messages.takeLast(MAX_MESSAGES_PER_SESSION).map { msg ->
                PersistedMessage(
                    role = msg.role.name,
                    content = msg.content,
                    model = msg.model,
                    tokensUsed = msg.tokensUsed,
                    timestamp = msg.timestamp
                )
            }
            val plainJson = json.encodeToString(persisted)
            val envelope = vaultBoundary.encrypt(plainJson, secretKey)
            val value = "${envelope.iv}:${envelope.ciphertext}"
            settings.putString("$PREFIX$moduleId", value)
        } catch (e: Exception) {
            // Log error
        }
    }

    /**
     * Restore messages for a module session (Decrypted).
     */
    suspend fun restoreSession(moduleId: String, secretKey: String?): List<Message> {
        if (secretKey == null) return emptyList()
        
        return try {
            val stored = settings.getString("$PREFIX$moduleId", null) ?: return emptyList()
            val parts = stored.split(":")
            if (parts.size != 2) return emptyList()
            
            val decryptedJson = vaultBoundary.decrypt(
                EncryptedEnvelope(iv = parts[0], ciphertext = parts[1]),
                secretKey
            )
            
            val persisted = json.decodeFromString<List<PersistedMessage>>(decryptedJson)
            persisted.map { p ->
                Message(
                    role = try {
                        MessageRole.valueOf(p.role)
                    } catch (_: Exception) {
                        MessageRole.USER
                    },
                    content = p.content,
                    model = p.model,
                    tokensUsed = p.tokensUsed,
                    timestamp = p.timestamp
                )
            }
        } catch (e: Exception) {
            emptyList()
        }
    }

    fun clearSession(moduleId: String) {
        settings.remove("$PREFIX$moduleId")
    }

    fun hasSession(moduleId: String): Boolean {
        return settings.contains("$PREFIX$moduleId")
    }
}
