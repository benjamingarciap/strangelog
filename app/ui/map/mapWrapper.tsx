'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { Encounter } from '../../types/encounters'
// import Map from './map'

const Map = dynamic(() => import('./map'), { ssr: false })

export default function MapWrapper({
  encounters,
}: {
  encounters: Encounter[]
}): React.ReactElement {
  return (
    <div className="w-1/4 h-200 pt-20 sticky top-0 z-10">
      <Map encounters={encounters} />
    </div>
  )
}
