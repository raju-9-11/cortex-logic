package com.agnes.ara.core.domain.models

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class NotificationPresetRegistryTest {

    @Test
    fun `preset ids match web truth source`() {
        val presetIds = NotificationPresetRegistry.buildAllPresets(
            nowIso = "2026-01-01T00:00:00Z",
            timezone = "UTC"
        ).map { it.scheduleId }

        val expected = listOf(
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

        assertEquals(expected, presetIds)
    }

    @Test
    fun `all presets include recurrence and message templates`() {
        val presets = NotificationPresetRegistry.buildAllPresets(
            nowIso = "2026-01-01T00:00:00Z",
            timezone = "UTC"
        )

        assertTrue(presets.isNotEmpty())
        presets.forEach { preset ->
            assertTrue(preset.config.messageTemplate.title.isNotBlank())
            assertTrue(preset.config.messageTemplate.body.isNotBlank())
            assertTrue(preset.config.timezone.isNotBlank())
        }
    }
}
