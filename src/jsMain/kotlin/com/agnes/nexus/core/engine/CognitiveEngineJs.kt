package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.models.Message
import com.agnes.nexus.core.domain.models.MessageRole
import com.agnes.nexus.core.domain.models.NeuralStateVector
import io.ktor.client.*
import io.ktor.client.engine.js.*
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.launch
import kotlinx.serialization.json.*

/**
 * JS-facing bridge that exposes the KMP cognitive engine stack to TypeScript/React.
 *
 * ## Lifecycle
 * Call [init] once at application startup (or per user session) to wire the full
 * engine stack.  All subsequent [chat] and [generateText] calls share the same
 * [LlmClient] and [CognitiveEngine] instances.
 *
 * ## Threading model
 * Kotlin/JS is single-threaded. [GlobalScope.launch] schedules coroutines on the
 * JS event loop; no synchronisation primitives are required. The [@DelicateCoroutinesApi]
 * opt-in is acceptable here because the JS runtime has no daemon/thread-lifecycle
 * concerns that make GlobalScope dangerous on JVM/Native.
 *
 * ## Mock mode
 * Pass `isMockMode = true` (or supply no API keys) to receive canned responses.
 * Useful for UI development without incurring LLM API costs.
 *
 * ## JS export constraints
 * - No `List<>` or `Map<>` in public method signatures — all collections cross
 *   the boundary as JSON strings and are parsed on the Kotlin side.
 * - Callbacks use plain Kotlin function types, which Kotlin/JS IR compiles to
 *   callable JS objects.
 */
@OptIn(DelicateCoroutinesApi::class)
@JsExport
class CognitiveEngineJs {

    // ── Private state ─────────────────────────────────────────────────────────

    private var engine: CognitiveEngine? = null

    // Stored as LlmProvider (the interface) so generateText() can call stream()
    // without depending on the concrete LlmClient type.
    private var llmProvider: LlmProvider? = null

    private var isMock: Boolean = false

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * Initializes the full engine stack.
     *
     * Must be called before [chat] or [generateText]. Safe to call again to swap
     * API keys or switch mock mode — the previous engine is simply replaced.
     *
     * @param openrouterKey  OpenRouter API key (preferred; used when non-blank).
     * @param geminiKey      Google Gemini API key.
     * @param grokKey        xAI Grok API key.
     * @param preferredModel Model ID override, e.g. `"anthropic/claude-3-5-sonnet"`.
     *                       Defaults to [LlmClient]'s internal `DEFAULT_MODEL` when blank.
     * @param isMockMode     When true, all requests return canned responses without
     *                       making real API calls. Automatically activated when all
     *                       keys are blank.
     */
    fun init(
        openrouterKey: String = "",
        geminiKey: String = "",
        grokKey: String = "",
        preferredModel: String = "",
        isMockMode: Boolean = false
    ) {
        isMock = isMockMode

        val keyProvider = JsApiKeyProvider(
            openrouterKey = openrouterKey,
            geminiKey = geminiKey,
            grokKey = grokKey
        )
        val httpClient = HttpClient(Js)
        val transport = KtorLlmTransport(httpClient)

        val client = if (preferredModel.isNotBlank()) {
            LlmClient(
                apiKeyProvider = keyProvider,
                transport = transport,
                defaultModel = preferredModel
            )
        } else {
            LlmClient(
                apiKeyProvider = keyProvider,
                transport = transport
            )
        }

        llmProvider = client
        engine = CognitiveEngine(
            llmProvider = client,
            personaFactory = DefaultPersonaFactory(),
            sanitizer = LlmSanitizer()
        )
    }

    /**
     * Streams a single chat turn through the cognitive engine.
     *
     * The flow is:
     * 1. Each streaming delta fires [onChunk] with incremental public text.
     * 2. After the stream closes, [onComplete] fires once with the fully-parsed result.
     * 3. Any thrown [Throwable] fires [onError] with a descriptive message.
     *
     * In mock mode (or before [init] is called), [onComplete] is called immediately
     * with a canned response — [onChunk] is never called.
     *
     * @param moduleId    Module identifier, e.g. `"agnes"`, `"titan"`, `"ledger"`.
     * @param userMessage The user's raw message text.
     * @param historyJson JSON array of `{role: string, content: string}` objects.
     *                    Pass `"[]"` for a fresh conversation.
     * @param identity    JS-friendly user identity. See [UserIdentityJs].
     * @param onChunk     Invoked for each incremental delta during streaming.
     * @param onComplete  Invoked exactly once with the final parsed response.
     * @param onError     Invoked if an exception escapes the coroutine.
     */
    /**
     * Streams a single chat turn through the cognitive engine.
     *
     * @param nsvJson  Optional JSON-encoded [NeuralStateVector] from the TypeScript
     *                 state layer (e.g. `JSON.stringify(globalProjection.crossFunctionalState)`).
     *                 Pass `"{}"` or omit to use a default NSV (all fields null).
     *                 Using a real NSV produces richer, context-aware persona prompts.
     */
    fun chat(
        moduleId: String,
        userMessage: String,
        historyJson: String,
        identity: UserIdentityJs,
        nsvJson: String = "{}",
        onChunk: (StreamChunkJs) -> Unit,
        onComplete: (FinalResponseJs) -> Unit,
        onError: (String) -> Unit
    ) {
        val currentEngine = engine
        if (isMock || currentEngine == null) {
            onComplete(MOCK_FINAL_RESPONSE)
            return
        }

        val history = parseHistoryJson(historyJson)
        val nsv = NeuralStateVectorJs(nsvJson).nsv
        val userIdentity = identity.toUserIdentity()

        GlobalScope.launch {
            try {
                currentEngine.chat(
                    moduleId = moduleId,
                    userMessage = userMessage,
                    history = history,
                    nsv = nsv,
                    identity = userIdentity
                ).collect { response ->
                    if (response.isStreaming) {
                        onChunk(
                            StreamChunkJs(
                                delta = response.content,
                                isThinking = response.isThinking,
                                isActing = false,
                                currentActionType = null
                            )
                        )
                    } else {
                        onComplete(
                            FinalResponseJs(
                                content = response.content,
                                thoughts = response.internalThoughts,
                                actionsJson = serializeActions(response.actions),
                                mutationsJson = serializeMutations(response.mutations)
                            )
                        )
                    }
                }
            } catch (e: Throwable) {
                onError(e.message ?: "Chat failed with an unknown error")
            }
        }
    }

    /**
     * Non-streaming text generation for JSON output, summaries, or utility prompts.
     *
     * Internally collects the full token stream and joins it before invoking [onComplete].
     * This avoids exposing a streaming interface for callers that need atomic JSON output.
     *
     * In mock mode (or before [init] is called), [onComplete] is called immediately
     * with `"{}"`.
     *
     * @param prompt        The user-turn prompt.
     * @param systemPrompt  Optional system prompt. Defaults to a generic assistant prompt.
     * @param onComplete    Called with the full joined response text.
     * @param onError       Called if an exception escapes the coroutine.
     */
    fun generateText(
        prompt: String,
        systemPrompt: String? = null,
        onComplete: (String) -> Unit,
        onError: (String) -> Unit
    ) {
        val provider = llmProvider
        if (isMock || provider == null) {
            onComplete("{}")
            return
        }

        GlobalScope.launch {
            try {
                val resolvedSystem = systemPrompt ?: "You are a helpful assistant."
                val tokens = provider.stream(
                    systemPrompt = resolvedSystem,
                    history = emptyList(),
                    userMessage = prompt
                ).toList()
                onComplete(tokens.joinToString(""))
            } catch (e: Throwable) {
                onError(e.message ?: "Text generation failed with an unknown error")
            }
        }
    }

    /**
     * Analyzes an image by streaming a vision request to the LLM provider.
     *
     * The [imageDataUrl] is passed as an `image_url` content part alongside the
     * [prompt] text. The full accumulated response is returned via [onComplete].
     *
     * In mock mode (or before [init] is called), [onComplete] is called immediately
     * with an empty string.
     *
     * @param imageDataUrl  Base-64 data URL or HTTPS URL of the image to analyze.
     * @param prompt        Instruction for the vision model.
     * @param systemPrompt  Optional system prompt. Defaults to a generic visual assistant prompt.
     * @param onComplete    Called with the full joined text response.
     * @param onError       Called if an exception escapes the coroutine.
     */
    fun analyzeImage(
        imageDataUrl: String,
        prompt: String,
        systemPrompt: String = "You are a helpful visual assistant.",
        onComplete: (String) -> Unit,
        onError: (String) -> Unit
    ) {
        val provider = llmProvider
        if (isMock || provider == null) {
            onComplete("")
            return
        }

        GlobalScope.launch {
            try {
                val tokens = provider.stream(
                    systemPrompt = systemPrompt,
                    history = emptyList(),
                    userMessage = prompt,
                    imageContent = imageDataUrl
                ).toList()
                onComplete(tokens.joinToString(""))
            } catch (e: Throwable) {
                onError(e.message ?: "Image analysis failed with an unknown error")
            }
        }
    }

    /**
     * Streams a chat turn using a pre-built system prompt from the caller.
     *
     * Unlike [chat], this method does NOT call PersonaFactory — the caller is
     * responsible for assembling the final system prompt. This is the preferred
     * entry point for Agnes modules that build their own system prompts.
     *
     * @param moduleId          Module identifier (used for logging only).
     * @param userMessage       The user's raw message text.
     * @param historyJson       JSON array of `{role,content}` objects. Pass `"[]"` for fresh.
     * @param systemPrompt      Fully-assembled system prompt (overrides PersonaFactory).
     * @param memoryContextJson JSON array of fact strings (Agnes memoryContext). Pass `"[]"` if none.
     * @param longTermSummary   Long-term conversation summary. Pass `""` if none.
     * @param onChunk           Fired for each streaming delta.
     * @param onComplete        Fired exactly once with the final parsed response.
     * @param onError           Fired if an exception escapes the coroutine.
     */
    fun chatWithContext(
        moduleId: String,
        userMessage: String,
        historyJson: String,
        systemPrompt: String,
        memoryContextJson: String = "[]",
        longTermSummary: String = "",
        onChunk: (StreamChunkJs) -> Unit,
        onComplete: (FinalResponseJs) -> Unit,
        onError: (String) -> Unit
    ) {
        val provider = llmProvider
        if (isMock || provider == null) {
            onComplete(MOCK_FINAL_RESPONSE)
            return
        }

        val history = parseHistoryJson(historyJson)
        val memoryContext = parseStringArrayJson(memoryContextJson)

        // Passthrough factory: returns the pre-built system prompt verbatim.
        val engine = CognitiveEngine(
            llmProvider = provider,
            personaFactory = PassthroughPersonaFactory(systemPrompt),
            sanitizer = LlmSanitizer()
        )

        GlobalScope.launch {
            try {
                engine.chat(
                    moduleId = moduleId,
                    userMessage = userMessage,
                    history = history,
                    nsv = NeuralStateVectorJs().nsv,
                    identity = UserIdentity(name = "User", pronouns = "they/them"),
                    memoryContext = memoryContext,
                    longTermSummary = longTermSummary
                ).collect { response ->
                    if (response.isStreaming) {
                        onChunk(
                            StreamChunkJs(
                                delta = response.content,
                                isThinking = response.isThinking,
                                isActing = false,
                                currentActionType = null
                            )
                        )
                    } else {
                        onComplete(
                            FinalResponseJs(
                                content = response.content,
                                thoughts = response.internalThoughts,
                                actionsJson = serializeActions(response.actions),
                                mutationsJson = serializeMutations(response.mutations)
                            )
                        )
                    }
                }
            } catch (e: Throwable) {
                onError(e.message ?: "Chat failed with an unknown error")
            }
        }
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    /**
     * Parses a JSON array string into a [List] of [Message].
     *
     * Elements with unrecognised roles or missing fields are silently skipped rather
     * than throwing, because a malformed history entry should not crash the session.
     *
     * Time: O(n) where n = number of history entries.
     */
    private fun parseHistoryJson(json: String): List<Message> {
        if (json.isBlank() || json == "[]") return emptyList()
        return try {
            Json.parseToJsonElement(json).jsonArray.mapNotNull { element ->
                val obj = element.jsonObject
                val roleStr = obj["role"]?.jsonPrimitive?.contentOrNull ?: return@mapNotNull null
                val content = obj["content"]?.jsonPrimitive?.contentOrNull ?: return@mapNotNull null
                val role = when (roleStr) {
                    "user"      -> MessageRole.USER
                    "assistant" -> MessageRole.ASSISTANT
                    "system"    -> MessageRole.SYSTEM
                    else        -> return@mapNotNull null
                }
                Message(role = role, content = content)
            }
        } catch (_: Exception) {
            // Malformed JSON — return empty history rather than crashing.
            emptyList()
        }
    }

    /** Parses a JSON array of strings (e.g. Agnes memoryContext). */
    private fun parseStringArrayJson(json: String): List<String> {
        if (json.isBlank() || json == "[]") return emptyList()
        return try {
            Json.parseToJsonElement(json).jsonArray.mapNotNull {
                it.jsonPrimitive.contentOrNull
            }
        } catch (_: Exception) {
            emptyList()
        }
    }

    /**
     * PersonaFactory implementation that returns a fixed system prompt string.
     * Used by [chatWithContext] to bypass the default NSV-aware persona assembly.
     */
    private inner class PassthroughPersonaFactory(
        private val systemPrompt: String
    ) : PersonaFactory {
        override fun assemble(
            moduleId: String,
            identity: UserIdentity,
            nsv: NeuralStateVector,
            moduleContext: Map<String, Any?>,
            longTermSummary: String?
        ): String = systemPrompt
    }

    /**
     * Serializes a list of [com.agnes.nexus.core.domain.models.ActionCall] to a JSON array string.
     *
     * The `payload` field is already a [kotlinx.serialization.json.JsonObject], so
     * `.toString()` produces valid JSON without a secondary serialization step.
     *
     * Output shape: `[{"type":"<type>","payload":{...}}, ...]`
     */
    private fun serializeActions(
        actions: List<com.agnes.nexus.core.domain.models.ActionCall>
    ): String {
        if (actions.isEmpty()) return "[]"
        return try {
            buildJsonArray {
                actions.forEach { action ->
                    addJsonObject {
                        put("type", action.type)
                        put("payload", action.payload)
                    }
                }
            }.toString()
        } catch (_: Exception) {
            "[]"
        }
    }

    /**
     * Serializes a list of [LlmSanitizer.ExtractedMutation] to a JSON array string.
     *
     * `delta` is a [Float]; [JsonBuilder.put] accepts any [Number] via its
     * `put(key: String, value: Number)` overload.
     *
     * Output shape: `[{"vector":"<VECTOR>","delta":<float>}, ...]`
     */
    private fun serializeMutations(
        mutations: List<ExtractedMutation>
    ): String {
        if (mutations.isEmpty()) return "[]"
        return try {
            buildJsonArray {
                mutations.forEach { mutation ->
                    addJsonObject {
                        put("vector", mutation.vector)
                        put("delta", mutation.delta)
                    }
                }
            }.toString()
        } catch (_: Exception) {
            "[]"
        }
    }

    // ── Constants ─────────────────────────────────────────────────────────────

    private companion object {
        val MOCK_FINAL_RESPONSE = FinalResponseJs(
            content = "Neural link simulation active.",
            thoughts = null,
            actionsJson = "[]",
            mutationsJson = "[]"
        )
    }
}
