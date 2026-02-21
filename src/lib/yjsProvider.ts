import * as Y from 'yjs'
import { Awareness } from 'y-protocols/awareness'
import type { NetworkSimConfig, NetworkSendResult, ConnectionStatus } from '@/types'

/** Configuration réseau par défaut (correspond aux specs du test) */
const DEFAULT_CONFIG: NetworkSimConfig = {
  minLatencyMs: 100,
  maxLatencyMs: 1500,
  packetLossRate: 0.01,
}

/**
 * Calcule une latence aléatoire dans les bornes configurées.
 *
 * @param config - Configuration de la simulation réseau
 * @returns Latence en millisecondes
 */
const computeRandomLatency = (config: NetworkSimConfig): number => {
  const range = config.maxLatencyMs - config.minLatencyMs
  return Math.floor(Math.random() * range) + config.minLatencyMs
}

/**
 * Simule un envoi réseau avec latence aléatoire et probabilité de perte.
 *
 * @param config - Paramètres de simulation
 * @returns Résultat de l'envoi : succès avec latence ou échec avec raison
 */
const simulateSend = (config: NetworkSimConfig): NetworkSendResult => {
  if (Math.random() < config.packetLossRate) {
    return { success: false, reason: 'packet_lost' }
  }
  return { success: true, latencyMs: computeRandomLatency(config) }
}

/** Callbacks exposés au composant parent pour mettre à jour l'UI */
export interface MockProviderCallbacks {
  onLatencyChange: (ms: number) => void
  onStatusChange: (status: ConnectionStatus) => void
}

/**
 * Provider réseau simulé pour Yjs.
 *
 * Remplace un provider WebSocket réel (comme y-websocket) par une simulation
 * locale qui respecte les contraintes du test : latence 100-1500ms, perte 1%.
 */
export class MockNetworkProvider {
  private readonly config: NetworkSimConfig
  private isDestroyed = false

  constructor(
    /** Document local lié à l'éditeur CodeMirror de l'utilisateur */
    private readonly localDoc: Y.Doc,
    /** Document partagé entre tous les bots simulés */
    private readonly sharedDoc: Y.Doc,
    /** Protocole de présence Yjs (curseurs, statuts) */
    public readonly awareness: Awareness,
    private readonly callbacks: MockProviderCallbacks,
    config: Partial<NetworkSimConfig> = {}
  ) {
    this.config = { ...DEFAULT_CONFIG, ...config }
    this.localDoc.on('update', this.handleLocalUpdate)
    this.sharedDoc.on('update', this.handleRemoteUpdate)
  }

  /**
   * Intercepte les modifications locales et les propage au doc partagé
   * avec simulation réseau (latence + perte de paquets).
   */
  private readonly handleLocalUpdate = (update: Uint8Array, origin: unknown): void => {
    if (this.isDestroyed || origin === 'network') return

    const result = simulateSend(this.config)

    if (!result.success) {
      // Paquet perdu : passage en mode déconnecté temporaire
      this.callbacks.onStatusChange('disconnected')
      setTimeout(() => {
        if (!this.isDestroyed) {
          Y.applyUpdate(this.sharedDoc, update, 'local')
          this.callbacks.onStatusChange('connected')
        }
      }, 2000)
      return
    }

    this.callbacks.onLatencyChange(result.latencyMs)
    this.callbacks.onStatusChange('syncing')

    setTimeout(() => {
      if (this.isDestroyed) return
      Y.applyUpdate(this.sharedDoc, update, 'local')
      this.callbacks.onStatusChange('connected')
    }, result.latencyMs)
  }

  /**
   * Propage les updates des bots (sharedDoc) vers le document local.
   * Applique également une latence pour simuler la réception réseau.
   */
  private readonly handleRemoteUpdate = (update: Uint8Array, origin: unknown): void => {
    if (this.isDestroyed || origin === 'local') return

    const result = simulateSend(this.config)
    if (!result.success) {
      // Le paquet est perdu. On simule qu'une reconnexion ultérieure finit par le récupérer
      setTimeout(() => {
        if (this.isDestroyed) return
        Y.applyUpdate(this.localDoc, update, origin || 'network')
      }, 2000)
      return
    }

    setTimeout(() => {
      if (this.isDestroyed) return
      Y.applyUpdate(this.localDoc, update, origin || 'network')
    }, result.latencyMs)
  }

  /**
   * Libère toutes les ressources et supprime les listeners.
   */
  destroy(): void {
    this.isDestroyed = true
    this.localDoc.off('update', this.handleLocalUpdate)
    this.sharedDoc.off('update', this.handleRemoteUpdate)
  }
}
