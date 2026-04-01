package com.agnes.nexus.core.db

import kotlin.Double
import kotlin.Long
import kotlin.String

public data class Goal(
  public val id: String,
  public val label: String,
  public val target_date: Long?,
  public val confidence_score: Double,
  public val progress_percent: Double,
  public val velocity: Double,
  public val created_at: Long,
  public val updated_at: Long,
)
