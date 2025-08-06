'use client'

import { useEffect, useState } from 'react'
import { Movie } from '@/types/movie'
import { XMarkIcon, PlayIcon, PlusIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'
import { useProfile } from '@/contexts/ProfileContext'

interface ContentModalProps {
  content: Movie
  onClose: () => void
}

export default function ContentModal({ content, onClose }: ContentModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const { currentProfile } = useProfile()

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    
    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    
    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const addToMyList = () => {
    if (!currentProfile) return
    
    const myList = JSON.parse(localStorage.getItem(`myList_${currentProfile.id}`) || '[]')
    const isAlreadyInList = myList.some((item: Movie) => item.id === content.id)
    
    if (!isAlreadyInList) {
      const updatedList = [...myList, content]
      localStorage.setItem(`myList_${currentProfile.id}`, JSON.stringify(updatedList))
    }
  }

  const addToContinueWatching = () => {
    if (!currentProfile) return
    
    const continueWatching = JSON.parse(localStorage.getItem(`continueWatching_${currentProfile.id}`) || '[]')
    const existingIndex = continueWatching.findIndex((item: any) => item.id === content.id)
    
    if (existingIndex !== -1) {
      continueWatching.splice(existingIndex, 1)
    }
    
    const movieWithProgress = {
      ...content,
      progress: Math.floor(Math.random() * 80) + 10
    }
    
    continueWatching.unshift(movieWithProgress)
    
    if (continueWatching.length > 10) {
      continueWatching.splice(10)
    }
    
    localStorage.setItem(`continueWatching_${currentProfile.id}`, JSON.stringify(continueWatching))
  }

  const handlePlay = () => {
    addToContinueWatching()
    console.log('Playing:', content.title)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl mx-4 bg-zinc-900 rounded-lg overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition"
        >
          <XMarkIcon className="w-6 h-6 text-white" />
        </button>

        {/* Hero section */}
        <div className="relative h-96">
          <img
            src={content.backdrop_path || content.poster_path || '/placeholder-movie.jpg'}
            alt={content.title}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
          
          {/* Content overlay */}
          <div className="absolute bottom-8 left-8 right-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              {content.title}
            </h1>
            
            {/* Action buttons */}
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={handlePlay}
                className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded font-semibold hover:bg-white/80 transition"
              >
                <PlayIcon className="w-6 h-6" />
                <span>Play</span>
              </button>
              
              <button
                onClick={addToMyList}
                className="w-12 h-12 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition"
              >
                <PlusIcon className="w-6 h-6 text-white" />
              </button>
              
              <button className="w-12 h-12 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white transition">
                <HandThumbUpIcon className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Movie info */}
            <div className="flex items-center space-x-4 text-white/70">
              {content.vote_average && (
                <span className="text-green-400 font-semibold">
                  {Math.round(content.vote_average * 10)}% Match
                </span>
              )}
              {content.release_date && (
                <span>{new Date(content.release_date).getFullYear()}</span>
              )}
              <span className="border border-white/40 px-2 py-1 text-xs">HD</span>
            </div>
          </div>
        </div>

        {/* Details section */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <p className="text-white text-lg mb-6 leading-relaxed">
                {content.overview}
              </p>
            </div>
            
            {/* Sidebar info */}
            <div className="space-y-4 text-sm">
              {content.release_date && (
                <div>
                  <span className="text-gray-400">Release Date: </span>
                  <span className="text-white">
                    {new Date(content.release_date).toLocaleDateString()}
                  </span>
                </div>
              )}
              
              {content.vote_average && (
                <div>
                  <span className="text-gray-400">Rating: </span>
                  <span className="text-white">
                    {content.vote_average.toFixed(1)}/10
                  </span>
                </div>
              )}
              
              {content.genre_ids && content.genre_ids.length > 0 && (
                <div>
                  <span className="text-gray-400">Genres: </span>
                  <span className="text-white">
                    {content.genre_ids.slice(0, 3).join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}