import prisma from '@/lib/prisma'
import { User as UserDB } from '../generated/prisma'
import { UIUser } from '../types/user'

export async function fetchUserById(id: number): Promise<UserDB | null> {
  const user: UserDB | null = await prisma.user.findUnique({
    where: { id },
    include: {
      encounters: true,
      reactions: {
        select: { id: true, type: true },
      },
    },
  })
  if (user) {
    return user
  }

  return null
}
