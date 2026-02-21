// --- Types ---
export type ConnectionStatus = 'disconnected' | 'syncing' | 'connected'

export interface NetworkSimConfig {
  minLatencyMs: number
  maxLatencyMs: number
  packetLossRate: number
}

export type NetworkSendResult =
  | { success: true; latencyMs: number }
  | { success: false; reason: 'packet_lost' }

export interface User {
  id: string
  name: string
  color: string
  avatar: string
  isLocal: boolean
}

export type OperationType = 'insert' | 'delete' | 'undo' | 'redo'

export interface LogEntry {
  id: string
  userId: string
  userName: string
  userColor: string
  type: OperationType
  timestamp: number
  details: string
}

// --- Extend Yjs ---
// Definie les proprietes personnalisees pour y-protocols Awareness
export interface AwarenessState {
  user?: User
  [key: string]: unknown
}

// Definie les proprietes personnalisees pour y-protocols Awareness
declare module 'y-protocols/awareness' {
  interface Awareness {
    getLocalState(): null | AwarenessState
    setLocalState(state: AwarenessState | null): void
    setLocalStateField(field: string, value: unknown): void
    getStates(): Map<number, AwarenessState>
  }
}
