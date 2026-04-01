package com.agnes.nexus.core.engine

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
     * the JSON on the Kotlin side and converting primitives to Any?.
     *
     * @param moduleContextJson A JSON object string, e.g. '{"backgroundSummary":"..."}'
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
            kotlinx.serialization.json.Json.decodeFromString<kotlinx.serialization.json.JsonObject>(moduleContextJson)
                .entries.associate { (k, v) -> k to v.toString().removeSurrounding("\"") as Any? }
        } catch (_: Exception) {
            emptyMap()
        }
        return inner.assemble(moduleId, identity.toUserIdentity(), nsv.nsv, context, longTermSummary)
    }
}
