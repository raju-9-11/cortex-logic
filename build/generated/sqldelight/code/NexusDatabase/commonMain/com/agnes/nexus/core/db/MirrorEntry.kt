package com.agnes.nexus.core.db

import kotlin.Double
import kotlin.Long
import kotlin.String

public data class MirrorEntry(
  public val id: String,
  public val timestamp: Long,
  public val raw_content: String,
  public val extracted_tags: String?,
  public val attributed_entity_id: String?,
  public val bandwidth_delta: Double,
)
