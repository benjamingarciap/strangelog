import { fetchEncounters } from '@/lib/data-encounters'
import React from 'react'
import EncounterList from '@/components/ui/encounters/EncounterList'

export default async function Encounters(): Promise<React.ReactElement> {
  const encountersFromDB = await fetchEncounters()
  return (
    <div className="w-full h-screen">
      <EncounterList encounters={encountersFromDB} />
    </div>
  )
}
