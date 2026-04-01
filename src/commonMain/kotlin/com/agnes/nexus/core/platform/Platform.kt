package com.agnes.nexus.core.platform

expect object Platform {
    val name: String
}

expect fun generateUuid(): String
