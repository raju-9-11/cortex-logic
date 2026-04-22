package com.agnes.ara.core.domain.services

/**
 * JS/Web implementation of [AraSettings] backed by [kotlinx.browser.localStorage].
 *
 * Provides the same key-value persistence contract as [AndroidAraSettings]
 * (SharedPreferences), using the browser's localStorage as the storage engine.
 *
 * Storage format:
 * - Integers and booleans are stored as their string representation (`toString()`).
 * - Null strings are represented by the absence of the key (item removed on `putString(null)`).
 * - All keys are stored as-is with no namespace prefix — callers should namespace their
 *   own keys to avoid collisions with non-Ara localStorage entries.
 *
 * Limitations:
 * - localStorage is synchronous and blocks the JS event loop for large payloads.
 * - Storage is limited to ~5 MB per origin in most browsers.
 * - Data is not encrypted at rest — avoid storing sensitive material directly.
 *   Use [VaultKeyManager] for key material.
 */
class JsAraSettings : AraSettings {

    override fun getInt(key: String, defaultValue: Int): Int =
        kotlinx.browser.localStorage.getItem(key)?.toIntOrNull() ?: defaultValue

    override fun putInt(key: String, value: Int) {
        kotlinx.browser.localStorage.setItem(key, value.toString())
    }

    override fun getString(key: String, defaultValue: String?): String? =
        kotlinx.browser.localStorage.getItem(key) ?: defaultValue

    override fun putString(key: String, value: String?) {
        if (value == null) {
            kotlinx.browser.localStorage.removeItem(key)
        } else {
            kotlinx.browser.localStorage.setItem(key, value)
        }
    }

    override fun getBoolean(key: String, defaultValue: Boolean): Boolean =
        kotlinx.browser.localStorage.getItem(key)?.toBooleanStrictOrNull() ?: defaultValue

    override fun putBoolean(key: String, value: Boolean) {
        kotlinx.browser.localStorage.setItem(key, value.toString())
    }

    override fun remove(key: String) {
        kotlinx.browser.localStorage.removeItem(key)
    }

    override fun contains(key: String): Boolean =
        kotlinx.browser.localStorage.getItem(key) != null
}
