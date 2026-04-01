package com.agnes.nexus.core.db

import kotlin.Long
import kotlin.String

public data class Module_soul_cache(
  public val user_id: String,
  public val module_id: String,
  public val profile_json: String,
  public val updated_at: Long,
)
