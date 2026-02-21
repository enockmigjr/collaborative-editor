import { create } from 'zustand'
import type { LogEntry } from '@/types'

interface LogsState {
  logs: LogEntry[]
  totalOps: number
  userOps: Record<string, number>
  addLog: (log: Omit<LogEntry, 'id' | 'timestamp'>) => void
  incrementTotalOps: (userId: string) => void
  clearLogs: () => void
}

export const useLogsStore = create<LogsState>((set) => ({
  logs: [],
  totalOps: 0,
  userOps: {},
  addLog: (logData) =>
    set((state) => ({
      logs: [
        {
          ...logData,
          id: Math.random().toString(36).substring(7),
          timestamp: Date.now(),
        },
        ...state.logs,
      ].slice(0, 100), // Garde les 100 derniers logs
    })),
  incrementTotalOps: (userId) =>
    set((state) => ({
      totalOps: state.totalOps + 1,
      userOps: { ...state.userOps, [userId]: (state.userOps[userId] || 0) + 1 },
    })),
  clearLogs: () => set({ logs: [], totalOps: 0, userOps: {} }),
}))
