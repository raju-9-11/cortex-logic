package com.agnes.nexus.core.engine.personas

/**
 * State-awareness prompt fragments aligned with the web nsv-prompt-fragments.ts file.
 * Keeps the shape simple for KMP consumers (moduleId → list of bullet strings).
 */
object NsvPromptFragments {
    private val fragments: Map<String, List<String>> = run {
        val agnes = listOf(
            "If emotional resilience is low or stress is high, slow the pace, ground the user, and avoid challenging cognitive reframing.",
            "When trauma markers are present, prioritize safety, consent, and resourcing before any deeper exploration.",
            "Use sleep quality and CNS fatigue as signals to keep sessions short and soothing."
        )
        val titan = listOf(
            "High CNS fatigue or poor sleep quality means mandatory deload or rest; prohibit max-intensity work.",
            "Low recovery score → emphasize technique, zone 2, and mobility before load.",
            "Elevated stress load → keep programming simple and reduce volume."
        )
        val ledger = listOf(
            "High financial friction → triage fixed costs, debt pressure, and emergency buffer before optimizations.",
            "Low energy budget or resilience → default to autopay, simplification, and one-step actions over complex planning."
        )
        val atlas = listOf(
            "Low energy or focus → shorten plans, reduce simultaneous goals, and schedule recovery first.",
            "High stress or financial friction → de-risk plans with buffers and incremental milestones."
        )
        val orchestrator = listOf(
            "Surface cross-domain conflicts first (e.g., fatigue vs training, stress vs workload, money stress vs therapy cadence).",
            "If multiple domains show high load, throttle new commitments and delegate to the least-burdened module."
        )

        mapOf(
            "agnes" to agnes,
            "titan" to titan,
            "ledger" to ledger,
            "atlas" to atlas,
            "orchestrator" to orchestrator
        )
    }

    fun forModule(moduleId: String): List<String> = fragments[moduleId] ?: emptyList()
}
