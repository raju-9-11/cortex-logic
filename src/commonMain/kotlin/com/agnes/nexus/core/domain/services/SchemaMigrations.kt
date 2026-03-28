package com.agnes.nexus.core.domain.services

import com.agnes.nexus.core.domain.models.FieldSchema
import kotlinx.datetime.Clock
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put

object SchemaMigrations {
    private fun touch(schema: FieldSchema): FieldSchema {
        val meta = schema.metadata ?: buildJsonObject { }
        val updated = buildJsonObject {
            meta.forEach { (k, v) -> put(k, v) }
            put("updatedAt", Clock.System.now().toEpochMilliseconds())
        }
        return schema.copy(metadata = updated)
    }

    val therapy: List<SchemaMigration> = listOf(
        SchemaMigration(
            from = "1.0.0",
            to = "1.1.0",
            up = { touch(it.copy(version = "1.1.0")) },
            down = { touch(it.copy(version = "1.0.0")) }
        )
    )

    val trainer: List<SchemaMigration> = listOf(
        SchemaMigration(
            from = "1.0.0",
            to = "1.1.0",
            up = { touch(it.copy(version = "1.1.0")) },
            down = { touch(it.copy(version = "1.0.0")) }
        )
    )

    val ledger: List<SchemaMigration> = listOf(
        SchemaMigration(
            from = "1.0.0",
            to = "1.1.0",
            up = { touch(it.copy(version = "1.1.0")) },
            down = { touch(it.copy(version = "1.0.0")) }
        )
    )

    val soma: List<SchemaMigration> = listOf(
        SchemaMigration(
            from = "1.0.0",
            to = "1.1.0",
            up = { touch(it.copy(version = "1.1.0")) },
            down = { touch(it.copy(version = "1.0.0")) }
        )
    )

    val atlas: List<SchemaMigration> = listOf(
        SchemaMigration(
            from = "1.0.0",
            to = "1.1.0",
            up = { touch(it.copy(version = "1.1.0")) },
            down = { touch(it.copy(version = "1.0.0")) }
        )
    )
}
