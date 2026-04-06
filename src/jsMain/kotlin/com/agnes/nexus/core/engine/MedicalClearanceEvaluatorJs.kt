package com.agnes.nexus.core.engine

import kotlinx.serialization.json.*

/**
 * MedicalClearanceEvaluatorJs — ports ClearanceService contraindication logic to KMP.
 *
 * Profile JSON shape: { knownConditions?: string[], medications?: string[], clearances?: ClearanceRecord[] }
 * ClearanceRecord JSON shape: { id, activity, status, reason, issuedAt }
 */
@JsExport
class MedicalClearanceEvaluatorJs {

  private val PATTERNS: Map<String, List<String>> = mapOf(
    "high intensity" to listOf("cardiac", "heart", "hypertension", "seizure", "fracture"),
    "heavy lifting" to listOf("hernia", "spinal", "disc", "fracture", "pregnancy"),
    "endurance" to listOf("asthma", "copd", "cardiac", "anemia"),
    "flexibility" to listOf("hypermobility", "joint instability"),
  )

  private fun normalizeActivity(activity: String): String =
    activity.lowercase().replace(Regex("[_\\-]"), " ")

  private fun hasContraindication(
    conditions: List<String>,
    medications: List<String>,
    activity: String,
  ): String? {
    val normalizedActivity = normalizeActivity(activity)
    val allTerms = (conditions + medications).map { it.lowercase() }
    for ((pattern, contraindications) in PATTERNS) {
      if (!normalizedActivity.contains(pattern)) continue
      for (contra in contraindications) {
        val match = allTerms.find { it.contains(contra) }
        if (match != null) return "$match may contraindicate $pattern"
      }
    }
    return null
  }

  fun evaluate(profileJson: String, activity: String): String {
    val profile = Json.parseToJsonElement(profileJson).jsonObject
    val conditions = profile["knownConditions"]?.jsonArray
      ?.mapNotNull { it.jsonPrimitive.contentOrNull } ?: emptyList()
    val medications = profile["medications"]?.jsonArray
      ?.mapNotNull { it.jsonPrimitive.contentOrNull } ?: emptyList()
    val clearances = profile["clearances"]?.jsonArray ?: JsonArray(emptyList())

    val contraindication = hasContraindication(conditions, medications, activity)
    if (contraindication != null) {
      return buildRecord(activity, "denied", contraindication)
    }

    // Check for recent denial on same activity (within 7 days)
    val sevenDaysMs: Double = 7.0 * 24 * 60 * 60 * 1000
    @Suppress("UNCHECKED_CAST_TO_EXTERNAL_INTERFACE")
    val nowMs = js("Date.now()") as Double
    val activityNorm = activity.lowercase()
    val recentDenied = clearances.firstOrNull { elem ->
      val obj = elem.jsonObject
      val sameActivity = obj["activity"]?.jsonPrimitive?.contentOrNull?.lowercase() == activityNorm
      val denied = obj["status"]?.jsonPrimitive?.contentOrNull == "denied"
      val issuedAt = obj["issuedAt"]?.jsonPrimitive?.contentOrNull ?: return@firstOrNull false
      @Suppress("UNCHECKED_CAST_TO_EXTERNAL_INTERFACE")
      val issuedMs = js("new Date(issuedAt).getTime()") as Double
      sameActivity && denied && (nowMs - issuedMs) < sevenDaysMs
    }

    if (recentDenied != null) {
      val prevReason = recentDenied.jsonObject["reason"]?.jsonPrimitive?.contentOrNull ?: ""
      return buildRecord(activity, "conditional", "Previously denied ($prevReason). Re-evaluation recommended.")
    }

    return buildRecord(activity, "granted", "No contraindications detected.")
  }

  fun isActivitySafe(profileJson: String, activity: String): Boolean {
    val result = Json.parseToJsonElement(evaluate(profileJson, activity)).jsonObject
    return result["status"]?.jsonPrimitive?.contentOrNull == "granted"
  }

  fun getLatestClearance(profileJson: String): String {
    val profile = Json.parseToJsonElement(profileJson).jsonObject
    val clearances = profile["clearances"]?.jsonArray
    return if (!clearances.isNullOrEmpty()) clearances[0].toString() else "null"
  }

  private fun buildRecord(activity: String, status: String, reason: String): String {
    val id = js("crypto.randomUUID()") as String
    val now = js("new Date().toISOString()") as String
    return buildJsonObject {
      put("id", id)
      put("activity", activity)
      put("status", status)
      put("reason", reason)
      put("issuedAt", now)
    }.toString()
  }
}
