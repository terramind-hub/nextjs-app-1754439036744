export interface Profile {
  id: string
  name: string
  avatar: string
  isKids: boolean
  createdAt: string
}

export interface ProfileSettings {
  language: string
  maturityRating: string
  autoplayPreviews: boolean
  autoplayNext: boolean
}