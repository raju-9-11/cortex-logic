package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.service.orchestration.*
import kotlin.js.JsExport

@JsExport
class OrchestrationContractsJs {
    fun isAutopilotLevel(value: Int): Boolean = OrchestrationContracts.isAutopilotLevel(value)
    fun isPrimaryAgentId(value: String): Boolean = OrchestrationContracts.isPrimaryAgentId(value)
    fun getAgentPrecedenceRank(source: String): Int = OrchestrationContracts.getAgentPrecedenceRank(source)
    fun compareAgentPrecedence(left: String, right: String): Int = OrchestrationContracts.compareAgentPrecedence(left, right)
    fun getMasterThreadAuthorRank(author: String): Int = OrchestrationContracts.getMasterThreadAuthorRank(author)
    fun compareMasterThreadAuthors(left: String, right: String): Int = OrchestrationContracts.compareMasterThreadAuthors(left, right)
    fun compareMasterThreadTurns(leftJson: String, rightJson: String): Int = OrchestrationContracts.compareMasterThreadTurns(leftJson, rightJson)
    fun compareMasterThreadMessages(leftJson: String, rightJson: String): Int = OrchestrationContracts.compareMasterThreadMessages(leftJson, rightJson)
    fun toSpecPriority(priority: String): Int = OrchestrationContracts.toSpecPriority(priority)
    fun normalizeSpecSource(source: String): String = OrchestrationContracts.normalizeSpecSource(source)
    fun adaptSpineEventToSpec(eventJson: String, optionsJson: String?): String = OrchestrationContracts.adaptSpineEventToSpec(eventJson, optionsJson)
    fun serializeSpecSpineEvent(specEventJson: String): String = OrchestrationContracts.serializeSpecSpineEvent(specEventJson)
}

@JsExport
class AutopilotActionPolicyServiceJs {
    fun isAllowed(actionType: String, autopilotLevel: Int): Boolean = AutopilotActionPolicyService.isAllowed(actionType, autopilotLevel)
    fun getThreshold(actionType: String): Int = AutopilotActionPolicyService.getThreshold(actionType) ?: -1
}

@JsExport
class OrchestrationOperatingModeServiceJs {
    fun derive(
        autopilotLevel: Int,
        historyMode: String,
        autonomy: String?,
        isGuest: Boolean,
        awaitingApprovalCount: Int,
        failedCount: Int,
        escalatedCount: Int,
    ): String = OrchestrationOperatingModeService.deriveJson(
        autopilotLevel, historyMode, autonomy, isGuest, awaitingApprovalCount, failedCount, escalatedCount,
    )
}

@JsExport
class OrchestrationPolicyServiceJs {
    fun sortProposals(proposalsJson: String): String = OrchestrationPolicyService.sortProposals(proposalsJson)
    fun resolveWinningProposal(proposalsJson: String): String = OrchestrationPolicyService.resolveWinningProposal(proposalsJson)
    fun getExecutionPolicy(autopilotLevel: Int, proposalJson: String, hasConflict: Boolean, highRisk: Boolean): String =
        OrchestrationPolicyService.getExecutionPolicyJson(autopilotLevel, proposalJson, hasConflict, highRisk)
}

@JsExport
class SoulAuthorityServiceJs {
    fun canWrite(moduleId: String, nsvPath: String): Boolean = SoulAuthorityService.canWrite(moduleId, nsvPath)
    fun getAuthoritativeModule(nsvPath: String): String = SoulAuthorityService.getAuthoritativeModule(nsvPath)
    fun auditPatch(moduleId: String, patchJson: String): String = SoulAuthorityService.auditPatch(moduleId, patchJson)
}

@JsExport
class ContextBudgeterJs {
    fun truncateText(value: String, maxChars: Int): String = ContextBudgeter.truncateText(value, maxChars)
    fun composeBoundedContext(
        title: String,
        identityLinesJson: String,
        nsvBlock: String?,
        insightLinesJson: String?,
        extensionBlock: String?,
        maxChars: Int,
        minNsvChars: Int,
    ): String {
        val json = kotlinx.serialization.json.Json { ignoreUnknownKeys = true }
        val identityLines = json.decodeFromString<List<String>>(identityLinesJson)
        val insightLines = insightLinesJson?.let { json.decodeFromString<List<String>>(it) }
        return ContextBudgeter.composeBoundedContext(title, identityLines, nsvBlock, insightLines, extensionBlock, maxChars, minNsvChars)
    }
}

@JsExport
class OrchestrationPerformanceServiceJs {
    fun recordCacheHit(domain: String) = OrchestrationPerformanceService.recordCacheHit(domain)
    fun recordCacheMiss(domain: String) = OrchestrationPerformanceService.recordCacheMiss(domain)
    fun recordComputation(domain: String, durationMs: Double) = OrchestrationPerformanceService.recordComputation(domain, durationMs.toLong())
    fun getMetrics(domain: String): String = OrchestrationPerformanceService.getMetricsJson(domain)
}

@JsExport
class OrchestrationRolloutServiceJs {
    fun recordParsedCommand(requiresClarification: Boolean) = OrchestrationRolloutService.recordParsedCommand(requiresClarification)
    fun recordRoutingDecision(reason: String) = OrchestrationRolloutService.recordRoutingDecision(reason)
    fun recordPlanningAttempt(built: Boolean) = OrchestrationRolloutService.recordPlanningAttempt(built)
    fun recordRuntimeSummary(runtimeSummaryJson: String) = OrchestrationRolloutService.recordRuntimeSummary(runtimeSummaryJson)
    fun getSnapshot(): String = OrchestrationRolloutService.getSnapshotJson()
}

@JsExport
class OrchestrationExecutionUtilsJs {
    val maxRetries: Int get() = OrchestrationExecutionUtils.MAX_RETRIES
    fun classifyFailureCode(errorMessage: String): String = OrchestrationExecutionUtils.classifyFailureCode(errorMessage)
    fun nextFailureStatus(errorCode: String, retryCount: Int): String = OrchestrationExecutionUtils.nextFailureStatus(errorCode, retryCount)
    fun getRetryBackoffMs(retryCount: Int): Double = OrchestrationExecutionUtils.getRetryBackoffMs(retryCount).toDouble()
}

@JsExport
class OrchestrationHistoryUtilsJs {
    fun generateAutonomyExplanation(metadataJson: String): String = OrchestrationHistoryUtils.generateAutonomyExplanation(metadataJson)
    fun shouldRouteToSilentHistory(historyMode: String, executionStatus: String, historyDestination: String): Boolean =
        OrchestrationHistoryUtils.shouldRouteToSilentHistory(historyMode, executionStatus, historyDestination)
    fun getAssistantMessageChannel(historyMode: String, executionStatus: String, historyDestination: String): String =
        OrchestrationHistoryUtils.getAssistantMessageChannel(historyMode, executionStatus, historyDestination)
    fun buildSilentHistoryEntry(moduleId: String, metadataJson: String, suppressedMessagesJson: String): String {
        val messages = kotlinx.serialization.json.Json.decodeFromString<List<String>>(suppressedMessagesJson)
        return OrchestrationHistoryUtils.buildSilentHistoryEntry(moduleId, metadataJson, messages)
    }
}

@JsExport
class OrchestrationPersistenceUtilsJs {
    fun getProposalCollectionPath(uid: String): String = OrchestrationPersistenceUtils.getProposalCollectionPath(uid)
    fun getExecutionCollectionPath(uid: String): String = OrchestrationPersistenceUtils.getExecutionCollectionPath(uid)
    fun getExecutionFailureCollectionPath(uid: String): String = OrchestrationPersistenceUtils.getExecutionFailureCollectionPath(uid)
    fun getThreadCollectionPath(uid: String): String = OrchestrationPersistenceUtils.getThreadCollectionPath(uid)
    fun toFirestoreSafeJson(valueJson: String): String = OrchestrationPersistenceUtils.toFirestoreSafeJson(valueJson)
    fun sanitizeRuntimeSummary(runtimeSummaryJson: String): String = OrchestrationPersistenceUtils.sanitizeRuntimeSummary(runtimeSummaryJson)
    fun toProposalRecord(moduleId: String, metadataJson: String, storedAt: String): String = OrchestrationPersistenceUtils.toProposalRecord(moduleId, metadataJson, storedAt)
    fun toExecutionRecord(moduleId: String, metadataJson: String, storedAt: String): String = OrchestrationPersistenceUtils.toExecutionRecord(moduleId, metadataJson, storedAt)
}

@JsExport
class OrchestrationCommandCenterServiceJs {
    fun buildSnapshot(actionsJson: String, failuresJson: String, silentHistoryJson: String, queueLimit: Int): String =
        OrchestrationCommandCenterService.buildSnapshot(actionsJson, failuresJson, silentHistoryJson, queueLimit)
}

@JsExport
class NexusActionDispatchServiceJs {
    fun canDispatchDeterministically(moduleId: String, actionType: String): Boolean =
        NexusActionDispatchService.canDispatchDeterministically(moduleId, actionType)
    fun getDeterministicActions(moduleId: String): Array<String> =
        NexusActionDispatchService.getDeterministicActions(moduleId).toTypedArray()
}

@JsExport
class NexusDispatchExecutionServiceJs {
    fun detectDependencyCycles(dispatchPlanJson: String): Array<String> =
        NexusDispatchExecutionService.detectDependencyCycles(dispatchPlanJson).toTypedArray()

    fun buildExecutionSummary(packetJson: String, resultsJson: String): String =
        NexusDispatchExecutionService.buildExecutionSummary(packetJson, resultsJson)

    fun buildRetryPacket(packetJson: String, resultsJson: String): String? =
        NexusDispatchExecutionService.buildRetryPacket(packetJson, resultsJson)

    fun buildExecutionId(planId: String, nodeId: String): String =
        NexusDispatchExecutionService.buildExecutionId(planId, nodeId)

    fun getRetryParentPlanId(packetJson: String): String? =
        NexusDispatchExecutionService.getRetryParentPlanId(packetJson)

    fun buildExecutionArtifacts(
        packetJson: String,
        resultsJson: String,
        timestamp: String,
        retryPacketJson: String?,
        retryPrompt: String?,
    ): String = NexusDispatchExecutionService.buildExecutionArtifacts(
        packetJson, resultsJson, timestamp, retryPacketJson, retryPrompt,
    )
}

@JsExport
class OrchestrationActionGateServiceJs {
    fun inferMutatesState(actionType: String): Boolean = OrchestrationActionGateService.inferMutatesState(actionType)
    fun inferHighRisk(actionType: String): Boolean = OrchestrationActionGateService.inferHighRisk(actionType)
    fun isNsvReadOnlyModule(moduleId: String): Boolean = OrchestrationActionGateService.isNsvReadOnlyModule(moduleId)
    fun isNsvWriteActionType(actionType: String): Boolean = OrchestrationActionGateService.isNsvWriteActionType(actionType)
    fun clampConfidence(value: Double): Double = OrchestrationActionGateService.clampConfidence(value)
    fun buildProposalCardStatus(dispatchStatus: String): String = OrchestrationActionGateService.buildProposalCardStatus(dispatchStatus)
    fun buildExecutionStatus(dispatchStatus: String): String = OrchestrationActionGateService.buildExecutionStatus(dispatchStatus)
    fun sanitizeIdToken(value: String, maxLength: Int): String = OrchestrationActionGateService.sanitizeIdToken(value, maxLength)
    fun evaluate(inputJson: String, actionLabel: String): String = OrchestrationActionGateService.evaluate(inputJson, actionLabel)
}
