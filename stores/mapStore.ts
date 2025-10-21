import { create } from 'zustand'
import type { LatLngBounds } from 'leaflet'

type MapState = {
  bounds: LatLngBounds | null
  activeMarkerId: number | null
  isFullscreen: boolean
  hoveredCard: number | null
  setBounds: (_b: LatLngBounds) => void
  toggleFullscreen: () => void
  setHoveredCard: (id: number | null) => void
  setActiveMarkerId: (id: number | null) => void
  hoveredCluster: string | number | undefined
  setHoveredCluster: (id: string | number | undefined) => void
  //
}
export const useMapStore = create<MapState>((set) => ({
  bounds: null,
  hoveredCard: null,
  hoveredCluster: undefined,
  isFullscreen: false,
  activeMarkerId: null,
  setBounds: (_b) => set({ bounds: _b }),
  toggleFullscreen: () =>
    set((state) => ({ isFullscreen: !state.isFullscreen })),
  setHoveredCard: (id: number | null) => set({ hoveredCard: id }),
  setActiveMarkerId: (id: number | null) => set({ activeMarkerId: id }),
  setHoveredCluster: (id: string | number | undefined) =>
    set({ hoveredCluster: id }),
}))
