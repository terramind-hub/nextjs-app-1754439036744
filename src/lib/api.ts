import { Movie } from '@/types/movie'

// Mock movie data - In a real app, this would come from TMDB API or similar
const MOCK_MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Stranger Things',
    overview: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Stranger+Things',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Stranger+Things+Backdrop',
    year: 2016,
    genre: 'Sci-Fi, Drama, Horror',
    rating: 'TV-14',
    imdbRating: 8.7,
    duration: '51m',
    type: 'tv',
    cast: 'Millie Bobby Brown, Finn Wolfhard, Winona Ryder',
    director: 'The Duffer Brothers'
  },
  {
    id: '2',
    title: 'The Crown',
    overview: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=The+Crown',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=The+Crown+Backdrop',
    year: 2016,
    genre: 'Drama, History',
    rating: 'TV-MA',
    imdbRating: 8.6,
    duration: '58m',
    type: 'tv',
    cast: 'Claire Foy, Olivia Colman, Imelda Staunton',
    director: 'Peter Morgan'
  },
  {
    id: '3',
    title: 'Extraction',
    overview: 'A black-market mercenary who has nothing to lose is hired to rescue the kidnapped son of an imprisoned international crime lord.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Extraction',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Extraction+Backdrop',
    year: 2020,
    genre: 'Action, Thriller',
    rating: 'R',
    imdbRating: 6.7,
    duration: '116m',
    type: 'movie',
    cast: 'Chris Hemsworth, Rudhraksh Jaiswal, Randeep Hooda',
    director: 'Sam Hargrave'
  },
  {
    id: '4',
    title: 'The Witcher',
    overview: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=The+Witcher',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=The+Witcher+Backdrop',
    year: 2019,
    genre: 'Fantasy, Drama, Action',
    rating: 'TV-MA',
    imdbRating: 8.2,
    duration: '60m',
    type: 'tv',
    cast: 'Henry Cavill, Anya Chalotra, Freya Allan',
    director: 'Lauren Schmidt Hissrich'
  },
  {
    id: '5',
    title: 'Money Heist',
    overview: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Money+Heist',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Money+Heist+Backdrop',
    year: 2017,
    genre: 'Crime, Drama, Mystery',
    rating: 'TV-MA',
    imdbRating: 8.3,
    duration: '70m',
    type: 'tv',
    cast: 'Úrsula Corberó, Álvaro Morte, Itziar Ituño',
    director: 'Álex Pina'
  },
  {
    id: '6',
    title: 'Bird Box',
    overview: 'Five years after an ominous unseen presence drives most of society to suicide, a mother and her two children make a desperate bid to reach safety.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Bird+Box',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Bird+Box+Backdrop',
    year: 2018,
    genre: 'Horror, Drama, Sci-Fi',
    rating: 'R',
    imdbRating: 6.6,
    duration: '124m',
    type: 'movie',
    cast: 'Sandra Bullock, Trevante Rhodes, John Malkovich',
    director: 'Susanne Bier'
  },
  {
    id: '7',
    title: 'Ozark',
    overview: 'A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Ozark',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Ozark+Backdrop',
    year: 2017,
    genre: 'Crime, Drama, Thriller',
    rating: 'TV-MA',
    imdbRating: 8.4,
    duration: '60m',
    type: 'tv',
    cast: 'Jason Bateman, Laura Linney, Sofia Hublitz',
    director: 'Bill Dubuque'
  },
  {
    id: '8',
    title: 'The Irishman',
    overview: 'A mob hitman recalls his possible involvement with the slaying of Jimmy Hoffa.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=The+Irishman',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=The+Irishman+Backdrop',
    year: 2019,
    genre: 'Crime, Drama',
    rating: 'R',
    imdbRating: 7.8,
    duration: '209m',
    type: 'movie',
    cast: 'Robert De Niro, Al Pacino, Joe Pesci',
    director: 'Martin Scorsese'
  },
  {
    id: '9',
    title: 'Dark',
    overview: 'A family saga with a supernatural twist, set in a German town, where the disappearance of two young children exposes the relationships among four families.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Dark',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Dark+Backdrop',
    year: 2017,
    genre: 'Crime, Drama, Mystery',
    rating: 'TV-MA',
    imdbRating: 8.8,
    duration: '60m',
    type: 'tv',
    cast: 'Louis Hofmann, Oliver Masucci, Jördis Triebel',
    director: 'Baran bo Odar'
  },
  {
    id: '10',
    title: 'Roma',
    overview: 'A year in the life of a middle-class family\'s maid in Mexico City in the early 1970s.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Roma',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Roma+Backdrop',
    year: 2018,
    genre: 'Drama',
    rating: 'R',
    imdbRating: 7.7,
    duration: '135m',
    type: 'movie',
    cast: 'Yalitza Aparicio, Marina de Tavira, Diego Cortina Autrey',
    director: 'Alfonso Cuarón'
  },
  {
    id: '11',
    title: 'Narcos',
    overview: 'A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar, as well as the many other drug kingpins who plagued the country.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Narcos',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Narcos+Backdrop',
    year: 2015,
    genre: 'Biography, Crime, Drama',
    rating: 'TV-MA',
    imdbRating: 8.8,
    duration: '49m',
    type: 'tv',
    cast: 'Pedro Pascal, Wagner Moura, Boyd Holbrook',
    director: 'Chris Brancato'
  },
  {
    id: '12',
    title: 'Marriage Story',
    overview: 'Noah Baumbach\'s incisive and compassionate look at a marriage breaking up and a family staying together.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Marriage+Story',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=Marriage+Story+Backdrop',
    year: 2019,
    genre: 'Drama, Romance',
    rating: 'R',
    imdbRating: 7.9,
    duration: '137m',
    type: 'movie',
    cast: 'Adam Driver, Scarlett Johansson, Julia Greer',
    director: 'Noah Baumbach'
  }
]

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function getFeaturedMovie(): Promise<Movie> {
  await delay(500)
  return MOCK_MOVIES[0]
}

export async function getMoviesByCategory(category: string): Promise<Movie[]> {
  await delay(300)
  
  // Simulate different content for different categories
  const shuffled = [...MOCK_MOVIES].sort(() => Math.random() - 0.5)
  
  switch (category) {
    case 'trending':
      return shuffled.slice(0, 8)
    case 'popular':
      return shuffled.slice(2, 10)
    case 'action':
      return shuffled.filter(m => m.genre.includes('Action')).slice(0, 6)
    case 'comedy':
      return shuffled.filter(m => m.genre.includes('Comedy')).slice(0, 6)
    case 'drama':
      return shuffled.filter(m => m.genre.includes('Drama')).slice(0, 8)
    case 'recent':
      return shuffled.filter(m => m.year >= 2018).slice(0, 6)
    default:
      return shuffled.slice(0, 6)
  }
}

export async function searchMovies(query: string): Promise<Movie[]> {
  await delay(400)
  
  if (!query.trim()) {
    return []
  }
  
  const searchTerm = query.toLowerCase()
  return MOCK_MOVIES.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm) ||
    movie.overview.toLowerCase().includes(searchTerm) ||
    movie.genre.toLowerCase().includes(searchTerm) ||
    movie.cast.toLowerCase().includes(searchTerm) ||
    movie.director.toLowerCase().includes(searchTerm)
  )
}

export async function getSimilarMovies(movieId: string): Promise<Movie[]> {
  await delay(300)
  
  const movie = MOCK_MOVIES.find(m => m.id === movieId)
  if (!movie) return []
  
  // Return movies with similar genres or type
  return MOCK_MOVIES
    .filter(m => 
      m.id !== movieId && 
      (m.type === movie.type || m.genre.split(', ').some(genre => movie.genre.includes(genre)))
    )
    .slice(0, 6)
}

export async function getMovieDetails(movieId: string): Promise<Movie | null> {
  await delay(200)
  return MOCK_MOVIES.find(m => m.id === movieId) || null
}