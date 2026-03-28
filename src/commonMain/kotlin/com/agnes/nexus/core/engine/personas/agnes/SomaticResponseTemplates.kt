package com.agnes.nexus.core.engine.personas.agnes

/**
 * Somatic Response Templates for Agnes
 *
 * These templates provide structured response patterns for common physical sensations
 * reported by clients. Each template follows the clinical sequence:
 * 1. Normalize (validate sensation as meaningful)
 * 2. Metaphor (accessible language linking stress to body)
 * 3. Reframe (interpret as communication, not pathology)
 * 4. Explore (open-ended question about underlying need)
 *
 * Ported from web: src/modules/agnes/prompts/somatic-response-templates.ts
 */
data class SomaticTemplate(
    val sensation: String,
    val normalize: String,
    val metaphor: String,
    val reframe: String,
    val exploration: String
) {
    fun fullResponse(): String = """
$normalize

$metaphor $reframe $exploration
    """.trimIndent()
}

/**
 * Pre-built somatic response templates for common physical sensations.
 * Use [selectSomaticTemplate] to match client description to a template.
 */
object SomaticResponseTemplates {

    /**
     * Chest Pressure + Urge to Punch
     * Common in high stress, anger/frustration, suppressed aggression
     * CLINICAL SEQUENCE: Validate → Regulate → Explore
     */
    val chestPressure = SomaticTemplate(
        sensation = "chest pressure with urge to punch",
        normalize = "That chest pressure and urge to punch—your anger makes complete sense. Your body is trying to push back and release the pressure that's built up.",
        metaphor = "It's like your nervous system is activated and looking for discharge, the way pressure builds in a system until it has to release.",
        reframe = "This isn't something to be ashamed of. Your system is communicating that it needs to move and discharge that activation.",
        exploration = "Before we explore what's underneath, let's help your body release this safely. What would help right now—movement, intense breathing, or something else? Once your nervous system settles, we can look at what's driving this."
    )

    /**
     * Muscle Tension / Tightness
     * Common in sustained stress, anxiety, emotional suppression
     */
    val muscleTension = SomaticTemplate(
        sensation = "muscle tension or tightness",
        normalize = "Your body is holding that tension as protection. That's a completely understandable response to what you're carrying.",
        metaphor = "When we're under pressure, muscles contract as if bracing for impact.",
        reframe = "This tension is telling me your system is working hard to keep things together.",
        exploration = "Where does your body want to go with this? What would relief look like — would it be release, movement, rest, or something else?"
    )

    /**
     * Throat Tightness / Difficulty Speaking
     * Common in suppressed emotions, fear of judgment, grief
     */
    val throatTightness = SomaticTemplate(
        sensation = "throat tightness or difficulty speaking",
        normalize = "That tightness in your throat is often the body's way of protecting itself when emotions feel too big or unsafe to express.",
        metaphor = "It's like your throat is a gatekeeper, deciding what's safe to let out.",
        reframe = "This tightness is your system saying something wants to come out but it's not sure it's safe.",
        exploration = "What do you think is trying to come out? And what would need to happen for it to feel safe to let it?"
    )

    /**
     * Stomach / Gut Tension
     * Common in anxiety, intuitive sensing of threat, shame
     */
    val gutTension = SomaticTemplate(
        sensation = "stomach tightness or gut tension",
        normalize = "Your gut is incredibly intelligent. When it tightens, it's often picking up on something your conscious mind hasn't quite articulated yet.",
        metaphor = "The gut responds to threat or uncertainty long before the thinking brain catches up.",
        reframe = "This tension is your system's way of saying \"Something isn't right, pay attention.\"",
        exploration = "Before we explore what your gut is picking up on, let's let your nervous system settle a little. Try a few slower, deeper breaths — or simply notice the weight of your body. Once you feel that tightening ease even a fraction, we can look at what it's trying to signal."
    )

    /**
     * Heaviness / Fatigue
     * Common in depression, depletion, suppressed grief, dissociation
     */
    val heaviness = SomaticTemplate(
        sensation = "heaviness or fatigue throughout the body",
        normalize = "That heaviness often carries something — grief, exhaustion, or the weight of carrying things alone.",
        metaphor = "It's like your body is saying \"I'm tired of holding this.\"",
        reframe = "This isn't laziness or weakness. It's your system communicating that something needs to shift.",
        exploration = "What is the weight that your body is carrying? What would it mean to set it down, even for a moment?"
    )

    /**
     * Tremor / Shakiness
     * Common in anxiety, activation, grief, dissociation
     * SAFETY NOTE: Gate tremor allowance behind grounding-first; check-in before any encouragement to allow tremor.
     */
    val tremor = SomaticTemplate(
        sensation = "tremor or shakiness",
        normalize = "Tremor is often the body's way of releasing activation or emotion that needs to move through.",
        metaphor = "It's like your nervous system is discharging energy, the way thunder releases pressure from a storm.",
        reframe = "That shaking is actually a sign your body is trying to process and release, not that something is wrong.",
        exploration = "First — let's help your system feel safe. Try pressing your feet firmly into the floor and looking slowly around the room, naming a few things you can see. How does that feel? If the shaking continues after grounding and you feel stable — not overwhelmed — that can sometimes be your system releasing. But let's not rush it."
    )

    /**
     * Numbness / Disconnection
     * Common in trauma, dissociation, overwhelm, protection
     * CONTRAINDICATION: Do NOT use exploration questions when dissociation/numbness is active — use grounding only.
     */
    val numbness = SomaticTemplate(
        sensation = "numbness or feeling disconnected from the body",
        normalize = "That numbness is actually a protective response. When emotions become too much, the body sometimes goes quiet to survive.",
        metaphor = "It's like your body is saying \"This is too much right now, I need to step back.\"",
        reframe = "This isn't a sign you're broken. It's evidence of how resilient you are — your system knows how to protect you.",
        exploration = "That disconnection makes sense — your system is protecting you. Let's not push into it right now. Can you feel your feet on the floor? Try pressing them down gently. Notice the weight of your body in the seat. We can stay here for a moment before going anywhere."
    )

    /**
     * Racing Heart / Palpitations
     * Common in anxiety, panic, fear, acute stress
     */
    val racingHeart = SomaticTemplate(
        sensation = "racing heart or palpitations",
        normalize = "Your heart is responding to something your system perceives as urgent or unsafe. That's exactly what it's designed to do.",
        metaphor = "When your nervous system detects threat, your heart rate increases to prepare your body to respond.",
        reframe = "This racing is your body mobilizing energy, not a sign something is medically wrong (though if this is new or severe, checking with a doctor is reasonable).",
        exploration = "Let's slow your breathing first — even a few longer exhales can signal safety to your nervous system. Try it now. How does that feel? Has anything shifted in your chest? Once your system settles, we can look at what it was responding to."
    )

    /**
     * Breathing Difficulty / Chest Tightness (Anxiety Variant)
     * Common in anxiety, panic, hyperventilation
     * NOTE: Distinct from chestPressure which pairs with anger/aggression urges
     */
    val breathingDifficulty = SomaticTemplate(
        sensation = "difficulty breathing or chest tightness from anxiety",
        normalize = "When your nervous system is activated, your breathing naturally becomes shallow — it's part of the fight-or-flight response.",
        metaphor = "Your chest tightens as if to brace for something, which makes it harder to take full breaths.",
        reframe = "This isn't dangerous, even though it feels scary. Your body is trying to protect you, but it's over-protecting.",
        exploration = "Let's help your breathing settle first with some slower, longer breaths. Once your chest opens back up, we can explore what your system is bracing against."
    )

    /**
     * Jaw Clenching / Teeth Grinding
     * Common in stress, suppressed anger, tension
     */
    val jawClenching = SomaticTemplate(
        sensation = "jaw clenching or teeth grinding",
        normalize = "Your jaw often holds tension when you're under stress or when emotions feel unsafe to express.",
        metaphor = "The jaw clench is like your system saying \"I'm holding this in, I'm not letting this out.\"",
        reframe = "This tension is your body's way of controlling something — often speech, anger, or emotion that feels risky.",
        exploration = "What is your jaw protecting you from expressing? What would happen if you slowly released that grip? Let's try gently unclenching and noticing what comes up."
    )

    /**
     * All templates indexed by key for lookup
     */
    val all: Map<String, SomaticTemplate> = mapOf(
        "chestPressure" to chestPressure,
        "muscleTension" to muscleTension,
        "throatTightness" to throatTightness,
        "gutTension" to gutTension,
        "heaviness" to heaviness,
        "tremor" to tremor,
        "numbness" to numbness,
        "racingHeart" to racingHeart,
        "breathingDifficulty" to breathingDifficulty,
        "jawClenching" to jawClenching
    )
}

/**
 * Select a somatic template based on client description.
 * PRIORITIZES body location first, then sensation type.
 * This prevents issues like "my chest feels tight" matching generic tension instead of chest-specific.
 *
 * @param clientDescription The client's description of their physical sensation
 * @return A matching [SomaticTemplate] or null if no match found
 */
fun selectSomaticTemplate(clientDescription: String): SomaticTemplate? {
    val lowerDescription = clientDescription.lowercase()

    // STEP 1: Check for specific body locations first (highest priority)

    // Chest-related: check both anger/pressure variant AND anxiety/breathing variant
    if ("chest" in lowerDescription) {
        return when {
            "pressure" in lowerDescription || "punch" in lowerDescription || 
            "hit" in lowerDescription || "anger" in lowerDescription -> 
                SomaticResponseTemplates.chestPressure
            "breath" in lowerDescription || "breathe" in lowerDescription || 
            "tight" in lowerDescription -> 
                SomaticResponseTemplates.breathingDifficulty
            // Default to breathing difficulty for general chest tightness
            else -> SomaticResponseTemplates.breathingDifficulty
        }
    }

    // Throat-related
    if ("throat" in lowerDescription || "neck" in lowerDescription) {
        return SomaticResponseTemplates.throatTightness
    }

    // Stomach/Gut-related
    if ("stomach" in lowerDescription || "gut" in lowerDescription || "belly" in lowerDescription) {
        return SomaticResponseTemplates.gutTension
    }

    // Jaw-related
    if ("jaw" in lowerDescription || "teeth" in lowerDescription || 
        "grind" in lowerDescription || "clench" in lowerDescription) {
        return SomaticResponseTemplates.jawClenching
    }

    // Heart-related
    if ("heart" in lowerDescription || "palpitation" in lowerDescription || 
        "racing" in lowerDescription || "pound" in lowerDescription) {
        return SomaticResponseTemplates.racingHeart
    }

    // Breathing-related (general, not chest-specific)
    if ("breath" in lowerDescription && "chest" !in lowerDescription) {
        return SomaticResponseTemplates.breathingDifficulty
    }

    // STEP 2: Check for general sensation types (lower priority)

    // Muscle/tension (generic body areas without specific location)
    if ("muscle" in lowerDescription || "shoulder" in lowerDescription || "back" in lowerDescription) {
        return SomaticResponseTemplates.muscleTension
    }

    // General tension/tightness (catch-all, lowest priority)
    if ("tension" in lowerDescription || ("tight" in lowerDescription && "chest" !in lowerDescription)) {
        return SomaticResponseTemplates.muscleTension
    }

    // Heaviness/fatigue
    if ("heavy" in lowerDescription || "fatigue" in lowerDescription || 
        "tired" in lowerDescription || "weigh" in lowerDescription) {
        return SomaticResponseTemplates.heaviness
    }

    // Tremor/shakiness
    if ("tremble" in lowerDescription || "shake" in lowerDescription || 
        "shaking" in lowerDescription || "quiver" in lowerDescription) {
        return SomaticResponseTemplates.tremor
    }

    // Numbness/disconnection/dissociation
    if ("numb" in lowerDescription || "disconnected" in lowerDescription || 
        "empty" in lowerDescription || "dissociat" in lowerDescription) {
        return SomaticResponseTemplates.numbness
    }

    return null
}

/**
 * Build a personalized somatic response for a given sensation.
 *
 * @param sensation The client's description of their physical sensation
 * @param addPostResponse Optional additional text to append after the response
 * @return The full somatic response or empty string if no template matches
 */
fun buildSomaticResponse(
    sensation: String,
    addPostResponse: String? = null
): String {
    val template = selectSomaticTemplate(sensation) ?: return ""
    
    var response = template.fullResponse()
    
    if (!addPostResponse.isNullOrBlank()) {
        response += "\n\n$addPostResponse"
    }
    
    return response
}
