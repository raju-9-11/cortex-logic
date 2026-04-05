package com.agnes.nexus.core.engine

import com.agnes.nexus.core.engine.personas.PersonaPromptCatalog
import com.agnes.nexus.core.engine.personas.orchestrator.OrchestratorPersonaPrompts

/**
 * JS-export facade for PersonaPromptCatalog.
 *
 * Exposes a simple lookup so TS can retrieve the KMP-owned persona prompt
 * for a module without maintaining a duplicate static registry.
 */
@JsExport
class PersonaPromptCatalogJs {
    /**
     * Returns the base system prompt for the given module, or null if no
     * persona is registered for that module ID.
     */
    fun promptFor(moduleId: String): String? =
        PersonaPromptCatalog.promptFor(moduleId)?.systemPrompt

    /**
     * Returns the returning-user welcome message for the orchestrator.
     */
    fun orchestratorWelcome(name: String): String =
        OrchestratorPersonaPrompts.buildWelcomeMessage(name)
}
