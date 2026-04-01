package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.models.AgentPersonalityProvision

/**
 * JS-exportable UserIdentity builder.
 * Maps from flat JS-friendly parameters to the internal UserIdentity.
 *
 * UserIdentity cannot be @JsExport directly because it contains Map<String, String>
 * and Map<String, GenderPersonality> fields which are not JS-exportable.
 * This class provides a flat, primitive-only surface for TypeScript consumers.
 */
@JsExport
class UserIdentityJs(
    val name: String,
    val pronouns: String,
    val bio: String? = null,
    val assignedSexAtBirth: String? = null,
    val orchestratorAlias: String = name,
    val agentGender: String = "female"
) {
    fun toUserIdentity(): UserIdentity = UserIdentity(
        name = name,
        pronouns = pronouns,
        bio = bio,
        assignedSexAtBirth = assignedSexAtBirth,
        agentPersonalityProvision = AgentPersonalityProvision(
            orchestratorAlias = orchestratorAlias
        ),
        displayNames = emptyMap(),
        agentGenders = mapOf("orchestrator" to agentGender)
    )
}
