# BlindTrust Backend

Welcome to the backend of the Windows Project, known as BlindTrust. This backend server is built with Express and LowDB, providing API endpoints for controlling and automating blinds and curtains.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Running in Production](#running-in-production)

## Overview

The BlindTrust backend serves as the central server for managing automation rules and providing data to the frontend application. It utilizes Express for handling HTTP requests and LowDB as a lightweight JSON-based database.

## Features

- **RESTful API**: Provides endpoints for managing blinds automation, rules, and schedules.
- **Automation Rules Management**: Supports time-based and weather-based automation for blinds.
- **Persistent Storage**: Uses LowDB to store automation rules and status data in JSON format.
- **Notifications Support**: Integrates with the frontend to send automation status updates.

## Installation

### Prerequisites

- Node.js
- PM2 (optional, recommended for production)

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

3. **Start the development server**:

   ```bash
   npm run dev
   ```

## Running in Production

For running the backend in a production environment, it's recommended to use PM2, a process manager for Node.js applications, which will help keep the server running and restart it automatically in case of failure.

### Steps to Set Up with PM2

1. **Install PM2 globally:**

```bash
npm install -g pm2
```

2. **Start the server using PM2:**

```bash
pm2 start src/index.js --name blindtrust-backend
```

3. **Set up PM2 to auto-start on server reboot:**

```bash
pm2 startup
pm2 save
```

PM2 will ensure that your server runs smoothly in a production environment, providing monitoring and auto-restart capabilities.
