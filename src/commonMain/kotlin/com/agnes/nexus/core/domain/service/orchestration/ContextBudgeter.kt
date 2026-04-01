package com.agnes.nexus.core.domain.service.orchestration

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlin.math.max
import kotlin.math.min
import kotlin.math.floor

/**
 * Budget-aware context composer. Allocates character budget across sections
 * (header, NSV block, insight lines, extension) and progressively trims
 * to fit within a total character limit.
 */
object ContextBudgeter {

    fun truncateText(value: String, maxChars: Int): String {
        if (value.length <= maxChars) return value
        if (maxChars <= 16) return value.substring(0, max(0, maxChars))
        return "${value.substring(0, maxChars - 12).trim()} [trimmed]"
    }

    /**
     * Compose a bounded context string from structured sections.
     * @param title Header title
     * @param identityLines Lines joined into the header
     * @param nsvBlock Optional NSV state block
     * @param insightLines Optional trend/insight lines (will be prefixed with "- ")
     * @param extensionBlock Optional additional context
     * @param maxChars Total character budget (minimum 400)
     * @param minNsvChars Minimum NSV allocation (minimum 120)
     */
    fun composeBoundedContext(
        title: String,
        identityLines: List<String>,
        nsvBlock: String? = null,
        insightLines: List<String>? = null,
        extensionBlock: String? = null,
        maxChars: Int = 2000,
        minNsvChars: Int = 320,
    ): String {
        val baseHeader = (listOf(title) + identityLines).joinToString("\n")
        val effectiveMaxChars = max(400, maxChars)
        val effectiveMinNsvChars = max(120, minNsvChars)

        var remaining = effectiveMaxChars - baseHeader.length - 2
        if (remaining <= 0) return truncateText(baseHeader, effectiveMaxChars)

        var nsv = nsvBlock?.trim()?.takeIf { it.isNotEmpty() } ?: ""
        var insights = (insightLines ?: emptyList())
            .filter { it.isNotBlank() }
            .map { it.trim() }
        var extension = extensionBlock?.trim()?.takeIf { it.isNotEmpty() } ?: ""

        // Clamp individual segments
        if (nsv.isNotEmpty()) {
            nsv = truncateText(nsv, min(remaining, max(effectiveMinNsvChars, floor(effectiveMaxChars * 0.45).toInt())))
        }
        if (extension.isNotEmpty()) {
            extension = truncateText(extension, min(floor(effectiveMaxChars * 0.25).toInt(), 700))
        }
        insights = insights.map { truncateText(it, 220) }

        fun buildSection(): String {
            val parts = mutableListOf(baseHeader)
            if (nsv.isNotEmpty()) parts.add(nsv)
            if (insights.isNotEmpty()) {
                parts.add("ACTIVE TRENDS:\n${insights.joinToString("\n") { "- $it" }}")
            }
            if (extension.isNotEmpty()) parts.add(extension)
            return parts.joinToString("\n")
        }

        var output = buildSection()
        while (output.length > effectiveMaxChars) {
            if (insights.isNotEmpty()) {
                insights = insights.dropLast(1)
                output = buildSection()
                continue
            }
            if (extension.isNotEmpty()) {
                extension = truncateText(extension, max(0, extension.length - 120))
                output = buildSection()
                continue
            }
            if (nsv.length > effectiveMinNsvChars) {
                nsv = truncateText(nsv, max(effectiveMinNsvChars, nsv.length - 180))
                output = buildSection()
                continue
            }
            output = truncateText(output, effectiveMaxChars)
            break
        }

        return output
    }
}
