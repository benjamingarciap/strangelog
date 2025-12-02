import { Popup, useMap } from 'react-leaflet'
import React, { useEffect } from 'react'
import type { PopupEvent } from 'leaflet'
import Image from 'next/image'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export function CustomPopupContent({
  id,
  media,
  title,
  content,
}: {
  id: number
  media: string[]
  title: string
  content: string
}): React.ReactElement {
  const map = useMap()

  useEffect(() => {
    const handlePopupOpen = (e: PopupEvent) => {
      // Leaflet Popup instance
      const popup = e.popup
      const popupEl = popup.getElement() // returns HTMLDivElement | null
      if (!popupEl) return

      const closeBtn = popupEl.querySelector(
        '.leaflet-popup-close-button'
      ) as HTMLElement | null //
      if (closeBtn) {
        closeBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
            <circle cx="15" cy="15" r="14" fill="#fff" stroke="#000" stroke-width="2"/>
            <line x1="9" y1="9" x2="21" y2="21" stroke="#000" stroke-width="2" stroke-linecap="round"/>
            <line x1="21" y1="9" x2="9" y2="21" stroke="#000" stroke-width="2" stroke-linecap="round"/>
          </svg>
        `
        Object.assign(closeBtn.style, {
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'white',
          borderRadius: '9999px',
          padding: '2px',
          width: '28px',
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 4px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          zIndex: '9999',
        })
      }
    }

    map.on('popupopen', handlePopupOpen)
    return () => {
      map.off('popupopen', handlePopupOpen)
    }
  }, [map])

  return (
    <Popup className="relative group">
      {' '}
      <div className="flex flex-col justify-start h-full relative group">
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
  )
}
