import * as Y from 'yjs'
import { faker } from '@faker-js/faker'
import { Awareness, encodeAwarenessUpdate, applyAwarenessUpdate } from 'y-protocols/awareness'
import { executeBotAction } from './botBehaviors'
import type { User } from '@/types'

export const createBot = (): User => ({
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  color: faker.color.rgb(),
  avatar: faker.image.avatar(),
  isLocal: false,
})

export const BOTS = [createBot(), createBot(), createBot()]

/**
 * Lance la simulation multi-utilisateurs.
 * Pour chaque bot, crée un doc Yjs local synchronisé instantanément avec le sharedDoc,
 * et une instance Awareness dont les updates sont propagées vers l'awareness public.
 * 
 * @param sharedDoc - Document partagé central simulant un backend.
 * @param publicAwareness - Instance Awareness principale connectée à l'UI.
 * @returns Fonction de nettoyage pour interrompre les intervals et détruire les documents virtuels.
 */
export const startBotSimulation = (sharedDoc: Y.Doc, publicAwareness: Awareness) => {
  const intervals: ReturnType<typeof setInterval>[] = []
  const botDocs: Y.Doc[] = []
  const botAwarenessList: Awareness[] = []
  const sharedDocListeners = new Map<Y.Doc, (update: Uint8Array, origin: unknown) => void>()

  BOTS.forEach((bot, index) => {
    const botDoc = new Y.Doc()
    // Utiliser un clientID distinct (important pour le protocole YATA et awareness)
    botDoc.clientID = 1000 + index
    botDocs.push(botDoc)

    // Sync botDoc <-> sharedDoc (sans latence car simulation des bots centralisée sur sharedDoc)
    const handleBotDocUpdate = (update: Uint8Array, origin: unknown) => {
      if (origin !== 'network') Y.applyUpdate(sharedDoc, update, bot.id)
    }
    const handleSharedDocUpdate = (update: Uint8Array, origin: unknown) => {
      if (origin !== bot.id && !botDoc.isDestroyed) Y.applyUpdate(botDoc, update, 'network')
    }

    botDoc.on('update', handleBotDocUpdate)
    sharedDoc.on('update', handleSharedDocUpdate)

    // Stocker la référence de l'écouteur pour le cleanup
    sharedDocListeners.set(botDoc, handleSharedDocUpdate)

    const botAwareness = new Awareness(botDoc)
    botAwarenessList.push(botAwareness)

    // Initialise l'état local du bot
    botAwareness.setLocalStateField('user', bot)

    // Propage l'awareness du bot vers le publicAwareness (celui lié à l'UI)
    botAwareness.on(
      'update',
      ({ added, updated, removed }: { added: number[]; updated: number[]; removed: number[] }) => {
        const changedClients = added.concat(updated, removed)
        const enc = encodeAwarenessUpdate(botAwareness, changedClients)
        applyAwarenessUpdate(publicAwareness, enc, 'simulation')
      }
    )

    // Routine du bot : tape toutes les 2 à 5 secondes
    const interval = setInterval(
      () => {
        // Le bot tape
        executeBotAction(botDoc, bot.id)

        // Indiquer la frappe
        botAwareness.setLocalStateField('isTyping', true)
        setTimeout(() => {
          botAwareness.setLocalStateField('isTyping', false)
        }, 1500)

        // Met à jour son curseur avec RelativePosition (requis par y-codemirror)
        const ytext = botDoc.getText('codemirror')
        const pos = ytext.length > 0 ? Math.floor(Math.random() * ytext.length) : 0
        const relativePos = Y.createRelativePositionFromTypeIndex(ytext, pos)
        
        botAwareness.setLocalStateField('cursor', { anchor: relativePos, head: relativePos })

        // 10% de chance d'envoyer un message au chat
        if (Math.random() < 0.1) {
          const ychat = sharedDoc.getArray<{ id: string; text: string; user: string; time: string }>('chat')
          const messages = ['Super travail !', 'Je viens de modifier.', 'Attention conflict.', '+1', 'Hello :)']
          ychat.push([{
            id: Math.random().toString(),
            text: messages[Math.floor(Math.random() * messages.length)],
            user: bot.name,
            time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          }])
        }
      },
      2000 + Math.random() * 3000
    )

    intervals.push(interval)
  })

  // fonction de nettoyage
  return () => {
    intervals.forEach(clearInterval)
    botDocs.forEach((doc) => {
      const listener = sharedDocListeners.get(doc)
      if (listener) {
        sharedDoc.off('update', listener)
      }
      doc.destroy()
    })
    botAwarenessList.forEach((aw) => aw.destroy())
  }
}
