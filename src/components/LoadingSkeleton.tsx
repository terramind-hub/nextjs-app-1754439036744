'use client'

export default function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      {/* Hero Skeleton */}
      <div className="h-96 md:h-[500px] lg:h-[600px] loading-skeleton" />
      
      {/* Content Rows Skeleton */}
      {[1, 2, 3, 4].map((row) => (
        <div key={row} className="px-4 md:px-8 lg:px-16">
          {/* Row Title Skeleton */}
          <div className="h-6 w-48 loading-skeleton mb-4" />
          
          {/* Cards Skeleton */}
          <div className="flex space-x-2 overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map((card) => (
              <div key={card} className="flex-shrink-0">
                <div className="w-48 md:w-56 lg:w-64 aspect-video loading-skeleton" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="w-48 md:w-56 lg:w-64">
      <div className="aspect-video loading-skeleton mb-2" />
      <div className="h-4 loading-skeleton mb-1" />
      <div className="h-3 w-3/4 loading-skeleton" />
    </div>
  )
}

export function GridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  )
}