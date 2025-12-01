import React from 'react'
import Dashboard from './ui/dashboard/Dashboard'
import { getServerSession, User } from 'next-auth'
import { authOptions } from './lib/auth'
import { fetchUserById } from './lib/data-users'
import { PublicEnrichedUser } from './types/user'

export default async function Home(): Promise<React.ReactElement> {
  const session = await getServerSession(authOptions)
  // console.log('Session in page.tsx:', session)
  let user: PublicEnrichedUser | null = null
  if (session) {
    user = await fetchUserById(parseInt(session.user.id))
    // console.log('Fetched user in page.tsx:', user)
  }
  return <Dashboard user={user} />
}
