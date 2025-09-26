'use client'
import React from 'react'
import { UIEnrichedEncounter } from '../../types/encounters'
import MapWrapper from '../map/MapWrapper'
import EncounterList from '../encounters/EncounterList'
import { useMapStore } from '../../../stores/mapStore'
import { SideMenu } from '../SideMenu'

export default function Dashboard({
  encounters,
}: {
  encounters: UIEnrichedEncounter[]
}): React.ReactElement {
  const isFullscreen = useMapStore((state) => state.isFullscreen)
  console.log('Fetched encounters from DB:', encounters)

  return (
    <div className="flex w-full h-screen">
      <>
        <div className="relative flex-shrink-0">
          <SideMenu />
        </div>
        <div
          className={`overflow-y-auto h-full ${
            isFullscreen ? 'w-full' : 'w-3/6'
          }`}
        >
          <MapWrapper encounters={encounters} />
        </div>

        {/* Encounter List */}
        {!isFullscreen && (
          <div
            className={`overflow-y-auto h-full ${
              isFullscreen ? 'hidden' : 'w-3/6'
            }`}
          >
            <EncounterList encounters={encounters} />
          </div>
        )}
      </>
    </div>
  )
}
