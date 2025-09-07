import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { User, MapFilters, SearchFilters, SearchResult } from '@/types'

// Auth Store
interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        setUser: (user) => set({ user, isAuthenticated: !!user }),
        setLoading: (isLoading) => set({ isLoading }),
        logout: () => set({ user: null, isAuthenticated: false }),
      }),
      {
        name: 'auth-storage',
      }
    ),
    {
      name: 'auth-store',
    }
  )
)

// Map Store
interface MapState {
  filters: MapFilters
  selectedSighting: string | null
  viewMode: 'markers' | 'heatmap' | 'clusters'
  isLoading: boolean
  setFilters: (filters: Partial<MapFilters>) => void
  setSelectedSighting: (id: string | null) => void
  setViewMode: (mode: 'markers' | 'heatmap' | 'clusters') => void
  setLoading: (loading: boolean) => void
  resetFilters: () => void
}

const defaultMapFilters: MapFilters = {
  credibilityMin: 1,
  verifiedOnly: false,
}

export const useMapStore = create<MapState>()(
  devtools(
    (set) => ({
      filters: defaultMapFilters,
      selectedSighting: null,
      viewMode: 'clusters',
      isLoading: false,
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),
      setSelectedSighting: (selectedSighting) => set({ selectedSighting }),
      setViewMode: (viewMode) => set({ viewMode }),
      setLoading: (isLoading) => set({ isLoading }),
      resetFilters: () => set({ filters: defaultMapFilters }),
    }),
    {
      name: 'map-store',
    }
  )
)

// Search Store
interface SearchState {
  query: string
  filters: SearchFilters
  results: SearchResult[]
  isLoading: boolean
  totalResults: number
  currentPage: number
  setQuery: (query: string) => void
  setFilters: (filters: Partial<SearchFilters>) => void
  setResults: (results: SearchResult[]) => void
  setLoading: (loading: boolean) => void
  setTotalResults: (total: number) => void
  setCurrentPage: (page: number) => void
  resetSearch: () => void
}

const defaultSearchFilters: SearchFilters = {}

export const useSearchStore = create<SearchState>()(
  devtools(
    (set) => ({
      query: '',
      filters: defaultSearchFilters,
      results: [],
      isLoading: false,
      totalResults: 0,
      currentPage: 1,
      setQuery: (query) => set({ query }),
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),
      setResults: (results) => set({ results }),
      setLoading: (isLoading) => set({ isLoading }),
      setTotalResults: (totalResults) => set({ totalResults }),
      setCurrentPage: (currentPage) => set({ currentPage }),
      resetSearch: () =>
        set({
          query: '',
          filters: defaultSearchFilters,
          results: [],
          totalResults: 0,
          currentPage: 1,
        }),
    }),
    {
      name: 'search-store',
    }
  )
)

// UI Store for general UI state
interface UIState {
  sidebarOpen: boolean
  theme: 'dark' | 'alien'
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
    timestamp: Date
  }>
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: 'dark' | 'alien') => void
  addNotification: (notification: Omit<UIState['notifications'][0], 'id' | 'timestamp'>) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        sidebarOpen: false,
        theme: 'alien',
        notifications: [],
        setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
        setTheme: (theme) => set({ theme }),
        addNotification: (notification) =>
          set((state) => ({
            notifications: [
              ...state.notifications,
              {
                ...notification,
                id: Math.random().toString(36).substr(2, 9),
                timestamp: new Date(),
              },
            ],
          })),
        removeNotification: (id) =>
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          })),
        clearNotifications: () => set({ notifications: [] }),
      }),
      {
        name: 'ui-storage',
        partialize: (state) => ({ theme: state.theme }),
      }
    ),
    {
      name: 'ui-store',
    }
  )
)
