import React from 'react'
import { fetchEncounters } from './lib/data-encounters'
import Dashboard from './ui/dashboard/Dashboard'

export default async function Home(): Promise<React.ReactElement> {
  // const encounters = await fetchEncounters()
  return <Dashboard />
}
