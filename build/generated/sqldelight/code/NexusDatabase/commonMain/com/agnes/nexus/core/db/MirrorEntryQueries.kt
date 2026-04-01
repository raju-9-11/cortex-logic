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

public class MirrorEntryQueries(
  driver: SqlDriver,
) : TransacterImpl(driver) {
  public fun <T : Any> selectRecent(`value`: Long, mapper: (
    id: String,
    timestamp: Long,
    raw_content: String,
    extracted_tags: String?,
    attributed_entity_id: String?,
    bandwidth_delta: Double,
  ) -> T): Query<T> = SelectRecentQuery(value) { cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getLong(1)!!,
      cursor.getString(2)!!,
      cursor.getString(3),
      cursor.getString(4),
      cursor.getDouble(5)!!
    )
  }

  public fun selectRecent(value_: Long): Query<MirrorEntry> = selectRecent(value_) { id, timestamp,
      raw_content, extracted_tags, attributed_entity_id, bandwidth_delta ->
    MirrorEntry(
      id,
      timestamp,
      raw_content,
      extracted_tags,
      attributed_entity_id,
      bandwidth_delta
    )
  }

  public fun <T : Any> selectSince(timestamp: Long, mapper: (
    id: String,
    timestamp: Long,
    raw_content: String,
    extracted_tags: String?,
    attributed_entity_id: String?,
    bandwidth_delta: Double,
  ) -> T): Query<T> = SelectSinceQuery(timestamp) { cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getLong(1)!!,
      cursor.getString(2)!!,
      cursor.getString(3),
      cursor.getString(4),
      cursor.getDouble(5)!!
    )
  }

  public fun selectSince(timestamp: Long): Query<MirrorEntry> = selectSince(timestamp) { id,
      timestamp_, raw_content, extracted_tags, attributed_entity_id, bandwidth_delta ->
    MirrorEntry(
      id,
      timestamp_,
      raw_content,
      extracted_tags,
      attributed_entity_id,
      bandwidth_delta
    )
  }

  public fun <T : Any> selectUnattributed(mapper: (
    id: String,
    timestamp: Long,
    raw_content: String,
    extracted_tags: String?,
    attributed_entity_id: String?,
    bandwidth_delta: Double,
  ) -> T): Query<T> = Query(-137_713_315, arrayOf("MirrorEntry"), driver, "MirrorEntry.sq",
      "selectUnattributed",
      "SELECT MirrorEntry.id, MirrorEntry.timestamp, MirrorEntry.raw_content, MirrorEntry.extracted_tags, MirrorEntry.attributed_entity_id, MirrorEntry.bandwidth_delta FROM MirrorEntry WHERE attributed_entity_id IS NULL ORDER BY timestamp ASC") {
      cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getLong(1)!!,
      cursor.getString(2)!!,
      cursor.getString(3),
      cursor.getString(4),
      cursor.getDouble(5)!!
    )
  }

  public fun selectUnattributed(): Query<MirrorEntry> = selectUnattributed { id, timestamp,
      raw_content, extracted_tags, attributed_entity_id, bandwidth_delta ->
    MirrorEntry(
      id,
      timestamp,
      raw_content,
      extracted_tags,
      attributed_entity_id,
      bandwidth_delta
    )
  }

  public fun insertEntry(
    id: String,
    timestamp: Long,
    raw_content: String,
    extracted_tags: String?,
    attributed_entity_id: String?,
    bandwidth_delta: Double,
  ) {
    driver.execute(-804_616_295, """
        |INSERT INTO MirrorEntry(id, timestamp, raw_content, extracted_tags, attributed_entity_id, bandwidth_delta)
        |VALUES (?, ?, ?, ?, ?, ?)
        """.trimMargin(), 6) {
          bindString(0, id)
          bindLong(1, timestamp)
          bindString(2, raw_content)
          bindString(3, extracted_tags)
          bindString(4, attributed_entity_id)
          bindDouble(5, bandwidth_delta)
        }
    notifyQueries(-804_616_295) { emit ->
      emit("MirrorEntry")
    }
  }

  public fun updateExtraction(
    extracted_tags: String?,
    attributed_entity_id: String?,
    bandwidth_delta: Double,
    id: String,
  ) {
    driver.execute(1_466_426_160,
        """UPDATE MirrorEntry SET extracted_tags = ?, attributed_entity_id = ?, bandwidth_delta = ? WHERE id = ?""",
        4) {
          bindString(0, extracted_tags)
          bindString(1, attributed_entity_id)
          bindDouble(2, bandwidth_delta)
          bindString(3, id)
        }
    notifyQueries(1_466_426_160) { emit ->
      emit("MirrorEntry")
    }
  }

  private inner class SelectRecentQuery<out T : Any>(
    public val `value`: Long,
    mapper: (SqlCursor) -> T,
  ) : Query<T>(mapper) {
    override fun addListener(listener: Query.Listener) {
      driver.addListener("MirrorEntry", listener = listener)
    }

    override fun removeListener(listener: Query.Listener) {
      driver.removeListener("MirrorEntry", listener = listener)
    }

    override fun <R> execute(mapper: (SqlCursor) -> QueryResult<R>): QueryResult<R> =
        driver.executeQuery(-1_818_157_033,
        """SELECT MirrorEntry.id, MirrorEntry.timestamp, MirrorEntry.raw_content, MirrorEntry.extracted_tags, MirrorEntry.attributed_entity_id, MirrorEntry.bandwidth_delta FROM MirrorEntry ORDER BY timestamp DESC LIMIT ?""",
        mapper, 1) {
      bindLong(0, value)
    }

    override fun toString(): String = "MirrorEntry.sq:selectRecent"
  }

  private inner class SelectSinceQuery<out T : Any>(
    public val timestamp: Long,
    mapper: (SqlCursor) -> T,
  ) : Query<T>(mapper) {
    override fun addListener(listener: Query.Listener) {
      driver.addListener("MirrorEntry", listener = listener)
    }

    override fun removeListener(listener: Query.Listener) {
      driver.removeListener("MirrorEntry", listener = listener)
    }

    override fun <R> execute(mapper: (SqlCursor) -> QueryResult<R>): QueryResult<R> =
        driver.executeQuery(-473_239_042,
        """SELECT MirrorEntry.id, MirrorEntry.timestamp, MirrorEntry.raw_content, MirrorEntry.extracted_tags, MirrorEntry.attributed_entity_id, MirrorEntry.bandwidth_delta FROM MirrorEntry WHERE timestamp >= ? ORDER BY timestamp ASC""",
        mapper, 1) {
      bindLong(0, timestamp)
    }

    override fun toString(): String = "MirrorEntry.sq:selectSince"
  }
}
