import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type MobileTab = 'editor' | 'users' | 'activity'

interface UIState {
  isDarkMode: boolean
  toggleDarkMode: () => void
  activeTab: 'journal' | 'chat'
  setActiveTab: (tab: 'journal' | 'chat') => void
  activeMobileTab: MobileTab
  setActiveMobileTab: (tab: MobileTab) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isDarkMode: true, // Vercel mode (dark) par défaut
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      activeTab: 'journal',
      setActiveTab: (activeTab) => set({ activeTab }),
      activeMobileTab: 'editor',
      setActiveMobileTab: (activeMobileTab) => set({ activeMobileTab }),
    }),
    { name: 'ui-storage' }
  )
)
