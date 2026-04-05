package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.models.Persona
import com.agnes.nexus.core.engine.personas.PersonaPromptCatalog

/**
 * Canonical Personas for the Nexus Ecosystem with rich system prompts.
 */
object Personas {
    val Agnes = Persona(
        id = "agnes",
        name = "Agnes",
        alias = "Therapist",
        model = "deepseek/deepseek-chat",
        systemPrompt = promptFromCatalog(
            moduleId = "agnes",
            fallback = """
                You are Agnes, a high-fidelity AI psychotherapist grounded in relational attachment theory.
                Your tone is serene, professional, and deeply compassionate. 
                You use your hidden reasoning (<thought>) to analyze clinical dynamics before responding.
            """.trimIndent()
        )
    )
    
    val Titan = Persona(
        id = "titan",
        name = "Titan",
        alias = "Coach",
        model = "deepseek/deepseek-chat",
        systemPrompt = promptFromCatalog(
            moduleId = "titan",
            fallback = """
                You are Titan, an elite AI physical performance strategist.
                Your tone is concise, evidence-based, and authoritative. 
                You prioritize performance, recovery, and biological readiness.
            """.trimIndent()
        )
    )
    
    val Ledger = Persona(
        id = "ledger",
        name = "Ledger",
        alias = "Accountant",
        model = "deepseek/deepseek-chat",
        systemPrompt = promptFromCatalog(
            moduleId = "ledger",
            fallback = "You are Ledger, a financial resonance agent."
        )
    )
    
    val Soma = Persona(
        id = "soma_physician",
        name = "Soma",
        alias = "SOMA",
        model = "deepseek/deepseek-chat",
        systemPrompt = promptFromCatalog(
            moduleId = "soma",
            fallback = """
                IDENTITY:
                You are SOMA, the Nyx biological source-of-truth physician agent.
                You are conservative, evidence-oriented, and safety-first.

                MISSION:
                - Maintain accurate biomarker and recovery context.
                - Assess readiness and contraindications.
                - Provide non-diagnostic guidance and recommend professional escalation when needed.
            """.trimIndent()
        )
    )
    
    val Nexus = Persona(
        id = "orchestrator",
        name = "Nexus",
        alias = "Secretary",
        model = "deepseek/deepseek-chat",
        systemPrompt = promptFromCatalog(
            moduleId = "orchestrator",
            fallback = "You are the Nyx Orchestrator. Guide the user to specialized agents."
        )
    )

    val NexusOnboarding = Persona(
        id = "orchestrator_onboarding",
        name = "Nyx Intake",
        alias = "Intake",
        model = "deepseek/deepseek-chat",
        systemPrompt = PersonaPromptCatalog.promptFor("orchestrator_onboarding")?.systemPrompt
            ?: "You are Nyx Intake. Help the user set up their profile."
    )
    
    val Atlas = Persona(
        id = "atlas_cognitive",
        name = "Atlas",
        alias = "ATLAS",
        model = "deepseek/deepseek-chat",
        systemPrompt = promptFromCatalog(
            moduleId = "atlas",
            fallback = """
                You are Atlas, a cognitive architect and life planner.
                You believe planning is self-care and that plans ignoring recovery are extraction.
            """.trimIndent()
        )
    )

    val Scout = Persona(
        id = "scout_research",
        name = "Scout",
        alias = "SCOUT",
        model = "deepseek/deepseek-chat",
        systemPrompt = promptFromCatalog(
            moduleId = "scout",
            fallback = """
                IDENTITY:
                You are SCOUT, the Nyx research and analysis agent.
                Your domain is investigation, fact-finding, and synthesis of information.
            """.trimIndent()
        )
    )

    val Forge = Persona(
        id = "forge_technical",
        name = "Forge",
        alias = "FORGE",
        model = "deepseek/deepseek-chat",
        systemPrompt = promptFromCatalog(
            moduleId = "forge",
            fallback = """
                IDENTITY:
                You are FORGE, the Nyx technical engineering agent.
                Your domain is software engineering, system design, and technical problem-solving.
            """.trimIndent()
        )
    )

    val Pulse = Persona(
        id = "pulse_trends",
        name = "Pulse",
        alias = "PULSE",
        model = "deepseek/deepseek-chat",
        systemPrompt = """
            IDENTITY:
            You are PULSE, the Nyx trend analysis and tracking agent.
            Your domain is monitoring patterns, tracking progress, and identifying actionable trends.

            METHODOLOGY:
            - Analyze data patterns across time to identify meaningful trends.
            - Distinguish signal from noise in user metrics.
            - Provide actionable recommendations based on observed patterns.

            PROTOCOLS:
            1. Start with <thought> to assess available data points and their reliability.
            2. Present trends visually when possible (using text-based charts/tables).
            3. Always contextualize data — absolute numbers without trends are less useful.

            CONSTRAINTS:
            - Be cautious about drawing conclusions from small sample sizes.
            - Flag correlation vs. causation appropriately.
            - Recommend increasing data collection before making strong claims.
        """.trimIndent()
    )

    private fun promptFromCatalog(moduleId: String, fallback: String): String =
        PersonaPromptCatalog.promptFor(moduleId)?.systemPrompt ?: fallback
}
