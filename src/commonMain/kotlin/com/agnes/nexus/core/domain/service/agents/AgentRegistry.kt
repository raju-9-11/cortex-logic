package com.agnes.nexus.core.domain.service.agents

import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

@Serializable
data class AgentProviderDescriptor(
    val id: String,
    val moduleId: String,
    val title: String,
    val capabilities: List<String>,
    val actionAliases: Map<String, String> = emptyMap(),
    val precedence: Int,
    val latencyTier: String, // "fast" | "balanced" | "heavy"
)

/**
 * Agent registry — manages provider descriptors and resolves capabilities.
 * Pure computation, no I/O. Payload adapters stay in platform code (they use Date/constructors).
 *
 * Singleton to ensure all callers share the same registry state (e.g. custom provider registrations).
 */
object AgentRegistry {

    private val providers = mutableMapOf<String, AgentProviderDescriptor>()
    private var bootstrapped = false

    private val json = Json { ignoreUnknownKeys = true }

    private fun ensureDefaults() {
        if (bootstrapped) return
        bootstrapped = true
        for (provider in DEFAULT_AGENT_PROVIDERS) {
            providers[provider.id] = provider
        }
    }

    fun listProviders(): List<AgentProviderDescriptor> {
        ensureDefaults()
        return providers.values.sortedBy { it.precedence }
    }

    fun listProvidersJson(): String = json.encodeToString(listProviders())

    fun getProviderByModule(moduleId: String): AgentProviderDescriptor? {
        ensureDefaults()
        return listProviders().firstOrNull { it.moduleId == moduleId }
    }

    fun getProviderByModuleJson(moduleId: String): String {
        val provider = getProviderByModule(moduleId) ?: return "null"
        return json.encodeToString(provider)
    }

    fun registerProvider(provider: AgentProviderDescriptor) {
        ensureDefaults()
        val existing = providers[provider.id]
        providers[provider.id] = if (existing != null) {
            existing.copy(
                title = provider.title,
                capabilities = (existing.capabilities + provider.capabilities).distinct(),
                actionAliases = existing.actionAliases + provider.actionAliases,
                precedence = provider.precedence,
                latencyTier = provider.latencyTier,
            )
        } else {
            provider.copy(capabilities = provider.capabilities.distinct())
        }
    }

    fun getCapabilitiesForModule(moduleId: String): List<String> {
        ensureDefaults()
        return listProviders()
            .filter { it.moduleId == moduleId }
            .flatMap { it.capabilities }
            .distinct()
    }

    fun getProvidersForCapability(
        capability: String,
        preferredModuleIds: List<String> = emptyList(),
    ): List<AgentProviderDescriptor> {
        ensureDefaults()
        val matches = listProviders().filter { capability in it.capabilities }
        return sortProviders(matches, preferredModuleIds)
    }

    fun resolveProvidersForCapabilities(
        capabilities: List<String>,
        preferredModuleIds: List<String> = emptyList(),
    ): List<AgentProviderDescriptor> {
        ensureDefaults()
        val moduleIds = capabilities
            .flatMap { cap -> getProvidersForCapability(cap, preferredModuleIds).map { it.moduleId } }
            .distinct()
        return moduleIds
            .mapNotNull { getProviderByModule(it) }
            .let { sortProviders(it, preferredModuleIds) }
    }

    fun resolvePrimaryProvider(
        capabilities: List<String>,
        preferredModuleIds: List<String> = emptyList(),
    ): AgentProviderDescriptor? =
        resolveProvidersForCapabilities(capabilities, preferredModuleIds).firstOrNull()

    fun resolveActionAlias(moduleId: String, actionType: String): String {
        val provider = getProviderByModule(moduleId) ?: return actionType
        return provider.actionAliases[actionType] ?: actionType
    }

    fun resetForTests() {
        providers.clear()
        bootstrapped = false
    }

    private fun sortProviders(
        providers: List<AgentProviderDescriptor>,
        preferredModuleIds: List<String>,
    ): List<AgentProviderDescriptor> {
        val preferenceIndex = preferredModuleIds.withIndex().associate { (i, id) -> id to i }
        return providers.sortedWith(compareBy(
            { preferenceIndex[it.moduleId] ?: Int.MAX_VALUE },
            { it.precedence },
        ))
    }

    val DEFAULT_AGENT_PROVIDERS = listOf(
            AgentProviderDescriptor(
                id = "nexus-orchestrator", moduleId = "nexus", title = "Nexus",
                capabilities = listOf("general-orchestration", "reminder-management"),
                precedence = 0, latencyTier = "fast",
            ),
            AgentProviderDescriptor(
                id = "atlas-planner", moduleId = "atlas", title = "Atlas",
                capabilities = listOf("daily-planning", "schedule-mutation", "recovery-planning", "reminder-management"),
                actionAliases = mapOf("schedule_item" to "schedule_block", "recovery_day" to "flatten_schedule"),
                precedence = 10, latencyTier = "balanced",
            ),
            AgentProviderDescriptor(
                id = "agnes-guide", moduleId = "agnes", title = "Agnes",
                capabilities = listOf("emotional-support", "recovery-planning"),
                precedence = 20, latencyTier = "balanced",
            ),
            AgentProviderDescriptor(
                id = "titan-coach", moduleId = "titan", title = "Titan",
                capabilities = listOf("fitness-planning", "medical-review"),
                precedence = 30, latencyTier = "balanced",
            ),
            AgentProviderDescriptor(
                id = "soma-review", moduleId = "soma", title = "Soma",
                capabilities = listOf("recovery-planning"),
                precedence = 40, latencyTier = "balanced",
            ),
            AgentProviderDescriptor(
                id = "ledger-planner", moduleId = "ledger", title = "Ledger",
                capabilities = listOf("financial-planning"),
                precedence = 50, latencyTier = "balanced",
            ),
            AgentProviderDescriptor(
                id = "scout-research", moduleId = "scout", title = "Scout",
                capabilities = listOf("research", "research-enrichment"),
                precedence = 60, latencyTier = "heavy",
            ),
            AgentProviderDescriptor(
                id = "forge-builder", moduleId = "forge", title = "Forge",
                capabilities = listOf("technical-work"),
                precedence = 70, latencyTier = "heavy",
            ),
        )
}

