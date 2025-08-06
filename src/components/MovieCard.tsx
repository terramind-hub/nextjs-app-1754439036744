'use client'

import { useState } from 'react'
import { Movie } from '@/types/movie'
import { PlayIcon, PlusIcon, HandThumbUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useProfile } from '@/contexts/ProfileContext'

interface MovieCardProps {
  movie: Movie
  onClick: () => void
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { currentProfile } = useProfile()

  const addToMyList = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!currentProfile) return
    
    const myList = JSON.parse(localStorage.getItem(`myList_${currentProfile.id}`) || '[]')
    const isAlreadyInList = myList.some((item: Movie) => item.id === movie.id)
    
    if (!isAlreadyInList) {
      const updatedList = [...myList, movie]
      localStorage.setItem(`myList_${currentProfile.id}`, JSON.stringify(updatedList))
    }
  }

  const addToContinueWatching = () => {
    if (!currentProfile) return
    
    const continueWatching = JSON.parse(localStorage.getItem(`continueWatching_${currentProfile.id}`) || '[]')
    const existingIndex = continueWatching.findIndex((item: any) => item.id === movie.id)
    
    if (existingIndex !== -1) {
      continueWatching.splice(existingIndex, 1)
    }
    
    const movieWithProgress = {
      ...movie,
      progress: Math.floor(Math.random() * 80) + 10 // Random progress between 10-90%
    }
    
    continueWatching.unshift(movieWithProgress)
    
    // Keep only last 10 items
    if (continueWatching.length > 10) {
      continueWatching.splice(10)
    }
    
    localStorage.setItem(`continueWatching_${currentProfile.id}`, JSON.stringify(continueWatching))
  }

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToContinueWatching()
    // In a real app, this would start video playback
    console.log('Playing:', movie.title)
  }

  return (
    <div
      className="relative group cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Movie Poster */}
      <div className="relative w-48 h-28 md:w-64 md:h-36 rounded-md overflow-hidden bg-gray-800">
        <img
          src={movie.backdrop_path || movie.poster_path || '/placeholder-movie.jpg'}
          alt={movie.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
            <div className="text-gray-500 text-sm">Loading...</div>
          </div>
        )}

        {/* Hover overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/20 transition-opacity duration-300" />
        )}
      </div>

      {/* Expanded card on hover */}
      {isHovered && (
        <div className="absolute top-0 left-0 w-80 bg-zinc-900 rounded-md shadow-2xl z-50 transform -translate-y-16 transition-all duration-300">
          {/* Image */}
          <div className="relative h-44 rounded-t-md overflow-hidden">
            <img
              src={movie.backdrop_path || movie.poster_path || '/placeholder-movie.jpg'}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Action buttons */}
            <div className="flex items-center space-x-2 mb-3">
              <button
                onClick={handlePlay}
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition"
              >
                <PlayIcon className="w-4 h-4 text-black ml-0.5" />
              </button>
              
              <button
                onClick={addToMyList}
                className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition"
              >
                <PlusIcon className="w-4 h-4 text-white" />
              </button>
              
              <button className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition">
                <HandThumbUpIcon className="w-4 h-4 text-white" />
              </button>
              
              <button className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition ml-auto">
                <ChevronDownIcon className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Movie info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                {movie.vote_average && (
                  <span className="text-green-400 font-semibold">
                    {Math.round(movie.vote_average * 10)}% Match
                  </span>
                )}
                {movie.release_date && (
                  <span className="text-gray-400">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                )}
                <span className="border border-gray-400 px-1 text-xs text-gray-400">HD</span>
              </div>
              
              <h3 className="text-white font-semibold text-sm line-clamp-1">
                {movie.title}
              </h3>
              
              <p className="text-gray-400 text-xs line-clamp-2">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}