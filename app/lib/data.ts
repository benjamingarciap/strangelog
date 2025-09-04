import { dummyEncounters } from './dummyEncounters'
import { dummyUsers } from './dummyUsers'
import {
  Encounter,
  EncounterWithUser,
  CommentWithUser,
} from '../types/encounters'
import { PublicUser } from '../types/user'

export async function fetchEncountersForMap(
  limit = 10, // items per page
  offset = 0
): Promise<Encounter[]> {
  // Simulate async DB call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyEncounters.slice(offset, offset + limit))
    }, 500) // optional artificial delay
  })
}

export async function fetchEncounters(
  limit = 10, // items per page
  offset = 0
): Promise<EncounterWithUser[]> {
  // Simulate async DB call
  return new Promise((resolve) => {
    setTimeout(() => {
      const enriched: EncounterWithUser[] = dummyEncounters
        .slice(offset, offset + limit)
        .map((enc) => ({
          ...enc,
          creator: dummyUsers.find((u) => u.id === enc.creatorId)!,
          comments: enc.comments.map((c) => ({
            ...c,
            author: dummyUsers.find((u) => u.id === c.authorId)!,
          })) as CommentWithUser[],
        }))
      resolve(enriched)
    }, 500) // optional artificial delay
  })
}

export async function fetchEncounterById(
  id: string
): Promise<EncounterWithUser | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const enriched = dummyEncounters.find((enc) => enc.id === Number(id))
      if (!enriched) return resolve(undefined)
      const withUser: EncounterWithUser = {
        ...enriched,
        creator: dummyUsers.find((u) => u.id === enriched!.creatorId)!,
        comments: enriched!.comments.map((c) => ({
          ...c,
          author: dummyUsers.find((u) => u.id === c.authorId)!,
        })) as CommentWithUser[],
      }
      resolve(withUser)
    }, 300)
  })
}

export async function fetchEncountersByCategory(
  category: string
): Promise<Encounter[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyEncounters.filter((enc) => enc.category === category))
    }, 300)
  })
}

export async function fetchUserById(
  id: number
): Promise<PublicUser | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyUsers.find((user) => user.id === id))
    }, 300)
  })
}
