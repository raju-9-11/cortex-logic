package com.agnes.nexus.core.db

import kotlin.Double
import kotlin.Long
import kotlin.String

public data class Spine_event_store(
  public val id: String,
  public val source: String,
  public val intent: String,
  public val mutations_json: String,
  public val confidence: Double,
  public val requires_approval: Long,
  public val patient_scope: String,
  public val occurred_at: Long,
  public val processed_at: Long,
  public val suppress_active: Long,
  public val cascade_depth: Long,
)
