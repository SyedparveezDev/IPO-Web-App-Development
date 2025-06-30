"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

export default function CompareBrokersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <Link href="/" className="text-indigo-600 hover:text-indigo-700">
            Home
          </Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-600">Compare Brokers</span>
        </nav>

        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Compare Brokers</h1>
          <p className="text-xl text-gray-600 mb-8">
            Side-by-side comparison of broker features, charges, and services
          </p>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
            <div className="text-gray-500 mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Broker Comparison Tool</h3>
              <p>Coming Soon - Compare multiple brokers side by side</p>
            </div>

            <Link
              href="/brokers"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium inline-block"
            >
              View All Brokers
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
