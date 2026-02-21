import { useEffect, useState } from 'react'
import * as Y from 'yjs'
import { localDoc, sharedDoc, awareness } from '@/lib/yjsSetup'
import { MockNetworkProvider } from '@/lib/yjsProvider'
import { useConnectionStore } from '@/store/useConnectionStore'
import { useLogsStore } from '@/store/useLogsStore'
import { startBotSimulation } from '@/simulation/userSimulator'
import type { User, OperationType } from '@/types'

/**
 * @file useCollaboration.ts
 * @description Hook de chef d'orchestre pour le système Yjs.
 * Initie le document, attache l'Awareness et le MockNetworkProvider, 
 * lie le journal d'activité (logs store) aux événements Y.Text, 
 * et lance/arrête les bots.
 * 
 * @param currentUser - l'utilisateur courant local pour le filtrage
 * @returns { localDoc, awareness, provider } utiles à y-codemirror
 */
export const useCollaboration = (currentUser: User) => {
  const [provider, setProvider] = useState<MockNetworkProvider | null>(null)
  const setLatency = useConnectionStore((state) => state.setLatency)
  const setStatus = useConnectionStore((state) => state.setStatus)
  const addLog = useLogsStore((state) => state.addLog)
  const incrementTotalOps = useLogsStore((state) => state.incrementTotalOps)

  useEffect(() => {
    // 1. Définir l'utilisateur local dans Awareness
    awareness.setLocalStateField('user', currentUser)

    // 2. Initialiser le MockNetworkProvider
    const networkProvider = new MockNetworkProvider(localDoc, sharedDoc, awareness, {
      onLatencyChange: setLatency,
      onStatusChange: setStatus,
    })
    // Éviter le setState synchrone dans l'effet
    requestAnimationFrame(() => {
      setProvider(networkProvider)
    })

    // 3. Lancer la simulation des bots
    const stopBots = startBotSimulation(sharedDoc, awareness)

    const typingTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

    // 4. Écouter les modifications pour le journal
    const handleUpdate = (event: Y.YTextEvent, transaction: Y.Transaction) => {
      let action: OperationType = 'insert'
      let count = 0
      event.delta.forEach((d) => {
        if (d.insert) {
          action = 'insert'
          count += typeof d.insert === 'string' ? d.insert.length : 1
        }
        if (d.delete) {
          action = 'delete'
          count += d.delete
        }
      })
      if (count > 0) {
        const isLocal = transaction.local
        let originId = String(transaction.origin)
        
        if (isLocal) {
          originId = currentUser.id
          awareness.setLocalStateField('isTyping', true)
          const existing = typingTimeouts.get(currentUser.id)
          if (existing) clearTimeout(existing)
          typingTimeouts.set(currentUser.id, setTimeout(() => {
            awareness.setLocalStateField('isTyping', false)
          }, 1500))
        }

        let userName = currentUser.name
        let userColor = currentUser.color

        // Vérifier si l'origine est un bot ou un autre utilisateur
        if (originId !== currentUser.id) {
          const states = Array.from(awareness.getStates().values())
          const botUser = states.find((s) => s.user?.id === originId)?.user
          if (botUser) {
            userName = botUser.name
            userColor = botUser.color
          } else {
            // Fallback pour une origine inconnue (ne devrait pas arriver avec les bots)
            userName = `Bot ${originId.substring(0, 4)}`
            userColor = '#666'
          }
        }

        addLog({
          userId: originId,
          userName,
          userColor,
          type: action,
          details: `${action === 'insert' ? 'Inséré' : 'Supprimé'} ${count} caractère(s)`,
        })
        incrementTotalOps(originId)
      }
    }

    const ytext = localDoc.getText('codemirror')
    ytext.observe(handleUpdate)

    return () => {
      ytext.unobserve(handleUpdate)
      stopBots()
      networkProvider.destroy()
    }
  }, [currentUser, setLatency, setStatus, addLog, incrementTotalOps])

  return { localDoc, awareness, provider }
}
