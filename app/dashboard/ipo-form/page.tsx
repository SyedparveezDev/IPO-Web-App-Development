"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, Bell, ChevronDown, Menu, X, Save, ArrowLeft, BarChart3, TrendingUp } from "lucide-react"

export default function IPOFormPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "Vodafone Idea",
    priceBand: "Not Issued",
    open: "Not Issued",
    close: "Not Issued",
    issueSize: "2330.15 Cr.",
    issueType: "Book Built",
    listingDate: "Not Issued",
    status: "Not Issued",
    ipoPrice: "₹ 363",
    listingPrice: "₹ 410",
    listingGain: "13.04 %",
    listingDate2: "2024-06-30",
    cmp: "₹ 630",
    currentReturn: "+ 105 %",
    rhp: "",
    drhp: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#6366f1] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">BF</span>
            </div>
            <span className="ml-2 text-sm font-medium">Bluestock Fintech</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-4">
          <div className="px-4 py-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">MENU</span>
          </div>

          <Link
            href="/dashboard"
            className="flex items-center mx-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg mb-1"
          >
            <BarChart3 className="mr-3 h-4 w-4" />
            Dashboard
          </Link>

          <Link
            href="/dashboard/manage-ipo"
            className="flex items-center mx-3 px-3 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg mb-1"
          >
            <TrendingUp className="mr-3 h-4 w-4" />
            Manage IPO
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4">
                <Menu className="h-6 w-6" />
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent w-64"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">V</span>
                </div>
                <span className="text-sm font-medium">Hi, Vishal</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/manage-ipo" className="text-gray-600 hover:text-gray-800">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Upcoming IPO Information</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
                Cancel
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save Info</span>
              </button>
            </div>
          </div>

          <p className="text-gray-600 mb-6">Manage your IPO Details</p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left sidebar navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <nav className="p-4 space-y-1">
                  <Link
                    href="#"
                    className="flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg"
                  >
                    <span className="mr-3">📊</span>
                    IPO Information
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    <span className="mr-3">ℹ️</span>
                    IPO Info
                  </Link>
                </nav>
              </div>
            </div>

            {/* Main form content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">IPO Information</h2>
                <p className="text-gray-600 mb-6">Enter IPO Details</p>

                {/* Company Logo Section */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Company Logo</label>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">HSE</span>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
                      >
                        Select Logo
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                {/* Form fields in grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Band</label>
                    <input
                      type="text"
                      name="priceBand"
                      value={formData.priceBand}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Open Date</label>
                    <input
                      type="text"
                      name="open"
                      value={formData.open}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Close Date</label>
                    <input
                      type="text"
                      name="close"
                      value={formData.close}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Issue Size</label>
                    <input
                      type="text"
                      name="issueSize"
                      value={formData.issueSize}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Issue Type</label>
                    <select
                      name="issueType"
                      value={formData.issueType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    >
                      <option value="Book Built">Book Built</option>
                      <option value="Fixed Price">Fixed Price</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Listing Date</label>
                    <input
                      type="text"
                      name="listingDate"
                      value={formData.listingDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    >
                      <option value="Not Issued">Not Issued</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Listed">Listed</option>
                    </select>
                  </div>
                </div>

                {/* New Listed IPO Details Section */}
                <div className="border-t pt-6 mt-6">
                  <h3 className="text-lg font-semibold mb-4">NEW LISTED IPO DETAILS (WHEN IPO GET LISTED)</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">IPO PRICE</label>
                      <input
                        type="text"
                        name="ipoPrice"
                        value={formData.ipoPrice}
                        onChange={handleInputChange}
                        placeholder="₹ 363"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">LISTING PRICE</label>
                      <input
                        type="text"
                        name="listingPrice"
                        value={formData.listingPrice}
                        onChange={handleInputChange}
                        placeholder="₹ 410"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">LISTING GAIN</label>
                      <input
                        type="text"
                        name="listingGain"
                        value={formData.listingGain}
                        onChange={handleInputChange}
                        placeholder="13.04 %"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">LISTING DATE</label>
                      <input
                        type="date"
                        name="listingDate2"
                        value={formData.listingDate2}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CMP</label>
                      <input
                        type="text"
                        name="cmp"
                        value={formData.cmp}
                        onChange={handleInputChange}
                        placeholder="₹ 630"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CURRENT RETURN</label>
                      <input
                        type="text"
                        name="currentReturn"
                        value={formData.currentReturn}
                        onChange={handleInputChange}
                        placeholder="+ 105 %"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">RHP</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="rhp"
                          value={formData.rhp}
                          onChange={handleInputChange}
                          placeholder="Enter RHP PDF Link"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                        />
                        <button
                          type="button"
                          className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          Upload
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">DRHP</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="drhp"
                          value={formData.drhp}
                          onChange={handleInputChange}
                          placeholder="Enter DRHP PDF Link"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                        />
                        <button
                          type="button"
                          className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          Upload
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}
