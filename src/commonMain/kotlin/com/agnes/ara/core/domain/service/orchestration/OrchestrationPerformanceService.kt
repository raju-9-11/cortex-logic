package com.agnes.ara.core.domain.service.orchestration

import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

@Serializable
data class DomainMetrics(
    var cacheHits: Int = 0,
    var cacheMisses: Int = 0,
    var totalComputations: Int = 0,
    var totalDurationMs: Long = 0,
)

/**
 * In-memory performance metrics tracker for orchestration cache domains.
 */
object OrchestrationPerformanceService {

    private val metrics = mutableMapOf<String, DomainMetrics>()

    private fun ensure(domain: String): DomainMetrics =
        metrics.getOrPut(domain) { DomainMetrics() }

    fun recordCacheHit(domain: String) { ensure(domain).cacheHits += 1 }

    fun recordCacheMiss(domain: String) { ensure(domain).cacheMisses += 1 }

    fun recordComputation(domain: String, durationMs: Long) {
        val m = ensure(domain)
        m.totalComputations += 1
        m.totalDurationMs += durationMs
    }

    fun getMetrics(domain: String): DomainMetrics =
        ensure(domain).copy()

    fun getMetricsJson(domain: String): String =
        Json.encodeToString(getMetrics(domain))

    fun resetForTests() { metrics.clear() }
}
