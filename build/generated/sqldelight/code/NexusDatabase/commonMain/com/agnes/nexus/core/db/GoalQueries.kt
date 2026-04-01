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

public class GoalQueries(
  driver: SqlDriver,
) : TransacterImpl(driver) {
  public fun <T : Any> selectAll(mapper: (
    id: String,
    label: String,
    target_date: Long?,
    confidence_score: Double,
    progress_percent: Double,
    velocity: Double,
    created_at: Long,
    updated_at: Long,
  ) -> T): Query<T> = Query(-2_064_531_293, arrayOf("Goal"), driver, "Goal.sq", "selectAll",
      "SELECT Goal.id, Goal.label, Goal.target_date, Goal.confidence_score, Goal.progress_percent, Goal.velocity, Goal.created_at, Goal.updated_at FROM Goal ORDER BY target_date ASC") {
      cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getString(1)!!,
      cursor.getLong(2),
      cursor.getDouble(3)!!,
      cursor.getDouble(4)!!,
      cursor.getDouble(5)!!,
      cursor.getLong(6)!!,
      cursor.getLong(7)!!
    )
  }

  public fun selectAll(): Query<Goal> = selectAll { id, label, target_date, confidence_score,
      progress_percent, velocity, created_at, updated_at ->
    Goal(
      id,
      label,
      target_date,
      confidence_score,
      progress_percent,
      velocity,
      created_at,
      updated_at
    )
  }

  public fun <T : Any> selectById(id: String, mapper: (
    id: String,
    label: String,
    target_date: Long?,
    confidence_score: Double,
    progress_percent: Double,
    velocity: Double,
    created_at: Long,
    updated_at: Long,
  ) -> T): Query<T> = SelectByIdQuery(id) { cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getString(1)!!,
      cursor.getLong(2),
      cursor.getDouble(3)!!,
      cursor.getDouble(4)!!,
      cursor.getDouble(5)!!,
      cursor.getLong(6)!!,
      cursor.getLong(7)!!
    )
  }

  public fun selectById(id: String): Query<Goal> = selectById(id) { id_, label, target_date,
      confidence_score, progress_percent, velocity, created_at, updated_at ->
    Goal(
      id_,
      label,
      target_date,
      confidence_score,
      progress_percent,
      velocity,
      created_at,
      updated_at
    )
  }

  public fun upsertGoal(
    id: String,
    label: String,
    target_date: Long?,
    confidence_score: Double,
    progress_percent: Double,
    velocity: Double,
    created_at: Long,
    updated_at: Long,
  ) {
    driver.execute(1_368_238_852, """
        |INSERT OR REPLACE INTO Goal(id, label, target_date, confidence_score, progress_percent, velocity, created_at, updated_at)
        |VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """.trimMargin(), 8) {
          bindString(0, id)
          bindString(1, label)
          bindLong(2, target_date)
          bindDouble(3, confidence_score)
          bindDouble(4, progress_percent)
          bindDouble(5, velocity)
          bindLong(6, created_at)
          bindLong(7, updated_at)
        }
    notifyQueries(1_368_238_852) { emit ->
      emit("Goal")
    }
  }

  public fun updateProjection(
    confidence_score: Double,
    progress_percent: Double,
    velocity: Double,
    updated_at: Long,
    id: String,
  ) {
    driver.execute(2_060_805_274,
        """UPDATE Goal SET confidence_score = ?, progress_percent = ?, velocity = ?, updated_at = ? WHERE id = ?""",
        5) {
          bindDouble(0, confidence_score)
          bindDouble(1, progress_percent)
          bindDouble(2, velocity)
          bindLong(3, updated_at)
          bindString(4, id)
        }
    notifyQueries(2_060_805_274) { emit ->
      emit("Goal")
    }
  }

  public fun deleteGoal(id: String) {
    driver.execute(-450_201_216, """DELETE FROM Goal WHERE id = ?""", 1) {
          bindString(0, id)
        }
    notifyQueries(-450_201_216) { emit ->
      emit("Goal")
    }
  }

  private inner class SelectByIdQuery<out T : Any>(
    public val id: String,
    mapper: (SqlCursor) -> T,
  ) : Query<T>(mapper) {
    override fun addListener(listener: Query.Listener) {
      driver.addListener("Goal", listener = listener)
    }

    override fun removeListener(listener: Query.Listener) {
      driver.removeListener("Goal", listener = listener)
    }

    override fun <R> execute(mapper: (SqlCursor) -> QueryResult<R>): QueryResult<R> =
        driver.executeQuery(424_080_656,
        """SELECT Goal.id, Goal.label, Goal.target_date, Goal.confidence_score, Goal.progress_percent, Goal.velocity, Goal.created_at, Goal.updated_at FROM Goal WHERE id = ?""",
        mapper, 1) {
      bindString(0, id)
    }

    override fun toString(): String = "Goal.sq:selectById"
  }
}
