// types.ts

import { PublicUser, ConfidenceLevel } from './user'

export type UapShape = 'Disc' | 'Triangle' | 'Cylinder' | 'Sphere'

export type EncounterCategory =
  | 'UAP — Luminous/Orbs'
  | `UAP — Structured Craft: ${UapShape}`
  | 'Transmedium / USO'
  | 'Formation / Swarm'
  | 'Close Encounter (CE-1)'
  | 'Close Encounter (CE-2)'
  | 'Close Encounter (CE-3)'
  | 'Other / Unclassified'

export type EvidenceTag =
  | 'Visual'
  | 'Photo/Video — EO/IR'
  | 'Radar'
  | 'Multi-sensor'
  | 'Physical trace'
  | 'EM interference'
  | 'Physiological effects'

// ----------------------
// Comments
// ----------------------
export interface Comment {
  id: number
  authorId: number
  content: string
  date: string
  parentId?: number // points to another Comment if it's a reply
  // replies only exists in enriched/comment-with-user form
  replies?: Comment[]
}

export type CommentWithUser = Comment & {
  author: PublicUser
  replies?: CommentWithUser[] // nested replies
}

// ----------------------
// Encounters
// ----------------------
export interface Encounter {
  id: number
  title: string
  content: string
  location: {
    lat: number
    lng: number
  }
  evidence: EvidenceTag[]
  category: EncounterCategory
  date: string // could use Date if you parse it
  media: string[] // array of URLs
  likes: number // count of likes
  dislikes: number // count of dislikes
  comments: Comment[] // raw comments (DB)
  creatorId: number
}

// enriched encounter with user info and comments
export type EncounterWithUser = Encounter & {
  creator: PublicUser
  commentsWithUser: CommentWithUser[]
}

// ----------------------
// Reactions & Confidence (for full CRUD backend)
// ----------------------
export interface Reaction {
  userId: number
  encounterId: number
  type: 'LIKE' | 'DISLIKE'
}

export interface Confidence {
  userId: number
  encounterId: number
  level: ConfidenceLevel
}
