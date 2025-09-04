'use client'
import dynamic from 'next/dynamic'
import Map from './map'

export default function MapWrapper({ encounters }: { encounters: any[] }) {
  return (
    <div className="w-1/4 h-200 pt-20 sticky top-0 z-10">
      <Map encounters={encounters} />
    </div>
  )
}
