import { useState, useEffect, useMemo } from 'react'
import Supercluster, { AnyProps, PointFeature } from 'supercluster'
import { useMap } from 'react-leaflet'
import type { Map } from 'leaflet'

export function useSupercluster(points: PointFeature<AnyProps>[]): {
  clusters: PointFeature<AnyProps>[]
  index: Supercluster<AnyProps>
  map: Map
} {
  const map = useMap()
  const [bounds, setBounds] = useState<[number, number, number, number] | null>(
    null
  )
  const [zoom, setZoom] = useState(map.getZoom())

  useEffect(() => {
    if (!map) return

    const update = () => {
      const b = map.getBounds()
      const newBounds: [number, number, number, number] = [
        b.getWest(),
        b.getSouth(),
        b.getEast(),
        b.getNorth(),
      ]

      setBounds((prev) => {
        if (
          !prev ||
          prev[0] !== newBounds[0] ||
          prev[1] !== newBounds[1] ||
          prev[2] !== newBounds[2] ||
          prev[3] !== newBounds[3]
        ) {
          return newBounds
        }
        return prev
      })

      setZoom((prevZoom) => {
        const currentZoom = map.getZoom()
        return prevZoom !== currentZoom ? currentZoom : prevZoom
      })
    }

    // Initial update
    update()

    map.on('moveend zoomend', update) // only after move/zoom finishes
    return () => {
      map.off('moveend zoomend', update)
    }
  }, [map])

  const index = useMemo(() => {
    return new Supercluster({
      radius: 60,
      maxZoom: 16,
    }).load(points)
  }, [points])

  const clusters = useMemo(() => {
    if (!bounds) return []
    return index.getClusters(bounds, zoom)
  }, [index, bounds, zoom])

  return { clusters, index, map }
}
