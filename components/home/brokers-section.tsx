"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Star, ArrowRight, Shield, Zap, Award } from "lucide-react"

const brokers = [
  {
    name: "Zerodha",
    logo: "🟢",
    rating: 4.5,
    users: "1.5M+",
    brokerage: "₹0",
    features: ["Zero Brokerage", "Advanced Charts", "Mobile App"],
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Upstox",
    logo: "🟣",
    rating: 4.3,
    users: "1M+",
    brokerage: "₹20",
    features: ["Low Cost", "Fast Execution", "Research"],
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Groww",
    logo: "🟡",
    rating: 4.4,
    users: "800K+",
    brokerage: "₹0",
    features: ["User Friendly", "Mutual Funds", "IPO Access"],
    color: "from-yellow-500 to-orange-500",
  },
]

export default function BrokersSection() {
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

    const element = document.getElementById("brokers-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="brokers-section" className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Trading Partner
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare and select from India's leading brokers with transparent pricing and expert reviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {brokers.map((broker, index) => (
            <div
              key={broker.name}
              className={`bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${broker.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{broker.logo}</div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-semibold">{broker.rating}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{broker.name}</h3>
                <div className="text-sm opacity-90">{broker.users} Active Users</div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-1">Brokerage</div>
                  <div className="text-3xl font-bold text-gray-900">{broker.brokerage}</div>
                  <div className="text-sm text-gray-500">per trade</div>
                </div>

                <div className="space-y-3 mb-6">
                  {broker.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className={`w-2 h-2 bg-gradient-to-r ${broker.color} rounded-full`} />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full bg-gradient-to-r ${broker.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105`}
                >
                  Open Account
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 transition-all duration-1000 delay-600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <Shield className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure & Regulated</h3>
            <p className="text-gray-600">All brokers are SEBI registered and follow strict compliance</p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-600">Execute trades in milliseconds with advanced technology</p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <Award className="h-12 w-12 text-pink-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Award Winning</h3>
            <p className="text-gray-600">Industry recognized platforms with excellent user ratings</p>
          </div>
        </div>

        {/* CTA */}
        <div
          className={`text-center transition-all duration-1000 delay-800 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <Link
            href="/brokers"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Compare All Brokers
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
