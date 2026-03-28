package com.agnes.nexus.core.domain.service.soma

import com.agnes.nexus.core.domain.model.PatientScope
import com.agnes.nexus.core.domain.services.SpineEventBus
import com.agnes.nexus.core.domain.services.SpineEventPayload
import com.agnes.nexus.core.domain.services.SpinePatientScope
import com.agnes.nexus.core.domain.services.SpineSoulMutation

/**
 * Enforces the Soma Patient Firewall.
 *
 * Before any clinical data mutates the GlobalSoul:
 *   USER  → full pipeline (parse → update SomaProfile → mutate vitality baseline)
 *   GUEST → stateless analysis only — zero GlobalSoul mutation
 *
 * The actual mutation gate is enforced in DefaultSpineEventBus.emit() by checking
 * SpineLogicGates.patientScope. This service wraps clinical upload events with
 * the correct scope before they reach the bus.
 */
class PatientFirewallService(
    private val eventBus: SpineEventBus
) {
    /**
     * Emit a clinical upload event with the correct patient scope.
     * GUEST events have mutations zeroed by the bus firewall automatically.
     *
     * @param documentId     Unique identifier of the uploaded document
     * @param documentType   Type label (e.g. "LAB_REPORT", "PRESCRIPTION")
     * @param parsedSummary  Optional LLM-extracted summary of the document
     * @param scope          Patient scope — drives firewall routing
     * @param vitalityDelta  Optional vitality baseline adjustment (USER scope only)
     */
    suspend fun emitClinicalUpload(
        documentId: String,
        documentType: String,
        parsedSummary: String?,
        scope: PatientScope,
        vitalityDelta: Float? = null
    ) {
        val spineScope = when (scope) {
            PatientScope.USER  -> SpinePatientScope.USER
            PatientScope.GUEST -> SpinePatientScope.GUEST
        }

        // Only attach mutations for USER scope; GUEST mutations are zeroed by the bus
        val mutations = if (scope == PatientScope.USER && vitalityDelta != null) {
            listOf(SpineSoulMutation("VITALITY", vitalityDelta))
        } else emptyList()

        eventBus.emit(SpineEventPayload(
            type = "CLINICAL_UPLOAD_PROCESSED",
            source = "soma",
            priority = if (scope == PatientScope.USER) "alert" else "info",
            mutations = mutations,
            patientScope = spineScope,
            data = mapOf(
                "documentId"    to documentId,
                "documentType"  to documentType,
                "parsedSummary" to parsedSummary,
                "patientScope"  to scope.name,
                "note" to if (scope == PatientScope.GUEST)
                    "Guest data: analysis only, GlobalSoul not modified"
                else
                    "User data: vitality baseline will be updated"
            )
        ).toSpineEvent())
    }
}
