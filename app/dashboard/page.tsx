"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  BarChart3,
  TrendingUp,
  Users,
  Settings,
  HelpCircle,
  Search,
  Bell,
  User,
  ChevronDown,
  Menu,
  X,
  ArrowUp,
  ExternalLink,
} from "lucide-react"

// Mock data for the dashboard
const dashboardData = {
  totalIPOs: 30,
  ipoInGain: 20,
  ipoInLoss: 9,
  upcomingIPOs: 15,
  newListed: 25,
  ongoing: 2,
}

const quickLinks = [
  {
    name: "NSE India",
    icon: "🔴",
    action: "Visit Now",
    bgColor: "bg-red-100",
    iconBg: "bg-red-500",
  },
  {
    name: "BSE India",
    icon: "SE",
    action: "Visit Now",
    bgColor: "bg-blue-100",
    iconBg: "bg-blue-600",
  },
  {
    name: "SEBI",
    icon: "🏛️",
    action: "Visit Now",
    bgColor: "bg-indigo-100",
    iconBg: "bg-indigo-600",
  },
  {
    name: "Money Control",
    icon: "💰",
    action: "Visit Now",
    bgColor: "bg-teal-100",
    iconBg: "bg-teal-600",
  },
]

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">BF</span>
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">Bluestock Fintech</span>
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
            className="flex items-center mx-3 px-3 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg mb-1"
          >
            <BarChart3 className="mr-3 h-4 w-4" />
            Dashboard
          </Link>

          <Link
            href="/dashboard/manage-ipo"
            className="flex items-center mx-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg mb-1"
          >
            <TrendingUp className="mr-3 h-4 w-4" />
            Manage IPO
          </Link>

          <Link
            href="/dashboard/ipo-subscription"
            className="flex items-center mx-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg mb-1"
          >
            <Users className="mr-3 h-4 w-4" />
            IPO Subscription
          </Link>

          <Link
            href="/dashboard/ipo-allotment"
            className="flex items-center mx-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg mb-1"
          >
            <BarChart3 className="mr-3 h-4 w-4" />
            IPO Allotment
          </Link>

          <div className="px-4 py-2 mt-4">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">OTHERS</span>
          </div>

          <Link
            href="/dashboard/settings"
            className="flex items-center mx-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg mb-1"
          >
            <Settings className="mr-3 h-4 w-4" />
            Settings
          </Link>

          <Link
            href="/dashboard/api-manager"
            className="flex items-center mx-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg mb-1"
          >
            <BarChart3 className="mr-3 h-4 w-4" />
            API Manager
          </Link>

          <Link
            href="/dashboard/accounts"
            className="flex items-center mx-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg mb-1"
          >
            <User className="mr-3 h-4 w-4" />
            Accounts
          </Link>

          <Link
            href="/dashboard/help"
            className="flex items-center mx-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg mb-1"
          >
            <HelpCircle className="mr-3 h-4 w-4" />
            Help
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
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent w-64"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
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

        {/* Dashboard Content */}
        <main className="p-6 bg-gray-50">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* IPO Dashboard India - exact match */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">IPO Dashboard India</h2>

              <div className="flex items-center mb-6">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">{dashboardData.ipoInGain} IPO in Gain</span>
              </div>

              {/* Overlapping Circles Visualization */}
              <div className="relative h-64 flex items-center justify-center">
                {/* Total IPO - Large Orange Circle */}
                <div className="absolute w-32 h-32 bg-orange-400 rounded-full flex items-center justify-center text-white z-10 transform translate-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{dashboardData.totalIPOs}</div>
                    <div className="text-xs">Total IPO</div>
                  </div>
                </div>

                {/* IPO in Gain - Cyan Circle */}
                <div className="absolute w-24 h-24 bg-cyan-400 rounded-full flex items-center justify-center text-white z-20 transform -translate-x-8 translate-y-4">
                  <div className="text-center">
                    <div className="text-xl font-bold">{dashboardData.ipoInGain}</div>
                    <div className="text-xs">IPO in Gain</div>
                  </div>
                </div>

                {/* IPO in Loss - Purple Circle */}
                <div className="absolute w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center text-white z-15 transform -translate-x-4 -translate-y-8">
                  <div className="text-center">
                    <div className="text-lg font-bold">{dashboardData.ipoInLoss}</div>
                    <div className="text-xs">IPO in Loss</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links - exact match */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Quick Links</h3>
              <p className="text-sm text-gray-500 mb-6">Adipiscing elit, sed do eiusmod tempor</p>

              <div className="space-y-4">
                {quickLinks.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${link.iconBg} rounded-full flex items-center justify-center`}>
                        {link.name === "BSE India" ? (
                          <span className="text-white font-bold text-xs">SE</span>
                        ) : (
                          <span className="text-lg">{link.icon}</span>
                        )}
                      </div>
                      <span className="font-medium text-gray-900">{link.name}</span>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center">
                      {link.action}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Board IPO - exact match */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Main Board IPO</h3>
                  <p className="text-sm text-gray-500">From 01 Jan 2024</p>
                </div>
                <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">View Report</button>
              </div>

              {/* Donut Chart */}
              <div className="relative w-48 h-48 mx-auto mb-6">
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 42 42">
                  {/* Background circle */}
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#e5e7eb" strokeWidth="3" />

                  {/* Upcoming segment */}
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="#6366f1"
                    strokeWidth="3"
                    strokeDasharray="35 65"
                    strokeDashoffset="0"
                  />

                  {/* New Listed segment */}
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="#8b5cf6"
                    strokeWidth="3"
                    strokeDasharray="25 75"
                    strokeDashoffset="-35"
                  />

                  {/* Ongoing segment */}
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    strokeDasharray="5 95"
                    strokeDashoffset="-60"
                  />
                </svg>

                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-gray-800 text-white px-4 py-2 rounded-lg text-center">
                    <div className="text-xs text-gray-300">Afternoon</div>
                    <div className="text-xs text-gray-300">IPO NSE & BSE</div>
                    <div className="text-2xl font-bold">15</div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                    <span className="text-sm text-gray-600">Upcoming</span>
                  </div>
                  <span className="text-sm font-medium">{dashboardData.upcomingIPOs}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">New Listed</span>
                  </div>
                  <span className="text-sm font-medium">{dashboardData.newListed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Ongoing</span>
                  </div>
                  <span className="text-sm font-medium">{dashboardData.ongoing}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Updates Section */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Live Market Data */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Live Market Updates</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-500">Live</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">NIFTY 50</div>
                    <div className="text-sm text-gray-500">NSE</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">19,674.25</div>
                    <div className="text-sm text-green-600">+1.2%</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">SENSEX</div>
                    <div className="text-sm text-gray-500">BSE</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-red-600">66,230.15</div>
                    <div className="text-sm text-red-600">-0.8%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Recent Activities</h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">New IPO Added</div>
                    <div className="text-xs text-gray-500">Tata Motors IPO was added to the system</div>
                    <div className="text-xs text-gray-400">{formatTime(currentTime)}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">IPO Status Updated</div>
                    <div className="text-xs text-gray-500">Adani Power IPO status changed to Listed</div>
                    <div className="text-xs text-gray-400">2 hours ago</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">User Registration</div>
                    <div className="text-xs text-gray-500">5 new users registered today</div>
                    <div className="text-xs text-gray-400">4 hours ago</div>
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
