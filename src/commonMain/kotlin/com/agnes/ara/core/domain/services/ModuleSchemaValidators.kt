package com.agnes.ara.core.domain.services

import com.agnes.ara.core.domain.models.FieldDefinition
import com.agnes.ara.core.domain.models.FieldType

class TherapySchemaValidator : ModuleSchemaValidator {
    private val restrictedIds = listOf(
        "userId", "currentState", "therapeuticGoals", "emotionalResilience", "stressLevel"
    )
    override fun validateExtension(field: FieldDefinition): ValidationResult = ValidationResult(true, emptyList())
    override fun isFieldNameAllowed(name: String): Boolean = true
    override fun getRestrictedFieldIds(): List<String> = restrictedIds
}

class TrainerSchemaValidator : ModuleSchemaValidator {
    private val restrictedIds = listOf(
        "userId", "fitnessLevel", "fitnessGoals", "currentWeight", "workoutFrequency"
    )
    override fun validateExtension(field: FieldDefinition): ValidationResult = ValidationResult(true, emptyList())
    override fun isFieldNameAllowed(name: String): Boolean = true
    override fun getRestrictedFieldIds(): List<String> = restrictedIds
}

class LedgerSchemaValidator : ModuleSchemaValidator {
    private val restrictedIds = listOf(
        "userId", "monthlyIncome", "currency", "financialGoals", "totalDebt", "totalSavings",
        "totalInvestments", "budgetCategories", "riskTolerance", "spendingHabits",
        "financialStressLevel", "creditScore", "paymentSchedule", "lastBudgetReview", "nextBudgetReview"
    )
    override fun validateExtension(field: FieldDefinition): ValidationResult {
        val allowedTypes = setOf(
            FieldType.NUMBER, FieldType.RANGE, FieldType.SELECT, FieldType.MULTI_SELECT, FieldType.DATE
        )
        val errors = if (allowedTypes.contains(field.type)) emptyList() else listOf(
            ValidationError(
                field = "type",
                message = "Ledger extensions must be NUMBER, RANGE, SELECT, MULTI_SELECT, or DATE (got ${field.type})",
                code = "INVALID_FIELD_TYPE"
            )
        )
        return ValidationResult(errors.isEmpty(), errors)
    }
    override fun isFieldNameAllowed(name: String): Boolean = true
    override fun getRestrictedFieldIds(): List<String> = restrictedIds
}

class SomaSchemaValidator : ModuleSchemaValidator {
    private val restrictedIds = listOf(
        "userId", "age", "height", "weight", "bmi", "restingHeartRate", "sleepQuality"
    )
    override fun validateExtension(field: FieldDefinition): ValidationResult = ValidationResult(true, emptyList())
    override fun isFieldNameAllowed(name: String): Boolean = true
    override fun getRestrictedFieldIds(): List<String> = restrictedIds
}

class AtlasSchemaValidator : ModuleSchemaValidator {
    private val restrictedIds = listOf(
        "userId", "energyBudget", "planningLoad", "taskCompletionRate", "streakHealth",
        "urgencyPressure", "peakProductivityTime", "workStyle", "priorityAreas", "habitTracking",
        "goalReviewFrequency", "procrastinationTriggers", "focusScore", "openLoopCount",
        "lastReview", "nextReview"
    )
    override fun validateExtension(field: FieldDefinition): ValidationResult {
        val errors = mutableListOf<ValidationError>()
        val id = field.id
        if (id.isNotBlank() && !Regex("^[a-z0-9]+(?:-[a-z0-9]+)*$").matches(id)) {
            errors += ValidationError(
                field = "id",
                message = "Field ID must be kebab-case (lowercase letters, numbers, and hyphens)",
                code = "INVALID_FIELD_ID_FORMAT"
            )
        }
        return ValidationResult(errors.isEmpty(), errors)
    }
    override fun isFieldNameAllowed(name: String): Boolean = true
    override fun getRestrictedFieldIds(): List<String> = restrictedIds
}

object ModuleValidators {
    val therapy = TherapySchemaValidator()
    val trainer = TrainerSchemaValidator()
    val ledger = LedgerSchemaValidator()
    val soma = SomaSchemaValidator()
    val atlas = AtlasSchemaValidator()
}
