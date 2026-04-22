package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.model.AgnesSessionMode
import com.agnes.ara.core.domain.service.agnes.AgnesSessionArc
import com.agnes.ara.core.domain.service.agnes.SessionProgressState
import kotlinx.serialization.json.Json
import kotlin.js.JsExport

@JsExport
class SessionArcJs {
    private val json = Json { ignoreUnknownKeys = true }

    fun computeSessionProgressJson(
        exchangeCount: Int,
        sessionStartedAtMs: Double,
        mode: String,
        nowMs: Double,
    ): String {
        val normalizedMode = when (mode.lowercase()) {
            "impromptu" -> AgnesSessionMode.IMPROMPTU
            "casual" -> AgnesSessionMode.CASUAL
            "somatic" -> AgnesSessionMode.SOMATIC
            "deep" -> AgnesSessionMode.DEEP
            else -> AgnesSessionMode.CASUAL
        }
        val progress = AgnesSessionArc.computeProgress(
            exchangeCount = exchangeCount,
            sessionStartedAt = sessionStartedAtMs.toLong(),
            mode = normalizedMode,
        )
        return json.encodeToString(SessionProgressState.serializer(), progress)
    }

    fun buildSessionProgressBlock(progressJson: String, mode: String): String? =
        AgnesSessionArc.buildProgressBlock(
            progress = json.decodeFromString(SessionProgressState.serializer(), progressJson),
            mode = when (mode.lowercase()) {
                "impromptu" -> AgnesSessionMode.IMPROMPTU
                "casual" -> AgnesSessionMode.CASUAL
                "somatic" -> AgnesSessionMode.SOMATIC
                "deep" -> AgnesSessionMode.DEEP
                else -> AgnesSessionMode.CASUAL
            }
        )

    fun getSessionExchangeTarget(mode: String): Int =
        AgnesSessionArc.exchangeTargets[
            when (mode.lowercase()) {
                "impromptu" -> AgnesSessionMode.IMPROMPTU
                "casual" -> AgnesSessionMode.CASUAL
                "somatic" -> AgnesSessionMode.SOMATIC
                "deep" -> AgnesSessionMode.DEEP
                else -> AgnesSessionMode.CASUAL
            }
        ] ?: 14
}
