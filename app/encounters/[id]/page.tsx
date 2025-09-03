import { notFound } from 'next/navigation'
import { fetchEncounterById } from '@/app/lib/data'
import Image from 'next/image'

// This is your dynamic route page
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  console.log('Fetching encounter with ID:', id)
  const encounter = await fetchEncounterById(id)
  if (!encounter) {
    notFound()
  }
  const { title, content, media } = encounter
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="mb-4">{content}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {media.map((item) => (
          <Image alt={item} key={item} src={item} width={400} height={300} />
        ))}
      </div>
    </div>
  )
}
