package com.agnes.ara.core.domain.service.titan

data class ProgramExercise(
    val name: String,
    val sets: Int,
    val reps: String,   // e.g. "5", "8-12", "AMRAP"
    val rpe: Double? = null,
    val restSeconds: Int = 180,
    val muscleGroup: String = ""
)

data class ProgramDay(
    val name: String,
    val exercises: List<ProgramExercise>,
    val restDay: Boolean = false
)

data class ProgramTemplate(
    val id: String,
    val name: String,
    val goal: String,           // strength/hypertrophy/powerlifting/general
    val difficulty: String,     // beginner/intermediate/advanced
    val daysPerWeek: Int,
    val durationWeeks: Int,
    val description: String,
    val days: List<ProgramDay>
)

object TitanProgramTemplates {
    val all: List<ProgramTemplate> = listOf(
        ProgramTemplate(
            id = "starting_strength",
            name = "Starting Strength",
            goal = "strength",
            difficulty = "beginner",
            daysPerWeek = 3,
            durationWeeks = 12,
            description = "Mark Rippetoe's novice linear progression for rapid strength gains.",
            days = listOf(
                ProgramDay("Workout A", listOf(
                    ProgramExercise("Squat", 3, "5", restSeconds = 300, muscleGroup = "legs"),
                    ProgramExercise("Bench Press", 3, "5", restSeconds = 180, muscleGroup = "chest"),
                    ProgramExercise("Deadlift", 1, "5", restSeconds = 300, muscleGroup = "back")
                )),
                ProgramDay("Workout B", listOf(
                    ProgramExercise("Squat", 3, "5", restSeconds = 300, muscleGroup = "legs"),
                    ProgramExercise("Overhead Press", 3, "5", restSeconds = 180, muscleGroup = "shoulders"),
                    ProgramExercise("Power Clean", 5, "3", restSeconds = 180, muscleGroup = "back")
                ))
            )
        ),
        ProgramTemplate(
            id = "ppl",
            name = "Push / Pull / Legs",
            goal = "hypertrophy",
            difficulty = "intermediate",
            daysPerWeek = 6,
            durationWeeks = 16,
            description = "Classic PPL split for balanced hypertrophy.",
            days = listOf(
                ProgramDay("Push", listOf(
                    ProgramExercise("Bench Press", 4, "8-12", restSeconds = 180, muscleGroup = "chest"),
                    ProgramExercise("Overhead Press", 3, "8-12", restSeconds = 150, muscleGroup = "shoulders"),
                    ProgramExercise("Incline Dumbbell Press", 3, "10-15", restSeconds = 120, muscleGroup = "chest"),
                    ProgramExercise("Lateral Raise", 4, "15-20", restSeconds = 60, muscleGroup = "shoulders"),
                    ProgramExercise("Triceps Pushdown", 3, "12-15", restSeconds = 75, muscleGroup = "triceps")
                )),
                ProgramDay("Pull", listOf(
                    ProgramExercise("Pull-Up", 4, "8-12", restSeconds = 180, muscleGroup = "back"),
                    ProgramExercise("Barbell Row", 4, "8-12", restSeconds = 150, muscleGroup = "back"),
                    ProgramExercise("Face Pull", 3, "15-20", restSeconds = 60, muscleGroup = "shoulders"),
                    ProgramExercise("Barbell Curl", 3, "10-15", restSeconds = 75, muscleGroup = "biceps"),
                    ProgramExercise("Hammer Curl", 3, "10-15", restSeconds = 60, muscleGroup = "biceps")
                )),
                ProgramDay("Legs", listOf(
                    ProgramExercise("Squat", 4, "8-12", restSeconds = 240, muscleGroup = "legs"),
                    ProgramExercise("Romanian Deadlift", 3, "10-12", restSeconds = 180, muscleGroup = "hamstrings"),
                    ProgramExercise("Leg Press", 3, "12-15", restSeconds = 150, muscleGroup = "quads"),
                    ProgramExercise("Leg Curl", 3, "12-15", restSeconds = 90, muscleGroup = "hamstrings"),
                    ProgramExercise("Calf Raise", 4, "15-20", restSeconds = 60, muscleGroup = "calves")
                ))
            )
        ),
        ProgramTemplate(
            id = "531",
            name = "5/3/1",
            goal = "strength",
            difficulty = "intermediate",
            daysPerWeek = 4,
            durationWeeks = 16,
            description = "Jim Wendler's 5/3/1 — percentage-based strength progression across 4-week cycles.",
            days = listOf(
                ProgramDay("Press Day", listOf(
                    ProgramExercise("Overhead Press", 3, "5/3/1", rpe = 8.5, restSeconds = 240, muscleGroup = "shoulders"),
                    ProgramExercise("Dips", 5, "10", restSeconds = 120, muscleGroup = "triceps"),
                    ProgramExercise("Chin-Up", 5, "10", restSeconds = 120, muscleGroup = "back")
                )),
                ProgramDay("Deadlift Day", listOf(
                    ProgramExercise("Deadlift", 3, "5/3/1", rpe = 9.0, restSeconds = 300, muscleGroup = "back"),
                    ProgramExercise("Romanian Deadlift", 5, "10", restSeconds = 150, muscleGroup = "hamstrings"),
                    ProgramExercise("Hanging Leg Raise", 5, "10", restSeconds = 90, muscleGroup = "core")
                )),
                ProgramDay("Bench Day", listOf(
                    ProgramExercise("Bench Press", 3, "5/3/1", rpe = 8.5, restSeconds = 240, muscleGroup = "chest"),
                    ProgramExercise("Dumbbell Bench", 5, "10", restSeconds = 120, muscleGroup = "chest"),
                    ProgramExercise("Dumbbell Row", 5, "10", restSeconds = 90, muscleGroup = "back")
                )),
                ProgramDay("Squat Day", listOf(
                    ProgramExercise("Squat", 3, "5/3/1", rpe = 9.0, restSeconds = 300, muscleGroup = "legs"),
                    ProgramExercise("Leg Press", 5, "10", restSeconds = 150, muscleGroup = "quads"),
                    ProgramExercise("Leg Curl", 5, "10", restSeconds = 90, muscleGroup = "hamstrings")
                ))
            )
        ),
        ProgramTemplate(
            id = "upper_lower",
            name = "Upper / Lower",
            goal = "hypertrophy",
            difficulty = "intermediate",
            daysPerWeek = 4,
            durationWeeks = 12,
            description = "4-day upper/lower split for balanced muscle development.",
            days = listOf(
                ProgramDay("Upper A (Strength)", listOf(
                    ProgramExercise("Bench Press", 4, "4-6", restSeconds = 240, muscleGroup = "chest"),
                    ProgramExercise("Barbell Row", 4, "4-6", restSeconds = 240, muscleGroup = "back"),
                    ProgramExercise("Overhead Press", 3, "6-8", restSeconds = 180, muscleGroup = "shoulders"),
                    ProgramExercise("Pull-Up", 3, "6-8", restSeconds = 180, muscleGroup = "back")
                )),
                ProgramDay("Lower A (Strength)", listOf(
                    ProgramExercise("Squat", 4, "4-6", restSeconds = 300, muscleGroup = "legs"),
                    ProgramExercise("Romanian Deadlift", 3, "6-8", restSeconds = 180, muscleGroup = "hamstrings"),
                    ProgramExercise("Leg Press", 3, "8-10", restSeconds = 150, muscleGroup = "quads")
                )),
                ProgramDay("Upper B (Volume)", listOf(
                    ProgramExercise("Incline Dumbbell Press", 4, "10-12", restSeconds = 120, muscleGroup = "chest"),
                    ProgramExercise("Cable Row", 4, "10-12", restSeconds = 120, muscleGroup = "back"),
                    ProgramExercise("Lateral Raise", 4, "15-20", restSeconds = 60, muscleGroup = "shoulders"),
                    ProgramExercise("Barbell Curl", 3, "12-15", restSeconds = 60, muscleGroup = "biceps")
                )),
                ProgramDay("Lower B (Volume)", listOf(
                    ProgramExercise("Front Squat", 4, "8-10", restSeconds = 180, muscleGroup = "quads"),
                    ProgramExercise("Leg Curl", 4, "10-12", restSeconds = 90, muscleGroup = "hamstrings"),
                    ProgramExercise("Bulgarian Split Squat", 3, "10-12", restSeconds = 120, muscleGroup = "glutes"),
                    ProgramExercise("Calf Raise", 4, "15-20", restSeconds = 60, muscleGroup = "calves")
                ))
            )
        ),
        ProgramTemplate(
            id = "full_body_3x",
            name = "Full Body 3×/week",
            goal = "general",
            difficulty = "beginner",
            daysPerWeek = 3,
            durationWeeks = 8,
            description = "3-day full body routine — ideal for beginners or time-constrained lifters.",
            days = listOf(
                ProgramDay("Full Body", listOf(
                    ProgramExercise("Squat", 3, "8-10", restSeconds = 180, muscleGroup = "legs"),
                    ProgramExercise("Bench Press", 3, "8-10", restSeconds = 150, muscleGroup = "chest"),
                    ProgramExercise("Barbell Row", 3, "8-10", restSeconds = 150, muscleGroup = "back"),
                    ProgramExercise("Overhead Press", 2, "10-12", restSeconds = 120, muscleGroup = "shoulders"),
                    ProgramExercise("Deadlift", 2, "5-6", restSeconds = 240, muscleGroup = "back")
                ))
            )
        ),
        ProgramTemplate(
            id = "hypertrophy_specialist",
            name = "Hypertrophy Specialist",
            goal = "hypertrophy",
            difficulty = "advanced",
            daysPerWeek = 5,
            durationWeeks = 16,
            description = "High-volume specialization block for maximal muscle growth.",
            days = listOf(
                ProgramDay("Chest + Triceps", listOf(
                    ProgramExercise("Bench Press", 4, "8-12", restSeconds = 180, muscleGroup = "chest"),
                    ProgramExercise("Incline DB Press", 3, "10-15", restSeconds = 120, muscleGroup = "chest"),
                    ProgramExercise("Cable Fly", 3, "15-20", restSeconds = 60, muscleGroup = "chest"),
                    ProgramExercise("Skullcrusher", 3, "10-15", restSeconds = 90, muscleGroup = "triceps"),
                    ProgramExercise("Overhead Triceps Extension", 3, "12-15", restSeconds = 75, muscleGroup = "triceps")
                )),
                ProgramDay("Back + Biceps", listOf(
                    ProgramExercise("Weighted Pull-Up", 4, "6-10", restSeconds = 180, muscleGroup = "back"),
                    ProgramExercise("Barbell Row", 4, "8-12", restSeconds = 150, muscleGroup = "back"),
                    ProgramExercise("Cable Row", 3, "12-15", restSeconds = 90, muscleGroup = "back"),
                    ProgramExercise("Incline Dumbbell Curl", 3, "10-12", restSeconds = 75, muscleGroup = "biceps"),
                    ProgramExercise("Hammer Curl", 3, "12-15", restSeconds = 60, muscleGroup = "biceps")
                )),
                ProgramDay("Legs", listOf(
                    ProgramExercise("Squat", 4, "8-12", restSeconds = 240, muscleGroup = "quads"),
                    ProgramExercise("Leg Press", 4, "12-15", restSeconds = 180, muscleGroup = "quads"),
                    ProgramExercise("Romanian Deadlift", 4, "10-12", restSeconds = 150, muscleGroup = "hamstrings"),
                    ProgramExercise("Hip Thrust", 3, "12-15", restSeconds = 120, muscleGroup = "glutes"),
                    ProgramExercise("Calf Raise", 5, "15-20", restSeconds = 60, muscleGroup = "calves")
                )),
                ProgramDay("Shoulders + Core", listOf(
                    ProgramExercise("Overhead Press", 4, "8-12", restSeconds = 180, muscleGroup = "shoulders"),
                    ProgramExercise("Lateral Raise", 5, "15-20", restSeconds = 60, muscleGroup = "shoulders"),
                    ProgramExercise("Face Pull", 3, "15-20", restSeconds = 60, muscleGroup = "shoulders"),
                    ProgramExercise("Cable Crunch", 3, "15-20", restSeconds = 60, muscleGroup = "core"),
                    ProgramExercise("Plank", 3, "60s", restSeconds = 60, muscleGroup = "core")
                )),
                ProgramDay("Arms + Weak Points", listOf(
                    ProgramExercise("Barbell Curl", 4, "8-12", restSeconds = 90, muscleGroup = "biceps"),
                    ProgramExercise("Triceps Pushdown", 4, "12-15", restSeconds = 75, muscleGroup = "triceps"),
                    ProgramExercise("Reverse Curl", 3, "12-15", restSeconds = 60, muscleGroup = "biceps"),
                    ProgramExercise("Overhead Triceps Extension", 3, "12-15", restSeconds = 75, muscleGroup = "triceps")
                ))
            )
        )
    )

    fun findById(id: String): ProgramTemplate? = all.find { it.id == id }
    fun forGoal(goal: String): List<ProgramTemplate> = all.filter { it.goal == goal }
    fun forDifficulty(difficulty: String): List<ProgramTemplate> = all.filter { it.difficulty == difficulty }
}
