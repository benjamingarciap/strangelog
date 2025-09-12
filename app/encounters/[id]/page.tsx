import { notFound } from 'next/navigation'
import { fetchEncounterById } from '@/app/lib/data-encounters'
import EncounterDetail from '../../ui/encounters/encounter-detail'
import React from 'react'

export default async function Page(props: {
  params: Promise<{ id: string }>
}): Promise<React.ReactElement> {
  const params = await props.params
  const id = parseInt(params.id, 10)
  const encounter = await fetchEncounterById(id)
  if (!encounter) {
    notFound()
  }
  return <EncounterDetail encounter={encounter} />
}
