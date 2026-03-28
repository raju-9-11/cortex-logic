package com.agnes.nexus.core.domain.services.atlas

import com.agnes.nexus.core.domain.models.*
import kotlin.test.Test
import kotlin.test.assertTrue

class AtlasPromptBuilderTest {

    private fun sampleProfile(today: String): AtlasProfile {
        val routine = AtlasRoutine(
            id = "r1",
            blocks = listOf(
                RoutineBlock(
                    id = "b1",
                    title = "Deep Work",
                    startTime = "07:00",
                    endTime = "09:00",
                    // Thursday => 4 in JS getDay (0=Sunday). Our builder maps isoDayNumber%7.
                    daysOfWeek = listOf(4),
                    category = "deep_work",
                    energyCost = 6
                )
            ),
            isActive = true
        )

        return AtlasProfile(
            onboardingComplete = true,
            goals = listOf(
                AtlasGoal(
                    id = "g1",
                    title = "Finish Guide",
                    progressPercent = 40f,
                    deadline = "2026-03-26",
                    status = "active"
                )
            ),
            tasks = listOf(
                AtlasTask(
                    id = "t1",
                    title = "Write Draft",
                    priority = 4,
                    energyCost = 5,
                    status = "active",
                    deadline = "2026-03-20"
                )
            ),
            habits = listOf(
                AtlasHabit(
                    id = "h1",
                    title = "Reading",
                    frequency = "daily",
                    targetStreak = 30,
                    currentStreak = 3,
                    bestStreak = 10,
                    status = "active"
                )
            ),
            routine = routine
        )
    }

    @Test
    fun generalPrompt_includesLiveDataMarkerAndEnergyBudgetInOrder() {
        val profile = sampleProfile("2026-03-19")
        val prompt = AtlasPromptBuilder.buildAtlasSessionPrompt(
            profile = profile,
            options = AtlasSessionPromptOptions(today = "2026-03-19")
        )

        val identityIdx = prompt.indexOf("IDENTITY:")
        val liveIdx = prompt.indexOf("[ATLAS LIVE DATA — DO NOT FABRICATE ANY VALUES BELOW]")
        val energyIdx = prompt.indexOf("ENERGY BUDGET COMPUTATION:")

        assertTrue(identityIdx >= 0)
        assertTrue(liveIdx > identityIdx)
        assertTrue(energyIdx > liveIdx)
    }

    @Test
    fun generalPrompt_includesGoalAndTaskTitles() {
        val profile = sampleProfile("2026-03-19")
        val prompt = AtlasPromptBuilder.buildAtlasSessionPrompt(
            profile = profile,
            options = AtlasSessionPromptOptions(today = "2026-03-19")
        )

        assertTrue(prompt.contains("Finish Guide"))
        assertTrue(prompt.contains("Write Draft"))
    }
}

