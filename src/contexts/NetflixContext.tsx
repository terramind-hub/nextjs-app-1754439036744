'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Movie } from '@/types/movie'

interface NetflixContextType {
  selectedContent: Movie | null
  setSelectedContent: (content: Movie | null) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const NetflixContext = createContext<NetflixContextType | undefined>(undefined)

export function NetflixProvider({ children }: { children: ReactNode }) {
  const [selectedContent, setSelectedContent] = useState<Movie | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  return (
    <NetflixContext.Provider value={{
      selectedContent,
      setSelectedContent,
      searchQuery,
      setSearchQuery,
      isLoading,
      setIsLoading
    }}>
      {children}
    </NetflixContext.Provider>
  )
}

export function useNetflix() {
  const context = useContext(NetflixContext)
  if (context === undefined) {
    throw new Error('useNetflix must be used within a NetflixProvider')
  }
  return context
}