package com.agnes.nexus.core.engine.personas

/**
 * Simple holder for persona prompt text and optional overlays.
 * The intent is to mirror the web persona catalog while keeping
 * the structure lightweight for KMP usage.
 */
data class PersonaPrompt(
    val systemPrompt: String,
    val overlays: Map<String, String> = emptyMap()
)
