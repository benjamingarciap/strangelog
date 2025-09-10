'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { UIEnrichedEncounter } from '../../types/encounters'
import { useMapStore } from '../../../stores/mapStore'

const Map = dynamic(() => import('./map'), { ssr: false })

//=========Map Wrapper Component=========

export default function MapWrapper({
  encounters,
}: {
  encounters: UIEnrichedEncounter[]
}): React.ReactElement {
  const setBounds = useMapStore((state) => state.setBounds)
  return (
    <div className="min-w-[400px] w-1/4 h-200 pt-20 sticky top-0 z-10">
      <Map encounters={encounters} onBoundsChange={setBounds} />
    </div>
  )
}
