import Encounters from './encounters/page'
import MapWrapper from './ui/map/mapWrapper'
import { fetchEncountersForMap } from './lib/data'
import React from 'react'

export default async function Home(): Promise<React.ReactElement> {
  const encounters = await fetchEncountersForMap()
  return (
    <div className="flex flex-row justify-center gap-10 w-full max-w-7xl">
      <MapWrapper encounters={encounters} />
      <Encounters />
    </div>
  )
}
