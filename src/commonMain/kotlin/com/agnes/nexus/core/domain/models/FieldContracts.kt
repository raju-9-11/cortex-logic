package com.agnes.nexus.core.domain.models

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject

@Serializable
enum class FieldSource {
    USER, AI, SYSTEM
}

@Serializable
data class FieldValue(
    val fieldId: String,
    val value: JsonElement,
    val timestamp: Long,
    val source: FieldSource = FieldSource.USER
)

@Serializable
enum class ProposalStatus {
    PROPOSED, APPLIED, REJECTED, PENDING
}

@Serializable
enum class ProposalTargetType {
    CORE, EXTENSION, FIELD_VALUE, FIELD_DEFINITION
}

@Serializable
data class FieldModuleScope(
    val moduleId: String,
    val namespace: String = "profile"
)

@Serializable
data class ProposalTarget(
    val type: ProposalTargetType,
    val id: String? = null,
    val fieldId: String? = null,
    val path: String? = null
)

@Serializable
data class ValidationResult(
    val isValid: Boolean,
    val issues: List<ValidationIssue> = emptyList(),
    val normalizedPayload: JsonElement? = null
)

@Serializable
data class FieldProposal(
    val id: String = "",
    val proposalId: String = id,
    val moduleId: String,
    val target: ProposalTarget,
    val payload: JsonObject,
    val source: FieldSource,
    val status: ProposalStatus = ProposalStatus.PROPOSED,
    val rationale: String,
    val createdAt: String,
    val updatedAt: String? = null,
    val reviewedAt: String? = null,
    val validationIssues: List<ValidationIssue> = emptyList()
)

@Serializable
enum class ValidationIssueSeverity {
    ERROR, WARNING, INFO
}

@Serializable
data class ValidationIssue(
    val code: String,
    val message: String,
    val severity: ValidationIssueSeverity = ValidationIssueSeverity.ERROR,
    val path: String? = null
)

@Serializable
data class ModuleProposalState(
    val queued: List<FieldProposal> = emptyList(),
    val history: List<FieldProposal> = emptyList(),
    val lastProcessedAt: String? = null
)

@Serializable
data class ModuleProfileExtensibility(
    val customFieldDefinitions: List<FieldDefinition> = emptyList(),
    val validatedCustomFieldValues: JsonObject = JsonObject(emptyMap()),
    val proposalState: ModuleProposalState = ModuleProposalState()
)
