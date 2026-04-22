package com.agnes.ara.core.di

import com.agnes.ara.core.domain.service.agnes.AgnesSessionLifecycleService
import com.agnes.ara.core.domain.service.agnes.BeliefGraphCompactionService
import com.agnes.ara.core.domain.service.agnes.BeliefTriggerEvaluator
import com.agnes.ara.core.domain.service.agnes.HalfLifeEngine
import com.agnes.ara.core.domain.service.atlas.AntiSnowplowService
import com.agnes.ara.core.domain.service.ledger.RunwayService
import com.agnes.ara.core.domain.service.scout.StatelessSearchSession
import com.agnes.ara.core.domain.service.soma.PatientFirewallService
import com.agnes.ara.core.domain.service.titan.ClearanceService
import com.agnes.ara.core.domain.services.DefaultSpineEventBus
import com.agnes.ara.core.domain.services.MasterThreadSpineEventBus
import com.agnes.ara.core.domain.services.SpineEventBus
import com.agnes.ara.core.engine.GlobalSoulStore
import com.agnes.ara.core.engine.orchestrator.AutopilotEnforcer
import com.agnes.ara.core.engine.orchestrator.MutationApplier
import com.agnes.ara.core.engine.orchestrator.OverridePenaltyEnforcer
import com.agnes.ara.core.engine.orchestrator.PrecedenceResolver
import org.koin.dsl.module

/**
 * Core Koin DI module — platform-agnostic bindings for the shared KMP module.
 *
 * Include this module when starting Koin on any platform (Android, Web).
 * Platform-specific bindings (SQLDelight drivers, Ktor engines, VaultKeyManager)
 * are provided by separate platform modules: nexusAndroidModule / nexusJsModule.
 *
 * Design notes:
 * - All services are registered as singletons: state is shared within a Koin scope.
 * - [DefaultSpineEventBus] is bound behind the [SpineEventBus] interface; platform
 *   modules may override with a data-layer-aware instance via `single(override = true)`.
 * - Orchestrator components (PrecedenceResolver, MutationApplier, AutopilotEnforcer)
 *   are stateful singletons; they maintain in-memory queues across the process lifetime.
 */
val nexusCoreModule = module {

    // ── Spine Engine ──────────────────────────────────────────────────────────
    // DefaultSpineEventBus accepts optional dataLayer, userId, and logger.
    // Platform modules inject those extras by overriding this binding when needed.
    single<SpineEventBus> { MasterThreadSpineEventBus(DefaultSpineEventBus()) }
    single { GlobalSoulStore() }

    // Orchestrator pipeline — order-independent; each is a pure in-memory component.
    single { PrecedenceResolver() }
    single { MutationApplier() }
    single { AutopilotEnforcer() }
    single { OverridePenaltyEnforcer(get(), get()) }

    // ── Domain Services ───────────────────────────────────────────────────────
    single { AgnesSessionLifecycleService(get()) }
    single { HalfLifeEngine() }
    single { BeliefGraphCompactionService() }
    single { BeliefTriggerEvaluator() }

    // AntiSnowplowService: araHandoffService is optional (null by default).
    // Bind AraHandoffService in a platform module to enable Scout delegation.
    single { AntiSnowplowService(get()) }

    single { RunwayService(get()) }
    single { PatientFirewallService(get()) }
    single { ClearanceService(get()) }
    single { StatelessSearchSession(get()) }
}
