package com.agnes.nexus.core.db

import kotlin.Double
import kotlin.Long
import kotlin.String

public data class WorkoutSession(
  public val id: String,
  public val timestamp: Long,
  public val routine_name: String?,
  public val total_tonnage: Double?,
  public val subjective_rpe: Long?,
  public val mode: String,
)
