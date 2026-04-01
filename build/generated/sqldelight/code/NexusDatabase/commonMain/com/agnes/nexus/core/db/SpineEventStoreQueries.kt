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

public class SpineEventStoreQueries(
  driver: SqlDriver,
) : TransacterImpl(driver) {
  public fun <T : Any> selectRecentEvents(`value`: Long, mapper: (
    id: String,
    source: String,
    intent: String,
    mutations_json: String,
    confidence: Double,
    requires_approval: Long,
    patient_scope: String,
    occurred_at: Long,
    processed_at: Long,
    suppress_active: Long,
    cascade_depth: Long,
  ) -> T): Query<T> = SelectRecentEventsQuery(value) { cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getString(1)!!,
      cursor.getString(2)!!,
      cursor.getString(3)!!,
      cursor.getDouble(4)!!,
      cursor.getLong(5)!!,
      cursor.getString(6)!!,
      cursor.getLong(7)!!,
      cursor.getLong(8)!!,
      cursor.getLong(9)!!,
      cursor.getLong(10)!!
    )
  }

  public fun selectRecentEvents(value_: Long): Query<Spine_event_store> =
      selectRecentEvents(value_) { id, source, intent, mutations_json, confidence,
      requires_approval, patient_scope, occurred_at, processed_at, suppress_active, cascade_depth ->
    Spine_event_store(
      id,
      source,
      intent,
      mutations_json,
      confidence,
      requires_approval,
      patient_scope,
      occurred_at,
      processed_at,
      suppress_active,
      cascade_depth
    )
  }

  public fun <T : Any> selectBySource(
    source: String,
    `value`: Long,
    mapper: (
      id: String,
      source: String,
      intent: String,
      mutations_json: String,
      confidence: Double,
      requires_approval: Long,
      patient_scope: String,
      occurred_at: Long,
      processed_at: Long,
      suppress_active: Long,
      cascade_depth: Long,
    ) -> T,
  ): Query<T> = SelectBySourceQuery(source, value) { cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getString(1)!!,
      cursor.getString(2)!!,
      cursor.getString(3)!!,
      cursor.getDouble(4)!!,
      cursor.getLong(5)!!,
      cursor.getString(6)!!,
      cursor.getLong(7)!!,
      cursor.getLong(8)!!,
      cursor.getLong(9)!!,
      cursor.getLong(10)!!
    )
  }

  public fun selectBySource(source: String, value_: Long): Query<Spine_event_store> =
      selectBySource(source, value_) { id, source_, intent, mutations_json, confidence,
      requires_approval, patient_scope, occurred_at, processed_at, suppress_active, cascade_depth ->
    Spine_event_store(
      id,
      source_,
      intent,
      mutations_json,
      confidence,
      requires_approval,
      patient_scope,
      occurred_at,
      processed_at,
      suppress_active,
      cascade_depth
    )
  }

  public fun <T : Any> selectNonSuppressed(`value`: Long, mapper: (
    id: String,
    source: String,
    intent: String,
    mutations_json: String,
    confidence: Double,
    requires_approval: Long,
    patient_scope: String,
    occurred_at: Long,
    processed_at: Long,
    suppress_active: Long,
    cascade_depth: Long,
  ) -> T): Query<T> = SelectNonSuppressedQuery(value) { cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getString(1)!!,
      cursor.getString(2)!!,
      cursor.getString(3)!!,
      cursor.getDouble(4)!!,
      cursor.getLong(5)!!,
      cursor.getString(6)!!,
      cursor.getLong(7)!!,
      cursor.getLong(8)!!,
      cursor.getLong(9)!!,
      cursor.getLong(10)!!
    )
  }

  public fun selectNonSuppressed(value_: Long): Query<Spine_event_store> =
      selectNonSuppressed(value_) { id, source, intent, mutations_json, confidence,
      requires_approval, patient_scope, occurred_at, processed_at, suppress_active, cascade_depth ->
    Spine_event_store(
      id,
      source,
      intent,
      mutations_json,
      confidence,
      requires_approval,
      patient_scope,
      occurred_at,
      processed_at,
      suppress_active,
      cascade_depth
    )
  }

  public fun insertEvent(
    id: String,
    source: String,
    intent: String,
    mutations_json: String,
    confidence: Double,
    requires_approval: Long,
    patient_scope: String,
    occurred_at: Long,
    processed_at: Long,
    suppress_active: Long,
    cascade_depth: Long,
  ) {
    driver.execute(1_695_268_138, """
        |INSERT OR IGNORE INTO spine_event_store(id, source, intent, mutations_json, confidence, requires_approval, patient_scope, occurred_at, processed_at, suppress_active, cascade_depth)
        |VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """.trimMargin(), 11) {
          bindString(0, id)
          bindString(1, source)
          bindString(2, intent)
          bindString(3, mutations_json)
          bindDouble(4, confidence)
          bindLong(5, requires_approval)
          bindString(6, patient_scope)
          bindLong(7, occurred_at)
          bindLong(8, processed_at)
          bindLong(9, suppress_active)
          bindLong(10, cascade_depth)
        }
    notifyQueries(1_695_268_138) { emit ->
      emit("spine_event_store")
    }
  }

  private inner class SelectRecentEventsQuery<out T : Any>(
    public val `value`: Long,
    mapper: (SqlCursor) -> T,
  ) : Query<T>(mapper) {
    override fun addListener(listener: Query.Listener) {
      driver.addListener("spine_event_store", listener = listener)
    }

    override fun removeListener(listener: Query.Listener) {
      driver.removeListener("spine_event_store", listener = listener)
    }

    override fun <R> execute(mapper: (SqlCursor) -> QueryResult<R>): QueryResult<R> =
        driver.executeQuery(163_085_447,
        """SELECT spine_event_store.id, spine_event_store.source, spine_event_store.intent, spine_event_store.mutations_json, spine_event_store.confidence, spine_event_store.requires_approval, spine_event_store.patient_scope, spine_event_store.occurred_at, spine_event_store.processed_at, spine_event_store.suppress_active, spine_event_store.cascade_depth FROM spine_event_store ORDER BY processed_at DESC LIMIT ?""",
        mapper, 1) {
      bindLong(0, value)
    }

    override fun toString(): String = "SpineEventStore.sq:selectRecentEvents"
  }

  private inner class SelectBySourceQuery<out T : Any>(
    public val source: String,
    public val `value`: Long,
    mapper: (SqlCursor) -> T,
  ) : Query<T>(mapper) {
    override fun addListener(listener: Query.Listener) {
      driver.addListener("spine_event_store", listener = listener)
    }

    override fun removeListener(listener: Query.Listener) {
      driver.removeListener("spine_event_store", listener = listener)
    }

    override fun <R> execute(mapper: (SqlCursor) -> QueryResult<R>): QueryResult<R> =
        driver.executeQuery(56_618_501,
        """SELECT spine_event_store.id, spine_event_store.source, spine_event_store.intent, spine_event_store.mutations_json, spine_event_store.confidence, spine_event_store.requires_approval, spine_event_store.patient_scope, spine_event_store.occurred_at, spine_event_store.processed_at, spine_event_store.suppress_active, spine_event_store.cascade_depth FROM spine_event_store WHERE source = ? ORDER BY processed_at DESC LIMIT ?""",
        mapper, 2) {
      bindString(0, source)
      bindLong(1, value)
    }

    override fun toString(): String = "SpineEventStore.sq:selectBySource"
  }

  private inner class SelectNonSuppressedQuery<out T : Any>(
    public val `value`: Long,
    mapper: (SqlCursor) -> T,
  ) : Query<T>(mapper) {
    override fun addListener(listener: Query.Listener) {
      driver.addListener("spine_event_store", listener = listener)
    }

    override fun removeListener(listener: Query.Listener) {
      driver.removeListener("spine_event_store", listener = listener)
    }

    override fun <R> execute(mapper: (SqlCursor) -> QueryResult<R>): QueryResult<R> =
        driver.executeQuery(1_125_798_382,
        """SELECT spine_event_store.id, spine_event_store.source, spine_event_store.intent, spine_event_store.mutations_json, spine_event_store.confidence, spine_event_store.requires_approval, spine_event_store.patient_scope, spine_event_store.occurred_at, spine_event_store.processed_at, spine_event_store.suppress_active, spine_event_store.cascade_depth FROM spine_event_store WHERE suppress_active = 0 ORDER BY processed_at DESC LIMIT ?""",
        mapper, 1) {
      bindLong(0, value)
    }

    override fun toString(): String = "SpineEventStore.sq:selectNonSuppressed"
  }
}
