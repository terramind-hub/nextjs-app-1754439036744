import { Movie, WatchlistItem, ContinueWatchingItem } from '@/types/movie'

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
  
  // Remove existing entry if it exists
  const filteredList = currentList.filter(item => item.id !== movie.id)
  
  // Add new entry with progress
  const movieWithProgress = {
    ...movie,
    progress,
    lastWatched: new Date().toISOString()
  }
  
  const updatedList = [movieWithProgress, ...filteredList].slice(0, 10) // Keep only 10 items
  localStorage.setItem(key, JSON.stringify(updatedList))
}

export function removeFromContinueWatching(profileId: string, movieId: string): void {
  const key = `continueWatching_${profileId}`
  const currentList = getContinueWatching(profileId)
  const updatedList = currentList.filter(item => item.id !== movieId)
  localStorage.setItem(key, JSON.stringify(updatedList))
}

export function getContinueWatching(profileId: string): (Movie & { progress: number; lastWatched: string })[] {
  const key = `continueWatching_${profileId}`
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : []
}

// Watch history
export function addToWatchHistory(profileId: string, movie: Movie): void {
  const key = `watchHistory_${profileId}`
  const currentHistory = getWatchHistory(profileId)
  
  // Remove existing entry if it exists
  const filteredHistory = currentHistory.filter(item => item.id !== movie.id)
  
  // Add new entry at the beginning
  const movieWithTimestamp = {
    ...movie,
    watchedAt: new Date().toISOString()
  }
  
  const updatedHistory = [movieWithTimestamp, ...filteredHistory].slice(0, 50) // Keep only 50 items
  localStorage.setItem(key, JSON.stringify(updatedHistory))
}

export function getWatchHistory(profileId: string): (Movie & { watchedAt: string })[] {
  const key = `watchHistory_${profileId}`
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : []
}

// Preferences
export function saveUserPreferences(profileId: string, preferences: any): void {
  const key = `preferences_${profileId}`
  localStorage.setItem(key, JSON.stringify(preferences))
}

export function getUserPreferences(profileId: string): any {
  const key = `preferences_${profileId}`
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : {
    autoplay: true,
    subtitles: false,
    language: 'en',
    maturityRating: 'all'
  }
}