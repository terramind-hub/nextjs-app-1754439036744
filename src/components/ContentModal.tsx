'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { XMarkIcon, PlayIcon, PlusIcon, CheckIcon, HandThumbUpIcon } from '@heroicons/react/24/solid'
import { VolumeXIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline'
import { Movie } from '@/types/movie'
import { useProfile } from '@/contexts/ProfileContext'
import { addToMyList, removeFromMyList, isInMyList } from '@/lib/storage'
import { getSimilarMovies } from '@/lib/api'
import MovieCard from './MovieCard'

interface ContentModalProps {
  content: Movie
  onClose: () => void
}

export default function ContentModal({ content, onClose }: ContentModalProps) {
  const { currentProfile } = useProfile()
  const [inMyList, setInMyList] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [similarContent, setSimilarContent] = useState<Movie[]>([])
  const [activeTab, setActiveTab] = useState<'overview' | 'episodes' | 'similar'>('overview')

  useEffect(() => {
    if (currentProfile) {
      setInMyList(isInMyList(currentProfile.id, content.id))
    }
  }, [currentProfile, content.id])

  useEffect(() => {
    const loadSimilarContent = async () => {
      try {
        const similar = await getSimilarMovies(content.id)
        setSimilarContent(similar)
      } catch (error) {
        console.error('Error loading similar content:', error)
      }
    }

    loadSimilarContent()
  }, [content.id])

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

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
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-netflix-gray rounded-lg overflow-hidden animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Scrollable Content */}
        <div className="max-h-[90vh] overflow-y-auto scrollbar-hide">
          {/* Hero Section */}
          <div className="relative aspect-video">
            <Image
              src={content.backdropUrl || content.posterUrl}
              alt={content.title}
              fill
              className="object-cover"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-netflix-gray via-transparent to-transparent" />
            
            {/* Content Info */}
            <div className="absolute bottom-8 left-8 right-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-shadow">
                {content.title}
              </h1>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={handlePlay}
                  className="flex items-center space-x-2 bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-200 transition-colors"
                >
                  <PlayIcon className="w-5 h-5" />
                  <span>Play</span>
                </button>

                {currentProfile && (
                  <button
                    onClick={handleMyListToggle}
                    className="p-2 bg-gray-600/80 text-white rounded-full hover:bg-gray-500/80 transition-colors"
                    title={inMyList ? 'Remove from My List' : 'Add to My List'}
                  >
                    {inMyList ? (
                      <CheckIcon className="w-6 h-6" />
                    ) : (
                      <PlusIcon className="w-6 h-6" />
                    )}
                  </button>
                )}

                <button className="p-2 bg-gray-600/80 text-white rounded-full hover:bg-gray-500/80 transition-colors">
                  <HandThumbUpIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Metadata */}
              <div className="flex items-center space-x-4 text-white text-shadow">
                <span className="text-green-400 font-bold">{content.imdbRating}% Match</span>
                <span>{content.year}</span>
                <span className="border border-gray-400 px-2 py-1 text-sm">{content.rating}</span>
                <span className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  {content.imdbRating}
                </span>
              </div>
            </div>

            {/* Mute Button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute bottom-8 right-8 p-2 bg-gray-600/80 text-white rounded-full hover:bg-gray-500/80 transition-colors"
            >
              {isMuted ? (
                <VolumeXIcon className="w-6 h-6" />
              ) : (
                <SpeakerWaveIcon className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Content Details */}
          <div className="p-8">
            {/* Tabs */}
            <div className="flex space-x-8 mb-6 border-b border-gray-600">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-2 font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'text-white border-b-2 border-netflix-red'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Overview
              </button>
              {content.type === 'tv' && (
                <button
                  onClick={() => setActiveTab('episodes')}
                  className={`pb-2 font-medium transition-colors ${
                    activeTab === 'episodes'
                      ? 'text-white border-b-2 border-netflix-red'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Episodes
                </button>
              )}
              <button
                onClick={() => setActiveTab('similar')}
                className={`pb-2 font-medium transition-colors ${
                  activeTab === 'similar'
                    ? 'text-white border-b-2 border-netflix-red'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                More Like This
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <p className="text-white text-lg mb-6 leading-relaxed">
                    {content.overview}
                  </p>
                </div>
                
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-gray-400">Cast: </span>
                    <span className="text-white">{content.cast}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Genres: </span>
                    <span className="text-white">{content.genre}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Director: </span>
                    <span className="text-white">{content.director}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Duration: </span>
                    <span className="text-white">{content.duration}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'episodes' && content.type === 'tv' && (
              <div>
                <h3 className="text-white text-xl font-bold mb-4">Season 1</h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((episode) => (
                    <div key={episode} className="flex space-x-4 p-4 bg-netflix-black rounded-lg">
                      <div className="text-2xl font-bold text-gray-400 w-8">
                        {episode}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium mb-1">
                          Episode {episode}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                      </div>
                      <div className="text-gray-400 text-sm">
                        45m
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'similar' && (
              <div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {similarContent.map((movie) => (
                    <div key={movie.id} className="transform scale-75 origin-top-left">
                      <MovieCard
                        movie={movie}
                        onClick={() => {}}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}