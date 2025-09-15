import { create } from 'zustand'
import axios from 'axios'

interface User {
  id: string
  name: string
  email: string
}

interface UserState {
  user: User | null
  loading: boolean
  error: null | string
  setUser: (user: User | null) => void
  fetchUser: () => Promise<void>
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),

  fetchUser: async () => {
    set({ loading: true, error: null })
    try {
      const res = await axios.get('/api/auth/me')
      set({ user: res.data.user, loading: false })
    } catch (error: unknown) {
      set({
        user: null,
        error: (error as Error).message || 'Failed to fetch user',
        loading: false,
      })
    }
  },
}))
