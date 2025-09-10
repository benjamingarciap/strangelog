'use client'
import React from 'react'
import { useRef, useEffect } from 'react'
import L from 'leaflet'
import {
  Popup,
  Marker,
  TileLayer,
  useMapEvents,
  MapContainer,
  useMap,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import type { LatLngBounds } from 'leaflet'
import { UIEnrichedEncounter } from '../../types/encounters'

// =========Map Event Handler=========
function MapEventHandler({
  onBoundsChange,
}: {
  onBoundsChange: (_b: LatLngBounds) => void
}): null {
  const map = useMap()
  useEffect(() => {
    // Initial bounds on mount
    if (map) {
      onBoundsChange(map.getBounds())
    }
  }, [map, onBoundsChange])
  useMapEvents({
    moveend: (event: L.LeafletEvent) => {
      const bounds = event.target.getBounds()
      // console.log('Map moved. New bounds:', bounds)
      if (onBoundsChange) {
        onBoundsChange(bounds) // Call the callback with new Bounds
      }
    },
  })
  return null
}

//=========Main Map Component=========
export default function Map({
  encounters,
  onBoundsChange,
}: {
  encounters: UIEnrichedEncounter[]
  onBoundsChange: (_b: LatLngBounds) => void
}): React.ReactElement {
  //=========Map Component=========

  const mapRef = useRef<L.Map | null>(null)
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize()
    }
  }, [])

  // =========Rendering the Map=========
  return (
    <MapContainer
      center={[encounters[61].location.lat, encounters[61].location.lng]} // Madrid as default
      zoom={3}
      // style={{ height: '500px', width: '100%' }}
      className="w-[400px] h-full"
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      <MapEventHandler onBoundsChange={onBoundsChange} />
      {encounters.map((encounter) => (
        <Marker
          key={encounter.id}
          position={[encounter.location.lat, encounter.location.lng]}
        >
          {/* {console.log('Marker content:', encounter.content)} */}
          <Popup>
            <strong>👻{encounter.title}</strong>
            <p>{encounter.content}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
