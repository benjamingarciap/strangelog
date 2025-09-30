import { create } from 'zustand'
import { EncounterCategory } from '../app/generated/prisma'

type SideMenuState = {
  isOpen: boolean
  toggleMenu: () => void
  filterCategory: EncounterCategory | null
  setFilterCategory: (category: EncounterCategory | null) => void
}

export const useSideMenuStore = create<SideMenuState>((set) => ({
  filterCategory: null,
  isOpen: false,
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
  setFilterCategory: (category) => set({ filterCategory: category }),
}))
