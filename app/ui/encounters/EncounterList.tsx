'use client'
import React, { useMemo } from 'react'
import EncounterCard from './EncounterCard'
import { UIEnrichedEncounter } from '../../types/encounters'
import { useMapStore } from '../../../stores/mapStore'

export default function EncounterList({
  encounters,
}: {
  encounters: UIEnrichedEncounter[]
}): React.ReactElement {
  // =========Using Map Store to get current bounds=========
  const bounds = useMapStore((state) => state.bounds)
  console.log('Current map bounds in EncounterList:', bounds)
  // console.log('BOUNDS: bounds?.getNorthEast() ', bounds?.getNorthEast())
  // console.log('BOUNDS: bounds?.getNorthEast() LAT', bounds?.getNorthEast().lat)
  // useEffect(() => {
  //   const encountersFromApi = async () => {
  //     try {
  //       const res = await fetch('/api/encounters')
  //       const data = await res.json()
  //       console.log('Fetched encounters from API =========>', data)
  //     } catch (error) {
  //       console.error('Error fetching encounters from API:', error)
  //     }
  //   }
  //   encountersFromApi()
  // }, [bounds])

  // =========Filtering Encounters by Map Bounds=========
  const visibleEncounters = useMemo(() => {
    if (!bounds) return []
    return encounters.filter((e) => {
      const { lat, lng } = e.location
      return (
        lat <= bounds.getNorthEast().lat &&
        lat >= bounds.getSouthWest().lat &&
        lng <= bounds.getNorthEast().lng &&
        lng >= bounds.getSouthWest().lng
      )
    })
  }, [bounds, encounters])
  if (!bounds) {
    return <div>Loading map bounds...</div>
  }

  // =========Rendering Encounter Cards=========
  if (visibleEncounters.length === 0) {
    return (
      <div className="flex flex-row justify-center items-center h-screen w-full">
        <p className="text-gray-600 max-w-sm">No encounters available.</p>
      </div>
    )
  } else {
    return (
      <div className=" grid [@media(max-width:929px)]:grid-cols-1 md:grid-cols-2 [@media(min-width:1408px)]:grid-cols-3 pr-3 pt-15">
        {visibleEncounters.map((encounter) => {
          return (
            <EncounterCard
              encounter={encounter}
              key={encounter.id}
              socials={true}
              // isLastCard={index === visibleEncounters.length - 1}
            />
          )
        })}
      </div>
    )
  }
}
