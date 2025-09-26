'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { UIEnrichedEncounter } from '../../types/encounters'
import { useMapStore } from '../../../stores/mapStore'

const Map = dynamic(() => import('./Map'), { ssr: false })

export default function MapWrapper({
  encounters,
}: {
  encounters: UIEnrichedEncounter[]
}): React.ReactElement {
  const setBounds = useMapStore((state) => state.setBounds)
  return (
    <>
      <div className="flex min-w-[300px] w-full h-full pt-12 sticky top-0 z-0 px-[14px] pb-3">
        <Map encounters={encounters} onBoundsChange={setBounds} />
      </div>
    </>
  )
}
