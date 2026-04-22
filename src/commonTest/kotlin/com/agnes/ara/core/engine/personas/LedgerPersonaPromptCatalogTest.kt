package com.agnes.ara.core.engine.personas

import kotlin.test.Test
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class LedgerPersonaPromptCatalogTest {
    @Test
    fun `ledger prompt exists`() {
        val prompt = PersonaPromptCatalog.promptFor("ledger")
        assertNotNull(prompt, "Expected PersonaPromptCatalog to provide a ledger prompt")
    }

    @Test
    fun `ledger prompt includes investment advice constraint`() {
        val prompt = PersonaPromptCatalog.promptFor("ledger")
        assertNotNull(prompt)

        val system = prompt!!.systemPrompt
        assertTrue(system.contains("NEVER provide specific investment advice"), "Ledger prompt should forbid investment advice")
    }
}

