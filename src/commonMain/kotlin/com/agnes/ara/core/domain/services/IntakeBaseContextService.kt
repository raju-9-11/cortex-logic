package com.agnes.ara.core.domain.services

import com.agnes.ara.core.domain.models.CoreUserProfile
import com.agnes.ara.core.domain.models.TherapyProfile
import com.agnes.ara.core.domain.models.TrainerProfile
import kotlinx.serialization.Serializable

@Serializable
data class GlobalBaseIntakeContext(
    val name: String? = null,
    val pronouns: String? = null,
    val age: Int? = null,
    val assignedSexAtBirth: String? = null,
    val genderIdentity: String? = null,
    val occupation: String? = null,
    val typicalSleepHours: Double? = null
)

@Serializable
data class CoreProfilePatch(
    val preferredName: String? = null,
    val pronouns: String? = null,
    val age: Int? = null,
    val assignedSexAtBirth: String? = null,
    val genderIdentity: String? = null,
    val occupation: String? = null,
    val typicalSleepHours: Double? = null
)

object IntakeBaseContextService {
    private fun normalizeString(value: String?): String? = value?.trim()?.takeIf { it.isNotEmpty() }

    private fun normalizeNumber(value: Double?): Double? = value?.takeIf { it.isFinite() }

    private fun normalizeInt(value: Int?): Int? = value?.takeIf { it >= 0 }

    private fun mergeContexts(vararg contexts: GlobalBaseIntakeContext?): GlobalBaseIntakeContext {
        var merged = GlobalBaseIntakeContext()
        contexts.filterNotNull().forEach { ctx ->
            merged = merged.copy(
                name = ctx.name ?: merged.name,
                pronouns = ctx.pronouns ?: merged.pronouns,
                age = ctx.age ?: merged.age,
                assignedSexAtBirth = ctx.assignedSexAtBirth ?: merged.assignedSexAtBirth,
                genderIdentity = ctx.genderIdentity ?: merged.genderIdentity,
                occupation = ctx.occupation ?: merged.occupation,
                typicalSleepHours = ctx.typicalSleepHours ?: merged.typicalSleepHours
            )
        }
        return merged
    }

    private fun fromCoreProfile(profile: CoreUserProfile?): GlobalBaseIntakeContext {
        if (profile == null) return GlobalBaseIntakeContext()
        val sleepHours = profile.typicalSleepHours
            ?: ((profile.sleepEndHour - profile.sleepStartHour + 24) % 24).toDouble()
        return GlobalBaseIntakeContext(
            name = normalizeString(profile.preferredName ?: profile.name),
            pronouns = normalizeString(profile.pronouns),
            age = normalizeInt(profile.age),
            assignedSexAtBirth = normalizeString(profile.assignedSexAtBirth),
            genderIdentity = normalizeString(profile.genderIdentity),
            occupation = normalizeString(profile.occupation),
            typicalSleepHours = normalizeNumber(sleepHours)
        )
    }

    private fun fromTherapyProfile(profile: TherapyProfile?): GlobalBaseIntakeContext {
        if (profile == null) return GlobalBaseIntakeContext()
        val identity = profile.baseContext.identity
        return GlobalBaseIntakeContext(
            name = normalizeString(identity?.name),
            pronouns = normalizeString(identity?.pronouns),
            occupation = normalizeString(profile.baseContext.occupation),
            typicalSleepHours = normalizeNumber(profile.baseContext.typicalSleepHours)
        )
    }

    private fun fromTrainerProfile(profile: TrainerProfile?): GlobalBaseIntakeContext {
        if (profile == null) return GlobalBaseIntakeContext()
        return GlobalBaseIntakeContext(
            occupation = normalizeString(profile.activity.occupation),
            typicalSleepHours = normalizeNumber(profile.activity.sleepHours)
        )
    }

    fun buildForOrchestrator(coreProfile: CoreUserProfile?): GlobalBaseIntakeContext =
        fromCoreProfile(coreProfile)

    fun buildForTherapy(
        coreProfile: CoreUserProfile?,
        therapyProfile: TherapyProfile?
    ): GlobalBaseIntakeContext = mergeContexts(
        fromCoreProfile(coreProfile),
        fromTherapyProfile(therapyProfile)
    )

    fun buildForTrainer(
        coreProfile: CoreUserProfile?,
        trainerProfile: TrainerProfile?
    ): GlobalBaseIntakeContext = mergeContexts(
        fromCoreProfile(coreProfile),
        fromTrainerProfile(trainerProfile)
    )

    fun buildForLedger(coreProfile: CoreUserProfile?): GlobalBaseIntakeContext =
        fromCoreProfile(coreProfile)

    fun buildForSoma(coreProfile: CoreUserProfile?): GlobalBaseIntakeContext =
        fromCoreProfile(coreProfile)

    fun buildForAtlas(coreProfile: CoreUserProfile?): GlobalBaseIntakeContext =
        fromCoreProfile(coreProfile)

    fun buildForScout(coreProfile: CoreUserProfile?): GlobalBaseIntakeContext =
        fromCoreProfile(coreProfile)

    fun buildForForge(coreProfile: CoreUserProfile?): GlobalBaseIntakeContext =
        fromCoreProfile(coreProfile)

    fun buildForPulse(coreProfile: CoreUserProfile?): GlobalBaseIntakeContext =
        fromCoreProfile(coreProfile)

    fun toCoreProfilePatch(context: GlobalBaseIntakeContext): CoreProfilePatch {
        val assigned = context.assignedSexAtBirth
        val assignedNormalized = when (assigned?.lowercase()) {
            "female", "male" -> assigned.lowercase()
            else -> null
        }
        return CoreProfilePatch(
            preferredName = normalizeString(context.name),
            pronouns = normalizeString(context.pronouns),
            age = context.age,
            assignedSexAtBirth = assignedNormalized,
            genderIdentity = normalizeString(context.genderIdentity),
            occupation = normalizeString(context.occupation),
            typicalSleepHours = normalizeNumber(context.typicalSleepHours)
        )
    }
}
