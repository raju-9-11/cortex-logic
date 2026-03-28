package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.models.FieldDefinition
import com.agnes.nexus.core.domain.models.ModuleOnboardingSpec
import com.agnes.nexus.core.domain.models.Message
import com.agnes.nexus.core.engine.LlmProvider
import kotlinx.coroutines.flow.fold
import kotlinx.serialization.json.*
import kotlinx.serialization.builtins.ListSerializer

/**
 * Generates dynamic onboarding schemas using LLM.
 * Falls back to basic schema if LLM fails or is offline.
 */
class DynamicSchemaEngine(
    private val llmProvider: LlmProvider,
    private val settings: NexusSettings
) {
    private val json = Json { ignoreUnknownKeys = true }

    /**
     * Builds the field definitions for onboarding.
     * Uses cache if available, otherwise queries the LLM to inflate the spec.
     */
    suspend fun generateSchema(spec: ModuleOnboardingSpec): Pair<List<FieldDefinition>, List<String>> {
        val cacheKey = "onboarding_schema_${spec.moduleId}_v2"

        // 1. Check cache
        try {
            val cachedStr = settings.getString(cacheKey, null)
            if (!cachedStr.isNullOrBlank()) {
                val cachedArray = json.decodeFromString<JsonArray>(cachedStr)
                if (cachedArray.isNotEmpty()) {
                    val fields = cachedArray.map { json.decodeFromJsonElement<FieldDefinition>(it) }
                    val constrained = applySpecConstraints(fields, spec)
                    return Pair(constrained, extractSections(constrained))
                }
            }
        } catch (e: Exception) {
            // Cache miss or parse error
        }

        // 2. Query LLM
        return try {
            val systemPrompt = buildSchemaPrompt(spec)
            val responseFlow = llmProvider.stream(
                systemPrompt = systemPrompt,
                history = emptyList(),
                userMessage = "Generate the JSON schema for this module's intake form."
            )
            
            // Collect the streamed chunks into a full string
            val rawResponse = responseFlow.fold(StringBuilder()) { acc, chunk -> acc.append(chunk); acc }.toString()
            
            // Extract JSON array from the response (in case of markdown blocks)
            val jsonContent = extractJsonArray(rawResponse)
            val llmFields = json.decodeFromString<List<FieldDefinition>>(jsonContent)

            if (llmFields.isEmpty()) throw Exception("Empty schema from LLM")

            // Ensure canonical IDs are present
            val resultIds = llmFields.map { it.id }.toSet()
            val missingFields = spec.dataPoints.filter { !resultIds.contains(it.id) }.map { dp ->
                FieldDefinition(
                    id = dp.id,
                    name = dp.label,
                    type = dp.type,
                    required = dp.required,
                    metadata = JsonObject(mapOf(
                        "section" to JsonPrimitive(llmFields.firstOrNull()?.metadata?.get("section")?.let { if (it is JsonPrimitive) it.content else "General" } ?: "General"),
                        "placeholder" to JsonPrimitive(dp.label)
                    ))
                )
            }

            val merged = llmFields + missingFields
            val constrained = applySpecConstraints(merged, spec)
            val sections = extractSections(constrained)

            // Cache the result
            try {
                settings.putString(cacheKey, json.encodeToString(ListSerializer(FieldDefinition.serializer()), constrained))
            } catch (e: Exception) {
                // Ignore cache write failures
            }

            Pair(constrained, sections)
        } catch (e: Exception) {
            // 3. Fallback
            val fallback = buildFallbackFields(spec)
            Pair(fallback, extractSections(fallback))
        }
    }

    private fun buildSchemaPrompt(spec: ModuleOnboardingSpec): String {
        val requiredIds = spec.dataPoints.joinToString("\n") { d ->
            "- ${d.id} (${d.type}): ${d.label}${if (d.hint != null) ". Hint: ${d.hint}" else ""}"
        }

        return """
            You are generating an intake form for ${spec.displayName} onboarding.
            Goal: ${spec.goal}
            Context: ${spec.context}

            Required canonical field IDs (use these EXACT IDs — do not rename them):
            $requiredIds

            You may add 0–2 supplementary fields ONLY if they would meaningfully improve the intake. Do not duplicate canonical fields.

            For each field produce a JSON object with these keys:
              id (string), name (string), type (one of: TEXT|NUMBER|SELECT|MULTI_SELECT|DATE|TEXTAREA|BOOLEAN|RANGE),
              description (string, optional), required (boolean),
              options (array of {value, label}, required for select/multiSelect),
              metadata: { section (string, group name for multi-section layout), placeholder (string), helpText (string, optional) }

            Group related fields under 2–4 section names via the metadata.section property. Keep section names short (1–2 words, Title Case).

            Return ONLY a valid JSON array of FieldDefinition objects. No markdown, no explanation.
        """.trimIndent()
    }

    private fun buildFallbackFields(spec: ModuleOnboardingSpec): List<FieldDefinition> {
        return spec.dataPoints.map { dp ->
            val metadata = mutableMapOf<String, JsonElement>(
                "section" to JsonPrimitive("General"),
                "placeholder" to JsonPrimitive(dp.hint ?: dp.label),
                "helpText" to (dp.hint?.let { JsonPrimitive(it) } ?: JsonNull)
            )
            if (!dp.autocomplete.isNullOrEmpty()) {
                metadata["autocomplete"] = buildJsonArray { dp.autocomplete.forEach { add(it) } }
            }

            FieldDefinition(
                id = dp.id,
                name = dp.label,
                type = dp.type,
                required = dp.required,
                options = dp.options,
                metadata = JsonObject(metadata)
            )
        }
    }

    private fun applySpecConstraints(fields: List<FieldDefinition>, spec: ModuleOnboardingSpec): List<FieldDefinition> {
        return fields.map { f ->
            val dp = spec.dataPoints.find { it.id == f.id }
            if (dp == null) f else {
                val updatedMetadata = f.metadata?.toMutableMap() ?: mutableMapOf()
                if (!dp.autocomplete.isNullOrEmpty()) {
                    updatedMetadata["autocomplete"] = buildJsonArray { dp.autocomplete.forEach { add(it) } }
                }
                
                f.copy(
                    type = dp.type,
                    options = dp.options ?: f.options,
                    metadata = if (updatedMetadata.isNotEmpty()) JsonObject(updatedMetadata) else f.metadata
                )
            }
        }
    }

    private fun extractSections(fields: List<FieldDefinition>): List<String> {
        val seen = mutableSetOf<String>()
        for (f in fields) {
            val section = f.metadata?.get("section")?.let { if (it is JsonPrimitive) it.content else "General" } ?: "General"
            seen.add(section)
        }
        val list = seen.toList()
        return list.ifEmpty { listOf("General") }
    }

    private fun extractJsonArray(raw: String): String {
        val start = raw.indexOf('[')
        val end = raw.lastIndexOf(']')
        if (start != -1 && end != -1 && end > start) {
            return raw.substring(start, end + 1)
        }
        return raw
    }
}
