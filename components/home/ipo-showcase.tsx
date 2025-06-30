"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, TrendingUp, ArrowRight, Clock, DollarSign } from "lucide-react"

interface IPO {
  id: number
  company: string
  logo: string
  priceBand: string
  openDate: string
  closeDate: string
  issueSize: string
  status: "upcoming" | "ongoing" | "listed"
  subscription: string
  listingGain?: string
  category: string
}

const ipoData: IPO[] = [
  {
    id: 1,
    company: "Nova Agritech Ltd.",
    logo: "🌱",
    priceBand: "₹39 - 41",
    openDate: "Jan 22, 2024",
    closeDate: "Jan 24, 2024",
    issueSize: "₹143.81 Cr",
    status: "upcoming",
    subscription: "Opening Soon",
    category: "Agriculture",
  },
  {
    id: 2,
    company: "EPACK Durable Ltd.",
    logo: "📦",
    priceBand: "₹218 - 230",
    openDate: "Jan 19, 2024",
    closeDate: "Jan 23, 2024",
    issueSize: "₹640.05 Cr",
    status: "ongoing",
    subscription: "2.3x",
    category: "Manufacturing",
  },
  {
    id: 3,
    company: "Jyoti CNC Automation",
    logo: "⚙️",
    priceBand: "₹331",
    openDate: "Jan 10, 2024",
    closeDate: "Jan 12, 2024",
    issueSize: "₹450 Cr",
    status: "listed",
    subscription: "4.2x",
    listingGain: "+11.78%",
    category: "Technology",
  },
]

export default function IPOShowcase() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<"upcoming" | "ongoing" | "listed">("upcoming")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("ipo-showcase")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const filteredIPOs = ipoData.filter((ipo) => ipo.status === activeTab)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "from-blue-500 to-cyan-500"
      case "ongoing":
        return "from-green-500 to-emerald-500"
      case "listed":
        return "from-purple-500 to-pink-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Clock className="h-4 w-4" />
      case "ongoing":
        return <TrendingUp className="h-4 w-4" />
      case "listed":
        return <DollarSign className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  return (
    <section id="ipo-showcase" className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              IPO Opportunities
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the latest IPO opportunities with detailed analysis and real-time subscription data
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          className={`flex justify-center mb-12 transition-all duration-1000 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            {(["upcoming", "ongoing", "listed"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? `bg-gradient-to-r ${getStatusColor(tab)} text-white shadow-lg`
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {getStatusIcon(tab)}
                  <span>{tab}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* IPO Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIPOs.map((ipo, index) => (
            <div
              key={ipo.id}
              className={`bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${getStatusColor(ipo.status)} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{ipo.logo}</div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                    {ipo.category}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{ipo.company}</h3>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(ipo.status)}
                  <span className="text-sm opacity-90 capitalize">{ipo.status}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Price Band</div>
                    <div className="font-semibold text-gray-900">{ipo.priceBand}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Issue Size</div>
                    <div className="font-semibold text-gray-900">{ipo.issueSize}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Open Date</div>
                    <div className="font-semibold text-gray-900">{ipo.openDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Close Date</div>
                    <div className="font-semibold text-gray-900">{ipo.closeDate}</div>
                  </div>
                </div>

                {/* Subscription Status */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">
                        {ipo.status === "listed" ? "Final Subscription" : "Current Subscription"}
                      </div>
                      <div className="font-bold text-lg text-gray-900">{ipo.subscription}</div>
                    </div>
                    {ipo.listingGain && (
                      <div className="text-right">
                        <div className="text-sm text-gray-500 mb-1">Listing Gain</div>
                        <div className="font-bold text-lg text-green-600">{ipo.listingGain}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                    View Details
                  </button>
                  <button
                    className={`flex-1 bg-gradient-to-r ${getStatusColor(ipo.status)} text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-105`}
                  >
                    {ipo.status === "upcoming"
                      ? "Set Alert"
                      : ipo.status === "ongoing"
                        ? "Apply Now"
                        : "View Performance"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-800 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <Link
            href="/ipo"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Explore All IPOs
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
