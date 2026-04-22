package com.agnes.ara.core.engine.personas.agnes

import com.agnes.ara.core.domain.model.AgnesSessionMode
import kotlin.js.JsExport

/**
 * JS-exported facade for AgnesEngagementModes.
 * Ported from web engagement-modes.ts for single-source-of-truth logic.
 */
@JsExport
class AraEngagementModesJs {
    val casual: String = AgnesEngagementModes.casual
    val deep: String = AgnesEngagementModes.deep
    val impromptu: String = AgnesEngagementModes.impromptu
    val somatic: String = AgnesEngagementModes.somatic

    /**
     * Resolve a prompt block for a given mode name.
     * @param mode Case-insensitive mode name (casual, deep, impromptu, somatic).
     */
    fun promptBlockFor(mode: String): String {
        return try {
            val sessionMode = AgnesSessionMode.valueOf(mode.uppercase())
            AgnesEngagementModes.promptBlockFor(sessionMode)
        } catch (e: Exception) {
            AgnesEngagementModes.casual
        }
    }
}
