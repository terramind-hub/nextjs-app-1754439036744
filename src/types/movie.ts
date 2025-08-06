export interface Movie {
  id: number
  title: string
  overview: string
  poster_path?: string
  backdrop_path?: string
  release_date?: string
  vote_average?: number
  genre_ids?: string[]
  adult?: boolean
  original_language?: string
  original_title?: string
  popularity?: number
  video?: boolean
  vote_count?: number
}

export interface MovieWithProgress extends Movie {
  progress: number
}