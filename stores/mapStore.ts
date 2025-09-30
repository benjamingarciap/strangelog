import { create } from 'zustand'
import type { LatLngBounds } from 'leaflet'

type MapState = {
  bounds: LatLngBounds | null
  markerActive: boolean
  isFullscreen: boolean
  hoveredCard: number | null
  setBounds: (_b: LatLngBounds) => void
  toggleFullscreen: () => void
  setHoveredCard: (id: number | null) => void
  toggleMarkerActive: () => void
}

export const useMapStore = create<MapState>((set) => ({
  bounds: null,
  hoveredCard: null,
  isFullscreen: false,
  markerActive: false,
  setBounds: (_b) => set({ bounds: _b }),
  toggleFullscreen: () =>
    set((state) => ({ isFullscreen: !state.isFullscreen })),
  setHoveredCard: (id: number | null) => set({ hoveredCard: id }),
  toggleMarkerActive: () => {
    set((state) => ({ markerActive: !state.markerActive }))
    console.log('TOGGLED MARKER ACTIVE', useMapStore.getState().markerActive)
  },
}))
