# Windows Project

<p align="center">
  <img src="./Windows/assets/images/icon.png" alt="Project Icon" width="100" />
</p>

> [!NOTE]  
> Welcome to the Windows Project, a smart blinds and curtains automation system. This project is divided into three main components:

1. **Windows** - The frontend, built with React Native Expo.
2. **BlindTrust** - The backend, created using Express and LowDB.
3. **Hardware** - Contains the microcontroller (ESP8266E) code, wiring diagrams, and photos.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Roadmap](#roadmap)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Windows Project automates the opening and closing of blinds and curtains based on various conditions like time of day, wind speed, or temperature. It also provides manual control through the app.

## Features

- **Manual Control**: Open and close the blinds or curtains via the app.
- **Automations**:
  - Weather-based (rain, wind speed or temperature)
  - Alarms for scheduled control
- **Hardware Integration**: Control through an ESP8266E microcontroller.

## Roadmap

The following features are planned for future releases:

- [ ] **Time-based Control**: Implement automation based on sunrise and sunset times.
- [ ] **Notifications**: Enable users to receive notifications about the automation status.

## Project Structure

The repository is organized into three folders:

1. **Windows**:
   - The mobile app built with React Native and Expo.
   - Provides the user interface for controlling the blinds.
2. **BlindTrust**:
   - The backend server using Express and LowDB.
   - Manages automation rules and stores data.
3. **Hardware**:
   - Contains the microcontroller code for the ESP8266E.
   - Includes wiring diagrams and photos for hardware setup.

## Contributing

Contributions to the project are welcome! Whether you want to report bugs, suggest enhancements, or contribute code improvements, feel free to open an issue or submit a pull request on our GitHub repository.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under a copyleft license. Please refer to the [LICENSE.md](/LICENSE.md) file for more details.
