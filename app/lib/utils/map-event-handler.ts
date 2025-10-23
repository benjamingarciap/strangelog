import { useMap, useMapEvents } from 'react-leaflet'
import { useMapStore } from '../../../stores/mapStore'
import { useSideMenuStore } from '../../../stores/sideMenuStore'
import { useEffect } from 'react'
import L from 'leaflet'

export default function MapEventHandler(): null {
  const setActiveMarkerId = useMapStore((state) => state.setActiveMarkerId)
  const setBounds = useMapStore((state) => state.setBounds)
  // Popup state
  const isFullscreen = useMapStore((state) => state.isFullscreen)
  //=========Using Map Events to Track Bounds=========
  const map = useMap()
  useEffect(() => {
    // Initial bounds on mount
    if (map) {
      // onBoundsChange(map.getBounds())
      setBounds(map.getBounds())
      setTimeout(() => {
        map.invalidateSize()
      }, 100) // tiny delay ensures layout is done
    }
    map.on('zoomstart', () => {
      setActiveMarkerId(null)
      map.closePopup()
    })
    // Handle window resize
    const handleResize = () => {
      map.invalidateSize()
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [map, setBounds, isFullscreen])
  //---------Update Bounds on Move---------

  useMapEvents({
    moveend: (event: L.LeafletEvent) => {
      const bounds = event.target.getBounds()
      // console.log('Map moved. New bounds:', bounds)
      if (setBounds) {
        setBounds(bounds) // Call the callback with new Bounds
      }
    },
  })
  return null
}
