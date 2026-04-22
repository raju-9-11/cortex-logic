package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.services.AraActionPlannerService
import kotlin.js.JsExport

/**
 * JS facade for AraActionPlannerService.
 *
 * buildNode — pure intent-to-node construction.
 * All parameters and return values are JSON strings.
 */
@JsExport
class AraActionPlannerServiceJs {

    /**
     * Build an action plan node for a given intent.
     *
     * @param intentJson Serialised ParsedCommandIntent.
     * @param registryActionType Mapped action type from FLOW_REGISTRY, or null.
     * @param targetModuleId Resolved primary module.
     * @param supportingModuleIdsJson JSON array of supporting module IDs.
     * @return Serialised NexusActionPlanNode JSON.
     */
    fun buildNode(
        intentJson: String,
        registryActionType: String?,
        targetModuleId: String,
        supportingModuleIdsJson: String,
    ): String = AraActionPlannerService.buildNode(
        intentJson, registryActionType, targetModuleId, supportingModuleIdsJson
    )

    /**
     * Whether Scout should be added as a supporting module for this intent.
     */
    fun shouldEnrichWithScout(
        intentType: String,
        targetModuleId: String,
        currentSupportingJson: String,
    ): Boolean = AraActionPlannerService.shouldEnrichWithScout(intentType, targetModuleId, currentSupportingJson)

    /** Whether this action type produces a draft instead of executing directly. */
    fun isDraftActionType(actionType: String): Boolean =
        AraActionPlannerService.isDraftActionType(actionType)
}
