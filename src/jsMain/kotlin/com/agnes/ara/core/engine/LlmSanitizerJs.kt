package com.agnes.ara.core.engine

/**
 * JS-export facade for LlmSanitizer.
 * Wraps List<> return types into Array<> for JS interop.
 */
@JsExport
class LlmSanitizerJs {
    private val inner = LlmSanitizer()

    fun sanitize(content: String, retainSpacings: Boolean = false): SanitizedResult =
        inner.sanitize(content, retainSpacings)

    fun parseMutations(content: String): Array<ExtractedMutation> =
        inner.parseMutations(content).toTypedArray()

    fun sanitizeJsonPayload(content: String): String =
        inner.sanitizeJsonPayload(content)

    fun stripPartialLeadingTag(text: String): String =
        inner.stripPartialLeadingTag(text)

    fun stripMutationTags(content: String): String =
        inner.stripMutationTags(content)

    fun stripProviderControlTokens(content: String): String =
        inner.stripProviderControlTokens(content)

    fun isProviderControlOnly(content: String): Boolean =
        inner.isProviderControlOnly(content)

    fun stripTechnicalFiller(text: String): String =
        inner.stripTechnicalFiller(text)
}
