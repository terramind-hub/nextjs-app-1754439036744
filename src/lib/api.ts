import { Movie } from '@/types/movie'

// Mock data for demonstration
const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Stranger Things',
    overview: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Stranger+Things',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Stranger+Things',
    year: 2016,
    genre: 'Sci-Fi, Drama, Horror',
    rating: 'TV-14',
    imdbRating: 8.7,
    isMovie: false,
    seasons: 4,
    episodes: 34
  },
  {
    id: '2',
    title: 'The Witcher',
    overview: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=The+Witcher',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=The+Witcher',
    year: 2019,
    genre: 'Fantasy, Drama, Action',
    rating: 'TV-MA',
    imdbRating: 8.2,
    isMovie: false,
    seasons: 3,
    episodes: 24
  },
  {
    id: '3',
    title: 'Red Notice',
    overview: 'An Interpol agent tracks the world\'s most wanted art thief.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Red+Notice',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Red+Notice',
    year: 2021,
    genre: 'Action, Comedy, Crime',
    rating: 'PG-13',
    imdbRating: 6.4,
    isMovie: true,
    duration: '118 min'
  },
  {
    id: '4',
    title: 'Squid Game',
    overview: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games for a tempting prize, but the stakes are deadly.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Squid+Game',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Squid+Game',
    year: 2021,
    genre: 'Thriller, Drama',
    rating: 'TV-MA',
    imdbRating: 8.0,
    isMovie: false,
    seasons: 1,
    episodes: 9
  },
  {
    id: '5',
    title: 'The Crown',
    overview: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=The+Crown',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=The+Crown',
    year: 2016,
    genre: 'Biography, Drama, History',
    rating: 'TV-MA',
    imdbRating: 8.7,
    isMovie: false,
    seasons: 6,
    episodes: 60
  },
  {
    id: '6',
    title: 'Extraction',
    overview: 'A black-market mercenary who has nothing to lose is hired to rescue the kidnapped son of an imprisoned international crime lord.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Extraction',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Extraction',
    year: 2020,
    genre: 'Action, Thriller',
    rating: 'R',
    imdbRating: 6.7,
    isMovie: true,
    duration: '116 min'
  },
  {
    id: '7',
    title: 'Money Heist',
    overview: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Money+Heist',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Money+Heist',
    year: 2017,
    genre: 'Crime, Drama, Mystery',
    rating: 'TV-MA',
    imdbRating: 8.2,
    isMovie: false,
    seasons: 5,
    episodes: 41
  },
  {
    id: '8',
    title: 'Ozark',
    overview: 'A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Ozark',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Ozark',
    year: 2017,
    genre: 'Crime, Drama, Thriller',
    rating: 'TV-MA',
    imdbRating: 8.4,
    isMovie: false,
    seasons: 4,
    episodes: 44
  }
]

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function getFeaturedMovie(): Promise<Movie> {
  await delay(500)
  return mockMovies[0]
}

export async function getMoviesByCategory(category: string): Promise<Movie[]> {
  await delay(300)
  
  // Return different subsets based on category
  switch (category) {
    case 'trending':
      return mockMovies.slice(0, 6)
    case 'popular':
      return mockMovies.slice(1, 7)
    case 'action':
      return mockMovies.filter(movie => movie.genre.includes('Action'))
    case 'comedy':
      return mockMovies.filter(movie => movie.genre.includes('Comedy'))
    case 'drama':
      return mockMovies.filter(movie => movie.genre.includes('Drama'))
    case 'recent':
      return mockMovies.filter(movie => movie.year >= 2020)
    default:
      return mockMovies
  }
}

export async function searchMovies(query: string): Promise<Movie[]> {
  await delay(300)
  
  if (!query.trim()) {
    return []
  }
  
  return mockMovies.filter(movie => 
    movie.title.toLowerCase().includes(query.toLowerCase()) ||
    movie.genre.toLowerCase().includes(query.toLowerCase()) ||
    movie.overview.toLowerCase().includes(query.toLowerCase())
  )
}

export async function getMovieDetails(id: string): Promise<Movie | null> {
  await delay(300)
  return mockMovies.find(movie => movie.id === id) || null
}