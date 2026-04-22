package com.agnes.ara.core.domain.services

import com.agnes.ara.core.domain.models.ModuleManifest
import com.agnes.ara.core.domain.models.toMap
import kotlinx.datetime.Clock
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.encodeToJsonElement
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.json.put

@Serializable
data class EncryptedData(
    val ciphertext: String,
    val iv: String,
    val salt: String? = null
)

@Serializable
data class ModuleExportData(
    val profile: EncryptedData,
    val customFields: List<JsonObject> = emptyList(),
    val memory: JsonObject? = null,
    val metadata: ExportMetadata
)

@Serializable
data class ExportMetadata(
    val lastModified: String,
    val recordCount: Int,
    val moduleId: String,
    val moduleName: String
)

@Serializable
data class DataExport(
    val version: String,
    val timestamp: String,
    val userId: String,
    val checksum: String,
    val modules: Map<String, ModuleExportData>,
    val globalSoul: EncryptedData? = null,
    val coreProfile: EncryptedData? = null
)

@Serializable
data class ExportOptions(
    val includeMemory: Boolean = false,
    val includeHistory: Boolean = false,
    val modules: List<String>? = null
)

@Serializable
data class ImportOptions(
    val dryRun: Boolean = false,
    val conflictResolution: ConflictResolution = ConflictResolution.REPLACE,
    val backupBeforeImport: Boolean = false
)

@Serializable
enum class ConflictResolution {
    @SerialName("replace")
    REPLACE,
    @SerialName("merge")
    MERGE,
    @SerialName("skip")
    SKIP
}

@Serializable
data class ImportPreview(
    val modulesAffected: List<String>,
    val recordCount: Int,
    val conflicts: List<ImportConflict> = emptyList(),
    val warnings: List<String> = emptyList(),
    val errors: List<String> = emptyList(),
    val compatible: Boolean = true
)

@Serializable
data class ImportConflict(
    val moduleId: String,
    val field: String,
    val currentValue: JsonElement,
    val incomingValue: JsonElement
)

@Serializable
data class ImportResult(
    val success: Boolean,
    val modulesImported: List<String>,
    val recordsImported: Int,
    val errors: List<String> = emptyList(),
    val backupId: String? = null
)

/**
 * Shared data transfer service (export/import) with vault-safe defaults.
 * Keeps sensitive payloads encrypted in transit; only uses platform VaultBoundary
 * if callers explicitly decrypt.
 */
class DataTransferService(
    private val dataLayer: AraDataLayer,
    private val json: Json = Json { ignoreUnknownKeys = true }
) {
    companion object {
        const val DATA_EXPORT_VERSION = "1.0.0"

        private val MODULE_COLLECTIONS = mapOf(
            "agnes" to "agnes_profiles",
            "titan" to "titan_profiles",
            "atlas" to "atlas_profiles",
            "ledger" to "ledger_profiles",
            "scout" to "scout_profiles",
            "forge" to "forge_profiles",
            "soma" to "soma_profiles"
        )

        private const val GLOBAL_SOUL_COLLECTION = "global_souls"
        private const val CORE_PROFILE_COLLECTION = "users"
        private const val MODULE_MEMORY_COLLECTION = "module_memory"
        private const val BACKUP_COLLECTION = "data_backups"
    }

    suspend fun exportAll(userId: String, options: ExportOptions = ExportOptions()): DataExport {
        val moduleIds = options.modules ?: MODULE_COLLECTIONS.keys.toList()
        val modules = moduleIds.mapNotNull { id ->
            exportModule(id, userId, options)?.let { id to it }
        }.toMap()

        val globalSoul = exportEncryptedDoc(GLOBAL_SOUL_COLLECTION, userId)
        val coreProfile = exportEncryptedDoc(CORE_PROFILE_COLLECTION, userId)

        val export = DataExport(
            version = DATA_EXPORT_VERSION,
            timestamp = Clock.System.now().toString(),
            userId = userId,
            checksum = "",
            modules = modules,
            globalSoul = globalSoul,
            coreProfile = coreProfile
        )

        val checksum = generateChecksum(export)
        return export.copy(checksum = checksum)
    }

    suspend fun exportModule(moduleId: String, userId: String, options: ExportOptions = ExportOptions()): ModuleExportData? {
        val collection = MODULE_COLLECTIONS[moduleId] ?: return null
        val payload = dataLayer.getDocument(collection, userId) { json.parseToJsonElement(it).jsonObject } ?: return null

        val encrypted = mapToEncryptedData(payload) ?: return null

        val customFields = (payload["customFieldDefinitions"] as? JsonElement)?.let { element ->
            (element as? kotlinx.serialization.json.JsonArray)?.mapNotNull { it as? JsonObject } ?: emptyList()
        } ?: emptyList()

        val memory = if (options.includeMemory) {
            val memoryId = "${userId}_$moduleId"
            dataLayer.getDocument(MODULE_MEMORY_COLLECTION, memoryId) { json.parseToJsonElement(it).jsonObject }
        } else {
            null
        }

        return ModuleExportData(
            profile = encrypted,
            customFields = customFields,
            memory = memory,
            metadata = ExportMetadata(
                lastModified = payload["lastUpdated"]?.jsonPrimitive?.contentOrNull ?: Clock.System.now().toString(),
                recordCount = 1 + if (memory != null) 1 else 0,
                moduleId = moduleId,
                moduleName = ModuleManifest.byId(moduleId)?.title ?: moduleId
            )
        )
    }

    suspend fun previewImport(data: DataExport, userId: String): ImportPreview {
        val preview = validateImport(data)
        if (!preview.compatible) return preview

        if (data.userId == userId) return preview
        val warnings = preview.warnings.toMutableList()
        warnings += "Import is from different user (${data.userId}). Importing to current user ($userId)."
        return preview.copy(warnings = warnings)
    }

    suspend fun importData(data: DataExport, userId: String, options: ImportOptions = ImportOptions()): ImportResult {
        val preview = validateImport(data)
        if (!preview.compatible) {
            return ImportResult(false, emptyList(), 0, errors = preview.errors)
        }

        if (options.dryRun) {
            return ImportResult(
                success = preview.compatible,
                modulesImported = preview.modulesAffected,
                recordsImported = preview.recordCount,
                errors = preview.errors
            )
        }

        var backupId: String? = null
        if (options.backupBeforeImport) {
            val backupPayload = mapOf(
                "userId" to userId,
                "createdAt" to Clock.System.now().toString(),
                "export" to json.encodeToJsonElement(DataExport.serializer(), data).jsonObject
            )
            backupId = dataLayer.createDocument(BACKUP_COLLECTION, backupPayload)
        }

        val errors = mutableListOf<String>()
        val importedModules = mutableListOf<String>()
        var recordCount = 0

        data.modules.forEach { (moduleId, moduleData) ->
            val collection = MODULE_COLLECTIONS[moduleId]
            if (collection == null) {
                errors += "No collection mapping for module $moduleId"
                return@forEach
            }

            val payload = mapOf(
                "encryptedData" to moduleData.profile.ciphertext,
                "iv" to moduleData.profile.iv,
                "salt" to (moduleData.profile.salt ?: "vault_salt_used"),
                "customFieldDefinitions" to moduleData.customFields,
                "lastUpdated" to moduleData.metadata.lastModified
            )

            when (options.conflictResolution) {
                ConflictResolution.SKIP -> {
                    val existing = dataLayer.getDocument(collection, userId) { json.parseToJsonElement(it).jsonObject }
                    if (existing != null) return@forEach
                }
                ConflictResolution.REPLACE -> Unit
                ConflictResolution.MERGE -> Unit // merge is noop for now; replace behavior on same keys
            }

            dataLayer.setDocument(collection, userId, payload)

            moduleData.memory?.let { memory ->
                val memoryId = "${userId}_$moduleId"
                dataLayer.setDocument(MODULE_MEMORY_COLLECTION, memoryId, memory.toMap())
                recordCount += 1
            }

            importedModules += moduleId
            recordCount += 1
        }

        data.globalSoul?.let { soul ->
            dataLayer.setDocument(
                GLOBAL_SOUL_COLLECTION,
                userId,
                mapOf("encryptedData" to soul.ciphertext, "iv" to soul.iv, "salt" to (soul.salt ?: "vault_salt_used"))
            )
            recordCount += 1
        }

        data.coreProfile?.let { core ->
            dataLayer.setDocument(
                CORE_PROFILE_COLLECTION,
                userId,
                mapOf("encryptedData" to core.ciphertext, "iv" to core.iv, "salt" to (core.salt ?: "vault_salt_used"))
            )
            recordCount += 1
        }

        return ImportResult(
            success = errors.isEmpty(),
            modulesImported = importedModules,
            recordsImported = recordCount,
            errors = errors,
            backupId = backupId
        )
    }

    private fun mapToEncryptedData(payload: JsonObject): EncryptedData? {
        val ciphertext = payload["encryptedData"]?.jsonPrimitive?.contentOrNull
            ?: payload["ciphertext"]?.jsonPrimitive?.contentOrNull
            ?: return null
        val iv = payload["iv"]?.jsonPrimitive?.contentOrNull ?: return null
        val salt = payload["salt"]?.jsonPrimitive?.contentOrNull
        return EncryptedData(ciphertext = ciphertext, iv = iv, salt = salt)
    }

    fun validateImport(importData: DataExport): ImportPreview {
        val preview = ImportPreview(
            modulesAffected = emptyList(),
            recordCount = 0,
            conflicts = emptyList(),
            warnings = emptyList(),
            errors = emptyList(),
            compatible = false
        )

        val (majorImport) = importData.version.split('.').mapNotNull { it.toIntOrNull() }.ifEmpty { listOf(0) }
        val (majorCurrent) = DATA_EXPORT_VERSION.split('.').mapNotNull { it.toIntOrNull() }.ifEmpty { listOf(0) }

        if (majorImport > majorCurrent) {
            return preview.copy(
                errors = listOf("Incompatible version: ${importData.version} (current: $DATA_EXPORT_VERSION)"),
                compatible = false
            )
        }

        val warnings = mutableListOf<String>()
        if (majorImport < majorCurrent) {
            warnings += "Import from older version ${importData.version}. Data migration may be needed."
        }

        if (importData.checksum.isBlank()) {
            return preview.copy(errors = listOf("Missing checksum"), compatible = false)
        }

        val checksumValid = verifyChecksum(importData, importData.checksum)
        if (!checksumValid) {
            return preview.copy(
                errors = listOf("Checksum verification failed - data may be corrupted"),
                compatible = false
            )
        }

        val moduleIds = importData.modules.keys.toList()
        var recordCount = 0
        moduleIds.forEach { moduleId ->
            val moduleData = importData.modules[moduleId]
            if (moduleData != null) {
                recordCount += moduleData.metadata.recordCount
            }
            if (ModuleManifest.byId(moduleId) == null) {
                warnings += "Module $moduleId not found in current installation"
            }
        }

        return ImportPreview(
            modulesAffected = moduleIds,
            recordCount = recordCount,
            conflicts = emptyList(),
            warnings = warnings,
            errors = emptyList(),
            compatible = true
        )
    }

    private fun generateChecksum(data: DataExport): String {
        val payload = payloadWithoutChecksum(data)
        return sha256Hex(payload)
    }

    private fun verifyChecksum(data: DataExport, expected: String): Boolean {
        val payload = payloadWithoutChecksum(data)
        return sha256Hex(payload) == expected
    }

    private fun payloadWithoutChecksum(data: DataExport): String {
        val element = json.encodeToJsonElement(DataExport.serializer(), data).jsonObject
        val filtered = buildJsonObject {
            element.forEach { (key, value) ->
                if (key != "checksum") {
                    put(key, value)
                }
            }
        }
        return json.encodeToString(JsonObject.serializer(), filtered)
    }

    private suspend fun exportEncryptedDoc(collection: String, id: String): EncryptedData? {
        val doc = dataLayer.getDocument(collection, id) { json.parseToJsonElement(it).jsonObject } ?: return null
        return mapToEncryptedData(doc)
    }
}
