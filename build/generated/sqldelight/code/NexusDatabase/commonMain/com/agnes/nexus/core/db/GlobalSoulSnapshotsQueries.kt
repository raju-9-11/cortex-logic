package com.agnes.nexus.core.db

import app.cash.sqldelight.Query
import app.cash.sqldelight.TransacterImpl
import app.cash.sqldelight.db.QueryResult
import app.cash.sqldelight.db.SqlCursor
import app.cash.sqldelight.db.SqlDriver
import kotlin.Any
import kotlin.Double
import kotlin.Long
import kotlin.String

public class GlobalSoulSnapshotsQueries(
  driver: SqlDriver,
) : TransacterImpl(driver) {
  public fun <T : Any> selectByUserId(user_id: String, mapper: (
    user_id: String,
    resilience: Double,
    bandwidth: Double,
    vitality: Double,
    output: Double,
    friction: Double,
    autopilot_level: Long,
    stale_flag: Long,
    updated_at: Long,
  ) -> T): Query<T> = SelectByUserIdQuery(user_id) { cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getDouble(1)!!,
      cursor.getDouble(2)!!,
      cursor.getDouble(3)!!,
      cursor.getDouble(4)!!,
      cursor.getDouble(5)!!,
      cursor.getLong(6)!!,
      cursor.getLong(7)!!,
      cursor.getLong(8)!!
    )
  }

  public fun selectByUserId(user_id: String): Query<Global_soul_snapshots> =
      selectByUserId(user_id) { user_id_, resilience, bandwidth, vitality, output, friction,
      autopilot_level, stale_flag, updated_at ->
    Global_soul_snapshots(
      user_id_,
      resilience,
      bandwidth,
      vitality,
      output,
      friction,
      autopilot_level,
      stale_flag,
      updated_at
    )
  }

  public fun upsertGlobalSoul(
    user_id: String,
    resilience: Double,
    bandwidth: Double,
    vitality: Double,
    output: Double,
    friction: Double,
    autopilot_level: Long,
    stale_flag: Long,
    updated_at: Long,
  ) {
    driver.execute(-1_850_863_093, """
        |INSERT OR REPLACE INTO global_soul_snapshots(user_id, resilience, bandwidth, vitality, output, friction, autopilot_level, stale_flag, updated_at)
        |VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """.trimMargin(), 9) {
          bindString(0, user_id)
          bindDouble(1, resilience)
          bindDouble(2, bandwidth)
          bindDouble(3, vitality)
          bindDouble(4, output)
          bindDouble(5, friction)
          bindLong(6, autopilot_level)
          bindLong(7, stale_flag)
          bindLong(8, updated_at)
        }
    notifyQueries(-1_850_863_093) { emit ->
      emit("global_soul_snapshots")
    }
  }

  public fun deleteByUserId(user_id: String) {
    driver.execute(-256_370_418, """DELETE FROM global_soul_snapshots WHERE user_id = ?""", 1) {
          bindString(0, user_id)
        }
    notifyQueries(-256_370_418) { emit ->
      emit("global_soul_snapshots")
    }
  }

  private inner class SelectByUserIdQuery<out T : Any>(
    public val user_id: String,
    mapper: (SqlCursor) -> T,
  ) : Query<T>(mapper) {
    override fun addListener(listener: Query.Listener) {
      driver.addListener("global_soul_snapshots", listener = listener)
    }

    override fun removeListener(listener: Query.Listener) {
      driver.removeListener("global_soul_snapshots", listener = listener)
    }

    override fun <R> execute(mapper: (SqlCursor) -> QueryResult<R>): QueryResult<R> =
        driver.executeQuery(-1_546_066_081,
        """SELECT global_soul_snapshots.user_id, global_soul_snapshots.resilience, global_soul_snapshots.bandwidth, global_soul_snapshots.vitality, global_soul_snapshots.output, global_soul_snapshots.friction, global_soul_snapshots.autopilot_level, global_soul_snapshots.stale_flag, global_soul_snapshots.updated_at FROM global_soul_snapshots WHERE user_id = ?""",
        mapper, 1) {
      bindString(0, user_id)
    }

    override fun toString(): String = "GlobalSoulSnapshots.sq:selectByUserId"
  }
}
