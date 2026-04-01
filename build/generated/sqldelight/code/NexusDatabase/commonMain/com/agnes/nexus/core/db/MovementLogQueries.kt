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

public class MovementLogQueries(
  driver: SqlDriver,
) : TransacterImpl(driver) {
  public fun <T : Any> selectLogsForSession(sessionId: String, mapper: (
    id: String,
    session_id: String,
    movement_id: String?,
    movement_label: String?,
    sets_data: String,
    demand_tags: String?,
    volume_type: String,
  ) -> T): Query<T> = SelectLogsForSessionQuery(sessionId) { cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getString(1)!!,
      cursor.getString(2),
      cursor.getString(3),
      cursor.getString(4)!!,
      cursor.getString(5),
      cursor.getString(6)!!
    )
  }

  public fun selectLogsForSession(sessionId: String): Query<MovementLog> =
      selectLogsForSession(sessionId) { id, session_id, movement_id, movement_label, sets_data,
      demand_tags, volume_type ->
    MovementLog(
      id,
      session_id,
      movement_id,
      movement_label,
      sets_data,
      demand_tags,
      volume_type
    )
  }

  public fun <T : Any> selectLogsForMovement(movementId: String?, mapper: (
    id: String,
    session_id: String,
    movement_id: String?,
    movement_label: String?,
    sets_data: String,
    demand_tags: String?,
    volume_type: String,
    timestamp: Long,
  ) -> T): Query<T> = SelectLogsForMovementQuery(movementId) { cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getString(1)!!,
      cursor.getString(2),
      cursor.getString(3),
      cursor.getString(4)!!,
      cursor.getString(5),
      cursor.getString(6)!!,
      cursor.getLong(7)!!
    )
  }

  public fun selectLogsForMovement(movementId: String?): Query<SelectLogsForMovement> =
      selectLogsForMovement(movementId) { id, session_id, movement_id, movement_label, sets_data,
      demand_tags, volume_type, timestamp ->
    SelectLogsForMovement(
      id,
      session_id,
      movement_id,
      movement_label,
      sets_data,
      demand_tags,
      volume_type,
      timestamp
    )
  }

  public fun <T : Any> selectCnsHeavyLogsInRange(
    from: Long,
    to: Long,
    mapper: (
      id: String,
      session_id: String,
      movement_id: String?,
      movement_label: String?,
      sets_data: String,
      demand_tags: String?,
      volume_type: String,
      timestamp: Long,
      total_tonnage: Double?,
    ) -> T,
  ): Query<T> = SelectCnsHeavyLogsInRangeQuery(from, to) { cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getString(1)!!,
      cursor.getString(2),
      cursor.getString(3),
      cursor.getString(4)!!,
      cursor.getString(5),
      cursor.getString(6)!!,
      cursor.getLong(7)!!,
      cursor.getDouble(8)
    )
  }

  public fun selectCnsHeavyLogsInRange(from: Long, to: Long): Query<SelectCnsHeavyLogsInRange> =
      selectCnsHeavyLogsInRange(from, to) { id, session_id, movement_id, movement_label, sets_data,
      demand_tags, volume_type, timestamp, total_tonnage ->
    SelectCnsHeavyLogsInRange(
      id,
      session_id,
      movement_id,
      movement_label,
      sets_data,
      demand_tags,
      volume_type,
      timestamp,
      total_tonnage
    )
  }

  public fun insertMovementLog(
    id: String,
    session_id: String,
    movement_id: String?,
    movement_label: String?,
    sets_data: String,
    demand_tags: String?,
    volume_type: String,
  ) {
    driver.execute(701_283_098, """
        |INSERT INTO MovementLog (id, session_id, movement_id, movement_label, sets_data, demand_tags, volume_type)
        |VALUES (?, ?, ?, ?, ?, ?, ?)
        """.trimMargin(), 7) {
          bindString(0, id)
          bindString(1, session_id)
          bindString(2, movement_id)
          bindString(3, movement_label)
          bindString(4, sets_data)
          bindString(5, demand_tags)
          bindString(6, volume_type)
        }
    notifyQueries(701_283_098) { emit ->
      emit("MovementLog")
    }
  }

  public fun updateSetsData(setsData: String, id: String) {
    driver.execute(847_473_862, """UPDATE MovementLog SET sets_data = ? WHERE id = ?""", 2) {
          bindString(0, setsData)
          bindString(1, id)
        }
    notifyQueries(847_473_862) { emit ->
      emit("MovementLog")
    }
  }

  public fun deleteLogsForSession(sessionId: String) {
    driver.execute(22_868_713, """DELETE FROM MovementLog WHERE session_id = ?""", 1) {
          bindString(0, sessionId)
        }
    notifyQueries(22_868_713) { emit ->
      emit("MovementLog")
    }
  }

  private inner class SelectLogsForSessionQuery<out T : Any>(
    public val sessionId: String,
    mapper: (SqlCursor) -> T,
  ) : Query<T>(mapper) {
    override fun addListener(listener: Query.Listener) {
      driver.addListener("MovementLog", listener = listener)
    }

    override fun removeListener(listener: Query.Listener) {
      driver.removeListener("MovementLog", listener = listener)
    }

    override fun <R> execute(mapper: (SqlCursor) -> QueryResult<R>): QueryResult<R> =
        driver.executeQuery(-586_940_294,
        """SELECT MovementLog.id, MovementLog.session_id, MovementLog.movement_id, MovementLog.movement_label, MovementLog.sets_data, MovementLog.demand_tags, MovementLog.volume_type FROM MovementLog WHERE session_id = ? ORDER BY rowid ASC""",
        mapper, 1) {
      bindString(0, sessionId)
    }

    override fun toString(): String = "MovementLog.sq:selectLogsForSession"
  }

  private inner class SelectLogsForMovementQuery<out T : Any>(
    public val movementId: String?,
    mapper: (SqlCursor) -> T,
  ) : Query<T>(mapper) {
    override fun addListener(listener: Query.Listener) {
      driver.addListener("MovementLog", "WorkoutSession", listener = listener)
    }

    override fun removeListener(listener: Query.Listener) {
      driver.removeListener("MovementLog", "WorkoutSession", listener = listener)
    }

    override fun <R> execute(mapper: (SqlCursor) -> QueryResult<R>): QueryResult<R> =
        driver.executeQuery(null, """
    |SELECT ml.id, ml.session_id, ml.movement_id, ml.movement_label, ml.sets_data, ml.demand_tags, ml.volume_type, ws.timestamp
    |FROM MovementLog ml
    |JOIN WorkoutSession ws ON ml.session_id = ws.id
    |WHERE ml.movement_id ${ if (movementId == null) "IS" else "=" } ?
    |ORDER BY ws.timestamp DESC
    """.trimMargin(), mapper, 1) {
      bindString(0, movementId)
    }

    override fun toString(): String = "MovementLog.sq:selectLogsForMovement"
  }

  private inner class SelectCnsHeavyLogsInRangeQuery<out T : Any>(
    public val from: Long,
    public val to: Long,
    mapper: (SqlCursor) -> T,
  ) : Query<T>(mapper) {
    override fun addListener(listener: Query.Listener) {
      driver.addListener("MovementLog", "WorkoutSession", listener = listener)
    }

    override fun removeListener(listener: Query.Listener) {
      driver.removeListener("MovementLog", "WorkoutSession", listener = listener)
    }

    override fun <R> execute(mapper: (SqlCursor) -> QueryResult<R>): QueryResult<R> =
        driver.executeQuery(-1_425_187_956, """
    |SELECT ml.id, ml.session_id, ml.movement_id, ml.movement_label, ml.sets_data, ml.demand_tags, ml.volume_type, ws.timestamp, ws.total_tonnage
    |FROM MovementLog ml
    |JOIN WorkoutSession ws ON ml.session_id = ws.id
    |WHERE ws.timestamp >= ? AND ws.timestamp <= ?
    |  AND ml.demand_tags LIKE '%cns_heavy%'
    """.trimMargin(), mapper, 2) {
      bindLong(0, from)
      bindLong(1, to)
    }

    override fun toString(): String = "MovementLog.sq:selectCnsHeavyLogsInRange"
  }
}
