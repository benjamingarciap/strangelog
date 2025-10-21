import prisma from '@/lib/prisma'
import {
  UIEvidenceTag,
  UIEnrichedEncounter,
  EnrichedEncounter,
} from '../types/encounters'
import { EncounterCategory, Prisma } from '../generated/prisma'

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
      confidences: true,
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
    category: encounter.category as EncounterCategory[],
  }))
}

export async function fetchEncountersMap(
  req: Request
): Promise<UIEnrichedEncounter[]> {
  const { searchParams } = new URL(req.url)
  const minLat = searchParams.get('minLat')
  const maxLat = searchParams.get('maxLat')
  const minLng = searchParams.get('minLng')
  const maxLng = searchParams.get('maxLng')

  const where: Prisma.EncounterWhereInput = {}

  // Only apply map filtering if bounds are provided
  if (minLat && maxLat && minLng && maxLng) {
    where.locationLat = {
      gte: parseFloat(minLat),
      lte: parseFloat(maxLat),
    }
    where.locationLng = {
      gte: parseFloat(minLng),
      lte: parseFloat(maxLng),
    }
  }

  const encounters = await prisma.encounter.findMany({
    where,
    orderBy: { createdAt: 'desc' },
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

  return encounters.map((encounter: EnrichedEncounter) => ({
    ...encounter,
    location: {
      lat: encounter.locationLat,
      lng: encounter.locationLng,
    },
    evidence: encounter.evidence as UIEvidenceTag[],
    category: encounter.category as EncounterCategory[],
  }))
}

export async function fetchEncountersPaginated(
  req: Request
): Promise<UIEnrichedEncounter[]> {
  const { searchParams } = new URL(req.url)
  const minLat = searchParams.get('minLat')
  const maxLat = searchParams.get('maxLat')
  const minLng = searchParams.get('minLng')
  const maxLng = searchParams.get('maxLng')
  const page = parseInt(searchParams.get('page') || '0', 10)
  const limit = parseInt(searchParams.get('limit') || '20', 10)

  const where: Prisma.EncounterWhereInput = {}

  // Only apply map filtering if bounds are provided
  if (minLat && maxLat && minLng && maxLng) {
    where.locationLat = {
      gte: parseFloat(minLat),
      lte: parseFloat(maxLat),
    }
    where.locationLng = {
      gte: parseFloat(minLng),
      lte: parseFloat(maxLng),
    }
  }

  const encounters = await prisma.encounter.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    skip: page * limit,
    take: limit,
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

  return encounters.map((encounter: EnrichedEncounter) => ({
    ...encounter,
    location: {
      lat: encounter.locationLat,
      lng: encounter.locationLng,
    },
    evidence: encounter.evidence as UIEvidenceTag[],
    category: encounter.category as EncounterCategory[],
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
    category: encounter.category as EncounterCategory[],
  }
}
