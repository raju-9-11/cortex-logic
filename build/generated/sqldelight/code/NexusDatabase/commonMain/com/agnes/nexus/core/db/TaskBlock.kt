package com.agnes.nexus.core.db

import kotlin.Double
import kotlin.Long
import kotlin.String

public data class TaskBlock(
  public val id: String,
  public val title: String,
  public val cognitive_weight: Double,
  public val priority: Long,
  public val status: String,
  public val goal_id: String?,
  public val deadline: Long?,
  public val defer_count: Long,
  public val created_at: Long,
  public val updated_at: Long,
)
