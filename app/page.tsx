import Encounters from './encounters/page'
import MapWrapper from './ui/map/mapWrapper'
import { fetchEncounters } from './lib/data'

export default async function Home() {
  const encounters = await fetchEncounters()
  return (
    <div>
      <Encounters />
      <MapWrapper encounters={encounters} />
    </div>
  )
}
