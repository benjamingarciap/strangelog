import prisma from '@/lib/prisma'
import {
  UIEvidenceTag,
  UIEncounterCategory,
  UIEnrichedEncounter,
  EnrichedEncounter,
} from '../types/encounters'

// Fetch all encounters with creator and comments

export async function fetchEncounters(): Promise<UIEnrichedEncounter[]> {
  const encounters: EnrichedEncounter[] = await prisma.encounter.findMany({
    include: {
      creator: { select: { avatarUrl: true, username: true, id: true } },
      comments: {
        include: {
          author: { select: { avatarUrl: true, username: true, id: true } },
        },
      },
    },
  })

  // console.log('Fetched encounters from DB:', encounters)
  return encounters.map((encounter) => ({
    ...encounter,
    location: {
      lat: encounter.locationLat,
      lng: encounter.locationLng,
    },
    evidence: encounter.evidence as UIEvidenceTag[],
    category: encounter.category as UIEncounterCategory,
  }))
}

export async function fetchEncounterById(
  id: UIEnrichedEncounter['id']
): Promise<UIEnrichedEncounter | null> {
  const encounter: EnrichedEncounter | null = await prisma.encounter.findUnique(
    {
      where: { id },
      include: {
        creator: { select: { avatarUrl: true, username: true, id: true } },
        comments: {
          include: {
            author: { select: { avatarUrl: true, username: true, id: true } },
          },
        },
      },
    }
  )
  if (!encounter) return null

  // console.log('Fetched encounter from DB:', encounter)
  return {
    ...encounter,
    location: {
      lat: encounter.locationLat,
      lng: encounter.locationLng,
    },
    evidence: encounter.evidence as UIEvidenceTag[],
    category: encounter.category as UIEncounterCategory,
  }
}
