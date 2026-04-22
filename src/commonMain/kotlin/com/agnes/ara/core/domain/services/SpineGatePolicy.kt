package com.agnes.ara.core.domain.services

/**
 * Canonical gate policy helpers shared across app/UI layers.
 *
 * These helpers do not replace the emit pipeline in [DefaultSpineEventBus];
 * they let platform consumers react consistently to the gate outcomes that the
 * shared pipeline already computes.
 */
object SpineGatePolicy {
    private val durableAuditEventTypes = setOf(
        "DRAFT_APPROVED",
        "DRAFT_DISMISSED",
        "EXECUTE_DRAFT",
        "OVERRIDE_VETO",
        "SYSTEM_DEBT_CLEARED"
    )

    fun shouldCreateProposal(event: SpineEvent): Boolean =
        event.logicGates.requiresApproval &&
            !event.suppressActiveEmit &&
            !event.type.equals("AI_PROPOSAL_GENERATED", ignoreCase = true) &&
            !event.type.equals("DRAFT_PROPOSED", ignoreCase = true) &&
            !event.type.equals("DRAFT_APPROVED", ignoreCase = true) &&
            !event.type.equals("DRAFT_DISMISSED", ignoreCase = true) &&
            !event.type.equals("UI_SUPPRESSION", ignoreCase = true) &&
            !event.header.source.equals("ui", ignoreCase = true)

    fun shouldSuppressUi(event: SpineEvent): Boolean =
        event.type.equals("UI_SUPPRESSION", ignoreCase = true)

    fun shouldPersistAsAuditEvent(event: SpineEvent): Boolean =
        durableAuditEventTypes.any { it.equals(event.type, ignoreCase = true) }

    fun shouldPersistSilentHistory(event: SpineEvent): Boolean =
        event.logicGates.patientScope == SpinePatientScope.USER &&
            (
                shouldPersistAsAuditEvent(event) ||
                event.priority == "critical" ||
                event.priority == "alert" ||
                event.isAutonomousExecution
            )
}
