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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Link from 'next/link'

// // Map icon fix for default marker icons
// const encounterIcon = L.icon({
//   iconUrl: '/markers/redcircle.svg', // your SVG or PNG
//   iconSize: [10, 10], // size of the icon
//   iconAnchor: [15, 30], // point of the icon which corresponds to marker's location
//   popupAnchor: [0, -30], // point from which popup opens
// })

const pulsingIcon = L.divIcon({
  className: 'leaflet-pulsing-dot',
  iconSize: [20, 20], // matches CSS
  iconAnchor: [10, 10], // center the dot
  html: `
    <div class="leaflet-pulsing-dot">
      <div class="ping"></div>
      <div class="dot"></div>
    </div>
  `,
})

// =========Map Event Handler=========
function MapEventHandler({
  onBoundsChange,
}: {
  onBoundsChange: (_b: LatLngBounds) => void
}): null {
  //=========Using Map Events to Track Bounds=========
  const map = useMap()
  //---------Initial Bounds on Mount---------
  useEffect(() => {
    // Initial bounds on mount
    if (map) {
      onBoundsChange(map.getBounds())
      setTimeout(() => {
        map.invalidateSize()
      }, 100) // tiny delay ensures layout is done
    }
    const handleResize = () => {
      map.invalidateSize()
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
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
  //=========Map Ref=========

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
      className="w-full h-full"
      ref={mapRef}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]} // full world bounds
      maxBoundsViscosity={1.0} // 1.0 = fully restrict panning
      minZoom={2}
      maxZoom={10}
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
      {encounters.map(({ id, location, media, title, content }) => (
        <Marker
          key={id}
          position={[location.lat, location.lng]}
          icon={pulsingIcon}
        >
          {/* {console.log('Marker content:', encounter.content)} */}
          <Popup className="" minWidth={120} maxWidth={350}>
            <div className="flex flex-col justify-start h-full">
              <Carousel className="relative group">
                <CarouselContent>
                  {media.map((image) => {
                    return (
                      <CarouselItem key={image}>
                        <img src={image} alt="Carousel Item" />
                      </CarouselItem>
                    )
                  })}
                </CarouselContent>
                <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-none shadow opacity-0 disabled:!opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-none shadow opacity-0 disabled:!opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Carousel>
              <Link href={`/encounters/${id}`}>
                <h2 className="capitalize font-bold hover:underline text-lg">
                  {title}
                </h2>
              </Link>
              <p className="overflow-hidden text-ellipsis whitespace-normal [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] m-0">
                {content}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
