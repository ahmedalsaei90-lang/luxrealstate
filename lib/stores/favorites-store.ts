import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { mockProperties } from '@/lib/data/mock-properties'
import type { Property } from '@/lib/data/mock-properties'

interface FavoritesStore {
  favorites: string[] // Property IDs
  addFavorite: (id: string) => void
  removeFavorite: (id: string) => void
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  getFavoriteProperties: () => Property[]
  clearAll: () => void
  getCount: () => number
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (id) => {
        set((state) => {
          if (state.favorites.includes(id)) return state
          return { favorites: [...state.favorites, id] }
        })
      },

      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((favId) => favId !== id),
        }))
      },

      toggleFavorite: (id) => {
        const { isFavorite, addFavorite, removeFavorite } = get()
        if (isFavorite(id)) {
          removeFavorite(id)
        } else {
          addFavorite(id)
        }
      },

      isFavorite: (id) => {
        return get().favorites.includes(id)
      },

      getFavoriteProperties: () => {
        const favoriteIds = get().favorites
        return mockProperties.filter((property) =>
          favoriteIds.includes(property.id)
        )
      },

      clearAll: () => {
        set({ favorites: [] })
      },

      getCount: () => {
        return get().favorites.length
      },
    }),
    {
      name: 'elite-properties-favorites',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

// Cross-tab synchronization
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'elite-properties-favorites') {
      // Reload favorites from storage when changed in another tab
      useFavoritesStore.persist.rehydrate()
    }
  })
}
