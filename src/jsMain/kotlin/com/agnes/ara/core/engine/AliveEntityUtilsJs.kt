package com.agnes.ara.core.engine

import kotlinx.serialization.json.*

/**
 * AliveEntityUtilsJs — ports the pure-computation parts of alive-entity-service.ts to KMP.
 *
 * Migrated functions:
 *  - normalizeAliveEntity         → normalize(entityJson)
 *  - dedupeAliveEntities          → dedupeAndSort(entitiesJson)
 *  - buildAliveEntityRuntimeContext → buildRuntimeContext(entitiesJson, moduleFilterJson, limitPerModule)
 *
 * NOT migrated (domain-specific type mappers; stay in TypeScript):
 *  - adaptAtlasGoalToAliveEntity, adaptAtlasHabitToAliveEntity, etc.
 *  - Firebase CRUD helpers (upsertAliveEntity, listAliveEntities, syncAliveEntities)
 */
@JsExport
class AliveEntityUtilsJs {

  private val PROVENANCE_PRIORITY = mapOf("native" to 3, "adapter" to 2, "bootstrap" to 1)

  // ─── normalize ───────────────────────────────────────────────────────────────

  /**
   * Normalises an AliveEntity or AliveEntitySeed:
   *  - trims label
   *  - normalises semantic_tags (lowercase, dedup, sort)
   *  - defaults attributes and soul_impact_preset to {}
   *  - defaults createdAt / updatedAt to current ISO timestamp
   */
  fun normalize(entityJson: String): String {
    val nowIso = js("new Date().toISOString()") as String
    return normalizeObj(Json.parseToJsonElement(entityJson).jsonObject, nowIso).toString()
  }

  private fun normalizeObj(obj: JsonObject, nowIso: String): JsonObject {
    val label = obj["label"]?.jsonPrimitive?.contentOrNull?.trim() ?: ""
    val tagsRaw = obj["semantic_tags"]?.jsonArray
      ?.mapNotNull { it.jsonPrimitive.contentOrNull } ?: emptyList()
    val tags = tagsRaw.map { it.trim().lowercase() }.filter { it.isNotEmpty() }.distinct().sorted()
    val createdAt = obj["createdAt"]?.let { if (it is JsonNull) null else it.jsonPrimitive.contentOrNull } ?: nowIso
    val updatedAt = obj["updatedAt"]?.let { if (it is JsonNull) null else it.jsonPrimitive.contentOrNull } ?: nowIso

    return buildJsonObject {
      for ((k, v) in obj) {
        when (k) {
          "label" -> put("label", label)
          "semantic_tags" -> put("semantic_tags", buildJsonArray { tags.forEach { add(JsonPrimitive(it)) } })
          "attributes" -> put("attributes", if (v is JsonNull) buildJsonObject {} else v)
          "soul_impact_preset" -> put("soul_impact_preset", if (v is JsonNull) buildJsonObject {} else v)
          "createdAt" -> {} // handled below
          "updatedAt" -> {} // handled below
          else -> put(k, v)
        }
      }
      if (!obj.containsKey("attributes")) put("attributes", buildJsonObject {})
      if (!obj.containsKey("soul_impact_preset")) put("soul_impact_preset", buildJsonObject {})
      put("createdAt", JsonPrimitive(createdAt))
      put("updatedAt", JsonPrimitive(updatedAt))
    }
  }

  // ─── dedupeAndSort ───────────────────────────────────────────────────────────

  /**
   * De-duplicates entities by id (provenance priority wins ties) then sorts by updatedAt descending.
   */
  fun dedupeAndSort(entitiesJson: String): String {
    val nowIso = js("new Date().toISOString()") as String
    val entities = Json.parseToJsonElement(entitiesJson).jsonArray
    val deduped = mutableMapOf<String, JsonObject>()

    for (elem in entities) {
      val normalized = normalizeObj(elem.jsonObject, nowIso)
      val id = normalized["id"]?.jsonPrimitive?.contentOrNull ?: continue
      val existing = deduped[id]
      if (existing == null || comparePreference(normalized, existing) >= 0) {
        deduped[id] = normalized
      }
    }

    val sorted = deduped.values.sortedByDescending {
      it["updatedAt"]?.jsonPrimitive?.contentOrNull ?: ""
    }
    return buildJsonArray { sorted.forEach { add(it) } }.toString()
  }

  private fun comparePreference(a: JsonObject, b: JsonObject): Int {
    val pa = PROVENANCE_PRIORITY[a["provenance"]?.jsonPrimitive?.contentOrNull] ?: 0
    val pb = PROVENANCE_PRIORITY[b["provenance"]?.jsonPrimitive?.contentOrNull] ?: 0
    if (pa != pb) return pa - pb
    val ua = a["updatedAt"]?.jsonPrimitive?.contentOrNull ?: ""
    val ub = b["updatedAt"]?.jsonPrimitive?.contentOrNull ?: ""
    val u = ua.compareTo(ub)
    if (u != 0) return u
    val ca = a["createdAt"]?.jsonPrimitive?.contentOrNull ?: ""
    val cb = b["createdAt"]?.jsonPrimitive?.contentOrNull ?: ""
    val c = ca.compareTo(cb)
    if (c != 0) return c
    return (a["label"]?.jsonPrimitive?.contentOrNull ?: "")
      .compareTo(b["label"]?.jsonPrimitive?.contentOrNull ?: "")
  }

  // ─── buildRuntimeContext ─────────────────────────────────────────────────────

  /**
   * Deduplicates entities, applies an optional module filter, groups by sourceModule
   * (up to [limitPerModule] per module), and collects all semantic tags.
   *
   * @param entitiesJson    JSON array of AliveEntitySeed / AliveEntity objects.
   * @param moduleFilterJson JSON array of ModuleId strings, or "null" for no filter.
   * @param limitPerModule  Max entities per module bucket (default 3 if ≤ 0).
   */
  fun buildRuntimeContext(entitiesJson: String, moduleFilterJson: String, limitPerModule: Int): String {
    val limit = if (limitPerModule > 0) limitPerModule else 3
    val sorted = Json.parseToJsonElement(dedupeAndSort(entitiesJson)).jsonArray

    val moduleFilter: Set<String>? = if (moduleFilterJson == "null") null else {
      Json.parseToJsonElement(moduleFilterJson).jsonArray
        .mapNotNull { it.jsonPrimitive.contentOrNull }.toSet()
    }

    val filtered = if (moduleFilter != null) {
      sorted.filter { moduleFilter.contains(it.jsonObject["sourceModule"]?.jsonPrimitive?.contentOrNull) }
    } else {
      sorted.toList()
    }

    val byModule = mutableMapOf<String, MutableList<JsonObject>>()
    val tagSet = mutableSetOf<String>()

    for (entity in filtered) {
      val obj = entity.jsonObject
      val module = obj["sourceModule"]?.jsonPrimitive?.contentOrNull ?: continue
      obj["semantic_tags"]?.jsonArray?.forEach { tag ->
        tag.jsonPrimitive.contentOrNull?.let { tagSet.add(it) }
      }
      val bucket = byModule.getOrPut(module) { mutableListOf() }
      if (bucket.size < limit) {
        bucket.add(buildJsonObject {
          put("id", obj["id"] ?: JsonPrimitive(""))
          put("label", obj["label"] ?: JsonPrimitive(""))
          put("type", obj["type"] ?: JsonPrimitive(""))
          put("sourceModule", JsonPrimitive(module))
          put("sourceEntityId", obj["sourceEntityId"] ?: JsonNull)
          put("provenance", obj["provenance"] ?: JsonPrimitive("bootstrap"))
          put("semantic_tags", obj["semantic_tags"] ?: buildJsonArray {})
          put("updatedAt", obj["updatedAt"] ?: JsonPrimitive(""))
        })
      }
    }

    val byModuleJson = buildJsonObject {
      for ((mod, bucket) in byModule) {
        put(mod, buildJsonArray { bucket.forEach { add(it) } })
      }
    }

    val lastUpdated = filtered.firstOrNull()?.jsonObject?.get("updatedAt")?.jsonPrimitive?.contentOrNull

    return buildJsonObject {
      put("total", filtered.size)
      put("moduleIds", buildJsonArray { byModule.keys.forEach { add(JsonPrimitive(it)) } })
      put("byModule", byModuleJson)
      put("tags", buildJsonArray { tagSet.sorted().forEach { add(JsonPrimitive(it)) } })
      put("lastUpdatedAt", lastUpdated?.let { JsonPrimitive(it) } ?: JsonNull)
    }.toString()
  }
}
