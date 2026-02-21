import * as Y from 'yjs'

const WORDS = [
  // Stack actuel
  'React',
  'Vite',
  'TypeScript',
  'Yjs',
  'CodeMirror',
  'Zustand',
  'Tailwind',
  'PNPM',
  'Vitest',
  'Storybook',

  // Concepts de collaboration & Algorithmes
  'collaboratif',
  'temps réel',
  'latence',
  'CRDT',
  'synchronisation',
  'conflits',
  'opérations',
  'WebSocket',
  'WebRTC',
  'persistance',
  'awareness',
  'curseur',
  'édition',

  // Performance & Sécurité
  'performances',
  'optimisation',
  'sécurité',
  'chiffrement',
  'authentification',
  'scalabilité',
  'debounce',
  'throttle',
  'mémoire',
  'profiler',
  'bundle',
  'audit',

  // Contexte Projet & Divers
  'intéressant',
  'test',
  'NiyiExpertise',
  'développement',
  'interface',
  'composant',
  'modulaire',
  'robuste',
  'fluide',
  'innovation',
  'expert',
]
export const randomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)] + ' '

/**
 * Exécute une action aléatoire (insertion ou suppression de texte)
 * pour un bot donné.
 *
 * @param doc - Document Yjs du bot.
 * @param originId - Identifiant unique du bot (utilisé comme origin pour le filtrage).
 */
export const executeBotAction = (doc: Y.Doc, originId: string) => {
  const ytext = doc.getText('codemirror')
  const action = Math.random()

  doc.transact(() => {
    if (action < 0.85 || ytext.length === 0) {
      // 85% chance d'insérer
      const insertPos = Math.floor(Math.random() * (ytext.length + 1))
      ytext.insert(insertPos, randomWord())
    } else {
      // 15% chance de supprimer
      const deleteLen = Math.floor(Math.random() * 5) + 1
      const deletePos = Math.floor(Math.random() * Math.max(1, ytext.length - deleteLen))
      if (deletePos >= 0 && deletePos + deleteLen <= ytext.length) {
        ytext.delete(deletePos, deleteLen)
      }
    }
  }, originId)
}
