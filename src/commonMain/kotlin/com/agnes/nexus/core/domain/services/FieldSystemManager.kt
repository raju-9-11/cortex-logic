package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.models.*
import com.agnes.nexus.core.domain.models.ValidationResult as ModelValidationResult
import kotlinx.datetime.Clock
import kotlinx.datetime.Instant
import kotlinx.serialization.json.*

/**
 * Field System Manager - Ported from web's field-system.ts.
 * Handles validation, serialization, and consistency for the dynamic UI.
 */
object FieldSystemManager {

    data class CreateFieldParams(
        val id: String,
        val name: String,
        val type: FieldType,
        val description: String? = null,
        val required: Boolean? = null,
        val defaultValue: JsonElement? = null,
        val validation: ValidationRules? = null,
        val metadata: JsonObject? = null,
        val properties: Map<String, FieldDefinition>? = null,
        val options: List<FieldOption>? = null,
        val scope: FieldModuleScope? = null
    )

    /**
     * Creates a validated FieldDefinition.
     */
    fun createFieldDefinition(params: CreateFieldParams): FieldDefinition {
        val id = params.id.trim()
        val name = params.name.trim()

        require(id.isNotBlank()) { "Field ID is required and must be a non-empty string" }
        require(name.isNotBlank()) { "Field name is required and must be a non-empty string" }

        if (!Regex("^[a-zA-Z0-9_-]+$").matches(id)) {
            throw IllegalArgumentException("Field ID must contain only alphanumeric characters, underscores, and hyphens")
        }

        val field = FieldDefinition(
            id = id,
            name = name,
            type = params.type,
            description = params.description,
            required = params.required ?: false,
            defaultValue = params.defaultValue,
            validation = params.validation,
            metadata = params.metadata,
            properties = params.properties,
            options = params.options,
            scope = params.scope
        )

        val issues = validateDefinition(field)
        if (issues.isNotEmpty()) {
            throw IllegalArgumentException(
                "Field definition invalid: ${issues.joinToString { it.message }}"
            )
        }

        return field
    }

    /**
     * Creates a FieldValue record.
     */
    fun createFieldValue(
        fieldId: String,
        value: JsonElement,
        source: FieldSource = FieldSource.USER
    ): FieldValue {
        return FieldValue(
            fieldId = fieldId,
            value = value,
            timestamp = Clock.System.now().toEpochMilliseconds(),
            source = source
        )
    }

    /**
     * Creates an empty FieldSchema.
     */
    fun createEmptySchema(version: String = "1.0.0"): FieldSchema {
        val metadata = buildJsonObject {
            put("createdAt", Clock.System.now().toEpochMilliseconds())
        }
        return FieldSchema(
            version = version,
            coreFields = emptyList(),
            extensionFields = emptyList(),
            metadata = metadata
        )
    }

    /**
     * Validate field definition consistency (options, properties, default values).
     */
    fun validateDefinition(field: FieldDefinition): List<ValidationIssue> {
        val issues = mutableListOf<ValidationIssue>()

        when (field.type) {
            FieldType.SELECT, FieldType.MULTI_SELECT, FieldType.ENUM -> {
                if (field.options.isNullOrEmpty()) {
                    issues += ValidationIssue(
                        code = "MISSING_OPTIONS",
                        message = "Field type ${field.type.name} requires options.",
                        severity = ValidationIssueSeverity.ERROR,
                        path = "definition.options"
                    )
                }
            }
            FieldType.OBJECT -> {
                if (field.properties.isNullOrEmpty()) {
                    issues += ValidationIssue(
                        code = "MISSING_PROPERTIES",
                        message = "Field type OBJECT requires properties.",
                        severity = ValidationIssueSeverity.ERROR,
                        path = "definition.properties"
                    )
                }
            }
            else -> Unit
        }

        field.defaultValue?.let { defaultValue ->
            val result = validateValue(field, defaultValue)
            if (!result.isValid) {
                issues += result.issues.map {
                    it.copy(path = it.path ?: "definition.defaultValue")
                }
            }
        }

        return issues
    }

    /**
     * Validates a value against a field definition.
     */
    fun validateValue(field: FieldDefinition, value: JsonElement): ModelValidationResult {
        val issues = mutableListOf<ValidationIssue>()

        if (field.required && value is JsonNull) {
            issues += ValidationIssue(
                code = "REQUIRED",
                message = "${field.name} is required",
                path = field.id
            )
        }

        if (value is JsonNull) {
            return ModelValidationResult(issues.isEmpty(), issues, value)
        }

        val schema = fieldToJsonSchema(field)
        val validation = validateAgainstSchema(value, schema, path = field.id)
        if (!validation.isValid) {
            issues += validation.errors.map {
                ValidationIssue(
                    code = it.code,
                    message = it.message,
                    severity = ValidationIssueSeverity.ERROR,
                    path = it.field
                )
            }
        }

        return ModelValidationResult(issues.isEmpty(), issues, value)
    }

    /**
     * Normalizes a raw input into a structured JsonElement based on field type.
     */
    fun normalizeValue(field: FieldDefinition, raw: Any?): JsonElement {
        if (raw == null) return JsonNull
        
        return when (field.type) {
            FieldType.BOOLEAN -> JsonPrimitive(raw.toString().lowercase() == "true")
            FieldType.NUMBER, FieldType.RANGE, FieldType.DECIMAL -> {
                val d = raw.toString().toDoubleOrNull()
                if (d != null) JsonPrimitive(d) else JsonNull
            }
            FieldType.INTEGER -> {
                val l = raw.toString().toLongOrNull()
                if (l != null) JsonPrimitive(l) else JsonNull
            }
            FieldType.MULTI_SELECT, FieldType.STRING_LIST -> {
                if (raw is List<*>) {
                    JsonArray(raw.map { JsonPrimitive(it.toString()) })
                } else {
                    JsonArray(listOf(JsonPrimitive(raw.toString())))
                }
            }
            else -> JsonPrimitive(raw.toString())
        }
    }

    /**
     * Serializes a field value for storage.
     */
    fun serializeFieldValue(field: FieldDefinition, value: JsonElement): JsonElement {
        if (value is JsonNull) return JsonNull

        return when (field.type) {
            FieldType.DATE, FieldType.DATETIME -> value
            FieldType.OBJECT -> {
                if (field.properties != null && value is JsonObject) {
                    buildJsonObject {
                        field.properties.forEach { (key, nested) ->
                            val nestedValue = value[key] ?: return@forEach
                            put(key, serializeFieldValue(nested, nestedValue))
                        }
                    }
                } else {
                    value
                }
            }
            FieldType.MULTI_SELECT, FieldType.STRING_LIST -> {
                if (value is JsonArray) value else JsonArray(listOf(value))
            }
            FieldType.NUMBER, FieldType.RANGE, FieldType.DECIMAL, FieldType.INTEGER -> {
                if (value is JsonPrimitive && value.isString) {
                    value.content.toDoubleOrNull()?.let { JsonPrimitive(it) } ?: JsonNull
                } else value
            }
            FieldType.BOOLEAN -> {
                if (value is JsonPrimitive && value.isString) {
                    JsonPrimitive(value.content.lowercase() == "true")
                } else value
            }
            else -> value
        }
    }

    /**
     * Deserializes a stored value, applying defaults when appropriate.
     */
    fun deserializeFieldValue(field: FieldDefinition, rawValue: JsonElement?): JsonElement {
        if (rawValue == null || rawValue is JsonNull) {
            return field.defaultValue ?: JsonNull
        }

        return when (field.type) {
            FieldType.DATE, FieldType.DATETIME -> rawValue
            FieldType.OBJECT -> {
                if (field.properties != null && rawValue is JsonObject) {
                    buildJsonObject {
                        field.properties.forEach { (key, nested) ->
                            val nestedValue = rawValue[key] ?: return@forEach
                            put(key, deserializeFieldValue(nested, nestedValue))
                        }
                    }
                } else {
                    rawValue
                }
            }
            FieldType.NUMBER, FieldType.RANGE, FieldType.DECIMAL, FieldType.INTEGER -> {
                if (rawValue is JsonPrimitive && rawValue.isString) {
                    rawValue.content.toDoubleOrNull()?.let { JsonPrimitive(it) } ?: JsonNull
                } else rawValue
            }
            FieldType.BOOLEAN -> {
                if (rawValue is JsonPrimitive && rawValue.isString) {
                    JsonPrimitive(rawValue.content.lowercase() == "true")
                } else rawValue
            }
            FieldType.MULTI_SELECT, FieldType.STRING_LIST -> {
                if (rawValue is JsonArray) rawValue else JsonArray(listOf(rawValue))
            }
            else -> rawValue
        }
    }

    /**
     * Compare schemas (core + extensions) and return differences.
     */
    fun compareFieldSchemas(schema1: FieldSchema, schema2: FieldSchema): SchemaDiff {
        val allFields1 = schema1.coreFields + schema1.extensionFields
        val allFields2 = schema2.coreFields + schema2.extensionFields

        val fieldMap1 = allFields1.associateBy { it.id }
        val fieldMap2 = allFields2.associateBy { it.id }

        val added = fieldMap2.keys.minus(fieldMap1.keys).toList()
        val removed = fieldMap1.keys.minus(fieldMap2.keys).toList()
        val modified = mutableListOf<SchemaDiffChange>()

        fieldMap1.forEach { (id, field1) ->
            val field2 = fieldMap2[id] ?: return@forEach
            val changes = compareFields(field1, field2)
            if (changes.isNotEmpty()) {
                modified += SchemaDiffChange(fieldId = id, changes = changes)
            }
        }

        val versionChange = if (schema1.version != schema2.version) {
            SchemaVersionChange(schema1.version, schema2.version)
        } else null

        return SchemaDiff(
            isIdentical = added.isEmpty() && removed.isEmpty() && modified.isEmpty() && versionChange == null,
            added = added,
            removed = removed,
            modified = modified,
            versionChange = versionChange
        )
    }

    private fun compareFields(field1: FieldDefinition, field2: FieldDefinition): List<String> {
        val changes = mutableListOf<String>()
        if (field1.name != field2.name) changes += "name: \"${field1.name}\" → \"${field2.name}\""
        if (field1.type != field2.type) changes += "type: ${field1.type} → ${field2.type}"
        if (field1.required != field2.required) changes += "required: ${field1.required} → ${field2.required}"
        if (field1.defaultValue != field2.defaultValue) changes += "defaultValue changed"
        if (field1.validation != field2.validation) changes += "validation rules changed"
        if (field1.options != field2.options) changes += "options changed"
        return changes
    }

    /**
     * Add a field to a schema.
     */
    fun addFieldToSchema(schema: FieldSchema, field: FieldDefinition, isCore: Boolean = false): FieldSchema {
        val updatedMeta = buildJsonObject {
            schema.metadata?.forEach { (k, v) -> put(k, v) }
            put("updatedAt", Clock.System.now().toEpochMilliseconds())
        }
        return if (isCore) {
            schema.copy(coreFields = schema.coreFields + field, metadata = updatedMeta)
        } else {
            schema.copy(extensionFields = schema.extensionFields + field, metadata = updatedMeta)
        }
    }

    /**
     * Remove a field from a schema.
     */
    fun removeFieldFromSchema(schema: FieldSchema, fieldId: String): FieldSchema {
        val updatedMeta = buildJsonObject {
            schema.metadata?.forEach { (k, v) -> put(k, v) }
            put("updatedAt", Clock.System.now().toEpochMilliseconds())
        }
        return schema.copy(
            coreFields = schema.coreFields.filterNot { it.id == fieldId },
            extensionFields = schema.extensionFields.filterNot { it.id == fieldId },
            metadata = updatedMeta
        )
    }

    fun getFieldFromSchema(schema: FieldSchema, fieldId: String): FieldDefinition? {
        return (schema.coreFields + schema.extensionFields).firstOrNull { it.id == fieldId }
    }
}
