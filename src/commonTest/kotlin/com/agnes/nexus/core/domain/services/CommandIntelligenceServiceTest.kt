package com.agnes.nexus.core.domain.services

import kotlinx.datetime.Instant
import kotlinx.serialization.json.buildJsonArray
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.put
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class CommandIntelligenceServiceTest {

    private val service = CommandIntelligenceService
    private val fixedNow = Instant.parse("2026-03-24T13:00:00Z")

    @Test
    fun parse_multiIntentPlanning_keepsIntentOrderAndTemporal() {
        val result = service.parse(
            rawInput = "plan my day tomorrow, update tomorrow to rest, schedule cooking at 1100 tomorrow",
            sourceModuleId = "agnes",
            timezone = "UTC",
            now = fixedNow
        )

        assertEquals(3, result.intents.size)
        assertEquals(listOf("plan_day", "recovery_day", "schedule_item"), result.intents.map { it.intentType })
        assertEquals("atlas", result.sharedRouteHints.first().moduleId)
        assertTrue(result.intents[1].capabilities.contains("recovery-planning"))
        assertEquals("cooking", result.intents[2].entities.title)
        assertEquals("11:00", result.intents[2].entities.timeText)
        assertTrue(result.temporalReferences.any { it.relation == "tomorrow" })
    }

    @Test
    fun parse_emotionalSupportRoutesToAgnes() {
        val result = service.parse(
            rawInput = "I feel anxious about my relationship",
            sourceModuleId = "atlas",
            timezone = "UTC",
            now = fixedNow
        )

        assertEquals(1, result.intents.size)
        assertEquals("emotional_support", result.intents.first().intentType)
        assertEquals("agnes", result.sharedRouteHints.first().moduleId)
    }

    @Test
    fun parse_vocativeMentionTracksMentionSeparately() {
        val result = service.parse(
            rawInput = "Agnes, I feel anxious about my relationship",
            sourceModuleId = "nexus",
            timezone = "UTC",
            now = fixedNow
        )

        assertEquals(listOf("agnes"), result.mentionedModuleIds)
        assertEquals("vocative", result.mentions?.first()?.disposition)
        assertEquals("agnes", result.sharedRouteHints.first().moduleId)
    }

    @Test
    fun parse_detectsConsultativeAndOwnershipMentions() {
        val consult = service.parse(
            rawInput = "Ask Soma whether tomorrow should be a rest day",
            sourceModuleId = "nexus",
            timezone = "UTC",
            now = fixedNow
        )
        val ownership = service.parse(
            rawInput = "Delegate to Atlas and plan my day tomorrow",
            sourceModuleId = "nexus",
            timezone = "UTC",
            now = fixedNow
        )

        assertEquals("consultative", consult.mentions?.first()?.disposition)
        assertEquals("ownership", ownership.mentions?.first()?.disposition)
    }

    @Test
    fun parseWithLlm_acceptsLlmSchemaAndNormalizesFields() = kotlinx.coroutines.test.runTest {
        val result = service.parseWithLlm(
            rawInput = "schedule cooking 1100 tomorrow",
            sourceModuleId = "nexus",
            timezone = "UTC",
            now = fixedNow
        ) { _, _ ->
            buildJsonObject {
                put("confidence", 0.91)
                put("intents", buildJsonArray {
                    add(buildJsonObject {
                        put("rawSegment", "schedule cooking 1100 tomorrow")
                        put("intentType", "schedule_item")
                        put("verb", "schedule")
                        put("mutatesState", true)
                        put("confidence", 0.93)
                        put("capabilities", buildJsonArray { add(JsonPrimitive("schedule-mutation")); add(JsonPrimitive("daily-planning")) })
                        put("candidateModules", buildJsonArray { add(JsonPrimitive("atlas")) })
                        put("routeHints", buildJsonArray {
                            add(buildJsonObject {
                                put("moduleId", "atlas")
                                put("confidence", 0.89)
                                put("reason", "scheduled planning item")
                            })
                        })
                        put("entities", buildJsonObject {
                            put("title", "cooking")
                            put("dateText", "2026-03-25")
                            put("timeText", "1100")
                        })
                    })
                })
            }
        }

        assertEquals("llm-v1", result.parserVersion)
        assertEquals(1, result.intents.size)
        assertEquals("schedule_item", result.intents.first().intentType)
        assertEquals("11:00", result.intents.first().entities.timeText)
        assertEquals("atlas", result.sharedRouteHints.first().moduleId)
        assertTrue(result.temporalReferences.any { it.isoDate == "2026-03-25" && it.time24 == "11:00" })
    }

    @Test
    fun parseWithLlm_fallsBackWhenGeneratorFails() = kotlinx.coroutines.test.runTest {
        val result = service.parseWithLlm(
            rawInput = "plan my day tomorrow",
            sourceModuleId = "nexus",
            timezone = "UTC",
            now = fixedNow
        ) { _, _ ->
            throw IllegalStateException("forced")
        }

        assertEquals("phase1-v1", result.parserVersion)
        assertEquals("plan_day", result.intents.first().intentType)
    }
}
