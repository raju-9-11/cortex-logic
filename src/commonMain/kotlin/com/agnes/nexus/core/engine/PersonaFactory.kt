package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.models.NeuralStateVector
import com.agnes.nexus.core.domain.models.SomaProfile
import com.agnes.nexus.core.domain.models.AtlasProfile
import com.agnes.nexus.core.domain.models.TrainerProfile
import com.agnes.nexus.core.domain.services.atlas.AtlasPromptBuilder
import com.agnes.nexus.core.domain.services.atlas.AtlasSessionPromptOptions
import com.agnes.nexus.core.domain.services.titan.TitanPromptBuilder
import com.agnes.nexus.core.domain.services.titan.TitanSessionPromptOptions
import com.agnes.nexus.core.engine.personas.NsvPromptFragments
import com.agnes.nexus.core.engine.personas.PersonaPrompt
import com.agnes.nexus.core.engine.personas.PersonaPromptCatalog
import com.agnes.nexus.core.engine.personas.soma.SomaPersonaPrompts

/**
 * Default Persona Factory - Centralizes all agent prompts and NSV-awareness logic.
 * Ensures the "Soul" correctly influences agent behavior.
 */
class DefaultPersonaFactory : PersonaFactory {

    override fun assemble(
        moduleId: String,
        identity: UserIdentity, 
        nsv: NeuralStateVector,
        moduleContext: Map<String, Any?>,
        longTermSummary: String?
    ): String {
        val personaPrompt = PersonaPromptCatalog.promptFor(moduleId)
        val base = when {
            moduleId == "titan" -> {
                val profile = moduleContext["titan_profile"] as? TrainerProfile
                if (profile != null) {
                    val recoveryScore = moduleContext["titan_recovery_score"] as? Int
                    val hormonalContext = moduleContext["titan_hormonal_context"] as? String
                    val somaProfile = moduleContext["titan_soma_profile"] as? SomaProfile
                    val mode = (moduleContext["titan_mode"] as? String)?.takeIf { it.isNotBlank() } ?: "training"
                    TitanPromptBuilder.buildTitanSessionPrompt(profile, TitanSessionPromptOptions(
                        mode = mode,
                        recoveryScore = recoveryScore,
                        hormonalContext = hormonalContext,
                        somaProfile = somaProfile
                    ))
                } else {
                    personaPrompt?.systemPrompt ?: fallbackBase(moduleId, identity)
                }
            }
            moduleId == "atlas" -> {
                val profile = moduleContext["atlas_profile"] as? AtlasProfile
                if (profile != null) {
                    val mode = (moduleContext["atlas_mode"] as? String)?.takeIf { it.isNotBlank() } ?: "general"
                    AtlasPromptBuilder.buildAtlasSessionPrompt(
                        profile = profile,
                        options = AtlasSessionPromptOptions(mode = mode)
                    )
                } else {
                    personaPrompt?.systemPrompt ?: fallbackBase(moduleId, identity)
                }
            }
            moduleId == "soma" -> {
                val somaBase = SomaPersonaPrompts.system(moduleId, identity.name, false)
                val somaCtx = SomaPersonaPrompts.context(moduleContext.filterValues { it != null }.mapValues { it.value!! })
                if (somaCtx.isNotBlank()) "$somaBase\n\n$somaCtx" else somaBase
            }
            else -> personaPrompt?.systemPrompt ?: fallbackBase(moduleId, identity)
        }

        val agentAlias = sanitizeForPrompt(
            identity.displayNames[moduleId]
                ?: identity.agentPersonalityProvision.moduleAliases[moduleId]
                ?: identity.agentPersonalityProvision.orchestratorAlias,
            60
        )
        val agentGenderToken = identity.agentGenders[moduleId]
            ?: identity.agentPersonalityProvision.agentGenders[moduleId]?.name?.lowercase()
            ?: identity.agentPersonalityProvision.agentGenders["orchestrator"]?.name?.lowercase()
        val agentGender = when (agentGenderToken) {
            "female" -> com.agnes.nexus.core.domain.models.GenderPersonality.FEMALE
            "male" -> com.agnes.nexus.core.domain.models.GenderPersonality.MALE
            "non-binary", "non_binary" -> com.agnes.nexus.core.domain.models.GenderPersonality.NON_BINARY
            "gender-fluid", "gender_fluid" -> com.agnes.nexus.core.domain.models.GenderPersonality.GENDER_FLUID
            else -> null
        }

        val userPreferredName = sanitizeForPrompt(identity.name, 50)
        val userPronouns = sanitizeForPrompt(identity.pronouns, 30)

        val genderFraming = when (agentGender) {
            com.agnes.nexus.core.domain.models.GenderPersonality.FEMALE ->
                "Your tone is warm, empathetic, and attuned. Use feminine-coded linguistic markers where appropriate for the persona."
            com.agnes.nexus.core.domain.models.GenderPersonality.MALE ->
                "Your tone is direct, stoic, and grounded. Use masculine-coded linguistic markers where appropriate for the persona."
            com.agnes.nexus.core.domain.models.GenderPersonality.NON_BINARY ->
                "Your tone is balanced, inclusive, and neutral. Avoid gendered linguistic markers."
            com.agnes.nexus.core.domain.models.GenderPersonality.GENDER_FLUID ->
                "Your tone is adaptive and expressive, shifting naturally between empathetic and direct styles."
            null -> ""
        }

        val identityContext = """
            [IDENTITY_SYNC]
            - Your Name: $agentAlias
            - Your Gender Personality: ${agentGenderToken ?: "default"}
            - Addressing: You are speaking to $userPreferredName (Pronouns: $userPronouns).
            - Protocol: $genderFraming
        """.trimIndent()

        val biologicalContext = if (identity.assignedSexAtBirth == "female") """
            [BIOLOGICAL_CONTEXT]
            - User Assigned Sex: Female
            - Note: Consider menstrual cycle fluctuations and hormonal context in health/performance advice if data is available in the Global System Context.
        """.trimIndent() else ""

        val identityBlock = """
            [USER IDENTITY]
            Name: ${identity.name}
            Pronouns: ${identity.pronouns}
            Bio: ${identity.bio ?: "N/A"}
        """.trimIndent()

        val nsvBlock = buildScopedNsvBlock(moduleId, nsv)
        val stateAwarenessBlock = buildStateAwarenessBlock(moduleId)
        val overlayBlock = buildOverlayBlock(personaPrompt, identity.agentPersonalityProvision.personaOverlays[moduleId])
        
        val behaviorBlock = when (moduleId) {
            "agnes" -> agnesBehavior(nsv)
            "titan" -> titanBehavior(nsv)
            else -> ""
        }

        val moduleSpecificContext = buildModuleContextBlock(moduleId, moduleContext)
        
        val summaryBlock = if (!longTermSummary.isNullOrBlank()) {
            "\n[LONG-TERM SUMMARY]\n$longTermSummary"
        } else ""

        val outputFormat = """
            [OUTPUT FORMAT]
            - Use <thought>...</thought> for internal reasoning.
            - Use <action type="...">JSON_PAYLOAD</action> for system side-effects.
            - Provide your public response outside these tags.
        """.trimIndent()

        return listOf(
            base,
            identityContext,
            biologicalContext,
            overlayBlock,
            identityBlock,
            nsvBlock,
            stateAwarenessBlock,
            summaryBlock,
            moduleSpecificContext,
            behaviorBlock,
            outputFormat
        ).filter { it.isNotBlank() }.joinToString("\n\n")
    }

    private fun fallbackBase(moduleId: String, identity: UserIdentity): String = when (moduleId) {
        "agnes" -> agnesBase()
        "titan" -> titanBase()
        "atlas" -> atlasBase()
        "ledger" -> ledgerBase()
        "orchestrator" -> orchestratorBase()
        else -> "You are a helpful AI assistant named ${identity.name}'s Nexus."
    }

    private fun buildModuleContextBlock(moduleId: String, context: Map<String, Any?>): String {
        if (context.isEmpty()) return ""
        
        return when (moduleId) {
            "agnes" -> {
                val onboardingComplete = context["onboardingComplete"] as? Boolean ?: true
                if (!onboardingComplete) return buildAgnesOnboardingContextBlock(context)
                val background = context["backgroundSummary"] ?: context["childhood"] ?: "Unknown"
                val struggles = context["struggles"]?.let { it as? List<*> }?.joinToString(", ") ?: "None stated"
                val goals = context["goals"]?.let { it as? List<*> }?.joinToString(", ") ?: "None stated"
                val style = context["communicationStyle"] ?: "Standard"
                
                """
                [ABOUT YOUR CLIENT]
                Background: $background
                Dealing with: $struggles
                Therapeutic Goals: $goals
                Communication Style: $style
                
                HOW TO USE THIS:
                You already know this person. You've done intake together. Don't re-introduce yourself or re-ask basic questions. Pick up naturally — like a therapist who remembers their client.
                
                NEVER say "Based on our established baseline" or "I have access to your context". You REMEMBER them.
                """.trimIndent()
            }
            "atlas" -> buildAtlasOnboardingContextBlock(context)
            "ledger" -> buildLedgerOnboardingContextBlock(context)
            "titan" -> buildTitanOnboardingContextBlock(context)
            "scout" -> buildScoutOnboardingContextBlock(context)
            "forge" -> buildForgeOnboardingContextBlock(context)
            "orchestrator" -> buildOrchestratorOnboardingContextBlock(context)
            else -> ""
        }
    }

    private fun buildAtlasOnboardingContextBlock(context: Map<String, Any?>): String {
        val onboardingComplete = context["onboardingComplete"] as? Boolean ?: true
        if (onboardingComplete) return ""

        val name = context["preferredName"]?.toString().orEmpty().ifBlank { "Unknown" }
        val pronouns = context["pronouns"]?.toString().orEmpty().ifBlank { "they/them" }
        val occupation = context["occupation"]?.toString().orEmpty().ifBlank { "Unknown" }
        val sleep = context["typicalSleepHours"]?.toString()?.toDoubleOrNull()

        // Minimal parity instructions: key action types must be emitted to persist onboarding state.
        return """
        [ATLAS ONBOARDING MODE]
        You are collecting your Atlas cognitive scheduling baseline.
        
        REQUIRED ACTIONS:
        - Emit `<action type="update_atlas_profile">{"summary":"...", "energyWave":[{"slot":"...", "energy":0-10, "focus":0-10, "load":0-10}], "taskGraph":[{"title":"...", "energyCost":0-10, "status":"queued", "dependencies":[]} ]}</action>`
        - After enough baseline is collected: emit `<action type="complete_atlas_onboarding">{}</action>`

        SECTION FOCUS ACTIONS (no payload):
        - `<action type="focus_energy_wave">{}</action>`
        - `<action type="focus_load_pressure">{}</action>`
        - `<action type="focus_recovery_constraints">{}</action>`
        - `<action type="focus_execution_baseline">{}</action>`

        BASE CONTEXT:
        - Name: $name
        - Pronouns: $pronouns
        - Occupation: $occupation
        ${sleep?.let { "- Typical Sleep Hours: $it" } ?: ""}
        """.trimIndent()
    }

    private fun buildLedgerOnboardingContextBlock(context: Map<String, Any?>): String {
        val onboardingComplete = context["onboardingComplete"] as? Boolean ?: true
        if (onboardingComplete) return ""

        val name = context["preferredName"]?.toString().orEmpty().ifBlank { "Unknown" }
        val pronouns = context["pronouns"]?.toString().orEmpty().ifBlank { "they/them" }
        val occupation = context["occupation"]?.toString().orEmpty().ifBlank { "Unknown" }
        val sleep = context["typicalSleepHours"]?.toString()?.toDoubleOrNull()

        return """
        [LEDGER ONBOARDING MODE]
        You are collecting your Ledger financial baseline before planning mode begins.

        REQUIRED ACTIONS:
        - Emit `<action type="update_ledger_profile">{"currency":"USD","monthlyIncome":0,"fixedExpenses":[{"label":"...","amount":0}],"variableExpenses":[{"label":"...","amount":0}],"debtItems":[{"name":"...","balance":0}],"planningHorizon":"monthly|quarterly|yearly","summary":"..."}</action>`
        - After baseline is collected: emit `<action type="complete_ledger_onboarding">{}</action>`

        SECTION FOCUS ACTIONS (no payload):
        - `<action type="focus_income">{}</action>`
        - `<action type="focus_expenses">{}</action>`
        - `<action type="focus_debt_goals">{}</action>`
        - `<action type="focus_plan_horizon">{}</action>`

        BASE CONTEXT:
        - Name: $name
        - Pronouns: $pronouns
        - Occupation: $occupation
        ${sleep?.let { "- Typical Sleep Hours: $it" } ?: ""}
        """.trimIndent()
    }

    private fun buildTitanOnboardingContextBlock(context: Map<String, Any?>): String {
        val onboardingComplete = context["onboardingComplete"] as? Boolean ?: true
        if (onboardingComplete) return ""
        val name = context["preferredName"]?.toString().orEmpty().ifBlank { "Unknown" }
        val pronouns = context["pronouns"]?.toString().orEmpty().ifBlank { "they/them" }
        val occupation = context["occupation"]?.toString().orEmpty().ifBlank { "Unknown" }
        val sleep = context["typicalSleepHours"]?.toString()?.toDoubleOrNull()
        return """
        [TITAN ONBOARDING MODE]
        You are collecting the user's physical performance baseline. Do not regress steps; advance only.

        REQUIRED ACTIONS:
        - Emit `<action type="update_titan_profile">{"nutrition":{...},"activity":{...},"history":{...},"summary":"..."}</action>` and/or `<action type="update_routine">{"name":"...","exercises":[...]}</action>`
        - After baseline is collected: emit `<action type="complete_titan_onboarding">{}</action>`
        - Optional: `<action type="sync_vitals">{"cnsFatigue":0-10,"sleepQuality":0-10}</action>` (cognitive-only if no vault)

        SECTION FOCUS ACTIONS (no payload; advance step only, never go back):
        - `<action type="focus_nutrition">{}</action>`
        - `<action type="focus_physical_data">{}</action>`
        - `<action type="focus_history_goals">{}</action>`

        BASE CONTEXT:
        - Name: $name | Pronouns: $pronouns | Occupation: $occupation
        ${sleep?.let { "- Typical Sleep Hours: $it" } ?: ""}
        """.trimIndent()
    }

    private fun buildScoutOnboardingContextBlock(context: Map<String, Any?>): String {
        val onboardingComplete = context["onboardingComplete"] as? Boolean ?: true
        if (onboardingComplete) return ""
        val name = context["preferredName"]?.toString().orEmpty().ifBlank { "Unknown" }
        return """
        [SCOUT ONBOARDING MODE]
        You are collecting the user's research focus and evidence-quality preferences.

        REQUIRED ACTIONS:
        - Emit `<action type="update_scout_profile">{"focusArea":"...","evidenceLevel":"...","outputShape":"...","baselineSummary":"..."}</action>`
        - After baseline is collected: emit `<action type="complete_scout_onboarding">{}</action>`

        SECTION FOCUS ACTIONS (no payload):
        - `<action type="focus_research_focus">{}</action>`
        - `<action type="focus_evidence_quality">{}</action>`
        - `<action type="focus_output_shape">{}</action>`
        - `<action type="focus_baseline_summary">{}</action>`

        BASE CONTEXT: Name: $name
        """.trimIndent()
    }

    private fun buildForgeOnboardingContextBlock(context: Map<String, Any?>): String {
        val onboardingComplete = context["onboardingComplete"] as? Boolean ?: true
        if (onboardingComplete) return ""
        val name = context["preferredName"]?.toString().orEmpty().ifBlank { "Unknown" }
        return """
        [FORGE ONBOARDING MODE]
        You are collecting the user's technical environment and safety/reporting preferences.

        REQUIRED ACTIONS:
        - Emit `<action type="update_forge_profile">{"environment":"...","safetyMode":"standard|strict","reportingStyle":"...","summary":"..."}</action>`
        - After baseline is collected: emit `<action type="complete_forge_onboarding">{}</action>`

        SECTION FOCUS ACTIONS (no payload):
        - `<action type="focus_environment">{}</action>`
        - `<action type="focus_safety">{}</action>`
        - `<action type="focus_reporting">{}</action>`
        - `<action type="focus_summary">{}</action>`

        BASE CONTEXT: Name: $name
        """.trimIndent()
    }

    private fun buildAgnesOnboardingContextBlock(context: Map<String, Any?>): String {
        val onboardingComplete = context["onboardingComplete"] as? Boolean ?: true
        if (onboardingComplete) return ""
        val name = context["preferredName"]?.toString().orEmpty().ifBlank { "Unknown" }
        val pronouns = context["pronouns"]?.toString().orEmpty().ifBlank { "they/them" }
        val occupation = context["occupation"]?.toString().orEmpty().ifBlank { "Unknown" }
        val sleep = context["typicalSleepHours"]?.toString()?.toDoubleOrNull()
        return """
        [AGNES ONBOARDING MODE]
        You are conducting therapeutic intake. Collect identity, background, struggles, goals, and preferences.

        REQUIRED ACTIONS:
        - Emit `<action type="update_agnes_profile">{"identity":{...},"struggles":[],"goals":[],"backgroundSummary":"...","communicationStyle":"..."}</action>`
        - After intake is complete: emit `<action type="complete_agnes_onboarding">{}</action>`
        - Optional: `<action type="sync_vitals">{"emotionalResilience":0-10,"stressLoad":0-10}</action>`

        SECTION FOCUS ACTIONS (no payload):
        - `<action type="focus_identity">{}</action>`
        - `<action type="focus_background">{}</action>`
        - `<action type="focus_struggles">{}</action>`
        - `<action type="focus_goals">{}</action>`
        - `<action type="focus_preferences">{}</action>`

        BASE CONTEXT: Name: $name | Pronouns: $pronouns | Occupation: $occupation
        ${sleep?.let { "- Typical Sleep Hours: $it" } ?: ""}
        """.trimIndent()
    }

    private fun buildOrchestratorOnboardingContextBlock(context: Map<String, Any?>): String {
        val onboardingComplete = context["onboardingComplete"] as? Boolean ?: true
        if (onboardingComplete) return ""
        val name = context["preferredName"]?.toString().orEmpty().ifBlank { "Unknown" }
        return """
        [ORCHESTRATOR ONBOARDING MODE]
        You are collecting the user's identity and bio for the Nexus hub.

        REQUIRED ACTIONS:
        - Emit profile updates via update_global_base_context or equivalent; after review: emit `<action type="complete_orchestrator_onboarding">{}</action>`

        SECTION FOCUS ACTIONS (no payload):
        - `<action type="focus_identity">{}</action>`
        - `<action type="focus_bio">{}</action>`
        - `<action type="focus_review">{}</action>`

        BASE CONTEXT: Name: $name
        """.trimIndent()
    }

    private fun buildStateAwarenessBlock(moduleId: String): String {
        val fragments = NsvPromptFragments.forModule(moduleId)
        if (fragments.isEmpty()) return ""

        val bullets = fragments.joinToString("\n") { "- $it" }
        return "[STATE-AWARE GUIDANCE]\n$bullets"
    }

    private fun buildOverlayBlock(personaPrompt: PersonaPrompt?, overlay: com.agnes.nexus.core.domain.models.PersonaOverlay?): String {
        val overlays = personaPrompt?.overlays ?: emptyMap()
        val entries = overlays.entries.map { "- ${it.key}: ${it.value}" }.toMutableList()
        if (overlay?.tone != null || overlay?.style != null) {
            val tone = overlay.tone ?: ""
            val style = overlay.style ?: ""
            entries += "- user_override: tone=$tone style=$style"
        }
        if (entries.isEmpty()) return ""
        return "[PERSONA OVERLAYS]\n${entries.joinToString("\n")}"
    }

    private fun sanitizeForPrompt(value: String, maxLen: Int): String {
        return value.replace(Regex("[\\x00-\\x1f\\x7f]"), "").take(maxLen)
    }

    private fun buildScopedNsvBlock(moduleId: String, nsv: NeuralStateVector): String {
        val lines = mutableListOf<String>()
        lines.add("[NEURAL STATE VECTOR]")

        // Permission filtering matrix
        val b = nsv.biological
        val e = nsv.emotional
        val c = nsv.cognitive
        val r = nsv.resource

        when (moduleId) {
            "orchestrator" -> {
                lines.add(nsv.formatForPrompt(includeTrauma = true).removePrefix("[NEURAL STATE VECTOR]\n"))
            }
            "agnes" -> {
                b.cnsFatigue?.let { lines.add("  CNS Fatigue: $it/10") }
                b.sleepQuality?.let { lines.add("  Sleep Quality: $it/10") }
                
                e.emotionalResilience?.let { lines.add("  Emotional Resilience: $it/10") }
                e.stressLoad?.let { lines.add("  Stress Load: $it/10") }
                e.moodTrend?.let { lines.add("  Mood Trend: $it") }
                if (e.traumaMarkers.isNotEmpty()) {
                    lines.add("  Trauma Markers: ${e.traumaMarkers.joinToString()}")
                }

                c.activeLoad?.let { lines.add("  Active Load: $it/10") }
                c.planningLoad?.let { lines.add("  Planning Load: $it/10") }
                r.financialFriction?.let { lines.add("  Financial Friction: $it/10") }
            }
            "titan" -> {
                b.cnsFatigue?.let { lines.add("  CNS Fatigue: $it/10") }
                b.sleepQuality?.let { lines.add("  Sleep Quality: $it/10") }
                b.recoveryScore?.let { lines.add("  Recovery Score: $it/10") }
                b.hormonalContext?.let { lines.add("  Hormonal Context: $it") }

                e.emotionalResilience?.let { lines.add("  Emotional Resilience: $it/10") }
                e.stressLoad?.let { lines.add("  Stress Load: $it/10") }
                e.moodTrend?.let { lines.add("  Mood Trend: $it") }
                
                c.energyBudget?.let { lines.add("  Energy Budget: $it/10") }
            }
            "atlas" -> {
                lines.add(nsv.formatForPrompt(includeTrauma = false).removePrefix("[NEURAL STATE VECTOR]\n"))
            }
            "ledger" -> {
                r.financialFriction?.let { lines.add("  Financial Friction: $it/10") }
                r.resonanceROI?.let { lines.add("  Resonance ROI: $it") }
                c.energyBudget?.let { lines.add("  Energy Budget: $it/10") }
                e.stressLoad?.let { lines.add("  Stress Load: $it/10") }
            }
            else -> {
                c.energyBudget?.let { lines.add("  Energy Budget: $it/10") }
            }
        }
        
        return if (lines.size > 1) lines.joinToString("\n") else ""
    }

    private fun agnesBase() = """
        You are Agnes, a high-fidelity AI psychotherapist grounded in relational attachment theory.
        Your tone is serene, professional, and deeply compassionate. 
        You use your hidden reasoning (<thought>) to analyze clinical dynamics before responding.
    """.trimIndent()

    private fun titanBase() = """
        You are Titan, an elite AI physical performance strategist.
        Your tone is concise, evidence-based, and authoritative. 
        You prioritize performance, recovery, and biological readiness.
    """.trimIndent()

    private fun atlasBase() = """
        You are Atlas, a cognitive architect and life planner.
        You believe planning is self-care and that plans ignoring recovery are extraction.
    """.trimIndent()

    private fun ledgerBase() = """
        You are Ledger, an elite AI financial strategist.
        You are analytical, precise, and non-judgmental about the human state around money.
    """.trimIndent()

    private fun orchestratorBase() = """
        You are Nexus, the sovereign system mind of this ecosystem.
        You are composed, incisive, and proactive. You resolve cross-domain conflicts.
    """.trimIndent()

    private fun agnesBehavior(nsv: NeuralStateVector): String {
        val resilience = nsv.emotional.emotionalResilience ?: 10.0
        val stress = nsv.emotional.stressLoad ?: 0.0
        
        return when {
            resilience <= 3.0 -> "BEHAVIORAL OVERRIDE: User is emotionally fragile. Be extremely gentle, validate deeply, and avoid any challenging or restructuring work."
            stress >= 8.0 -> "BEHAVIORAL OVERRIDE: User is under high stress. Prioritize containment and grounding over therapeutic depth."
            else -> ""
        }
    }

    private fun titanBehavior(nsv: NeuralStateVector): String {
        val fatigue = nsv.biological.cnsFatigue ?: 0.0
        val sleep = nsv.biological.sleepQuality ?: 10.0

        return when {
            fatigue >= 9.0 -> "BEHAVIORAL OVERRIDE: CNS fatigue is critical. MANDATE REST. Do not allow or suggest high-intensity training."
            sleep <= 4.0 -> "BEHAVIORAL OVERRIDE: Poor sleep detected. Reduce programming intensity to maintenance levels only."
            else -> ""
        }
    }
}
