import { fetchEncounters } from '../lib/data'
import Image from 'next/image'
import Link from 'next/link'

export default async function Encounters() {
  const encounters = await fetchEncounters()
  return (
    <div>
      {encounters.map((encounter) => (
        <div key={encounter.id}>
          <Link href={`/encounters/${encounter.id}`}>
            <h2>{encounter.title}</h2>
            <p>{encounter.content}</p>
            {encounter.media.map((item) => (
              <Image
                alt={item}
                key={item}
                src={item}
                width={400}
                height={300}
              />
            ))}
          </Link>
        </div>
      ))}
    </div>
  )
}
