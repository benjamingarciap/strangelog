import prisma from '@/lib/prisma' // or your db client
import { UIEnrichedEncounter, UIEvidenceTag } from '../types/encounters'
import { Encounter, EncounterCategory } from '../generated/prisma'

// CREATE
export async function createEncounter(data: {
  title: string
  content: string
  category: EncounterCategory[]
  locationLat: number
  locationLng: number
  media?: string[]
  evidence?: UIEvidenceTag[]
  creatorId: number
}): Promise<Encounter> {
  console.log('Creating encounter with data:', data)
  const encounter = await prisma.encounter.create({
    data: {
      content: data.content,
      media: data.media || [],
      title: data.title,
      category: data.category,
      locationLat: data.locationLat,
      locationLng: data.locationLng,
      evidence: data.evidence || [],
      likes: 0,
      dislikes: 0,
      creatorId: data.creatorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  return {
    ...encounter,
  }
}

// UPDATE
export async function updateEncounter(
  id: number,
  data: Partial<{
    title: string
    content: string
    category: EncounterCategory[]
    location: { lat: number; lng: number }
    media: string[]
    evidence: UIEvidenceTag[]
  }>
): Promise<UIEnrichedEncounter> {
  const encounter = await prisma.encounter.update({
    where: { id },
    data: {
      title: data.title,
      content: data.content,
      category: data.category,
      locationLat: data.location?.lat,
      locationLng: data.location?.lng,
      media: data.media,
      evidence: data.evidence,
    },
    include: {
      creator: { select: { avatarUrl: true, username: true, id: true } },
      comments: {
        include: {
          author: { select: { avatarUrl: true, username: true, id: true } },
        },
      },
      confidences: true,
    },
  })

  return {
    ...encounter,
    location: { lat: encounter.locationLat, lng: encounter.locationLng },
    evidence: encounter.evidence as UIEvidenceTag[],
    category: encounter.category as EncounterCategory[],
  }
}

// DELETE
export async function deleteEncounter(
  id: number
): Promise<{ message: string }> {
  await prisma.encounter.delete({ where: { id } })
  return { message: 'Encounter deleted successfully' }
}
