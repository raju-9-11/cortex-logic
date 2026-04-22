package com.agnes.ara.core.domain.models

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class ParityTemplateManifestTest {

    @Test
    fun `manifest includes expected module template ids and notification presets`() {
        val manifest = ParityTemplateManifestRegistry.current()

        val expectedTemplateIds = setOf(
            "agnes",
            "atlas",
            "ledger",
            "soma",
            "titan",
            "therapy",
            "trainer"
        )
        val expectedPresetIds = listOf(
            "agnes-therapy-every-2-days",
            "titan-workout-window",
            "titan-sleep-log-evening",
            "ledger-spend-due",
            "ledger-income-due",
            "ledger-investments-due",
            "soma-vitals-morning",
            "soma-labs-monthly",
            "atlas-hourly-task-reminder",
            "atlas-evening-journal",
            "atlas-weekly-review"
        )

        assertEquals(expectedTemplateIds, manifest.moduleTemplateIds)
        assertEquals(expectedPresetIds, manifest.notificationPresetIds)
        assertTrue(manifest.version.startsWith("web-agnes-"))
    }
}
