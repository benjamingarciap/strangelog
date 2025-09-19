import React from 'react'
import EncounterList from '../encounters/EncounterList'
import MapWrapper from '../map/MapWrapper'
import { useMapStore } from '../../../stores/mapStore'
import { UIEnrichedEncounter } from '../../types/encounters'

export default function EncountersViewContainer({
  encounters,
}: {
  encounters: UIEnrichedEncounter[]
}): React.ReactElement {
  const isFullscreen = useMapStore((state) => state.isFullscreen)
  return (
    <>
      <div
        className={`overflow-y-auto h-full ${
          isFullscreen ? 'w-full' : 'w-1/2'
        }`}
      >
        <MapWrapper encounters={encounters} />
      </div>

      {/* Encounter List */}
      {!isFullscreen && (
        <div
          className={`overflow-y-auto h-full ${
            isFullscreen ? 'hidden' : 'w-1/2'
          }`}
        >
          <EncounterList encounters={encounters} />
        </div>
      )}
    </>
  )
}
