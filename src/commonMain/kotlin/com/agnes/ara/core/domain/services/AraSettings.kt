package com.agnes.ara.core.domain.services

/**
 * Ara Settings - KMP abstraction for simple key-value persistence.
 * Mirrors the behavior of SharedPreferences/localStorage.
 */
interface AraSettings {
    fun getInt(key: String, defaultValue: Int): Int
    fun putInt(key: String, value: Int)
    
    fun getString(key: String, defaultValue: String?): String?
    fun putString(key: String, value: String?)
    
    fun getBoolean(key: String, defaultValue: Boolean): Boolean
    fun putBoolean(key: String, value: Boolean)
    
    fun remove(key: String)
    fun contains(key: String): Boolean
}
