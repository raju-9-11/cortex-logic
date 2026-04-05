package com.agnes.nexus.core.engine.personas

import com.agnes.nexus.core.engine.personas.forge.ForgePersonaPrompts
import com.agnes.nexus.core.engine.personas.notifications.NotificationsPersonaPrompts
import com.agnes.nexus.core.engine.personas.scout.ScoutPersonaPrompts
import com.agnes.nexus.core.engine.personas.soma.SomaPersonaPrompts
import kotlin.test.Test
import kotlin.test.assertNotNull
import kotlin.test.assertTrue
import kotlin.test.assertEquals

/**
 * Content assertions for all 9 module personas — verifies that each persona
 * prompt exists in [PersonaPromptCatalog] and contains critical safety,
 * identity, and capability markers.
 *
 * These are parity tests: they ensure KMP persona content matches the
 * requirements established by the original TS persona files.
 */
class PersonaPromptCatalogParityTest {

    // ── Agnes ──────────────────────────────────────────────────────────────────

    @Test
    fun agnes_promptExists() {
        val prompt = PersonaPromptCatalog.promptFor("agnes")
        assertNotNull(prompt, "Agnes prompt must exist in catalog")
    }

    @Test
    fun agnes_containsTherapistIdentity() {
        val prompt = PersonaPromptCatalog.promptFor("agnes")!!
        assertTrue(prompt.systemPrompt.contains("therapist") || prompt.systemPrompt.contains("Agnes"),
            "Agnes prompt should reference therapist identity")
    }

    // ── Titan ──────────────────────────────────────────────────────────────────

    @Test
    fun titan_promptExists() {
        val prompt = PersonaPromptCatalog.promptFor("titan")
        assertNotNull(prompt, "Titan prompt must exist in catalog")
    }

    @Test
    fun titan_containsPerformanceIdentity() {
        val prompt = PersonaPromptCatalog.promptFor("titan")!!
        assertTrue(prompt.systemPrompt.contains("TITAN") || prompt.systemPrompt.contains("performance")
            || prompt.systemPrompt.contains("training"),
            "Titan prompt should reference performance/training identity")
    }

    // ── Atlas ──────────────────────────────────────────────────────────────────

    @Test
    fun atlas_promptExists() {
        val prompt = PersonaPromptCatalog.promptFor("atlas")
        assertNotNull(prompt, "Atlas prompt must exist in catalog")
    }

    @Test
    fun atlas_containsPlanningIdentity() {
        val prompt = PersonaPromptCatalog.promptFor("atlas")!!
        assertTrue(prompt.systemPrompt.contains("Atlas") || prompt.systemPrompt.contains("planner")
            || prompt.systemPrompt.contains("planning"),
            "Atlas prompt should reference planning identity")
    }

    // ── Ledger ─────────────────────────────────────────────────────────────────

    @Test
    fun ledger_promptExists() {
        val prompt = PersonaPromptCatalog.promptFor("ledger")
        assertNotNull(prompt, "Ledger prompt must exist in catalog")
    }

    @Test
    fun ledger_containsInvestmentAdviceConstraint() {
        val prompt = PersonaPromptCatalog.promptFor("ledger")!!
        assertTrue(prompt.systemPrompt.contains("NEVER provide specific investment advice"),
            "Ledger prompt must forbid investment advice")
    }

    // ── Scout ──────────────────────────────────────────────────────────────────

    @Test
    fun scout_promptExists() {
        val prompt = PersonaPromptCatalog.promptFor("scout")
        assertNotNull(prompt, "Scout prompt must exist in catalog")
    }

    @Test
    fun scout_containsResearchIdentity() {
        val prompt = PersonaPromptCatalog.promptFor("scout")!!
        assertTrue(prompt.systemPrompt.contains("SCOUT") || prompt.systemPrompt.contains("research")
            || prompt.systemPrompt.contains("Research"),
            "Scout prompt should reference research identity")
    }

    // ── Forge ──────────────────────────────────────────────────────────────────

    @Test
    fun forge_promptExists() {
        val prompt = PersonaPromptCatalog.promptFor("forge")
        assertNotNull(prompt, "Forge prompt must exist in catalog")
    }

    @Test
    fun forge_containsExecutionIdentity() {
        val prompt = PersonaPromptCatalog.promptFor("forge")!!
        assertTrue(prompt.systemPrompt.contains("FORGE") || prompt.systemPrompt.contains("execution"),
            "Forge prompt should reference execution identity")
    }

    // ── Soma ───────────────────────────────────────────────────────────────────

    @Test
    fun soma_promptExists() {
        val prompt = PersonaPromptCatalog.promptFor("soma")
        assertNotNull(prompt, "Soma prompt must exist in catalog")
    }

    @Test
    fun soma_containsMedicalSafetyConstraint() {
        val prompt = PersonaPromptCatalog.promptFor("soma")!!
        assertTrue(prompt.systemPrompt.contains("NEVER provide a medical diagnosis"),
            "Soma prompt must forbid medical diagnoses")
    }

    @Test
    fun soma_containsParseLabReportAction() {
        val prompt = PersonaPromptCatalog.promptFor("soma")!!
        assertTrue(prompt.systemPrompt.contains("<action type=\"parse_lab_report\">"),
            "Soma prompt must document parse_lab_report action")
    }

    // ── Orchestrator ───────────────────────────────────────────────────────────

    @Test
    fun orchestrator_promptExists() {
        val prompt = PersonaPromptCatalog.promptFor("orchestrator")
        assertNotNull(prompt, "Orchestrator prompt must exist in catalog")
    }

    @Test
    fun orchestrator_containsNyxIdentity() {
        val prompt = PersonaPromptCatalog.promptFor("orchestrator")!!
        assertTrue(prompt.systemPrompt.contains("Nyx") || prompt.systemPrompt.contains("orchestrator"),
            "Orchestrator prompt should reference Nyx identity")
    }

    // ── Notifications ──────────────────────────────────────────────────────────

    @Test
    fun notifications_promptExists() {
        val prompt = PersonaPromptCatalog.promptFor("notifications")
        assertNotNull(prompt, "Notifications prompt must exist in catalog")
    }

    @Test
    fun notifications_containsTriageCapability() {
        val prompt = PersonaPromptCatalog.promptFor("notifications")!!
        assertTrue(prompt.systemPrompt.contains("triage") || prompt.systemPrompt.contains("notification")
            || prompt.systemPrompt.contains("inbox"),
            "Notifications prompt should reference triage/notification capability")
    }

    // ── Cross-module: Forge overlays ───────────────────────────────────────────

    @Test
    fun forge_directPrompt_hasAllFourOverlays() {
        val overlays = ForgePersonaPrompts.base.overlays
        assertTrue(overlays.containsKey("code"), "Forge must have code overlay")
        assertTrue(overlays.containsKey("comms"), "Forge must have comms overlay")
        assertTrue(overlays.containsKey("docs"), "Forge must have docs overlay")
        assertTrue(overlays.containsKey("life"), "Forge must have life overlay")
        assertEquals(4, overlays.size, "Forge should have exactly 4 overlays")
    }

    @Test
    fun forge_codeOverlay_containsActiveMode() {
        val overlay = ForgePersonaPrompts.base.overlays["code"]!!
        assertTrue(overlay.contains("[ACTIVE_MODE: CODE]"), "Code overlay must declare active mode")
    }

    @Test
    fun forge_commsOverlay_containsActiveMode() {
        val overlay = ForgePersonaPrompts.base.overlays["comms"]!!
        assertTrue(overlay.contains("[ACTIVE_MODE: COMMS]"), "Comms overlay must declare active mode")
    }

    @Test
    fun forge_docsOverlay_containsActiveMode() {
        val overlay = ForgePersonaPrompts.base.overlays["docs"]!!
        assertTrue(overlay.contains("[ACTIVE_MODE: DOCS]"), "Docs overlay must declare active mode")
    }

    @Test
    fun forge_lifeOverlay_containsActiveMode() {
        val overlay = ForgePersonaPrompts.base.overlays["life"]!!
        assertTrue(overlay.contains("[ACTIVE_MODE: LIFE OPS]"), "Life overlay must declare active mode")
    }

    // ── Cross-module: Notifications serializer ─────────────────────────────────

    @Test
    fun notifications_serializer_producesInboxBlock() {
        val summary = NotificationsPersonaPrompts.NotificationSummary(
            total = 12,
            unread = 5,
            critical = 2,
            bySource = mapOf("titan" to 4, "atlas" to 3, "ledger" to 5)
        )
        val result = NotificationsPersonaPrompts.serializeNotificationContext(summary, false)
        assertTrue(result.contains("[INBOX]"), "Should produce INBOX block")
        assertTrue(result.contains("12 total"), "Should contain total count")
        assertTrue(result.contains("5 unread"), "Should contain unread count")
        assertTrue(result.contains("2 critical"), "Should contain critical count")
        assertTrue(result.contains("[BY SOURCE]"), "Should include source breakdown")
        assertTrue(result.contains("titan"), "Should include titan source")
        assertTrue(result.contains("[QUIET HOURS]"), "Should include quiet hours")
        assertTrue(result.contains("Off"), "Should show quiet hours off")
    }

    @Test
    fun notifications_serializer_showsQuietHoursActive() {
        val summary = NotificationsPersonaPrompts.NotificationSummary(total = 1, unread = 0, critical = 0)
        val result = NotificationsPersonaPrompts.serializeNotificationContext(summary, true)
        assertTrue(result.contains("Active"), "Should show quiet hours active")
    }

    @Test
    fun notifications_serializer_handlesEmptyInbox() {
        val summary = NotificationsPersonaPrompts.NotificationSummary(total = 0, unread = 0, critical = 0)
        val result = NotificationsPersonaPrompts.serializeNotificationContext(summary, false)
        assertTrue(result.contains("Empty"), "Should indicate empty inbox")
    }

    // ── Cross-module: Scout prompt builders ────────────────────────────────────

    @Test
    fun scout_masterChatPrompt_containsConversationalMode() {
        val result = ScoutPersonaPrompts.getMasterChatPrompt()
        assertTrue(result.contains("Conversational Mode"), "Master chat should be conversational mode")
    }

    @Test
    fun scout_masterChatPrompt_appendsResearchFocus() {
        val result = ScoutPersonaPrompts.getMasterChatPrompt(listOf("AI safety", "alignment"))
        assertTrue(result.contains("RESEARCHER PROFILE"), "Should append researcher profile")
        assertTrue(result.contains("AI safety"), "Should contain research domain")
    }

    @Test
    fun scout_sessionChatPrompt_containsActiveTopic() {
        val result = ScoutPersonaPrompts.getSessionChatPrompt("machine learning")
        assertTrue(result.contains("machine learning"), "Should contain active topic")
        assertTrue(result.contains("ACTIVE RESEARCH TOPIC"), "Should have active topic section")
    }

    @Test
    fun scout_sessionChatPrompt_includesSessionContext() {
        val ctx = "Claim: GPT-4 shows emergent reasoning. Confidence: 0.7"
        val result = ScoutPersonaPrompts.getSessionChatPrompt("LLM capabilities", ctx)
        assertTrue(result.contains("GPT-4"), "Should include session context content")
        assertTrue(result.contains("SESSION KNOWLEDGE"), "Should have session knowledge section")
    }

    @Test
    fun scout_diagnosisPrompt_isolatedPolicy() {
        val result = ScoutPersonaPrompts.buildScoutDiagnosisPrompt(
            ScoutPersonaPrompts.DiagnosisContextPolicy.ISOLATED
        )
        assertTrue(result.contains("ISOLATED"), "Should use isolated policy")
        assertTrue(result.contains("Diagnosis"), "Should be in diagnosis mode")
    }

    @Test
    fun scout_diagnosisPrompt_withContextPolicy() {
        val result = ScoutPersonaPrompts.buildScoutDiagnosisPrompt(
            ScoutPersonaPrompts.DiagnosisContextPolicy.WITH_CONTEXT
        )
        assertTrue(result.contains("FULL ACCESS"), "Should use full access policy")
    }

    // ── Cross-module: Soma context builder ─────────────────────────────────────

    @Test
    fun soma_contextBuilder_acceptsTsFieldNames() {
        val ctx = mapOf<String, Any>(
            "medical_profile" to mapOf(
                "knownConditions" to listOf("Diabetes", "GERD"),
                "readinessScore" to 85,
                "biomarkers" to listOf("HbA1c: 6.1%")
            )
        )
        val result = SomaPersonaPrompts.context(ctx)
        assertTrue(result.contains("Diabetes"), "Should parse knownConditions")
        assertTrue(result.contains("85"), "Should parse readinessScore")
        assertTrue(result.contains("HbA1c"), "Should parse biomarkers")
    }

    @Test
    fun soma_contextBuilder_returnsEmptyForMissingProfile() {
        val result = SomaPersonaPrompts.context(emptyMap())
        assertTrue(result.isEmpty(), "Should return empty when no medical_profile")
    }
}
