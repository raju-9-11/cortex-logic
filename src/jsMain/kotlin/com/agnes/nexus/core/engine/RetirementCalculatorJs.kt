package com.agnes.nexus.core.engine

import com.agnes.nexus.core.domain.service.ledger.RetirementCalculator
import kotlin.js.JsExport

@JsExport
class RetirementCalculatorJs {

    /**
     * Project retirement outcome.
     * @param planJson JSON-serialized retirement plan input
     * @param currentYear the current calendar year
     * @return JSON-serialized projection output
     */
    fun project(planJson: String, currentYear: Int): String =
        RetirementCalculator.project(planJson, currentYear)

    /** Calculate required monthly contribution to reach the target. */
    fun requiredMonthlyContribution(planJson: String): Double =
        RetirementCalculator.requiredMonthlyContribution(planJson)
}
