package com.agnes.ara.core.engine.personas

import kotlin.test.Test
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class SomaPersonaPromptCatalogTest {
    @Test
    fun `soma prompt exists and contains medical safety constraints`() {
        val prompt = PersonaPromptCatalog.promptFor("soma")
        assertNotNull(prompt, "Expected PersonaPromptCatalog to provide a soma prompt")

        val system = prompt!!.systemPrompt
        assertTrue(
            system.contains("NEVER provide a medical diagnosis"),
            "Soma system prompt must explicitly forbid providing medical diagnoses"
        )
    }

    @Test
    fun `soma prompt contains parse_lab_report action tag`() {
        val prompt = PersonaPromptCatalog.promptFor("soma")
        assertNotNull(prompt, "Expected PersonaPromptCatalog to provide a soma prompt")

        val system = prompt!!.systemPrompt
        assertTrue(
            system.contains("<action type=\"parse_lab_report\">"),
            "Soma system prompt must document the parse_lab_report action"
        )
    }
}

