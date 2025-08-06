export interface Movie {
  id: string
  title: string
  overview: string
  posterUrl: string
  backdropUrl: string
  year: number
  genre: string
  rating: string
  imdbRating: number
  duration?: string
  director?: string
  cast?: string
  type: 'movie' | 'tv'
  seasons?: number
  episodes?: number
}

export interface ContentRow {
  title: string
  content: Movie[]
}

export interface SearchResult {
  query: string
  results: Movie[]
  totalResults: number
}