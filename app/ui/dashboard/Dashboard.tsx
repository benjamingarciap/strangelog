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
    // <div className="flex w-full h-screen pt-15 bg-[#e3e7eb]">
    // <div className="flex w-full h-screen bg-[#D5DADC]"> // map bg color
    <div
      className="flex w-full h-screen 
      [@media(max-width:531px)]:flex-col
      [@media(max-width:531px)]:jusifty-center
      [@media(max-width:531px)]:items-center
   "
    >
      <>
        <div className="relative flex-shrink-0">
          {/* <SideMenu buttonRef={buttonRef} /> */}
        </div>
        <div
          className={`overflow-y-auto h-full ${
            isFullscreen
              ? 'w-full'
              : 'w-8/20 [@media(max-width:929px)]:w-11/20 [@media(max-width:532px)]:!w-full'
          }`}
        >
          <MapWrapper encounters={filteredEncounters} />
        </div>

        {/* Encounter List */}
        {!isFullscreen && (
          <div
            className={`overflow-y-auto h-full ${
              isFullscreen
                ? 'hidden'
                : 'w-12/20 [@media(max-width:929px)]:w-9/20 [@media(max-width:532px)]:!w-[100%]'
            }`}
          >
            <EncounterList encounters={filteredEncounters} />
          </div>
        )}
      </>
    </div>
  )
}
