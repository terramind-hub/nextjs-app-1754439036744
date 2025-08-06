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
    type: 'tv',
    seasons: 4
  },
  {
    id: '2',
    title: 'The Crown',
    overview: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=The+Crown',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=The+Crown',
    year: 2016,
    genre: 'Drama, History',
    rating: 'TV-MA',
    imdbRating: 8.6,
    type: 'tv',
    seasons: 6
  },
  {
    id: '3',
    title: 'Extraction',
    overview: 'A black-market mercenary who has nothing to lose is hired to rescue the kidnapped son of an imprisoned international crime lord.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Extraction',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Extraction',
    year: 2020,
    genre: 'Action, Thriller',
    rating: 'R',
    imdbRating: 6.7,
    type: 'movie',
    duration: '116 min'
  },
  {
    id: '4',
    title: 'The Witcher',
    overview: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=The+Witcher',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=The+Witcher',
    year: 2019,
    genre: 'Fantasy, Adventure, Drama',
    rating: 'TV-MA',
    imdbRating: 8.2,
    type: 'tv',
    seasons: 3
  },
  {
    id: '5',
    title: 'Money Heist',
    overview: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Money+Heist',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Money+Heist',
    year: 2017,
    genre: 'Crime, Drama, Mystery',
    rating: 'TV-MA',
    imdbRating: 8.3,
    type: 'tv',
    seasons: 5
  },
  {
    id: '6',
    title: 'Bird Box',
    overview: 'Five years after an ominous unseen presence drives most of society to suicide, a mother and her two children make a desperate bid to reach safety.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Bird+Box',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Bird+Box',
    year: 2018,
    genre: 'Horror, Drama, Sci-Fi',
    rating: 'R',
    imdbRating: 6.6,
    type: 'movie',
    duration: '124 min'
  }
]

// Generate more mock data
const generateMockMovies = (count: number, baseTitle: string): Movie[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `${baseTitle.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`,
    title: `${baseTitle} ${index + 1}`,
    overview: `This is a great ${baseTitle.toLowerCase()} that you should definitely watch. It has amazing storylines and characters.`,
    posterUrl: `https://via.placeholder.com/300x450/1a1a1a/ffffff?text=${encodeURIComponent(baseTitle + ' ' + (index + 1))}`,
    backdropUrl: `https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=${encodeURIComponent(baseTitle + ' ' + (index + 1))}`,
    year: 2020 + (index % 4),
    genre: 'Drama, Action',
    rating: 'TV-14',
    imdbRating: 7.0 + (Math.random() * 2),
    type: Math.random() > 0.5 ? 'movie' : 'tv',
    duration: '120 min'
  }))
}

const allMovies = [
  ...mockMovies,
  ...generateMockMovies(20, 'Action Movie'),
  ...generateMockMovies(20, 'Comedy Show'),
  ...generateMockMovies(20, 'Drama Series'),
  ...generateMockMovies(20, 'Thriller Film')
]

export async function getFeaturedMovie(): Promise<Movie> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockMovies[0]
}

export async function getMoviesByCategory(category: string): Promise<Movie[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  // Return different subsets based on category
  switch (category) {
    case 'trending':
      return allMovies.slice(0, 20)
    case 'popular':
      return allMovies.slice(5, 25)
    case 'action':
      return allMovies.filter(movie => movie.genre.includes('Action')).slice(0, 20)
    case 'comedy':
      return allMovies.filter(movie => movie.title.includes('Comedy')).slice(0, 20)
    case 'drama':
      return allMovies.filter(movie => movie.genre.includes('Drama')).slice(0, 20)
    case 'recent':
      return allMovies.filter(movie => movie.year >= 2022).slice(0, 20)
    default:
      return allMovies.slice(0, 20)
  }
}

export async function searchMovies(query: string): Promise<Movie[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400))
  
  if (!query.trim()) return []
  
  return allMovies.filter(movie => 
    movie.title.toLowerCase().includes(query.toLowerCase()) ||
    movie.genre.toLowerCase().includes(query.toLowerCase()) ||
    movie.overview.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 20)
}