package com.agnes.nexus.core.domain.services

import kotlinx.coroutines.delay
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.datetime.Clock

/**
 * NSV Update Queue — coroutine-based retry mechanism for Neural State Vector updates.
 *
 * NSV writes can race when multiple modules write simultaneously (e.g. a workout
 * completion triggers both Titan and Soma updates). This queue serializes writes
 * with exponential backoff so transient failures are retried without blocking UI.
 *
 * ## Safety-critical flows
 * Do NOT use this queue for flows that require committed state before proceeding
 * (e.g. `self_clearance_check`). Those must `await` the projection service directly.
 *
 * ## Usage
 * ```kotlin
 * val queue = NsvUpdateQueue { userId, patch -> projectionService.update(userId, patch) }
 * queue.enqueue(userId, patch, source = "titan.workout_complete")
 * ```
 *
 * Ported from agnes TypeScript `nsv-update-queue.ts`.
 */
class NsvUpdateQueue(
    private val executor: suspend (userId: String, patch: Map<String, Any?>) -> Unit
) {
    companion object {
        const val MAX_ATTEMPTS = 3
        const val STALE_THRESHOLD_MS = 5L * 60L * 1000L     // 5 minutes
        val BACKOFF_DELAYS_MS = longArrayOf(2_000L, 4_000L, 8_000L)
    }

    private data class QueuedUpdate(
        val userId: String,
        val patch: Map<String, Any?>,
        var attempts: Int = 0,
        val createdAt: Long = Clock.System.now().toEpochMilliseconds(),
        val source: String? = null
    )

    private val queue = ArrayDeque<QueuedUpdate>()
    private val mutex = Mutex()
    private var isProcessing = false

    /**
     * Enqueue an NSV patch for eventual application.
     *
     * @param userId  User identifier.
     * @param patch   Partial NSV update as a flat or nested map.
     * @param source  Optional caller tag for diagnostics.
     */
    suspend fun enqueue(userId: String, patch: Map<String, Any?>, source: String? = null) {
        if (userId.isBlank()) return
        if (patch.isEmpty()) return

        mutex.withLock {
            queue.addLast(QueuedUpdate(userId = userId, patch = patch, source = source))
        }
        processQueue()
    }

    /** Returns current queue depth (useful for monitoring). */
    suspend fun queueLength(): Int = mutex.withLock { queue.size }

    /**
     * Drain all queued updates immediately, bypassing any scheduled delay.
     * Useful before navigation or process teardown.
     */
    suspend fun flush() = processQueue()

    // ── Internal ─────────────────────────────────────────────────────────────

    private suspend fun processQueue() {
        mutex.withLock {
            if (isProcessing) return
            isProcessing = true
        }

        try {
            while (true) {
                val update = mutex.withLock { queue.firstOrNull() } ?: break

                // Discard stale updates
                val age = Clock.System.now().toEpochMilliseconds() - update.createdAt
                if (age > STALE_THRESHOLD_MS) {
                    mutex.withLock { queue.removeFirst() }
                    continue
                }

                try {
                    executor(update.userId, update.patch)
                    mutex.withLock { queue.removeFirst() }
                } catch (e: Exception) {
                    mutex.withLock { update.attempts++ }

                    if (update.attempts >= MAX_ATTEMPTS) {
                        mutex.withLock { queue.removeFirst() }
                    } else {
                        val delayMs = BACKOFF_DELAYS_MS.getOrElse(update.attempts - 1) {
                            BACKOFF_DELAYS_MS.last()
                        }
                        delay(delayMs)
                    }
                }
            }
        } finally {
            mutex.withLock { isProcessing = false }
        }
    }
}
