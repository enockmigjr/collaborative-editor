import { describe, it, expect, beforeEach } from 'vitest'
import { useLogsStore } from './useLogsStore'

describe('useLogsStore', () => {
  beforeEach(() => {
    useLogsStore.getState().clearLogs()
  })

  it('should initialize with empty logs and 0 ops', () => {
    expect(useLogsStore.getState().logs).toEqual([])
    expect(useLogsStore.getState().totalOps).toBe(0)
  })

  it('should add log', () => {
    useLogsStore.getState().addLog({
      userId: '1',
      userName: 'Test',
      userColor: '#000',
      type: 'insert',
      details: 'Added text',
    })
    const logs = useLogsStore.getState().logs
    expect(logs.length).toBe(1)
    expect(logs[0].userName).toBe('Test')
  })

  it('should increment ops', () => {
    useLogsStore.getState().incrementTotalOps('user1')
    expect(useLogsStore.getState().totalOps).toBe(1)
    expect(useLogsStore.getState().userOps['user1']).toBe(1)
  })
})
