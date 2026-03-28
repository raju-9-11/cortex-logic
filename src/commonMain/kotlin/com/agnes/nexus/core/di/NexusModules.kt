package com.agnes.nexus.core.di

/**
 * Aggregated list of all Nexus Koin modules.
 *
 * Convenience entry-point for platform-level Koin initialisation.
 * Platform modules should append their own bindings before passing to [startKoin]:
 *
 * ```kotlin
 * // Android
 * startKoin {
 *     modules(allNexusModules + nexusAndroidModule)
 * }
 *
 * // Web / JS
 * startKoin {
 *     modules(allNexusModules + nexusJsModule)
 * }
 * ```
 *
 * Modules are applied in list order; later modules may override earlier ones when
 * `single(override = true)` is used (e.g., providing a data-layer-aware SpineEventBus).
 */
val allNexusModules = listOf(
    nexusCoreModule
)
