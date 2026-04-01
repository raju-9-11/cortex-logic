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

public class TaskBlockQueries(
  driver: SqlDriver,
) : TransacterImpl(driver) {
  public fun <T : Any> selectActive(mapper: (
    id: String,
    title: String,
    cognitive_weight: Double,
    priority: Long,
    status: String,
    goal_id: String?,
    deadline: Long?,
    defer_count: Long,
    created_at: Long,
    updated_at: Long,
  ) -> T): Query<T> = Query(889_200_791, arrayOf("TaskBlock"), driver, "TaskBlock.sq",
      "selectActive",
      "SELECT TaskBlock.id, TaskBlock.title, TaskBlock.cognitive_weight, TaskBlock.priority, TaskBlock.status, TaskBlock.goal_id, TaskBlock.deadline, TaskBlock.defer_count, TaskBlock.created_at, TaskBlock.updated_at FROM TaskBlock WHERE status IN ('TODO', 'DOING') ORDER BY priority ASC, created_at ASC") {
      cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getString(1)!!,
      cursor.getDouble(2)!!,
      cursor.getLong(3)!!,
      cursor.getString(4)!!,
      cursor.getString(5),
      cursor.getLong(6),
      cursor.getLong(7)!!,
      cursor.getLong(8)!!,
      cursor.getLong(9)!!
    )
  }

  public fun selectActive(): Query<TaskBlock> = selectActive { id, title, cognitive_weight,
      priority, status, goal_id, deadline, defer_count, created_at, updated_at ->
    TaskBlock(
      id,
      title,
      cognitive_weight,
      priority,
      status,
      goal_id,
      deadline,
      defer_count,
      created_at,
      updated_at
    )
  }

  public fun <T : Any> selectByGoal(goal_id: String?, mapper: (
    id: String,
    title: String,
    cognitive_weight: Double,
    priority: Long,
    status: String,
    goal_id: String?,
    deadline: Long?,
    defer_count: Long,
    created_at: Long,
    updated_at: Long,
  ) -> T): Query<T> = SelectByGoalQuery(goal_id) { cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getString(1)!!,
      cursor.getDouble(2)!!,
      cursor.getLong(3)!!,
      cursor.getString(4)!!,
      cursor.getString(5),
      cursor.getLong(6),
      cursor.getLong(7)!!,
      cursor.getLong(8)!!,
      cursor.getLong(9)!!
    )
  }

  public fun selectByGoal(goal_id: String?): Query<TaskBlock> = selectByGoal(goal_id) { id, title,
      cognitive_weight, priority, status, goal_id_, deadline, defer_count, created_at, updated_at ->
    TaskBlock(
      id,
      title,
      cognitive_weight,
      priority,
      status,
      goal_id_,
      deadline,
      defer_count,
      created_at,
      updated_at
    )
  }

  public fun <T : Any> selectOverdeferred(mapper: (
    id: String,
    title: String,
    cognitive_weight: Double,
    priority: Long,
    status: String,
    goal_id: String?,
    deadline: Long?,
    defer_count: Long,
    created_at: Long,
    updated_at: Long,
  ) -> T): Query<T> = Query(889_037_188, arrayOf("TaskBlock"), driver, "TaskBlock.sq",
      "selectOverdeferred",
      "SELECT TaskBlock.id, TaskBlock.title, TaskBlock.cognitive_weight, TaskBlock.priority, TaskBlock.status, TaskBlock.goal_id, TaskBlock.deadline, TaskBlock.defer_count, TaskBlock.created_at, TaskBlock.updated_at FROM TaskBlock WHERE defer_count > 3 AND status = 'DEFERRED'") {
      cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getString(1)!!,
      cursor.getDouble(2)!!,
      cursor.getLong(3)!!,
      cursor.getString(4)!!,
      cursor.getString(5),
      cursor.getLong(6),
      cursor.getLong(7)!!,
      cursor.getLong(8)!!,
      cursor.getLong(9)!!
    )
  }

  public fun selectOverdeferred(): Query<TaskBlock> = selectOverdeferred { id, title,
      cognitive_weight, priority, status, goal_id, deadline, defer_count, created_at, updated_at ->
    TaskBlock(
      id,
      title,
      cognitive_weight,
      priority,
      status,
      goal_id,
      deadline,
      defer_count,
      created_at,
      updated_at
    )
  }

  public fun totalActiveWeight(): Query<Double> = Query(453_586_477, arrayOf("TaskBlock"), driver,
      "TaskBlock.sq", "totalActiveWeight",
      "SELECT COALESCE(SUM(cognitive_weight), 0.0) FROM TaskBlock WHERE status IN ('TODO', 'DOING')") {
      cursor ->
    cursor.getDouble(0)!!
  }

  public fun upsertTask(
    id: String,
    title: String,
    cognitive_weight: Double,
    priority: Long,
    status: String,
    goal_id: String?,
    deadline: Long?,
    defer_count: Long,
    created_at: Long,
    updated_at: Long,
  ) {
    driver.execute(1_249_417_737, """
        |INSERT OR REPLACE INTO TaskBlock(id, title, cognitive_weight, priority, status, goal_id, deadline, defer_count, created_at, updated_at)
        |VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """.trimMargin(), 10) {
          bindString(0, id)
          bindString(1, title)
          bindDouble(2, cognitive_weight)
          bindLong(3, priority)
          bindString(4, status)
          bindString(5, goal_id)
          bindLong(6, deadline)
          bindLong(7, defer_count)
          bindLong(8, created_at)
          bindLong(9, updated_at)
        }
    notifyQueries(1_249_417_737) { emit ->
      emit("TaskBlock")
    }
  }

  public fun markDone(updated_at: Long, id: String) {
    driver.execute(-2_252_828,
        """UPDATE TaskBlock SET status = 'DONE', updated_at = ? WHERE id = ?""", 2) {
          bindLong(0, updated_at)
          bindString(1, id)
        }
    notifyQueries(-2_252_828) { emit ->
      emit("TaskBlock")
    }
  }

  public fun deferTask(updated_at: Long, id: String) {
    driver.execute(-496_561_470,
        """UPDATE TaskBlock SET status = 'DEFERRED', defer_count = defer_count + 1, updated_at = ? WHERE id = ?""",
        2) {
          bindLong(0, updated_at)
          bindString(1, id)
        }
    notifyQueries(-496_561_470) { emit ->
      emit("TaskBlock")
    }
  }

  public fun deleteTask(id: String) {
    driver.execute(-569_022_331, """DELETE FROM TaskBlock WHERE id = ?""", 1) {
          bindString(0, id)
        }
    notifyQueries(-569_022_331) { emit ->
      emit("TaskBlock")
    }
  }

  private inner class SelectByGoalQuery<out T : Any>(
    public val goal_id: String?,
    mapper: (SqlCursor) -> T,
  ) : Query<T>(mapper) {
    override fun addListener(listener: Query.Listener) {
      driver.addListener("TaskBlock", listener = listener)
    }

    override fun removeListener(listener: Query.Listener) {
      driver.removeListener("TaskBlock", listener = listener)
    }

    override fun <R> execute(mapper: (SqlCursor) -> QueryResult<R>): QueryResult<R> =
        driver.executeQuery(null,
        """SELECT TaskBlock.id, TaskBlock.title, TaskBlock.cognitive_weight, TaskBlock.priority, TaskBlock.status, TaskBlock.goal_id, TaskBlock.deadline, TaskBlock.defer_count, TaskBlock.created_at, TaskBlock.updated_at FROM TaskBlock WHERE goal_id ${ if (goal_id == null) "IS" else "=" } ? ORDER BY priority ASC""",
        mapper, 1) {
      bindString(0, goal_id)
    }

    override fun toString(): String = "TaskBlock.sq:selectByGoal"
  }
}
