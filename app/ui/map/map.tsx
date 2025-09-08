'use client'
import React from 'react'
import { Marker } from 'react-leaflet'
import { Popup } from 'react-leaflet'
import { TileLayer } from 'react-leaflet/TileLayer'
import { MapContainer } from 'react-leaflet/MapContainer'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import { useRef, useEffect } from 'react'
import { UIEnrichedEncounter } from '../../types/encounters'
import L from 'leaflet'

export default function Map({
  encounters,
}: {
  encounters: UIEnrichedEncounter[]
}): React.ReactElement {
  const mapRef = useRef<L.Map | null>(null)
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize()
    }
  }, [])
  // console.log(encounters)

  return (
    <MapContainer
      center={[encounters[61].location.lat, encounters[61].location.lng]} // Madrid as default
      zoom={3}
      // style={{ height: '500px', width: '100%' }}
      className="w-full h-full"
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
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
