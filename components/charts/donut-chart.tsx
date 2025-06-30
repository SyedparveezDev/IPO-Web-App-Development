"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface DonutChartProps {
  data: Array<{
    label: string
    value: number
    color: string
  }>
  centerContent?: React.ReactNode
  size?: number
}

export default function DonutChart({ data, centerContent, size = 200 }: DonutChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = svgRef.current
    const total = data.reduce((sum, item) => sum + item.value, 0)
    let currentAngle = 0

    // Clear previous content
    svg.innerHTML = ""

    const radius = 80
    const centerX = size / 2
    const centerY = size / 2

    data.forEach((item) => {
      const percentage = item.value / total
      const angle = percentage * 2 * Math.PI

      const x1 = centerX + radius * Math.cos(currentAngle)
      const y1 = centerY + radius * Math.sin(currentAngle)
      const x2 = centerX + radius * Math.cos(currentAngle + angle)
      const y2 = centerY + radius * Math.sin(currentAngle + angle)

      const largeArcFlag = angle > Math.PI ? 1 : 0

      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        "Z",
      ].join(" ")

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
      path.setAttribute("d", pathData)
      path.setAttribute("fill", item.color)
      path.setAttribute("stroke", "white")
      path.setAttribute("stroke-width", "2")

      svg.appendChild(path)
      currentAngle += angle
    })

    // Add inner circle to create donut effect
    const innerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    innerCircle.setAttribute("cx", centerX.toString())
    innerCircle.setAttribute("cy", centerY.toString())
    innerCircle.setAttribute("r", "40")
    innerCircle.setAttribute("fill", "white")
    svg.appendChild(innerCircle)
  }, [data, size])

  return (
    <div className="relative inline-block">
      <svg ref={svgRef} width={size} height={size} className="transform -rotate-90" />
      {centerContent && <div className="absolute inset-0 flex items-center justify-center">{centerContent}</div>}
    </div>
  )
}
