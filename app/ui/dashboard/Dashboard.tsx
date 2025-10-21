'use client'
import React, { useEffect, useState } from 'react'
import { UIEnrichedEncounter } from '../../types/encounters'
import MapWrapper from '../map/MapWrapper'
import EncounterList from '../encounters/EncounterList'
import { useMapStore } from '../../../stores/mapStore'
// import { SideMenu } from '../sideMenu/SideMenu'
import { useSideMenuStore } from '../../../stores/sideMenuStore'
import { EncounterCategory } from '../../generated/prisma'

export default function Dashboard(): React.ReactElement {
  // ---------
  // const buttonRef = React.useRef<HTMLButtonElement>(
  //   null
  // ) as React.RefObject<HTMLButtonElement>
  const isFullscreen = useMapStore((state) => state.isFullscreen)
  const filterCategory: EncounterCategory | null = useSideMenuStore(
    (state) => state.filterCategory
  )
  const [filteredEncounters, setFilteredEncounters] = useState<
    UIEnrichedEncounter[]
  >([])
  // ---------
  // console.log('Dashboard encounters:', encounters)
  // console.log('Filtered Encounters:', filteredEncounters)

  const mapBounds = useMapStore((state) => state.bounds) // { minLat, maxLat, minLng, maxLng }
  // const [encounters, setEncounters] = useState<UIEnrichedEncounter[]>([])
  const [page, setPage] = useState(0)
  const limit = 10

  const fetchEncounters = async () => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      // ...(mapBounds || {}),
    })
    if (mapBounds) {
      params.set('minLat', mapBounds.getSouthWest().lat.toString())
      params.set('minLng', mapBounds.getSouthWest().lng.toString())
      params.set('maxLat', mapBounds.getNorthEast().lat.toString())
      params.set('maxLng', mapBounds.getNorthEast().lng.toString())
    }
    console.log('MapWrapper fetch with bounds params:', params.toString())
    const res = await fetch(`/api/encounters/map?${params.toString()}`)
    const data = await res.json()
    console.log('Fetched encounters API ========================>', data)
    setFilteredEncounters(data)
    console.log('Filtered Encounters after fetch =======>:', filteredEncounters)
  }

  // useEffect(() => {
  //   if (filterCategory) {
  //     setFilteredEncounters(
  //       encounters.filter((encounter) =>
  //         encounter.category.includes(filterCategory)
  //       )
  //     )
  //   } else {
  //     setFilteredEncounters(encounters)
  //   }
  // }, [filterCategory, encounters])
  useEffect(() => {
    fetchEncounters()
  }, [mapBounds, page]) // refetch when bounds or page change

  const cathegorizedEncounters = filterCategory
    ? filteredEncounters.filter((e) => e.category.includes(filterCategory))
    : filteredEncounters

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
          <MapWrapper encounters={cathegorizedEncounters} />
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
            <EncounterList encounters={cathegorizedEncounters} />
          </div>
        )}
      </>
    </div>
  )
}
