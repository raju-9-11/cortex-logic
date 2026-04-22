package com.agnes.ara.core.domain.services

import kotlinx.datetime.Clock

/**
 * Lightweight logger to mirror web AraLogger behavior.
 * Android can bind or ignore.
 */
object AraLogger {
    private const val MAX_ERRORS = 100
    private const val MAX_ACTIONS = 200
    private const val MAX_SPINE = 200
    private const val MAX_EVENTS = 500

    enum class Category {
        action,
        spine,
        warn,
        error,
        profile,
        upload,
        handoff,
        vault,
        ai
    }

    data class LogEvent(
        val category: String,
        val label: String,
        val moduleId: String? = null,
        val detail: Map<String, Any?> = emptyMap(),
        val timestamp: Long = Clock.System.now().toEpochMilliseconds()
    )

    data class CapturedAction(
        val moduleId: String,
        val type: String,
        val payload: Map<String, Any?>,
        val timestamp: Long = Clock.System.now().toEpochMilliseconds()
    )

    data class CapturedSpineEvent(
        val eventType: String,
        val source: String,
        val data: Map<String, Any?>,
        val timestamp: Long = Clock.System.now().toEpochMilliseconds()
    )

    data class CapturedError(
        val tag: String,
        val message: String,
        val timestamp: Long = Clock.System.now().toEpochMilliseconds()
    )

    private val sinks = mutableSetOf<(LogEvent) -> Unit>()
    private val subscribers = mutableMapOf<Category, MutableSet<(LogEvent) -> Unit>>()
    private val anySubscribers = mutableSetOf<(LogEvent) -> Unit>()
    private val actions = mutableListOf<CapturedAction>()
    private val spineEvents = mutableListOf<CapturedSpineEvent>()
    private val errors = mutableListOf<CapturedError>()
    private val events = mutableListOf<LogEvent>()
    private var debugMode: Boolean = false

    fun registerSink(sink: (LogEvent) -> Unit) {
        sinks.add(sink)
    }

    fun unregisterSink(sink: (LogEvent) -> Unit) {
        sinks.remove(sink)
    }

    fun setDebugMode(enabled: Boolean) {
        debugMode = enabled
    }

    fun isEnabled(): Boolean = debugMode

    fun subscribe(category: Category, sink: (LogEvent) -> Unit): () -> Unit {
        val bucket = subscribers.getOrPut(category) { mutableSetOf() }
        bucket.add(sink)
        return { bucket.remove(sink) }
    }

    fun subscribeAll(sink: (LogEvent) -> Unit): () -> Unit {
        anySubscribers.add(sink)
        return { anySubscribers.remove(sink) }
    }

    fun emit(category: Category, label: String, moduleId: String? = null, detail: Map<String, Any?> = emptyMap()) {
        emit(
            LogEvent(
                category = category.name,
                label = label,
                moduleId = moduleId,
                detail = detail
            )
        )
    }

    private fun emit(event: LogEvent) {
        events.add(event)
        if (events.size > MAX_EVENTS) events.removeAt(0)
        sinks.forEach { sink -> sink(event) }
        runCatching {
            Category.valueOf(event.category)
        }.getOrNull()?.let { category ->
            subscribers[category]?.forEach { sink -> sink(event) }
        }
        anySubscribers.forEach { sink -> sink(event) }
    }

    fun spine(eventType: String, source: String, data: Map<String, Any?>) {
        spineEvents.add(
            CapturedSpineEvent(
                eventType = eventType,
                source = source,
                data = data
            )
        )
        spineEvents.trimTo(MAX_SPINE)
        emit(
            LogEvent(
                category = "spine",
                label = eventType,
                moduleId = source,
                detail = data
            )
        )
    }

    fun action(moduleId: String, actionType: String, payload: Map<String, Any?>) {
        actions.add(
            CapturedAction(
                moduleId = moduleId,
                type = actionType,
                payload = payload
            )
        )
        actions.trimTo(MAX_ACTIONS)
        emit(
            LogEvent(
                category = "action",
                label = actionType,
                moduleId = moduleId,
                detail = payload
            )
        )
    }

    fun warn(tag: String, message: String) {
        if (debugMode) {
            println("[AraLogger][$tag] $message")
        }
        emit(
            LogEvent(
                category = "warn",
                label = "[$tag] $message"
            )
        )
    }

    fun error(tag: String, throwable: Throwable?) {
        val message = throwable?.message ?: "Unknown error"
        errors.add(CapturedError(tag = tag, message = message))
        errors.trimTo(MAX_ERRORS)
        emit(
            LogEvent(
                category = "error",
                label = "[$tag] $message",
                detail = mapOf(
                    "stack" to throwable?.toString()
                )
            )
        )
    }

    fun getRecentEvents(limit: Int = 100): List<LogEvent> = events.takeLast(limit.coerceAtLeast(0))

    fun getRecentActions(limit: Int = 50): List<CapturedAction> = actions.takeLast(limit.coerceAtLeast(0))

    fun getRecentSpineEvents(limit: Int = 50): List<CapturedSpineEvent> = spineEvents.takeLast(limit.coerceAtLeast(0))

    fun getRecentErrors(limit: Int = 20): List<CapturedError> = errors.takeLast(limit.coerceAtLeast(0))

    private fun <T> MutableList<T>.trimTo(maxSize: Int) {
        while (size > maxSize) removeAt(0)
    }
}
