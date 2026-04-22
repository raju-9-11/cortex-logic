package com.agnes.ara.core.domain.services

import com.agnes.ara.core.domain.models.*
import kotlinx.serialization.json.*

data class FieldContextSyncResult<T>(
    val profile: T,
    val projectionUpdates: Map<String, Any?> = emptyMap()
)

/**
 * Field Context Sync Service - Pure KMP logic to synchronize applied proposals
 * back to core profile fields and NSV telemetry.
 */
class FieldContextSyncService {

    fun syncTherapy(
        profile: TherapyProfile,
        proposal: FieldProposal?,
        extensibility: ModuleProfileExtensibility
    ): FieldContextSyncResult<TherapyProfile> {
        val value = proposal.validatedValueOrNull(extensibility) ?: return FieldContextSyncResult(profile)
        val projectionUpdates = mutableMapOf<String, Any?>()

        val updatedProfile = when (value.fieldId) {
            "last_session_summary" -> profile.copy(lastSessionSummary = value.value.stringValueOrNull() ?: profile.lastSessionSummary)
            "background_summary" -> profile.copy(
                baseContext = profile.baseContext.copy(
                    backgroundSummary = value.value.stringValueOrNull() ?: profile.baseContext.backgroundSummary
                )
            )
            "occupation" -> profile.copy(
                baseContext = profile.baseContext.copy(
                    occupation = value.value.stringValueOrNull() ?: profile.baseContext.occupation
                )
            )
            "communication_style" -> profile.copy(
                baseContext = profile.baseContext.copy(
                    communicationStyle = value.value.stringValueOrNull() ?: profile.baseContext.communicationStyle
                )
            )
            "typical_sleep_hours" -> profile.copy(
                baseContext = profile.baseContext.copy(
                    typicalSleepHours = value.value.doubleValueOrNull() ?: profile.baseContext.typicalSleepHours
                )
            )
            else -> profile
        }

        when (value.fieldId) {
            "emotional_resilience" -> value.value.doubleValueOrNull()?.let {
                projectionUpdates["emotional.emotionalResilience"] = it
            }
            "stress_load" -> value.value.doubleValueOrNull()?.let {
                projectionUpdates["emotional.stressLoad"] = it
            }
            "mood_trend" -> value.value.stringValueOrNull()?.let {
                projectionUpdates["emotional.moodTrend"] = it
            }
            "trauma_markers" -> value.value.stringListOrNull()?.let {
                projectionUpdates["emotional.traumaMarkers"] = it
            }
        }

        return FieldContextSyncResult(
            profile = updatedProfile,
            projectionUpdates = projectionUpdates
        )
    }

    fun syncTrainer(
        profile: TrainerProfile,
        proposal: FieldProposal?,
        extensibility: ModuleProfileExtensibility
    ): FieldContextSyncResult<TrainerProfile> {
        val value = proposal.validatedValueOrNull(extensibility) ?: return FieldContextSyncResult(profile)
        val projectionUpdates = mutableMapOf<String, Any?>()

        val updatedProfile = when (value.fieldId) {
            "summary" -> profile.copy(summary = value.value.stringValueOrNull() ?: profile.summary)
            "workouts_per_week" -> profile.copy(
                activity = profile.activity.copy(
                    workoutsPerWeek = value.value.intValueOrNull() ?: profile.activity.workoutsPerWeek
                )
            )
            else -> profile
        }

        when (value.fieldId) {
            "cns_fatigue" -> value.value.doubleValueOrNull()?.let {
                projectionUpdates["biological.cnsFatigue"] = it
            }
            "sleep_quality" -> value.value.doubleValueOrNull()?.let {
                projectionUpdates["biological.sleepQuality"] = it
            }
            "recovery_score" -> value.value.doubleValueOrNull()?.let {
                projectionUpdates["biological.recoveryScore"] = it
            }
            "hormonal_context" -> value.value.stringValueOrNull()?.let {
                projectionUpdates["biological.hormonalContext"] = it
            }
        }

        return FieldContextSyncResult(
            profile = updatedProfile,
            projectionUpdates = projectionUpdates
        )
    }

    fun syncLedger(
        profile: LedgerProfile,
        proposal: FieldProposal?,
        extensibility: ModuleProfileExtensibility
    ): FieldContextSyncResult<LedgerProfile> {
        val value = proposal.validatedValueOrNull(extensibility) ?: return FieldContextSyncResult(profile)
        val projectionUpdates = mutableMapOf<String, Any?>()

        val updatedProfile = when (value.fieldId) {
            "monthly_income" -> profile.copy(monthlyIncome = value.value.doubleValueOrNull() ?: profile.monthlyIncome)
            "currency" -> profile.copy(currency = value.value.stringValueOrNull() ?: profile.currency)
            "financial_friction" -> profile.copy(
                financialFriction = value.value.doubleValueOrNull()?.toFloat() ?: profile.financialFriction
            )
            "resonance_roi" -> profile.copy(
                resonanceROI = value.value.doubleValueOrNull()?.toFloat() ?: profile.resonanceROI
            )
            else -> profile
        }

        when (value.fieldId) {
            "financial_friction" -> value.value.doubleValueOrNull()?.let {
                projectionUpdates["resource.financialFriction"] = it
            }
            "resonance_roi" -> value.value.doubleValueOrNull()?.let {
                projectionUpdates["resource.resonanceROI"] = it
            }
        }

        return FieldContextSyncResult(
            profile = updatedProfile,
            projectionUpdates = projectionUpdates
        )
    }
}

private data class AppliedFieldValue(
    val fieldId: String,
    val value: JsonElement
)

private fun FieldProposal?.validatedValueOrNull(extensibility: ModuleProfileExtensibility): AppliedFieldValue? {
    if (this == null) return null
    if (status != ProposalStatus.APPLIED || target.type != ProposalTargetType.FIELD_VALUE) return null

    val payloadFieldId = payload["fieldId"]?.jsonPrimitive?.contentOrNull?.trim().orEmpty()
    val targetFieldId = target.fieldId?.trim().orEmpty()
    val resolvedFieldId = payloadFieldId.ifBlank { targetFieldId }
    if (resolvedFieldId.isBlank()) return null

    val customFieldValue = extensibility.validatedCustomFieldValues[resolvedFieldId] ?: return null
    return AppliedFieldValue(
        fieldId = resolvedFieldId,
        value = customFieldValue
    )
}

private fun JsonElement.stringValueOrNull(): String? {
    if (this is JsonNull) return null
    return jsonPrimitive.contentOrNull?.trim()?.ifBlank { null }
}

private fun JsonElement.intValueOrNull(): Int? {
    if (this is JsonNull) return null
    return jsonPrimitive.intOrNull
}

private fun JsonElement.doubleValueOrNull(): Double? {
    if (this is JsonNull) return null
    return jsonPrimitive.doubleOrNull
}

private fun JsonElement.stringListOrNull(): List<String>? {
    if (this is JsonNull || this !is JsonArray) return null
    return runCatching {
        jsonArray.mapNotNull { element ->
            element.jsonPrimitive.contentOrNull?.trim()?.ifBlank { null }
        }
    }.getOrNull()
}
