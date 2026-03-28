package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.models.FieldDefinition
import com.agnes.nexus.core.domain.models.FieldSchema
import com.agnes.nexus.core.domain.models.ModuleSchemaDefinition
import com.agnes.nexus.core.domain.models.SchemaDiff
import com.agnes.nexus.core.domain.models.SchemaDiffChange
import com.agnes.nexus.core.domain.models.SchemaVersionChange
import com.agnes.nexus.core.domain.services.SpineEventBus
import com.agnes.nexus.core.domain.services.SpineEventPayload
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.encodeToJsonElement
import kotlinx.serialization.json.jsonObject
import com.agnes.nexus.core.domain.models.toMap

/**
 * KMP Schema Registry (web-app source of truth).
 * Handles core schemas, extension fields, validators, and migrations.
 */
object SchemaRegistry {
    private val schemas = mutableMapOf<String, ModuleSchemaDefinition>()
    private val validators = mutableMapOf<String, ModuleSchemaValidator>()
    private val migrations = mutableMapOf<String, List<SchemaMigration>>()
    private val schemaCache = mutableMapOf<String, FieldSchema>()
    private val extensionCache = mutableMapOf<String, List<FieldDefinition>>()
    private var spineEventBus: SpineEventBus? = null
    private var dataLayer: NexusDataLayer? = null
    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.Default)
    private val json = Json { ignoreUnknownKeys = true }

    fun bindSpine(eventBus: SpineEventBus) {
        spineEventBus = eventBus
    }

    fun bindDataLayer(layer: NexusDataLayer) {
        dataLayer = layer
    }

    fun registerSchema(definition: ModuleSchemaDefinition) {
        schemas[definition.moduleId] = definition
        schemaCache.remove(definition.moduleId)
    }

    fun registerValidator(moduleId: String, validator: ModuleSchemaValidator) {
        validators[moduleId] = validator
    }

    fun registerMigrations(moduleId: String, migrations: List<SchemaMigration>) {
        this.migrations[moduleId] = migrations
    }

    fun getSchema(moduleId: String): FieldSchema? {
        schemaCache[moduleId]?.let { return it }
        val definition = schemas[moduleId] ?: return null
        val extensions = extensionCache[moduleId] ?: emptyList()
        val schema = definition.coreSchema.copy(extensionFields = extensions)
        schemaCache[moduleId] = schema
        return schema
    }

    fun getCoreSchema(moduleId: String): FieldSchema? = schemas[moduleId]?.coreSchema

    fun getExtensions(moduleId: String): List<FieldDefinition> = extensionCache[moduleId] ?: emptyList()

    fun isExtensionAllowed(moduleId: String): Boolean = schemas[moduleId]?.allowExtensions == true

    fun getSchemaVersion(moduleId: String): String = schemas[moduleId]?.version ?: "0.0.0"

    fun setExtensions(moduleId: String, fields: List<FieldDefinition>) {
        extensionCache[moduleId] = fields
        schemaCache.remove(moduleId)
    }

    fun validateExtension(moduleId: String, field: FieldDefinition): ValidationResult {
        val errors = mutableListOf<ValidationError>()
        val definition = schemas[moduleId]
            ?: return ValidationResult(false, listOf(ValidationError("schema", "Schema not found", "SCHEMA_NOT_FOUND")))

        if (!definition.allowExtensions) {
            errors += ValidationError("extension", "Extensions are not allowed", "EXTENSIONS_DISABLED")
            return ValidationResult(false, errors)
        }

        val max = definition.maxExtensionFields
        if (max != null && getExtensions(moduleId).size >= max) {
            errors += ValidationError("extension", "Extension field limit reached", "EXTENSION_LIMIT")
        }

        val schema = getSchema(moduleId)
        val allIds = (schema?.coreFields.orEmpty() + schema?.extensionFields.orEmpty()).map { it.id }.toSet()
        if (allIds.contains(field.id)) {
            errors += ValidationError("id", "Field ID already exists", "DUPLICATE_FIELD_ID")
        }

        validators[moduleId]?.let { validator ->
            if (!validator.isFieldNameAllowed(field.name)) {
                errors += ValidationError("name", "Field name not allowed", "INVALID_FIELD_NAME")
            }
            if (validator.getRestrictedFieldIds().contains(field.id)) {
                errors += ValidationError("id", "Field ID is restricted", "RESTRICTED_FIELD_ID")
            }
            val moduleResult = validator.validateExtension(field)
            if (!moduleResult.valid) {
                errors += moduleResult.errors
            }
        }

        val definitionIssues = FieldSystemManager.validateDefinition(field)
        if (definitionIssues.isNotEmpty()) {
            definitionIssues.forEach { issue ->
                errors += ValidationError(
                    field = issue.path ?: "definition",
                    message = issue.message,
                    code = issue.code
                )
            }
        }

        return ValidationResult(errors.isEmpty(), errors)
    }

    fun addExtension(moduleId: String, field: FieldDefinition): ValidationResult {
        return extendSchema(moduleId, listOf(field))
    }

    fun extendSchema(moduleId: String, fields: List<FieldDefinition>): ValidationResult {
        val errors = mutableListOf<ValidationError>()
        val definition = schemas[moduleId]
        val current = extensionCache[moduleId] ?: emptyList()
        if (definition?.maxExtensionFields != null) {
            val max = definition.maxExtensionFields
            if (current.size + fields.size > max) {
                errors += ValidationError("extensions", "Maximum extension fields ($max) reached", "MAX_EXTENSIONS_REACHED")
            }
        }

        fields.forEach { field ->
            val result = validateExtension(moduleId, field)
            if (!result.valid) errors += result.errors
        }

        if (errors.isNotEmpty()) return ValidationResult(false, errors)

        extensionCache[moduleId] = current + fields
        schemaCache.remove(moduleId)

        emitSpineEvent(
            SpineEventPayload(
                type = "SCHEMA_EXTENDED",
                source = "schema-registry",
                domain = "system",
                priority = "alert",
                data = mapOf(
                    "moduleId" to moduleId,
                    "fields" to fields.map { it.id },
                    "count" to fields.size
                ),
                cascadeDepth = 0
            )
        )

        return ValidationResult(true, emptyList())
    }

    fun removeExtension(moduleId: String, fieldId: String): ValidationResult {
        val extensions = extensionCache[moduleId] ?: emptyList()
        val filtered = extensions.filter { it.id != fieldId }

        if (filtered.size == extensions.size) {
            return ValidationResult(false, listOf(ValidationError("fieldId", "Extension field not found", "NOT_FOUND")))
        }

        extensionCache[moduleId] = filtered
        schemaCache.remove(moduleId)

        emitSpineEvent(
            SpineEventPayload(
                type = "SCHEMA_MODIFIED",
                source = "schema-registry",
                domain = "system",
                priority = "alert",
                data = mapOf(
                    "moduleId" to moduleId,
                    "action" to "remove_extension",
                    "fieldId" to fieldId
                ),
                cascadeDepth = 0
            )
        )

        return ValidationResult(true, emptyList())
    }

    fun compareSchemas(schema1: FieldSchema, schema2: FieldSchema): SchemaDiff {
        return FieldSystemManager.compareFieldSchemas(schema1, schema2)
    }

    fun migrateSchema(moduleId: String, fromVersion: String, toVersion: String): FieldSchema {
        val migration = migrations[moduleId]?.find { it.from == fromVersion && it.to == toVersion }
            ?: throw IllegalStateException("No migration found from $fromVersion to $toVersion for $moduleId")

        val schema = getSchema(moduleId) ?: throw IllegalStateException("Schema not found for $moduleId")
        val migrated = migration.up(schema)
        schemaCache[moduleId] = migrated

        emitSpineEvent(
            SpineEventPayload(
                type = "SCHEMA_MIGRATED",
                source = "schema-registry",
                domain = "system",
                priority = "critical",
                data = mapOf(
                    "moduleId" to moduleId,
                    "fromVersion" to fromVersion,
                    "toVersion" to toVersion
                ),
                cascadeDepth = 0
            )
        )

        return migrated
    }

    fun diffSchemas(oldSchema: FieldSchema, newSchema: FieldSchema): SchemaDiff {
        return compareSchemas(oldSchema, newSchema)
    }

    /**
     * Load extensions from persistence (Firestore via NexusDataLayer).
     */
    suspend fun loadExtensions(userId: String, moduleId: String) {
        val layer = dataLayer ?: run {
            extensionCache[moduleId] = emptyList()
            return
        }

        try {
            val data = layer.getDocument("custom_schemas/$userId/modules", moduleId) {
                json.decodeFromString(FirestoreCustomSchema.serializer(), it)
            }

            if (data != null) {
                extensionCache[moduleId] = data.extensionFields
                schemaCache.remove(moduleId)
            } else {
                extensionCache[moduleId] = emptyList()
            }
        } catch (_: Exception) {
            extensionCache[moduleId] = emptyList()
        }
    }

    /**
     * Save extensions to persistence (Firestore via NexusDataLayer).
     */
    suspend fun saveExtensions(userId: String, moduleId: String) {
        val layer = dataLayer ?: return
        val extensions = extensionCache[moduleId] ?: emptyList()
        val definition = schemas[moduleId] ?: throw IllegalStateException("Module $moduleId not found")

        val data = FirestoreCustomSchema(
            moduleId = moduleId,
            extensionFields = extensions,
            version = definition.version,
            lastModified = kotlinx.datetime.Clock.System.now().toString()
        )

        val payload = json.encodeToJsonElement(FirestoreCustomSchema.serializer(), data).jsonObject.toMap()
        layer.setDocument("custom_schemas/$userId/modules", moduleId, payload)
    }

    fun clearCache() {
        schemaCache.clear()
        extensionCache.clear()
    }

    /**
     * Reset registry (test helper).
     */
    fun reset() {
        schemas.clear()
        validators.clear()
        migrations.clear()
        schemaCache.clear()
        extensionCache.clear()
        spineEventBus = null
        dataLayer = null
    }

    private fun emitSpineEvent(payload: SpineEventPayload) {
        spineEventBus?.let { bus ->
            scope.launch {
                runCatching { bus.emit(payload) }
            }
        }
    }
}

@Serializable
data class FirestoreCustomSchema(
    val moduleId: String,
    val extensionFields: List<FieldDefinition>,
    val version: String,
    val lastModified: String
)

interface ModuleSchemaValidator {
    fun validateExtension(field: FieldDefinition): ValidationResult
    fun isFieldNameAllowed(name: String): Boolean
    fun getRestrictedFieldIds(): List<String>
}

data class ValidationError(
    val field: String,
    val message: String,
    val code: String
)

data class ValidationResult(
    val valid: Boolean,
    val errors: List<ValidationError>
)

data class SchemaMigration(
    val from: String,
    val to: String,
    val up: (FieldSchema) -> FieldSchema,
    val down: (FieldSchema) -> FieldSchema
)
