package com.agnes.nexus.core.db

import app.cash.sqldelight.Query
import app.cash.sqldelight.TransacterImpl
import app.cash.sqldelight.db.QueryResult
import app.cash.sqldelight.db.SqlCursor
import app.cash.sqldelight.db.SqlDriver
import kotlin.Any
import kotlin.Long
import kotlin.String

public class AuditTrailQueries(
  driver: SqlDriver,
) : TransacterImpl(driver) {
  public fun <T : Any> selectRecent(`value`: Long, mapper: (
    id: String,
    timestamp: Long,
    agent_source: String,
    action_summary: String,
    raw_payload: String,
    soul_snapshot: String,
  ) -> T): Query<T> = SelectRecentQuery(value) { cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getLong(1)!!,
      cursor.getString(2)!!,
      cursor.getString(3)!!,
      cursor.getString(4)!!,
      cursor.getString(5)!!
    )
  }

  public fun selectRecent(value_: Long): Query<Audit_trail> = selectRecent(value_) { id, timestamp,
      agent_source, action_summary, raw_payload, soul_snapshot ->
    Audit_trail(
      id,
      timestamp,
      agent_source,
      action_summary,
      raw_payload,
      soul_snapshot
    )
  }

  public fun <T : Any> selectByAgent(
    agent_source: String,
    `value`: Long,
    mapper: (
      id: String,
      timestamp: Long,
      agent_source: String,
      action_summary: String,
      raw_payload: String,
      soul_snapshot: String,
    ) -> T,
  ): Query<T> = SelectByAgentQuery(agent_source, value) { cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getLong(1)!!,
      cursor.getString(2)!!,
      cursor.getString(3)!!,
      cursor.getString(4)!!,
      cursor.getString(5)!!
    )
  }

  public fun selectByAgent(agent_source: String, value_: Long): Query<Audit_trail> =
      selectByAgent(agent_source, value_) { id, timestamp, agent_source_, action_summary,
      raw_payload, soul_snapshot ->
    Audit_trail(
      id,
      timestamp,
      agent_source_,
      action_summary,
      raw_payload,
      soul_snapshot
    )
  }

  public fun <T : Any> selectSince(timestamp: Long, mapper: (
    id: String,
    timestamp: Long,
    agent_source: String,
    action_summary: String,
    raw_payload: String,
    soul_snapshot: String,
  ) -> T): Query<T> = SelectSinceQuery(timestamp) { cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getLong(1)!!,
      cursor.getString(2)!!,
      cursor.getString(3)!!,
      cursor.getString(4)!!,
      cursor.getString(5)!!
    )
  }

  public fun selectSince(timestamp: Long): Query<Audit_trail> = selectSince(timestamp) { id,
      timestamp_, agent_source, action_summary, raw_payload, soul_snapshot ->
    Audit_trail(
      id,
      timestamp_,
      agent_source,
      action_summary,
      raw_payload,
      soul_snapshot
    )
  }

  public fun insertAuditEntry(
    id: String,
    timestamp: Long,
    agent_source: String,
    action_summary: String,
    raw_payload: String,
    soul_snapshot: String,
  ) {
    driver.execute(-2_073_439_062, """
        |INSERT INTO audit_trail(id, timestamp, agent_source, action_summary, raw_payload, soul_snapshot)
        |VALUES (?, ?, ?, ?, ?, ?)
        """.trimMargin(), 6) {
          bindString(0, id)
          bindLong(1, timestamp)
          bindString(2, agent_source)
          bindString(3, action_summary)
          bindString(4, raw_payload)
          bindString(5, soul_snapshot)
        }
    notifyQueries(-2_073_439_062) { emit ->
      emit("audit_trail")
    }
  }

  public fun deleteOlderThan(timestamp: Long) {
    driver.execute(-2_019_658_640, """DELETE FROM audit_trail WHERE timestamp < ?""", 1) {
          bindLong(0, timestamp)
        }
    notifyQueries(-2_019_658_640) { emit ->
      emit("audit_trail")
    }
  }

  private inner class SelectRecentQuery<out T : Any>(
    public val `value`: Long,
    mapper: (SqlCursor) -> T,
  ) : Query<T>(mapper) {
    override fun addListener(listener: Query.Listener) {
      driver.addListener("audit_trail", listener = listener)
    }

    override fun removeListener(listener: Query.Listener) {
      driver.removeListener("audit_trail", listener = listener)
    }

    override fun <R> execute(mapper: (SqlCursor) -> QueryResult<R>): QueryResult<R> =
        driver.executeQuery(2_138_604_337,
        """SELECT audit_trail.id, audit_trail.timestamp, audit_trail.agent_source, audit_trail.action_summary, audit_trail.raw_payload, audit_trail.soul_snapshot FROM audit_trail ORDER BY timestamp DESC LIMIT ?""",
        mapper, 1) {
      bindLong(0, value)
    }

    override fun toString(): String = "AuditTrail.sq:selectRecent"
  }

  private inner class SelectByAgentQuery<out T : Any>(
    public val agent_source: String,
    public val `value`: Long,
    mapper: (SqlCursor) -> T,
  ) : Query<T>(mapper) {
    override fun addListener(listener: Query.Listener) {
      driver.addListener("audit_trail", listener = listener)
    }

    override fun removeListener(listener: Query.Listener) {
      driver.removeListener("audit_trail", listener = listener)
    }

    override fun <R> execute(mapper: (SqlCursor) -> QueryResult<R>): QueryResult<R> =
        driver.executeQuery(1_098_302_168,
        """SELECT audit_trail.id, audit_trail.timestamp, audit_trail.agent_source, audit_trail.action_summary, audit_trail.raw_payload, audit_trail.soul_snapshot FROM audit_trail WHERE agent_source = ? ORDER BY timestamp DESC LIMIT ?""",
        mapper, 2) {
      bindString(0, agent_source)
      bindLong(1, value)
    }

    override fun toString(): String = "AuditTrail.sq:selectByAgent"
  }

  private inner class SelectSinceQuery<out T : Any>(
    public val timestamp: Long,
    mapper: (SqlCursor) -> T,
  ) : Query<T>(mapper) {
    override fun addListener(listener: Query.Listener) {
      driver.addListener("audit_trail", listener = listener)
    }

    override fun removeListener(listener: Query.Listener) {
      driver.removeListener("audit_trail", listener = listener)
    }

    override fun <R> execute(mapper: (SqlCursor) -> QueryResult<R>): QueryResult<R> =
        driver.executeQuery(-2_008_169_564,
        """SELECT audit_trail.id, audit_trail.timestamp, audit_trail.agent_source, audit_trail.action_summary, audit_trail.raw_payload, audit_trail.soul_snapshot FROM audit_trail WHERE timestamp >= ? ORDER BY timestamp ASC""",
        mapper, 1) {
      bindLong(0, timestamp)
    }

    override fun toString(): String = "AuditTrail.sq:selectSince"
  }
}
