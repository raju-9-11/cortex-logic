package com.agnes.nexus.core.domain.models

/**
 * Module Templates - defines the core fields for each module.
 */
object DefaultModuleTemplateRegistry {
    private val templates = mapOf(
        "agnes" to ModuleTemplate(fields = ModuleSchemas.THERAPY_CORE_SCHEMA.coreSchema.coreFields),
        "titan" to ModuleTemplate(fields = ModuleSchemas.TRAINER_CORE_SCHEMA.coreSchema.coreFields),
        "ledger" to ModuleTemplate(fields = ModuleSchemas.LEDGER_CORE_SCHEMA.coreSchema.coreFields),
        "atlas" to ModuleTemplate(fields = ModuleSchemas.ATLAS_CORE_SCHEMA.coreSchema.coreFields),
        "soma" to ModuleTemplate(fields = ModuleSchemas.SOMA_CORE_SCHEMA.coreSchema.coreFields),
        // Legacy aliases (web schema module ids)
        "therapy" to ModuleTemplate(fields = ModuleSchemas.THERAPY_CORE_SCHEMA.coreSchema.coreFields),
        "trainer" to ModuleTemplate(fields = ModuleSchemas.TRAINER_CORE_SCHEMA.coreSchema.coreFields)
    )

    fun find(moduleId: String): ModuleTemplate? = templates[moduleId]
    fun allTemplateIds(): Set<String> = templates.keys
    fun all(): Map<String, ModuleTemplate> = templates.toMap()
}

data class ModuleTemplate(
    val fields: List<FieldDefinition>
)
