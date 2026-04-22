package com.agnes.ara.core.engine

import com.agnes.ara.core.engine.personas.scout.ScoutSessionContextAssembler

@JsExport
class ScoutSessionContextAssemblerJs {
    private val inner = ScoutSessionContextAssembler()

    fun assembleFusedContext(
        nodesJson: String,
        webResultsJson: String,
        sessionTopic: String,
        userQuery: String,
    ): String = inner.assembleFusedContext(nodesJson, webResultsJson, sessionTopic, userQuery)

    fun computeCoverageScore(nodesJson: String): Double =
        inner.computeCoverageScore(nodesJson)

    fun isOffTopic(userQuery: String, sessionTopic: String): Boolean =
        inner.isOffTopic(userQuery, sessionTopic)
}
