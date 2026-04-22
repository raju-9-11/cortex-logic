package com.agnes.ara.core.domain.services

import com.agnes.ara.core.domain.models.*
import kotlinx.datetime.Clock
import kotlinx.serialization.json.*
import kotlin.random.Random

data class ProposalApplicationResult(
    val extensibility: ModuleProfileExtensibility,
    val proposal: FieldProposal
)

/**
 * Service for applying field proposals (AI or User generated).
 * Ported from Nexus Android for parity.
 */
class FieldProposalService(
    private val validationRouter: FieldValidationRouter = FieldValidationRouter(DefaultFieldValidators.all()),
    private val json: Json = Json { ignoreUnknownKeys = true; encodeDefaults = true }
) {

    fun applyAiProposal(
        moduleId: String,
        actionType: String,
        payload: Map<String, Any?>,
        extensibility: ModuleProfileExtensibility
    ): ProposalApplicationResult {
        return applyProposal(moduleId, actionType, payload, FieldSource.AI, extensibility)
    }

    fun applyUserProposal(
        moduleId: String,
        actionType: String,
        payload: Map<String, Any?>,
        extensibility: ModuleProfileExtensibility
    ): ProposalApplicationResult {
        return applyProposal(moduleId, actionType, payload, FieldSource.USER, extensibility)
    }

    fun deleteCustomField(
        moduleId: String,
        fieldId: String,
        extensibility: ModuleProfileExtensibility,
        source: FieldSource = FieldSource.USER
    ): ProposalApplicationResult {
        val timestamp = Clock.System.now().toString()
        val pId = generateId()
        val pendingProposal = FieldProposal(
            id = pId,
            proposalId = pId,
            moduleId = moduleId,
            target = ProposalTarget(ProposalTargetType.FIELD_DEFINITION, fieldId = fieldId),
            payload = JsonObject(mapOf("operation" to JsonPrimitive("delete"), "fieldId" to JsonPrimitive(fieldId))),
            source = source,
            status = ProposalStatus.APPLIED,
            rationale = "User deleted custom field",
            createdAt = timestamp,
            updatedAt = timestamp
        )
        val nextExtensibility = extensibility.copy(
            customFieldDefinitions = extensibility.customFieldDefinitions.filterNot { it.id == fieldId },
            validatedCustomFieldValues = JsonObject(extensibility.validatedCustomFieldValues.toMutableMap().apply { remove(fieldId) })
        )
        SchemaRegistry.setExtensions(moduleId, nextExtensibility.customFieldDefinitions)
        return ProposalApplicationResult(nextExtensibility, pendingProposal)
    }

    private fun applyProposal(
        moduleId: String,
        actionType: String,
        payload: Map<String, Any?>,
        source: FieldSource,
        extensibility: ModuleProfileExtensibility
    ): ProposalApplicationResult {
        val timestamp = Clock.System.now().toString()
        val target = targetFrom(actionType, payload)
        val payloadJson = payload.toJsonObject()
        val pId = generateId()

        val pendingProposal = FieldProposal(
            id = pId,
            proposalId = pId,
            moduleId = moduleId,
            target = target,
            payload = payloadJson,
            source = source,
            status = ProposalStatus.PENDING,
            rationale = payload["rationale"]?.toString() ?: "Auto-generated proposal",
            createdAt = timestamp,
            updatedAt = timestamp
        )

        val nextProposalState = extensibility.proposalState.copy(
            queued = extensibility.proposalState.queued + pendingProposal
        )
        val stagedExtensibility = extensibility.copy(proposalState = nextProposalState)

        return when (target.type) {
            ProposalTargetType.FIELD_DEFINITION -> processFieldDefinitionProposal(
                moduleId, pendingProposal, payload, stagedExtensibility
            )
            ProposalTargetType.FIELD_VALUE -> processFieldValueProposal(
                moduleId, pendingProposal, payload, stagedExtensibility
            )
            ProposalTargetType.CORE -> ProposalApplicationResult(stagedExtensibility, pendingProposal)
            ProposalTargetType.EXTENSION -> ProposalApplicationResult(stagedExtensibility, pendingProposal)
        }
    }

    private fun processFieldDefinitionProposal(
        moduleId: String,
        proposal: FieldProposal,
        payload: Map<String, Any?>,
        extensibility: ModuleProfileExtensibility
    ): ProposalApplicationResult {
        val definition = parseDefinitionPayload(moduleId, payload) ?: return rejectProposal(
            extensibility, proposal, listOf(validationError("INVALID_DEFINITION", "Invalid definition payload"))
        )

        SchemaRegistry.setExtensions(moduleId, extensibility.customFieldDefinitions)

        val extensionValidation = SchemaRegistry.validateExtension(moduleId, definition)
        if (!extensionValidation.valid) {
            val issues = extensionValidation.errors.map {
                validationError(it.code, it.message).copy(path = it.field)
            }
            return rejectProposal(extensibility, proposal, issues)
        }

        val definitionIssues = FieldSystemManager.validateDefinition(definition)
        if (definitionIssues.isNotEmpty()) {
            return rejectProposal(extensibility, proposal, definitionIssues)
        }

        val validationResult = validationRouter.validateDefinition(
            FieldDefinitionValidationRequest(
                moduleId = moduleId,
                definition = definition,
                existingFieldIds = extensibility.customFieldDefinitions.map { it.id }.toSet()
            )
        )

        val normPayload = validationResult.normalizedPayload
        if (!validationResult.isValid || normPayload !is JsonObject) {
            return rejectProposal(extensibility, proposal, validationResult.issues)
        }

        val normalizedDefinition = runCatching {
            json.decodeFromJsonElement(FieldDefinition.serializer(), normPayload)
        }.getOrNull() ?: return rejectProposal(
            extensibility, proposal, listOf(validationError("PARSE_ERROR", "Failed to parse normalized definition"))
        )

        val updatedDefinitions = extensibility.customFieldDefinitions.filter { it.id != normalizedDefinition.id } + normalizedDefinition
        SchemaRegistry.setExtensions(moduleId, updatedDefinitions)
        return approveAndApply(extensibility.copy(customFieldDefinitions = updatedDefinitions), proposal, normPayload)
    }

    private fun processFieldValueProposal(
        moduleId: String,
        proposal: FieldProposal,
        payload: Map<String, Any?>,
        extensibility: ModuleProfileExtensibility
    ): ProposalApplicationResult {
        val fieldId = payload["fieldId"]?.toString() ?: ""
        val value = payload["value"].toJsonElement()
        val definition = extensibility.customFieldDefinitions.firstOrNull { it.id == fieldId }
            ?: return rejectProposal(extensibility, proposal, listOf(validationError("MISSING_DEF", "No definition for $fieldId")))

        val validationResult = validationRouter.validateValueUpdate(
            FieldValueValidationRequest(moduleId, definition, fieldId, "profile.$fieldId", value)
        )

        val normPayload = validationResult.normalizedPayload
        if (!validationResult.isValid || normPayload !is JsonObject) {
            return rejectProposal(extensibility, proposal, validationResult.issues)
        }

        val normValue = normPayload["value"] ?: JsonNull
        val updatedValues = JsonObject(extensibility.validatedCustomFieldValues.toMutableMap().apply {
            put(fieldId, normValue)
        })

        return approveAndApply(extensibility.copy(validatedCustomFieldValues = updatedValues), proposal, normPayload)
    }

    private fun approveAndApply(
        extensibility: ModuleProfileExtensibility,
        proposal: FieldProposal,
        normalizedPayload: JsonObject
    ): ProposalApplicationResult {
        val reviewedAt = Clock.System.now().toString()
        val appliedProposal = proposal.copy(
            payload = normalizedPayload,
            status = ProposalStatus.APPLIED,
            updatedAt = reviewedAt,
            reviewedAt = reviewedAt
        )
        return ProposalApplicationResult(
            extensibility = extensibility.copy(
                proposalState = transitionProposal(extensibility.proposalState, proposal.proposalId, appliedProposal, reviewedAt)
            ),
            proposal = appliedProposal
        )
    }

    private fun rejectProposal(
        extensibility: ModuleProfileExtensibility,
        proposal: FieldProposal,
        issues: List<ValidationIssue>
    ): ProposalApplicationResult {
        val reviewedAt = Clock.System.now().toString()
        val rejectedProposal = proposal.copy(
            status = ProposalStatus.REJECTED,
            validationIssues = issues,
            updatedAt = reviewedAt,
            reviewedAt = reviewedAt
        )
        return ProposalApplicationResult(
            extensibility = extensibility.copy(
                proposalState = transitionProposal(extensibility.proposalState, proposal.proposalId, rejectedProposal, reviewedAt)
            ),
            proposal = rejectedProposal
        )
    }

    private fun transitionProposal(
        state: ModuleProposalState,
        pId: String,
        finalized: FieldProposal,
        at: String
    ): ModuleProposalState = state.copy(
        queued = state.queued.filterNot { it.proposalId == pId },
        history = state.history + finalized,
        lastProcessedAt = at
    )

    private fun targetFrom(actionType: String, payload: Map<String, Any?>): ProposalTarget {
        return when (actionType.lowercase()) {
            "propose_field_definition" -> ProposalTarget(ProposalTargetType.FIELD_DEFINITION, fieldId = payload["fieldId"]?.toString())
            else -> ProposalTarget(ProposalTargetType.FIELD_VALUE, fieldId = payload["fieldId"]?.toString())
        }
    }

    private fun parseDefinitionPayload(moduleId: String, payload: Map<String, Any?>): FieldDefinition? {
        val id = payload["id"]?.toString()?.trim()
            ?: payload["fieldId"]?.toString()?.trim()
            ?: return null
        val typeStr = payload["type"]?.toString() ?: return null
        val type = parseFieldType(typeStr) ?: return null

        val name = payload["name"]?.toString()?.trim().orEmpty().ifBlank { id }
        val description = payload["description"]?.toString()
        val required = payload["required"] as? Boolean ?: false

        val scopeNamespace = runCatching {
            val scopeMap = payload["scope"] as? Map<*, *>
            scopeMap?.get("namespace")?.toString()
        }.getOrNull()
        val scope = FieldModuleScope(
            moduleId = moduleId,
            namespace = scopeNamespace?.ifBlank { "profile" }
                ?: payload["namespace"]?.toString()?.ifBlank { "profile" }
                ?: "profile"
        )

        val defaultValue = payload["defaultValue"].toJsonElement().takeIf { it !is JsonNull }
        val metadata = payload["metadata"]?.toJsonElement() as? JsonObject
        val validation = parseValidationRules(payload["validation"])
        val options = parseOptions(payload["options"])

        val properties = parseProperties(payload["properties"])

        return FieldDefinition(
            id = id,
            name = name,
            type = type,
            description = description,
            required = required,
            defaultValue = defaultValue,
            validation = validation,
            metadata = metadata,
            options = options,
            properties = properties,
            scope = scope
        )
    }

    private fun parseFieldType(raw: String): FieldType? {
        val token = raw.trim()
        val byName = runCatching { FieldType.valueOf(token.uppercase()) }.getOrNull()
        if (byName != null) return byName
        return when (token.lowercase()) {
            "text" -> FieldType.TEXT
            "number" -> FieldType.NUMBER
            "select" -> FieldType.SELECT
            "multiselect", "multi_select", "multiSelect" -> FieldType.MULTI_SELECT
            "date" -> FieldType.DATE
            "textarea" -> FieldType.TEXTAREA
            "boolean" -> FieldType.BOOLEAN
            "range" -> FieldType.RANGE
            "object" -> FieldType.OBJECT
            "string" -> FieldType.STRING
            "enum" -> FieldType.ENUM
            "integer" -> FieldType.INTEGER
            "decimal" -> FieldType.DECIMAL
            "stringlist", "string_list" -> FieldType.STRING_LIST
            "objectlist", "object_list" -> FieldType.OBJECT_LIST
            "datetime" -> FieldType.DATETIME
            else -> null
        }
    }

    private fun generateId(): String = (1..16).map { 
        "abcdefghijklmnopqrstuvwxyz0123456789"[Random.nextInt(36)] 
    }.joinToString("")

    private fun validationError(code: String, message: String) = ValidationIssue(code, message, ValidationIssueSeverity.ERROR)
}

private fun Map<*, *>.toJsonObject(): JsonObject {
    val content = mutableMapOf<String, JsonElement>()
    forEach { (key, value) -> (key as? String)?.let { content[it] = value.toJsonElement() } }
    return JsonObject(content)
}

private fun Any?.toJsonElement(): JsonElement = when (this) {
    null -> JsonNull
    is JsonElement -> this
    is Map<*, *> -> this.toJsonObject()
    is List<*> -> JsonArray(this.map { it.toJsonElement() })
    is Boolean -> JsonPrimitive(this)
    is Number -> JsonPrimitive(this)
    is String -> JsonPrimitive(this)
    else -> JsonPrimitive(this.toString())
}

private fun parseValidationRules(raw: Any?): ValidationRules? {
    val element = raw.toJsonElement()
    if (element is JsonNull) return null
    return runCatching {
        Json { ignoreUnknownKeys = true }.decodeFromJsonElement(ValidationRules.serializer(), element)
    }.getOrNull()
}

private fun parseOptions(raw: Any?): List<FieldOption>? {
    val element = raw.toJsonElement()
    if (element !is JsonArray) return null
    return element.mapNotNull { item ->
        val obj = item as? JsonObject ?: return@mapNotNull null
        val value = obj["value"]?.jsonPrimitive?.contentOrNull ?: return@mapNotNull null
        val label = obj["label"]?.jsonPrimitive?.contentOrNull ?: value
        FieldOption(value = value, label = label)
    }
}

private fun parseProperties(raw: Any?): Map<String, FieldDefinition>? {
    val element = raw.toJsonElement()
    if (element !is JsonObject) return null
    return element.mapValues { (key, value) ->
        runCatching {
            Json { ignoreUnknownKeys = true }.decodeFromJsonElement(FieldDefinition.serializer(), value)
        }.getOrElse {
            FieldDefinition(
                id = key,
                name = key,
                type = FieldType.TEXT
            )
        }
    }
}
