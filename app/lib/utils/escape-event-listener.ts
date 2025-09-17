import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

export function EscapeToClosePopup({
  setPopupId,
}: {
  setPopupId: (id: number | null) => void
}): null {
  const map = useMap()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        map.closePopup() // closes all open popups
        setPopupId(null) // reset your popupId state
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [map, setPopupId])

  return null
}
