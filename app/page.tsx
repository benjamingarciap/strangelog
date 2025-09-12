import Encounters from './encounters/page'
import MapWrapper from './ui/map/mapWrapper'
import { fetchEncounters } from './lib/data-encounters'
import React from 'react'
import { fetchUserById } from './lib/data-users'

export default async function Home(): Promise<React.ReactElement> {
  const encounters = await fetchEncounters()
  const user = await fetchUserById(121)
  console.log('Fetched user from DB:', user)
  return (
    <div className="flex flex-row justify-around gap-4 w-full max-w-7xl h-screen">
      <MapWrapper encounters={encounters} />
      <div className="flex-1 overflow-y-auto">
        <Encounters />
      </div>
    </div>
  )
}
