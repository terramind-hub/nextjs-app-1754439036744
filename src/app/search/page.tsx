'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import SearchResults from '@/components/SearchResults'
import ContentModal from '@/components/ContentModal'
import { useNetflix } from '@/contexts/NetflixContext'
import { searchMovies } from '@/lib/api'
import { Movie } from '@/types/movie'
import { useDebounce } from '@/hooks/useDebounce'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const { selectedContent, setSelectedContent } = useNetflix()
  const [results, setResults] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  
  const debouncedQuery = useDebounce(query, 300)

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      setHasSearched(false)
      return
    }

    setLoading(true)
    setHasSearched(true)
    
    try {
      const searchResults = await searchMovies(searchQuery)
      setResults(searchResults)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    performSearch(debouncedQuery)
  }, [debouncedQuery, performSearch])

  return (
    <div className="min-h-screen bg-netflix-black">
      <Header />
      
      <div className="pt-20 px-4 md:px-8 lg:px-16">
        <SearchResults
          query={query}
          results={results}
          loading={loading}
          hasSearched={hasSearched}
          onContentClick={setSelectedContent}
        />
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