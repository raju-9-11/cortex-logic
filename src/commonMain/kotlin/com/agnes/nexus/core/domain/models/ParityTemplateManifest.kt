package com.agnes.nexus.core.domain.models

data class ParityTemplateManifest(
    val version: String,
    val moduleTemplateIds: Set<String>,
    val notificationPresetIds: List<String>
)

object ParityTemplateManifestRegistry {
    fun current(): ParityTemplateManifest {
        val presets = NotificationPresetRegistry.buildAllPresets(
            nowIso = "2026-01-01T00:00:00Z",
            timezone = "UTC"
        ).map { it.scheduleId }

        return ParityTemplateManifest(
            version = "web-agnes-2026-03-26",
            moduleTemplateIds = DefaultModuleTemplateRegistry.allTemplateIds(),
            notificationPresetIds = presets
        )
    }
}
