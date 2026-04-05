package com.agnes.nexus.core.engine

import kotlinx.coroutines.Job

/**
 * JS-exportable handle that wraps a Kotlin [Job] so TypeScript callers can
 * cancel an in-flight KMP coroutine.
 *
 * Kotlin's [Job] interface is not `@JsExport`-able (it carries generic
 * super-types and extension functions that the IR backend cannot emit).
 * This thin wrapper exposes only the surface area that the TypeScript bridge
 * layer needs: [cancel], [isActive], and [isCancelled].
 *
 * ## Usage from TypeScript
 * ```ts
 * const task: CancellableTask = kmpEngine.chatWithContext(...)
 * signal.addEventListener('abort', () => task.cancel())
 * ```
 *
 * ## Cancellation semantics
 * Calling [cancel] triggers cooperative cancellation of the underlying
 * coroutine.  For streaming methods this means:
 * - The Ktor `ByteReadChannel` read loop checks for cancellation between
 *   each SSE line and exits early.
 * - The Flow collector (`engine.chat(...).collect`) is cancelled.
 * - The `catch (CancellationException)` block in the bridge method silently
 *   absorbs the exception — the TypeScript-side `onError` callback is NOT
 *   invoked, because the caller already knows it cancelled.
 */
@JsExport
class CancellableTask internal constructor(private val job: Job) {

    /** Whether the coroutine is still running. */
    val isActive: Boolean get() = job.isActive

    /** Whether the coroutine was cancelled (either by [cancel] or by scope teardown). */
    val isCancelled: Boolean get() = job.isCancelled

    /** Whether the coroutine has completed (successfully or exceptionally). */
    val isCompleted: Boolean get() = job.isCompleted

    /**
     * Request cooperative cancellation of the coroutine.
     *
     * Safe to call multiple times — subsequent calls are no-ops.
     * Safe to call after the coroutine has already completed — also a no-op.
     */
    fun cancel() {
        job.cancel()
    }
}
