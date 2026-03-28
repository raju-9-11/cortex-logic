package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.models.AgentPersonalityProvision
import com.agnes.nexus.core.domain.models.NeuralStateVector

/**
 * User Identity - simple wrapper for personalized prompts.
 */
data class UserIdentity(
    val name: String,
    val pronouns: String,
    val bio: String? = null,
    val assignedSexAtBirth: String? = null,
    val agentPersonalityProvision: AgentPersonalityProvision = AgentPersonalityProvision(),
    val displayNames: Map<String, String> = emptyMap(),
    val agentGenders: Map<String, String> = emptyMap()
)

/**
 * Persona Factory - handles agent identity assembly.
 */
interface PersonaFactory {
    fun assemble(
        moduleId: String,
        identity: UserIdentity,
        nsv: NeuralStateVector,
        moduleContext: Map<String, Any?> = emptyMap(),
        longTermSummary: String? = null
    ): String
}
