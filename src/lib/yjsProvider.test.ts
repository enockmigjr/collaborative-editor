import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import * as Y from 'yjs'
import { Awareness } from 'y-protocols/awareness'
import { MockNetworkProvider, MockProviderCallbacks } from './yjsProvider'

describe('MockNetworkProvider', () => {
  let localDoc: Y.Doc
  let sharedDoc: Y.Doc
  let awareness: Awareness
  let callbacks: MockProviderCallbacks

  beforeEach(() => {
    localDoc = new Y.Doc()
    sharedDoc = new Y.Doc()
    awareness = new Awareness(localDoc)
    callbacks = {
      onLatencyChange: vi.fn(),
      onStatusChange: vi.fn(),
    }
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should propagate local updates to shared doc', () => {
    const provider = new MockNetworkProvider(localDoc, sharedDoc, awareness, callbacks, {
      minLatencyMs: 0,
      maxLatencyMs: 0,
      packetLossRate: 0,
    })

    localDoc.getText('codemirror').insert(0, 'hello')

    vi.runAllTimers()

    expect(sharedDoc.getText('codemirror').toString()).toBe('hello')
    expect(callbacks.onStatusChange).toHaveBeenCalledWith('syncing')
    provider.destroy()
  })

  it('should propagate remote updates to local doc', () => {
    const provider = new MockNetworkProvider(localDoc, sharedDoc, awareness, callbacks, {
      minLatencyMs: 0,
      maxLatencyMs: 0,
      packetLossRate: 0,
    })

    sharedDoc.getText('codemirror').insert(0, 'world')

    vi.runAllTimers()

    expect(localDoc.getText('codemirror').toString()).toBe('world')
    provider.destroy()
  })

  it('should simulate packet loss', () => {
    const provider = new MockNetworkProvider(localDoc, sharedDoc, awareness, callbacks, {
      minLatencyMs: 0,
      maxLatencyMs: 0,
      packetLossRate: 1, // 100% perte de packet
    })

    localDoc.getText('codemirror').insert(0, 'lost')

    // Au moment de la perte du paquet, il ne devrait rien y avoir
    vi.advanceTimersByTime(100)
    expect(sharedDoc.getText('codemirror').toString()).toBe('')
    expect(callbacks.onStatusChange).toHaveBeenCalledWith('disconnected')

    // Après 2 secondes (reconnexion automatique de récupération)
    vi.advanceTimersByTime(2000)
    expect(sharedDoc.getText('codemirror').toString()).toBe('lost')
    expect(callbacks.onStatusChange).toHaveBeenCalledWith('connected')

    provider.destroy()
  })
})
