'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { XMarkIcon, PlayIcon, PlusIcon, CheckIcon, HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/solid'
import { Movie } from '@/types/movie'
import { useProfile } from '@/contexts/ProfileContext'
import { addToMyList, removeFromMyList, isInMyList } from '@/lib/storage'

interface ContentModalProps {
  content: Movie
  onClose: () => void
}

export default function ContentModal({ content, onClose }: ContentModalProps) {
  const { currentProfile } = useProfile()
  const [inMyList, setInMyList] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (currentProfile) {
      setInMyList(isInMyList(currentProfile.id, content.id))
    }
  }, [currentProfile, content.id])

  const handleMyListToggle = () => {
    if (!currentProfile) return

    if (inMyList) {
      removeFromMyList(currentProfile.id, content.id)
      setInMyList(false)
    } else {
      addToMyList(currentProfile.id, content)
      setInMyList(true)
    }
  }

  const handlePlay = () => {
    // In a real app, this would start video playback
    console.log('Playing:', content.title)
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-netflix-gray rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Hero Section */}
        <div className="relative aspect-video">
          {!imageError ? (
            <Image
              src={content.backdropUrl || content.posterUrl}
              alt={content.title}
              fill
              className="object-cover rounded-t-lg"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-400 rounded-t-lg">
              <span className="text-lg">{content.title}</span>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-gray via-transparent to-transparent rounded-t-lg" />
          
          {/* Action Buttons */}
          <div className="absolute bottom-8 left-8 flex items-center space-x-4">
            <button
              onClick={handlePlay}
              className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200 transition-colors"
            >
              <PlayIcon className="w-6 h-6" />
              <span>Play</span>
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
            
            <button className="p-3 bg-gray-600/80 text-white rounded-full hover:bg-gray-500/80 transition-colors">
              <HandThumbUpIcon className="w-6 h-6" />
            </button>
            
            <button className="p-3 bg-gray-600/80 text-white rounded-full hover:bg-gray-500/80 transition-colors">
              <HandThumbDownIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Info */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-white mb-4">{content.title}</h1>
              
              {/* Metadata */}
              <div className="flex items-center space-x-4 mb-6 text-sm">
                <span className="text-green-400 font-bold">{content.imdbRating}% Match</span>
                <span>{content.year}</span>
                <span className="border border-gray-500 px-2 py-1 text-xs">{content.rating}</span>
                <span className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  {content.imdbRating}
                </span>
              </div>
              
              {/* Description */}
              <p className="text-white text-lg leading-relaxed mb-6">
                {content.overview}
              </p>
            </div>
            
            {/* Side Info */}
            <div className="text-sm text-gray-300 space-y-4">
              <div>
                <span className="text-gray-400">Genre: </span>
                <span className="text-white">{content.genre}</span>
              </div>
              
              <div>
                <span className="text-gray-400">Duration: </span>
                <span className="text-white">{content.duration || '120 min'}</span>
              </div>
              
              <div>
                <span className="text-gray-400">Director: </span>
                <span className="text-white">{content.director || 'Unknown'}</span>
              </div>
              
              <div>
                <span className="text-gray-400">Cast: </span>
                <span className="text-white">{content.cast || 'Various actors'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}