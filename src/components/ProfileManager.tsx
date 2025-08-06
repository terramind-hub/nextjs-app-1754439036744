'use client'

import { useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useProfile } from '@/contexts/ProfileContext'
import { Profile } from '@/types/profile'

interface ProfileManagerProps {
  onBack: () => void
}

export default function ProfileManager({ onBack }: ProfileManagerProps) {
  const { profiles, addProfile, updateProfile, deleteProfile } = useProfile()
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null)
  const [newProfileName, setNewProfileName] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  const handleAddProfile = () => {
    if (newProfileName.trim() && profiles.length < 5) {
      addProfile(newProfileName.trim())
      setNewProfileName('')
      setShowAddForm(false)
    }
  }

  const handleUpdateProfile = () => {
    if (editingProfile && newProfileName.trim()) {
      updateProfile(editingProfile.id, { name: newProfileName.trim() })
      setEditingProfile(null)
      setNewProfileName('')
    }
  }

  const handleDeleteProfile = (profileId: string) => {
    if (profiles.length > 1) {
      deleteProfile(profileId)
    }
  }

  const startEditing = (profile: Profile) => {
    setEditingProfile(profile)
    setNewProfileName(profile.name)
    setShowAddForm(false)
  }

  const cancelEditing = () => {
    setEditingProfile(null)
    setNewProfileName('')
    setShowAddForm(false)
  }

  return (
    <div className="text-center max-w-4xl mx-auto px-4">
      <div className="flex items-center justify-center mb-8">
        <button
          onClick={onBack}
          className="absolute left-4 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-4xl md:text-6xl font-normal text-white">
          Manage Profiles
        </h1>
      </div>
      
      <div className="flex flex-wrap justify-center gap-8 mb-12">
        {profiles.map((profile) => (
          <div key={profile.id} className="flex flex-col items-center space-y-2">
            <div className="relative group">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl md:text-3xl font-bold text-white">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              
              {/* Edit/Delete Overlay */}
              <div className="absolute inset-0 bg-black/50 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <button
                  onClick={() => startEditing(profile)}
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  <PencilIcon className="w-5 h-5 text-white" />
                </button>
                {profiles.length > 1 && (
                  <button
                    onClick={() => handleDeleteProfile(profile.id)}
                    className="p-2 bg-red-500/20 rounded-full hover:bg-red-500/30 transition-colors"
                  >
                    <TrashIcon className="w-5 h-5 text-white" />
                  </button>
                )}
              </div>
            </div>
            
            {editingProfile?.id === profile.id ? (
              <div className="flex flex-col space-y-2">
                <input
                  type="text"
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  className="bg-gray-700 text-white px-3 py-1 rounded text-center"
                  maxLength={20}
                  autoFocus
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleUpdateProfile}
                    className="px-3 py-1 bg-netflix-red text-white rounded text-sm hover:bg-red-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <span className="text-gray-400 text-lg md:text-xl">
                {profile.name}
              </span>
            )}
          </div>
        ))}
        
        {profiles.length < 5 && (
          <div className="flex flex-col items-center space-y-2">
            {showAddForm ? (
              <div className="flex flex-col items-center space-y-2">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded bg-gray-600 flex items-center justify-center">
                  <PlusIcon className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  placeholder="Profile name"
                  className="bg-gray-700 text-white px-3 py-1 rounded text-center"
                  maxLength={20}
                  autoFocus
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddProfile}
                    className="px-3 py-1 bg-netflix-red text-white rounded text-sm hover:bg-red-700 transition-colors"
                  >
                    Add
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAddForm(true)}
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
        )}
      </div>
      
      <button
        onClick={onBack}
        className="btn-primary"
      >
        Done
      </button>
    </div>
  )
}