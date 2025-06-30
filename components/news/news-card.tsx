"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, Share2, Bookmark, ExternalLink, Eye } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface NewsArticle {
  id: string
  title: string
  description: string
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

interface NewsCardProps {
  article: NewsArticle
  viewMode?: "grid" | "list"
  onBookmark?: (articleId: string) => void
  onShare?: (article: NewsArticle) => void
}

export default function NewsCard({ article, viewMode = "grid", onBookmark, onShare }: NewsCardProps) {
  const [imageError, setImageError] = useState(false)

  const formatTimeAgo = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true })
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const handleBookmark = () => {
    onBookmark?.(article.id)
  }

  const handleShare = () => {
    onShare?.(article)
  }

  return (
    <article
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${
        viewMode === "list" ? "flex" : ""
      }`}
    >
      {/* Article Image */}
      <div className={`${viewMode === "list" ? "w-64 flex-shrink-0" : "w-full"}`}>
        <div className="relative h-48 bg-gray-200">
          <img
            src={imageError ? "/placeholder.svg?height=400&width=600" : article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="lazy"
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
              onClick={handleBookmark}
              className={`p-1 rounded transition-colors ${
                article.isBookmarked ? "text-yellow-500" : "text-gray-400 hover:text-gray-600"
              }`}
              aria-label={article.isBookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              <Bookmark className={`h-4 w-4 ${article.isBookmarked ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Share article"
            >
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
            className="flex items-center text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors"
          >
            Read More
            <ExternalLink className="h-3 w-3 ml-1" />
          </Link>
        </div>
      </div>
    </article>
  )
}
