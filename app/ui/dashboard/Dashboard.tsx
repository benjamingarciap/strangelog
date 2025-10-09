'use client'
import React, { useEffect } from 'react'
import { UIEnrichedEncounter } from '../../types/encounters'
import MapWrapper from '../map/MapWrapper'
import EncounterList from '../encounters/EncounterList'
import { useMapStore } from '../../../stores/mapStore'
// import { SideMenu } from '../sideMenu/SideMenu'
import { useSideMenuStore } from '../../../stores/sideMenuStore'
import { EncounterCategory } from '../../generated/prisma'

export default function Dashboard({
  encounters,
}: {
  encounters: UIEnrichedEncounter[]
}): React.ReactElement {
  // ---------
  // const buttonRef = React.useRef<HTMLButtonElement>(
  //   null
  // ) as React.RefObject<HTMLButtonElement>
  const isFullscreen = useMapStore((state) => state.isFullscreen)
  const filterCategory: EncounterCategory | null = useSideMenuStore(
    (state) => state.filterCategory
  )
  const [filteredEncounters, setFilteredEncounters] = React.useState(encounters)
  // ---------
  // console.log('Dashboard encounters:', encounters)
  console.log('Filtered Encounters:', filteredEncounters)

  useEffect(() => {
    if (filterCategory) {
      setFilteredEncounters(
        encounters.filter((encounter) =>
          encounter.category.includes(filterCategory)
        )
      )
    } else {
      setFilteredEncounters(encounters)
    }
  }, [filterCategory, encounters])

  return (
    <div className="flex w-full h-screen">
      <>
        <div className="relative flex-shrink-0">
          {/* <SideMenu buttonRef={buttonRef} /> */}
        </div>
        <div
          className={`overflow-y-auto h-full ${
            isFullscreen ? 'w-full' : 'w-3/6'
          }`}
        >
          <MapWrapper encounters={filteredEncounters} />
        </div>

        {/* Encounter List */}
        {!isFullscreen && (
          <div
            className={`overflow-y-auto h-full ${
              isFullscreen ? 'hidden' : 'w-3/6'
            }`}
          >
            <EncounterList encounters={filteredEncounters} />
          </div>
        )}
      </>
    </div>
  )
}
