import prisma from '@/lib/prisma'
import { UIEncounterCategory, UIEvidenceTag } from '../types/encounters'

import { PublicEnrichedUser } from '../types/user'
import { EncounterCategory } from '../generated/prisma'

// Fetch user by ID, including their encounters and reactions

export async function fetchUserById(
  id: number
): Promise<PublicEnrichedUser | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      avatarUrl: true,
      bio: true,
      confidenceLevel: true,
      encounters: {
        include: {
          comments: true,
        },
      },
      reactions: {
        select: { id: true, type: true },
      },
    },
  })

  if (!user) return null // User not found

  return {
    // return public user data
    ...user,
    encounters: user.encounters.map((encounter) => ({
      creator: user,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      id: encounter.id,
      title: encounter.title,
      content: encounter.content,
      evidence: encounter.evidence as UIEvidenceTag[],
      location: {
        lat: encounter.locationLat,
        lng: encounter.locationLng,
      },
      category: encounter.category as EncounterCategory[],
      date: encounter.date,
      media: encounter.media,
      likes: encounter.likes,
      dislikes: encounter.dislikes,
      comments: encounter.comments.map((comment) => ({
        ...comment,
        author: user,
      })),
      creatorId: encounter.creatorId,
    })),
    reactions: user.reactions.map((reaction) => ({
      id: reaction.id,
      type: reaction.type.toLowerCase() as 'like' | 'dislike',
    })),
  }
}
