package com.agnes.ara.core.engine

import com.agnes.ara.core.rag.ChunkingConfig
import com.agnes.ara.core.rag.RagChunkingService
import kotlinx.serialization.json.Json
import kotlinx.serialization.encodeToString

/**
 * JS-exported wrapper for [RagChunkingService].
 *
 * Input/output uses JSON strings to cross the Kotlin/JS boundary cleanly.
 * The TypeScript side deserializes the result into typed chunk objects.
 */
@JsExport
class RagChunkingServiceJs {

    /**
     * Split [text] into overlapping chunks.
     *
     * @param text The raw document text to chunk.
     * @param chunkSize Target chunk size in characters (default 2000, ~500 tokens).
     * @param chunkOverlap Overlap between adjacent chunks in characters (default 400, ~100 tokens).
     * @param minChunkSize Minimum chunk size; shorter fragments merge into the previous chunk (default 200).
     * @return JSON array of chunk objects: `[{ index, text, startChar, endChar }]`
     */
    fun chunkText(
        text: String,
        chunkSize: Int = 2000,
        chunkOverlap: Int = 400,
        minChunkSize: Int = 200,
    ): String {
        val config = ChunkingConfig(
            chunkSize = chunkSize,
            chunkOverlap = chunkOverlap,
            minChunkSize = minChunkSize,
        )
        val chunks = RagChunkingService.chunk(text, config)
        return Json.encodeToString(chunks)
    }
}
