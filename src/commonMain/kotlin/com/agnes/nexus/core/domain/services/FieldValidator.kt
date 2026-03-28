package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.models.FieldDefinition
import com.agnes.nexus.core.domain.models.ValidationIssue
import com.agnes.nexus.core.domain.models.ValidationIssueSeverity
import com.agnes.nexus.core.domain.models.ValidationResult
import kotlinx.serialization.json.JsonElement

/**
 * Interface for module-specific field validation.
 */
interface FieldValidator {
    val moduleId: String

    fun validateDefinition(request: FieldDefinitionValidationRequest): ValidationResult

    fun validateValueUpdate(request: FieldValueValidationRequest): ValidationResult
}

data class FieldValidationContext(
    val allowedNamespaces: Set<String> = setOf("profile")
)

data class FieldDefinitionValidationRequest(
    val moduleId: String,
    val definition: FieldDefinition,
    val existingFieldIds: Set<String> = emptySet(),
    val context: FieldValidationContext = FieldValidationContext()
)

data class FieldValueValidationRequest(
    val moduleId: String,
    val definition: FieldDefinition,
    val fieldId: String,
    val targetPath: String,
    val value: JsonElement,
    val context: FieldValidationContext = FieldValidationContext()
)

/**
 * Router for field validation requests.
 */
class FieldValidationRouter(
    validators: List<FieldValidator>
) {
    private val validatorsByModule = validators.associateBy { it.moduleId.trim().lowercase() }

    fun validateDefinition(request: FieldDefinitionValidationRequest): ValidationResult {
        val validator = validatorsByModule[request.moduleId.trim().lowercase()]
            ?: return unsupportedModuleResult(request.moduleId)
        return validator.validateDefinition(request)
    }

    fun validateValueUpdate(request: FieldValueValidationRequest): ValidationResult {
        val validator = validatorsByModule[request.moduleId.trim().lowercase()]
            ?: return unsupportedModuleResult(request.moduleId)
        return validator.validateValueUpdate(request)
    }

    private fun unsupportedModuleResult(moduleId: String): ValidationResult {
        return ValidationResult(
            isValid = false,
            issues = listOf(
                ValidationIssue(
                    code = "UNSUPPORTED_MODULE",
                    message = "No field validator registered for module '$moduleId'.",
                    severity = ValidationIssueSeverity.ERROR,
                    path = "moduleId"
                )
            )
        )
    }
}
