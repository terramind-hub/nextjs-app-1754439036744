import { Movie, WatchProgress, MyListItem } from '@/types/movie'

// My List functionality
export function addToMyList(profileId: string, movie: Movie): void {
  const key = `myList_${profileId}`
  const currentList = getMyList(profileId)
  
  // Check if movie is already in list
  if (!currentList.some(item => item.id === movie.id)) {
    const updatedList = [...currentList, movie]
    localStorage.setItem(key, JSON.stringify(updatedList))
  }
}

export function removeFromMyList(profileId: string, movieId: string): void {
  const key = `myList_${profileId}`
  const currentList = getMyList(profileId)
  const updatedList = currentList.filter(movie => movie.id !== movieId)
  localStorage.setItem(key, JSON.stringify(updatedList))
}

export function getMyList(profileId: string): Movie[] {
  const key = `myList_${profileId}`
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : []
}

export function isInMyList(profileId: string, movieId: string): boolean {
  const myList = getMyList(profileId)
  return myList.some(movie => movie.id === movieId)
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
  const updatedList = currentList.filter(movie => movie.id !== movieId)
  localStorage.setItem(key, JSON.stringify(updatedList))
}

export function getContinueWatching(profileId: string): (Movie & { progress: number })[] {
  const key = `continueWatching_${profileId}`
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : []
}

// Watch progress
export function saveWatchProgress(profileId: string, movieId: string, progress: number): void {
  const key = `watchProgress_${profileId}`
  const currentProgress = getWatchProgress(profileId)
  
  const updatedProgress = {
    ...currentProgress,
    [movieId]: {
      progress,
      lastWatched: new Date().toISOString()
    }
  }
  
  localStorage.setItem(key, JSON.stringify(updatedProgress))
}

export function getWatchProgress(profileId: string): Record<string, WatchProgress> {
  const key = `watchProgress_${profileId}`
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : {}
}

export function getMovieProgress(profileId: string, movieId: string): number {
  const progress = getWatchProgress(profileId)
  return progress[movieId]?.progress || 0
}

// Recently watched
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