"use client"

import { useState, useEffect, useCallback } from "react"

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
}

interface UseNewsApiOptions {
  category?: string
  searchQuery?: string
  pageSize?: number
  autoRefresh?: boolean
  refreshInterval?: number
}

export function useNewsApi(options: UseNewsApiOptions = {}) {
  const {
    category = "all",
    searchQuery = "",
    pageSize = 20,
    autoRefresh = true,
    refreshInterval = 5 * 60 * 1000, // 5 minutes
  } = options

  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchNews = useCallback(async () => {
    try {
      setError(null)

      // In a real implementation, this would be an actual API call
      // Example: const response = await fetch(`/api/news?category=${category}&q=${searchQuery}&pageSize=${pageSize}`)

      // Mock API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data - replace with actual API call
      const mockArticles: NewsArticle[] = [
        // ... your mock data here
      ]

      setArticles(mockArticles)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch news")
    } finally {
      setLoading(false)
    }
  }, [category, searchQuery, pageSize])

  const refreshNews = useCallback(() => {
    setLoading(true)
    fetchNews()
  }, [fetchNews])

  // Initial fetch
  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      fetchNews()
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval, fetchNews])

  return {
    articles,
    loading,
    error,
    lastUpdated,
    refreshNews,
    fetchNews,
  }
}
