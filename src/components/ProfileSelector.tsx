'use client'

import { PlusIcon, PencilIcon } from '@heroicons/react/24/outline'
import { Profile } from '@/types/profile'

interface ProfileSelectorProps {
  profiles: Profile[]
  onProfileSelect: (profileId: string) => void
  onManageProfiles: () => void
}

export default function ProfileSelector({ profiles, onProfileSelect, onManageProfiles }: ProfileSelectorProps) {
  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-6xl font-normal text-white mb-8">
        Who's watching?
      </h1>
      
      <div className="flex flex-wrap justify-center gap-8 mb-12">
        {profiles.map((profile) => (
          <button
            key={profile.id}
            onClick={() => onProfileSelect(profile.id)}
            className="group flex flex-col items-center space-y-2 hover:text-white transition-colors"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl md:text-3xl font-bold text-white group-hover:ring-4 group-hover:ring-white transition-all">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-gray-400 group-hover:text-white text-lg md:text-xl transition-colors">
              {profile.name}
            </span>
          </button>
        ))}
        
        {profiles.length < 5 && (
          <button
            onClick={onManageProfiles}
            className="group flex flex-col items-center space-y-2 hover:text-white transition-colors"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded bg-gray-600 flex items-center justify-center group-hover:bg-gray-500 transition-colors">
              <PlusIcon className="w-12 h-12 md:w-16 md:h-16 text-gray-400 group-hover:text-white" />
            </div>
            <span className="text-gray-400 group-hover:text-white text-lg md:text-xl transition-colors">
              Add Profile
            </span>
          </button>
        )}
      </div>
      
      <button
        onClick={onManageProfiles}
        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mx-auto border border-gray-400 hover:border-white px-6 py-2 rounded"
      >
        <PencilIcon className="w-5 h-5" />
        <span>Manage Profiles</span>
      </button>
    </div>
  )
}