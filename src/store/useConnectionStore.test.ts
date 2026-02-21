import { describe, it, expect } from 'vitest'
import { useConnectionStore } from './useConnectionStore'

describe('useConnectionStore', () => {
  it('should initialize with connected status and 0 latency', () => {
    const state = useConnectionStore.getState()
    expect(state.status).toBe('connected')
    expect(state.latencyMs).toBe(0)
  })

  it('should update status', () => {
    useConnectionStore.getState().setStatus('connected')
    expect(useConnectionStore.getState().status).toBe('connected')
  })

  it('should update latency', () => {
    useConnectionStore.getState().setLatency(50)
    expect(useConnectionStore.getState().latencyMs).toBe(50)
  })
})
