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

// Map icon fix for default marker icons
const encounterIcon = L.icon({
  iconUrl: '/markers/alien.svg', // your SVG or PNG
  iconSize: [30, 30], // size of the icon
  iconAnchor: [15, 30], // point of the icon which corresponds to marker's location
  popupAnchor: [0, -30], // point from which popup opens
})

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
      className="w-[400px] h-full"
      ref={mapRef}
    >
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
      <MapEventHandler onBoundsChange={onBoundsChange} />
      {encounters.map((encounter) => (
        <Marker
          key={encounter.id}
          position={[encounter.location.lat, encounter.location.lng]}
          icon={encounterIcon}
        >
          {/* {console.log('Marker content:', encounter.content)} */}
          <Popup>
            <strong className="capitalize">{encounter.title}</strong>
            <p>{encounter.content}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
