package com.agnes.nexus.core.db

import app.cash.sqldelight.Query
import app.cash.sqldelight.TransacterImpl
import app.cash.sqldelight.db.QueryResult
import app.cash.sqldelight.db.SqlCursor
import app.cash.sqldelight.db.SqlDriver
import kotlin.Any
import kotlin.Long
import kotlin.String

public class ModuleSoulCacheQueries(
  driver: SqlDriver,
) : TransacterImpl(driver) {
  public fun <T : Any> selectModuleCache(
    user_id: String,
    module_id: String,
    mapper: (
      user_id: String,
      module_id: String,
      profile_json: String,
      updated_at: Long,
    ) -> T,
  ): Query<T> = SelectModuleCacheQuery(user_id, module_id) { cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getString(1)!!,
      cursor.getString(2)!!,
      cursor.getLong(3)!!
    )
  }

  public fun selectModuleCache(user_id: String, module_id: String): Query<Module_soul_cache> =
      selectModuleCache(user_id, module_id) { user_id_, module_id_, profile_json, updated_at ->
    Module_soul_cache(
      user_id_,
      module_id_,
      profile_json,
      updated_at
    )
  }

  public fun <T : Any> selectAllForUser(user_id: String, mapper: (
    user_id: String,
    module_id: String,
    profile_json: String,
    updated_at: Long,
  ) -> T): Query<T> = SelectAllForUserQuery(user_id) { cursor ->
    mapper(
      cursor.getString(0)!!,
      cursor.getString(1)!!,
      cursor.getString(2)!!,
      cursor.getLong(3)!!
    )
  }

  public fun selectAllForUser(user_id: String): Query<Module_soul_cache> =
      selectAllForUser(user_id) { user_id_, module_id, profile_json, updated_at ->
    Module_soul_cache(
      user_id_,
      module_id,
      profile_json,
      updated_at
    )
  }

  public fun upsertModuleCache(
    user_id: String,
    module_id: String,
    profile_json: String,
    updated_at: Long,
  ) {
    driver.execute(-883_355_817, """
        |INSERT OR REPLACE INTO module_soul_cache(user_id, module_id, profile_json, updated_at)
        |VALUES (?, ?, ?, ?)
        """.trimMargin(), 4) {
          bindString(0, user_id)
          bindString(1, module_id)
          bindString(2, profile_json)
          bindLong(3, updated_at)
        }
    notifyQueries(-883_355_817) { emit ->
      emit("module_soul_cache")
    }
  }

  public fun deleteModuleCache(user_id: String, module_id: String) {
    driver.execute(-1_284_883_109,
        """DELETE FROM module_soul_cache WHERE user_id = ? AND module_id = ?""", 2) {
          bindString(0, user_id)
          bindString(1, module_id)
        }
    notifyQueries(-1_284_883_109) { emit ->
      emit("module_soul_cache")
    }
  }

  private inner class SelectModuleCacheQuery<out T : Any>(
    public val user_id: String,
    public val module_id: String,
    mapper: (SqlCursor) -> T,
  ) : Query<T>(mapper) {
    override fun addListener(listener: Query.Listener) {
      driver.addListener("module_soul_cache", listener = listener)
    }

    override fun removeListener(listener: Query.Listener) {
      driver.removeListener("module_soul_cache", listener = listener)
    }

    override fun <R> execute(mapper: (SqlCursor) -> QueryResult<R>): QueryResult<R> =
        driver.executeQuery(169_050_474,
        """SELECT module_soul_cache.user_id, module_soul_cache.module_id, module_soul_cache.profile_json, module_soul_cache.updated_at FROM module_soul_cache WHERE user_id = ? AND module_id = ?""",
        mapper, 2) {
      bindString(0, user_id)
      bindString(1, module_id)
    }

    override fun toString(): String = "ModuleSoulCache.sq:selectModuleCache"
  }

  private inner class SelectAllForUserQuery<out T : Any>(
    public val user_id: String,
    mapper: (SqlCursor) -> T,
  ) : Query<T>(mapper) {
    override fun addListener(listener: Query.Listener) {
      driver.addListener("module_soul_cache", listener = listener)
    }

    override fun removeListener(listener: Query.Listener) {
      driver.removeListener("module_soul_cache", listener = listener)
    }

    override fun <R> execute(mapper: (SqlCursor) -> QueryResult<R>): QueryResult<R> =
        driver.executeQuery(-1_458_969_633,
        """SELECT module_soul_cache.user_id, module_soul_cache.module_id, module_soul_cache.profile_json, module_soul_cache.updated_at FROM module_soul_cache WHERE user_id = ?""",
        mapper, 1) {
      bindString(0, user_id)
    }

    override fun toString(): String = "ModuleSoulCache.sq:selectAllForUser"
  }
}
