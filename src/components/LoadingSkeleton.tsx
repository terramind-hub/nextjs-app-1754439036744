'use client'

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Hero Banner Skeleton */}
      <div className="relative h-screen w-full">
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        <div className="absolute bottom-32 left-16 space-y-4">
          <div className="h-16 w-96 bg-gray-700 animate-pulse rounded" />
          <div className="h-6 w-80 bg-gray-700 animate-pulse rounded" />
          <div className="h-6 w-64 bg-gray-700 animate-pulse rounded" />
          <div className="flex space-x-4 mt-8">
            <div className="h-12 w-32 bg-gray-700 animate-pulse rounded" />
            <div className="h-12 w-40 bg-gray-700 animate-pulse rounded" />
          </div>
        </div>
      </div>

      {/* Content Rows Skeleton */}
      <div className="relative z-10 -mt-32 pb-20">
        {[1, 2, 3, 4].map((row) => (
          <div key={row} className="mb-8">
            {/* Row Title */}
            <div className="h-8 w-48 bg-gray-700 animate-pulse rounded mb-4 mx-16" />
            
            {/* Cards */}
            <div className="flex space-x-2 px-16">
              {[1, 2, 3, 4, 5, 6].map((card) => (
                <div key={card} className="flex-shrink-0">
                  <div className="w-64 aspect-video bg-gray-700 animate-pulse rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}