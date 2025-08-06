'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProfile } from '@/contexts/ProfileContext'
import ProfileSelector from '@/components/ProfileSelector'
import ProfileManager from '@/components/ProfileManager'

export default function ProfilesPage() {
  const router = useRouter()
  const { profiles, setCurrentProfile } = useProfile()
  const [showManager, setShowManager] = useState(false)

  const handleProfileSelect = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId)
    if (profile) {
      setCurrentProfile(profile)
      router.push('/')
    }
  }

  const handleManageProfiles = () => {
    setShowManager(true)
  }

  const handleBackToSelector = () => {
    setShowManager(false)
  }

  return (
    <div className="min-h-screen bg-netflix-black flex items-center justify-center">
      {showManager ? (
        <ProfileManager onBack={handleBackToSelector} />
      ) : (
        <ProfileSelector
          profiles={profiles}
          onProfileSelect={handleProfileSelect}
          onManageProfiles={handleManageProfiles}
        />
      )}
    </div>
  )
}