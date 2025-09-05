import { PublicUser } from './user'

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

export interface Comment {
  id: number
  authorId: number
  content: string
  date: string
}
export type CommentWithUser = Comment & {
  author: PublicUser
}

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
  date: string // could use Date if you want to parse it
  media: string[] // array of URLs
  likes: number
  dislikes: number
  comments: Comment[]
  creatorId: number
}

// a derived type
export type EncounterWithUser = Encounter & {
  creator: PublicUser
  // comments: CommentWithUser[]
  commentsWithUser: CommentWithUser[]
}
