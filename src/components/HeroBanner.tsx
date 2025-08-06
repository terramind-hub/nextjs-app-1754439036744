'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { PlayIcon, InformationCircleIcon, PlusIcon, CheckIcon } from '@heroicons/react/24/solid'
import { VolumeXIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline'
import { Movie } from '@/types/movie'
import { useProfile } from '@/contexts/ProfileContext'
import { useNetflix } from '@/contexts/NetflixContext'
import { addToMyList, removeFromMyList, isInMyList } from '@/lib/storage'

interface HeroBannerProps {
  movie: Movie
}

export default function HeroBanner({ movie }: HeroBannerProps) {
  const { currentProfile } = useProfile()
  const { setSelectedContent } = useNetflix()
  const [isMuted, setIsMuted] = useState(true)
  const [inMyList, setInMyList] = useState(false)

  useEffect(() => {
    if (currentProfile) {
      setInMyList(isInMyList(currentProfile.id, movie.id))
    }
  }, [currentProfile, movie.id])

  const handleMyListToggle = () => {
    if (!currentProfile) return

    if (inMyList) {
      removeFromMyList(currentProfile.id, movie.id)
      setInMyList(false)
    } else {
      addToMyList(currentProfile.id, movie)
      setInMyList(true)
    }
  }

  const handlePlay = () => {
    // In a real app, this would start video playback
    console.log('Playing:', movie.title)
  }

  const handleMoreInfo = () => {
    setSelectedContent(movie)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={movie.backdropUrl || movie.posterUrl}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-netflix-black to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-4 md:px-8 lg:px-16">
        <div className="max-w-2xl">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-shadow">
            {movie.title}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white mb-8 text-shadow line-clamp-3">
            {movie.overview}
          </p>

          {/* Metadata */}
          <div className="flex items-center space-x-4 mb-8 text-white text-shadow">
            <span className="bg-red-600 px-2 py-1 text-sm font-bold rounded">
              {movie.rating}
            </span>
            <span>{movie.year}</span>
            <span>{movie.genre}</span>
            <span className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              {movie.imdbRating}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePlay}
              className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200 transition-colors"
            >
              <PlayIcon className="w-6 h-6" />
              <span>Play</span>
            </button>

            <button
              onClick={handleMoreInfo}
              className="flex items-center space-x-2 bg-gray-600/80 text-white px-8 py-3 rounded font-bold hover:bg-gray-500/80 transition-colors"
            >
              <InformationCircleIcon className="w-6 h-6" />
              <span>More Info</span>
            </button>

            {currentProfile && (
              <button
                onClick={handleMyListToggle}
                className="p-3 bg-gray-600/80 text-white rounded-full hover:bg-gray-500/80 transition-colors"
                title={inMyList ? 'Remove from My List' : 'Add to My List'}
              >
                {inMyList ? (
                  <CheckIcon className="w-6 h-6" />
                ) : (
                  <PlusIcon className="w-6 h-6" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mute/Unmute Button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-24 right-8 p-3 bg-gray-600/80 text-white rounded-full hover:bg-gray-500/80 transition-colors"
      >
        {isMuted ? (
          <VolumeXIcon className="w-6 h-6" />
        ) : (
          <SpeakerWaveIcon className="w-6 h-6" />
        )}
      </button>
    </div>
  )
}