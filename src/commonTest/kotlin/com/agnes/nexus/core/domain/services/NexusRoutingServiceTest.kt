package com.agnes.nexus.core.domain.services

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

/**
 * Unit tests for NexusRoutingService — intent routing with weighted keyword scoring.
 */
class NexusRoutingServiceTest {

    private fun createService(): NexusRoutingService {
        return NexusRoutingService()
    }

    // ═══════════════════════════════════════════════════════════════════════════════════
    // Test 1: decideRoute_workoutKeyword_routesToTitan
    // ═══════════════════════════════════════════════════════════════════════════════════

    @Test
    fun decideRoute_workoutKeyword_routesToTitan() {
        val service = createService()
        
        val decision = service.decideRoute("I need help with my workout today")
        
        assertEquals("titan", decision.moduleId, "Workout keyword should route to titan")
        assertTrue(decision.confidence > 0.5, "Should have reasonable confidence")
        assertTrue(decision.rationale.contains("workout") || decision.rationale.contains("scored"), 
            "Rationale should indicate workout match")
    }

    @Test
    fun decideRoute_trainingKeyword_routesToTitan() {
        val service = createService()
        
        val decision = service.decideRoute("What's my training schedule?")
        
        assertEquals("titan", decision.moduleId, "Training keyword should route to titan")
    }

    @Test
    fun decideRoute_gymKeyword_routesToTitan() {
        val service = createService()
        
        val decision = service.decideRoute("Going to the gym later")
        
        assertEquals("titan", decision.moduleId, "Gym keyword should route to titan")
    }

    // ═══════════════════════════════════════════════════════════════════════════════════
    // Test 2: decideRoute_anxietyKeyword_routesToAgnes
    // ═══════════════════════════════════════════════════════════════════════════════════

    @Test
    fun decideRoute_anxietyKeyword_routesToAgnes() {
        val service = createService()
        
        val decision = service.decideRoute("I'm feeling a lot of anxiety today")
        
        assertEquals("agnes", decision.moduleId, "Anxiety keyword should route to agnes")
        assertTrue(decision.confidence > 0.5, "Should have reasonable confidence")
    }

    @Test
    fun decideRoute_emotionKeyword_routesToAgnes() {
        val service = createService()
        
        val decision = service.decideRoute("I need to talk about my emotions")
        
        assertEquals("agnes", decision.moduleId, "Emotion keyword should route to agnes")
    }

    @Test
    fun decideRoute_therapyKeyword_routesToAgnes() {
        val service = createService()
        
        val decision = service.decideRoute("Can we do a therapy session?")
        
        assertEquals("agnes", decision.moduleId, "Therapy keyword should route to agnes")
    }

    @Test
    fun decideRoute_depressionKeyword_routesToAgnes() {
        val service = createService()
        
        val decision = service.decideRoute("I've been dealing with depression")
        
        assertEquals("agnes", decision.moduleId, "Depression keyword should route to agnes")
    }

    // ═══════════════════════════════════════════════════════════════════════════════════
    // Test 3: decideRoute_budgetKeyword_routesToLedger
    // ═══════════════════════════════════════════════════════════════════════════════════

    @Test
    fun decideRoute_budgetKeyword_routesToLedger() {
        val service = createService()
        
        val decision = service.decideRoute("Help me review my budget")
        
        assertEquals("ledger", decision.moduleId, "Budget keyword should route to ledger")
        assertTrue(decision.confidence > 0.5, "Should have reasonable confidence")
    }

    @Test
    fun decideRoute_expenseKeyword_routesToLedger() {
        val service = createService()
        
        val decision = service.decideRoute("I need to track my expenses")
        
        assertEquals("ledger", decision.moduleId, "Expense keyword should route to ledger")
    }

    @Test
    fun decideRoute_savingsKeyword_routesToLedger() {
        val service = createService()
        
        val decision = service.decideRoute("How are my savings doing?")
        
        assertEquals("ledger", decision.moduleId, "Savings keyword should route to ledger")
    }

    @Test
    fun decideRoute_debtKeyword_routesToLedger() {
        val service = createService()
        
        val decision = service.decideRoute("I want to pay off my debt")
        
        assertEquals("ledger", decision.moduleId, "Debt keyword should route to ledger")
    }

    // ═══════════════════════════════════════════════════════════════════════════════════
    // Test 4: decideRoute_noMatch_routesToOrchestrator
    // ═══════════════════════════════════════════════════════════════════════════════════

    @Test
    fun decideRoute_noMatch_routesToOrchestrator() {
        val service = createService()
        
        val decision = service.decideRoute("Hello, how are you?")
        
        assertEquals("nexus", decision.moduleId, "No keyword match should route to nexus")
        assertTrue(decision.confidence < 0.6, "Should have lower confidence for fallback")
        assertEquals("default_nexus", decision.rationale, "Rationale should indicate default fallback")
    }

    @Test
    fun decideRoute_randomText_routesToOrchestrator() {
        val service = createService()
        
        val decision = service.decideRoute("xyzabc123 random gibberish")
        
        assertEquals("nexus", decision.moduleId, "Random text should route to nexus")
    }

    @Test
    fun decideRoute_emptyString_routesToOrchestrator() {
        val service = createService()
        
        val decision = service.decideRoute("")
        
        assertEquals("nexus", decision.moduleId, "Empty string should route to nexus")
    }

    @Test
    fun decideRoute_customFallback_usesCustomFallback() {
        val service = createService()
        
        val decision = service.decideRoute("Hello there", fallback = "agnes")
        
        assertEquals("agnes", decision.moduleId, "Should use custom fallback when no match")
    }

    // ═══════════════════════════════════════════════════════════════════════════════════
    // Test 5: decideRoute_multipleMatches_highestScoreWins
    // ═══════════════════════════════════════════════════════════════════════════════════

    @Test
    fun decideRoute_multipleMatches_highestScoreWins() {
        val service = createService()
        
        // This message has both "workout" (titan) and "feeling" (agnes)
        // But titan has more fitness-related keywords that might accumulate higher score
        val decision = service.decideRoute("I'm tired from my workout but feeling stressed")
        
        // The actual routing depends on keyword weights
        // workout (1) + fatigue is also titan-related
        // feeling (1) + stressed could be agnes
        // This test verifies the service picks one based on score
        assertNotNull(decision.moduleId, "Should route to some module")
        assertTrue(decision.moduleId == "titan" || decision.moduleId == "agnes", 
            "Should route to titan or agnes based on keyword scores")
    }

    @Test
    fun decideRoute_multipleKeywordsSameModule_accumulatesScore() {
        val service = createService()
        
        // Multiple titan keywords should accumulate
        val decision = service.decideRoute("I need a workout plan for the gym with some strength training")
        
        assertEquals("titan", decision.moduleId, "Multiple titan keywords should route to titan")
        assertTrue(decision.confidence > 0.72, "Multiple matches should increase confidence")
    }

    @Test
    fun decideRoute_competingModules_higherWeightWins() {
        val service = createService()
        
        // "workout plan" has weight 2, vs single weight-1 keywords
        val decision = service.decideRoute("workout plan please")
        
        assertEquals("titan", decision.moduleId, "Higher weight compound phrase should win")
    }

    // ═══════════════════════════════════════════════════════════════════════════════════
    // Test 6: decideRoute_compoundPhrase_higherWeight
    // ═══════════════════════════════════════════════════════════════════════════════════

    @Test
    fun decideRoute_compoundPhrase_higherWeight() {
        val service = createService()
        
        // "workout plan" is a compound phrase with weight 2
        val decision = service.decideRoute("Can you create a workout plan for me?")
        
        assertEquals("titan", decision.moduleId, "Compound phrase 'workout plan' should route to titan")
        assertTrue(decision.confidence >= 0.72, "Compound phrase should have higher confidence base")
    }

    @Test
    fun decideRoute_mentalHealthCompound_routesToAgnes() {
        val service = createService()
        
        // "mental health" is a compound phrase with weight 2 for agnes
        val decision = service.decideRoute("I want to talk about my mental health")
        
        assertEquals("agnes", decision.moduleId, "Compound phrase 'mental health' should route to agnes")
    }

    @Test
    fun decideRoute_weekPlanCompound_routesToAtlas() {
        val service = createService()
        
        // "week plan" or "weekly plan" are compound phrases for atlas
        val decision = service.decideRoute("Help me create a week plan")
        
        assertEquals("atlas", decision.moduleId, "Compound phrase 'week plan' should route to atlas")
    }

    @Test
    fun decideRoute_heartRateCompound_routesToSoma() {
        val service = createService()
        
        // "heart rate variability" is a compound phrase with weight 3 for soma
        val decision = service.decideRoute("What's my heart rate variability?")
        
        assertEquals("soma", decision.moduleId, "Compound phrase 'heart rate variability' should route to soma")
    }

    // ═══════════════════════════════════════════════════════════════════════════════════
    // Additional routing tests for other modules
    // ═══════════════════════════════════════════════════════════════════════════════════

    @Test
    fun decideRoute_researchKeyword_routesToScout() {
        val service = createService()
        
        val decision = service.decideRoute("I need to do some research on this topic")
        
        assertEquals("scout", decision.moduleId, "Research keyword should route to scout")
    }

    @Test
    fun decideRoute_codeKeyword_routesToForge() {
        val service = createService()
        
        val decision = service.decideRoute("Help me with this code")
        
        assertEquals("forge", decision.moduleId, "Code keyword should route to forge")
    }

    @Test
    fun decideRoute_scheduleKeyword_routesToAtlas() {
        val service = createService()
        
        val decision = service.decideRoute("What's on my schedule today?")
        
        assertEquals("atlas", decision.moduleId, "Schedule keyword should route to atlas")
    }

    @Test
    fun decideRoute_sleepScoreCompound_routesToSoma() {
        val service = createService()
        
        val decision = service.decideRoute("What was my sleep score last night?")
        
        assertEquals("soma", decision.moduleId, "Sleep score compound should route to soma")
    }

    @Test
    fun decideRoute_energyPlanCompound_routesToAtlas() {
        val service = createService()
        
        val decision = service.decideRoute("Create an energy plan for me")
        
        assertEquals("atlas", decision.moduleId, "Energy plan compound should route to atlas")
    }

    // ═══════════════════════════════════════════════════════════════════════════════════
    // Case insensitivity tests
    // ═══════════════════════════════════════════════════════════════════════════════════

    @Test
    fun decideRoute_caseInsensitive_workout() {
        val service = createService()
        
        val decision1 = service.decideRoute("WORKOUT")
        val decision2 = service.decideRoute("Workout")
        val decision3 = service.decideRoute("workout")
        
        assertEquals("titan", decision1.moduleId, "Uppercase WORKOUT should route to titan")
        assertEquals("titan", decision2.moduleId, "Mixed case Workout should route to titan")
        assertEquals("titan", decision3.moduleId, "Lowercase workout should route to titan")
    }

    @Test
    fun decideRoute_caseInsensitive_anxiety() {
        val service = createService()
        
        val decision = service.decideRoute("ANXIETY is overwhelming me")
        
        assertEquals("agnes", decision.moduleId, "Uppercase ANXIETY should route to agnes")
    }

    // ═══════════════════════════════════════════════════════════════════════════════════
    // getRoute tests
    // ═══════════════════════════════════════════════════════════════════════════════════

    @Test
    fun getRoute_validModuleId_returnsRoute() {
        val service = createService()
        
        assertEquals("titan", service.getRoute("titan"), "Should return route for titan")
        assertEquals("agnes", service.getRoute("agnes"), "Should return route for agnes")
        assertEquals("ledger", service.getRoute("ledger"), "Should return route for ledger")
        assertEquals("atlas", service.getRoute("atlas"), "Should return route for atlas")
    }

    @Test
    fun getRoute_invalidModuleId_returnsInput() {
        val service = createService()
        
        assertEquals("unknown", service.getRoute("unknown"), "Should return input for unknown module")
    }

    // ═══════════════════════════════════════════════════════════════════════════════════
    // Confidence score tests
    // ═══════════════════════════════════════════════════════════════════════════════════

    @Test
    fun decideRoute_confidenceIncreasesWithScore() {
        val service = createService()
        
        // Single keyword
        val singleKeyword = service.decideRoute("workout")
        
        // Multiple keywords
        val multipleKeywords = service.decideRoute("workout training gym strength")
        
        assertTrue(
            multipleKeywords.confidence >= singleKeyword.confidence,
            "Multiple keyword matches should have equal or higher confidence"
        )
    }

    @Test
    fun decideRoute_confidenceCappedAt92() {
        val service = createService()
        
        // Many keywords to try to exceed cap
        val manyKeywords = service.decideRoute(
            "workout training gym strength routine fitness recovery fatigue lab bloodwork"
        )
        
        assertTrue(manyKeywords.confidence <= 0.92, "Confidence should be capped at 0.92")
    }

    @Test
    fun decideRoute_defaultFallbackHasLowConfidence() {
        val service = createService()
        
        val decision = service.decideRoute("hello there friend")
        
        assertEquals(0.45, decision.confidence, "Default fallback should have 0.45 confidence")
    }

    @Test
    fun parseCommand_extractsStructuredScheduleIntent() {
        val service = createService()
        val envelope = service.parseCommand("Schedule deep work at 1430 tomorrow")

        assertEquals("schedule_item", envelope.intents.first().intentType)
        assertEquals("atlas", envelope.sharedRouteHints.first().moduleId)
        assertTrue(envelope.temporalReferences.isNotEmpty())
    }

    @Test
    fun decideRoute_consultativeMentionStaysWithNexus() {
        val service = createService()
        val parsed = service.parseCommand("Ask Soma whether tomorrow should be a rest day")

        val decision = service.decideRoute("Ask Soma whether tomorrow should be a rest day", parsedCommand = parsed)

        assertEquals("nexus", decision.moduleId)
        assertTrue(decision.rationale.startsWith("mention:consult:"))
    }

    @Test
    fun decideRoute_ownershipMentionDelegatesToMentionedModule() {
        val service = createService()
        val parsed = service.parseCommand("Delegate to Atlas and plan my day tomorrow")

        val decision = service.decideRoute("Delegate to Atlas and plan my day tomorrow", parsedCommand = parsed)

        assertEquals("atlas", decision.moduleId)
        assertTrue(decision.rationale.startsWith("mention:ownership:"))
    }
}
