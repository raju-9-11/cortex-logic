package com.agnes.ara.core.domain.actions

import com.agnes.ara.core.domain.models.ModuleManifest
import com.agnes.ara.core.domain.models.toMap
import com.agnes.ara.core.domain.services.AraHandoffService
import com.agnes.ara.core.domain.services.AraRoutingService
import com.agnes.ara.core.domain.services.NeuralProjectionService
import com.agnes.ara.core.domain.services.SpineEventBus
import com.agnes.ara.core.domain.services.SpineEventPayload
import com.agnes.ara.core.domain.services.AraDataLayer
import kotlinx.datetime.Clock
import kotlinx.serialization.json.*

/**
 * Orchestrator-specific action handlers.
 * Ported from web: src/modules/nexus/services/actions.ts
 *
 * These handlers provide Nexus-level orchestration capabilities:
 * - navigate_to_module: Lightweight routing without context transfer
 * - create_module_handoff: Store handoff for target module pickup
 * - broadcast_spine_event: AI-accessible Spine publisher (restricted types)
 * - sync_vitals: Apply NSV patch from AI
 * - update_global_identity: Update core profile identity fields
 * - sync_personality_provision: Update agent personality provision
 */
class OrchestratorActions(
    private val actionHub: ActionHub,
    private val araHandoffService: AraHandoffService,
    private val routingService: AraRoutingService,
    private val nsvService: NeuralProjectionService,
    private val eventBus: SpineEventBus,
    private val dataLayer: AraDataLayer? = null
) {
    private val json = Json { ignoreUnknownKeys = true; encodeDefaults = true }

    /**
     * Safe subset of event types that AI can broadcast.
     * These are pre-vetted, low-risk events that don't require elevated privileges.
     */
    private val allowedSpineEventTypes = setOf(
        "VITAL_UPDATED",
        "HEALTH_CONTEXT_STALE",
        "MODULE_DELEGATED",
        "COMPOUND_STRESS",
        "CRISIS_DETECTED",
        "COGNITIVE_OVERLOAD",
        "BURNOUT_WARNING"
    )

    /**
     * Fields that can be safely updated by AI via update_global_identity.
     */
    private val allowedIdentityFields = setOf(
        "preferredName",
        "pronouns",
        "occupation",
        "age",
        "genderIdentity",
        "timezone",
        "locale"
    )

    /**
     * Priority remapping: LLM may send 'normal' which maps to 'info'.
     */
    private val priorityRemap = mapOf(
        "info" to "info",
        "normal" to "info",
        "alert" to "alert",
        "critical" to "critical"
    )

    /**
     * Register all orchestrator action handlers with the ActionHub.
     * Should be called during app initialization.
     */
    fun register() {
        registerNavigateToModule()
        registerCreateModuleHandoff()
        registerBroadcastSpineEvent()
        registerSyncVitals()
        registerUpdateGlobalIdentity()
        registerSyncPersonalityProvision()
    }

    /**
     * navigate_to_module
     * Lightweight routing: navigate to a module's page without creating a
     * delegation handoff or transferring context. Use when the user's intent is
     * purely navigational (no data/context to pass forward).
     *
     * Payload: { moduleId: string }
     *
     * Emits: NAVIGATION_REQUESTED event for the UI layer to handle.
     */
    private fun registerNavigateToModule() {
        actionHub.register("nexus", "navigate_to_module") { call ->
            val moduleId = call.payload["moduleId"]?.jsonPrimitive?.contentOrNull
            if (moduleId.isNullOrBlank()) {
                return@register
            }

            // Validate that the module exists
            val manifest = ModuleManifest.byId(moduleId)
            if (manifest == null) {
                return@register
            }

            val route = routingService.getRoute(moduleId)

            // Emit navigation request event for the Android UI layer to handle
            eventBus.emit(
                SpineEventPayload(
                    type = "NAVIGATION_REQUESTED",
                    source = "nexus",
                    domain = "system",
                    data = mapOf(
                        "moduleId" to moduleId,
                        "route" to route
                    ),
                    priority = "info"
                )
            )
        }
    }

    /**
     * create_module_handoff
     * Persist a handoff entry so that the target module can pick up context on
     * the user's next visit — WITHOUT immediately navigating away from Nexus.
     * Emits MODULE_DELEGATED on the Spine so interested listeners can react.
     *
     * Payload: { moduleId: string, content: string, reason?: string }
     */
    private fun registerCreateModuleHandoff() {
        actionHub.register("nexus", "create_module_handoff") { call ->
            val moduleId = call.payload["moduleId"]?.jsonPrimitive?.contentOrNull
            val content = call.payload["content"]?.jsonPrimitive?.contentOrNull
            val reason = call.payload["reason"]?.jsonPrimitive?.contentOrNull ?: "Prepared by Nexus"

            if (moduleId.isNullOrBlank() || content.isNullOrBlank()) {
                return@register
            }

            // Validate that the module exists
            if (ModuleManifest.byId(moduleId) == null) {
                return@register
            }

            // Store the handoff for the target module to consume
            araHandoffService.store(
                AraHandoffService.AraHandoff(
                    moduleId = moduleId,
                    type = "delegate",
                    content = content,
                    reason = reason,
                    sourceModuleId = "nexus",
                    createdAt = Clock.System.now().toString()
                )
            )

            // Emit spine event so interested listeners can react
            eventBus.emit(
                SpineEventPayload(
                    type = "MODULE_DELEGATED",
                    source = "nexus",
                    domain = "system",
                    data = mapOf(
                        "targetModule" to moduleId,
                        "context" to content,
                        "reason" to reason,
                        "source" to "nexus"
                    ),
                    priority = "info"
                )
            )
        }
    }

    /**
     * broadcast_spine_event
     * AI-accessible Spine publisher — restricted to a safe subset of event types.
     * The 'normal' priority from LLM payloads is remapped to the valid 'info' tier.
     *
     * Payload: { type: string, domain?: string, priority?: string, data?: object }
     */
    private fun registerBroadcastSpineEvent() {
        actionHub.register("nexus", "broadcast_spine_event") { call ->
            val rawType = call.payload["type"]?.jsonPrimitive?.contentOrNull ?: ""

            // Security: Only allow pre-approved event types from AI
            if (!allowedSpineEventTypes.contains(rawType)) {
                println("[broadcast_spine_event] Event type \"$rawType\" not permitted from AI")
                return@register
            }

            val domainRaw = call.payload["domain"]?.jsonPrimitive?.contentOrNull ?: "system"
            val domain = normalizeDomain(domainRaw)

            val rawPriority = call.payload["priority"]?.jsonPrimitive?.contentOrNull ?: "info"
            val resolvedPriority = priorityRemap[rawPriority] ?: "info"

            val data = call.payload["data"]?.jsonObject?.toMap() ?: emptyMap()

            eventBus.emit(
                SpineEventPayload(
                    type = rawType,
                    source = "nexus",
                    domain = domain,
                    data = data + ("priority" to resolvedPriority),
                    priority = resolvedPriority
                )
            )
        }
    }

    /**
     * sync_vitals
     * AI-accessible NSV patch — applies a NeuralStateVector patch to the global soul.
     * Validates patch structure and emits VITAL_UPDATED event.
     *
     * Payload: { patch: { [nsvPath]: value } }
     *
     * Example paths: "biological.cnsFatigue", "emotional.stressLoad"
     */
    private fun registerSyncVitals() {
        actionHub.register("nexus", "sync_vitals") { call ->
            val patchElement = call.payload["patch"]

            if (patchElement == null || patchElement !is JsonObject) {
                return@register
            }

            val patch = mutableMapOf<String, Any?>()
            patchElement.entries.forEach { (key, value) ->
                when (value) {
                    is JsonPrimitive -> {
                        patch[key] = value.doubleOrNull ?: value.booleanOrNull ?: value.content
                    }
                    else -> {
                        // Skip complex nested structures for safety
                    }
                }
            }

            if (patch.isEmpty()) {
                return@register
            }

            // Apply the patch to the NSV
            nsvService.updateNsv(patch)

            // Emit VITAL_UPDATED event
            eventBus.emit(
                SpineEventPayload(
                    type = "VITAL_UPDATED",
                    source = "nexus",
                    domain = "system",
                    data = mapOf("patch" to patch),
                    priority = "info"
                )
            )
        }
    }

    /**
     * update_global_identity
     * Updates core profile identity fields (name, pronouns, occupation, etc.).
     * Only a safe allow-listed subset of fields is accepted from AI payloads.
     *
     * Payload: { preferredName?, pronouns?, occupation?, age?, genderIdentity?, timezone?, locale? }
     */
    private fun registerUpdateGlobalIdentity() {
        actionHub.register("nexus", "update_global_identity") { call ->
            val userId = call.userId
            if (userId == null) {
                return@register
            }

            // Extract only allowed fields
            val safe = mutableMapOf<String, Any?>()
            allowedIdentityFields.forEach { field ->
                val value = call.payload[field]
                if (value != null) {
                    when (value) {
                        is JsonPrimitive -> {
                            if (field == "age") {
                                value.intOrNull?.let { safe[field] = it }
                            } else {
                                safe[field] = value.content
                            }
                        }
                        else -> {
                            // Skip non-primitive values for safety
                        }
                    }
                }
            }

            if (safe.isEmpty()) {
                return@register
            }

            // Emit event for profile service to handle the update
            eventBus.emit(
                SpineEventPayload(
                    type = "PROFILE_UPDATE_REQUESTED",
                    source = "nexus",
                    domain = "system",
                    data = safe + ("userId" to userId),
                    priority = "info"
                )
            )

            // Also persist directly if data layer is available
            persistProfileUpdate(userId, safe)
        }
    }

    /**
     * sync_personality_provision
     * Updates the agent personality provision (aliases, genders, persona overlays).
     *
     * Payload: { provision: { orchestratorAlias?, moduleAliases?, agentGenders?, personaOverlays? } }
     *         OR directly: { orchestratorAlias?, moduleAliases?, agentGenders?, personaOverlays? }
     */
    private fun registerSyncPersonalityProvision() {
        actionHub.register("nexus", "sync_personality_provision") { call ->
            val userId = call.userId
            if (userId == null) {
                return@register
            }

            // Handle both nested { provision: {...} } and flat payload
            val provisionObj = call.payload["provision"]?.jsonObject ?: call.payload

            val safe = mutableMapOf<String, Any?>()

            // orchestratorAlias: string
            provisionObj["orchestratorAlias"]?.jsonPrimitive?.contentOrNull?.let {
                safe["orchestratorAlias"] = it.trim()
            }

            // moduleAliases: Map<String, String>
            provisionObj["moduleAliases"]?.jsonObject?.let { obj ->
                val aliases = mutableMapOf<String, String>()
                obj.entries.forEach { (key, value) ->
                    value.jsonPrimitive.contentOrNull?.let { aliases[key] = it }
                }
                if (aliases.isNotEmpty()) {
                    safe["moduleAliases"] = aliases
                }
            }

            // agentGenders: Map<String, GenderPersonality>
            provisionObj["agentGenders"]?.jsonObject?.let { obj ->
                val genders = mutableMapOf<String, String>()
                obj.entries.forEach { (key, value) ->
                    // Accept either string value or nested object
                    when (value) {
                        is JsonPrimitive -> value.contentOrNull?.let { genders[key] = it }
                        is JsonObject -> value["value"]?.jsonPrimitive?.contentOrNull?.let { genders[key] = it }
                        else -> {}
                    }
                }
                if (genders.isNotEmpty()) {
                    safe["agentGenders"] = genders
                }
            }

            // personaOverlays: Map<String, PersonaOverlay>
            provisionObj["personaOverlays"]?.jsonObject?.let { obj ->
                val overlays = mutableMapOf<String, Map<String, String?>>()
                obj.entries.forEach { (key, value) ->
                    if (value is JsonObject) {
                        overlays[key] = mapOf(
                            "tone" to value["tone"]?.jsonPrimitive?.contentOrNull,
                            "style" to value["style"]?.jsonPrimitive?.contentOrNull
                        )
                    }
                }
                if (overlays.isNotEmpty()) {
                    safe["personaOverlays"] = overlays
                }
            }

            if (safe.isEmpty()) {
                return@register
            }

            // Emit event for profile service to handle the update
            eventBus.emit(
                SpineEventPayload(
                    type = "PERSONALITY_PROVISION_UPDATED",
                    source = "nexus",
                    domain = "system",
                    data = safe + ("userId" to userId),
                    priority = "info"
                )
            )

            // Also persist directly if data layer is available
            persistPersonalityProvision(userId, safe)
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // Helper Methods
    // ═══════════════════════════════════════════════════════════════════════════════

    private fun normalizeDomain(raw: String): String {
        return when (raw.uppercase()) {
            "B", "BIOLOGICAL" -> "B"
            "E", "EMOTIONAL" -> "E"
            "C", "COGNITIVE" -> "C"
            "R", "RESOURCE" -> "R"
            else -> "system"
        }
    }

    private suspend fun persistProfileUpdate(userId: String, fields: Map<String, Any?>) {
        val layer = dataLayer ?: return
        try {
            val existing = layer.getDocument("users", userId) { Json.parseToJsonElement(it).jsonObject }
            val base = existing?.toMap() ?: mapOf("userId" to userId)
            val merged = base + fields + mapOf("updatedAt" to Clock.System.now().toString())
            layer.setDocument("users", userId, merged)
        } catch (e: Exception) {
            // Silently fail - the event was emitted for other handlers
        }
    }

    private suspend fun persistPersonalityProvision(userId: String, provision: Map<String, Any?>) {
        val layer = dataLayer ?: return
        try {
            val existing = layer.getDocument("users", userId) { Json.parseToJsonElement(it).jsonObject }
            val base = existing?.toMap() ?: mapOf<String, Any?>("userId" to userId)
            
            // Merge with existing agentPersonalityProvision
            @Suppress("UNCHECKED_CAST")
            val existingProvision = (base["agentPersonalityProvision"] as? Map<String, Any?>) ?: emptyMap()
            val mergedProvision = existingProvision + provision
            
            val merged = base + mapOf(
                "agentPersonalityProvision" to mergedProvision,
                "updatedAt" to Clock.System.now().toString()
            )
            layer.setDocument("users", userId, merged)
        } catch (e: Exception) {
            // Silently fail - the event was emitted for other handlers
        }
    }
}

/**
 * Factory function to create and register orchestrator actions.
 * Call this during app initialization after the ActionHub is created.
 */
fun registerOrchestratorActions(
    actionHub: ActionHub,
    araHandoffService: AraHandoffService,
    routingService: AraRoutingService,
    nsvService: NeuralProjectionService,
    eventBus: SpineEventBus,
    dataLayer: AraDataLayer? = null
) {
    OrchestratorActions(
        actionHub = actionHub,
        araHandoffService = araHandoffService,
        routingService = routingService,
        nsvService = nsvService,
        eventBus = eventBus,
        dataLayer = dataLayer
    ).register()
}
