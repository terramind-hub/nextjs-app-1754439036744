'use client'

import { useState } from 'react'
import { Movie } from '@/types/movie'
import { PlayIcon, InformationCircleIcon } from '@heroicons/react/24/solid'

interface HeroBannerProps {
  movie: Movie
}

export default function HeroBanner({ movie }: HeroBannerProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={movie.backdrop_path || movie.poster_path || '/placeholder-movie.jpg'}
          alt={movie.title}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-4 md:px-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {movie.title}
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 line-clamp-3">
            {movie.overview}
          </p>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded font-semibold hover:bg-white/80 transition">
              <PlayIcon className="w-6 h-6" />
              <span>Play</span>
            </button>
            
            <button className="flex items-center space-x-2 bg-gray-500/70 text-white px-8 py-3 rounded font-semibold hover:bg-gray-500/50 transition">
              <InformationCircleIcon className="w-6 h-6" />
              <span>More Info</span>
            </button>
          </div>

          <div className="flex items-center space-x-4 mt-6 text-white/70">
            {movie.vote_average && (
              <span className="text-green-400 font-semibold">
                {Math.round(movie.vote_average * 10)}% Match
              </span>
            )}
            {movie.release_date && (
              <span>{new Date(movie.release_date).getFullYear()}</span>
            )}
            <span className="border border-white/40 px-2 py-1 text-xs">HD</span>
          </div>
        </div>
      </div>
    </div>
  )
}