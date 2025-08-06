'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { PencilIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { useProfile } from '@/contexts/ProfileContext'

interface ProfileDropdownProps {
  onClose: () => void
}

export default function ProfileDropdown({ onClose }: ProfileDropdownProps) {
  const router = useRouter()
  const { profiles, currentProfile, setCurrentProfile } = useProfile()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const handleProfileSwitch = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId)
    if (profile && profile.id !== currentProfile?.id) {
      setCurrentProfile(profile)
      onClose()
    }
  }

  const handleManageProfiles = () => {
    router.push('/profiles')
    onClose()
  }

  const handleSignOut = () => {
    setCurrentProfile(null)
    router.push('/profiles')
    onClose()
  }

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-64 bg-black/90 border border-gray-600 rounded-md shadow-lg backdrop-blur-sm animate-fade-in"
    >
      {/* Profile List */}
      <div className="py-2">
        {profiles.map((profile) => (
          <button
            key={profile.id}
            onClick={() => handleProfileSwitch(profile.id)}
            className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-700 transition-colors ${
              currentProfile?.id === profile.id ? 'bg-gray-700' : ''
            }`}
          >
            <div className="w-8 h-8 rounded bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-white">{profile.name}</span>
            {currentProfile?.id === profile.id && (
              <div className="ml-auto w-2 h-2 bg-netflix-red rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-600" />

      {/* Actions */}
      <div className="py-2">
        <button
          onClick={handleManageProfiles}
          className="w-full flex items-center space-x-3 px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors"
        >
          <PencilIcon className="w-5 h-5" />
          <span>Manage Profiles</span>
        </button>
        
        <button
          onClick={handleSignOut}
          className="w-full flex items-center space-x-3 px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span>Sign out of Netflix</span>
        </button>
      </div>
    </div>
  )
}