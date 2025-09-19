import { fetchEncounters } from './lib/data-encounters'
import React from 'react'
import Dashboard from './ui/dashboard/Dashboard'
import { fetchUserById } from './lib/data-users'

export default async function Home(): Promise<React.ReactElement> {
  const user = await fetchUserById(84)
  console.log('User 84:', user)
  const encounters = await fetchEncounters()

  return <Dashboard encounters={encounters} />
}
