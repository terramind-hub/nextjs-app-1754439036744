import { Movie } from '@/types/movie'

// My List functionality
export function addToMyList(profileId: string, movie: Movie): void {
  const key = `myList_${profileId}`
  const currentList = getMyList(profileId)
  
  if (!currentList.find(item => item.id === movie.id)) {
    const updatedList = [...currentList, movie]
    localStorage.setItem(key, JSON.stringify(updatedList))
  }
}

export function removeFromMyList(profileId: string, movieId: string): void {
  const key = `myList_${profileId}`
  const currentList = getMyList(profileId)
  const updatedList = currentList.filter(item => item.id !== movieId)
  localStorage.setItem(key, JSON.stringify(updatedList))
}

export function getMyList(profileId: string): Movie[] {
  const key = `myList_${profileId}`
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : []
}

export function isInMyList(profileId: string, movieId: string): boolean {
  const myList = getMyList(profileId)
  return myList.some(item => item.id === movieId)
}

// Continue Watching functionality
export function addToContinueWatching(profileId: string, movie: Movie, progress: number): void {
  const key = `continueWatching_${profileId}`
  const currentList = getContinueWatching(profileId)
  
  // Remove if already exists
  const filteredList = currentList.filter(item => item.id !== movie.id)
  
  // Add to beginning with progress
  const movieWithProgress = { ...movie, progress }
  const updatedList = [movieWithProgress, ...filteredList].slice(0, 10) // Keep only 10 items
  
  localStorage.setItem(key, JSON.stringify(updatedList))
}

export function removeFromContinueWatching(profileId: string, movieId: string): void {
  const key = `continueWatching_${profileId}`
  const currentList = getContinueWatching(profileId)
  const updatedList = currentList.filter(item => item.id !== movieId)
  localStorage.setItem(key, JSON.stringify(updatedList))
}

export function getContinueWatching(profileId: string): Movie[] {
  const key = `continueWatching_${profileId}`
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : []
}

// Recently Watched functionality
export function addToRecentlyWatched(profileId: string, movie: Movie): void {
  const key = `recentlyWatched_${profileId}`
  const currentList = getRecentlyWatched(profileId)
  
  // Remove if already exists
  const filteredList = currentList.filter(item => item.id !== movie.id)
  
  // Add to beginning
  const updatedList = [movie, ...filteredList].slice(0, 20) // Keep only 20 items
  
  localStorage.setItem(key, JSON.stringify(updatedList))
}

export function getRecentlyWatched(profileId: string): Movie[] {
  const key = `recentlyWatched_${profileId}`
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : []
}

// User preferences
export function saveUserPreferences(profileId: string, preferences: any): void {
  const key = `preferences_${profileId}`
  localStorage.setItem(key, JSON.stringify(preferences))
}

export function getUserPreferences(profileId: string): any {
  const key = `preferences_${profileId}`
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : {
    autoplay: true,
    quality: 'auto',
    subtitles: false,
    language: 'en'
  }
}

// Search history
export function addToSearchHistory(profileId: string, query: string): void {
  if (!query.trim()) return
  
  const key = `searchHistory_${profileId}`
  const currentHistory = getSearchHistory(profileId)
  
  // Remove if already exists
  const filteredHistory = currentHistory.filter(item => item !== query)
  
  // Add to beginning
  const updatedHistory = [query, ...filteredHistory].slice(0, 10) // Keep only 10 items
  
  localStorage.setItem(key, JSON.stringify(updatedHistory))
}

export function getSearchHistory(profileId: string): string[] {
  const key = `searchHistory_${profileId}`
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : []
}

export function clearSearchHistory(profileId: string): void {
  const key = `searchHistory_${profileId}`
  localStorage.removeItem(key)
}