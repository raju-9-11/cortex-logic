package com.agnes.nexus.core.db

import app.cash.sqldelight.Transacter
import app.cash.sqldelight.db.QueryResult
import app.cash.sqldelight.db.SqlDriver
import app.cash.sqldelight.db.SqlSchema
import com.agnes.nexus.core.db.cortex.newInstance
import com.agnes.nexus.core.db.cortex.schema
import kotlin.Unit

public interface NexusDatabase : Transacter {
  public val auditTrailQueries: AuditTrailQueries

  public val globalSoulSnapshotsQueries: GlobalSoulSnapshotsQueries

  public val goalQueries: GoalQueries

  public val mirrorEntryQueries: MirrorEntryQueries

  public val moduleSoulCacheQueries: ModuleSoulCacheQueries

  public val movementLogQueries: MovementLogQueries

  public val spineEventStoreQueries: SpineEventStoreQueries

  public val taskBlockQueries: TaskBlockQueries

  public val workoutSessionQueries: WorkoutSessionQueries

  public companion object {
    public val Schema: SqlSchema<QueryResult.Value<Unit>>
      get() = NexusDatabase::class.schema

    public operator fun invoke(driver: SqlDriver): NexusDatabase =
        NexusDatabase::class.newInstance(driver)
  }
}
