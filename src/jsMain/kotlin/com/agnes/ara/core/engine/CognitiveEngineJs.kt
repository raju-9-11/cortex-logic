package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.model.GlobalSoul
import com.agnes.ara.core.domain.models.AtlasProfile
import com.agnes.ara.core.domain.models.LedgerProfile
import com.agnes.ara.core.domain.models.Message
import com.agnes.ara.core.domain.models.MessageRole
import com.agnes.ara.core.domain.models.NeuralStateVector
import com.agnes.ara.core.domain.models.SomaProfile
import com.agnes.ara.core.domain.models.TrainerProfile
import io.ktor.client.*
import io.ktor.client.engine.js.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.launch
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlinx.serialization.KSerializer
import kotlinx.serialization.json.*
import kotlinx.serialization.serializer
import kotlin.coroutines.cancellation.CancellationException
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException

/**
 * JS-facing bridge that exposes the KMP cognitive engine stack to TypeScript/React.
 *
 * ## Lifecycle
 * Call [init] once at application startup (or per user session) to wire the full
 * engine stack.  All subsequent [chat] and [generateText] calls share the same
 * [LlmClient] and [CognitiveEngine] instances.
 *
 * ## Structured concurrency
 * All async methods launch coroutines on an instance-scoped [CoroutineScope]
 * backed by a [SupervisorJob], ensuring that:
 * - A failure in one coroutine does not cancel siblings.
 * - TypeScript callers can cancel individual operations via the returned
 *   [CancellableTask] handle.
 * - [clearCredentials] cancels all in-flight coroutines and resets the scope.
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
@JsExport
class CognitiveEngineJs {

    // ── Private state ─────────────────────────────────────────────────────────

    private var engine: CognitiveEngine? = null

    // Stored as LlmProvider (the interface) so generateText() can call stream()
    // without depending on the concrete LlmClient type.
    private var llmProvider: LlmProvider? = null

    private var isMock: Boolean = false

    private var credentialStore: CredentialStoreJs? = null

    /**
     * Coroutine scope for all async operations. Uses [SupervisorJob] so that a
     * failure in one coroutine (e.g. a cancelled chat) does not tear down
     * siblings (e.g. another in-flight generateText call).
     *
     * Recreated in [clearCredentials] to ensure a clean slate after logout.
     */
    private var scope = CoroutineScope(SupervisorJob())

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
     * @param mercuryKey     Inception Labs Mercury API key.
     * @param preferredModel Model ID override, e.g. `"anthropic/claude-3-5-sonnet"`.
     *                       Defaults to [LlmClient]'s internal `DEFAULT_MODEL` when blank.
     * @param isMockMode     When true, all requests return canned responses without
     *                       making real API calls. Automatically activated when all
     *                       keys are blank.
     * @param preferredProvider One of `"openrouter"`, `"google"` (alias `"gemini"`),
     *                       `"grok"`, `"mercury"`, or blank. When set and the matching
     *                       key is non-blank, requests are routed to that provider's
     *                       native endpoint instead of the static key-priority chain.
     */
    fun init(
        openrouterKey: String = "",
        geminiKey: String = "",
        grokKey: String = "",
        mercuryKey: String = "",
        preferredModel: String = "",
        isMockMode: Boolean = false,
        preferredProvider: String = ""
    ) {
        isMock = isMockMode

        val resolvedProvider = preferredProvider.takeIf { it.isNotBlank() }

        if (!isMockMode) {
            validateProviderKey(resolvedProvider, ApiKeyProvider.ApiKeys(
                openrouterKey = openrouterKey,
                geminiKey = geminiKey,
                grokKey = grokKey,
                mercuryKey = mercuryKey
            ))
        }

        val keyProvider = JsApiKeyProvider(
            openrouterKey = openrouterKey,
            geminiKey = geminiKey,
            grokKey = grokKey,
            mercuryKey = mercuryKey
        )
        val httpClient = HttpClient(Js)
        val transport = KtorLlmTransport(httpClient)

        val client = if (preferredModel.isNotBlank()) {
            LlmClient(
                apiKeyProvider = keyProvider,
                transport = transport,
                defaultModel = preferredModel,
                preferredProvider = resolvedProvider
            )
        } else {
            LlmClient(
                apiKeyProvider = keyProvider,
                transport = transport,
                preferredProvider = resolvedProvider
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
     * Initializes the engine using a [CredentialStoreJs] for secure key resolution.
     *
     * Unlike [init] which receives raw API key strings, this method lets KMP
     * resolve keys on demand from the host's encrypted storage. Keys are fetched
     * asynchronously the first time an LLM call is made (or eagerly via [onReady]).
     *
     * @param store          A [CredentialStoreJs] wired to the host's encrypted storage.
     * @param preferredModel Model ID override. Defaults to internal default when blank.
     * @param isMockMode     When true, all requests return canned responses.
     * @param onReady        Called once the engine is ready (keys resolved).
     * @param onError        Called if key resolution fails.
     */
    fun initWithCredentialStore(
        store: CredentialStoreJs,
        preferredModel: String = "",
        isMockMode: Boolean = false,
        onReady: () -> Unit,
        onError: (String) -> Unit,
        preferredProvider: String = ""
    ): CancellableTask {
        credentialStore = store
        isMock = isMockMode

        // Eagerly resolve keys so the engine is ready for the first chat call.
        val job = scope.launch {
            try {
                val keys = store.resolveKeys()
                if (!keys.hasAnyKey() && !isMockMode) {
                    isMock = true
                }

                val resolvedProvider = preferredProvider.takeIf { it.isNotBlank() }

                if (!isMock) {
                    validateProviderKey(resolvedProvider, keys)
                }

                val keyProvider = store.toApiKeyProvider()
                val httpClient = HttpClient(Js)
                val transport = KtorLlmTransport(httpClient)

                val client = if (preferredModel.isNotBlank()) {
                    LlmClient(
                        apiKeyProvider = keyProvider,
                        transport = transport,
                        defaultModel = preferredModel,
                        preferredProvider = resolvedProvider
                    )
                } else {
                    LlmClient(
                        apiKeyProvider = keyProvider,
                        transport = transport,
                        preferredProvider = resolvedProvider
                    )
                }

                llmProvider = client
                engine = CognitiveEngine(
                    llmProvider = client,
                    personaFactory = DefaultPersonaFactory(),
                    sanitizer = LlmSanitizer()
                )

                onReady()
            } catch (_: CancellationException) {
                // Cancelled from TypeScript — don't call onError.
            } catch (e: Throwable) {
                onError(e.message ?: "Credential store initialization failed")
            }
        }
        return CancellableTask(job)
    }

    /**
     * Re-initializes the engine after a key change (e.g. user updated API key in settings).
     *
     * Only works if [initWithCredentialStore] was used. Re-fetches keys from the
     * credential store (cache is invalidated) and rebuilds the engine.
     *
     * @param preferredModel Model ID override. Pass empty to keep current default.
     * @param onReady        Called once re-init completes.
     * @param onError        Called if re-init fails.
     */
    fun reinitFromCredentialStore(
        preferredModel: String = "",
        onReady: () -> Unit,
        onError: (String) -> Unit,
        preferredProvider: String = ""
    ) {
        val store = credentialStore
        if (store == null) {
            onError("No credential store configured. Call initWithCredentialStore first.")
            return
        }
        // Invalidate the store's cache so it re-fetches from encrypted storage.
        store.clearCredentials()
        initWithCredentialStore(store, preferredModel, isMock, onReady, onError, preferredProvider)
    }

    /**
     * Returns the fallback history window size from [MemoryManager].
     * Bridges the KMP constant to the Agnes TS layer so Agnes always reads
     * the authoritative value from cortex-logic. (Item 5)
     */
    fun getFallbackContextWindow(): Int = MemoryManager.getFallbackContextWindow()

    /**
     * Clears all in-memory credentials and tears down the engine.
     *
     * Call this on logout to ensure API keys are not retained in KMP memory.
     * The engine enters mock mode after this call.
     */
    fun clearCredentials() {
        scope.cancel()
        scope = CoroutineScope(SupervisorJob())
        credentialStore?.clearCredentials()
        credentialStore = null
        engine = null
        llmProvider = null
        isMock = true
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
        globalSoulJson: String = "{}",
        onChunk: (StreamChunkJs) -> Unit,
        onComplete: (FinalResponseJs) -> Unit,
        onError: (String) -> Unit
    ): CancellableTask {
        val currentEngine = engine
        if (isMock || currentEngine == null) {
            onComplete(MOCK_FINAL_RESPONSE)
            return CancellableTask(SupervisorJob().apply { complete() })
        }

        val history = parseHistoryJson(historyJson)
        val nsv = NeuralStateVectorJs(nsvJson).nsv
        val userIdentity = identity.toUserIdentity()
        val globalSoul = parseGlobalSoulJson(globalSoulJson)

        val job = scope.launch {
            try {
                currentEngine.chat(
                    moduleId = moduleId,
                    userMessage = userMessage,
                    history = history,
                    nsv = nsv,
                    identity = userIdentity,
                    globalSoul = globalSoul
                ).collect { response ->
                    if (response.isStreaming) {
                        onChunk(
                            StreamChunkJs(
                                delta = response.content,
                                isThinking = response.isThinking,
                                isActing = response.isActing,
                                currentActionType = response.currentActionType,
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
            } catch (_: CancellationException) {
                // Cancelled from TypeScript — don't call onError.
            } catch (e: Throwable) {
                onError(e.message ?: "Chat failed with an unknown error")
            }
        }
        return CancellableTask(job)
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
    ): CancellableTask {
        val provider = llmProvider
        if (isMock || provider == null) {
            onComplete("{}")
            return CancellableTask(SupervisorJob().apply { complete() })
        }

        val job = scope.launch {
            try {
                val resolvedSystem = systemPrompt ?: "You are a helpful assistant."
                val tokens = provider.stream(
                    systemPrompt = resolvedSystem,
                    history = emptyList(),
                    userMessage = prompt
                ).toList()
                onComplete(tokens.joinToString(""))
            } catch (_: CancellationException) {
                // Cancelled from TypeScript — don't call onError.
            } catch (e: Throwable) {
                onError(e.message ?: "Text generation failed with an unknown error")
            }
        }
        return CancellableTask(job)
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
    ): CancellableTask {
        val provider = llmProvider
        if (isMock || provider == null) {
            onComplete("")
            return CancellableTask(SupervisorJob().apply { complete() })
        }

        val job = scope.launch {
            try {
                val tokens = provider.stream(
                    systemPrompt = systemPrompt,
                    history = emptyList(),
                    userMessage = prompt,
                    imageContent = imageDataUrl
                ).toList()
                onComplete(tokens.joinToString(""))
            } catch (_: CancellationException) {
                // Cancelled from TypeScript — don't call onError.
            } catch (e: Throwable) {
                onError(e.message ?: "Image analysis failed with an unknown error")
            }
        }
        return CancellableTask(job)
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
    ): CancellableTask {
        val provider = llmProvider
        if (isMock || provider == null) {
            onComplete(MOCK_FINAL_RESPONSE)
            return CancellableTask(SupervisorJob().apply { complete() })
        }

        val history = parseHistoryJson(historyJson)
        val memoryContext = parseStringArrayJson(memoryContextJson)

        // Passthrough factory: returns the pre-built system prompt verbatim.
        val engine = CognitiveEngine(
            llmProvider = provider,
            personaFactory = PassthroughPersonaFactory(systemPrompt),
            sanitizer = LlmSanitizer()
        )

        val job = scope.launch {
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
                                isActing = response.isActing,
                                currentActionType = response.currentActionType,
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
            } catch (_: CancellationException) {
                // Cancelled from TypeScript — don't call onError.
            } catch (e: Throwable) {
                onError(e.message ?: "Chat failed with an unknown error")
            }
        }
        return CancellableTask(job)
    }

    /**
     * Full-orchestration streaming — KMP calls [jsRetrieveMemory] to resolve memory,
     * runs PersonaFactory with NSV injection, then streams the LLM response.
     *
     * Memory retrieval is bridged via an inline [suspendCancellableCoroutine] so no
     * extra coroutine class is generated (avoiding Kotlin/JS metadata ordering issues).
     *
     * @param moduleId          Agnes module ID (agnes, titan, ledger, …)
     * @param userMessage       Raw user input text.
     * @param historyJson       JSON array of Message objects (role + content).
     * @param identity          User identity (name, pronouns, etc.).
     * @param nsvJson           Serialised NeuralStateVector.
     * @param globalSoulJson    Serialised GlobalSoul (optional, pass "{}").
     * @param moduleContextJson Serialised Map of module-specific context.
     *                          Include "baseRole" key to override the default persona prompt.
     *                          Include "timeContext" key for temporal awareness.
     * @param longTermSummary   Compacted long-term session summary (optional).
     * @param jsRetrieveMemory  JS callback: (query, onComplete, onError) → Unit.
     *                          Called once per turn with a semantic query derived from
     *                          the user message; resolves to a string array of recalled facts.
     * @param onChunk           Called for each streaming delta.
     * @param onComplete        Called with final structured response.
     * @param onError           Called on failure.
     */
    fun chatWithMemory(
        moduleId: String,
        userMessage: String,
        historyJson: String,
        identity: UserIdentityJs,
        nsvJson: String = "{}",
        globalSoulJson: String = "{}",
        moduleContextJson: String = "{}",
        longTermSummary: String = "",
        jsRetrieveMemory: (query: String, onComplete: (Array<String>) -> Unit, onError: (String) -> Unit) -> Unit,
        onChunk: (StreamChunkJs) -> Unit,
        onComplete: (FinalResponseJs) -> Unit,
        onError: (String) -> Unit,
    ): CancellableTask {
        val currentEngine = engine
        if (isMock || currentEngine == null) {
            onComplete(MOCK_FINAL_RESPONSE)
            return CancellableTask(SupervisorJob().apply { complete() })
        }

        val job = scope.launch {
            try {
                // Bridge the JS callback into the coroutine using suspendCancellableCoroutine
                // inline — no helper suspend fun, so no extra coroutine class is generated.
                val memoryFacts: List<String> = try {
                    suspendCancellableCoroutine { cont ->
                        jsRetrieveMemory(
                            userMessage,
                            { facts -> if (cont.isActive) cont.resume(facts.toList()) },
                            { err -> if (cont.isActive) cont.resumeWithException(RuntimeException(err)) },
                        )
                    }
                } catch (_: Throwable) {
                    emptyList()
                }
                val history = parseHistoryJson(historyJson)
                val nsv = NeuralStateVectorJs(nsvJson).nsv
                val globalSoul = parseGlobalSoulJson(globalSoulJson)
                val moduleCtx = parseModuleContextJson(moduleContextJson)
                val userIdentity = identity.toUserIdentity()

                currentEngine.chatWithMemory(
                    moduleId = moduleId,
                    userMessage = userMessage,
                    history = history,
                    nsv = nsv,
                    identity = userIdentity,
                    moduleContext = moduleCtx,
                    longTermSummary = longTermSummary,
                    globalSoul = globalSoul,
                    memoryFacts = memoryFacts,
                ).collect { response ->
                    if (response.isStreaming) {
                        onChunk(
                            StreamChunkJs(
                                delta = response.content,
                                isThinking = response.isThinking,
                                isActing = response.isActing,
                                currentActionType = response.currentActionType,
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
            } catch (_: CancellationException) {
                // Cancelled from TypeScript — don't call onError.
            } catch (e: Throwable) {
                onError(e.message ?: "chatWithMemory failed")
            }
        }
        return CancellableTask(job)
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    private fun validateProviderKey(provider: String?, keys: ApiKeyProvider.ApiKeys) {
        when (provider?.lowercase()) {
            "openrouter" -> require(keys.openrouterKey.isNotBlank()) {
                "Provider 'openrouter' selected but OPENROUTER_API_KEY is missing."
            }
            "google", "gemini" -> require(keys.geminiKey.isNotBlank()) {
                "Provider 'google' selected but GEMINI_API_KEY is missing."
            }
            "grok" -> require(keys.grokKey.isNotBlank()) {
                "Provider 'grok' selected but GROK_API_KEY is missing."
            }
            "mercury" -> require(keys.mercuryKey.isNotBlank()) {
                "Provider 'mercury' selected but MERCURY_API_KEY is missing."
            }
        }
    }

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
     * Parses a JSON object string into a [Map]<[String], [Any]?> for [CognitiveEngine.chatWithMemory].
     *
     * Known typed-profile keys ([TYPED_PROFILE_SERIALIZERS]) are decoded into their concrete Kotlin
     * data classes so `DefaultPersonaFactory`'s `as? AtlasProfile` / `as? TrainerProfile` /
     * `as? SomaProfile` / `as? LedgerProfile` casts succeed and live task/goal/habit/etc. data
     * reaches the prompt. Without this revival step, those casts return null and every persona
     * falls back to a data-less template — the LLM then truthfully reports "clean slate."
     *
     * Unknown object/array keys are preserved as their JSON string (original behavior) for
     * consumers like `SomaPersonaPrompts.context(...)` that do string-template interpolation.
     * Primitives are extracted as [String]; JSON `null` maps to `null`.
     */
    private fun parseModuleContextJson(json: String): Map<String, Any?> {
        if (json.isBlank() || json == "{}") return emptyMap()
        return try {
            LENIENT_JSON.parseToJsonElement(json).jsonObject.entries.associate { (k, v) ->
                k to when {
                    v is JsonNull -> null
                    v is JsonPrimitive && v.isString -> v.content
                    v is JsonPrimitive -> v.content  // numbers, booleans as strings
                    else -> decodeTypedProfileOrString(k, v)
                }
            }
        } catch (_: Exception) {
            emptyMap()
        }
    }

    /**
     * If [key] is a known typed-profile key, attempt to decode [element] into its Kotlin
     * data class via `kotlinx.serialization`. Falls back to the JSON string representation
     * on unknown keys or decode failure (so string-template consumers keep working and a
     * malformed profile does not crash the whole context bridge).
     */
    private fun decodeTypedProfileOrString(key: String, element: JsonElement): Any {
        val serializer = TYPED_PROFILE_SERIALIZERS[key]
        if (serializer != null) {
            try {
                val decoded = LENIENT_JSON.decodeFromJsonElement(serializer, element)
                if (decoded != null) return decoded
            } catch (e: Throwable) {
                // Silent swallow is what let the original bug sit for so long — make it audible.
                console.warn(
                    "[CognitiveEngineJs] Failed to decode moduleContext[\"$key\"] " +
                        "into its typed profile (${e.message}); falling back to JSON string. " +
                        "Persona will not see live data for this key."
                )
            }
        }
        return element.toString()
    }

    /** Parses a JSON-encoded GlobalSoul from the TypeScript layer. Returns null for blank/empty/malformed input. */
    private fun parseGlobalSoulJson(json: String): GlobalSoul? {
        if (json.isBlank() || json == "{}") return null
        return try {
            LENIENT_JSON.decodeFromString<GlobalSoul>(json)
        } catch (_: Exception) {
            null
        }
    }

    /**
     * PersonaFactory implementation that returns a fixed system prompt string.
     * Used by [chatWithContext] to bypass the default NSV-aware persona assembly.
     * All parameters other than the stored [systemPrompt] are intentionally ignored —
     * the caller has already pre-assembled the full system prompt and owns its content.
     */
    private inner class PassthroughPersonaFactory(
        private val systemPrompt: String
    ) : PersonaFactory {
        override fun assemble(
            moduleId: String,
            identity: UserIdentity,
            nsv: NeuralStateVector,
            moduleContext: Map<String, Any?>,
            longTermSummary: String?,
            globalSoul: GlobalSoul?
        ): String = systemPrompt
    }

    /**
     * Serializes a list of [com.agnes.ara.core.domain.models.ActionCall] to a JSON array string.
     *
     * The `payload` field is already a [kotlinx.serialization.json.JsonObject], so
     * `.toString()` produces valid JSON without a secondary serialization step.
     *
     * Output shape: `[{"type":"<type>","payload":{...}}, ...]`
     */
    private fun serializeActions(
        actions: List<com.agnes.ara.core.domain.models.ActionCall>
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
        val LENIENT_JSON = Json {
            ignoreUnknownKeys = true
            coerceInputValues = true
            isLenient = true
            explicitNulls = false
        }

        /**
         * moduleContext keys whose values are typed Kotlin data classes rather than opaque blobs.
         *
         * Entries listed here are deserialized from their JSON form at the JS/KMP boundary, so
         * `DefaultPersonaFactory` (common code) can consume them directly via `as? XProfile`.
         * Add new keys here whenever a module starts handing a typed profile through
         * `moduleContext` — without this registration, the value round-trips as a JSON String
         * and the persona's typed cast silently yields null.
         */
        val TYPED_PROFILE_SERIALIZERS: Map<String, KSerializer<*>> = mapOf(
            "atlas_profile" to serializer<AtlasProfile>(),
            "titan_profile" to serializer<TrainerProfile>(),
            "titan_soma_profile" to serializer<SomaProfile>(),
            "soma_profile" to serializer<SomaProfile>(),
            "ledger_profile" to serializer<LedgerProfile>(),
        )

        val MOCK_FINAL_RESPONSE = FinalResponseJs(
            content = "Neural link simulation active.",
            thoughts = null,
            actionsJson = "[]",
            mutationsJson = "[]"
        )
    }
}

