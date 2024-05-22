
# ChatWithGPT

This repository contains the complete code for a chat application built with React Native and Firebase.


https://github.com/dmrck/ChatWithGPT/assets/34156110/b6d60503-abfc-448a-a87f-6cbad6a45109



## Table of Contents

- [Installation](#installation)
- [Running the App](#running-the-app)
- [Firebase Setup](#firebase-setup)

## Installation

Follow these steps to set up and run the app on your local machine.

### Prerequisites

- Node.js (>= 12.x)
- npm or yarn
- Xcode (for iOS development)
- Android Studio (for Android development)
- Firebase account

### Clone the Repository

```bash
git clone https://github.com/dmrck/ChatWithGPT.git
cd ChatWithGPT
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

## Running the App

### iOS

1. Install CocoaPods dependencies:

```bash
cd ios
pod install
cd ..
```

2. Run the app:

```bash
npx react-native run-ios
```

### Android

1. Start the Android emulator.

2. Run the app:

```bash
npx react-native run-android
```

## Firebase Setup

Follow these steps to set up Firebase and connect it to the project.

1. Go to the [Firebase Console](https://console.firebase.google.com/).

2. Click on `Add Project` and follow the steps to create a new project.

3. Add an iOS app to your Firebase project:
    - Download the `GoogleService-Info.plist` file.
    - Place it in the `ios` directory of your React Native project.

4. Add an Android app to your Firebase project:
    - Download the `google-services.json` file.
    - Place it in the `android/app` directory of your React Native project.

5. Enable the necessary Firebase services:
    - Authentication (Anonymous)

6. Install the Firebase packages in your React Native project:

```bash
npm install @react-native-firebase/app @react-native-firebase/auth
# If using Firestore or Storage, also install:
npm install @react-native-firebase/firestore @react-native-firebase/storage
```


- **Android**: Ensure your `android/build.gradle` and `android/app/build.gradle` include the necessary Firebase configuration:

`android/build.gradle`:

```gradle
buildscript {
  ext {
    buildToolsVersion = "29.0.2"
    minSdkVersion = 21
    compileSdkVersion = 29
    targetSdkVersion = 29
  }
  repositories {
    google()
    mavenCentral()
  }
  dependencies {
    classpath("com.android.tools.build:gradle:4.1.0")
    classpath("com.google.gms:google-services:4.3.3")
  }
}
```

`android/app/build.gradle`:

```gradle
apply plugin: 'com.google.gms.google-services'

dependencies {
  implementation platform('com.google.firebase:firebase-bom:26.7.0')
  implementation 'com.google.firebase:firebase-auth'
  // Add other Firebase dependencies if needed
}
```

