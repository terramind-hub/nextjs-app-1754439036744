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
    duration: '51 min',
    director: 'The Duffer Brothers',
    cast: 'Millie Bobby Brown, Finn Wolfhard, Winona Ryder',
    isMovie: false,
    seasons: 4,
    episodes: 34
  },
  {
    id: '2',
    title: 'The Crown',
    overview: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.',
    posterUrl: 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=The+Crown',
    backdropUrl: 'https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=The+Crown',
    year: 2016,
    genre: 'Drama, History, Biography',
    rating: 'TV-MA',
    imdbRating: 8.6,
    duration: '58 min',
    director: 'Peter Morgan',
    cast: 'Claire Foy, Olivia Colman, Imelda Staunton',
    isMovie: false,
    seasons: 6,
    episodes: 60
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
    duration: '116 min',
    director: 'Sam Hargrave',
    cast: 'Chris Hemsworth, Rudhraksh Jaiswal, Randeep Hooda',
    isMovie: true
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
    duration: '60 min',
    director: 'Lauren Schmidt Hissrich',
    cast: 'Henry Cavill, Anya Chalotra, Freya Allan',
    isMovie: false,
    seasons: 3,
    episodes: 24
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
    imdbRating: 8.2,
    duration: '70 min',
    director: 'Álex Pina',
    cast: 'Úrsula Corberó, Álvaro Morte, Itziar Ituño',
    isMovie: false,
    seasons: 5,
    episodes: 41
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
    duration: '124 min',
    director: 'Susanne Bier',
    cast: 'Sandra Bullock, Trevante Rhodes, John Malkovich',
    isMovie: true
  }
]

// Generate more mock data
const generateMockMovies = (count: number, baseId: number = 7): Movie[] => {
  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Documentary']
  const ratings = ['G', 'PG', 'PG-13', 'R', 'TV-14', 'TV-MA']
  
  return Array.from({ length: count }, (_, index) => {
    const id = (baseId + index).toString()
    const isMovie = Math.random() > 0.5
    const genre = genres[Math.floor(Math.random() * genres.length)]
    const rating = ratings[Math.floor(Math.random() * ratings.length)]
    const year = 2015 + Math.floor(Math.random() * 9)
    const imdbRating = 5 + Math.random() * 4
    
    return {
      id,
      title: `${genre} ${isMovie ? 'Movie' : 'Series'} ${id}`,
      overview: `This is a ${genre.toLowerCase()} ${isMovie ? 'movie' : 'series'} with an engaging storyline that will keep you entertained.`,
      posterUrl: `https://via.placeholder.com/300x450/1a1a1a/ffffff?text=${genre}+${isMovie ? 'Movie' : 'Series'}+${id}`,
      backdropUrl: `https://via.placeholder.com/1920x1080/1a1a1a/ffffff?text=${genre}+${isMovie ? 'Movie' : 'Series'}+${id}`,
      year,
      genre,
      rating,
      imdbRating: Math.round(imdbRating * 10) / 10,
      duration: isMovie ? `${90 + Math.floor(Math.random() * 60)} min` : `${40 + Math.floor(Math.random() * 30)} min`,
      director: 'Director Name',
      cast: 'Actor 1, Actor 2, Actor 3',
      isMovie,
      ...(isMovie ? {} : {
        seasons: 1 + Math.floor(Math.random() * 5),
        episodes: 8 + Math.floor(Math.random() * 16)
      })
    }
  })
}

const allMovies = [...mockMovies, ...generateMockMovies(50)]

export async function getFeaturedMovie(): Promise<Movie> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return allMovies[0]
}

export async function getMoviesByCategory(category: string): Promise<Movie[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  // Return different subsets based on category
  switch (category) {
    case 'trending':
      return allMovies.slice(0, 12)
    case 'popular':
      return allMovies.slice(5, 17)
    case 'action':
      return allMovies.filter(movie => movie.genre.includes('Action')).slice(0, 12)
    case 'comedy':
      return allMovies.filter(movie => movie.genre.includes('Comedy')).slice(0, 12)
    case 'drama':
      return allMovies.filter(movie => movie.genre.includes('Drama')).slice(0, 12)
    case 'recent':
      return allMovies.filter(movie => movie.year >= 2020).slice(0, 12)
    default:
      return allMovies.slice(0, 12)
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

export async function getMovieById(id: string): Promise<Movie | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200))
  
  return allMovies.find(movie => movie.id === id) || null
}