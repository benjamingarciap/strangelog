'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { UIEnrichedEncounter } from '../../types/encounters'

const Map = dynamic(() => import('./Map'), { ssr: false })

export default function MapWrapper({
  encounters,
}: {
  encounters: UIEnrichedEncounter[]
}): React.ReactElement {
  return (
    <>
      <div className="flex min-w-[300px] w-full h-full sticky top-0 z-0 px-[14px] pb-3 rounded pt-15">
        <Map encounters={encounters} />
      </div>
    </>
  )
}
