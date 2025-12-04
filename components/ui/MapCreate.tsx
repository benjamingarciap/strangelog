'use client'
import React, { useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  ZoomControl,
  useMap,
} from 'react-leaflet'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import 'leaflet-geosearch/assets/css/leaflet.css'
import L from 'leaflet'

const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41], // default size
  iconAnchor: [12, 41], // ← point of the icon that corresponds to the marker location (center bottom)
  popupAnchor: [0, -41], // optional, where popups appear relative to the icon
})
// Create the provider
const provider = new OpenStreetMapProvider({
  params: {
    email: 'your-email@example.com', // optional but recommended
  },
})
const SearchField = ({
  setLat,
  setLng,
}: {
  setLat: (lat: number) => void
  setLng: (lng: number) => void
}) => {
  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
    showMarker: false,
    searchLabel: 'Enter address',
  })

  const map = useMap()

  map.on('geosearch/showlocation', (e) => {
    const ev = e as unknown as { location: { x: number; y: number } }
    const { x, y } = ev.location // x=lng, y=lat
    setLat(y)
    setLng(x)
    map.setView([y, x], 14)
  })
  // @ts-ignore
  useEffect(() => {
    map.addControl(searchControl)
    return () => map.removeControl(searchControl)
  }, [])

  return null
}
export default function MapCreate({
  setError,
  setLat,
  setLng,
  lat,
  lng,
}: {
  setError?: (error: string) => void
  setLat: (lat: number) => void
  setLng: (lng: number) => void
  lat: number | null
  lng: number | null
}): React.ReactElement {
  // Map marker click handler
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setError && setError('')
        setLat(e.latlng.lat)
        setLng(e.latlng.lng)
      },
    })
    console.log('Location:', lat, lng)

    return lat && lng ? (
      <Marker position={[lat, lng]} icon={markerIcon} />
    ) : null
  }

  return (
    <div className="w-full">
      <p className="mb-1 text-gray-700">Select Location on Map:</p>
      <MapContainer
        center={[40.4168, -3.7038]}
        zoom={6}
        style={{ cursor: 'crosshair' }}
        className="w-full h-full cursor-pointer"
        zoomControl={false}
      >
        <SearchField setLat={setLat} setLng={setLng} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <ZoomControl position="topright" />
        <LocationMarker />
      </MapContainer>
      {/* {lat && lng && (
        <p className="mt-2 text-gray-600 text-sm">
          Selected: {lat.toFixed(5)}, {lng.toFixed(5)}
        </p>
      )} */}
    </div>
  )
}
