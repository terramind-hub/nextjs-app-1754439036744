'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import HeroBanner from '@/components/HeroBanner'
import ContentRow from '@/components/ContentRow'
import ContentModal from '@/components/ContentModal'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import { useNetflix } from '@/contexts/NetflixContext'
import { useProfile } from '@/contexts/ProfileContext'
import { Movie } from '@/types/movie'
import { getMoviesByCategory, getFeaturedMovie } from '@/lib/api'

export default function Home() {
  const { selectedContent, setSelectedContent } = useNetflix()
  const { currentProfile } = useProfile()
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null)
  const [contentRows, setContentRows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true)
        
        // Load featured movie
        const featured = await getFeaturedMovie()
        setFeaturedMovie(featured)

        // Load content rows
        const categories = [
          { title: 'Trending Now', category: 'trending' },
          { title: 'Popular on Netflix', category: 'popular' },
          { title: 'Action Movies', category: 'action' },
          { title: 'Comedy Shows', category: 'comedy' },
          { title: 'Drama Series', category: 'drama' },
          { title: 'Recently Added', category: 'recent' },
        ]

        // Add user-specific rows if profile exists
        if (currentProfile) {
          const myList = JSON.parse(localStorage.getItem(`myList_${currentProfile.id}`) || '[]')
          const continueWatching = JSON.parse(localStorage.getItem(`continueWatching_${currentProfile.id}`) || '[]')
          
          if (continueWatching.length > 0) {
            categories.unshift({ title: 'Continue Watching', category: 'continue' })
          }
          
          if (myList.length > 0) {
            categories.splice(1, 0, { title: 'My List', category: 'mylist' })
          }
        }

        const rows = await Promise.all(
          categories.map(async (cat) => {
            let content
            if (cat.category === 'mylist') {
              const myList = JSON.parse(localStorage.getItem(`myList_${currentProfile?.id}`) || '[]')
              content = myList
            } else if (cat.category === 'continue') {
              const continueWatching = JSON.parse(localStorage.getItem(`continueWatching_${currentProfile?.id}`) || '[]')
              content = continueWatching
            } else {
              content = await getMoviesByCategory(cat.category)
            }
            
            return {
              title: cat.title,
              content: content || []
            }
          })
        )

        setContentRows(rows.filter(row => row.content.length > 0))
      } catch (error) {
        console.error('Error loading content:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [currentProfile])

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <Header />
        <LoadingSkeleton />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      
      {featuredMovie && (
        <HeroBanner movie={featuredMovie} />
      )}
      
      <div className="relative z-10 -mt-32 pb-20">
        {contentRows.map((row, index) => (
          <ContentRow
            key={`${row.title}-${index}`}
            title={row.title}
            content={row.content}
            onContentClick={setSelectedContent}
          />
        ))}
      </div>

      {selectedContent && (
        <ContentModal
          content={selectedContent}
          onClose={() => setSelectedContent(null)}
        />
      )}
    </div>
  )
}