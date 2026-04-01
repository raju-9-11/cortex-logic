package com.agnes.nexus.core.db

import kotlin.Double
import kotlin.Long
import kotlin.String

public data class Global_soul_snapshots(
  public val user_id: String,
  public val resilience: Double,
  public val bandwidth: Double,
  public val vitality: Double,
  public val output: Double,
  public val friction: Double,
  public val autopilot_level: Long,
  public val stale_flag: Long,
  public val updated_at: Long,
)
