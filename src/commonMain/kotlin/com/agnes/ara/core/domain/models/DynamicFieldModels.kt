package com.agnes.ara.core.domain.models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject

@Serializable
enum class FieldType {
    @SerialName("text")
    TEXT,
    @SerialName("number")
    NUMBER,
    @SerialName("select")
    SELECT,
    @SerialName("multiSelect")
    MULTI_SELECT,
    @SerialName("date")
    DATE,
    @SerialName("textarea")
    TEXTAREA,
    @SerialName("boolean")
    BOOLEAN,
    @SerialName("range")
    RANGE,
    @SerialName("object")
    OBJECT,
    // Backward-compatible/extended types (Android-specific)
    @SerialName("string")
    STRING,
    @SerialName("datetime")
    DATETIME,
    @SerialName("enum")
    ENUM,
    @SerialName("integer")
    INTEGER,
    @SerialName("decimal")
    DECIMAL,
    @SerialName("stringList")
    STRING_LIST,
    @SerialName("objectList")
    OBJECT_LIST
}

@Serializable
data class ValidationRules(
    val minimum: Double? = null,
    val maximum: Double? = null,
    val minLength: Int? = null,
    val maxLength: Int? = null,
    val pattern: String? = null,
    @SerialName("enum")
    val enumValues: List<JsonElement>? = null,
    val items: ValidationItems? = null,
    val multipleOf: Double? = null,
    // Backward-compatible aliases (Android legacy)
    val min: Double? = null,
    val max: Double? = null
)

@Serializable
data class ValidationItems(
    @SerialName("enum")
    val enumValues: List<JsonElement>? = null
)

@Serializable
data class FieldOption(
    val value: String,
    val label: String
)

@Serializable
data class FieldDefinition(
    val id: String,
    val name: String,
    val type: FieldType,
    val namespace: String? = null,
    val scope: FieldModuleScope? = null,
    val description: String? = null,
    val required: Boolean = false,
    val defaultValue: JsonElement? = null,
    val validation: ValidationRules? = null,
    val metadata: JsonObject? = null,
    val options: List<FieldOption>? = null,
    val properties: Map<String, FieldDefinition>? = null,
    val lastAccessedAt: String? = null
)

@Serializable
data class FieldSchema(
    val version: String,
    val coreFields: List<FieldDefinition>,
    val extensionFields: List<FieldDefinition> = emptyList(),
    val metadata: JsonObject? = null
)

@Serializable
data class ModuleSchemaDefinition(
    val moduleId: String,
    val version: String,
    val coreSchema: FieldSchema,
    val allowExtensions: Boolean = true,
    val maxExtensionFields: Int? = null
)

@Serializable
data class SchemaDiff(
    val isIdentical: Boolean,
    val added: List<String> = emptyList(),
    val removed: List<String> = emptyList(),
    val modified: List<SchemaDiffChange> = emptyList(),
    val versionChange: SchemaVersionChange? = null
)

@Serializable
data class SchemaDiffChange(
    val fieldId: String,
    val changes: List<String>
)

@Serializable
data class SchemaVersionChange(
    val from: String,
    val to: String
)
