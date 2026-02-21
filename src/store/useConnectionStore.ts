import { create } from 'zustand'
import type { ConnectionStatus } from '@/types'

interface ConnectionState {
  status: ConnectionStatus
  latencyMs: number
  setStatus: (status: ConnectionStatus) => void
  setLatency: (ms: number) => void
}

export const useConnectionStore = create<ConnectionState>((set) => ({
  status: 'connected', // initialiser le status
  latencyMs: 0,
  setStatus: (status) => set({ status }),
  setLatency: (latencyMs) => set({ latencyMs }),
}))
