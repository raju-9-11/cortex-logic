package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.service.agents.ActionCapabilityResolver
import com.agnes.ara.core.domain.service.agents.AgentProviderDescriptor
import com.agnes.ara.core.domain.service.agents.AgentRegistry
import kotlinx.serialization.json.Json
import kotlin.js.JsExport

@JsExport
class ActionCapabilityResolverJs {
    fun resolve(actionType: String): Array<String> =
        ActionCapabilityResolver.resolve(actionType).toTypedArray()
}

@JsExport
class AgentRegistryJs {
    private val registry = AgentRegistry
    private val json = Json { ignoreUnknownKeys = true }

    fun listProviders(): String = registry.listProvidersJson()
    fun getProviderByModule(moduleId: String): String = registry.getProviderByModuleJson(moduleId)

    fun registerProvider(providerJson: String) {
        val provider = json.decodeFromString<AgentProviderDescriptor>(providerJson)
        registry.registerProvider(provider)
    }

    fun getCapabilitiesForModule(moduleId: String): Array<String> =
        registry.getCapabilitiesForModule(moduleId).toTypedArray()

    fun getProvidersForCapability(capability: String, preferredModuleIdsJson: String?): String {
        val preferred = preferredModuleIdsJson?.let { json.decodeFromString<List<String>>(it) } ?: emptyList()
        return json.encodeToString(
            kotlinx.serialization.builtins.ListSerializer(AgentProviderDescriptor.serializer()),
            registry.getProvidersForCapability(capability, preferred),
        )
    }

    fun resolveProvidersForCapabilities(capabilitiesJson: String, preferredModuleIdsJson: String?): String {
        val capabilities = json.decodeFromString<List<String>>(capabilitiesJson)
        val preferred = preferredModuleIdsJson?.let { json.decodeFromString<List<String>>(it) } ?: emptyList()
        return json.encodeToString(
            kotlinx.serialization.builtins.ListSerializer(AgentProviderDescriptor.serializer()),
            registry.resolveProvidersForCapabilities(capabilities, preferred),
        )
    }

    fun resolvePrimaryProvider(capabilitiesJson: String, preferredModuleIdsJson: String?): String {
        val capabilities = json.decodeFromString<List<String>>(capabilitiesJson)
        val preferred = preferredModuleIdsJson?.let { json.decodeFromString<List<String>>(it) } ?: emptyList()
        val provider = registry.resolvePrimaryProvider(capabilities, preferred) ?: return "null"
        return json.encodeToString(AgentProviderDescriptor.serializer(), provider)
    }

    fun resolveActionAlias(moduleId: String, actionType: String): String =
        registry.resolveActionAlias(moduleId, actionType)
}
