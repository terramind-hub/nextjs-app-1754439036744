'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Profile {
  id: string
  name: string
  avatar: string
  isKids: boolean
}

interface ProfileContextType {
  profiles: Profile[]
  currentProfile: Profile | null
  setCurrentProfile: (profile: Profile | null) => void
  addProfile: (profile: Omit<Profile, 'id'>) => void
  removeProfile: (id: string) => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

const defaultProfiles: Profile[] = [
  {
    id: '1',
    name: 'Main Profile',
    avatar: '👤',
    isKids: false,
  },
  {
    id: '2',
    name: 'Kids',
    avatar: '👶',
    isKids: true,
  },
]

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<Profile[]>(defaultProfiles)
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null)

  useEffect(() => {
    // Load profiles from localStorage
    const savedProfiles = localStorage.getItem('netflix_profiles')
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles))
    }

    // Load current profile from localStorage
    const savedCurrentProfile = localStorage.getItem('netflix_current_profile')
    if (savedCurrentProfile) {
      setCurrentProfile(JSON.parse(savedCurrentProfile))
    } else {
      // Set default profile if none selected
      setCurrentProfile(defaultProfiles[0])
    }
  }, [])

  useEffect(() => {
    // Save profiles to localStorage
    localStorage.setItem('netflix_profiles', JSON.stringify(profiles))
  }, [profiles])

  useEffect(() => {
    // Save current profile to localStorage
    if (currentProfile) {
      localStorage.setItem('netflix_current_profile', JSON.stringify(currentProfile))
    }
  }, [currentProfile])

  const addProfile = (profileData: Omit<Profile, 'id'>) => {
    const newProfile: Profile = {
      ...profileData,
      id: Date.now().toString(),
    }
    setProfiles(prev => [...prev, newProfile])
  }

  const removeProfile = (id: string) => {
    setProfiles(prev => prev.filter(profile => profile.id !== id))
    if (currentProfile?.id === id) {
      setCurrentProfile(profiles[0] || null)
    }
  }

  const value = {
    profiles,
    currentProfile,
    setCurrentProfile,
    addProfile,
    removeProfile,
  }

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}