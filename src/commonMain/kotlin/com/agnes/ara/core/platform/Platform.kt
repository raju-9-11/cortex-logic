package com.agnes.ara.core.platform

expect object Platform {
    val name: String
}

expect fun generateUuid(): String
