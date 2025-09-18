import { create } from 'zustand'
import type { LatLngBounds } from 'leaflet'

type MapState = {
  bounds: LatLngBounds | null
  setBounds: (_b: LatLngBounds) => void
  isFullscreen: boolean
  toggleFullscreen: () => void
}

export const useMapStore = create<MapState>((set) => ({
  bounds: null,
  setBounds: (_b) => set({ bounds: _b }),
  isFullscreen: false,
  toggleFullscreen: () =>
    set((state) => ({ isFullscreen: !state.isFullscreen })),
}))
