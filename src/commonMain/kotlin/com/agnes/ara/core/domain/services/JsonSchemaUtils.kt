package com.agnes.ara.core.domain.services

import com.agnes.ara.core.domain.models.FieldDefinition
import com.agnes.ara.core.domain.models.FieldOption
import com.agnes.ara.core.domain.models.FieldSchema
import com.agnes.ara.core.domain.models.FieldType
import com.agnes.ara.core.domain.models.ValidationItems
import com.agnes.ara.core.domain.models.ValidationRules
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.doubleOrNull
import kotlinx.serialization.json.jsonPrimitive

data class JsonSchema(
    val type: List<String>? = null,
    val properties: Map<String, JsonSchema>? = null,
    val required: List<String>? = null,
    val enumValues: List<JsonElement>? = null,
    val items: JsonSchema? = null,
    val minimum: Double? = null,
    val maximum: Double? = null,
    val minLength: Int? = null,
    val maxLength: Int? = null,
    val pattern: String? = null,
    val multipleOf: Double? = null,
    val defaultValue: JsonElement? = null,
    val description: String? = null,
    val title: String? = null,
    val format: String? = null,
    val uniqueItems: Boolean? = null,
    val schema: String? = null
)

data class SchemaValidationError(
    val field: String,
    val message: String,
    val code: String
)

data class SchemaValidationResult(
    val isValid: Boolean,
    val errors: List<SchemaValidationError>,
    val value: JsonElement
)

fun fieldToJsonSchema(field: FieldDefinition): JsonSchema {
    val type = when (field.type) {
        FieldType.TEXT, FieldType.TEXTAREA, FieldType.STRING -> listOf("string")
        FieldType.NUMBER, FieldType.RANGE, FieldType.DECIMAL -> listOf("number")
        FieldType.INTEGER -> listOf("integer")
        FieldType.BOOLEAN -> listOf("boolean")
        FieldType.DATE, FieldType.DATETIME -> listOf("string")
        FieldType.SELECT, FieldType.ENUM -> listOf("string")
        FieldType.MULTI_SELECT, FieldType.STRING_LIST -> listOf("array")
        FieldType.OBJECT, FieldType.OBJECT_LIST -> listOf("object")
    }

    val base = JsonSchema(
        type = type,
        description = field.description,
        title = field.name,
        format = if (field.type == FieldType.DATE || field.type == FieldType.DATETIME) "date-time" else null
    )

    val withOptions = when (field.type) {
        FieldType.SELECT, FieldType.ENUM -> {
            val enumValues = field.options?.map { JsonPrimitive(it.value) }
                ?: field.validation?.enumValues
            base.copy(enumValues = enumValues)
        }
        FieldType.MULTI_SELECT, FieldType.STRING_LIST -> {
            val itemEnum = field.options?.map { JsonPrimitive(it.value) }
                ?: field.validation?.items?.enumValues
            base.copy(items = JsonSchema(type = listOf("string"), enumValues = itemEnum), uniqueItems = true)
        }
        FieldType.OBJECT -> {
            val props = field.properties?.mapValues { (_, value) -> fieldToJsonSchema(value) }
            val required = field.properties?.filterValues { it.required }?.keys?.toList()
            base.copy(properties = props, required = required)
        }
        else -> base
    }

    val validation = applyValidationRules(withOptions, field.validation)

    return validation.copy(
        defaultValue = field.defaultValue ?: validation.defaultValue
    )
}

fun jsonSchemaToField(id: String, schema: JsonSchema): FieldDefinition {
    val schemaType = schema.type?.firstOrNull() ?: "string"
    val fieldType = when (schemaType) {
        "string" -> {
            if (schema.format == "date-time" || schema.format == "date") FieldType.DATE
            else if (!schema.enumValues.isNullOrEmpty()) FieldType.SELECT
            else if ((schema.maxLength ?: 0) > 255) FieldType.TEXTAREA
            else FieldType.TEXT
        }
        "number" -> if (schema.multipleOf != null) FieldType.RANGE else FieldType.NUMBER
        "integer" -> FieldType.INTEGER
        "boolean" -> FieldType.BOOLEAN
        "array" -> FieldType.MULTI_SELECT
        "object" -> FieldType.OBJECT
        else -> FieldType.TEXT
    }

    val options = when (fieldType) {
        FieldType.SELECT -> schema.enumValues?.map { FieldOption(it.jsonPrimitive.content, it.jsonPrimitive.content) }
        FieldType.MULTI_SELECT -> schema.items?.enumValues?.map { FieldOption(it.jsonPrimitive.content, it.jsonPrimitive.content) }
        else -> null
    }

    val properties = if (fieldType == FieldType.OBJECT) {
        schema.properties?.mapValues { (key, value) ->
            jsonSchemaToField(key, value).copy(required = schema.required?.contains(key) == true)
        }
    } else null

    return FieldDefinition(
        id = id,
        name = schema.title ?: id,
        type = fieldType,
        description = schema.description,
        defaultValue = schema.defaultValue,
        validation = extractValidationRules(schema),
        options = options,
        properties = properties
    )
}

/**
 * Merges core and extension schema fields into a JSON Schema.
 */
fun mergeSchemas(coreSchema: FieldSchema, extensionSchema: FieldSchema? = null): JsonSchema {
    val props = mutableMapOf<String, JsonSchema>()
    val required = mutableListOf<String>()

    (coreSchema.coreFields + coreSchema.extensionFields).forEach { field ->
        props[field.id] = fieldToJsonSchema(field)
        if (field.required) required += field.id
    }

    extensionSchema?.extensionFields?.forEach { field ->
        props[field.id] = fieldToJsonSchema(field)
        if (field.required) required += field.id
    }

    return JsonSchema(
        schema = "http://json-schema.org/draft-07/schema#",
        type = listOf("object"),
        properties = props,
        required = required.ifEmpty { null }
    )
}

fun fieldSchemaToJsonSchema(fieldSchema: FieldSchema): JsonSchema = mergeSchemas(fieldSchema)

fun validateAgainstSchema(data: JsonElement, schema: JsonSchema, path: String = "root"): SchemaValidationResult {
    val errors = mutableListOf<SchemaValidationError>()

    fun validateValue(value: JsonElement, schemaNode: JsonSchema, currentPath: String) {
        val allowed = schemaNode.type ?: emptyList()
        val actual = jsonSchemaType(value)

        if (allowed.isNotEmpty() && actual != "null") {
            val typeMatches = allowed.contains(actual) ||
                (allowed.contains("number") && actual == "integer") ||
                (allowed.contains("integer") && actual == "number" && value.isInteger())

            if (!typeMatches) {
                errors += SchemaValidationError(
                    field = currentPath,
                    message = "Expected type ${allowed.joinToString(" or ")}, got $actual",
                    code = "TYPE_MISMATCH"
                )
                return
            }
        }

        when (actual) {
            "string" -> {
                val content = (value as? JsonPrimitive)?.content ?: ""
                schemaNode.minLength?.let {
                    if (content.length < it) errors += SchemaValidationError(currentPath, "Minimum length is $it", "MIN_LENGTH")
                }
                schemaNode.maxLength?.let {
                    if (content.length > it) errors += SchemaValidationError(currentPath, "Maximum length is $it", "MAX_LENGTH")
                }
                schemaNode.pattern?.let {
                    if (!Regex(it).containsMatchIn(content)) {
                        errors += SchemaValidationError(currentPath, "Value does not match pattern $it", "PATTERN_MISMATCH")
                    }
                }
                schemaNode.enumValues?.let { allowedValues ->
                    if (allowedValues.isNotEmpty() && allowedValues.none { it == value }) {
                        errors += SchemaValidationError(currentPath, "Value must be one of: ${allowedValues.joinToString()}", "ENUM_MISMATCH")
                    }
                }
            }
            "number", "integer" -> {
                val number = value.asDoubleOrNull()
                if (number != null) {
                    schemaNode.minimum?.let { if (number < it) errors += SchemaValidationError(currentPath, "Minimum value is $it", "MINIMUM") }
                    schemaNode.maximum?.let { if (number > it) errors += SchemaValidationError(currentPath, "Maximum value is $it", "MAXIMUM") }
                    schemaNode.multipleOf?.let {
                        if (it != 0.0 && number % it != 0.0) {
                            errors += SchemaValidationError(currentPath, "Value must be a multiple of $it", "MULTIPLE_OF")
                        }
                    }
                }
            }
            "array" -> {
                if (value is JsonArray) {
                    val itemsSchema = schemaNode.items
                    if (itemsSchema != null) {
                        value.forEachIndexed { index, element ->
                            validateValue(element, itemsSchema, "$currentPath[$index]")
                        }
                    }
                    if (schemaNode.uniqueItems == true) {
                        val unique = value.map { it.toString() }.toSet()
                        if (unique.size != value.size) {
                            errors += SchemaValidationError(currentPath, "Array items must be unique", "UNIQUE_ITEMS")
                        }
                    }
                }
            }
            "object" -> {
                if (value is JsonObject) {
                    schemaNode.required?.forEach { requiredKey ->
                        if (!value.containsKey(requiredKey)) {
                            errors += SchemaValidationError("$currentPath.$requiredKey", "Required property is missing", "REQUIRED")
                        }
                    }
                    schemaNode.properties?.forEach { (key, propSchema) ->
                        value[key]?.let { validateValue(it, propSchema, "$currentPath.$key") }
                    }
                }
            }
        }
    }

    validateValue(data, schema, path)

    return SchemaValidationResult(errors.isEmpty(), errors, data)
}

private fun applyValidationRules(schema: JsonSchema, rules: ValidationRules?): JsonSchema {
    if (rules == null) return schema
    return schema.copy(
        minimum = rules.minimum ?: rules.min ?: schema.minimum,
        maximum = rules.maximum ?: rules.max ?: schema.maximum,
        minLength = rules.minLength ?: schema.minLength,
        maxLength = rules.maxLength ?: schema.maxLength,
        pattern = rules.pattern ?: schema.pattern,
        multipleOf = rules.multipleOf ?: schema.multipleOf,
        enumValues = rules.enumValues ?: schema.enumValues,
        items = schema.items?.copy(enumValues = rules.items?.enumValues ?: schema.items.enumValues)
    )
}

private fun extractValidationRules(schema: JsonSchema): ValidationRules? {
    val rules = ValidationRules(
        minimum = schema.minimum,
        maximum = schema.maximum,
        minLength = schema.minLength,
        maxLength = schema.maxLength,
        pattern = schema.pattern,
        enumValues = schema.enumValues,
        items = schema.items?.enumValues?.let { ValidationItems(enumValues = it) },
        multipleOf = schema.multipleOf
    )
    return if (
        rules.minimum != null || rules.maximum != null || rules.minLength != null ||
        rules.maxLength != null || rules.pattern != null || rules.enumValues != null ||
        rules.items != null || rules.multipleOf != null
    ) rules else null
}

private fun jsonSchemaType(value: JsonElement): String {
    return when (value) {
        is JsonNull -> "null"
        is JsonArray -> "array"
        is JsonObject -> "object"
        is JsonPrimitive -> when {
            value.isString -> "string"
            value.booleanOrNull != null -> "boolean"
            value.doubleOrNull != null -> if (value.isInteger()) "integer" else "number"
            else -> "string"
        }
        else -> "unknown"
    }
}

private fun JsonElement.asDoubleOrNull(): Double? = (this as? JsonPrimitive)?.doubleOrNull

private fun JsonElement.isInteger(): Boolean {
    val primitive = this as? JsonPrimitive ?: return false
    val doubleValue = primitive.doubleOrNull ?: return false
    return doubleValue % 1.0 == 0.0
}
