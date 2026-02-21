import { renderHook } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useNetworkSim } from './useNetworkSim'
import { useConnectionStore } from '@/store/useConnectionStore'

describe('useNetworkSim', () => {
  beforeEach(() => {
    useConnectionStore.setState({ status: 'connected', latencyMs: 42 })
  })

  it('should return network status and latency from store', () => {
    const { result } = renderHook(() => useNetworkSim())
    expect(result.current.status).toBe('connected')
    expect(result.current.latencyMs).toBe(42)
  })
})
