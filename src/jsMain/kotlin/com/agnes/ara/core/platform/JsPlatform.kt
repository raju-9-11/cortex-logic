package com.agnes.ara.core.platform

// JS platform entry point for Nexus Core
actual object Platform {
    actual val name: String = "JavaScript/Web"
}

actual fun generateUuid(): String = js("crypto.randomUUID()").unsafeCast<String>()
