package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.models.ModuleProfileExtensibility
import com.agnes.ara.core.domain.services.FieldProposalService
import com.agnes.ara.core.domain.services.SchemaMaintenanceService
import com.agnes.ara.core.domain.services.SpineEventBus
import kotlinx.serialization.json.Json
import kotlin.js.JsExport

/**
 * JS-safe facade for [SchemaMaintenanceService].
 */
@JsExport
class SchemaMaintenanceServiceJs(
    private val fieldProposalService: FieldProposalService,
    private val spineEventBus: SpineEventBus
) {
    private val service = SchemaMaintenanceService(fieldProposalService, spineEventBus)
    private val json = Json { ignoreUnknownKeys = true }

    /**
     * Trigger a maintenance scan.
     * @param moduleIdList JSON array of strings.
     * @param profileGetterJs A JS function that takes a moduleId and returns a JSON string
     *                        of [ModuleProfileExtensibility], or null.
     */
    fun performCleanupScan(
        moduleIdListJson: String,
        profileGetterJs: (moduleId: String) -> String?,
        thresholdDays: Int = 30
    ) {
        val modules: List<String> = json.decodeFromString(moduleIdListJson)
        
        service.performCleanupScan(
            moduleIdList = modules,
            profileGetter = { moduleId ->
                profileGetterJs(moduleId)?.let { 
                    json.decodeFromString<ModuleProfileExtensibility>(it)
                }
            },
            thresholdDays = thresholdDays
        )
    }
}
