// types.ts

import {
  Encounter as EncounterDB,
  Comment as CommentDB,
  EncounterCategory,
} from '../generated/prisma'

export type UapShape = 'Disc' | 'Triangle' | 'Cylinder' | 'Sphere'

export type UIEncounterCategory =
  | 'UAP — Luminous/Orbs'
  | 'UAP — Structured Craft: Disc'
  | 'UAP — Structured Craft: Triangle'
  | 'UAP — Structured Craft: Cylinder'
  | 'UAP — Structured Craft: Sphere'
  | 'Transmedium / USO'
  | 'Formation / Swarm'
  | 'Close Encounter (CE-1)'
  | 'Close Encounter (CE-2)'
  | 'Close Encounter (CE-3)'
  | 'Close Encounter (CE-4: Abduction)'
  | 'Close Encounter (CE-5: Initiated Contact)'
  | 'Close Encounter (CE-6: Injury)'
  | 'Close Encounter (CE-7: Long Term Contact)'
  | 'Entity Encounter'
  | 'Abduction Scenario'
  | 'Poltergeist Activity'
  | 'Portal / Dimensional'
  | 'Cattle Mutilation'
  | 'Men in Black'
  | 'Missing Time'
  | 'Psychic Effects'
  | 'Trace Evidence'
  | 'EM Interference'
  | 'Radiation Effects'
  | 'Weather Disturbance'
  | 'Other'

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
  category: EncounterCategory[]
  date: Date // could use Date if you parse it
  media: string[] // array of URLs
  likes: number // count of likes
  dislikes: number // count of dislikes
  comments: UIComment[] // raw comments (DB)
  creatorId: number
}

export type UIEnrichedEncounter = Omit<UIEncounter, 'comments'> & {
  creator: { avatarUrl: string | null; username: string; id: number }
  comments: (UIComment & {
    author: { avatarUrl: string | null; username: string; id: number }
  })[]
  confidences?: Confidence[]
}

export type Confidence = {
  encounterId: number
  id: number
  level: number
  userId: number
}

// Enriched types with related data
export type EnrichedEncounter = EncounterDB & {
  creator: { avatarUrl: string | null; username: string; id: number }
  comments: (CommentDB & {
    author: { avatarUrl: string | null; username: string; id: number }
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
