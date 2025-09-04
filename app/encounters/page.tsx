import { fetchEncounters } from '../lib/data'

import EncounterCard from '../ui/encounters/encounter-card'

export default async function Encounters() {
  const encounters = await fetchEncounters()
  return (
    <div className="flex flex-col items-center justify-center pt-14">
      {encounters.map((encounter) => (
        <EncounterCard encounter={encounter} key={encounter.id} />
      ))}
    </div>
  )
}
