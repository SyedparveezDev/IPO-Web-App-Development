"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { Star, CheckCircle, ExternalLink } from "lucide-react"
import { useSearchParams } from "next/navigation"

// Mock broker data
const brokersData = [
  {
    id: 1,
    name: "Axis Direct",
    rating: 4.2,
    reviews: "15k",
    accounts: "50.2K",
    logo: "/placeholder.svg?height=80&width=120",
    bgColor: "bg-purple-100",
    logoColor: "bg-purple-600",
    features: {
      equity: true,
      commodity: true,
      currency: true,
      futures: true,
      options: true,
    },
    charges: {
      accountOpening: "₹0",
      maintenance: "₹0",
      deliveryBrokerage: "₹20",
      intradayBrokerage: "₹20",
    },
  },
  {
    id: 2,
    name: "Fyers",
    rating: 4.1,
    reviews: "12k",
    accounts: "45.8K",
    logo: "/placeholder.svg?height=80&width=120",
    bgColor: "bg-blue-100",
    logoColor: "bg-blue-600",
    features: {
      equity: true,
      commodity: true,
      currency: true,
      futures: true,
      options: true,
    },
    charges: {
      accountOpening: "₹0",
      maintenance: "₹300",
      deliveryBrokerage: "₹0",
      intradayBrokerage: "₹20",
    },
  },
  {
    id: 3,
    name: "Geojit",
    rating: 4.0,
    reviews: "18k",
    accounts: "52.1K",
    logo: "/placeholder.svg?height=80&width=120",
    bgColor: "bg-yellow-100",
    logoColor: "bg-teal-600",
    features: {
      equity: true,
      commodity: true,
      currency: true,
      futures: true,
      options: true,
    },
    charges: {
      accountOpening: "₹0",
      maintenance: "₹300",
      deliveryBrokerage: "₹20",
      intradayBrokerage: "₹20",
    },
  },
  {
    id: 4,
    name: "Motilal Oswal",
    rating: 4.3,
    reviews: "22k",
    accounts: "48.7K",
    logo: "/placeholder.svg?height=80&width=120",
    bgColor: "bg-yellow-100",
    logoColor: "bg-orange-600",
    features: {
      equity: true,
      commodity: true,
      currency: true,
      futures: true,
      options: true,
    },
    charges: {
      accountOpening: "₹0",
      maintenance: "₹300",
      deliveryBrokerage: "₹20",
      intradayBrokerage: "₹20",
    },
  },
  {
    id: 5,
    name: "Nuvama",
    rating: 4.1,
    reviews: "14k",
    accounts: "38.9K",
    logo: "/placeholder.svg?height=80&width=120",
    bgColor: "bg-blue-100",
    logoColor: "bg-red-500",
    features: {
      equity: true,
      commodity: true,
      currency: true,
      futures: true,
      options: true,
    },
    charges: {
      accountOpening: "₹0",
      maintenance: "₹300",
      deliveryBrokerage: "₹20",
      intradayBrokerage: "₹20",
    },
  },
  {
    id: 6,
    name: "Paytm Money",
    rating: 4.0,
    reviews: "25k",
    accounts: "65.3K",
    logo: "/placeholder.svg?height=80&width=120",
    bgColor: "bg-blue-100",
    logoColor: "bg-blue-600",
    features: {
      equity: true,
      commodity: true,
      currency: true,
      futures: true,
      options: true,
    },
    charges: {
      accountOpening: "₹0",
      maintenance: "₹0",
      deliveryBrokerage: "₹0",
      intradayBrokerage: "₹20",
    },
  },
  {
    id: 7,
    name: "Upstox",
    rating: 4.2,
    reviews: "35k",
    accounts: "78.2K",
    logo: "/placeholder.svg?height=80&width=120",
    bgColor: "bg-purple-100",
    logoColor: "bg-purple-600",
    features: {
      equity: true,
      commodity: true,
      currency: true,
      futures: true,
      options: true,
    },
    charges: {
      accountOpening: "₹0",
      maintenance: "₹0",
      deliveryBrokerage: "₹20",
      intradayBrokerage: "₹20",
    },
  },
  {
    id: 8,
    name: "AngleOne",
    rating: 4.1,
    reviews: "28k",
    accounts: "55.7K",
    logo: "/placeholder.svg?height=80&width=120",
    bgColor: "bg-yellow-100",
    logoColor: "bg-orange-500",
    features: {
      equity: true,
      commodity: true,
      currency: true,
      futures: true,
      options: true,
    },
    charges: {
      accountOpening: "₹0",
      maintenance: "₹0",
      deliveryBrokerage: "₹20",
      intradayBrokerage: "₹20",
    },
  },
  {
    id: 9,
    name: "HDFC Securities",
    rating: 4.4,
    reviews: "42k",
    accounts: "89.1K",
    logo: "/placeholder.svg?height=80&width=120",
    bgColor: "bg-blue-100",
    logoColor: "bg-blue-700",
    features: {
      equity: true,
      commodity: true,
      currency: true,
      futures: true,
      options: true,
    },
    charges: {
      accountOpening: "₹0",
      maintenance: "₹300",
      deliveryBrokerage: "₹20",
      intradayBrokerage: "₹20",
    },
  },
  {
    id: 10,
    name: "IIFL Securities",
    rating: 4.0,
    reviews: "19k",
    accounts: "41.3K",
    logo: "/placeholder.svg?height=80&width=120",
    bgColor: "bg-yellow-100",
    logoColor: "bg-purple-700",
    features: {
      equity: true,
      commodity: true,
      currency: true,
      futures: true,
      options: true,
    },
    charges: {
      accountOpening: "₹0",
      maintenance: "₹300",
      deliveryBrokerage: "₹20",
      intradayBrokerage: "₹20",
    },
  },
  {
    id: 11,
    name: "Kotak Securities",
    rating: 4.3,
    reviews: "31k",
    accounts: "67.8K",
    logo: "/placeholder.svg?height=80&width=120",
    bgColor: "bg-blue-100",
    logoColor: "bg-red-600",
    features: {
      equity: true,
      commodity: true,
      currency: true,
      futures: true,
      options: true,
    },
    charges: {
      accountOpening: "₹0",
      maintenance: "₹300",
      deliveryBrokerage: "₹20",
      intradayBrokerage: "₹20",
    },
  },
  {
    id: 12,
    name: "Groww",
    rating: 4.5,
    reviews: "58k",
    accounts: "95.4K",
    logo: "/placeholder.svg?height=80&width=120",
    bgColor: "bg-blue-100",
    logoColor: "bg-green-500",
    features: {
      equity: true,
      commodity: true,
      currency: true,
      futures: true,
      options: true,
    },
    charges: {
      accountOpening: "₹0",
      maintenance: "₹0",
      deliveryBrokerage: "₹0",
      intradayBrokerage: "₹20",
    },
  },
  {
    id: 13,
    name: "Dhan",
    rating: 4.2,
    reviews: "16k",
    accounts: "32.5K",
    logo: "/placeholder.svg?height=80&width=120",
    bgColor: "bg-yellow-100",
    logoColor: "bg-green-600",
    features: {
      equity: true,
      commodity: true,
      currency: true,
      futures: true,
      options: true,
    },
    charges: {
      accountOpening: "₹0",
      maintenance: "₹0",
      deliveryBrokerage: "₹0",
      intradayBrokerage: "₹20",
    },
  },
  {
    id: 14,
    name: "Alice Blue",
    rating: 4.0,
    reviews: "21k",
    accounts: "44.2K",
    logo: "/placeholder.svg?height=80&width=120",
    bgColor: "bg-blue-100",
    logoColor: "bg-blue-500",
    features: {
      equity: true,
      commodity: true,
      currency: true,
      futures: true,
      options: true,
    },
    charges: {
      accountOpening: "₹0",
      maintenance: "₹300",
      deliveryBrokerage: "₹20",
      intradayBrokerage: "₹20",
    },
  },
]

export default function BrokersPage() {
  const searchParams = useSearchParams()
  const filterParam = searchParams.get("filter")

  const [sortBy, setSortBy] = useState("rating")
  const [filterBy, setFilterBy] = useState(filterParam || "all")

  useEffect(() => {
    if (filterParam) {
      setFilterBy(filterParam)
    }
  }, [filterParam])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  const filteredAndSortedBrokers = [...brokersData]
    .filter((broker) => {
      if (filterBy === "zero-brokerage") {
        return broker.charges.deliveryBrokerage === "₹0" || broker.charges.intradayBrokerage === "₹0"
      }
      if (filterBy === "full-service") {
        return Number.parseInt(broker.charges.maintenance.replace("₹", "")) > 0
      }
      if (filterBy === "discount") {
        return broker.charges.maintenance === "₹0"
      }
      return true
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "reviews") return Number.parseInt(b.reviews) - Number.parseInt(a.reviews)
      if (sortBy === "accounts") return Number.parseFloat(b.accounts) - Number.parseFloat(a.accounts)
      return 0
    })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm">
          <Link href="/" className="text-indigo-600 hover:text-indigo-700">
            Home
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-600">All Brokers</span>
        </nav>
      </div>

      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-900">Made to</span>
            <span className="text-green-500">Trade</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare and choose from India's leading brokers. Find the perfect trading partner for your investment
            journey.
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="rating">Rating</option>
              <option value="reviews">Reviews</option>
              <option value="accounts">Accounts</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by:</label>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="all">All Brokers</option>
              <option value="zero-brokerage">Zero Brokerage</option>
              <option value="full-service">Full Service</option>
              <option value="discount">Discount Brokers</option>
            </select>
          </div>
        </div>

        {/* Brokers Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredAndSortedBrokers.map((broker) => (
            <div key={broker.id} className={`${broker.bgColor} rounded-lg p-6 shadow-sm border border-gray-200`}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Broker Info - Left Side */}
                <div className="lg:col-span-3">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{broker.name}</h3>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center mr-2">{renderStars(broker.rating)}</div>
                    <span className="text-sm text-gray-600">{broker.rating}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-gray-800 rounded-full mr-2"></div>
                      <span className="text-sm font-medium">{broker.reviews}</span>
                      <span className="text-sm text-gray-600 ml-1">Reviews</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-gray-800 rounded-full mr-2"></div>
                      <span className="text-sm font-medium">{broker.accounts}</span>
                      <span className="text-sm text-gray-600 ml-1">Accounts</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Open Demat A/c for FREE</p>
                    <div className="flex space-x-2">
                      <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center">
                        Open A/c
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>

                {/* Features - Middle */}
                <div className="lg:col-span-2">
                  <div className="space-y-2">
                    {Object.entries(broker.features).map(([feature, available]) => (
                      <div key={feature} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-700 capitalize">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Charges - Middle Right */}
                <div className="lg:col-span-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">A/C Opening Charge</p>
                      <p className="text-sm font-medium">{broker.charges.accountOpening}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Maintenance Charge</p>
                      <p className="text-sm font-medium">{broker.charges.maintenance}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Delivery Brokerage</p>
                      <p className="text-sm font-medium">{broker.charges.deliveryBrokerage}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Intraday Brokerage</p>
                      <p className="text-sm font-medium">{broker.charges.intradayBrokerage}</p>
                    </div>
                  </div>
                </div>

                {/* Logo - Right Side */}
                <div className="lg:col-span-3 flex justify-center lg:justify-end">
                  <div className={`${broker.logoColor} rounded-lg p-4 w-32 h-20 flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">{broker.name.slice(0, 2).toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 font-medium">
            Load More Brokers
          </button>
        </div>
      </section>

      {/* Comparison CTA */}
      <section className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Compare Brokers Side by Side</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Get detailed comparison of features, charges, and services to make the right choice
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-medium">
            Start Comparison
          </button>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Through Bluestock?</h2>
            <p className="text-xl text-gray-600">We help you make informed decisions with transparent comparisons</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Information</h3>
              <p className="text-gray-600">All broker information is verified and updated regularly</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real Reviews</h3>
              <p className="text-gray-600">Authentic reviews from real traders and investors</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Account Opening</h3>
              <p className="text-gray-600">Seamless account opening process with our partner brokers</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
