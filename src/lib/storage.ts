import { Movie, WatchProgress, MyListItem } from '@/types/movie'

// My List functions
export function addToMyList(profileId: string, movie: Movie): void {
  const key = `myList_${profileId}`
  const myList = getMyList(profileId)
  
  // Check if movie is already in list
  if (!myList.find(item => item.movie.id === movie.id)) {
    const newItem: MyListItem = {
      movie,
      addedAt: new Date().toISOString()
    }
    myList.push(newItem)
    localStorage.setItem(key, JSON.stringify(myList))
  }
}

export function removeFromMyList(profileId: string, movieId: string): void {
  const key = `myList_${profileId}`
  const myList = getMyList(profileId)
  const filteredList = myList.filter(item => item.movie.id !== movieId)
  localStorage.setItem(key, JSON.stringify(filteredList))
}

export function getMyList(profileId: string): MyListItem[] {
  const key = `myList_${profileId}`
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : []
}

export function isInMyList(profileId: string, movieId: string): boolean {
  const myList = getMyList(profileId)
  return myList.some(item => item.movie.id === movieId)
}

// Continue Watching functions
export function addToContinueWatching(profileId: string, movie: Movie, progress: number): void {
  const key = `continueWatching_${profileId}`
  const continueWatching = getContinueWatching(profileId)
  
  // Remove existing entry if it exists
  const filteredList = continueWatching.filter(item => item.movieId !== movie.id)
  
  // Add new entry
  const newProgress: WatchProgress = {
    movieId: movie.id,
    progress,
    lastWatched: new Date().toISOString()
  }
  
  filteredList.unshift(newProgress)
  
  // Keep only the last 10 items
  const limitedList = filteredList.slice(0, 10)
  
  localStorage.setItem(key, JSON.stringify(limitedList))
}

export function removeFromContinueWatching(profileId: string, movieId: string): void {
  const key = `continueWatching_${profileId}`
  const continueWatching = getContinueWatching(profileId)
  const filteredList = continueWatching.filter(item => item.movieId !== movieId)
  localStorage.setItem(key, JSON.stringify(filteredList))
}

export function getContinueWatching(profileId: string): WatchProgress[] {
  const key = `continueWatching_${profileId}`
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : []
}

export function getWatchProgress(profileId: string, movieId: string): number {
  const continueWatching = getContinueWatching(profileId)
  const progress = continueWatching.find(item => item.movieId === movieId)
  return progress ? progress.progress : 0
}

// Viewing history functions
export function addToViewingHistory(profileId: string, movie: Movie): void {
  const key = `viewingHistory_${profileId}`
  const history = getViewingHistory(profileId)
  
  // Remove existing entry if it exists
  const filteredHistory = history.filter(item => item.movie.id !== movie.id)
  
  // Add to beginning
  const newItem: MyListItem = {
    movie,
    addedAt: new Date().toISOString()
  }
  
  filteredHistory.unshift(newItem)
  
  // Keep only the last 50 items
  const limitedHistory = filteredHistory.slice(0, 50)
  
  localStorage.setItem(key, JSON.stringify(limitedHistory))
}

export function getViewingHistory(profileId: string): MyListItem[] {
  const key = `viewingHistory_${profileId}`
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : []
}

export function clearViewingHistory(profileId: string): void {
  const key = `viewingHistory_${profileId}`
  localStorage.removeItem(key)
}

// Preferences functions
export function saveUserPreferences(profileId: string, preferences: any): void {
  const key = `preferences_${profileId}`
  localStorage.setItem(key, JSON.stringify(preferences))
}

export function getUserPreferences(profileId: string): any {
  const key = `preferences_${profileId}`
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : {}
}