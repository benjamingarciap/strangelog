import { create } from 'zustand'
import type { LatLngBounds } from 'leaflet'

type SideMenuState = {
  isOpen: boolean
  toggleMenu: () => void
}

export const useSideMenuStore = create<SideMenuState>((set) => ({
  isOpen: false,
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}))
