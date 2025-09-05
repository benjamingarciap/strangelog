import { EncounterWithUser } from '../../types/encounters'
import { notFound } from 'next/navigation'
import { fetchEncounterById } from '@/app/lib/data'
import EncounterDetail from '../../ui/encounters/encounter-detail'

// This is your dynamic route page
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params
  // console.log('Fetching encounter with ID:', id)
  const encounter = await fetchEncounterById(id)
  if (!encounter) {
    notFound()
  }
  return <EncounterDetail encounter={encounter as EncounterWithUser} />
}
