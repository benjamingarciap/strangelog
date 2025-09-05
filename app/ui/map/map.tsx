'use client'

import { Marker } from 'react-leaflet'
import { Popup } from 'react-leaflet'
import { TileLayer } from 'react-leaflet/TileLayer'
import { MapContainer } from 'react-leaflet/MapContainer'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import { useRef, useEffect } from 'react'
import { Encounter } from '../../types/encounters'
import L from 'leaflet'

export default function Map({ encounters }: { encounters: Encounter[] }) {
  const mapRef = useRef<L.Map | null>(null)
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize()
    }
  }, [])
  // console.log(encounters)

  return (
    <MapContainer
      center={[encounters[0].location.lat, encounters[0].location.lng]} // Madrid as default
      zoom={8}
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
