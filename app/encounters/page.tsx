import { fetchEncountersFromDB } from '../lib/data'
import React from 'react'
import EncounterList from '../ui/encounters/encounter-list'

export default async function Encounters(): Promise<React.ReactElement> {
  const encountersFromDB = await fetchEncountersFromDB()
  return (
    <div>
      <EncounterList encounters={encountersFromDB} />
    </div>
  )
}
