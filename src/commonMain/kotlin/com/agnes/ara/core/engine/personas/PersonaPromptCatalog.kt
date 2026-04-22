package com.agnes.ara.core.engine.personas

import com.agnes.ara.core.engine.personas.agnes.AgnesPersonaPrompts
import com.agnes.ara.core.engine.personas.atlas.AtlasPersonaPrompts
import com.agnes.ara.core.engine.personas.forge.ForgePersonaPrompts
import com.agnes.ara.core.engine.personas.ledger.LedgerPersonaPrompts
import com.agnes.ara.core.engine.personas.orchestrator.OrchestratorPersonaPrompts
import com.agnes.ara.core.engine.personas.titan.TitanPersonaPrompts
import com.agnes.ara.core.engine.personas.notifications.NotificationsPersonaPrompts
import com.agnes.ara.core.engine.personas.scout.ScoutPersonaPrompts
import com.agnes.ara.core.engine.personas.soma.SomaPersonaPrompts

/**
 * Central registry for persona prompts shared across modules.
 * Keys mirror module IDs used by PersonaFactory assemble().
 */
object PersonaPromptCatalog {
    private val promptsByModule: Map<String, PersonaPrompt> = mapOf(
        "agnes" to AgnesPersonaPrompts.base,
        "agnes_onboarding" to AgnesPersonaPrompts.onboarding,
        "titan" to TitanPersonaPrompts.base,
        "ledger" to LedgerPersonaPrompts.base,
        "atlas" to AtlasPersonaPrompts.base,
        "soma" to SomaPersonaPrompts.base,
        "forge" to ForgePersonaPrompts.base,
        "scout" to ScoutPersonaPrompts.base,
        "scout_master" to ScoutPersonaPrompts.masterChat,
        "notifications" to NotificationsPersonaPrompts.base,
        "orchestrator" to OrchestratorPersonaPrompts.base,
        "orchestrator_onboarding" to OrchestratorPersonaPrompts.onboarding
    )

    fun promptFor(moduleId: String): PersonaPrompt? = promptsByModule[moduleId]
}
