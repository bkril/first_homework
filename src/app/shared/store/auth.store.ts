import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { User } from '@supabase/supabase-js'

import { supabase } from '@/pkg/supabase'

interface IAuthState {
  user: User | null
  isLoading: boolean
  error: string | null

  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      setUser(user) {
        set({ user })
      },

      async login(email, password) {
        set({ isLoading: true, error: null })

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          set({ error: error.message, isLoading: false })
          return
        }

        set({ user: data.user, isLoading: false })
      },

      async register(email, password, name) {
        set({ isLoading: true, error: null })

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
          },
        })

        if (error) {
          set({ error: error.message, isLoading: false })
          return
        }

        set({ user: data.user, isLoading: false })
      },

      async logout() {
        set({ isLoading: true, error: null })
        await supabase.auth.signOut()
        set({ user: null, isLoading: false })
      },

      clearError() {
        set({ error: null })
      },
    }),

    {
      name: 'auth-storage',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? localStorage
          : ({
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            } as unknown as Storage),
      ),
      partialize: (state) => ({ user: state.user }),
    },
  ),
)
