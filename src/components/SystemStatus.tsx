
import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface DataPoint {
    time: string
    value: number
}

interface Props {
    onStatusChange: (status: string) => void
}

export function SystemStatus({ onStatusChange }: Props) {
    const [data, setData] = useState<DataPoint[]>([])

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date()
            const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
            const val = 50 + Math.random() * 20

            setData(prev => {
                const newData = [...prev, { time: timeStr, value: val }]
                if (newData.length > 20) newData.shift()
                return newData
            })

            // Simulate status check
            if (val > 68) onStatusChange('WARNING')
            else if (val < 52) onStatusChange('CRITICAL')
            else onStatusChange('NOMINAL')

        }, 1000)
        return () => clearInterval(interval)
    }, [onStatusChange])

    return (
        <div style={{ width: '100%', height: '300px' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#8b949e' }}>Power Grid Load (%)</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis dataKey="time" stroke="#8b949e" fontSize={10} tick={{ fill: '#8b949e' }} />
                    <YAxis domain={[0, 100]} stroke="#8b949e" fontSize={10} tick={{ fill: '#8b949e' }} />
                    <Tooltip
                        contentStyle={{ background: '#161b22', border: '1px solid #30363d', color: '#c9d1d9' }}
                        itemStyle={{ color: '#58a6ff' }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#58a6ff" strokeWidth={2} dot={false} isAnimationActive={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
