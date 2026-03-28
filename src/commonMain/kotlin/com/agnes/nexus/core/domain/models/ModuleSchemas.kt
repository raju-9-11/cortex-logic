package com.agnes.nexus.core.domain.models

import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put

/**
 * Web app source-of-truth module schemas (ported to KMP).
 * Note: web uses moduleIds "therapy" and "trainer" for schema registry.
 */
object ModuleSchemas {
    val THERAPY_CORE_SCHEMA = ModuleSchemaDefinition(
        moduleId = "therapy",
        version = "1.0.0",
        allowExtensions = true,
        maxExtensionFields = 20,
        coreSchema = FieldSchema(
            version = "1.0.0",
            metadata = meta("Therapeutic intake and progress tracking profile", "mental-health"),
            coreFields = listOf(
                field("userId", "User ID", FieldType.TEXT, required = true, description = "Unique identifier for the user"),
                field("currentState", "Current Emotional State", FieldType.TEXT, description = "Current emotional or mental state"),
                field(
                    "therapeuticGoals",
                    "Therapeutic Goals",
                    FieldType.MULTI_SELECT,
                    description = "Active therapeutic goals",
                    options = listOf(
                        opt("anxiety_reduction", "Anxiety Reduction"),
                        opt("stress_management", "Stress Management"),
                        opt("emotional_regulation", "Emotional Regulation"),
                        opt("trauma_processing", "Trauma Processing"),
                        opt("self_awareness", "Self-Awareness"),
                        opt("relationship_health", "Relationship Health"),
                        opt("behavioral_change", "Behavioral Change")
                    )
                ),
                field("primaryConcerns", "Primary Concerns", FieldType.TEXTAREA, description = "Main concerns or issues to address"),
                field(
                    "therapeuticApproach",
                    "Therapeutic Approach",
                    FieldType.SELECT,
                    description = "Preferred therapeutic modality",
                    options = listOf(
                        opt("cbt", "Cognitive Behavioral Therapy (CBT)"),
                        opt("dbt", "Dialectical Behavior Therapy (DBT)"),
                        opt("psychodynamic", "Psychodynamic"),
                        opt("humanistic", "Humanistic"),
                        opt("integrative", "Integrative")
                    )
                ),
                field(
                    "emotionalResilience",
                    "Emotional Resilience",
                    FieldType.RANGE,
                    description = "Current emotional resilience level (0-10)",
                    validation = ValidationRules(minimum = 0.0, maximum = 10.0)
                ),
                field(
                    "stressLevel",
                    "Stress Level",
                    FieldType.RANGE,
                    description = "Current stress level (0-10)",
                    validation = ValidationRules(minimum = 0.0, maximum = 10.0)
                ),
                field(
                    "supportSystem",
                    "Support System",
                    FieldType.MULTI_SELECT,
                    description = "Available support systems",
                    options = listOf(
                        opt("family", "Family"),
                        opt("friends", "Friends"),
                        opt("partner", "Partner"),
                        opt("therapist", "Professional Therapist"),
                        opt("support_group", "Support Group"),
                        opt("online_community", "Online Community")
                    )
                ),
                field(
                    "sessionFrequency",
                    "Session Frequency",
                    FieldType.SELECT,
                    description = "Preferred therapy session frequency",
                    options = listOf(
                        opt("daily", "Daily"),
                        opt("weekly", "Weekly"),
                        opt("biweekly", "Bi-weekly"),
                        opt("monthly", "Monthly"),
                        opt("as_needed", "As Needed")
                    )
                ),
                field(
                    "copingStrategies",
                    "Coping Strategies",
                    FieldType.MULTI_SELECT,
                    description = "Effective coping strategies",
                    options = listOf(
                        opt("meditation", "Meditation"),
                        opt("journaling", "Journaling"),
                        opt("exercise", "Exercise"),
                        opt("breathing", "Breathing Exercises"),
                        opt("creative", "Creative Expression"),
                        opt("social", "Social Connection"),
                        opt("nature", "Nature/Outdoors")
                    )
                ),
                field("triggers", "Known Triggers", FieldType.TEXTAREA, description = "Situations or events that trigger negative responses"),
                field("progressNotes", "Progress Notes", FieldType.TEXTAREA, description = "Notes on therapeutic progress"),
                field("lastSessionDate", "Last Session Date", FieldType.DATE, description = "Date of last therapy session"),
                field("nextSessionDate", "Next Session Date", FieldType.DATE, description = "Date of next scheduled session")
            )
        )
    )

    val TRAINER_CORE_SCHEMA = ModuleSchemaDefinition(
        moduleId = "trainer",
        version = "1.0.0",
        allowExtensions = true,
        maxExtensionFields = 20,
        coreSchema = FieldSchema(
            version = "1.0.0",
            metadata = meta("Fitness and training profile", "fitness-health"),
            coreFields = listOf(
                field("userId", "User ID", FieldType.TEXT, required = true, description = "Unique identifier for the user"),
                field(
                    "fitnessLevel",
                    "Fitness Level",
                    FieldType.SELECT,
                    description = "Current fitness level",
                    options = listOf(
                        opt("beginner", "Beginner"),
                        opt("intermediate", "Intermediate"),
                        opt("advanced", "Advanced"),
                        opt("elite", "Elite")
                    )
                ),
                field(
                    "fitnessGoals",
                    "Fitness Goals",
                    FieldType.MULTI_SELECT,
                    description = "Active fitness and health goals",
                    options = listOf(
                        opt("weight_loss", "Weight Loss"),
                        opt("muscle_gain", "Muscle Gain"),
                        opt("strength", "Increase Strength"),
                        opt("endurance", "Improve Endurance"),
                        opt("flexibility", "Improve Flexibility"),
                        opt("general_health", "General Health"),
                        opt("athletic_performance", "Athletic Performance")
                    )
                ),
                field("currentWeight", "Current Weight", FieldType.NUMBER, description = "Current weight (in kg or lbs)", validation = ValidationRules(minimum = 0.0)),
                field("targetWeight", "Target Weight", FieldType.NUMBER, description = "Target weight (in kg or lbs)", validation = ValidationRules(minimum = 0.0)),
                field("height", "Height", FieldType.NUMBER, description = "Height (in cm or inches)", validation = ValidationRules(minimum = 0.0)),
                field(
                    "workoutFrequency",
                    "Workout Frequency",
                    FieldType.SELECT,
                    description = "How often you workout per week",
                    options = listOf(
                        opt("1-2", "1-2 times/week"),
                        opt("3-4", "3-4 times/week"),
                        opt("5-6", "5-6 times/week"),
                        opt("daily", "Daily")
                    )
                ),
                field(
                    "preferredActivities",
                    "Preferred Activities",
                    FieldType.MULTI_SELECT,
                    description = "Preferred types of physical activity",
                    options = listOf(
                        opt("cardio", "Cardio"),
                        opt("strength", "Strength Training"),
                        opt("yoga", "Yoga"),
                        opt("pilates", "Pilates"),
                        opt("hiit", "HIIT"),
                        opt("running", "Running"),
                        opt("cycling", "Cycling"),
                        opt("swimming", "Swimming"),
                        opt("sports", "Sports")
                    )
                ),
                field("injuries", "Current Injuries or Limitations", FieldType.TEXTAREA, description = "Any injuries or physical limitations to consider"),
                field(
                    "activityLevel",
                    "Daily Activity Level",
                    FieldType.SELECT,
                    description = "General daily activity level",
                    options = listOf(
                        opt("sedentary", "Sedentary (desk job)"),
                        opt("light", "Lightly Active"),
                        opt("moderate", "Moderately Active"),
                        opt("very", "Very Active"),
                        opt("extra", "Extra Active")
                    )
                ),
                field(
                    "nutritionGoals",
                    "Nutrition Goals",
                    FieldType.MULTI_SELECT,
                    description = "Nutrition-related goals",
                    options = listOf(
                        opt("calorie_deficit", "Calorie Deficit"),
                        opt("calorie_surplus", "Calorie Surplus"),
                        opt("balanced_diet", "Balanced Diet"),
                        opt("protein_focus", "High Protein"),
                        opt("meal_timing", "Optimize Meal Timing")
                    )
                ),
                field("sleepQuality", "Sleep Quality", FieldType.RANGE, description = "Average sleep quality (0-10)", validation = ValidationRules(minimum = 0.0, maximum = 10.0)),
                field("recoveryScore", "Recovery Score", FieldType.RANGE, description = "Current recovery level (0-10)", validation = ValidationRules(minimum = 0.0, maximum = 10.0)),
                field("lastWorkout", "Last Workout Date", FieldType.DATE, description = "Date of last workout"),
                field("nextWorkout", "Next Scheduled Workout", FieldType.DATE, description = "Date of next planned workout")
            )
        )
    )

    val LEDGER_CORE_SCHEMA = ModuleSchemaDefinition(
        moduleId = "ledger",
        version = "1.0.0",
        allowExtensions = true,
        maxExtensionFields = 15,
        coreSchema = FieldSchema(
            version = "1.0.0",
            metadata = meta("Financial tracking and budgeting profile", "finance"),
            coreFields = listOf(
                field("userId", "User ID", FieldType.TEXT, required = true, description = "Unique identifier for the user"),
                field("monthlyIncome", "Monthly Income", FieldType.NUMBER, description = "Average monthly income", validation = ValidationRules(minimum = 0.0)),
                field(
                    "currency",
                    "Currency",
                    FieldType.SELECT,
                    description = "Primary currency",
                    options = listOf(
                        opt("USD", "USD ($)"),
                        opt("EUR", "EUR (€)"),
                        opt("GBP", "GBP (£)"),
                        opt("CAD", "CAD ($)"),
                        opt("AUD", "AUD ($)")
                    ),
                    defaultValue = JsonPrimitive("USD")
                ),
                field(
                    "financialGoals",
                    "Financial Goals",
                    FieldType.MULTI_SELECT,
                    description = "Active financial goals",
                    options = listOf(
                        opt("emergency_fund", "Build Emergency Fund"),
                        opt("debt_payoff", "Pay Off Debt"),
                        opt("save_investment", "Save & Invest"),
                        opt("retirement", "Retirement Planning"),
                        opt("home_purchase", "Home Purchase"),
                        opt("education", "Education Fund"),
                        opt("financial_independence", "Financial Independence")
                    )
                ),
                field(
                    "budgetCategories",
                    "Budget Categories",
                    FieldType.MULTI_SELECT,
                    description = "Active budget categories",
                    options = listOf(
                        opt("housing", "Housing"),
                        opt("transportation", "Transportation"),
                        opt("food", "Food & Groceries"),
                        opt("utilities", "Utilities"),
                        opt("entertainment", "Entertainment"),
                        opt("healthcare", "Healthcare"),
                        opt("insurance", "Insurance"),
                        opt("savings", "Savings"),
                        opt("debt", "Debt Payments")
                    )
                ),
                field("totalDebt", "Total Debt", FieldType.NUMBER, description = "Total outstanding debt", validation = ValidationRules(minimum = 0.0)),
                field("totalSavings", "Total Savings", FieldType.NUMBER, description = "Total savings and emergency fund", validation = ValidationRules(minimum = 0.0)),
                field("totalInvestments", "Total Investments", FieldType.NUMBER, description = "Total investment portfolio value", validation = ValidationRules(minimum = 0.0)),
                field(
                    "riskTolerance",
                    "Investment Risk Tolerance",
                    FieldType.SELECT,
                    description = "Comfort level with investment risk",
                    options = listOf(
                        opt("conservative", "Conservative"),
                        opt("moderate", "Moderate"),
                        opt("aggressive", "Aggressive")
                    )
                ),
                field(
                    "spendingHabits",
                    "Spending Habits",
                    FieldType.SELECT,
                    description = "General spending behavior",
                    options = listOf(
                        opt("frugal", "Frugal"),
                        opt("moderate", "Moderate"),
                        opt("liberal", "Liberal Spender")
                    )
                ),
                field(
                    "financialStressLevel",
                    "Financial Stress Level",
                    FieldType.RANGE,
                    description = "Current financial stress (0-10)",
                    validation = ValidationRules(minimum = 0.0, maximum = 10.0)
                ),
                field("creditScore", "Credit Score", FieldType.NUMBER, description = "Current credit score", validation = ValidationRules(minimum = 300.0, maximum = 850.0)),
                field(
                    "paymentSchedule",
                    "Payment Schedule",
                    FieldType.SELECT,
                    description = "How often you get paid",
                    options = listOf(
                        opt("weekly", "Weekly"),
                        opt("biweekly", "Bi-weekly"),
                        opt("monthly", "Monthly"),
                        opt("irregular", "Irregular")
                    )
                ),
                field("lastBudgetReview", "Last Budget Review", FieldType.DATE, description = "Date of last budget review"),
                field("nextBudgetReview", "Next Budget Review", FieldType.DATE, description = "Date of next scheduled budget review")
            )
        )
    )

    val SOMA_CORE_SCHEMA = ModuleSchemaDefinition(
        moduleId = "soma",
        version = "1.0.0",
        allowExtensions = true,
        maxExtensionFields = 25,
        coreSchema = FieldSchema(
            version = "1.0.0",
            metadata = meta("Physical health and biometric tracking profile", "health-biometrics"),
            coreFields = listOf(
                field("userId", "User ID", FieldType.TEXT, required = true, description = "Unique identifier for the user"),
                field("age", "Age", FieldType.NUMBER, description = "Current age", validation = ValidationRules(minimum = 0.0, maximum = 150.0)),
                field(
                    "biologicalSex",
                    "Biological Sex",
                    FieldType.SELECT,
                    description = "Biological sex assigned at birth",
                    options = listOf(opt("male", "Male"), opt("female", "Female"))
                ),
                field("height", "Height", FieldType.NUMBER, description = "Height (in cm)", validation = ValidationRules(minimum = 0.0)),
                field("weight", "Weight", FieldType.NUMBER, description = "Current weight (in kg)", validation = ValidationRules(minimum = 0.0)),
                field("bmi", "BMI", FieldType.NUMBER, description = "Body Mass Index", validation = ValidationRules(minimum = 0.0)),
                field("restingHeartRate", "Resting Heart Rate", FieldType.NUMBER, description = "Resting heart rate (bpm)", validation = ValidationRules(minimum = 30.0, maximum = 200.0)),
                field("bloodPressure", "Blood Pressure", FieldType.TEXT, description = "Blood pressure reading (e.g., 120/80)"),
                field("vo2Max", "VO2 Max", FieldType.NUMBER, description = "Maximum oxygen uptake (ml/kg/min)", validation = ValidationRules(minimum = 0.0)),
                field("bodyFatPercentage", "Body Fat Percentage", FieldType.NUMBER, description = "Body fat percentage", validation = ValidationRules(minimum = 0.0, maximum = 100.0)),
                field("muscleMass", "Muscle Mass", FieldType.NUMBER, description = "Muscle mass (in kg)", validation = ValidationRules(minimum = 0.0)),
                field("sleepHours", "Average Sleep Hours", FieldType.NUMBER, description = "Average hours of sleep per night", validation = ValidationRules(minimum = 0.0, maximum = 24.0)),
                field("sleepQuality", "Sleep Quality", FieldType.RANGE, description = "Sleep quality rating (0-10)", validation = ValidationRules(minimum = 0.0, maximum = 10.0)),
                field("dailySteps", "Daily Steps", FieldType.NUMBER, description = "Average daily steps", validation = ValidationRules(minimum = 0.0)),
                field("activeMinutes", "Active Minutes", FieldType.NUMBER, description = "Average daily active minutes", validation = ValidationRules(minimum = 0.0)),
                field("hydrationLevel", "Daily Hydration", FieldType.NUMBER, description = "Daily water intake (in liters)", validation = ValidationRules(minimum = 0.0)),
                field("menstrualCycle", "Menstrual Cycle Tracking", FieldType.BOOLEAN, description = "Whether menstrual cycle is tracked"),
                field("cycleDay", "Cycle Day", FieldType.NUMBER, description = "Current day of menstrual cycle", validation = ValidationRules(minimum = 0.0, maximum = 50.0)),
                field(
                    "chronicConditions",
                    "Chronic Conditions",
                    FieldType.MULTI_SELECT,
                    description = "Known chronic health conditions",
                    options = listOf(
                        opt("diabetes", "Diabetes"),
                        opt("hypertension", "Hypertension"),
                        opt("asthma", "Asthma"),
                        opt("arthritis", "Arthritis"),
                        opt("thyroid", "Thyroid Issues"),
                        opt("heart_disease", "Heart Disease"),
                        opt("allergies", "Allergies")
                    )
                ),
                field("medications", "Current Medications", FieldType.TEXTAREA, description = "List of current medications"),
                field(
                    "supplements",
                    "Supplements",
                    FieldType.MULTI_SELECT,
                    description = "Current supplements taken",
                    options = listOf(
                        opt("multivitamin", "Multivitamin"),
                        opt("vitamin_d", "Vitamin D"),
                        opt("omega3", "Omega-3"),
                        opt("protein", "Protein"),
                        opt("creatine", "Creatine"),
                        opt("magnesium", "Magnesium")
                    )
                ),
                field("energyLevel", "Energy Level", FieldType.RANGE, description = "Current energy level (0-10)", validation = ValidationRules(minimum = 0.0, maximum = 10.0)),
                field("stressPhysical", "Physical Stress Level", FieldType.RANGE, description = "Physical stress/fatigue level (0-10)", validation = ValidationRules(minimum = 0.0, maximum = 10.0)),
                field("lastCheckup", "Last Medical Checkup", FieldType.DATE, description = "Date of last medical checkup"),
                field("nextCheckup", "Next Checkup", FieldType.DATE, description = "Date of next scheduled checkup")
            )
        )
    )

    val ATLAS_CORE_SCHEMA = ModuleSchemaDefinition(
        moduleId = "atlas",
        version = "1.0.0",
        allowExtensions = true,
        maxExtensionFields = 15,
        coreSchema = FieldSchema(
            version = "1.0.0",
            metadata = meta("Energy management and planning profile", "productivity-planning"),
            coreFields = listOf(
                field("userId", "User ID", FieldType.TEXT, required = true, description = "Unique identifier for the user"),
                field("energyBudget", "Daily Energy Budget", FieldType.RANGE, description = "Available energy for tasks (0-10)", validation = ValidationRules(minimum = 0.0, maximum = 10.0)),
                field("planningLoad", "Planning Load", FieldType.RANGE, description = "Current planning complexity (0-10)", validation = ValidationRules(minimum = 0.0, maximum = 10.0)),
                field("taskCompletionRate", "Task Completion Rate", FieldType.NUMBER, description = "7-day task completion ratio (0-1)", validation = ValidationRules(minimum = 0.0, maximum = 1.0)),
                field("streakHealth", "Habit Streak Health", FieldType.RANGE, description = "Composite habit streak health (0-10)", validation = ValidationRules(minimum = 0.0, maximum = 10.0)),
                field("urgencyPressure", "Urgency Pressure", FieldType.RANGE, description = "Deadline urgency level (0-10)", validation = ValidationRules(minimum = 0.0, maximum = 10.0)),
                field(
                    "peakProductivityTime",
                    "Peak Productivity Time",
                    FieldType.SELECT,
                    description = "Time of day with highest productivity",
                    options = listOf(
                        opt("early_morning", "Early Morning (5-8am)"),
                        opt("morning", "Morning (8-11am)"),
                        opt("midday", "Midday (11am-2pm)"),
                        opt("afternoon", "Afternoon (2-5pm)"),
                        opt("evening", "Evening (5-8pm)"),
                        opt("night", "Night (8pm+)")
                    )
                ),
                field(
                    "workStyle",
                    "Work Style Preference",
                    FieldType.SELECT,
                    description = "Preferred approach to work",
                    options = listOf(
                        opt("deep_focus", "Deep Focus Blocks"),
                        opt("pomodoro", "Pomodoro Technique"),
                        opt("flexible", "Flexible/As-Needed"),
                        opt("structured", "Highly Structured")
                    )
                ),
                field(
                    "priorityAreas",
                    "Priority Life Areas",
                    FieldType.MULTI_SELECT,
                    description = "Current focus areas",
                    options = listOf(
                        opt("career", "Career"),
                        opt("health", "Health & Fitness"),
                        opt("relationships", "Relationships"),
                        opt("personal_growth", "Personal Growth"),
                        opt("finances", "Finances"),
                        opt("hobbies", "Hobbies & Leisure"),
                        opt("education", "Education")
                    )
                ),
                field(
                    "habitTracking",
                    "Active Habits",
                    FieldType.MULTI_SELECT,
                    description = "Habits currently being tracked",
                    options = listOf(
                        opt("exercise", "Daily Exercise"),
                        opt("meditation", "Meditation"),
                        opt("journaling", "Journaling"),
                        opt("reading", "Reading"),
                        opt("sleep_schedule", "Consistent Sleep Schedule"),
                        opt("healthy_eating", "Healthy Eating"),
                        opt("learning", "Learning/Study")
                    )
                ),
                field(
                    "goalReviewFrequency",
                    "Goal Review Frequency",
                    FieldType.SELECT,
                    description = "How often to review goals",
                    options = listOf(
                        opt("daily", "Daily"),
                        opt("weekly", "Weekly"),
                        opt("biweekly", "Bi-weekly"),
                        opt("monthly", "Monthly")
                    )
                ),
                field("procrastinationTriggers", "Procrastination Triggers", FieldType.TEXTAREA, description = "Known triggers for procrastination"),
                field("focusScore", "Focus Score", FieldType.RANGE, description = "Current ability to focus (0-10)", validation = ValidationRules(minimum = 0.0, maximum = 10.0)),
                field("openLoopCount", "Open Loops", FieldType.NUMBER, description = "Number of unfinished commitments", validation = ValidationRules(minimum = 0.0)),
                field("lastReview", "Last Goal Review", FieldType.DATE, description = "Date of last goal review"),
                field("nextReview", "Next Goal Review", FieldType.DATE, description = "Date of next scheduled review")
            )
        )
    )

    private fun meta(description: String, category: String) = kotlinx.serialization.json.buildJsonObject {
        put("description", description)
        put("category", category)
    }

    private fun field(
        id: String,
        name: String,
        type: FieldType,
        required: Boolean = false,
        description: String? = null,
        validation: ValidationRules? = null,
        options: List<FieldOption>? = null,
        defaultValue: JsonPrimitive? = null
    ) = FieldDefinition(
        id = id,
        name = name,
        type = type,
        required = required,
        description = description,
        validation = validation,
        options = options,
        defaultValue = defaultValue
    )

    private fun opt(value: String, label: String) = FieldOption(value, label)
}
