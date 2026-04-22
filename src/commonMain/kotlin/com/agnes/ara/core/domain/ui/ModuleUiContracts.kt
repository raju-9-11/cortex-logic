package com.agnes.ara.core.domain.ui

import kotlinx.serialization.Serializable

/**
 * Contract for a module's UI, derived from web module pages.
 *
 * Note: labels/icons are Android concerns; the contract is only about stable ids + routing.
 */
@Serializable
data class ModuleUiContract(
    val moduleId: String,
    val tabs: List<ModuleUiTab>,
    val defaultTabId: String,
    val focusTabMappings: List<ModuleUiFocusMapping> = emptyList(),
    val intakeSteps: List<IntakeStep> = emptyList(),
    val completeActionType: String? = null
)

/**
 * Canonical module UI contracts sourced from web parity targets.
 *
 * For now this is intentionally a minimal registry; we expand module coverage
 * as we wire more modules end-to-end.
 */
object ModuleUiContracts {

    val atlas: ModuleUiContract = ModuleUiContract(
        moduleId = "atlas",
        tabs = listOf(
            ModuleUiTab("dashboard", order = 0),
            ModuleUiTab("backlog", order = 1),
            ModuleUiTab("routines", order = 2),
            ModuleUiTab("journal", order = 3),
            ModuleUiTab("analytics", order = 4),
            ModuleUiTab("fields", order = 5),
            ModuleUiTab("review", order = 6),
        ),
        defaultTabId = "dashboard",
        focusTabMappings = listOf(
            // Mirrors web: focusId "task:<id>" navigates to Backlog; "journal:<id>" -> Journal tab.
            ModuleUiFocusMapping(focusPrefix = "task:", tabId = "backlog"),
            ModuleUiFocusMapping(focusPrefix = "journal:", tabId = "journal"),
            ModuleUiFocusMapping(focusPrefix = "goal:", tabId = "backlog"),
            ModuleUiFocusMapping(focusPrefix = "habit:", tabId = "routines"),
            ModuleUiFocusMapping(focusPrefix = "review:", tabId = "review"),
            ModuleUiFocusMapping(focusPrefix = "projection:", tabId = "analytics"),
            ModuleUiFocusMapping(focusPrefix = "insight:", tabId = "analytics"),
            ModuleUiFocusMapping(focusPrefix = "energy:", tabId = "dashboard"),
            ModuleUiFocusMapping(focusPrefix = "focus:", tabId = "dashboard"),
        ),
        intakeSteps = listOf(
            IntakeStep("wave", "Energy Wave", "Capture high-focus windows and crash zones.", focusActions = listOf("focus_energy_wave")),
            IntakeStep("load", "Load Pressure", "Capture current cognitive load and overload triggers.", focusActions = listOf("focus_load_pressure")),
            IntakeStep("recovery", "Recovery Constraints", "Capture recovery windows and non-negotiable breaks.", focusActions = listOf("focus_recovery_constraints")),
            IntakeStep("summary", "Execution Baseline", "Finalize Atlas scheduling baseline and activation.", focusActions = listOf("focus_execution_baseline"))
        ),
        completeActionType = "complete_atlas_onboarding"
    )

    val titan: ModuleUiContract = ModuleUiContract(
        moduleId = "titan",
        tabs = listOf(
            ModuleUiTab("train", order = 0),
            ModuleUiTab("plan", order = 1),
            ModuleUiTab("analytics", order = 2),
            ModuleUiTab("body", order = 3),
            ModuleUiTab("sleep", order = 4),
            ModuleUiTab("cycles", order = 5),
        ),
        defaultTabId = "train",
        focusTabMappings = listOf(
            // Focus a workout/session request into the Train surface.
            ModuleUiFocusMapping(focusPrefix = "session:", tabId = "train")
        ),
        intakeSteps = listOf(
            IntakeStep("nutrition", "Nutrition Baseline", "Capture dietary preferences and constraints.", focusActions = listOf("focus_nutrition")),
            IntakeStep("biometrics", "Physical Baseline", "Capture biometrics and movement limitations.", focusActions = listOf("focus_physical_data")),
            IntakeStep("goals", "Training Baseline", "Capture primary goals and historical context.", focusActions = listOf("focus_history_goals"))
        ),
        completeActionType = "complete_titan_onboarding"
    )

    val agnes: ModuleUiContract = ModuleUiContract(
        moduleId = "agnes",
        tabs = listOf(
            ModuleUiTab("session", order = 0),
            ModuleUiTab("somatic", order = 1)
        ),
        defaultTabId = "session",
        focusTabMappings = listOf(
            ModuleUiFocusMapping(focusPrefix = "session:", tabId = "session"),
            ModuleUiFocusMapping(focusPrefix = "somatic:", tabId = "somatic"),
            ModuleUiFocusMapping(focusPrefix = "breath:", tabId = "somatic"),
            ModuleUiFocusMapping(focusPrefix = "body:", tabId = "somatic")
        ),
        intakeSteps = listOf(
            IntakeStep("identity", "Identity Baseline", "Capture preferred name and pronouns.", focusActions = listOf("focus_identity")),
            IntakeStep("background", "Personal Context", "Capture emotional and therapeutic background.", focusActions = listOf("focus_background")),
            IntakeStep("struggles", "Current Struggles", "Capture primary concerns and pain points.", focusActions = listOf("focus_struggles")),
            IntakeStep("goals", "Therapeutic Goals", "Capture desired outcomes and milestones.", focusActions = listOf("focus_goals")),
            IntakeStep("preferences", "Session Style", "Capture preferred tone and agent personality.", focusActions = listOf("focus_preferences"))
        ),
        completeActionType = "complete_agnes_onboarding"
    )

    val ledger: ModuleUiContract = ModuleUiContract(
        moduleId = "ledger",
        tabs = listOf(
            ModuleUiTab("dashboard", order = 0),
            ModuleUiTab("transactions", order = 1),
            ModuleUiTab("budget", order = 2),
            ModuleUiTab("goals", order = 3),
            ModuleUiTab("tax", order = 4)
        ),
        defaultTabId = "dashboard",
        focusTabMappings = listOf(
            ModuleUiFocusMapping(focusPrefix = "transaction:", tabId = "transactions"),
            ModuleUiFocusMapping(focusPrefix = "budget:", tabId = "budget"),
            ModuleUiFocusMapping(focusPrefix = "goal:", tabId = "goals"),
            ModuleUiFocusMapping(focusPrefix = "tax:", tabId = "tax"),
            ModuleUiFocusMapping(focusPrefix = "report:", tabId = "tax"),
            ModuleUiFocusMapping(focusPrefix = "analytics:", tabId = "dashboard"),
            ModuleUiFocusMapping(focusPrefix = "insight:", tabId = "dashboard")
        ),
        intakeSteps = listOf(
            IntakeStep("income", "Income Profile", "Capture monthly cashflow and income sources.", focusActions = listOf("focus_income")),
            IntakeStep("expenses", "Expense Baseline", "Capture fixed and variable expenditure patterns.", focusActions = listOf("focus_expenses")),
            IntakeStep("debt", "Balance Sheet", "Capture debt obligations and savings goals.", focusActions = listOf("focus_debt_goals")),
            IntakeStep("horizon", "Planning Horizon", "Capture timeframes and priority settings.", focusActions = listOf("focus_plan_horizon"))
        ),
        completeActionType = "complete_ledger_onboarding"
    )

    val soma: ModuleUiContract = ModuleUiContract(
        moduleId = "soma",
        tabs = listOf(
            ModuleUiTab("dashboard", order = 0),
            ModuleUiTab("vitals", order = 1),
            ModuleUiTab("assessments", order = 2),
            ModuleUiTab("history", order = 3),
            ModuleUiTab("labs", order = 4),
            ModuleUiTab("chat", order = 5)
        ),
        defaultTabId = "dashboard",
        focusTabMappings = listOf(
            ModuleUiFocusMapping(focusPrefix = "biomarker:", tabId = "vitals"),
            ModuleUiFocusMapping(focusPrefix = "vital:", tabId = "vitals"),
            ModuleUiFocusMapping(focusPrefix = "clearance:", tabId = "assessments"),
            ModuleUiFocusMapping(focusPrefix = "assessment:", tabId = "assessments"),
            ModuleUiFocusMapping(focusPrefix = "lab:", tabId = "labs"),
            ModuleUiFocusMapping(focusPrefix = "report:", tabId = "labs"),
            ModuleUiFocusMapping(focusPrefix = "history:", tabId = "history"),
            ModuleUiFocusMapping(focusPrefix = "readiness:", tabId = "dashboard")
        ),
        intakeSteps = listOf(
            IntakeStep("vitals", "Biometric Baseline", "Capture current vitals and physical readings.", focusActions = listOf("focus_vitals")),
            IntakeStep("conditions", "Health History", "Capture known conditions and allergies.", focusActions = listOf("focus_conditions")),
            IntakeStep("meds", "Pharmacology", "Capture current medications and supplements.", focusActions = listOf("focus_meds"))
        ),
        completeActionType = "complete_soma_onboarding"
    )

    val scout: ModuleUiContract = ModuleUiContract(
        moduleId = "scout",
        tabs = listOf(
            ModuleUiTab("research", order = 0),
            ModuleUiTab("overview", order = 1),
            ModuleUiTab("sources", order = 2),
            ModuleUiTab("briefings", order = 3),
            ModuleUiTab("consult", order = 4)
        ),
        defaultTabId = "research",
        intakeSteps = listOf(
            IntakeStep("focus", "Research Focus", "Capture primary domains of interest.", focusActions = listOf("focus_research_focus")),
            IntakeStep("quality", "Evidence Quality", "Capture source verification thresholds.", focusActions = listOf("focus_evidence_quality")),
            IntakeStep("output", "Output Strategy", "Capture preferred intelligence delivery formats.", focusActions = listOf("focus_output_shape")),
            IntakeStep("summary", "Mission Baseline", "Finalize research intent and scope.", focusActions = listOf("focus_baseline_summary"))
        ),
        completeActionType = "complete_scout_onboarding"
    )

    val forge: ModuleUiContract = ModuleUiContract(
        moduleId = "forge",
        tabs = listOf(
            ModuleUiTab("workspace", order = 0),
            ModuleUiTab("artifacts", order = 1),
            ModuleUiTab("onboarding", order = 2)
        ),
        defaultTabId = "workspace",
        intakeSteps = listOf(
            IntakeStep("environment", "Execution Context", "Capture local/cloud/hybrid preference.", focusActions = listOf("focus_environment")),
            IntakeStep("safety", "Safety Mode", "Capture strict vs balanced execution policy.", focusActions = listOf("focus_safety")),
            IntakeStep("reporting", "Report Style", "Capture concise vs detailed execution reporting.", focusActions = listOf("focus_reporting")),
            IntakeStep("summary", "Baseline Summary", "Finalize Forge baseline and activate mode.", focusActions = listOf("focus_summary"))
        ),
        completeActionType = "complete_forge_onboarding"
    )

    val hub: ModuleUiContract = ModuleUiContract(
        moduleId = "hub",
        tabs = listOf(
            ModuleUiTab("overview", order = 0),
            ModuleUiTab("modules", order = 1),
            ModuleUiTab("recent", order = 2),
            ModuleUiTab("recommended", order = 3)
        ),
        defaultTabId = "overview"
    )

    val profile: ModuleUiContract = ModuleUiContract(
        moduleId = "profile",
        tabs = listOf(
            ModuleUiTab("identity", order = 0),
            ModuleUiTab("security", order = 1),
            ModuleUiTab("system", order = 2),
            ModuleUiTab("data", order = 3)
        ),
        defaultTabId = "identity",
        focusTabMappings = listOf(
            ModuleUiFocusMapping(focusPrefix = "identity:", tabId = "identity"),
            ModuleUiFocusMapping(focusPrefix = "security:", tabId = "security"),
            ModuleUiFocusMapping(focusPrefix = "vault:", tabId = "security"),
            ModuleUiFocusMapping(focusPrefix = "permission:", tabId = "system"),
            ModuleUiFocusMapping(focusPrefix = "system:", tabId = "system"),
            ModuleUiFocusMapping(focusPrefix = "backup:", tabId = "data"),
            ModuleUiFocusMapping(focusPrefix = "data:", tabId = "data")
        )
    )

    val orchestrator: ModuleUiContract = ModuleUiContract(
        moduleId = "orchestrator",
        tabs = listOf(
            ModuleUiTab("dashboard", order = 0)
        ),
        defaultTabId = "dashboard",
        intakeSteps = listOf(
            IntakeStep("identity", "Identity Baseline", "Capture preferred name and pronouns.", focusActions = listOf("focus_identity")),
            IntakeStep("bio", "Bio Context", "Capture optional biological and lifestyle context.", focusActions = listOf("focus_bio")),
            IntakeStep("review", "Protocol Commit", "Review and commit Nexus onboarding.", focusActions = listOf("focus_review"))
        ),
        completeActionType = "complete_orchestrator_onboarding"
    )

    /**
     * Safe contract lookup.
     * - Unknown modules fall back to a single-tab contract.
     */
    fun contractFor(moduleId: String): ModuleUiContract = when (moduleId.lowercase()) {
        "atlas" -> atlas
        "titan" -> titan
        "agnes" -> agnes
        "ledger" -> ledger
        "soma" -> soma
        "scout" -> scout
        "forge" -> forge
        "hub" -> hub
        "profile" -> profile
        "orchestrator" -> orchestrator
        else -> ModuleUiContract(
            moduleId = moduleId,
            tabs = listOf(ModuleUiTab("default", order = 0)),
            defaultTabId = "default"
        )
    }
}
