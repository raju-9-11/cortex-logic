package com.agnes.ara.core.domain.models

object ModuleOnboardingConfigs {
    val NEXUS_BASE_SPEC = ModuleOnboardingSpec(
        moduleId = "nexus",
        displayName = "Nexus",
        themeColor = "indigo",
        iconName = "sparkles",
        goal = "Capture identity baseline so the Nexus orchestrator can personalise every cross-module interaction.",
        context = "Nexus is the system orchestrator. It routes between Agnes (therapy), Titan (fitness), Soma (health), Ledger (finance), Atlas (productivity), Scout (research), and Forge (dev). Knowing the user's name, pronouns, occupation, and sleep patterns lets Nexus tailor tone, timing, and recommendations across every module.",
        fastTrackEnabled = true,
        fastTrackRequiredIds = listOf("preferred_name"),
        dataPoints = listOf(
            OnboardingDataPoint("preferred_name", "Preferred name", FieldType.TEXT, required = true),
            OnboardingDataPoint("pronouns", "Pronouns", FieldType.TEXT, required = false, hint = "e.g. he/him, she/her, they/them — freeform", autocomplete = listOf("he/him", "she/her", "they/them", "ze/zir", "xe/xem", "fae/faer", "any")),
            OnboardingDataPoint("occupation", "Occupation or role", FieldType.TEXT, required = false),
            OnboardingDataPoint("typical_sleep_hours", "Typical nightly sleep (hours)", FieldType.NUMBER, required = false, hint = "Integer 4–12"),
            OnboardingDataPoint("age", "Age", FieldType.NUMBER, required = false, hint = "Integer 13–120"),
            OnboardingDataPoint("agent_gender", "Preferred agent presentation", FieldType.SELECT, required = false, hint = "How all agents should present — affects pronoun usage across the entire system", options = listOf(FieldOption("male", "Male"), FieldOption("female", "Female"), FieldOption("non-binary", "Non-binary")))
        )
    )

    val AGNES_BASE_SPEC = ModuleOnboardingSpec(
        moduleId = "agnes",
        displayName = "Agnes",
        themeColor = "violet",
        iconName = "brain",
        goal = "Capture therapeutic baseline so Agnes can provide contextualised emotional support.",
        context = "Agnes is a therapy and emotional support agent. Understanding the user's background, current struggles, therapy goals, preferred tone, and comfort with agent gender helps Agnes calibrate session style and avoid mismatches that could harm the therapeutic relationship.",
        fastTrackEnabled = true,
        fastTrackRequiredIds = listOf("background", "goals"),
        dataPoints = listOf(
            OnboardingDataPoint("background", "Personal or emotional background", FieldType.TEXTAREA, required = true, hint = "Free-form — what context should Agnes know before the first session?"),
            OnboardingDataPoint("current_struggles", "Current struggles or concerns", FieldType.TEXTAREA, required = false),
            OnboardingDataPoint("goals", "Therapy goals", FieldType.TEXTAREA, required = true, hint = "What does the user want to achieve?"),
            OnboardingDataPoint("tone_preference", "Preferred conversational tone", FieldType.SELECT, required = false, hint = "Options: warm/supportive, direct/analytical, balanced", options = listOf(FieldOption("warm/supportive", "Warm / Supportive"), FieldOption("direct/analytical", "Direct / Analytical"), FieldOption("balanced", "Balanced")))
        )
    )

    val TITAN_BASE_SPEC = ModuleOnboardingSpec(
        moduleId = "titan",
        displayName = "Titan",
        themeColor = "orange",
        iconName = "activity",
        goal = "Capture fitness baseline so Titan can generate personalised programming and track progress accurately.",
        context = "Titan is the fitness and training agent. It tracks workouts, sleep, recovery, cycles, and biomarkers. A good baseline includes training goal, experience level, available equipment, schedule availability, biometrics (weight/height), any injuries, and supplement use.",
        fastTrackEnabled = true,
        fastTrackRequiredIds = listOf("goal", "experience_level", "days_per_week"),
        dataPoints = listOf(
            OnboardingDataPoint("goal", "Primary training goal", FieldType.SELECT, required = true, hint = "Options: strength, muscle, fat_loss, endurance, athletic, maintenance", options = listOf(FieldOption("strength", "Strength"), FieldOption("muscle", "Muscle / Hypertrophy"), FieldOption("fat_loss", "Fat Loss"), FieldOption("endurance", "Endurance"), FieldOption("athletic", "Athletic Performance"), FieldOption("maintenance", "Maintenance"))),
            OnboardingDataPoint("experience_level", "Training experience", FieldType.SELECT, required = true, hint = "Options: beginner (<1yr), intermediate (1–3yr), advanced (3+yr)", options = listOf(FieldOption("beginner", "Beginner (< 1 year)"), FieldOption("intermediate", "Intermediate (1–3 years)"), FieldOption("advanced", "Advanced (3+ years)"))),
            OnboardingDataPoint("days_per_week", "Available training days per week", FieldType.NUMBER, required = true, hint = "Integer 1–7"),
            OnboardingDataPoint("equipment", "Available equipment", FieldType.MULTI_SELECT, required = false, hint = "Options: barbell, dumbbells, cables, machines, bodyweight, bands", options = listOf(FieldOption("barbell", "Barbell"), FieldOption("dumbbells", "Dumbbells"), FieldOption("cables", "Cable Machine"), FieldOption("machines", "Machines"), FieldOption("bodyweight", "Bodyweight"), FieldOption("bands", "Resistance Bands"))),
            OnboardingDataPoint("weight_kg", "Bodyweight (kg)", FieldType.NUMBER, required = false),
            OnboardingDataPoint("height_cm", "Height (cm)", FieldType.NUMBER, required = false),
            OnboardingDataPoint("injuries", "Injuries or movement restrictions", FieldType.TEXTAREA, required = false, hint = "List joints or movements to avoid"),
            OnboardingDataPoint("supplements", "Current supplements", FieldType.TEXT, required = false)
        )
    )

    val SOMA_BASE_SPEC = ModuleOnboardingSpec(
        moduleId = "soma",
        displayName = "Soma",
        themeColor = "rose",
        iconName = "heart-pulse",
        goal = "Capture medical baseline so Soma can track biomarkers and flag clinically relevant patterns.",
        context = "Soma is the medical and health tracking agent. It monitors vitals, lab results, symptoms, and medication adherence. Knowing existing conditions, allergies, and medications lets Soma contextualise every reading and surface relevant alerts.",
        fastTrackEnabled = false,
        fastTrackRequiredIds = emptyList(),
        dataPoints = listOf(
            OnboardingDataPoint("conditions", "Chronic conditions or diagnoses", FieldType.TEXTAREA, required = false, hint = "e.g. hypertension, type 2 diabetes, asthma"),
            OnboardingDataPoint("allergies", "Known allergies", FieldType.TEXT, required = false),
            OnboardingDataPoint("medications", "Current medications", FieldType.TEXTAREA, required = false, hint = "Name, dose, frequency")
        )
    )

    val LEDGER_BASE_SPEC = ModuleOnboardingSpec(
        moduleId = "ledger",
        displayName = "Ledger",
        themeColor = "cyan",
        iconName = "clipboard-list",
        goal = "Capture financial baseline so Ledger can automate cashflow analysis and planning.",
        context = "Ledger is the personal finance and planning agent. It tracks income, expenses, debts, savings goals, and generates financial plans. A good baseline needs currency, monthly income, expense categories, debt obligations, savings priorities, and planning horizon preference.",
        fastTrackEnabled = true,
        fastTrackRequiredIds = listOf("currency", "monthly_income", "planning_horizon"),
        dataPoints = listOf(
            OnboardingDataPoint("currency", "Primary currency", FieldType.SELECT, required = true, hint = "ISO 4217 codes — e.g. USD, EUR, GBP, INR", options = listOf(FieldOption("USD", "USD — US Dollar"), FieldOption("EUR", "EUR — Euro"), FieldOption("GBP", "GBP — British Pound"), FieldOption("INR", "INR — Indian Rupee"), FieldOption("AUD", "AUD — Australian Dollar"), FieldOption("CAD", "CAD — Canadian Dollar"), FieldOption("JPY", "JPY — Japanese Yen"), FieldOption("BRL", "BRL — Brazilian Real"), FieldOption("MXN", "MXN — Mexican Peso"), FieldOption("other", "Other"))),
            OnboardingDataPoint("monthly_income", "Monthly net income", FieldType.NUMBER, required = true),
            OnboardingDataPoint("fixed_expenses", "Fixed monthly expenses", FieldType.TEXTAREA, required = false, hint = "Comma-separated categories with amounts e.g. Rent 1200, Insurance 150"),
            OnboardingDataPoint("variable_expenses", "Variable monthly expenses", FieldType.TEXTAREA, required = false, hint = "Categories like groceries, dining, entertainment"),
            OnboardingDataPoint("debts", "Debt obligations", FieldType.TEXTAREA, required = false, hint = "Loan/card name, balance, interest rate"),
            OnboardingDataPoint("savings_goals", "Savings goals", FieldType.TEXTAREA, required = false, hint = "Goal name and target amount"),
            OnboardingDataPoint("planning_horizon", "Preferred planning horizon", FieldType.SELECT, required = true, hint = "Options: monthly, quarterly, yearly", options = listOf(FieldOption("monthly", "Monthly"), FieldOption("quarterly", "Quarterly"), FieldOption("yearly", "Yearly")))
        )
    )

    val ATLAS_BASE_SPEC = ModuleOnboardingSpec(
        moduleId = "atlas",
        displayName = "Atlas",
        themeColor = "emerald",
        iconName = "layout-dashboard",
        goal = "Capture productivity baseline so Atlas can generate optimal task scheduling and focus plans.",
        context = "Atlas is the productivity and task management agent. It manages goals, tasks, journal entries, and weekly reviews. Knowing peak focus hours, current load/pressure, preferred task focus style, and recovery constraints enables Atlas to schedule work intelligently.",
        fastTrackEnabled = true,
        fastTrackRequiredIds = listOf("peak_hours", "task_focus"),
        dataPoints = listOf(
            OnboardingDataPoint("peak_hours", "Peak cognitive hours", FieldType.SELECT, required = true, hint = "Options: morning (6–10), midday (10–14), afternoon (14–18), evening (18–22)", options = listOf(FieldOption("morning (6–10)", "Morning (6–10)"), FieldOption("midday (10–14)", "Midday (10–14)"), FieldOption("afternoon (14–18)", "Afternoon (14–18)"), FieldOption("evening (18–22)", "Evening (18–22)"))),
            OnboardingDataPoint("load_pressure", "Current workload pressure (1–10)", FieldType.RANGE, required = false, hint = "Slider 1 (very light) to 10 (overwhelming)"),
            OnboardingDataPoint("task_focus", "Preferred task focus style", FieldType.SELECT, required = true, hint = "Options: deep_work (2–4h blocks), pomodoro (25min), time_boxing, flexible", options = listOf(FieldOption("deep_work", "Deep Work (2–4h blocks)"), FieldOption("pomodoro", "Pomodoro (25 min)"), FieldOption("time_boxing", "Time Boxing"), FieldOption("flexible", "Flexible"))),
            OnboardingDataPoint("recovery_constraints", "Recovery constraints", FieldType.TEXTAREA, required = false, hint = "e.g. caregiver duties, chronic fatigue, hard stop at 18:00")
        )
    )

    val SCOUT_BASE_SPEC = ModuleOnboardingSpec(
        moduleId = "scout",
        displayName = "Scout",
        themeColor = "sky",
        iconName = "search",
        goal = "Capture research preferences so Scout can deliver appropriately scoped and cited intelligence.",
        context = "Scout is the research and intelligence agent. It synthesises information from multiple sources. Understanding the user's primary research domains, preferred evidence quality threshold, and output format ensures Scout returns appropriately rigorous and formatted results.",
        fastTrackEnabled = false,
        fastTrackRequiredIds = emptyList(),
        dataPoints = listOf(
            OnboardingDataPoint("research_domains", "Primary research domains", FieldType.MULTI_SELECT, required = false, hint = "Options: science, finance, technology, health, law, history, current_events", options = listOf(FieldOption("science", "Science"), FieldOption("finance", "Finance"), FieldOption("technology", "Technology"), FieldOption("health", "Health"), FieldOption("law", "Law"), FieldOption("history", "History"), FieldOption("current_events", "Current Events"))),
            OnboardingDataPoint("evidence_quality", "Evidence quality preference", FieldType.SELECT, required = false, hint = "Options: peer_reviewed_only, high_quality_sources, balanced, broad_sweep", options = listOf(FieldOption("peer_reviewed_only", "Peer-reviewed only"), FieldOption("high_quality_sources", "High quality sources"), FieldOption("balanced", "Balanced"), FieldOption("broad_sweep", "Broad sweep"))),
            OnboardingDataPoint("output_format", "Preferred output format", FieldType.SELECT, required = false, hint = "Options: summary, detailed_report, bullet_list, structured_data", options = listOf(FieldOption("summary", "Summary"), FieldOption("detailed_report", "Detailed report"), FieldOption("bullet_list", "Bullet list"), FieldOption("structured_data", "Structured data")))
        )
    )

    val FORGE_BASE_SPEC = ModuleOnboardingSpec(
        moduleId = "forge",
        displayName = "Forge",
        themeColor = "lime",
        iconName = "code-2",
        goal = "Capture development context so Forge can generate production-quality code in the right stack.",
        context = "Forge is the software development and automation agent. It generates, reviews, and debugs code. Knowing the execution context (primary language/stack), safety mode preference (sandbox vs production), and preferred report style helps Forge match output quality and format to the user's workflow.",
        fastTrackEnabled = false,
        fastTrackRequiredIds = emptyList(),
        dataPoints = listOf(
            OnboardingDataPoint("execution_context", "Primary language or stack", FieldType.TEXT, required = false, hint = "e.g. TypeScript/React, Python/FastAPI, Go, Rust"),
            OnboardingDataPoint("safety_mode", "Safety mode", FieldType.SELECT, required = false, hint = "Options: sandbox (never run commands), cautious (confirm before execute), production (trust and run)", options = listOf(FieldOption("sandbox", "Sandbox (never run commands)"), FieldOption("cautious", "Cautious (confirm before execute)"), FieldOption("production", "Production (trust and run)"))),
            OnboardingDataPoint("report_style", "Code report style", FieldType.SELECT, required = false, hint = "Options: concise (diff only), standard (summary + diff), verbose (full context)", options = listOf(FieldOption("concise", "Concise (diff only)"), FieldOption("standard", "Standard (summary + diff)"), FieldOption("verbose", "Verbose (full context)")))
        )
    )

    fun specFor(moduleId: String): ModuleOnboardingSpec? = when (moduleId.lowercase()) {
        "nexus" -> NEXUS_BASE_SPEC
        "agnes" -> AGNES_BASE_SPEC
        "titan" -> TITAN_BASE_SPEC
        "soma" -> SOMA_BASE_SPEC
        "ledger" -> LEDGER_BASE_SPEC
        "atlas" -> ATLAS_BASE_SPEC
        "scout" -> SCOUT_BASE_SPEC
        "forge" -> FORGE_BASE_SPEC
        else -> null
    }
}
