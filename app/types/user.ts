// ----------------------
// User types
// ----------------------

export type ConfidenceLevel = 1 | 2 | 3 | 4 | 5

// Full user (internal/backend)
export interface User {
  id: number
  username: string
  email: string
  passwordHash: string
  createdAt: string
  avatarUrl?: string
  confidenceLevel: ConfidenceLevel
  bio?: string
  encounters: number[] // IDs of encounters created
  likedEncounters: number[] // IDs of liked encounters
  dislikedEncounters: number[] // IDs of disliked encounters
}

// Public-facing user (safe to expose to client)
export type PublicUser = Omit<User, 'passwordHash' | 'email'>
