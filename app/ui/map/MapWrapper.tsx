'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { UIEnrichedEncounter } from '../../types/encounters'
import { useMapStore } from '../../../stores/mapStore'

const Map = dynamic(() => import('./Map'), { ssr: false })

//=========Map Wrapper Component=========

export default function MapWrapper({
  encounters,
}: {
  encounters: UIEnrichedEncounter[]
}): React.ReactElement {
  const setBounds = useMapStore((state) => state.setBounds)
  // if (isFullscreen) {
  //   return (
  //     <>
  //       <button
  //         className="absolute bg-white border border-gray-300 rounded-md p-2 top-4 right-4 z-[1000]"
  //         onClick={() => useMapStore.getState().toggleFullscreen()}
  //       >
  //         Exit Fullscreen
  //       </button>
  //       <div className="fixed inset-0 z-50 bg-white">
  //         <Map encounters={encounters} onBoundsChange={setBounds} />
  //       </div>
  //     </>
  //   )
  // }
  return (
    <>
      <div className="min-w-[300px] w-full h-full pt-14 sticky top-0 z-0">
        <Map encounters={encounters} onBoundsChange={setBounds} />
      </div>
    </>
  )
}
