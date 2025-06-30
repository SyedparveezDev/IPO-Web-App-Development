"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

interface MarketData {
  name: string
  value: number
  change: number
  changePercent: number
  icon: string
}

export default function MarketOverview() {
  const [marketData, setMarketData] = useState<MarketData[]>([
    { name: "NIFTY 50", value: 21418, change: -38.5, changePercent: -0.18, icon: "📈" },
    { name: "SENSEX", value: 71315, change: -171.2, changePercent: -0.24, icon: "📊" },
    { name: "BANK NIFTY", value: 47867, change: 273.4, changePercent: 0.57, icon: "🏦" },
    { name: "NIFTY IT", value: 35685, change: -96.3, changePercent: -0.27, icon: "💻" },
  ])

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("market-overview")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) =>
        prev.map((item) => ({
          ...item,
          value: item.value + (Math.random() - 0.5) * 100,
          change: item.change + (Math.random() - 0.5) * 10,
          changePercent: item.changePercent + (Math.random() - 0.5) * 0.1,
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="market-overview" className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-sm font-medium text-green-700 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Live Market Data
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Real-Time Market Overview</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with live market movements and make informed investment decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketData.map((item, index) => (
            <div
              key={item.name}
              className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">{item.icon}</div>
                <div className={`p-2 rounded-full ${item.change >= 0 ? "bg-green-100" : "bg-red-100"}`}>
                  {item.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <div className="text-2xl font-bold text-gray-900">
                  {item.value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </div>
                <div className={`flex items-center space-x-2 ${item.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                  <span className="font-medium">
                    {item.change >= 0 ? "+" : ""}
                    {item.change.toFixed(1)}
                  </span>
                  <span className="text-sm">
                    ({item.changePercent >= 0 ? "+" : ""}
                    {item.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>

              {/* Mini Chart */}
              <div className="mt-4 h-12 flex items-end space-x-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t ${item.change >= 0 ? "bg-green-200" : "bg-red-200"} animate-pulse`}
                    style={{
                      height: `${Math.random() * 100}%`,
                      animationDelay: `${i * 100}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Market Sentiment */}
        <div
          className={`mt-12 bg-white rounded-2xl shadow-lg p-8 transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-lg font-semibold mb-4">
              <Activity className="h-5 w-5 mr-2" />
              Market Sentiment: Bullish
            </div>
            <p className="text-gray-600">
              Current market conditions are favorable for investments with strong buying interest across sectors
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
