import { useMap, useMapEvents } from 'react-leaflet'
import { useMapStore } from '../../../stores/mapStore'
import { useSideMenuStore } from '../../../stores/sideMenuStore'
import { useEffect } from 'react'
import { LatLngBounds } from 'leaflet'
import L from 'leaflet'

export default function MapEventHandler({
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
