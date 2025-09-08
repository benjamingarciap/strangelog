import { fetchEncountersFromDB } from '../lib/data'
import React from 'react'

import EncounterCard from '../ui/encounters/encounter-card'

export default async function Encounters(): Promise<React.ReactElement> {
  const encountersFromDB = await fetchEncountersFromDB()
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-14">
      {encountersFromDB.map((encounter) => (
        <EncounterCard encounter={encounter} key={encounter.id} />
      ))}
    </div>
  )
}
