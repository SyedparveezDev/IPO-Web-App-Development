export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>

          {/* Trending topics skeleton */}
          <div className="mb-8">
            <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
            <div className="flex space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-8 bg-gray-300 rounded-full w-20"></div>
              ))}
            </div>
          </div>

          {/* Filters skeleton */}
          <div className="bg-white rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>

          {/* Articles skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded w-1/3 mb-3"></div>
                  <div className="h-6 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
