"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Users, DollarSign, Award } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: 50000,
    suffix: "+",
    label: "Active Investors",
    description: "Growing community of traders",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingUp,
    value: 150,
    suffix: "+",
    label: "IPOs Tracked",
    description: "Comprehensive IPO database",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: DollarSign,
    value: 500,
    suffix: "Cr+",
    label: "Investments Facilitated",
    description: "Total investment volume",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Award,
    value: 4.8,
    suffix: "/5",
    label: "User Rating",
    description: "Trusted by investors",
    color: "from-orange-500 to-red-500",
  },
]

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate numbers
          stats.forEach((stat, index) => {
            let start = 0
            const end = stat.value
            const duration = 2000
            const increment = end / (duration / 16)

            const timer = setInterval(() => {
              start += increment
              if (start >= end) {
                start = end
                clearInterval(timer)
              }
              setAnimatedValues((prev) => {
                const newValues = [...prev]
                newValues[index] = Math.floor(start)
                return newValues
              })
            }, 16)
          })
        }
      },
      { threshold: 0.5 },
    )

    const element = document.getElementById("stats-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className={`text-center group transition-all duration-1000 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative">
                  {/* Icon Background */}
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${stat.color} rounded-3xl mb-6 transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-10 w-10 text-white" />
                  </div>

                  {/* Animated Number */}
                  <div className="mb-2">
                    <span className="text-4xl md:text-5xl font-bold text-gray-900">
                      {animatedValues[index].toLocaleString()}
                    </span>
                    <span className="text-2xl font-bold text-gray-600">{stat.suffix}</span>
                  </div>

                  {/* Label */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</h3>
                  <p className="text-gray-600">{stat.description}</p>

                  {/* Hover Effect */}
                  <div
                    className={`absolute -inset-4 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300 -z-10`}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
