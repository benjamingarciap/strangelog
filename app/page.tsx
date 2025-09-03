import { fetchEncounters } from './lib/data'
import Image from 'next/image'
import { dummyEncounters } from './lib/dummyEncounters'
import { Encounter } from './types/encounters'

export default async function Home() {
  const encounters = await fetchEncounters()
  return (
    <div>
      <h1>App</h1>
      {encounters.map((encounter) => (
        <div key={encounter.id}>
          <h2>{encounter.title}</h2>
          <p>{encounter.content}</p>
          {encounter.media.map((item) => (
            <Image alt={item} key={item} src={item} width={400} height={300} />
          ))}
        </div>
      ))}
    </div>
  )
}
