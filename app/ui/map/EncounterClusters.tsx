'use client'

import React, { useEffect } from 'react'
import { Marker, useMap } from 'react-leaflet'
import L from 'leaflet'

import { useSupercluster } from '../../hooks/useSupercluster'
import { AnyProps, PointFeature } from 'supercluster'
import { useMapStore } from '../../../stores/mapStore'
import { pulsingIcon, redDotIcon, redDotHoveredIcon } from './Markers'
import CustomPopup from './Popup'

export function EncounterClusters({
  points,
}: {
  points: PointFeature<AnyProps>[]
}): React.ReactElement {
  const { clusters, index, map } = useSupercluster(points)
  const hoveredCard = useMapStore((state) => state.hoveredCard)
  const activeMarkerId = useMapStore((state) => state.activeMarkerId)
  const setActiveMarkerId = useMapStore((state) => state.setActiveMarkerId)
  const hoveredCluster = useMapStore((state) => state.hoveredCluster)
  const setHoveredCluster = useMapStore((state) => state.setHoveredCluster)

  useEffect(() => {
    if (!activeMarkerId) return

    const visibleMarkerIds = clusters
      .filter((c) => !c.properties.cluster)
      .map((c) => c.properties.id)

    if (!visibleMarkerIds.includes(activeMarkerId)) {
      setActiveMarkerId(null)
    }
  }, [activeMarkerId, clusters, setActiveMarkerId, map, hoveredCluster])

  return (
    <>
      {clusters.map((cluster: PointFeature<AnyProps>) => {
        const [lng, lat] = cluster.geometry.coordinates
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties

        if (isCluster) {
          if (!cluster.id) return null
          if (typeof cluster.id === 'string') cluster.id = parseInt(cluster.id)

          const leaves = index.getLeaves(cluster.id) as PointFeature<AnyProps>[]
          const containsHoveredOrActive = leaves.some(
            (leaf) =>
              leaf.properties.id === hoveredCard ||
              leaf.properties.id === activeMarkerId
          )
          const isHovered = hoveredCluster === cluster.id
          // const size =
          //   containsHoveredOrActive || isHovered
          //     ? 30 + pointCount / 10 + 5
          //     : 30 + pointCount / 10

          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[lat, lng]}
              icon={L.divIcon({
                html: `
                  <div 
                    class="flex items-center justify-center rounded-full bg-red-400 transition-transform duration-400 ease-out" 
                    style="
                      width:${30 + pointCount / 10}px; 
                      height:${30 + pointCount / 10}px;
                      transform: scale(${
                        containsHoveredOrActive || isHovered ? 1.25 : 1
                      });
                    "
                  >
                    <span 
                      class="text-white text-sm font-semibold"
                      style="transform: scale(${
                        1 / (containsHoveredOrActive || isHovered ? 1.25 : 1)
                      });"
                    >
                      ${pointCount}
                    </span>
                  </div>
                `,
                className: '',
                iconSize: [30 + pointCount / 10, 30 + pointCount / 10],
                iconAnchor: [
                  (30 + pointCount / 10) / 2,
                  (30 + pointCount / 10) / 2,
                ],
              })}
              eventHandlers={{
                mouseover: () => setHoveredCluster(cluster.id),
                mouseout: () => setHoveredCluster(undefined),
                click: () => {
                  if (cluster.id === undefined) {
                    return map.setView([lat, lng], undefined, { animate: true })
                  }
                  if (typeof cluster.id === 'string') {
                    cluster.id = parseInt(cluster.id)
                  }
                  const expansionZoom = Math.min(
                    index.getClusterExpansionZoom(cluster.id),
                    18
                  )
                  map.setView([lat, lng], expansionZoom, { animate: true })
                },
              }}
            />
          )
        }

        // Individual marker
        const isActive = activeMarkerId === cluster.properties.id
        const isHovered = hoveredCard === cluster.properties.id

        const icon = isActive
          ? pulsingIcon
          : isHovered
          ? redDotHoveredIcon
          : redDotIcon

        return (
          <Marker
            key={cluster.properties.id}
            position={[lat, lng]}
            icon={icon}
            eventHandlers={{
              popupopen: (e) => {
                // Lmap.setView([lat, lng], undefined, { animate: true })
                setActiveMarkerId(cluster.properties.id)
                const popup = e.popup
                // Disable autopan *after* the popup opens
                popup.options.autoPan = false
              },
              popupclose: () => setActiveMarkerId(null),
              mouseover: () =>
                useMapStore.getState().setHoveredCard(cluster.properties.id),
              mouseout: () => useMapStore.getState().setHoveredCard(null),
            }}
          >
            <CustomPopup cluster={cluster} />
          </Marker>
        )
      })}
    </>
  )
}
