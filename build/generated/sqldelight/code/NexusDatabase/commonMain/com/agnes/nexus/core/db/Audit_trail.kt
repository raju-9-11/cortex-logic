package com.agnes.nexus.core.db

import kotlin.Long
import kotlin.String

public data class Audit_trail(
  public val id: String,
  public val timestamp: Long,
  public val agent_source: String,
  public val action_summary: String,
  public val raw_payload: String,
  public val soul_snapshot: String,
)
