package com.agnes.nexus.core.domain.services.titan

import com.agnes.nexus.core.domain.models.TrainerProfile
import kotlin.test.Test
import kotlin.test.assertTrue

class TitanPromptBuilderTest {

    private fun emptyProfile(): TrainerProfile = TrainerProfile(
        onboardingComplete = false,
        privacyLevel = "basic",
        trackingLevel = "standard"
    )

    @Test
    fun trainingPrompt_containsKeySectionsInOrder() {
        val profile = emptyProfile()
        val prompt = TitanPromptBuilder.buildTitanSessionPrompt(profile)

        val formatIdx = prompt.indexOf("[FORMAT PROTOCOL - MANDATORY]")
        val identityIdx = prompt.indexOf("[IDENTITY]")
        val modeIdx = prompt.indexOf("[MODE: TRAINING]")
        val profileIdx = prompt.indexOf("[PROFILE CONTEXT]")
        val guidelinesIdx = prompt.indexOf("[GUIDELINES]")
        val actionsIdx = prompt.indexOf("[AVAILABLE ACTIONS]")
        val routineInstructionsIdx = prompt.indexOf("[ROUTINE INSTRUCTIONS]")

        assertTrue(formatIdx >= 0)
        assertTrue(identityIdx > formatIdx)
        assertTrue(modeIdx > identityIdx)
        assertTrue(profileIdx > modeIdx)
        assertTrue(guidelinesIdx > profileIdx)
        assertTrue(actionsIdx > modeIdx)
        assertTrue(routineInstructionsIdx > actionsIdx)
    }

    @Test
    fun trainingPrompt_includesRecoveryBlockWhenScoreProvided() {
        val profile = emptyProfile()
        val prompt = TitanPromptBuilder.buildTitanSessionPrompt(
            profile,
            TitanSessionPromptOptions(recoveryScore = 2)
        )

        assertTrue(prompt.contains("RECOVERY AWARENESS"))
        assertTrue(prompt.contains("Recovery Score: 2/10"))
        assertTrue(prompt.contains("LOW RECOVERY"))
        assertTrue(
            prompt.contains(
                """<action type="self_clearance_check">{"activity":"high_intensity","recoveryScore":2}</action>"""
            )
        )
    }

    @Test
    fun medicalPrompt_usesMedicalModeAndMedicalRules() {
        val profile = emptyProfile()
        val prompt = TitanPromptBuilder.buildTitanSessionPrompt(
            profile,
            TitanSessionPromptOptions(mode = "medical")
        )

        assertTrue(prompt.contains("[MODE: MEDICAL]"))
        assertTrue(prompt.contains("BIOMARKER SUMMARY:"))
        assertTrue(prompt.contains("[MEDICAL RULES]"))
        assertTrue(prompt.contains("⚕ MEDICAL DISCLAIMER"))
        assertTrue(prompt.contains("""<action type="commit_biomarker">{"name":"hrv""""))
        assertTrue(
            prompt.contains(
                """- Parse lab report: <action type="parse_lab_report">{"panel":"cbc","findings":["..."],"flags":["..."]}</action"""
            )
        )
    }

    @Test
    fun trainingPrompt_includesExpectedActionGuidanceSections() {
        val profile = emptyProfile()
        val prompt = TitanPromptBuilder.buildTitanSessionPrompt(profile)

        assertTrue(prompt.contains("[AVAILABLE ACTIONS]"))
        assertTrue(prompt.contains("""- Update routine: <action type="update_routine">{"routines":[...]}</action>"""))
        assertTrue(prompt.contains("""- Log workout session: <action type="log_workout_session">{"routineId":"...","routineName":"...","date":"YYYY-MM-DD","startedAt":"...","completedAt":"...","rpe":7,"notes":"...","status":"completed","exercises":[{"exerciseName":"Squat","plannedSets":4,"plannedReps":"8","sets":[{"setNumber":1,"weight":100,"repsCompleted":8,"completed":true}]}]}</action>"""))
        assertTrue(prompt.contains("[ROUTINE INSTRUCTIONS]"))
    }
}

