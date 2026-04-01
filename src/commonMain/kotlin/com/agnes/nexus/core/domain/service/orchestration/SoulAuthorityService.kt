package com.agnes.nexus.core.domain.service.orchestration

import com.agnes.nexus.core.domain.service.NsvOwnershipService
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

@Serializable
data class SoulAuthorityViolation(
    val path: String,
    val authority: String,
)

/**
 * Guards Global Soul (NSV) writes by verifying module ownership authority.
 * Nexus has super-authority over all paths. Other modules can only write paths they own.
 */
object SoulAuthorityService {

    private val json = Json { ignoreUnknownKeys = true }

    fun canWrite(moduleId: String, nsvPath: String): Boolean {
        if (moduleId == "nexus") return true
        return NsvOwnershipService.ownsMetric(moduleId, nsvPath)
    }

    fun getAuthoritativeModule(nsvPath: String): String {
        val owners = NsvOwnershipService.getMetricOwners(nsvPath)
        return owners.firstOrNull() ?: "nexus"
    }

    /**
     * Validates an entire patch object. Returns JSON array of violations (empty = clean).
     * @param moduleId The module attempting the write
     * @param patchJson JSON object where keys are NSV metric paths
     */
    fun auditPatch(moduleId: String, patchJson: String): String {
        val patch = json.parseToJsonElement(patchJson).jsonObject
        val violations = mutableListOf<SoulAuthorityViolation>()

        for (path in patch.keys) {
            if (!canWrite(moduleId, path)) {
                violations.add(SoulAuthorityViolation(path, getAuthoritativeModule(path)))
            }
        }

        return json.encodeToString(violations)
    }
}
