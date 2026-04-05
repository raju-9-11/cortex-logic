package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.service.NsvOwnershipService
import kotlin.js.JsExport

@JsExport
class NsvOwnershipServiceJs {

    fun ownsMetric(moduleId: String, metric: String): Boolean =
        NsvOwnershipService.ownsMetric(moduleId, metric)

    fun getWritableMetrics(moduleId: String): Array<String> =
        NsvOwnershipService.getWritableMetrics(moduleId).toTypedArray()

    fun getReadableMetrics(moduleId: String): Array<String> =
        NsvOwnershipService.getReadableMetrics(moduleId).toTypedArray()

    fun getMetricOwner(metric: String): String =
        NsvOwnershipService.getMetricOwner(metric)

    fun getMetricOwners(metric: String): Array<String> =
        NsvOwnershipService.getMetricOwners(metric).toTypedArray()

    fun isExclusiveOwner(moduleId: String, metric: String): Boolean =
        NsvOwnershipService.isExclusiveOwner(moduleId, metric)

    fun filterNsvForModule(nsvJson: String, moduleId: String): String =
        NsvOwnershipService.filterNsvForModule(nsvJson, moduleId)

    /**
     * Returns true if the metric's last-updated timestamp is older than [thresholdDays].
     * @param lastUpdated ISO 8601 timestamp string, or null/blank.
     * @param thresholdDays Age limit in whole days.
     * @param nowMs Current epoch ms (pass Date.now() from JS).
     */
    fun isMetricStale(lastUpdated: String?, thresholdDays: Int, nowMs: Double): Boolean =
        NsvOwnershipService.isMetricStale(lastUpdated, thresholdDays, nowMs.toLong())

    /**
     * Returns co-owned metric paths from a patch that [moduleId] does not exclusively own.
     * @param moduleId   Module performing the write.
     * @param patchJson  JSON object: {domain: {field: value}}.
     * @return Array of dotted metric paths (e.g. ["biological.cnsFatigue"]).
     */
    fun getCoOwnedMetricsInPatch(moduleId: String, patchJson: String): Array<String> =
        NsvOwnershipService.getCoOwnedMetricsInPatch(moduleId, patchJson).toTypedArray()

    /**
     * Filter an NSV write patch to only include metrics [moduleId] is allowed to write.
     * Supports both flat dotted keys (e.g. {"biological.cnsFatigue": 5})
     * and nested JSON (e.g. {"biological": {"cnsFatigue": 5}}).
     * @param moduleId Module performing the write.
     * @param patchJson JSON in either format.
     * @return Filtered JSON (flat dotted format) or empty string if nothing remains.
     */
    fun filterWritePatch(moduleId: String, patchJson: String): String =
        NsvOwnershipService.filterWritePatch(moduleId, patchJson) ?: ""

    fun getDerivedMetrics(): Array<String> =
        NsvOwnershipService.DERIVED_METRICS.toTypedArray()

    fun getCalibrationPrompt(metric: String): String =
        NsvOwnershipService.CALIBRATION_PROMPTS[metric] ?: metric

    fun buildCalibrationPrompt(moduleId: String): String =
        NsvOwnershipService.buildCalibrationPrompt(moduleId)
}
