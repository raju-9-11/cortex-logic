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

public class WorkoutSessionQueries(
  driver: SqlDriver,
) : TransacterImpl(driver) {
  public fun <T : Any> selectAllSessions(mapper: (
    id: String,
    timestamp: Long,
    routine_name: String?,
    total_tonnage: Double?,
    subjective_rpe: Long?,
    mode: String,
  ) -> T): Query<T> = Query(1_594_398_010, arrayOf("WorkoutSession"), driver, "WorkoutSession.sq",
      "selectAllSessions",
      "SELECT WorkoutSession.id, WorkoutSession.timestamp, WorkoutSession.routine_name, WorkoutSession.total_tonnage, WorkoutSession.subjective_rpe, WorkoutSession.mode FROM WorkoutSession ORDER BY timestamp DESC") {
      cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getLong(1)!!,
      cursor.getString(2),
      cursor.getDouble(3),
      cursor.getLong(4),
      cursor.getString(5)!!
    )
  }

  public fun selectAllSessions(): Query<WorkoutSession> = selectAllSessions { id, timestamp,
      routine_name, total_tonnage, subjective_rpe, mode ->
    WorkoutSession(
      id,
      timestamp,
      routine_name,
      total_tonnage,
      subjective_rpe,
      mode
    )
  }

  public fun <T : Any> selectSessionsInRange(
    from: Long,
    to: Long,
    mapper: (
      id: String,
      timestamp: Long,
      routine_name: String?,
      total_tonnage: Double?,
      subjective_rpe: Long?,
      mode: String,
    ) -> T,
  ): Query<T> = SelectSessionsInRangeQuery(from, to) { cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getLong(1)!!,
      cursor.getString(2),
      cursor.getDouble(3),
      cursor.getLong(4),
      cursor.getString(5)!!
    )
  }

  public fun selectSessionsInRange(from: Long, to: Long): Query<WorkoutSession> =
      selectSessionsInRange(from, to) { id, timestamp, routine_name, total_tonnage, subjective_rpe,
      mode ->
    WorkoutSession(
      id,
      timestamp,
      routine_name,
      total_tonnage,
      subjective_rpe,
      mode
    )
  }

  public fun <T : Any> selectLatestSession(mapper: (
    id: String,
    timestamp: Long,
    routine_name: String?,
    total_tonnage: Double?,
    subjective_rpe: Long?,
    mode: String,
  ) -> T): Query<T> = Query(1_590_027_755, arrayOf("WorkoutSession"), driver, "WorkoutSession.sq",
      "selectLatestSession",
      "SELECT WorkoutSession.id, WorkoutSession.timestamp, WorkoutSession.routine_name, WorkoutSession.total_tonnage, WorkoutSession.subjective_rpe, WorkoutSession.mode FROM WorkoutSession ORDER BY timestamp DESC LIMIT 1") {
      cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getLong(1)!!,
      cursor.getString(2),
      cursor.getDouble(3),
      cursor.getLong(4),
      cursor.getString(5)!!
    )
  }

  public fun selectLatestSession(): Query<WorkoutSession> = selectLatestSession { id, timestamp,
      routine_name, total_tonnage, subjective_rpe, mode ->
    WorkoutSession(
      id,
      timestamp,
      routine_name,
      total_tonnage,
      subjective_rpe,
      mode
    )
  }

  public fun <T : Any> selectSessionsByMode(mode: String, mapper: (
    id: String,
    timestamp: Long,
    routine_name: String?,
    total_tonnage: Double?,
    subjective_rpe: Long?,
    mode: String,
  ) -> T): Query<T> = SelectSessionsByModeQuery(mode) { cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getLong(1)!!,
      cursor.getString(2),
      cursor.getDouble(3),
      cursor.getLong(4),
      cursor.getString(5)!!
    )
  }

  public fun selectSessionsByMode(mode: String): Query<WorkoutSession> =
      selectSessionsByMode(mode) { id, timestamp, routine_name, total_tonnage, subjective_rpe,
      mode_ ->
    WorkoutSession(
      id,
      timestamp,
      routine_name,
      total_tonnage,
      subjective_rpe,
      mode_
    )
  }

  public fun insertSession(
    id: String,
    timestamp: Long,
    routine_name: String?,
    total_tonnage: Double?,
    subjective_rpe: Long?,
    mode: String,
  ) {
    driver.execute(-415_310_827, """
        |INSERT INTO WorkoutSession (id, timestamp, routine_name, total_tonnage, subjective_rpe, mode)
        |VALUES (?, ?, ?, ?, ?, ?)
        """.trimMargin(), 6) {
          bindString(0, id)
          bindLong(1, timestamp)
          bindString(2, routine_name)
          bindDouble(3, total_tonnage)
          bindLong(4, subjective_rpe)
          bindString(5, mode)
        }
    notifyQueries(-415_310_827) { emit ->
      emit("WorkoutSession")
    }
  }

  public fun updateTonnage(tonnage: Double?, id: String) {
    driver.execute(-230_733_037, """UPDATE WorkoutSession SET total_tonnage = ? WHERE id = ?""", 2)
        {
          bindDouble(0, tonnage)
          bindString(1, id)
        }
    notifyQueries(-230_733_037) { emit ->
      emit("WorkoutSession")
    }
  }

  public fun deleteSession(id: String) {
    driver.execute(-108_575_517, """DELETE FROM WorkoutSession WHERE id = ?""", 1) {
          bindString(0, id)
        }
    notifyQueries(-108_575_517) { emit ->
      emit("MovementLog")
      emit("WorkoutSession")
    }
  }

  private inner class SelectSessionsInRangeQuery<out T : Any>(
    public val from: Long,
    public val to: Long,
    mapper: (SqlCursor) -> T,
  ) : Query<T>(mapper) {
    override fun addListener(listener: Query.Listener) {
      driver.addListener("WorkoutSession", listener = listener)
    }

    override fun removeListener(listener: Query.Listener) {
      driver.removeListener("WorkoutSession", listener = listener)
    }

    override fun <R> execute(mapper: (SqlCursor) -> QueryResult<R>): QueryResult<R> =
        driver.executeQuery(1_109_442_967, """
    |SELECT WorkoutSession.id, WorkoutSession.timestamp, WorkoutSession.routine_name, WorkoutSession.total_tonnage, WorkoutSession.subjective_rpe, WorkoutSession.mode FROM WorkoutSession
    |WHERE timestamp >= ? AND timestamp <= ?
    |ORDER BY timestamp ASC
    """.trimMargin(), mapper, 2) {
      bindLong(0, from)
      bindLong(1, to)
    }

    override fun toString(): String = "WorkoutSession.sq:selectSessionsInRange"
  }

  private inner class SelectSessionsByModeQuery<out T : Any>(
    public val mode: String,
    mapper: (SqlCursor) -> T,
  ) : Query<T>(mapper) {
    override fun addListener(listener: Query.Listener) {
      driver.addListener("WorkoutSession", listener = listener)
    }

    override fun removeListener(listener: Query.Listener) {
      driver.removeListener("WorkoutSession", listener = listener)
    }

    override fun <R> execute(mapper: (SqlCursor) -> QueryResult<R>): QueryResult<R> =
        driver.executeQuery(-1_817_160_645,
        """SELECT WorkoutSession.id, WorkoutSession.timestamp, WorkoutSession.routine_name, WorkoutSession.total_tonnage, WorkoutSession.subjective_rpe, WorkoutSession.mode FROM WorkoutSession WHERE mode = ? ORDER BY timestamp DESC""",
        mapper, 1) {
      bindString(0, mode)
    }

    override fun toString(): String = "WorkoutSession.sq:selectSessionsByMode"
  }
}
