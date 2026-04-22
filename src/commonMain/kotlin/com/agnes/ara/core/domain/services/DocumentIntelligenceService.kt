package com.agnes.ara.core.domain.services

import com.agnes.ara.core.domain.actions.ActionHub
import com.agnes.ara.core.domain.models.ActionCall
import kotlinx.datetime.Clock
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.json.put

@Serializable
data class DocumentAnalysisResult(
    val summary: String,
    val keyTopics: List<String> = emptyList(),
    val confidence: Double = 0.5
)

@Serializable
enum class DocumentDomain {
    RECEIPT,
    INVOICE,
    LAB_REPORT,
    GENERAL
}

@Serializable
data class DocumentParseHints(
    val domain: DocumentDomain,
    val moduleId: String,
    val currency: String? = null,
    val locale: String? = null
)

@Serializable
data class DocumentParseResult(
    val type: DocumentDomain,
    val fields: Map<String, String>,
    val rawText: String,
    val confidence: Double,
    val pageCount: Int,
    val fileSizeBytes: Long,
    val parsedAt: String,
    val moduleId: String
)

/**
 * Lightweight document analysis orchestrator.
 * Platform is responsible for OCR + model inference; this class routes results.
 */
class DocumentAnalysisService {
    fun analyze(rawText: String, contextNote: String = ""): DocumentAnalysisResult {
        val trimmed = rawText.trim()
        val summary = if (trimmed.length <= 280) trimmed else trimmed.take(280) + "..."
        val topics = contextNote.split(',').map { it.trim() }.filter { it.isNotBlank() }
        return DocumentAnalysisResult(summary = summary, keyTopics = topics)
    }
}

class DocumentContextInjectionService {
    fun buildContext(rawText: String, contextNote: String = ""): String {
        val note = if (contextNote.isBlank()) "" else "Context: $contextNote\n"
        return "${note}Document:\n${rawText.trim()}".trim()
    }
}

class DocumentIntelligenceService(
    private val analysisService: DocumentAnalysisService,
    private val actionHub: ActionHub,
    private val json: Json = Json { ignoreUnknownKeys = true }
) {
    suspend fun ingest(rawText: String, targetModule: String, contextNote: String = "") {
        val analysis = analysisService.analyze(rawText, contextNote)
        val payload = buildJsonObject {
            put("target", targetModule)
            put("instruction", "Analyze the document with summary: ${analysis.summary}")
            put("content", rawText)
        }
        actionHub.execute(
            ActionCall(
                type = "delegate_to_module",
                payload = payload,
                userId = null,
                moduleId = "orchestrator",
                encryptionKey = null
            )
        )
    }

    /**
     * Parse document raw text with regex extraction, optional LLM extraction.
     */
    suspend fun parseDocument(
        rawText: String,
        hints: DocumentParseHints,
        llmExtractor: (suspend (prompt: String) -> String)? = null,
        pageCount: Int = 1,
        fileSizeBytes: Long = rawText.length.toLong()
    ): DocumentParseResult {
        val cleaned = rawText.trim()
        val regexFields = extractFieldsByRegex(cleaned, hints.domain)

        val llmFields = if (llmExtractor != null) {
            runCatching {
                val prompt = buildExtractionPrompt(cleaned, hints)
                parseLlmResponse(llmExtractor(prompt))
            }.getOrDefault(emptyMap())
        } else {
            emptyMap()
        }

        val fields = (regexFields + llmFields).filterValues { it.isNotBlank() }
        val confidence = if (fields.isEmpty()) 0.35 else 0.65.coerceAtMost(0.45 + fields.size * 0.05)

        return DocumentParseResult(
            type = hints.domain,
            fields = fields,
            rawText = cleaned,
            confidence = confidence,
            pageCount = pageCount,
            fileSizeBytes = fileSizeBytes,
            parsedAt = Clock.System.now().toString(),
            moduleId = hints.moduleId
        )
    }

    private fun buildExtractionPrompt(rawText: String, hints: DocumentParseHints): String {
        val fields = when (hints.domain) {
            DocumentDomain.RECEIPT -> listOf("total", "date", "merchant", "items[]", "tax", "currency")
            DocumentDomain.INVOICE -> listOf("invoice_number", "due_date", "vendor", "line_items[]", "subtotal", "tax", "total")
            DocumentDomain.LAB_REPORT -> listOf("test_name", "result_value", "reference_range", "units", "date", "lab_name")
            DocumentDomain.GENERAL -> listOf("title", "date", "author", "key_points[]")
        }
        return """
            You are a document field extractor.
            Extract the following fields as JSON:
            ${fields.joinToString(", ")}
            Document:
            $rawText
        """.trimIndent()
    }

    private fun parseLlmResponse(raw: String): Map<String, String> {
        return runCatching {
            val element = json.parseToJsonElement(raw).jsonObject
            element.mapValues { (_, value) ->
                when {
                    value is kotlinx.serialization.json.JsonPrimitive -> value.content
                    else -> value.toString()
                }
            }
        }.getOrDefault(emptyMap())
    }

    private fun extractFieldsByRegex(text: String, domain: DocumentDomain): Map<String, String> {
        return when (domain) {
            DocumentDomain.RECEIPT -> extractReceiptFields(text)
            DocumentDomain.INVOICE -> extractInvoiceFields(text)
            DocumentDomain.LAB_REPORT -> extractLabReportFields(text)
            DocumentDomain.GENERAL -> extractGeneralFields(text)
        }
    }

    private fun first(re: Regex, text: String): String {
        val match = re.find(text) ?: return ""
        return match.groupValues.drop(1).firstOrNull { it.isNotBlank() }?.trim() ?: ""
    }

    private fun extractReceiptFields(text: String): Map<String, String> {
        val totalRe = Regex("(?:total|amount due|grand total|balance due|total amount)[:\\s]*\\$?\\s*([0-9,]+\\.[0-9]{2})", RegexOption.IGNORE_CASE)
        val merchantRe = Regex("^([A-Z][A-Za-z0-9 &'.,\\-]{2,59})$", RegexOption.MULTILINE)
        val dateRe = Regex("(?:date|dated?|on)[:\\s]*([0-9]{1,2}[\\/\\-\\.][0-9]{1,2}[\\/\\-\\.][0-9]{2,4})|([0-9]{4}-[0-9]{2}-[0-9]{2})", RegexOption.IGNORE_CASE)
        return mapOf(
            "total" to first(totalRe, text),
            "date" to first(dateRe, text),
            "merchant" to first(merchantRe, text)
        )
    }

    private fun extractInvoiceFields(text: String): Map<String, String> {
        val invoiceNumRe = Regex("invoice\\s*(?:no\\.?|number|#)[:\\s]*([A-Za-z0-9\\-]+)", RegexOption.IGNORE_CASE)
        val dueDateRe = Regex("(?:due\\s*date|payment\\s*due)[:\\s]*([0-9]{1,2}[\\/\\-][0-9]{1,2}[\\/\\-][0-9]{2,4})", RegexOption.IGNORE_CASE)
        val vendorRe = Regex("(?:from|vendor|billed\\s*by|seller)[:\\s]*([A-Za-z][A-Za-z0-9 .,\\-]{2,59})", RegexOption.IGNORE_CASE)
        val amountRe = Regex("(?:amount\\s*due|total\\s*due|balance\\s*due|total)[:\\s]*\\$?\\s*([0-9,]+\\.[0-9]{2})", RegexOption.IGNORE_CASE)
        return mapOf(
            "invoice_number" to first(invoiceNumRe, text),
            "due_date" to first(dueDateRe, text),
            "vendor" to first(vendorRe, text),
            "amount" to first(amountRe, text)
        )
    }

    private fun extractLabReportFields(text: String): Map<String, String> {
        val testRe = Regex("(?:test|examination|assay)[:\\s]*([A-Za-z][A-Za-z0-9 \\-()]{2,59})", RegexOption.IGNORE_CASE)
        val valueRe = Regex("(?:result|value|level)[:\\s]*([0-9]+(?:\\.[0-9]+)?)\\s*([A-Za-z/%µ]+)?", RegexOption.IGNORE_CASE)
        val rangeRe = Regex("(?:reference\\s*range|normal\\s*range|ref\\.?\\s*range)[:\\s]*([0-9.,\\s\\-–—]+(?:[A-Za-z/%µ]*))", RegexOption.IGNORE_CASE)
        val dateRe = Regex("(?:date|dated?|on)[:\\s]*([0-9]{1,2}[\\/\\-\\.][0-9]{1,2}[\\/\\-\\.][0-9]{2,4})|([0-9]{4}-[0-9]{2}-[0-9]{2})", RegexOption.IGNORE_CASE)

        val valueMatch = valueRe.find(text)
        val value = valueMatch?.groupValues?.getOrNull(1) ?: ""
        val unit = valueMatch?.groupValues?.getOrNull(2) ?: ""

        return mapOf(
            "test_name" to first(testRe, text),
            "value" to value,
            "unit" to unit,
            "reference_range" to first(rangeRe, text),
            "date" to first(dateRe, text)
        )
    }

    private fun extractGeneralFields(text: String): Map<String, String> {
        val firstLine = text.lineSequence().firstOrNull { it.trim().length > 3 }?.trim().orEmpty()
        val dateRe = Regex("(?:date|dated?|on)[:\\s]*([0-9]{1,2}[\\/\\-\\.][0-9]{1,2}[\\/\\-\\.][0-9]{2,4})|([0-9]{4}-[0-9]{2}-[0-9]{2})", RegexOption.IGNORE_CASE)
        val title = if (firstLine.length > 100) firstLine.take(100) + "…" else firstLine
        return mapOf(
            "title" to title,
            "date" to first(dateRe, text)
        )
    }
}
