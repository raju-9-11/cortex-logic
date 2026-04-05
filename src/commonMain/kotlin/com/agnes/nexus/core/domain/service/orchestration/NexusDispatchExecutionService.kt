package com.agnes.nexus.core.domain.service.orchestration

import com.agnes.nexus.core.domain.model.orchestration.DispatchNodeStatus
import com.agnes.nexus.core.domain.model.orchestration.NexusActionPlanExecutionPacket
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

/**
 * Pure dispatch execution utilities — cycle detection, summaries, retry packets, artifacts.
 *
 * All I/O stays in the Agnes TS layer (ActionHub.execute, serializeExecutionPacket).
 * This service handles deterministic computation that must be identical on Android.
 */
object NexusDispatchExecutionService {

    private val json = Json { ignoreUnknownKeys = true }

    // ─────────────────────────────────────────────────────────────────────────
    // Cycle detection
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * DFS cycle detection over the dispatchPlan dependency graph.
     * @return Set of nodeIds that are members of at least one cycle.
     */
    fun detectDependencyCycles(dispatchPlanJson: String): Set<String> {
        val dispatchPlan = try {
            json.decodeFromString<List<NexusActionPlanDispatchNodeLite>>(dispatchPlanJson)
        } catch (_: Exception) { return emptySet() }

        val adjList: Map<String, List<String>> = dispatchPlan.associate { it.nodeId to it.dependsOn }
        val visited = mutableSetOf<String>()
        val inStack = mutableSetOf<String>()
        val cycleNodes = mutableSetOf<String>()

        // Returns the nodeId where the cycle closes (the back-edge target), or null if no cycle found.
        fun dfs(nodeId: String): String? {
            if (nodeId in inStack) { cycleNodes.add(nodeId); return nodeId }
            if (nodeId in visited) return null
            visited.add(nodeId)
            inStack.add(nodeId)
            for (dep in adjList[nodeId] ?: emptyList()) {
                val cycleTarget = dfs(dep)
                if (cycleTarget != null) {
                    // We're on the cycle path — mark this node
                    cycleNodes.add(nodeId)
                    // Stop propagating once we've closed the cycle (back at the target)
                    if (cycleTarget != nodeId) {
                        inStack.remove(nodeId)
                        return cycleTarget
                    }
                    // cycleTarget == nodeId means we've fully traced the cycle back to its start
                }
            }
            inStack.remove(nodeId)
            return null
        }

        for (node in dispatchPlan) {
            if (node.nodeId !in visited) dfs(node.nodeId)
        }
        return cycleNodes
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Execution summary
    // ─────────────────────────────────────────────────────────────────────────

    fun buildExecutionSummary(packetJson: String, resultsJson: String): String {
        val packet = try { json.decodeFromString<NexusActionPlanExecutionPacket>(packetJson) } catch (_: Exception) { return "" }
        val results = try { json.decodeFromString<List<JsonObject>>(resultsJson) } catch (_: Exception) { return "" }

        val labelById = packet.nodes.associate { it.id to it.label }

        fun labelFor(result: JsonObject): String {
            val nodeId = result["nodeId"]?.jsonPrimitive?.contentOrNull ?: ""
            val sourceActionType = result["sourceActionType"]?.jsonPrimitive?.contentOrNull ?: ""
            return labelById[nodeId] ?: sourceActionType
        }

        val executed = results.filter { it["status"]?.jsonPrimitive?.contentOrNull == "executed" }
        val failed = results.filter { it["status"]?.jsonPrimitive?.contentOrNull == "failed" }
        val blocked = results.filter { it["status"]?.jsonPrimitive?.contentOrNull == "blocked_by_dependency" }
        val followup = results.filter { it["status"]?.jsonPrimitive?.contentOrNull == "requires_followup" }
        val executedLabels = executed.joinToString(", ") { labelFor(it) }

        if (failed.isEmpty() && blocked.isEmpty() && followup.isEmpty()) {
            return "Executed ${executed.size} planned action${if (executed.size == 1) "" else "s"}: $executedLabels."
        }

        val parts = mutableListOf<String>()
        if (executed.isNotEmpty()) parts.add("Executed: $executedLabels.")
        if (failed.isNotEmpty()) parts.add("Failed: ${failed.joinToString(", ") { labelFor(it) }}.")
        if (blocked.isNotEmpty()) parts.add("Blocked by dependencies: ${blocked.joinToString(", ") { labelFor(it) }}.")
        if (followup.isNotEmpty()) parts.add("Still needs follow-up: ${followup.joinToString(", ") { labelFor(it) }}.")

        val retryCount = failed.size + blocked.size
        if (retryCount > 0) parts.add("Retry available for $retryCount node${if (retryCount == 1) "" else "s"}.")

        return parts.joinToString(" ")
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Retry packet
    // ─────────────────────────────────────────────────────────────────────────

    fun buildRetryPacket(packetJson: String, resultsJson: String): String? {
        val packet = try { json.decodeFromString<NexusActionPlanExecutionPacket>(packetJson) } catch (_: Exception) { return null }
        val results = try { json.decodeFromString<List<JsonObject>>(resultsJson) } catch (_: Exception) { return null }

        val retryableNodeIds = results
            .filter { r ->
                val s = r["status"]?.jsonPrimitive?.contentOrNull
                s == "failed" || s == "blocked_by_dependency"
            }
            .mapNotNull { it["nodeId"]?.jsonPrimitive?.contentOrNull }
            .toSet()

        if (retryableNodeIds.isEmpty()) return null

        val retryNodes = packet.nodes.filter { it.id in retryableNodeIds }
        val retryDispatchPlan = packet.dispatchPlan
            .filter { it.nodeId in retryableNodeIds }
            .map { dispatch ->
                dispatch.copy(
                    dependsOn = dispatch.dependsOn.filter { it in retryableNodeIds },
                    status = if (dispatch.resolvedActionType != null) DispatchNodeStatus.RESOLVED else dispatch.status,
                )
            }

        val rootPlanId = packet.retryOfPlanId ?: packet.planId
        val nextAttempt = (packet.retryAttempt ?: 0) + 1
        val cleanTitle = packet.title.replace(Regex("\\s+\\(retry(?:\\s+\\d+)?\\)$", RegexOption.IGNORE_CASE), "")

        val retryPacket = packet.copy(
            planId = "$rootPlanId.retry.$nextAttempt",
            retryOfPlanId = rootPlanId,
            retryAttempt = nextAttempt,
            title = "$cleanTitle (retry $nextAttempt)",
            summary = "Retry attempt $nextAttempt for ${retryDispatchPlan.size} blocked or failed node${if (retryDispatchPlan.size == 1) "" else "s"} from $cleanTitle.",
            nodes = retryNodes,
            dispatchPlan = retryDispatchPlan,
        )

        return json.encodeToString(retryPacket)
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ID helpers
    // ─────────────────────────────────────────────────────────────────────────

    fun buildExecutionId(planId: String, nodeId: String): String = "$planId.$nodeId.execution"

    fun getRetryParentPlanId(packetJson: String): String? {
        val packet = try { json.decodeFromString<NexusActionPlanExecutionPacket>(packetJson) } catch (_: Exception) { return null }
        val attempt = packet.retryAttempt ?: return null
        if (attempt <= 0) return null
        if (attempt <= 1) return packet.retryOfPlanId
        val rootPlanId = packet.retryOfPlanId ?: packet.planId
        return "$rootPlanId.retry.${attempt - 1}"
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Execution artifacts
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Build ThreadExecutionArtifact array JSON.
     *
     * @param retryPacketJson  JSON of the retry packet (pre-computed by Agnes via buildRetryPacket),
     *                         or null when no retry is available.
     * @param retryPrompt      Serialised prompt string for the retry (built by Agnes's
     *                         serializeExecutionPacket), or null when no retry is available.
     */
    fun buildExecutionArtifacts(
        packetJson: String,
        resultsJson: String,
        timestamp: String,
        retryPacketJson: String?,
        retryPrompt: String?,
    ): String {
        val packet = try { json.decodeFromString<NexusActionPlanExecutionPacket>(packetJson) } catch (_: Exception) { return "[]" }
        val results = try { json.decodeFromString<List<JsonObject>>(resultsJson) } catch (_: Exception) { return "[]" }

        val nodeById = packet.nodes.associateBy { it.id }

        val parsedRetryPacket: NexusActionPlanExecutionPacket? = retryPacketJson?.let {
            try { json.decodeFromString<NexusActionPlanExecutionPacket>(it) } catch (_: Exception) { null }
        }
        val retryableNodeIds: Set<String> = parsedRetryPacket?.dispatchPlan?.map { it.nodeId }?.toSet() ?: emptySet()
        val retryPacketSummary: String? = parsedRetryPacket?.summary
        val retryAttemptNum: Int? = parsedRetryPacket?.retryAttempt

        val retryAttemptLabel: String? = packet.retryAttempt?.let { "retry attempt $it" }
        val retryParentId: String? = getRetryParentPlanId(packetJson)

        val artifacts = results
            .filter { r -> r["status"]?.jsonPrimitive?.contentOrNull != "requires_followup" }
            .map { result ->
                val nodeId = result["nodeId"]?.jsonPrimitive?.contentOrNull ?: ""
                val status = result["status"]?.jsonPrimitive?.contentOrNull ?: "failed"
                val sourceActionType = result["sourceActionType"]?.jsonPrimitive?.contentOrNull ?: ""
                val resolvedActionType = result["resolvedActionType"]?.jsonPrimitive?.contentOrNull
                val targetModuleId = result["targetModuleId"]?.jsonPrimitive?.contentOrNull ?: ""
                val reason = result["reason"]?.jsonPrimitive?.contentOrNull
                val node = nodeById[nodeId]
                val label = node?.label ?: sourceActionType
                val retryable = nodeId in retryableNodeIds

                val summary = when (status) {
                    "executed" -> "$label executed${if (retryAttemptLabel != null) " on $retryAttemptLabel" else ""}."
                    "blocked_by_dependency" -> "$label blocked by dependency${if (retryAttemptLabel != null) " on $retryAttemptLabel" else ""}."
                    else -> "$label failed${if (retryAttemptLabel != null) " on $retryAttemptLabel" else ""}."
                }

                val artifactStatus = when (status) {
                    "executed" -> "executed"
                    "blocked_by_dependency" -> "blocked"
                    else -> "failed"
                }

                buildJsonObject {
                    put("id", "execution.${packet.planId}.$nodeId")
                    put("threadId", packet.sourceThreadId)
                    put("sourceModuleId", targetModuleId)
                    put("actionType", resolvedActionType ?: sourceActionType)
                    put("proposalId", "${packet.planId}.$nodeId.proposal")
                    put("executionId", buildExecutionId(packet.planId, nodeId))
                    put("requestedAt", timestamp)
                    put("resolvedAt", timestamp)
                    put("status", artifactStatus)
                    put("summary", summary)
                    put("patientScope", "USER")
                    if (!reason.isNullOrEmpty() && (status == "failed" || status == "blocked_by_dependency")) {
                        put("errorMessage", reason)
                    }
                    put("retryable", retryable)
                    if (retryable) {
                        put("retrySummary", "Retry attempt ${retryAttemptNum ?: 1} available.")
                        if (retryPrompt != null) put("retryPrompt", retryPrompt)
                        if (retryPacketSummary != null) put("retryVisibleContent", retryPacketSummary)
                    }
                    packet.retryOfPlanId?.let { put("retryOfPlanId", it) }
                    packet.retryAttempt?.let { put("retryAttempt", it) }
                    if (retryParentId != null) put("retryParentExecutionId", buildExecutionId(retryParentId, nodeId))
                }
            }

        return json.encodeToString(JsonArray(artifacts))
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Lightweight model for cycle detection (avoids full dispatch node deserialization)
// ─────────────────────────────────────────────────────────────────────────────

@kotlinx.serialization.Serializable
private data class NexusActionPlanDispatchNodeLite(
    val nodeId: String,
    val dependsOn: List<String> = emptyList(),
)
