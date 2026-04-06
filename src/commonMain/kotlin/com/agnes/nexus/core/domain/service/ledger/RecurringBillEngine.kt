package com.agnes.nexus.core.domain.service.ledger

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*

/**
 * Pure commonMain engine for recurring bill processing.
 *
 * Ported from recurring-engine.ts. All date arithmetic uses epoch-day integers
 * (no kotlinx.datetime dependency) for portability, matching the pattern already
 * established in CalendarAggregation.kt.
 *
 * UUID generation is excluded from commonMain — the jsMain facade injects UUIDs
 * via a lambda parameter on functions that create new Transaction objects.
 *
 * Complexity:
 *   advanceByFrequency   — O(1)
 *   computeNextDueDate   — O(k) where k = number of periods to advance (small)
 *   computeDueRules      — O(R)
 *   computeUpcomingBills — O(R log R) for the final sort
 *   postDueTransactions  — O(R * k) worst-case for rules with many missed periods
 *   postSingleRule       — O(R)
 *   skipNextOccurrence   — O(R)
 */
object RecurringBillEngine {

    private val json = Json { ignoreUnknownKeys = true }

    // ── Internal model types ─────────────────────────────────────────────────

    @Serializable
    internal data class RecurringRule(
        val id: String,
        val description: String,
        val amount: Double,
        val type: String = "expense",
        val category: String = "",
        val frequency: String,
        val startDate: String,
        val nextDueDate: String,
        val isActive: Boolean = true,
        val autoPost: Boolean = false,
        val createdAt: String = "",
        val lastPostedDate: String? = null,
        val accountId: String? = null,
        val budgetCategoryId: String? = null,
        val taxCategory: String? = null,
        val notes: String? = null,
    )

    @Serializable
    internal data class Transaction(
        val id: String,
        val date: String,
        val description: String,
        val amount: Double,
        val type: String,
        val category: String,
        val isRecurring: Boolean = true,
        val recurringRuleId: String? = null,
        val accountId: String? = null,
        val budgetCategoryId: String? = null,
        val taxCategory: String? = null,
        val notes: String? = null,
    )

    @Serializable
    private data class LedgerProfile(
        val recurringRules: List<RecurringRule> = emptyList(),
        val transactions: List<Transaction> = emptyList(),
        val updatedAt: String = "",
    )

    // ── Public API ───────────────────────────────────────────────────────────

    /**
     * Advance a date string by exactly one recurrence period.
     *
     * @param dateStr   YYYY-MM-DD source date.
     * @param frequency One of: daily | weekly | biweekly | monthly | quarterly | yearly.
     * @return          YYYY-MM-DD string for the next occurrence.
     */
    fun advanceByFrequency(dateStr: String, frequency: String): String {
        val (year, month, day) = parseDate(dateStr)
        return when (frequency) {
            "daily" -> epochDayToStr(dateStrToEpochDay(dateStr) + 1L)
            "weekly" -> epochDayToStr(dateStrToEpochDay(dateStr) + 7L)
            "biweekly" -> epochDayToStr(dateStrToEpochDay(dateStr) + 14L)
            "monthly" -> clampedDate(year, month + 1, day)
            "quarterly" -> clampedDate(year, month + 3, day)
            "yearly" -> clampedDate(year + 1, month, day)
            else -> dateStr
        }
    }

    /**
     * Compute the next due date for a rule after a reference date.
     *
     * @param ruleJson  JSON RecurringRule.
     * @param fromIso   YYYY-MM-DD reference date (defaults to today if null/blank).
     * @return          YYYY-MM-DD string.
     */
    fun computeNextDueDate(ruleJson: String, fromIso: String?, todayIso: String): String {
        val rule = json.decodeFromString<RecurringRule>(ruleJson)
        val base = if (!fromIso.isNullOrBlank()) fromIso.take(10) else todayIso.take(10)
        val current = rule.nextDueDate.take(10)
        if (current > base) return current

        var next = current
        while (next <= base) {
            next = advanceByFrequency(next, rule.frequency)
        }
        return next
    }

    /**
     * Return all active rules whose nextDueDate is today or in the past.
     *
     * @param rulesJson JSON array of RecurringRule.
     * @param todayIso  YYYY-MM-DD (or ISO-8601) reference date.
     * @return          JSON array of matching RecurringRule objects.
     */
    fun computeDueRules(rulesJson: String, todayIso: String): String {
        val rules = json.decodeFromString<List<RecurringRule>>(rulesJson)
        val today = todayIso.take(10)
        val due = rules.filter { it.isActive && it.nextDueDate.take(10) <= today }
        return json.encodeToString(due)
    }

    /**
     * Return active rules due within the next [days] days (inclusive of today).
     *
     * @param rulesJson JSON array of RecurringRule.
     * @param todayIso  YYYY-MM-DD reference date.
     * @param days      Lookahead window in days.
     * @return          JSON array of RecurringRule objects annotated with dueDateFormatted,
     *                  sorted ascending by due date.
     */
    fun computeUpcomingBills(rulesJson: String, todayIso: String, days: Int): String {
        val rules = json.decodeFromString<List<RecurringRule>>(rulesJson)
        val todayDay = dateStrToEpochDay(todayIso.take(10))
        val horizonDay = todayDay + days

        val results = rules
            .filter { it.isActive }
            .mapNotNull { rule ->
                val dueDay = dateStrToEpochDay(rule.nextDueDate.take(10))
                if (dueDay < todayDay || dueDay > horizonDay) null
                else Pair(rule, dueDay)
            }
            .sortedBy { it.second }
            .map { (rule, dueDay) ->
                buildJsonObject {
                    put("id", rule.id)
                    put("description", rule.description)
                    put("amount", rule.amount)
                    put("type", rule.type)
                    put("category", rule.category)
                    put("frequency", rule.frequency)
                    put("startDate", rule.startDate)
                    put("nextDueDate", rule.nextDueDate)
                    put("isActive", rule.isActive)
                    put("autoPost", rule.autoPost)
                    put("createdAt", rule.createdAt)
                    if (rule.lastPostedDate != null) put("lastPostedDate", rule.lastPostedDate) else put("lastPostedDate", JsonNull)
                    if (rule.accountId != null) put("accountId", rule.accountId) else put("accountId", JsonNull)
                    if (rule.budgetCategoryId != null) put("budgetCategoryId", rule.budgetCategoryId) else put("budgetCategoryId", JsonNull)
                    if (rule.taxCategory != null) put("taxCategory", rule.taxCategory) else put("taxCategory", JsonNull)
                    if (rule.notes != null) put("notes", rule.notes) else put("notes", JsonNull)
                    put("dueDateFormatted", epochDayToStr(dueDay))
                }
            }

        return JsonArray(results).toString()
    }

    /**
     * Process all due recurring rules for auto-posting.
     *
     * Rules with autoPost=true → create transactions and advance nextDueDate.
     * Rules with autoPost=false → returned as pendingRules for user confirmation.
     * Handles multiple missed occurrences.
     *
     * @param rulesJson   JSON array of RecurringRule (the rules to process).
     * @param profileJson JSON LedgerIntakeProfile.
     * @param todayIso    YYYY-MM-DD reference date.
     * @param uuidProvider Lambda that produces a new UUID string per transaction.
     * @return JSON object: { updatedProfile, autoPosted: Transaction[], pendingRules: RecurringRule[] }
     */
    fun postDueTransactions(
        rulesJson: String,
        profileJson: String,
        todayIso: String,
        uuidProvider: () -> String,
    ): String {
        val rules = json.decodeFromString<List<RecurringRule>>(rulesJson)
        val profile = json.decodeFromString<LedgerProfile>(profileJson)
        val today = todayIso.take(10)

        val autoPosted = mutableListOf<Transaction>()
        val pendingRules = mutableListOf<RecurringRule>()

        val updatedRules = rules.map { rule ->
            if (!rule.isActive) return@map rule

            val due = rule.nextDueDate.take(10)
            if (due > today) return@map rule

            if (!rule.autoPost) {
                pendingRules.add(rule)
                return@map rule
            }

            // Post all missed occurrences
            var current = due
            while (current <= today) {
                autoPosted.add(
                    Transaction(
                        id = uuidProvider(),
                        date = current,
                        description = rule.description,
                        amount = round2(rule.amount),
                        type = rule.type,
                        category = rule.category,
                        isRecurring = true,
                        recurringRuleId = rule.id,
                        accountId = rule.accountId,
                        budgetCategoryId = rule.budgetCategoryId,
                        taxCategory = rule.taxCategory,
                        notes = rule.notes,
                    )
                )
                current = advanceByFrequency(current, rule.frequency)
            }

            rule.copy(nextDueDate = current, lastPostedDate = today)
        }

        // Merge updated recurring rules back into profile
        val ruleIds = updatedRules.map { it.id }.toHashSet()
        val unchangedProfileRules = profile.recurringRules.filter { it.id !in ruleIds }
        val mergedRules = unchangedProfileRules + updatedRules
        val mergedTransactions = profile.transactions + autoPosted

        val updatedProfileJson = buildUpdatedProfileJson(
            profileJson = profileJson,
            recurringRules = mergedRules,
            transactions = mergedTransactions,
            updatedAt = todayIso,
        )

        return buildJsonObject {
            put("updatedProfile", json.parseToJsonElement(updatedProfileJson))
            put("autoPosted", json.encodeToJsonElement(autoPosted))
            put("pendingRules", json.encodeToJsonElement(pendingRules))
        }.toString()
    }

    /**
     * Post a single pending rule once (user-confirmed). Advances its nextDueDate.
     *
     * @param ruleJson    JSON RecurringRule.
     * @param profileJson JSON LedgerIntakeProfile.
     * @param todayIso    YYYY-MM-DD reference date.
     * @param uuidProvider Lambda that produces a UUID for the new transaction.
     * @return JSON object: { updatedProfile, transaction: Transaction }
     */
    fun postSingleRule(
        ruleJson: String,
        profileJson: String,
        todayIso: String,
        uuidProvider: () -> String,
    ): String {
        val rule = json.decodeFromString<RecurringRule>(ruleJson)
        val today = todayIso.take(10)

        val tx = Transaction(
            id = uuidProvider(),
            date = rule.nextDueDate.take(10),
            description = rule.description,
            amount = round2(rule.amount),
            type = rule.type,
            category = rule.category,
            isRecurring = true,
            recurringRuleId = rule.id,
            accountId = rule.accountId,
            budgetCategoryId = rule.budgetCategoryId,
            taxCategory = rule.taxCategory,
            notes = rule.notes,
        )

        val nextDue = computeNextDueDate(ruleJson, null, today)

        val profile = json.decodeFromString<LedgerProfile>(profileJson)
        val updatedRules = profile.recurringRules.map { r ->
            if (r.id == rule.id) r.copy(nextDueDate = nextDue, lastPostedDate = today) else r
        }
        val updatedTransactions = profile.transactions + tx

        val updatedProfileJson = buildUpdatedProfileJson(
            profileJson = profileJson,
            recurringRules = updatedRules,
            transactions = updatedTransactions,
            updatedAt = todayIso,
        )

        return buildJsonObject {
            put("updatedProfile", json.parseToJsonElement(updatedProfileJson))
            put("transaction", json.encodeToJsonElement(tx))
        }.toString()
    }

    /**
     * Skip the next occurrence of a rule — advances nextDueDate without posting.
     *
     * @param ruleJson    JSON RecurringRule.
     * @param profileJson JSON LedgerIntakeProfile.
     * @param todayIso    YYYY-MM-DD reference date for computing next due date.
     * @return JSON string of the updated LedgerIntakeProfile.
     */
    fun skipNextOccurrence(ruleJson: String, profileJson: String, todayIso: String): String {
        val rule = json.decodeFromString<RecurringRule>(ruleJson)
        val today = todayIso.take(10)
        val nextDue = computeNextDueDate(ruleJson, null, today)

        val profile = json.decodeFromString<LedgerProfile>(profileJson)
        val updatedRules = profile.recurringRules.map { r ->
            if (r.id == rule.id) r.copy(nextDueDate = nextDue) else r
        }

        return buildUpdatedProfileJson(
            profileJson = profileJson,
            recurringRules = updatedRules,
            transactions = profile.transactions,
            updatedAt = todayIso,
        )
    }

    // ── Private helpers ──────────────────────────────────────────────────────

    /** Round to 2 decimal places (mirrors round2 from TS utils). */
    private fun round2(x: Double): Double = kotlin.math.round(x * 100.0) / 100.0

    /**
     * Rebuild a profile JSON string with updated recurringRules, transactions,
     * and updatedAt. All other fields are preserved from the original JSON.
     */
    private fun buildUpdatedProfileJson(
        profileJson: String,
        recurringRules: List<RecurringRule>,
        transactions: List<Transaction>,
        updatedAt: String,
    ): String {
        val base = json.parseToJsonElement(profileJson).jsonObject
        val updated = buildJsonObject {
            for ((k, v) in base) {
                when (k) {
                    "recurringRules" -> put("recurringRules", json.encodeToJsonElement(recurringRules))
                    "transactions" -> put("transactions", json.encodeToJsonElement(transactions))
                    "updatedAt" -> put("updatedAt", JsonPrimitive(updatedAt))
                    else -> put(k, v)
                }
            }
            // Ensure fields are present even if not in original
            if (!base.containsKey("recurringRules")) put("recurringRules", json.encodeToJsonElement(recurringRules))
            if (!base.containsKey("transactions")) put("transactions", json.encodeToJsonElement(transactions))
            if (!base.containsKey("updatedAt")) put("updatedAt", JsonPrimitive(updatedAt))
        }
        return updated.toString()
    }

    // ── Date helpers ─────────────────────────────────────────────────────────

    /** Parse "YYYY-MM-DD" into (year, month, day). */
    private fun parseDate(dateStr: String): Triple<Int, Int, Int> {
        val parts = dateStr.split("-")
        val y = parts.getOrNull(0)?.toIntOrNull() ?: 1970
        val m = parts.getOrNull(1)?.toIntOrNull() ?: 1
        val d = parts.getOrNull(2)?.toIntOrNull() ?: 1
        return Triple(y, m, d)
    }

    /** Convert "YYYY-MM-DD" to an integer epoch day count (days since 1970-01-01). */
    internal fun dateStrToEpochDay(dateStr: String): Long {
        val (year, month, day) = parseDate(dateStr)
        var days = 0L
        for (y in 1970 until year) days += if (isLeapYear(y)) 366L else 365L
        val md = monthDaysArray(year)
        for (m in 1 until month) days += md[m - 1]
        return days + (day - 1)
    }

    /** Convert epoch day count back to "YYYY-MM-DD". */
    internal fun epochDayToStr(epochDay: Long): String {
        var remaining = epochDay.toInt()
        var year = 1970
        while (true) {
            val diy = if (isLeapYear(year)) 366 else 365
            if (remaining < diy) break
            remaining -= diy
            year++
        }
        val md = monthDaysArray(year)
        var month = 0
        while (month < 12 && remaining >= md[month]) {
            remaining -= md[month]
            month++
        }
        return "$year-${(month + 1).toString().padStart(2, '0')}-${(remaining + 1).toString().padStart(2, '0')}"
    }

    /**
     * Produce a YYYY-MM-DD for (year, month, day) where month may overflow.
     * Used for monthly/quarterly/yearly advancement to handle month overflow correctly.
     */
    private fun clampedDate(year: Int, month: Int, day: Int): String {
        var y = year
        var m = month
        // Normalize month overflow (e.g., month=13 → year+1, month=1)
        while (m > 12) { m -= 12; y++ }
        while (m < 1) { m += 12; y-- }
        val maxDay = daysInMonth(y, m)
        val d = minOf(day, maxDay)
        return "$y-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}"
    }

    private fun daysInMonth(year: Int, month: Int): Int = when (month) {
        2 -> if (isLeapYear(year)) 29 else 28
        4, 6, 9, 11 -> 30
        else -> 31
    }

    private fun isLeapYear(year: Int): Boolean =
        (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)

    private fun monthDaysArray(year: Int): IntArray =
        if (isLeapYear(year)) intArrayOf(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
        else intArrayOf(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)

    // Expose for serialization reuse
    private val listRecurringRuleSerializer = kotlinx.serialization.builtins.ListSerializer(RecurringRule.serializer())
    private val listTransactionSerializer = kotlinx.serialization.builtins.ListSerializer(Transaction.serializer())

    // Make encodeToJsonElement usable for typed lists
    private fun Json.encodeToJsonElement(rules: List<RecurringRule>): JsonElement =
        encodeToJsonElement(listRecurringRuleSerializer, rules)

    private fun Json.encodeToJsonElement(txs: List<Transaction>): JsonElement =
        encodeToJsonElement(listTransactionSerializer, txs)

    private fun Json.encodeToString(rules: List<RecurringRule>): String =
        encodeToString(listRecurringRuleSerializer, rules)
}
