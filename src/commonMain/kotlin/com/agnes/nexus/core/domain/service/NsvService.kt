package com.agnes.nexus.core.domain.service

import kotlinx.serialization.json.*
import kotlin.math.round

// ═══════════════════════════════════════════════════════════════════════════════
// NsvService — single source of truth for NSV create/normalize/merge/format
// ═══════════════════════════════════════════════════════════════════════════════

object NsvService {

    private val json = Json { ignoreUnknownKeys = true }

    // Per-module result cache keyed by allowedPathsJson (stable per module).
    // Value = (nsvJsonHashCode, formattedResult) — invalidated when NSV JSON changes.
    private val formatModulePromptCache: MutableMap<String, Pair<Int, String>> = mutableMapOf()

    private val DOMAINS = listOf("biological", "emotional", "cognitive", "planning", "resource")

    private val DEFAULT_FIELDS: Map<String, List<String>> = mapOf(
        "biological" to listOf("cnsFatigue", "sleepQuality", "recoveryScore", "hormonalContext"),
        "emotional" to listOf("emotionalResilience", "stressLoad", "moodTrend", "traumaMarkers"),
        "cognitive" to listOf("energyBudget", "focusScore", "activeLoad", "researchLoad", "planningLoad", "taskCompletionRate", "interestDiversity"),
        "planning" to listOf("streakHealth", "deadlinePressure", "reflectionStreak", "goalAlignment", "habitMomentum"),
        "resource" to listOf("financialFriction", "resonanceROI"),
    )

    /** Fields that are strings (not numeric) — everything else in DEFAULT_FIELDS is numeric. */
    private val STRING_FIELDS: Set<String> = setOf("hormonalContext", "moodTrend")

    /** Fields that are JSON arrays — these pass through without coercion. */
    private val ARRAY_FIELDS: Set<String> = setOf("traumaMarkers")

    /** Legacy root-level alias → nested path mapping. */
    private val LEGACY_ALIASES: Map<String, Pair<String, String>> = mapOf(
        "cnsFatigue" to ("biological" to "cnsFatigue"),
        "sleepQuality" to ("biological" to "sleepQuality"),
        "hormonalContext" to ("biological" to "hormonalContext"),
        "emotionalResilience" to ("emotional" to "emotionalResilience"),
        "traumaMarkers" to ("emotional" to "traumaMarkers"),
    )

    /** Returns the default NSV as a JSON string. */
    fun createDefault(): String {
        val obj = buildJsonObject {
            for ((domain, fields) in DEFAULT_FIELDS) {
                put(domain, buildJsonObject {
                    for (field in fields) put(field, JsonNull)
                })
            }
            put("version", JsonPrimitive(1))
            put("lastUpdated", buildJsonObject {})
            // Legacy aliases at root level
            for (alias in LEGACY_ALIASES.keys) {
                put(alias, JsonNull)
            }
        }
        return json.encodeToString(JsonObject.serializer(), obj)
    }

    /**
     * Normalize an NSV JSON string: merge with defaults, resolve legacy root-level aliases,
     * and bind root aliases from nested values.
     * @param nsvJson partial or full NSV JSON (or empty/null → returns defaults)
     */
    fun normalize(nsvJson: String): String {
        if (nsvJson.isBlank() || nsvJson == "null") return createDefault()

        val input = try {
            json.parseToJsonElement(nsvJson).jsonObject
        } catch (_: Exception) {
            return createDefault()
        }

        val result = buildJsonObject {
            // For each domain, merge default fields with input
            for ((domain, defaultFields) in DEFAULT_FIELDS) {
                val inputDomain = input[domain]?.jsonObjectOrNull ?: JsonObject(emptyMap())
                put(domain, buildJsonObject {
                    for (field in defaultFields) {
                        // Check legacy alias first (root-level field takes precedence if present)
                        val aliasKey = LEGACY_ALIASES.entries
                            .firstOrNull { it.value == (domain to field) }?.key
                        val rootVal = if (aliasKey != null) input[aliasKey] else null
                        val nestedVal = inputDomain[field]

                        val value = pickDefined(rootVal, nestedVal)
                        put(field, coerceField(field, value))
                    }
                })
            }

            // Version
            put("version", input["version"] ?: JsonPrimitive(1))

            // lastUpdated — flatten any nested objects to dot-separated keys
            // so the output always matches the Map<String, String> model.
            val inputLU = input["lastUpdated"]?.jsonObjectOrNull ?: JsonObject(emptyMap())
            put("lastUpdated", buildJsonObject {
                fun flattenLU(prefix: String, obj: JsonObject) {
                    for ((k, v) in obj) {
                        val key = if (prefix.isEmpty()) k else "$prefix.$k"
                        when (v) {
                            is JsonObject -> flattenLU(key, v)
                            else -> put(key, v)
                        }
                    }
                }
                flattenLU("", inputLU)
            })

            // Legacy aliases are rebound from the completed result object below.
        }

        // Re-bind legacy aliases from the result domains
        val finalObj = buildJsonObject {
            for ((k, v) in result) {
                if (k in LEGACY_ALIASES) continue // skip, we'll re-add
                put(k, v)
            }
            for ((alias, path) in LEGACY_ALIASES) {
                val (d, f) = path
                val domainVal = result[d]?.jsonObjectOrNull?.get(f) ?: JsonNull
                put(alias, domainVal)
            }
        }

        return json.encodeToString(JsonObject.serializer(), finalObj)
    }

    /**
     * Deep merge base NSV with updates. Both are JSON strings.
     * Null fields in updates are ignored (don't overwrite).
     */
    fun merge(baseJson: String, updatesJson: String): String {
        val base = normalize(baseJson)
        val updates = try {
            json.parseToJsonElement(updatesJson).jsonObject
        } catch (_: Exception) {
            return base
        }

        val baseObj = json.parseToJsonElement(base).jsonObject
        val merged = buildJsonObject {
            for ((k, v) in baseObj) {
                if (k in DOMAINS) {
                    val baseDomain = v.jsonObjectOrNull ?: JsonObject(emptyMap())
                    val updateDomain = updates[k]?.jsonObjectOrNull ?: JsonObject(emptyMap())
                    put(k, buildJsonObject {
                        for ((fk, fv) in baseDomain) put(fk, fv)
                        for ((fk, fv) in updateDomain) put(fk, fv)
                    })
                } else {
                    put(k, updates[k] ?: v)
                }
            }
        }

        return normalize(json.encodeToString(JsonObject.serializer(), merged))
    }

    /**
     * Merge two NSV patch objects (shallow spread at top level + deep merge per domain).
     * Mirrors Agnes's mergeNSVPatch(). Used when assembling partial NSV updates.
     */
    fun mergePatches(baseJson: String, updatesJson: String): String {
        val base = try { json.parseToJsonElement(baseJson).jsonObject } catch (_: Exception) { JsonObject(emptyMap()) }
        val updates = try { json.parseToJsonElement(updatesJson).jsonObject } catch (_: Exception) { JsonObject(emptyMap()) }

        val result = mutableMapOf<String, JsonElement>()

        // Top-level non-domain keys: updates override base
        for ((k, v) in base) { if (k !in DOMAINS) result[k] = v }
        for ((k, v) in updates) { if (k !in DOMAINS) result[k] = v }

        // Domain keys: shallow merge within each domain
        for (domain in DOMAINS) {
            val baseDomain = base[domain]?.jsonObjectOrNull ?: JsonObject(emptyMap())
            val updatesDomain = updates[domain]?.jsonObjectOrNull ?: JsonObject(emptyMap())
            if (baseDomain.isNotEmpty() || updatesDomain.isNotEmpty()) {
                result[domain] = buildJsonObject {
                    for ((k, v) in baseDomain) put(k, v)
                    for ((k, v) in updatesDomain) put(k, v)
                }
            }
        }

        return json.encodeToString(JsonObject.serializer(), JsonObject(result))
    }

    /**
     * Format full NSV for prompt injection with [GLOBAL NEURAL STATE] header.
     * (Agnes-compatible format.)
     */
    fun formatForPrompt(nsvJson: String): String {
        val nsv = try {
            json.parseToJsonElement(nsvJson).jsonObject
        } catch (_: Exception) {
            return "[GLOBAL NEURAL STATE]\nNo data available."
        }

        fun display(domain: String, field: String, fallback: String = "unknown"): String {
            val v = nsv[domain]?.jsonObjectOrNull?.get(field)
            if (v == null || v is JsonNull) return fallback
            return v.jsonPrimitive.content
        }

        return listOf(
            "[GLOBAL NEURAL STATE]",
            "Biological: CNS Fatigue ${display("biological", "cnsFatigue")}/10, Sleep ${display("biological", "sleepQuality")}/10, Recovery ${display("biological", "recoveryScore")}/10, Hormonal ${display("biological", "hormonalContext")}",
            "Emotional: Resilience ${display("emotional", "emotionalResilience")}/10, Stress ${display("emotional", "stressLoad")}/10, Mood ${display("emotional", "moodTrend")}",
            "Cognitive: Energy ${display("cognitive", "energyBudget")}/10, Focus ${display("cognitive", "focusScore")}/10, Active Load ${display("cognitive", "activeLoad")}, Research Load ${display("cognitive", "researchLoad")}, Planning Load ${display("cognitive", "planningLoad")}, Interest Diversity ${display("cognitive", "interestDiversity")}",
            "Planning: Streak Health ${display("planning", "streakHealth")}/10, Deadline Pressure ${display("planning", "deadlinePressure")}/10",
            "Resource: Financial Friction ${display("resource", "financialFriction")}/10, Resonance ROI ${display("resource", "resonanceROI")}",
        ).joinToString("\n")
    }

    /**
     * Format NSV filtered to allowed paths with [NEURAL STATE] header.
     * @param nsvJson full NSV JSON
     * @param allowedPathsJson JSON array of strings like `["biological.cnsFatigue", ...]`
     */
    fun formatForModulePrompt(nsvJson: String, allowedPathsJson: String): String {
        // Return cached result when NSV hasn't changed since last call for this module (Item 11)
        val nsvHash = nsvJson.hashCode()
        val cached = formatModulePromptCache[allowedPathsJson]
        if (cached != null && cached.first == nsvHash) return cached.second

        val nsv = try {
            json.parseToJsonElement(nsvJson).jsonObject
        } catch (_: Exception) {
            return ""
        }

        val allowedPaths = try {
            json.decodeFromString<List<String>>(allowedPathsJson).toSet()
        } catch (_: Exception) {
            return ""
        }

        fun d(domain: String, field: String, suffix: String = ""): String? {
            if ("$domain.$field" !in allowedPaths) return null
            val v = nsv[domain]?.jsonObjectOrNull?.get(field)
            if (v == null || v is JsonNull) return null
            return "${v.jsonPrimitive.content}$suffix"
        }

        val bio = mutableListOf<String>()
        d("biological", "cnsFatigue", "/10")?.let { bio.add("CNS Fatigue $it") }
        d("biological", "sleepQuality", "/10")?.let { bio.add("Sleep Quality $it") }
        d("biological", "recoveryScore", "/10")?.let { bio.add("Recovery $it") }
        if ("biological.hormonalContext" in allowedPaths) {
            val v = nsv["biological"]?.jsonObjectOrNull?.get("hormonalContext")
            if (v != null && v !is JsonNull) bio.add("Hormonal Context: ${v.jsonPrimitive.content}")
        }

        val emo = mutableListOf<String>()
        d("emotional", "emotionalResilience", "/10")?.let { emo.add("Resilience $it") }
        d("emotional", "stressLoad", "/10")?.let { emo.add("Stress $it") }
        if ("emotional.moodTrend" in allowedPaths) {
            val v = nsv["emotional"]?.jsonObjectOrNull?.get("moodTrend")
            if (v != null && v !is JsonNull) emo.add("Mood Trend: ${v.jsonPrimitive.content}")
        }
        if ("emotional.traumaMarkers" in allowedPaths) {
            val v = nsv["emotional"]?.jsonObjectOrNull?.get("traumaMarkers")
            if (v is JsonArray && v.isNotEmpty()) {
                emo.add("Trauma Markers: [${v.joinToString(", ") { it.jsonPrimitive.content }}]")
            }
        }

        val cog = mutableListOf<String>()
        d("cognitive", "energyBudget", "/10")?.let { cog.add("Energy Budget $it") }
        d("cognitive", "focusScore", "/10")?.let { cog.add("Focus $it") }
        d("cognitive", "activeLoad", "/10")?.let { cog.add("Active Load $it") }
        d("cognitive", "researchLoad", "/10")?.let { cog.add("Research Load $it") }
        d("cognitive", "planningLoad", "/10")?.let { cog.add("Planning Load $it") }
        d("cognitive", "taskCompletionRate")?.let { cog.add("Task Completion Rate $it") }
        d("cognitive", "interestDiversity", "/10")?.let { cog.add("Interest Diversity $it") }

        val pln = mutableListOf<String>()
        d("planning", "streakHealth", "/10")?.let { pln.add("Streak Health $it") }
        d("planning", "deadlinePressure", "/10")?.let { pln.add("Deadline Pressure $it") }

        val res = mutableListOf<String>()
        d("resource", "financialFriction", "/10")?.let { res.add("Financial Friction $it") }
        d("resource", "resonanceROI")?.let { res.add("Resonance ROI $it") }

        val sections = mutableListOf("[NEURAL STATE]")
        if (bio.isNotEmpty()) sections.add("Biological: ${bio.joinToString(", ")}")
        if (emo.isNotEmpty()) sections.add("Emotional: ${emo.joinToString(", ")}")
        if (cog.isNotEmpty()) sections.add("Cognitive: ${cog.joinToString(", ")}")
        if (pln.isNotEmpty()) sections.add("Planning: ${pln.joinToString(", ")}")
        if (res.isNotEmpty()) sections.add("Resource: ${res.joinToString(", ")}")

        if (sections.size == 1) return ""
        val result = sections.joinToString("\n")
        formatModulePromptCache[allowedPathsJson] = nsvHash to result
        if (formatModulePromptCache.size > 12) formatModulePromptCache.remove(formatModulePromptCache.keys.first())
        return result
    }

    /**
     * Format NSV as an enriched Atlas planning context string.
     *
     * Computes mandatory planning overrides from NSV thresholds, derives
     * maxSustainableLoad and deepWorkWindow, and emits the [ATLAS PLANNING STATE] block.
     *
     * @param nsvJson Full NSV JSON string.
     * @return Multi-line planning context string (no trailing newline).
     */
    fun formatForAtlasPlanner(nsvJson: String): String {
        val root = try { json.parseToJsonElement(nsvJson).jsonObject } catch (_: Exception) { JsonObject(emptyMap()) }
        fun domain(name: String) = root[name]?.jsonObjectOrNull ?: JsonObject(emptyMap())
        fun Double?.d(fallback: String = "unknown") = if (this == null || this.isNaN()) fallback else this.toString()

        val bio  = domain("biological")
        val emo  = domain("emotional")
        val cog  = domain("cognitive")
        val pln  = domain("planning")
        val res  = domain("resource")

        fun JsonObject.dbl(key: String): Double? = this[key]?.jsonPrimitive?.doubleOrNull

        val cnsFatigue = bio.dbl("cnsFatigue")
        val sleep      = bio.dbl("sleepQuality")
        val recovery   = bio.dbl("recoveryScore")
        val resilience = emo.dbl("emotionalResilience")
        val stress     = emo.dbl("stressLoad")
        val mood       = emo["moodTrend"]?.jsonPrimitive?.contentOrNull
        val energy     = cog.dbl("energyBudget")
        val focus      = cog.dbl("focusScore")
        val active     = cog.dbl("activeLoad")
        val research   = cog.dbl("researchLoad")
        val planLoad   = cog.dbl("planningLoad")
        val taskRate   = cog["taskCompletionRate"]?.jsonPrimitive?.contentOrNull
        val streak     = pln.dbl("streakHealth")
        val deadline   = pln.dbl("deadlinePressure")
        val reflStreak = pln.dbl("reflectionStreak")
        val goalAlign  = pln.dbl("goalAlignment")
        val habitMom   = pln.dbl("habitMomentum")
        val friction   = res.dbl("financialFriction")

        val overrides = mutableListOf<String>()

        if (cnsFatigue != null && cnsFatigue >= 9) overrides.add("🚨 CRITICAL: cnsFatigue ≥ 9 — No new tasks. Defer everything except life-critical items. Emit FLATTEN_ENERGY_WAVE.")
        else if (cnsFatigue != null && cnsFatigue >= 8) overrides.add("⚠ OVERRIDE: cnsFatigue ≥ 8 — Flatten schedule. Remove non-critical tasks. Add rest blocks.")

        if (resilience != null && resilience <= 2) overrides.add("🚨 CRITICAL: emotionalResilience ≤ 2 — Defer all deep work and high-stakes tasks. Protect recovery time. Emit BURNOUT_WARNING via Agnes.")
        else if (resilience != null && resilience <= 3) overrides.add("⚠ OVERRIDE: emotionalResilience ≤ 3 — Defer non-essential tasks. Insert emotional recovery buffer blocks.")

        if (stress != null && stress >= 9) overrides.add("🚨 CRITICAL: stressLoad ≥ 9 — Flatten to minimum viable schedule. ONE priority task only. Emit FLATTEN_ENERGY_WAVE.")
        else if (stress != null && stress >= 8) overrides.add("⚠ OVERRIDE: stressLoad ≥ 8 — Add 2× buffer blocks. Reduce activeLoad target by 2.")

        if (active != null && active >= 9) overrides.add("🚨 CRITICAL: activeLoad ≥ 9 — Cognitive overload. Do NOT add tasks. Emit COGNITIVE_OVERLOAD. Identify deferrals first.")
        else if (active != null && active >= 8) overrides.add("⚠ HALT: activeLoad ≥ 8 — No new task scheduling. Identify items to defer or delegate.")

        if (sleep != null && sleep <= 4) overrides.add("⚠ SHIFT: sleepQuality ≤ 4 — No cognitively demanding work before 10am. Morning slots: admin/physical only.")

        if (friction != null && friction >= 7) overrides.add("⚠ REDUCE TARGET: financialFriction ≥ 7 — Financial stress adds ~2pts hidden cognitive load. Reduce active load target accordingly.")

        if (planLoad != null && planLoad >= 7) overrides.add("⚠ SIMPLIFY: planningLoad ≥ 7 — Overhead of planning is itself costly. Use 3-task priority list, not full schedule.")

        if (deadline != null && deadline >= 8) overrides.add("🚨 DEADLINE CRUNCH: deadlinePressure ≥ 8 — Protect deadline tasks. Defer non-deadline items. Emit DEADLINE_CRUNCH.")
        else if (deadline != null && deadline >= 6) overrides.add("⚠ DEADLINE ALERT: deadlinePressure ≥ 6 — Prioritise deadline-bound tasks over exploratory work.")

        if (streak != null && streak <= 3) overrides.add("⚠ STREAK RISK: streakHealth ≤ 3 — Active habits are at risk. Surface easiest habit first to rebuild momentum.")

        if (goalAlign != null && goalAlign < 0.3) overrides.add("⚠ GOAL DRIFT: goalAlignment < 0.3 — Less than 30% of active goals have linked tasks. Prompt user to connect tasks to goals or review goal relevance.")

        if (habitMom != null && habitMom < 0.25) overrides.add("⚠ HABIT STALL: habitMomentum < 0.25 — Most active habits have no live streak. Suggest simplifying to 1-2 keystone habits.")

        var maxLoad = 8
        if (cnsFatigue != null) when {
            cnsFatigue >= 9 -> maxLoad = minOf(maxLoad, 2)
            cnsFatigue >= 8 -> maxLoad = minOf(maxLoad, 3)
            cnsFatigue >= 6 -> maxLoad = minOf(maxLoad, 5)
        }
        if (resilience != null) when {
            resilience <= 2 -> maxLoad = minOf(maxLoad, 3)
            resilience <= 4 -> maxLoad = minOf(maxLoad, 5)
        }
        if (stress != null) when {
            stress >= 9 -> maxLoad = minOf(maxLoad, 2)
            stress >= 8 -> maxLoad = minOf(maxLoad, 5)
        }
        if (friction != null && friction >= 7) maxLoad = maxOf(0, maxLoad - 2)

        val budgetCap = if (energy != null) kotlin.math.round(energy * 1.2).toInt() else null

        val deepWorkWindow = when {
            cnsFatigue == null || sleep == null -> "unknown — calibrate cnsFatigue and sleepQuality"
            cnsFatigue >= 8                     -> "none — CNS fatigue is critical"
            sleep <= 4                          -> "after 10am only (if needed)"
            cnsFatigue <= 4 && sleep >= 7       -> "9am–12pm (peak window)"
            cnsFatigue <= 6                     -> "10am–12pm"
            else                                -> "afternoon only — moderate fatigue"
        }

        val lines = mutableListOf(
            "[ATLAS PLANNING STATE]",
            "Physical: CNS Fatigue ${cnsFatigue.d()}/10, Sleep ${sleep.d()}/10, Recovery ${recovery.d()}/10",
            "Emotional: Resilience ${resilience.d()}/10, Stress ${stress.d()}/10, Mood: ${mood ?: "unknown"}",
            "Cognitive: Energy ${energy.d()}/10, Focus ${focus.d()}/10, Active Load ${active.d()}/10, Research Load ${research.d()}/10",
            "Planning: Planning Load ${planLoad.d()}/10, Task Completion Rate ${taskRate ?: "unknown"}, Streak Health ${streak.d()}/10, Deadline Pressure ${deadline.d()}/10",
            "Planning (engagement): Reflection Streak ${reflStreak.d()} days, Goal Alignment ${goalAlign.d()}, Habit Momentum ${habitMom.d()}",
            "Resource: Financial Friction ${friction.d()}/10",
            "",
            "DERIVED MAX SUSTAINABLE LOAD: $maxLoad/10",
            if (budgetCap != null) "ENERGY BUDGET CAP: Total task energyCost ≤ $budgetCap" else "ENERGY BUDGET CAP: unknown",
            "DEEP WORK WINDOW: $deepWorkWindow",
        )

        if (overrides.isNotEmpty()) {
            lines.add("")
            lines.add("ACTIVE PLANNING OVERRIDES (MANDATORY):")
            overrides.forEach { lines.add("  $it") }
        } else {
            lines.add("")
            lines.add("PLANNING STATUS: All clear — normal scheduling viable.")
        }

        return lines.joinToString("\n")
    }

    // ── helpers ─────────────────────────────────────────────────────────────

    private val JsonElement.jsonObjectOrNull: JsonObject?
        get() = this as? JsonObject

    /** Return the first non-null, non-JsonNull value. */
    private fun pickDefined(vararg values: JsonElement?): JsonElement? {
        for (v in values) {
            if (v != null && v !is JsonNull) return v
        }
        return null
    }

    /**
     * Coerce a JSON value to match the expected type for [fieldName].
     *
     * - **Numeric fields** (default): if the value is a JSON string, attempt to
     *   parse it as a Double; return JsonNull on failure.
     * - **String fields** (hormonalContext, moodTrend): pass through any primitive
     *   as its string content.
     * - **Array fields** (traumaMarkers): pass through if JsonArray, otherwise JsonNull.
     * - **null / JsonNull**: always returns JsonNull.
     */
    private fun coerceField(fieldName: String, value: JsonElement?): JsonElement {
        if (value == null || value is JsonNull) return JsonNull

        return when {
            fieldName in ARRAY_FIELDS -> {
                if (value is JsonArray) value else JsonNull
            }
            fieldName in STRING_FIELDS -> {
                (value as? JsonPrimitive)?.let { JsonPrimitive(it.content) } ?: JsonNull
            }
            else -> {
                when (value) {
                    is JsonPrimitive -> {
                        val dbl = value.doubleOrNull
                        if (dbl != null && dbl.isFinite()) JsonPrimitive(dbl) else JsonNull
                    }
                    else -> JsonNull
                }
            }
        }
    }
}
