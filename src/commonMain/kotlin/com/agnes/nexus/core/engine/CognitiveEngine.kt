package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.model.GlobalSoul
import com.agnes.nexus.core.domain.models.Message
import com.agnes.nexus.core.domain.models.NeuralStateVector
import com.agnes.nexus.core.domain.models.ActionCall
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow

/**
 * Sovereign Cognitive Engine - Platform-independent AI orchestration.
 * Enhanced with Delta Emission logic from Nexus React 19 SPA.
 */
class CognitiveEngine(
    private val llmProvider: LlmProvider,
    private val personaFactory: PersonaFactory,
    private val sanitizer: LlmSanitizer
) {
    /**
     * Executes a module conversation with streaming and delta emission.
     * Only emits NEW public text to the flow during streaming.
     */
    fun chat(
        moduleId: String,
        userMessage: String,
        history: List<Message>,
        nsv: NeuralStateVector,
        identity: UserIdentity,
        memoryContext: List<String> = emptyList(),
        longTermSummary: String = "",
        moduleContext: Map<String, Any?> = emptyMap(),
        imageContent: String? = null,
        globalSoul: GlobalSoul? = null
    ): Flow<AgentResponse> = flow {
        val baseSystemPrompt = personaFactory.assemble(moduleId, identity, nsv, moduleContext, longTermSummary, globalSoul)
        
        // 1. Build optimized cognitive context
        val cognitiveContext = MemoryManager.buildContext(
            baseSystemPrompt,
            memoryContext,
            longTermSummary,
            history
        )

        // 2. Format final system prompt
        val finalSystemPrompt = MemoryManager.formatSystemPrompt(cognitiveContext)
        
        var rawAccumulated = ""
        var publicTextAccumulated = ""

        llmProvider.stream(finalSystemPrompt, cognitiveContext.activeMessages, userMessage, imageContent).collect { chunk ->
            rawAccumulated += chunk
            
            // Delta emission logic: only emit NEW public text
            val sanitized = sanitizer.sanitize(rawAccumulated, retainSpacings = true)
            val nextPublicTotal = sanitized.publicText
            
            val delta = if (nextPublicTotal.length > publicTextAccumulated.length) {
                nextPublicTotal.substring(publicTextAccumulated.length)
            } else {
                ""
            }

            if (delta.isNotEmpty() || sanitized.isThinking) {
                emit(AgentResponse(
                    content = delta,
                    isStreaming = true,
                    internalThoughts = sanitized.internalThoughts,
                    isThinking = sanitized.isThinking
                ))
                publicTextAccumulated = nextPublicTotal
            }
        }

        // Final result with extracted actions and mutations
        val finalResult = sanitizer.parseFinal(rawAccumulated)
        val extractedMutations = sanitizer.parseMutations(rawAccumulated)
        val cleanedContent = sanitizer.stripMutationTags(finalResult.content)
        emit(AgentResponse(
            content = cleanedContent,
            internalThoughts = finalResult.thoughts,
            actions = finalResult.actions,
            mutations = extractedMutations,
            isStreaming = false,
            isThinking = false
        ))
    }

    /**
     * Full-orchestration variant of [chat] with pre-resolved memory context.
     *
     * Memory retrieval is performed by the caller before invoking this method.
     * The [memoryFacts] list is passed directly as [memoryContext] to [chat],
     * which hands them to [MemoryManager] alongside any [longTermSummary].
     *
     * All other behaviour (PersonaFactory, MemoryManager, LlmProvider, LlmSanitizer) is
     * identical to [chat].
     */
    suspend fun chatWithMemory(
        moduleId: String,
        userMessage: String,
        history: List<Message>,
        nsv: NeuralStateVector,
        identity: UserIdentity,
        moduleContext: Map<String, Any?> = emptyMap(),
        longTermSummary: String = "",
        globalSoul: GlobalSoul? = null,
        memoryFacts: List<String> = emptyList(),
    ): Flow<AgentResponse> {
        return chat(
            moduleId = moduleId,
            userMessage = userMessage,
            history = history,
            nsv = nsv,
            identity = identity,
            memoryContext = memoryFacts,
            longTermSummary = longTermSummary,
            moduleContext = moduleContext,
            globalSoul = globalSoul,
        )
    }
}

data class AgentResponse(
    val content: String,
    val internalThoughts: String? = null,
    val actions: List<ActionCall> = emptyList(),
    val mutations: List<ExtractedMutation> = emptyList(),
    val isStreaming: Boolean = false,
    val isThinking: Boolean = false
)
