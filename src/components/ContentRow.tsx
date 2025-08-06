'use client'

import { useRef, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import MovieCard from './MovieCard'
import { Movie } from '@/types/movie'

interface ContentRowProps {
  title: string
  content: Movie[]
  onContentClick: (movie: Movie) => void
}

export default function ContentRow({ title, content, onContentClick }: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return

    const scrollAmount = scrollRef.current.clientWidth * 0.8
    const newScrollLeft = direction === 'left' 
      ? scrollRef.current.scrollLeft - scrollAmount
      : scrollRef.current.scrollLeft + scrollAmount

    scrollRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    })
  }

  const handleScroll = () => {
    if (!scrollRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

  if (!content || content.length === 0) {
    return null
  }

  return (
    <div className="relative mb-8 group">
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 px-4 md:px-8 lg:px-16">
        {title}
      </h2>

      {/* Content Container */}
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        )}

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex space-x-2 overflow-x-auto scrollbar-hide px-4 md:px-8 lg:px-16 pb-4"
        >
          {content.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex-shrink-0">
              <MovieCard
                movie={item}
                onClick={() => onContentClick(item)}
                showProgress={title === 'Continue Watching'}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}