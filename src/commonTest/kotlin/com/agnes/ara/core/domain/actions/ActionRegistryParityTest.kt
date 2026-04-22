package com.agnes.ara.core.domain.actions

import kotlin.test.Test
import kotlin.test.assertTrue

class ActionRegistryParityTest {

    @Test
    fun agnesParityActions_arePresent() {
        val agnesActions = ActionRegistry.actions
            .filter { it.moduleId == "agnes" }
            .map { it.actionType }
            .toSet()

        val required = setOf(
            "create_emotional_support_session",
            "crisis_flag",
            "sync_vitals",
            "update_agnes_profile",
            "update_belief_graph",
            "update_emotional_resilience",
            "update_emotional_state",
            "update_mood_trend",
            "update_soul_resilience",
            "update_stress_load",
            "update_trauma_markers"
        )

        assertTrue(required.subtract(agnesActions).isEmpty(), "Missing Agnes actions in ActionRegistry")
    }
}

