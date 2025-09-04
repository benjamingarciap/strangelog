export type ConfidenceLevel = 1 | 2 | 3 | 4 | 5
// 1 = very low, 5 = very high

export interface PublicUser {
  id: number
  username: string
  email: string
  passwordHash: string // never store raw passwords
  createdAt: string
  avatarUrl?: string // optional profile picture or OpenMoji badge
  confidenceLevel: ConfidenceLevel
  bio?: string
  encounters: number[] // IDs of encounters created by this user
  likedEncounters: number[] // IDs of liked encounters
  dislikedEncounters: number[] // IDs of disliked encounters
}
