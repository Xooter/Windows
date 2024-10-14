# Windows Frontend

Welcome to the frontend of the Windows Project, a smart blinds and curtains automation system. This application is built with React Native using Expo, providing a user-friendly interface for controlling your blinds and curtains.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)

## Overview

The Windows frontend allows users to interact with the automation system for blinds and curtains. Users can manually control the blinds, set up automation rules, and receive notifications regarding their status.

## Features

- **Manual Control**: Open and close blinds or curtains directly from the app.
- **Automation Rules**: Set up time-based and weather-based automation for blinds and curtains.
- **Notifications**: Get real-time updates on the status of your automation.
- **User-Friendly Interface**: Intuitive design for a seamless user experience.

## Installation

### Prerequisites

- Node.js
- Expo CLI
- A compatible mobile device or emulator for testing

### Steps to Install

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Xooter/Windows.git
   cd Windows/Windows
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the Expo server**:

   ```bash
   npm run start
   ```

4. Set up your .env file with the following variables:

   ```bash
   EXPO_PUBLIC_WEATHER_API=...
   EXPO_PUBLIC_WEATHER_COORDS_LAT=...
   EXPO_PUBLIC_WEATHER_COORDS_LON=...
   EXPO_PUBLIC_BASE_BACK=...
   ```

5. Sync with EAS build:

   ```bash
   eas secret:push --force
   ```

> [!TIP]
> You can use the Expo Go app on your mobile device to scan the QR code and test the app. Alternatively, you can run the app on an emulator.

### Building the App

> [!NOTE]
> This will build the app for Android. For iOS, you will need a macOS device.

```
eas build -p android --profile production
```
