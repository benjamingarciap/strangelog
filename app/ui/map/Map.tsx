'use client'
import React from 'react'
import { useRef, useEffect, useState } from 'react'
import L from 'leaflet'
import {
  Popup,
  Marker,
  TileLayer,
  useMapEvents,
  MapContainer,
  useMap,
  ZoomControl,
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
import { EscapeToClosePopup } from '../../lib/utils/escape-event-listener'
import { useMapStore } from '../../../stores/mapStore'
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline'
import { useSideMenuStore } from '../../../stores/sideMenuStore'
import Image from 'next/image'

// =========Custom Pulsing Icon=========
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
  // Popup state
  const isFullscreen = useMapStore((state) => state.isFullscreen)
  //=========Using Map Events to Track Bounds=========
  const map = useMap()
  //---------Initial Bounds on Mount---------
  const { isOpen } = useSideMenuStore()
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
  }, [map, onBoundsChange, isFullscreen, isOpen])
  //---------Update Bounds on Move---------

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
  const isFullscreen = useMapStore((state) => state.isFullscreen)
  const [popupId, setPopupId] = useState<number | null>(null)
  //=========Map Ref=========
  const { isOpen } = useSideMenuStore()

  const mapRef = useRef<L.Map | null>(null)
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize()
    }
  }, [isFullscreen, isOpen])
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
      minZoom={2.5}
      maxZoom={20}
      zoomControl={false} // disable default zoom control
    >
      <ZoomControl position="topright" />
      <button
        className="absolute bg-white border-black border-[0.5px] p-2 top-4 right-4 z-[1000] hover:bg-gray-200"
        onClick={() => useMapStore.getState().toggleFullscreen()}
      >
        <ArrowsPointingOutIcon className="w-[18px] h-[20px]" />
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

      <MapEventHandler onBoundsChange={onBoundsChange} />
      <EscapeToClosePopup setPopupId={setPopupId} />
      {encounters.map(({ id, location, media, title, content }) => {
        const isActive = popupId === id // marker is "active" if clicked
        const icon = isActive
          ? pulsingIcon
          : L.divIcon({
              className: 'leaflet-red-dot',
              iconSize: [10, 10],
              iconAnchor: [5, 5],
              html: `<div class="dot"></div>`,
            })
        return (
          <Marker
            position={[location.lat, location.lng]}
            icon={icon}
            eventHandlers={{
              click: () => setPopupId(id),
              popupclose: () => setPopupId(null),
            }}
            key={id}
            autoPan={true} // pan the map automatically to fit the popup
            autoPanPadding={[50, 50]} // space between popup and map edge
          >
            <Popup className="" minWidth={120} maxWidth={350}>
              <div className="flex flex-col justify-start h-full">
                <Carousel className="relative group">
                  <CarouselContent>
                    {media.map((image, index) => {
                      return (
                        <CarouselItem key={image}>
                          <Image
                            width={500}
                            height={300}
                            loading={index === 0 ? 'eager' : 'lazy'}
                            src={image}
                            alt="Carousel Item"
                          />
                        </CarouselItem>
                      )
                    })}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-none shadow opacity-0 disabled:!opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-gray-200" />
                  <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-none shadow opacity-0 disabled:!opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-gray-200" />
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
        )
      })}
    </MapContainer>
  )
}
