package com.agnes.ara.core.domain.services

/**
 * Shared Agnes session strings and context prompt builders.
 * Keeps Android behavior aligned with web wording and rules.
 */
object AgnesSessionContent {
    const val IMPROMPTU_WELCOME: String =
        "Whatever brought you here, you don't have to hold it alone right now. This session leaves no trace. I'm listening - take your time."

    fun returningWelcome(userName: String): String =
        "Hello $userName, welcome back. How has your journey been since we last spoke?"

    fun firstTimeWelcome(userName: String): String =
        "Hello $userName. I'm Agnes — a secure space for your thoughts. Where would you like to begin?"

    fun buildSessionContextBlock(baseContext: GlobalBaseIntakeContext): String {
        val identity = baseContext.name ?: "Unknown"
        val pronouns = baseContext.pronouns ?: "Unknown"
        val occupation = baseContext.occupation ?: "Unknown"
        val sleepHours = baseContext.typicalSleepHours?.toString() ?: "Unknown"
        val genderIdentity = baseContext.genderIdentity ?: "Unknown"

        return """
ABOUT YOUR CLIENT:
Your client is $identity${if (pronouns != "Unknown") " ($pronouns)" else ""}.
Occupation: $occupation
Typical sleep hours: $sleepHours
Gender identity: $genderIdentity

HOW TO USE THIS:
You already know this person. Do not re-introduce yourself or re-ask basic intake unless they request updates.

FORBIDDEN WORDS:
"baseline", "context", "protocol", "initialized", "synced", "parameters", "module", "configuration".
""".trimIndent()
    }
}
