package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.service.spine.FlowContracts
import kotlin.js.JsExport

@JsExport
class FlowContractsJs {
    fun createFlowMeta(source: String, flowId: String?): String = FlowContracts.createFlowMeta(source, flowId)
    fun deriveReadinessLevel(score: Double): String? = FlowContracts.deriveReadinessLevel(score)
    fun resolveReadinessScore(dataJson: String?): Double = FlowContracts.resolveReadinessScore(dataJson) ?: Double.NaN
    fun isCriticalReadiness(dataJson: String?): Boolean = FlowContracts.isCriticalReadiness(dataJson)
    fun isPhysicalCommitmentMissed(domain: String, dataJson: String?): Boolean = FlowContracts.isPhysicalCommitmentMissed(domain, dataJson)
    fun isDelegationCompletionSignal(eventType: String, dataJson: String?): Boolean = FlowContracts.isDelegationCompletionSignal(eventType, dataJson)
    fun parseDelegationTarget(eventJson: String): String? = FlowContracts.parseDelegationTarget(eventJson)
}
