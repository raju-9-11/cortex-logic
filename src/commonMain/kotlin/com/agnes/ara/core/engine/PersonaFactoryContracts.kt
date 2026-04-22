package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.model.GlobalSoul
import com.agnes.ara.core.domain.models.AgentPersonalityProvision
import com.agnes.ara.core.domain.models.NeuralStateVector

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
 *
 * @param globalSoul  When non-null, the compact 5-vector GlobalSoul is used for
 *                    LLM-facing prompt injection instead of the verbose NeuralStateVector.
 *                    The NSV is still available for module-specific logic (behavior overrides,
 *                    Atlas planning engine, etc.) but the LLM sees the normalized GlobalSoul.
 */
interface PersonaFactory {
    fun assemble(
        moduleId: String,
        identity: UserIdentity,
        nsv: NeuralStateVector,
        moduleContext: Map<String, Any?> = emptyMap(),
        longTermSummary: String? = null,
        globalSoul: GlobalSoul? = null
    ): String
}
