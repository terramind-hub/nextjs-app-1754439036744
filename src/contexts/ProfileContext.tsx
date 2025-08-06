'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Profile } from '@/types/profile'

interface ProfileContextType {
  profiles: Profile[]
  currentProfile: Profile | null
  setCurrentProfile: (profile: Profile | null) => void
  addProfile: (name: string) => void
  updateProfile: (id: string, updates: Partial<Profile>) => void
  deleteProfile: (id: string) => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

const DEFAULT_PROFILES: Profile[] = [
  {
    id: '1',
    name: 'User',
    avatar: '',
    isKids: false,
    createdAt: new Date().toISOString()
  }
]

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useState<Profile[]>(DEFAULT_PROFILES)
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null)

  // Load profiles from localStorage on mount
  useEffect(() => {
    const savedProfiles = localStorage.getItem('netflix_profiles')
    const savedCurrentProfile = localStorage.getItem('netflix_current_profile')
    
    if (savedProfiles) {
      const parsedProfiles = JSON.parse(savedProfiles)
      setProfiles(parsedProfiles)
      
      if (savedCurrentProfile) {
        const currentProfileData = JSON.parse(savedCurrentProfile)
        const profile = parsedProfiles.find((p: Profile) => p.id === currentProfileData.id)
        if (profile) {
          setCurrentProfile(profile)
        }
      }
    }
  }, [])

  // Save profiles to localStorage when they change
  useEffect(() => {
    localStorage.setItem('netflix_profiles', JSON.stringify(profiles))
  }, [profiles])

  // Save current profile to localStorage when it changes
  useEffect(() => {
    if (currentProfile) {
      localStorage.setItem('netflix_current_profile', JSON.stringify(currentProfile))
    } else {
      localStorage.removeItem('netflix_current_profile')
    }
  }, [currentProfile])

  const addProfile = (name: string) => {
    if (profiles.length >= 5) return
    
    const newProfile: Profile = {
      id: Date.now().toString(),
      name,
      avatar: '',
      isKids: false,
      createdAt: new Date().toISOString()
    }
    
    setProfiles(prev => [...prev, newProfile])
  }

  const updateProfile = (id: string, updates: Partial<Profile>) => {
    setProfiles(prev => prev.map(profile => 
      profile.id === id ? { ...profile, ...updates } : profile
    ))
    
    // Update current profile if it's the one being updated
    if (currentProfile?.id === id) {
      setCurrentProfile(prev => prev ? { ...prev, ...updates } : null)
    }
  }

  const deleteProfile = (id: string) => {
    if (profiles.length <= 1) return
    
    setProfiles(prev => prev.filter(profile => profile.id !== id))
    
    // Clear current profile if it's the one being deleted
    if (currentProfile?.id === id) {
      setCurrentProfile(null)
    }
  }

  return (
    <ProfileContext.Provider value={{
      profiles,
      currentProfile,
      setCurrentProfile,
      addProfile,
      updateProfile,
      deleteProfile
    }}>
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