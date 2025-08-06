'use client'

import { Movie } from '@/types/movie'
import MovieCard from './MovieCard'
import LoadingSkeleton from './LoadingSkeleton'

interface SearchResultsProps {
  query: string
  results: Movie[]
  loading: boolean
  hasSearched: boolean
  onContentClick: (movie: Movie) => void
}

export default function SearchResults({ query, results, loading, hasSearched, onContentClick }: SearchResultsProps) {
  if (loading) {
    return (
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">
          Searching for "{query}"...
        </h1>
        <LoadingSkeleton />
      </div>
    )
  }

  if (!hasSearched) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Search Netflix
        </h1>
        <p className="text-gray-400 text-lg">
          Find your next favorite movie or TV show
        </p>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
          No results found for "{query}"
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Try searching for something else
        </p>
        <div className="text-gray-400">
          <p className="mb-2">Suggestions:</p>
          <ul className="space-y-1">
            <li>• Check your spelling</li>
            <li>• Try different keywords</li>
            <li>• Try more general terms</li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">
        Search results for "{query}" ({results.length} {results.length === 1 ? 'result' : 'results'})
      </h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {results.map((movie) => (
          <div key={movie.id}>
            <MovieCard
              movie={movie}
              onClick={() => onContentClick(movie)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}