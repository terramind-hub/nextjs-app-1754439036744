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
  isMovie: boolean
  seasons?: number
  episodes?: number
}

export interface TVShow extends Movie {
  isMovie: false
  seasons: number
  episodes: number
}

export interface MovieDetails extends Movie {
  trailerUrl?: string
  productionCompanies?: string[]
  budget?: number
  revenue?: number
  languages?: string[]
  countries?: string[]
}

export type ContentType = Movie | TVShow