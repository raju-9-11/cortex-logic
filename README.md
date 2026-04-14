# cortex-logic

Kotlin Multiplatform library containing the Nexus core engine — personas, domain models, services, and database layer. Targets Android and JavaScript.

## Publishing

Artifacts are automatically published to GitHub Packages on every push to `main` via the [publish workflow](.github/workflows/publish.yml).

**Coordinates:** `com.agnes.nexus:cortex:<version>`

## Consuming in Android (nexus-android)

### 1. Generate a GitHub PAT

Go to **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)** and generate a token with the **`read:packages`** scope.

### 2. Add credentials to `~/.gradle/gradle.properties`

```properties
gpr.user=raju-9-11
gpr.token=<YOUR_PAT>
```

This file is machine-local and never committed.

### 3. Add the GitHub Packages repository

In your project's `settings.gradle.kts`:

```kotlin
dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        maven {
            name = "GitHubPackages"
            url = uri("https://maven.pkg.github.com/raju-9-11/cortex-logic")
            credentials {
                username = providers.gradleProperty("gpr.user").orNull ?: System.getenv("GITHUB_ACTOR")
                password = providers.gradleProperty("gpr.token").orNull ?: System.getenv("GITHUB_TOKEN")
            }
        }
    }
}
```

### 4. Add the dependency

In `app/build.gradle.kts`:

```kotlin
api("com.agnes.nexus:cortex:1.5.1")
```

### CI / GitHub Actions

For CI pipelines, set repository secrets `GITHUB_ACTOR` (your GitHub username) and `GITHUB_TOKEN` (a PAT with `read:packages`). The workflow will pick them up automatically from environment variables.

## Releasing a new version

1. Update `version` in `build.gradle.kts`
2. Push to `main` — GitHub Actions publishes the new version automatically
3. Bump the version in `nexus-android/app/build.gradle.kts`
