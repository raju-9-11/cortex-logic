package com.agnes.nexus.core.domain.models

import kotlinx.serialization.Serializable

@Serializable
enum class ModuleTheme {
    INDIGO,
    ORANGE,
    CYAN,
    EMERALD,
    SKY,
    LIME,
    ROSE,
    FUCHSIA,
    SLATE,
    VIOLET
}

@Serializable
data class ModuleSecurityPolicy(
    val defaultLocked: Boolean,
    val mandatory: Boolean
)

@Serializable
enum class ModuleOnboardingMode { REQUIRED, OPTIONAL, HYBRID }

@Serializable
data class ModuleFastTrackPolicy(
    val enabled: Boolean,
    val confidenceThreshold: Double
)

@Serializable
data class ModuleOnboardingPolicy(
    val mode: ModuleOnboardingMode,
    val fastTrack: ModuleFastTrackPolicy
)

@Serializable
data class ModuleManifestEntry(
    val id: String,
    val route: String,
    val title: String,
    val alias: String,
    val description: String,
    val colorHex: String,
    val theme: ModuleTheme,
    val chatTheme: ModuleTheme? = null,
    val isCore: Boolean,
    val hasPage: Boolean,
    val securityPolicy: ModuleSecurityPolicy,
    val onboarding: ModuleOnboardingPolicy
)

object ModuleManifest {
    private val hubOrder = listOf("agnes", "titan", "soma", "ledger", "atlas", "scout", "forge")
    val entries: List<ModuleManifestEntry> = listOf(
        ModuleManifestEntry(
            id = "orchestrator",
            route = "orchestrator",
            title = "Nexus",
            alias = "Nexus",
            description = "System Orchestrator",
            colorHex = "#8B5CF6",
            theme = ModuleTheme.CYAN,
            chatTheme = ModuleTheme.CYAN,
            isCore = true,
            hasPage = true,
            securityPolicy = ModuleSecurityPolicy(defaultLocked = false, mandatory = false),
            onboarding = ModuleOnboardingPolicy(ModuleOnboardingMode.REQUIRED, ModuleFastTrackPolicy(false, 0.75))
        ),
        ModuleManifestEntry(
            id = "agnes",
            route = "agnes",
            title = "Agnes",
            alias = "Agnes",
            description = "Emotional Domain",
            colorHex = "#6366F1",
            theme = ModuleTheme.INDIGO,
            chatTheme = ModuleTheme.INDIGO,
            isCore = true,
            hasPage = true,
            securityPolicy = ModuleSecurityPolicy(defaultLocked = true, mandatory = true),
            onboarding = ModuleOnboardingPolicy(ModuleOnboardingMode.REQUIRED, ModuleFastTrackPolicy(true, 0.75))
        ),
        ModuleManifestEntry(
            id = "titan",
            route = "titan",
            title = "Titan",
            alias = "Titan",
            description = "Fitness coaching, biomarker tracking, and recovery management",
            colorHex = "#F59E0B",
            theme = ModuleTheme.ORANGE,
            chatTheme = ModuleTheme.ORANGE,
            isCore = true,
            hasPage = true,
            securityPolicy = ModuleSecurityPolicy(defaultLocked = false, mandatory = false),
            onboarding = ModuleOnboardingPolicy(ModuleOnboardingMode.HYBRID, ModuleFastTrackPolicy(true, 0.78))
        ),
        ModuleManifestEntry(
            id = "soma",
            route = "soma",
            title = "Soma",
            alias = "Soma",
            description = "Biomarker tracking and medical clearance domain",
            colorHex = "#10B981",
            theme = ModuleTheme.EMERALD,
            chatTheme = ModuleTheme.EMERALD,
            isCore = false,
            hasPage = true,
            securityPolicy = ModuleSecurityPolicy(defaultLocked = true, mandatory = false),
            onboarding = ModuleOnboardingPolicy(ModuleOnboardingMode.OPTIONAL, ModuleFastTrackPolicy(false, 0.75))
        ),
        ModuleManifestEntry(
            id = "ledger",
            route = "ledger",
            title = "Ledger",
            alias = "Ledger",
            description = "Financial Planning Domain",
            colorHex = "#06B6D4",
            theme = ModuleTheme.CYAN,
            chatTheme = ModuleTheme.CYAN,
            isCore = true,
            hasPage = true,
            securityPolicy = ModuleSecurityPolicy(defaultLocked = true, mandatory = false),
            onboarding = ModuleOnboardingPolicy(ModuleOnboardingMode.REQUIRED, ModuleFastTrackPolicy(true, 0.75))
        ),
        ModuleManifestEntry(
            id = "atlas",
            route = "atlas",
            title = "Atlas",
            alias = "Atlas",
            description = "Cognitive Domain",
            colorHex = "#0EA5E9",
            theme = ModuleTheme.SKY,
            chatTheme = ModuleTheme.SKY,
            isCore = true,
            hasPage = true,
            securityPolicy = ModuleSecurityPolicy(defaultLocked = true, mandatory = false),
            onboarding = ModuleOnboardingPolicy(ModuleOnboardingMode.OPTIONAL, ModuleFastTrackPolicy(true, 0.72))
        ),
        ModuleManifestEntry(
            id = "scout",
            route = "scout",
            title = "Scout",
            alias = "Scout",
            description = "Research Extension",
            colorHex = "#84CC16",
            theme = ModuleTheme.LIME,
            chatTheme = ModuleTheme.LIME,
            isCore = false,
            hasPage = true,
            securityPolicy = ModuleSecurityPolicy(defaultLocked = true, mandatory = false),
            onboarding = ModuleOnboardingPolicy(ModuleOnboardingMode.OPTIONAL, ModuleFastTrackPolicy(false, 0.72))
        ),
        ModuleManifestEntry(
            id = "forge",
            route = "forge",
            title = "Forge",
            alias = "Forge",
            description = "Technical Extension",
            colorHex = "#F43F5E",
            theme = ModuleTheme.ROSE,
            chatTheme = null,
            isCore = false,
            hasPage = true,
            securityPolicy = ModuleSecurityPolicy(defaultLocked = false, mandatory = false),
            onboarding = ModuleOnboardingPolicy(ModuleOnboardingMode.OPTIONAL, ModuleFastTrackPolicy(false, 0.72))
        ),
        ModuleManifestEntry(
            id = "bridge",
            route = "",
            title = "Bridge",
            alias = "Bridge",
            description = "Alert Daemon",
            colorHex = "#64748B",
            theme = ModuleTheme.SLATE,
            chatTheme = null,
            isCore = false,
            hasPage = false,
            securityPolicy = ModuleSecurityPolicy(defaultLocked = false, mandatory = false),
            onboarding = ModuleOnboardingPolicy(ModuleOnboardingMode.OPTIONAL, ModuleFastTrackPolicy(false, 0.75))
        )
    )

    private val byId = entries.associateBy { it.id }

    fun byId(id: String): ModuleManifestEntry? {
        val normalized = ModuleIds.normalize(id) ?: return null
        return if (normalized == ModuleIds.NEXUS) {
            byId[ModuleIds.NEXUS] ?: byId[ModuleIds.ORCHESTRATOR_LEGACY]
        } else {
            byId[normalized]
        }
    }

    fun hubModules(): List<ModuleManifestEntry> {
        return hubOrder.mapNotNull { byId[it] }
    }

    fun requiresVault(id: String): Boolean {
        val policy = byId(id)?.securityPolicy ?: return false
        return policy.mandatory || policy.defaultLocked
    }

    fun buildDefaultVaultLocks(): Map<String, Boolean> {
        return entries.filter { it.hasPage && it.id != "bridge" }
            .associate { it.id to (it.securityPolicy.mandatory || it.securityPolicy.defaultLocked) }
    }
}
