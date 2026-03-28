package com.agnes.nexus.core.domain.model.orchestration

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

// ═══════════════════════════════════════════════════════════════════════════════
// Thread Participant
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
enum class ThreadParticipantRole {
    @SerialName("primary") PRIMARY,
    @SerialName("secondary") SECONDARY,
    @SerialName("observer") OBSERVER
}

@Serializable
enum class ThreadParticipantState {
    @SerialName("invited") INVITED,
    @SerialName("joined") JOINED,
    @SerialName("active") ACTIVE,
    @SerialName("waiting") WAITING,
    @SerialName("resolved") RESOLVED,
    @SerialName("dismissed") DISMISSED,
    @SerialName("left") LEFT
}

@Serializable
enum class ThreadParticipantPresence {
    @SerialName("online") ONLINE,
    @SerialName("idle") IDLE,
    @SerialName("offline") OFFLINE
}

@Serializable
enum class ThreadParticipantInclusionReason {
    @SerialName("mentioned") MENTIONED,
    @SerialName("consulted") CONSULTED,
    @SerialName("delegated") DELEGATED,
    @SerialName("runtime") RUNTIME
}

@Serializable
data class ThreadParticipant(
    val moduleId: String,
    val role: ThreadParticipantRole,
    val joinedAt: String,
    val state: ThreadParticipantState,
    val presence: ThreadParticipantPresence,
    val inclusionReasons: List<ThreadParticipantInclusionReason> = emptyList(),
    val actorId: String? = null,
    val actorLabel: String? = null,
    val actorShortLabel: String? = null,
    val invitedAt: String? = null,
    val lastActiveAt: String? = null
)

// ═══════════════════════════════════════════════════════════════════════════════
// Master Thread Turn
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
data class MasterThreadTurn(
    val id: String,
    val threadId: String,
    val sequence: Int,
    /** moduleId | 'nexus' | 'user' | 'system' */
    val startedBy: String,
    val participantIds: List<String>,
    val createdAt: String,
    val updatedAt: String,
    val messageIds: List<String>,
    /** For threaded replies — ID of the turn this is replying to */
    val replyToTurnId: String? = null,
    /** Root of the reply chain */
    val rootTurnId: String? = null
)

// ═══════════════════════════════════════════════════════════════════════════════
// Master Thread Message
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
enum class MasterThreadMessageKind {
    @SerialName("conversation") CONVERSATION,
    @SerialName("consultation_request") CONSULTATION_REQUEST,
    @SerialName("consultation_result") CONSULTATION_RESULT,
    @SerialName("consultation_failure") CONSULTATION_FAILURE,
    @SerialName("execution_request") EXECUTION_REQUEST,
    @SerialName("execution_result") EXECUTION_RESULT,
    @SerialName("execution_failure") EXECUTION_FAILURE,
    @SerialName("synthesis") SYNTHESIS
}

@Serializable
data class MasterThreadMessage(
    val id: String,
    val threadId: String,
    /** moduleId | 'nexus' | 'user' | 'system' */
    val author: String,
    val kind: MasterThreadMessageKind? = null,
    val body: String,
    val createdAt: String,
    val participantIds: List<String>,
    val proposalId: String? = null,
    val turnId: String? = null,
    val turnSequence: Int? = null,
    /** For threaded replies */
    val replyToMessageId: String? = null,
    val replyToTurnId: String? = null,
    val rootMessageId: String? = null,
    val rootTurnId: String? = null,
    /** Deduplication key — prevents duplicate messages from concurrent writes */
    val dedupeKey: String? = null
)

// ═══════════════════════════════════════════════════════════════════════════════
// Thread Resolution State
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
enum class ThreadResolutionStatus {
    @SerialName("open") OPEN,
    @SerialName("awaiting_approval") AWAITING_APPROVAL,
    @SerialName("executed") EXECUTED,
    @SerialName("deferred") DEFERRED,
    @SerialName("blocked") BLOCKED
}

@Serializable
data class ThreadResolutionState(
    val threadId: String,
    val status: ThreadResolutionStatus = ThreadResolutionStatus.OPEN,
    val lastUpdatedAt: String = "",
    val winningProposalId: String? = null
)

// ═══════════════════════════════════════════════════════════════════════════════
// Shell Snapshot (aggregated view of a thread)
// ═══════════════════════════════════════════════════════════════════════════════

@Serializable
data class MasterThreadShellSnapshot(
    val threadId: String,
    val participants: List<ThreadParticipant> = emptyList(),
    val messages: List<MasterThreadMessage> = emptyList(),
    val turns: List<MasterThreadTurn> = emptyList(),
    /** Active proposal IDs linked to this thread */
    val proposalIds: List<String> = emptyList(),
    /** Currently active proposal ID (most recent pending) */
    val activeProposalId: String? = null,
    /** Thread resolution state (open → executed / deferred / blocked) */
    val resolution: ThreadResolutionState? = null,
    /**
     * Mutation support mode for this thread.
     * 'transient_only' — mutations apply to in-memory state only, not persisted.
     * 'none' — no mutations allowed.
     */
    val mutationSupport: String = "transient_only"
) {
    companion object {
        fun empty(threadId: String) = MasterThreadShellSnapshot(threadId = threadId)
    }
}
