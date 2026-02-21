import { describe, it, expect } from 'vitest'
import * as Y from 'yjs'
import { randomWord, executeBotAction } from './botBehaviors'

describe('botBehaviors', () => {
  it('randomWord should return a string ending with a space', () => {
    const word = randomWord()
    expect(typeof word).toBe('string')
    expect(word.endsWith(' ')).toBe(true)
  })

  it('executeBotAction should insert or delete text', () => {
    const doc = new Y.Doc()
    const originId = 'bot-123'

    // Document est vide, donc la première action forcera une insertion
    executeBotAction(doc, originId)
    const text = doc.getText('codemirror').toString()
    expect(text.length).toBeGreaterThan(0)

    // Exécuter plusieurs fois pour couvrir les branches d'insertion et de suppression
    for (let i = 0; i < 20; i++) {
      executeBotAction(doc, originId)
    }
  })
})
