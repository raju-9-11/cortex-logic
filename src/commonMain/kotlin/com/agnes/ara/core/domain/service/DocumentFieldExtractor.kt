package com.agnes.ara.core.domain.service

import kotlinx.serialization.json.*

/**
 * Platform-agnostic document field extraction using regex patterns.
 *
 * Ported from document-intelligence-service.ts (Agnes Web).
 * Returns extracted fields as JSON strings so they cross the KMP/JS boundary cleanly.
 *
 * Browser-dependent parts (pdfjs-dist, File API, LLM callbacks) remain in TS.
 */
object DocumentFieldExtractor {

    // ── Shared regex patterns ─────────────────────────────────────────────────

    private val DATE_RE = Regex(
        """(?:date|dated?|on)[:\s]*([0-9]{1,2}[/\-.][0-9]{1,2}[/\-.][0-9]{2,4})|([0-9]{4}-[0-9]{2}-[0-9]{2})""",
        RegexOption.IGNORE_CASE,
    )
    private val MONEY_RE = Regex("""\$?([0-9]{1,3}(?:[,\s][0-9]{3})*(?:\.[0-9]{2})?)""")

    /** Returns the first non-blank group at or after [group] index in [re] applied to [text]. */
    private fun first(re: Regex, text: String, group: Int = 1): String {
        val m = re.find(text) ?: return ""
        for (i in group until m.groupValues.size) {
            val v = m.groupValues[i].trim()
            if (v.isNotEmpty()) return v
        }
        return ""
    }

    // ── Domain extractors ─────────────────────────────────────────────────────

    /**
     * Extract fields from a receipt text: total, date, merchant, items.
     * @return JSON object string: {"total":"…","date":"…","merchant":"…","items":"…"}
     */
    fun extractReceiptFields(text: String): String {
        val totalRe = Regex(
            """(?:total|amount due|grand total|balance due|total amount)[:\s]*\$?\s*([0-9,]+\.[0-9]{2})""",
            RegexOption.IGNORE_CASE,
        )
        val merchantRe = Regex("""^([A-Z][A-Za-z0-9 &'.,-]{2,59})$""", RegexOption.MULTILINE)
        val itemsRe = Regex(
            """^([A-Za-z][A-Za-z0-9 &'. -]{1,39})\s{2,}\$?\s*([0-9]+\.[0-9]{2})$""",
            setOf(RegexOption.MULTILINE),
        )

        val items = mutableListOf<String>()
        for (m in itemsRe.findAll(text)) {
            items.add("${m.groupValues[1].trim()}:${m.groupValues[2].trim()}")
            if (items.size >= 10) break
        }

        return buildJsonObject {
            put("total", first(totalRe, text))
            put("date", first(DATE_RE, text))
            put("merchant", first(merchantRe, text))
            if (items.isNotEmpty()) put("items", items.joinToString(", "))
        }.toString()
    }

    /**
     * Extract fields from an invoice text: invoice_number, due_date, vendor, amount.
     * @return JSON object string.
     */
    fun extractInvoiceFields(text: String): String {
        val invoiceNumRe = Regex("""invoice\s*(?:no\.?|number|#)[:\s]*([A-Za-z0-9-]+)""", RegexOption.IGNORE_CASE)
        val dueDateRe = Regex("""(?:due\s*date|payment\s*due)[:\s]*([0-9]{1,2}[/-][0-9]{1,2}[/-][0-9]{2,4})""", RegexOption.IGNORE_CASE)
        val vendorRe = Regex("""(?:from|vendor|billed\s*by|seller)[:\s]*([A-Za-z][A-Za-z0-9 .,-]{2,59})""", RegexOption.IGNORE_CASE)
        val amountRe = Regex("""(?:amount\s*due|total\s*due|balance\s*due|total)[:\s]*\$?\s*([0-9,]+\.[0-9]{2})""", RegexOption.IGNORE_CASE)

        val amount = first(amountRe, text).ifEmpty { first(MONEY_RE, text) }
        return buildJsonObject {
            put("invoice_number", first(invoiceNumRe, text))
            put("due_date", first(dueDateRe, text))
            put("vendor", first(vendorRe, text))
            put("amount", amount)
        }.toString()
    }

    /**
     * Extract fields from a lab report text: test_name, value, unit, reference_range, date.
     * @return JSON object string.
     */
    fun extractLabReportFields(text: String): String {
        val testRe = Regex("""(?:test|examination|assay)[:\s]*([A-Za-z][A-Za-z0-9 -()]{2,59})""", RegexOption.IGNORE_CASE)
        val valueRe = Regex("""(?:result|value|level)[:\s]*([0-9]+(?:\.[0-9]+)?)\s*([A-Za-z/%µ]+)?""", RegexOption.IGNORE_CASE)
        val rangeRe = Regex("""(?:reference\s*range|normal\s*range|ref\.?\s*range)[:\s]*([0-9.,\s\-–—]+(?:[A-Za-z/%µ]*))""", RegexOption.IGNORE_CASE)

        val valueMatch = valueRe.find(text)
        return buildJsonObject {
            put("test_name", first(testRe, text))
            put("value", valueMatch?.groupValues?.getOrNull(1) ?: "")
            put("unit", valueMatch?.groupValues?.getOrNull(2) ?: "")
            put("reference_range", first(rangeRe, text))
            put("date", first(DATE_RE, text))
        }.toString()
    }

    /**
     * Extract general fields from arbitrary text: title (first non-empty line), date.
     * @return JSON object string.
     */
    fun extractGeneralFields(text: String): String {
        val firstLine = text.lineSequence().firstOrNull { it.trim().length > 3 }?.trim() ?: ""
        val title = if (firstLine.length > 100) firstLine.take(100) + "…" else firstLine
        return buildJsonObject {
            put("title", title)
            put("date", first(DATE_RE, text))
        }.toString()
    }

    // ── Domain field hints ────────────────────────────────────────────────────

    private val DOMAIN_FIELD_HINTS = mapOf(
        "receipt"    to listOf("total", "date", "merchant", "items[]", "tax", "currency"),
        "invoice"    to listOf("invoice_number", "due_date", "vendor", "line_items[]", "subtotal", "tax", "total"),
        "lab_report" to listOf("test_name", "result_value", "reference_range", "units", "date", "lab_name"),
        "general"    to listOf("title", "date", "author", "key_points[]"),
    )

    /**
     * Build an LLM extraction prompt for the given domain and raw text.
     * @param domain One of: "receipt", "invoice", "lab_report", "general".
     * @param rawText Extracted document text.
     * @param currency Optional ISO 4217 currency hint (e.g. "USD").
     * @param locale   Optional BCP 47 locale hint (e.g. "en-US").
     * @return Formatted extraction prompt string.
     */
    fun buildExtractionPrompt(
        domain: String,
        rawText: String,
        currency: String? = null,
        locale: String? = null,
    ): String {
        val fields = (DOMAIN_FIELD_HINTS[domain] ?: DOMAIN_FIELD_HINTS["general"]!!).joinToString(", ")
        val extras = buildList {
            if (!currency.isNullOrBlank()) add("Currency: $currency")
            if (!locale.isNullOrBlank()) add("Locale: $locale")
        }
        val extraLine = if (extras.isNotEmpty()) " ${extras.joinToString(". ")}." else ""

        return buildString {
            append("You are a document field extractor. Extract structured data from the document below.\n")
            append("Domain: $domain.$extraLine\n")
            append("Focus on these fields: $fields.\n\n")
            append("Respond with ONLY a valid JSON array — no prose, no markdown fences:\n")
            append("""[{"key":"field_name","value":"extracted_value","confidence":0.95}]""")
            append("\n\nConfidence is a number 0–1 reflecting how certain you are of the extracted value.\n\n")
            append("---BEGIN DOCUMENT---\n$rawText\n---END DOCUMENT---")
        }
    }
}
