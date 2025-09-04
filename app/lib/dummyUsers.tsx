// data/dummyUsers.ts
import { PublicUser } from '../types/user'

export const dummyUsers: PublicUser[] = [
  {
    id: 1,
    username: 'user123',
    email: 'user123@example.com',
    passwordHash: 'hashedpassword1', // just a placeholder
    createdAt: '2025-01-01',
    confidenceLevel: 4,
    avatarUrl: '/avatars/ufo1.png',
    bio: 'Seen some strange things over Madrid.',
    encounters: [1, 2, 3],
    likedEncounters: [2],
    dislikedEncounters: [],
  },
  {
    id: 2,
    username: 'ufo_lover',
    email: 'ufo_lover@example.com',
    passwordHash: 'hashedpassword2',
    createdAt: '2025-01-10',
    confidenceLevel: 5,
    avatarUrl: '/avatars/ufo2.png',
    bio: 'Dedicated skywatcher since childhood.',
    encounters: [4, 5],
    likedEncounters: [1, 3],
    dislikedEncounters: [],
  },
]
