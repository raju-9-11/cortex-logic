package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.actions.ActionHub
import com.agnes.nexus.core.domain.models.ActionCall
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put

/**
 * Document Ingestion Service - Handles multi-modal extraction.
 * Routes extracted text to the appropriate module via ActionHub.
 */
class DocumentIngestionService(
    private val actionHub: ActionHub
) {
    /**
     * Processes a document and delegates its analysis to a target module.
     * 
     * @param rawText The extracted OCR/PDF text.
     * @param targetModule e.g., "ledger" for receipts, "scout" for research.
     */
    suspend fun processDocument(rawText: String, targetModule: String, contextNote: String = "") {
        // Construct a delegation action that forces the target module to analyze the text.
        val payload = buildJsonObject {
            put("target", targetModule)
            put("instruction", "Analyze the following document context: $contextNote")
            put("content", rawText)
        }

        val delegationAction = ActionCall(
            type = "delegate_to_module",
            payload = payload,
            userId = null,
            moduleId = "orchestrator",
            encryptionKey = null
        )

        actionHub.execute(delegationAction)
    }
}
