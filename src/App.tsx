
import { useState } from 'react'
import { Activity, Radio, Database } from 'lucide-react'
import './App.css'
import { OrbitalMap } from './components/OrbitalMap'
import { SystemStatus } from './components/SystemStatus'

function App() {
    const [status, setStatus] = useState('NOMINAL')

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>MISSION CONTROL</h1>
                <div className={`status-badge ${status.toLowerCase()}`}>
                    SYSTEM STATUS: {status}
                </div>
            </header>

            <main className="dashboard-grid">
                <section className="telemetry-panel">
                    <h2><Radio className="icon" /> Live Telemetry</h2>
                    <SystemStatus onStatusChange={(s) => setStatus(s)} />
                </section>

                <section className="orbital-view">
                    <h2><Activity className="icon" /> Orbital Trajectory</h2>
                    <OrbitalMap />
                </section>

                <section className="logs-panel">
                    <h2><Database className="icon" /> Data Links</h2>
                    <div className="log-window">
                        <p>&gt; Initializing uplink...</p>
                        <p>&gt; Connection established (LAT: 23ms)</p>
                        <p>&gt; Downloading packet #49281...</p>
                        <p className="success">&gt; Sync complete.</p>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default App
