package com.agnes.nexus.core.db.cortex

import app.cash.sqldelight.TransacterImpl
import app.cash.sqldelight.db.AfterVersion
import app.cash.sqldelight.db.QueryResult
import app.cash.sqldelight.db.SqlDriver
import app.cash.sqldelight.db.SqlSchema
import com.agnes.nexus.core.db.AuditTrailQueries
import com.agnes.nexus.core.db.GlobalSoulSnapshotsQueries
import com.agnes.nexus.core.db.GoalQueries
import com.agnes.nexus.core.db.MirrorEntryQueries
import com.agnes.nexus.core.db.ModuleSoulCacheQueries
import com.agnes.nexus.core.db.MovementLogQueries
import com.agnes.nexus.core.db.NexusDatabase
import com.agnes.nexus.core.db.SpineEventStoreQueries
import com.agnes.nexus.core.db.TaskBlockQueries
import com.agnes.nexus.core.db.WorkoutSessionQueries
import kotlin.Long
import kotlin.Unit
import kotlin.reflect.KClass

internal val KClass<NexusDatabase>.schema: SqlSchema<QueryResult.Value<Unit>>
  get() = NexusDatabaseImpl.Schema

internal fun KClass<NexusDatabase>.newInstance(driver: SqlDriver): NexusDatabase =
    NexusDatabaseImpl(driver)

private class NexusDatabaseImpl(
  driver: SqlDriver,
) : TransacterImpl(driver), NexusDatabase {
  override val auditTrailQueries: AuditTrailQueries = AuditTrailQueries(driver)

  override val globalSoulSnapshotsQueries: GlobalSoulSnapshotsQueries =
      GlobalSoulSnapshotsQueries(driver)

  override val goalQueries: GoalQueries = GoalQueries(driver)

  override val mirrorEntryQueries: MirrorEntryQueries = MirrorEntryQueries(driver)

  override val moduleSoulCacheQueries: ModuleSoulCacheQueries = ModuleSoulCacheQueries(driver)

  override val movementLogQueries: MovementLogQueries = MovementLogQueries(driver)

  override val spineEventStoreQueries: SpineEventStoreQueries = SpineEventStoreQueries(driver)

  override val taskBlockQueries: TaskBlockQueries = TaskBlockQueries(driver)

  override val workoutSessionQueries: WorkoutSessionQueries = WorkoutSessionQueries(driver)

  public object Schema : SqlSchema<QueryResult.Value<Unit>> {
    override val version: Long
      get() = 1

    override fun create(driver: SqlDriver): QueryResult.Value<Unit> {
      driver.execute(null, """
          |CREATE TABLE IF NOT EXISTS audit_trail (
          |    id TEXT NOT NULL PRIMARY KEY,
          |    timestamp INTEGER NOT NULL,
          |    agent_source TEXT NOT NULL,
          |    action_summary TEXT NOT NULL,
          |    raw_payload TEXT NOT NULL DEFAULT '{}',
          |    soul_snapshot TEXT NOT NULL DEFAULT '{}'
          |)
          """.trimMargin(), 0)
      driver.execute(null, """
          |CREATE TABLE IF NOT EXISTS global_soul_snapshots (
          |    user_id TEXT NOT NULL PRIMARY KEY,
          |    resilience REAL NOT NULL DEFAULT 0.5,
          |    bandwidth REAL NOT NULL DEFAULT 0.5,
          |    vitality REAL NOT NULL DEFAULT 0.5,
          |    output REAL NOT NULL DEFAULT 0.5,
          |    friction REAL NOT NULL DEFAULT 0.5,
          |    autopilot_level INTEGER NOT NULL DEFAULT 0,
          |    stale_flag INTEGER NOT NULL DEFAULT 0,
          |    updated_at INTEGER NOT NULL
          |)
          """.trimMargin(), 0)
      driver.execute(null, """
          |CREATE TABLE IF NOT EXISTS Goal (
          |    id TEXT NOT NULL PRIMARY KEY,
          |    label TEXT NOT NULL,
          |    target_date INTEGER,                          -- epoch ms deadline
          |    confidence_score REAL NOT NULL DEFAULT 0.0,  -- 0.0-1.0; projection shown only if > 0.7
          |    progress_percent REAL NOT NULL DEFAULT 0.0,
          |    velocity REAL NOT NULL DEFAULT 0.0,           -- weekly task completion rate
          |    created_at INTEGER NOT NULL,
          |    updated_at INTEGER NOT NULL
          |)
          """.trimMargin(), 0)
      driver.execute(null, """
          |CREATE TABLE IF NOT EXISTS MirrorEntry (
          |    id TEXT NOT NULL PRIMARY KEY,
          |    timestamp INTEGER NOT NULL,
          |    raw_content TEXT NOT NULL,
          |    extracted_tags TEXT,                   -- JSON array e.g. '["strength","completed","atlas"]'
          |    attributed_entity_id TEXT,             -- TaskBlock.id or habit id if attributed
          |    bandwidth_delta REAL NOT NULL DEFAULT 0.0  -- soul update: GlobalSoul.bandwidth delta applied
          |)
          """.trimMargin(), 0)
      driver.execute(null, """
          |CREATE TABLE IF NOT EXISTS module_soul_cache (
          |    user_id TEXT NOT NULL,
          |    module_id TEXT NOT NULL,
          |    profile_json TEXT NOT NULL,
          |    updated_at INTEGER NOT NULL,
          |    PRIMARY KEY (user_id, module_id)
          |)
          """.trimMargin(), 0)
      driver.execute(null, """
          |CREATE TABLE IF NOT EXISTS MovementLog (
          |    id          TEXT    PRIMARY KEY,
          |    session_id  TEXT    NOT NULL REFERENCES WorkoutSession(id) ON DELETE CASCADE,
          |    movement_id TEXT,                   -- nullable: custom/unnamed movements allowed
          |    movement_label TEXT,                -- denormalized label for fast display
          |    sets_data   TEXT    NOT NULL,       -- JSON array of set objects
          |    demand_tags TEXT,                   -- serialized JSON list of demandTags (cns_heavy, etc.)
          |    volume_type TEXT    NOT NULL DEFAULT 'WEIGHT_REPS'  -- WEIGHT_REPS | TIME | DISTANCE
          |)
          """.trimMargin(), 0)
      driver.execute(null, """
          |CREATE TABLE IF NOT EXISTS spine_event_store (
          |    id TEXT NOT NULL PRIMARY KEY,
          |    source TEXT NOT NULL,
          |    intent TEXT NOT NULL,
          |    mutations_json TEXT NOT NULL DEFAULT '[]',
          |    confidence REAL NOT NULL DEFAULT 1.0,
          |    requires_approval INTEGER NOT NULL DEFAULT 0,
          |    patient_scope TEXT NOT NULL DEFAULT 'USER',
          |    occurred_at INTEGER NOT NULL,
          |    processed_at INTEGER NOT NULL,
          |    suppress_active INTEGER NOT NULL DEFAULT 0,
          |    cascade_depth INTEGER NOT NULL DEFAULT 0
          |)
          """.trimMargin(), 0)
      driver.execute(null, """
          |CREATE TABLE IF NOT EXISTS TaskBlock (
          |    id TEXT NOT NULL PRIMARY KEY,
          |    title TEXT NOT NULL,
          |    cognitive_weight REAL NOT NULL DEFAULT 0.3,
          |    priority INTEGER NOT NULL DEFAULT 2,      -- 1=Critical, 2=Standard, 3=Low
          |    status TEXT NOT NULL DEFAULT 'TODO',       -- TODO, DOING, DONE, DEFERRED
          |    goal_id TEXT,
          |    deadline INTEGER,                          -- epoch ms
          |    defer_count INTEGER NOT NULL DEFAULT 0,
          |    created_at INTEGER NOT NULL,
          |    updated_at INTEGER NOT NULL
          |)
          """.trimMargin(), 0)
      driver.execute(null, """
          |CREATE TABLE IF NOT EXISTS WorkoutSession (
          |    id              TEXT    PRIMARY KEY,
          |    timestamp       INTEGER NOT NULL,           -- epoch ms
          |    routine_name    TEXT,
          |    total_tonnage   REAL,                       -- kg lifted (sum weight × reps across all sets)
          |    subjective_rpe  INTEGER,                    -- 1–10 Rate of Perceived Exertion
          |    mode            TEXT    NOT NULL DEFAULT 'PERFORMANCE'  -- PERFORMANCE | RECOVERY
          |)
          """.trimMargin(), 0)
      return QueryResult.Unit
    }

    override fun migrate(
      driver: SqlDriver,
      oldVersion: Long,
      newVersion: Long,
      vararg callbacks: AfterVersion,
    ): QueryResult.Value<Unit> = QueryResult.Unit
  }
}
