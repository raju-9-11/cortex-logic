package com.agnes.ara.core.engine

import com.agnes.ara.core.domain.service.DocumentFieldExtractor
import kotlin.js.JsExport

/**
 * JS/TS facade for [DocumentFieldExtractor].
 * All methods accept/return JSON strings at the boundary.
 */
@JsExport
class DocumentFieldExtractorJs {

    /** Extract receipt fields (total, date, merchant, items) as JSON object string. */
    fun extractReceiptFields(text: String): String = DocumentFieldExtractor.extractReceiptFields(text)

    /** Extract invoice fields (invoice_number, due_date, vendor, amount) as JSON object string. */
    fun extractInvoiceFields(text: String): String = DocumentFieldExtractor.extractInvoiceFields(text)

    /** Extract lab report fields (test_name, value, unit, reference_range, date) as JSON object string. */
    fun extractLabReportFields(text: String): String = DocumentFieldExtractor.extractLabReportFields(text)

    /** Extract general fields (title, date) as JSON object string. */
    fun extractGeneralFields(text: String): String = DocumentFieldExtractor.extractGeneralFields(text)

    /**
     * Build an LLM extraction prompt for the given domain and raw document text.
     * @param domain     One of: "receipt", "invoice", "lab_report", "general".
     * @param rawText    Extracted document text.
     * @param currency   Optional ISO 4217 currency code.
     * @param locale     Optional BCP 47 locale tag.
     */
    fun buildExtractionPrompt(
        domain: String,
        rawText: String,
        currency: String? = null,
        locale: String? = null,
    ): String = DocumentFieldExtractor.buildExtractionPrompt(domain, rawText, currency, locale)
}
