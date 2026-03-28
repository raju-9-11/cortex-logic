package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.models.ModuleSchemas

object SchemaInit {
    fun initializeSchemas() {
        SchemaRegistry.registerSchema(ModuleSchemas.THERAPY_CORE_SCHEMA)
        SchemaRegistry.registerSchema(ModuleSchemas.TRAINER_CORE_SCHEMA)
        SchemaRegistry.registerSchema(ModuleSchemas.LEDGER_CORE_SCHEMA)
        SchemaRegistry.registerSchema(ModuleSchemas.SOMA_CORE_SCHEMA)
        SchemaRegistry.registerSchema(ModuleSchemas.ATLAS_CORE_SCHEMA)

        // Alias registration for web-vs-app module IDs
        SchemaRegistry.registerSchema(ModuleSchemas.THERAPY_CORE_SCHEMA.copy(moduleId = "agnes"))
        SchemaRegistry.registerSchema(ModuleSchemas.TRAINER_CORE_SCHEMA.copy(moduleId = "titan"))

        SchemaRegistry.registerValidator("therapy", ModuleValidators.therapy)
        SchemaRegistry.registerValidator("trainer", ModuleValidators.trainer)
        SchemaRegistry.registerValidator("ledger", ModuleValidators.ledger)
        SchemaRegistry.registerValidator("soma", ModuleValidators.soma)
        SchemaRegistry.registerValidator("atlas", ModuleValidators.atlas)

        SchemaRegistry.registerValidator("agnes", ModuleValidators.therapy)
        SchemaRegistry.registerValidator("titan", ModuleValidators.trainer)

        SchemaRegistry.registerMigrations("therapy", SchemaMigrations.therapy)
        SchemaRegistry.registerMigrations("trainer", SchemaMigrations.trainer)
        SchemaRegistry.registerMigrations("ledger", SchemaMigrations.ledger)
        SchemaRegistry.registerMigrations("soma", SchemaMigrations.soma)
        SchemaRegistry.registerMigrations("atlas", SchemaMigrations.atlas)

        SchemaRegistry.registerMigrations("agnes", SchemaMigrations.therapy)
        SchemaRegistry.registerMigrations("titan", SchemaMigrations.trainer)
    }
}
