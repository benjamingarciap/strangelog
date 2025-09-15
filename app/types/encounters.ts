// types.ts

import { ConfidenceLevel } from './user'
import {
  Encounter as EncounterDB,
  Comment as CommentDB,
} from '../generated/prisma'

export type UapShape = 'Disc' | 'Triangle' | 'Cylinder' | 'Sphere'

export type UIEncounterCategory =
  | 'UAP — Luminous/Orbs'
  | `UAP — Structured Craft: ${UapShape}`
  | 'Transmedium / USO'
  | 'Formation / Swarm'
  | 'Close Encounter (CE-1)'
  | 'Close Encounter (CE-2)'
  | 'Close Encounter (CE-3)'
  | 'Other / Unclassified'

export type UIEvidenceTag =
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
export interface UIComment {
  id: number
  authorId: number
  content: string
  date: Date
  parentId: number | null // points to another UIComment if it's a reply
  // replies only exists in enriched/comment-with-user form
  replies?: UIComment[]
}

// ----------------------
// Encounters
// ----------------------
export interface UIEncounter {
  id: number
  title: string
  content: string
  location: {
    lat: number
    lng: number
  }
  evidence: UIEvidenceTag[]
  category: UIEncounterCategory
  date: Date // could use Date if you parse it
  media: string[] // array of URLs
  likes: number // count of likes
  dislikes: number // count of dislikes
  comments: UIComment[] // raw comments (DB)
  creatorId: number
}

export type UIEnrichedEncounter = Omit<UIEncounter, 'comments'> & {
  creator: { avatarUrl: string | null; username: string }
  comments: (UIComment & {
    author: { avatarUrl: string | null; username: string }
  })[]
}
// Enriched types with related data
export type EnrichedEncounter = EncounterDB & {
  creator: { avatarUrl: string | null; username: string }
  comments: (CommentDB & {
    author: { avatarUrl: string | null; username: string }
  })[]
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
