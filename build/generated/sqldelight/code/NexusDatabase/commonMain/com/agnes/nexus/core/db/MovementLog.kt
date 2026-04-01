package com.agnes.nexus.core.db

import kotlin.String

public data class MovementLog(
  public val id: String,
  public val session_id: String,
  public val movement_id: String?,
  public val movement_label: String?,
  public val sets_data: String,
  public val demand_tags: String?,
  public val volume_type: String,
)
