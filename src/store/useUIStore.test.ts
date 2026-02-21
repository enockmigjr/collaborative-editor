import { describe, it, expect } from 'vitest'
import { useUIStore } from './useUIStore'

describe('useUIStore', () => {
  it('should toggle dark mode', () => {
    useUIStore.setState({ isDarkMode: true })
    useUIStore.getState().toggleDarkMode()
    expect(useUIStore.getState().isDarkMode).toBe(false)
  })

  it('should switch tabs', () => {
    useUIStore.getState().setActiveTab('chat')
    expect(useUIStore.getState().activeTab).toBe('chat')
  })
})
