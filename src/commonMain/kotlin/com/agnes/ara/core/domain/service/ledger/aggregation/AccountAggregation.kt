package com.agnes.ara.core.domain.service.ledger.aggregation

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*

/**
 * Account aggregation logic — ported from account-aggregation.ts.
 *
 * All public functions accept/return JSON strings at the boundary.
 * Internal data classes are @Serializable for deserialization only.
 *
 * Complexity: O(n) for all functions where n = number of accounts/debt items.
 */
object AccountAggregation {

    private val json = Json { ignoreUnknownKeys = true }

    // ── Internal model types ──────────────────────────────────────────────────

    @Serializable
    private data class Account(
        val id: String,
        val type: String,
        val balance: Double,
        val isDefault: Boolean = false,
    )

    @Serializable
    private data class DebtItem(
        val id: String,
        val balance: Double,
    )

    private val ASSET_ACCOUNT_TYPES = setOf("checking", "savings", "investment", "cash", "other")
    private val LIABILITY_ACCOUNT_TYPES = setOf("credit_card")
    private val LIQUID_ACCOUNT_TYPES = setOf("checking", "savings", "cash")

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * Compute a summary of account balances grouped by type.
     *
     * @param accountsJson JSON array of Account objects.
     * @return JSON object with fields: totalAssets, totalLiabilities, liquidAssets,
     *         creditCardDebt, investmentValue, byType.
     */
    fun computeAccountSummary(accountsJson: String): String {
        val accounts = parseAccounts(accountsJson)

        var totalAssets = 0.0
        var totalLiabilities = 0.0
        var liquidAssets = 0.0
        var creditCardDebt = 0.0
        var investmentValue = 0.0

        // byType: type -> { count, total }
        val byType = mutableMapOf<String, Pair<Int, Double>>()

        for (account in accounts) {
            val existing = byType[account.type]
            byType[account.type] = Pair(
                (existing?.first ?: 0) + 1,
                LedgerAggregationUtils.round2((existing?.second ?: 0.0) + account.balance),
            )

            if (account.type in ASSET_ACCOUNT_TYPES) {
                totalAssets = LedgerAggregationUtils.round2(totalAssets + maxOf(0.0, account.balance))
                if (account.type in LIQUID_ACCOUNT_TYPES) {
                    liquidAssets = LedgerAggregationUtils.round2(liquidAssets + maxOf(0.0, account.balance))
                }
                if (account.type == "investment") {
                    investmentValue = LedgerAggregationUtils.round2(investmentValue + maxOf(0.0, account.balance))
                }
            } else if (account.type in LIABILITY_ACCOUNT_TYPES) {
                // Credit cards stored as negative balance; debt = positive magnitude
                val debt = maxOf(0.0, -account.balance)
                totalLiabilities = LedgerAggregationUtils.round2(totalLiabilities + debt)
                creditCardDebt = LedgerAggregationUtils.round2(creditCardDebt + debt)
            }
        }

        val byTypeJson = buildJsonObject {
            for ((type, pair) in byType) {
                put(type, buildJsonObject {
                    put("count", pair.first)
                    put("total", pair.second)
                })
            }
        }

        return buildJsonObject {
            put("totalAssets", totalAssets)
            put("totalLiabilities", totalLiabilities)
            put("liquidAssets", liquidAssets)
            put("creditCardDebt", creditCardDebt)
            put("investmentValue", investmentValue)
            put("byType", byTypeJson)
        }.toString()
    }

    /**
     * Compute net liquid assets = (checking + savings + cash) - credit card debt.
     *
     * @param accountsJson JSON array of Account objects.
     * @return Net liquid assets as a Double.
     */
    fun computeNetLiquidAssets(accountsJson: String): Double {
        val summaryJson = json.parseToJsonElement(computeAccountSummary(accountsJson)).jsonObject
        val liquidAssets = summaryJson["liquidAssets"]?.jsonPrimitive?.double ?: 0.0
        val creditCardDebt = summaryJson["creditCardDebt"]?.jsonPrimitive?.double ?: 0.0
        return LedgerAggregationUtils.round2(liquidAssets - creditCardDebt)
    }

    /**
     * Compute total balance across all accounts (assets - liabilities via raw balance sum).
     *
     * @param accountsJson JSON array of Account objects.
     * @return Total balance as a Double.
     */
    fun computeTotalBalance(accountsJson: String): Double {
        val accounts = parseAccounts(accountsJson)
        return LedgerAggregationUtils.round2(accounts.fold(0.0) { sum, a -> sum + a.balance })
    }

    /**
     * Find the default account, or the first checking account, or the first account.
     *
     * @param accountsJson JSON array of Account objects.
     * @return JSON object of the found account, or null JSON ("null") if empty.
     */
    fun getDefaultAccount(accountsJson: String): String {
        val rawArray = json.parseToJsonElement(accountsJson).jsonArray
        if (rawArray.isEmpty()) return "null"

        val accounts = parseAccounts(accountsJson)
        val chosen = accounts.find { it.isDefault }
            ?: accounts.find { it.type == "checking" }
            ?: accounts.first()

        // Return the original JSON object for the matched account by id
        return rawArray.firstOrNull { elem ->
            elem.jsonObject["id"]?.jsonPrimitive?.contentOrNull == chosen.id
        }?.toString() ?: "null"
    }

    /**
     * Get the total debt from DebtItems (for net worth — separate from credit card balances).
     *
     * @param debtItemsJson JSON array of DebtItem objects.
     * @return Total debt balance as a Double.
     */
    fun computeTotalDebtFromItems(debtItemsJson: String): Double {
        val items = parseDebtItems(debtItemsJson)
        return LedgerAggregationUtils.round2(items.fold(0.0) { sum, d -> sum + d.balance })
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    private fun parseAccounts(accountsJson: String): List<Account> =
        json.decodeFromString<List<Account>>(accountsJson)

    private fun parseDebtItems(debtItemsJson: String): List<DebtItem> =
        json.decodeFromString<List<DebtItem>>(debtItemsJson)
}
