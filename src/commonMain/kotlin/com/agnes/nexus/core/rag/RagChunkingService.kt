package com.agnes.nexus.core.rag

import kotlinx.serialization.Serializable

/**
 * Configuration for text chunking.
 *
 * @param chunkSize Target chunk size in characters (~4 chars per token).
 * @param chunkOverlap Number of characters overlapping between adjacent chunks.
 * @param minChunkSize Minimum chunk size; chunks shorter than this are merged with the previous one.
 */
@Serializable
data class ChunkingConfig(
    val chunkSize: Int = 2000,
    val chunkOverlap: Int = 400,
    val minChunkSize: Int = 200
)

/**
 * A single chunk of text produced by [RagChunkingService].
 *
 * @param index Zero-based position of this chunk in the original document.
 * @param text The chunk text content.
 * @param startChar Character offset in the source text where this chunk begins.
 * @param endChar Character offset in the source text where this chunk ends (exclusive).
 */
@Serializable
data class TextChunk(
    val index: Int,
    val text: String,
    val startChar: Int,
    val endChar: Int,
)

/**
 * Pure-computation chunking service. No I/O — all Firestore / embedding
 * calls happen in the platform layer (Agnes TS or Android).
 *
 * Strategy: sentence-boundary-aware sliding window with configurable overlap.
 * Prefers splitting on sentence boundaries (. ! ? newline) when possible,
 * falling back to word boundaries, then hard character split.
 *
 * TODO-LATER: Semantic chunking using embedding similarity between sentences.
 */
object RagChunkingService {

    /**
     * Split [text] into overlapping chunks according to [config].
     * Returns an empty list for blank / whitespace-only input.
     */
    fun chunk(text: String, config: ChunkingConfig = ChunkingConfig()): List<TextChunk> {
        val trimmed = text.trim()
        if (trimmed.isEmpty()) return emptyList()

        // If the whole text fits in one chunk, return as-is
        if (trimmed.length <= config.chunkSize) {
            return listOf(TextChunk(index = 0, text = trimmed, startChar = 0, endChar = trimmed.length))
        }

        val chunks = mutableListOf<TextChunk>()
        var cursor = 0

        while (cursor < trimmed.length) {
            val end = minOf(cursor + config.chunkSize, trimmed.length)
            val candidateEnd = if (end < trimmed.length) {
                findSplitPoint(trimmed, cursor, end)
            } else {
                end
            }

            val chunkText = trimmed.substring(cursor, candidateEnd).trim()

            if (chunkText.length >= config.minChunkSize || chunks.isEmpty()) {
                chunks.add(
                    TextChunk(
                        index = chunks.size,
                        text = chunkText,
                        startChar = cursor,
                        endChar = candidateEnd,
                    )
                )
            } else if (chunks.isNotEmpty()) {
                // Merge short trailing fragment into last chunk
                val last = chunks.removeAt(chunks.lastIndex)
                val merged = trimmed.substring(last.startChar, candidateEnd).trim()
                chunks.add(last.copy(text = merged, endChar = candidateEnd))
            }

            // Advance cursor by chunkSize minus overlap
            val step = candidateEnd - cursor - config.chunkOverlap
            cursor += if (step > 0) step else (candidateEnd - cursor)
        }

        return chunks
    }

    // ------------------------------------------------------------------
    // Internal helpers
    // ------------------------------------------------------------------

    /**
     * Find the best split point within [start, end) preferring sentence
     * boundaries, then paragraph boundaries, then word boundaries.
     * Searches backwards from [end] to preserve maximum chunk size.
     */
    private fun findSplitPoint(text: String, start: Int, end: Int): Int {
        // Search window: only look in the last 30% of the chunk for a split
        val searchStart = start + ((end - start) * 7 / 10)

        // 1. Prefer paragraph break (double newline)
        val paraBreak = text.lastIndexOf("\n\n", end - 1)
        if (paraBreak >= searchStart) return paraBreak + 2 // include the newlines

        // 2. Prefer sentence-ending punctuation followed by whitespace
        for (i in (end - 1) downTo searchStart) {
            val ch = text[i]
            if ((ch == '.' || ch == '!' || ch == '?') && i + 1 < text.length && text[i + 1].isWhitespace()) {
                return i + 1 // split after the punctuation
            }
        }

        // 3. Prefer single newline
        val newline = text.lastIndexOf('\n', end - 1)
        if (newline >= searchStart) return newline + 1

        // 4. Prefer word boundary (space)
        val space = text.lastIndexOf(' ', end - 1)
        if (space >= searchStart) return space + 1

        // 5. Hard split at end
        return end
    }
}
