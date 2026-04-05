package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.models.*
import kotlin.test.Test
import kotlin.test.assertTrue
import kotlin.test.assertFalse

/**
 * Tests for [DefaultPersonaFactory.assemble] — the single assembly path for all module prompts.
 *
 * Each test verifies that the correct persona prompt is used and that identity/NSV
 * enrichment blocks are injected. Module-specific tests verify that moduleContext
 * keys are consumed correctly and route to the right KMP prompt builder.
 */
class PersonaFactoryTest {

    private val factory = DefaultPersonaFactory()

    // ── Helpers ────────────────────────────────────────────────────────────────

    private fun identity(
        name: String = "TestUser",
        pronouns: String = "they/them",
        assignedSex: String? = null,
        displayNames: Map<String, String> = mapOf("orchestrator" to "Nyx"),
        agentGenders: Map<String, String> = mapOf("orchestrator" to "female")
    ) = UserIdentity(
        name = name,
        pronouns = pronouns,
        assignedSexAtBirth = assignedSex,
        displayNames = displayNames,
        agentGenders = agentGenders
    )

    private fun emptyNsv() = NeuralStateVector()

    private fun nsvWithStress(stress: Double = 8.0, resilience: Double = 3.0) = NeuralStateVector(
        emotional = EmotionalState(stressLoad = stress, emotionalResilience = resilience)
    )

    // ── Common enrichment tests ────────────────────────────────────────────────

    @Test
    fun assemble_injectsIdentitySyncBlock() {
        val result = factory.assemble(
            moduleId = "orchestrator",
            identity = identity(name = "Alice", pronouns = "she/her"),
            nsv = emptyNsv()
        )
        assertTrue(result.contains("[IDENTITY_SYNC]"), "Should contain IDENTITY_SYNC block")
        assertTrue(result.contains("Alice"), "Should contain user name")
        assertTrue(result.contains("she/her"), "Should contain pronouns")
    }

    @Test
    fun assemble_injectsUserIdentityBlock() {
        val result = factory.assemble(
            moduleId = "orchestrator",
            identity = identity(name = "Bob"),
            nsv = emptyNsv()
        )
        assertTrue(result.contains("[USER IDENTITY]"), "Should contain USER IDENTITY block")
        assertTrue(result.contains("Name: Bob"), "Should contain user name in identity block")
    }

    @Test
    fun assemble_injectsOutputFormatBlock() {
        val result = factory.assemble(
            moduleId = "orchestrator",
            identity = identity(),
            nsv = emptyNsv()
        )
        assertTrue(result.contains("[OUTPUT FORMAT]"), "Should contain OUTPUT FORMAT block")
        assertTrue(result.contains("<thought>"), "Should mention thought tags")
        assertTrue(result.contains("<action type="), "Should mention action tags")
    }

    @Test
    fun assemble_addsBiologicalContextForFemale() {
        val result = factory.assemble(
            moduleId = "agnes",
            identity = identity(assignedSex = "female"),
            nsv = emptyNsv()
        )
        assertTrue(result.contains("[BIOLOGICAL_CONTEXT]"), "Should contain biological context for female")
    }

    @Test
    fun assemble_omitsBiologicalContextForMale() {
        val result = factory.assemble(
            moduleId = "agnes",
            identity = identity(assignedSex = "male"),
            nsv = emptyNsv()
        )
        assertFalse(result.contains("[BIOLOGICAL_CONTEXT]"), "Should not contain biological context for male")
    }

    @Test
    fun assemble_injectsNsvBlock_whenNsvHasData() {
        val result = factory.assemble(
            moduleId = "agnes",
            identity = identity(),
            nsv = nsvWithStress()
        )
        assertTrue(result.contains("[NEURAL STATE VECTOR]"), "Should contain NSV block")
        assertTrue(result.contains("Stress Load:"), "Should contain stress data")
    }

    @Test
    fun assemble_injectsGenderPersonality_fromDisplayAgentGenders() {
        val result = factory.assemble(
            moduleId = "agnes",
            identity = identity(agentGenders = mapOf("agnes" to "female")),
            nsv = emptyNsv()
        )
        assertTrue(result.contains("Your Gender Personality: female"), "Should set agent gender")
        assertTrue(result.contains("warm, empathetic"), "Should apply feminine tone")
    }

    @Test
    fun assemble_appendsLongTermSummary_whenProvided() {
        val result = factory.assemble(
            moduleId = "orchestrator",
            identity = identity(),
            nsv = emptyNsv(),
            longTermSummary = "User discussed career goals last session."
        )
        assertTrue(result.contains("[LONG-TERM SUMMARY]"), "Should contain summary block")
        assertTrue(result.contains("career goals"), "Should contain summary content")
    }

    // ── Fallback / baseRole tests ──────────────────────────────────────────────

    @Test
    fun assemble_prefersBaseRole_whenNoTypedProfileProvided() {
        val baseRole = "You are a custom system prompt with live data."
        val result = factory.assemble(
            moduleId = "titan",
            identity = identity(),
            nsv = emptyNsv(),
            moduleContext = mapOf("baseRole" to baseRole)
        )
        assertTrue(result.contains(baseRole), "Should use baseRole when no titan_profile")
    }

    @Test
    fun assemble_fallsBackToCatalog_whenNoBaseRoleOrProfile() {
        val result = factory.assemble(
            moduleId = "titan",
            identity = identity(),
            nsv = emptyNsv(),
            moduleContext = emptyMap()
        )
        // Should use PersonaPromptCatalog entry or fallback — either way, not empty
        assertTrue(result.isNotBlank(), "Should produce non-blank output")
        assertTrue(result.contains("[IDENTITY_SYNC]"), "Should still have enrichment blocks")
    }

    // ── Forge module ───────────────────────────────────────────────────────────

    @Test
    fun forge_usesBasePersona_withCodeOverlay() {
        val result = factory.assemble(
            moduleId = "forge",
            identity = identity(),
            nsv = emptyNsv(),
            moduleContext = mapOf("forge_mode" to "code")
        )
        assertTrue(result.contains("FORGE"), "Should contain FORGE identity")
        assertTrue(result.contains("[ACTIVE_MODE: CODE]"), "Should append code overlay")
    }

    @Test
    fun forge_usesBasePersona_withCommsOverlay() {
        val result = factory.assemble(
            moduleId = "forge",
            identity = identity(),
            nsv = emptyNsv(),
            moduleContext = mapOf("forge_mode" to "comms")
        )
        assertTrue(result.contains("[ACTIVE_MODE: COMMS]"), "Should append comms overlay")
    }

    @Test
    fun forge_usesBasePersona_withDocsOverlay() {
        val result = factory.assemble(
            moduleId = "forge",
            identity = identity(),
            nsv = emptyNsv(),
            moduleContext = mapOf("forge_mode" to "docs")
        )
        assertTrue(result.contains("[ACTIVE_MODE: DOCS]"), "Should append docs overlay")
    }

    @Test
    fun forge_usesBasePersona_withLifeOverlay() {
        val result = factory.assemble(
            moduleId = "forge",
            identity = identity(),
            nsv = emptyNsv(),
            moduleContext = mapOf("forge_mode" to "life")
        )
        assertTrue(result.contains("[ACTIVE_MODE: LIFE OPS]"), "Should append life overlay")
    }

    @Test
    fun forge_fallsBackToBaseRole_whenProvided() {
        val baseRole = "Custom forge prompt from TS."
        val result = factory.assemble(
            moduleId = "forge",
            identity = identity(),
            nsv = emptyNsv(),
            moduleContext = mapOf("baseRole" to baseRole, "forge_mode" to "code")
        )
        // baseRole is preferred over ForgePersonaPrompts.base.systemPrompt
        assertTrue(result.contains(baseRole), "Should use baseRole as forge base")
        assertTrue(result.contains("[ACTIVE_MODE: CODE]"), "Should still append overlay")
    }

    // ── Notifications module ───────────────────────────────────────────────────

    @Test
    fun notifications_usesBasePersona_withContext() {
        val ctx = "[INBOX]\n  5 total | 2 unread | 1 critical/alert"
        val result = factory.assemble(
            moduleId = "notifications",
            identity = identity(),
            nsv = emptyNsv(),
            moduleContext = mapOf("notification_context" to ctx)
        )
        assertTrue(result.contains("Nyx Notify"), "Should contain notifications persona identity")
        assertTrue(result.contains("5 total"), "Should contain injected notification context")
    }

    @Test
    fun notifications_usesBasePersona_withoutContext() {
        val result = factory.assemble(
            moduleId = "notifications",
            identity = identity(),
            nsv = emptyNsv(),
            moduleContext = emptyMap()
        )
        assertTrue(result.contains("Nyx Notify") || result.contains("notification"), "Should have notification persona")
        assertFalse(result.contains("[INBOX]"), "Should not have inbox context when not provided")
    }

    // ── Scout module ───────────────────────────────────────────────────────────

    @Test
    fun scout_usesSessionPrompt_whenActiveTopicProvided() {
        val result = factory.assemble(
            moduleId = "scout",
            identity = identity(),
            nsv = emptyNsv(),
            moduleContext = mapOf(
                "scout_active_topic" to "quantum computing",
                "scout_session_context" to "Prior finding: quantum supremacy achieved in 2019",
                "scout_research_focus" to listOf("physics", "computing")
            )
        )
        assertTrue(result.contains("quantum computing"), "Should contain active topic")
        assertTrue(result.contains("quantum supremacy"), "Should contain session context")
        assertTrue(result.contains("physics"), "Should contain research focus")
    }

    @Test
    fun scout_usesMasterChatPrompt_whenOnlyResearchFocusProvided() {
        val result = factory.assemble(
            moduleId = "scout",
            identity = identity(),
            nsv = emptyNsv(),
            moduleContext = mapOf(
                "scout_research_focus" to listOf("neuroscience", "sleep")
            )
        )
        assertTrue(result.contains("neuroscience"), "Should contain research focus")
        assertTrue(result.contains("Conversational Mode") || result.contains("RESEARCHER PROFILE"),
            "Should be master/conversational chat mode")
    }

    @Test
    fun scout_usesDiagnosisPrompt_whenDiagnosisModeSet() {
        val result = factory.assemble(
            moduleId = "scout",
            identity = identity(),
            nsv = emptyNsv(),
            moduleContext = mapOf(
                "scout_mode" to "diagnosis",
                "scout_diagnosis_policy" to "with-context"
            )
        )
        assertTrue(result.contains("Diagnosis"), "Should contain diagnosis mode")
        assertTrue(result.contains("FULL ACCESS"), "Should use WITH_CONTEXT policy")
    }

    @Test
    fun scout_usesDiagnosisIsolated_byDefault() {
        val result = factory.assemble(
            moduleId = "scout",
            identity = identity(),
            nsv = emptyNsv(),
            moduleContext = mapOf("scout_mode" to "diagnosis")
        )
        assertTrue(result.contains("ISOLATED"), "Should default to ISOLATED policy")
    }

    // ── Soma module ────────────────────────────────────────────────────────────

    @Test
    fun soma_prefersBaseRole_overRawTemplate() {
        val baseRole = "You are Soma with all templates filled in from TS."
        val result = factory.assemble(
            moduleId = "soma",
            identity = identity(),
            nsv = emptyNsv(),
            moduleContext = mapOf("baseRole" to baseRole)
        )
        assertTrue(result.contains(baseRole), "Should use baseRole (TS-built prompt)")
        assertFalse(result.contains("{{"), "Should not contain raw template placeholders")
    }

    @Test
    fun soma_appendsBiologicalContextBlock_whenMedicalProfileProvided() {
        val result = factory.assemble(
            moduleId = "soma",
            identity = identity(),
            nsv = emptyNsv(),
            moduleContext = mapOf(
                "baseRole" to "Soma base prompt.",
                "medical_profile" to mapOf(
                    "knownConditions" to listOf("Asthma", "Hypertension"),
                    "readinessScore" to 72,
                    "biomarkers" to listOf("HbA1c: 5.4%", "LDL: 120 mg/dL")
                )
            )
        )
        assertTrue(result.contains("[CURRENT BIOLOGICAL STATE]"), "Should contain biological state block")
        assertTrue(result.contains("Asthma"), "Should list known conditions")
    }

    // ── Titan module ───────────────────────────────────────────────────────────

    @Test
    fun titan_usesKmpBuilder_whenProfileProvided() {
        val profile = TrainerProfile(onboardingComplete = true)
        val result = factory.assemble(
            moduleId = "titan",
            identity = identity(),
            nsv = emptyNsv(),
            moduleContext = mapOf("titan_profile" to profile, "titan_mode" to "training")
        )
        // TitanPromptBuilder should produce a prompt with its key sections
        assertTrue(result.contains("[IDENTITY]") || result.contains("TITAN"), "Should contain Titan identity")
        assertTrue(result.contains("[MODE: TRAINING]") || result.contains("training"),
            "Should be in training mode")
    }

    @Test
    fun titan_usesRecoveryMode_whenSpecified() {
        val profile = TrainerProfile(onboardingComplete = true)
        val result = factory.assemble(
            moduleId = "titan",
            identity = identity(),
            nsv = emptyNsv(),
            moduleContext = mapOf(
                "titan_profile" to profile,
                "titan_mode" to "recovery",
                "titan_recovery_score" to 3
            )
        )
        assertTrue(result.contains("RECOVERY") || result.contains("recovery"),
            "Should reference recovery mode")
    }

    // ── Atlas module ───────────────────────────────────────────────────────────

    @Test
    fun atlas_usesKmpBuilder_whenProfileProvided() {
        val profile = AtlasProfile(
            onboardingComplete = true,
            goals = listOf(
                AtlasGoal(id = "g1", title = "Ship Feature", progressPercent = 20f, status = "active")
            ),
            tasks = listOf(
                AtlasTask(id = "t1", title = "Write Tests", priority = 3, energyCost = 4, status = "active")
            )
        )
        val result = factory.assemble(
            moduleId = "atlas",
            identity = identity(),
            nsv = emptyNsv(),
            moduleContext = mapOf("atlas_profile" to profile, "atlas_mode" to "general")
        )
        assertTrue(result.contains("Ship Feature"), "Should include goal title from profile")
        assertTrue(result.contains("Write Tests"), "Should include task title from profile")
    }

    // ── Ledger module ──────────────────────────────────────────────────────────

    @Test
    fun ledger_fallsBackToBaseRole_inGeneralMode() {
        val baseRole = "Full Ledger prompt with financial context from TS."
        val result = factory.assemble(
            moduleId = "ledger",
            identity = identity(),
            nsv = emptyNsv(),
            moduleContext = mapOf("baseRole" to baseRole, "ledger_mode" to "general")
        )
        assertTrue(result.contains(baseRole), "Should use baseRole for general mode")
    }

    @Test
    fun ledger_fallsBackToBaseRole_whenNoProfileProvided() {
        val baseRole = "Ledger with live data."
        val result = factory.assemble(
            moduleId = "ledger",
            identity = identity(),
            nsv = emptyNsv(),
            moduleContext = mapOf("baseRole" to baseRole)
        )
        assertTrue(result.contains(baseRole), "Should use baseRole when no ledger_profile")
    }

    // ── Agnes module ───────────────────────────────────────────────────────────

    @Test
    fun agnes_usesBaseRole_asIs() {
        val baseRole = "Agnes clinical prompt with session context."
        val result = factory.assemble(
            moduleId = "agnes",
            identity = identity(),
            nsv = emptyNsv(),
            moduleContext = mapOf("baseRole" to baseRole)
        )
        assertTrue(result.contains(baseRole), "Agnes should use baseRole directly")
    }

    @Test
    fun agnes_triggersBehavioralOverride_onHighStress() {
        val result = factory.assemble(
            moduleId = "agnes",
            identity = identity(),
            nsv = nsvWithStress(stress = 9.0, resilience = 5.0),
            moduleContext = mapOf("baseRole" to "Agnes base.")
        )
        assertTrue(result.contains("BEHAVIORAL OVERRIDE"), "Should trigger behavioral override for high stress")
        assertTrue(result.contains("containment"), "Should prioritize containment")
    }

    @Test
    fun agnes_triggersBehavioralOverride_onLowResilience() {
        val result = factory.assemble(
            moduleId = "agnes",
            identity = identity(),
            nsv = nsvWithStress(stress = 3.0, resilience = 2.0),
            moduleContext = mapOf("baseRole" to "Agnes base.")
        )
        assertTrue(result.contains("BEHAVIORAL OVERRIDE"), "Should trigger behavioral override for low resilience")
        assertTrue(result.contains("fragile"), "Should note emotional fragility")
    }

    // ── Orchestrator module ────────────────────────────────────────────────────

    @Test
    fun orchestrator_usesBaseRole_orCatalogFallback() {
        val result = factory.assemble(
            moduleId = "orchestrator",
            identity = identity(),
            nsv = emptyNsv()
        )
        // Should have Nyx/orchestrator persona
        assertTrue(result.contains("Nyx") || result.contains("orchestrator"),
            "Should contain orchestrator identity")
    }

    // ── NSV scoping tests ──────────────────────────────────────────────────────

    @Test
    fun nsv_titan_includesRecoveryScore() {
        val nsv = NeuralStateVector(
            biological = BiologicalState(cnsFatigue = 7.0, recoveryScore = 3.0, sleepQuality = 5.0)
        )
        val result = factory.assemble(
            moduleId = "titan",
            identity = identity(),
            nsv = nsv,
            moduleContext = mapOf("baseRole" to "Titan base.")
        )
        assertTrue(result.contains("Recovery Score: 3.0/10"), "Titan should see recovery score")
        assertTrue(result.contains("CNS Fatigue: 7.0/10"), "Titan should see CNS fatigue")
    }

    @Test
    fun nsv_ledger_includesFinancialFriction() {
        val nsv = NeuralStateVector(
            resource = ResourceState(financialFriction = 6.0, resonanceROI = "positive")
        )
        val result = factory.assemble(
            moduleId = "ledger",
            identity = identity(),
            nsv = nsv,
            moduleContext = mapOf("baseRole" to "Ledger base.")
        )
        assertTrue(result.contains("Financial Friction: 6.0/10"), "Ledger should see financial friction")
    }

    @Test
    fun nsv_agnes_includesTraumaMarkers() {
        val nsv = NeuralStateVector(
            emotional = EmotionalState(
                emotionalResilience = 4.0,
                stressLoad = 5.0,
                traumaMarkers = listOf("grief", "abandonment")
            )
        )
        val result = factory.assemble(
            moduleId = "agnes",
            identity = identity(),
            nsv = nsv,
            moduleContext = mapOf("baseRole" to "Agnes base.")
        )
        assertTrue(result.contains("grief"), "Agnes should see trauma markers")
        assertTrue(result.contains("abandonment"), "Agnes should see trauma markers")
    }
}
