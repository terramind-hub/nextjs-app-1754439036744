'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Movie } from '@/types/movie'

interface NetflixContextType {
  selectedContent: Movie | null
  setSelectedContent: (content: Movie | null) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const NetflixContext = createContext<NetflixContextType | undefined>(undefined)

export function NetflixProvider({ children }: { children: ReactNode }) {
  const [selectedContent, setSelectedContent] = useState<Movie | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <NetflixContext.Provider value={{
      selectedContent,
      setSelectedContent,
      searchQuery,
      setSearchQuery
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