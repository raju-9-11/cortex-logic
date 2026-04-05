package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.models.AgentPersonalityProvision
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject

/**
 * JS-exportable UserIdentity builder.
 * Maps from flat JS-friendly parameters to the internal UserIdentity.
 *
 * UserIdentity cannot be @JsExport directly because it contains Map<String, String>
 * and Map<String, GenderPersonality> fields which are not JS-exportable.
 * This class provides a flat, primitive-only surface for TypeScript consumers.
 *
 * Per-module display names and agent genders are passed as JSON strings to avoid
 * Map<> at the JS boundary. They are parsed into Map<String, String> on the
 * Kotlin side in [toUserIdentity].
 */
@JsExport
class UserIdentityJs(
    val name: String,
    val pronouns: String,
    val bio: String? = null,
    val assignedSexAtBirth: String? = null,
    val orchestratorAlias: String = name,
    val agentGender: String = "female",
    val displayNamesJson: String = "{}",
    val agentGendersJson: String = "{}"
) {

    private companion object {
        private val lenientJson = Json { ignoreUnknownKeys = true; coerceInputValues = true }

        /**
         * Parse a JSON object string like '{"titan":"Ares","ledger":"Maven"}' into
         * a Map<String, String>. Returns emptyMap() on malformed input.
         */
        fun parseStringMap(json: String): Map<String, String> {
            if (json.isBlank() || json == "{}") return emptyMap()
            return try {
                val obj = lenientJson.decodeFromString<JsonObject>(json)
                obj.entries.associate { (k, v) ->
                    k to v.toString().removeSurrounding("\"")
                }
            } catch (_: Exception) {
                emptyMap()
            }
        }
    }

    fun toUserIdentity(): UserIdentity {
        val displayNames = parseStringMap(displayNamesJson)
        val agentGenders = parseStringMap(agentGendersJson).toMutableMap()
        // Always include orchestrator gender for backward compatibility
        if ("orchestrator" !in agentGenders) {
            agentGenders["orchestrator"] = agentGender
        }

        return UserIdentity(
            name = name,
            pronouns = pronouns,
            bio = bio,
            assignedSexAtBirth = assignedSexAtBirth,
            agentPersonalityProvision = AgentPersonalityProvision(
                orchestratorAlias = orchestratorAlias
            ),
            displayNames = displayNames,
            agentGenders = agentGenders
        )
    }
}
