package com.agnes.nexus.core.platform

actual object Platform {
    actual val name: String = "Android"
}

actual fun generateUuid(): String = java.util.UUID.randomUUID().toString()
