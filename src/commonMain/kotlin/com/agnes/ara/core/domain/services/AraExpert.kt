package com.agnes.ara.core.domain.services

import com.agnes.ara.core.domain.models.*
import kotlin.math.abs

/**
 * Deterministic Expert Services - pure Kotlin logic to interpret raw data.
 * These ensure the "Ground Truth" is calculated by code, not LLM guess-work.
 * Ported and refined from Nexus Android for system-wide parity.
 */
object AraExpert {

    /**
     * Agnes Expert - analyzes emotional state and profile for risk/trend.
     */
    fun analyzeEmotional(
        current: EmotionalState?,
        history: List<EmotionalState> = emptyList()
    ): TherapyDeterministicInsight {
        val resilience = current?.emotionalResilience?.coerceIn(0.0, 10.0)
        val stress = current?.stressLoad?.coerceIn(0.0, 10.0)
        val mood = current?.moodTrend?.trim()?.lowercase()
        val traumaCount = current?.traumaMarkers?.size ?: 0

        if (resilience == null && stress == null && mood == null && traumaCount == 0) {
            return TherapyDeterministicInsight(
                resilienceScore = null,
                stressLoadScore = null,
                moodTrend = null,
                traumaMarkerCount = 0,
                riskLevel = EmotionalRiskLevel.UNKNOWN,
                trendLabel = EmotionalTrendLabel.UNKNOWN,
                summary = "Insufficient emotional telemetry.",
                rationale = listOf("No resilience, stress, mood, or trauma marker data available.")
            )
        }

        var riskPoints = 0
        val rationale = mutableListOf<String>()

        stress?.let {
            when {
                it >= 8.0 -> { riskPoints += 3; rationale.add("Stress load is high (${format(it)}/10).") }
                it >= 6.0 -> { riskPoints += 2; rationale.add("Stress load is elevated (${format(it)}/10).") }
                it >= 4.0 -> { riskPoints += 1; rationale.add("Stress load is moderate (${format(it)}/10).") }
                else -> rationale.add("Stress load is low (${format(it)}/10).")
            }
        }

        resilience?.let {
            when {
                it <= 2.0 -> { riskPoints += 3; rationale.add("Emotional resilience is critically low (${format(it)}/10).") }
                it <= 4.0 -> { riskPoints += 2; rationale.add("Emotional resilience is low (${format(it)}/10).") }
                it <= 6.0 -> { riskPoints += 1; rationale.add("Emotional resilience is moderate (${format(it)}/10).") }
                else -> rationale.add("Emotional resilience is stable (${format(it)}/10).")
            }
        }

        when (mood) {
            "declining" -> { riskPoints += 2; rationale.add("Mood trend is declining.") }
            "stable" -> { riskPoints += 1; rationale.add("Mood trend is stable.") }
            "improving" -> { riskPoints -= 1; rationale.add("Mood trend is improving.") }
        }

        if (traumaCount >= 3) { riskPoints += 2; rationale.add("Multiple trauma markers are active ($traumaCount).") }
        else if (traumaCount > 0) { riskPoints += 1; rationale.add("Trauma markers are present ($traumaCount).") }

        val riskLevel = when {
            riskPoints >= 7 -> EmotionalRiskLevel.CRITICAL
            riskPoints >= 5 -> EmotionalRiskLevel.HIGH
            riskPoints >= 3 -> EmotionalRiskLevel.MODERATE
            else -> EmotionalRiskLevel.LOW
        }

        val trendLabel = deriveEmotionalTrend(current, history)

        return TherapyDeterministicInsight(
            resilienceScore = resilience,
            stressLoadScore = stress,
            moodTrend = mood,
            traumaMarkerCount = traumaCount,
            riskLevel = riskLevel,
            trendLabel = trendLabel,
            summary = "Emotional risk $riskLevel with $trendLabel trend.",
            rationale = rationale
        )
    }

    private fun deriveEmotionalTrend(current: EmotionalState?, history: List<EmotionalState>): EmotionalTrendLabel {
        val mood = current?.moodTrend?.trim()?.lowercase()
        if (mood == "improving") return EmotionalTrendLabel.IMPROVING
        if (mood == "stable") return EmotionalTrendLabel.STABLE
        if (mood == "declining") return EmotionalTrendLabel.DECLINING

        val first = history.firstOrNull()
        val last = history.lastOrNull() ?: current
        if (first == null || last == null) return EmotionalTrendLabel.UNKNOWN
        
        val resilienceDelta = (last.emotionalResilience ?: 0.0) - (first.emotionalResilience ?: 0.0)
        val stressDelta = (last.stressLoad ?: 0.0) - (first.stressLoad ?: 0.0)

        return when {
            resilienceDelta >= 1.0 && stressDelta <= -1.0 -> EmotionalTrendLabel.IMPROVING
            resilienceDelta <= -1.0 && stressDelta >= 1.0 -> EmotionalTrendLabel.DECLINING
            abs(resilienceDelta) <= 0.5 && abs(stressDelta) <= 0.5 -> EmotionalTrendLabel.STABLE
            else -> EmotionalTrendLabel.VOLATILE
        }
    }

    /**
     * Titan Expert - analyzes physical profile for load and recovery.
     */
    fun analyzePhysical(
        profile: TrainerProfile?,
        biological: BiologicalState = BiologicalState(),
        emotional: EmotionalState = EmotionalState()
    ): TrainerDeterministicInsight {
        if (profile == null) {
            return TrainerDeterministicInsight(
                workoutsPerWeek = null,
                plannedSessionDays = 0,
                estimatedWeeklySessions = null,
                sleepHours = null,
                injuryCount = 0,
                yearsTraining = null,
                trainingLoadFlag = TrainingLoadFlag.UNKNOWN,
                recoveryFlag = RecoveryFlag.UNKNOWN,
                summary = "Trainer profile unavailable.",
                rationale = listOf("No trainer profile data was provided.")
            )
        }

        val workouts = (profile.activity.workoutsPerWeek ?: profile.activity.weeklyTrainingDays).coerceAtLeast(0)
        val plannedDays = profile.routines
            .flatMap { it.weekdays + listOfNotNull(it.weekday) }
            .map { it.trim().lowercase() }
            .filter { it.isNotBlank() }
            .toSet()
            .size

        val estimatedSessions = maxOf(workouts, plannedDays).takeIf { it > 0 }
        
        val actualSleep = biological.sleepQuality ?: profile.activity.sleepHours ?: 7.0
        val stress = emotional.stressLoad ?: 0.0
        val injuryCount = profile.history.injuries.size.coerceAtLeast(profile.history.injuryHistory.size)

        val loadFlag = when {
            estimatedSessions == null -> TrainingLoadFlag.UNKNOWN
            estimatedSessions <= 2 -> TrainingLoadFlag.UNDERLOADED
            estimatedSessions <= 5 -> TrainingLoadFlag.BALANCED
            else -> TrainingLoadFlag.OVERREACHED
        }

        var recoveryRiskPoints = 0
        val rationale = mutableListOf<String>()

        if (actualSleep < 6.0) { recoveryRiskPoints += 2; rationale.add("Sleep quality is low (${format(actualSleep)}h).") }
        else if (actualSleep < 7.0) { recoveryRiskPoints += 1; rationale.add("Sleep is below optimal (${format(actualSleep)}h).") }
        else { rationale.add("Sleep is in a recovery-supportive range (${format(actualSleep)}h).") }

        if (stress > 7.0) { recoveryRiskPoints += 2; rationale.add("High emotional stress (${format(stress)}) impairs physical recovery.") }
        
        when {
            injuryCount >= 2 -> { recoveryRiskPoints += 2; rationale.add("Multiple injuries reported ($injuryCount).") }
            injuryCount == 1 -> { recoveryRiskPoints += 1; rationale.add("One injury reported.") }
        }

        estimatedSessions?.let {
            when {
                it >= 6 -> { recoveryRiskPoints += 2; rationale.add("Weekly training load is high ($it sessions).") }
                it >= 4 -> { recoveryRiskPoints += 1; rationale.add("Weekly training load is moderate-high ($it sessions).") }
            }
        }

        val note = profile.activity.recoveryNotes?.lowercase().orEmpty()
        if (note.contains("fatigue") || note.contains("exhaust") || note.contains("pain") || note.contains("burnout")) {
            recoveryRiskPoints += 1
            rationale.add("Recovery notes indicate fatigue/pain markers.")
        }

        val recoveryFlag = when {
            estimatedSessions == null && biological.sleepQuality == null && injuryCount == 0 -> RecoveryFlag.UNKNOWN
            recoveryRiskPoints >= 5 -> RecoveryFlag.HIGH_RISK
            recoveryRiskPoints >= 3 -> RecoveryFlag.WATCH
            else -> RecoveryFlag.RECOVERY_OK
        }

        return TrainerDeterministicInsight(
            workoutsPerWeek = workouts,
            plannedSessionDays = plannedDays,
            estimatedWeeklySessions = estimatedSessions,
            sleepHours = actualSleep,
            injuryCount = injuryCount,
            yearsTraining = profile.history.yearsTraining,
            trainingLoadFlag = loadFlag,
            recoveryFlag = recoveryFlag,
            summary = "Training load $loadFlag with recovery status $recoveryFlag.",
            rationale = rationale
        )
    }

    /**
     * Ledger Expert - analyzes financial health and ROI.
     */
    fun analyzeFinancial(
        profile: LedgerProfile?,
        emotional: EmotionalState = EmotionalState(),
        biological: BiologicalState = BiologicalState()
    ): LedgerDeterministicInsight {
        if (profile == null) {
            return LedgerDeterministicInsight(
                monthlyIncome = 0.0,
                totalExpenses = 0.0,
                netBalance = 0.0,
                debtTotal = 0.0,
                debtToIncomeRatio = null,
                monthlySavingsTarget = 0.0,
                cashflowHealth = CashflowHealth.UNKNOWN,
                savingsPressureLevel = SavingsPressureLevel.UNKNOWN,
                debtLoadLevel = DebtLoadLevel.UNKNOWN,
                summary = "Ledger profile unavailable.",
                rationale = listOf("No ledger profile data was provided.")
            )
        }

        val activeModernPlan = profile.plans.firstOrNull { it.status.equals("active", ignoreCase = true) }
        val activeLegacyPlan = profile.financialPlans.firstOrNull { it.id == profile.activePlanId }

        val income = sanitize(
            when {
                activeModernPlan != null -> activeModernPlan.monthlyIncome
                profile.monthlyIncome > 0 -> profile.monthlyIncome
                else -> 0.0
            }
        )

        val fixed = (activeModernPlan?.fixedExpenses ?: profile.fixedExpenses).sumOf { sanitize(it.amount) }
        val variable = (activeModernPlan?.variableExpenses ?: profile.variableExpenses).sumOf { sanitize(it.amount) }
        val totalExpenses = fixed + variable
        val netBalance = income - totalExpenses
        val debtTotal = profile.debtItems.sumOf { sanitize(it.balance) }

        val monthlySavingsTarget = sanitize(
            activeModernPlan?.savingsGoal
                ?: activeLegacyPlan?.monthlyTarget
                ?: 0.0
        )

        val debtToIncome = if (income > 0.0) debtTotal / income else null

        val cashflowHealth = when {
            income <= 0.0 && totalExpenses <= 0.0 -> CashflowHealth.UNKNOWN
            netBalance < 0.0 -> CashflowHealth.DEFICIT
            income > 0.0 && netBalance <= income * 0.10 -> CashflowHealth.TIGHT
            else -> CashflowHealth.SURPLUS
        }

        val savingsPressure = when {
            monthlySavingsTarget <= 0.0 -> if (income <= 0.0) SavingsPressureLevel.UNKNOWN else SavingsPressureLevel.LOW
            netBalance <= 0.0 -> SavingsPressureLevel.CRITICAL
            else -> {
                val ratio = monthlySavingsTarget / netBalance
                when {
                    ratio <= 0.5 -> SavingsPressureLevel.LOW
                    ratio <= 1.0 -> SavingsPressureLevel.MODERATE
                    ratio <= 1.5 -> SavingsPressureLevel.HIGH
                    else -> SavingsPressureLevel.CRITICAL
                }
            }
        }

        val debtLoad = when {
            debtTotal <= 0.0 -> DebtLoadLevel.LOW
            income <= 0.0 -> DebtLoadLevel.SEVERE
            debtToIncome == null -> DebtLoadLevel.UNKNOWN
            debtToIncome < 0.5 -> DebtLoadLevel.LOW
            debtToIncome < 1.0 -> DebtLoadLevel.MODERATE
            debtToIncome < 2.0 -> DebtLoadLevel.HIGH
            else -> DebtLoadLevel.SEVERE
        }

        // Compute Resonance ROI
        val stressPenalty = (emotional.stressLoad ?: 5.0) / 10.0
        val sleepBonus = (biological.sleepQuality ?: 5.0) / 10.0
        val frictionRatio = if (income > 0) variable / income else 0.0
        val baseROI = if (totalExpenses > 0) 0.5 else 0.0
        val resonanceROI = (baseROI + (sleepBonus * 0.25) - (stressPenalty * 0.25) - (frictionRatio * 0.1)).coerceIn(0.0, 1.0)
        
        val rationale = mutableListOf<String>()
        rationale.add("Net balance is ${format(netBalance)} against a target of ${format(monthlySavingsTarget)}.")
        rationale.add("Debt total is ${format(debtTotal)}${debtToIncome?.let { " (${format(it)}x income)" } ?: " with unknown income ratio"}.")
        rationale.add("Resonance ROI estimated at ${(resonanceROI * 100).toInt()}% based on stress, sleep, and friction.")

        return LedgerDeterministicInsight(
            monthlyIncome = income,
            totalExpenses = totalExpenses,
            netBalance = netBalance,
            debtTotal = debtTotal,
            debtToIncomeRatio = debtToIncome,
            monthlySavingsTarget = monthlySavingsTarget,
            cashflowHealth = cashflowHealth,
            savingsPressureLevel = savingsPressure,
            debtLoadLevel = debtLoad,
            resonanceROI = resonanceROI,
            summary = "Cashflow $cashflowHealth, savings pressure $savingsPressure, debt load $debtLoad.",
            rationale = rationale
        )
    }

    /**
     * Atlas Expert - calculates planning and streak consistency.
     */
    fun analyzePlanning(profile: AtlasProfile): Map<String, Double> {
        val totalTasks = profile.tasks.size
        val completedTasks = profile.tasks.count { it.status == "done" }
        val taskCompletionRate = if (totalTasks > 0) completedTasks.toDouble() / totalTasks else 0.0
        
        val activeHabits = profile.habits.filter { it.status == "active" }
        val streakHealth = if (activeHabits.isNotEmpty()) {
            activeHabits.map { it.currentStreak.coerceAtMost(30).toDouble() / 30.0 }.average() * 10.0
        } else 0.0
        
        return mapOf(
            "taskCompletionRate" to taskCompletionRate,
            "streakHealth" to streakHealth
        )
    }

    private fun sanitize(value: Double): Double = if (value.isFinite() && value > 0.0) value else 0.0
    private fun format(value: Double): String = ((value * 10.0).toInt() / 10.0).toString()
}
