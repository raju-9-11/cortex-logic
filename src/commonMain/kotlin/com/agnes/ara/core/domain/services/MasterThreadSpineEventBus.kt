package com.agnes.ara.core.domain.services

import com.agnes.ara.core.domain.model.AutopilotLevel
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock

/**
 * Serializes top-level Spine emissions through a single logical "Master Thread".
 *
 * This preserves the existing [DefaultSpineEventBus] pipeline while making
 * cross-agent emit calls enter that pipeline one-at-a-time. It is intentionally
 * conservative: broadcast, cascade, and internal side-effects still execute in
 * the delegate, but external callers no longer race each other into the gate
 * stack at the top boundary.
 */
class MasterThreadSpineEventBus(
    private val delegate: SpineEventBus
) : AutopilotAwareSpineEventBus {

    private val emitMutex = Mutex()

    override fun on(type: String, minPriority: String?) =
        delegate.on(type, minPriority)

    override suspend fun emit(event: SpineEvent) {
        emitMutex.withLock {
            delegate.emit(event)
        }
    }

    override suspend fun emit(payload: SpineEventPayload): SpineEvent =
        emitMutex.withLock {
            delegate.emit(payload)
        }

    override fun registerCascadeRules(rules: List<CascadeRule>) {
        delegate.registerCascadeRules(rules)
    }

    override fun getRecentEvents(filter: SpineEventFilter?) =
        delegate.getRecentEvents(filter)

    override var currentAutopilotLevel: AutopilotLevel
        get() = (delegate as? AutopilotAwareSpineEventBus)?.currentAutopilotLevel
            ?: AutopilotLevel.MANUAL
        set(value) {
            (delegate as? AutopilotAwareSpineEventBus)?.currentAutopilotLevel = value
        }

    override val autopilotLevel: Flow<AutopilotLevel>
        get() = (delegate as? AutopilotAwareSpineEventBus)?.autopilotLevel
            ?: flowOf(AutopilotLevel.MANUAL)
}
