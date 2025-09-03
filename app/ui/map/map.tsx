'use client'

import { Marker } from 'react-leaflet'
import { Popup } from 'react-leaflet'
import { TileLayer } from 'react-leaflet/TileLayer'
import { MapContainer } from 'react-leaflet/MapContainer'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'

import { Encounter } from '../../types/encounters'

export default function Map({ encounters }: { encounters: Encounter[] }) {
  console.log(encounters)

  return (
    <MapContainer
      center={[40.4168, -3.7038]} // Madrid as default
      zoom={5}
      style={{ height: '500px', width: '100%' }}
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
          <Popup>
            <strong>👻{encounter.title}</strong>
            <p>{encounter.content}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
