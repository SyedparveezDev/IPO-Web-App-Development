"use client"

import { TrendingUp } from "lucide-react"

interface TrendingTopicsProps {
  topics: string[]
  onTopicClick: (topic: string) => void
}

export default function TrendingTopics({ topics, onTopicClick }: TrendingTopicsProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <TrendingUp className="h-5 w-5 text-orange-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Trending Now</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic, index) => (
          <button
            key={index}
            onClick={() => onTopicClick(topic)}
            className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200 transition-colors"
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  )
}
