import Encounters from './encounters/page'
import MapWrapper from './ui/map/mapWrapper'
import { fetchEncountersFromDB } from './lib/data'
import React from 'react'

export default async function Home(): Promise<React.ReactElement> {
  const encounters = await fetchEncountersFromDB()
  return (
    <div className="flex flex-row justify-between gap-4 w-full max-w-7xl h-screen">
      <MapWrapper encounters={encounters} />
      <div className="flex-1 overflow-y-auto">
        <Encounters />
      </div>
    </div>
  )
}
