import { create } from 'zustand'

type SideMenuState = {
  isOpen: boolean
  toggleMenu: () => void
}

export const useSideMenuStore = create<SideMenuState>((set) => ({
  isOpen: false,
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}))
