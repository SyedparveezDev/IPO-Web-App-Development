import { type NextRequest, NextResponse } from "next/server"

// Mock news data for demonstration
const mockNewsData = [
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
  // Add more mock articles here...
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || "all"
    const query = searchParams.get("q") || ""
    const pageSize = Number.parseInt(searchParams.get("pageSize") || "20")
    const page = Number.parseInt(searchParams.get("page") || "1")

    // In a real implementation, you would:
    // 1. Fetch from a real news API (NewsAPI, Guardian API, etc.)
    // 2. Apply filters and pagination
    // 3. Handle rate limiting and caching

    let filteredArticles = mockNewsData

    // Filter by category
    if (category !== "all") {
      filteredArticles = filteredArticles.filter((article) => article.category === category)
    }

    // Filter by search query
    if (query) {
      filteredArticles = filteredArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.description.toLowerCase().includes(query.toLowerCase()),
      )
    }

    // Pagination
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex)

    return NextResponse.json({
      articles: paginatedArticles,
      totalResults: filteredArticles.length,
      page,
      pageSize,
      totalPages: Math.ceil(filteredArticles.length / pageSize),
    })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}
