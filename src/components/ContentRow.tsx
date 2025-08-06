'use client'

import { useState, useRef } from 'react'
import { Movie } from '@/types/movie'
import MovieCard from './MovieCard'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface ContentRowProps {
  title: string
  content: Movie[]
  onContentClick: (movie: Movie) => void
}

export default function ContentRow({ title, content, onContentClick }: ContentRowProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      const newPosition = direction === 'left' 
        ? scrollPosition - scrollAmount 
        : scrollPosition + scrollAmount
      
      scrollRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      })
      setScrollPosition(newPosition)
    }
  }

  const canScrollLeft = scrollPosition > 0
  const canScrollRight = scrollRef.current 
    ? scrollPosition < (scrollRef.current.scrollWidth - scrollRef.current.clientWidth)
    : true

  if (!content || content.length === 0) {
    return null
  }

  return (
    <div className="px-4 md:px-16 mb-8">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">
        {title}
      </h2>
      
      <div className="relative group">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/70"
          >
            <ChevronLeftIcon className="w-8 h-8" />
          </button>
        )}

        {/* Content Scroll Container */}
        <div
          ref={scrollRef}
          className="flex space-x-2 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {content.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex-shrink-0">
              <MovieCard
                movie={item}
                onClick={() => onContentClick(item)}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/70"
          >
            <ChevronRightIcon className="w-8 h-8" />
          </button>
        )}
      </div>
    </div>
  )
}