import { EncounterWithUser } from '../../types/encounters'
import { notFound } from 'next/navigation'
import { fetchEncounterById } from '@/app/lib/data'
import EncounterDetail from '../../ui/encounters/encounter-detail'
import React from 'react'

export default async function Page(props: {
  params: Promise<{ id: string }>
}): Promise<React.ReactElement> {
  const params = await props.params
  const { id } = params
  // console.log('Fetching encounter with ID:', id)
  const encounter = await fetchEncounterById(id)
  if (!encounter) {
    notFound()
  }
  return <EncounterDetail encounter={encounter as EncounterWithUser} />
}
