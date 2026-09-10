# Space Mission Control Dashboard

[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A **production-grade mission control dashboard** for real-time satellite monitoring and control. Providing a high-fidelity interface for telemetry visualization, orbital tracking, and system health management.

## 🚀 Features

- **Real-time Telemetry**: Live stream of satellite subsystem data (EPS, OBC, COMMS).
- **Orbital Mapping**: Interactive map showing current satellite position and trajectory.
- **System Health**: Visual indicators for critical satellite system status and alerts.
- **Command Control**: Interface for uplink command preparation and transmission.
- **Responsive Design**: Optimized for various display sizes in mission control rooms.
- **WebSocket Integration**: Low-latency data updates from the ground station.

## 📁 Project Structure

```
space-mission-control-dashboard/
├── src/
│   ├── components/   # UI Components (Map, Gauges, Logs)
│   ├── hooks/        # Custom hooks (WebSockets, Telemetry)
│   ├── services/     # API and Data processing
│   ├── types/        # TypeScript interfaces
│   └── App.tsx       # Root component
├── public/           # Static assets
├── tests/            # Component testing
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## 🛠️ Quick Start

```bash
# Clone
git clone https://github.com/Shivay00001/space-mission-control-dashboard.git

# Install
npm install

# Run Dev
npm run dev
```

## 📄 License

MIT License


## Prerequisites
- Required environment and dependencies

