package com.agnes.ara.core.domain.service.scout

import com.agnes.ara.core.domain.services.SpineEventBus
import com.agnes.ara.core.domain.services.SpineEventPayload
import com.agnes.ara.core.domain.services.SpinePatientScope
import kotlinx.datetime.Clock

/**
 * Scout Stateless Search Session.
 *
 * Scout is a stateless utility tool — it bypasses KMP state entirely.
 * No GlobalSoul reads, no GlobalSoul mutations.
 * Returns compiled markdown documents to the Vault.
 * Can be triggered by Atlas delegation (AntiSnowplow) or direct user request.
 *
 * All Scout Spine events carry patientScope = GUEST equivalent (no soul mutation).
 */
class StatelessSearchSession(
    private val eventBus: SpineEventBus
) {
    /**
     * Begin a stateless search session for the given query.
     * Emits a SCOUT_SEARCH_STARTED event with no soul mutations.
     *
     * @param query           The search query string
     * @param sourceModuleId  Module that triggered the search (default: "user")
     * @param sessionId       Unique session identifier (auto-generated if not provided)
     * @return                The session ID for use in [completeSearch]
     */
    suspend fun beginSearch(
        query: String,
        sourceModuleId: String = "user",
        sessionId: String = "scout_${Clock.System.now().toEpochMilliseconds()}"
    ): String {
        eventBus.emit(SpineEventPayload(
            type = "SCOUT_SEARCH_STARTED",
            source = "scout",
            priority = "info",
            patientScope = SpinePatientScope.GUEST, // No soul mutation — stateless by design
            mutations = emptyList(),                // Enforce zero GlobalSoul mutation
            data = mapOf(
                "sessionId"    to sessionId,
                "query"        to query,
                "sourceModule" to sourceModuleId,
                "stateless"    to true
            )
        ).toSpineEvent())
        return sessionId
    }

    /**
     * Complete a search session and deliver compiled results to the Vault.
     *
     * @param sessionId      Session ID returned by [beginSearch]
     * @param query          The original search query
     * @param resultMarkdown Compiled markdown document to be stored in the Vault
     * @param sourceCount    Number of sources consulted
     */
    suspend fun completeSearch(
        sessionId: String,
        query: String,
        resultMarkdown: String,
        sourceCount: Int
    ) {
        eventBus.emit(SpineEventPayload(
            type = "SCOUT_SEARCH_COMPLETED",
            source = "scout",
            priority = "info",
            patientScope = SpinePatientScope.GUEST,
            mutations = emptyList(),
            data = mapOf(
                "sessionId"   to sessionId,
                "query"       to query,
                "sourceCount" to sourceCount,
                "vaultRef"    to "scout/results/$sessionId.md",
                "note"        to "Results compiled to Vault. No GlobalSoul state modified."
            )
        ).toSpineEvent())
    }
}
