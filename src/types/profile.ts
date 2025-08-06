export interface Profile {
  id: string
  name: string
  avatar: string
  isKids: boolean
}

export interface ProfileContextType {
  profiles: Profile[]
  currentProfile: Profile | null
  setCurrentProfile: (profile: Profile | null) => void
  addProfile: (profile: Omit<Profile, 'id'>) => void
  removeProfile: (id: string) => void
}