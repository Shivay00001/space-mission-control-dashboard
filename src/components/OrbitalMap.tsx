
import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export function OrbitalMap() {
    const svgRef = useRef<SVGSVGElement>(null)

    useEffect(() => {
        if (!svgRef.current) return

        const svg = d3.select(svgRef.current)
        const width = svgRef.current.clientWidth
        const height = svgRef.current.clientHeight

        svg.selectAll('*').remove()

        // Background grid
        const grid = svg.append('g').attr('class', 'grid')
        for (let x = 0; x < width; x += 50) {
            grid.append('line').attr('x1', x).attr('y1', 0).attr('x2', x).attr('y2', height).attr('stroke', '#30363d').attr('stroke-width', 0.5)
        }
        for (let y = 0; y < height; y += 50) {
            grid.append('line').attr('x1', 0).attr('y1', y).attr('x2', width).attr('y2', y).attr('stroke', '#30363d').attr('stroke-width', 0.5)
        }

        // Earth
        const earth = svg.append('circle')
            .attr('cx', width / 2)
            .attr('cy', height / 2)
            .attr('r', 40)
            .attr('fill', '#1f6feb')
            .attr('stroke', '#58a6ff')
            .attr('stroke-width', 2)

        // Trajectory
        const orbitRadius = 150
        const orbitPath = svg.append('circle')
            .attr('cx', width / 2)
            .attr('cy', height / 2)
            .attr('r', orbitRadius)
            .attr('fill', 'none')
            .attr('stroke', '#8b949e')
            .attr('stroke-dasharray', '5,5')
            .attr('stroke-opacity', 0.5)

        // Satellite
        const satellite = svg.append('circle')
            .attr('r', 5)
            .attr('fill', '#f78166')
            .attr('stroke', '#ffffff')
            .attr('stroke-width', 1)

        let angle = 0
        const animate = () => {
            angle = (angle + 0.01) % (2 * Math.PI)
            const x = width / 2 + Math.cos(angle) * orbitRadius
            const y = height / 2 + Math.sin(angle) * orbitRadius

            satellite.attr('cx', x).attr('cy', y)
            requestAnimationFrame(animate)
        }
        animate()

    }, [])

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <svg ref={svgRef} width="100%" height="100%" style={{ background: '#0d1117' }}></svg>
        </div>
    )
}
