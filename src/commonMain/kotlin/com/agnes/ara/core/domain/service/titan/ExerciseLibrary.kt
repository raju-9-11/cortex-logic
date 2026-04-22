package com.agnes.ara.core.domain.service.titan

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

// ═══════════════════════════════════════════════════════════════════════════════
// ExerciseLibrary — Static catalogue of 41 exercises with fuzzy search
//
// Complexity: findExercise and searchExercises are O(n × m) where n = 41
// (library size) and m = average alias count (~2). Effectively O(1) for this
// fixed-size dataset.
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
data class Exercise(
    val id: String,
    val name: String,
    val muscleGroups: List<String>,
    val category: String,   // "compound" | "isolation" | "cardio" | "mobility"
    val equipment: List<String>,
    val aliases: List<String>,
)

object ExerciseLibrary {

    private val json = Json { ignoreUnknownKeys = true }

    val LIBRARY: List<Exercise> = listOf(
        // Compound lower
        Exercise(
            id = "squat",
            name = "Barbell Back Squat",
            muscleGroups = listOf("quads", "glutes", "hamstrings", "core"),
            category = "compound",
            equipment = listOf("barbell"),
            aliases = listOf("squat", "back squat"),
        ),
        Exercise(
            id = "deadlift",
            name = "Deadlift",
            muscleGroups = listOf("back", "glutes", "hamstrings", "traps"),
            category = "compound",
            equipment = listOf("barbell"),
            aliases = listOf("dead lift"),
        ),
        Exercise(
            id = "rdl",
            name = "Romanian Deadlift",
            muscleGroups = listOf("hamstrings", "glutes", "back"),
            category = "compound",
            equipment = listOf("barbell"),
            aliases = listOf("rdl", "stiff leg deadlift"),
        ),
        Exercise(
            id = "leg_press",
            name = "Leg Press",
            muscleGroups = listOf("quads", "glutes"),
            category = "compound",
            equipment = listOf("machine"),
            aliases = emptyList(),
        ),
        Exercise(
            id = "lunge",
            name = "Lunge",
            muscleGroups = listOf("quads", "glutes", "hamstrings"),
            category = "compound",
            equipment = listOf("bodyweight", "dumbbell"),
            aliases = listOf("lunges"),
        ),
        // Compound upper push
        Exercise(
            id = "bench_press",
            name = "Barbell Bench Press",
            muscleGroups = listOf("chest", "shoulders", "triceps"),
            category = "compound",
            equipment = listOf("barbell"),
            aliases = listOf("bench", "bench press"),
        ),
        Exercise(
            id = "incline_bench",
            name = "Incline Bench Press",
            muscleGroups = listOf("chest", "shoulders", "triceps"),
            category = "compound",
            equipment = listOf("barbell", "dumbbell"),
            aliases = listOf("incline bench"),
        ),
        Exercise(
            id = "ohp",
            name = "Overhead Press",
            muscleGroups = listOf("shoulders", "triceps", "traps"),
            category = "compound",
            equipment = listOf("barbell"),
            aliases = listOf("ohp", "military press", "shoulder press"),
        ),
        Exercise(
            id = "dips",
            name = "Dips",
            muscleGroups = listOf("chest", "triceps", "shoulders"),
            category = "compound",
            equipment = listOf("bodyweight"),
            aliases = emptyList(),
        ),
        Exercise(
            id = "push_up",
            name = "Push-Up",
            muscleGroups = listOf("chest", "shoulders", "triceps", "core"),
            category = "compound",
            equipment = listOf("bodyweight"),
            aliases = listOf("pushup", "push up"),
        ),
        // Compound upper pull
        Exercise(
            id = "pull_up",
            name = "Pull-Up",
            muscleGroups = listOf("lats", "biceps", "traps"),
            category = "compound",
            equipment = listOf("bodyweight"),
            aliases = listOf("pullup", "chin-up", "chinup"),
        ),
        Exercise(
            id = "barbell_row",
            name = "Barbell Row",
            muscleGroups = listOf("back", "biceps", "lats"),
            category = "compound",
            equipment = listOf("barbell"),
            aliases = listOf("bent over row", "bb row"),
        ),
        Exercise(
            id = "cable_row",
            name = "Seated Cable Row",
            muscleGroups = listOf("back", "biceps", "lats"),
            category = "compound",
            equipment = listOf("cable"),
            aliases = listOf("cable row"),
        ),
        Exercise(
            id = "lat_pulldown",
            name = "Lat Pulldown",
            muscleGroups = listOf("lats", "biceps"),
            category = "compound",
            equipment = listOf("cable"),
            aliases = listOf("pulldown"),
        ),
        // Isolation
        Exercise(
            id = "bicep_curl",
            name = "Bicep Curl",
            muscleGroups = listOf("biceps", "forearms"),
            category = "isolation",
            equipment = listOf("dumbbell", "barbell"),
            aliases = listOf("curl", "curls"),
        ),
        Exercise(
            id = "tricep_pushdown",
            name = "Tricep Pushdown",
            muscleGroups = listOf("triceps"),
            category = "isolation",
            equipment = listOf("cable"),
            aliases = listOf("pushdown"),
        ),
        Exercise(
            id = "lateral_raise",
            name = "Lateral Raise",
            muscleGroups = listOf("shoulders"),
            category = "isolation",
            equipment = listOf("dumbbell"),
            aliases = listOf("side raise", "side lateral"),
        ),
        Exercise(
            id = "face_pull",
            name = "Face Pull",
            muscleGroups = listOf("shoulders", "traps"),
            category = "isolation",
            equipment = listOf("cable"),
            aliases = emptyList(),
        ),
        Exercise(
            id = "leg_curl",
            name = "Leg Curl",
            muscleGroups = listOf("hamstrings"),
            category = "isolation",
            equipment = listOf("machine"),
            aliases = listOf("hamstring curl"),
        ),
        Exercise(
            id = "leg_extension",
            name = "Leg Extension",
            muscleGroups = listOf("quads"),
            category = "isolation",
            equipment = listOf("machine"),
            aliases = emptyList(),
        ),
        Exercise(
            id = "calf_raise",
            name = "Calf Raise",
            muscleGroups = listOf("calves"),
            category = "isolation",
            equipment = listOf("machine", "bodyweight"),
            aliases = listOf("calf raises"),
        ),
        Exercise(
            id = "chest_fly",
            name = "Cable Chest Fly",
            muscleGroups = listOf("chest"),
            category = "isolation",
            equipment = listOf("cable"),
            aliases = listOf("fly", "cable fly", "cable crossover"),
        ),
        // Core
        Exercise(
            id = "plank",
            name = "Plank",
            muscleGroups = listOf("core"),
            category = "mobility",
            equipment = listOf("bodyweight"),
            aliases = emptyList(),
        ),
        Exercise(
            id = "ab_wheel",
            name = "Ab Wheel Rollout",
            muscleGroups = listOf("core"),
            category = "isolation",
            equipment = listOf("ab wheel"),
            aliases = listOf("rollout"),
        ),
        Exercise(
            id = "hanging_leg_raise",
            name = "Hanging Leg Raise",
            muscleGroups = listOf("core"),
            category = "isolation",
            equipment = listOf("bodyweight"),
            aliases = listOf("leg raise"),
        ),
        // Cardio
        Exercise(
            id = "run",
            name = "Running",
            muscleGroups = listOf("cardio"),
            category = "cardio",
            equipment = listOf("bodyweight"),
            aliases = listOf("run", "jog", "treadmill"),
        ),
        Exercise(
            id = "row_machine",
            name = "Rowing Machine",
            muscleGroups = listOf("full_body", "cardio"),
            category = "cardio",
            equipment = listOf("machine"),
            aliases = listOf("rowing", "rower"),
        ),
        Exercise(
            id = "cycling",
            name = "Cycling",
            muscleGroups = listOf("cardio"),
            category = "cardio",
            equipment = listOf("machine", "outdoor"),
            aliases = listOf("bike", "cycle"),
        ),
        // Mobility
        Exercise(
            id = "hip_flexor_stretch",
            name = "Hip Flexor Stretch",
            muscleGroups = listOf("glutes", "core"),
            category = "mobility",
            equipment = listOf("bodyweight"),
            aliases = emptyList(),
        ),
        Exercise(
            id = "shoulder_dislocate",
            name = "Shoulder Dislocate",
            muscleGroups = listOf("shoulders"),
            category = "mobility",
            equipment = listOf("band", "dowel"),
            aliases = emptyList(),
        ),
    )

    /**
     * Find the first exercise whose name or aliases contain [query] (case-insensitive).
     * Returns a JSON-encoded Exercise string, or null when no match is found.
     *
     * Resolution order mirrors the TS source:
     *   1. Exact name match
     *   2. Exact alias match
     *   3. Library name contains query
     *   4. Any alias contains query
     *   5. Query contains library name (reverse partial)
     */
    fun findExercise(query: String): String? {
        val q = query.lowercase().trim()
        if (q.isEmpty()) return null

        val match = resolveExercise(q) ?: return null
        return json.encodeToString(Exercise.serializer(), match)
    }

    /**
     * Return up to [limit] exercises matching [query] by name or alias.
     * When [query] is blank, returns the first [limit] entries.
     * Returns a JSON-encoded array.
     */
    fun searchExercises(query: String, limit: Int = 5): String {
        val q = query.trim()
        val results = if (q.isEmpty()) {
            LIBRARY.take(limit)
        } else {
            val lq = q.lowercase()
            LIBRARY
                .filter { e ->
                    e.name.lowercase().contains(lq) ||
                        e.aliases.any { a -> a.lowercase().contains(lq) }
                }
                .take(limit)
        }
        return json.encodeToString(kotlinx.serialization.builtins.ListSerializer(Exercise.serializer()), results)
    }

    // ─── Internal helpers ─────────────────────────────────────────────────────

    /**
     * Resolves a pre-lowercased, trimmed query against the library.
     * Used internally by findExercise and by QuickLogParser.
     */
    internal fun resolveExercise(q: String): Exercise? {
        if (q.isEmpty()) return null

        // 1. Exact name
        LIBRARY.find { it.name.lowercase() == q }?.let { return it }

        // 2. Alias exact
        LIBRARY.find { e -> e.aliases.any { a -> a.lowercase() == q } }?.let { return it }

        // 3. Library name contains query
        LIBRARY.find { it.name.lowercase().contains(q) }?.let { return it }

        // 4. Any alias contains query
        LIBRARY.find { e -> e.aliases.any { a -> a.lowercase().contains(q) } }?.let { return it }

        // 5. Query contains library name
        LIBRARY.find { q.contains(it.name.lowercase()) }?.let { return it }

        return null
    }
}
