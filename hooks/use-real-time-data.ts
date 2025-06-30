"use client"

import { useState, useEffect } from "react"

interface MarketData {
  symbol: string
  price: number
  change: number
  changePercent: number
}

interface ActivityData {
  id: string
  type: "ipo_added" | "status_updated" | "user_registered"
  message: string
  timestamp: Date
}

export function useRealTimeData() {
  const [marketData, setMarketData] = useState<MarketData[]>([
    { symbol: "NIFTY 50", price: 19674.25, change: 234.5, changePercent: 1.2 },
    { symbol: "SENSEX", price: 66230.15, change: -532.8, changePercent: -0.8 },
  ])

  const [activities, setActivities] = useState<ActivityData[]>([
    {
      id: "1",
      type: "ipo_added",
      message: "Tata Motors IPO was added to the system",
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "status_updated",
      message: "Adani Power IPO status changed to Listed",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: "3",
      type: "user_registered",
      message: "5 new users registered today",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    },
  ])

  useEffect(() => {
    // Simulate real-time market data updates
    const marketInterval = setInterval(() => {
      setMarketData((prev) =>
        prev.map((item) => ({
          ...item,
          price: item.price + (Math.random() - 0.5) * 100,
          change: item.change + (Math.random() - 0.5) * 10,
          changePercent: item.changePercent + (Math.random() - 0.5) * 0.5,
        })),
      )
    }, 5000)

    // Simulate new activities
    const activityInterval = setInterval(() => {
      const newActivity: ActivityData = {
        id: Date.now().toString(),
        type: "ipo_added",
        message: "New IPO activity detected",
        timestamp: new Date(),
      }

      setActivities((prev) => [newActivity, ...prev.slice(0, 4)])
    }, 30000)

    return () => {
      clearInterval(marketInterval)
      clearInterval(activityInterval)
    }
  }, [])

  return { marketData, activities }
}
