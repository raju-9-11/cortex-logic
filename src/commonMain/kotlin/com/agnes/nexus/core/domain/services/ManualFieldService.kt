package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.models.*
import kotlinx.serialization.json.*

/**
 * Service for manual (user-driven) field mutations.
 * Ported from Nexus Android for parity.
 */
class ManualFieldService(
    private val proposalService: FieldProposalService = FieldProposalService()
) {
    private val json = Json { ignoreUnknownKeys = true }

    fun upsertField(
        moduleId: String,
        input: ManualFieldInput,
        extensibility: ModuleProfileExtensibility
    ): ManualFieldResult {
        val normalizedId = input.id.trim()
        val namespace = input.namespace.trim().ifBlank { "profile" }
        val defaultValue = parseRawValue(input.type, input.defaultValueRaw)

        val definitionPayload = mutableMapOf<String, Any?>(
            "id" to normalizedId,
            "name" to input.name.trim(),
            "type" to input.type.name,
            "required" to input.required,
            "scope" to mapOf(
                "moduleId" to moduleId,
                "namespace" to namespace
            ),
            "defaultValue" to defaultValue,
            "metadata" to emptyMap<String, Any?>()
        )
        if (!input.existingFieldId.isNullOrBlank()) {
            definitionPayload["existingFieldId"] = input.existingFieldId.trim()
        }

        val definitionResult = proposalService.applyUserProposal(
            moduleId = moduleId,
            actionType = "propose_field_definition",
            payload = definitionPayload,
            extensibility = extensibility
        )
        if (definitionResult.proposal.status != ProposalStatus.APPLIED) {
            return ManualFieldResult(
                extensibility = definitionResult.extensibility,
                issues = definitionResult.proposal.validationIssues,
                success = false
            )
        }

        val valueCandidate = parseRawValue(input.type, input.valueRaw)
        if (valueCandidate is JsonNull) {
            return ManualFieldResult(
                extensibility = definitionResult.extensibility,
                issues = emptyList(),
                success = true,
                appliedProposal = definitionResult.proposal.takeIf { it.status == ProposalStatus.APPLIED }
            )
        }

        val valueResult = proposalService.applyUserProposal(
            moduleId = moduleId,
            actionType = "propose_field_value",
            payload = mapOf(
                "fieldId" to normalizedId,
                "path" to "$namespace.$normalizedId",
                "value" to valueCandidate,
                "definition" to definitionPayload
            ),
            extensibility = definitionResult.extensibility
        )

        return ManualFieldResult(
            extensibility = valueResult.extensibility,
            issues = valueResult.proposal.validationIssues,
            success = valueResult.proposal.status == ProposalStatus.APPLIED,
            appliedProposal = valueResult.proposal.takeIf { it.status == ProposalStatus.APPLIED }
        )
    }

    fun deleteField(
        moduleId: String,
        fieldId: String,
        extensibility: ModuleProfileExtensibility
    ): ManualFieldResult {
        val result = proposalService.deleteCustomField(
            moduleId = moduleId,
            fieldId = fieldId,
            extensibility = extensibility
        )
        return ManualFieldResult(
            extensibility = result.extensibility,
            issues = result.proposal.validationIssues,
            success = result.proposal.status == ProposalStatus.APPLIED,
            appliedProposal = result.proposal.takeIf { it.status == ProposalStatus.APPLIED }
        )
    }

    private fun parseRawValue(type: FieldType, raw: String?): JsonElement {
        val trimmed = raw?.trim().orEmpty()
        if (trimmed.isBlank()) return JsonNull

        return when (type) {
            FieldType.STRING, FieldType.TEXT, FieldType.DATE, FieldType.DATETIME,
            FieldType.ENUM, FieldType.SELECT, FieldType.TEXTAREA -> JsonPrimitive(trimmed)

            FieldType.MULTI_SELECT -> {
                val parts = trimmed.split(",").map { it.trim() }.filter { it.isNotEmpty() }
                if (parts.size <= 1) JsonArray(listOf(JsonPrimitive(trimmed)))
                else JsonArray(parts.map { JsonPrimitive(it) })
            }

            FieldType.INTEGER, FieldType.NUMBER, FieldType.RANGE, FieldType.DECIMAL -> 
                trimmed.toDoubleOrNull()?.let { JsonPrimitive(it) } ?: JsonPrimitive(trimmed)
            
            FieldType.BOOLEAN -> when (trimmed.lowercase()) {
                "true" -> JsonPrimitive(true)
                "false" -> JsonPrimitive(false)
                else -> JsonPrimitive(trimmed)
            }

            FieldType.STRING_LIST, FieldType.OBJECT, FieldType.OBJECT_LIST -> runCatching {
                json.parseToJsonElement(trimmed)
            }.getOrElse {
                JsonPrimitive(trimmed)
            }
        }
    }
}

data class ManualFieldInput(
    val existingFieldId: String? = null,
    val id: String,
    val name: String,
    val type: FieldType,
    val namespace: String,
    val required: Boolean,
    val defaultValueRaw: String?,
    val valueRaw: String?
)

data class ManualFieldResult(
    val extensibility: ModuleProfileExtensibility,
    val issues: List<ValidationIssue>,
    val success: Boolean,
    val appliedProposal: FieldProposal? = null
)
