package com.agnes.nexus.core.domain.models

import kotlinx.serialization.Serializable

@Serializable
data class ExerciseLibraryEntry(
    val id: String,
    val name: String,
    val aliases: List<String>,
    val category: String, // 'compound' | 'isolation' | 'cardio' | 'mobility' | 'olympic'
    val primaryMuscles: List<String>,
    val secondaryMuscles: List<String>,
    val equipment: List<String>,
    val movementPattern: String // 'push' | 'pull' | 'hinge' | 'squat' | 'carry' | 'rotation' | 'cardio' | 'isolation'
)
