package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.service.agnes.GravityCalculator
import kotlin.js.JsExport

/**
 * JS/TS facade for Agnes gravity scoring.
 * Wraps [GravityCalculator] with default weights (w1=0.6, w2=0.4).
 */
@JsExport
class AgnesGravityEngineJs {
    private val calculator = GravityCalculator()

    /**
     * Compute the gravity score G ∈ [0.0, 1.0] for a given text and sentiment.
     * G = w1·|S| + w2·K where K = keyword density against the default wound keyword set.
     *
     * @param text           Raw message text (used for keyword density).
     * @param sentimentScore Sentiment polarity ∈ [-1.0, 1.0]; abs() applied internally.
     * @return G ∈ [0.0, 1.0]; values > 0.8 indicate a gravity spike.
     */
    fun calculateGravity(text: String, sentimentScore: Double): Double =
        calculator.compute(text, sentimentScore.toFloat()).gravity.toDouble()
}
