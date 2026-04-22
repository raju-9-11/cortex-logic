package com.agnes.ara.core.domain.services

import com.agnes.ara.core.domain.models.*
import com.agnes.ara.core.domain.models.ValidationResult as ModelValidationResult
import kotlinx.serialization.json.*
import kotlinx.serialization.json.Json

/**
 * Base implementation for module field validation.
 */
abstract class BaseFieldValidator(
    final override val moduleId: String,
    private val moduleAllowedNamespaces: Set<String>
) : FieldValidator {

    private val json = Json { encodeDefaults = true }

    override fun validateDefinition(request: FieldDefinitionValidationRequest): ModelValidationResult {
        val definition = request.definition
        val issues = mutableListOf<ValidationIssue>()

        val normalizedRequestModuleId = normalizeToken(request.moduleId)
        val normalizedValidatorModuleId = normalizeToken(moduleId)
        val normalizedScopeModuleId = normalizeToken(definition.scope?.moduleId ?: moduleId)

        if (normalizedRequestModuleId != normalizedValidatorModuleId) {
            issues += error("MODULE_SCOPE_MISMATCH", "Request module '${request.moduleId}' does not match validator module '$moduleId'.", "moduleId")
        }

        if (normalizedScopeModuleId != normalizedValidatorModuleId) {
            issues += error("FIELD_SCOPE_MISMATCH", "Field scope module '$normalizedScopeModuleId' must match '$moduleId'.", "definition.scope.moduleId")
        }

        val normalizedId = normalizeFieldId(definition.id)
        val normalizedName = normalizeFieldName(definition.name)

        if (normalizedId.isBlank()) {
            issues += error("INVALID_FIELD_ID", "Field id cannot be empty.", "definition.id")
        }

        if (request.existingFieldIds.contains(normalizedId)) {
            issues += error("DUPLICATE_FIELD_ID", "Field id '$normalizedId' already exists.", "definition.id")
        }

        issues += metadataIssues(definition)

        definition.defaultValue?.let { defaultValue ->
            issues += valueCompatibilityIssues(definition, defaultValue, "definition.defaultValue")
        }

        return result(issues, buildDefinitionPayload(definition, normalizedId, normalizedName))
    }

    override fun validateValueUpdate(request: FieldValueValidationRequest): ModelValidationResult {
        val definition = request.definition
        val issues = mutableListOf<ValidationIssue>()

        if (normalizeToken(request.moduleId) != normalizeToken(moduleId)) {
            issues += error("MODULE_SCOPE_MISMATCH", "Module mismatch.", "moduleId")
        }

        issues += pathIssues(
            targetPath = request.targetPath,
            scopeNamespace = definition.scope?.namespace ?: "profile",
            requestNamespaces = request.context.allowedNamespaces
        )

        issues += valueCompatibilityIssues(definition, request.value, "value")

        val normalizedPayload = buildJsonObject {
            put("moduleId", moduleId)
            put("fieldId", normalizeFieldId(definition.id))
            put("path", request.targetPath.trim())
            put("value", request.value)
        }

        return result(issues, normalizedPayload)
    }

    private fun metadataIssues(definition: FieldDefinition): List<ValidationIssue> {
        val issues = mutableListOf<ValidationIssue>()
        val metadata = definition.metadata ?: return emptyList()

        if (definition.type == FieldType.ENUM) {
            val options = metadata["options"] as? JsonArray
            if (options == null || options.isEmpty()) {
                issues += error("MISSING_ENUM_OPTIONS", "ENUM needs options.", "definition.metadata.options")
            }
        }
        return issues
    }

    private fun pathIssues(targetPath: String, scopeNamespace: String, requestNamespaces: Set<String>): List<ValidationIssue> {
        val issues = mutableListOf<ValidationIssue>()
        val normalizedPath = targetPath.trim()
        if (normalizedPath.isBlank()) {
            issues += error("INVALID_TARGET_PATH", "Target path blank.", "targetPath")
            return issues
        }
        val namespace = normalizedPath.substringBefore('.')
        val allowed = (requestNamespaces + scopeNamespace + moduleAllowedNamespaces).map(::normalizeToken)
        if (!allowed.contains(normalizeToken(namespace))) {
            issues += error("PATH_NAMESPACE_NOT_ALLOWED", "Namespace '$namespace' not allowed.", "targetPath")
        }
        return issues
    }

    private fun valueCompatibilityIssues(definition: FieldDefinition, value: JsonElement, valuePath: String): List<ValidationIssue> {
        if (value is JsonNull) {
            return if (definition.required) listOf(error("REQUIRED_MISSING", "Required field.", valuePath)) else emptyList()
        }
        val issues = mutableListOf<ValidationIssue>()
        when (definition.type) {
            FieldType.STRING, FieldType.TEXT, FieldType.DATE, FieldType.DATETIME, FieldType.TEXTAREA -> if (!value.isString()) issues += typeMismatch(definition.type, valuePath)
            FieldType.ENUM, FieldType.SELECT -> if (!value.isString()) issues += typeMismatch(definition.type, valuePath)
            FieldType.INTEGER -> if (value.asIntOrNull() == null) issues += typeMismatch(definition.type, valuePath)
            FieldType.DECIMAL, FieldType.NUMBER, FieldType.RANGE -> if (value.asNumberOrNull() == null) issues += typeMismatch(definition.type, valuePath)
            FieldType.BOOLEAN -> if (value.asBooleanOrNull() == null) issues += typeMismatch(definition.type, valuePath)
            FieldType.STRING_LIST -> if (value !is JsonArray || value.any { !it.isString() }) issues += typeMismatch(definition.type, valuePath)
            FieldType.MULTI_SELECT -> if (value !is JsonArray || value.any { !it.isString() }) issues += typeMismatch(definition.type, valuePath)
            FieldType.OBJECT -> if (value !is JsonObject) issues += typeMismatch(definition.type, valuePath)
            FieldType.OBJECT_LIST -> if (value !is JsonArray || value.any { it !is JsonObject }) issues += typeMismatch(definition.type, valuePath)
        }

        definition.validation?.let { rules ->
            val numericValue = value.asNumberOrNull()
            val stringValue = (value as? JsonPrimitive)?.contentOrNull
            val min = rules.minimum ?: rules.min
            val max = rules.maximum ?: rules.max
            if (numericValue != null) {
                if (min != null && numericValue < min) issues += error("MINIMUM", "Value below minimum $min.", valuePath)
                if (max != null && numericValue > max) issues += error("MAXIMUM", "Value above maximum $max.", valuePath)
                rules.multipleOf?.let { step ->
                    if (step != 0.0 && numericValue % step != 0.0) {
                        issues += error("MULTIPLE_OF", "Value not a multiple of $step.", valuePath)
                    }
                }
            }
            if (stringValue != null) {
                rules.minLength?.let { if (stringValue.length < it) issues += error("MIN_LENGTH", "Minimum length $it.", valuePath) }
                rules.maxLength?.let { if (stringValue.length > it) issues += error("MAX_LENGTH", "Maximum length $it.", valuePath) }
                rules.pattern?.let { pattern ->
                    if (!Regex(pattern).containsMatchIn(stringValue)) issues += error("PATTERN", "Does not match pattern.", valuePath)
                }
            }
            rules.enumValues?.let { allowed ->
                if (allowed.isNotEmpty() && allowed.none { it == value }) {
                    issues += error("ENUM", "Value not in enum.", valuePath)
                }
            }
            rules.items?.enumValues?.let { allowed ->
                if (value is JsonArray && allowed.isNotEmpty()) {
                    val invalid = value.any { item -> allowed.none { it == item } }
                    if (invalid) issues += error("ITEMS_ENUM", "Array contains invalid values.", valuePath)
                }
            }
        }
        return issues
    }

    private fun buildDefinitionPayload(definition: FieldDefinition, normalizedId: String, normalizedName: String): JsonObject {
        val normalized = definition.copy(
            id = normalizedId,
            name = normalizedName,
            scope = FieldModuleScope(
                moduleId = moduleId,
                namespace = definition.scope?.namespace ?: "profile"
            )
        )
        val element = runCatching { json.encodeToJsonElement(FieldDefinition.serializer(), normalized) }.getOrNull()
        return element as? JsonObject ?: buildJsonObject {
            put("moduleId", moduleId)
            put("id", normalizedId)
            put("name", normalizedName)
            put("type", definition.type.name)
            put("required", definition.required)
            put("description", definition.description)
            put("metadata", definition.metadata ?: JsonObject(emptyMap()))
            put("scope", buildJsonObject {
                put("moduleId", moduleId)
                put("namespace", definition.scope?.namespace ?: "profile")
            })
            put("defaultValue", definition.defaultValue ?: JsonNull)
            put("validation", definition.validation?.let { json.encodeToJsonElement(ValidationRules.serializer(), it) } ?: JsonNull)
            put("options", definition.options?.let { JsonArray(it.map { opt ->
                buildJsonObject {
                    put("value", opt.value)
                    put("label", opt.label)
                }
            }) } ?: JsonNull)
            put("properties", definition.properties?.let { props ->
                JsonObject(props.mapValues { json.encodeToJsonElement(FieldDefinition.serializer(), it.value) })
            } ?: JsonNull)
        }
    }

    private fun result(issues: List<ValidationIssue>, normalizedPayload: JsonElement) = ModelValidationResult(
        isValid = issues.none { it.severity == ValidationIssueSeverity.ERROR },
        issues = issues,
        normalizedPayload = normalizedPayload
    )

    private fun error(code: String, message: String, path: String) = ValidationIssue(code, message, ValidationIssueSeverity.ERROR, path)
    private fun typeMismatch(fieldType: FieldType, path: String) = error("TYPE_MISMATCH", "Expected ${fieldType.name}", path)
    private fun normalizeToken(value: String): String = value.trim().lowercase()
    private fun normalizeFieldName(value: String): String = value.trim().split(Regex("\\s+")).joinToString(" ")
    private fun normalizeFieldId(value: String): String = value.trim().lowercase().replace(Regex("[^a-z0-9]+"), "_").trim('_')
    private fun JsonElement.isString(): Boolean = this is JsonPrimitive && isString
    private fun JsonElement.asNumberOrNull(): Double? = (this as? JsonPrimitive)?.doubleOrNull
    private fun JsonElement.asIntOrNull(): Int? = (this as? JsonPrimitive)?.intOrNull
    private fun JsonElement.asBooleanOrNull(): Boolean? = (this as? JsonPrimitive)?.booleanOrNull
}

class TherapyFieldValidator : BaseFieldValidator("agnes", setOf("profile", "agnes", "sessions"))
class TrainerFieldValidator : BaseFieldValidator("titan", setOf("profile", "titan", "progress"))
class LedgerFieldValidator : BaseFieldValidator("ledger", setOf("profile", "ledger", "budget"))

object DefaultFieldValidators {
    fun all(): List<FieldValidator> = listOf(TherapyFieldValidator(), TrainerFieldValidator(), LedgerFieldValidator())
}
