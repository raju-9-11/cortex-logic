package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.services.NotificationContentResolver
import kotlinx.serialization.json.*
import kotlin.js.JsExport

/**
 * JS-safe adapter for [NotificationContentResolver].
 *
 * Accepts and returns JSON strings because `Map<String, Any?>` and data classes
 * with generic fields cannot cross the Kotlin/JS IR boundary directly.
 */
@JsExport
class NotificationContentResolverJs {

    /**
     * Resolve notification content for a Spine event.
     *
     * @param eventType The Spine event type (e.g. `"BURNOUT_WARNING"`).
     * @param dataJson  JSON-encoded data map (e.g. `{"reason":"high_fatigue_low_resilience"}`).
     * @return JSON string `{"title":"...","body":"..."}`, or `null` if the event
     *         type is not a user-facing notification type.
     */
    fun resolve(eventType: String, dataJson: String): String? {
        val data: Map<String, Any?> = try {
            val obj = Json.parseToJsonElement(dataJson).jsonObject
            obj.mapValues { (_, v) ->
                when {
                    v is JsonNull -> null
                    v is JsonPrimitive && v.isString -> v.content
                    v is JsonPrimitive -> v.doubleOrNull ?: v.longOrNull ?: v.booleanOrNull ?: v.content
                    else -> v.toString()
                }
            }
        } catch (_: Exception) {
            emptyMap()
        }

        val content = NotificationContentResolver.resolve(eventType, data) ?: return null

        return buildJsonObject {
            put("title", content.title)
            put("body", content.body)
        }.toString()
    }
}
