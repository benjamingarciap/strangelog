'use client'
import React from 'react'
import { UIEnrichedEncounter } from '../../types/encounters'
import DashboardContent from './DashboardContent'
import EncountersViewContainer from './EncountersViewContainer'

export default function Dashboard({
  encounters,
}: {
  encounters: UIEnrichedEncounter[]
}): React.ReactElement {
  console.log('Fetched encounters from DB:', encounters)

  return (
    <div className="flex w-full h-screen">
      <DashboardContent>
        <EncountersViewContainer encounters={encounters} />
      </DashboardContent>
    </div>
  )
}
