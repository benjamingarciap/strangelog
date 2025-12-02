'use client'
import React from 'react'
import { useRef, useEffect, useState } from 'react'
import L from 'leaflet'
import { TileLayer, MapContainer, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import { UIEnrichedEncounter } from '@/types/encounters'
import { EscapeToClosePopup } from '@/lib/utils/escape-event-listener'
import { useMapStore } from '../../../stores/mapStore'
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline'
import { useSideMenuStore } from '../../../stores/sideMenuStore'
import MapEventHandler from '@/lib/utils/map-event-handler'
import { toGeoJSON } from '@/lib/utils/geojson'
import { EncounterClusters } from './EncounterClusters'

//=========Main Map Component=========
export default function Map({
  encounters,
}: {
  encounters: UIEnrichedEncounter[]
}): React.ReactElement {
  const points = toGeoJSON(encounters)
  //=========State Management=========
  const [popupId, setPopupId] = useState<number | null>(null)
  const isFullscreen = useMapStore((state) => state.isFullscreen)

  //=========Map Ref=========
  const { isOpen } = useSideMenuStore()
  const mapRef = useRef<L.Map | null>(null)
  const center: [number, number] = points.length
    ? [points[0].geometry.coordinates[1], points[0].geometry.coordinates[0]]
    : [40.4168, -3.7038] // fallback to Madrid or any default
  //=========Handle Resize on Fullscreen or Side Menu Toggle=========
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize()
    }
  }, [isFullscreen, isOpen])
  // =========Rendering the Map=========
  return (
    <MapContainer
      center={center} // Madrid as default
      zoom={3}
      className="w-full h-full rounded"
      ref={mapRef}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]} // full world bounds
      maxBoundsViscosity={1.0} // 1.0 = fully restrict panning
      minZoom={2.5}
      maxZoom={20}
      zoomControl={false} // disable default zoom control
    >
      <ZoomControl position="topright" />
      <button
        className="absolute bg-white border-black border-[0.5px] p-[4px] top-4 right-4 z-[1000] hover:bg-gray-200 transition-all duration-300 ease-in-out"
        onClick={() => useMapStore.getState().toggleFullscreen()}
      >
        <ArrowsPointingOutIcon className="w-[26px] h-[26px]" />
      </button>
      {/* carto light */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution="&copy; OpenStreetMap &copy; CARTO"
        subdomains="abcd"
      />
      {/* carto dark */}
      {/* <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution="&copy; OpenStreetMap &copy; CARTO"
        subdomains="abcd"
      /> */}
      {/* Stamen toner lite */}
      {/* <TileLayer
        url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://stamen.com/">Stamen Design</a> &copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
        subdomains={['a', 'b', 'c', 'd']}
      /> */}

      <MapEventHandler />
      <EscapeToClosePopup setPopupId={setPopupId} />
      <EncounterClusters points={points} />
    </MapContainer>
  )
}
