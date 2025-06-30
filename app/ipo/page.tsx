"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react"

// Mock IPO data
const upcomingIPOs = [
  {
    id: 1,
    company: "Nova Agritech Ltd.",
    logo: "/images/nova-agritech-logo.png",
    priceBand: "Rs 39 - 41",
    open: "2024-01-22",
    close: "2024-01-24",
    issueSize: "143.81 Cr.",
    issueType: "Book Built",
    listingDate: "2024-01-30",
  },
  {
    id: 2,
    company: "EPACK Durable Ltd.",
    logo: "/images/epack-logo.png",
    priceBand: "Rs 218 - 230",
    open: "2024-01-19",
    close: "2024-01-23",
    issueSize: "640.05 Cr.",
    issueType: "Book Built",
    listingDate: "2024-01-29",
  },
  {
    id: 3,
    company: "RK Swamy Ltd.",
    logo: "/images/rk-swamy-logo.png",
    priceBand: "Not Issued",
    open: "Not Issued",
    close: "Not Issued",
    issueSize: "Not Issued",
    issueType: "Book Built",
    listingDate: "Not Issued",
  },
]

const ongoingIPOs = [
  {
    id: 1,
    company: "Medi Assist Healthcare Services Ltd. IPO",
    logo: "/placeholder.svg?height=60&width=60",
    priceBand: "Rs 218 - 230",
    open: "2024-01-19",
    close: "2024-01-23",
    issueSize: "640.05 Cr.",
    issueType: "Book Built",
    listingDate: "2024-01-29",
  },
]

const newListedIPOs = [
  {
    id: 1,
    company: "Jyoti CNC Automation Ltd.",
    logo: "/placeholder.svg?height=60&width=60",
    ipoPrice: "Rs 331",
    listingPrice: "Rs 370",
    listingGain: "11.78%",
    listingDate: "2024-01-16",
    cmp: "Rs 455.75",
    currentReturn: "37.69%",
  },
  {
    id: 2,
    company: "Innova Captab Ltd.",
    logo: "/placeholder.svg?height=60&width=60",
    ipoPrice: "Rs 448",
    listingPrice: "Rs 452.1",
    listingGain: "0.92%",
    listingDate: "2023-12-29",
    cmp: "Rs 515",
    currentReturn: "14.96%",
  },
  {
    id: 3,
    company: "Azad Engineering Ltd.",
    logo: "/placeholder.svg?height=60&width=60",
    ipoPrice: "Rs 524",
    listingPrice: "Rs 720",
    listingGain: "37.4%",
    listingDate: "2023-12-28",
    cmp: "Rs 663.25",
    currentReturn: "26.57%",
  },
]

const faqData = [
  {
    question: "What is an IPO?",
    answer:
      "IPO or the Initial Public Offering is the first time a company issues its shares to the public. As an investor, you will now be able to subscribe for such shares, which was earlier open to only a specific lot of internal and institutional investors via opening a Demat account.",
  },
  {
    question: "How to invest in an IPO?",
    answer:
      "To invest in an IPO, you need to have a Demat account and a trading account. You can apply for IPO shares through your broker's platform or directly through the company's registrar.",
  },
  {
    question: "What is the benefit of an IPO?",
    answer:
      "IPOs offer potential for high returns, early investment opportunity in growing companies, and the chance to be part of a company's growth story from the beginning.",
  },
  {
    question: "Where do I get an IPO application form?",
    answer:
      "IPO application forms are available through your broker's online platform, bank branches, or can be downloaded from the company's website or registrar's website.",
  },
  {
    question: "How one can apply in IPO's online?",
    answer:
      "You can apply for IPOs online through your broker's trading platform, internet banking, or mobile apps provided by brokers and banks.",
  },
  {
    question: "How one can apply in IPO's offline?",
    answer:
      "For offline application, you can fill physical application forms available at bank branches, broker offices, or designated collection centers and submit them with payment.",
  },
]

export default function IPOPage() {
  const [currentUpcomingSlide, setCurrentUpcomingSlide] = useState(0)
  const [currentNewListedSlide, setCurrentNewListedSlide] = useState(0)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0)

  const nextUpcomingSlide = () => {
    setCurrentUpcomingSlide((prev) => (prev + 1) % Math.ceil(upcomingIPOs.length / 3))
  }

  const prevUpcomingSlide = () => {
    setCurrentUpcomingSlide(
      (prev) => (prev - 1 + Math.ceil(upcomingIPOs.length / 3)) % Math.ceil(upcomingIPOs.length / 3),
    )
  }

  const nextNewListedSlide = () => {
    setCurrentNewListedSlide((prev) => (prev + 1) % Math.ceil(newListedIPOs.length / 3))
  }

  const prevNewListedSlide = () => {
    setCurrentNewListedSlide(
      (prev) => (prev - 1 + Math.ceil(newListedIPOs.length / 3)) % Math.ceil(newListedIPOs.length / 3),
    )
  }

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main IPO Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* IPO Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">IPO</h1>
          <p className="text-gray-600">Following is the list of companies for IPO as of today.</p>
        </div>

        {/* Upcoming IPOs Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upcoming</h2>
              <p className="text-gray-600">
                Companies that have filed for an IPO with SEBI. New details might be disclosed by the companies later
                on.
              </p>
            </div>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 font-medium">
              View All
            </button>
          </div>

          {/* IPO Cards Carousel */}
          <div className="relative">
            <div className="flex items-center">
              <button
                onClick={prevUpcomingSlide}
                className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="overflow-hidden mx-12">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentUpcomingSlide * 100}%)` }}
                >
                  {upcomingIPOs.map((ipo) => (
                    <div key={ipo.id} className="w-1/3 flex-shrink-0 px-3">
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        {/* Company Header */}
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-bold text-sm">
                              {ipo.company
                                .split(" ")
                                .map((word) => word[0])
                                .join("")
                                .slice(0, 3)}
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-900 text-sm">{ipo.company}</h3>
                        </div>

                        {/* IPO Details Grid */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">PRICE BAND</p>
                            <p className="text-sm font-medium">{ipo.priceBand}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">OPEN</p>
                            <p className="text-sm font-medium">{ipo.open}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">CLOSE</p>
                            <p className="text-sm font-medium">{ipo.close}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">ISSUE SIZE</p>
                            <p className="text-sm font-medium">{ipo.issueSize}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">ISSUE TYPE</p>
                            <p className="text-sm font-medium">{ipo.issueType}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">LISTING DATE</p>
                            <p className="text-sm font-medium">{ipo.listingDate}</p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200">
                            RHP
                          </button>
                          <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200">
                            DRHP
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={nextUpcomingSlide}
                className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: Math.ceil(upcomingIPOs.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentUpcomingSlide ? "bg-indigo-600" : "bg-gray-300"}`}
                  onClick={() => setCurrentUpcomingSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Ongoing IPOs Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Ongoing</h2>
              <p className="text-gray-600">
                Companies where the IPO investment process is started and will be listed soon in the stock market for
                regular trading.
              </p>
            </div>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 font-medium">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ongoingIPOs.map((ipo) => (
              <div key={ipo.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{ipo.company}</h3>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">PRICE BAND</p>
                    <p className="text-sm font-medium">{ipo.priceBand}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">OPEN</p>
                    <p className="text-sm font-medium">{ipo.open}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">CLOSE</p>
                    <p className="text-sm font-medium">{ipo.close}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">ISSUE SIZE</p>
                    <p className="text-sm font-medium">{ipo.issueSize}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">ISSUE TYPE</p>
                    <p className="text-sm font-medium">{ipo.issueType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">LISTING DATE</p>
                    <p className="text-sm font-medium">{ipo.listingDate}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200">
                    RHP
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200">
                    DRHP
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* IPO Application CTA */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center">
                <span className="text-indigo-600 font-bold text-2xl">B</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Applying for this IPO?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              The way you compare & invest in only the best IPO, let us help you get started by comparing and selecting
              the best Demat account. Open your Demat account now to apply for your favourite IPO.
            </p>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 font-medium">
              Open a Demat Account
            </button>
          </div>
        </section>

        {/* New Listed IPOs Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">New Listed</h2>
              <p className="text-gray-600">
                Companies that have been listed recently through an IPO Find their listing gains and returns here.
              </p>
            </div>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 font-medium">
              View All
            </button>
          </div>

          <div className="relative">
            <div className="flex items-center">
              <button
                onClick={prevNewListedSlide}
                className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="overflow-hidden mx-12">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentNewListedSlide * 100}%)` }}
                >
                  {newListedIPOs.map((ipo) => (
                    <div key={ipo.id} className="w-1/3 flex-shrink-0 px-3">
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-gray-600 font-bold text-sm">
                              {ipo.company
                                .split(" ")
                                .map((word) => word[0])
                                .join("")
                                .slice(0, 3)}
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-900 text-sm">{ipo.company}</h3>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">IPO PRICE</p>
                            <p className="text-sm font-medium">{ipo.ipoPrice}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">LISTING PRICE</p>
                            <p className="text-sm font-medium">{ipo.listingPrice}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">LISTING GAIN</p>
                            <p className="text-sm font-medium text-green-600">{ipo.listingGain}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">LISTING DATE</p>
                            <p className="text-sm font-medium">{ipo.listingDate}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">CMP</p>
                            <p className="text-sm font-medium">{ipo.cmp}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">CURRENT RETURN</p>
                            <p className="text-sm font-medium text-green-600">{ipo.currentReturn}</p>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200">
                            RHP
                          </button>
                          <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200">
                            DRHP
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={nextNewListedSlide}
                className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: Math.ceil(newListedIPOs.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentNewListedSlide ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentNewListedSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* IPO News & Analysis Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* IPO News */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">IPO News</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-medium text-gray-900 mb-1">Brainbees Solutions files DRHP with SEBI</h4>
                  <p className="text-sm text-gray-500">01 Dec, 2:40 PM</p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-medium text-gray-900 mb-1">Gretek Share Broking files DRHP with SEBI</h4>
                  <p className="text-sm text-gray-500">23 Dec, 2:47 PM</p>
                </div>
              </div>
            </div>

            {/* IPO Analysis */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">IPO Analysis</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-medium text-gray-900 mb-1">
                    Euphoria Infotech India coming with IPO to raise upto Rs 9.60 crore
                  </h4>
                  <p className="text-sm text-gray-500">18 Jan, 2:30 PM</p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-medium text-gray-900 mb-1">
                    EPACK Durable coming with IPO to raise upto Rs 562 crore
                  </h4>
                  <p className="text-sm text-gray-500">17 Jan, 3:30 PM</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Qualitek Labs coming with IPO to raise Rs 19.64 crore
                  </h4>
                  <p className="text-sm text-gray-500">17 Jan, 3:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions?</h2>
            <p className="text-gray-600">Find answers to common questions that come in your mind related to IPO.</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <Minus className="h-5 w-5 text-indigo-600" />
                  ) : (
                    <Plus className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
