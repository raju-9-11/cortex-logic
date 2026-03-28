group = "com.agnes.nexus"
version = "1.0.0"

plugins {
    alias(libs.plugins.android.library)
    alias(libs.plugins.kotlin.multiplatform)
    alias(libs.plugins.kotlin.serialization)
    alias(libs.plugins.sqldelight)
}

kotlin {
    androidTarget {
        compilerOptions {
            jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17)
        }
    }

    js(IR) {
        browser()
    }

    sourceSets {
        val commonMain by getting {
            dependencies {
                implementation(libs.coroutines.core)
                implementation(libs.kotlin.serialization)
                implementation(libs.kotlinx.datetime)
                implementation(libs.sqldelight.runtime)
                implementation(libs.sqldelight.coroutines.extensions)
                implementation(libs.bundles.ktor.common)
                implementation(libs.koin.core)
            }
        }
        val commonTest by getting {
            dependencies {
                implementation(kotlin("test"))
                implementation(libs.coroutines.test)
            }
        }
        val androidMain by getting {
            dependencies {
                implementation(libs.android.crypto)
                implementation(libs.sqldelight.android.driver)
                implementation(libs.ktor.client.okhttp)
            }
        }
        val jsMain by getting {
            dependencies {
                implementation(libs.sqldelight.js.driver)
                implementation(libs.ktor.client.js)
            }
        }
    }
}

sqldelight {
    databases {
        create("NexusDatabase") {
            packageName.set("com.agnes.nexus.core.db")
            srcDirs("src/commonMain/sqldelight")
        }
    }
}

android {
    namespace = "com.agnes.nexus.cortex"
    compileSdk = 35
    defaultConfig {
        minSdk = 26
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}
