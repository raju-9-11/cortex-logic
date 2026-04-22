package com.agnes.ara.core.domain.services

import com.agnes.ara.core.domain.models.*
import kotlinx.datetime.Clock
import kotlinx.datetime.Instant
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime

/**
 * Maintenance service for cleaning up and optimizing user schemas.
 * Identifies stale custom fields and proposes them for archiving.
 */
class SchemaMaintenanceService(
    private val fieldProposalService: FieldProposalService,
    private val spineEventBus: SpineEventBus
) {
    /**
     * Scans all custom extensions across all modules and proposes archiving
     * for fields that haven't been accessed in [thresholdDays].
     */
    fun performCleanupScan(
        moduleIdList: List<String>,
        profileGetter: (moduleId: String) -> ModuleProfileExtensibility?,
        thresholdDays: Int = 30
    ) {
        val now = Clock.System.now()
        val thresholdMs = thresholdDays * 24 * 60 * 60 * 1000L

        moduleIdList.forEach { moduleId ->
            val extensibility = profileGetter(moduleId) ?: return@forEach
            val extensions = SchemaRegistry.getExtensions(moduleId)

            extensions.forEach { field ->
                val lastAccessed = field.lastAccessedAt?.let {
                    runCatching { Instant.parse(it) }.getOrNull()
                }

                if (lastAccessed != null && (now.toEpochMilliseconds() - lastAccessed.toEpochMilliseconds() > thresholdMs)) {
                    // Propose archiving
                    val result = fieldProposalService.proposeArchiveField(
                        moduleId = moduleId,
                        fieldId = field.id,
                        rationale = "Field '${field.name}' has not been used in over $thresholdDays days.",
                        extensibility = extensibility
                    )

                    // Emit notification event
                    spineEventBus.emit(
                        SpineEventPayload(
                            type = "SCHEMA_ARCHIVE_PROPOSED",
                            domain = "system",
                            source = "maintenance",
                            priority = "info",
                            data = mapOf(
                                "moduleId" to moduleId,
                                "fieldId" to field.id,
                                "fieldName" to field.name,
                                "lastAccessed" to field.lastAccessedAt!!
                            )
                        )
                    )
                }
            }
        }
    }
}
