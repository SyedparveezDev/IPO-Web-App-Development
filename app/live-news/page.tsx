"use client"

import { useState, useEffect, useCallback } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { Search, Clock, Share2, Bookmark, ExternalLink, TrendingUp, Eye, RefreshCw } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Mock news data structure
interface NewsArticle {
  id: string
  title: string
  description: string
  content: string
  url: string
  urlToImage: string
  publishedAt: string
  source: {
    id: string
    name: string
  }
  category: string
  author?: string
  readTime?: number
  views?: number
  isBookmarked?: boolean
}

// Mock categories
const categories = [
  { id: "all", name: "All News", count: 156 },
  { id: "ipo", name: "IPO", count: 45 },
  { id: "market", name: "Market", count: 38 },
  { id: "stocks", name: "Stocks", count: 32 },
  { id: "economy", name: "Economy", count: 25 },
  { id: "crypto", name: "Crypto", count: 16 },
]

// Mock trending topics
const trendingTopics = ["Adani IPO", "Market Rally", "RBI Policy", "Tech Stocks", "Banking Sector"]

export default function LiveNewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("publishedAt")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<string>>(new Set())

  // Mock news data
  const mockArticles: NewsArticle[] = [
    {
      id: "1",
      title: "Adani Power IPO Sees Overwhelming Response with 3.2x Subscription",
      description:
        "The IPO received bids for over 46,000 crore shares against the offered 14,500 crore shares, marking one of the most successful IPO launches this year.",
      content: "Adani Power's Initial Public Offering (IPO) has garnered exceptional investor interest...",
      url: "https://example.com/news/1",
      urlToImage: "/placeholder.svg?height=400&width=600",
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      source: { id: "economic-times", name: "Economic Times" },
      category: "ipo",
      author: "Rajesh Kumar",
      readTime: 3,
      views: 1250,
    },
    {
      id: "2",
      title: "Sensex Surges 500 Points as Banking Stocks Lead Market Rally",
      description:
        "Indian stock markets witnessed a strong rally today with the Sensex gaining over 500 points, driven by robust performance in banking and financial services stocks.",
      content: "The Indian stock markets opened on a positive note today...",
      url: "https://example.com/news/2",
      urlToImage: "/placeholder.svg?height=400&width=600",
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      source: { id: "business-standard", name: "Business Standard" },
      category: "market",
      author: "Priya Sharma",
      readTime: 4,
      views: 890,
    },
    {
      id: "3",
      title: "RBI Maintains Repo Rate at 6.5%, Focuses on Inflation Control",
      description:
        "The Reserve Bank of India kept the benchmark repo rate unchanged at 6.5% for the sixth consecutive time, citing concerns over persistent inflation.",
      content: "The Reserve Bank of India's Monetary Policy Committee...",
      url: "https://example.com/news/3",
      urlToImage: "/placeholder.svg?height=400&width=600",
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      source: { id: "mint", name: "Mint" },
      category: "economy",
      author: "Amit Verma",
      readTime: 5,
      views: 2100,
    },
    {
      id: "4",
      title: "Tech Stocks Rally as IT Sector Shows Strong Q3 Results",
      description:
        "Major IT companies reported better-than-expected quarterly results, leading to a significant rally in technology stocks on the Indian bourses.",
      content: "The technology sector witnessed a remarkable surge...",
      url: "https://example.com/news/4",
      urlToImage: "/placeholder.svg?height=400&width=600",
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      source: { id: "livemint", name: "LiveMint" },
      category: "stocks",
      author: "Sneha Patel",
      readTime: 4,
      views: 756,
    },
    {
      id: "5",
      title: "Cryptocurrency Market Rebounds as Bitcoin Crosses $45,000",
      description:
        "The cryptocurrency market showed signs of recovery with Bitcoin surpassing the $45,000 mark, bringing optimism to digital asset investors.",
      content: "Bitcoin, the world's largest cryptocurrency by market cap...",
      url: "https://example.com/news/5",
      urlToImage: "/placeholder.svg?height=400&width=600",
      publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      source: { id: "coindesk", name: "CoinDesk India" },
      category: "crypto",
      author: "Vikram Singh",
      readTime: 3,
      views: 1890,
    },
    {
      id: "6",
      title: "New IPO Pipeline: 5 Companies File DRHP with SEBI This Week $26,000",
      description:
        "Five companies across different sectors have filed their Draft Red Herring Prospectus with SEBI, indicating a robust IPO pipeline for the coming months.",
      content: "The Indian IPO market continues to show strong momentum...",
      url: "https://example.com/news/6",
      urlToImage: "/placeholder.svg?height=400&width=600",
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      source: { id: "moneycontrol", name: "MoneyControl" },
      category: "ipo",
      author: "Ravi Agarwal",
      readTime: 6,
      views: 945,
    },
  ]

  // Simulate API fetch
  const fetchNews = useCallback(
    async (refresh = false) => {
      if (refresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // In a real implementation, this would be an actual API call
        const fetchedArticles = mockArticles.map((article) => ({
          ...article,
          isBookmarked: bookmarkedArticles.has(article.id),
        }))

        setArticles(fetchedArticles)
      } catch (error) {
        console.error("Error fetching news:", error)
      } finally {
        setLoading(false)
        setRefreshing(false)
      }
    },
    [bookmarkedArticles],
  )

  // Filter and search articles
  useEffect(() => {
    let filtered = articles

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((article) => article.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.source.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Sort articles
    filtered.sort((a, b) => {
      if (sortBy === "publishedAt") {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      } else if (sortBy === "views") {
        return (b.views || 0) - (a.views || 0)
      }
      return 0
    })

    setFilteredArticles(filtered)
  }, [articles, selectedCategory, searchQuery, sortBy])

  // Initial fetch
  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(
      () => {
        fetchNews(true)
      },
      5 * 60 * 1000,
    )

    return () => clearInterval(interval)
  }, [fetchNews])

  const handleBookmark = (articleId: string) => {
    const newBookmarked = new Set(bookmarkedArticles)
    if (newBookmarked.has(articleId)) {
      newBookmarked.delete(articleId)
    } else {
      newBookmarked.add(articleId)
    }
    setBookmarkedArticles(newBookmarked)

    // Update articles
    setArticles((prev) =>
      prev.map((article) => ({
        ...article,
        isBookmarked: article.id === articleId ? !article.isBookmarked : article.isBookmarked,
      })),
    )
  }

  const handleShare = async (article: NewsArticle) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: article.url,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(article.url)
      // You could show a toast notification here
    }
  }

  const formatTimeAgo = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true })
  }

  if (loading && !refreshing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="h-48 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

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
          <span className="text-gray-600">Live News</span>
        </nav>
      </div>

      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-sm font-medium text-red-600">LIVE</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Market News</h1>
            <p className="text-gray-600">Stay updated with the latest financial and market news</p>
          </div>

          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <button
              onClick={() => fetchNews(true)}
              disabled={refreshing}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-indigo-100 text-indigo-600" : "text-gray-400"}`}
              >
                <div className="grid grid-cols-2 gap-1 w-4 h-4">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-indigo-100 text-indigo-600" : "text-gray-400"}`}
              >
                <div className="space-y-1 w-4 h-4">
                  <div className="bg-current h-1 rounded"></div>
                  <div className="bg-current h-1 rounded"></div>
                  <div className="bg-current h-1 rounded"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Trending Topics */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-5 w-5 text-orange-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Trending Now</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(topic)}
                className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200 transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search news articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                <option value="publishedAt">Latest First</option>
                <option value="views">Most Viewed</option>
              </select>
            </div>
          </div>
        </div>

        {/* News Articles */}
        <div
          className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}`}
        >
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${
                viewMode === "list" ? "flex" : ""
              }`}
            >
              {/* Article Image */}
              <div className={`${viewMode === "list" ? "w-64 flex-shrink-0" : "w-full"}`}>
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={article.urlToImage || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=400&width=600"
                    }}
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-indigo-600 text-white text-xs rounded-full">
                      {article.category.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium text-indigo-600">{article.source.name}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{formatTimeAgo(article.publishedAt)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleBookmark(article.id)}
                      className={`p-1 rounded ${
                        article.isBookmarked ? "text-yellow-500" : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      <Bookmark className={`h-4 w-4 ${article.isBookmarked ? "fill-current" : ""}`} />
                    </button>
                    <button onClick={() => handleShare(article)} className="p-1 text-gray-400 hover:text-gray-600">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    {article.author && <span>By {article.author}</span>}
                    {article.readTime && (
                      <>
                        <span>•</span>
                        <span>{article.readTime} min read</span>
                      </>
                    )}
                    {article.views && (
                      <>
                        <span>•</span>
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          <span>{article.views.toLocaleString()}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <Link
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    Read More
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Load More */}
        {filteredArticles.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 font-medium">
              Load More Articles
            </button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
