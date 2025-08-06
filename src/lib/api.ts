import { Movie } from '@/types/movie'

// Mock movie data for demonstration
const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Stranger Things',
    overview: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
    poster_path: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w1280/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
    release_date: '2016-07-15',
    vote_average: 8.7,
    genre_ids: ['Drama', 'Fantasy', 'Horror']
  },
  {
    id: 2,
    title: 'The Crown',
    overview: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.',
    poster_path: 'https://image.tmdb.org/t/p/w500/1M876KPjulVwppEpldhdc8V4o68.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w1280/wHa6KOJAoNTFLFtp7wguUJKSnju.jpg',
    release_date: '2016-11-04',
    vote_average: 8.2,
    genre_ids: ['Drama', 'History']
  },
  {
    id: 3,
    title: 'Ozark',
    overview: 'A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder $500 million in five years to appease a drug boss.',
    poster_path: 'https://image.tmdb.org/t/p/w500/m73QiJOFyQIDdWXHKBVLVjGBjkx.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w1280/mYylcfkJ6krNgOyeUgdZm8n8Jzz.jpg',
    release_date: '2017-07-21',
    vote_average: 8.4,
    genre_ids: ['Crime', 'Drama', 'Thriller']
  },
  {
    id: 4,
    title: 'Money Heist',
    overview: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.',
    poster_path: 'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w1280/xGexTKCJDkl12dTW4YCBDXWb1AD.jpg',
    release_date: '2017-05-02',
    vote_average: 8.3,
    genre_ids: ['Action', 'Crime', 'Mystery']
  },
  {
    id: 5,
    title: 'The Witcher',
    overview: 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.',
    poster_path: 'https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w1280/1TUg5pO1VZ4B0Q1amk3OlXvlpXV.jpg',
    release_date: '2019-12-20',
    vote_average: 8.1,
    genre_ids: ['Action', 'Adventure', 'Drama']
  },
  {
    id: 6,
    title: 'Bridgerton',
    overview: 'Wealth, lust, and betrayal set in the backdrop of Regency era England, seen through the eyes of the powerful Bridgerton family.',
    poster_path: 'https://image.tmdb.org/t/p/w500/luoKpgVwi1E5nQsi7W0UuKHu2Rq.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w1280/6tHy5pI5yxfJUlOuKWdCYbqMR8z.jpg',
    release_date: '2020-12-25',
    vote_average: 7.3,
    genre_ids: ['Drama', 'Romance']
  },
  {
    id: 7,
    title: 'Squid Game',
    overview: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games for a tempting prize, but the stakes are deadly.',
    poster_path: 'https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w1280/qw3J9cNeLioOLoR68WX7z79aCdK.jpg',
    release_date: '2021-09-17',
    vote_average: 7.8,
    genre_ids: ['Action', 'Drama', 'Mystery']
  },
  {
    id: 8,
    title: 'Wednesday',
    overview: 'Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends — and foes — at Nevermore Academy.',
    poster_path: 'https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg',
    backdrop_path: 'https://image.tmdb.org/t/p/w1280/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg',
    release_date: '2022-11-23',
    vote_average: 8.6,
    genre_ids: ['Comedy', 'Crime', 'Family']
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
      return mockMovies.filter(movie => 
        movie.genre_ids?.includes('Action')
      )
    case 'comedy':
      return mockMovies.filter(movie => 
        movie.genre_ids?.includes('Comedy')
      )
    case 'drama':
      return mockMovies.filter(movie => 
        movie.genre_ids?.includes('Drama')
      )
    case 'recent':
      return mockMovies.slice(2, 8)
    default:
      return mockMovies
  }
}

export async function searchMovies(query: string): Promise<Movie[]> {
  await delay(400)
  
  if (!query.trim()) {
    return []
  }
  
  return mockMovies.filter(movie =>
    movie.title.toLowerCase().includes(query.toLowerCase()) ||
    movie.overview.toLowerCase().includes(query.toLowerCase())
  )
}

export async function getMovieDetails(id: number): Promise<Movie | null> {
  await delay(300)
  return mockMovies.find(movie => movie.id === id) || null
}

export async function getSimilarMovies(id: number): Promise<Movie[]> {
  await delay(400)
  // Return random movies excluding the current one
  return mockMovies.filter(movie => movie.id !== id).slice(0, 6)
}