package com.agnes.nexus.core.domain.service.ledger

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlin.math.pow
import kotlin.math.round

// ═══════════════════════════════════════════════════════════════════════════════
// IO Types
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
data class RetirementPlanInput(
    val id: String = "",
    val currentAge: Int,
    val targetRetirementAge: Int,
    val currentSavings: Double,
    val monthlyContribution: Double,
    val expectedAnnualReturnPct: Double,
    val inflationRatePct: Double,
    val targetMonthlyIncome: Double,
)

@Serializable
data class RetirementMilestone(
    val year: Int,
    val age: Int,
    val projectedBalance: Double,
)

@Serializable
data class RetirementProjectionOutput(
    val planId: String,
    val yearsToRetirement: Int,
    val projectedNestEgg: Double,
    val requiredNestEgg: Double,
    val monthlyIncomeSupported: Double,
    val onTrack: Boolean,
    val shortfallOrSurplus: Double,
    val fourPercentRuleMonthly: Double,
    val milestones: List<RetirementMilestone>,
)

// ═══════════════════════════════════════════════════════════════════════════════
// RetirementCalculator
// ═══════════════════════════════════════════════════════════════════════════════

object RetirementCalculator {

    private val json = Json { ignoreUnknownKeys = true }

    private fun round2(n: Double): Double = round(n * 100.0) / 100.0

    /**
     * Compound growth: FV = PV*(1+r)^n + PMT*[((1+r)^n - 1)/r]
     */
    private fun futureValue(pv: Double, monthlyRate: Double, months: Int, pmt: Double): Double {
        if (monthlyRate == 0.0) return pv + pmt * months
        val growth = (1 + monthlyRate).pow(months)
        return pv * growth + pmt * ((growth - 1) / monthlyRate)
    }

    /**
     * Project retirement outcome.
     * @param planJson JSON-serialized RetirementPlanInput
     * @param currentYear the current calendar year (caller passes to avoid platform-specific Date)
     * @return JSON-serialized RetirementProjectionOutput
     */
    fun project(planJson: String, currentYear: Int): String {
        val plan = json.decodeFromString<RetirementPlanInput>(planJson)
        val yearsToRetirement = plan.targetRetirementAge - plan.currentAge
        val months = yearsToRetirement * 12
        val nominalMonthlyRate = plan.expectedAnnualReturnPct / 100.0 / 12.0

        val projectedNestEgg = round2(futureValue(plan.currentSavings, nominalMonthlyRate, months, plan.monthlyContribution))

        val annualIncomeNeeded = plan.targetMonthlyIncome * 12.0
        val requiredNestEgg = round2(annualIncomeNeeded / 0.04)
        val fourPercentRuleMonthly = round2((projectedNestEgg * 0.04) / 12.0)
        val shortfallOrSurplus = round2(projectedNestEgg - requiredNestEgg)

        val milestones = mutableListOf<RetirementMilestone>()
        var y = 5
        while (y <= yearsToRetirement) {
            val age = plan.currentAge + y
            val projectedBalance = round2(futureValue(plan.currentSavings, nominalMonthlyRate, y * 12, plan.monthlyContribution))
            milestones.add(RetirementMilestone(currentYear + y, age, projectedBalance))
            y += 5
        }

        val output = RetirementProjectionOutput(
            planId = plan.id,
            yearsToRetirement = yearsToRetirement,
            projectedNestEgg = projectedNestEgg,
            requiredNestEgg = requiredNestEgg,
            monthlyIncomeSupported = fourPercentRuleMonthly,
            onTrack = projectedNestEgg >= requiredNestEgg,
            shortfallOrSurplus = shortfallOrSurplus,
            fourPercentRuleMonthly = fourPercentRuleMonthly,
            milestones = milestones,
        )
        return json.encodeToString(RetirementProjectionOutput.serializer(), output)
    }

    /**
     * Calculate required monthly contribution to reach the target nest egg.
     * @return monthly contribution amount (negative if already over-funded)
     */
    fun requiredMonthlyContribution(planJson: String): Double {
        val plan = json.decodeFromString<RetirementPlanInput>(planJson)
        val months = (plan.targetRetirementAge - plan.currentAge) * 12
        val r = plan.expectedAnnualReturnPct / 100.0 / 12.0
        val annualIncomeNeeded = plan.targetMonthlyIncome * 12.0
        val target = annualIncomeNeeded / 0.04
        val growth = (1 + r).pow(months)
        if (growth == 1.0) return round2((target - plan.currentSavings) / months)
        return round2(((target - plan.currentSavings * growth) * r) / (growth - 1))
    }
}
