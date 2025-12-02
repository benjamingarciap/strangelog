import { notFound } from 'next/navigation'
import { fetchEncounterById } from '@/lib/data-encounters'
import EncounterDetail from '@/components/ui/encounters/EncounterDetail'
import React from 'react'

export default async function Page(props: {
  params: Promise<{ id: string }>
}): Promise<React.ReactElement> {
  // Fetch encounter data based on ID from params

  const params = await props.params
  const id = parseInt(params.id, 10)
  const encounter = await fetchEncounterById(id)
  if (!encounter) {
    notFound()
  }
  return <EncounterDetail encounter={encounter} />
}
