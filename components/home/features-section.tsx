"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Users, Shield, BarChart3, Zap, Globe, Award, Clock } from "lucide-react"

const features = [
  {
    icon: TrendingUp,
    title: "Real-Time IPO Tracking",
    description: "Get instant updates on upcoming IPOs, subscription status, and listing dates with live notifications",
    color: "from-blue-500 to-cyan-500",
    delay: 0,
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Comprehensive IPO analysis with detailed financial metrics, performance predictions, and risk assessment",
    color: "from-purple-500 to-pink-500",
    delay: 100,
  },
  {
    icon: Users,
    title: "Expert Community",
    description:
      "Connect with 50,000+ traders and investors. Share insights, strategies, and learn from market experts",
    color: "from-green-500 to-emerald-500",
    delay: 200,
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Bank-grade security with encrypted data transmission and secure payment processing for peace of mind",
    color: "from-orange-500 to-red-500",
    delay: 300,
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance with sub-second load times and real-time data synchronization across devices",
    color: "from-indigo-500 to-purple-500",
    delay: 400,
  },
  {
    icon: Globe,
    title: "Multi-Platform Access",
    description: "Access your portfolio and market data seamlessly across web, mobile, and tablet devices",
    color: "from-teal-500 to-blue-500",
    delay: 500,
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized as India's #1 IPO platform with multiple industry awards and 4.8+ user ratings",
    color: "from-yellow-500 to-orange-500",
    delay: 600,
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support with dedicated relationship managers for premium users",
    color: "from-pink-500 to-rose-500",
    delay: 700,
  },
]

export default function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("features-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="features-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Bluestock?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive IPO information and analysis at your fingertips with cutting-edge technology and expert
            insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 cursor-pointer ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${feature.delay}ms` }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                />

                {/* Icon */}
                <div
                  className={`relative mb-6 w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl`}
                />
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-800 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Experience the Future of IPO Investing?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of successful investors who trust Bluestock for their IPO journey
            </p>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              Start Your Journey Today
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
