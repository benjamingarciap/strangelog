'use client'
import React from 'react'
import { useRef, useEffect, useState } from 'react'
import L from 'leaflet'
import {
  Popup,
  Marker,
  TileLayer,
  MapContainer,
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
import MapEventHandler from '../../lib/utils/map-event-handler'
import { pulsingIcon, redDotIcon, redDotHoveredIcon } from './Markers'

//=========Main Map Component=========
export default function Map({
  encounters,
  onBoundsChange,
}: {
  encounters: UIEnrichedEncounter[]
  onBoundsChange: (_b: LatLngBounds) => void
}): React.ReactElement {
  //=========State Management=========
  const [hoveredDot, setHoveredDot] = useState<number | null>(null)
  const [popupId, setPopupId] = useState<number | null>(null)
  const isFullscreen = useMapStore((state) => state.isFullscreen)
  const hoveredCard = useMapStore((state) => state.hoveredCard)
  //=========Map Ref=========
  const { isOpen } = useSideMenuStore()
  const mapRef = useRef<L.Map | null>(null)
  //=========Handle Resize on Fullscreen or Side Menu Toggle=========
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize()
    }
  }, [isFullscreen, isOpen])
  // =========Rendering the Map=========
  return (
    <MapContainer
      center={[encounters[0].location.lat, encounters[0].location.lng]} // Madrid as default
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
        className="absolute bg-white border-black border-[0.5px] p-[4px] top-4 right-4 z-[1000] hover:bg-gray-200"
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

      <MapEventHandler onBoundsChange={onBoundsChange} />
      <EscapeToClosePopup setPopupId={setPopupId} />
      {encounters.map(({ id, location, media, title, content }) => {
        const isActive = popupId === id || hoveredCard === id // marker is "active" if clicked or hovered in list
        const isHovered = hoveredDot === id

        const icon = isActive
          ? pulsingIcon
          : redDotIcon && isHovered
          ? redDotHoveredIcon
          : redDotIcon
        return (
          <Marker
            position={[location.lat, location.lng]}
            icon={icon}
            eventHandlers={{
              click: () => {
                setPopupId(id)
                useMapStore.getState().toggleMarkerActive()
              },
              popupclose: () => {
                useMapStore.getState().toggleMarkerActive()
                setPopupId(null)
              },
              mouseover: () => setHoveredDot(id),
              mouseout: () => setHoveredDot(null),
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
