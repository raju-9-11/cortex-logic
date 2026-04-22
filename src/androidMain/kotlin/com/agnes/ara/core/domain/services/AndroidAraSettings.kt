package com.agnes.ara.core.domain.services

import android.content.SharedPreferences

/**
 * Android implementation of AraSettings using SharedPreferences.
 */
class AndroidAraSettings(
    private val prefs: SharedPreferences
) : AraSettings {
    override fun getInt(key: String, defaultValue: Int): Int = prefs.getInt(key, defaultValue)
    override fun putInt(key: String, value: Int) = prefs.edit().putInt(key, value).apply()

    override fun getString(key: String, defaultValue: String?): String? = prefs.getString(key, defaultValue)
    override fun putString(key: String, value: String?) = prefs.edit().putString(key, value).apply()

    override fun getBoolean(key: String, defaultValue: Boolean): Boolean = prefs.getBoolean(key, defaultValue)
    override fun putBoolean(key: String, value: Boolean) = prefs.edit().putBoolean(key, value).apply()

    override fun remove(key: String) = prefs.edit().remove(key).apply()
    override fun contains(key: String): Boolean = prefs.contains(key)
}
