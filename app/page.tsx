import { fetchEncounters } from './lib/data-encounters'
import React from 'react'
import { fetchUserById } from './lib/data-users'
import Dashboard from './ui/Dashboard'

export default async function Home(): Promise<React.ReactElement> {
  const encounters = await fetchEncounters()
  const user = await fetchUserById(121)
  console.log('Fetched user from DB:', user)
  return <Dashboard encounters={encounters} />
}
