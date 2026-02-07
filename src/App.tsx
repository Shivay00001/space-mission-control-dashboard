import React, { useState, useEffect } from 'react';
import {
    Activity,
    Battery,
    Cpu,
    Globe,
    Radio,
    ShieldAlert,
    Wifi,
    Clock,
    Zap
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

// Mock Data Generation
const generateMockData = () => {
    const data = [];
    for (let i = 0; i < 20; i++) {
        data.push({
            time: i,
            voltage: 12 + Math.random() * 1,
            current: 2 + Math.random() * 0.5,
            temp: 20 + Math.random() * 5,
        });
    }
    return data;
};

const App: React.FC = () => {
    const [telemetry, setTelemetry] = useState(generateMockData());
    const [status, setStatus] = useState('NOMINAL');
    const [missionTime, setMissionTime] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setMissionTime(prev => prev + 1);
            setTelemetry(prev => [
                ...prev.slice(1),
                {
                    time: prev[prev.length - 1].time + 1,
                    voltage: 12 + Math.random() * 1,
                    current: 2 + Math.random() * 0.5,
                    temp: 20 + Math.random() * 5,
                }
            ]);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col font-sans">
            {/* Header */}
            <header className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                    <Zap className="text-blue-500 w-8 h-8" />
                    <h1 className="text-2xl font-bold tracking-tight">MISSION CONTROL <span className="text-slate-500 font-light"> | SAT-01</span></h1>
                </div>
                <div className="flex items-center gap-8">
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-slate-500 uppercase tracking-widest">Mission Time</span>
                        <span className="font-mono text-xl">{Math.floor(missionTime / 3600)}:{Math.floor((missionTime % 3600) / 60)}:{missionTime % 60}</span>
                    </div>
                    <div className={`px-4 py-1 rounded-full text-sm font-bold border ${status === 'NOMINAL' ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-red-500/10 border-red-500 text-red-500'
                        }`}>
                        {status}
                    </div>
                </div>
            </header>

            {/* Main Grid */}
            <main className="grid grid-cols-12 gap-6 flex-grow">
                {/* Left Column - Real-time stats */}
                <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
                    <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-4 text-slate-400">
                            <Battery className="w-5 h-5" />
                            <h2 className="text-sm font-semibold uppercase tracking-wider">Power Systems</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Bus Voltage</p>
                                <p className="text-2xl font-mono">12.42V</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Solar Current</p>
                                <p className="text-2xl font-mono">2.81A</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-4 text-slate-400">
                            <Cpu className="w-5 h-5" />
                            <h2 className="text-sm font-semibold uppercase tracking-wider">On-Board Computer</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-slate-500">CPU Load</span>
                                    <span>14%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[14%]" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-slate-500">Memory</span>
                                    <span>42%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 w-[42%]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex-grow">
                        <div className="flex items-center gap-2 mb-4 text-slate-400">
                            <ShieldAlert className="w-5 h-5" />
                            <h2 className="text-sm font-semibold uppercase tracking-wider">System Alerts</h2>
                        </div>
                        <div className="space-y-3">
                            <div className="p-3 bg-slate-800/30 rounded-lg border-l-4 border-slate-700">
                                <p className="text-xs font-semibold">TDRS Link Acquisition</p>
                                <p className="text-[10px] text-slate-500">02:14:05 UTC</p>
                            </div>
                            <div className="p-3 bg-slate-800/30 rounded-lg border-l-4 border-slate-700">
                                <p className="text-xs font-semibold">ADCS Desaturation Complete</p>
                                <p className="text-[10px] text-slate-500">01:58:12 UTC</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center - Visualization */}
                <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex-grow flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2 text-slate-400">
                                <Globe className="w-5 h-5" />
                                <h2 className="text-sm font-semibold uppercase tracking-wider">Live Position</h2>
                            </div>
                            <div className="text-xs font-mono text-slate-500">
                                Lat: 34.0522° N | Lon: 118.2437° W
                            </div>
                        </div>
                        <div className="flex-grow bg-slate-800/20 rounded-lg border border-slate-800 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-center bg-no-repeat bg-contain" />
                            <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.8)] relative z-10 animate-pulse" />
                            <div className="text-[10px] text-slate-600 absolute bottom-4">World Map Projection</div>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 h-64">
                        <div className="flex items-center gap-2 mb-4 text-slate-400">
                            <Activity className="w-5 h-5" />
                            <h2 className="text-sm font-semibold uppercase tracking-wider">Bus Telemetry (Voltage)</h2>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={telemetry}>
                                <defs>
                                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="time" hide />
                                <YAxis domain={[10, 15]} hide />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', fontSize: '10px' }}
                                    itemStyle={{ color: '#3b82f6' }}
                                />
                                <Area type="monotone" dataKey="voltage" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVal)" isAnimationActive={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Right Column - COMMS & Command */}
                <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
                    <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-4 text-slate-400">
                            <Wifi className="w-5 h-5" />
                            <h2 className="text-sm font-semibold uppercase tracking-wider">Communication Link</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500">Uplink Status</span>
                                <span className="text-xs text-green-500 font-bold">CONNECTED</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500">Downlink (X-Band)</span>
                                <span className="text-xs text-green-500 font-bold">ACTIVE</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500">Signal Strength</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className={`w-1.5 h-3 rounded-sm ${i <= 4 ? 'bg-blue-500' : 'bg-slate-800'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex-grow flex flex-col">
                        <div className="flex items-center gap-2 mb-4 text-slate-400">
                            <Radio className="w-5 h-5" />
                            <h2 className="text-sm font-semibold uppercase tracking-wider">Uplink Console</h2>
                        </div>
                        <div className="bg-black/50 rounded p-3 font-mono text-[10px] text-green-500 flex-grow overflow-y-auto mb-4 border border-slate-800">
                            <div>&gt; SAT_01_READY</div>
                            <div>&gt; AUTH_KEY_VALIDATED</div>
                            <div className="animate-pulse">_</div>
                        </div>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-900/40">
                            Execute Sequence
                        </button>
                    </div>
                </div>
            </main>

            <footer className="mt-8 flex justify-between text-[10px] text-slate-500 uppercase tracking-widest border-t border-slate-800 pt-4">
                <div>SpaceOS v2.4.1 | Mission Control West</div>
                <div className="flex gap-4">
                    <span>OBC Primary</span>
                    <span>Payload Secondary</span>
                    <span className="text-green-500/50 font-bold tracking-normal">● All Systems Nominal</span>
                </div>
            </footer>
        </div>
    );
};

export default App;
