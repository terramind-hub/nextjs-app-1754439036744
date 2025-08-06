export interface Movie {
  id: string
  title: string
  overview: string
  posterUrl: string
  backdropUrl?: string
  year: number
  genre: string
  rating: string
  imdbRating: number
  duration: string
  type: 'movie' | 'tv'
  cast: string
  director: string
  trailer?: string
  progress?: number
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