'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { PlayIcon, PlusIcon, CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { Movie } from '@/types/movie'
import { useProfile } from '@/contexts/ProfileContext'
import { addToMyList, removeFromMyList, isInMyList } from '@/lib/storage'

interface MovieCardProps {
  movie: Movie
  onClick: () => void
  showProgress?: boolean
}

export default function MovieCard({ movie, onClick, showProgress = false }: MovieCardProps) {
  const { currentProfile } = useProfile()
  const [isHovered, setIsHovered] = useState(false)
  const [inMyList, setInMyList] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (currentProfile) {
      setInMyList(isInMyList(currentProfile.id, movie.id))
    }
  }, [currentProfile, movie.id])

  const handleMyListToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!currentProfile) return

    if (inMyList) {
      removeFromMyList(currentProfile.id, movie.id)
      setInMyList(false)
    } else {
      addToMyList(currentProfile.id, movie)
      setInMyList(true)
    }
  }

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    // In a real app, this would start video playback
    console.log('Playing:', movie.title)
  }

  const progress = showProgress ? Math.floor(Math.random() * 80) + 10 : 0

  return (
    <div
      className="relative group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Main Card */}
      <div className="relative w-48 md:w-56 lg:w-64">
        <div className="aspect-video relative rounded-md overflow-hidden bg-gray-800">
          {!imageError ? (
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-400">
              <span className="text-sm text-center p-4">{movie.title}</span>
            </div>
          )}
          
          {/* Progress Bar */}
          {showProgress && progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
              <div 
                className="h-full bg-netflix-red transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Hover Card */}
        {isHovered && (
          <div className="absolute top-0 left-0 w-80 bg-netflix-gray rounded-md shadow-2xl transform -translate-y-16 animate-scale-up z-50">
            {/* Image */}
            <div className="aspect-video relative rounded-t-md overflow-hidden">
              {!imageError ? (
                <Image
                  src={movie.backdropUrl || movie.posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-400">
                  <span className="text-sm text-center p-4">{movie.title}</span>
                </div>
              )}
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-netflix-gray via-transparent to-transparent" />
              
              {/* Action Buttons */}
              <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                <button
                  onClick={handlePlay}
                  className="p-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
                >
                  <PlayIcon className="w-4 h-4" />
                </button>
                
                {currentProfile && (
                  <button
                    onClick={handleMyListToggle}
                    className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-500 transition-colors"
                  >
                    {inMyList ? (
                      <CheckIcon className="w-4 h-4" />
                    ) : (
                      <PlusIcon className="w-4 h-4" />
                    )}
                  </button>
                )}
                
                <button
                  onClick={onClick}
                  className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-500 transition-colors"
                >
                  <ChevronDownIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content Info */}
            <div className="p-4">
              {/* Metadata */}
              <div className="flex items-center space-x-2 mb-2 text-sm">
                <span className="text-green-400 font-bold">{movie.imdbRating}% Match</span>
                <span className="border border-gray-500 px-1 text-xs">{movie.rating}</span>
                <span>{movie.year}</span>
              </div>

              {/* Title */}
              <h3 className="text-white font-bold mb-2 line-clamp-1">{movie.title}</h3>

              {/* Genres */}
              <div className="flex flex-wrap gap-1 text-xs text-gray-300">
                {movie.genre.split(', ').slice(0, 3).map((genre, index) => (
                  <span key={index} className="after:content-['•'] after:ml-1 last:after:content-none">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}