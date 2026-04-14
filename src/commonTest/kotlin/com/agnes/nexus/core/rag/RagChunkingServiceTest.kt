package com.agnes.nexus.core.rag

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class RagChunkingServiceTest {

    // ── Empty / short input ─────────────────────────────────────────────────

    @Test
    fun chunk_emptyString_returnsEmpty() {
        val result = RagChunkingService.chunk("")
        assertTrue(result.isEmpty())
    }

    @Test
    fun chunk_whitespaceOnly_returnsEmpty() {
        val result = RagChunkingService.chunk("   \n\t  ")
        assertTrue(result.isEmpty())
    }

    @Test
    fun chunk_shortText_returnsSingleChunk() {
        val text = "Hello world."
        val result = RagChunkingService.chunk(text)
        assertEquals(1, result.size)
        assertEquals(0, result[0].index)
        assertEquals(text, result[0].text)
        assertEquals(0, result[0].startChar)
        assertEquals(text.length, result[0].endChar)
    }

    @Test
    fun chunk_exactlyChunkSize_returnsSingleChunk() {
        val text = "a".repeat(2000)
        val result = RagChunkingService.chunk(text)
        assertEquals(1, result.size)
        assertEquals(text, result[0].text)
    }

    // ── Multi-chunk splitting ───────────────────────────────────────────────

    @Test
    fun chunk_longText_producesMultipleChunks() {
        val sentence = "The quick brown fox jumps over the lazy dog. "
        val text = sentence.repeat(100) // ~4500 chars
        val result = RagChunkingService.chunk(text)
        assertTrue(result.size > 1, "Expected multiple chunks, got ${result.size}")
    }

    @Test
    fun chunk_indicesAreSequential() {
        val text = "A".repeat(5000)
        val result = RagChunkingService.chunk(text)
        result.forEachIndexed { i, chunk ->
            assertEquals(i, chunk.index, "Chunk index mismatch at position $i")
        }
    }

    @Test
    fun chunk_chunksHaveOverlap() {
        val config = ChunkingConfig(chunkSize = 500, chunkOverlap = 100, minChunkSize = 50)
        val text = "Word ".repeat(200) // 1000 chars
        val result = RagChunkingService.chunk(text, config)
        assertTrue(result.size >= 2)

        // Verify overlap: the start of chunk[1] should be before the end of chunk[0]
        for (i in 1 until result.size) {
            assertTrue(
                result[i].startChar < result[i - 1].endChar,
                "Expected overlap between chunk ${i - 1} (end=${result[i - 1].endChar}) " +
                    "and chunk $i (start=${result[i].startChar})"
            )
        }
    }

    @Test
    fun chunk_coversEntireText() {
        val text = "Sentence one. Sentence two. Sentence three. ".repeat(60)
        val result = RagChunkingService.chunk(text)

        // First chunk starts at 0
        assertEquals(0, result.first().startChar)
        // Last chunk ends at or near text length
        assertTrue(
            result.last().endChar >= text.trim().length - 10,
            "Last chunk endChar (${result.last().endChar}) should be near text length (${text.trim().length})"
        )
    }

    // ── Sentence boundary splitting ─────────────────────────────────────────

    @Test
    fun chunk_prefersSentenceBoundaries() {
        // Build text where a sentence boundary falls within the last 30% of chunkSize
        val filler = "a".repeat(1500)
        val text = "$filler. This is the second sentence. ${"b".repeat(1500)}"
        val result = RagChunkingService.chunk(text, ChunkingConfig(chunkSize = 2000, chunkOverlap = 200, minChunkSize = 100))

        assertTrue(result.size >= 2, "Expected at least 2 chunks")
        // First chunk should end at or near a sentence boundary (after the period)
        val firstChunkEndsWithPunctuation = result[0].text.trimEnd().let {
            it.endsWith(".") || it.endsWith("!") || it.endsWith("?")
        }
        assertTrue(firstChunkEndsWithPunctuation, "First chunk should end at a sentence boundary: '${result[0].text.takeLast(20)}'")
    }

    // ── Min chunk size merging ──────────────────────────────────────────────

    @Test
    fun chunk_mergesShortTrailingFragment() {
        // Create text where the last fragment would be very short
        val config = ChunkingConfig(chunkSize = 100, chunkOverlap = 10, minChunkSize = 50)
        val text = "a".repeat(120) // After first 100-char chunk, remaining 20 chars < minChunkSize
        val result = RagChunkingService.chunk(text, config)

        // Should NOT have a 20-char orphan chunk
        for (chunk in result) {
            assertTrue(
                chunk.text.length >= config.minChunkSize || result.size == 1,
                "Chunk too short (${chunk.text.length}): ${chunk.text.take(30)}"
            )
        }
    }

    // ── Custom config ───────────────────────────────────────────────────────

    @Test
    fun chunk_respectsCustomChunkSize() {
        val config = ChunkingConfig(chunkSize = 300, chunkOverlap = 50, minChunkSize = 30)
        val text = "Hello world. ".repeat(100)
        val result = RagChunkingService.chunk(text, config)

        // Each chunk should be at most chunkSize + some tolerance for boundary search
        for (chunk in result) {
            assertTrue(
                chunk.text.length <= config.chunkSize + 50,
                "Chunk too large (${chunk.text.length}): ${chunk.text.take(30)}..."
            )
        }
    }

    @Test
    fun chunk_defaultConfig_uses2000ChunkSize() {
        val config = ChunkingConfig()
        assertEquals(2000, config.chunkSize)
        assertEquals(400, config.chunkOverlap)
        assertEquals(200, config.minChunkSize)
    }

    // ── Paragraph boundary splitting ────────────────────────────────────────

    @Test
    fun chunk_prefersParagraphBoundaries() {
        val para1 = "First paragraph content. ".repeat(30) // ~750 chars
        val para2 = "Second paragraph content. ".repeat(30)
        val text = "$para1\n\n$para2"
        val config = ChunkingConfig(chunkSize = 1000, chunkOverlap = 100, minChunkSize = 50)
        val result = RagChunkingService.chunk(text, config)

        assertTrue(result.size >= 2, "Expected at least 2 chunks")
        // The split should occur at or near the paragraph boundary
        val firstChunkText = result[0].text
        assertTrue(
            firstChunkText.contains("First paragraph") && !firstChunkText.contains("Second paragraph"),
            "First chunk should primarily contain first paragraph content"
        )
    }
}
