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
export function addToContinueWatching(profileId: string, movie: Movie, progress: number = 0): void {
  const key = `continueWatching_${profileId}`
  const currentList = getContinueWatching(profileId)
  
  // Remove if already exists
  const filteredList = currentList.filter(item => item.movie.id !== movie.id)
  
  // Add to beginning with progress
  const updatedList = [{ movie, progress, lastWatched: Date.now() }, ...filteredList]
  
  // Keep only last 10 items
  const limitedList = updatedList.slice(0, 10)
  
  localStorage.setItem(key, JSON.stringify(limitedList))
}

export function removeFromContinueWatching(profileId: string, movieId: string): void {
  const key = `continueWatching_${profileId}`
  const currentList = getContinueWatching(profileId)
  const updatedList = currentList.filter(item => item.movie.id !== movieId)
  localStorage.setItem(key, JSON.stringify(updatedList))
}

export function getContinueWatching(profileId: string): Array<{ movie: Movie; progress: number; lastWatched: number }> {
  const key = `continueWatching_${profileId}`
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : []
}

// Viewing history
export function addToViewingHistory(profileId: string, movie: Movie): void {
  const key = `viewingHistory_${profileId}`
  const currentHistory = getViewingHistory(profileId)
  
  // Remove if already exists
  const filteredHistory = currentHistory.filter(item => item.movie.id !== movie.id)
  
  // Add to beginning
  const updatedHistory = [{ movie, watchedAt: Date.now() }, ...filteredHistory]
  
  // Keep only last 50 items
  const limitedHistory = updatedHistory.slice(0, 50)
  
  localStorage.setItem(key, JSON.stringify(limitedHistory))
}

export function getViewingHistory(profileId: string): Array<{ movie: Movie; watchedAt: number }> {
  const key = `viewingHistory_${profileId}`
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : []
}

// Ratings
export function rateMovie(profileId: string, movieId: string, rating: 'thumbs-up' | 'thumbs-down'): void {
  const key = `ratings_${profileId}`
  const currentRatings = getRatings(profileId)
  
  currentRatings[movieId] = rating
  localStorage.setItem(key, JSON.stringify(currentRatings))
}

export function getRating(profileId: string, movieId: string): 'thumbs-up' | 'thumbs-down' | null {
  const ratings = getRatings(profileId)
  return ratings[movieId] || null
}

export function getRatings(profileId: string): Record<string, 'thumbs-up' | 'thumbs-down'> {
  const key = `ratings_${profileId}`
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : {}
}

// Clear all data for a profile
export function clearProfileData(profileId: string): void {
  const keys = [
    `myList_${profileId}`,
    `continueWatching_${profileId}`,
    `viewingHistory_${profileId}`,
    `ratings_${profileId}`
  ]
  
  keys.forEach(key => localStorage.removeItem(key))
}