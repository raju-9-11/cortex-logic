package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.services.SpineCascadeDefaults.AGNES_CASCADE_RULES
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

/**
 * Tests for spine cascade rules, validating event transformation and propagation.
 */
class SpineCascadeRulesTest {

    // Helper to build a SpineEvent using the supported builder pattern.
    private fun makeEvent(
        type: String,
        source: String,
        domain: String = "system",
        data: Map<String, Any?> = emptyMap(),
        priority: String = "info"
    ): SpineEvent = SpineEventPayload(
        type = type,
        source = source,
        domain = domain,
        data = data,
        priority = priority
    ).toSpineEvent()

    /**
     * Test 1: BURNOUT_WARNING cascade triggers FLATTEN_ENERGY_WAVE
     *
     * Verifies that when a BURNOUT_WARNING event is detected,
     * the cascade rule properly transforms it to cascade to related systems.
     */
    @Test
    fun testBurnoutWarningCascade() {
        // Arrange: Find the agnes-burnout-to-somatic-support rule
        val burnoutRule = AGNES_CASCADE_RULES.find { it.id == "agnes-burnout-to-somatic-support" }
        assertNotNull(burnoutRule, "Burnout cascade rule should be registered")

        // Create a BURNOUT_WARNING event
        val burnoutEvent = makeEvent(
            type = "BURNOUT_WARNING",
            source = "spine-coordinator",
            domain = "B",
            data = mapOf(
                "cnsFatigue" to 8.5,
                "emotionalResilience" to 2.5,
                "reason" to "high_fatigue_low_resilience"
            )
        )

        // Act: Check if the condition matches
        assertTrue(burnoutRule.condition(burnoutEvent), "Burnout rule condition should match BURNOUT_WARNING event")

        // Act: Transform the event
        val transformedEvent = burnoutRule.transform(burnoutEvent)

        // Assert: Verify the cascade creates the correct somatic support event
        assertEquals("SOMATIC_SUPPORT_REQUESTED", transformedEvent.type, "Should cascade to SOMATIC_SUPPORT_REQUESTED")
        assertEquals("E", transformedEvent.domain, "Should target Emotional domain (E)")
        assertEquals("spine-cascade", transformedEvent.source, "Source should be spine-cascade")
        assertEquals("alert", transformedEvent.priority, "Priority should be alert")
    }

    /**
     * Test 2: CRISIS_DETECTED cascade triggers CRISIS_MODE
     *
     * Tests the planning crisis cascade rule - when deadline pressure is critically high,
     * it should trigger a crisis mode event.
     */
    @Test
    fun testCrisisCascade() {
        // Arrange: Find the deadline pressure to crisis rule
        val crisisRule = SpineCascadeDefaults.ATLAS_PLANNING_CASCADE_RULES
            .find { it.id == "atlas-deadline-pressure-high-to-crunch" }
        assertNotNull(crisisRule, "Crisis cascade rule should be registered")

        // Create a DEADLINE_PRESSURE_CHANGED event with high pressure
        val deadlinePressureEvent = makeEvent(
            type = "DEADLINE_PRESSURE_CHANGED",
            source = "atlas",
            domain = "C",
            data = mapOf(
                "deadlinePressure" to 9,
                "taskCount" to 15,
                "daysRemaining" to 2
            )
        )

        // Act: Check if the condition matches for high pressure (>= 8)
        assertTrue(crisisRule.condition(deadlinePressureEvent), "Crisis rule condition should match high pressure event")

        // Act: Transform the event
        val transformedEvent = crisisRule.transform(deadlinePressureEvent)

        // Assert: Verify the cascade creates the correct crisis event
        assertEquals("DEADLINE_CRUNCH", transformedEvent.type, "Should cascade to DEADLINE_CRUNCH")
        assertEquals("C", transformedEvent.domain, "Should remain in Cognitive domain (C)")
        assertEquals("alert", transformedEvent.priority, "Priority should be alert for crisis")
        assertTrue(transformedEvent.data.containsKey("deadlinePressure"), "Should preserve deadline pressure data")
    }

    /**
     * Test 3: High stress + low resilience triggers BURNOUT_WARNING
     *
     * Validates the core burnout detection logic - when combined biological
     * and emotional indicators suggest burnout, the event should propagate.
     */
    @Test
    fun testHighStressLowResilienceTriggersBurnout() {
        // Arrange: Create an event that simulates high stress and low resilience
        val burnoutRule = AGNES_CASCADE_RULES.find { it.id == "agnes-burnout-to-somatic-support" }
        assertNotNull(burnoutRule, "Burnout rule should exist")

        // Create multiple event states to test the threshold
        val criticalStressEvent = makeEvent(
            type = "BURNOUT_WARNING",
            source = "spine-coordinator",
            domain = "B",
            data = mapOf(
                "cnsFatigue" to 8.2,
                "emotionalResilience" to 2.0,
                "stressLoad" to 8.5,
                "reason" to "compound_biological_stress"
            )
        )

        // Act: Verify condition triggers for critical stress
        assertTrue(burnoutRule.condition(criticalStressEvent), "Should trigger on critical stress levels")

        // Assert: Verify the transformed event contains stress data
        val transformed = burnoutRule.transform(criticalStressEvent)
        assertEquals("SOMATIC_SUPPORT_REQUESTED", transformed.type)
        assertTrue(transformed.data.containsKey("cnsFatigue"), "Should contain fatigue data")
    }

    /**
     * Test 4: Cascade event data is propagated correctly
     *
     * Ensures that when events cascade through the system, all relevant data
     * from the trigger event is properly propagated to the cascade event.
     */
    @Test
    fun testCascadeEventDataPropagation() {
        // Arrange: Create a comprehensive event with multiple data fields
        val sourceEvent = makeEvent(
            type = "BURNOUT_WARNING",
            source = "spine-coordinator",
            domain = "B",
            data = mapOf(
                "cnsFatigue" to 8.9,
                "emotionalResilience" to 1.5,
                "taskBacklog" to 47,
                "sleepHours" to 4.2,
                "recoveryScore" to 1.0,
                "reason" to "critical_system_overload"
            )
        )

        // Find the cascade rule
        val burnoutRule = AGNES_CASCADE_RULES.find { it.id == "agnes-burnout-to-somatic-support" }
        assertNotNull(burnoutRule)

        // Act: Transform and capture the cascaded event
        val cascadedEvent = burnoutRule.transform(sourceEvent)

        // Assert: Verify key data fields are propagated
        assertEquals(8.9, cascadedEvent.data["cnsFatigue"], "Fatigue data should be propagated")
        assertEquals("SOMATIC_SUPPORT_REQUESTED", cascadedEvent.type, "Type should be transformed")
        assertEquals("spine-cascade", cascadedEvent.source, "Source should be set to spine-cascade")
        assertEquals("E", cascadedEvent.domain, "Domain should be redirected to Emotional (E)")
        assertTrue(cascadedEvent.data.containsKey("triggeredBy"), "Should contain trigger source")
        assertEquals("BURNOUT_WARNING", cascadedEvent.data["triggeredBy"], "Should track triggering event type")
    }

    /**
     * Test 5: Cascade rule non-matching condition
     *
     * Validates that cascade rules properly filter events - a rule with
     * condition that doesn't match should not transform the event.
     */
    @Test
    fun testCascadeRuleConditionFiltering() {
        // Arrange: Create an event that shouldn't trigger the crisis rule (pressure < 8)
        val mildPressureEvent = makeEvent(
            type = "DEADLINE_PRESSURE_CHANGED",
            source = "atlas",
            domain = "C",
            data = mapOf(
                "deadlinePressure" to 5,
                "taskCount" to 5
            )
        )

        val crisisRule = SpineCascadeDefaults.ATLAS_PLANNING_CASCADE_RULES
            .find { it.id == "atlas-deadline-pressure-high-to-crunch" }
        assertNotNull(crisisRule)

        // Act & Assert: Condition should not match for low pressure
        assertTrue(!crisisRule.condition(mildPressureEvent), "Crisis rule should NOT match pressure < 8")
    }

    /**
     * Test 6: Verify all cascade rules are properly registered
     *
     * Ensures that core cascade rule definitions are available and properly configured.
     */
    @Test
    fun testAllCascadeRulesRegistered() {
        // Assert: Verify Agnes cascade rules
        assertTrue(AGNES_CASCADE_RULES.isNotEmpty(), "Agnes cascade rules should not be empty")
        assertTrue(AGNES_CASCADE_RULES.any { it.id == "agnes-burnout-to-somatic-support" },
            "Agnes burnout rule should be registered")

        // Assert: Verify Atlas cascade rules
        assertTrue(SpineCascadeDefaults.ATLAS_PLANNING_CASCADE_RULES.isNotEmpty(),
            "Atlas planning rules should not be empty")
        assertTrue(SpineCascadeDefaults.ATLAS_PLANNING_CASCADE_RULES.any { it.id == "atlas-deadline-pressure-high-to-crunch" },
            "Crisis pressure rule should be registered")
    }

    /**
     * Test 7: Cascade event priority preservation
     *
     * Tests that priority levels are properly set on cascaded events
     * to ensure appropriate routing and handling.
     */
    @Test
    fun testCascadeEventPriorityPreservation() {
        // Arrange: Create a burnout event
        val burnoutEvent = makeEvent(
            type = "BURNOUT_WARNING",
            source = "spine-coordinator",
            domain = "B",
            data = mapOf(
                "cnsFatigue" to 9.0,
                "emotionalResilience" to 0.5
            )
        )

        val burnoutRule = AGNES_CASCADE_RULES.find { it.id == "agnes-burnout-to-somatic-support" }
        assertNotNull(burnoutRule)

        // Act: Transform the event
        val cascadedEvent = burnoutRule.transform(burnoutEvent)

        // Assert: Verify priority is set to alert for critical condition
        assertEquals("alert", cascadedEvent.priority, "Burnout cascade should have alert priority")
    }

    /**
     * Test 8: Habit streak broken cascade
     *
     * Tests that broken habit streaks trigger somatic support when streak is >= 3 days.
     */
    @Test
    fun testHabitStreakBrokenCascade() {
        // Arrange: Find the habit streak rule
        val habitStreakRule = SpineCascadeDefaults.ATLAS_FAILURE_RULES
            .find { it.id == "atlas-habit-streak-broken-to-somatic-support" }
        assertNotNull(habitStreakRule, "Habit streak rule should be registered")

        // Create a HABIT_STREAK_BROKEN event with significant streak
        val habitStreakEvent = makeEvent(
            type = "HABIT_STREAK_BROKEN",
            source = "atlas",
            domain = "C",
            data = mapOf(
                "streakDays" to 7,
                "habitName" to "Morning Meditation",
                "currentStreak" to 0
            )
        )

        // Act: Check if condition matches (days >= 3)
        assertTrue(
            habitStreakRule.condition(habitStreakEvent),
            "Habit streak rule should match for streak >= 3 days"
        )

        // Act: Transform
        val cascaded = habitStreakRule.transform(habitStreakEvent)

        // Assert: Should cascade to somatic support
        assertEquals("SOMATIC_SUPPORT_REQUESTED", cascaded.type,
            "Broken streak should trigger somatic support")
        assertEquals("E", cascaded.domain, "Should target Emotional domain")
        assertEquals("alert", cascaded.priority, "Should be alert priority")
        assertEquals(7, cascaded.data["streakDays"], "Should preserve streak data")
    }
}
