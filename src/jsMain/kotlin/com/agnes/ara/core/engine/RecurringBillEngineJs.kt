package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.service.ledger.RecurringBillEngine
import kotlin.js.JsExport

/**
 * JS-exportable facade for [RecurringBillEngine].
 *
 * Bridges the commonMain pure engine to JavaScript callers. UUID generation
 * for new Transaction objects is performed here in jsMain using the Web Crypto
 * API, keeping commonMain free of platform-specific concerns.
 */
@JsExport
class RecurringBillEngineJs {

    /**
     * Advance a date by exactly one recurrence period.
     *
     * @param dateStr   YYYY-MM-DD source date.
     * @param frequency One of: daily | weekly | biweekly | monthly | quarterly | yearly.
     * @return          YYYY-MM-DD result date.
     */
    fun advanceByFrequency(dateStr: String, frequency: String): String =
        RecurringBillEngine.advanceByFrequency(dateStr, frequency)

    /**
     * Compute the next due date for a rule after a reference date.
     *
     * @param ruleJson  JSON RecurringRule.
     * @param fromIso   YYYY-MM-DD reference date (uses today when null).
     * @return          YYYY-MM-DD string.
     */
    fun computeNextDueDate(ruleJson: String, fromIso: String?): String {
        val todayIso = js("new Date().toISOString().slice(0,10)") as String
        return RecurringBillEngine.computeNextDueDate(ruleJson, fromIso, todayIso)
    }

    /**
     * Return all active rules whose nextDueDate is today or in the past.
     *
     * @param rulesJson JSON array of RecurringRule.
     * @param todayIso  YYYY-MM-DD reference date.
     * @return          JSON array of matching RecurringRule objects.
     */
    fun computeDueRules(rulesJson: String, todayIso: String): String =
        RecurringBillEngine.computeDueRules(rulesJson, todayIso)

    /**
     * Return active rules due within the next [days] days (inclusive of today).
     *
     * @param rulesJson JSON array of RecurringRule.
     * @param todayIso  YYYY-MM-DD reference date.
     * @param days      Lookahead window in days.
     * @return          JSON array annotated with dueDateFormatted, sorted by date.
     */
    fun computeUpcomingBills(rulesJson: String, todayIso: String, days: Int): String =
        RecurringBillEngine.computeUpcomingBills(rulesJson, todayIso, days)

    /**
     * Process all due recurring rules for auto-posting.
     *
     * @param rulesJson   JSON array of RecurringRule.
     * @param profileJson JSON LedgerIntakeProfile.
     * @param todayIso    YYYY-MM-DD reference date.
     * @return            JSON: { updatedProfile, autoPosted, pendingRules }
     */
    fun postDueTransactions(rulesJson: String, profileJson: String, todayIso: String): String =
        RecurringBillEngine.postDueTransactions(
            rulesJson = rulesJson,
            profileJson = profileJson,
            todayIso = todayIso,
            uuidProvider = { js("crypto.randomUUID()") as String },
        )

    /**
     * Post a single pending rule once (user-confirmed). Advances its nextDueDate.
     *
     * @param ruleJson    JSON RecurringRule.
     * @param profileJson JSON LedgerIntakeProfile.
     * @param todayIso    YYYY-MM-DD reference date.
     * @return            JSON: { updatedProfile, transaction }
     */
    fun postSingleRule(ruleJson: String, profileJson: String, todayIso: String): String =
        RecurringBillEngine.postSingleRule(
            ruleJson = ruleJson,
            profileJson = profileJson,
            todayIso = todayIso,
            uuidProvider = { js("crypto.randomUUID()") as String },
        )

    /**
     * Skip the next occurrence of a rule — advances nextDueDate without posting.
     *
     * @param ruleJson    JSON RecurringRule.
     * @param profileJson JSON LedgerIntakeProfile.
     * @return            JSON string of the updated LedgerIntakeProfile.
     */
    fun skipNextOccurrence(ruleJson: String, profileJson: String): String {
        val todayIso = js("new Date().toISOString().slice(0,10)") as String
        return RecurringBillEngine.skipNextOccurrence(ruleJson, profileJson, todayIso)
    }
}
