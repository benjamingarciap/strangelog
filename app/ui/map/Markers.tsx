import L from 'leaflet'

export const pulsingIcon = L.divIcon({
  className: 'leaflet-pulsing-dot',
  iconSize: [20, 20], // matches CSS
  iconAnchor: [10, 10], // center the dot
  html: `
            <div class="leaflet-pulsing-dot">
              <div class="ping"></div>
              <div class="dot"></div>
            </div>`,
})
export const redDotIcon = L.divIcon({
  className: 'leaflet-red-dot',
  iconSize: [10, 10],
  iconAnchor: [5, 5],
  html: `<div class="dot"></div>`,
})

export const redDotHoveredIcon = L.divIcon({
  className: 'leaflet-red-dot',
  iconSize: [16, 16], // slightly bigger
  iconAnchor: [7, 7], // center adjusted
  html: `<div class="dot"></div>`,
})
