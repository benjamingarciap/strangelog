import { dummyEncounters } from './dummyEncounters'
import { Encounter } from '../types/encounters'

export async function fetchEncounters(
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

export async function fetchEncounterById(
  id: number
): Promise<Encounter | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyEncounters.find((enc) => enc.id === id))
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
