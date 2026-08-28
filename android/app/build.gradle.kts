plugins {
    alias(libs.plugins.android.application)
}

android {
    namespace = "ru.asavan.veer"
    compileSdk = 37

    defaultConfig {
        applicationId = "ru.asavan.veer"
        minSdk = 24
        targetSdk = 37
        versionCode = 8
        versionName = "1.3.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }
    

    buildTypes {
        release {
            optimization {
                enable = true
            }
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

dependencies {

    implementation(libs.webkit)

    testImplementation(libs.junit)
    androidTestImplementation(libs.ext.junit)
    androidTestImplementation(libs.espresso.core)
}
