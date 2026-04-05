package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.models.AtlasProfile
import com.agnes.nexus.core.domain.models.LedgerProfile
import com.agnes.nexus.core.domain.models.SomaProfile
import com.agnes.nexus.core.domain.models.TrainerProfile
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.doubleOrNull
import kotlinx.serialization.json.intOrNull
import kotlinx.serialization.json.longOrNull

/**
 * JS-export facade for DefaultPersonaFactory.
 *
 * DefaultPersonaFactory.assemble() requires Map<String, Any?> for moduleContext,
 * which is not directly JS-exportable. This facade exposes two strategies:
 *   1. [assemble]            — uses an empty module context (covers most cases)
 *   2. [assembleWithContext] — accepts a JSON string decoded into Map<String, Any?>
 *
 * The [identity] parameter uses [UserIdentityJs] rather than [UserIdentity] because
 * UserIdentity contains Map<> fields that are not JS-exportable.
 *
 * The [nsv] parameter uses [NeuralStateVectorJs] rather than [NeuralStateVector]
 * because NeuralStateVector contains Map<String, String> and List<String> fields
 * that are not safely JS-exportable.
 */
@JsExport
class PersonaFactoryJs {
    private val inner = DefaultPersonaFactory()

    private companion object {
        /** Lenient parser: ignores unknown keys so TS can pass superset data freely. */
        private val lenientJson = Json { ignoreUnknownKeys = true; coerceInputValues = true }

        /**
         * Known profile keys that should be deserialized into typed Kotlin classes
         * rather than kept as raw strings. Maps the JSON key to a deserializer function.
         */
        private val profileDeserializers: Map<String, (JsonObject) -> Any?> = mapOf(
            "titan_profile" to { obj -> lenientJson.decodeFromJsonElement(TrainerProfile.serializer(), obj) },
            "atlas_profile" to { obj -> lenientJson.decodeFromJsonElement(AtlasProfile.serializer(), obj) },
            "ledger_profile" to { obj -> lenientJson.decodeFromJsonElement(LedgerProfile.serializer(), obj) },
            "soma_profile" to { obj -> lenientJson.decodeFromJsonElement(SomaProfile.serializer(), obj) },
        )

        /**
         * Convert a [kotlinx.serialization.json.JsonElement] to a native Kotlin value:
         * - JsonPrimitive strings → String
         * - JsonPrimitive booleans → Boolean
         * - JsonPrimitive ints → Int
         * - JsonPrimitive longs → Long
         * - JsonPrimitive doubles → Double
         * - JsonNull → null
         * - JsonArray → List<Any?>
         * - JsonObject → Map<String, Any?> (recursive)
         *
         * For known profile keys, the JsonObject is deserialized into the typed
         * Kotlin data class instead.
         */
        fun jsonElementToAny(key: String, element: kotlinx.serialization.json.JsonElement): Any? {
            return when (element) {
                is JsonNull -> null
                is JsonPrimitive -> {
                    if (element.isString) {
                        element.content
                    } else {
                        element.booleanOrNull
                            ?: element.intOrNull
                            ?: element.longOrNull
                            ?: element.doubleOrNull
                            ?: element.content
                    }
                }
                is JsonObject -> {
                    // Try typed deserialization for known profile keys
                    val deserializer = profileDeserializers[key]
                    if (deserializer != null) {
                        try {
                            deserializer(element)
                        } catch (_: Exception) {
                            // Fall back to raw map if deserialization fails
                            element.entries.associate { (k, v) -> k to jsonElementToAny(k, v) }
                        }
                    } else {
                        element.entries.associate { (k, v) -> k to jsonElementToAny(k, v) }
                    }
                }
                is JsonArray -> {
                    element.map { jsonElementToAny("", it) }
                }
            }
        }
    }

    /**
     * Assembles a full system prompt for the given module with no module context.
     *
     * @param moduleId        Module ID (e.g. "agnes", "titan", "ledger")
     * @param identity        JS-friendly user identity wrapper
     * @param nsv             Neural State Vector wrapper; if null returns the user's name as a bare fallback
     * @param longTermSummary Optional long-term conversation summary
     */
    fun assemble(
        moduleId: String,
        identity: UserIdentityJs,
        nsv: NeuralStateVectorJs?,
        longTermSummary: String? = null
    ): String {
        if (nsv == null) return identity.name
        return inner.assemble(moduleId, identity.toUserIdentity(), nsv.nsv, emptyMap(), longTermSummary)
    }

    /**
     * Assembles with module context supplied as a JSON string.
     * Avoids the Map<String, Any?> restriction at the JS boundary by parsing
     * the JSON on the Kotlin side and converting values to properly typed Any?.
     *
     * Typed profile keys (`titan_profile`, `atlas_profile`, `ledger_profile`,
     * `soma_profile`) are deserialized into their Kotlin data classes so that
     * DefaultPersonaFactory.assemble() can cast them correctly.
     *
     * @param moduleContextJson A JSON object string, e.g. '{"baseRole":"...", "titan_profile":{...}}'
     */
    fun assembleWithContext(
        moduleId: String,
        identity: UserIdentityJs,
        nsv: NeuralStateVectorJs?,
        moduleContextJson: String,
        longTermSummary: String? = null
    ): String {
        if (nsv == null) return identity.name
        val context = try {
            val jsonObject = lenientJson.decodeFromString<JsonObject>(moduleContextJson)
            jsonObject.entries.associate { (k, v) -> k to jsonElementToAny(k, v) }
        } catch (_: Exception) {
            emptyMap()
        }
        return inner.assemble(moduleId, identity.toUserIdentity(), nsv.nsv, context, longTermSummary)
    }
}
