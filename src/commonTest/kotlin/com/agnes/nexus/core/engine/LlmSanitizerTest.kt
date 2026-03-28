package com.agnes.nexus.core.engine

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class LlmSanitizerTest {

    private val sanitizer = LlmSanitizer()

    @Test
    fun parseActions_recoversBracketedAction() {
        val input = """Hello [action type="delegate_to_module"]{"moduleId":"agnes"} world"""
        val actions = sanitizer.parseActions(input)

        assertEquals(1, actions.size)
        assertEquals("delegate_to_module", actions.first().type)
        assertEquals("agnes", actions.first().payload["moduleId"]?.toString()?.replace("\"", ""))
    }

    @Test
    fun parseActions_recoversJsonActionWithoutTypeAttribute() {
        val input = """<action>{"type":"search_memory","payload":{"query":"sleep quality"}}</action>"""
        val actions = sanitizer.parseActions(input)

        assertEquals(1, actions.size)
        assertEquals("search_memory", actions.first().type)
    }

    @Test
    fun sanitize_stripsTechnicalFillerPrefix() {
        val result = sanitizer.sanitize("Searching Memory. Your schedule is stable.")
        assertEquals("Your schedule is stable.", result.publicText)
    }

    @Test
    fun isProviderControlOnly_detectsControlPacket() {
        assertTrue(sanitizer.isProviderControlOnly("[user interrupted]"))
        assertFalse(sanitizer.isProviderControlOnly("[user interrupted] hello"))
    }
}

