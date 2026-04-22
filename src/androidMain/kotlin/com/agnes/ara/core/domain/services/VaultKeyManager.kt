package com.agnes.ara.core.domain.services

import android.content.Context
import android.content.SharedPreferences
import android.util.Base64
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

/**
 * Android implementation using EncryptedSharedPreferences + MasterKey (AES256_GCM).
 * Purpose: securely cache symmetric key material for vault operations.
 */
actual class VaultKeyManager actual constructor(
    context: PlatformContext
) {
    private val appContext: Context = context as Context
    private val prefs: SharedPreferences by lazy {
        val masterKey = MasterKey.Builder(appContext)
            .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
            .build()

        EncryptedSharedPreferences.create(
            appContext,
            "nexus_vault_keys",
            masterKey,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        )
    }

    actual suspend fun storeKey(keyAlias: String, keyData: ByteArray) = withContext(Dispatchers.IO) {
        prefs.edit().putString(keyAlias, Base64.encodeToString(keyData, Base64.NO_WRAP)).apply()
    }

    actual suspend fun retrieveKey(keyAlias: String): ByteArray? = withContext(Dispatchers.IO) {
        prefs.getString(keyAlias, null)?.let { Base64.decode(it, Base64.NO_WRAP) }
    }

    actual suspend fun clearKey(keyAlias: String) = withContext(Dispatchers.IO) {
        prefs.edit().remove(keyAlias).apply()
    }
}
