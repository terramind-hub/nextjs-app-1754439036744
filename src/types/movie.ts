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
  similarMovies?: Movie[]
  reviews?: Review[]
}

export interface Review {
  id: string
  author: string
  content: string
  rating: number
  date: string
}

export interface WatchProgress {
  movieId: string
  progress: number
  lastWatched: string
}

export interface MyListItem {
  movie: Movie
  addedAt: string
}