package com.agnes.ara.core.domain.services

import com.agnes.ara.core.domain.models.FieldDefinition
import com.agnes.ara.core.domain.models.FieldSchema
import com.agnes.ara.core.domain.models.FieldType
import com.agnes.ara.core.domain.models.SchemaDiff
import com.agnes.ara.core.domain.models.EncryptedEnvelope
import com.agnes.ara.core.domain.models.toMap
import kotlinx.datetime.Clock
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.intOrNull
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.put
import kotlin.random.Random

/**
 * Migration service (shared logic only).
 * Keeps parity with web by exposing diff + migration helpers.
 */
object MigrationService {
    private var dataLayer: AraDataLayer? = null
    private val json = Json { ignoreUnknownKeys = true }
    private var vaultBoundary: VaultBoundary? = null

    fun bindVaultBoundary(vault: VaultBoundary) {
        vaultBoundary = vault
    }

    fun bindDataLayer(layer: AraDataLayer) {
        dataLayer = layer
    }

    @Serializable
    data class MigrationPreview(
        val userId: String,
        val moduleId: String? = null,
        val changes: List<MigrationChange>,
        val backupCreated: Boolean,
        val estimatedTime: Long,
        val warnings: List<String> = emptyList()
    )

    @Serializable
    data class MigrationChange(
        val moduleId: String,
        val profilePath: String,
        val changeType: String,
        val before: ProfileSnapshot,
        val after: ProfileSnapshot,
        val description: String
    )

    @Serializable
    data class ProfileSnapshot(
        val hasSchemaVersion: Boolean,
        val hasEncryptionVersion: Boolean,
        val hasCoreFields: Boolean,
        val hasExtensionFields: Boolean,
        val fieldCount: Int,
        val customFieldCount: Int,
        val version: String? = null,
        val encryptionVersion: Int? = null
    )

    @Serializable
    data class MigrationResult(
        val userId: String,
        val moduleId: String? = null,
        val migrationId: String,
        val status: String,
        val startedAt: String,
        val completedAt: String,
        val profilesMigrated: Int,
        val profilesFailed: Int,
        val backupId: String,
        val errors: List<MigrationError>,
        val summary: String
    )

    @Serializable
    data class MigrationError(
        val moduleId: String,
        val profilePath: String,
        val error: String,
        val stack: String? = null
    )

    @Serializable
    data class ModuleMigrationStatus(
        val moduleId: String,
        val needsMigration: Boolean,
        val currentVersion: String? = null,
        val targetVersion: String,
        val reason: String
    )

    data class MigrationBackup(
        val backupId: String,
        val userId: String,
        val createdAt: String,
        val moduleSnapshots: Map<String, Map<String, Any?>>,
        val metadata: Map<String, String>
    )

    private const val CURRENT_MIGRATION_VERSION = "1.0.0"
    private const val CURRENT_ENCRYPTION_VERSION = 2
    private const val MIGRATION_COLLECTION = "migrations"
    private const val BACKUP_COLLECTION = "migration_backups"

    private val MODULE_COLLECTIONS = mapOf(
        "agnes" to "agnes_profiles",
        "titan" to "titan_profiles",
        "ledger" to "ledger_profiles",
        "soma" to "soma_profiles",
        "atlas" to "atlas_profiles"
    )

    fun previewSchemaMigration(moduleId: String, before: FieldSchema, after: FieldSchema): MigrationPreview {
        val diff = FieldSystemManager.compareFieldSchemas(before, after)
        val fieldCount = (after.coreFields + after.extensionFields).size
        return MigrationPreview(
            userId = "",
            moduleId = moduleId,
            changes = listOf(
                MigrationChange(
                    moduleId = moduleId,
                    profilePath = "",
                    changeType = "version_update",
                    before = snapshotFromSchema(before),
                    after = snapshotFromSchema(after),
                    description = "Schema version update"
                )
            ),
            backupCreated = false,
            estimatedTime = 0,
            warnings = emptyList()
        )
    }

    suspend fun previewMigration(
        userId: String,
        moduleId: String? = null,
        encryptionKey: String? = null
    ): MigrationPreview {
        val layer = dataLayer ?: return MigrationPreview(userId, moduleId, emptyList(), false, 0, listOf("DataLayer not bound"))
        val changes = mutableListOf<MigrationChange>()
        val warnings = mutableListOf<String>()
        var estimatedTime = 0L

        val modules = moduleId?.let { listOf(it) } ?: MODULE_COLLECTIONS.keys.toList()
        for (mod in modules) {
            val collection = MODULE_COLLECTIONS[mod]
            if (collection == null) {
                warnings += "No collection mapping found for module: $mod"
                continue
            }
            val record = layer.getDocument(collection, userId) { json.parseToJsonElement(it).jsonObject } ?: continue
            val change = analyzeProfile(mod, collection, record, encryptionKey)
            if (change != null) {
                changes += change
                estimatedTime += 500
            }
        }

        return MigrationPreview(
            userId = userId,
            moduleId = moduleId,
            changes = changes,
            backupCreated = false,
            estimatedTime = estimatedTime,
            warnings = warnings
        )
    }

    suspend fun migrateUserData(
        userId: String,
        moduleId: String? = null,
        encryptionKey: String? = null
    ): MigrationResult {
        val layer = dataLayer
            ?: return MigrationResult(userId, moduleId, "", "failed", "", "", 0, 0, "", listOf(MigrationError("", "", "DataLayer not bound")), "Migration failed")

        val migrationId = "mig_${Clock.System.now().toEpochMilliseconds()}_${userId}"
        val startedAt = Clock.System.now().toString()
        val errors = mutableListOf<MigrationError>()
        var migrated = 0
        var failed = 0

        val backupId = createBackup(userId, reason = "pre_migration", migrationId = migrationId)
        val modules = moduleId?.let { listOf(it) } ?: MODULE_COLLECTIONS.keys.toList()

        for (mod in modules) {
            val collection = MODULE_COLLECTIONS[mod] ?: continue
            try {
                val record = layer.getDocument(collection, userId) { json.parseToJsonElement(it).jsonObject } ?: continue
                val updated = applyMigrationToRecord(mod, record, encryptionKey)
                layer.setDocument(collection, userId, updated)
                migrated += 1
            } catch (e: Exception) {
                failed += 1
                errors += MigrationError(mod, "$collection/$userId", e.message ?: "Unknown error")
            }
        }

        val completedAt = Clock.System.now().toString()
        val status = if (errors.isEmpty()) "success" else if (migrated > 0) "partial" else "failed"
        val summary = "Migrated $migrated profiles, $failed failures."

        layer.createDocument(
            MIGRATION_COLLECTION,
            mapOf(
                "migrationId" to migrationId,
                "userId" to userId,
                "moduleId" to moduleId,
                "status" to status,
                "startedAt" to startedAt,
                "completedAt" to completedAt,
                "profilesMigrated" to migrated,
                "profilesFailed" to failed,
                "backupId" to backupId,
                "errors" to errors.map { it.copy().toString() },
                "summary" to summary,
                "version" to CURRENT_MIGRATION_VERSION
            )
        )

        return MigrationResult(
            userId = userId,
            moduleId = moduleId,
            migrationId = migrationId,
            status = status,
            startedAt = startedAt,
            completedAt = completedAt,
            profilesMigrated = migrated,
            profilesFailed = failed,
            backupId = backupId,
            errors = errors,
            summary = summary
        )
    }

    suspend fun rollbackMigration(userId: String, backupId: String): Boolean {
        val layer = dataLayer ?: return false
        val backup = layer.getDocument(BACKUP_COLLECTION, backupId) { json.parseToJsonElement(it).jsonObject } ?: return false
        val snapshots = backup["moduleSnapshots"] as? JsonObject ?: return false
        val snapshotMap = snapshots.toMap()

        snapshotMap.forEach { (moduleId, payload) ->
            val collection = MODULE_COLLECTIONS[moduleId] ?: return@forEach
            val data = (payload as? Map<*, *>)?.mapKeys { it.key.toString() } as? Map<String, Any?> ?: return@forEach
            layer.setDocument(collection, userId, data)
        }
        return true
    }

    suspend fun needsMigration(userId: String): List<ModuleMigrationStatus> {
        val layer = dataLayer ?: return emptyList()
        val statuses = mutableListOf<ModuleMigrationStatus>()
        for (mod in MODULE_COLLECTIONS.keys) {
            val collection = MODULE_COLLECTIONS[mod] ?: continue
            val record = layer.getDocument(collection, userId) { json.parseToJsonElement(it).jsonObject }
            val currentVersion = record?.get("schemaVersion")?.jsonPrimitive?.contentOrNull
            val target = SchemaRegistry.getSchemaVersion(mod)
            val needs = currentVersion == null || currentVersion != target
            statuses += ModuleMigrationStatus(
                moduleId = mod,
                needsMigration = needs,
                currentVersion = currentVersion,
                targetVersion = target,
                reason = if (needs) "schema_version_mismatch" else "up_to_date"
            )
        }
        return statuses
    }

    /**
     * Extract custom fields not in core schema.
     */
    fun extractCustomFields(core: FieldSchema, values: JsonObject): List<FieldDefinition> {
        val known = core.coreFields.map { it.id }.toSet()
        return values.keys.filter { it !in known }.map { id ->
            FieldDefinition(
                id = id,
                name = id,
                type = FieldType.TEXT
            )
        }
    }

    private fun snapshotFromSchema(schema: FieldSchema): ProfileSnapshot {
        return ProfileSnapshot(
            hasSchemaVersion = true,
            hasEncryptionVersion = false,
            hasCoreFields = schema.coreFields.isNotEmpty(),
            hasExtensionFields = schema.extensionFields.isNotEmpty(),
            fieldCount = schema.coreFields.size + schema.extensionFields.size,
            customFieldCount = schema.extensionFields.size,
            version = schema.version,
            encryptionVersion = null
        )
    }

    private fun analyzeProfile(
        moduleId: String,
        profilePath: String,
        record: JsonObject,
        encryptionKey: String?
    ): MigrationChange? {
        // Preview is intentionally metadata-only for parity-safety:
        // avoid decrypting in preview unless the caller runs decryption in a suspend context.
        val effective = record
        val schemaVersion = effective["schemaVersion"]?.jsonPrimitive?.contentOrNull
        val encryptionVersion = effective["encryptionVersion"]?.jsonPrimitive?.intOrNull
        val customFields = effective["customFieldDefinitions"] as? kotlinx.serialization.json.JsonArray
        val customFieldCount = customFields?.size ?: 0

        val before = ProfileSnapshot(
            hasSchemaVersion = schemaVersion != null,
            hasEncryptionVersion = encryptionVersion != null,
            hasCoreFields = true,
            hasExtensionFields = customFieldCount > 0,
            fieldCount = customFieldCount,
            customFieldCount = customFieldCount,
            version = schemaVersion,
            encryptionVersion = encryptionVersion
        )

        val targetVersion = SchemaRegistry.getSchemaVersion(moduleId)
        val needsUpdate = schemaVersion == null || schemaVersion != targetVersion
        if (!needsUpdate && encryptionVersion == CURRENT_ENCRYPTION_VERSION) return null

        val after = before.copy(
            hasSchemaVersion = true,
            hasEncryptionVersion = true,
            version = targetVersion,
            encryptionVersion = CURRENT_ENCRYPTION_VERSION
        )

        return MigrationChange(
            moduleId = moduleId,
            profilePath = profilePath,
            changeType = "version_update",
            before = before,
            after = after,
            description = "Update schema/encryption version metadata"
        )
    }

    private suspend fun applyMigrationToRecord(
        moduleId: String,
        record: JsonObject,
        encryptionKey: String?
    ): Map<String, Any?> {
        val targetVersion = SchemaRegistry.getSchemaVersion(moduleId)
        val now = Clock.System.now().toString()

        // If encrypted + we have the crypto boundary + key, decrypt, mutate payload safely,
        // then re-encrypt the payload back into the envelope.
        val cipher = record["encryptedData"]?.jsonPrimitive?.contentOrNull
        val iv = record["iv"]?.jsonPrimitive?.contentOrNull
        if (!cipher.isNullOrBlank() && !iv.isNullOrBlank() && encryptionKey != null && vaultBoundary != null) {
            val decryptedJson = runCatching {
                vaultBoundary!!.decrypt(
                    EncryptedEnvelope(ciphertext = cipher, iv = iv),
                    encryptionKey
                )
            }.getOrNull()

            if (!decryptedJson.isNullOrBlank()) {
                val decryptedElement = json.parseToJsonElement(decryptedJson)
                val decryptedObj = decryptedElement as? JsonObject
                if (decryptedObj != null) {
                    val updatedDecrypted = buildJsonObject {
                        decryptedObj.forEach { (k, v) -> put(k, v) }
                        put("schemaVersion", JsonPrimitive(targetVersion))
                        put("encryptionVersion", JsonPrimitive(CURRENT_ENCRYPTION_VERSION))
                        put("migratedAt", JsonPrimitive(now))
                        put("migrationVersion", JsonPrimitive(CURRENT_MIGRATION_VERSION))
                    }

                    val encrypted = vaultBoundary!!.encrypt(updatedDecrypted.toString(), encryptionKey)
                    val wrapper = record.toMap().toMutableMap()
                    wrapper["encryptedData"] = encrypted.ciphertext
                    wrapper["iv"] = encrypted.iv
                    wrapper["encryptionVersion"] = CURRENT_ENCRYPTION_VERSION
                    wrapper["updatedAt"] = now
                    return wrapper
                }
            }
        }

        // Fallback: update only envelope / plain record.
        val map = record.toMap().toMutableMap()
        map["schemaVersion"] = targetVersion
        map["encryptionVersion"] = CURRENT_ENCRYPTION_VERSION
        map["migratedAt"] = now
        map["migrationVersion"] = CURRENT_MIGRATION_VERSION
        return map
    }

    private suspend fun createBackup(userId: String, reason: String, migrationId: String? = null): String {
        val layer = dataLayer ?: return ""
        val backupId = "backup_${Clock.System.now().toEpochMilliseconds()}_${Random.nextInt(1000, 9999)}"
        val snapshots = mutableMapOf<String, Map<String, Any?>>()

        MODULE_COLLECTIONS.forEach { (moduleId, collection) ->
            val record = layer.getDocument(collection, userId) { json.parseToJsonElement(it).jsonObject }
            if (record != null) {
                snapshots[moduleId] = record.toMap()
            }
        }

        val payload = mapOf(
            "backupId" to backupId,
            "userId" to userId,
            "createdAt" to Clock.System.now().toString(),
            "moduleSnapshots" to snapshots,
            "metadata" to mapOf(
                "reason" to reason,
                "migrationId" to (migrationId ?: "")
            )
        )
        layer.setDocument(BACKUP_COLLECTION, backupId, payload)
        return backupId
    }
}
