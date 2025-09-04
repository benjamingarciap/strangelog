import Encounters from './encounters/page'
import MapWrapper from './ui/map/mapWrapper'
import { fetchEncountersForMap } from './lib/data'

export default async function Home() {
  const encounters = await fetchEncountersForMap()
  return (
    <div className="flex flex-row justify-center gap-10 w-full max-w-7xl">
      <Encounters />
      <MapWrapper encounters={encounters} />
    </div>
  )
}
