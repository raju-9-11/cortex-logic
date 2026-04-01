package com.agnes.nexus.core.domain.service.orchestration

import com.agnes.nexus.core.platform.generateUuid
import kotlinx.serialization.json.*
import kotlin.math.max
import kotlin.math.min

/**
 * Pure orchestration action gate — evaluates whether an action should dispatch.
 * Computes proposals, policies, execution records, and runtime semantics.
 */
object OrchestrationActionGateService {

    private val json = Json { ignoreUnknownKeys = true }

    private val NON_MUTATING_ACTIONS = setOf(
        "propose_reminder", "query_reminders", "query_module_data", "query_memory",
        "search_memory", "web_search", "query_profile", "analyze_trends",
        "analyze_spending", "analyze_medical_image", "compare_periods",
        "suggest_interventions", "suggest_field", "identify_correlations",
        "generate_summary", "detect_data_hint", "navigate_to_module",
        "delegate_to_module", "create_module_handoff", "apply_program_template",
        "suggest_progression",
    )

    private val NON_MUTATING_PREFIXES = listOf(
        "analyze_", "compare_", "identify_", "generate_", "query_",
        "suggest_", "explain_", "validate_", "propose_",
    )

    private val MUTATING_PREFIXES = listOf(
        "create_", "update_", "delete_", "modify_", "set_", "sync_",
        "log_", "commit_", "confirm_", "dismiss_", "track_", "flatten_",
        "record_", "merge_", "discard_", "complete_", "advance_",
        "archive_", "issue_", "schedule_",
    )

    private val HIGH_RISK_KEYWORDS = listOf(
        "delete", "discard", "archive", "clearance", "transaction", "budget", "diagnosis",
    )

    fun inferMutatesState(actionType: String): Boolean {
        if (NON_MUTATING_ACTIONS.contains(actionType)) return false
        if (NON_MUTATING_PREFIXES.any { actionType.startsWith(it) }) return false
        if (MUTATING_PREFIXES.any { actionType.startsWith(it) }) return true
        return true
    }

    fun inferHighRisk(actionType: String): Boolean {
        val normalized = actionType.lowercase()
        return HIGH_RISK_KEYWORDS.any { normalized.contains(it) }
    }

    fun clampConfidence(value: Double): Double = max(0.0, min(1.0, value))

    fun inferProposalConfidence(
        actionType: String,
        payloadKeys: List<String>,
        explicitConfidence: Double?,
        mutatesState: Boolean,
        highRisk: Boolean,
        requiresApproval: Boolean,
    ): Double {
        if (explicitConfidence != null && explicitConfidence.isFinite()) {
            return clampConfidence(explicitConfidence)
        }

        val relevantKeys = payloadKeys.filter { it != "confidence" && it != "requiresApproval" }
        var confidence = if (mutatesState) 0.76 else 0.92

        when {
            relevantKeys.size >= 3 -> confidence += 0.1
            relevantKeys.isEmpty() -> confidence -= 0.08
        }

        if (mutatesState && requiresApproval) confidence -= 0.2
        if (highRisk) confidence -= 0.18
        if (actionType.startsWith("schedule_") || actionType.startsWith("log_") || actionType.startsWith("clear_"))
            confidence += 0.15
        if (actionType.startsWith("update_") || actionType.startsWith("record_") || actionType.startsWith("confirm_"))
            confidence += 0.12

        return clampConfidence(confidence)
    }

    fun buildProposalCardStatus(dispatchStatus: String): String = when (dispatchStatus) {
        "awaiting_approval" -> "pending_approval"
        "blocked", "analysis_only", "ephemeral" -> "blocked"
        else -> "approved"
    }

    fun buildExecutionStatus(dispatchStatus: String): String = when (dispatchStatus) {
        "approved" -> "executed"
        "awaiting_approval" -> "deferred"
        "analysis_only", "ephemeral" -> "analysis_only"
        else -> "blocked"
    }

    private fun hashToken(input: String): String {
        var hash = 2166136261L.toInt()
        for (ch in input) {
            hash = hash xor ch.code
            hash = (hash.toLong() * 16777619L).toInt()
        }
        return (hash.toLong() and 0xFFFFFFFFL).toString(36)
    }

    fun sanitizeIdToken(value: String, maxLength: Int): String {
        val trimmed = value.trim().lowercase()
        val normalized = trimmed
            .replace(Regex("[/\\\\]"), "-")
            .replace(Regex("[^a-z0-9._-]+"), "-")
            .replace(Regex("-+"), "-")
            .replace(Regex("^-|-$"), "")

        if (normalized.isEmpty()) return "id-${hashToken(value)}"
        if (normalized.length <= maxLength) return normalized
        return "${normalized.substring(0, max(8, maxLength - 8))}-${hashToken(normalized)}"
    }

    /**
     * Evaluate an action gate decision.
     * @param inputJson JSON with: moduleId, actionType, payload, autopilotLevel, historyMode, isGuest, activeThreadId, persistencePolicy, now
     * @param actionLabel Human-readable label for the action
     * @return JSON with: shouldDispatch (Boolean), metadata (ActionOrchestrationMetadata)
     */
    fun evaluate(inputJson: String, actionLabel: String): String {
        val input = json.parseToJsonElement(inputJson).jsonObject
        val moduleId = input["moduleId"]?.jsonPrimitive?.contentOrNull ?: "nexus"
        val actionType = input["actionType"]?.jsonPrimitive?.contentOrNull ?: ""
        val payload = input["payload"]?.jsonObject ?: buildJsonObject {}
        val autopilotLevel = input["autopilotLevel"]?.jsonPrimitive?.intOrNull ?: 0
        val historyModeInput = input["historyMode"]?.jsonPrimitive?.contentOrNull ?: "standard"
        val isGuest = input["isGuest"]?.jsonPrimitive?.booleanOrNull ?: false
        val activeThreadId = input["activeThreadId"]?.jsonPrimitive?.contentOrNull
        val persistencePolicy = input["persistencePolicy"]?.jsonPrimitive?.contentOrNull ?: "auto"
        val now = input["now"]?.jsonPrimitive?.contentOrNull ?: ""

        val source = if (moduleId == "nexus" || OrchestrationContracts.isPrimaryAgentId(moduleId)) moduleId else "nexus"
        val patientScope = if (isGuest) "GUEST" else "USER"
        val mutatesState = inferMutatesState(actionType)
        val highRisk = inferHighRisk(actionType)
        val payloadKeys = payload.keys.toList()
        val explicitConfidence = payload["confidence"]?.jsonPrimitive?.doubleOrNull
        val requiresApproval = mutatesState && payload["requiresApproval"]?.jsonPrimitive?.booleanOrNull == true

        val confidence = inferProposalConfidence(actionType, payloadKeys, explicitConfidence, mutatesState, highRisk, requiresApproval)

        val safeThreadToken = sanitizeIdToken(activeThreadId ?: moduleId, 72)
        val safeActionToken = sanitizeIdToken(actionType, 48)
        val proposalId = "$safeThreadToken.$safeActionToken.${generateUuid()}"

        val proposal = buildJsonObject {
            put("id", proposalId)
            put("source", source)
            put("intent", actionLabel)
            put("confidence", confidence)
            put("requiresApproval", requiresApproval)
            put("patientScope", patientScope)
            put("createdAt", now)
            putJsonObject("metadata") {
                put("actionType", actionType)
                activeThreadId?.let { put("activeThreadId", it) } ?: put("activeThreadId", JsonNull)
                putJsonArray("payloadKeys") { payloadKeys.forEach { add(it) } }
                put("mutatesState", mutatesState)
                put("highRisk", highRisk)
            }
        }

        val policy = if (persistencePolicy == "ephemeral") {
            ExecutionPolicy(
                requiresApproval = ApprovalRequirement(false, "none"),
                executionMode = "analysis_only",
                historyMode = historyModeInput,
                canMutateState = false,
            )
        } else {
            OrchestrationPolicyService.getExecutionPolicy(autopilotLevel, proposal.toString(), highRisk = highRisk)
        }

        val effectiveHistoryMode = if (historyModeInput == "silent" || policy.historyMode == "silent") "silent" else "standard"

        val dispatchStatus = when {
            persistencePolicy == "ephemeral" -> "ephemeral"
            policy.requiresApproval.required -> "awaiting_approval"
            mutatesState && !policy.canMutateState ->
                if (policy.executionMode == "analysis_only") "analysis_only" else "blocked"
            mutatesState && policy.executionMode == "analysis_only" -> "analysis_only"
            else -> "approved"
        }

        val executionId = "exec.$proposalId"
        val executionStatus = buildExecutionStatus(dispatchStatus)
        val proposalCardStatus = buildProposalCardStatus(dispatchStatus)

        val shouldDispatch = persistencePolicy != "ephemeral" &&
                !policy.requiresApproval.required &&
                (!mutatesState || policy.canMutateState) &&
                dispatchStatus == "approved"

        return buildJsonObject {
            put("shouldDispatch", shouldDispatch)
            putJsonObject("metadata") {
                put("actionType", actionType)
                activeThreadId?.let { put("activeThreadId", it) } ?: put("activeThreadId", JsonNull)
                put("autopilotLevel", autopilotLevel)
                put("proposal", proposal)
                putJsonObject("proposalCard") {
                    put("id", "card.$proposalId")
                    put("proposalId", proposalId)
                    put("title", actionLabel)
                    put("summary", "$actionLabel requested by $source.")
                    put("source", source)
                    put("status", proposalCardStatus)
                    putJsonObject("approvalRequirement") {
                        put("required", policy.requiresApproval.required)
                        put("reason", policy.requiresApproval.reason)
                    }
                    put("executionMode", policy.executionMode)
                    put("historyMode", effectiveHistoryMode)
                }
                putJsonObject("approvalRequirement") {
                    put("required", policy.requiresApproval.required)
                    put("reason", policy.requiresApproval.reason)
                }
                put("executionMode", policy.executionMode)
                put("historyMode", effectiveHistoryMode)
                put("patientScope", patientScope)
                putJsonObject("execution") {
                    put("id", executionId)
                    put("proposalId", proposalId)
                    put("source", source)
                    put("autopilotLevel", autopilotLevel)
                    put("executionMode", policy.executionMode)
                    put("historyMode", effectiveHistoryMode)
                    put("patientScope", patientScope)
                    put("executedAt", now)
                    put("status", executionStatus)
                }
                put("mutatesState", mutatesState)
                put("highRisk", highRisk)
                put("dispatchStatus", dispatchStatus)
                putJsonObject("runtime") {
                    put("autopilotLevel", autopilotLevel)
                    // Derive autonomy, disposition, etc. inline (matching RuntimeSemanticsBuilder)
                    val autonomy = when {
                        autopilotLevel >= 5 -> "ghost"
                        autopilotLevel >= 4 -> "supervised_autonomy"
                        autopilotLevel == 3 -> "conditional_autonomy"
                        autopilotLevel == 2 -> "guided_assist"
                        autopilotLevel == 1 -> "proposal_first"
                        else -> "manual_lock"
                    }
                    put("autonomy", autonomy)
                    val disposition = when {
                        highRisk && dispatchStatus != "approved" && dispatchStatus != "ephemeral" -> "high_risk_review"
                        dispatchStatus == "awaiting_approval" -> "proposal_review"
                        dispatchStatus == "blocked" -> "manual_review"
                        dispatchStatus == "analysis_only" -> "analysis_only"
                        dispatchStatus == "ephemeral" -> "ephemeral_preview"
                        effectiveHistoryMode == "silent" -> "silent_execution"
                        else -> "visible_execution"
                    }
                    put("disposition", disposition)
                    val historyDest = when {
                        effectiveHistoryMode == "silent" && dispatchStatus == "approved" -> "silent_audit"
                        dispatchStatus == "ephemeral" -> "none"
                        else -> "standard"
                    }
                    put("historyDestination", historyDest)
                    put("willPersistHistory", historyDest != "none")
                    put("shouldNotifyUser", dispatchStatus == "awaiting_approval" || highRisk || disposition == "incident_review")
                }
            }
        }.toString()
    }
}
