'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useProfile } from '@/contexts/ProfileContext'
import { PencilIcon, UserIcon } from '@heroicons/react/24/outline'

interface ProfileDropdownProps {
  onClose: () => void
}

export default function ProfileDropdown({ onClose }: ProfileDropdownProps) {
  const { profiles, currentProfile, setCurrentProfile } = useProfile()
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleProfileSelect = (profile: any) => {
    setCurrentProfile(profile)
    onClose()
  }

  const handleManageProfiles = () => {
    router.push('/profiles')
    onClose()
  }

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-64 bg-black/90 border border-gray-700 rounded-md shadow-lg overflow-hidden"
    >
      {/* Profiles list */}
      <div className="py-2">
        {profiles.map((profile) => (
          <button
            key={profile.id}
            onClick={() => handleProfileSelect(profile)}
            className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 transition-colors ${
              currentProfile?.id === profile.id ? 'bg-gray-800' : ''
            }`}
          >
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-sm font-semibold text-white">
              {profile.avatar}
            </div>
            <span className="text-white text-sm font-medium">
              {profile.name}
            </span>
            {profile.isKids && (
              <span className="text-xs text-yellow-400 bg-yellow-400/20 px-2 py-1 rounded">
                KIDS
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700" />

      {/* Manage profiles */}
      <div className="py-2">
        <button
          onClick={handleManageProfiles}
          className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 transition-colors"
        >
          <PencilIcon className="w-5 h-5 text-white" />
          <span className="text-white text-sm">Manage Profiles</span>
        </button>
        
        <button
          onClick={() => {
            router.push('/account')
            onClose()
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 transition-colors"
        >
          <UserIcon className="w-5 h-5 text-white" />
          <span className="text-white text-sm">Account</span>
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700" />

      {/* Sign out */}
      <div className="py-2">
        <button
          onClick={() => {
            // In a real app, this would handle sign out
            console.log('Sign out')
            onClose()
          }}
          className="w-full text-left px-4 py-3 text-white text-sm hover:bg-gray-800 transition-colors"
        >
          Sign out of Netflix
        </button>
      </div>
    </div>
  )
}